import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Helmet } from "react-helmet-async";
import { ChevronRight, Clock, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { industries } from "@/data/industryData";
import { useI18n } from "@/i18n";

const industryOrder = [
  "automotive-painting",
  "metal-parts-finishing",
  "appliance-coating",
  "battery-coating",
  "medical-device-coating",
  "construction-machinery",
  "hardware-sanitary",
  "furniture-woodwork",
  "aerospace-defense",
  "plastics-composites",
];

export default function Industries() {
  const { t } = useI18n();

  return (
    <>
      <Helmet>
        <title>Industry Solutions — Robotic Painting Automation | TD</title>
        <meta name="description" content="Explore robotic spray painting automation solutions by industry. Automotive, metal parts, appliances, and more." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <section className="hero-gradient border-b border-white/10">
          <div className="container-wide py-12 md:py-20">
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full border border-accent/40 bg-accent/20 text-accent text-[11px] font-semibold tracking-wider uppercase">
              <Sparkles className="h-3 w-3" />
              {t.industries.badge}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold mb-4 leading-tight text-white">
              {t.industries.title}
            </h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl">
              {t.industries.subtitle}
            </p>
          </div>
        </section>

        <section>
          <div className="container-wide py-12 md:py-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {industryOrder.map((slug) => {
                const data = industries[slug];
                if (!data) return null;
                const isComingSoon = data.comingSoon;

                return (
                  <Card
                    key={slug}
                    className={`border-border bg-card transition-all ${
                      isComingSoon ? "opacity-60" : "hover:border-accent/30 hover:shadow-md"
                    }`}
                  >
                    <CardContent className="p-0">
                      {data.heroImage && (
                        <div className="h-40 overflow-hidden rounded-t-lg">
                          <img src={data.heroImage} alt={data.industryLabel} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                      )}
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <h2 className="font-semibold text-base">{data.industryLabel}</h2>
                          {isComingSoon && (
                            <Badge variant="outline" className="text-[10px] gap-1 text-muted-foreground border-muted-foreground/30">
                              <Clock className="h-2.5 w-2.5" />
                              {t.industries.comingSoon}
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                          {data.heroSubtitle}
                        </p>
                        {isComingSoon ? (
                          <span className="text-xs text-muted-foreground">{t.industries.comingSoonDesc}</span>
                        ) : (
                          <Link
                            to={`/industries/${slug}`}
                            className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                          >
                            {t.industries.exploreSolutions}
                            <ChevronRight className="h-3.5 w-3.5" />
                          </Link>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
