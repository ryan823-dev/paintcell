import { useEffect, useState, useMemo } from "react";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { useLocalizedNavigate as useNavigate } from "@/hooks/useLocalizedNavigate";
import { Helmet } from "react-helmet-async";
import {
  ChevronRight, Send, AlertTriangle, Layers, Settings2,
  Clock, HelpCircle, Bot, MessageSquare, Upload,
  User, CalendarDays, FileText, CheckCircle2, Shield,
  Target, Wrench, BarChart3, HeartPulse
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

const DOMAIN = "https://tdpaint.com";

const workflowSteps = [
  { title: "Assessment", desc: "Device classification, regulatory requirements, coating specifications" },
  { title: "Scope definition", desc: "Process validation approach, cleanroom class, documentation needs" },
  { title: "Layout and integration design", desc: "Coating cell design, cleanroom integration, material flow" },
  { title: "Manufacturing / qualification", desc: "IQ/OQ/PQ protocols, equipment qualification, documentation" },
  { title: "Process validation", desc: "Process capability studies and regulatory documentation" },
  { title: "Installation and commissioning", desc: "Cleanroom installation, integration, and startup" },
  { title: "Production startup and validation", desc: "Training, handover, ongoing process verification" },
];

export default function MedicalDeviceCoating() {
  const [inputValue, setInputValue] = useState(
    "We manufacture surgical instruments and need automated antimicrobial coating with FDA 21 CFR Part 11 compliance."
  );
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const { t } = useI18n();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Dynamic FAQs from translations
  const faqs = useMemo(() => [
    { question: t.industryFaqs?.medicalDevice?.q1 || "What regulatory requirements apply to medical device coating?", answer: t.industryFaqs?.medicalDevice?.a1 || "FDA 21 CFR Part 11 for electronic records, ISO 13485 for quality management, ISO 10993 for biocompatibility, and EU MDR for European market compliance." },
    { question: t.industryFaqs?.medicalDevice?.q2 || "What coating types are used for medical devices?", answer: t.industryFaqs?.medicalDevice?.a2 || "PTFE for lubricity, antimicrobial coatings for infection control, hydrophilic coatings for catheters, drug-eluting coatings for stents, and hydroxyapatite for implant osseointegration." },
    { question: t.industryFaqs?.medicalDevice?.q3 || "How is process validation handled?", answer: t.industryFaqs?.medicalDevice?.a3 || "Full IQ/OQ/PQ validation protocols with documented evidence, process capability studies, and ongoing process verification per FDA guidance." },
    { question: t.industryFaqs?.medicalDevice?.q4 || "Can small implants be coated robotically?", answer: t.industryFaqs?.medicalDevice?.a4 || "Yes. Micro-dispensing systems with sub-millimeter accuracy enable coating of small implants, stents, and micro-surgical instruments." },
    { question: t.industryFaqs?.medicalDevice?.q5 || "How long does deployment take including validation?", answer: t.industryFaqs?.medicalDevice?.a5 || "Typically 16-24 weeks including equipment qualification, process validation, and documentation per regulatory requirements." },
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
      contactPoint: { "@type": "ContactPoint", contactType: "sales", email: "info@tdpaint.com" },
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
      "@id": `${DOMAIN}/industries/medical-device-coating#service`,
      name: "Medical Device Coating Automation",
      description: "Precision coating systems for medical devices and implants with biocompatible coatings and FDA-compliant process control.",
      provider: { "@id": `${DOMAIN}/#organization` },
      serviceType: "Robotic Coating System Integration",
      areaServed: "Worldwide",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${DOMAIN}/industries/medical-device-coating#faq`,
      mainEntity: faqs.map(f => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${DOMAIN}/industries/medical-device-coating#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${DOMAIN}/` },
        { "@type": "ListItem", position: 2, name: "Industries", item: `${DOMAIN}/industries/` },
        { "@type": "ListItem", position: 3, name: "Medical Device Coating", item: `${DOMAIN}/industries/medical-device-coating` },
      ],
    },
  ], [faqs]);

  const handleStartConsultation = () => {
    sessionStorage.setItem("project-init-message", inputValue.trim());
    sessionStorage.setItem("industry-context", JSON.stringify({
      industry: "medical",
      finish: "biocompatible / antimicrobial",
      throughput: "low-medium",
    }));
    const btn = document.querySelector("[data-assistant-trigger]") as HTMLButtonElement;
    if (btn) btn.click();
  };

  return (
    <>
      <Helmet>
        <title>Medical Device Coating Automation | Robotic Coating Systems | TD</title>
        <meta name="description" content="Precision coating systems for medical devices and implants. Biocompatible coatings, antimicrobial finishes, and FDA-compliant process control for surgical instruments, implants, and diagnostic equipment." />
        <link rel="canonical" href={`${DOMAIN}/industries/medical-device-coating`} />
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
                <BreadcrumbPage>Medical Device</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* 1. HERO */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-20">
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold mb-6 leading-tight">
              Medical Device Coating Automation
            </h1>
            <div className="max-w-3xl space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
              <p>
                Medical device coating automation is the engineering and integration of precision dispensing systems, cleanroom-compatible robotics, and validated process control for applying biocompatible, antimicrobial, and functional coatings to surgical instruments, implants, and diagnostic equipment.
              </p>
              <p>
                TD Robotic Painting Systems integrates coating cells for medical device manufacturers worldwide, supporting FDA 21 CFR Part 11 compliance, ISO 13485 quality management, and full IQ/OQ/PQ validation protocols.
              </p>
            </div>
          </div>
        </section>

        {/* 2. TYPICAL MEDICAL DEVICES */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Target className="h-3.5 w-3.5" />
              Application Scope
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Typical Medical Devices</h2>
            <p className="text-muted-foreground mb-4">Medical device coating applications commonly include:</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside max-w-2xl">
              <li>surgical instruments (scalpels, forceps, retractors)</li>
              <li>orthopedic implants (hip, knee, spinal components)</li>
              <li>cardiovascular devices (stents, catheters, guidewires)</li>
              <li>dental implants and prosthetics</li>
              <li>diagnostic equipment housings and components</li>
            </ul>
            <p className="text-muted-foreground text-sm mt-4">
              Final feasibility depends on device classification, coating requirements, and regulatory pathway.
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
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Medical Device Production Challenges</h2>
            <p className="text-muted-foreground mb-4">Medical device coating environments often require:</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside max-w-2xl">
              <li>FDA 21 CFR Part 11 compliance with full audit trails</li>
              <li>ISO 10993 biocompatibility validation for patient safety</li>
              <li>±2 micron coating uniformity for micro-scale medical devices</li>
              <li>ISO Class 5-7 cleanroom production environments</li>
              <li>complete lot traceability and electronic batch records</li>
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
            <p className="text-muted-foreground mb-4">A typical medical device coating solution is configured based on:</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside max-w-2xl">
              <li>micro-dispensing technology (ultra-precision for small-scale devices)</li>
              <li>validated process control (21 CFR Part 11 compliant software)</li>
              <li>cleanroom enclosure design (ISO Class 5-7 compatible)</li>
              <li>robot selection (compact, cleanroom-certified)</li>
              <li>quality documentation (automated IQ/OQ/PQ generation)</li>
              <li>electronic batch records with audit trail</li>
              <li>sterilization-compatible material selection</li>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-6">What TD Delivers for Medical Device Coating</h2>
            <p className="text-muted-foreground mb-4">TD delivers system-level integration, including:</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside max-w-2xl">
              <li>precision coating cell engineering with micro-dispensing capability</li>
              <li>21 CFR Part 11 compliant control system integration</li>
              <li>cleanroom enclosure design and qualification support</li>
              <li>IQ/OQ/PQ validation protocol documentation</li>
              <li>commissioning, installation support, and production startup optimization</li>
            </ul>
            <p className="text-muted-foreground text-sm mt-4">This is system integration, not standalone equipment supply.</p>
            <p className="text-muted-foreground text-sm mt-4">
              Related industries:{" "}
              <Link to="/industries/automotive-exterior-parts" className="text-accent underline underline-offset-2 hover:text-accent/80">Automotive Exterior Parts</Link>
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
            <p className="text-muted-foreground mb-2">Typical lead time depends on device classification and validation requirements.</p>
            <p className="text-muted-foreground mb-2">A common project range is:</p>
            <p className="font-semibold text-foreground text-lg">16–24 weeks including validation</p>
            <p className="text-muted-foreground text-sm mt-1">
              (extended for Class III devices or complex regulatory pathways)
            </p>
          </div>
        </section>

        {/* 7. PROJECT INITIATION */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Start your medical device coating automation assessment
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Tell us about your medical devices, coating requirements, regulatory pathway, cleanroom classification, and validation needs.
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
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Why Robotic Coating for Medical Devices</h2>
            <p className="text-muted-foreground mb-4">Robotic automation can enable:</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside max-w-2xl">
              <li>±2 micron coating uniformity for micro-scale devices</li>
              <li>100% regulatory compliance with full audit trails</li>
              <li>90–98% rework reduction through precision control</li>
              <li>complete lot traceability for quality assurance</li>
              <li>validated processes meeting FDA and EU MDR requirements</li>
            </ul>
            <p className="text-muted-foreground text-sm mt-4">
              Outcomes depend on device classification, coating material, and regulatory pathway.
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
                      Medical device coating automation using precision dispensing and validated process control. Specifications and timelines depend on device classification and regulatory requirements.
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
        <ExploreLinks currentPath="/industries/medical-device-coating" />
      </div>
    </>
  );
}
