import type { Locale } from "../types";
import { en } from "./en";
import { enOverlay } from "./overlays/en";

export type TranslationPrimitive = string | number | boolean | null;
export type TranslationValue = TranslationPrimitive | TranslationValue[] | TranslationKeys;
export type TranslationKeys = Record<string, TranslationValue>;

const cache = new Map<Locale, Promise<TranslationKeys>>();

function isTranslationObject(value: unknown): value is TranslationKeys {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function deepMerge<T extends TranslationKeys>(target: T, ...sources: TranslationKeys[]): T {
  const output: TranslationKeys = target;

  for (const source of sources) {
    if (!isTranslationObject(source)) continue;

    for (const [key, value] of Object.entries(source)) {
      const existingValue = output[key];

      if (
        isTranslationObject(value) &&
        isTranslationObject(existingValue)
      ) {
        output[key] = deepMerge({ ...existingValue }, value);
      } else {
        output[key] = value;
      }
    }
  }

  return target;
}

async function mergeWithEnglishFallback(
  loadBase: () => Promise<TranslationKeys>,
  loadOverlay: () => Promise<TranslationKeys>,
): Promise<TranslationKeys> {
  const [localeBase, localeOverlay] = await Promise.all([loadBase(), loadOverlay()]);

  return deepMerge({}, englishFallbackTranslation, localeBase ?? {}, localeOverlay ?? {}) as TranslationKeys;
}

function createMergedLocaleLoader(
  loadBase: () => Promise<TranslationKeys>,
  loadOverlay: () => Promise<TranslationKeys>,
) {
  return () => mergeWithEnglishFallback(loadBase, loadOverlay);
}

const englishFallbackTranslation = deepMerge({}, en, enOverlay) as TranslationKeys;

const loaders: Record<Locale, () => Promise<TranslationKeys>> = {
  en: () => Promise.resolve(englishFallbackTranslation),
  ja: createMergedLocaleLoader(
    () => import("./ja").then((m) => m.ja),
    () => import("./overlays/ja").then((m) => m.jaOverlay),
  ),
  th: createMergedLocaleLoader(
    () => import("./th").then((m) => m.th),
    () => import("./overlays/th").then((m) => m.thOverlay),
  ),
  ru: createMergedLocaleLoader(
    () => import("./ru").then((m) => m.ru),
    () => import("./overlays/ru").then((m) => m.ruOverlay),
  ),
  es: createMergedLocaleLoader(
    () => import("./es").then((m) => m.es),
    () => import("./overlays/es").then((m) => m.esOverlay),
  ),
  pt: createMergedLocaleLoader(
    () => import("./pt").then((m) => m.pt),
    () => import("./overlays/pt").then((m) => m.ptOverlay),
  ),
  vi: createMergedLocaleLoader(
    () => import("./vi").then((m) => m.vi),
    () => import("./overlays/vi").then((m) => m.viOverlay),
  ),
  tr: createMergedLocaleLoader(
    () => import("./tr").then((m) => m.tr),
    () => import("./overlays/tr").then((m) => m.trOverlay),
  ),
  id: createMergedLocaleLoader(
    () => import("./id").then((m) => m.id),
    () => import("./overlays/id").then((m) => m.idOverlay),
  ),
};

export function getFallbackTranslation(): TranslationKeys {
  return englishFallbackTranslation;
}

export async function loadTranslation(locale: Locale): Promise<TranslationKeys> {
  const cached = cache.get(locale);
  if (cached) return cached;

  const promise = loaders[locale]().catch((error) => {
    console.error(`Failed to load translations for locale "${locale}", falling back to English.`, error);
    return englishFallbackTranslation;
  });

  cache.set(locale, promise);
  return promise;
}
