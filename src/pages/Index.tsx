import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import heroImage from "@/assets/hero-coating-cell.jpg";
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
    description: "Achieve repeatable, high-quality finishes with robotic precision that eliminates human variability.",
  },
  {
    icon: Zap,
    title: "Increased Throughput",
    description: "Maximize production capacity with faster cycle times and continuous operation capabilities.",
  },
  {
    icon: Users,
    title: "Labor Reduction",
    description: "Reduce dependency on skilled manual painters and reallocate workforce to higher-value tasks.",
  },
  {
    icon: Shield,
    title: "Safety & Compliance",
    description: "Protect workers from hazardous environments while meeting stringent regulatory requirements.",
  },
];

const systemComponents = [
  {
    icon: Cog,
    title: "Industrial Robot",
    description: "6-axis articulated robot optimized for coating applications with extended reach and payload.",
  },
  {
    icon: Box,
    title: "Spray Equipment",
    description: "Integrated spray guns, pumps, and fluid handling systems for precise material delivery.",
  },
  {
    icon: Settings,
    title: "Enclosure & Ventilation",
    description: "Purpose-built spray booth with exhaust systems meeting safety and environmental standards.",
  },
  {
    icon: Gauge,
    title: "Process Controls",
    description: "Advanced HMI and recipe management for consistent coating parameters and traceability.",
  },
];

export default function Index() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Robotic spray coating workstation" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-gradient opacity-85" />
        </div>
        <div className="container-wide relative py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Robotic Spray Coating
              <span className="block text-primary-foreground/80">Workstations</span>
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8 leading-relaxed max-w-2xl">
              Transform your coating operations with industrial automation. 
              Engineered for quality consistency, throughput, and operational excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg h-14 px-8"
              >
                <Link to="/quote" className="flex items-center gap-2">
                  Configure Your Workstation
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 h-14 px-8"
              >
                <Link to="/coating-cells">
                  Explore Solutions
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <Section variant="default">
        <SectionHeader
          title="Why Robotic Coating?"
          description="Industrial automation delivers measurable improvements across quality, efficiency, and safety."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-card rounded-xl p-6 border border-border card-elevated"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* System Overview Section */}
      <Section variant="muted">
        <SectionHeader
          title="Complete Coating Cell Solution"
          description="Every component engineered to work together for optimal coating performance."
        />
        <div className="grid md:grid-cols-2 gap-6">
          {systemComponents.map((component) => (
            <div
              key={component.title}
              className="bg-card rounded-xl p-6 border border-border flex gap-4"
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <component.icon className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{component.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{component.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/coating-cells">
              Learn More About Our Solutions
            </Link>
          </Button>
        </div>
      </Section>

      {/* CTA Section */}
      <Section variant="primary">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Automate Your Coating Process?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8">
            Our guided configurator helps you define your requirements in minutes. 
            Get a tailored solution proposal based on your specific needs.
          </p>
          <Button 
            asChild 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg h-14 px-8"
          >
            <Link to="/quote" className="flex items-center gap-2">
              Start Configuration
              <ChevronRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
