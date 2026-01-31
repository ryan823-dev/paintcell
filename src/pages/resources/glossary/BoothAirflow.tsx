import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Booth Airflow | Paint Cell Glossary",
  "description": "Definition of booth airflow and why it matters in paint cell feasibility assessment."
};

export default function BoothAirflow() {
  return (
    <ResourcePageLayout
      title="Booth Airflow"
      metaTitle="Booth Airflow | Paint Cell Glossary"
      metaDescription="Definition of booth airflow and why it matters in paint cell feasibility assessment."
      breadcrumbs={[
        { label: "Glossary", href: "/resources/glossary" },
        { label: "Booth Airflow" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        Booth airflow describes how air moves through the spray area, affecting overspray capture and finish stability. It is a baseline design constraint, not a final tuning detail. In assessments, airflow must be validated with site exhaust and makeup air conditions.
      </AnswerBox>

      <ContentSection title="Why it matters in paint cells">
        <BulletList
          items={[
            "Controls overspray containment and filter loading",
            "Influences finish repeatability across shifts",
            "Sets limits on cell layout and operating procedures",
          ]}
        />
      </ContentSection>

      <ContentSection title="What to watch for">
        <BulletList
          items={[
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
