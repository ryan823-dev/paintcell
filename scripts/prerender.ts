import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { JSDOM } from "jsdom";
import { defaultLocale, isValidLocale, localeHtmlLangs, type Locale } from "../src/i18n/types";
import {
  getIndexableLocalesForPath,
  getPrerenderLocalesForPath,
  normalizePublicPath,
  stripLocalePrefix,
} from "../src/lib/seo";

const SITE_URL = "https://tdpaint.com";
const DIST_DIR = path.resolve("dist");
const FALLBACK_HTML_PATH = path.join(DIST_DIR, "index.html");
const DEFAULT_LOCALE = defaultLocale;
const ROUTE_TIMEOUT_MS = 60_000;
const ROUTE_POLL_INTERVAL_MS = 50;
const ROUTE_STABLE_POLLS = 2;
const ROUTE_MIN_READY_AGE_MS = 50;
const ROUTE_NETWORK_IDLE_MS = 50;
const ENTRY_IMPORT_RETRY_COUNT = 5;
const ENTRY_IMPORT_RETRY_DELAY_MS = 1_000;
const EXTRA_PRERENDER_PATHS = ["/thank-you"] as const;
const PUBLIC_PAGE_PREFIXES = [
  "/about",
  "/applications",
  "/case-studies",
  "/cookies",
  "/industries",
  "/paint-cells",
  "/privacy",
  "/products",
  "/quote",
  "/resources",
  "/services",
  "/solutions",
  "/terms",
  "/thank-you",
  "/videos",
] as const;

const RUNTIME_ERROR_PATTERNS = [
  "404 Error: User attempted to access non-existent route:",
  "Hydration failed",
] as const;

let stdoutAvailable = true;
let stderrAvailable = true;

interface PrerenderRuntimeState {
  lastNetworkSettledAt: number;
  lastRouteChangeAt: number;
  pendingNetworkRequests: number;
}

const prerenderRuntimeState: PrerenderRuntimeState = {
  lastNetworkSettledAt: Date.now(),
  lastRouteChangeAt: Date.now(),
  pendingNetworkRequests: 0,
};

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

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function importEntryModuleWithRetry(entryModulePath: string) {
  const entryModuleUrl = pathToFileURL(entryModulePath).href;
  let lastError: unknown = null;

  for (let attempt = 1; attempt <= ENTRY_IMPORT_RETRY_COUNT; attempt += 1) {
    try {
      await import(`${entryModuleUrl}?prerenderAttempt=${attempt}`);
      return;
    } catch (error) {
      lastError = error;

      if (
        attempt >= ENTRY_IMPORT_RETRY_COUNT ||
        (error as NodeJS.ErrnoException | undefined)?.code !== "ERR_MODULE_NOT_FOUND"
      ) {
        throw error;
      }

      logInfo(
        `Entry module import failed because a build chunk was not ready yet. Retrying ${attempt}/${ENTRY_IMPORT_RETRY_COUNT - 1}...`,
      );
      await wait(ENTRY_IMPORT_RETRY_DELAY_MS);
    }
  }

  throw lastError;
}

function assignGlobal(key: string, value: unknown) {
  Object.defineProperty(globalThis, key, {
    configurable: true,
    writable: true,
    value,
  });
}

function getDocumentText(root: HTMLElement | null) {
  return root?.textContent?.replace(/\s+/g, " ").trim() || "";
}

function getPreferredMetaContent(
  document: Document,
  attribute: "name" | "property",
  key: string,
) {
  const tags = Array.from(
    document.head.querySelectorAll(`meta[${attribute}="${key}"]`),
  ) as HTMLMetaElement[];

  const preferredTag =
    tags.find((tag) => tag.getAttribute("data-rh") === "true") ||
    tags[tags.length - 1] ||
    null;

  return preferredTag?.content?.trim() || "";
}

