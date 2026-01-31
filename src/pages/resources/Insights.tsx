import { Link } from "react-router-dom";
import { ResourcePageLayout } from "@/components/resources";
import { ContentSection } from "@/components/resources";
import { ArrowRight } from "lucide-react";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Insights | Engineering Library",
  "description": "Engineering insights on paint cell boundaries, constraints, and decision-making.",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "/" },
      { "@type": "ListItem", "position": 2, "name": "Engineering Library", "item": "/resources/engineering-library" },
      { "@type": "ListItem", "position": 3, "name": "Insights" }
    ]
  }
};

export default function Insights() {
  return (
    <ResourcePageLayout
      title="Insights"
      metaTitle="Insights | Engineering Library"
      metaDescription="Engineering insights on paint cell boundaries, constraints, and decision-making."
      breadcrumbs={[
        { label: "Engineering Library", href: "/resources/engineering-library" },
        { label: "Insights" },
      ]}
      structuredData={structuredData}
    >
      <p className="text-lg text-muted-foreground mb-10">
        Short engineering viewpoints to help decision-makers set realistic scope and validation plans.
      </p>

      <ContentSection title="Featured">
        <div className="p-6 border border-border rounded-lg bg-muted/20">
          <Link
            to="/resources/insights/automation-boundary-spray-painting"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold text-lg mb-2"
          >
            <ArrowRight className="h-5 w-5" />
            Automation Boundary in Spray Painting: What to Automate vs Keep Manual
          </Link>
          <p className="text-muted-foreground">
            A practical scope guide to avoid underestimating prep, touch-up, and site routines.
          </p>
        </div>
      </ContentSection>
    </ResourcePageLayout>
  );
}
