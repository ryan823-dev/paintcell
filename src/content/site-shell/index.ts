import type { Locale } from "@/i18n/types";
import type { SiteShellContent } from "./types";
import { shellContent as enShellContent } from "./en";
import { shellContent as esShellContent } from "./es";
import { shellContent as idShellContent } from "./id";
import { shellContent as jaShellContent } from "./ja";
import { shellContent as ptShellContent } from "./pt";
import { shellContent as ruShellContent } from "./ru";
import { shellContent as thShellContent } from "./th";
import { shellContent as trShellContent } from "./tr";
import { shellContent as viShellContent } from "./vi";

export type { SiteShellContent } from "./types";

const siteShellContentByLocale: Record<Locale, SiteShellContent> = {
  en: enShellContent,
  es: esShellContent,
  id: idShellContent,
  ja: jaShellContent,
  pt: ptShellContent,
  ru: ruShellContent,
  th: thShellContent,
  tr: trShellContent,
  vi: viShellContent,
};

export function getSiteShellFallbackContent(): SiteShellContent {
  return enShellContent;
}

export function getSiteShellContent(locale: Locale): SiteShellContent {
  return siteShellContentByLocale[locale] ?? enShellContent;
}