function getRouteDebugState(document: Document) {
  const root = document.getElementById("root");
  const main = document.querySelector("#root main");
  const h1 = document.querySelector("#root h1");
  const description = getPreferredMetaContent(document, "name", "description");
  const pendingNetworkRequests = prerenderRuntimeState.pendingNetworkRequests;
  const routeReadyAgeMs = Date.now() - prerenderRuntimeState.lastRouteChangeAt;

  return {
    bodyText: getDocumentText(root),
    canonical: document.head.querySelector('link[rel="canonical"]')?.getAttribute("href") || "",
    currentPath: normalizeRoutePath(new URL(document.URL).pathname),
    description,
    h1Text: h1?.textContent?.trim() || "",
    hasArticle: Boolean(document.querySelector("#root article")),
    hasH1: Boolean(h1),
    htmlLang: document.documentElement.lang || "",
    hasMain: Boolean(main),
    isNetworkIdle:
      pendingNetworkRequests === 0 &&
      Date.now() - prerenderRuntimeState.lastNetworkSettledAt >= ROUTE_NETWORK_IDLE_MS,
    localeReady: document.documentElement.dataset.localeReady || "",
    mainText: getDocumentText(main as HTMLElement | null),
    mainTextLength: getDocumentText(main as HTMLElement | null).length,
    pendingNetworkRequests,
    robots: (document.head.querySelector('meta[name="robots"]') as HTMLMetaElement | null)?.content || "",
    rootChildren: root?.childElementCount || 0,
    routeReadyAgeMs,
    textLength: getDocumentText(root).length,
    title: document.title.trim(),
  };
}

function getRouteSeoExpectation(routePath: string) {
  const normalizedRoutePath = normalizeRoutePath(routePath);
  const routeSegments = normalizedRoutePath.split("/").filter(Boolean);
  const routeLocale = isValidLocale(routeSegments[0]) ? routeSegments[0] : null;
  const publicPath = normalizePublicPath(stripLocalePrefix(normalizedRoutePath));
  const expectedLocale = routeLocale ?? DEFAULT_LOCALE;
  const expectedHtmlLang = localeHtmlLangs[expectedLocale];
  const requiresNoindex =
    routeLocale !== null && !getIndexableLocalesForPath(publicPath).includes(routeLocale);

  return {
    expectedHtmlLang,
    expectedLocale,
    expectedPath: normalizedRoutePath,
    requiresNoindex,
  };
}

function isRouteReady(routePath: string, debugState: ReturnType<typeof getRouteDebugState>) {
  const { expectedHtmlLang, expectedLocale, expectedPath, requiresNoindex } = getRouteSeoExpectation(routePath);
  const publicPath = normalizePublicPath(stripLocalePrefix(expectedPath));
  const requiresArticleReadiness = publicPath.startsWith("/resources/articles/");
  const hasStructuredContent =
    debugState.hasH1 || debugState.hasArticle || debugState.mainTextLength > 120;
  const robotsValue = debugState.robots.toLowerCase();
  const robotsReady = requiresNoindex ? robotsValue.includes("noindex") : !robotsValue.includes("noindex");
  const metadataReady = Boolean(debugState.title);
  const articleReady = requiresArticleReadiness
    ? debugState.hasH1 &&
      debugState.hasMain &&
      debugState.mainTextLength > 400 &&
      debugState.description.length > 40
    : true;

  return Boolean(
    debugState.rootChildren > 0 &&
    debugState.currentPath === expectedPath &&
    debugState.canonical &&
    debugState.htmlLang === expectedHtmlLang &&
    debugState.isNetworkIdle &&
    debugState.localeReady === expectedLocale &&
    debugState.routeReadyAgeMs >= ROUTE_MIN_READY_AGE_MS &&
    robotsReady &&
    metadataReady &&
    articleReady &&
    hasStructuredContent,
  );
}

function isNotFoundDocument(debugState: ReturnType<typeof getRouteDebugState>) {
  const bodyText = debugState.bodyText.toLowerCase();
  const h1Text = debugState.h1Text.trim();

  return (
    h1Text === "404" ||
    bodyText.includes("page not found") ||
    bodyText.includes("oops! page not found")
  );
}

function markRouteTransition() {
  prerenderRuntimeState.lastRouteChangeAt = Date.now();
  prerenderRuntimeState.lastNetworkSettledAt = Date.now();
}

