import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { BenefitDetailModal, BenefitModalContent } from "@/components/home/BenefitDetailModal";
import { ProjectInterfacePanel } from "@/components/home/ProjectInterfacePanel";
import { HomeSidebar } from "@/components/home/HomeSidebar";
import { InlineChatPanel } from "@/components/home/InlineChatPanel";
import { TrustStats } from "@/components/home/TrustStats";
import { TrustLogos } from "@/components/home/TrustLogos";
import { ExploreLinks } from "@/components/seo/ExploreLinks";
import {
  ChevronRight, Target, Zap, Shield, Users, Cog, Box, Settings, Gauge,
  Car, Refrigerator, Wrench, Factory, ArrowRight, CheckCircle2,
  MessageSquare, FileText, Upload, User, CalendarDays, HelpCircle
} from "lucide-react";
import { useI18n } from "@/i18n";
import { deliverySteps } from "@/data/industryData";

interface Benefit {
  icon: typeof Target;
  title: string;
  description: string;
  microLine: string;
  modalContent: BenefitModalContent;
}

const DOMAIN = "https://tdpaintcell.com";

const homepageFAQs = [
  {
    question: "What is a robotic painting system integrator?",
    answer: "A robotic painting system integrator designs and integrates robots, spray technologies, paint supply systems, controls, and commissioning workflows into a complete finishing solution that delivers repeatable quality and stable throughput."
  },
  {
    question: "How does paint booth automation improve production?",
    answer: "Paint booth automation stabilizes airflow/ventilation and safety controls, reduces process variability, and supports repeatable finishing outcomes with reduced rework and more consistent production conditions."
  },
  {
    question: "What industries use robotic spray painting?",
    answer: "Robotic spray painting is commonly used for automotive components and other industrial finishing applications where repeatable coating quality, controlled process stability, and scalable throughput are required."
  },
  {
    question: "What is required to start a robotic painting project?",
    answer: "To start a project assessment, provide part drawings or dimensions, coating requirements, throughput targets, booth situation (new or existing), and site classification needs such as ATEX where applicable."
  },
];

const industryEntries = [
  { icon: Car, title: "Automotive component painting", href: "/industries/automotive-painting", description: "Body panels, brackets, trim, structural parts" },
  { icon: Refrigerator, title: "Appliance coating automation", href: "/industries/appliance-coating", description: "Panels, housings, consumer-grade finishes" },
  { icon: Wrench, title: "Metal parts finishing", href: "/industries/metal-parts-finishing", description: "Enclosures, fabricated steel, aluminum components" },
  { icon: Factory, title: "Industrial equipment coating", href: "/industries", description: "Machinery, frames, heavy equipment" },
];

const coreCapabilities = [
  "Robotic painting system integration for automotive production",
  "Automated spray painting workstations and robotic painting cells",
  "Paint booth automation and process engineering (new booth or retrofit)",
  "Industrial robot configuration (ABB / FANUC / KUKA)",
  "Spray technology options: electrostatic, HVLP, air spray",
  "Control integration with PLC and robot controllers",
  "Commissioning, deployment, and production startup support",
];

const jsonLdSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${DOMAIN}/#organization`,
    "name": "TD Robotic Painting Systems",
    "url": DOMAIN,
    "logo": `${DOMAIN}/images/og-social-share.png`,
    "description": "System-level engineering and integration of robotic painting systems and paint booth automation.",
    "contactPoint": { "@type": "ContactPoint", "contactType": "sales", "email": "info@tdpaintcell.com" },
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
    "@type": "WebPage",
    "@id": `${DOMAIN}/#webpage`,
    "name": "TD Robotic Painting Systems | Robotic Painting System Integrator for Automotive Components",
    "url": `${DOMAIN}/`,
    "isPartOf": { "@id": `${DOMAIN}/#website` },
    "about": { "@id": `${DOMAIN}/#organization` },
    "inLanguage": "en",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${DOMAIN}/#faq`,
    "mainEntity": [
      { "@type": "Question", "name": "What is a robotic painting system integrator?", "acceptedAnswer": { "@type": "Answer", "text": "A robotic painting system integrator designs and integrates robots, spray technologies, paint supply systems, controls, and commissioning workflows into a complete finishing solution that delivers repeatable quality and stable throughput." } },
      { "@type": "Question", "name": "How does paint booth automation improve production?", "acceptedAnswer": { "@type": "Answer", "text": "Paint booth automation stabilizes airflow/ventilation and safety controls, reduces process variability, and supports repeatable finishing outcomes with reduced rework and more consistent production conditions." } },
      { "@type": "Question", "name": "What industries use robotic spray painting?", "acceptedAnswer": { "@type": "Answer", "text": "Robotic spray painting is commonly used for automotive components and other industrial finishing applications where repeatable coating quality, controlled process stability, and scalable throughput are required." } },
      { "@type": "Question", "name": "What is required to start a robotic painting project?", "acceptedAnswer": { "@type": "Answer", "text": "To start a project assessment, provide part drawings or dimensions, coating requirements, throughput targets, booth situation (new or existing), and site classification needs such as ATEX where applicable." } },
    ],
  },
];

