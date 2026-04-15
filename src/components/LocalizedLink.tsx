import { forwardRef } from "react";
import {
  Link as RouterLink,
  LinkProps,
  NavLink as RouterNavLink,
  NavLinkProps,
} from "react-router-dom";
import { useRouteLocale } from "@/hooks/useRouteLocale";

/**
 * Prepend the current locale to an absolute path.
 * Skips external URLs, anchors, mailto, and console paths.
 */
function localizeHref(to: string, locale: string): string {
  // Don't touch external, hash, mailto, or console links
  if (
    !to.startsWith("/") ||
    to.startsWith("/console")
  ) {
    return to;
  }

  // Already has locale prefix — don't double-prefix
  const prefix = `/${locale}`;
  if (to === prefix || to.startsWith(prefix + "/")) {
    return to;
  }

  return `/${locale}${to}`;
}

/**
 * Drop-in replacement for react-router-dom's <Link>.
 * Automatically prepends the current locale to the `to` prop.
 */
export const LocalizedLink = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, ...props }, ref) => {
    const locale = useRouteLocale();

    const localizedTo =
      typeof to === "string" ? localizeHref(to, locale) : to;

    return <RouterLink ref={ref} to={localizedTo} {...props} />;
  },
);
LocalizedLink.displayName = "LocalizedLink";

/**
 * Drop-in replacement for react-router-dom's <NavLink>.
 * Automatically prepends the current locale to the `to` prop.
 */
export const LocalizedNavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ to, ...props }, ref) => {
    const locale = useRouteLocale();

    const localizedTo =
      typeof to === "string" ? localizeHref(to, locale) : to;

    return <RouterNavLink ref={ref} to={localizedTo} {...props} />;
  },
);
LocalizedNavLink.displayName = "LocalizedNavLink";

export { localizeHref };
