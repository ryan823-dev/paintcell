import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "2K Paint | Paint Cell Glossary",
  "description": "Definition of 2K paint and why it matters in paint cell feasibility assessment."
};

export default function TwoKPaint() {
  return (
    <ResourcePageLayout
      title="2K Paint"
      metaTitle="2K Paint | Paint Cell Glossary"
      metaDescription="Definition of 2K paint and why it matters in paint cell feasibility assessment."
      breadcrumbs={[
        { label: "Glossary", href: "/resources/glossary" },
        { label: "2K Paint" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        2K paint is a two-component paint system mixed before application. It adds constraints around mixing, pot life, and handling routines. In paint cells, feasibility depends on how mixing and refill are managed and validated under site procedures.
      </AnswerBox>

      <ContentSection title="Why it matters in paint cells">
        <BulletList
          items={[
            "Adds routine complexity for mixing/refill",
            "Can affect uptime and staffing routines",
            "Requires clear responsibility and validation plan",
          ]}
        />
      </ContentSection>

      <ContentSection title="What to watch for">
        <BulletList
          items={[
            "Underestimating pot-life and refill impacts on takt",
            "Missing clarity on who owns mixing procedures",
          ]}
        />
      </ContentSection>

      <RelatedResources
        resources={[
          { title: "Feasibility: 10 Engineering Checks", href: "/resources/guides/paint-cell-feasibility-checks" },
          { title: "VOC / Solvent Handling Basics", href: "/resources/standards-compliance/voc-solvent-handling" },
          { title: "Paint Cell RFQ Spec Template", href: "/resources/tools-templates/paint-cell-rfq-template" },
        ]}
      />
    </ResourcePageLayout>
  );
}
