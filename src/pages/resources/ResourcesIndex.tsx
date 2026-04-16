import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { ResourcePageLayout, ContentSection } from "@/components/resources";
import { ArrowRight, BookOpen, FileText, HelpCircle, Library, ShieldCheck } from "lucide-react";

const categoryCards = [
  {
    title: "Engineering Library",
    description: "Project-stage guidance, feasibility notes, insights, and FAQs for robotic paint cell evaluation.",
    href: "/resources/engineering-library",
    icon: BookOpen,
  },
  {
    title: "Standards & Compliance",
    description: "Ventilation, VOC handling, grounding, and safety constraints that shape scope and approvals.",
    href: "/resources/standards-compliance",
    icon: ShieldCheck,
  },
  {
    title: "Glossary",
    description: "Short definitions for common paint cell terms so teams can align on the same language.",
    href: "/resources/glossary",
    icon: Library,
  },
  {
    title: "Tools & Templates",
    description: "RFQ templates, readiness checklists, and planning tools for early project definition.",
    href: "/resources/tools-templates",
    icon: FileText,
  },
  {
    title: "Topic Clusters",
    description: "Connected guide, FAQ, glossary, scenario, industry, and solution paths around high-intent themes.",
    href: "/resources/topics",
    icon: HelpCircle,
  },
];

const featuredLinks = [
  {
    title: "Robotic Spray Painting Feasibility: 10 Engineering Checks Before You Automate",
    href: "/resources/guides/paint-cell-feasibility-checks",
  },
  {
    title: "Automation Boundary in Spray Painting: What to Automate vs Keep Manual",
    href: "/resources/insights/automation-boundary-spray-painting",
  },
  {
    title: "ATEX Zone Classification for Spray Painting Booths",
    href: "/resources/knowledge/atex-spray-painting-booth",
  },
  {
    title: "Paint Booth Design Basics",
    href: "/resources/knowledge/paint-booth-design-basics",
  },
];

export default function ResourcesIndex() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Paint Cell Resources",
    "description": "Browse engineering guidance, compliance notes, glossary terms, planning tools, and topic clusters for industrial paint cell projects.",
  };

  return (
    <ResourcePageLayout
      title="Resources"
      metaTitle="Resources | Paint Cell Engineering Library, Standards, Glossary, and Tools"
      metaDescription="Browse engineering guidance, compliance notes, glossary terms, planning tools, and topic clusters for industrial paint cell projects."
      breadcrumbs={[{ label: "Resources" }]}
      structuredData={structuredData}
      canonicalPath="/resources"
    >
      <p className="text-lg text-muted-foreground mb-10">
        Start here when the main question is still "where should we go next?" This page is meant to route you toward the
        right resource type quickly, whether you need a decision guide, a compliance constraint, a glossary term, or a planning tool.
      </p>

      <ContentSection title="Start here if...">
        <div className="grid gap-4 md:grid-cols-3 mb-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-lg font-semibold mb-2">You are still defining the project question</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Start with Engineering Library when the team needs feasibility logic, comparison pages, or decision support before equipment selection.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-lg font-semibold mb-2">You already know the issue is safety or compliance</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Go straight to Standards & Compliance when ventilation, solvent handling, grounding, or hazardous-area constraints are shaping the scope.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-lg font-semibold mb-2">You need a shared vocabulary or working template</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Use Glossary for terminology alignment and Tools & Templates when the next step is an RFQ, readiness check, or internal data collection.
            </p>
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Browse by category">
        <div className="grid md:grid-cols-2 gap-6">
          {categoryCards.map((card) => (
            <Link
              key={card.href}
              to={card.href}
              className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50 hover:bg-muted/30"
            >
              <card.icon className="h-8 w-8 text-primary mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {card.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-6">{card.description}</p>
            </Link>
          ))}
        </div>
      </ContentSection>

      <ContentSection title="Choose this section when...">
        <ul className="space-y-3 text-muted-foreground">
          <li><strong className="text-foreground">Engineering Library:</strong> you need a judgment page, feasibility note, FAQ, or comparison before commercial scope is fixed.</li>
          <li><strong className="text-foreground">Standards & Compliance:</strong> local EHS, airflow, VOC, grounding, or ATEX questions can change whether the concept is even viable.</li>
          <li><strong className="text-foreground">Glossary:</strong> the team is using the same words differently and that is slowing down decisions.</li>
          <li><strong className="text-foreground">Tools & Templates:</strong> the next practical step is collecting inputs, not reading more theory.</li>
          <li><strong className="text-foreground">Topic Clusters:</strong> you want one connected path across guide, FAQ, glossary, industry, and solution pages around a single high-intent theme.</li>
        </ul>
      </ContentSection>

      <ContentSection title="Popular starting points">
        <ul className="space-y-4">
          {featuredLinks.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
              >
                <ArrowRight className="h-4 w-4" />
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </ContentSection>
    </ResourcePageLayout>
  );
}
