import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";
import { useI18n } from "@/i18n/context";

export default function TransferEfficiency() {
  const { t, locale } = useI18n();
  const term = t.glossaryTerms?.transferEfficiency || {};
  const sections = t.glossaryTerms?.sectionTitles || {};
  const breadcrumbs = t.resources?.breadcrumbs || {};

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": term.metaTitle || "Transfer Efficiency | Paint Cell Glossary",
    "description": term.metaDesc || "Definition of transfer efficiency and why it matters in paint cell feasibility assessment.",
    "inLanguage": locale,
  };

  return (
    <ResourcePageLayout
      title={term.title || "Transfer Efficiency"}
      metaTitle={term.metaTitle || "Transfer Efficiency | Paint Cell Glossary"}
      metaDescription={term.metaDesc || "Definition of transfer efficiency and why it matters in paint cell feasibility assessment."}
      breadcrumbs={[
        { label: breadcrumbs.glossary || "Glossary", href: "/resources/glossary" },
        { label: term.title || "Transfer Efficiency" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        {term.answerBox || "Transfer efficiency is the percentage of sprayed paint that reaches the part. It influences paint consumption, overspray, and finish repeatability. In paint cell assessment, it depends on part presentation, spray distance/angle, and airflow conditions."}
      </AnswerBox>

      <ContentSection title={sections.whyMatters || "Why it matters in paint cells"}>
        <BulletList
          items={term.whyMatters || [
            "Affects material usage and waste handling",
            "Influences finish uniformity and rework risk",
            "Ties directly to path design and part presentation quality",
          ]}
        />
      </ContentSection>

      <ContentSection title={sections.watchFor || "What to watch for"}>
        <BulletList
          items={term.watchFor || [
            "Assuming ideal efficiency without geometry trials",
            "Ignoring airflow impacts on deposition",
          ]}
        />
      </ContentSection>

      <RelatedResources
        resources={[
          { title: "Feasibility: 10 Engineering Checks", href: "/resources/guides/paint-cell-feasibility-checks" },
          { title: "Ventilation & Airflow", href: "/resources/standards-compliance/ventilation-airflow" },
          { title: "Paint Cell Feasibility Checklist", href: "/resources/tools-templates/feasibility-checklist" },
        ]}
      />
    </ResourcePageLayout>
  );
}
