import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ChevronRight, Send, Sparkles, AlertTriangle, Layers, BarChart3,
  ClipboardCheck, Quote, HelpCircle, Truck, Bot, MessageSquare, Upload
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { IndustryData, deliverySteps } from "@/data/industryData";

interface IndustryPageTemplateProps {
  data: IndustryData;
}

export function IndustryPageTemplate({ data }: IndustryPageTemplateProps) {
  const [inputValue, setInputValue] = useState(data.examplePrompt);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data.slug]);

  const handleStartConsultation = () => {
    // Store AI context for the assistant
    sessionStorage.setItem("project-init-message", inputValue.trim() || data.examplePrompt);
    sessionStorage.setItem("industry-context", JSON.stringify(data.aiContext));
    const assistantButton = document.querySelector('[data-assistant-trigger]') as HTMLButtonElement;
    if (assistantButton) assistantButton.click();
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": data.heroTitle,
    "description": data.metaDescription,
    "provider": {
      "@type": "Organization",
      "name": "TD Painting System",
      "url": "https://paintcell.lovable.app"
    },
    "serviceType": "Robotic Spray Painting Automation",
    "areaServed": "Worldwide",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer }
    }))
  };

  return (
    <>
      <Helmet>
        <title>{data.metaTitle}</title>
        <meta name="description" content={data.metaDescription} />
        <link rel="canonical" href={`https://paintcell.lovable.app/industries/${data.slug}`} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">

        {/* ─── 1. HERO ─── */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-20">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              {/* Left: declaration */}
              <div>
                <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent text-[11px] font-semibold tracking-wider uppercase">
                  <Sparkles className="h-3 w-3" />
                  {data.industryLabel} Solutions
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold mb-4 leading-tight">
                  {data.heroTitle}
                </h1>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-xl">
                  {data.heroSubtitle}
                </p>
                <Button
                  onClick={handleStartConsultation}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-11 px-6 gap-2 rounded-xl"
                >
                  {data.ctaText}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Right: AI input with industry preload */}
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-3 flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                  </span>
                  AI Agent — {data.industryLabel} mode
                </div>
                <div className={cn(
                  "rounded-2xl border transition-all duration-300 p-1 bg-card",
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
                      Start
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. PAIN POINTS ─── */}
        <section className="border-b border-border section-gradient">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <AlertTriangle className="h-3.5 w-3.5" />
              Conversion-critical
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Common painting challenges in {data.industryLabel.toLowerCase()}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.painPoints.map((point, i) => (
                <Card key={i} className="border-border bg-card">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <span className="flex items-center justify-center h-7 w-7 rounded-md bg-destructive/10 text-destructive text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-semibold text-sm mb-1">{point.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{point.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 3. SYSTEM ARCHITECTURE ─── */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Layers className="h-3.5 w-3.5" />
              System design
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Recommended system architecture for {data.industryLabel.toLowerCase()}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.systemModules.map((mod, i) => (
                <Card key={i} className="border-border bg-card">
                  <CardContent className="p-5">
                    <div className="text-accent font-bold text-lg mb-1">{String(i + 1).padStart(2, '0')}</div>
                    <h3 className="font-semibold text-sm mb-2">{mod.name}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{mod.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 4. PRODUCTION CONFIG ─── */}
        <section className="border-b border-border section-gradient">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <BarChart3 className="h-3.5 w-3.5" />
              SEO + AI core data
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Typical production configuration
            </h2>
            <Card className="border-border bg-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left py-3 px-5 font-semibold text-muted-foreground uppercase text-[11px] tracking-wider">Parameter</th>
                      <th className="text-left py-3 px-5 font-semibold text-muted-foreground uppercase text-[11px] tracking-wider">Specification</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Parts/hour", data.productionConfig.partsPerHour],
                      ["Paint type", data.productionConfig.paintType],
                      ["Finish requirement", data.productionConfig.finishRequirement],
                      ["Automation level", data.productionConfig.automationLevel],
                      ["Line integration", data.productionConfig.lineIntegration],
                    ].map(([label, value], i) => (
                      <tr key={i} className="border-b border-border last:border-0">
                        <td className="py-3 px-5 font-medium">{label}</td>
                        <td className="py-3 px-5 text-muted-foreground">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </section>

        {/* ─── 5. ROI ─── */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <BarChart3 className="h-3.5 w-3.5" />
              Investment reference
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Investment & ROI reference
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {data.roiMetrics.map((metric, i) => (
                <Card key={i} className="border-border bg-card text-center">
                  <CardContent className="p-6">
                    <div className="text-2xl md:text-3xl font-bold text-accent mb-2">{metric.value}</div>
                    <div className="text-sm text-muted-foreground font-medium">{metric.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 6. CASE REFERENCES ─── */}
        <section className="border-b border-border section-gradient">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Quote className="h-3.5 w-3.5" />
              Project track record
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Project references in {data.industryLabel.toLowerCase()}
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {data.caseReferences.map((ref, i) => (
                <Card key={i} className="border-border bg-card">
                  <CardContent className="p-5 space-y-3">
                    <h3 className="font-semibold text-sm">{ref.partType}</h3>
                    <div className="space-y-1.5 text-sm">
                      <div className="flex justify-between"><span className="text-muted-foreground">System</span><span className="font-medium">{ref.systemConfig}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Capacity</span><span className="font-medium">{ref.capacity}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">ROI</span><span className="font-medium text-accent">{ref.roi}</span></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 7. SECOND CTA ─── */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Start feasibility assessment
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Choose your preferred way to begin the engineering review process.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={handleStartConsultation}
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-11 px-6 gap-2 rounded-xl"
              >
                <Bot className="h-4 w-4" />
                Start AI consultation
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  const assistantButton = document.querySelector('[data-assistant-trigger]') as HTMLButtonElement;
                  if (assistantButton) assistantButton.click();
                }}
                className="h-11 px-6 gap-2 rounded-xl"
              >
                <MessageSquare className="h-4 w-4" />
                Talk to engineer
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/quote")}
                className="h-11 px-6 gap-2 rounded-xl"
              >
                <Upload className="h-4 w-4" />
                Use project form
              </Button>
            </div>
          </div>
        </section>

        {/* ─── 8. DELIVERY PROCESS ─── */}
        <section className="border-b border-border section-gradient">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Truck className="h-3.5 w-3.5" />
              Trust-building
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Project delivery process
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {deliverySteps.map((step) => (
                <div key={step.step} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span className="flex items-center justify-center h-8 w-8 rounded-full bg-accent text-accent-foreground text-xs font-bold shrink-0">
                      {step.step}
                    </span>
                    {step.step < deliverySteps.length && (
                      <div className="w-px flex-1 bg-border mt-1" />
                    )}
                  </div>
                  <div className="pb-6">
                    <h3 className="font-semibold text-sm mb-1">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 9. FAQ ─── */}
        <section>
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <HelpCircle className="h-3.5 w-3.5" />
              AI discovery
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Frequently asked questions
            </h2>
            <div className="max-w-3xl">
              <Accordion type="single" collapsible className="space-y-2">
                {data.faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-5 bg-card">
                    <AccordionTrigger className="text-sm font-medium text-left py-4 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
