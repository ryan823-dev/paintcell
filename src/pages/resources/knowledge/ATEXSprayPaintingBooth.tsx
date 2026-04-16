import { AlertTriangle, ArrowRight, ShieldCheck, Wind } from "lucide-react";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { AnswerBox, ResourcePageLayout } from "@/components/resources";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const faqs = [
  {
    q: "What does ATEX directive zone classification mean for a spray painting booth?",
    a: "For a spray painting booth, ATEX directive zone classification is the practical exercise of defining where an explosive atmosphere can exist during normal operation or credible upset conditions. That decision changes equipment suitability, control logic, ventilation expectations, and retrofit scope.",
  },
  {
    q: "Why do buyers search for ATEX directive 1999/92/EC in spray booth projects?",
    a: "Buyers usually use ATEX directive 1999/92/EC as a shorthand reference for workplace hazardous-area planning. In practice, the engineering team still has to translate that framework into real booth zoning, airflow validation, ignition-source control, and equipment selection for the actual process.",
  },
  {
    q: "Does waterborne paint remove ATEX zone classification from a spray painting booth?",
    a: "Not automatically. Waterborne chemistry may reduce solvent vapor load, but cleaning media, flash-off behavior, purge routines, and actual operating conditions can still create classified zones that need disciplined review.",
  },
  {
    q: "How does ATEX zoning for aerosol machines relate to spray booth design?",
    a: "The logic is similar in one important way: aerosolized flammable material, ventilation quality, and enclosed-space behavior determine how serious the explosive-atmosphere risk is. For spray booths, the engineering answer still has to be based on the real booth process, not on a borrowed generic label.",
  },
];

