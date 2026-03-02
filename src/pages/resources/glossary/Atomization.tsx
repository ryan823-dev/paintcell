import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";
import { useI18n } from "@/i18n/context";

export default function Atomization() {
  const { t, locale } = useI18n();
  const term = t.glossaryTerms?.atomization || {};
  const sections = t.glossaryTerms?.sectionTitles || {};
  const breadcrumbs = t.resources?.breadcrumbs || {};

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": term.metaTitle || "Atomization | Paint Cell Glossary",
    "description": term.metaDesc || "Definition of atomization and why it matters in paint cell feasibility assessment.",
    "inLanguage": locale,
  };

  return (
    <ResourcePageLayout
      title={term.title || "Atomization"}
      metaTitle={term.metaTitle || "Atomization | Paint Cell Glossary"}
      metaDescription={term.metaDesc || "Definition of atomization and why it matters in paint cell feasibility assessment."}
      breadcrumbs={[
        { label: breadcrumbs.glossary || "Glossary", href: "/resources/glossary" },
        { label: term.title || "Atomization" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        {term.answerBox || "Atomization is the process of breaking liquid paint into droplets for spraying. Stable atomization supports consistent appearance and coverage. In paint cells, atomization is sensitive to paint properties, equipment setup, and environmental conditions."}
      </AnswerBox>

      <ContentSection title={sections.whyMatters || "Why it matters in paint cells"}>
        <BulletList
          items={term.whyMatters || [
            "Affects finish consistency and defect rates",
            "Can change with refill/mixing routines",
            "May require trials for specific paints and geometry",
          ]}
        />
      </ContentSection>

      <ContentSection title={sections.watchFor || "What to watch for"}>
        <BulletList
          items={term.watchFor || [
            "Assuming one setup fits all paints and parts",
            "Environmental drift (temperature/humidity) affecting stability",
          ]}
        />
      </ContentSection>

      <RelatedResources
        resources={[
          { title: "Feasibility: 10 Engineering Checks", href: "/resources/guides/paint-cell-feasibility-checks" },
          { title: "Ventilation & Airflow", href: "/resources/standards-compliance/ventilation-airflow" },
          { title: "Paint Cell RFQ Spec Template", href: "/resources/tools-templates/paint-cell-rfq-template" },
        ]}
      />
    </ResourcePageLayout>
  );
}
