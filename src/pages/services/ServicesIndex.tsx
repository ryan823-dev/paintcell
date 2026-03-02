import { Helmet } from "react-helmet-async";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import {
  Users, Wrench, FileText, Settings, GraduationCap, Headphones,
  CheckCircle2, ChevronRight, ArrowRight
} from "lucide-react";
import { useI18n } from "@/i18n/context";

const DOMAIN = "https://tdpaintcell.com";

export default function ServicesIndex() {
  const { t } = useI18n();
  const page = t.servicesPage || {};
  const process = page.process || {};
  
  const serviceCategories = [
    { key: "solutionDesign", icon: FileText, href: "/services/solution-design" },
    { key: "projectManagement", icon: Settings, href: "/services/project-management" },
    { key: "commissioning", icon: Wrench, href: "/services/commissioning" },
    { key: "maintenance", icon: Headphones, href: "/services/maintenance" },
    { key: "training", icon: GraduationCap, href: "/services/training" },
    { key: "consulting", icon: Users, href: "/services/consulting" },
  ];
  
  const processSteps = [
    { step: "1", key: "step1" },
    { step: "2", key: "step2" },
    { step: "3", key: "step3" },
    { step: "4", key: "step4" },
    { step: "5", key: "step5" },
  ];

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
                    {page.badge || "Technical Services"}
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                  {page.heroTitle || "Engineering & Support Services"}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-3xl">
                  {page.heroSubtitle || "Comprehensive technical services from solution design through ongoing support. Our engineering team delivers expertise across the full lifecycle of your coating operations."}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg" className="rounded-xl">
                    <Link to="/quote">
                      <FileText className="h-4 w-4 mr-2" />
                      {page.requestQuote || "Request Service Quote"}
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
                  {page.categoriesLabel || "Our Services"}
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                  {page.categoriesTitle || "Service Categories"}
                </h2>
                <div className="h-px w-12 bg-accent/50" />
              </div>
            </FadeIn>
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceCategories.map((service) => {
                const serviceData = page[service.key] || {};
                const Icon = service.icon;
                return (
                  <StaggerItem key={service.key}>
                    <Link
                      to={service.href}
                      className="group block rounded-xl border border-border bg-card p-6 h-full hover:border-accent/30 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                          <Icon className="h-6 w-6 text-accent" />
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                      </div>
                      <h3 className="text-lg font-semibold mb-3">{serviceData.title || ""}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{serviceData.description || ""}</p>
                      
                      <ul className="space-y-1.5">
                        {(serviceData.features || []).map((feature: string) => (
                          <li key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CheckCircle2 className="h-3 w-3 text-accent shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </Link>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* Service Process */}
        <section className="py-16 md:py-20 border-b border-border bg-muted/30">
          <div className="container-wide">
            <FadeIn>
              <div className="mb-12">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">
                  {page.processLabel || "How We Work"}
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                  {page.processTitle || "Service Process"}
                </h2>
                <div className="h-px w-12 bg-accent/50" />
              </div>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {processSteps.map((item, index) => {
                const stepData = process[item.key] || {};
                return (
                  <FadeIn key={item.step} delay={index * 0.1}>
                    <div className="rounded-xl border border-border bg-card p-5 h-full text-center">
                      <span className="text-2xl font-bold text-accent/60 mb-2 block">{item.step}</span>
                      <h3 className="text-sm font-semibold mb-1">{stepData.title || ""}</h3>
                      <p className="text-xs text-muted-foreground">{stepData.description || ""}</p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 md:py-20 border-b border-border">
          <div className="container-wide">
            <FadeIn>
              <div className="mb-12">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">
                  {page.advantagesLabel || "Why TD"}
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                  {page.advantagesTitle || "Service Advantages"}
                </h2>
                <div className="h-px w-12 bg-accent/50" />
              </div>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 max-w-4xl">
              {(page.advantages || []).map((item: string, i: number) => (
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
                  {page.ctaTitle || "Need Technical Support?"}
                </h2>
                <p className="text-sm text-white/60 mb-8">
                  {page.ctaSubtitle || "Contact us to discuss your service requirements. We provide customized support tailored to your operations."}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button asChild size="lg" className="rounded-xl bg-accent hover:bg-accent/90">
                    <Link to="/quote">
                      {page.ctaButton || "Request Service Quote"}
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
