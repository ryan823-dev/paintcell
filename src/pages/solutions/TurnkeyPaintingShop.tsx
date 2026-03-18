import { Helmet } from "react-helmet-async";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import {
  Factory, CheckCircle2, ArrowRight, Building2, Car, Cog, 
  Layers, Users, Shield, FileText, ChevronRight
} from "lucide-react";
import { useI18n } from "@/i18n/context";

const DOMAIN = "https://tdpaint.com";

const shopTypeIcons = {
  automotiveBody: Car,
  partsPainting: Building2,
  industrialCoating: Factory,
};

export default function TurnkeyPaintingShop() {
  const { t } = useI18n();
  const page = t.turnkeyShop || {};
  
  const shopTypes = [
    { key: "automotiveBody", icon: Car },
    { key: "partsPainting", icon: Building2 },
    { key: "industrialCoating", icon: Factory },
  ];
  
  const deliveryPhases = [
    { phase: "1", key: "phase1" },
    { phase: "2", key: "phase2" },
    { phase: "3", key: "phase3" },
    { phase: "4", key: "phase4" },
    { phase: "5", key: "phase5" },
    { phase: "6", key: "phase6" },
  ];

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
                    {page.badge || "Turnkey Solutions"}
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                  {page.heroTitle || "Complete Painting Shop Solutions"}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-6">
                  {page.heroSubtitle || "Full-scope turnkey delivery of automotive body painting lines, parts coating facilities, and industrial finishing plants. From initial concept through production commissioning."}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg" className="rounded-xl">
                    <Link to="/quote">
                      <FileText className="h-4 w-4 mr-2" />
                      {page.requestConsultation || "Request Consultation"}
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-xl">
                    <Link to="/case-studies">
                      {page.viewReferences || "View Project References"}
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
                  {page.shopTypesLabel || "Application Areas"}
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                  {page.shopTypesTitle || "Painting Shop Types"}
                </h2>
                <div className="h-px w-12 bg-accent/50" />
              </div>
            </FadeIn>
            <StaggerContainer className="grid md:grid-cols-3 gap-6">
              {shopTypes.map((shop) => {
                const shopData = page[shop.key] || {};
                const Icon = shop.icon;
                return (
                  <StaggerItem key={shop.key}>
                    <div className="rounded-xl border border-border bg-card p-6 h-full hover:border-accent/30 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="text-lg font-semibold mb-3">{shopData.title || ""}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{shopData.description || ""}</p>
                      <ul className="space-y-2">
                        {(shopData.features || []).map((feature: string) => (
                          <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* Project Delivery Process */}
        <section className="py-16 md:py-20 border-b border-border bg-muted/30">
          <div className="container-wide">
            <FadeIn>
              <div className="mb-12">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">
                  {page.deliveryLabel || "Project Lifecycle"}
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                  {page.deliveryTitle || "Turnkey Delivery Process"}
                </h2>
                <div className="h-px w-12 bg-accent/50" />
              </div>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {deliveryPhases.map((item, index) => {
                const phaseData = page[item.key] || {};
                return (
                  <FadeIn key={item.phase} delay={index * 0.08}>
                    <div className="rounded-xl border border-border bg-card p-5 h-full">
                      <span className="text-2xl font-bold text-accent/60 mb-2 block">{item.phase}</span>
                      <h3 className="text-base font-semibold mb-2">{phaseData.title || ""}</h3>
                      <p className="text-sm text-muted-foreground">{phaseData.description || ""}</p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-16 md:py-20 border-b border-border">
          <div className="container-wide">
            <FadeIn>
              <div className="mb-12">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">
                  {page.capabilitiesLabel || "Engineering Scope"}
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                  {page.capabilitiesTitle || "Our Capabilities"}
                </h2>
                <div className="h-px w-12 bg-accent/50" />
              </div>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 max-w-4xl">
              {(page.capabilities || []).map((capability: string, i: number) => (
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
                  {page.relatedLabel || "Related Solutions"}
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                  {page.relatedTitle || "Explore More"}
                </h2>
                <div className="h-px w-12 bg-accent/50" />
              </div>
            </FadeIn>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { key: "relatedRobotic", href: "/paint-cells" },
                { key: "relatedSupply", href: "/solutions/paint-supply-systems" },
                { key: "relatedServices", href: "/services" },
              ].map((item) => {
                const related = page[item.key] || {};
                return (
                  <FadeIn key={item.href}>
                    <Link
                      to={item.href}
                      className="group block rounded-xl border border-border bg-card p-5 hover:border-accent/30 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-base font-semibold mb-2">{related.title || ""}</h3>
                          <p className="text-sm text-muted-foreground">{related.description || ""}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0" />
                      </div>
                    </Link>
                  </FadeIn>
                );
              })}
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
                  {page.ctaTitle || "Start Your Painting Shop Project"}
                </h2>
                <p className="text-sm text-white/60 mb-8">
                  {page.ctaSubtitle || "Share your project requirements for a preliminary feasibility assessment and concept proposal."}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button asChild size="lg" className="rounded-xl bg-accent hover:bg-accent/90">
                    <Link to="/quote">
                      {page.ctaButton || "Request Project Consultation"}
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
