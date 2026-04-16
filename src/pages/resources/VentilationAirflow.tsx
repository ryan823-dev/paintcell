import { ArrowRight, Gauge, Layers, Settings2, Wind } from "lucide-react";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { AnswerBox, ResourcePageLayout } from "@/components/resources";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ventFaqs = [
  {
    q: "What is paint booth ventilation design really trying to control?",
    a: "Paint booth ventilation design is trying to control overspray capture, vapor dilution, pressure balance, and finish stability at the same time. A booth that only moves air is not necessarily a booth with stable spray conditions.",
  },
  {
    q: "How is paint booth airflow design different from paint booth sizing?",
    a: "Paint booth airflow design focuses on direction, velocity, exhaust, and makeup air behavior. Paint booth sizing focuses on physical envelope, clearances, robot movement, service access, and line interface. In practice the two decisions are linked and should be checked together.",
  },
  {
    q: "Why does makeup air matter in spray booth ventilation design?",
    a: "Makeup air replaces exhausted air so the booth can hold stable pressure and repeatable airflow. If makeup air is undersized or poorly distributed, the spray booth may pull dirty air from the building, disturb the finish, and create unstable capture conditions.",
  },
  {
    q: "Are crossdraft booth designs always a lower-quality choice?",
    a: "No. Crossdraft booth designs can still be the right engineering answer when part geometry, budget, retrofit limits, and finish target do not justify full downdraft scope. The key is whether the airflow path keeps overspray away from critical surfaces consistently.",
  },
];

const designInputs = [
  {
    title: "Airflow target",
    body: "Define the face velocity and capture behavior needed for the coating chemistry, overspray load, and finish class before equipment is positioned.",
  },
  {
    title: "Booth type",
    body: "Downdraft, crossdraft, and side-draft each solve different problems. The best choice depends on finish requirement, part family, and building limits.",
  },
  {
    title: "Makeup air strategy",
    body: "Conditioned makeup air has to match the exhaust plan or the booth will fight unstable pressure, dirty air ingress, and seasonal finish variation.",
  },
  {
    title: "Filter and maintenance load",
    body: "As filters load, airflow behavior changes. Good design assumes the booth must stay usable between maintenance intervals, not only on day one.",
  },
];

const boothComparisons = [
  {
    type: "Downdraft",
    bestFit: "Appearance-critical work where overspray needs to move away from visible surfaces quickly.",
    watchFor: "Higher facility scope, more conditioned air demand, and more infrastructure cost.",
  },
  {
    type: "Crossdraft",
    bestFit: "Industrial finishing and retrofit projects where simplicity and cost control matter.",
    watchFor: "Air path across the part can damage finish quality if loading, gun angle, or part orientation is weak.",
  },
  {
    type: "Side-draft",
    bestFit: "Large parts or retrofit situations where floor exhaust or full downdraft geometry is unrealistic.",
    watchFor: "Dead zones, uneven extraction, and awkward overspray travel paths around large fixtures.",
  },
];

