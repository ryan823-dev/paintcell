import { useEffect, useMemo } from "react";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Helmet } from "react-helmet-async";
import {
  ChevronRight, Cpu, Monitor, Database, Cloud, Shield,
  BarChart3, Settings2, Zap, Network, LineChart,
  Server, Radio, FileText, Bot, MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { useI18n } from "@/i18n";

const DOMAIN = "https://tdpaintcell.com";

const controlModules = [
  {
    icon: Cpu,
    titleKey: "plcControl",
    defaultTitle: "PLC-Based Control",
    descKey: "plcControlDesc",
    defaultDesc: "Industrial-grade PLC systems from Siemens, Allen-Bradley, and ABB for reliable paint process automation with fail-safe operation.",
    features: ["Redundant architecture", "Safety PLC integration", "Real-time I/O control", "Modular expansion"],
  },
  {
    icon: Monitor,
    titleKey: "hmiInterface",
    defaultTitle: "HMI & Visualization",
    descKey: "hmiInterfaceDesc",
    defaultDesc: "Touchscreen operator interfaces with intuitive recipe management, process monitoring, and alarm handling.",
    features: ["Multi-language support", "Recipe management", "Trend visualization", "Alarm history"],
  },
  {
    icon: Database,
    titleKey: "dataLogging",
    defaultTitle: "Data Logging & Traceability",
    descKey: "dataLoggingDesc",
    defaultDesc: "Complete process data capture with batch records for quality assurance and regulatory compliance.",
    features: ["Batch records", "Parameter logging", "Quality reports", "Audit trails"],
  },
  {
    icon: Network,
    titleKey: "mesIntegration",
    defaultTitle: "MES/ERP Integration",
    descKey: "mesIntegrationDesc",
    defaultDesc: "Seamless connectivity with manufacturing execution systems and enterprise resource planning platforms.",
    features: ["OPC UA server", "REST API support", "Database connectivity", "Production scheduling"],
  },
  {
    icon: Cloud,
    titleKey: "remoteAccess",
    defaultTitle: "Remote Diagnostics",
    descKey: "remoteAccessDesc",
    defaultDesc: "Secure remote access for diagnostics, troubleshooting, and software updates without on-site visits.",
    features: ["VPN connectivity", "Remote HMI access", "Diagnostic dashboard", "Software updates"],
  },
  {
    icon: LineChart,
    titleKey: "analytics",
    defaultTitle: "Process Analytics",
    descKey: "analyticsDesc",
    defaultDesc: "Real-time process monitoring with SPC analysis, OEE tracking, and predictive maintenance alerts.",
    features: ["SPC charts", "OEE calculation", "Predictive alerts", "Performance KPIs"],
  },
];

const industry40Features = [
  { icon: Radio, title: "IoT Connectivity", desc: "Sensor integration for real-time process monitoring" },
  { icon: BarChart3, title: "Digital Twin", desc: "Virtual representation for simulation and optimization" },
  { icon: Shield, title: "Cybersecurity", desc: "Industrial-grade security with network segmentation" },
  { icon: Zap, title: "Edge Computing", desc: "Local processing for real-time control decisions" },
];

export default function ControlSystems() {
  const { t, locale } = useI18n();
  const cs = t.controlSystems || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const schemas = useMemo(() => [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": `${DOMAIN}/products/control-systems#product`,
      name: "Industrial Paint Control Systems",
      description: "PLC-based control systems, HMI interfaces, and MES integration for robotic painting automation.",
      brand: { "@type": "Brand", name: "TD Robotic Painting Systems" },
      category: "Industrial Automation Control Systems",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${DOMAIN}/products/control-systems#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${DOMAIN}/` },
        { "@type": "ListItem", position: 2, name: "Products", item: `${DOMAIN}/products` },
        { "@type": "ListItem", position: 3, name: "Control Systems", item: `${DOMAIN}/products/control-systems` },
      ],
    },
  ], []);

  return (
    <>
      <Helmet>
        <title>{cs.metaTitle || "Smart Control Systems for Paint Automation | TD"}</title>
        <meta name="description" content={cs.metaDescription || "Industrial control systems for robotic painting automation. PLC control, HMI interfaces, MES integration, data logging, and Industry 4.0 connectivity for paint process optimization."} />
        <link rel="canonical" href={`${DOMAIN}/products/control-systems`} />
        {schemas.map((s, i) => (
          <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
        ))}
      </Helmet>

      <div className="min-h-screen bg-background">

        {/* Breadcrumb */}
        <div className="container-wide pt-4 pb-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/products">Products</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{cs.title || "Control Systems"}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Hero */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-20">
            <FadeIn>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Cpu className="h-6 w-6 text-accent" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
                  {cs.badge || "Software & Controls"}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold mb-6 leading-tight">
                {cs.heroTitle || "Smart Control Systems for Paint Automation"}
              </h1>
              <div className="max-w-3xl space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
                <p>
                  {cs.heroSubtitle || "Industrial-grade control systems engineered for robotic painting automation. From PLC-based process control to MES integration and Industry 4.0 connectivity, our control solutions deliver reliable operation, full traceability, and continuous process optimization."}
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Control Modules Grid */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <FadeIn>
              <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <Settings2 className="h-3.5 w-3.5" />
                {cs.modulesLabel || "Control Modules"}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                {cs.modulesTitle || "Control System Architecture"}
              </h2>
            </FadeIn>
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {controlModules.map((module) => (
                <StaggerItem key={module.titleKey}>
                  <Card className="border-border bg-card h-full hover:border-accent/30 transition-colors">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                        <module.icon className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        {cs[module.titleKey] || module.defaultTitle}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {cs[module.descKey] || module.defaultDesc}
                      </p>
                      <div className="pt-4 border-t border-border">
                        <ul className="space-y-1.5">
                          {module.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                              <ChevronRight className="h-3 w-3 text-accent" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Industry 4.0 Section */}
        <section className="border-b border-border bg-muted/30">
          <div className="container-wide py-12 md:py-16">
            <FadeIn>
              <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <Network className="h-3.5 w-3.5" />
                {cs.industry40Label || "Industry 4.0"}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {cs.industry40Title || "Industry 4.0 Ready"}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl">
                {cs.industry40Desc || "Our control systems are designed for the connected factory, with built-in support for IoT sensors, cloud connectivity, and advanced analytics."}
              </p>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {industry40Features.map((feature, index) => (
                <FadeIn key={feature.title} delay={index * 0.1}>
                  <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <feature.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                      <p className="text-xs text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Partners */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <FadeIn>
              <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <Server className="h-3.5 w-3.5" />
                {cs.partnersLabel || "Technology Partners"}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                {cs.partnersTitle || "Leading Automation Brands"}
              </h2>
            </FadeIn>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {["Siemens", "Allen-Bradley", "ABB", "FANUC", "KUKA", "Pro-face"].map((brand, index) => (
                <FadeIn key={brand} delay={index * 0.05}>
                  <div className="p-4 rounded-xl border border-border bg-card text-center">
                    <div className="w-10 h-10 rounded-lg bg-muted mx-auto mb-2 flex items-center justify-center text-xs font-bold text-muted-foreground">
                      {brand.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium">{brand}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <FadeIn>
              <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <BarChart3 className="h-3.5 w-3.5" />
                {cs.benefitsLabel || "Benefits"}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                {cs.benefitsTitle || "Control System Benefits"}
              </h2>
            </FadeIn>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { metric: "99.5%+", label: cs.uptime || "System Uptime", desc: cs.uptimeDesc || "Redundant architecture ensures continuous operation" },
                { metric: "100%", label: cs.traceability || "Traceability", desc: cs.traceabilityDesc || "Complete batch records for quality compliance" },
                { metric: "<1s", label: cs.responseTime || "Response Time", desc: cs.responseTimeDesc || "Real-time control for process accuracy" },
                { metric: "24/7", label: cs.remoteSupport || "Remote Support", desc: cs.remoteSupportDesc || "Secure remote access for diagnostics" },
              ].map((item, index) => (
                <FadeIn key={item.label} delay={index * 0.1}>
                  <div className="text-center p-6 rounded-xl border border-border bg-card">
                    <div className="text-3xl font-bold text-accent mb-1">{item.metric}</div>
                    <div className="font-semibold mb-2">{item.label}</div>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16">
          <div className="container-wide">
            <FadeIn>
              <div className="rounded-2xl border border-border bg-muted/30 p-8 md:p-12 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  {cs.ctaTitle || "Discuss Your Control System Requirements"}
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  {cs.ctaSubtitle || "Our automation engineers can help design the right control architecture for your painting application."}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button
                    onClick={() => {
                      const btn = document.querySelector("[data-assistant-trigger]") as HTMLButtonElement;
                      if (btn) btn.click();
                    }}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-11 px-6 gap-2 rounded-xl"
                  >
                    <Bot className="h-4 w-4" />
                    {cs.startAssessment || "Start Technical Assessment"}
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="h-11 px-6 gap-2 rounded-xl"
                  >
                    <Link to="/quote">
                      <FileText className="h-4 w-4" />
                      {cs.requestQuote || "Request Quote"}
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
