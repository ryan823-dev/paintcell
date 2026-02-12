import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { BenefitDetailModal, BenefitModalContent } from "@/components/home/BenefitDetailModal";
import { ProjectInterfacePanel } from "@/components/home/ProjectInterfacePanel";
import { HomeSidebar } from "@/components/home/HomeSidebar";
import { InlineChatPanel } from "@/components/home/InlineChatPanel";
import { ChevronRight, Target, Zap, Shield, Users, Cog, Box, Settings, Gauge } from "lucide-react";
import { useI18n } from "@/i18n";

interface Benefit {
  icon: typeof Target;
  title: string;
  description: string;
  microLine: string;
  modalContent: BenefitModalContent;
}

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

  return (
    <div className="bg-background flex">
      <HomeSidebar activeItem={activeSection} onItemClick={handleSidebarClick} />

      <div className="flex-1 min-w-0">
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

        {/* Engineering Benefits */}
        <section id="why-robotic-painting" className="py-16 md:py-20 border-t border-border">
          <div className="container-wide">
            <FadeIn>
              <div className="mb-10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">{t.home.sectionRationale}</p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">{t.home.whyRoboticPainting}</h2>
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

        {/* System Overview */}
        <section id="system-overview" className="py-16 md:py-20 border-t border-border bg-muted/30">
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

        {/* Case Studies */}
        <section id="project-references" className="py-16 md:py-20 border-t border-border">
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

        <BenefitDetailModal open={isModalOpen} onOpenChange={setIsModalOpen} content={selectedBenefit?.modalContent || null} onStartConsultation={handleStartConsultation} />
      </div>
    </div>
  );
}
