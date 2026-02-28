import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { solutions } from "@/data/solutionData";
import { useI18n } from "@/i18n";

const solutionOrder = [
  "robotic-painting-system",
  "paint-booth-automation",
  "spray-robot-integration",
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
      </div>
    </>
  );
}