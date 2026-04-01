import { useEffect, useMemo } from "react";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Helmet } from "react-helmet-async";
import {
  Palette, Clock, Droplets, Zap, Settings,
  CheckCircle2, Play, FileText, Bot, RefreshCw,
  Timer, Wrench, TrendingDown, Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FadeIn } from "@/components/animations";

const DOMAIN = "https://tdpaint.com";

const piggingSystems = [
  {
    brand: "LACTEC",
    model: "Lactec Pigging System",
    description: "German-engineered pigging technology for automotive and industrial coating lines",
    changeTime: "15-45 sec",
    paintRecovery: "95-98%",
    solventUsage: "50-150 ml",
    colors: "10-30+",
    features: [
      "Automated pig launching and receiving",
      "Multi-pig system for complex circuits",
      "Integrated solvent recovery",
      "Touch screen HMI control",
    ],
  },
  {
    brand: "TIMMER",
    model: "Timmer Pigging Solution",
    description: "Cost-effective pigging for medium-volume production with fast ROI",
    changeTime: "30-60 sec",
    paintRecovery: "90-95%",
    solventUsage: "100-250 ml",
    colors: "6-15",
    features: [
      "Compact pig station design",
      "Manual/semi-auto operation modes",
      "Flexible pig materials for various paints",
      "Easy maintenance access",
    ],
  },
];

const processSteps = [
  { step: 1, title: "Color Change Signal", description: "PLC sends color change command based on production schedule or operator input. System identifies current and target color circuits.", duration: "<1 sec" },
  { step: 2, title: "Pig Launch", description: "Specialized pig (projectile) is launched into the paint supply line. Compressed air or solvent pushes the pig through the pipe.", duration: "5-15 sec" },
  { step: 3, title: "Paint Recovery", description: "Pig pushes remaining paint back to the paint kitchen or into a recovery container. 95%+ of residual paint is recovered.", duration: "10-25 sec" },
  { step: 4, title: "Line Flush", description: "Minimal solvent flushes the line. Pig continues to clear any residue. Solvent volume is 80% less than traditional methods.", duration: "5-15 sec" },
  { step: 5, title: "New Color Load", description: "New color paint fills the clean line, pushing out solvent. System is ready for production with zero cross-contamination.", duration: "10-20 sec" },
];

const comparisonTable = [
  { method: "Manual Color Change", time: "15-60 min", waste: "2-10 L", recovery: "0%", cost: "Low" },
  { method: "Valve Block System", time: "3-10 min", waste: "0.5-2 L", recovery: "0%", cost: "Medium" },
  { method: "Pigging System", time: "30-90 sec", waste: "50-250 ml", recovery: "95%+", cost: "High" },
];

const benefits = [
  { icon: TrendingDown, metric: "80%", label: "Solvent Reduction", desc: "Dramatically reduced solvent consumption compared to traditional flushing methods" },
  { icon: Droplets, metric: "95%+", label: "Paint Recovery", desc: "Recover valuable paint that would otherwise be wasted during color changes" },
  { icon: Timer, metric: "<90s", label: "Change Time", desc: "Rapid color change enables efficient small-batch production" },
  { icon: Palette, metric: "30+", label: "Colors Supported", desc: "Support for extensive color palettes without dedicated lines for each color" },
];

const applications = [
  { title: "Automotive OEM", description: "Multi-color body painting with frequent color changes", colors: "15-30+", changeFreq: "Every 1-3 vehicles" },
  { title: "Automotive Parts", description: "Plastic and metal components with color variety", colors: "8-20", changeFreq: "Every 5-15 minutes" },
  { title: "Industrial Coating", description: "Appliance and equipment manufacturers", colors: "5-15", changeFreq: "Every 15-30 minutes" },
  { title: "Contract Coating", description: "Job shops serving multiple customers", colors: "20-50+", changeFreq: "Variable, frequent changes" },
];

