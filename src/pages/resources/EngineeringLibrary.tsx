import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { ResourcePageLayout } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";
import { ArrowRight, BookOpen, FileText, HelpCircle } from "lucide-react";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Engineering Library | Paint Cell Engineering Notes",
  "description": "Engineering-first notes on feasibility, constraints, and readiness for robotic spray painting paint cells.",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "/" },
      { "@type": "ListItem", "position": 2, "name": "Resources", "item": "/resources" },
      { "@type": "ListItem", "position": 3, "name": "Engineering Library" }
    ]
  }
};

export default function EngineeringLibrary() {
  return (
    <ResourcePageLayout
      title="Engineering Library"
      metaTitle="Engineering Library | Paint Cell Engineering Notes"
      metaDescription="Engineering-first notes on feasibility, constraints, and readiness for robotic spray painting paint cells."
      breadcrumbs={[
        { label: "Resources", href: "/resources/engineering-library" },
        { label: "Engineering Library" },
      ]}
      structuredData={structuredData}
    >
      <p className="text-lg text-muted-foreground mb-10">
        Engineering notes for paint cell feasibility, constraints, and project readiness. Written to support engineering-led evaluation—not marketing claims.
      </p>

      <ContentSection title="Explore">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link
            to="/resources/engineering-library/insights"
            className="group p-6 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-all"
          >
            <BookOpen className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              Insights
            </h3>
            <p className="text-sm text-muted-foreground">
              Short engineering viewpoints and boundary-setting notes
            </p>
          </Link>
          <Link
            to="/resources/engineering-library/guides-checklists"
            className="group p-6 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-all"
          >
            <FileText className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              Guides & Checklists
            </h3>
            <p className="text-sm text-muted-foreground">
              Practical evaluation steps and preparation templates
            </p>
          </Link>
          <Link
            to="/resources/engineering-library/faqs"
            className="group p-6 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-all"
          >
            <HelpCircle className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              FAQs
            </h3>
            <p className="text-sm text-muted-foreground">
              Concise answers to common engineering questions
            </p>
          </Link>
        </div>
      </ContentSection>

      <ContentSection title="Featured">
        <ul className="space-y-4">
          <li>
            <Link
              to="/resources/guides/paint-cell-feasibility-checks"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
            >
              <ArrowRight className="h-4 w-4" />
              Robotic Spray Painting Feasibility: 10 Engineering Checks Before You Automate
            </Link>
          </li>
          <li>
            <Link
              to="/resources/insights/automation-boundary-spray-painting"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
            >
              <ArrowRight className="h-4 w-4" />
              Automation Boundary in Spray Painting: What to Automate vs Keep Manual
            </Link>
          </li>
          <li>
            <Link
              to="/resources/engineering-library/faqs"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
            >
              <ArrowRight className="h-4 w-4" />
              Paint Cell FAQs: Feasibility, Site Readiness, and What We Need From You
            </Link>
          </li>
        </ul>
      </ContentSection>

      <ContentSection title="Start with your project context">
        <p className="text-muted-foreground mb-4">
          If you already have clear requirements, use the configurator. If you're unsure where to start, use project consultation.
        </p>
      </ContentSection>
    </ResourcePageLayout>
  );
}
