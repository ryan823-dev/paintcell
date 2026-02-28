import { useEffect, useState, useMemo } from "react";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { useLocalizedNavigate as useNavigate } from "@/hooks/useLocalizedNavigate";
import { Helmet } from "react-helmet-async";
import {
  ChevronRight, Send, AlertTriangle, Layers, Settings2,
  Clock, HelpCircle, Bot, MessageSquare, Upload,
  User, CalendarDays, FileText, CheckCircle2, Shield,
  Target, Wrench, BarChart3, TreePine
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
import { useI18n } from "@/i18n";

const DOMAIN = "https://tdpaintcell.com";

const workflowSteps = [
  { title: "Assessment", desc: "Product types, finish requirements, volume, current process evaluation" },
  { title: "Scope definition", desc: "Coating selection, booth design, conveyor/handling method" },
  { title: "System design", desc: "Robot selection, spray technology, controls architecture" },
  { title: "Booth engineering", desc: "Airflow design, temperature/humidity control, extraction" },
  { title: "Integration", desc: "Robot programming, recipe development, line integration" },
  { title: "Commissioning", desc: "Process validation, quality testing, operator training" },
  { title: "Production startup", desc: "Ramp-up support, optimization, ongoing technical support" },
];

const productCategories = [
  {
    category: "Cabinet & Kitchen",
    examples: "Cabinet doors, drawer fronts, panels, kitchen islands, bathroom vanities",
  },
  {
    category: "Residential Furniture",
    examples: "Tables, chairs, bed frames, dressers, wardrobes, bookcases",
  },
  {
    category: "Office Furniture",
    examples: "Desks, conference tables, reception counters, partition panels",
  },
  {
    category: "Architectural Millwork",
    examples: "Doors, window frames, moldings, staircases, wall panels",
  },
  {
    category: "Components & Parts",
    examples: "Chair legs, table bases, decorative elements, hardware",
  },
  {
    category: "Specialty Products",
    examples: "Musical instruments, sports equipment, decorative items",
  },
];

export default function FurnitureWoodwork() {
  const [inputValue, setInputValue] = useState(
    "We manufacture kitchen cabinets and need automated lacquer application for consistent finish quality."
  );
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const { t } = useI18n();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = useMemo(() => [
    { question: t.industryFaqs.furniture.q1, answer: t.industryFaqs.furniture.a1 },
    { question: t.industryFaqs.furniture.q2, answer: t.industryFaqs.furniture.a2 },
    { question: t.industryFaqs.furniture.q3, answer: t.industryFaqs.furniture.a3 },
    { question: t.industryFaqs.furniture.q4, answer: t.industryFaqs.furniture.a4 },
    { question: t.industryFaqs.furniture.q5, answer: t.industryFaqs.furniture.a5 },
    { question: t.industryFaqs.furniture.q6, answer: t.industryFaqs.furniture.a6 },
  ], [t]);

  const schemas = useMemo(() => [
    { "@context": "https://schema.org", "@type": "Service", "@id": `${DOMAIN}/industries/furniture-woodwork#service`, name: "Furniture & Woodwork Finishing Automation", description: "Robotic spray finishing systems for furniture and wood products.", provider: { "@id": `${DOMAIN}/#organization` }, serviceType: "Robotic Finishing System Integration", areaServed: "Worldwide" },
    { "@context": "https://schema.org", "@type": "FAQPage", "@id": `${DOMAIN}/industries/furniture-woodwork#faq`, mainEntity: faqs.map(f => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", "@id": `${DOMAIN}/industries/furniture-woodwork#breadcrumb`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${DOMAIN}/` }, { "@type": "ListItem", position: 2, name: "Industries", item: `${DOMAIN}/industries/` }, { "@type": "ListItem", position: 3, name: "Furniture & Woodwork", item: `${DOMAIN}/industries/furniture-woodwork` }] },
  ], [faqs]);

  const handleStartConsultation = () => {
    sessionStorage.setItem("project-init-message", inputValue.trim());
    sessionStorage.setItem("industry-context", JSON.stringify({
      industry: "furniture",
      finish: "lacquer / stain / decorative",
      throughput: "medium-high",
    }));
    const btn = document.querySelector("[data-assistant-trigger]") as HTMLButtonElement;
    if (btn) btn.click();
  };

  return (
    <>
      <Helmet>
        <title>Furniture & Woodwork Finishing Automation | Robotic Spray Systems for Wood | TD</title>
        <meta name="description" content="Robotic spray finishing systems for furniture and wood products. Automated lacquering, staining, and coating for cabinets, furniture, and architectural millwork. Consistent quality, high throughput, reduced labor dependency." />
        <link rel="canonical" href={`${DOMAIN}/industries/furniture-woodwork`} />
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
                <BreadcrumbPage>Furniture & Woodwork</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* 1. HERO */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-20">
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold mb-6 leading-tight">
              Furniture & Woodwork Finishing Automation
            </h1>
            <div className="max-w-3xl space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
              <p>
                Furniture finishing automation is the engineering and integration of robotic spray systems, controlled-environment booths, and coating supply systems to deliver consistent, high-quality finishes on wood and wood-composite products with repeatable quality and stable production throughput.
              </p>
              <p>
                TD Robotic Painting Systems integrates robotic finishing cells for furniture manufacturers, cabinet makers, and architectural millwork producers worldwide, supporting a wide range of coatings from traditional lacquers to modern UV-curable finishes.
              </p>
            </div>
          </div>
        </section>

        {/* 2. TYPICAL PRODUCTS */}
        <section className="border-b border-border ">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Target className="h-3.5 w-3.5" />
              Application Scope
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Typical Furniture & Wood Products</h2>
            <p className="text-muted-foreground mb-6">Furniture finishing automation commonly includes:</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {productCategories.map((item, i) => (
                <Card key={i} className="border-border bg-card">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <TreePine className="h-4 w-4 text-accent" />
                      {item.category}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">{item.examples}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <p className="text-muted-foreground text-sm">
              Final feasibility depends on product dimensions, substrate type, finish specification, and production volume.
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
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Furniture Finishing Challenges</h2>
            <p className="text-muted-foreground mb-4">Furniture finishing environments often face:</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside max-w-2xl">
              <li>inconsistent finish quality with hand spraying — runs, sags, orange peel, uneven coverage</li>
              <li>difficulty achieving consistent stain penetration and color matching</li>
              <li>high skilled labor dependency with increasing difficulty finding experienced finishers</li>
              <li>significant material waste from overspray and rework</li>
              <li>dust and contamination issues affecting finish quality</li>
              <li>bottleneck at finishing stage limiting overall production capacity</li>
              <li>health concerns from solvent exposure and fine particle inhalation</li>
            </ul>
          </div>
        </section>

        {/* 4. COATING TECHNOLOGIES */}
        <section className="border-b border-border ">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Layers className="h-3.5 w-3.5" />
              Coating Technologies
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Supported Finish Types</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
              <div>
                <h3 className="font-semibold text-sm mb-3">Traditional Finishes</h3>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                  <li>Nitrocellulose lacquer (fast-drying, repairable)</li>
                  <li>Catalyzed lacquer (pre-cat, post-cat)</li>
                  <li>Conversion varnish (durability for kitchen/bath)</li>
                  <li>Polyurethane (2K systems for high wear resistance)</li>
                  <li>Oil-based stains and dye stains</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-3">Modern Finishes</h3>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                  <li>Water-based lacquers and topcoats (low VOC)</li>
                  <li>UV-curable coatings (instant cure, high productivity)</li>
                  <li>Acrylic lacquers (clarity, non-yellowing)</li>
                  <li>Pigmented finishes and solid colors</li>
                  <li>Specialty effects (metallics, textures)</li>
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
            <p className="text-muted-foreground mb-4">A typical furniture finishing system is configured based on:</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside max-w-2xl">
              <li>robot selection based on work envelope and payload requirements</li>
              <li>spray technology matched to coating type (HVLP, airless, electrostatic, air-assisted)</li>
              <li>booth design with proper airflow for finish quality and overspray capture</li>
              <li>temperature and humidity control for sensitive coatings</li>
              <li>material handling method (conveyor, rotary table, manual load stations)</li>
              <li>UV curing integration where applicable</li>
              <li>recipe management for multiple products and finish types</li>
              <li>dust extraction and air filtration systems</li>
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
        <section className="border-b border-border ">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Wrench className="h-3.5 w-3.5" />
              Scope of Delivery
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">What TD Delivers for Furniture Finishing</h2>
            <p className="text-muted-foreground mb-4">TD delivers system-level integration, including:</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside max-w-2xl">
              <li>robotic finishing cell engineering and integration</li>
              <li>spray booth design with climate control options</li>
              <li>coating process configuration and recipe development</li>
              <li>UV curing system integration where required</li>
              <li>conveyor and material handling integration</li>
              <li>controls, HMI, and recipe management systems</li>
              <li>commissioning, training, and production startup support</li>
            </ul>
            <p className="text-muted-foreground text-sm mt-4">This is system integration, not standalone equipment supply.</p>
            <p className="text-muted-foreground text-sm mt-4">
              Related industries:{" "}
              <Link to="/industries/metal-parts-finishing" className="text-accent underline underline-offset-2 hover:text-accent/80">Metal Parts Finishing</Link>
              {" · "}
              <Link to="/industries/plastics-composites" className="text-accent underline underline-offset-2 hover:text-accent/80">Plastics & Composites</Link>
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
            <p className="text-muted-foreground mb-2">Typical lead time depends on system complexity and integration requirements.</p>
            <p className="text-muted-foreground mb-2">A common project range is:</p>
            <p className="font-semibold text-foreground text-lg">10-16 weeks after design approval</p>
            <p className="text-muted-foreground text-sm mt-1">
              (extended for UV curing lines, multi-robot cells, or complex conveyor integration)
            </p>
          </div>
        </section>

        {/* 8. PROJECT INITIATION */}
        <section className="border-b border-border ">
          <div className="container-wide py-12 md:py-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Start your furniture finishing automation assessment
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Tell us about your products (cabinet doors, furniture, millwork), current finish types, production volume, and quality requirements.
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
                Upload product photos
              </Button>
            </div>
          </div>
        </section>

        {/* 9. WHY ROBOTIC FINISHING */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <BarChart3 className="h-3.5 w-3.5" />
              Benefits
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Why Robotic Finishing for Furniture</h2>
            <p className="text-muted-foreground mb-4">Robotic automation can enable:</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside max-w-2xl">
              <li>consistent finish quality with uniform film build and coverage</li>
              <li>elimination of common defects: runs, sags, orange peel, dry spray</li>
              <li>improved transfer efficiency and reduced material waste (20-40% savings typical)</li>
              <li>reduced dependency on skilled finishing labor</li>
              <li>increased production throughput and faster turnaround</li>
              <li>better workplace safety with reduced solvent exposure</li>
              <li>consistent color matching and stain application</li>
              <li>flexibility to handle product variety with recipe-based programming</li>
            </ul>
            <p className="text-muted-foreground text-sm mt-4">
              Actual outcomes depend on product type, coating system, and production requirements.
            </p>
            <p className="text-muted-foreground text-sm mt-4">
              Further reading:{" "}
              <Link to="/resources/knowledge/how-to-choose-paint-robot" className="text-accent underline underline-offset-2 hover:text-accent/80">How to Choose a Paint Robot</Link>
              {" · "}
              <Link to="/resources/knowledge/spray-technology-guide" className="text-accent underline underline-offset-2 hover:text-accent/80">Spray Technology Guide</Link>
            </p>
          </div>
        </section>

        {/* 10. IMPLEMENTATION WORKFLOW */}
        <section className="border-b border-border ">
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
                      Furniture and woodwork finishing automation including cabinets, furniture, and architectural millwork. Supports lacquers, stains, UV coatings, and water-based finishes.
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
        <ExploreLinks currentPath="/industries/furniture-woodwork" />
      </div>
    </>
  );
}
