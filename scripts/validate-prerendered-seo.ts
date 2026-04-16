import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { JSDOM } from "jsdom";
import { buildLocalizedUrl, getCanonicalLocaleForPath, normalizePublicPath, stripLocalePrefix } from "../src/lib/seo";
import { defaultLocale, isValidLocale, type Locale } from "../src/i18n/types";

const DIST_DIR = path.resolve("dist");
const SITE_URL = "https://tdpaint.com";
const HELP_TEXT = [
  "Usage: npm run validate-prerendered-seo -- [options]",
  "",
  "Options:",
  "  --route <path>       Validate only the given localized route. Repeatable.",
  "  --present-only       Validate only the HTML files currently present in dist/",
  "                       and skip sitemap coverage checks.",
  "  --help, -h           Show this help message.",
  "",
  "Environment:",
  "  PRERENDER_VALIDATE_FILTER  Comma-separated localized route list.",
  "  PRERENDER_FILTER           Reused as a fallback route filter for single-route checks.",
  "",
  "Examples:",
  "  npm run validate-prerendered-seo -- --route /en/applications",
  "  npm run validate-prerendered-seo -- --route /en/resources/articles/how-does-a-spray-booth-work",
  "  npm run validate-prerendered-seo -- --present-only",
].join("\n");

interface ValidationOptions {
  help: boolean;
  presentOnly: boolean;
  routeFilters: Set<string> | null;
}

async function collectHtmlFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const absolutePath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return collectHtmlFiles(absolutePath);
      }

      if (entry.isFile() && entry.name.endsWith(".html")) {
        return [absolutePath];
      }

      return [];
    }),
  );

  return files.flat();
}

function getRoutePath(filePath: string): string | null {
  const relativePath = path.relative(DIST_DIR, filePath).replace(/\\/g, "/");

  if (relativePath === "index.html") {
    return null;
  }

  return normalizePublicPath(`/${relativePath.replace(/\/index\.html$/, "").replace(/\.html$/, "")}`);
}

function normalizeRouteFilter(value: string): string {
  const trimmed = value.trim();

  if (!trimmed) {
    throw new Error("Route filter cannot be empty.");
  }

  try {
    return normalizePublicPath(new URL(trimmed).pathname || "/");
  } catch {
    return normalizePublicPath(trimmed);
  }
}

