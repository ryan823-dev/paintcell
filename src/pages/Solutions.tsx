import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Helmet } from "react-helmet-async";
import { ChevronRight, Sparkles, Cpu, Shield, Palette, Wifi, Flame, Bot, MapPin, BarChart3, Factory, TrendingUp, Car, Wrench, Eye, AlertTriangle, Droplets, Monitor, Radio, Layers, Play } from "lucide-react";
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
    icon: AlertTriangle,
    title: "Robot Collision Detection",
    description: "Proprietary torque-sensor-based collision detection compares real-time position data against taught paths. Automatic alarm and emergency stop upon deviation, protecting both robots and workpieces.",
    advantage: "Patent-pending safety technology, zero collision damage"
  },
  {
    icon: Eye,
    title: "Vision-Based Part Recognition",
    description: "Multi-point visual inspection system identifies product model, position, and orientation before spraying. Automatic fixture alignment detection prevents mispositioned parts from entering the spray zone.",
    advantage: "Eliminate missprays, support mixed-model production"
  },
  {
    icon: Shield,
    title: "Missed-Spray & Skip Detection",
    description: "Automated missed-spray detection with alarm logging. Hanging fixture wire-break detection using micro-current sensing prevents product drops during conveyor transport.",
    advantage: "IATF 16949 compliant, batch traceability"
  },
  {
    icon: Palette,
    title: "20+ Color Fast Change System",
    description: "Sames PPH707 rotary bells with automatic purge sequence. Color change in under 3 minutes with minimal waste. Integrated Lactec and Timmer bead-dispensing systems for sealing applications.",
    advantage: "High-mix low-volume production ready"
  },
  {
    icon: Droplets,
    title: "Transparent Paint Level Monitoring",
    description: "Real-time paint liquid level monitoring with radar-based level control and dual-threshold alarms. HMI graphical display shows all tank levels with automated refill triggers.",
    advantage: "Zero-downtime paint supply, visual management"
  },
  {
    icon: Cpu,
    title: "Water-Based Paint Temperature Control",
    description: "Pipe-in-pipe thermal management maintaining ±1°C precision for water-based coatings, ensuring consistent atomization and film formation across all spray stations.",
    advantage: "Industry-leading stability for water-borne systems"
  },
  {
    icon: Wifi,
    title: "Remote Diagnostics & Programming",
    description: "RobotStudio and ShopFloor Editor remote access enables off-site troubleshooting, program optimization, and software updates. PROFINET/Ethernet dual-redundant network ensures reliable connectivity.",
    advantage: "50%+ faster fault response, minimize site visits"
  },
  {
    icon: Monitor,
    title: "MES/SCADA Integration",
    description: "Full manufacturing execution system connectivity for equipment interconnection, runtime statistics, fault logging, and production data exchange with factory-level MES/ERP platforms.",
    advantage: "Complete production traceability, data-driven decisions"
  },
  {
    icon: Layers,
    title: "Industry 4.0 & AI Intelligence",
    description: "Data acquisition and intelligent analysis platform for predictive maintenance, spray parameter optimization, and production efficiency tracking. Digital twin capability for virtual commissioning.",
    advantage: "Predictive maintenance, continuous process improvement"
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
        <title>Robotic Painting Automation Solutions — System Integration | TD</title>
        <meta name="description" content="Turnkey robotic painting system integration, paint booth automation, and spray robot deployment. Multi-brand robot support (ABB, Yaskawa, FANUC), electrostatic rotary bells, and Industry 4.0 controls." />
        <link rel="canonical" href="https://tdpaintcell.com/solutions" />
        <meta property="og:title" content="Robotic Painting Automation Solutions | TD" />
        <meta property="og:description" content="Turnkey robotic painting system integration with multi-brand robot support, electrostatic rotary bells, and Industry 4.0 controls." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tdpaintcell.com/solutions" />
        <meta property="og:image" content="https://tdpaintcell.com/images/og-social-share.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Robotic Painting Automation Solutions | TD" />
        <meta name="twitter:description" content="Turnkey robotic painting system integration with multi-brand robot support and Industry 4.0 controls." />
        <meta name="twitter:image" content="https://tdpaintcell.com/images/og-social-share.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Painting Technology Videos",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "item": {
                "@type": "VideoObject",
                "name": "ABB PixelPaint: Precision Dual-Color Robotic Spraying Technology",
                "description": "Advanced dual-color robotic painting using ABB PixelPaint technology with 20-50 micron droplet precision.",
                "thumbnailUrl": "https://img.youtube.com/vi/3BrSu1yeQ1k/maxresdefault.jpg",
                "uploadDate": "2024-01-01",
                "contentUrl": "https://www.youtube.com/watch?v=3BrSu1yeQ1k",
                "embedUrl": "https://www.youtube.com/embed/3BrSu1yeQ1k"
              }
            },
            {
              "@type": "ListItem",
              "position": 2,
              "item": {
                "@type": "VideoObject",
                "name": "How Bead System Works in Industrial Automation",
                "description": "3D animation of Timmer bead dispensing system for automotive sealing applications.",
                "thumbnailUrl": "https://img.youtube.com/vi/msv45NaSMXc/maxresdefault.jpg",
                "uploadDate": "2024-01-01",
                "contentUrl": "https://www.youtube.com/watch?v=msv45NaSMXc",
                "embedUrl": "https://www.youtube.com/embed/msv45NaSMXc"
              }
            }
          ]
        })}</script>
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
              {techFeatures.slice(0, 6).map((feature, idx) => (
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
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {techFeatures.slice(6).map((feature, idx) => (
                <Card key={idx} className="border-border bg-card hover:border-accent/30 transition-colors">
                  <CardContent className="p-5">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                      <feature.icon className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed mb-2">
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

        {/* Typical System Configurations */}
        <section className="border-b border-border bg-muted/30">

          {/* Technology in Action - Video Section */}
          <div className="container-wide py-12 md:py-16 border-b border-border">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full mb-4">
                <Play className="h-4 w-4" />
                Technology in Action
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">See Our Technology at Work</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Advanced painting automation technologies demonstrated through real equipment and 3D simulation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-xl border border-border overflow-hidden hover:border-accent/30 transition-colors">
                <div className="aspect-video relative">
                  <iframe
                    src="https://www.youtube.com/embed/3BrSu1yeQ1k"
                    title="ABB PixelPaint: Precision Dual-Color Robotic Spraying Technology"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-1">ABB PixelPaint Dual-Color Technology</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Precision dual-color robotic spraying using ABB PixelPaint technology. Multiple robots coordinate wall-mounted, floor-mounted, and inverted configurations to achieve sharp two-tone finishes with 20–50 micron droplet control.
                  </p>
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border overflow-hidden hover:border-accent/30 transition-colors">
                <div className="aspect-video relative">
                  <iframe
                    src="https://www.youtube.com/embed/msv45NaSMXc"
                    title="How Bead System Works in Industrial Automation"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-1">Timmer Bead Dispensing System</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    3D animation walkthrough of the Timmer bead dispensing system used in automotive sealing applications. Precision material delivery through automated track-guided bead application for consistent seal quality.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="container-wide py-12 md:py-16">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full mb-4">
                <Flame className="h-4 w-4" />
                System Configurations
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Proven Configuration Examples</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Real-world system architectures delivered for automotive plastic component painting applications.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="text-xs text-accent font-semibold uppercase tracking-wider mb-2">Compact Cell</div>
                  <h3 className="font-semibold text-lg mb-3">2-3-2 Configuration</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />1 robot pre-treatment (flame/plasma)</li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />2 robots primer spray</li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />3 robots topcoat spray</li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />2 robots clearcoat spray</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
                    <span className="text-accent font-medium">Typical capacity:</span> 65–90 parts/hour
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="text-xs text-accent font-semibold uppercase tracking-wider mb-2">Mid-Scale Line</div>
                  <h3 className="font-semibold text-lg mb-3">4-6-4 Dual-Color Configuration</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />4 robots pre-treatment station</li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />6 robots basecoat with dual-color capability</li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />4 robots clearcoat station</li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />Quick color change system integrated</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
                    <span className="text-accent font-medium">Typical capacity:</span> 96+ parts/hour
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="text-xs text-accent font-semibold uppercase tracking-wider mb-2">Large-Scale</div>
                  <h3 className="font-semibold text-lg mb-3">4-6-6 Full Water-Based Line</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />4 robots water-wash pre-treatment</li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />6 robots basecoat with RB1000i-WSC color changers</li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />6 robots clearcoat with CBS cleaning stations</li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />Full water-based paint temperature control</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
                    <span className="text-accent font-medium">Typical capacity:</span> 120+ parts/hour
                  </div>
                </CardContent>
              </Card>
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