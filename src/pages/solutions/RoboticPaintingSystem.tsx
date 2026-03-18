import { useEffect, useState, useMemo } from "react";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Helmet } from "react-helmet-async";
import {
  ChevronRight, Sparkles, Layers, Settings2, BarChart3,
  AlertTriangle, Clock, HelpCircle, ArrowRight, BookOpen,
  Shield, Wrench, Target, CheckCircle2, User, CalendarDays, FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from "@/components/ui/accordion";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AIChatDrawer } from "@/components/ai-assistant/AIChatDrawer";
import { ExploreLinks } from "@/components/seo/ExploreLinks";
import { useI18n } from "@/i18n";

const DOMAIN = "https://tdpaint.com";

const jsonLdSchemas_static = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${DOMAIN}/#organization`,
    "name": "TD Robotic Painting Systems",
    "url": DOMAIN,
    "logo": `${DOMAIN}/images/td-logo.png`,
    "description": "Engineering and integration of robotic painting systems and paint booth automation.",
    "contactPoint": { "@type": "ContactPoint", "contactType": "sales", "email": "info@tdpaint.com" },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${DOMAIN}/#website`,
    "name": "TD Robotic Painting Systems",
    "url": `${DOMAIN}/`,
    "publisher": { "@id": `${DOMAIN}/#organization` },
    "inLanguage": "en",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${DOMAIN}/solutions/robotic-painting-system#service`,
    "name": "Robotic Painting System Integration",
    "description": "End-to-end integration of robotic spray painting cells and paint booth automation for automotive components and industrial finishing, including robot selection, spray process configuration, controls integration, commissioning, and ATEX-ready options where required.",
    "provider": { "@id": `${DOMAIN}/#organization` },
    "serviceType": "Industrial Automation",
    "areaServed": "Worldwide",
    "audience": { "@type": "Audience", "audienceType": "Manufacturers" },
    "mainEntityOfPage": { "@id": `${DOMAIN}/solutions/robotic-painting-system#webpage` },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${DOMAIN}/solutions/robotic-painting-system#breadcrumb`,
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `${DOMAIN}/` },
      { "@type": "ListItem", "position": 2, "name": "Solutions", "item": `${DOMAIN}/solutions/` },
      { "@type": "ListItem", "position": 3, "name": "Robotic Painting System", "item": `${DOMAIN}/solutions/robotic-painting-system` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${DOMAIN}/solutions/robotic-painting-system#webpage`,
    "name": "Robotic Painting System Integrator | Robotic Spray Painting Cells & Paint Booth Automation | TD",
    "url": `${DOMAIN}/solutions/robotic-painting-system`,
    "isPartOf": { "@id": `${DOMAIN}/#website` },
    "mainEntity": { "@id": `${DOMAIN}/solutions/robotic-painting-system#service` },
    "inLanguage": "en",
  },
];

