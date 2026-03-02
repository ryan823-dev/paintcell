import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";
import { useI18n } from "@/i18n/context";

export default function Overspray() {
  const { t, locale } = useI18n();
  const term = t.glossaryTerms?.overspray || {};
  const sections = t.glossaryTerms?.sectionTitles || {};
  const breadcrumbs = t.resources?.breadcrumbs || {};

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": term.metaTitle || "Overspray | Paint Cell Glossary",
    "description": term.metaDesc || "Definition of overspray and why it matters in paint cell feasibility assessment.",
    "inLanguage": locale,
  };

  return (
    <ResourcePageLayout
      title={term.title || "Overspray"}
      metaTitle={term.metaTitle || "Overspray | Paint Cell Glossary"}
      metaDescription={term.metaDesc || "Definition of overspray and why it matters in paint cell feasibility assessment."}
      breadcrumbs={[
        { label: breadcrumbs.glossary || "Glossary", href: "/resources/glossary" },
        { label: term.title || "Overspray" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        {term.answerBox || "Overspray is paint that does not land on the target surface and becomes airborne or deposited elsewhere. It affects finish stability, filtration loading, cleanup workload, and safety considerations. In feasibility reviews, overspray is tied to airflow, geometry, and spray parameters."}
      </AnswerBox>

      <ContentSection title={sections.whyMatters || "Why it matters in paint cells"}>
        <BulletList
          items={term.whyMatters || [
            "Drives booth airflow and containment requirements",
            "Impacts maintenance and operating cost",
            "Can affect appearance consistency on nearby surfaces",
          ]}
        />
      </ContentSection>

      <ContentSection title={sections.watchFor || "What to watch for"}>
        <BulletList
          items={term.watchFor || [
            "Underestimating filtration maintenance and downtime",
            "Geometry that increases bounce-back and rework",
          ]}
        />
      </ContentSection>

      <RelatedResources
        resources={[
          { title: "Feasibility: 10 Engineering Checks", href: "/resources/guides/paint-cell-feasibility-checks" },
          { title: "Ventilation & Airflow", href: "/resources/standards-compliance/ventilation-airflow" },
          { title: "Site Readiness Checklist", href: "/resources/tools-templates/site-readiness-checklist" },
        ]}
      />
    </ResourcePageLayout>
  );
}
