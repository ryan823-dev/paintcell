import { ReactNode, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";
import {
  buildLocalizedUrl,
  getCanonicalLocaleForPath,
  normalizePublicPath,
  SITE_URL,
  stripLocalePrefix,
} from "@/lib/seo";
import { TopicClusterNavigator } from "@/components/seo/TopicClusterNavigator";
import { useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ResourceTrustPanel } from "./ResourceTrustPanel";
import { companyProfile, getResourceTrustDefaults, type ResourceTrustMeta } from "@/lib/siteTrust";
import { getPageMetadata } from "@/data/pageMetadata";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ResourcePageLayoutProps {
  title: string;
  metaTitle: string;
  metaDescription: string;
  breadcrumbs: BreadcrumbItem[];
  children: ReactNode;
  showCTA?: boolean;
  structuredData?: object;
  canonicalPath?: string;
  trustMeta?: ResourceTrustMeta;
}

export function ResourcePageLayout({
  title,
  metaTitle,
  metaDescription,
  breadcrumbs,
  children,
  showCTA = true,
  structuredData,
  canonicalPath,
  trustMeta,
}: ResourcePageLayoutProps) {
  const { locale, t } = useI18n();
  const location = useLocation();
  const resourceLayoutT = t.resourceLayout || {};
  const resolvedPath = normalizePublicPath(
    canonicalPath || stripLocalePrefix(location.pathname) || breadcrumbs[breadcrumbs.length - 1]?.href || "/",
  );
  const canonicalLocale = getCanonicalLocaleForPath(resolvedPath, locale);
  const canonicalUrl = buildLocalizedUrl(canonicalLocale, resolvedPath);
  const schemaLanguage = resolvedPath.startsWith("/resources") ? "en" : locale;
  const resourcesLabel = resourceLayoutT.resources || t.common.resources || "Resources";
  const normalizedBreadcrumbs = (() => {
    if (!resolvedPath.startsWith("/resources") || resolvedPath === "/resources") {
      return breadcrumbs;
    }

    const rewrittenBreadcrumbs = breadcrumbs.map((item, index) => {
      const normalizedHref = item.href ? normalizePublicPath(item.href) : undefined;

      if (index === 0 && item.label === resourcesLabel) {
        return {
          ...item,
          href: "/resources",
        };
      }

      return normalizedHref ? { ...item, href: normalizedHref } : item;
    });

    const hasResourcesBreadcrumb = rewrittenBreadcrumbs.some((item) => {
      if ((item.href && normalizePublicPath(item.href) === "/resources") || item.label === resourcesLabel) {
        return true;
      }

      return false;
    });

    if (hasResourcesBreadcrumb) {
      return rewrittenBreadcrumbs;
    }

    return [{ label: resourcesLabel, href: "/resources" }, ...rewrittenBreadcrumbs];
  })();
  const showTrustPanel = resolvedPath.startsWith("/resources") || resolvedPath.startsWith("/case-studies");
  const pageMeta = getPageMetadata(resolvedPath);

  const effectiveTrustMeta = useMemo(() => {
    if (!showTrustPanel) {
      return null;
    }

    const defaultTrustMeta = getResourceTrustDefaults(resolvedPath);
    const structuredRecords = (() => {
      if (!structuredData || typeof structuredData !== "object") {
        return [] as Array<Record<string, unknown>>;
      }

      const isRecord = (value: unknown): value is Record<string, unknown> =>
        typeof value === "object" && value !== null && !Array.isArray(value);

      const pushRecord = (value: unknown, list: Array<Record<string, unknown>>) => {
        if (isRecord(value)) {
          list.push(value);
        }
      };

      const records: Array<Record<string, unknown>> = [];
      pushRecord(structuredData, records);

      if (isRecord(structuredData) && Array.isArray(structuredData["@graph"])) {
        structuredData["@graph"].forEach((item) => pushRecord(item, records));
      }

      return records;
    })();

    const extractAuthorName = () => {
      const isRecord = (value: unknown): value is Record<string, unknown> =>
        typeof value === "object" && value !== null && !Array.isArray(value);

      for (const record of structuredRecords) {
        const author = record.author;

        if (typeof author === "string" && author.trim()) {
          return author;
        }

        if (Array.isArray(author)) {
          for (const item of author) {
            if (typeof item === "string" && item.trim()) {
              return item;
            }

            if (isRecord(item) && typeof item.name === "string" && item.name.trim()) {
              return item.name;
            }
          }
        }

        if (isRecord(author) && typeof author.name === "string" && author.name.trim()) {
          return author.name;
        }
      }

      return undefined;
    };

    const extractUpdatedAt = () => {
      for (const record of structuredRecords) {
        if (typeof record.dateModified === "string" && record.dateModified.trim()) {
          return record.dateModified;
        }
      }

      for (const record of structuredRecords) {
        if (typeof record.datePublished === "string" && record.datePublished.trim()) {
          return record.datePublished;
        }
      }

      return undefined;
    };

    return {
      ...defaultTrustMeta,
      authorName:
        trustMeta?.authorName ||
        extractAuthorName() ||
        pageMeta?.authorName ||
        defaultTrustMeta.authorName ||
        companyProfile.authorTeamName,
      updatedAt: trustMeta?.updatedAt || extractUpdatedAt() || pageMeta?.updatedAt,
      reviewedBy: trustMeta?.reviewedBy,
      reviewedAt: trustMeta?.reviewedAt,
      scope: trustMeta?.scope || defaultTrustMeta.scope,
      useWith: trustMeta?.useWith || defaultTrustMeta.useWith,
      limitations: trustMeta?.limitations || defaultTrustMeta.limitations,
      sourceBasis: trustMeta?.sourceBasis || pageMeta?.sourceBasis || defaultTrustMeta.sourceBasis,
      publisherName: trustMeta?.publisherName || defaultTrustMeta.publisherName,
      publisherLocation: trustMeta?.publisherLocation || defaultTrustMeta.publisherLocation,
      contactEmail: trustMeta?.contactEmail || defaultTrustMeta.contactEmail || companyProfile.primaryEmail,
      sourceLinks: trustMeta?.sourceLinks || defaultTrustMeta.sourceLinks,
    } satisfies ResourceTrustMeta;
  }, [pageMeta, resolvedPath, showTrustPanel, structuredData, trustMeta]);

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    "name": companyProfile.brandName,
    "legalName": companyProfile.legalName,
    "url": SITE_URL,
    "logo": `${SITE_URL}/images/td-logo.png`,
    "image": `${SITE_URL}/images/og-social-share.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "email": companyProfile.primaryEmail,
      "contactType": "Customer Service"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": `${companyProfile.headquarters.streetAddress}, ${companyProfile.headquarters.district}`,
      "addressLocality": companyProfile.headquarters.city,
      "addressCountry": companyProfile.headquarters.countryCode,
    },
    "inLanguage": schemaLanguage,
  };

  // Generate BreadcrumbList schema for SEO/AEO
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
      "position": 1,
        "name": resourceLayoutT.home || t.common.home,
        "item": buildLocalizedUrl(canonicalLocale, "/")
      },
      ...normalizedBreadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        ...(item.href ? { "item": buildLocalizedUrl(canonicalLocale, item.href) } : {})
      }))
    ]
  };

  // SpeakableSpecification for voice search (AEO)
  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "SpeakableSpecification",
    "cssSelector": [".prose", "h1"],
    "inLanguage": schemaLanguage,
  };

  useEffect(() => {
    document.title = metaTitle;
    const metaDescEl = document.querySelector('meta[name="description"]');
    if (metaDescEl) {
      metaDescEl.setAttribute("content", metaDescription);
    }

    // Add structured data
    if (structuredData) {
      const existingScript = document.querySelector('script[data-page-schema]');
      if (existingScript) {
        existingScript.remove();
      }
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-page-schema", "true");
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
      
      return () => {
        script.remove();
      };
    }
  }, [metaTitle, metaDescription, structuredData]);

  const handleConsultationClick = () => {
    const assistantButton = document.querySelector('[data-assistant-trigger]');
    if (assistantButton instanceof HTMLElement) {
      assistantButton.click();
    }
  };

  return (
    <div className="min-h-screen">
      {/* SEO Structured Data via Helmet */}
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(speakableSchema)}</script>
        {structuredData && (
          <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        )}
      </Helmet>

      {/* Breadcrumb */}
      <div className="border-b border-border bg-muted/30">
        <div className="container-wide py-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">{resourceLayoutT.home || t.common.home}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {normalizedBreadcrumbs.map((item, index) => (
                <BreadcrumbItem key={index}>
                  <BreadcrumbSeparator />
                  {item.href ? (
                    <BreadcrumbLink asChild>
                      <Link to={item.href}>{item.label}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Content */}
      <div className="container-narrow py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
          {title}
        </h1>

        {effectiveTrustMeta ? (
          <ResourceTrustPanel
            labels={{
              title: resourceLayoutT.trustTitle || "Content trust and applicability",
              author: resourceLayoutT.authorLabel || "Author",
              updated: resourceLayoutT.updatedLabel || "Last updated",
              publisher: resourceLayoutT.publisherLabel || "Publisher",
              contact: resourceLayoutT.contactLabel || "Contact",
              scope: resourceLayoutT.scopeLabel || "Scope",
              useWith: resourceLayoutT.useWithLabel || "Best used for",
              limitations: resourceLayoutT.limitationsLabel || "Use with caution",
              sourceBasis: resourceLayoutT.sourceBasisLabel || "Evidence basis",
            }}
            trust={effectiveTrustMeta}
          />
        ) : null}
        
        <div className="prose prose-slate max-w-none">
          {children}
        </div>

        <div className="mt-12">
          <TopicClusterNavigator currentPath={resolvedPath} />
        </div>

        {/* CTA Block */}
        {showCTA && (
          <div className="mt-16 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleConsultationClick}
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
              >
                {resourceLayoutT.startConsultation || "Start a project consultation"}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
              <Button asChild variant="outline">
                <Link to="/quote">{resourceLayoutT.configurePaintCell || "Configure your paint cell"}</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
