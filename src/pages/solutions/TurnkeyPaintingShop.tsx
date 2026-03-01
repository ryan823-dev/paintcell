import { Helmet } from "react-helmet-async";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import {
  Factory, CheckCircle2, ArrowRight, Building2, Car, Cog, 
  Layers, Users, Shield, FileText, ChevronRight
} from "lucide-react";

const DOMAIN = "https://tdpaintcell.com";

const shopTypes = [
  {
    icon: Car,
    title: "Automotive Body Painting Shops",
    titleZh: "汽车车身涂装车间",
    description: "Complete painting lines for passenger vehicles, trucks, and commercial vehicles. From pre-treatment to final coating with full process integration.",
    features: ["E-coat / Cathodic electrodeposition", "Primer, base coat, clear coat lines", "Automated conveyor systems", "Quality inspection integration"],
  },
  {
    icon: Building2,
    title: "Parts Painting Facilities",
    titleZh: "零部件涂装车间",
    description: "High-volume painting lines for automotive components including bumpers, mirrors, interior trim, and exterior accessories.",
    features: ["Multi-color capability", "Quick color change systems", "Robotic spray cells", "Curing & drying ovens"],
  },
  {
    icon: Factory,
    title: "Industrial Coating Plants",
    titleZh: "工业产品涂装车间",
    description: "Complete coating facilities for construction machinery, agricultural equipment, and heavy industrial products.",
    features: ["Large-part handling", "Heavy-duty conveyors", "Corrosion protection systems", "High-build coating lines"],
  },
];

const deliveryPhases = [
  { phase: "1", title: "Concept & Feasibility", description: "Requirements analysis, capacity planning, layout concepts, ROI assessment" },
  { phase: "2", title: "Basic Engineering", description: "Process flow design, equipment specification, utility requirements, preliminary layout" },
  { phase: "3", title: "Detail Engineering", description: "Detailed drawings, equipment procurement, control system design, safety analysis" },
  { phase: "4", title: "Manufacturing", description: "Equipment fabrication, pre-assembly testing, quality verification, shipping preparation" },
  { phase: "5", title: "Installation", description: "On-site installation, utility connections, system integration, safety implementation" },
  { phase: "6", title: "Commissioning", description: "Process validation, quality testing, operator training, production ramp-up support" },
];

const capabilities = [
  "Turnkey project delivery from concept to production",
  "Complete process design for multi-stage coating lines",
  "Integration of pre-treatment, coating, and curing systems",
  "Robot selection and spray cell configuration",
  "Paint supply and color change system design",
  "Environmental and safety compliance engineering",
  "Production line balancing and throughput optimization",
  "Operator training and production startup support",
];

export default function TurnkeyPaintingShop() {
  return (
    <>
      <Helmet>
        <title>Turnkey Painting Shops | Complete Automotive & Industrial Coating Lines | TD Painting Systems</title>
        <meta name="description" content="Complete turnkey painting shop solutions for automotive body coating, parts painting, and industrial finishing. From concept design to production commissioning - full project delivery." />
        <link rel="canonical" href={`${DOMAIN}/solutions/turnkey-painting-shop`} />
      </Helmet>

      <div className="bg-background">
        {/* Hero */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="container-wide">
            <FadeIn>
              <div className="max-w-4xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Factory className="h-5 w-5 text-accent" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
                    Turnkey Solutions
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                  Complete Painting Shop Solutions
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-6">
                  Full-scope turnkey delivery of automotive body painting lines, parts coating facilities, and industrial finishing plants. From initial concept through production commissioning.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg" className="rounded-xl">
                    <Link to="/quote">
                      <FileText className="h-4 w-4 mr-2" />
                      Request Consultation
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-xl">
                    <Link to="/case-studies">
                      View Project References
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Shop Types */}
        <section className="py-16 md:py-20 border-b border-border">
          <div className="container-wide">
            <FadeIn>
              <div className="mb-12">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">
                  Application Areas
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                  Painting Shop Types
                </h2>
                <div className="h-px w-12 bg-accent/50" />
              </div>
            </FadeIn>
            <StaggerContainer className="grid md:grid-cols-3 gap-6">
              {shopTypes.map((shop) => (
                <StaggerItem key={shop.title}>
                  <div className="rounded-xl border border-border bg-card p-6 h-full hover:border-accent/30 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                      <shop.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{shop.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{shop.description}</p>
                    <ul className="space-y-2">
                      {shop.features.map((feature) => (
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

        {/* Project Delivery Process */}
        <section className="py-16 md:py-20 border-b border-border bg-muted/30">
          <div className="container-wide">
            <FadeIn>
              <div className="mb-12">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">
                  Project Lifecycle
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                  Turnkey Delivery Process
                </h2>
                <div className="h-px w-12 bg-accent/50" />
              </div>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {deliveryPhases.map((item, index) => (
                <FadeIn key={item.phase} delay={index * 0.08}>
                  <div className="rounded-xl border border-border bg-card p-5 h-full">
                    <span className="text-2xl font-bold text-accent/60 mb-2 block">{item.phase}</span>
                    <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-16 md:py-20 border-b border-border">
          <div className="container-wide">
            <FadeIn>
              <div className="mb-12">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">
                  Engineering Scope
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                  Our Capabilities
                </h2>
                <div className="h-px w-12 bg-accent/50" />
              </div>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 max-w-4xl">
              {capabilities.map((capability, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="flex items-start gap-3 py-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground leading-relaxed">{capability}</p>
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
                { title: "Robotic Workstations", href: "/paint-cells", description: "Integrated painting cells" },
                { title: "Paint Supply Systems", href: "/solutions/paint-supply-systems", description: "Centralized supply & mixing" },
                { title: "Technical Services", href: "/services", description: "Engineering & support" },
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
                  Start Your Painting Shop Project
                </h2>
                <p className="text-sm text-white/60 mb-8">
                  Share your project requirements for a preliminary feasibility assessment and concept proposal.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button asChild size="lg" className="rounded-xl bg-accent hover:bg-accent/90">
                    <Link to="/quote">
                      Request Project Consultation
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
