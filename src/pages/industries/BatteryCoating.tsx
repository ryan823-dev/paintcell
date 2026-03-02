import { useEffect, useState, useMemo } from "react";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { useLocalizedNavigate as useNavigate } from "@/hooks/useLocalizedNavigate";
import { Helmet } from "react-helmet-async";
import {
  ChevronRight, Send, AlertTriangle, Layers, Settings2,
  Clock, HelpCircle, Bot, MessageSquare, Upload,
  User, CalendarDays, FileText, CheckCircle2, Shield,
  Target, Wrench, BarChart3, Zap, Battery
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
  { title: "Assessment", desc: "Production volume, cleanroom requirements, coating specifications" },
  { title: "Scope definition", desc: "Dispensing precision, inspection integration, MES connectivity" },
  { title: "Layout and integration design", desc: "Robot placement, cleanroom enclosure, material handling" },
  { title: "Manufacturing / qualification", desc: "Equipment build, cleanroom validation, process qualification" },
  { title: "Testing and verification", desc: "Coating quality validation and SPC capability studies" },
  { title: "Installation and commissioning", desc: "Cleanroom installation, integration, and startup" },
  { title: "Production startup and optimization", desc: "Training, handover, and ongoing support" },
];

export default function BatteryCoating() {
  const [inputValue, setInputValue] = useState(
    "We manufacture EV battery modules and need automated thermal barrier coating with precise thickness control."
  );
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const { t } = useI18n();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Dynamic FAQs from translations
  const faqs = useMemo(() => [
    { question: t.industryFaqs?.battery?.q1 || "What coatings are used in battery manufacturing?", answer: t.industryFaqs?.battery?.a1 || "Thermal barrier coatings, ceramic insulation, dielectric coatings, and silicone-based materials for thermal management, electrical insulation, and fire resistance." },
    { question: t.industryFaqs?.battery?.q2 || "Can robotic systems operate in cleanroom environments?", answer: t.industryFaqs?.battery?.a2 || "Yes. Cleanroom-rated robots with IP65+ protection, low-particle generation, and HEPA-filtered enclosures maintain ISO Class 7/8 requirements." },
    { question: t.industryFaqs?.battery?.q3 || "How is coating thickness controlled?", answer: t.industryFaqs?.battery?.a3 || "Servo-controlled dispensing with flow monitoring, inline thickness measurement, and closed-loop feedback maintain ±5 micron tolerance." },
    { question: t.industryFaqs?.battery?.q4 || "What traceability is available?", answer: t.industryFaqs?.battery?.a4 || "Full process data logging including coating weight, thickness, cure parameters, and environmental conditions with MES integration for automotive OEM requirements." },
    { question: t.industryFaqs?.battery?.q5 || "How long does deployment take?", answer: t.industryFaqs?.battery?.a5 || "Typically 12-18 weeks including cleanroom qualification, depending on production volume and integration complexity." },
  ], [t]);

  // Dynamic schemas
  const schemas = useMemo(() => [
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
      "@id": `${DOMAIN}/industries/battery-coating#service`,
      name: "Battery Manufacturing Coating Automation",
      description: "Precision coating systems for EV battery cells, modules, and packs with cleanroom-ready automation.",
      provider: { "@id": `${DOMAIN}/#organization` },
      serviceType: "Robotic Coating System Integration",
      areaServed: "Worldwide",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${DOMAIN}/industries/battery-coating#faq`,
      mainEntity: faqs.map(f => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${DOMAIN}/industries/battery-coating#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${DOMAIN}/` },
        { "@type": "ListItem", position: 2, name: "Industries", item: `${DOMAIN}/industries/` },
        { "@type": "ListItem", position: 3, name: "Battery Coating", item: `${DOMAIN}/industries/battery-coating` },
      ],
    },
  ], [faqs]);

  const handleStartConsultation = () => {
    sessionStorage.setItem("project-init-message", inputValue.trim());
    sessionStorage.setItem("industry-context", JSON.stringify({
      industry: "battery",
      finish: "functional / thermal barrier",
      throughput: "medium-high",
    }));
    const btn = document.querySelector("[data-assistant-trigger]") as HTMLButtonElement;
    if (btn) btn.click();
  };

  return (
    <>
      <Helmet>
        <title>Battery Manufacturing Coating Automation | Robotic Coating Systems | TD</title>
        <meta name="description" content="Precision coating systems for EV battery cells, modules, and packs. Thermal barrier coatings, insulation application, and electrode coating with cleanroom-ready automation." />
        <link rel="canonical" href={`${DOMAIN}/industries/battery-coating`} />
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
                <BreadcrumbPage>Battery & Energy Storage</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* 1. HERO */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-20">
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold mb-6 leading-tight">
              Battery Manufacturing Coating Automation
            </h1>
            <div className="max-w-3xl space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
              <p>
                Battery coating automation is the engineering and integration of precision dispensing systems, cleanroom-compatible robotics, and inline inspection for applying thermal barrier coatings, insulation materials, and functional coatings to EV battery cells, modules, and packs.
              </p>
              <p>
                TD Robotic Painting Systems integrates coating cells for battery manufacturers worldwide, supporting the transition from pilot production to gigafactory-scale volumes with full MES traceability.
              </p>
            </div>
          </div>
        </section>

        {/* 2. TYPICAL BATTERY COMPONENTS */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Target className="h-3.5 w-3.5" />
              Application Scope
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Typical Battery Components</h2>
            <p className="text-muted-foreground mb-4">Battery coating applications commonly include:</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside max-w-2xl">
              <li>battery cell casings and enclosures</li>
              <li>module thermal barrier interfaces</li>
              <li>pack-level insulation and protection coatings</li>
              <li>busbar and electrical connection insulation</li>
              <li>cooling system interface coatings</li>
            </ul>
            <p className="text-muted-foreground text-sm mt-4">
              Final feasibility depends on coating material, precision requirements, and cleanroom classification.
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
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Battery Production Challenges</h2>
            <p className="text-muted-foreground mb-4">Battery coating environments often require:</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside max-w-2xl">
              <li>±5 micron coating thickness tolerance for thermal management consistency</li>
              <li>ISO Class 7/8 cleanroom compatibility with controlled humidity</li>
              <li>high-volume scaling capability from pilot to gigafactory production</li>
              <li>full process traceability for automotive OEM quality requirements</li>
              <li>material handling for specialized thermal and dielectric coatings</li>
            </ul>
          </div>
        </section>

        {/* 4. RECOMMENDED SYSTEM APPROACH */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Layers className="h-3.5 w-3.5" />
              Engineering Logic
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Recommended System Approach</h2>
            <p className="text-muted-foreground mb-4">A typical battery coating solution is configured based on:</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside max-w-2xl">
              <li>precision dispensing technology (servo-controlled heads with flow monitoring)</li>
              <li>robot selection (cleanroom-rated IP65+ with low-particle generation)</li>
              <li>cleanroom enclosure design (ISO Class 7/8 compatible)</li>
              <li>inline inspection (3D scanning, thermal imaging)</li>
              <li>material supply (temperature-controlled reservoirs, viscosity management)</li>
              <li>MES connectivity (full process data logging, SPC integration)</li>
              <li>curing systems (UV, thermal, or air-dry based on coating chemistry)</li>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-6">What TD Delivers for Battery Coating</h2>
            <p className="text-muted-foreground mb-4">TD delivers system-level integration, including:</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside max-w-2xl">
              <li>precision coating cell engineering and integration</li>
              <li>cleanroom enclosure design and qualification support</li>
              <li>inline inspection system integration</li>
              <li>MES connectivity and process data logging</li>
              <li>commissioning, installation support, and production startup optimization</li>
            </ul>
            <p className="text-muted-foreground text-sm mt-4">This is system integration, not standalone equipment supply.</p>
            <p className="text-muted-foreground text-sm mt-4">
              Related industries:{" "}
              <Link to="/industries/automotive-painting" className="text-accent underline underline-offset-2 hover:text-accent/80">Automotive Painting</Link>
              {" · "}
              <Link to="/industries/plastics-composites" className="text-accent underline underline-offset-2 hover:text-accent/80">Plastics & Composites</Link>
            </p>
          </div>
        </section>

        {/* 6. DEPLOYMENT TIMELINE */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              Lead Time
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Deployment Timeline</h2>
            <p className="text-muted-foreground mb-2">Typical lead time depends on project complexity and cleanroom requirements.</p>
            <p className="text-muted-foreground mb-2">A common project range is:</p>
            <p className="font-semibold text-foreground text-lg">12–18 weeks including cleanroom qualification</p>
            <p className="text-muted-foreground text-sm mt-1">
              (extended for high-volume gigafactory installations or specialized coating chemistries)
            </p>
          </div>
        </section>

        {/* 7. PROJECT INITIATION */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Start your battery coating automation assessment
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Tell us about your battery components, coating requirements, production volumes, cleanroom classification, and traceability needs.
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
                Upload specifications
              </Button>
            </div>
          </div>
        </section>

        {/* 8. WHY ROBOTIC COATING */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <BarChart3 className="h-3.5 w-3.5" />
              Benefits
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Why Robotic Coating for Battery Manufacturing</h2>
            <p className="text-muted-foreground mb-4">Robotic automation can enable:</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside max-w-2xl">
              <li>±5 micron coating consistency for thermal management performance</li>
              <li>85–95% scrap reduction through precision control</li>
              <li>200–400% throughput increase vs manual application</li>
              <li>full traceability for automotive OEM quality requirements</li>
              <li>scalable automation from pilot to gigafactory volumes</li>
            </ul>
            <p className="text-muted-foreground text-sm mt-4">
              Outcomes depend on coating material, component geometry, and cleanroom classification.
            </p>
            <p className="text-muted-foreground text-sm mt-4">
              Further reading:{" "}
              <Link to="/resources/knowledge/how-to-choose-paint-robot" className="text-accent underline underline-offset-2 hover:text-accent/80">How to Choose a Paint Robot</Link>
              {" · "}
              <Link to="/resources/knowledge/robotic-painting-cost-guide" className="text-accent underline underline-offset-2 hover:text-accent/80">Robotic Painting Cost Guide</Link>
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
                    <div className="text-muted-foreground">2026-03-01</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-foreground">Scope</div>
                    <div className="text-muted-foreground">
                      Battery manufacturing coating automation using precision dispensing and cleanroom-compatible robotics. Specifications and timelines depend on application and cleanroom classification.
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
        <ExploreLinks currentPath="/industries/battery-coating" />
      </div>
    </>
  );
}
