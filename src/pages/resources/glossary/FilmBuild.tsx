import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Film Build | Paint Cell Glossary",
  "description": "Definition of film build and why it matters in paint cell feasibility assessment."
};

export default function FilmBuild() {
  return (
    <ResourcePageLayout
      title="Film Build"
      metaTitle="Film Build | Paint Cell Glossary"
      metaDescription="Definition of film build and why it matters in paint cell feasibility assessment."
      breadcrumbs={[
        { label: "Glossary", href: "/resources/glossary" },
        { label: "Film Build" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        Film build is the thickness of applied paint after spraying and curing/drying. It is a key requirement input that affects spray parameters, cycle time, and quality checks. In paint cells, film build targets must be paired with acceptable variability and inspection expectations.
      </AnswerBox>

      <ContentSection title="Why it matters in paint cells">
        <BulletList
          items={[
            "Determines number of passes and path time",
            "Impacts inspection and acceptable variability",
            "Links to atomization stability and environmental control",
          ]}
        />
      </ContentSection>

      <ContentSection title="What to watch for">
        <BulletList
          items={[
            "Targets without tolerance ranges or acceptance criteria",
            "Confusing appearance uniformity with film build specs",
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
