import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { getIndexableUrlsForPath, isAlwaysNoindexPath, normalizePublicPath } from "../src/lib/seo";
import { solutions } from "../src/data/solutionData";
import { industries } from "../src/data/industryData";
import { getAllTopicClusterPaths } from "../src/data/topicClusters";
import { dynamicArticleRedirectSlugs } from "../src/data/dynamicArticleSeo";
import videoLibrary from "../src/data/videoLibrary";
import { STATIC_VIDEO_UPDATED_AT } from "../src/data/publicCmsConstants";
import { getPageMetadata, toDateOnly } from "../src/data/pageMetadata";
import { companyProfile } from "../src/lib/siteTrust";
import { isStaticVideoPlayable } from "../src/lib/videoAssets";

const APP_FILE_PATH = path.resolve("src/App.tsx");
const OUTPUT_FILE_PATH = path.resolve("public/sitemap.xml");
const ENV_PATH = path.resolve(".env");
const DEFAULT_LASTMOD = companyProfile.trustReviewDate;

const EXCLUDED_STATIC_PATHS = new Set<string>([
  "/solutions/auto-body-painting",
  "/solutions/parts-painting",
  "/solutions/industrial-coating",
  "/resources/knowledge/atex-spray-painting-booth",
]);

const SERVICE_SLUGS = [
  "solution-design",
  "project-management",
  "commissioning",
  "maintenance",
  "training",
  "consulting",
] as const;

interface SitemapEnv {
  supabaseUrl?: string;
  publishableKey?: string;
  publicProductsCmsEnabled: boolean;
  publicVideosCmsEnabled: boolean;
}

interface SitemapUrlEntry {
  lastModified: string;
  url: string;
}

function normalizeEnvValue(value: string): string {
  const trimmed = value.trim();

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

async function readDotEnvFile(filePath: string): Promise<Record<string, string>> {
  try {
    const raw = await readFile(filePath, "utf8");
    const entries: Record<string, string> = {};

    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) {
        continue;
      }

      const separatorIndex = trimmed.indexOf("=");
      if (separatorIndex === -1) {
        continue;
      }

      const key = trimmed.slice(0, separatorIndex).trim();
      const value = normalizeEnvValue(trimmed.slice(separatorIndex + 1));

      if (key) {
        entries[key] = value;
      }
    }

    return entries;
  } catch {
    return {};
  }
}

function getEnvValue(env: Record<string, string>, key: string): string | undefined {
  const processValue = process.env[key];
  if (typeof processValue === "string" && processValue.trim()) {
    return normalizeEnvValue(processValue);
  }

  const fileValue = env[key];
  if (typeof fileValue === "string" && fileValue.trim()) {
    return normalizeEnvValue(fileValue);
  }

  return undefined;
}

function isEnabled(value: string | undefined): boolean {
  return value?.trim().toLowerCase() === "true";
}

async function loadSitemapEnv(): Promise<SitemapEnv> {
  const envFromFile = await readDotEnvFile(ENV_PATH);

  return {
    supabaseUrl: getEnvValue(envFromFile, "VITE_SUPABASE_URL"),
    publishableKey: getEnvValue(envFromFile, "VITE_SUPABASE_PUBLISHABLE_KEY"),
    publicProductsCmsEnabled: isEnabled(getEnvValue(envFromFile, "VITE_ENABLE_PUBLIC_PRODUCTS_CMS")),
    publicVideosCmsEnabled: isEnabled(getEnvValue(envFromFile, "VITE_ENABLE_PUBLIC_VIDEOS_CMS")),
  };
}

async function fetchSupabaseRows(
  env: SitemapEnv,
  table: string,
  searchParams: Record<string, string>,
): Promise<Array<Record<string, unknown>>> {
  if (!env.supabaseUrl || !env.publishableKey) {
    return [];
  }

  const url = new URL(`/rest/v1/${table}`, env.supabaseUrl);
  Object.entries(searchParams).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url, {
    headers: {
      apikey: env.publishableKey,
      Authorization: `Bearer ${env.publishableKey}`,
      Accept: "application/json",
    },
  }).catch((error: unknown) => {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`Skipped ${table} sitemap fetch: ${message}`);
    return null;
  });

  if (!response) {
    return [];
  }

  if (!response.ok) {
    const details = await response.text();
    console.warn(`Skipped ${table} sitemap fetch (${response.status}): ${details}`);
    return [];
  }

  const data = await response.json();
  return Array.isArray(data) ? (data as Array<Record<string, unknown>>) : [];
}

function extractStaticPublicPaths(appSource: string): string[] {
  const paths = new Set<string>(["/"]);
  const routeMatches = appSource.matchAll(/path="([^"]+)"/g);

  for (const [, routePath] of routeMatches) {
    if (!routePath || routePath.startsWith("/")) {
      continue;
    }

    if (routePath === "*" || routePath.includes(":")) {
      continue;
    }

    const normalizedPath = normalizePublicPath(routePath);

    if (isAlwaysNoindexPath(normalizedPath) || EXCLUDED_STATIC_PATHS.has(normalizedPath)) {
      continue;
    }

    paths.add(normalizedPath);
  }

  return Array.from(paths);
}

function resolveRowLastModified(row: Record<string, unknown>) {
  return (
    toDateOnly(typeof row.updated_at === "string" ? row.updated_at : null) ||
    toDateOnly(typeof row.published_at === "string" ? row.published_at : null) ||
    null
  );
}

function buildStaticLastModified(pathname: string) {
  return getPageMetadata(pathname)?.updatedAt || DEFAULT_LASTMOD;
}