function createAlwaysVisibleIntersectionObserverClass(window: Window & typeof globalThis) {
  return class AlwaysVisibleIntersectionObserver {
    private readonly callback: IntersectionObserverCallback;

    constructor(callback: IntersectionObserverCallback) {
      this.callback = callback;
    }

    disconnect() {}

    observe(target: Element) {
      const rect = target.getBoundingClientRect?.() || ({
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: 0,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      } as DOMRectReadOnly);

      const entry = {
        boundingClientRect: rect,
        intersectionRatio: 1,
        intersectionRect: rect,
        isIntersecting: true,
        rootBounds: null,
        target,
        time: Date.now(),
      } as IntersectionObserverEntry;

      queueMicrotask(() => {
        this.callback([entry], this as unknown as IntersectionObserver);
      });
    }

    takeRecords() {
      return [] as IntersectionObserverEntry[];
    }

    unobserve() {}
  };
}

function createResizeObserverClass() {
  return class ResizeObserverMock {
    disconnect() {}

    observe() {}

    unobserve() {}
  };
}

function cleanupTemplateDocument(document: Document) {
  document.getElementById("root")?.replaceChildren();

  document.head
    .querySelectorAll('[data-rh], [data-seo-enforcer], script[data-page-schema="true"], link[rel="canonical"], meta[name="robots"]')
    .forEach((node) => node.remove());
}

function setupPrerenderGlobals(window: Window & typeof globalThis) {
  assignGlobal("__PAINTCELL_PRERENDER__", true);

  for (const key of [
    "window",
    "self",
    "document",
    "navigator",
    "AbortController",
    "AbortSignal",
    "HTMLElement",
    "Node",
    "Element",
    "MutationObserver",
    "CustomEvent",
    "Event",
    "EventTarget",
    "History",
    "history",
    "location",
    "localStorage",
    "sessionStorage",
    "DOMParser",
    "PopStateEvent",
    "getComputedStyle",
    "requestAnimationFrame",
    "cancelAnimationFrame",
  ]) {
    assignGlobal(key, window[key as keyof typeof window]);
  }

  assignGlobal("IntersectionObserver", createAlwaysVisibleIntersectionObserverClass(window));
  assignGlobal("ResizeObserver", createResizeObserverClass());
  assignGlobal("IS_REACT_ACT_ENVIRONMENT", false);

  const originalRemoveChild = window.Node.prototype.removeChild;

  if (typeof originalRemoveChild === "function") {
    window.Node.prototype.removeChild = function (this: Node, child: Node) {
      if (child.parentNode !== this) {
        if (child.parentNode) {
          return originalRemoveChild.call(child.parentNode, child);
        }

        return child;
      }

      return originalRemoveChild.call(this, child);
    };
  }

  window.innerWidth = 1440;
  window.innerHeight = 900;
  window.scrollTo = () => {};
  window.matchMedia = (query: string) => ({
    matches: true,
    media: query,
    onchange: null,
    addEventListener: () => {},
    addListener: () => {},
    dispatchEvent: () => false,
    removeEventListener: () => {},
    removeListener: () => {},
  });

  const requestAnimationFrame =
    globalThis.requestAnimationFrame ||
    ((callback: FrameRequestCallback) => setTimeout(() => callback(Date.now()), 16));
  const cancelAnimationFrame =
    globalThis.cancelAnimationFrame || ((id: number) => clearTimeout(id));

  window.requestAnimationFrame = requestAnimationFrame;
  window.cancelAnimationFrame = cancelAnimationFrame;

  assignGlobal("requestAnimationFrame", requestAnimationFrame);
  assignGlobal("cancelAnimationFrame", cancelAnimationFrame);

  for (const key of [
    "Blob",
    "fetch",
    "FormData",
    "Headers",
    "Request",
    "Response",
    "TextDecoder",
    "TextEncoder",
    "URL",
    "URLSearchParams",
  ]) {
    if (key in globalThis) {
      assignGlobal(key, globalThis[key as keyof typeof globalThis]);
      if (!(key in window)) {
        Object.defineProperty(window, key, {
          configurable: true,
          writable: true,
          value: globalThis[key as keyof typeof globalThis],
        });
      }
    }
  }

  const baseFetch =
    typeof globalThis.fetch === "function" ? globalThis.fetch.bind(globalThis) : null;

  if (baseFetch) {
    // Keep async CMS-driven routes from serializing while their fetches are still in flight.
    const trackedFetch: typeof fetch = async (...args) => {
      prerenderRuntimeState.pendingNetworkRequests += 1;

      try {
        return await baseFetch(...args);
      } catch (error) {
        const requestUrl = getFetchRequestUrl(args[0]);
        const message = error instanceof Error ? error.message : String(error);
        logInfo(
          `Skipped network fetch during prerender${requestUrl ? ` (${requestUrl})` : ""}: ${message}`,
        );

        return new Response("[]", {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "X-PaintCell-Prerender-Fallback": "1",
          },
        });
      } finally {
        prerenderRuntimeState.pendingNetworkRequests = Math.max(
          0,
          prerenderRuntimeState.pendingNetworkRequests - 1,
        );
        prerenderRuntimeState.lastNetworkSettledAt = Date.now();
      }
    };

    assignGlobal("fetch", trackedFetch);
    Object.defineProperty(window, "fetch", {
      configurable: true,
      writable: true,
      value: trackedFetch,
    });
  }
}

