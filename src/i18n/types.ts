export type Locale = "en" | "ja" | "th" | "ru" | "es" | "pt" | "vi" | "tr" | "id";

export const locales: Locale[] = ["en", "ja", "th", "ru", "es", "pt", "vi", "tr", "id"];

export const localeNames: Record<Locale, string> = {
  en: "English",
  ja: "Japanese",
  th: "Thai",
  ru: "Russian",
  es: "Spanish",
  pt: "Portuguese (Brazil)",
  vi: "Vietnamese",
  tr: "Turkish",
  id: "Indonesian",
};

export const localeFlags: Record<Locale, string> = {
  en: "EN",
  ja: "JA",
  th: "TH",
  ru: "RU",
  es: "ES",
  pt: "PT",
  vi: "VI",
  tr: "TR",
  id: "ID",
};

export const localeHtmlLangs: Record<Locale, string> = {
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

export const defaultLocale: Locale = "en";

export function isValidLocale(value: string | undefined): value is Locale {
  return typeof value === "string" && (locales as string[]).includes(value);
}

export const localePattern = locales.join("|");