async function extractKnownDynamicPaths(env: SitemapEnv): Promise<{
  lastModifiedByPath: Map<string, string>;
  paths: string[];
}> {
  const paths = new Set<string>();
  const lastModifiedByPath = new Map<string, string>();

  const addPath = (pathname: string, lastModified?: string | null) => {
    const normalizedPath = normalizePublicPath(pathname);
    paths.add(normalizedPath);

    if (lastModified) {
      lastModifiedByPath.set(normalizedPath, lastModified);
    }
  };

  Object.keys(solutions).forEach((slug) => {
    addPath(`/solutions/${slug}`);
  });

  Object.entries(industries).forEach(([slug, data]) => {
    if (!data.comingSoon) {
      addPath(`/industries/${slug}`);
    }
  });

  getAllTopicClusterPaths().forEach((pathname) => {
    addPath(pathname);
  });

  SERVICE_SLUGS.forEach((slug) => {
    addPath(`/services/${slug}`);
  });

  videoLibrary.forEach((video) => {
    if (!env.publicVideosCmsEnabled && isStaticVideoPlayable(video)) {
      addPath(`/videos/${video.id}`, toDateOnly(STATIC_VIDEO_UPDATED_AT));
    }
  });

  const [solutionRows, industryRows, resourceRows, productRows, videoRows] = await Promise.all([
    fetchSupabaseRows(env, "solution_pages", {
      select: "slug,updated_at",
      slug: "not.is.null",
    }),
    fetchSupabaseRows(env, "industry_pages", {
      select: "slug,coming_soon,updated_at",
      slug: "not.is.null",
    }),
    fetchSupabaseRows(env, "resources_posts", {
      select: "slug,category,published_at,updated_at",
      slug: "not.is.null",
      status: "eq.published",
    }),
    env.publicProductsCmsEnabled
      ? fetchSupabaseRows(env, "products_posts", {
          select: "slug,published_at,updated_at",
          slug: "not.is.null",
          status: "eq.published",
          is_visible: "eq.true",
        })
      : Promise.resolve([]),
    env.publicVideosCmsEnabled
      ? fetchSupabaseRows(env, "videos", {
          select: "slug,published_at,updated_at",
          slug: "not.is.null",
          status: "eq.published",
          is_visible: "eq.true",
        })
      : Promise.resolve([]),
  ]);

  solutionRows.forEach((row) => {
    const slug = typeof row.slug === "string" ? row.slug : "";
    if (slug) {
      addPath(`/solutions/${slug}`, resolveRowLastModified(row));
    }
  });

  industryRows.forEach((row) => {
    const slug = typeof row.slug === "string" ? row.slug : "";
    const comingSoon = row.coming_soon === true;
    if (slug && !comingSoon) {
      addPath(`/industries/${slug}`, resolveRowLastModified(row));
    }
  });

  resourceRows.forEach((row) => {
    const slug = typeof row.slug === "string" ? row.slug : "";
    const category = typeof row.category === "string" ? row.category : "";

    if (!slug || dynamicArticleRedirectSlugs.has(slug)) {
      return;
    }

    const resourcePath =
      category === "glossary"
        ? `/resources/glossary/${slug}`
        : `/resources/articles/${slug}`;

    addPath(resourcePath, resolveRowLastModified(row));
  });

  productRows.forEach((row) => {
    const slug = typeof row.slug === "string" ? row.slug : "";
    if (slug) {
      addPath(`/products/${slug}`, resolveRowLastModified(row));
    }
  });

  videoRows.forEach((row) => {
    const slug = typeof row.slug === "string" ? row.slug : "";
    if (slug) {
      addPath(`/videos/${slug}`, resolveRowLastModified(row));
    }
  });

  return {
    lastModifiedByPath,
    paths: Array.from(paths),
  };
}

function buildSitemapXml(entries: SitemapUrlEntry[]): string {
  const urlNodes = entries
    .map((entry) =>
      [
        "  <url>",
        `    <loc>${entry.url}</loc>`,
        `    <lastmod>${entry.lastModified}</lastmod>`,
        "  </url>",
      ].join("\n"),
    )
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    "<!-- Generated by scripts/generate-sitemap.ts. Do not edit manually. -->",
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urlNodes,
    "</urlset>",
    "",
  ].join("\n");
}

async function main() {
  const env = await loadSitemapEnv();
  const appSource = await readFile(APP_FILE_PATH, "utf8");
  const staticPaths = extractStaticPublicPaths(appSource);
  const { paths: dynamicPaths, lastModifiedByPath } = await extractKnownDynamicPaths(env);
  const publicPaths = Array.from(new Set([...staticPaths, ...dynamicPaths]));

  const urlEntries = publicPaths.flatMap((pathname) => {
    const lastModified = lastModifiedByPath.get(pathname) || buildStaticLastModified(pathname);
    return getIndexableUrlsForPath(pathname).map((url) => ({
      lastModified,
      url,
    }));
  });

  const uniqueSortedEntries = Array.from(
    new Map(urlEntries.map((entry) => [entry.url, entry])).values(),
  ).sort((left, right) => left.url.localeCompare(right.url));

  const xml = buildSitemapXml(uniqueSortedEntries);

  await mkdir(path.dirname(OUTPUT_FILE_PATH), { recursive: true });
  await writeFile(OUTPUT_FILE_PATH, xml, "utf8");

  console.log(`Generated sitemap with ${uniqueSortedEntries.length} URLs at ${OUTPUT_FILE_PATH}`);
}

main().catch((error) => {
  console.error("Failed to generate sitemap.");
  console.error(error);
  process.exitCode = 1;
});
