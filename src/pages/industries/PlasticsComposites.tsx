import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ChevronRight, Send, AlertTriangle, Layers, Settings2,
  Clock, HelpCircle, Bot, MessageSquare, Upload,
  User, CalendarDays, FileText, CheckCircle2, Shield,
  Target, Wrench, BarChart3, Shapes
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from "@/components/ui/accordion";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { ExploreLinks } from "@/components/seo/ExploreLinks";

const DOMAIN = "https://tdpaintcell.com";

const faqs = [
  {
    question: "What is plastics coating automation?",
    answer: "Plastics coating automation is the engineering and integration of robotic spray systems, controlled booths, and specialized coating processes to deliver consistent, adhesion-critical finishes on plastic and composite substrates with repeatable quality.",
  },
  {
    question: "Why is painting plastics different from metal?",
    answer: "Plastics present unique challenges including surface energy/adhesion issues, static buildup, heat sensitivity, and outgassing. Proper surface preparation (flame treatment, plasma, primers) and spray parameters are critical for coating adhesion and durability.",
  },
  {
    question: "What surface preparation is needed for plastics?",
    answer: "Depending on substrate, preparation may include cleaning/degreasing, flame treatment, plasma treatment, adhesion promoters, or conductive primers. The appropriate method is determined during the feasibility assessment.",
  },
  {
    question: "Can robots handle complex plastic part geometries?",
    answer: "Yes. 6-axis robots with offline programming can access complex curves, undercuts, and interior surfaces common in plastic parts. Vision systems can compensate for part-to-part variation from molding processes.",
  },
  {
    question: "What about electrostatic spraying on non-conductive plastics?",
    answer: "Non-conductive plastics can be electrostatically sprayed using conductive primers or specialized techniques. This improves transfer efficiency and wraparound coverage on complex shapes.",
  },
  {
    question: "How long does deployment typically take?",
    answer: "Typically 10-14 weeks after design approval, depending on surface preparation requirements, coating complexity, and integration scope.",
  },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${DOMAIN}/#organization`,
    name: "TD Robotic Painting Systems",
    url: DOMAIN,
    logo: `${DOMAIN}/images/td-logo.png`,
    description: "Engineering and integration of robotic painting systems and paint booth automation.",
    contactPoint: { "@type": "ContactPoint", contactType: "sales", email: "info@tdpaintcell.com" },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${DOMAIN}/#website`,
    name: "TD Robotic Painting Systems",
    url: `${DOMAIN}/`,
    publisher: { "@id": `${DOMAIN}/#organization` },
    inLanguage: "en",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${DOMAIN}/industries/plastics-composites#service`,
    name: "Plastics & Composites Coating Automation",
    description: "Engineering and integration of robotic spray coating systems for plastic and composite parts. Specialized surface preparation, adhesion-optimized processes, and consistent finish quality for automotive, consumer, and industrial plastic components.",
    provider: { "@id": `${DOMAIN}/#organization` },
    serviceType: "Robotic Coating System Integration",
    areaServed: "Worldwide",
    audience: { "@type": "Audience", audienceType: "Plastic part manufacturers, automotive suppliers, consumer products companies" },
    mainEntityOfPage: { "@id": `${DOMAIN}/industries/plastics-composites#webpage` },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${DOMAIN}/industries/plastics-composites#faq`,
    mainEntity: faqs.map(f => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${DOMAIN}/industries/plastics-composites#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${DOMAIN}/` },
      { "@type": "ListItem", position: 2, name: "Industries", item: `${DOMAIN}/industries/` },
      { "@type": "ListItem", position: 3, name: "Plastics & Composites", item: `${DOMAIN}/industries/plastics-composites` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${DOMAIN}/industries/plastics-composites#webpage`,
    name: "Plastics & Composites Coating Automation",
    url: `${DOMAIN}/industries/plastics-composites`,
    isPartOf: { "@id": `${DOMAIN}/#website` },
    mainEntity: { "@id": `${DOMAIN}/industries/plastics-composites#service` },
    inLanguage: "en",
  },
];

const workflowSteps = [
  { title: "Assessment", desc: "Substrate analysis, adhesion testing, surface prep evaluation" },
  { title: "Process development", desc: "Surface treatment, primer selection, topcoat optimization" },
  { title: "System design", desc: "Robot selection, spray technology, booth configuration" },
  { title: "Integration", desc: "Surface prep equipment, robot programming, controls" },
  { title: "Validation", desc: "Adhesion testing, appearance verification, durability checks" },
  { title: "Commissioning", desc: "Production trials, operator training, documentation" },
  { title: "Production support", desc: "Ramp-up assistance, optimization, ongoing support" },
];

const productCategories = [
  {
    category: "Automotive Exterior",
    examples: "Bumpers, mirror housings, trim pieces, spoilers, body panels",
  },
  {
    category: "Automotive Interior",
    examples: "Dashboards, door panels, console parts, trim inserts",
  },
  {
    category: "Consumer Electronics",
    examples: "Phone cases, laptop housings, TV bezels, appliance panels",
  },
  {
    category: "Medical & Healthcare",
    examples: "Device housings, equipment covers, diagnostic enclosures",
  },
  {
    category: "Industrial Components",
    examples: "Machine covers, equipment housings, protective enclosures",
  },
  {
    category: "Composite Parts",
    examples: "Carbon fiber components, fiberglass parts, SMC/BMC moldings",
  },
];

export default function PlasticsComposites() {
  const [inputValue, setInputValue] = useState(
    "We manufacture automotive bumpers and need consistent basecoat/clearcoat finish with proper adhesion."
  );
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleStartConsultation = () => {
    sessionStorage.setItem("project-init-message", inputValue.trim());
    sessionStorage.setItem("industry-context", JSON.stringify({
      industry: "plastics",
      finish: "decorative / functional",
      throughput: "medium-high",
    }));
    const btn = document.querySelector("[data-assistant-trigger]") as HTMLButtonElement;
    if (btn) btn.click();
  };

  return (
    <>
      <Helmet>
        <title>Plastics & Composites Coating Automation | Robotic Spray Systems | TD</title>
        <meta name="description" content="Robotic spray coating systems for plastic and composite parts. Specialized surface preparation, adhesion-optimized processes for automotive bumpers, consumer electronics, and industrial plastic components." />
        <link rel="canonical" href={`${DOMAIN}/industries/plastics-composites`} />
        {schemas.map((s, i) => (
          <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
        ))}
      </Helmet>

      <div className="min-h-screen bg-background">

        {/* BREADCRUMB */}
        <div className="container-wide pt-4 pb-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/industries">Industries</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Plastics & Composites</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* 1. HERO */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-20">
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold mb-6 leading-tight">
              Plastics & Composites Coating Automation
            </h1>
            <div className="max-w-3xl space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
              <p>
                Plastics coating automation is the engineering and integration of robotic spray systems, surface preparation equipment, and controlled-environment booths to deliver consistent, adhesion-critical finishes on plastic and composite substrates with repeatable quality and stable production throughput.
              </p>
              <p>
                TD Robotic Painting Systems integrates robotic coating cells for plastic part manufacturers, automotive suppliers, and consumer products companies worldwide, with specialized expertise in adhesion-optimized processes for challenging substrates.
              </p>
            </div>
          </div>
        </section>

        {/* 2. TYPICAL PRODUCTS */}
        <section className="border-b border-border section-gradient">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Target className="h-3.5 w-3.5" />
              Application Scope
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Typical Plastic & Composite Parts</h2>
            <p className="text-muted-foreground mb-6">Plastics coating automation commonly includes:</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {productCategories.map((item, i) => (
                <Card key={i} className="border-border bg-card">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Shapes className="h-4 w-4 text-accent" />
                      {item.category}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">{item.examples}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <p className="text-muted-foreground text-sm">
              Final feasibility depends on substrate type, surface preparation requirements, coating specification, and production volume.
            </p>
          </div>
        </section>

        {/* 3. UNIQUE CHALLENGES */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <AlertTriangle className="h-3.5 w-3.5" />
              Substrate Challenges
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Why Plastics Coating is Different</h2>
            <p className="text-muted-foreground mb-4">Plastic and composite substrates present unique coating challenges:</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside max-w-2xl">
              <li><strong className="text-foreground">Low surface energy:</strong> Many plastics resist wetting and adhesion without proper preparation</li>
              <li><strong className="text-foreground">Static buildup:</strong> Non-conductive surfaces attract dust and affect spray patterns</li>
              <li><strong className="text-foreground">Heat sensitivity:</strong> Limited tolerance for high-temperature curing processes</li>
              <li><strong className="text-foreground">Outgassing:</strong> Trapped solvents or gases from molding can cause defects</li>
              <li><strong className="text-foreground">Dimensional variation:</strong> Part-to-part variation from molding requires adaptive spraying</li>
              <li><strong className="text-foreground">Flexibility requirements:</strong> Coatings must remain flexible without cracking on impact</li>
            </ul>
          </div>
        </section>

        {/* 4. SURFACE PREPARATION */}
        <section className="border-b border-border section-gradient">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Layers className="h-3.5 w-3.5" />
              Surface Preparation
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Adhesion Solutions</h2>
            <p className="text-muted-foreground mb-4">Proper surface preparation is critical for coating adhesion on plastics:</p>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
              <div>
                <h3 className="font-semibold text-sm mb-3">Treatment Methods</h3>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                  <li>Flame treatment (surface activation)</li>
                  <li>Plasma treatment (atmospheric or vacuum)</li>
                  <li>Corona discharge treatment</li>
                  <li>Chemical cleaning and etching</li>
                  <li>Adhesion promoter application</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-3">Primer Systems</h3>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                  <li>Adhesion primers for PP, PE, TPO</li>
                  <li>Conductive primers for electrostatic spraying</li>
                  <li>Flexible primers for TPU/TPE substrates</li>
                  <li>Primer-surfacers for defect hiding</li>
                  <li>One-component and 2K primer systems</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 5. SYSTEM APPROACH */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Settings2 className="h-3.5 w-3.5" />
              Engineering Logic
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Recommended System Approach</h2>
            <p className="text-muted-foreground mb-4">A typical plastics coating system is configured based on:</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside max-w-2xl">
              <li>substrate material (ABS, PP, PC, PA, composites) and surface preparation needs</li>
              <li>robot selection with reach and speed optimized for part geometry</li>
              <li>spray technology matched to coating type (HVLP, electrostatic, air-assisted)</li>
              <li>surface treatment integration (flame, plasma, primer stations)</li>
              <li>booth design with proper airflow and temperature control</li>
              <li>static elimination and grounding systems</li>
              <li>flash-off zones and low-temperature cure options</li>
              <li>vision systems for part detection and spray path adaptation</li>
            </ul>
            <p className="text-muted-foreground text-sm mt-6">
              For system integration overview, see{" "}
              <Link to="/solutions/robotic-painting-system" className="text-accent underline underline-offset-2 hover:text-accent/80">
                Robotic Painting System Integration
              </Link>.
            </p>
          </div>
        </section>

        {/* 6. WHAT TD DELIVERS */}
        <section className="border-b border-border section-gradient">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Wrench className="h-3.5 w-3.5" />
              Scope of Delivery
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">What TD Delivers for Plastics Coating</h2>
            <p className="text-muted-foreground mb-4">TD delivers system-level integration, including:</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside max-w-2xl">
              <li>substrate analysis and adhesion testing during feasibility</li>
              <li>surface preparation system integration (flame, plasma, primer)</li>
              <li>robotic coating cell engineering and integration</li>
              <li>spray booth design optimized for plastics (temperature, airflow, static control)</li>
              <li>coating process development and recipe optimization</li>
              <li>controls, HMI, and recipe management systems</li>
              <li>commissioning, validation testing, and production startup</li>
            </ul>
            <p className="text-muted-foreground text-sm mt-4">This is system integration, not standalone equipment supply.</p>
            <p className="text-muted-foreground text-sm mt-4">
              Related industries:{" "}
              <Link to="/industries/automotive-painting" className="text-accent underline underline-offset-2 hover:text-accent/80">Automotive Painting</Link>
              {" · "}
              <Link to="/industries/appliance-coating" className="text-accent underline underline-offset-2 hover:text-accent/80">Appliance Coating</Link>
            </p>
          </div>
        </section>

        {/* 7. DEPLOYMENT TIMELINE */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              Lead Time
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Deployment Timeline</h2>
            <p className="text-muted-foreground mb-2">Typical lead time depends on substrate complexity and surface preparation requirements.</p>
            <p className="text-muted-foreground mb-2">A common project range is:</p>
            <p className="font-semibold text-foreground text-lg">10-14 weeks after design approval</p>
            <p className="text-muted-foreground text-sm mt-1">
              (extended for complex surface preparation systems, multi-coat processes, or challenging substrates)
            </p>
          </div>
        </section>

        {/* 8. PROJECT INITIATION */}
        <section className="border-b border-border section-gradient">
          <div className="container-wide py-12 md:py-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Start your plastics coating automation assessment
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Tell us about your parts (material, geometry), current coating challenges, finish requirements, and production volume.
            </p>

            <div className={cn(
              "rounded-2xl border transition-all duration-300 p-1 bg-card max-w-2xl mb-6",
              isFocused
                ? "border-accent/40 shadow-[0_0_24px_-5px_hsl(192_70%_38%/0.2)]"
                : "border-border hover:border-accent/20"
            )}>
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleStartConsultation();
                  }
                }}
                className={cn(
                  "min-h-[80px] resize-none border-0 bg-transparent",
                  "text-foreground placeholder:text-muted-foreground/50",
                  "focus-visible:ring-0 focus-visible:ring-offset-0",
                  "text-[15px] leading-relaxed rounded-xl px-5 py-3"
                )}
              />
              <div className="flex items-center justify-end px-3 pb-3 pt-1">
                <Button
                  onClick={handleStartConsultation}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-9 px-5 gap-2 rounded-xl"
                >
                  <Send className="h-3.5 w-3.5" />
                  Start consultation
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={handleStartConsultation}
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-11 px-6 gap-2 rounded-xl"
              >
                <Bot className="h-4 w-4" />
                Start project assessment
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  const btn = document.querySelector("[data-assistant-trigger]") as HTMLButtonElement;
                  if (btn) btn.click();
                }}
                className="h-11 px-6 gap-2 rounded-xl"
              >
                <MessageSquare className="h-4 w-4" />
                Talk to an engineer
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/quote")}
                className="h-11 px-6 gap-2 rounded-xl"
              >
                <Upload className="h-4 w-4" />
                Upload part samples
              </Button>
            </div>
          </div>
        </section>

        {/* 9. WHY ROBOTIC COATING */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <BarChart3 className="h-3.5 w-3.5" />
              Benefits
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Why Robotic Coating for Plastics</h2>
            <p className="text-muted-foreground mb-4">Robotic automation can enable:</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside max-w-2xl">
              <li>consistent film thickness and coverage on complex 3D surfaces</li>
              <li>precise spray parameters for optimal adhesion on challenging substrates</li>
              <li>improved transfer efficiency with electrostatic wraparound</li>
              <li>reduced defects from consistent gun distance and spray angle</li>
              <li>adaptive path adjustment for molding variation</li>
              <li>integrated surface treatment for reliable adhesion</li>
              <li>reduced labor dependency and improved workplace safety</li>
              <li>recipe-based flexibility for multiple part types and colors</li>
            </ul>
            <p className="text-muted-foreground text-sm mt-4">
              Actual outcomes depend on substrate material, coating system, and production requirements.
            </p>
            <p className="text-muted-foreground text-sm mt-4">
              Further reading:{" "}
              <Link to="/resources/knowledge/spray-technology-guide" className="text-accent underline underline-offset-2 hover:text-accent/80">Spray Technology Guide</Link>
              {" · "}
              <Link to="/resources/glossary/electrostatic-spraying" className="text-accent underline underline-offset-2 hover:text-accent/80">Electrostatic Spraying</Link>
            </p>
          </div>
        </section>

        {/* 10. IMPLEMENTATION WORKFLOW */}
        <section className="border-b border-border section-gradient">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Settings2 className="h-3.5 w-3.5" />
              Implementation
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Implementation Workflow</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {workflowSteps.map((step, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span className="flex items-center justify-center h-8 w-8 rounded-full bg-accent text-accent-foreground text-xs font-bold shrink-0">
                      {i + 1}
                    </span>
                    {i < workflowSteps.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                  </div>
                  <div className="pb-6">
                    <h3 className="font-semibold text-sm mb-1">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 11. E-E-A-T BLOCK */}
        <section className="border-b border-border">
          <div className="container-wide py-10 md:py-12">
            <Card className="border-border bg-card">
              <CardContent className="p-6 flex flex-col sm:flex-row gap-6 text-sm">
                <div className="flex items-start gap-3">
                  <User className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-foreground">Author</div>
                    <div className="text-muted-foreground">TD Engineering Team</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CalendarDays className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-foreground">Last updated</div>
                    <div className="text-muted-foreground">2026-02-27</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-foreground">Scope</div>
                    <div className="text-muted-foreground">
                      Plastics and composites coating automation including automotive bumpers, consumer electronics, and industrial plastic components. Specialized surface preparation and adhesion-optimized processes.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 12. FAQ */}
        <section>
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <HelpCircle className="h-3.5 w-3.5" />
              Frequently Asked Questions
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">FAQ</h2>
            <div className="max-w-3xl">
              <Accordion type="multiple" defaultValue={faqs.map((_, i) => `faq-${i}`)} className="space-y-2">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-5 bg-card">
                    <AccordionTrigger className="text-sm font-medium text-left py-4 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Explore Links */}
        <ExploreLinks currentPath="/industries/plastics-composites" />
      </div>
    </>
  );
}
