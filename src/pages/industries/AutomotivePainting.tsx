import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ChevronRight, Send, AlertTriangle, Layers, Settings2,
  Clock, HelpCircle, Bot, MessageSquare, Upload,
  User, CalendarDays, FileText, CheckCircle2, Shield,
  Target, Wrench, BarChart3
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
    question: "What is automotive component painting automation?",
    answer: "Automotive component painting automation is the engineering and integration of robotic spray painting systems, paint booth airflow/ventilation, paint supply control, and process coordination to deliver repeatable finish quality and stable production throughput for automotive parts.",
  },
  {
    question: "Can you integrate into an existing paint booth?",
    answer: "Yes. TD supports new paint booth builds and retrofit integration into existing paint booths, depending on site constraints and production requirements.",
  },
  {
    question: "Do you support ATEX / explosion-proof requirements?",
    answer: "Yes. ATEX-ready configurations are supported based on site classification and paint process requirements.",
  },
  {
    question: "What spray technologies are commonly used for automotive parts?",
    answer: "Common options include electrostatic spraying, HVLP, and air spray, selected based on coating requirements and production constraints.",
  },
  {
    question: "How long does deployment typically take?",
    answer: "Typically 8–12 weeks after design approval, depending on project complexity and site conditions.",
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
    "@id": `${DOMAIN}/industries/automotive-painting#service`,
    name: "Automotive Component Painting Automation",
    description: "Engineering and integration of robotic painting systems and paint booth automation for automotive components, including electrostatic, HVLP, and air spray options with ATEX-ready configurations where required.",
    provider: { "@id": `${DOMAIN}/#organization` },
    serviceType: "Robotic Painting System Integration",
    areaServed: "Worldwide",
    audience: { "@type": "Audience", audienceType: "Automotive component manufacturers" },
    mainEntityOfPage: { "@id": `${DOMAIN}/industries/automotive-painting#webpage` },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${DOMAIN}/industries/automotive-painting#faq`,
    mainEntity: faqs.map(f => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${DOMAIN}/industries/automotive-painting#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${DOMAIN}/` },
      { "@type": "ListItem", position: 2, name: "Industries", item: `${DOMAIN}/industries/` },
      { "@type": "ListItem", position: 3, name: "Automotive Painting", item: `${DOMAIN}/industries/automotive-painting` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${DOMAIN}/industries/automotive-painting#webpage`,
    name: "Automotive Component Painting Automation",
    url: `${DOMAIN}/industries/automotive-painting`,
    isPartOf: { "@id": `${DOMAIN}/#website` },
    mainEntity: { "@id": `${DOMAIN}/industries/automotive-painting#service` },
    inLanguage: "en",
  },
];

const workflowSteps = [
  { title: "Assessment", desc: "New booth vs existing booth, site constraints, ATEX needs" },
  { title: "Scope definition", desc: "Airflow, controls, safety, integration boundaries" },
  { title: "Layout and integration design", desc: "Robot placement, booth configuration, controls architecture" },
  { title: "Manufacturing / modification planning", desc: "Component sourcing, fabrication, and assembly scheduling" },
  { title: "Testing and verification", desc: "Process testing and quality validation" },
  { title: "Installation and commissioning", desc: "On-site setup, integration, and startup" },
  { title: "Production startup and optimization", desc: "Training, handover, and ongoing support" },
];

export default function AutomotivePainting() {
  const [inputValue, setInputValue] = useState(
    "We need automated painting for automotive brackets, ~300 parts/hour, consistent finish required."
  );
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleStartConsultation = () => {
    sessionStorage.setItem("project-init-message", inputValue.trim());
    sessionStorage.setItem("industry-context", JSON.stringify({
      industry: "automotive",
      finish: "Class A / industrial",
      throughput: "medium-high",
    }));
    const btn = document.querySelector("[data-assistant-trigger]") as HTMLButtonElement;
    if (btn) btn.click();
  };

  return (
    <>
      <Helmet>
        <title>Automotive Component Painting Automation | Robotic Painting Systems | TD</title>
        <meta name="description" content="Robotic painting systems and paint booth automation for automotive components. Engineering integration for stable finish quality, throughput, ATEX-ready options, and fast deployment. Start a project assessment for your automotive parts." />
        <link rel="canonical" href={`${DOMAIN}/industries/automotive-painting`} />
        {schemas.map((s, i) => (
          <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
        ))}
      </Helmet>

      <div className="min-h-screen bg-background">

        {/* ─── BREADCRUMB ─── */}
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
                <BreadcrumbPage>Automotive Painting</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* ─── 1. HERO ─── */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-20">
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold mb-6 leading-tight">
              Automotive Component Painting Automation
            </h1>
            <div className="max-w-3xl space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
              <p>
                Automotive component painting automation is the engineering and integration of robotic spray painting systems, paint booth airflow/ventilation, paint supply control, and process coordination to deliver repeatable finish quality and stable production throughput for automotive parts.
              </p>
              <p>
                TD Robotic Painting Systems integrates robotic painting cells and paint booth automation for automotive component manufacturers worldwide, including support for ATEX-ready configurations where required.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 2. TYPICAL AUTOMOTIVE PARTS ─── */}
        <section className="border-b border-border ">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Target className="h-3.5 w-3.5" />
              Application Scope
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Typical Automotive Parts</h2>
            <p className="text-muted-foreground mb-4">Automotive component painting commonly includes:</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside max-w-2xl">
              <li>brackets and structural metal parts</li>
              <li>housings and covers</li>
              <li>fabricated metal assemblies</li>
              <li>sub-components requiring consistent finish and controlled overspray</li>
              <li>parts with complex geometry requiring repeatable spray paths</li>
            </ul>
            <p className="text-muted-foreground text-sm mt-4">
              Final feasibility depends on part size, geometry, coating specification, and throughput targets.
            </p>
          </div>
        </section>

        {/* ─── 3. PAIN POINTS ─── */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <AlertTriangle className="h-3.5 w-3.5" />
              Production Challenges
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Automotive Production Challenges</h2>
            <p className="text-muted-foreground mb-4">Automotive finishing environments often require:</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside max-w-2xl">
              <li>consistent finish quality across large production volume</li>
              <li>stable throughput and reduced rework</li>
              <li>controlled overspray and airflow stability inside paint booth environments</li>
              <li>safe operation under site classification requirements (including ATEX where applicable)</li>
              <li>repeatable process control across shift changes and operators</li>
            </ul>
          </div>
        </section>

        {/* ─── 4. RECOMMENDED SYSTEM APPROACH ─── */}
        <section className="border-b border-border ">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Layers className="h-3.5 w-3.5" />
              Engineering Logic
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Recommended System Approach</h2>
            <p className="text-muted-foreground mb-4">A typical automotive robotic painting solution is configured based on:</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside max-w-2xl">
              <li>robot selection (ABB / FANUC / KUKA / others)</li>
              <li>spray technology (electrostatic / HVLP / air spray)</li>
              <li><Link to="/solutions/paint-booth-automation" className="text-accent underline underline-offset-2 hover:text-accent/80">paint booth automation</Link> scope (new booth build or integration into existing booths)</li>
              <li>paint supply method (pump / pressure tank)</li>
              <li>throughput targets (parts/hour)</li>
              <li>color change requirements and changeover complexity</li>
              <li>controls integration (PLC + robot controller + HMI)</li>
              <li>ATEX / explosion-proof requirements where applicable</li>
            </ul>
            <p className="text-muted-foreground text-sm mt-6">
              For system-level integration overview, see{" "}
              <Link to="/solutions/robotic-painting-system" className="text-accent underline underline-offset-2 hover:text-accent/80">
                Robotic Painting System Integration
              </Link>.
            </p>
          </div>
        </section>

        {/* ─── 5. WHAT TD DELIVERS ─── */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Wrench className="h-3.5 w-3.5" />
              Scope of Delivery
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">What TD Delivers for Automotive Painting</h2>
            <p className="text-muted-foreground mb-4">TD delivers system-level integration, including:</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside max-w-2xl">
              <li>robotic painting cell engineering and integration</li>
              <li><Link to="/solutions/paint-booth-automation" className="text-accent underline underline-offset-2 hover:text-accent/80">paint booth automation</Link> (new booth build or retrofit into existing booths)</li>
              <li>spray process configuration and tuning for repeatability</li>
              <li>controls integration and safety interlocks</li>
              <li>commissioning, installation support, and production startup optimization</li>
            </ul>
            <p className="text-muted-foreground text-sm mt-4">This is system integration, not standalone equipment supply.</p>
            <p className="text-muted-foreground text-sm mt-4">
              Related industries:{" "}
              <Link to="/industries/appliance-coating" className="text-accent underline underline-offset-2 hover:text-accent/80">Appliance Coating</Link>
              {" · "}
              <Link to="/industries/metal-parts-finishing" className="text-accent underline underline-offset-2 hover:text-accent/80">Metal Parts Finishing</Link>
            </p>
          </div>
        </section>

        {/* ─── 6. DEPLOYMENT TIMELINE ─── */}
        <section className="border-b border-border ">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              Lead Time
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Deployment Timeline</h2>
            <p className="text-muted-foreground mb-2">Typical lead time depends on project complexity and site constraints.</p>
            <p className="text-muted-foreground mb-2">A common project range is:</p>
            <p className="font-semibold text-foreground text-lg">8–12 weeks after design approval</p>
            <p className="text-muted-foreground text-sm mt-1">
              (extended for complex retrofits, multi-color changeover, or specialized ATEX scopes)
            </p>
          </div>
        </section>

        {/* ─── 7. PROJECT INITIATION ─── */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Start your automotive painting automation assessment
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Tell us about your automotive parts, coating requirements, production throughput targets, booth situation (new or existing), and ATEX classification (if applicable).
            </p>

            {/* AI prompt box */}
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
                Upload part drawings
              </Button>
            </div>
          </div>
        </section>

        {/* ─── 8. WHY ROBOTIC PAINTING ─── */}
        <section className="border-b border-border ">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <BarChart3 className="h-3.5 w-3.5" />
              Benefits
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Why Robotic Painting for Automotive Components</h2>
            <p className="text-muted-foreground mb-4">Robotic automation can enable:</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside max-w-2xl">
              <li>repeatable finish quality and reduced variability</li>
              <li>stabilized throughput and reduced rework</li>
              <li>reduced dependency on manual spraying labor</li>
              <li>scalable automation for growing production demand</li>
              <li>better process monitoring and safer operation</li>
            </ul>
            <p className="text-muted-foreground text-sm mt-4">
              Outcomes depend on part geometry, paint specification, and site conditions.
            </p>
            <p className="text-muted-foreground text-sm mt-4">
              Further reading:{" "}
              <Link to="/resources/knowledge/how-to-choose-paint-robot" className="text-accent underline underline-offset-2 hover:text-accent/80">How to Choose a Paint Robot</Link>
              {" · "}
              <Link to="/resources/knowledge/robotic-painting-cost-guide" className="text-accent underline underline-offset-2 hover:text-accent/80">Robotic Painting Cost Guide</Link>
              {" · "}
              <Link to="/resources/knowledge/paint-booth-design-basics" className="text-accent underline underline-offset-2 hover:text-accent/80">Paint Booth Design Basics</Link>
            </p>
          </div>
        </section>

        {/* ─── 9. IMPLEMENTATION WORKFLOW ─── */}
        <section className="border-b border-border">
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

        {/* ─── 10. E-E-A-T BLOCK ─── */}
        <section className="border-b border-border ">
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
                    <div className="text-muted-foreground">2026-02-12</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-foreground">Scope</div>
                    <div className="text-muted-foreground">
                      Automotive component painting automation using robotic painting systems and paint booth automation, including ATEX-ready integration where required. Specifications and timelines depend on application and site classification.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ─── 11. FAQ ─── */}
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
        <ExploreLinks currentPath="/industries/automotive-painting" />
      </div>
    </>
  );
}
