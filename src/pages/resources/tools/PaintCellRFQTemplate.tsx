import { ResourcePageLayout, AnswerBox } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Paint Cell RFQ Spec Template (Robotic Spray Painting)",
  "description": "A copy/paste RFQ template to collect minimum inputs for paint cell feasibility and scope review.",
  "author": {
    "@type": "Organization",
    "name": "PaintCell"
  }
};

export default function PaintCellRFQTemplate() {
  return (
    <ResourcePageLayout
      title="Paint Cell RFQ Spec Template (Robotic Spray Painting)"
      metaTitle="Paint Cell RFQ Spec Template | Robotic Spray Painting"
      metaDescription="A copy/paste RFQ template to collect minimum inputs for paint cell feasibility and scope review."
      breadcrumbs={[
        { label: "Tools & Templates", href: "/resources/tools-templates" },
        { label: "RFQ Template" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        This RFQ template helps you collect the minimum information needed for a paint cell feasibility and scope review. It is not a pricing form; it reduces rework by making constraints explicit.
      </AnswerBox>

      <ContentSection title="What it includes">
        <BulletList
          items={[
            "Part information and presentation constraints",
            "Finish targets and acceptance criteria",
            "Throughput, shift pattern, and changeover expectations",
            "Paint handling routine (liquid paint)",
            "Site constraints and EHS validation owner",
          ]}
        />
      </ContentSection>

      <ContentSection title="Copy/paste RFQ template">
        <div className="bg-muted/50 border border-border rounded-lg p-6 font-mono text-sm whitespace-pre-wrap">
{`Project context
• Plant / site location (country/region):
• Primary application / part family:
• Current process (manual / semi / other):
• Target timeline (rough):

Part information
• Part photos or CAD link:
• Key dimensions and weight:
• Material and surface condition:
• How the part is presented/fixtured today:

Finish target
• Target finish: (appearance / functional coverage)
• Film build target (if known) + tolerance:
• Acceptable touch-up level (none / minimal / acceptable %):
• Current defect/rework drivers:

Throughput
• Required takt or parts/hour:
• Shifts per day and operating hours:
• Peak vs average demand (if relevant):

Changeover
• Changeover frequency: (per shift/day/week)
• Typical batch size:
• Cleaning expectations and acceptable downtime:

Paint (liquid) & routine
• Paint type: (liquid paint)
• Mixing/refill routine owner (operator / other):
• Any special handling constraints (if applicable):

Site constraints
• Booth/room dimensions (if known):
• Exhaust / ventilation info (if known):
• Available utilities (power/air):
• Space/clearance constraints:

Safety & validation
• Facility EHS requirements owner/contact:
• Required standards or facility policies (if known):
• Approval pathway and expected review cycle:`}
        </div>
      </ContentSection>
    </ResourcePageLayout>
  );
}
