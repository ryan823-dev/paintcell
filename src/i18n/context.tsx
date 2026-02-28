import { createContext, useContext, useState, useEffect, type ReactNode, useCallback } from "react";
import { Locale, defaultLocale, isValidLocale } from "./types";
import { getTranslation, TranslationKeys } from "./translations";

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationKeys;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

/**
 * Detect initial locale from URL path, then localStorage, then browser language.
 * URL is the primary source of truth for SEO.
 */
function detectInitialLocale(): Locale {
  // 1. URL path: /:lang/...
  const pathSegment = window.location.pathname.split("/")[1];
  if (isValidLocale(pathSegment)) return pathSegment;

  // 2. localStorage (returning visitor preference)
  const saved = localStorage.getItem("locale");
  if (saved && isValidLocale(saved)) return saved;

  // 3. Browser language
  const browserLang = navigator.language.split("-")[0];
  if (isValidLocale(browserLang)) return browserLang;

  return defaultLocale;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectInitialLocale);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("locale", l);
    document.documentElement.lang = l;
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const t = getTranslation(locale);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
