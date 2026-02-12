import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { BenefitDetailModal, BenefitModalContent } from "@/components/home/BenefitDetailModal";
import { ProjectInterfacePanel } from "@/components/home/ProjectInterfacePanel";
import { HomeSidebar } from "@/components/home/HomeSidebar";
import { InlineChatPanel } from "@/components/home/InlineChatPanel";
import {
  ChevronRight, Target, Zap, Shield, Users, Cog, Box, Settings, Gauge,
  Car, Refrigerator, Wrench, Factory, ArrowRight, CheckCircle2,
  MessageSquare, FileText, Upload
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

const homepageFAQs = [
  {
    question: "What is a robotic painting system integrator?",
    answer: "A robotic painting system integrator designs, engineers, and delivers complete automated spray painting solutions — combining industrial robots, spray technologies, paint supply systems, booth design, and process controls into a production-ready workstation. Unlike standalone equipment suppliers, an integrator ensures all subsystems work together for consistent finish quality and stable throughput."
  },
  {
    question: "How does paint booth automation improve production?",
    answer: "Paint booth automation replaces manual spraying with robot-controlled spray processes inside an engineered booth environment. This delivers repeatable film build, consistent finish quality, reduced overspray waste, faster cycle times, and stable production output independent of operator skill variation."
  },
  {
    question: "What industries use robotic spray painting?",
    answer: "Robotic spray painting is deployed across automotive component manufacturing, appliance production, metal parts finishing, industrial equipment coating, commercial vehicle painting, and general manufacturing. Any operation requiring consistent finish quality at production volumes benefits from automation."
  },
  {
    question: "What is required to start a robotic painting project?",
    answer: "To begin a project assessment, you need: part geometry information (drawings, CAD, or photos), target production volume (parts per hour or shift), paint type and finish specification, available floor space, and any existing line integration requirements. Our AI agent can guide you through this initial requirement gathering."
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
  "Automated spray painting workstations",
  "Paint booth automation and process engineering",
  "Industrial robot configuration (ABB / FANUC / KUKA)",
  "Spray technology options: electrostatic, HVLP, air spray",
  "Control integration with PLC and robot controllers",
  "Commissioning, deployment, and production startup support",
];

const homepageStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "TD Robotic Painting Systems",
      "alternateName": "TDPaintCell",
      "url": "https://paintcell.lovable.app",
      "description": "Engineering and integration of robotic painting cells and automated spray painting workstations for automotive manufacturers and industrial suppliers worldwide.",
      "areaServed": ["Worldwide", "Europe", "North America", "Asia"],
      "knowsAbout": [
        "Robotic painting systems",
        "Paint booth automation",
        "Spray painting workstations",
        "Industrial robot integration"
      ]
    },
    {
      "@type": "WebPage",
      "name": "Robotic Painting Systems & Paint Booth Automation Integrator",
      "description": "TD Robotic Painting Systems provides engineering and integration of robotic painting cells and automated spray painting workstations for automotive manufacturers and industrial suppliers worldwide.",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://paintcell.lovable.app" }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": homepageFAQs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
      }))
    }
  ]
};

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

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Helmet>
        <title>Robotic Painting Systems & Paint Booth Automation Integrator | TD</title>
        <meta name="description" content="TD Robotic Painting Systems provides engineering and integration of robotic painting cells and automated spray painting workstations for automotive manufacturers and industrial suppliers worldwide." />
        <link rel="canonical" href="https://paintcell.lovable.app" />
        <script type="application/ld+json">{JSON.stringify(homepageStructuredData)}</script>
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

          {/* Definition Block */}
          <section id="definition" className="py-12 md:py-16 border-t border-border bg-muted/30">
            <div className="container-wide">
              <FadeIn>
                <div className="max-w-4xl">
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
                    A <strong className="text-foreground">robotic painting system</strong> is an automated coating solution combining industrial robots, spray technologies, paint supply systems, and process control to deliver consistent finish quality and stable production throughput.
                  </p>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                    TD Robotic Painting Systems provides engineering and integration of robotic painting cells and automated spray painting workstations for automotive manufacturers and industrial suppliers worldwide.
                  </p>
                  <div className="border-l-2 border-accent/40 pl-4">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                      We provide system-level integration rather than standalone equipment. Our solutions combine robot selection, spray process configuration, booth design, control integration, and commissioning support.
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Applications primarily serve automotive component production and industrial finishing environments targeting global markets including Europe and North America.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* Industry Entry */}
          <section id="industry-entry" className="py-14 md:py-18 border-t border-border">
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
                      className="group block rounded-xl p-5 border border-border hover:border-accent/30 transition-all duration-200 h-full bg-card"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                          <entry.icon className="h-5 w-5 text-accent" />
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
                      </div>
                      <h3 className="text-sm font-semibold mb-1">{entry.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{entry.description}</p>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>

          {/* Core Capabilities */}
          <section id="core-capabilities" className="py-14 md:py-18 border-t border-border bg-muted/30">
            <div className="container-wide">
              <FadeIn>
                <div className="mb-8">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">Engineering scope</p>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">Core capabilities</h2>
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
                <p className="text-sm text-muted-foreground mt-6 pt-4 border-t border-border max-w-4xl">
                  Systems deployed for automotive component manufacturers and industrial finishing operations.
                </p>
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
          <section id="deployment-process" className="py-14 md:py-18 border-t border-border bg-muted/30">
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

          {/* Project Initiation */}
          <section id="project-initiation" className="py-14 md:py-18 border-t border-border bg-muted/30">
            <div className="container-wide">
              <FadeIn>
                <div className="max-w-3xl mx-auto text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">Get started</p>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">Start your robotic painting project</h2>
                  <p className="text-sm text-muted-foreground mb-8">
                    Tell us about your parts, coating requirements, and production needs.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Button
                      onClick={() => handleStartChat()}
                      className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold gap-2"
                    >
                      <MessageSquare className="h-4 w-4" />
                      Start project assessment
                    </Button>
                    <Button asChild variant="outline" className="gap-2">
                      <Link to="/quote">
                        <FileText className="h-4 w-4" />
                        Talk to an engineer
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="gap-2"
                      onClick={() => handleStartChat("I'd like to share part drawings for a robotic painting feasibility assessment.")}
                    >
                      <Upload className="h-4 w-4" />
                      Upload part drawings
                    </Button>
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* Project References */}
          <section id="project-references" className="py-14 md:py-18 border-t border-border">
            <div className="container-wide">
              <FadeIn>
                <div className="mb-8">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">{t.home.sectionReference}</p>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">{t.home.projectReferences}</h2>
                  <div className="h-px w-12 bg-accent/50" />
                </div>
              </FadeIn>
              <FadeIn delay={0.2} className="text-center">
                <Button asChild variant="outline">
                  <Link to="/case-studies" className="flex items-center gap-2">
                    {t.home.viewCaseStudies}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </FadeIn>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="py-14 md:py-18 border-t border-border bg-muted/30">
            <div className="container-wide">
              <FadeIn>
                <div className="mb-10">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">Common questions</p>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">Frequently asked questions</h2>
                  <div className="h-px w-12 bg-accent/50" />
                </div>
              </FadeIn>
              <div className="max-w-3xl space-y-2">
                {homepageFAQs.map((faq, i) => (
                  <FadeIn key={i} delay={i * 0.08}>
                    <div className="border border-border rounded-xl bg-card overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between p-4 text-left"
                      >
                        <h3 className="text-sm font-semibold pr-4">{faq.question}</h3>
                        <ChevronRight className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-90' : ''}`} />
                      </button>
                      {openFaq === i && (
                        <div className="px-4 pb-4">
                          <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
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
