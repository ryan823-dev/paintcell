import { Helmet } from "react-helmet-async";
import { defaultLocale } from "@/i18n/types";
import {
  buildLocalizedUrl,
  getIndexableLocalesForPath,
  hreflangMap,
  isAlwaysNoindexPath,
  stripLocalePrefix,
} from "@/lib/seo";
import { useLocation } from "react-router-dom";

export function Hreflang() {
  const location = useLocation();
  const pathWithoutLocale = stripLocalePrefix(location.pathname);
  const indexableLocales = getIndexableLocalesForPath(pathWithoutLocale);

  if (isAlwaysNoindexPath(pathWithoutLocale) || indexableLocales.length === 0) {
    return null;
  }

  return (
    <Helmet>
      {indexableLocales.map((locale) => (
        <link
          key={locale}
          rel="alternate"
          hrefLang={hreflangMap[locale]}
          href={buildLocalizedUrl(locale, pathWithoutLocale)}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={buildLocalizedUrl(defaultLocale, pathWithoutLocale)}
      />
    </Helmet>
  );
}
