import { Locale } from "../types";
import { en } from "./en";
import { ja } from "./ja";
import { th } from "./th";
import { ru } from "./ru";
import { es } from "./es";
import { pt } from "./pt";
import { vi } from "./vi";
import { tr } from "./tr";
import { id } from "./id";

export type TranslationKeys = Record<string, Record<string, any>>;

const translations: Record<Locale, TranslationKeys> = { en, ja, th, ru, es, pt, vi, tr, id };

export function getTranslation(locale: Locale): TranslationKeys {
  return translations[locale] || en;
}
