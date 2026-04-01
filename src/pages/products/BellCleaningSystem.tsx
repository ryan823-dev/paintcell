import { useEffect, useMemo } from "react";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Helmet } from "react-helmet-async";
import {
  Droplets, Zap, Shield, Settings,
  CheckCircle2, Play, FileText, Bot, Sparkles,
  Timer, Wrench, RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FadeIn } from "@/components/animations";

const DOMAIN = "https://tdpaint.com";

// OSS-hosted videos - see src/data/videoLibrary.ts for metadata
const demoVideos = [
  {
    src: `${DOMAIN}/videos/knowledge/bell-cleaning-demo-1.mp4`,
    title: "Rotary Bell Atomizer Cleaning Process Demo - Part 1",
    description: "Step-by-step demonstration of rotary bell atomizer cleaning procedure",
  },
  {
    src: `${DOMAIN}/videos/knowledge/bell-cleaning-demo-2.mp4`,
    title: "Rotary Bell Atomizer Cleaning Process Demo - Part 2",
    description: "Post-cleaning inspection, cup reassembly, and performance verification",
  },
  {
    src: `${DOMAIN}/videos/knowledge/rotary-bell-troubleshooting.mp4`,
    title: "Rotary Bell Atomizer Troubleshooting Guide",
    description: "Diagnostic procedures for common rotary bell atomizer issues",
  },
];

const cleaningStages = [
  {
    icon: Droplets,
    title: "Pre-Flush Cycle",
    description: "Initial solvent flush removes bulk paint residue from bell cup and shaping air passages. Configurable duration based on paint type.",
    duration: "15-30 sec",
  },
  {
    icon: RefreshCw,
    title: "High-Pressure Clean",
    description: "Pressurized solvent (up to 150 bar) cleans internal turbine passages, bearings, and shaft cavity where paint accumulates.",
    duration: "20-45 sec",
  },
  {
    icon: Sparkles,
    title: "Air Blow-Off",
    description: "Clean, dry compressed air removes residual solvent and moisture, preventing contamination of next color.",
    duration: "5-15 sec",
  },
  {
    icon: Shield,
    title: "Quality Verification",
    description: "Optional vision system verifies bell cup cleanliness, triggering re-clean if contamination detected.",
    duration: "3-5 sec",
  },
];

const systemModels = [
  {
    model: "BCS-100",
    title: "Single-Bell Cleaner",
    description: "Compact unit for single robot stations",
    bells: 1,
    cycleTime: "45-90 sec",
    solventUsage: "80-150 ml/cycle",
    features: ["Manual bell loading", "Basic solvent management", "Compact footprint"],
  },
  {
    model: "BCS-200",
    title: "Dual-Bell Cleaner",
    description: "Twin-station unit for high-volume lines",
    bells: 2,
    cycleTime: "45-90 sec",
    solventUsage: "150-300 ml/cycle",
    features: ["Simultaneous cleaning", "Interchangeable stations", "Auto bell detection"],
  },
  {
    model: "BCS-300",
    title: "Automated Cleaning Cell",
    description: "Fully integrated cleaning with robot handling",
    bells: "2-4",
    cycleTime: "30-60 sec",
    solventUsage: "60-120 ml/cycle",
    features: ["Robot-loaded operation", "Closed-loop solvent recovery", "Vision verification"],
  },
];

const compatibilityData = [
  { brand: "ABB", models: "RB1000i, RB1000, Robobell 625/925", status: "Full Support" },
  { brand: "Dürr", models: "EcoBell U/V, EcoBell2", status: "Full Support" },
  { brand: "SAMES KREMLIN", models: "PPH308, PPH707, PPH805", status: "Full Support" },
  { brand: "Graco", models: "G1, G2 Copes Bell", status: "Full Support" },
  { brand: "Ransburg", models: "RB100, RB200 Series", status: "Compatible" },
];

