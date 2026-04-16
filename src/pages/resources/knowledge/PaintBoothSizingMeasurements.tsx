import { ArrowRight, Move, Ruler, Settings2, Wind } from "lucide-react";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { AnswerBox, ResourcePageLayout } from "@/components/resources";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const sizingFaqs = [
  {
    q: "Are there standard paint booth measurements or standard paint booth dimensions?",
    a: "No single standard size fits every project. Paint booth measurements depend on the part envelope, fixture logic, robot reach, service access, overspray path, and whether the booth is downdraft, crossdraft, or side-draft.",
  },
  {
    q: "How do you estimate paint booth size for a robotic line?",
    a: "Estimate paint booth size from the largest real work envelope, then add robot motion clearance, hose routing space, operator and maintenance access, loading path, and the airflow path needed for stable overspray capture. The booth has to fit the process, not only the part.",
  },
  {
    q: "What is the difference between paint booth dimensions and paint booth design calculations?",
    a: "Paint booth dimensions are the physical width, depth, and height of the enclosure and working zone. Paint booth design calculations extend further into airflow targets, exhaust load, makeup air, filter loading, and the interface with conveyors, robots, or manual loading stations.",
  },
  {
    q: "Can a booth be too large as well as too small?",
    a: "Yes. Oversized booths can increase conditioned-air demand, make airflow harder to control, and waste facility scope. Undersized booths create robot, maintenance, and finish-stability problems. Good sizing balances process envelope and airflow discipline together.",
  },
];

const sizingInputs = [
  {
    title: "Part envelope",
    body: "Use the largest actual part plus fixture, rotation, and presentation method. Catalog size alone is usually too optimistic.",
  },
  {
    title: "Robot and hose envelope",
    body: "Robot reach, approach angle, dress pack, and safe maintenance access all consume booth dimensions before painting even starts.",
  },
  {
    title: "Airflow path",
    body: "Overspray has to leave the part cleanly. That requires space for the right airflow direction, filter face, and exhaust path.",
  },
  {
    title: "Loading and service space",
    body: "Door swing, conveyor clearance, filter changes, and operator movement often define whether the booth dimensions stay usable after startup.",
  },
];

const allowanceRows = [
  {
    label: "Around the part",
    value: "Allow for gun stand-off, robot approach, and overspray clearance rather than using zero-gap part dimensions.",
  },
  {
    label: "At load/unload points",
    value: "Keep enough width and depth for fixtures, conveyor indexing, and operator handling without disturbing airflow.",
  },
  {
    label: "At service areas",
    value: "Filters, fans, access panels, and robot maintenance zones need real working space, not just theoretical access.",
  },
  {
    label: "At airflow boundaries",
    value: "Leave room for supply, exhaust, and makeup air behavior so the booth can stay stable as filters load.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      headline: "Paint Booth Sizing and Measurements Guide",
      description:
        "Guide to paint booth sizing, dimensions, and measurements for robotic and manual finishing lines, including clearances, airflow path, and the inputs behind practical booth design calculations.",
      author: { "@type": "Organization", name: "TD Engineering Team" },
      publisher: { "@type": "Organization", name: "TD Painting Systems" },
      datePublished: "2026-04-16",
      dateModified: "2026-04-16",
      inLanguage: "en",
    },
    {
      "@type": "FAQPage",
      mainEntity: sizingFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    },
  ],
};

