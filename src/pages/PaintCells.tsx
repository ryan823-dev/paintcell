import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { 
  ChevronRight, 
  Cog, 
  Layers, 
  Wind, 
  Gauge, 
  Shield,
  Zap,
  RefreshCw,
  Settings
} from "lucide-react";
import heroPaintCells from "@/assets/hero-paint-cells.jpg";

const systemComponents = [
  {
    icon: Cog,
    title: "Industrial Robot",
    description: "6-axis articulated robots from leading manufacturers, optimized for spray painting applications.",
    specs: [
      "Extended reach configurations (2-3.5m)",
      "Explosion-proof variants available",
      "Integrated wrist-mounted spray equipment",
      "Hollow wrist design for cable routing",
    ],
  },
  {
    icon: Layers,
    title: "Spray Equipment",
    description: "Complete fluid handling systems matched to your paint type and application requirements.",
    specs: [
      "Electrostatic and conventional spray options",
      "Automatic gun cleaning and purge systems",
      "Multi-color systems with fast changeover",
      "Precision flow and pressure control",
    ],
  },
  {
    icon: Wind,
    title: "Paint Booth & Ventilation",
    description: "Purpose-built spray environments meeting safety and environmental standards.",
    specs: [
      "Downdraft and crossdraft configurations",
      "Explosion-proof electrical design",
      "Integrated fire suppression",
      "Efficient filter and exhaust systems",
    ],
  },
  {
    icon: Gauge,
    title: "Process Controls",
    description: "Advanced control systems for consistent paint parameters and full traceability.",
    specs: [
      "Touch-screen HMI with recipe management",
      "Real-time process monitoring",
      "Data logging and quality reporting",
      "Integration with plant MES/ERP",
    ],
  },
];

const automationLevels = [
  {
    level: "Semi-Automatic",
    description: "Operator loads and unloads parts manually while robot executes painting cycle.",
    features: ["Manual part loading", "Automatic spray cycle", "Operator supervision required"],
  },
  {
    level: "Fully Automatic",
    description: "Integrated material handling for continuous operation with minimal intervention.",
    features: ["Conveyor integration", "Automatic part tracking", "Unattended operation capable"],
  },
  {
    level: "Phased Automation",
    description: "Start semi-automatic with infrastructure designed for future automation upgrades.",
    features: ["Modular cell design", "Pre-wired for automation", "Scalable capacity"],
  },
];

const keyFeatures = [
  {
    icon: Shield,
    title: "Safety & Compliance",
    description: "Designed to meet CE, UL/NFPA, and ATEX requirements. Integrated safety systems include area scanners, light curtains, and emergency stops.",
  },
  {
    icon: Zap,
    title: "Rapid Deployment",
    description: "Pre-engineered cell designs reduce lead time. Factory acceptance testing ensures systems arrive ready for installation.",
  },
  {
    icon: RefreshCw,
    title: "Flexible Configuration",
    description: "Modular architecture supports part variety, color changes, and production mix. Quick-change tooling minimizes changeover time.",
  },
  {
    icon: Settings,
    title: "Service & Support",
    description: "Remote diagnostics, preventive maintenance programs, and rapid spare parts availability keep your system running.",
  },
];

export default function PaintCells() {
  return (
    <>
      {/* Header */}
      <section className="relative h-[300px] md:h-[400px] overflow-hidden">
        <motion.img 
          src={heroPaintCells}
          alt="Complete robotic spray painting workstation cell" 
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60" />
        <div className="container-wide relative h-full flex items-center">
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Paint Cell Solutions
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Integrated robotic spray painting workstations engineered for your production environment. 
              Every component designed to work together for optimal paint finish quality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* System Components */}
      <Section variant="default">
        <FadeIn>
          <SectionHeader
            title="System Architecture"
            description="Four core subsystems engineered to work as one integrated solution."
          />
        </FadeIn>
        <StaggerContainer className="grid md:grid-cols-2 gap-6">
          {systemComponents.map((component) => (
            <StaggerItem key={component.title}>
              <motion.div
                className="bg-card rounded-xl border border-border p-6 h-full"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <component.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{component.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{component.description}</p>
                  </div>
                </div>
                <ul className="space-y-2 pl-16">
                  {component.specs.map((spec, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* Automation Levels */}
      <Section variant="muted">
        <FadeIn>
          <SectionHeader
            title="Automation Levels"
            description="Choose the right level of automation for your current needs with a path to scale."
          />
        </FadeIn>
        <StaggerContainer className="grid md:grid-cols-3 gap-6">
          {automationLevels.map((level) => (
            <StaggerItem key={level.level}>
              <motion.div
                className="bg-card rounded-xl border border-border p-6 h-full"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">{level.level}</h3>
                <p className="text-sm text-muted-foreground mb-4">{level.description}</p>
                <ul className="space-y-2">
                  {level.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* Key Features */}
      <Section variant="default">
        <FadeIn>
          <SectionHeader
            title="Why PaintCell?"
            description="Engineered advantages that set our solutions apart."
          />
        </FadeIn>
        <StaggerContainer className="grid md:grid-cols-2 gap-6">
          {keyFeatures.map((feature) => (
            <StaggerItem key={feature.title}>
              <motion.div 
                className="flex gap-4"
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* CTA */}
      <Section variant="primary">
        <FadeIn className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Configure Your Solution?
          </h2>
          <p className="text-primary-foreground/80 mb-6">
            Our step-by-step configurator captures your requirements and helps our engineering 
            team prepare a tailored proposal for your application.
          </p>
          <Button 
            asChild 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold transition-transform hover:scale-105"
          >
            <Link to="/quote" className="flex items-center gap-2">
              Start Assessment
              <ChevronRight className="h-5 w-5" />
            </Link>
          </Button>
        </FadeIn>
      </Section>
    </>
  );
}
