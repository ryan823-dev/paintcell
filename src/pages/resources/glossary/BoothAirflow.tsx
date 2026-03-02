import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";
import { useI18n } from "@/i18n/context";

export default function BoothAirflow() {
  const { t, locale } = useI18n();
  const term = t.glossaryTerms?.boothAirflow || {};
  const sections = t.glossaryTerms?.sectionTitles || {};
  const breadcrumbs = t.resources?.breadcrumbs || {};

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": term.metaTitle || "Booth Airflow | Paint Cell Glossary",
    "description": term.metaDesc || "Definition of booth airflow and why it matters in paint cell feasibility assessment.",
    "inLanguage": locale,
  };

  return (
    <ResourcePageLayout
      title={term.title || "Booth Airflow"}
      metaTitle={term.metaTitle || "Booth Airflow | Paint Cell Glossary"}
      metaDescription={term.metaDesc || "Definition of booth airflow and why it matters in paint cell feasibility assessment."}
      breadcrumbs={[
        { label: breadcrumbs.glossary || "Glossary", href: "/resources/glossary" },
        { label: term.title || "Booth Airflow" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        {term.answerBox || "Booth airflow describes how air moves through the spray area, affecting overspray capture and finish stability. It is a baseline design constraint, not a final tuning detail. In assessments, airflow must be validated with site exhaust and makeup air conditions."}
      </AnswerBox>

      <ContentSection title={sections.whyMatters || "Why it matters in paint cells"}>
        <BulletList
          items={term.whyMatters || [
            "Controls overspray containment and filter loading",
            "Influences finish repeatability across shifts",
            "Sets limits on cell layout and operating procedures",
          ]}
        />
      </ContentSection>

      <ContentSection title={sections.watchFor || "What to watch for"}>
        <BulletList
          items={term.watchFor || [
            'Treating airflow as "later" and discovering limits too late',
            "Inadequate makeup air causing unstable flow",
          ]}
        />
      </ContentSection>

      <RelatedResources
        resources={[
          { title: "Ventilation & Airflow", href: "/resources/standards-compliance/ventilation-airflow" },
          { title: "Site Readiness Checklist", href: "/resources/tools-templates/site-readiness-checklist" },
          { title: "Feasibility: 10 Engineering Checks", href: "/resources/guides/paint-cell-feasibility-checks" },
        ]}
      />
    </ResourcePageLayout>
  );
}
