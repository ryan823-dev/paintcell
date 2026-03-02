import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { ResourcePageLayout } from "@/components/resources";
import { ContentSection } from "@/components/resources";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n/context";

export default function GuidesChecklists() {
  const { t, locale } = useI18n();
  const res = t.resources?.guidesChecklists || {};
  const breadcrumbs = t.resources?.breadcrumbs || {};
  const sections = t.resources?.sections || {};
  const engLib = t.resources?.engineeringLibrary || {};

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": res.metaTitle || "Guides & Checklists | Engineering Library",
    "description": res.metaDesc || "Practical guides and checklists for evaluating and preparing paint cell projects.",
    "inLanguage": locale,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": breadcrumbs.home || "Home", "item": "/" },
        { "@type": "ListItem", "position": 2, "name": breadcrumbs.engineeringLibrary || "Engineering Library", "item": "/resources/engineering-library" },
        { "@type": "ListItem", "position": 3, "name": breadcrumbs.guidesChecklists || "Guides & Checklists" }
      ]
    }
  };

  return (
    <ResourcePageLayout
      title={res.title || "Guides & Checklists"}
      metaTitle={res.metaTitle || "Guides & Checklists | Engineering Library"}
      metaDescription={res.metaDesc || "Practical guides and checklists for evaluating and preparing paint cell projects."}
      breadcrumbs={[
        { label: breadcrumbs.engineeringLibrary || "Engineering Library", href: "/resources/engineering-library" },
        { label: breadcrumbs.guidesChecklists || "Guides & Checklists" },
      ]}
      structuredData={structuredData}
    >
      <p className="text-lg text-muted-foreground mb-10">
        {res.description || "Practical steps for feasibility and readiness checks. Built around real constraints: part presentation, takt/changeover, and site safety."}
      </p>

      <ContentSection title={sections.featuredGuide || "Featured guide"}>
        <div className="p-6 border border-border rounded-lg bg-muted/20">
          <Link
            to="/resources/guides/paint-cell-feasibility-checks"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold text-lg mb-2"
          >
            <ArrowRight className="h-5 w-5" />
            {engLib.links?.feasibilityChecks || "Robotic Spray Painting Feasibility: 10 Engineering Checks Before You Automate"}
          </Link>
          <p className="text-muted-foreground">
            {res.featuredLinkDesc || "A pre-engineering checklist to decide what must be validated before committing to a build."}
          </p>
        </div>
      </ContentSection>
    </ResourcePageLayout>
  );
}
