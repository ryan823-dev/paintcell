export type Locale = "en" | "ja" | "th" | "ru" | "es";

export const locales: Locale[] = ["en", "ja", "th", "ru", "es"];

export const localeNames: Record<Locale, string> = {
  en: "English",
  ja: "日本語",
  th: "ไทย",
  ru: "Русский",
  es: "Español",
};

export const localeFlags: Record<Locale, string> = {
  en: "🇺🇸",
  ja: "🇯🇵",
  th: "🇹🇭",
  ru: "🇷🇺",
  es: "🇪🇸",
};

export const defaultLocale: Locale = "en";
