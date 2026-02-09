import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { BenefitDetailModal, BenefitModalContent } from "@/components/home/BenefitDetailModal";
import { ProjectInterfacePanel } from "@/components/home/ProjectInterfacePanel";
import { ProjectEntryPoints } from "@/components/home/ProjectEntryPoints";
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
  const navigate = useNavigate();
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (benefit: Benefit) => {
    setSelectedBenefit(benefit);
    setIsModalOpen(true);
  };

  const handleStartConsultation = () => {
    setIsModalOpen(false);
    const assistantButton = document.querySelector('[data-assistant-trigger]') as HTMLButtonElement;
    if (assistantButton) {
      assistantButton.click();
    }
  };

  return <>
    {/* Three-zone engineering console — PRIMARY */}
    <ProjectInterfacePanel />

    {/* Project Entry Points — SECONDARY */}
    <ProjectEntryPoints />

    {/* Engineering Benefits */}
    <Section variant="default">
      <FadeIn>
        <SectionHeader title="Why Robotic Painting?" description="Industrial automation delivers measurable improvements across quality, efficiency, and safety." />
      </FadeIn>
      <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit: Benefit) => <StaggerItem key={benefit.title}>
          <div
            className="bg-card rounded-lg p-6 border border-border hover:border-primary/20 hover:shadow-md transition-all duration-200 h-full flex flex-col cursor-pointer"
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
            <div className="w-10 h-10 rounded-md bg-primary/8 flex items-center justify-center mb-4">
              <benefit.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-base font-semibold mb-2 text-foreground">{benefit.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed flex-1">{benefit.description}</p>
            <p className="text-xs text-muted-foreground/60 mt-3 pt-3 border-t border-border italic">
              {benefit.microLine}
            </p>
          </div>
        </StaggerItem>)}
      </StaggerContainer>
    </Section>

    {/* System Overview */}
    <Section variant="muted">
      <FadeIn>
        <SectionHeader title="Complete Paint Cell Solution" description="Every component engineered to work together for optimal paint finish quality." />
      </FadeIn>
      <StaggerContainer className="grid md:grid-cols-2 gap-6">
        {systemComponents.map(component => <StaggerItem key={component.title}>
          <div className="bg-card rounded-lg p-6 border border-border flex gap-4 h-full hover:border-primary/20 hover:shadow-md transition-all duration-200">
            <div className="w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center shrink-0">
              <component.icon className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="text-base font-semibold mb-2 text-foreground">{component.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{component.description}</p>
            </div>
          </div>
        </StaggerItem>)}
      </StaggerContainer>
      <FadeIn delay={0.4} className="mt-10 text-center">
        <Button asChild variant="outline" size="lg">
          <Link to="/paint-cells">
            Learn More About Our Solutions
          </Link>
        </Button>
      </FadeIn>
    </Section>

    {/* Case Studies */}
    <Section variant="default">
      <FadeIn>
        <SectionHeader title="Project References" description="Real robotic painting deployments across industries." />
      </FadeIn>
      <FadeIn delay={0.2} className="text-center">
        <Button asChild variant="outline" size="lg">
          <Link to="/case-studies" className="flex items-center gap-2">
            View Case Studies
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </FadeIn>
    </Section>

    {/* Benefit Detail Modal */}
    <BenefitDetailModal open={isModalOpen} onOpenChange={setIsModalOpen} content={selectedBenefit?.modalContent || null} onStartConsultation={handleStartConsultation} />
  </>;
}
