import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Helmet } from "react-helmet-async";
import { ChevronRight, Sparkles, Cpu, Shield, Palette, Wifi, Flame, Bot } from "lucide-react";
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
      </div>
    </>
  );
}