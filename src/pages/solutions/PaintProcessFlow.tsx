import { useEffect, useMemo } from "react";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Helmet } from "react-helmet-async";
import {
  ChevronRight, Droplets, Wind, Paintbrush, Thermometer,
  CheckCircle2, Recycle, ArrowRight, Settings2, Bot,
  FileText, Sparkles, Layers, Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { useI18n } from "@/i18n";

const DOMAIN = "https://tdpaint.com";

const processStages = [
  {
    step: 1,
    icon: Droplets,
    titleKey: "pretreatment",
    defaultTitle: "Pretreatment",
    descKey: "pretreatmentDesc",
    defaultDesc: "Surface cleaning, degreasing, and chemical treatment to ensure optimal coating adhesion.",
    details: ["Alkaline cleaning", "Phosphating", "Passivation", "DI water rinse"],
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    step: 2,
    icon: Wind,
    titleKey: "drying",
    defaultTitle: "Drying & Cooling",
    descKey: "dryingDesc",
    defaultDesc: "Controlled drying after pretreatment and cooling between process stages.",
    details: ["Flash-off zones", "Air knife drying", "Temperature control", "Humidity management"],
    color: "bg-cyan-500/10 text-cyan-500",
  },
  {
    step: 3,
    icon: Shield,
    titleKey: "sealing",
    defaultTitle: "Sealing & Primer",
    descKey: "sealingDesc",
    defaultDesc: "Application of sealers, adhesives, and primer coats for corrosion protection.",
    details: ["PVC sealing", "Sound deadening", "Primer application", "E-coat (if applicable)"],
    color: "bg-slate-500/10 text-slate-500",
  },
  {
    step: 4,
    icon: Wind,
    titleKey: "sprayBooth",
    defaultTitle: "Spray Booth",
    descKey: "sprayBoothDesc",
    defaultDesc: "Controlled environment for robotic spray application with optimized airflow.",
    details: ["Downdraft design", "Climate control", "ATEX compliance", "Lighting optimization"],
    color: "bg-indigo-500/10 text-indigo-500",
  },
  {
    step: 5,
    icon: Paintbrush,
    titleKey: "painting",
    defaultTitle: "Robotic Painting",
    descKey: "paintingDesc",
    defaultDesc: "Automated basecoat and clearcoat application with precision robotic systems.",
    details: ["Basecoat application", "Clearcoat application", "Electrostatic charging", "Multi-color capability"],
    color: "bg-accent/10 text-accent",
  },
  {
    step: 6,
    icon: Thermometer,
    titleKey: "curing",
    defaultTitle: "Curing & Baking",
    descKey: "curingDesc",
    defaultDesc: "Thermal curing ovens for paint crosslinking and hardening.",
    details: ["Convection ovens", "IR curing zones", "Temperature profiling", "Energy efficiency"],
    color: "bg-orange-500/10 text-orange-500",
  },
  {
    step: 7,
    icon: CheckCircle2,
    titleKey: "inspection",
    defaultTitle: "Quality Control",
    descKey: "inspectionDesc",
    defaultDesc: "Automated and manual inspection for finish quality verification.",
    details: ["DFT measurement", "Gloss measurement", "Visual inspection", "Defect detection"],
    color: "bg-green-500/10 text-green-500",
  },
  {
    step: 8,
    icon: Recycle,
    titleKey: "overspray",
    defaultTitle: "Overspray Separation",
    descKey: "oversprayDesc",
    defaultDesc: "Capture and treatment of overspray particles for environmental compliance.",
    details: ["Dry filtration", "Water wash systems", "VOC abatement", "Paint recovery"],
    color: "bg-emerald-500/10 text-emerald-500",
  },
];

export default function PaintProcessFlow() {
  const { t, locale } = useI18n();
  const ppf = t.paintProcessFlow || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const schemas = useMemo(() => [
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "@id": `${DOMAIN}/solutions/paint-process-flow#howto`,
      name: "Industrial Paint Process Flow",
      description: "Complete paint process from pretreatment through overspray separation for robotic painting automation.",
      step: processStages.map((stage, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: stage.defaultTitle,
        text: stage.defaultDesc,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${DOMAIN}/solutions/paint-process-flow#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${DOMAIN}/` },
        { "@type": "ListItem", position: 2, name: "Solutions", item: `${DOMAIN}/solutions` },
        { "@type": "ListItem", position: 3, name: "Paint Process Flow", item: `${DOMAIN}/solutions/paint-process-flow` },
      ],
    },
  ], []);

  return (
    <>
      <Helmet>
        <title>{ppf.metaTitle || "Paint Process Flow | Complete Coating Line Stages | TD"}</title>
        <meta name="description" content={ppf.metaDescription || "Complete paint process flow from pretreatment to overspray separation. Understanding the 8 stages of industrial coating lines for automotive and general industry applications."} />
        <link rel="canonical" href={`${DOMAIN}/solutions/paint-process-flow`} />
        {schemas.map((s, i) => (
          <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
        ))}
      </Helmet>

      <div className="min-h-screen bg-background">

        {/* Breadcrumb */}
        <div className="container-wide pt-4 pb-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/solutions">Solutions</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{ppf.title || "Paint Process Flow"}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Hero */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-20">
            <FadeIn>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Layers className="h-6 w-6 text-accent" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
                  {ppf.badge || "Process Overview"}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold mb-6 leading-tight">
                {ppf.heroTitle || "Paint Process Flow"}
              </h1>
              <div className="max-w-3xl space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
                <p>
                  {ppf.heroSubtitle || "A complete industrial coating line consists of multiple integrated stages, from surface preparation through final quality inspection. Understanding each stage is essential for designing systems that deliver consistent finish quality and production efficiency."}
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Process Flow Visualization */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <FadeIn>
              <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <Settings2 className="h-3.5 w-3.5" />
                {ppf.stagesLabel || "Process Stages"}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                {ppf.stagesTitle || "8 Stages of Paint Processing"}
              </h2>
            </FadeIn>

            {/* Flow diagram - horizontal on desktop */}
            <div className="hidden lg:block mb-12">
              <div className="flex items-center justify-between relative">
                {/* Connection line */}
                <div className="absolute top-6 left-8 right-8 h-0.5 bg-border" />
                
                {processStages.map((stage, index) => (
                  <FadeIn key={stage.step} delay={index * 0.1}>
                    <div className="relative flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full ${stage.color} flex items-center justify-center z-10 border-4 border-background`}>
                        <stage.icon className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-semibold mt-2 text-center max-w-[80px]">
                        {ppf[stage.titleKey] || stage.defaultTitle}
                      </span>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* Detailed cards */}
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {processStages.map((stage) => (
                <StaggerItem key={stage.step}>
                  <Card className="border-border bg-card h-full hover:border-accent/30 transition-colors">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-xl ${stage.color} flex items-center justify-center`}>
                          <stage.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            Stage {stage.step}
                          </span>
                          <h3 className="font-semibold text-sm">
                            {ppf[stage.titleKey] || stage.defaultTitle}
                          </h3>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">
                        {ppf[stage.descKey] || stage.defaultDesc}
                      </p>
                      <div className="pt-3 border-t border-border">
                        <ul className="space-y-1">
                          {stage.details.map((detail, i) => (
                            <li key={i} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                              <ChevronRight className="h-2.5 w-2.5 text-accent" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* TD Scope Highlight */}
        <section className="border-b border-border bg-muted/30">
          <div className="container-wide py-12 md:py-16">
            <FadeIn>
              <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5" />
                {ppf.scopeLabel || "TD Specialization"}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {ppf.scopeTitle || "Our Core Focus Areas"}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl">
                {ppf.scopeDesc || "TD Robotic Painting Systems specializes in the spray booth, robotic painting, and quality control stages. We provide complete integration from paint supply through finished coating."}
              </p>
            </FadeIn>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Wind, title: ppf.boothIntegration || "Booth Integration", desc: ppf.boothIntegrationDesc || "Paint booth design, airflow optimization, and ventilation systems." },
                { icon: Paintbrush, title: ppf.roboticPainting || "Robotic Painting", desc: ppf.roboticPaintingDesc || "Robot selection, programming, spray equipment, and process control." },
                { icon: CheckCircle2, title: ppf.qualityControl || "Quality Systems", desc: ppf.qualityControlDesc || "Inline inspection, DFT monitoring, and defect detection integration." },
              ].map((item, index) => (
                <FadeIn key={item.title} delay={index * 0.1}>
                  <div className="flex items-start gap-4 p-5 rounded-xl border border-accent/30 bg-card">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <item.icon className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Related Solutions */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <FadeIn>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                {ppf.relatedTitle || "Related Solutions"}
              </h2>
            </FadeIn>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { href: "/solutions/robotic-painting-system", title: "Robotic Painting System", desc: "Complete robotic painting cell integration" },
                { href: "/solutions/turnkey-painting-shop", title: "Turnkey Painting Shop", desc: "End-to-end painting facility design" },
                { href: "/solutions/paint-supply-systems", title: "Paint Supply Systems", desc: "Material handling and color change" },
              ].map((solution, index) => (
                <FadeIn key={solution.href} delay={index * 0.1}>
                  <Link
                    to={solution.href}
                    className="group block p-5 rounded-xl border border-border bg-card hover:border-accent/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{solution.title}</h3>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-sm text-muted-foreground">{solution.desc}</p>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16">
          <div className="container-wide">
            <FadeIn>
              <div className="rounded-2xl border border-border bg-muted/30 p-8 md:p-12 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  {ppf.ctaTitle || "Plan Your Coating Line"}
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  {ppf.ctaSubtitle || "Our engineering team can help design the optimal process flow for your production requirements."}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button
                    onClick={() => {
                      const btn = document.querySelector("[data-assistant-trigger]") as HTMLButtonElement;
                      if (btn) btn.click();
                    }}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-11 px-6 gap-2 rounded-xl"
                  >
                    <Bot className="h-4 w-4" />
                    {ppf.startAssessment || "Start Process Assessment"}
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="h-11 px-6 gap-2 rounded-xl"
                  >
                    <Link to="/quote">
                      <FileText className="h-4 w-4" />
                      {ppf.requestQuote || "Request Quote"}
                    </Link>
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

      </div>
    </>
  );
}
