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

const vocFaqs = [
  { q: "What are VOCs in the context of spray painting?", a: "Volatile Organic Compounds (VOCs) are carbon-based chemicals that evaporate during paint application and curing. In spray painting, they originate from solvents in liquid coatings. VOC emissions are regulated under EPA, EU IED, and local air quality regulations." },
  { q: "How do you reduce VOC emissions in a paint cell?", a: "Key methods include switching to high-solids or waterborne coatings, improving transfer efficiency with electrostatic or HVLP spray, using enclosed booths with abatement systems (RTO, carbon adsorption), and optimizing solvent flush volumes during color changes." },
  { q: "What solvent storage requirements apply to paint operations?", a: "Solvents must be stored in approved flammable liquid cabinets or dedicated rooms meeting NFPA 30 requirements. Quantities in the spray area should be limited to one shift's supply. Secondary containment, grounding, and bonding are required for all containers." },
  { q: "What PPE is required for solvent handling in paint operations?", a: "Minimum PPE includes chemical-resistant gloves, safety glasses or goggles, and appropriate respiratory protection. In enclosed mixing rooms, supplied-air respirators may be required. Robotic automation significantly reduces operator solvent exposure." },
];

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

      <ContentSection title="Frequently Asked Questions">
        <Helmet>
          <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: vocFaqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) })}</script>
        </Helmet>
        <Accordion type="multiple" defaultValue={vocFaqs.map((_, i) => `faq-${i}`)} className="space-y-2">
          {vocFaqs.map((faq, i) => (
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
