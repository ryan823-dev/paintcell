import {
  createContext,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Locale, defaultLocale, isValidLocale, localeHtmlLangs } from "./types";
import { getFallbackTranslation, loadTranslation, TranslationKeys } from "./translations";

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationKeys;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

function detectInitialLocale(): Locale {
  const pathSegment = window.location.pathname.split("/")[1];
  if (isValidLocale(pathSegment)) return pathSegment;

  try {
    const saved = localStorage.getItem("locale");
    if (saved && isValidLocale(saved)) return saved;
  } catch (error) {
    console.warn("Failed to read saved locale, falling back to browser language.", error);
  }

  const browserLang = navigator.language.split("-")[0];
  if (isValidLocale(browserLang)) return browserLang;

  return defaultLocale;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectInitialLocale);
  const [translation, setTranslation] = useState<TranslationKeys>(() => getFallbackTranslation());

  const setLocale = useCallback((nextLocale: Locale) => {
    try {
      localStorage.setItem("locale", nextLocale);
    } catch (error) {
      console.warn("Failed to persist selected locale.", error);
    }
    setLocaleState(nextLocale);
  }, []);

  useEffect(() => {
    let cancelled = false;
    document.documentElement.lang = localeHtmlLangs[locale];
    document.documentElement.dataset.currentLocale = locale;
    document.documentElement.dataset.localeReady = "";

    loadTranslation(locale)
      .then((nextTranslation) => {
        if (cancelled) return;

        startTransition(() => {
          setTranslation(nextTranslation);
        });
        document.documentElement.dataset.localeReady = locale;
      })
      .catch((error) => {
        console.error(`Failed to resolve translations for locale "${locale}".`, error);
        if (cancelled) return;

        startTransition(() => {
          setTranslation(getFallbackTranslation());
        });
        document.documentElement.dataset.localeReady = locale;
      });

    return () => {
      cancelled = true;
      if (document.documentElement.dataset.currentLocale === locale) {
        delete document.documentElement.dataset.localeReady;
      }
    };
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: translation,
    }),
    [locale, setLocale, translation],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);

  if (!ctx) {
    if ((globalThis as { __PAINTCELL_PRERENDER__?: boolean }).__PAINTCELL_PRERENDER__) {
      return {
        locale: defaultLocale,
        setLocale: () => {},
        t: getFallbackTranslation(),
      };
    }

    throw new Error("useI18n must be used within I18nProvider");
  }

  return ctx;
}
