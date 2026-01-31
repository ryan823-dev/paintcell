import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Overspray | Paint Cell Glossary",
  "description": "Definition of overspray and why it matters in paint cell feasibility assessment."
};

export default function Overspray() {
  return (
    <ResourcePageLayout
      title="Overspray"
      metaTitle="Overspray | Paint Cell Glossary"
      metaDescription="Definition of overspray and why it matters in paint cell feasibility assessment."
      breadcrumbs={[
        { label: "Glossary", href: "/resources/glossary" },
        { label: "Overspray" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        Overspray is paint that does not land on the target surface and becomes airborne or deposited elsewhere. It affects finish stability, filtration loading, cleanup workload, and safety considerations. In feasibility reviews, overspray is tied to airflow, geometry, and spray parameters.
      </AnswerBox>

      <ContentSection title="Why it matters in paint cells">
        <BulletList
          items={[
            "Drives booth airflow and containment requirements",
            "Impacts maintenance and operating cost",
            "Can affect appearance consistency on nearby surfaces",
          ]}
        />
      </ContentSection>

      <ContentSection title="What to watch for">
        <BulletList
          items={[
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