export default function RoboticPaintingSystem() {
  const { t } = useI18n();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMessage, setDrawerMessage] = useState<string | null>(null);

  const faqs = useMemo(() => [
    { q: t.solutionFaqs.roboticPaintingSystem.q1, a: t.solutionFaqs.roboticPaintingSystem.a1 },
    { q: t.solutionFaqs.roboticPaintingSystem.q2, a: t.solutionFaqs.roboticPaintingSystem.a2 },
    { q: t.solutionFaqs.roboticPaintingSystem.q3, a: t.solutionFaqs.roboticPaintingSystem.a3 },
    { q: t.solutionFaqs.roboticPaintingSystem.q4, a: t.solutionFaqs.roboticPaintingSystem.a4 },
    { q: t.solutionFaqs.roboticPaintingSystem.q5, a: t.solutionFaqs.roboticPaintingSystem.a5 },
    { q: t.solutionFaqs.roboticPaintingSystem.q6, a: t.solutionFaqs.roboticPaintingSystem.a6 },
  ], [t]);

  const jsonLdSchemas = useMemo(() => [
    ...jsonLdSchemas_static,
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${DOMAIN}/solutions/robotic-painting-system#faq`,
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
      })),
    },
  ], [faqs]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const openConsultation = (msg: string) => {
    sessionStorage.setItem("project-init-message", msg);
    setDrawerMessage(msg);
    setDrawerOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Robotic Painting System Integrator | Robotic Spray Painting Cells &amp; Paint Booth Automation | TD</title>
        <meta name="description" content="End-to-end robotic painting system integration for automotive components and industrial finishing. Robot selection (ABB etc.), electrostatic/HVLP/air spray process setup, paint booth automation (new or retrofit), controls integration, commissioning, and fast deployment." />
        <link rel="canonical" href={`${DOMAIN}/solutions/robotic-painting-system`} />
        {jsonLdSchemas.map((schema, i) => (
          <script key={i} type="application/ld+json">{JSON.stringify(schema)}</script>
        ))}
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-muted/30">
          <div className="container-wide py-3">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbLink asChild><Link to="/solutions">Solutions</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbPage>Robotic Painting System</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Hero */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-20">
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent text-[11px] font-semibold tracking-wider uppercase">
              <Sparkles className="h-3 w-3" />
              Pillar Solution
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold mb-4 leading-tight max-w-3xl">
              Robotic Painting System Integration (Automotive Components &amp; Industrial Finishing)
            </h1>
          </div>
        </section>

        {/* Definition Block */}
        <section className="border-b border-border ">
          <div className="container-narrow py-12 md:py-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Definition</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A robotic painting system is an integrated automation solution combining industrial robots, spray technologies, paint supply systems, paint booth environment control, and process coordination to deliver repeatable finish quality and stable production throughput.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              TD Robotic Painting Systems engineers and integrates robotic painting cells and automated painting workstations for automotive component manufacturers and industrial finishing applications worldwide, including ATEX-ready configurations where required based on site classification and paint process requirements.
            </p>
          </div>
        </section>

        {/* What This Solution Covers */}
        <section className="border-b border-border">
          <div className="container-narrow py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Wrench className="h-3.5 w-3.5" />
              System-level scope
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">What This Solution Covers</h2>
            <p className="text-muted-foreground text-sm mb-6">This solution covers end-to-end integration, including:</p>
            <ul className="space-y-2">
              {[
                "robotic spray painting cell engineering and layout integration",
                "robot selection and configuration (ABB / FANUC / KUKA / others)",
                "spray technology selection: electrostatic / HVLP / air spray",
                "paint supply coordination (pump / pressure tank) and process control interfaces",
                <>paint booth automation: new booth build or retrofit into existing booths — see <Link to="/solutions/paint-booth-automation" className="text-accent hover:text-accent/80 underline">Paint Booth Automation</Link></>,
                "airflow/ventilation considerations and overspray management interfaces",
                "controls integration (PLC + robot controller + HMI) and safety interlocks",
                "commissioning, testing, installation support, and production startup optimization",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-1 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground/60 mt-4 italic">This is system integration, not standalone equipment supply.</p>
          </div>
        </section>

        {/* Typical Applications */}
        <section className="border-b border-border ">
          <div className="container-narrow py-12 md:py-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Typical Applications</h2>
            <p className="text-muted-foreground text-sm mb-6">Robotic painting systems are commonly deployed for:</p>
            <ul className="space-y-2">
              {[
                <><Link to="/industries/automotive-painting" className="text-accent hover:text-accent/80 underline">automotive component painting</Link> requiring stable finish consistency</>,
                "high-throughput manufacturing seeking reduced rework and downtime",
                "parts with complex geometry requiring repeatable spray paths",
                "upgrade projects migrating from manual spraying to automated cells",
                "operations requiring controlled booth conditions and safer process monitoring",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-1 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground/60 mt-4 italic">Final feasibility depends on part geometry, coating specification, throughput targets, and site constraints.</p>
          </div>
        </section>

        {/* Configuration Options */}
        <section className="border-b border-border">
          <div className="container-narrow py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Settings2 className="h-3.5 w-3.5" />
              Selection logic
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Configuration Options</h2>
            <p className="text-muted-foreground text-sm mb-6">A robotic painting system configuration is defined based on:</p>
            <ul className="space-y-2">
              {[
                <>application: <Link to="/industries/automotive-painting" className="text-accent hover:text-accent/80 underline">automotive components</Link> / <Link to="/industries/appliance-coating" className="text-accent hover:text-accent/80 underline">appliance parts</Link> / <Link to="/industries/metal-parts-finishing" className="text-accent hover:text-accent/80 underline">metal parts finishing</Link></>,
                <>new booth build vs integration into an existing paint booth — see <Link to="/solutions/paint-booth-automation" className="text-accent hover:text-accent/80 underline">Paint Booth Automation</Link></>,
                "spray technology: electrostatic / HVLP / air spray",
                "part size and geometry constraints",
                "throughput targets (parts/hour) and takt time requirements",
                "color change and changeover requirements",
                <>robot brand preference (ABB / FANUC / KUKA / others) — see <Link to="/resources/knowledge/how-to-choose-paint-robot" className="text-accent hover:text-accent/80 underline">How to Choose a Paint Robot</Link></>,
                "ATEX requirements where applicable",
                "controls integration scope and site standards",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-1 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Paint Booth Automation */}
        <section className="border-b border-border ">
          <div className="container-narrow py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Layers className="h-3.5 w-3.5" />
              Booth integration
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Paint Booth Automation (New Booth + Retrofit)</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              A robotic painting system is only as stable as the booth environment. TD supports:
            </p>
            <ul className="space-y-2">
              {[
                "new paint booth automation aligned with robotic painting cell requirements",
                "retrofit / integration into existing paint booths with minimized disruption",
                "airflow/ventilation requirements and safety interlock integration (scope defined during assessment)",
                "ATEX-ready options where required based on site classification and paint process requirements",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-1 shrink-0">•</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground mt-6">
              For booth-specific scope, see: <Link to="/solutions/paint-booth-automation" className="text-accent hover:text-accent/80 underline inline-flex items-center gap-1">Paint Booth Automation <ArrowRight className="h-3 w-3" /></Link>
            </p>
          </div>
        </section>

        {/* Deployment Timeline */}
        <section className="border-b border-border">
          <div className="container-narrow py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              Deployment
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Deployment Timeline</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Typical lead time depends on integration complexity and site constraints.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-2">A common project range is:</p>
            <p className="font-semibold text-sm mb-2">8–12 weeks after design approval</p>
            <p className="text-xs text-muted-foreground/60 italic">
              (extended for complex retrofits, multi-zone booths, multi-color changeover, or specialized ATEX scopes)
            </p>
          </div>
        </section>

        {/* Benefits and ROI */}
        <section className="border-b border-border ">
          <div className="container-narrow py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <BarChart3 className="h-3.5 w-3.5" />
              Production benefits
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Benefits and ROI</h2>
            <p className="text-muted-foreground text-sm mb-6">Robotic painting system integration can enable:</p>
            <ul className="space-y-2">
              {[
                "more repeatable finish quality and reduced process variability",
                "stabilized throughput with reduced rework and downtime",
                "reduced dependency on manual spraying labor",
                "improved process monitoring and safer operations",
                "scalable automation for production expansion",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground/60 mt-4 italic">
              ROI depends on throughput, defect rate reduction, and process stability improvements.
              For cost planning, see <Link to="/resources/knowledge/robotic-painting-cost-guide" className="text-accent hover:text-accent/80 underline">Robotic Painting Cost Guide</Link>.
            </p>
          </div>
        </section>

        {/* Implementation Workflow */}
        <section className="border-b border-border">
          <div className="container-narrow py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              Project steps
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Implementation Workflow</h2>
            <div className="space-y-4">
              {[
                { step: "Assessment", desc: "Parts, coating spec, throughput, booth situation, ATEX classification if applicable" },
                { step: "Scope definition", desc: "Robot + process + booth + controls integration boundaries" },
                { step: "Layout and integration design", desc: "" },
                { step: "Manufacturing / assembly planning", desc: "" },
                { step: "Testing and verification", desc: "FAT/SAT as applicable" },
                { step: "Installation and commissioning", desc: "" },
                { step: "Production startup and optimization", desc: "" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="flex flex-col items-center">
                    <span className="flex items-center justify-center h-8 w-8 rounded-full bg-accent text-accent-foreground text-xs font-bold shrink-0">{i + 1}</span>
                    {i < 6 && <div className="w-px flex-1 bg-border mt-1" />}
                  </div>
                  <div className="pb-4">
                    <h3 className="font-semibold text-sm">{item.step}</h3>
                    {item.desc && <p className="text-muted-foreground text-sm">{item.desc}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Initiation */}
        <section className="border-b border-border ">
          <div className="container-narrow py-12 md:py-16">
            <h2 className="text-xl font-bold mb-3">Start Your Robotic Painting System Assessment</h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-xl">
              Tell us about your parts, coating requirements, throughput targets, and whether you need a new booth or integration into an existing booth. If applicable, include ATEX site classification.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => openConsultation("I need a robotic painting system assessment. I want to discuss parts, coating requirements, throughput targets, and booth situation.")}
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-11 px-6 gap-2 rounded-xl"
              >
                Start Project Assessment <ChevronRight className="h-4 w-4" />
              </Button>
              <Button asChild variant="outline" className="h-11 px-6 rounded-xl">
                <Link to="/quote">Talk to an Engineer</Link>
              </Button>
              <Button
                variant="outline"
                className="h-11 px-6 rounded-xl"
                onClick={() => openConsultation("I'd like to upload part drawings for a robotic painting system project.")}
              >
                Upload Part Drawings
              </Button>
            </div>
          </div>
        </section>

        {/* E-E-A-T Block */}
        <section className="border-b border-border">
          <div className="container-narrow py-8 md:py-10">
            <div className="flex flex-wrap gap-6 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                Author: TD Engineering Team
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" />
                Last updated: 2026-02-12
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5" />
                Scope: Robotic painting system integration, robotic spray painting cells, and paint booth automation, including ATEX-ready integration where required. Specifications and timelines depend on application and site classification.
              </span>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-border">
          <div className="container-narrow py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <HelpCircle className="h-3.5 w-3.5" />
              FAQ
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <Accordion type="multiple" defaultValue={faqs.map((_, i) => `faq-${i}`)} className="space-y-2">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-5 bg-card">
                  <AccordionTrigger className="text-sm font-medium text-left py-4 hover:no-underline">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Explore Links */}
        <ExploreLinks currentPath="/solutions/robotic-painting-system" />
      </div>

      <AIChatDrawer open={drawerOpen} onOpenChange={setDrawerOpen} initialProjectMessage={drawerMessage} />
    </>
  );
}