export default function PiggingColorChangeSystem() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const schemas = useMemo(() => [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": `${DOMAIN}/products/pigging-color-change-system#product`,
      name: "Pigging Color Change System",
      description: "Pigging color change systems for efficient multi-color painting operations. Fast changeover, minimal waste, maximum paint recovery.",
      brand: { "@type": "Brand", name: "TD Robotic Painting Systems" },
      category: "Industrial Paint Equipment",
      offers: { "@type": "AggregateOffer", priceCurrency: "USD", lowPrice: "50000", highPrice: "250000" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${DOMAIN}/products/pigging-color-change-system#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${DOMAIN}/` },
        { "@type": "ListItem", position: 2, name: "Products", item: `${DOMAIN}/products` },
        { "@type": "ListItem", position: 3, name: "Pigging System", item: `${DOMAIN}/products/pigging-color-change-system` },
      ],
    },
  ], []);

  return (
    <>
      <Helmet>
        <title>Pigging Color Change System | Fast Multi-Color Paint Changeover</title>
        <meta name="description" content="Pigging color change systems with 95%+ paint recovery, 80% solvent reduction, under 90s change time. LACTEC and TIMMER solutions available." />
        <link rel="canonical" href={`${DOMAIN}/products/pigging-color-change-system`} />
        {schemas.map((s, i) => (
          <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
        ))}
      </Helmet>

      <div className="min-h-screen bg-background">

        {/* Breadcrumb */}
        <div className="container-wide pt-4 pb-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/products">Products</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Pigging System</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Hero */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-20">
            <FadeIn>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <RefreshCw className="h-6 w-6 text-accent" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">Color Change Technology</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold mb-6 leading-tight">Pigging Color Change Systems</h1>
              <div className="max-w-3xl space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
                <p>
                  Utilize pigging technology to push residual paint through pipelines for rapid color change. 
                  Recover 95%+ residual paint, reduce solvent consumption by 80%, and achieve change times under 90 seconds. 
                  Ideal for efficient multi-color painting operations.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                <Button asChild className="h-11 px-6 gap-2 rounded-xl">
                  <Link to="/quote"><FileText className="h-4 w-4" />Request Quote</Link>
                </Button>
                <Button variant="outline" onClick={() => { const btn = document.querySelector("[data-assistant-trigger]") as HTMLButtonElement; if (btn) btn.click(); }} className="h-11 px-6 gap-2 rounded-xl">
                  <Bot className="h-4 w-4" />Technical Consultation
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Video Section */}
        <section className="border-b border-border bg-muted/30">
          <div className="container-wide py-12 md:py-16">
            <FadeIn>
              <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <Play className="h-3.5 w-3.5" />How It Works
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">Pigging Process Demonstration</h2>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="rounded-xl border border-border bg-card overflow-hidden aspect-video">
                <video className="w-full h-full object-cover" controls preload="metadata">
                  <source src={`${DOMAIN}/videos/knowledge/pigging-color-change-demo.mp4`} type="video/mp4" />
                  Your browser does not support video playback.
                </video>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Pigging Technology Principle</h3>
                <p className="text-muted-foreground mb-4">
                  A pig is a specially designed pipeline cleaning device, typically made of polyurethane or rubber materials, 
                  that travels through pipes propelled by compressed air or liquid.
                </p>
                <ul className="space-y-2">
                  {["Scrapes residual paint from pipe walls", "Pushes paint back to tank or recovery container", "Reduces need for solvent flushing", "Ideal for long paint supply lines"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <FadeIn>
              <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <RefreshCw className="h-3.5 w-3.5" />Color Change Process
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">Five-Step Rapid Color Change</h2>
            </FadeIn>
            <div className="relative">
              <div className="absolute top-8 left-8 right-8 h-0.5 bg-border hidden lg:block" />
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {processSteps.map((step, index) => (
                  <FadeIn key={step.step} delay={index * 0.1}>
                    <div className="relative">
                      <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mb-4 relative z-10">
                        <span className="text-xl font-bold text-accent">{step.step}</span>
                      </div>
                      <h3 className="font-semibold mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                      <span className="text-xs font-medium text-accent">{step.duration}</span>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* System Comparison */}
        <section className="border-b border-border bg-muted/30">
          <div className="container-wide py-12 md:py-16">
            <FadeIn>
              <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <Settings className="h-3.5 w-3.5" />System Options
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">Available Pigging Systems</h2>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-6">
              {piggingSystems.map((system, index) => (
                <FadeIn key={system.brand} delay={index * 0.1}>
                  <Card className="border-border bg-card h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-bold text-accent">{system.brand}</span>
                        <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full">{system.colors} Colors</span>
                      </div>
                      <h3 className="font-semibold mb-1">{system.model}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{system.description}</p>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div><p className="text-xs text-muted-foreground">Change Time</p><p className="font-semibold">{system.changeTime}</p></div>
                        <div><p className="text-xs text-muted-foreground">Recovery</p><p className="font-semibold">{system.paintRecovery}</p></div>
                        <div><p className="text-xs text-muted-foreground">Solvent</p><p className="font-semibold">{system.solventUsage}</p></div>
                      </div>
                      <div className="pt-4 border-t border-border">
                        <ul className="space-y-1.5">
                          {system.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                              <CheckCircle2 className="h-3 w-3 text-accent" />{feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <FadeIn>
              <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <Cpu className="h-3.5 w-3.5" />Method Comparison
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">Color Change Method Comparison</h2>
            </FadeIn>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-sm">Method</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Change Time</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Paint Waste</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Recovery</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.map((row) => (
                    <tr key={row.method} className={`border-b border-border ${row.method === "Pigging System" ? "bg-accent/5" : ""}`}>
                      <td className="py-3 px-4 font-medium">
                        {row.method}
                        {row.method === "Pigging System" && <span className="ml-2 text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded">Recommended</span>}
                      </td>
                      <td className="py-3 px-4">{row.time}</td>
                      <td className="py-3 px-4">{row.waste}</td>
                      <td className="py-3 px-4">{row.recovery}</td>
                      <td className="py-3 px-4">{row.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="border-b border-border bg-muted/30">
          <div className="container-wide py-12 md:py-16">
            <FadeIn>
              <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <Zap className="h-3.5 w-3.5" />Key Benefits
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">Value of Pigging Systems</h2>
            </FadeIn>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((item, index) => (
                <FadeIn key={item.label} delay={index * 0.1}>
                  <div className="text-center p-6 rounded-xl border border-border bg-card">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="h-6 w-6 text-accent" />
                    </div>
                    <div className="text-2xl font-bold text-accent mb-1">{item.metric}</div>
                    <div className="font-semibold mb-2">{item.label}</div>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Applications */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <FadeIn>
              <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <Wrench className="h-3.5 w-3.5" />Applications
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">Typical Applications</h2>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {applications.map((app, index) => (
                <FadeIn key={app.title} delay={index * 0.1}>
                  <div className="p-6 rounded-xl border border-border bg-card">
                    <h3 className="font-semibold mb-2">{app.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{app.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-muted-foreground">Colors</span><span className="font-medium">{app.colors}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Change Freq.</span><span className="font-medium">{app.changeFreq}</span></div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <FadeIn><h2 className="text-2xl md:text-3xl font-bold mb-8">Related Resources</h2></FadeIn>
            <div className="grid md:grid-cols-3 gap-6">
              <FadeIn delay={0}>
                <Link to="/resources/knowledge/color-change-systems" className="block p-6 rounded-xl border border-border bg-card hover:border-accent/30 transition-colors">
                  <RefreshCw className="h-8 w-8 text-accent mb-4" />
                  <h3 className="font-semibold mb-2">Color Change Systems Guide</h3>
                  <p className="text-sm text-muted-foreground">Comprehensive comparison of manual, valve block, and pigging systems</p>
                </Link>
              </FadeIn>
              <FadeIn delay={0.1}>
                <Link to="/products/bell-cleaning-system" className="block p-6 rounded-xl border border-border bg-card hover:border-accent/30 transition-colors">
                  <Droplets className="h-8 w-8 text-accent mb-4" />
                  <h3 className="font-semibold mb-2">Bell Cleaning System</h3>
                  <p className="text-sm text-muted-foreground">Automated cleaning systems for rotary bell atomizers</p>
                </Link>
              </FadeIn>
              <FadeIn delay={0.2}>
                <Link to="/resources/tools/roi-calculator" className="block p-6 rounded-xl border border-border bg-card hover:border-accent/30 transition-colors">
                  <TrendingDown className="h-8 w-8 text-accent mb-4" />
                  <h3 className="font-semibold mb-2">ROI Calculator</h3>
                  <p className="text-sm text-muted-foreground">Calculate return on investment for color change upgrades</p>
                </Link>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16">
          <div className="container-wide">
            <FadeIn>
              <div className="rounded-2xl border border-border bg-muted/30 p-8 md:p-12 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Get Your Pigging Solution</h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Our engineers can help evaluate your color change requirements and design the optimal pigging system for fast changeover and cost savings.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button onClick={() => { const btn = document.querySelector("[data-assistant-trigger]") as HTMLButtonElement; if (btn) btn.click(); }} className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-11 px-6 gap-2 rounded-xl">
                    <Bot className="h-4 w-4" />Start Technical Assessment
                  </Button>
                  <Button variant="outline" asChild className="h-11 px-6 gap-2 rounded-xl">
                    <Link to="/quote"><FileText className="h-4 w-4" />Request Quote</Link>
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