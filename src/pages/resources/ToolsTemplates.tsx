import { Link } from "react-router-dom";
import { ResourcePageLayout } from "@/components/resources";
import { ContentSection } from "@/components/resources";
import { ArrowRight, FileText, ClipboardCheck, CheckSquare } from "lucide-react";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Tools & Templates | Paint Cell Resources",
  "description": "Practical RFQ templates and checklists for paint cell feasibility and site readiness.",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "/" },
      { "@type": "ListItem", "position": 2, "name": "Resources", "item": "/resources" },
      { "@type": "ListItem", "position": 3, "name": "Tools & Templates" }
    ]
  }
};

export default function ToolsTemplates() {
  return (
    <ResourcePageLayout
      title="Tools & Templates"
      metaTitle="Tools & Templates | Paint Cell Resources"
      metaDescription="Practical RFQ templates and checklists for paint cell feasibility and site readiness."
      breadcrumbs={[
        { label: "Resources", href: "/resources/engineering-library" },
        { label: "Tools & Templates" },
      ]}
      structuredData={structuredData}
    >
      <p className="text-lg text-muted-foreground mb-10">
        Practical templates and checklists for engineering-led paint cell evaluations. These tools help capture constraints early and reduce rework.
      </p>

      <ContentSection title="Tools">
        <div className="space-y-4">
          <Link
            to="/resources/tools-templates/paint-cell-rfq-template"
            className="group flex items-start gap-4 p-6 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-all"
          >
            <FileText className="h-8 w-8 text-primary shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                Paint Cell RFQ Spec Template (Robotic Spray Painting)
              </h3>
              <p className="text-sm text-muted-foreground">
                A copy/paste template to collect minimum inputs for feasibility and scope review
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground mt-1 group-hover:text-primary transition-colors" />
          </Link>

          <Link
            to="/resources/tools-templates/site-readiness-checklist"
            className="group flex items-start gap-4 p-6 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-all"
          >
            <ClipboardCheck className="h-8 w-8 text-primary shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                Site Readiness Checklist for Paint Cell Projects
              </h3>
              <p className="text-sm text-muted-foreground">
                A concise checklist to confirm site constraints before committing to design
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground mt-1 group-hover:text-primary transition-colors" />
          </Link>

          <Link
            to="/resources/tools-templates/feasibility-checklist"
            className="group flex items-start gap-4 p-6 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-all"
          >
            <CheckSquare className="h-8 w-8 text-primary shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                Paint Cell Feasibility Checklist
              </h3>
              <p className="text-sm text-muted-foreground">
                A quick checklist to decide whether robotic spray painting is worth evaluating
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground mt-1 group-hover:text-primary transition-colors" />
          </Link>
        </div>
      </ContentSection>
    </ResourcePageLayout>
  );
}
