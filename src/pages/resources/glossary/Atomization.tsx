import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Atomization | Paint Cell Glossary",
  "description": "Definition of atomization and why it matters in paint cell feasibility assessment."
};

export default function Atomization() {
  return (
    <ResourcePageLayout
      title="Atomization"
      metaTitle="Atomization | Paint Cell Glossary"
      metaDescription="Definition of atomization and why it matters in paint cell feasibility assessment."
      breadcrumbs={[
        { label: "Glossary", href: "/resources/glossary" },
        { label: "Atomization" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        Atomization is the process of breaking liquid paint into droplets for spraying. Stable atomization supports consistent appearance and coverage. In paint cells, atomization is sensitive to paint properties, equipment setup, and environmental conditions.
      </AnswerBox>

      <ContentSection title="Why it matters in paint cells">
        <BulletList
          items={[
            "Affects finish consistency and defect rates",
            "Can change with refill/mixing routines",
            "May require trials for specific paints and geometry",
          ]}
        />
      </ContentSection>

      <ContentSection title="What to watch for">
        <BulletList
          items={[
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
