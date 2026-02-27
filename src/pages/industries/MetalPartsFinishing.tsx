import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ChevronRight, Send, AlertTriangle, Layers, Settings2,
  Clock, HelpCircle, Bot, MessageSquare, Upload,
  User, CalendarDays, FileText, CheckCircle2, Shield,
  Target, Wrench, BarChart3, Factory
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
    question: "What is metal parts finishing automation?",
    answer: "Metal parts finishing automation is the engineering and integration of robotic spray painting systems, paint booth airflow/ventilation, paint supply control, and process coordination to deliver repeatable finish quality and stable production throughput for general industrial metal components and fabrications.",
  },
  {
    question: "What types of metal parts are suitable for robotic painting?",
    answer: "Most fabricated metal parts are suitable, including steel furniture, enclosures, machine housings, agricultural equipment, construction components, and general fabrications. Final feasibility depends on part size, geometry, surface preparation, and production volume.",
  },
  {
    question: "Can you handle mixed part types on the same line?",
    answer: "Yes. Systems can be configured for mixed-model production with programmable paint recipes and flexible fixturing. The specific approach depends on part variation, throughput requirements, and color change frequency.",
  },
  {
    question: "Do you support powder coating as well as liquid paint?",
    answer: "TD specializes in liquid paint systems (including electrostatic, HVLP, and conventional spray). Powder coating integration can be discussed based on specific project requirements.",
  },
  {
    question: "What surface preparation is required before painting?",
    answer: "Typical preparation includes cleaning, degreasing, and potentially phosphating or sandblasting depending on substrate and coating requirements. Surface prep requirements are evaluated during project assessment.",
  },
  {
    question: "How long does deployment typically take?",
    answer: "Typically 8-14 weeks after design approval, depending on project complexity, booth configuration, and site conditions. Larger or more complex systems may require extended timelines.",
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
    "@id": `${DOMAIN}/industries/metal-parts-finishing#service`,
    name: "Metal Parts Finishing Automation",
    description: "Engineering and integration of robotic painting systems and paint booth automation for general industrial metal parts and fabrications, including steel furniture, enclosures, machine components, agricultural equipment, and construction parts. Supports electrostatic, HVLP, and conventional spray technologies.",
    provider: { "@id": `${DOMAIN}/#organization` },
    serviceType: "Robotic Painting System Integration",
    areaServed: "Worldwide",
    audience: { "@type": "Audience", audienceType: "Metal fabricators, contract coaters, and industrial manufacturers" },
    mainEntityOfPage: { "@id": `${DOMAIN}/industries/metal-parts-finishing#webpage` },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${DOMAIN}/industries/metal-parts-finishing#faq`,
    mainEntity: faqs.map(f => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${DOMAIN}/industries/metal-parts-finishing#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${DOMAIN}/` },
      { "@type": "ListItem", position: 2, name: "Industries", item: `${DOMAIN}/industries/` },
      { "@type": "ListItem", position: 3, name: "Metal Parts Finishing", item: `${DOMAIN}/industries/metal-parts-finishing` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${DOMAIN}/industries/metal-parts-finishing#webpage`,
    name: "Metal Parts Finishing Automation",
    url: `${DOMAIN}/industries/metal-parts-finishing`,
    isPartOf: { "@id": `${DOMAIN}/#website` },
    mainEntity: { "@id": `${DOMAIN}/industries/metal-parts-finishing#service` },
    inLanguage: "en",
  },
];

const workflowSteps = [
  { title: "Assessment", desc: "Part types, coating spec, volume, booth situation, site classification" },
  { title: "Scope definition", desc: "Spray technology, airflow design, controls, safety boundaries" },
  { title: "Layout and integration design", desc: "Robot placement, conveyor integration, paint supply, controls architecture" },
  { title: "Manufacturing / modification planning", desc: "Component sourcing, booth fabrication, assembly scheduling" },
  { title: "Testing and verification", desc: "Process testing, finish quality validation, cycle time verification" },
  { title: "Installation and commissioning", desc: "On-site setup, system integration, safety validation" },
  { title: "Production startup and optimization", desc: "Operator training, recipe tuning, handover support" },
];

const partCategories = [
  {
    category: "Steel Furniture & Storage",
    examples: "Office furniture frames, filing cabinets, shelving systems, lockers, workbenches",
  },
  {
    category: "Enclosures & Cabinets",
    examples: "Electrical enclosures, control cabinets, server racks, junction boxes, HVAC housings",
  },
  {
    category: "Machine Components",
    examples: "Guards and covers, access panels, structural frames, equipment housings, chassis parts",
  },
  {
    category: "Agricultural Equipment",
    examples: "Tractor components, implement frames, grain handling equipment, livestock equipment",
  },
  {
    category: "Construction Components",
    examples: "Structural steel, handrails, fencing, gate frames, architectural metalwork",
  },
  {
    category: "General Fabrications",
    examples: "Brackets, frames, assemblies, formed sheet metal, welded structures",
  },
];

export default function MetalPartsFinishing() {
  const [inputValue, setInputValue] = useState(
    "We need automated painting for fabricated metal parts, various sizes, consistent industrial finish required."
  );
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleStartConsultation = () => {
    sessionStorage.setItem("project-init-message", inputValue.trim());
    sessionStorage.setItem("industry-context", JSON.stringify({
      industry: "metal-parts",
      finish: "industrial / protective",
      throughput: "variable",
    }));
    const btn = document.querySelector("[data-assistant-trigger]") as HTMLButtonElement;
    if (btn) btn.click();
  };

  return (
    <>
      <Helmet>
        <title>Metal Parts Finishing Automation | Robotic Painting Systems for Industrial Fabrications | TD</title>
        <meta name="description" content="Robotic painting systems and paint booth automation for general industrial metal parts. Engineering integration for steel furniture, enclosures, machine components, agricultural equipment, and fabricated metal assemblies. Start a project assessment." />
        <link rel="canonical" href={`${DOMAIN}/industries/metal-parts-finishing`} />
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
                <BreadcrumbPage>Metal Parts Finishing</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* 1. HERO / DEFINITION */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-20">
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold mb-6 leading-tight">
              Metal Parts Finishing Automation
            </h1>
            <div className="max-w-3xl space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
              <p>
                Metal parts finishing automation is the engineering and integration of robotic spray painting systems, paint booth airflow/ventilation, paint supply control, and process coordination to deliver repeatable finish quality and stable production throughput for general industrial metal components and fabrications.
              </p>
              <p>
                TD Robotic Painting Systems integrates robotic painting cells and paint booth automation for metal fabricators, contract coaters, and industrial manufacturers worldwide, supporting a wide range of part types from steel furniture to heavy equipment components.
              </p>
            </div>
          </div>
        </section>

        {/* 2. TYPICAL METAL PARTS */}
        <section className="border-b border-border section-gradient">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Target className="h-3.5 w-3.5" />
              Application Scope
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Typical Metal Parts</h2>
            <p className="text-muted-foreground mb-6">Metal parts finishing commonly includes a wide variety of industrial components:</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {partCategories.map((item, i) => (
                <Card key={i} className="border-border bg-card">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Factory className="h-4 w-4 text-accent" />
                      {item.category}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">{item.examples}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <p className="text-muted-foreground text-sm">
              Final feasibility depends on part size, geometry, surface condition, coating specification, and production volume requirements.
            </p>
          </div>
        </section>

        {/* 3. PAIN POINTS */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <AlertTriangle className="h-3.5 w-3.5" />
              Production Challenges
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Metal Finishing Production Challenges</h2>
            <p className="text-muted-foreground mb-4">General metal finishing environments often face:</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside max-w-2xl">
              <li>inconsistent finish quality with manual spraying across different operators</li>
              <li>high labor costs and difficulty finding skilled spray painters</li>
              <li>excessive paint waste and overspray with manual processes</li>
              <li>variable throughput and unpredictable cycle times</li>
              <li>difficulty maintaining quality across high part variety and mixed-model production</li>
              <li>health and safety concerns with paint fumes and VOC exposure</li>
              <li>challenge scaling production to meet growing demand</li>
            </ul>
          </div>
        </section>

        {/* 4. RECOMMENDED SYSTEM APPROACH */}
        <section className="border-b border-border section-gradient">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Layers className="h-3.5 w-3.5" />
              Engineering Logic
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Recommended System Approach</h2>
            <p className="text-muted-foreground mb-4">A typical metal parts robotic painting solution is configured based on:</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside max-w-2xl">
              <li>robot selection (ABB / FANUC / KUKA / others) based on reach and payload</li>
              <li>spray technology (electrostatic / HVLP / conventional air spray) matched to coating type</li>
              <li><Link to="/solutions/paint-booth-automation" className="text-accent underline underline-offset-2 hover:text-accent/80">paint booth automation</Link> scope (new booth build or retrofit into existing booths)</li>
              <li>paint supply method (pump / pressure tank / color change manifold)</li>
              <li>part presentation method (conveyor, rotary table, or manual load stations)</li>
              <li>throughput targets and takt time constraints</li>
              <li>part variety and recipe management requirements</li>
              <li>color change frequency and changeover time targets</li>
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

        {/* 5. WHAT TD DELIVERS */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Wrench className="h-3.5 w-3.5" />
              Scope of Delivery
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">What TD Delivers for Metal Parts Finishing</h2>
            <p className="text-muted-foreground mb-4">TD delivers system-level integration, including:</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside max-w-2xl">
              <li>robotic painting cell engineering and integration</li>
              <li><Link to="/solutions/paint-booth-automation" className="text-accent underline underline-offset-2 hover:text-accent/80">paint booth automation</Link> (new booth build or retrofit into existing booths)</li>
              <li>spray process configuration and recipe development for multiple part types</li>
              <li>conveyor or part handling integration</li>
              <li>controls integration, HMI programming, and safety interlocks</li>
              <li>commissioning, installation support, and production startup optimization</li>
              <li>operator training and process documentation</li>
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

        {/* 6. DEPLOYMENT TIMELINE */}
        <section className="border-b border-border section-gradient">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              Lead Time
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Deployment Timeline</h2>
            <p className="text-muted-foreground mb-2">Typical lead time depends on project complexity and site constraints.</p>
            <p className="text-muted-foreground mb-2">A common project range is:</p>
            <p className="font-semibold text-foreground text-lg">8-14 weeks after design approval</p>
            <p className="text-muted-foreground text-sm mt-1">
              (extended for large-scale systems, complex multi-robot cells, extensive conveyor integration, or specialized requirements)
            </p>
          </div>
        </section>

        {/* 7. PROJECT INITIATION */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Start your metal parts finishing automation assessment
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Tell us about your parts (type, size range, materials), coating requirements, production volume, current booth situation (new or existing), and any special requirements (color change frequency, ATEX classification, etc.).
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
                Upload part drawings
              </Button>
            </div>
          </div>
        </section>

        {/* 8. WHY ROBOTIC PAINTING */}
        <section className="border-b border-border section-gradient">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <BarChart3 className="h-3.5 w-3.5" />
              Benefits
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Why Robotic Painting for Metal Parts</h2>
            <p className="text-muted-foreground mb-4">Robotic automation can enable:</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside max-w-2xl">
              <li>consistent finish quality regardless of operator skill level</li>
              <li>improved transfer efficiency and reduced paint waste (30-50% savings typical)</li>
              <li>stabilized throughput and predictable cycle times</li>
              <li>reduced labor dependency and lower per-part coating costs</li>
              <li>safer working environment with reduced painter exposure to fumes</li>
              <li>scalable capacity to meet growing production demands</li>
              <li>flexible programming for mixed-model and high-variety production</li>
              <li>better process data and quality traceability</li>
            </ul>
            <p className="text-muted-foreground text-sm mt-4">
              Actual outcomes depend on part geometry, paint specification, production volume, and site conditions.
            </p>
            <p className="text-muted-foreground text-sm mt-4">
              Further reading:{" "}
              <Link to="/resources/knowledge/how-to-choose-paint-robot" className="text-accent underline underline-offset-2 hover:text-accent/80">How to Choose a Paint Robot</Link>
              {" · "}
              <Link to="/resources/knowledge/robotic-painting-cost-guide" className="text-accent underline underline-offset-2 hover:text-accent/80">Robotic Painting Cost Guide</Link>
              {" · "}
              <Link to="/resources/knowledge/spray-technology-guide" className="text-accent underline underline-offset-2 hover:text-accent/80">Spray Technology Guide</Link>
            </p>
          </div>
        </section>

        {/* 9. IMPLEMENTATION WORKFLOW */}
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

        {/* 10. E-E-A-T BLOCK */}
        <section className="border-b border-border section-gradient">
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
                      General industrial metal parts finishing automation using robotic painting systems and paint booth automation. Covers steel furniture, enclosures, machine components, agricultural equipment, construction parts, and general fabrications. Specifications depend on application requirements.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 11. FAQ */}
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
        <ExploreLinks currentPath="/industries/metal-parts-finishing" />
      </div>
    </>
  );
}
