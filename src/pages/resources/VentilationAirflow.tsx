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
  "headline": "Ventilation & Airflow for Robotic Spray Painting",
  "description": "How ventilation and airflow act as baseline constraints in paint cell design and finish stability.",
  "author": {
    "@type": "Organization",
    "name": "PaintCell"
  }
};

export default function VentilationAirflow() {
  return (
    <ResourcePageLayout
      title="Ventilation & Airflow for Robotic Spray Painting"
      metaTitle="Ventilation & Airflow for Robotic Spray Painting"
      metaDescription="How ventilation and airflow act as baseline constraints in paint cell design and finish stability."
      breadcrumbs={[
        { label: "Standards & Compliance", href: "/resources/standards-compliance" },
        { label: "Ventilation & Airflow" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        Ventilation and airflow define overspray control, finish stability, and baseline safety for spray painting. The right approach depends on paint type, booth/room layout, and local EHS requirements. Treat airflow as a design constraint that must be validated on site.
      </AnswerBox>

      <ContentSection title="Scope / applicability">
        <p className="text-muted-foreground">
          This page is a pre-engineering overview for liquid paint spray systems. Always confirm final requirements with your facility EHS team and local regulations.
        </p>
      </ContentSection>

      <ContentSection title="Key constraints">
        <BulletList
          items={[
            "Airflow pattern stability (direction and uniformity)",
            "Overspray capture effectiveness and filtration loading",
            "Temperature/humidity stability that affects finish repeatability",
            "Maintenance access, filter replacement routine, and downtime planning",
          ]}
        />
      </ContentSection>

      <ContentSection title="What must be validated">
        <BulletList
          items={[
            "Actual exhaust capacity and makeup air availability",
            "Airflow direction stability under real operating conditions",
            "Facility EHS acceptance criteria and approval process",
            "Waste handling constraints for filters and collected materials",
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
                <TableCell className="font-medium">Booth/room dimensions</TableCell>
                <TableCell>Drives airflow and containment</TableCell>
                <TableCell>Facility engineering</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Exhaust capacity</TableCell>
                <TableCell>Baseline overspray capture</TableCell>
                <TableCell>Facility engineering</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Makeup air plan</TableCell>
                <TableCell>Prevents unstable flow</TableCell>
                <TableCell>Facility engineering</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Filtration approach</TableCell>
                <TableCell>Affects maintenance + cost</TableCell>
                <TableCell>Operations/maintenance</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Maintenance routine</TableCell>
                <TableCell>Affects uptime</TableCell>
                <TableCell>Operations</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">EHS approval path</TableCell>
                <TableCell>Schedule critical</TableCell>
                <TableCell>Facility EHS</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </ContentSection>
    </ResourcePageLayout>
  );
}