function getFetchRequestUrl(input: Parameters<typeof fetch>[0]): string {
  if (typeof input === "string") {
    return input;
  }

  if (input instanceof URL) {
    return input.href;
  }

  if (typeof Request !== "undefined" && input instanceof Request) {
    return input.url;
  }

  return "";
}

async function parseRoutesFromSitemap(): Promise<string[]> {
  const sitemapPath = path.join(DIST_DIR, "sitemap.xml");
  const sitemapXml = await readFile(sitemapPath, "utf8");
  const matches = sitemapXml.matchAll(/<loc>https:\/\/tdpaint\.com(\/[^<]*)<\/loc>/g);
  const publicPaths = new Set<string>(["/", ...EXTRA_PRERENDER_PATHS]);

  for (const match of matches) {
    const routePath = normalizeRoutePath(match[1] || "/");
    const publicPath = normalizePublicPath(stripLocalePrefix(routePath));
    publicPaths.add(publicPath);
  }

  const routes = new Set<string>([]);

  for (const publicPath of Array.from(publicPaths).sort()) {
    for (const locale of getPrerenderLocalesForPath(publicPath)) {
      routes.add(`/${locale}${publicPath === "/" ? "" : publicPath}`);
    }
  }

  return Array.from(routes);
}

async function resolveEntryModulePath() {
  const html = await readFile(FALLBACK_HTML_PATH, "utf8");
  const match = html.match(/<script[^>]*type="module"[^>]*src="([^"]+)"/i);

  if (!match) {
    throw new Error(`Failed to locate the built entry module in ${FALLBACK_HTML_PATH}.`);
  }

  return {
    entryModulePath: path.resolve(DIST_DIR, `.${match[1]}`),
    templateHtml: html,
  };
}

function syncMetaTag(
  document: Document,
  attribute: "name" | "property",
  key: string,
  content: string,
) {
  const selector = `meta[${attribute}="${key}"]`;
  const metaTags = Array.from(document.head.querySelectorAll(selector)) as HTMLMetaElement[];
  const preferredTag =
    metaTags.find((tag) => tag.getAttribute("data-rh") === "true") ??
    metaTags[0] ??
    document.createElement("meta");

  preferredTag.setAttribute(attribute, key);
  preferredTag.content = content;

  if (!preferredTag.parentElement) {
    document.head.appendChild(preferredTag);
  }

  metaTags.forEach((tag) => {
    if (tag !== preferredTag) {
      tag.remove();
    }
  });
}

function collapseDuplicateRootAppShells(document: Document) {
  const root = document.getElementById("root");

  if (!root || root.children.length <= 1) {
    return;
  }

  const children = Array.from(root.children);
  const allChildrenLookLikeAppShells = children.every(
    (child) =>
      child instanceof HTMLElement &&
      child.classList.contains("min-h-screen") &&
      child.classList.contains("flex") &&
      child.classList.contains("flex-col"),
  );

  if (!allChildrenLookLikeAppShells) {
    return;
  }

  const latestShell = children[children.length - 1];
  root.replaceChildren(latestShell);
}

