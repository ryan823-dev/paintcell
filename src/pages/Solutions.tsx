import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Helmet } from "react-helmet-async";
import { ChevronRight, Sparkles, Cpu, Shield, Palette, Wifi, Flame, Bot, MapPin, BarChart3, Factory, TrendingUp, Car, Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { solutions } from "@/data/solutionData";
import { useI18n } from "@/i18n";

const solutionOrder = [
  "robotic-painting-system",
  "paint-booth-automation",
  "spray-robot-integration",
];

const techFeatures = [
  {
    icon: Bot,
    title: "Multi-Brand Robot Integration",
    description: "Seamless integration of ABB, Yaskawa, Kawasaki, FANUC robots with Sames, Ransburg, Binks, Graco spray equipment on unified Siemens S7-1500 PLC platform.",
    advantage: "Break vendor lock-in, flexible equipment selection"
  },
  {
    icon: Shield,
    title: "Intelligent Quality Control",
    description: "Vision-based part recognition, skip-station interlocks, hardener flow monitoring, and radar-based level control with dual-threshold alarms.",
    advantage: "IATF 16949 compliant, batch traceability"
  },
  {
    icon: Palette,
    title: "20+ Color Fast Change System",
    description: "Sames PPH707 rotary bells with automatic purge sequence. Color change in under 3 minutes with minimal waste.",
    advantage: "High-mix low-volume production ready"
  },
  {
    icon: Cpu,
    title: "Water-Based Paint Temperature Control",
    description: "Pipe-in-pipe thermal management maintaining ±1°C precision for water-based coatings, ensuring consistent atomization.",
    advantage: "Industry-leading stability for water-borne systems"
  },
  {
    icon: Wifi,
    title: "Remote Diagnostics & Industry 4.0",
    description: "Robostudio/Shopfloor Editor remote access, PROFINET/Ethernet dual-redundant network, MES/SCADA integration ready.",
    advantage: "50%+ faster fault response, digital twin ready"
  },
  {
    icon: Flame,
    title: "Integrated Pre-Treatment",
    description: "RAPIDFLAME flame treatment robots share control platform with painting robots, synchronized takt time and process interlocks.",
    advantage: "Reduced footprint, consistent surface activation"
  },
];

const marketStats = [
  { value: "30+", label: "Cities Covered", icon: MapPin, detail: "Nationwide deployment experience across major industrial regions" },
  { value: "1–169", label: "Robots per Project", icon: Bot, detail: "From single-cell stations to 100+ robot mega-lines" },
  { value: "60%+", label: "Automotive OEM", icon: Car, detail: "Primary focus on vehicle body & component painting" },
  { value: "40%", label: "Industrial & Parts", icon: Factory, detail: "Heavy equipment, parts suppliers, and general industrial" },
];

const projectTypes = [
  { label: "New Line Builds", pct: 60, color: "bg-accent" },
  { label: "Line Modifications", pct: 33, color: "bg-blue-500" },
  { label: "Capacity Expansions", pct: 7, color: "bg-emerald-500" },
];

const scaleBreakdown = [
  { range: "1–10 robots", pct: 38, desc: "Single-cell & compact systems" },
  { range: "11–40 robots", pct: 45, desc: "Mid-scale production lines" },
  { range: "40+ robots", pct: 17, desc: "Complete OEM paint shops" },
];

export default function Solutions() {
  const { t } = useI18n();

  return (
    <>
      <Helmet>
        <title>{t.solutions?.title || "Solutions"} | TD</title>
        <meta name="description" content={t.solutions?.subtitle || ""} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <section className="hero-gradient border-b border-white/10">
          <div className="container-wide py-12 md:py-20">
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full border border-accent/40 bg-accent/20 text-accent text-[11px] font-semibold tracking-wider uppercase">
              <Sparkles className="h-3 w-3" />
              {t.solutions?.badge || "Solutions"}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold mb-4 leading-tight text-white">
              {t.solutions?.title || "Robotic painting automation solutions"}
            </h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl">
              {t.solutions?.subtitle || ""}
            </p>
          </div>
        </section>

        <section>
          <div className="container-wide py-12 md:py-16">
            <div className="grid md:grid-cols-3 gap-4">
              {solutionOrder.map((slug) => {
                const data = solutions[slug];
                if (!data) return null;
                return (
                  <Card key={slug} className="border-border bg-card hover:border-accent/30 hover:shadow-md transition-all">
                    <CardContent className="p-6">
                      <h2 className="font-semibold text-lg mb-2">{data.heroTitle}</h2>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {data.heroSubtitle}
                      </p>
                      <Link
                        to={`/solutions/${slug}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                      >
                        {t.solutions?.learnMore || "Learn more"}
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Technology Features Section */}
        <section className="bg-muted/30 border-y border-border">
          <div className="container-wide py-12 md:py-16">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full mb-4">
                <Cpu className="h-4 w-4" />
                Technology Advantages
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Engineering Excellence</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                15+ years of industrial painting automation expertise distilled into proven technology platforms.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techFeatures.map((feature, idx) => (
                <Card key={idx} className="border-border bg-card hover:border-accent/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      {feature.description}
                    </p>
                    <div className="text-xs text-accent font-medium bg-accent/5 px-2 py-1 rounded inline-block">
                      {feature.advantage}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Equipment Integration Gallery */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full mb-4">
                <Wrench className="h-4 w-4" />
                Equipment Integration
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Robot + Atomizer Integration</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Precision integration of painting robots with high-speed rotary bell atomizers — hollow-wrist routing, electrostatic cascade, and CAN-bus process control.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-xl border border-border overflow-hidden group hover:border-accent/30 transition-colors">
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img
                    src="/images/products/abb-robot-internals.jpg"
                    alt="ABB painting robot with hollow-wrist internal routing for paint lines, air supply, and electrostatic cables"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold mb-1">Hollow-Wrist Internal Routing</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Paint supply lines, shaping air hoses, electrostatic HV cables, and PROFINET communication routed through the robot arm — eliminating external cable interference and enabling full 6-axis freedom of motion.
                  </p>
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border overflow-hidden group hover:border-accent/30 transition-colors">
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img
                    src="/images/products/abb-sames-rotary-bell.jpg"
                    alt="ABB painting robot with Sames rotary bell atomizer and protective capot installed"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold mb-1">Sames Rotary Bell Integration</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    High-speed electrostatic rotary bell (up to 60,000 RPM) with 100kV cascade, dual shaping air control, and CAN-bus communication — achieving 65-85% transfer efficiency on automotive-grade finishes.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-accent/5 rounded-xl p-5 border border-accent/10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
                <div>
                  <div className="font-bold text-accent">60K RPM</div>
                  <div className="text-muted-foreground text-xs">Bell Speed</div>
                </div>
                <div>
                  <div className="font-bold text-accent">100 kV</div>
                  <div className="text-muted-foreground text-xs">Electrostatic Cascade</div>
                </div>
                <div>
                  <div className="font-bold text-accent">15–50 mm</div>
                  <div className="text-muted-foreground text-xs">Bell Cup Range</div>
                </div>
                <div>
                  <div className="font-bold text-accent">65–85%</div>
                  <div className="text-muted-foreground text-xs">Transfer Efficiency</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Market Experience Section */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full mb-4">
                <BarChart3 className="h-4 w-4" />
                Market Experience
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Proven Across Scale and Industry</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Track record spanning 30+ cities, from single-robot cells to 100+ robot complete paint shops, across automotive OEM and industrial sectors.
              </p>
            </div>

            {/* Key Statistics */}
            <div className="grid md:grid-cols-4 gap-4 mb-10">
              {marketStats.map((stat, idx) => (
                <Card key={idx} className="border-border bg-card text-center hover:border-accent/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-3">
                      <stat.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div className="text-2xl font-bold text-accent mb-1">{stat.value}</div>
                    <div className="font-medium text-sm mb-2">{stat.label}</div>
                    <div className="text-xs text-muted-foreground">{stat.detail}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Project Type Distribution */}
              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-accent" />
                    Project Type Distribution
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4">Based on cumulative project portfolio</p>
                  <div className="space-y-4">
                    {projectTypes.map((type) => (
                      <div key={type.label}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="font-medium">{type.label}</span>
                          <span className="text-muted-foreground">{type.pct}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className={`${type.color} h-2.5 rounded-full transition-all`} style={{ width: `${type.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    Majority new-build projects, with significant retrofit and expansion capability.
                  </p>
                </CardContent>
              </Card>

              {/* Scale Breakdown */}
              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                    <Bot className="h-5 w-5 text-accent" />
                    System Scale Distribution
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4">Robots per project across portfolio</p>
                  <div className="space-y-4">
                    {scaleBreakdown.map((scale) => (
                      <div key={scale.range} className="flex items-center gap-4">
                        <div className="w-24 text-sm font-medium shrink-0">{scale.range}</div>
                        <div className="flex-1">
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div className="bg-accent h-2.5 rounded-full transition-all" style={{ width: `${scale.pct}%` }} />
                          </div>
                        </div>
                        <div className="w-10 text-right text-sm text-muted-foreground">{scale.pct}%</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    Flexible integration capability from compact cells to complete paint shop turnkey delivery.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}