const decisionCards = [
  {
    title: "Process chemistry",
    body: "Paint type, solvent content, cleaning media, and flash-off behavior define the starting risk picture.",
  },
  {
    title: "Airflow behavior",
    body: "Zone classification depends on how reliably the booth dilutes and removes vapor and overspray under real production conditions.",
  },
  {
    title: "Equipment boundary",
    body: "Motors, sensors, robots, valves, controls, and interfaces have to be judged against the actual classified envelope, not a generic assumption.",
  },
  {
    title: "Upset conditions",
    body: "Purge failures, blocked filters, maintenance doors, and abnormal cleaning events can expand the real risk envelope if the design ignores them.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      headline: "ATEX Directive Zone Classification for Spray Painting Booths",
      description:
        "Practical hub page for ATEX directive zone classification in spray painting booths, covering zoning logic, ventilation, equipment boundary, and support pages for design and retrofit decisions.",
      author: { "@type": "Organization", name: "TD Engineering Team" },
      publisher: { "@type": "Organization", name: "TD Painting Systems" },
      datePublished: "2026-04-16",
      dateModified: "2026-04-16",
      inLanguage: "en",
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
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

export default function ATEXSprayPaintingBooth() {
  return (
    <ResourcePageLayout
      title="ATEX Directive Zone Classification for Spray Painting Booths"
      metaTitle="ATEX Directive Zone Classification for Spray Painting Booths | Complete Guide"
      metaDescription="Use this ATEX directive zone classification guide to understand spray painting booth zoning, airflow, ignition control, retrofit risk, and the support pages needed for real project scope."
      breadcrumbs={[
        { label: "Resources", href: "/resources" },
        { label: "Standards & Compliance", href: "/resources/standards-compliance" },
        { label: "ATEX Directive Zone Classification for Spray Painting Booths" },
      ]}
      structuredData={structuredData}
      canonicalPath="/resources/standards-compliance/atex-zone-classification-spray-painting-booth"
    >
      <AnswerBox>
        ATEX directive zone classification for spray painting booths should start with the real coating process:
        chemistry, ventilation behavior, ignition sources, and the parts of the system that sit inside the classified
        envelope. It is an engineering decision, not a label you add after equipment is chosen.
      </AnswerBox>

      <p className="mt-8 mb-6 text-lg text-muted-foreground">
        This page is the hub for buyers who keep seeing variations of the same query: ATEX directive zone
        classification spray painting booth, ATEX directive 1999/92/EC zone classification spray painting booth, ATEX
        directive spray booth zone classification, and similar long-tail searches.
      </p>
      <p className="mb-10 text-muted-foreground">
        The common problem behind all of them is simple. Teams need one place that explains how zoning logic affects
        booth design, retrofit feasibility, robot package choice, ventilation assumptions, and what has to be checked
        before scope is approved.
      </p>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">What actually determines zone classification in a spray booth</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {decisionCards.map((card) => (
            <Card key={card.title}>
              <CardContent className="pt-6">
                <h3 className="mb-2 flex items-center gap-2 text-base font-semibold">
                  <ShieldCheck className="h-4 w-4 text-accent" />
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{card.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">How ATEX directive 1999/92/EC shows up in project work</h2>
        <p className="mb-4 text-muted-foreground">
          Buyers often reference ATEX directive 1999/92/EC when they mean workplace hazardous-area planning for the
          booth environment. That is a useful starting signal, but a real project still has to answer more grounded
          questions:
        </p>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-3">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
            <span>What vapor and aerosol behavior exists during real production, cleaning, and upset conditions?</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
            <span>Which equipment items are inside the zone, adjacent to it, or functionally tied to it?</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
            <span>Can the booth ventilation concept keep the classified-space assumptions credible over time?</span>
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">Where booth projects usually get into trouble</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-2 flex items-center gap-2 text-base font-semibold">
                <Wind className="h-4 w-4 text-accent" />
                Airflow assumed, not validated
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Teams inherit a booth and assume the exhaust nameplate proves safe zoning logic. Real performance often
                says otherwise.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-2 flex items-center gap-2 text-base font-semibold">
                <AlertTriangle className="h-4 w-4 text-accent" />
                Hardware chosen too early
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Robots, sensors, or cabinets are selected before the classified boundary is fixed, creating expensive
                rework later.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-2 flex items-center gap-2 text-base font-semibold">
                <ArrowRight className="h-4 w-4 text-accent" />
                Retrofit savings overstated
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Ventilation fixes, cabinet relocation, interlocks, and downtime can erase the apparent savings of an
                “easy” retrofit.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">Use this hub as the entry point, then branch by question</h2>
        <ul className="space-y-3 text-muted-foreground">
          <li>
            <Link
              to="/resources/knowledge/zone-1-vs-zone-2-spray-painting-booth"
              className="text-primary underline underline-offset-4"
            >
              Zone 1 vs Zone 2 for spray booths
            </Link>
            {" "}if the main issue is what the zone decision changes in cost and equipment scope.
          </li>
          <li>
            <Link
              to="/resources/knowledge/how-to-design-atex-compliant-spray-painting-booth"
              className="text-primary underline underline-offset-4"
            >
              ATEX-compliant spray booth design guide
            </Link>
            {" "}if the main issue is layout, ventilation, and engineering workflow.
          </li>
          <li>
            <Link
              to="/resources/articles/common-atex-classification-mistakes-spray-booth-projects"
              className="text-primary underline underline-offset-4"
            >
              Common ATEX classification mistakes
            </Link>
            {" "}if the team is already worried about retrofit risk and scope drift.
          </li>
          <li>
            <Link to="/resources/standards-compliance/ventilation-airflow" className="text-primary underline underline-offset-4">
              Paint booth ventilation and airflow
            </Link>
            {" "}if the zoning discussion is really blocked by airflow assumptions.
          </li>
          <li>
            <Link to="/solutions/paint-booth-automation" className="text-primary underline underline-offset-4">
              Paint booth automation
            </Link>
            {" "}if the project is moving from compliance logic into implementation scope.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">Frequently asked questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.q} value={`faq-${index}`}>
              <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="rounded-lg bg-muted/30 p-6 md:p-8">
        <h2 className="mb-2 text-xl font-semibold">Need a classified-booth scope review?</h2>
        <p className="mb-4 text-muted-foreground">
          We can help map zoning logic, ventilation assumptions, and equipment boundary so the ATEX discussion turns
          into a real engineering scope instead of a late-stage compliance surprise.
        </p>
        <Link
          to="/quote"
          className="inline-flex items-center font-medium text-primary underline underline-offset-4"
        >
          Discuss an ATEX spray booth project <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </section>
    </ResourcePageLayout>
  );
}
