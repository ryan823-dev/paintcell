import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { chromium, type Page } from "playwright";

const SITE_URL = "https://tdpaint.com";
const DIST_DIR = path.resolve("dist");
const FALLBACK_HTML_PATH = path.join(DIST_DIR, "index.html");
const require = createRequire(import.meta.url);
const PLAYWRIGHT_PACKAGE_JSON_PATH = require.resolve("playwright/package.json");
const PLAYWRIGHT_CLI_PATH = path.join(path.dirname(PLAYWRIGHT_PACKAGE_JSON_PATH), "cli.js");

const MIME_TYPES: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

let stdoutAvailable = true;
let stderrAvailable = true;
let playwrightInstallPromise: Promise<void> | null = null;

function markStreamClosed(error: unknown, streamType: "stdout" | "stderr") {
  const code = (error as NodeJS.ErrnoException | undefined)?.code;

  if (code === "EPIPE") {
    if (streamType === "stdout") {
      stdoutAvailable = false;
    } else {
      stderrAvailable = false;
    }
    return;
  }

  throw error;
}

process.stdout.on("error", (error) => {
  markStreamClosed(error, "stdout");
});

process.stderr.on("error", (error) => {
  markStreamClosed(error, "stderr");
});

function formatLogMessage(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }

  if (value instanceof Error) {
    return value.stack || `${value.name}: ${value.message}`;
  }

  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

function safeWrite(stream: NodeJS.WriteStream, message: string, streamType: "stdout" | "stderr") {
  const streamAvailable = streamType === "stdout" ? stdoutAvailable : stderrAvailable;

  if (!streamAvailable || stream.destroyed || !stream.writable) {
    return;
  }

  try {
    stream.write(`${message}\n`);
  } catch (error) {
    markStreamClosed(error, streamType);
  }
}

function logInfo(message: unknown) {
  safeWrite(process.stdout, formatLogMessage(message), "stdout");
}

function logError(message: unknown) {
  safeWrite(process.stderr, formatLogMessage(message), "stderr");
}

function normalizeRoutePath(routePath: string): string {
  const normalized = `/${routePath.replace(/^\/+/, "").replace(/\/+/g, "/")}`.replace(/\/$/, "");
  return normalized === "" ? "/" : normalized;
}

function getOutputPath(routePath: string): string {
  if (routePath === "/") {
    return FALLBACK_HTML_PATH;
  }

  return path.join(DIST_DIR, routePath.replace(/^\/+/, ""), "index.html");
}

function getMimeType(filePath: string): string {
  return MIME_TYPES[path.extname(filePath).toLowerCase()] || "application/octet-stream";
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function readAssetWithRetry(filePath: string, attempts = 5, delayMs = 150) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      return await readFile(filePath);
    } catch (error) {
      const code = (error as NodeJS.ErrnoException).code;

      if (code !== "ENOENT" || attempt === attempts - 1) {
        if (code === "ENOENT") {
          return null;
        }

        throw error;
      }

      await wait(delayMs);
    }
  }

  return null;
}

async function runProcess(command: string, args: string[]) {
  await new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      env: process.env,
    });

    child.once("error", reject);
    child.once("close", (code, signal) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(
        new Error(
          `Command failed: ${command} ${args.join(" ")} (code: ${code ?? "unknown"}, signal: ${signal ?? "none"})`,
        ),
      );
    });
  });
}

async function installChromiumBrowser() {
  if (!playwrightInstallPromise) {
    playwrightInstallPromise = (async () => {
      logInfo("Playwright Chromium not found. Installing browser for prerender...");
      const installArgs =
        process.platform === "linux"
          ? [PLAYWRIGHT_CLI_PATH, "install", "--with-deps", "chromium"]
          : [PLAYWRIGHT_CLI_PATH, "install", "chromium"];

      await runProcess(process.execPath, installArgs);
      logInfo("Playwright Chromium installation complete.");
    })();
  }

  try {
    await playwrightInstallPromise;
  } finally {
    playwrightInstallPromise = null;
  }
}

async function ensureChromiumBrowser() {
  const executablePath = chromium.executablePath();

  if (await fileExists(executablePath)) {
    return;
  }

  logInfo(`Playwright Chromium executable is missing at ${executablePath}.`);
  await installChromiumBrowser();
}

