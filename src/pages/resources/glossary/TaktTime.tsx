import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Takt Time | Paint Cell Glossary",
  "description": "Definition of takt time and why it matters in paint cell feasibility assessment."
};

export default function TaktTime() {
  return (
    <ResourcePageLayout
      title="Takt Time"
      metaTitle="Takt Time | Paint Cell Glossary"
      metaDescription="Definition of takt time and why it matters in paint cell feasibility assessment."
      breadcrumbs={[
        { label: "Glossary", href: "/resources/glossary" },
        { label: "Takt Time" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        Takt time is the available production time divided by required output, defining the maximum allowed time per part. In paint cells, takt time sets the boundary for robot path time plus handling and changeover. Misreading takt drives unrealistic capacity assumptions.
      </AnswerBox>

      <ContentSection title="Why it matters in paint cells">
        <BulletList
          items={[
            "Defines whether the path + handling can meet line rate",
            "Exposes where buffers or staging may be required",
            "Forces clarity on changeover and downtime planning",
          ]}
        />
      </ContentSection>

      <ContentSection title="What to watch for">
        <BulletList
          items={[
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
