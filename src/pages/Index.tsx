import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { BenefitDetailModal, BenefitModalContent } from "@/components/home/BenefitDetailModal";
import { ProjectInterfacePanel } from "@/components/home/ProjectInterfacePanel";
import { ChevronRight, Target, Zap, Shield, Users, Cog, Box, Settings, Gauge } from "lucide-react";

const benefits = [{
  icon: Target,
  title: "Quality Consistency",
  description: "Achieve repeatable, high-quality paint finishes with robotic precision that eliminates human variability.",
  microLine: "Driven by part presentation and path repeatability.",
  modalContent: {
    title: "Quality Consistency",
    engineeringAnchor: "Repeatability depends on fixturing, path control, and paint stability.",
    typicalUseCase: "Tight appearance requirements, reduced rework, stable finish across shifts.",
    keyConstraints: "Part presentation/fixturing, spray distance & angle, edge coverage, paint viscosity/atomization, booth airflow & temperature.",
    whatWeNeedToAssess: "Part CAD or photos, finish spec (visual vs functional), target film build range, acceptable touch-up level, current defect/rework drivers."
  }
}, {
  icon: Zap,
  title: "Increased Throughput",
  description: "Maximize production capacity with faster cycle times and continuous operation capabilities.",
  microLine: "Takt time and changeover define real capacity.",
  modalContent: {
    title: "Increased Throughput",
    engineeringAnchor: "True capacity is limited by takt, changeovers, and handling time.",
    typicalUseCase: "Increase line output, stabilize cycle time, enable longer unattended operation.",
    keyConstraints: "Robot path length vs takt time, loading/unloading method, curing/dry time, color change & cleaning time, buffer/conveyor logic.",
    whatWeNeedToAssess: "Required parts/hour (or takt), shift pattern, batch size & changeover frequency, current bottleneck step, handling/conveyor constraints."
  }
}, {
  icon: Users,
  title: "Labor Reduction",
  description: "Reduce dependency on skilled manual painters and reallocate workforce to higher-value tasks.",
  microLine: "Automation boundary determines operator workload.",
  modalContent: {
    title: "Labor Reduction",
    engineeringAnchor: "Labor savings come from a clear automation boundary.",
    typicalUseCase: "Reduce dependency on skilled painters, shift labor to prep/QA, improve staffing stability.",
    keyConstraints: "Masking/prep workload, manual touch-up expectations, paint mixing/refill routine, maintenance & daily checks, inspection and rework loop.",
    whatWeNeedToAssess: "Which tasks must remain manual, acceptable manual touch-up %, paint supply method, operator skill availability, current staffing pain points."
  }
}, {
  icon: Shield,
  title: "Safety & Compliance",
  description: "Protect workers from hazardous paint fumes and overspray while meeting stringent regulatory requirements.",
  microLine: "Ventilation and site constraints set the baseline.",
  modalContent: {
    title: "Safety & Compliance",
    engineeringAnchor: "Compliance is defined by ventilation, fire risk, and site conditions.",
    typicalUseCase: "Reduce exposure to fumes/overspray, standardize safety controls, meet plant and local compliance requirements.",
    keyConstraints: "Booth ventilation & airflow, VOC/solvent handling, grounding & static control, fire suppression, hazardous area classification (if applicable).",
    whatWeNeedToAssess: "Paint type (liquid), booth/room dimensions, ventilation/exhaust capacity, plant safety standards required (e.g., NFPA/ATEX where relevant), waste handling constraints."
  }
}];

const systemComponents = [{
  icon: Cog,
  title: "Industrial Robot",
  description: "6-axis articulated robot optimized for spray painting applications with extended reach and payload."
}, {
  icon: Box,
  title: "Spray Equipment",
  description: "Integrated spray guns, pumps, and fluid handling systems for precise paint delivery."
}, {
  icon: Settings,
  title: "Paint Booth & Ventilation",
  description: "Purpose-built spray booth with exhaust systems meeting safety and environmental standards."
}, {
  icon: Gauge,
  title: "Process Controls",
  description: "Advanced HMI and recipe management for consistent paint parameters and traceability."
}];

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

  const handleCardClick = (benefit: Benefit) => {
    setSelectedBenefit(benefit);
    setIsModalOpen(true);
  };

  const handleStartConsultation = () => {
    setIsModalOpen(false);
    const assistantButton = document.querySelector('[data-assistant-trigger]') as HTMLButtonElement;
    if (assistantButton) assistantButton.click();
  };

  return (
    <div className="bg-primary">
      {/* Control Interface — PRIMARY */}
      <ProjectInterfacePanel />

      {/* Engineering Benefits */}
      <section className="py-16 md:py-20 border-t border-primary-foreground/8">
        <div className="container-wide">
          <FadeIn>
            <div className="mb-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary-foreground/30 mb-2">Engineering Rationale</p>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-primary-foreground mb-2">Why Robotic Painting?</h2>
              <div className="h-px w-12 bg-accent/50" />
            </div>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {benefits.map((benefit: Benefit) => (
              <StaggerItem key={benefit.title}>
                <div
                  className="rounded-xl p-5 border border-primary-foreground/10 hover:border-accent/30 transition-all duration-200 h-full flex flex-col cursor-pointer bg-primary-foreground/5 group"
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
                  <h3 className="text-sm font-semibold mb-1.5 text-primary-foreground">{benefit.title}</h3>
                  <p className="text-primary-foreground/45 text-xs leading-relaxed flex-1">{benefit.description}</p>
                  <p className="text-[11px] text-primary-foreground/25 mt-3 pt-2.5 border-t border-primary-foreground/8 italic">
                    {benefit.microLine}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* System Overview */}
      <section className="py-16 md:py-20 border-t border-primary-foreground/8">
        <div className="container-wide">
          <FadeIn>
            <div className="mb-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary-foreground/30 mb-2">System Architecture</p>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-primary-foreground mb-2">Complete Paint Cell Solution</h2>
              <div className="h-px w-12 bg-accent/50" />
            </div>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-2 gap-3">
            {systemComponents.map(component => (
              <StaggerItem key={component.title}>
                <div className="rounded-xl p-5 border border-primary-foreground/10 flex gap-4 h-full hover:border-primary-foreground/20 transition-all duration-200 bg-primary-foreground/5">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <component.icon className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-1.5 text-primary-foreground">{component.title}</h3>
                    <p className="text-primary-foreground/45 text-xs leading-relaxed">{component.description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeIn delay={0.4} className="mt-8 text-center">
            <Button asChild variant="outline" className="border-primary-foreground/15 text-primary-foreground/60 hover:bg-primary-foreground/5 hover:text-primary-foreground">
              <Link to="/paint-cells">
                Explore solutions →
              </Link>
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 md:py-20 border-t border-primary-foreground/8">
        <div className="container-wide">
          <FadeIn>
            <div className="mb-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary-foreground/30 mb-2">Deployment Reference</p>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-primary-foreground mb-2">Project References</h2>
              <div className="h-px w-12 bg-accent/50" />
            </div>
          </FadeIn>
          <FadeIn delay={0.2} className="text-center">
            <Button asChild variant="outline" className="border-primary-foreground/15 text-primary-foreground/60 hover:bg-primary-foreground/5 hover:text-primary-foreground">
              <Link to="/case-studies" className="flex items-center gap-2">
                View Case Studies
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* Benefit Detail Modal */}
      <BenefitDetailModal open={isModalOpen} onOpenChange={setIsModalOpen} content={selectedBenefit?.modalContent || null} onStartConsultation={handleStartConsultation} />
    </div>
  );
}