function normalizePrerenderedDocument(document: Document) {
  collapseDuplicateRootAppShells(document);

  const currentUrl = new URL(document.URL);
  const currentPath = currentUrl.pathname;
  const localeSegment = currentPath.split("/").filter(Boolean)[0];
  const locale: Locale = isValidLocale(localeSegment) ? localeSegment : DEFAULT_LOCALE;
  const normalizedSiteUrl = SITE_URL.replace(/\/$/, "");
  const canonicalFallback = `${SITE_URL}${currentPath}`.replace(/\/$/, "") || SITE_URL;
  const canonicalTags = Array.from(
    document.head.querySelectorAll('link[rel="canonical"]'),
  ) as HTMLLinkElement[];
  const canonicalTag =
    canonicalTags.find((tag) => tag.getAttribute("data-seo-enforcer") === "true") ??
    canonicalTags[0] ??
    document.createElement("link");

  canonicalTag.rel = "canonical";
  canonicalTag.href = canonicalTag.href || canonicalFallback;

  if (!canonicalTag.parentElement) {
    document.head.appendChild(canonicalTag);
  }

  canonicalTags.forEach((tag) => {
    if (tag !== canonicalTag) {
      tag.remove();
    }
  });

  const robotsTags = Array.from(
    document.head.querySelectorAll('meta[name="robots"]'),
  ) as HTMLMetaElement[];
  const preferredRobotsTag =
    robotsTags.find((tag) => tag.getAttribute("data-seo-enforcer") === "true") ??
    robotsTags[0] ??
    null;

  if (preferredRobotsTag) {
    robotsTags.forEach((tag) => {
      if (tag !== preferredRobotsTag) {
        tag.remove();
      }
    });
  }

  document.documentElement.lang = localeHtmlLangs[locale];
  document.querySelectorAll('script[data-page-schema="true"]').forEach((node) => node.remove());

  const h1Text = document.querySelector("#root h1")?.textContent?.replace(/\s+/g, " ").trim() || "";
  const leadParagraph =
    Array.from(document.querySelectorAll("#root main p"))
      .map((node) => node.textContent?.replace(/\s+/g, " ").trim() || "")
      .find((text) => text.length >= 60) || "";
  const fallbackDescription = (leadParagraph || getDocumentText(document.querySelector("#root main") as HTMLElement | null))
    .slice(0, 200)
    .trim();
  let title = document.title.trim();
  let description = getPreferredMetaContent(document, "name", "description");

  if ((!title || (!description && h1Text && !title.toLowerCase().includes(h1Text.toLowerCase()))) && h1Text) {
    title = `${h1Text} | TD Painting Systems`;
    document.title = title;
  }

  if (!description && fallbackDescription) {
    description = fallbackDescription;
  }

  syncMetaTag(document, "name", "description", description);

  if (title) {
    syncMetaTag(document, "property", "og:title", title);
    syncMetaTag(document, "name", "twitter:title", title);
  }

  if (description) {
    syncMetaTag(document, "property", "og:description", description);
    syncMetaTag(document, "name", "twitter:description", description);
  }

  syncMetaTag(document, "property", "og:url", canonicalTag.href || canonicalFallback);

  const shouldPrefixLocale = (pathname: string) => (
    PUBLIC_PAGE_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))
  );

  const rewriteSiteUrl = (value: string): string => {
    let parsed: URL;
    try {
      parsed = new URL(value);
    } catch {
      return value;
    }

    if (parsed.origin !== normalizedSiteUrl) {
      return value;
    }

    const pathname = normalizeRoutePath(parsed.pathname);

    if (
      pathname === `/${locale}` ||
      pathname.startsWith(`/${locale}/`) ||
      !shouldPrefixLocale(pathname)
    ) {
      return value;
    }

    parsed.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    return parsed.toString();
  };

  const rewriteStructuredDataValue = (value: unknown): unknown => {
    if (Array.isArray(value)) {
      return value.map((entry) => rewriteStructuredDataValue(entry));
    }

    if (value && typeof value === "object") {
      return Object.fromEntries(
        Object.entries(value as Record<string, unknown>).map(([key, entry]) => [
          key,
          rewriteStructuredDataValue(entry),
        ]),
      );
    }

    if (typeof value === "string") {
      return rewriteSiteUrl(value);
    }

    return value;
  };

  const jsonLdScripts = Array.from(
    document.head.querySelectorAll('script[type="application/ld+json"]'),
  ) as HTMLScriptElement[];

  for (const script of jsonLdScripts) {
    const raw = script.textContent?.trim();

    if (!raw) {
      continue;
    }

    try {
      const parsed = JSON.parse(raw);
      script.textContent = JSON.stringify(rewriteStructuredDataValue(parsed));
    } catch {
      // Ignore malformed or dynamically generated JSON-LD blocks.
    }
  }
}

