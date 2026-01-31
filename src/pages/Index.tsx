import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import heroImage from "@/assets/hero-paint-cell.jpg";
import { 
  ChevronRight, 
  Target, 
  Zap, 
  Shield,
  Users,
  Cog,
  Box,
  Settings,
  Gauge
} from "lucide-react";

const benefits = [
  {
    icon: Target,
    title: "Quality Consistency",
    description: "Achieve repeatable, high-quality paint finishes with robotic precision that eliminates human variability.",
    constraint: "Depends on part geometry and surface preparation.",
  },
  {
    icon: Zap,
    title: "Increased Throughput",
    description: "Maximize production capacity with faster cycle times and continuous operation capabilities.",
    constraint: "Varies by part complexity and color change frequency.",
  },
  {
    icon: Users,
    title: "Labor Reduction",
    description: "Reduce dependency on skilled manual painters and reallocate workforce to higher-value tasks.",
  },
  {
    icon: Shield,
    title: "Safety & Compliance",
    description: "Protect workers from hazardous paint fumes and overspray while meeting stringent regulatory requirements.",
    constraint: "Subject to local ATEX/ventilation codes.",
  },
];

const systemComponents = [
  {
    icon: Cog,
    title: "Industrial Robot",
    description: "6-axis articulated robot optimized for spray painting applications with extended reach and payload.",
  },
  {
    icon: Box,
    title: "Spray Equipment",
    description: "Integrated spray guns, pumps, and fluid handling systems for precise paint delivery.",
  },
  {
    icon: Settings,
    title: "Paint Booth & Ventilation",
    description: "Purpose-built spray booth with exhaust systems meeting safety and environmental standards.",
  },
  {
    icon: Gauge,
    title: "Process Controls",
    description: "Advanced HMI and recipe management for consistent paint parameters and traceability.",
  },
];

interface Benefit {
  icon: typeof Target;
  title: string;
  description: string;
  constraint?: string;
}

export default function Index() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.img 
            src={heroImage} 
            alt="Robotic spray coating workstation" 
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          <div className="absolute inset-0 hero-gradient opacity-85" />
        </div>
        <div className="container-wide relative py-20 md:py-32">
          <div className="max-w-3xl">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Robotic Spray Painting
              <span className="block text-primary-foreground/80">Workstations</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-primary-foreground/80 mb-8 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Transform your paint operations with industrial automation. 
              Engineered for quality consistency, throughput, and operational excellence.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button 
                asChild 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg h-14 px-8 transition-transform hover:scale-105"
              >
                <Link to="/quote" className="flex items-center gap-2">
                  Configure Paint Cell
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-white/40 bg-white/10 text-white hover:bg-white/20 h-14 px-8 transition-transform hover:scale-105"
              >
                <Link to="/paint-cells">
                  Explore Solutions
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <Section variant="default">
        <FadeIn>
          <SectionHeader
            title="Why Robotic Painting?"
            description="Industrial automation delivers measurable improvements across quality, efficiency, and safety."
          />
        </FadeIn>
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit: Benefit) => (
            <StaggerItem key={benefit.title}>
              <motion.div
                className="bg-card rounded-xl p-6 border border-border card-elevated h-full flex flex-col"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">{benefit.description}</p>
                {benefit.constraint && (
                  <p className="text-xs text-muted-foreground/60 mt-3 pt-3 border-t border-border italic">
                    {benefit.constraint}
                  </p>
                )}
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* System Overview Section */}
      <Section variant="muted">
        <FadeIn>
          <SectionHeader
            title="Complete Paint Cell Solution"
            description="Every component engineered to work together for optimal paint finish quality."
          />
        </FadeIn>
        <StaggerContainer className="grid md:grid-cols-2 gap-6">
          {systemComponents.map((component) => (
            <StaggerItem key={component.title}>
              <motion.div
                className="bg-card rounded-xl p-6 border border-border flex gap-4 h-full"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <component.icon className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{component.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{component.description}</p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <FadeIn delay={0.4} className="mt-10 text-center">
          <Button asChild variant="outline" size="lg" className="transition-transform hover:scale-105">
            <Link to="/paint-cells">
              Learn More About Our Solutions
            </Link>
          </Button>
        </FadeIn>
      </Section>

      {/* CTA Section */}
      <Section variant="primary">
        <FadeIn className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Automate Your Paint Process?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8">
            Our guided configurator helps you define your requirements in minutes. 
            Get a tailored solution proposal based on your specific needs.
          </p>
          <Button 
            asChild 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg h-14 px-8 transition-transform hover:scale-105"
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
