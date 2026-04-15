import { getHomeContent, type HomeContent } from "@/content/home";
import { useI18n } from "@/i18n";
import { useRouteLocale } from "./useRouteLocale";

export function useHomeContent(): HomeContent {
  const { t } = useI18n();
  const locale = useRouteLocale();

  return getHomeContent(locale, t);
}
