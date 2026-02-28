export type Locale = "en" | "ja" | "th" | "ru" | "es" | "pt" | "vi" | "tr" | "id";

export const locales: Locale[] = ["en", "ja", "th", "ru", "es", "pt", "vi", "tr", "id"];

export const localeNames: Record<Locale, string> = {
  en: "English",
  ja: "日本語",
  th: "ไทย",
  ru: "Русский",
  es: "Español",
  pt: "Português",
  vi: "Tiếng Việt",
  tr: "Türkçe",
  id: "Bahasa Indonesia",
};

export const localeFlags: Record<Locale, string> = {
  en: "🇺🇸",
  ja: "🇯🇵",
  th: "🇹🇭",
  ru: "🇷🇺",
  es: "🇪🇸",
  pt: "🇧🇷",
  vi: "🇻🇳",
  tr: "🇹🇷",
  id: "🇮🇩",
};

export const defaultLocale: Locale = "en";

/** Type guard: check if a string is a valid Locale */
export function isValidLocale(value: string | undefined): value is Locale {
  return typeof value === "string" && (locales as string[]).includes(value);
}

/** Regex pattern matching all locale codes, used for URL parsing */
export const localePattern = locales.join("|");
