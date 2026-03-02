import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";
import { useI18n } from "@/i18n/context";

export default function TaktTime() {
  const { t, locale } = useI18n();
  const term = t.glossaryTerms?.taktTime || {};
  const sections = t.glossaryTerms?.sectionTitles || {};
  const breadcrumbs = t.resources?.breadcrumbs || {};

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": term.metaTitle || "Takt Time | Paint Cell Glossary",
    "description": term.metaDesc || "Definition of takt time and why it matters in paint cell feasibility assessment.",
    "inLanguage": locale,
  };

  return (
    <ResourcePageLayout
      title={term.title || "Takt Time"}
      metaTitle={term.metaTitle || "Takt Time | Paint Cell Glossary"}
      metaDescription={term.metaDesc || "Definition of takt time and why it matters in paint cell feasibility assessment."}
      breadcrumbs={[
        { label: breadcrumbs.glossary || "Glossary", href: "/resources/glossary" },
        { label: term.title || "Takt Time" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        {term.answerBox || "Takt time is the available production time divided by required output, defining the maximum allowed time per part. In paint cells, takt time sets the boundary for robot path time plus handling and changeover. Misreading takt drives unrealistic capacity assumptions."}
      </AnswerBox>

      <ContentSection title={sections.whyMatters || "Why it matters in paint cells"}>
        <BulletList
          items={term.whyMatters || [
            "Defines whether the path + handling can meet line rate",
            "Exposes where buffers or staging may be required",
            "Forces clarity on changeover and downtime planning",
          ]}
        />
      </ContentSection>

      <ContentSection title={sections.watchFor || "What to watch for"}>
        <BulletList
          items={term.watchFor || [
            "Counting only robot motion and ignoring handling/changeover",
            "Takt targets that vary widely by shift or product mix",
          ]}
        />
      </ContentSection>

      <RelatedResources
        resources={[
          { title: "Robotic Spray Painting Feasibility: 10 Engineering Checks Before You Automate", href: "/resources/guides/paint-cell-feasibility-checks" },
          { title: "Ventilation & Airflow for Robotic Spray Painting", href: "/resources/standards-compliance/ventilation-airflow" },
          { title: "Paint Cell RFQ Spec Template", href: "/resources/tools-templates/paint-cell-rfq-template" },
        ]}
      />
    </ResourcePageLayout>
  );
}
