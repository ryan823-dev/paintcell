import { getSiteShellContent, type SiteShellContent } from "@/content/site-shell";
import { useRouteLocale } from "./useRouteLocale";

export function useSiteShellContent(): SiteShellContent {
  const locale = useRouteLocale();

  return getSiteShellContent(locale);
}