export default function Index() {
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("ai-consultation");
  const [chatActive, setChatActive] = useState(false);
  const [chatInitialMessage, setChatInitialMessage] = useState<string | null>(null);
  const { t } = useI18n();

  const benefits: Benefit[] = [{
    icon: Target,
    title: t.home.qualityConsistency,
    description: t.home.qualityDesc,
    microLine: t.home.qualityMicro,
    modalContent: {
      title: t.home.qualityConsistency,
      engineeringAnchor: "Repeatability depends on fixturing, path control, and paint stability.",
      typicalUseCase: "Tight appearance requirements, reduced rework, stable finish across shifts.",
      keyConstraints: "Part presentation/fixturing, spray distance & angle, edge coverage, paint viscosity/atomization, booth airflow & temperature.",
      whatWeNeedToAssess: "Part CAD or photos, finish spec (visual vs functional), target film build range, acceptable touch-up level, current defect/rework drivers."
    }
  }, {
    icon: Zap,
    title: t.home.throughput,
    description: t.home.throughputDesc,
    microLine: t.home.throughputMicro,
    modalContent: {
      title: t.home.throughput,
      engineeringAnchor: "True capacity is limited by takt, changeovers, and handling time.",
      typicalUseCase: "Increase line output, stabilize cycle time, enable longer unattended operation.",
      keyConstraints: "Robot path length vs takt time, loading/unloading method, curing/dry time, color change & cleaning time, buffer/conveyor logic.",
      whatWeNeedToAssess: "Required parts/hour (or takt), shift pattern, batch size & changeover frequency, current bottleneck step, handling/conveyor constraints."
    }
  }, {
    icon: Users,
    title: t.home.laborReduction,
    description: t.home.laborDesc,
    microLine: t.home.laborMicro,
    modalContent: {
      title: t.home.laborReduction,
      engineeringAnchor: "Labor savings come from a clear automation boundary.",
      typicalUseCase: "Reduce dependency on skilled painters, shift labor to prep/QA, improve staffing stability.",
      keyConstraints: "Masking/prep workload, manual touch-up expectations, paint mixing/refill routine, maintenance & daily checks, inspection and rework loop.",
      whatWeNeedToAssess: "Which tasks must remain manual, acceptable manual touch-up %, paint supply method, operator skill availability, current staffing pain points."
    }
  }, {
    icon: Shield,
    title: t.home.safetyCompliance,
    description: t.home.safetyDesc,
    microLine: t.home.safetyMicro,
    modalContent: {
      title: t.home.safetyCompliance,
      engineeringAnchor: "Compliance is defined by ventilation, fire risk, and site conditions.",
      typicalUseCase: "Reduce exposure to fumes/overspray, standardize safety controls, meet plant and local compliance requirements.",
      keyConstraints: "Booth ventilation & airflow, VOC/solvent handling, grounding & static control, fire suppression, hazardous area classification (if applicable).",
      whatWeNeedToAssess: "Paint type (liquid), booth/room dimensions, ventilation/exhaust capacity, plant safety standards required (e.g., NFPA/ATEX where relevant), waste handling constraints."
    }
  }];

  const systemComponents = [{
    icon: Cog,
    title: t.home.industrialRobot,
    description: t.home.robotDesc,
  }, {
    icon: Box,
    title: t.home.sprayEquipment,
    description: t.home.sprayDesc,
  }, {
    icon: Settings,
    title: t.home.boothVentilation,
    description: t.home.boothDesc,
  }, {
    icon: Gauge,
    title: t.home.processControls,
    description: t.home.controlsDesc,
  }];

  useEffect(() => {
    // Hide static FAQ visually (keep in DOM for crawlers) once React renders its own FAQ
    const staticFaq = document.getElementById("static-faq");
    if (staticFaq) {
      staticFaq.style.position = "absolute";
      staticFaq.style.width = "1px";
      staticFaq.style.height = "1px";
      staticFaq.style.overflow = "hidden";
      staticFaq.style.clip = "rect(0,0,0,0)";
      staticFaq.style.whiteSpace = "nowrap";
    }
  }, []);

  useEffect(() => {
    const handleReset = () => {
      setChatActive(false);
      setChatInitialMessage(null);
      setActiveSection("ai-consultation");
    };
    window.addEventListener("reset-homepage", handleReset);
    return () => window.removeEventListener("reset-homepage", handleReset);
  }, []);

  const handleCardClick = (benefit: Benefit) => {
    setSelectedBenefit(benefit);
    setIsModalOpen(true);
  };

  const handleStartConsultation = () => {
    setIsModalOpen(false);
    setChatActive(true);
    setActiveSection("ai-consultation");
  };

  const handleSidebarClick = (id: string) => {
    setActiveSection(id);
    if (id === "ai-consultation") {
      setChatActive(true);
      setChatInitialMessage(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setChatActive(false);
    }
  };

  const handleStartChat = (message?: string) => {
    setChatActive(true);
    setActiveSection("ai-consultation");
    if (message) {
      setChatInitialMessage(message);
    }
  };

  return (
    <>
      <Helmet>
        <title>TD Robotic Painting Systems | Robotic Painting System Integrator for Automotive Components</title>
        <meta name="description" content="System-level integration of robotic spray painting cells and paint booth automation for automotive components and industrial finishing. Start your robotic painting project: talk to an engineer, upload drawings, or begin an AI project assessment." />
        <link rel="canonical" href={`${DOMAIN}/`} />
        {jsonLdSchemas.map((schema, i) => (
          <script key={i} type="application/ld+json">{JSON.stringify(schema)}</script>
        ))}
      </Helmet>

      <div className="bg-background flex">
        <HomeSidebar activeItem={activeSection} onItemClick={handleSidebarClick} />

        <div className="flex-1 min-w-0">
          {/* Hero — AI Project Interface */}
          {chatActive ? (
            <InlineChatPanel
              initialMessage={chatInitialMessage}
              onClose={() => {
                setChatActive(false);
                setChatInitialMessage(null);
              }}
            />
          ) : (
            <ProjectInterfacePanel onStartChat={handleStartChat} />
          )}

          {/* H1 + Definition Block */}
          <section id="definition" className="py-12 md:py-16 border-t border-border section-gradient">
            <div className="container-wide">
              <FadeIn>
                <div className="max-w-4xl">
                  <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                    Robotic Painting System Integrator for Automotive Components
                  </h1>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
                    A <strong className="text-foreground">robotic painting system</strong> is an integrated automation solution combining industrial robots, spray technologies, paint supply systems, and process control to deliver consistent finish quality and stable production throughput.
                  </p>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                    TD Robotic Painting Systems specializes in engineering and integrating robotic painting cells and automated painting workstations for automotive component manufacturing and industrial finishing. With 500+ systems deployed across 30+ countries, our solutions typically reduce paint waste by 20–40% and achieve first-pass yield rates above 95%.
                  </p>
                  <div className="border-l-2 border-accent/40 pl-4">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                      We provide system-level integration rather than standalone equipment. Our solutions combine robot selection, spray process configuration, booth integration, control integration, and commissioning support.
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Applications primarily serve automotive component production, with deployment supporting manufacturers targeting global markets, including Europe and North America.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* Trust Stats — Animated Numbers */}
          <section id="trust-stats" className="py-14 md:py-18 border-t border-border">
            <div className="container-wide">
              <FadeIn>
                <div className="mb-10 text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">Track record</p>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">Proven at Scale</h2>
                  <div className="h-px w-12 bg-accent/50 mx-auto" />
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <TrustStats />
              </FadeIn>
            </div>
          </section>

          {/* Industry Entry */}
          <section id="industry-entry" className="py-14 md:py-18 border-t border-border section-gradient">
            <div className="container-wide">
              <FadeIn>
                <div className="mb-8">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">Application sectors</p>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">Select your application</h2>
                  <div className="h-px w-12 bg-accent/50" />
                </div>
              </FadeIn>
              <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {industryEntries.map((entry) => (
                  <StaggerItem key={entry.title}>
                    <Link
                      to={entry.href}
                      className="group relative block rounded-xl p-5 border border-border hover:border-accent/40 transition-all duration-300 h-full bg-card overflow-hidden card-elevated"
                    >
                      {/* Hover accent indicator */}
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                          <entry.icon className="h-5 w-5 text-accent" />
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-300" />
                      </div>
                      <h3 className="text-sm font-semibold mb-1">{entry.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{entry.description}</p>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>

          {/* Core Capabilities — with internal links */}
          <section id="core-capabilities" className="py-14 md:py-18 border-t border-border section-gradient">
            <div className="container-wide">
              <FadeIn>
                <div className="mb-8">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">Engineering scope</p>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">What We Deliver</h2>
                  <div className="h-px w-12 bg-accent/50" />
                </div>
              </FadeIn>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 max-w-4xl">
                {coreCapabilities.map((capability, i) => (
                  <FadeIn key={i} delay={i * 0.05}>
                    <div className="flex items-start gap-3 py-2">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground leading-relaxed">{capability}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
              <FadeIn delay={0.4}>
                <div className="mt-6 pt-4 border-t border-border max-w-4xl space-y-2">
                  <p className="text-sm text-muted-foreground">
                    For system-level integration details, see{" "}
                    <Link to="/solutions/robotic-painting-system" className="text-accent hover:text-accent/80 underline">Robotic Painting System</Link>.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    For booth-specific scope, see{" "}
                    <Link to="/solutions/paint-booth-automation" className="text-accent hover:text-accent/80 underline">Paint Booth Automation</Link>.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Planning robot selection? See{" "}
                    <Link to="/resources/knowledge/how-to-choose-paint-robot" className="text-accent hover:text-accent/80 underline">How to Choose a Paint Robot</Link>
                    {" "}and{" "}
                    <Link to="/resources/knowledge/robotic-painting-cost-guide" className="text-accent hover:text-accent/80 underline">Robotic Painting Cost Guide</Link>.
                  </p>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* System Architecture */}
          <section id="system-overview" className="py-16 md:py-20 border-t border-border">
            <div className="container-wide">
              <FadeIn>
                <div className="mb-10">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">{t.home.sectionArchitecture}</p>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">{t.home.completeSolution}</h2>
                  <div className="h-px w-12 bg-accent/50" />
                </div>
              </FadeIn>
              <StaggerContainer className="grid md:grid-cols-2 gap-3">
                {systemComponents.map(component => (
                  <StaggerItem key={component.title}>
                    <div className="rounded-xl p-5 border border-border flex gap-4 h-full hover:border-accent/20 transition-all duration-200 bg-card">
                      <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                        <component.icon className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold mb-1.5">{component.title}</h3>
                        <p className="text-muted-foreground text-xs leading-relaxed">{component.description}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
              <FadeIn delay={0.4} className="mt-8 text-center">
                <Button asChild variant="outline">
                  <Link to="/paint-cells">
                    {t.home.exploreSolutions}
                  </Link>
                </Button>
              </FadeIn>
            </div>
          </section>

          {/* Deployment Process */}
          <section id="deployment-process" className="py-14 md:py-18 border-t border-border section-gradient">
            <div className="container-wide">
              <FadeIn>
                <div className="mb-10">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">Project lifecycle</p>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">Deployment process</h2>
                  <div className="h-px w-12 bg-accent/50" />
                </div>
              </FadeIn>
              <div className="max-w-4xl">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {deliverySteps.slice(0, 4).map((step) => (
                    <FadeIn key={step.step} delay={step.step * 0.08}>
                      <div className="rounded-xl p-4 border border-border bg-card h-full">
                        <span className="text-lg font-bold text-accent/60 mb-2 block">{step.step}</span>
                        <h3 className="text-sm font-semibold mb-1">{step.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
                <div className="grid sm:grid-cols-3 gap-3 mt-3">
                  {deliverySteps.slice(4).map((step) => (
                    <FadeIn key={step.step} delay={step.step * 0.08}>
                      <div className="rounded-xl p-4 border border-border bg-card h-full">
                        <span className="text-lg font-bold text-accent/60 mb-2 block">{step.step}</span>
                        <h3 className="text-sm font-semibold mb-1">{step.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
                <FadeIn delay={0.6}>
                  <p className="text-sm text-muted-foreground mt-6">
                    TD systems are designed for rapid deployment within standard industrial timelines.
                  </p>
                </FadeIn>
              </div>
            </div>
          </section>

          {/* Why Robotic Painting Automation */}
          <section id="why-robotic-painting" className="py-16 md:py-20 border-t border-border">
            <div className="container-wide">
              <FadeIn>
                <div className="mb-10">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">{t.home.sectionRationale}</p>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">Why robotic painting automation</h2>
                  <div className="h-px w-12 bg-accent/50" />
                </div>
              </FadeIn>
              <div className="max-w-3xl space-y-2 mb-8">
                {[
                  "Improve coating consistency — achieve first-pass yield rates above 95%",
                  "Reduce paint waste by 20–40% through optimized transfer efficiency",
                  "Stabilize production throughput with repeatable cycle times",
                  "Lower labor costs — typical ROI payback within 18–36 months",
                  "Meet VOC emission and safety compliance with enclosed robotic cells",
                ].map((item, i) => (
                  <FadeIn key={i} delay={i * 0.05}>
                    <div className="flex items-start gap-3 py-1">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">{item}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
              <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                {benefits.map((benefit: Benefit) => (
                  <StaggerItem key={benefit.title}>
                    <div
                      className="rounded-xl p-5 border border-border hover:border-accent/30 transition-all duration-200 h-full flex flex-col cursor-pointer bg-card group"
                      onClick={() => handleCardClick(benefit)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleCardClick(benefit);
                        }
                      }}
                    >
                      <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-colors">
                        <benefit.icon className="h-4 w-4 text-accent" />
                      </div>
                      <h3 className="text-sm font-semibold mb-1.5">{benefit.title}</h3>
                      <p className="text-muted-foreground text-xs leading-relaxed flex-1">{benefit.description}</p>
                      <p className="text-[11px] text-muted-foreground/60 mt-3 pt-2.5 border-t border-border italic">
                        {benefit.microLine}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>

          {/* Project Initiation — Dark CTA Section */}
          <section id="project-initiation" className="py-14 md:py-18 border-t border-border section-dark relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-accent/[0.08] blur-[100px]" />
              <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/[0.05] blur-[80px] translate-x-1/4 translate-y-1/4" />
            </div>
            <div className="container-wide relative">
              <FadeIn>
                <div className="max-w-3xl mx-auto text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent mb-2">Get started</p>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3 text-white">Start your robotic painting project</h2>
                  <p className="text-sm text-white/60 mb-8">
                    Tell us about your parts, coating requirements, and production needs.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                    <Button
                      onClick={() => handleStartChat()}
                      className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold gap-2 h-12 px-8 text-sm rounded-xl shadow-[0_4px_20px_-2px_hsl(192_70%_36%/0.5)] hover:shadow-[0_6px_28px_-2px_hsl(192_70%_36%/0.6)] transition-all duration-300"
                    >
                      <MessageSquare className="h-4 w-4" />
                      Start project assessment
                    </Button>
                    <Button asChild variant="outline" className="gap-2 h-12 px-8 text-sm rounded-xl border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
                      <Link to="/quote">
                        <FileText className="h-4 w-4" />
                        Talk to an engineer
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="gap-2 h-12 px-8 text-sm rounded-xl border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                      onClick={() => handleStartChat("I'd like to share part drawings for a robotic painting feasibility assessment.")}
                    >
                      <Upload className="h-4 w-4" />
                      Upload part drawings
                    </Button>
                  </div>
                  <p className="text-xs text-white/40">
                    Free initial assessment · No commitment · Response within 24 hours
                  </p>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* Project References */}
          <section id="project-references" className="py-14 md:py-18 border-t border-border section-gradient">
            <div className="container-wide">
              <FadeIn>
                <div className="mb-8">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">{t.home.sectionReference}</p>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">{t.home.projectReferences}</h2>
                  <div className="h-px w-12 bg-accent/50" />
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                  {[
                    { industry: "Automotive", metric: "Reject rate 8.2% → 1.2%", detail: "Dual robot electrostatic cell" },
                    { industry: "Heavy Equipment", metric: "Warranty claims ↓65%", detail: "7th-axis rail system, HVLP" },
                    { industry: "Electronics", metric: "Color change 2hr → 12min", detail: "16-color automatic manifold" },
                    { industry: "Aerospace", metric: "Zero non-conformances", detail: "Full AS9100D compliance" },
                  ].map((ref, i) => (
                    <Link
                      key={i}
                      to="/case-studies"
                      className="group rounded-xl p-5 border border-border bg-card card-elevated hover:border-accent/30 transition-all duration-300"
                    >
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-accent mb-2 block">
                        {ref.industry}
                      </span>
                      <p className="text-sm font-semibold text-foreground mb-1">{ref.metric}</p>
                      <p className="text-xs text-muted-foreground">{ref.detail}</p>
                    </Link>
                  ))}
                </div>
              </FadeIn>
              <FadeIn delay={0.2} className="text-center">
                <Button asChild variant="outline" className="rounded-xl">
                  <Link to="/case-studies" className="flex items-center gap-2">
                    {t.home.viewCaseStudies}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </FadeIn>
            </div>
          </section>

          {/* Technology Partners & Trust */}
          <section id="trust-logos" className="py-14 md:py-18 border-t border-border">
            <div className="container-wide">
              <FadeIn>
                <TrustLogos />
              </FadeIn>
            </div>
          </section>

          {/* Explore Links */}
          <ExploreLinks currentPath="/" />

          {/* E-E-A-T Block */}
          <section className="border-t border-border">
            <div className="container-wide py-8 md:py-10">
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
                  Scope: Robotic painting system integration and paint booth automation for automotive components and industrial finishing. Specifications depend on application and site classification (including ATEX where required).
                </span>
              </div>
            </div>
          </section>

          {/* FAQ — all expanded by default */}
          <section id="faq" className="py-14 md:py-18 border-t border-border section-gradient">
            <div className="container-wide">
              <FadeIn>
                <div className="mb-10">
                  <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                    <HelpCircle className="h-3.5 w-3.5" />
                    FAQ
                  </div>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">Frequently asked questions</h2>
                  <div className="h-px w-12 bg-accent/50" />
                </div>
              </FadeIn>
              <div className="max-w-3xl space-y-2">
                {homepageFAQs.map((faq, i) => (
                  <FadeIn key={i} delay={i * 0.08}>
                    <div className="border border-border rounded-xl bg-card overflow-hidden">
                      <div className="p-4">
                        <h3 className="text-sm font-semibold mb-2">{faq.question}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          <BenefitDetailModal open={isModalOpen} onOpenChange={setIsModalOpen} content={selectedBenefit?.modalContent || null} onStartConsultation={handleStartConsultation} />
        </div>
      </div>
    </>
  );
}
