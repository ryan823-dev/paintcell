import { ResourcePageLayout, AnswerBox } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Automation Boundary in Spray Painting: What to Automate vs Keep Manual",
  "description": "A scope guide for deciding what to automate and what to keep manual in paint cell projects.",
  "author": {
    "@type": "Organization",
    "name": "PaintCell"
  }
};

export default function AutomationBoundary() {
  return (
    <ResourcePageLayout
      title="Automation Boundary in Spray Painting: What to Automate vs Keep Manual"
      metaTitle="Automation Boundary in Spray Painting | Paint Cell Insight"
      metaDescription="A scope guide for deciding what to automate and what to keep manual in paint cell projects."
      breadcrumbs={[
        { label: "Engineering Library", href: "/resources/engineering-library" },
        { label: "Insights", href: "/resources/engineering-library/insights" },
        { label: "Automation Boundary" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        Labor savings and stability come from a clear automation boundary, not from "automating everything." Most paint cell projects succeed when robotic spraying is scoped precisely and the remaining manual tasks (prep, masking, touch-up, refill, inspection) are explicitly planned. Use the boundary checklist below to avoid scope drift and unrealistic expectations.
      </AnswerBox>

      <ContentSection title='Why "automation boundary" matters'>
        <BulletList
          items={[
            "It determines real staffing needs and daily routines",
            "It prevents scope creep during integration",
            "It clarifies which constraints must be validated early",
          ]}
        />
      </ContentSection>

      <ContentSection title="What is usually suitable to automate">
        <BulletList
          items={[
            "Repeatable spray paths on stable part presentation",
            "Consistent part indexing/positioning tasks (if fixturing supports it)",
            "Basic in-cell sequencing that supports takt time stability",
          ]}
        />
      </ContentSection>

      <ContentSection title="What often remains manual (and must be planned)">
        <BulletList
          items={[
            "Masking, surface prep, and part cleaning routines",
            "Touch-up expectations (define acceptable % and responsibility)",
            "Paint mixing/refill and daily checks",
            "Inspection and rework loop ownership",
          ]}
        />
      </ContentSection>

      <ContentSection title="Boundary checklist (use this to prevent misunderstandings)">
        <BulletList
          items={[
            "Define which tasks are inside the cell vs outside the cell",
            "Define who owns paint preparation and replenishment",
            "Define acceptable touch-up and inspection standards",
            "Define changeover responsibilities and downtime targets",
            'Define what "ready for automation" means for part presentation',
          ]}
        />
      </ContentSection>

      <ContentSection title="What must be validated">
        <BulletList
          items={[
            "That the chosen boundary still meets takt and quality requirements",
            "That site routines (prep/refill/inspection) do not dominate labor cost",
            "That changeover and cleaning times are realistic",
          ]}
        />
      </ContentSection>
    </ResourcePageLayout>
  );
}
