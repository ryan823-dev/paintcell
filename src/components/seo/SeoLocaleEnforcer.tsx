import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  buildLocalizedUrl,
  getCanonicalLocaleForPath,
  getIndexableLocalesForPath,
  isAlwaysNoindexPath,
  stripLocalePrefix,
} from "@/lib/seo";
import { useRouteLocale } from "@/hooks/useRouteLocale";

const SEO_ENFORCER_ATTRIBUTE = "data-seo-enforcer";

function ensureCanonicalTag(canonicalUrl: string) {
  const canonicalTags = Array.from(
    document.head.querySelectorAll('link[rel="canonical"]'),
  ) as HTMLLinkElement[];

  let canonicalTag =
    canonicalTags.find((tag) => tag.getAttribute(SEO_ENFORCER_ATTRIBUTE) === "true") ?? null;

  if (!canonicalTag) {
    canonicalTag = document.createElement("link");
    canonicalTag.rel = "canonical";
    canonicalTag.setAttribute(SEO_ENFORCER_ATTRIBUTE, "true");
    document.head.appendChild(canonicalTag);
  }

  if (canonicalTag.href !== canonicalUrl) {
    canonicalTag.href = canonicalUrl;
  }

  for (const tag of canonicalTags) {
    if (tag !== canonicalTag) {
      tag.remove();
    }
  }
}

function syncRobotsTag(shouldNoindex: boolean) {
  const robotsTags = Array.from(
    document.head.querySelectorAll('meta[name="robots"]'),
  ) as HTMLMetaElement[];
  const pageManagedRobotsTags = robotsTags.filter(
    (tag) => tag.getAttribute(SEO_ENFORCER_ATTRIBUTE) !== "true",
  );
  const hasPageLevelNoindex = pageManagedRobotsTags.some((tag) =>
    tag.content.toLowerCase().includes("noindex"),
  );

  if (hasPageLevelNoindex) {
    for (const tag of robotsTags) {
      if (tag.getAttribute(SEO_ENFORCER_ATTRIBUTE) === "true") {
        tag.remove();
      }
    }
    return;
  }

  if (!shouldNoindex) {
    for (const tag of robotsTags) {
      if (tag.getAttribute(SEO_ENFORCER_ATTRIBUTE) === "true") {
        tag.remove();
      }
    }
    return;
  }

  let robotsTag =
    robotsTags.find((tag) => tag.getAttribute(SEO_ENFORCER_ATTRIBUTE) === "true") ?? null;

  if (!robotsTag) {
    robotsTag = document.createElement("meta");
    robotsTag.name = "robots";
    robotsTag.setAttribute(SEO_ENFORCER_ATTRIBUTE, "true");
    document.head.appendChild(robotsTag);
  }

  if (robotsTag.content !== "noindex,follow") {
    robotsTag.content = "noindex,follow";
  }

  for (const tag of robotsTags) {
    if (tag !== robotsTag) {
      tag.remove();
    }
  }
}

function isSeoManagedNode(node: Node): boolean {
  if (!(node instanceof Element)) {
    return false;
  }

  if (node.matches('link[rel="canonical"], meta[name="robots"]')) {
    return true;
  }

  return Boolean(node.querySelector('link[rel="canonical"], meta[name="robots"]'));
}

export function SeoLocaleEnforcer() {
  const location = useLocation();
  const locale = useRouteLocale();

  useEffect(() => {
    const pathWithoutLocale = stripLocalePrefix(location.pathname);
    const canonicalLocale = getCanonicalLocaleForPath(pathWithoutLocale, locale);
    const canonicalUrl = buildLocalizedUrl(canonicalLocale, pathWithoutLocale);
    const indexableLocales = getIndexableLocalesForPath(pathWithoutLocale);
    const shouldNoindex =
      isAlwaysNoindexPath(pathWithoutLocale) || !indexableLocales.includes(locale);

    const applySeoPolicy = () => {
      ensureCanonicalTag(canonicalUrl);
      syncRobotsTag(shouldNoindex);
    };

    applySeoPolicy();

    const observer = new MutationObserver((mutations) => {
      const shouldReapply = mutations.some((mutation) => {
        if (mutation.type === "attributes") {
          return isSeoManagedNode(mutation.target);
        }

        return (
          Array.from(mutation.addedNodes).some(isSeoManagedNode) ||
          Array.from(mutation.removedNodes).some(isSeoManagedNode)
        );
      });

      if (shouldReapply) {
        applySeoPolicy();
      }
    });

    observer.observe(document.head, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["href", "content", "rel", "name"],
    });

    return () => {
      observer.disconnect();
    };
  }, [locale, location.pathname]);

  return null;
}