export default function PaintBoothSizingMeasurements() {
  return (
    <ResourcePageLayout
      title="Paint Booth Sizing and Measurements Guide"
      metaTitle="Paint Booth Sizing and Measurements | Dimensions and Design Guide"
      metaDescription="Use this paint booth sizing and measurements guide to estimate booth dimensions, clearances, airflow path, and the practical inputs behind paint booth design calculations."
      breadcrumbs={[
        { label: "Resources", href: "/resources" },
        { label: "Engineering Library", href: "/resources/engineering-library" },
        { label: "Paint Booth Sizing and Measurements Guide" },
      ]}
      structuredData={structuredData}
      canonicalPath="/resources/knowledge/paint-booth-sizing-measurements"
    >
      <AnswerBox>
        Paint booth measurements should be based on the real process envelope: part size, fixture logic, robot reach,
        airflow path, and service access. Good booth sizing is not just a width-times-depth exercise.
      </AnswerBox>

      <p className="mt-8 mb-6 text-lg text-muted-foreground">
        Queries like paint booth measurements, paint booth dimensions, paint booth size, average paint booth size, and
        paint booth design calculations usually mean one thing: the team needs a practical way to size the booth before
        layout and airflow decisions get locked too early.
      </p>
      <p className="mb-10 text-muted-foreground">
        This page covers the physical side of booth planning. For airflow direction, face velocity, and makeup air
        assumptions, use{" "}
        <Link to="/resources/standards-compliance/ventilation-airflow" className="text-primary underline underline-offset-4">
          paint booth ventilation and airflow design
        </Link>
        .
      </p>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">The four inputs behind paint booth size</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {sizingInputs.map((input) => (
            <Card key={input.title}>
              <CardContent className="pt-6">
                <h3 className="mb-2 flex items-center gap-2 text-base font-semibold">
                  <Settings2 className="h-4 w-4 text-accent" />
                  {input.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{input.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">How to think about booth dimensions in sequence</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-2 flex items-center gap-2 text-base font-semibold">
                <Ruler className="h-4 w-4 text-accent" />
                1. Start with the part
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Use the real largest painted envelope, including fixture, tilt, rotation, and the approach orientation
                that the process actually needs.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-2 flex items-center gap-2 text-base font-semibold">
                <Move className="h-4 w-4 text-accent" />
                2. Add movement and access
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Robot motion, hose routing, operator entry, and maintenance access are what usually turn a theoretical
                booth into a workable booth.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-2 flex items-center gap-2 text-base font-semibold">
                <Wind className="h-4 w-4 text-accent" />
                3. Reserve the airflow path
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                If the booth dimensions leave no clean path for overspray capture, the booth may fit the part but still
                fail the process.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">Typical allowances that teams forget</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[620px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="py-3 px-4 text-left font-semibold text-foreground">Allowance area</th>
                <th className="py-3 px-4 text-left font-semibold text-foreground">Why it matters</th>
              </tr>
            </thead>
            <tbody>
              {allowanceRows.map((row) => (
                <tr key={row.label} className="border-b border-border align-top">
                  <td className="py-4 px-4 font-medium text-foreground">{row.label}</td>
                  <td className="py-4 px-4 text-muted-foreground">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">When "average paint booth size" is the wrong question</h2>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-3">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
            <span>Different part families need very different clearances even when overall part length looks similar.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
            <span>Downdraft, crossdraft, and side-draft booths reserve space differently for airflow and exhaust hardware.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
            <span>Robot cells, manual booths, and conveyorized lines use different loading and maintenance logic.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
            <span>Facility limits around makeup air, service corridor, and utilities can force a different booth geometry than the process alone would suggest.</span>
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">Frequently asked questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {sizingFaqs.map((faq, index) => (
            <AccordionItem key={faq.q} value={`faq-${index}`}>
              <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">Read next</h2>
        <ul className="space-y-3 text-muted-foreground">
          <li>
            <Link to="/resources/standards-compliance/ventilation-airflow" className="text-primary underline underline-offset-4">
              Paint booth ventilation and airflow design
            </Link>
            {" "}for the velocity, exhaust, and makeup air side of booth planning.
          </li>
          <li>
            <Link to="/resources/knowledge/paint-booth-design-basics" className="text-primary underline underline-offset-4">
              Paint booth design basics
            </Link>
            {" "}for booth-type selection and retrofit framing.
          </li>
          <li>
            <Link
              to="/resources/faq/how-much-floor-space-does-an-automated-paint-line-need"
              className="text-primary underline underline-offset-4"
            >
              How much floor space does an automated paint line need?
            </Link>
            {" "}for line-level footprint planning.
          </li>
        </ul>
      </section>

      <section className="rounded-lg bg-muted/30 p-6 md:p-8">
        <h2 className="mb-2 text-xl font-semibold">Need help estimating booth dimensions?</h2>
        <p className="mb-4 text-muted-foreground">
          We can review part envelope, robot reach, loading method, and airflow assumptions so the booth size reflects
          the real process instead of a rough placeholder.
        </p>
        <Link
          to="/quote"
          className="inline-flex items-center font-medium text-primary underline underline-offset-4"
        >
          Start a booth-sizing discussion <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </section>
    </ResourcePageLayout>
  );
}
