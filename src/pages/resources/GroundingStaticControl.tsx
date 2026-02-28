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

const groundFaqs = [
  { q: "Why is grounding critical in spray painting operations?", a: "Solvent-based paints create flammable vapor atmospheres. Static discharge can ignite these vapors, causing fires or explosions. Proper grounding ensures all conductive elements (robot, fixtures, booth, operator) are at the same electrical potential, preventing spark-generating discharge." },
  { q: "What grounding resistance is acceptable for paint booths?", a: "Ground resistance should be less than 1 megohm (< 1 MΩ) for personnel and equipment bonding, and less than 25 ohms for facility earth ground connections. These values should be verified with a megohmmeter during commissioning and periodically thereafter." },
  { q: "How does electrostatic spraying relate to grounding?", a: "Electrostatic spray guns charge paint particles to 60-100 kV. The grounded workpiece attracts charged particles, improving transfer efficiency. Without proper grounding of the part and fixtures, wrap-around effect is lost and charge buildup creates safety hazards." },
  { q: "How often should grounding connections be inspected?", a: "Visual inspection of ground connections should be performed daily before operation. Resistance testing should be done weekly or per shift in high-volume operations. Full system verification with documented results should occur quarterly and after any maintenance." },
];

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

      <ContentSection title="Frequently Asked Questions">
        <Helmet>
          <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: groundFaqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) })}</script>
        </Helmet>
        <Accordion type="multiple" defaultValue={groundFaqs.map((_, i) => `faq-${i}`)} className="space-y-2">
          {groundFaqs.map((faq, i) => (
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
