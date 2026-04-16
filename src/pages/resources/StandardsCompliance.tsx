import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { ResourcePageLayout } from "@/components/resources";
import { ContentSection } from "@/components/resources";
import { Droplets, ShieldAlert, Wind, Zap } from "lucide-react";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Standards & Compliance | Paint Cell Resources",
  "description": "Safety and site constraints that shape paint cell design: ATEX zoning, ventilation, VOC/solvent handling, grounding, and static control.",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "/" },
      { "@type": "ListItem", "position": 2, "name": "Resources", "item": "/resources" },
      { "@type": "ListItem", "position": 3, "name": "Standards & Compliance" }
    ]
  }
};

export default function StandardsCompliance() {
  return (
    <ResourcePageLayout
      title="Standards & Compliance"
      metaTitle="Standards & Compliance | Paint Cell Resources"
      metaDescription="Safety and site constraints that shape paint cell design: ATEX zoning, ventilation, VOC/solvent handling, grounding, and static control."
      breadcrumbs={[
        { label: "Resources", href: "/resources/engineering-library" },
        { label: "Standards & Compliance" },
      ]}
      structuredData={structuredData}
    >
      <p className="text-lg text-muted-foreground mb-10">
        Safety and site constraints shape paint cell design and schedule. Requirements vary by jurisdiction and facility policy. Use these pages to identify ATEX, ventilation, solvent-handling, and grounding constraints early so the engineering scope stays realistic.
      </p>

      <ContentSection title="Topics">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <Link
            to="/resources/standards-compliance/atex-zone-classification-spray-painting-booth"
            className="group p-6 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-all"
          >
            <ShieldAlert className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              ATEX Zone Classification
            </h3>
            <p className="text-sm text-muted-foreground">
              Directive-focused guide to spray booth zoning, classified-space logic, and retrofit risk.
            </p>
          </Link>
          <Link
            to="/resources/standards-compliance/ventilation-airflow"
            className="group p-6 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-all"
          >
            <Wind className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              Ventilation & Airflow
            </h3>
            <p className="text-sm text-muted-foreground">
              How ventilation acts as a baseline constraint in paint cell design
            </p>
          </Link>
          <Link
            to="/resources/standards-compliance/voc-solvent-handling"
            className="group p-6 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-all"
          >
            <Droplets className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              VOC / Solvent Handling
            </h3>
            <p className="text-sm text-muted-foreground">
              Early constraints for VOC and solvent handling in paint cells
            </p>
          </Link>
          <Link
            to="/resources/standards-compliance/grounding-static-control"
            className="group p-6 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-all"
          >
            <Zap className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              Grounding & Static Control
            </h3>
            <p className="text-sm text-muted-foreground">
              Static control and grounding for safety and repeatability
            </p>
          </Link>
        </div>
      </ContentSection>
    </ResourcePageLayout>
  );
}
