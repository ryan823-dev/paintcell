import { ResourcePageLayout, AnswerBox } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";
import { Helmet } from "react-helmet-async";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ventFaqs = [
  { q: "What airflow velocity is recommended for paint spray booths?", a: "Downdraft booths typically require 0.3-0.5 m/s (60-100 fpm) average face velocity. Crossdraft booths need 0.5-0.75 m/s. The exact requirement depends on paint type, solvent load, and local regulations (NFPA 33, OSHA 1910.94)." },
  { q: "How does booth airflow affect paint finish quality?", a: "Insufficient airflow allows overspray to settle on wet surfaces causing contamination. Excessive airflow can cause dry spray and poor film formation. Balanced, laminar airflow removes overspray without disturbing the spray pattern." },
  { q: "What is makeup air and why is it important?", a: "Makeup air replaces exhausted booth air to maintain stable pressure and airflow. Without properly conditioned makeup air, booth pressure becomes unstable, causing inconsistent finishes and potential safety issues from uncontrolled air ingress." },
  { q: "How often should booth filters be changed?", a: "Floor filters typically need replacement every 200-500 operating hours depending on paint volume. Exhaust filters should be monitored with differential pressure gauges and changed when pressure drop exceeds manufacturer specifications." },
];

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

      <ContentSection title="Frequently Asked Questions">
        <Helmet>
          <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: ventFaqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) })}</script>
        </Helmet>
        <Accordion type="multiple" defaultValue={ventFaqs.map((_, i) => `faq-${i}`)} className="space-y-2">
          {ventFaqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-5 bg-card">
              <AccordionTrigger className="text-sm font-medium text-left py-4 hover:no-underline">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ContentSection>
    </ResourcePageLayout>
  );
}