async function waitForRouteReady(
  document: Document,
  routePath: string,
  runtimeErrors: string[],
) {
  const startedAt = Date.now();
  let stablePolls = 0;
  let lastSignature = "";

  while (Date.now() - startedAt < ROUTE_TIMEOUT_MS) {
    const debugState = getRouteDebugState(document);

    if (isRouteReady(routePath, debugState)) {
      if (isNotFoundDocument(debugState)) {
        throw new Error(
          `Route ${routePath} rendered the not-found page instead of the expected content.`,
        );
      }

      const signature = JSON.stringify({
        canonical: debugState.canonical,
        currentPath: debugState.currentPath,
        description: debugState.description,
        h1Text: debugState.h1Text,
        htmlLang: debugState.htmlLang,
        textLength: debugState.textLength,
        title: debugState.title,
      });

      stablePolls = signature === lastSignature ? stablePolls + 1 : 1;
      lastSignature = signature;

      if (stablePolls >= ROUTE_STABLE_POLLS) {
        return;
      }
    } else {
      stablePolls = 0;
      lastSignature = "";
    }

    await wait(ROUTE_POLL_INTERVAL_MS);
  }

  const debugState = getRouteDebugState(document);
  throw new Error(
    [
      `Route readiness check timed out for ${routePath}.`,
      formatLogMessage(debugState),
      runtimeErrors.length ? `Runtime errors:\n${runtimeErrors.join("\n")}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  );
}

async function main() {
  const routeFilterInput = process.env.PRERENDER_FILTER?.trim();
  const routeFilter = routeFilterInput === "/" ? `/${DEFAULT_LOCALE}` : routeFilterInput;
  const routes = (await parseRoutesFromSitemap()).filter((routePath) =>
    routeFilter ? routePath === routeFilter : true,
  );

  if (!routes.length) {
    throw new Error("No routes matched the current prerender filter.");
  }

  const { entryModulePath, templateHtml } = await resolveEntryModulePath();
  const dom = new JSDOM(templateHtml, {
    pretendToBeVisual: true,
    url: `${SITE_URL}${routes[0]}`,
  });
  const window = dom.window as unknown as Window & typeof globalThis;
  const runtimeErrors: string[] = [];

  cleanupTemplateDocument(window.document);
  setupPrerenderGlobals(window);

  window.addEventListener("error", (event) => {
    const message = event.error || event.message;
    const formatted = formatLogMessage(message);

    if (RUNTIME_ERROR_PATTERNS.some((pattern) => formatted.includes(pattern))) {
      return;
    }

    runtimeErrors.push(`error: ${formatted}`);
  });

  window.addEventListener("unhandledrejection", (event) => {
    runtimeErrors.push(`unhandledrejection: ${formatLogMessage(event.reason)}`);
  });

  logInfo(`Prerendering ${routes.length} routes from ${SITE_URL} with JSDOM...`);

  markRouteTransition();
  await importEntryModuleWithRetry(entryModulePath);

  for (const [index, routePath] of routes.entries()) {
    logInfo(`  [${index + 1}/${routes.length}] ${routePath}`);

    if (index > 0) {
      markRouteTransition();
      window.history.replaceState({}, "", routePath);
      window.dispatchEvent(new window.PopStateEvent("popstate"));
    }

    await waitForRouteReady(window.document, routePath, runtimeErrors);
    normalizePrerenderedDocument(window.document);
    await mkdir(path.dirname(getOutputPath(routePath)), { recursive: true });
    await writeFile(getOutputPath(routePath), dom.serialize(), "utf8");
  }

  if (runtimeErrors.length > 0) {
    logError("Runtime errors captured during prerender:");
    for (const runtimeError of runtimeErrors.slice(-20)) {
      logError(`  ${runtimeError}`);
    }
  }

  logInfo("Prerender complete.");
  process.exit(0);
}

main().catch((error) => {
  logError("Prerender failed.");
  logError(error);
  process.exitCode = 1;
});
