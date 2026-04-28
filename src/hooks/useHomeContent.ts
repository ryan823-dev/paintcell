import { getHomeContent, type HomeContent } from "@/content/home";
import { useI18n } from "@/i18n";
import { useRouteLocale } from "./useRouteLocale";
import { getFallbackTranslation } from "@/i18n/translations";

export function useHomeContent(): HomeContent {
  const { t } = useSafeI18n();
  const locale = useRouteLocale();

  return getHomeContent(locale, t);
}

function useSafeI18n() {
  try {
    return useI18n();
  } catch {
    return { t: getFallbackTranslation() };
  }
}