function parseRouteFilterList(raw: string | undefined): Set<string> {
  return new Set(
    (raw || "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
      .map((value) => normalizeRouteFilter(value)),
  );
}

function parseArgs(argv: string[]): ValidationOptions {
  const routeFilters = new Set<string>();
  let help = false;
  let presentOnly = false;

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--help" || arg === "-h") {
      help = true;
      continue;
    }

    if (arg === "--present-only") {
      presentOnly = true;
      continue;
    }

    if (arg === "--route") {
      const nextValue = argv[index + 1];

      if (!nextValue) {
        throw new Error("Missing value for --route.");
      }

      routeFilters.add(normalizeRouteFilter(nextValue));
      index += 1;
      continue;
    }

    if (arg.startsWith("--route=")) {
      routeFilters.add(normalizeRouteFilter(arg.slice("--route=".length)));
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  if (routeFilters.size === 0) {
    const envFilters = parseRouteFilterList(
      process.env.PRERENDER_VALIDATE_FILTER || process.env.PRERENDER_FILTER,
    );
    envFilters.forEach((routePath) => routeFilters.add(routePath));
  }

  return {
    help,
    presentOnly,
    routeFilters: routeFilters.size > 0 ? routeFilters : null,
  };
}

function getExpectedCanonical(routePath: string) {
  const segments = routePath.split("/").filter(Boolean);
  const routeLocale: Locale = isValidLocale(segments[0]) ? segments[0] : defaultLocale;
  const publicPath = normalizePublicPath(stripLocalePrefix(routePath));
  const canonicalLocale = getCanonicalLocaleForPath(publicPath, routeLocale);

  return buildLocalizedUrl(canonicalLocale, publicPath);
}

function getJsonLdRecords(document: Document) {
  return Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
    .flatMap((element) => {
      const raw = element.textContent?.trim();

      if (!raw) {
        return [];
      }

      try {
        const parsed = JSON.parse(raw) as Record<string, unknown> | Array<Record<string, unknown>>;
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        return [];
      }
    });
}

function getAuthorName(record: Record<string, unknown>) {
  const author = record.author;

  if (typeof author === "string" && author.trim()) {
    return author.trim();
  }

  if (author && typeof author === "object" && !Array.isArray(author)) {
    const name = author.name;
    if (typeof name === "string" && name.trim()) {
      return name.trim();
    }
  }

  return "";
}

function pushError(errors: string[], routePath: string, filePath: string, message: string) {
  const relativeFilePath = path.relative(DIST_DIR, filePath).replace(/\\/g, "/");
  errors.push(`${routePath} (${relativeFilePath})\n  ${message}`);
}

function validateDynamicArticle(document: Document, routePath: string, filePath: string, errors: string[]) {
  if (!routePath.includes("/resources/articles/")) {
    return;
  }

  const h1 = document.querySelector("main h1")?.textContent?.trim() || "";
  const leadText =
    document.querySelector("main [class*='bg-primary/5'] p")?.textContent?.replace(/\s+/g, " ").trim() ||
    document.querySelector("main article p")?.textContent?.replace(/\s+/g, " ").trim() ||
    document.querySelector("main p")?.textContent?.replace(/\s+/g, " ").trim() ||
    "";
  const articleText = document.querySelector("main article")?.textContent?.replace(/\s+/g, " ").trim() || "";
  const mainText = document.querySelector("main")?.textContent?.replace(/\s+/g, " ").trim() || "";
  const articleRecord = getJsonLdRecords(document).find((record) => {
    const type = record["@type"];
    return type === "TechArticle" || type === "Article";
  });

  if (!h1) {
    pushError(errors, routePath, filePath, "Missing article H1.");
  }

  if (leadText.length < 80) {
    pushError(errors, routePath, filePath, "Missing a strong answer-first lead paragraph near the top of the page.");
  }

  if (articleText.length < 400) {
    pushError(errors, routePath, filePath, "Article body is too thin or missing from the prerendered HTML.");
  }

  if (!mainText.includes("Last updated")) {
    pushError(errors, routePath, filePath, "Visible verification block is missing a Last updated label.");
  }

  if (!mainText.includes("Author")) {
    pushError(errors, routePath, filePath, "Visible verification block is missing an Author label.");
  }

  if (!articleRecord) {
    pushError(errors, routePath, filePath, "Missing TechArticle/Article JSON-LD.");
    return;
  }

  if (typeof articleRecord.datePublished !== "string" || !articleRecord.datePublished.trim()) {
    pushError(errors, routePath, filePath, "Article JSON-LD is missing datePublished.");
  }

  if (typeof articleRecord.dateModified !== "string" || !articleRecord.dateModified.trim()) {
    pushError(errors, routePath, filePath, "Article JSON-LD is missing dateModified.");
  }

  if (!getAuthorName(articleRecord)) {
    pushError(errors, routePath, filePath, "Article JSON-LD is missing author.name.");
  }
}

function validateRoute(filePath: string, routePath: string, document: Document, errors: string[]) {
  const title = document.title.trim();
  const metaDescription =
    (document.querySelector('meta[name="description"]') as HTMLMetaElement | null)?.content?.trim() || "";
  const ogTitle =
    (document.querySelector('meta[property="og:title"]') as HTMLMetaElement | null)?.content?.trim() || "";
  const ogDescription =
    (document.querySelector('meta[property="og:description"]') as HTMLMetaElement | null)?.content?.trim() || "";
  const ogUrl =
    (document.querySelector('meta[property="og:url"]') as HTMLMetaElement | null)?.content?.trim() || "";
  const canonical =
    (document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null)?.href?.trim() || "";
  const expectedCanonical = getExpectedCanonical(routePath);

  if (!title) {
    pushError(errors, routePath, filePath, "Missing document title.");
  }

  if (!metaDescription) {
    pushError(errors, routePath, filePath, "Missing meta description.");
  }

  if (!canonical) {
    pushError(errors, routePath, filePath, "Missing canonical URL.");
  } else if (canonical !== expectedCanonical) {
    pushError(
      errors,
      routePath,
      filePath,
      `Canonical URL mismatch. Expected ${expectedCanonical} but found ${canonical}.`,
    );
  }

  if (!ogTitle) {
    pushError(errors, routePath, filePath, "Missing og:title.");
  } else if (title && ogTitle !== title) {
    pushError(errors, routePath, filePath, `og:title mismatch. Expected "${title}" but found "${ogTitle}".`);
  }

  if (!ogDescription) {
    pushError(errors, routePath, filePath, "Missing og:description.");
  } else if (metaDescription && ogDescription !== metaDescription) {
    pushError(errors, routePath, filePath, "og:description does not match meta description.");
  }

  if (!ogUrl) {
    pushError(errors, routePath, filePath, "Missing og:url.");
  } else if (canonical && ogUrl !== canonical) {
    pushError(errors, routePath, filePath, `og:url mismatch. Expected ${canonical} but found ${ogUrl}.`);
  }

  validateDynamicArticle(document, routePath, filePath, errors);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    console.log(HELP_TEXT);
    return;
  }

  const htmlFiles = await collectHtmlFiles(DIST_DIR);
  const errors: string[] = [];
  const availableRoutes = new Set<string>();
  let validatedCount = 0;

  for (const filePath of htmlFiles) {
    const routePath = getRoutePath(filePath);

    if (!routePath) {
      continue;
    }

    if (options.routeFilters && !options.routeFilters.has(routePath)) {
      continue;
    }

    availableRoutes.add(routePath);

    const html = await readFile(filePath, "utf8");
    const dom = new JSDOM(html);

    validateRoute(filePath, routePath, dom.window.document, errors);
    validatedCount += 1;
  }

  const sitemapPath = path.join(DIST_DIR, "sitemap.xml");
  const sitemapXml = await readFile(sitemapPath, "utf8");
  const sitemapRoutes = Array.from(sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g))
    .map((match) => match[1] || "")
    .filter((url) => url.startsWith(SITE_URL))
    .map((url) => normalizePublicPath(url.slice(SITE_URL.length) || "/"))
    .filter((routePath) => routePath !== "/");

  const sitemapRoutesToCheck = options.routeFilters
    ? sitemapRoutes.filter((routePath) => options.routeFilters?.has(routePath))
    : sitemapRoutes;

  if (!options.presentOnly) {
    for (const routePath of sitemapRoutesToCheck) {
      if (!availableRoutes.has(routePath)) {
        errors.push(`${routePath} (sitemap)\n  Missing prerendered HTML file for a sitemap URL.`);
      }
    }
  }

  if (options.routeFilters) {
    const matchedRoutes = new Set([...availableRoutes, ...sitemapRoutesToCheck]);

    for (const routePath of options.routeFilters) {
      if (!matchedRoutes.has(routePath)) {
        errors.push(
          `${routePath} (filter)\n  Route filter did not match a prerendered HTML file or sitemap URL.`,
        );
      }
    }
  }

  if (errors.length > 0) {
    throw new Error(
      [
        `SEO validation failed for ${errors.length} issue(s) across ${validatedCount} prerendered page(s).`,
        ...errors,
      ].join("\n\n"),
    );
  }

  const filterNote = options.routeFilters
    ? ` using ${options.routeFilters.size} route filter(s)`
    : options.presentOnly
      ? " for the currently present dist files"
      : "";
  console.log(`Validated SEO metadata for ${validatedCount} prerendered page(s)${filterNote}.`);
}

main().catch((error) => {
  console.error("Prerendered SEO validation failed.");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
