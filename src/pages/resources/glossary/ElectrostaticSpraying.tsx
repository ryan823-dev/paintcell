import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";
import { useI18n } from "@/i18n/context";

export default function ElectrostaticSpraying() {
  const { t, locale } = useI18n();
  const term = t.glossaryTerms?.electrostaticSpraying || {};
  const sections = t.glossaryTerms?.sectionTitles || {};
  const breadcrumbs = t.resources?.breadcrumbs || {};

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": term.metaTitle || "Electrostatic Spraying | Paint Cell Glossary",
    "description": term.metaDesc || "Definition of electrostatic spraying and why it matters in robotic paint cell applications.",
    "inLanguage": locale,
  };

  return (
    <ResourcePageLayout
      title={term.title || "Electrostatic Spraying"}
      metaTitle={term.metaTitle || "Electrostatic Spraying | Paint Cell Glossary"}
      metaDescription={term.metaDesc || "Definition of electrostatic spraying and why it matters in robotic paint cell applications."}
      breadcrumbs={[
        { label: breadcrumbs.glossary || "Glossary", href: "/resources/glossary" },
        { label: term.title || "Electrostatic Spraying" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        {term.answerBox || "Electrostatic spraying applies a high-voltage charge (typically 40-100 kV) to atomized paint particles, causing them to be attracted to the grounded workpiece. This significantly improves transfer efficiency (often 65-85% vs 30-40% for conventional air spray) and provides superior wrap-around coverage on complex geometries."}
      </AnswerBox>

      <ContentSection title={sections.whyMatters || "Why it matters in paint cells"}>
        <BulletList
          items={term.whyMatters || [
            "Reduces paint consumption by 30-50% compared to conventional spraying",
            "Improves coverage on recessed areas and back surfaces",
            "Requires proper grounding of parts and fixtures",
            "Paint conductivity must be controlled within specification",
          ]}
        />
      </ContentSection>

      <ContentSection title={sections.watchFor || "What to watch for"}>
        <BulletList
          items={term.watchFor || [
            "Faraday cage effect on deep recesses and inside corners",
            "Grounding integrity of conveyor systems and fixtures",
            "Paint resistivity drift affecting charge transfer",
            "Safety requirements for high-voltage equipment in booth",
          ]}
        />
      </ContentSection>

      <RelatedResources
        resources={[
          { title: "Transfer Efficiency", href: "/resources/glossary/transfer-efficiency" },
          { title: "How to Choose a Paint Robot", href: "/resources/knowledge/how-to-choose-paint-robot" },
          { title: "Grounding & Static Control", href: "/resources/standards-compliance/grounding-static-control" },
        ]}
      />
    </ResourcePageLayout>
  );
}