async function launchChromiumBrowser() {
  await ensureChromiumBrowser();

  try {
    return await chromium.launch({ headless: true });
  } catch (error) {
    const message = formatLogMessage(error);

    const needsBrowserRepair =
      message.includes("Executable doesn't exist") ||
      message.includes("error while loading shared libraries") ||
      message.includes("libnspr4.so");

    if (!needsBrowserRepair) {
      throw error;
    }

    logError("Chromium launch failed because the browser or its system dependencies are missing. Retrying after install.");
    await installChromiumBrowser();
    return chromium.launch({ headless: true });
  }
}

async function parseRoutesFromSitemap(): Promise<string[]> {
  const sitemapPath = path.join(DIST_DIR, "sitemap.xml");
  const sitemapXml = await readFile(sitemapPath, "utf8");
  const matches = sitemapXml.matchAll(/<loc>https:\/\/tdpaint\.com(\/[^<]*)<\/loc>/g);
  const routes = new Set<string>(["/"]);

  for (const match of matches) {
    routes.add(normalizeRoutePath(match[1] || "/"));
  }

  return Array.from(routes);
}

async function createFallbackServer() {
  const fallbackHtml = await readFile(FALLBACK_HTML_PATH);

  const server = createServer(async (request, response) => {
    try {
      const requestUrl = new URL(request.url || "/", "http://127.0.0.1");
      const pathname = decodeURIComponent(requestUrl.pathname);
      const relativePath = pathname.replace(/^\/+/, "");
      const candidatePath = path.resolve(DIST_DIR, relativePath);
      const isWithinDist = candidatePath.startsWith(DIST_DIR);
      const shouldServeAsset = path.extname(pathname) !== "";

      if (shouldServeAsset && isWithinDist) {
        const fileBuffer = await readAssetWithRetry(candidatePath);

        if (fileBuffer) {
          response.writeHead(200, { "Content-Type": getMimeType(candidatePath) });
          response.end(fileBuffer);
          return;
        }

        response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        response.end("Prerender asset not found");
        logError(`Missing prerender asset: ${pathname}`);
        return;
      }

      if (!shouldServeAsset && isWithinDist && await fileExists(candidatePath)) {
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        response.end(fallbackHtml);
        return;
      }

      if (shouldServeAsset) {
        response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        response.end("Prerender asset out of bounds");
        logError(`Rejected prerender asset outside dist: ${pathname}`);
        return;
      }

      response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      response.end(fallbackHtml);
    } catch (error) {
      response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Prerender server error");
      logError("Failed to serve prerender request.");
      logError(error);
    }
  });

  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => resolve());
  });

  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("Failed to determine prerender server address.");
  }

  return {
    baseUrl: `http://127.0.0.1:${address.port}`,
    close: () =>
      new Promise<void>((resolve, reject) => {
        server.close((error) => {
          if (error) {
            reject(error);
            return;
          }
          resolve();
        });
      }),
  };
}

