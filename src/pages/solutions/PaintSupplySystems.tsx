import { Helmet } from "react-helmet-async";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import {
  Droplets, CheckCircle2, ArrowRight, Palette, Gauge, Settings,
  RefreshCw, Shield, FileText, ChevronRight
} from "lucide-react";
import { useI18n } from "@/i18n/context";

const DOMAIN = "https://tdpaintcell.com";

export default function PaintSupplySystems() {
  const { t } = useI18n();
  const page = t.paintSupply || {};
  const components = page.components || {};
  
  const systemTypes = [
    { key: "centralizedSupply", icon: Droplets },
    { key: "colorChange", icon: Palette },
    { key: "paintMixing", icon: RefreshCw },
  ];
  
  const componentKeys = ["pumps", "regulators", "valves", "heaters", "filters", "flowMeters", "levelSensors", "controlPanels"];

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
                    {page.badge || "Paint Supply"}
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                  {page.heroTitle || "Paint Supply Systems"}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-3xl">
                  {page.heroSubtitle || "Comprehensive paint supply, color change, and mixing systems engineered for consistent material delivery and efficient color changeovers in automotive and industrial coating applications."}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg" className="rounded-xl">
                    <Link to="/quote">
                      <FileText className="h-4 w-4 mr-2" />
                      {page.requestSpec || "Request Specification"}
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-xl">
                    <Link to="/products">
                      {page.browseEquipment || "Browse Equipment"}
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
                  {page.systemTypesLabel || "System Categories"}
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                  {page.systemTypesTitle || "Paint Supply Solutions"}
                </h2>
                <div className="h-px w-12 bg-accent/50" />
              </div>
            </FadeIn>
            <StaggerContainer className="grid md:grid-cols-3 gap-6">
              {systemTypes.map((system) => {
                const systemData = page[system.key] || {};
                const Icon = system.icon;
                return (
                  <StaggerItem key={system.key}>
                    <div className="rounded-xl border border-border bg-card p-6 h-full hover:border-accent/30 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="text-lg font-semibold mb-3">{systemData.title || ""}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{systemData.description || ""}</p>
                      <ul className="space-y-2">
                        {(systemData.features || []).map((feature: string) => (
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

        {/* Key Components */}
        <section className="py-16 md:py-20 border-b border-border bg-muted/30">
          <div className="container-wide">
            <FadeIn>
              <div className="mb-12">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">
                  {page.componentsLabel || "Equipment"}
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                  {page.componentsTitle || "Key Components"}
                </h2>
                <div className="h-px w-12 bg-accent/50" />
              </div>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {componentKeys.map((key, index) => {
                const comp = components[key] || {};
                return (
                  <FadeIn key={key} delay={index * 0.05}>
                    <div className="rounded-xl border border-border bg-card p-4 h-full">
                      <h3 className="text-sm font-semibold mb-1">{comp.name || ""}</h3>
                      <p className="text-xs text-muted-foreground">{comp.description || ""}</p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 md:py-20 border-b border-border">
          <div className="container-wide">
            <FadeIn>
              <div className="mb-12">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">
                  {page.benefitsLabel || "Advantages"}
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                  {page.benefitsTitle || "System Benefits"}
                </h2>
                <div className="h-px w-12 bg-accent/50" />
              </div>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 max-w-4xl">
              {(page.benefits || []).map((benefit: string, i: number) => (
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
                { key: "relatedTurnkey", href: "/solutions/turnkey-painting-shop" },
                { key: "relatedRobotic", href: "/paint-cells" },
                { key: "relatedProducts", href: "/products" },
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
                  {page.ctaTitle || "Optimize Your Paint Supply"}
                </h2>
                <p className="text-sm text-white/60 mb-8">
                  {page.ctaSubtitle || "Contact us for paint supply system specifications tailored to your production requirements."}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button asChild size="lg" className="rounded-xl bg-accent hover:bg-accent/90">
                    <Link to="/quote">
                      {page.ctaButton || "Request System Specification"}
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
