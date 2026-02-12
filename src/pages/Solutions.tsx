import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { solutions } from "@/data/solutionData";

const solutionOrder = [
  "robotic-painting-system",
  "paint-booth-automation",
  "spray-robot-integration",
];

export default function Solutions() {
  return (
    <>
      <Helmet>
        <title>Solutions — Robotic Painting Automation | TD</title>
        <meta name="description" content="Explore TD's robotic painting automation solutions. End-to-end systems, paint booth automation, and spray robot integration for industrial manufacturing." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-20">
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent text-[11px] font-semibold tracking-wider uppercase">
              <Sparkles className="h-3 w-3" />
              Solutions
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold mb-4 leading-tight">
              Robotic painting automation solutions
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl">
              Engineered systems for every stage of painting automation — from complete turnkey cells to targeted robot integration and booth upgrades.
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
                        Learn more
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
