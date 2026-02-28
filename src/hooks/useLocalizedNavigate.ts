import { useNavigate, NavigateOptions, To } from "react-router-dom";
import { useI18n } from "@/i18n";
import { useCallback } from "react";

/**
 * Drop-in replacement for react-router-dom's useNavigate().
 * Automatically prepends the current locale to string paths.
 * Skips external URLs, console paths, and numeric (history) navigation.
 */
export function useLocalizedNavigate() {
  const navigate = useNavigate();
  const { locale } = useI18n();

  return useCallback(
    (to: To | number, options?: NavigateOptions) => {
      if (typeof to === "number") {
        return navigate(to);
      }

      if (typeof to === "string") {
        if (!to.startsWith("/") || to.startsWith("/console")) {
          return navigate(to, options);
        }

        const prefix = `/${locale}`;
        if (to === prefix || to.startsWith(prefix + "/")) {
          return navigate(to, options);
        }

        return navigate(`/${locale}${to}`, options);
      }

      // NavigateOptions object form — pass through
      return navigate(to, options);
    },
    [navigate, locale],
  );
}
