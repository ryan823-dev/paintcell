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
  "headline": "VOC / Solvent Handling Basics for Paint Cells",
  "description": "Early constraints to capture for VOC and solvent handling in robotic spray painting projects.",
  "author": {
    "@type": "Organization",
    "name": "PaintCell"
  }
};

export default function VOCSolventHandling() {
  return (
    <ResourcePageLayout
      title="VOC / Solvent Handling Basics for Paint Cells"
      metaTitle="VOC / Solvent Handling Basics for Paint Cells"
      metaDescription="Early constraints to capture for VOC and solvent handling in robotic spray painting projects."
      breadcrumbs={[
        { label: "Standards & Compliance", href: "/resources/standards-compliance" },
        { label: "VOC / Solvent Handling" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        VOC and solvent handling requirements affect ventilation, storage, and operating procedures in spray painting cells. Requirements vary by jurisdiction and facility policies. Capture constraints early to avoid redesign later.
      </AnswerBox>

      <ContentSection title="Scope / applicability">
        <p className="text-muted-foreground">
          This is a pre-engineering checklist view. Final requirements must be validated with facility EHS and local rules.
        </p>
      </ContentSection>

      <ContentSection title="Key constraints">
        <BulletList
          items={[
            "Paint storage and handling procedures (where/how managed)",
            "Spill containment and waste handling expectations",
            "Operator procedures for refill, cleanup, and disposal",
            "Facility policy constraints that may exceed local minimums",
          ]}
        />
      </ContentSection>

      <ContentSection title="What must be validated">
        <BulletList
          items={[
            "Facility's EHS approval requirements for paint handling",
            "Required storage conditions and allowable quantities",
            "Waste handling pathway and documentation needs",
            "Ventilation implications based on paint handling routines",
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
                <TableCell className="font-medium">Paint storage location</TableCell>
                <TableCell>Drives workflow + compliance</TableCell>
                <TableCell>Facility EHS</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Handling routine</TableCell>
                <TableCell>Affects exposure + procedures</TableCell>
                <TableCell>Operations/EHS</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Spill containment plan</TableCell>
                <TableCell>Baseline safety</TableCell>
                <TableCell>Facility EHS</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Waste handling route</TableCell>
                <TableCell>Impacts schedule/cost</TableCell>
                <TableCell>Operations/EHS</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Documentation needs</TableCell>
                <TableCell>Required approvals</TableCell>
                <TableCell>Facility EHS</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </ContentSection>
    </ResourcePageLayout>
  );
}
