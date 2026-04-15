import { useNavigate, NavigateOptions, To } from "react-router-dom";
import { useCallback } from "react";
import { useRouteLocale } from "./useRouteLocale";
import { localizeHref } from "@/components/LocalizedLink";

/**
 * Drop-in replacement for react-router-dom's useNavigate().
 * Automatically prepends the current locale to string paths.
 * Skips external URLs, console paths, and numeric (history) navigation.
 */
export function useLocalizedNavigate() {
  const navigate = useNavigate();
  const locale = useRouteLocale();

  return useCallback(
    (to: To | number, options?: NavigateOptions) => {
      if (typeof to === "number") {
        return navigate(to);
      }

      if (typeof to === "string") {
        return navigate(localizeHref(to, locale), options);
      }

      // NavigateOptions object form — pass through
      return navigate(to, options);
    },
    [navigate, locale],
  );
}
