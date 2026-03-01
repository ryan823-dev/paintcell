import { Helmet } from "react-helmet-async";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import {
  Users, Wrench, FileText, Settings, GraduationCap, Headphones,
  CheckCircle2, ChevronRight, ArrowRight
} from "lucide-react";

const DOMAIN = "https://tdpaintcell.com";

const serviceCategories = [
  {
    icon: FileText,
    title: "Solution Design",
    titleZh: "方案设计",
    description: "Complete engineering design services from concept through detailed engineering. Layout planning, process flow design, equipment specification.",
    href: "/services/solution-design",
    features: ["Concept development", "Process engineering", "Equipment specification", "Layout optimization"],
  },
  {
    icon: Settings,
    title: "Project Management",
    titleZh: "项目管理",
    description: "End-to-end project delivery management including procurement coordination, installation oversight, and timeline management.",
    href: "/services/project-management",
    features: ["Schedule management", "Vendor coordination", "Risk mitigation", "Quality control"],
  },
  {
    icon: Wrench,
    title: "Commissioning",
    titleZh: "工艺调试",
    description: "Process optimization, robot path programming, spray parameter tuning, and production validation for new and existing systems.",
    href: "/services/commissioning",
    features: ["Robot programming", "Spray optimization", "Quality validation", "Production ramp-up"],
  },
  {
    icon: Headphones,
    title: "Maintenance & Support",
    titleZh: "维修维护",
    description: "Preventive maintenance programs, emergency repair services, and remote technical support for ongoing operations.",
    href: "/services/maintenance",
    features: ["Preventive programs", "Emergency repair", "Remote support", "Parts supply"],
  },
  {
    icon: GraduationCap,
    title: "Training",
    titleZh: "培训服务",
    description: "Operator training, technician certification, and knowledge transfer programs for your painting operations team.",
    href: "/services/training",
    features: ["Operator training", "Technician programs", "Safety certification", "Process education"],
  },
  {
    icon: Users,
    title: "Engineering Consulting",
    titleZh: "工程咨询",
    description: "Expert consulting for capacity planning, process improvement, quality troubleshooting, and technology upgrades.",
    href: "/services/consulting",
    features: ["Process audits", "Capacity planning", "Quality analysis", "Technology assessment"],
  },
];

const serviceProcess = [
  { step: "1", title: "Initial Consultation", description: "Discuss your requirements and objectives" },
  { step: "2", title: "Scope Definition", description: "Define deliverables and timeline" },
  { step: "3", title: "Proposal", description: "Receive detailed service proposal" },
  { step: "4", title: "Execution", description: "Service delivery with regular updates" },
  { step: "5", title: "Handover", description: "Documentation and knowledge transfer" },
];

export default function ServicesIndex() {
  return (
    <>
      <Helmet>
        <title>Technical Services | Engineering, Commissioning & Maintenance | TD Painting Systems</title>
        <meta name="description" content="Comprehensive technical services for industrial coating systems: solution design, project management, commissioning, maintenance, and training. Expert support for your painting operations." />
        <link rel="canonical" href={`${DOMAIN}/services`} />
      </Helmet>

      <div className="bg-background">
        {/* Hero */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="container-wide">
            <FadeIn>
              <div className="max-w-4xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-accent" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
                    Technical Services
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                  Engineering & Support Services
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-3xl">
                  Comprehensive technical services from solution design through ongoing support. Our engineering team delivers expertise across the full lifecycle of your coating operations.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg" className="rounded-xl">
                    <Link to="/quote">
                      <FileText className="h-4 w-4 mr-2" />
                      Request Service Quote
                    </Link>
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Service Categories */}
        <section className="py-16 md:py-20 border-b border-border">
          <div className="container-wide">
            <FadeIn>
              <div className="mb-12">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">
                  Our Services
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                  Service Categories
                </h2>
                <div className="h-px w-12 bg-accent/50" />
              </div>
            </FadeIn>
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceCategories.map((service) => (
                <StaggerItem key={service.title}>
                  <Link
                    to={service.href}
                    className="group block rounded-xl border border-border bg-card p-6 h-full hover:border-accent/30 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <service.icon className="h-6 w-6 text-accent" />
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                    
                    <ul className="space-y-1.5">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="h-3 w-3 text-accent shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Service Process */}
        <section className="py-16 md:py-20 border-b border-border bg-muted/30">
          <div className="container-wide">
            <FadeIn>
              <div className="mb-12">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">
                  How We Work
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                  Service Process
                </h2>
                <div className="h-px w-12 bg-accent/50" />
              </div>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {serviceProcess.map((item, index) => (
                <FadeIn key={item.step} delay={index * 0.1}>
                  <div className="rounded-xl border border-border bg-card p-5 h-full text-center">
                    <span className="text-2xl font-bold text-accent/60 mb-2 block">{item.step}</span>
                    <h3 className="text-sm font-semibold mb-1">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 md:py-20 border-b border-border">
          <div className="container-wide">
            <FadeIn>
              <div className="mb-12">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">
                  Why TD
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                  Service Advantages
                </h2>
                <div className="h-px w-12 bg-accent/50" />
              </div>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 max-w-4xl">
              {[
                "25+ years of industrial coating experience",
                "500+ systems commissioned globally",
                "Multi-brand equipment expertise",
                "Rapid response and flexible engagement",
                "Knowledge transfer and documentation",
                "Long-term partnership approach",
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="flex items-start gap-3 py-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
                  </div>
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
                  Need Technical Support?
                </h2>
                <p className="text-sm text-white/60 mb-8">
                  Contact us to discuss your service requirements. We provide customized support tailored to your operations.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button asChild size="lg" className="rounded-xl bg-accent hover:bg-accent/90">
                    <Link to="/quote">
                      Request Service Quote
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
