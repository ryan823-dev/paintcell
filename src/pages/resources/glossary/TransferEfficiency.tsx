import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Transfer Efficiency | Paint Cell Glossary",
  "description": "Definition of transfer efficiency and why it matters in paint cell feasibility assessment."
};

export default function TransferEfficiency() {
  return (
    <ResourcePageLayout
      title="Transfer Efficiency"
      metaTitle="Transfer Efficiency | Paint Cell Glossary"
      metaDescription="Definition of transfer efficiency and why it matters in paint cell feasibility assessment."
      breadcrumbs={[
        { label: "Glossary", href: "/resources/glossary" },
        { label: "Transfer Efficiency" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        Transfer efficiency is the percentage of sprayed paint that reaches the part. It influences paint consumption, overspray, and finish repeatability. In paint cell assessment, it depends on part presentation, spray distance/angle, and airflow conditions.
      </AnswerBox>

      <ContentSection title="Why it matters in paint cells">
        <BulletList
          items={[
            "Affects material usage and waste handling",
            "Influences finish uniformity and rework risk",
            "Ties directly to path design and part presentation quality",
          ]}
        />
      </ContentSection>

      <ContentSection title="What to watch for">
        <BulletList
          items={[
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
