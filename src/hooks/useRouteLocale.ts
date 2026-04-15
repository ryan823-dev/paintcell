import { useLocation, useParams } from "react-router-dom";
import { defaultLocale, isValidLocale, type Locale } from "@/i18n/types";
import { buildLocalizedUrl, getCanonicalLocaleForPath } from "@/lib/seo";

export function resolveLocale(pathname: string, routeLocale?: string): Locale {
  if (isValidLocale(routeLocale)) {
    return routeLocale;
  }

  const pathSegment = pathname.split("/")[1];
  if (isValidLocale(pathSegment)) {
    return pathSegment;
  }

  return defaultLocale;
}

export function useRouteLocale(): Locale {
  const location = useLocation();
  const { lang } = useParams<{ lang: string }>();

  return resolveLocale(location.pathname, lang);
}

export function useCanonicalLocaleForPath(pathname: string): Locale {
  const locale = useRouteLocale();
  return getCanonicalLocaleForPath(pathname, locale);
}

export function useCanonicalUrl(pathname: string): string {
  const canonicalLocale = useCanonicalLocaleForPath(pathname);
  return buildLocalizedUrl(canonicalLocale, pathname);
}
