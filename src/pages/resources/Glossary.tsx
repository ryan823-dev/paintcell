import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { ResourcePageLayout } from "@/components/resources";
import { ContentSection } from "@/components/resources";
import { ArrowRight, BookOpen } from "lucide-react";
import { useI18n } from "@/i18n/context";

const glossaryTerms = [
  { term: "ATEX Certification", slug: "atex-certification" },
  { term: "Atomization", slug: "atomization" },
  { term: "Booth Airflow", slug: "booth-airflow" },
  { term: "Color Changeover", slug: "color-changeover" },
  { term: "Cure Time", slug: "cure-time" },
  { term: "Dry Film Thickness (DFT)", slug: "dry-film-thickness" },
  { term: "Electrostatic Spraying", slug: "electrostatic-spraying" },
  { term: "Film Build", slug: "film-build" },
  { term: "Flash-off Time", slug: "flash-off-time" },
  { term: "Gun Distance", slug: "gun-distance" },
  { term: "Hollow Wrist Robot", slug: "hollow-wrist" },
  { term: "HVLP (High Volume Low Pressure)", slug: "hvlp" },
  { term: "Orange Peel", slug: "orange-peel" },
  { term: "Overspray", slug: "overspray" },
  { term: "Paint Recipe", slug: "paint-recipe" },
  { term: "Spray Pattern", slug: "spray-pattern" },
  { term: "Takt Time", slug: "takt-time" },
  { term: "Teach Pendant", slug: "teach-pendant" },
  { term: "Transfer Efficiency", slug: "transfer-efficiency" },
  { term: "2K Paint", slug: "2k-paint" },
];

export default function Glossary() {
  const { t, locale } = useI18n();
  const res = t.resources?.glossary || {};
  const breadcrumbs = t.resources?.breadcrumbs || {};
  const sections = t.resources?.sections || {};

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": res.metaTitle || "Glossary | Paint Cell Terms",
    "description": res.metaDesc || "Short definitions for common paint cell engineering terms and why they matter.",
    "inLanguage": locale,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": breadcrumbs.home || "Home", "item": "/" },
        { "@type": "ListItem", "position": 2, "name": breadcrumbs.resources || "Resources", "item": "/resources" },
        { "@type": "ListItem", "position": 3, "name": breadcrumbs.glossary || "Glossary" }
      ]
    }
  };

  return (
    <ResourcePageLayout
      title={res.title || "Glossary"}
      metaTitle={res.metaTitle || "Glossary | Paint Cell Terms"}
      metaDescription={res.metaDesc || "Short definitions for common paint cell engineering terms and why they matter."}
      breadcrumbs={[
        { label: breadcrumbs.resources || "Resources", href: "/resources/engineering-library" },
        { label: breadcrumbs.glossary || "Glossary" },
      ]}
      structuredData={structuredData}
    >
      <p className="text-lg text-muted-foreground mb-10">
        {res.description || "Short, engineering-oriented definitions for common paint cell terms. Each term includes why it matters and what to watch for during feasibility assessment."}
      </p>

      <ContentSection title={sections.terms || "Terms"}>
        <div className="grid md:grid-cols-2 gap-4">
          {glossaryTerms.map((item) => (
            <Link
              key={item.slug}
              to={`/resources/glossary/${item.slug}`}
              className="group flex items-center gap-3 p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-all"
            >
              <BookOpen className="h-5 w-5 text-primary shrink-0" />
              <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                {item.term}
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto group-hover:text-primary transition-colors" />
            </Link>
          ))}
        </div>
      </ContentSection>
    </ResourcePageLayout>
  );
}
