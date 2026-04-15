import { defaultLocale, localeHtmlLangs, locales, type Locale } from "@/i18n/types";

export const SITE_URL = "https://tdpaint.com";

export const hreflangMap: Record<Locale, string> = localeHtmlLangs;

// Only keep routes here when their rendered content is fully locale-specific at build time.
export const multiLocaleIndexablePaths = ["/quote"] as const;
export const alwaysNoindexPaths = ["/thank-you", "/products/catalog"] as const;

const multiLocaleIndexablePathSet = new Set<string>(multiLocaleIndexablePaths);
const alwaysNoindexPathSet = new Set<string>(alwaysNoindexPaths);

export interface SeoPathPolicy {
  pathname: string;
  indexableLocales: Locale[];
  isAlwaysNoindex: boolean;
}

export function normalizePublicPath(pathname: string): string {
  const normalized = `/${pathname.replace(/^\/+/, "").replace(/\/+/g, "/")}`.replace(/\/$/, "");
  return normalized === "" ? "/" : normalized;
}

export function stripLocalePrefix(pathname: string): string {
  const normalized = normalizePublicPath(pathname);
  const regex = new RegExp(`^/(${locales.join("|")})(/|$)`);
  const stripped = normalized.replace(regex, "/");
  return normalizePublicPath(stripped);
}

export function buildLocalizedUrl(locale: Locale, pathname: string): string {
  const normalized = normalizePublicPath(pathname);
  return `${SITE_URL}/${locale}${normalized === "/" ? "" : normalized}`;
}

export function getSeoPathPolicy(pathname: string): SeoPathPolicy {
  const normalized = normalizePublicPath(pathname);
  const isAlwaysNoindex = alwaysNoindexPathSet.has(normalized);

  if (isAlwaysNoindex) {
    return {
      pathname: normalized,
      indexableLocales: [],
      isAlwaysNoindex,
    };
  }

  return {
    pathname: normalized,
    indexableLocales: multiLocaleIndexablePathSet.has(normalized) ? locales : [defaultLocale],
    isAlwaysNoindex,
  };
}

export function isAlwaysNoindexPath(pathname: string): boolean {
  return getSeoPathPolicy(pathname).isAlwaysNoindex;
}

export function getIndexableLocalesForPath(pathname: string): Locale[] {
  return getSeoPathPolicy(pathname).indexableLocales;
}

export function isLocaleIndexableForPath(pathname: string, locale: Locale): boolean {
  return getIndexableLocalesForPath(pathname).includes(locale);
}

export function shouldNoindexPath(pathname: string, locale: Locale): boolean {
  const policy = getSeoPathPolicy(pathname);
  return policy.isAlwaysNoindex || !policy.indexableLocales.includes(locale);
}

export function getCanonicalLocaleForPath(pathname: string, currentLocale: Locale): Locale {
  const indexableLocales = getIndexableLocalesForPath(pathname);
  if (indexableLocales.includes(currentLocale)) {
    return currentLocale;
  }
  return defaultLocale;
}

export function getIndexableUrlsForPath(pathname: string): string[] {
  const policy = getSeoPathPolicy(pathname);
  return policy.indexableLocales.map((locale) => buildLocalizedUrl(locale, policy.pathname));
}