const validationChecks = [
  {
    item: "Booth dimensions and loading method",
    why: "These define the real airflow path and whether the part blocks or disturbs clean distribution.",
  },
  {
    item: "Exhaust capacity under production load",
    why: "Nominal fan ratings do not prove stable spray booth air flow when filters load and overspray increases.",
  },
  {
    item: "Makeup air quantity and distribution",
    why: "Stable makeup air is the difference between repeatable booth conditions and uncontrolled building air leakage.",
  },
  {
    item: "Pressure balance and door behavior",
    why: "Openings, conveyors, and operator access points often expose whether the booth is actually stable in daily operation.",
  },
  {
    item: "Filter replacement logic",
    why: "A booth with no clear maintenance threshold will drift out of its design window long before operators notice why the finish changed.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      headline: "Paint Booth Ventilation and Airflow Design Guide",
      description:
        "Practical guide to paint booth ventilation design covering spray booth air flow, booth-type comparison, makeup air, and the checks needed before scope is approved.",
      author: { "@type": "Organization", name: "TD Engineering Team" },
      publisher: { "@type": "Organization", name: "TD Painting Systems" },
      datePublished: "2026-04-16",
      dateModified: "2026-04-16",
      inLanguage: "en",
    },
    {
      "@type": "FAQPage",
      mainEntity: ventFaqs.map((faq) => ({
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

export default function VentilationAirflow() {
  return (
    <ResourcePageLayout
      title="Paint Booth Ventilation and Airflow Design Guide"
      metaTitle="Paint Booth Ventilation and Airflow Design | Spray Booth Air Flow Guide"
      metaDescription="Use this paint booth ventilation and airflow design guide to compare downdraft vs crossdraft, define makeup air needs, and validate spray booth air flow before project scope is approved."
      breadcrumbs={[
        { label: "Resources", href: "/resources" },
        { label: "Standards & Compliance", href: "/resources/standards-compliance" },
        { label: "Paint Booth Ventilation and Airflow Design Guide" },
      ]}
      structuredData={structuredData}
      canonicalPath="/resources/standards-compliance/ventilation-airflow"
    >
      <AnswerBox>
        Paint booth ventilation design should control overspray capture, vapor dilution, and finish stability together.
        Good spray booth air flow depends on booth type, exhaust capacity, makeup air, filter loading, and how the part
        actually sits in the airflow path.
      </AnswerBox>

      <p className="mt-8 mb-6 text-lg text-muted-foreground">
        Search queries like paint booth ventilation design, spray booth ventilation design, paint booth airflow design,
        and spray booth air flow all point to the same real problem: teams need to know whether the booth can stay
        stable in production, not just on a layout drawing.
      </p>
      <p className="mb-10 text-muted-foreground">
        This page explains how to evaluate that stability before you lock booth scope, especially when crossdraft booth
        designs, retrofit constraints, or facility limits make the answer less obvious than “just add more airflow.”
      </p>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">The four inputs behind paint booth ventilation design</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {designInputs.map((input) => (
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
        <h2 className="mb-4 text-2xl font-semibold">How booth type changes airflow behavior</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {boothComparisons.map((booth) => (
            <Card key={booth.type}>
              <CardContent className="pt-6">
                <h3 className="mb-3 flex items-center gap-2 text-base font-semibold">
                  <Wind className="h-4 w-4 text-accent" />
                  {booth.type}
                </h3>
                <p className="mb-3 text-sm text-muted-foreground">
                  <strong className="text-foreground">Best fit:</strong> {booth.bestFit}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Watch for:</strong> {booth.watchFor}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-muted-foreground">
          If booth type is still undecided, use{" "}
          <Link
            to="/resources/knowledge/downdraft-vs-crossdraft-vs-side-draft"
            className="text-primary underline underline-offset-4"
          >
            downdraft vs crossdraft vs side-draft
          </Link>{" "}
          as the more focused comparison page.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">What to validate before approving the booth scope</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="py-3 px-4 text-left font-semibold text-foreground">Check</th>
                <th className="py-3 px-4 text-left font-semibold text-foreground">Why it matters</th>
              </tr>
            </thead>
            <tbody>
              {validationChecks.map((check) => (
                <tr key={check.item} className="border-b border-border align-top">
                  <td className="py-4 px-4 font-medium text-foreground">{check.item}</td>
                  <td className="py-4 px-4 text-muted-foreground">{check.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">Why makeup air breaks more projects than expected</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-2 flex items-center gap-2 text-base font-semibold">
                <Gauge className="h-4 w-4 text-accent" />
                Stable pressure is a finish issue
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                When makeup air is undersized or poorly distributed, the booth pulls uncontrolled air from doors, gaps,
                conveyors, and operator openings. That becomes a finish-consistency problem long before it looks like a
                mechanical problem.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-2 flex items-center gap-2 text-base font-semibold">
                <Layers className="h-4 w-4 text-accent" />
                Building constraints move the answer
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Heating, cooling, humidity control, and available utility capacity can change whether the preferred
                ventilation concept is realistic. This is why airflow design has to stay connected to facility review.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">Common paint booth airflow design mistakes</h2>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-3">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
            <span>Using nominal fan capacity as proof of performance instead of validating real operating conditions.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
            <span>Separating booth measurements from airflow decisions even though part size, fixture logic, and service access disturb the flow path.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
            <span>Ignoring filter-loading behavior, then acting surprised when airflow drifts after startup.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
            <span>Treating makeup air as a building problem only, even though it directly affects spray quality and booth stability.</span>
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">Frequently asked questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {ventFaqs.map((faq, index) => (
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
            <Link
              to="/resources/knowledge/paint-booth-sizing-measurements"
              className="text-primary underline underline-offset-4"
            >
              Paint booth sizing and measurements
            </Link>
            {" "}for the clearance, envelope, and footprint side of the same decision.
          </li>
          <li>
            <Link
              to="/resources/knowledge/paint-booth-design-basics"
              className="text-primary underline underline-offset-4"
            >
              Paint booth design basics
            </Link>
            {" "}for layout-stage booth selection and retrofit framing.
          </li>
          <li>
            <Link
              to="/resources/equipment/paint-booth-filtration"
              className="text-primary underline underline-offset-4"
            >
              Paint booth filtration
            </Link>
            {" "}for filter loading and maintenance strategy.
          </li>
          <li>
            <Link to="/quote" className="text-primary underline underline-offset-4">
              Discuss booth airflow constraints with TD
            </Link>
            {" "}if the ventilation concept is changing project scope.
          </li>
        </ul>
      </section>

      <section className="rounded-lg bg-muted/30 p-6 md:p-8">
        <h2 className="mb-2 text-xl font-semibold">Need help checking a booth concept?</h2>
        <p className="mb-4 text-muted-foreground">
          We can review booth type, paint booth measurements, airflow path, and makeup air assumptions before the
          project gets locked around the wrong ventilation concept.
        </p>
        <Button asChild>
          <Link to="/quote">
            Start a booth review <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>
    </ResourcePageLayout>
  );
}