export default function BellCleaningSystem() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const schemas = useMemo(() => [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": `${DOMAIN}/products/bell-cleaning-system#product`,
      name: "Rotary Bell Cleaning System",
      description: "Automated rotary bell cleaning systems for robotic spray painting. Fast color change support, solvent-efficient operation, and ATEX-certified safety.",
      brand: { "@type": "Brand", name: "TD Robotic Painting Systems" },
      category: "Industrial Paint Equipment",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: "15000",
        highPrice: "75000",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: "Rotary Bell Cleaning System Demo",
      description: "Automated cleaning cycle for electrostatic rotary bell atomizers",
      thumbnailUrl: `${DOMAIN}/images/bell-cleaning-thumbnail.jpg`,
      contentUrl: `${DOMAIN}/videos/bell-cleaning-demo-1.mp4`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${DOMAIN}/products/bell-cleaning-system#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${DOMAIN}/` },
        { "@type": "ListItem", position: 2, name: "Products", item: `${DOMAIN}/products` },
        { "@type": "ListItem", position: 3, name: "Bell Cleaning System", item: `${DOMAIN}/products/bell-cleaning-system` },
      ],
    },
  ], []);

  return (
    <>
      <Helmet>
        <title>Rotary Bell Cleaning System | Automated Atomizer Cleaning</title>
        <meta name="description" content="Automated rotary bell cleaning systems for fast color change and efficient atomizer maintenance. Compatible with ABB, Dürr, SAMES, and more. ATEX certified." />
        <link rel="canonical" href={`${DOMAIN}/products/bell-cleaning-system`} />
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
                <BreadcrumbPage>Bell Cleaning System</BreadcrumbPage>
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
                  <Droplets className="h-6 w-6 text-accent" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
                  Spray Equipment
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold mb-6 leading-tight">
                Automated Rotary Bell Cleaning Systems
              </h1>
              <div className="max-w-3xl space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
                <p>
                  Purpose-engineered cleaning systems for electrostatic rotary bell atomizers. 
                  Ensure thorough cleaning during color changes, reduce solvent consumption, 
                  and maintain coating quality consistency.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                <Button asChild className="h-11 px-6 gap-2 rounded-xl">
                  <Link to="/quote">
                    <FileText className="h-4 w-4" />
                    Request Quote
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    const btn = document.querySelector("[data-assistant-trigger]") as HTMLButtonElement;
                    if (btn) btn.click();
                  }}
                  className="h-11 px-6 gap-2 rounded-xl"
                >
                  <Bot className="h-4 w-4" />
                  Technical Consultation
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Video Demonstrations */}
        <section className="border-b border-border bg-muted/30">
          <div className="container-wide py-12 md:py-16">
            <FadeIn>
              <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <Play className="h-3.5 w-3.5" />
                Product Demonstrations
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                Cleaning Process Videos
              </h2>
            </FadeIn>
            <div className="grid md:grid-cols-3 gap-6">
              {demoVideos.map((video, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <div className="rounded-xl border border-border bg-card overflow-hidden">
                    <div className="aspect-video bg-muted relative">
                      <video
                        className="w-full h-full object-cover"
                        controls
                        preload="metadata"
                        poster={`/images/bell-cleaning-thumb-${index + 1}.jpg`}
                      >
                        <source src={video.src} type="video/mp4" />
                        Your browser does not support video playback.
                      </video>
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-14 h-14 rounded-full bg-accent/90 flex items-center justify-center">
                          <Play className="h-6 w-6 text-accent-foreground ml-1" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-sm mb-1">{video.title}</h3>
                      <p className="text-xs text-muted-foreground">{video.description}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Note: Videos show standard cleaning process. Actual configuration may vary by bell model and customer requirements.
            </p>
          </div>
        </section>

        {/* Cleaning Stages */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <FadeIn>
              <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <RefreshCw className="h-3.5 w-3.5" />
                Cleaning Process
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                Four-Stage Cleaning Cycle
              </h2>
            </FadeIn>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cleaningStages.map((stage, index) => (
                <FadeIn key={stage.title} delay={index * 0.1}>
                  <Card className="border-border bg-card h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                          <stage.icon className="h-6 w-6 text-accent" />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                          {stage.duration}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{stage.title}</h3>
                      <p className="text-sm text-muted-foreground">{stage.description}</p>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* System Models */}
        <section className="border-b border-border bg-muted/30">
          <div className="container-wide py-12 md:py-16">
            <FadeIn>
              <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <Settings className="h-3.5 w-3.5" />
                System Models
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                Available Configurations
              </h2>
            </FadeIn>
            <div className="grid md:grid-cols-3 gap-6">
              {systemModels.map((model, index) => (
                <FadeIn key={model.model} delay={index * 0.1}>
                  <Card className="border-border bg-card h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-bold text-accent">{model.model}</span>
                        <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">
                          {model.bells} Station(s)
                        </span>
                      </div>
                      <h3 className="font-semibold mb-1">{model.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{model.description}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Cycle Time</span>
                          <span className="font-medium">{model.cycleTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Solvent Use</span>
                          <span className="font-medium">{model.solventUsage}</span>
                        </div>
                      </div>
                      <div className="pt-4 mt-4 border-t border-border">
                        <ul className="space-y-1.5">
                          {model.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                              <CheckCircle2 className="h-3 w-3 text-accent" />
                              {feature}
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

        {/* Compatibility */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <FadeIn>
              <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <Wrench className="h-3.5 w-3.5" />
                Compatibility
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                Rotary Bell Compatibility
              </h2>
            </FadeIn>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-sm">Brand</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Compatible Models</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Support Level</th>
                  </tr>
                </thead>
                <tbody>
                  {compatibilityData.map((item) => (
                    <tr key={item.brand} className="border-b border-border">
                      <td className="py-3 px-4 font-medium">{item.brand}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{item.models}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded ${
                          item.status === "Full Support"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        }`}>
                          {item.status}
                        </span>
                      </td>
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
                <Zap className="h-3.5 w-3.5" />
                Key Benefits
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                Why Choose Our Bell Cleaning Systems
              </h2>
            </FadeIn>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Timer, metric: "<90s", label: "Cleaning Cycle", desc: "Fast color change with minimal production interruption" },
                { icon: Droplets, metric: "60-150ml", label: "Solvent Usage", desc: "Optimized cleaning paths reduce waste" },
                { icon: Shield, metric: "ATEX", label: "Certified Safe", desc: "Zone 1 explosion-proof design for safety" },
                { icon: CheckCircle2, metric: "99.5%", label: "Clean Rate", desc: "Vision verification ensures no cross-contamination" },
              ].map((item, index) => (
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

        {/* Related Resources */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <FadeIn>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">Related Resources</h2>
            </FadeIn>
            <div className="grid md:grid-cols-3 gap-6">
              <FadeIn delay={0}>
                <Link to="/resources/knowledge/snowflake-cleaning" className="block p-6 rounded-xl border border-border bg-card hover:border-accent/30 transition-colors">
                  <Sparkles className="h-8 w-8 text-accent mb-4" />
                  <h3 className="font-semibold mb-2">Snowflake Cleaning</h3>
                  <p className="text-sm text-muted-foreground">Dry ice alternative for surface preparation without secondary waste</p>
                </Link>
              </FadeIn>
              <FadeIn delay={0.1}>
                <Link to="/resources/equipment/paint-booth-filtration" className="block p-6 rounded-xl border border-border bg-card hover:border-accent/30 transition-colors">
                  <RefreshCw className="h-8 w-8 text-accent mb-4" />
                  <h3 className="font-semibold mb-2">Paint Booth Filtration</h3>
                  <p className="text-sm text-muted-foreground">Dry and wet filtration systems for clean spray environments</p>
                </Link>
              </FadeIn>
              <FadeIn delay={0.2}>
                <Link to="/resources/knowledge/color-change-systems" className="block p-6 rounded-xl border border-border bg-card hover:border-accent/30 transition-colors">
                  <Droplets className="h-8 w-8 text-accent mb-4" />
                  <h3 className="font-semibold mb-2">Color Change Systems</h3>
                  <p className="text-sm text-muted-foreground">Comparison of color change solutions for multi-color painting</p>
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
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Get Your Bell Cleaning Solution</h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Our engineers can help you select the right cleaning system configuration, 
                  optimize color change efficiency, and reduce solvent consumption.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button onClick={() => { const btn = document.querySelector("[data-assistant-trigger]") as HTMLButtonElement; if (btn) btn.click(); }} className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-11 px-6 gap-2 rounded-xl">
                    <Bot className="h-4 w-4" />
                    Start Technical Assessment
                  </Button>
                  <Button variant="outline" asChild className="h-11 px-6 gap-2 rounded-xl">
                    <Link to="/quote">
                      <FileText className="h-4 w-4" />
                      Request Quote
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