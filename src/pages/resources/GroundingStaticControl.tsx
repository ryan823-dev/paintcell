import { ResourcePageLayout, AnswerBox } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Grounding & Static Control for Spray Painting Cells",
  "description": "Why grounding and static control matter for safety and repeatability in paint cell projects.",
  "author": {
    "@type": "Organization",
    "name": "PaintCell"
  }
};

export default function GroundingStaticControl() {
  return (
    <ResourcePageLayout
      title="Grounding & Static Control for Spray Painting Cells"
      metaTitle="Grounding & Static Control for Spray Painting Cells"
      metaDescription="Why grounding and static control matter for safety and repeatability in paint cell projects."
      breadcrumbs={[
        { label: "Standards & Compliance", href: "/resources/standards-compliance" },
        { label: "Grounding & Static Control" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        Static control and grounding reduce fire risk and support consistent spray performance. The required measures depend on paint type, equipment, and site classification rules. Validate early with your facility EHS and local requirements.
      </AnswerBox>

      <ContentSection title="Scope / applicability">
        <p className="text-muted-foreground">
          This is a pre-engineering overview for spray painting cells using liquid paint. Final requirements depend on site rules and EHS validation.
        </p>
      </ContentSection>

      <ContentSection title="Key constraints">
        <BulletList
          items={[
            "Grounding/bonding requirements for equipment and fixtures",
            "Static accumulation risks under your handling and airflow conditions",
            "Maintenance checks and verification routines",
            "Facility classification rules and approval process",
          ]}
        />
      </ContentSection>

      <ContentSection title="What must be validated">
        <BulletList
          items={[
            "Facility's grounding/static control standards for spray areas",
            "Who owns verification and ongoing checks",
            "Installation constraints and inspection requirements",
            "Any site classification constraints that affect equipment selection",
          ]}
        />
      </ContentSection>

      <ContentSection title="Site checklist">
        <div className="border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Why it matters</TableHead>
                <TableHead>Who confirms</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Grounding points</TableCell>
                <TableCell>Safety baseline</TableCell>
                <TableCell>Facility engineering</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Verification routine</TableCell>
                <TableCell>Ongoing compliance</TableCell>
                <TableCell>Operations/EHS</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Fixture bonding</TableCell>
                <TableCell>Controls static risk</TableCell>
                <TableCell>Engineering</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Inspection requirements</TableCell>
                <TableCell>Schedule impact</TableCell>
                <TableCell>Facility EHS</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Approval owner</TableCell>
                <TableCell>Avoids delay</TableCell>
                <TableCell>Facility EHS</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </ContentSection>
    </ResourcePageLayout>
  );
}
