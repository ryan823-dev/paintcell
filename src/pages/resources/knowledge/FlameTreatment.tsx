import { ArrowRight, Award, Calendar, Gauge, Settings2, ShieldCheck, User } from "lucide-react";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { AnswerBox, ResourcePageLayout } from "@/components/resources";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const faqs = [
  {
    q: "What is flame treatment of plastics?",
    a: "Flame treatment of plastics is a surface-activation process that briefly exposes low-surface-energy polymers to a controlled flame. The treatment increases surface energy, improves wetting, and helps paint or primer bond to plastics such as PP, PE, and TPO.",
  },
  {
    q: "When should you use flame treatment for adhesion?",
    a: "Use flame treatment for adhesion when the plastic substrate has poor natural wetting and the coating system depends on reliable primer or topcoat bonding. It is common on automotive bumpers, trim, housings, and molded parts made from polyolefin materials.",
  },
  {
    q: "Is flame treating plastic better than doing nothing before painting?",
    a: "For low-surface-energy plastics, yes. Flame treating plastic can be the difference between stable adhesion and repeated failures in cross-hatch testing, edge peel, or early delamination after handling and environmental exposure.",
  },
  {
    q: "Can flame treatment run in the same automated cell as painting?",
    a: "Yes. Many projects combine flame treatment and robotic painting in one controlled cell so the part moves from activation into primer or topcoat quickly, with less contamination risk and less handling variation between steps.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      headline: "Flame Treatment of Plastics for Paint Adhesion",
      description:
        "Guide to flame treatment of plastics covering why it improves paint adhesion, where it fits, key process parameters, and how integrated robotic cells reduce variation.",
      author: { "@type": "Organization", name: "TD Engineering Team" },
      publisher: { "@type": "Organization", name: "TD Painting Systems" },
      datePublished: "2026-03-18",
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

const parameterCards = [
  {
    title: "Surface-energy target",
    body: "The goal is not visible scorching. The real target is a stable increase in surface energy so primer and topcoat wet the part consistently.",
  },
  {
    title: "Distance and speed",
    body: "Flame distance, robot path speed, overlap, and part presentation have to stay disciplined. Variation here usually shows up later as inconsistent adhesion or local overheating.",
  },
  {
    title: "Treatment-to-paint window",
    body: "The longer treated parts sit in storage or dusty handling flow, the more likely the activation benefit degrades before coating starts.",
  },
  {
    title: "Part sensitivity",
    body: "Thin ribs, sharp edges, cosmetic faces, and mixed-thickness molded parts can respond very differently to the same burner settings.",
  },
];

export default function FlameTreatment() {
  const handleConsultation = () => {
    sessionStorage.setItem(
      "project-init-message",
      "I need help evaluating flame treatment of plastics for paint adhesion on low-surface-energy parts.",
    );
    const button = document.querySelector('[data-assistant-trigger]') as HTMLButtonElement | null;
    button?.click();
  };

  return (
    <ResourcePageLayout
      title="Flame Treatment of Plastics for Paint Adhesion"
      metaTitle="Flame Treatment of Plastics | Paint Adhesion Guide for Plastic Parts"
      metaDescription="Learn when flame treatment of plastics improves paint adhesion, which parts need it, what process parameters matter, and how integrated robotic cells reduce variation."
      breadcrumbs={[
        { label: "Resources", href: "/resources" },
        { label: "Engineering Library", href: "/resources/engineering-library" },
        { label: "Flame Treatment of Plastics for Paint Adhesion" },
      ]}
      structuredData={structuredData}
      canonicalPath="/resources/knowledge/flame-treatment"
    >
      <div className="mb-6 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <User className="h-3 w-3" /> TD Engineering Team
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="h-3 w-3" /> Updated Apr 2026
        </span>
        <span className="flex items-center gap-1">
          <Award className="h-3 w-3" /> Adhesion guide
        </span>
      </div>

      <AnswerBox>
        Flame treatment of plastics improves paint adhesion by raising surface energy on difficult substrates such as
        PP, PE, and TPO. It is most useful when low-surface-energy plastic parts need stable primer or topcoat bonding
        before robotic or manual spray application.
      </AnswerBox>

      <p className="mt-8 mb-6 text-lg text-muted-foreground">
        Searchers asking about flame treatment of plastics usually want one practical answer: when does it actually
        make paint stick better? The short answer is that flame treatment for adhesion matters when the molded part
        itself is the weak point, not the spray gun.
      </p>
      <p className="mb-10 text-muted-foreground">
        In automotive exterior parts, appliance plastics, and other low-surface-energy substrates, coating failure is
        often traced back to wetting and bonding limits. That makes flame treating plastic a process-stability
        decision, not just a pretreatment label.
      </p>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">Why flame treatment of plastics matters</h2>
        <p className="mb-4 text-muted-foreground">
          Polyolefin plastics such as polypropylene, polyethylene, and TPO are common because they are durable and
          economical, but they are also difficult to coat. Their low surface energy makes paint bead, drift, or fail
          adhesion testing unless the surface is activated first.
        </p>
        <p className="text-muted-foreground">
          Flame treatment briefly oxidizes the surface so coating can wet and anchor more reliably. When the process is
          stable, it reduces adhesion failures, rework, and the hidden variability that otherwise shows up later as edge
          peel, fish eyes, or delamination.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">When flame treating plastic is usually justified</h2>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-3">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
            <span>PP, PE, or TPO parts fail wetting or cross-hatch adhesion without pretreatment.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
            <span>Decorative or visible parts need more reliable topcoat adhesion than manual surface prep can provide.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
            <span>Manual pretreatment creates uneven coverage, inconsistent timing, or overheating risk.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
            <span>The line needs a repeatable pretreatment step before robotic primer, basecoat, or clearcoat.</span>
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">Key process parameters that control adhesion outcome</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {parameterCards.map((card) => (
            <Card key={card.title}>
              <CardContent className="pt-6">
                <h3 className="mb-2 flex items-center gap-2 text-base font-semibold">
                  <Settings2 className="h-4 w-4 text-accent" />
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{card.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">What integrated robotic cells improve</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-2 flex items-center gap-2 text-base font-semibold">
                <Gauge className="h-4 w-4 text-accent" />
                Consistent burner path
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Robot motion keeps distance, overlap, and travel logic repeatable across large part families and cosmetic
                surfaces.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-2 flex items-center gap-2 text-base font-semibold">
                <ShieldCheck className="h-4 w-4 text-accent" />
                Less handling variation
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Moving directly from flame treatment into coating shortens the opportunity for contamination and timing
                drift.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-2 flex items-center gap-2 text-base font-semibold">
                <ArrowRight className="h-4 w-4 text-accent" />
                Easier recipe discipline
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Programs can align pretreatment settings, coating recipe, and part family logic instead of relying on
                operator memory.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">Common reasons flame treatment for adhesion still fails</h2>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-3">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
            <span>The substrate family was never confirmed, so the line uses one treatment assumption for very different plastics.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
            <span>Burner distance and path overlap drift over time, leaving untreated or overheated zones.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
            <span>Activated parts wait too long before coating or collect dust and oil during transfer.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
            <span>The project treats adhesion as a spray issue when the real gap is surface preparation discipline.</span>
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

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">Read next</h2>
        <ul className="space-y-3 text-muted-foreground">
          <li>
            <Link
              to="/resources/knowledge/flame-treatment-vs-plasma-treatment"
              className="text-primary underline underline-offset-4"
            >
              Flame treatment vs plasma treatment
            </Link>
            {" "}for pretreatment method selection.
          </li>
          <li>
            <Link
              to="/resources/knowledge/integrated-flame-treatment-cell-vs-pretreatment-line"
              className="text-primary underline underline-offset-4"
            >
              Integrated flame-treatment cell vs pretreatment line
            </Link>
            {" "}for layout and handling strategy.
          </li>
          <li>
            <Link to="/industries/automotive-exterior-parts" className="text-primary underline underline-offset-4">
              Automotive exterior parts
            </Link>
            {" "}for the plastic-parts industry context behind most flame-treatment projects.
          </li>
          <li>
            <Link to="/solutions/robotic-painting-system" className="text-primary underline underline-offset-4">
              Robotic paint automation system
            </Link>
            {" "}for integrated cell scope once pretreatment is part of the project boundary.
          </li>
        </ul>
      </section>

      <section className="rounded-lg bg-muted/30 p-6 md:p-8">
        <h2 className="mb-2 text-xl font-semibold">Need help scoping flame treatment for plastic parts?</h2>
        <p className="mb-4 text-muted-foreground">
          We can review substrate family, adhesion target, cell layout, and whether flame treatment belongs in a
          standalone pretreatment station or inside a combined robotic painting cell.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button onClick={handleConsultation}>
            Start consultation <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" asChild>
            <Link to="/quote">Share part details</Link>
          </Button>
        </div>
      </section>
    </ResourcePageLayout>
  );
}
