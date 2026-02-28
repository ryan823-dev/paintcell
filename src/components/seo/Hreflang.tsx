import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { locales, defaultLocale, Locale } from "@/i18n/types";

const SITE_URL = "https://tdpaintcell.com";

/**
 * Map locale codes to hreflang attribute values.
 * Can be extended for region-specific variants (e.g. "es-MX", "pt-BR").
 */
const hreflangMap: Record<Locale, string> = {
  en: "en",
  ja: "ja",
  th: "th",
  ru: "ru",
  es: "es",
  pt: "pt-BR",
  vi: "vi",
  tr: "tr",
  id: "id",
};

/**
 * Strip the locale prefix from the current pathname.
 * e.g. "/en/industries/automotive-painting" → "/industries/automotive-painting"
 */
function stripLocalePrefix(pathname: string): string {
  const regex = new RegExp(`^/(${locales.join("|")})(/|$)`);
  return pathname.replace(regex, "/").replace(/\/+/g, "/") || "/";
}

/**
 * Renders <link rel="alternate" hreflang="..."> tags for every supported locale
 * and an x-default pointing to the default locale.
 *
 * Place this component once inside a layout that renders on all public pages
 * (e.g. LocaleLayout or Layout).
 */
export function Hreflang() {
  const location = useLocation();
  const pathWithoutLocale = stripLocalePrefix(location.pathname);

  return (
    <Helmet>
      {locales.map((locale) => (
        <link
          key={locale}
          rel="alternate"
          hrefLang={hreflangMap[locale]}
          href={`${SITE_URL}/${locale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${SITE_URL}/${defaultLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`}
      />
    </Helmet>
  );
}
