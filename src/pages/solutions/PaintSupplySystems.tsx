import { Helmet } from "react-helmet-async";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import {
  Droplets, CheckCircle2, ArrowRight, Palette, Gauge, Settings,
  RefreshCw, Shield, FileText, ChevronRight
} from "lucide-react";

const DOMAIN = "https://tdpaintcell.com";

const systemTypes = [
  {
    icon: Droplets,
    title: "Centralized Paint Supply",
    titleZh: "集中供漆系统",
    description: "High-capacity paint supply systems for production lines with multiple spray stations. Automated pressure regulation and flow control.",
    features: ["Multi-station supply", "Pressure regulation", "Level monitoring", "Automated refill"],
  },
  {
    icon: Palette,
    title: "Color Change Systems",
    titleZh: "换色系统",
    description: "Fast color change manifolds and valve blocks for multi-color production. Minimize paint waste and changeover time.",
    features: ["Quick-change valves", "Solvent flush systems", "Color sequence logic", "Waste minimization"],
  },
  {
    icon: RefreshCw,
    title: "Paint Mixing & Conditioning",
    titleZh: "调漆房设备",
    description: "Automated mixing rooms with agitation, temperature control, and viscosity management for consistent paint quality.",
    features: ["Automated agitation", "Temperature control", "Viscosity monitoring", "Recipe management"],
  },
];

const components = [
  { name: "Supply Pumps", description: "Diaphragm and piston pumps for various viscosities" },
  { name: "Pressure Regulators", description: "Precision pressure control for spray stability" },
  { name: "Color Change Valves", description: "Fast-acting valves for multi-color systems" },
  { name: "Paint Heaters", description: "Inline heating for viscosity control" },
  { name: "Filters & Strainers", description: "Contamination removal for finish quality" },
  { name: "Flow Meters", description: "Material monitoring and usage tracking" },
  { name: "Level Sensors", description: "Tank monitoring and refill alerts" },
  { name: "Control Panels", description: "PLC-based system automation" },
];

const benefits = [
  "Consistent paint delivery to all spray stations",
  "Reduced color change time by up to 60%",
  "Minimized paint waste during changeovers",
  "Stable viscosity and temperature control",
  "Automated monitoring and alarm systems",
  "Integration with robot controllers",
];

export default function PaintSupplySystems() {
  return (
    <>
      <Helmet>
        <title>Paint Supply Systems | Centralized Supply & Color Change | TD Painting Systems</title>
        <meta name="description" content="Comprehensive paint supply systems including centralized supply, color change manifolds, and mixing room equipment. Optimized for automotive and industrial coating applications." />
        <link rel="canonical" href={`${DOMAIN}/solutions/paint-supply-systems`} />
      </Helmet>

      <div className="bg-background">
        {/* Hero */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="container-wide">
            <FadeIn>
              <div className="max-w-4xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Droplets className="h-5 w-5 text-accent" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
                    Paint Supply
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                  Paint Supply Systems
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-3xl">
                  Comprehensive paint supply, color change, and mixing systems engineered for consistent material delivery and efficient color changeovers in automotive and industrial coating applications.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg" className="rounded-xl">
                    <Link to="/quote">
                      <FileText className="h-4 w-4 mr-2" />
                      Request Specification
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-xl">
                    <Link to="/products">
                      Browse Equipment
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* System Types */}
        <section className="py-16 md:py-20 border-b border-border">
          <div className="container-wide">
            <FadeIn>
              <div className="mb-12">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">
                  System Categories
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                  Paint Supply Solutions
                </h2>
                <div className="h-px w-12 bg-accent/50" />
              </div>
            </FadeIn>
            <StaggerContainer className="grid md:grid-cols-3 gap-6">
              {systemTypes.map((system) => (
                <StaggerItem key={system.title}>
                  <div className="rounded-xl border border-border bg-card p-6 h-full hover:border-accent/30 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                      <system.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{system.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{system.description}</p>
                    <ul className="space-y-2">
                      {system.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Key Components */}
        <section className="py-16 md:py-20 border-b border-border bg-muted/30">
          <div className="container-wide">
            <FadeIn>
              <div className="mb-12">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">
                  Equipment
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                  Key Components
                </h2>
                <div className="h-px w-12 bg-accent/50" />
              </div>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {components.map((item, index) => (
                <FadeIn key={item.name} delay={index * 0.05}>
                  <div className="rounded-xl border border-border bg-card p-4 h-full">
                    <h3 className="text-sm font-semibold mb-1">{item.name}</h3>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 md:py-20 border-b border-border">
          <div className="container-wide">
            <FadeIn>
              <div className="mb-12">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">
                  Advantages
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                  System Benefits
                </h2>
                <div className="h-px w-12 bg-accent/50" />
              </div>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 max-w-4xl">
              {benefits.map((benefit, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="flex items-start gap-3 py-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground leading-relaxed">{benefit}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Related Solutions */}
        <section className="py-16 md:py-20 border-b border-border">
          <div className="container-wide">
            <FadeIn>
              <div className="mb-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">
                  Related Solutions
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                  Explore More
                </h2>
                <div className="h-px w-12 bg-accent/50" />
              </div>
            </FadeIn>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { title: "Turnkey Painting Shops", href: "/solutions/turnkey-painting-shop", description: "Complete shop solutions" },
                { title: "Robotic Workstations", href: "/paint-cells", description: "Integrated painting cells" },
                { title: "Spray Equipment", href: "/products", description: "Guns, bells & pumps" },
              ].map((item) => (
                <FadeIn key={item.href}>
                  <Link
                    to={item.href}
                    className="group block rounded-xl border border-border bg-card p-5 hover:border-accent/30 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0" />
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 section-dark relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-accent/[0.08] blur-[100px]" />
          </div>
          <div className="container-wide relative">
            <FadeIn>
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4 text-white">
                  Optimize Your Paint Supply
                </h2>
                <p className="text-sm text-white/60 mb-8">
                  Contact us for paint supply system specifications tailored to your production requirements.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button asChild size="lg" className="rounded-xl bg-accent hover:bg-accent/90">
                    <Link to="/quote">
                      Request System Specification
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
