import { ResourcePageLayout, AnswerBox } from "@/components/resources";
import { ContentSection } from "@/components/resources";
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
  "headline": "Site Readiness Checklist for Paint Cell Projects",
  "description": "A concise checklist to confirm site constraints before committing to paint cell design.",
  "author": {
    "@type": "Organization",
    "name": "PaintCell"
  }
};

export default function SiteReadinessChecklist() {
  return (
    <ResourcePageLayout
      title="Site Readiness Checklist for Paint Cell Projects"
      metaTitle="Site Readiness Checklist | Paint Cell Projects"
      metaDescription="A concise checklist to confirm site constraints before committing to paint cell design."
      breadcrumbs={[
        { label: "Tools & Templates", href: "/resources/tools-templates" },
        { label: "Site Readiness Checklist" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        A short checklist to confirm whether your site constraints are known before committing to a paint cell design. Confirming these items early prevents schedule and compliance surprises.
      </AnswerBox>

      <ContentSection title="Checklist">
        <div className="border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Space/clearances confirmed</TableCell>
                <TableCell className="text-muted-foreground">_____</TableCell>
                <TableCell className="text-muted-foreground">☐</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Booth/room defined</TableCell>
                <TableCell className="text-muted-foreground">_____</TableCell>
                <TableCell className="text-muted-foreground">☐</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Exhaust capacity known (or to be measured)</TableCell>
                <TableCell className="text-muted-foreground">_____</TableCell>
                <TableCell className="text-muted-foreground">☐</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Makeup air plan known</TableCell>
                <TableCell className="text-muted-foreground">_____</TableCell>
                <TableCell className="text-muted-foreground">☐</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Utilities available (power/air)</TableCell>
                <TableCell className="text-muted-foreground">_____</TableCell>
                <TableCell className="text-muted-foreground">☐</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Paint storage/handling routine defined</TableCell>
                <TableCell className="text-muted-foreground">_____</TableCell>
                <TableCell className="text-muted-foreground">☐</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Waste handling route defined</TableCell>
                <TableCell className="text-muted-foreground">_____</TableCell>
                <TableCell className="text-muted-foreground">☐</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Grounding/static requirements known</TableCell>
                <TableCell className="text-muted-foreground">_____</TableCell>
                <TableCell className="text-muted-foreground">☐</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">EHS approval owner and process defined</TableCell>
                <TableCell className="text-muted-foreground">_____</TableCell>
                <TableCell className="text-muted-foreground">☐</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </ContentSection>
    </ResourcePageLayout>
  );
}