async function prerenderRoute(browserPage: Page, baseUrl: string, routePath: string) {
  const routeUrl = `${baseUrl}${routePath}`;

  await browserPage.goto(routeUrl, { waitUntil: "domcontentloaded", timeout: 60000 });
  try {
    await browserPage.waitForFunction((expectedPath) => {
      const targetPath = expectedPath === "/" ? "/" : expectedPath.replace(/\/$/, "");
      const currentPath = window.location.pathname === "/" ? "/" : window.location.pathname.replace(/\/$/, "");
      const root = document.getElementById("root");
      const canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      const textLength = root?.textContent?.replace(/\s+/g, " ").trim().length || 0;
      const hasStructuredContent =
        Boolean(document.querySelector("#root h1, #root main, #root article")) || textLength > 200;
      const pathReady = targetPath === "/" ? currentPath.length > 0 : currentPath === targetPath;

      return Boolean(
        root &&
        root.childElementCount > 0 &&
        pathReady &&
        hasStructuredContent &&
        canonical?.href &&
        document.title.trim().length > 0,
      );
    }, routePath, { timeout: 30000 });
  } catch (error) {
    const debugState = await browserPage.evaluate(() => {
      const root = document.getElementById("root");
      return {
        currentPath: window.location.pathname,
        title: document.title,
        canonical: (document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null)?.href || "",
        rootChildren: root?.childElementCount || 0,
        textLength: root?.textContent?.replace(/\s+/g, " ").trim().length || 0,
        hasH1: Boolean(document.querySelector("#root h1")),
        hasMain: Boolean(document.querySelector("#root main")),
        hasArticle: Boolean(document.querySelector("#root article")),
      };
    });

    logError(`Route readiness check failed for ${routePath}.`);
    logError(debugState);
    throw error;
  }
  await browserPage.waitForTimeout(800);

  await browserPage.evaluate((siteUrl) => {
    const normalizedSiteUrl = siteUrl.replace(/\/$/, "");
    const currentUrl = new URL(window.location.href);
    const currentPath = currentUrl.pathname;
    const locale = currentPath.split("/").filter(Boolean)[0] || "en";
    const fallbackCanonical = `${normalizedSiteUrl}${currentPath}`.replace(/\/$/, "") || normalizedSiteUrl;

    const canonicalTags = Array.from(
      document.head.querySelectorAll('link[rel="canonical"]'),
    ) as HTMLLinkElement[];
    const canonicalTag =
      canonicalTags.find((node) => node.getAttribute("data-seo-enforcer") === "true") ??
      canonicalTags[0] ??
      document.createElement("link");

    canonicalTag.rel = "canonical";
    canonicalTag.href = canonicalTag.href || fallbackCanonical;

    if (!canonicalTags.length) {
      document.head.appendChild(canonicalTag);
    }

    canonicalTags.slice(1).forEach((node) => node.remove());

    const canonicalUrl = canonicalTag.href || fallbackCanonical;
    const title = document.title;
    const description =
      (document.head.querySelector('meta[name="description"]') as HTMLMetaElement | null)?.content || "";
    const robotsTags = Array.from(
      document.head.querySelectorAll('meta[name="robots"]'),
    ) as HTMLMetaElement[];
    const primaryRobotsTag =
      robotsTags.find((node) => node.getAttribute("data-seo-enforcer") === "true") ??
      robotsTags[0] ??
      null;

    document.documentElement.lang = locale;
    document.querySelectorAll('script[data-page-schema="true"]').forEach((node) => node.remove());

    if (primaryRobotsTag) {
      robotsTags.forEach((node) => {
        if (node !== primaryRobotsTag) {
          node.remove();
        }
      });
    }

    const metaUpdates = [
      title ? { attribute: "property", key: "og:title", content: title } : null,
      title ? { attribute: "name", key: "twitter:title", content: title } : null,
      description ? { attribute: "property", key: "og:description", content: description } : null,
      description ? { attribute: "name", key: "twitter:description", content: description } : null,
      canonicalUrl ? { attribute: "property", key: "og:url", content: canonicalUrl } : null,
    ].filter(Boolean) as Array<{ attribute: "name" | "property"; key: string; content: string }>;

    for (const metaUpdate of metaUpdates) {
      const selector = `meta[${metaUpdate.attribute}="${metaUpdate.key}"]`;
      const metaTags = Array.from(document.head.querySelectorAll(selector)) as HTMLMetaElement[];
      const metaTag = metaTags[0] ?? document.createElement("meta");

      metaTag.setAttribute(metaUpdate.attribute, metaUpdate.key);
      metaTag.setAttribute("content", metaUpdate.content);

      if (!metaTags.length) {
        document.head.appendChild(metaTag);
      }

      metaTags.slice(1).forEach((node) => node.remove());
    }
  }, SITE_URL);

  const html = await browserPage.content();
  const outputPath = getOutputPath(routePath);

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, "utf8");
}

async function main() {
  const routeFilter = process.env.PRERENDER_FILTER?.trim();
  const routes = (await parseRoutesFromSitemap()).filter((routePath) =>
    routeFilter ? routePath === routeFilter : true,
  );
  const fallbackServer = await createFallbackServer();
  const browser = await launchChromiumBrowser();
  const page = await browser.newPage();
  const pageErrors: string[] = [];

  page.on("pageerror", (error) => {
    pageErrors.push(`pageerror: ${error.message}`);
  });

  page.on("console", (message) => {
    if (message.type() === "error") {
      pageErrors.push(`console: ${message.text()}`);
    }
  });

  logInfo(`Prerendering ${routes.length} routes from ${SITE_URL}...`);

  try {
    for (const [index, routePath] of routes.entries()) {
      logInfo(`  [${index + 1}/${routes.length}] ${routePath}`);
      await prerenderRoute(page, fallbackServer.baseUrl, routePath);
    }
  } finally {
    if (pageErrors.length > 0) {
      logError("Browser errors captured during prerender:");
      for (const pageError of pageErrors.slice(-20)) {
        logError(`  ${pageError}`);
      }
    }
    await page.close();
    await browser.close();
    await fallbackServer.close();
  }

  logInfo("Prerender complete.");
}

main().catch((error) => {
  logError("Prerender failed.");
  logError(error);
  process.exitCode = 1;
});
