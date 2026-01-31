import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Color Changeover | Paint Cell Glossary",
  "description": "Definition of color changeover and why it matters in paint cell feasibility assessment."
};

export default function ColorChangeover() {
  return (
    <ResourcePageLayout
      title="Color Changeover"
      metaTitle="Color Changeover | Paint Cell Glossary"
      metaDescription="Definition of color changeover and why it matters in paint cell feasibility assessment."
      breadcrumbs={[
        { label: "Glossary", href: "/resources/glossary" },
        { label: "Color Changeover" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        Color changeover is the time and procedure required to switch paints or colors safely and consistently. It often dominates downtime and real throughput more than robot speed. Feasibility reviews should quantify changeover frequency, cleaning expectations, and acceptable downtime.
      </AnswerBox>

      <ContentSection title="Why it matters in paint cells">
        <BulletList
          items={[
            "Drives real capacity and scheduling stability",
            "Impacts operator routine and maintenance workload",
            "Can affect quality if cleaning is inconsistent",
          ]}
        />
      </ContentSection>

      <ContentSection title="What to watch for">
        <BulletList
          items={[
            "Ignoring cleaning time in throughput estimates",
            "Overlooking who owns changeover steps (boundary)",
          ]}
        />
      </ContentSection>

      <RelatedResources
        resources={[
          { title: "Feasibility: 10 Engineering Checks", href: "/resources/guides/paint-cell-feasibility-checks" },
          { title: "VOC / Solvent Handling Basics", href: "/resources/standards-compliance/voc-solvent-handling" },
          { title: "Site Readiness Checklist", href: "/resources/tools-templates/site-readiness-checklist" },
        ]}
      />
    </ResourcePageLayout>
  );
}
