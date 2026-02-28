import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { ResourcePageLayout } from "@/components/resources";
import { ContentSection } from "@/components/resources";
import { ArrowRight } from "lucide-react";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Guides & Checklists | Engineering Library",
  "description": "Practical guides and checklists for evaluating and preparing paint cell projects.",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "/" },
      { "@type": "ListItem", "position": 2, "name": "Engineering Library", "item": "/resources/engineering-library" },
      { "@type": "ListItem", "position": 3, "name": "Guides & Checklists" }
    ]
  }
};

export default function GuidesChecklists() {
  return (
    <ResourcePageLayout
      title="Guides & Checklists"
      metaTitle="Guides & Checklists | Engineering Library"
      metaDescription="Practical guides and checklists for evaluating and preparing paint cell projects."
      breadcrumbs={[
        { label: "Engineering Library", href: "/resources/engineering-library" },
        { label: "Guides & Checklists" },
      ]}
      structuredData={structuredData}
    >
      <p className="text-lg text-muted-foreground mb-10">
        Practical steps for feasibility and readiness checks. Built around real constraints: part presentation, takt/changeover, and site safety.
      </p>

      <ContentSection title="Featured guide">
        <div className="p-6 border border-border rounded-lg bg-muted/20">
          <Link
            to="/resources/guides/paint-cell-feasibility-checks"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold text-lg mb-2"
          >
            <ArrowRight className="h-5 w-5" />
            Robotic Spray Painting Feasibility: 10 Engineering Checks Before You Automate
          </Link>
          <p className="text-muted-foreground">
            A pre-engineering checklist to decide what must be validated before committing to a build.
          </p>
        </div>
      </ContentSection>
    </ResourcePageLayout>
  );
}
