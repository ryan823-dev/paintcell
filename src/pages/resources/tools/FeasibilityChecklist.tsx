import { ResourcePageLayout, AnswerBox } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Paint Cell Feasibility Checklist",
  "description": "A quick checklist to decide whether robotic spray painting is worth deeper evaluation.",
  "author": {
    "@type": "Organization",
    "name": "PaintCell"
  }
};

export default function FeasibilityChecklist() {
  return (
    <ResourcePageLayout
      title="Paint Cell Feasibility Checklist"
      metaTitle="Paint Cell Feasibility Checklist | Robotic Spray Painting"
      metaDescription="A quick checklist to decide whether robotic spray painting is worth deeper evaluation."
      breadcrumbs={[
        { label: "Tools & Templates", href: "/resources/tools-templates" },
        { label: "Feasibility Checklist" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        A quick feasibility checklist to decide whether robotic spray painting is worth evaluating further. It highlights the most common constraints: part presentation, takt/changeovers, and site safety.
      </AnswerBox>

      <ContentSection title="Quick checklist">
        <BulletList
          items={[
            "Part presentation can be repeatable (fixturing/presentation stability)",
            "Geometry can be covered with feasible reach/path complexity",
            "Finish target is defined (visual vs functional) with acceptance criteria",
            "Takt/parts per hour is known and includes handling time",
            "Changeover frequency and cleaning expectations are known",
            "Site constraints are known or can be measured (space, ventilation basics)",
            "Safety validation owner is identified (facility EHS)",
          ]}
        />
      </ContentSection>

      <ContentSection title="What to prepare">
        <BulletList
          items={[
            "Part photos or CAD",
            "Finish target + acceptable touch-up level",
            "Throughput target + shift pattern",
            "Changeover frequency + batch size",
            "Site notes (booth/room + ventilation info if known)",
          ]}
        />
      </ContentSection>
    </ResourcePageLayout>
  );
}
