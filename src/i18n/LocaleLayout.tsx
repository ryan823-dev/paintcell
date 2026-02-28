import { useEffect } from "react";
import { Outlet, Navigate, useParams, useLocation } from "react-router-dom";
import { useI18n } from "./context";
import { isValidLocale, defaultLocale, Locale } from "./types";

/**
 * Route layout component that:
 * 1. Reads `:lang` from URL params
 * 2. Validates it's a supported locale
 * 3. If invalid, redirects to default locale with the full original path preserved
 * 4. Syncs the URL locale to the i18n context
 */
export function LocaleLayout() {
  const { lang } = useParams<{ lang: string }>();
  const { setLocale } = useI18n();
  const location = useLocation();

  const isValid = isValidLocale(lang);

  useEffect(() => {
    if (isValid && lang) {
      setLocale(lang as Locale);
    }
  }, [lang, isValid, setLocale]);

  if (!isValid) {
    // Redirect old URLs (e.g. /industries/automotive-painting)
    // to locale-prefixed versions (e.g. /en/industries/automotive-painting)
    return (
      <Navigate
        to={`/${defaultLocale}${location.pathname}${location.search}${location.hash}`}
        replace
      />
    );
  }

  return <Outlet />;
}

/**
 * Redirects the bare root "/" to "/:locale/" based on:
 * 1. localStorage (returning visitor)
 * 2. Browser language
 * 3. Default locale (en)
 */
export function RootRedirect() {
  const saved = localStorage.getItem("locale");
  if (saved && isValidLocale(saved)) {
    return <Navigate to={`/${saved}`} replace />;
  }

  const browserLang = navigator.language.split("-")[0];
  if (isValidLocale(browserLang)) {
    return <Navigate to={`/${browserLang}`} replace />;
  }

  return <Navigate to={`/${defaultLocale}`} replace />;
}
