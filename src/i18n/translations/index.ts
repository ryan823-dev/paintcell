import { Locale } from "../types";
import { en } from "./en";
import { ja } from "./ja";
import { th } from "./th";
import { ru } from "./ru";
import { es } from "./es";

export type TranslationKeys = Record<string, Record<string, string>>;

const translations: Record<Locale, TranslationKeys> = { en, ja, th, ru, es };

export function getTranslation(locale: Locale): TranslationKeys {
  return translations[locale] || en;
}
