import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { ChevronRight, ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n";

export default function CaseStudies() {
  const { t } = useI18n();
  const cs = t.caseStudies || {};

  const caseStudies = [
    {
      id: 1, title: cs.study1Title || "Automotive Tier 1 Supplier", industry: cs.study1Industry || "Automotive",
      challenge: cs.study1Challenge || "", solution: cs.study1Solution || "",
      outcomes: [cs.study1Outcome1 || "", cs.study1Outcome2 || "", cs.study1Outcome3 || "", cs.study1Outcome4 || ""],
    },
    {
      id: 2, title: cs.study2Title || "Heavy Equipment Manufacturer", industry: cs.study2Industry || "Industrial",
      challenge: cs.study2Challenge || "", solution: cs.study2Solution || "",
      outcomes: [cs.study2Outcome1 || "", cs.study2Outcome2 || "", cs.study2Outcome3 || "", cs.study2Outcome4 || ""],
    },
    {
      id: 3, title: cs.study3Title || "Consumer Electronics Contract Manufacturer", industry: cs.study3Industry || "Electronics",
      challenge: cs.study3Challenge || "", solution: cs.study3Solution || "",
      outcomes: [cs.study3Outcome1 || "", cs.study3Outcome2 || "", cs.study3Outcome3 || "", cs.study3Outcome4 || ""],
    },
    {
      id: 4, title: cs.study4Title || "Aerospace Component Supplier", industry: cs.study4Industry || "Aerospace",
      challenge: cs.study4Challenge || "", solution: cs.study4Solution || "",
      outcomes: [cs.study4Outcome1 || "", cs.study4Outcome2 || "", cs.study4Outcome3 || "", cs.study4Outcome4 || ""],
    },
  ];

  return (
    <>
      <section className="bg-muted border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{cs.title || "Case Studies"}</h1>
            <p className="text-lg text-muted-foreground">{cs.subtitle || ""}</p>
          </div>
        </div>
      </section>

      <Section variant="default">
        <div className="space-y-8">
          {caseStudies.map((study) => (
            <div key={study.id} className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full">{study.industry}</span>
                  <h2 className="text-2xl font-bold">{study.title}</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-destructive" />
                      {cs.challenge || "Challenge"}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{study.challenge}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent" />
                      {cs.solution || "Solution"}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{study.solution}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent" />
                      {cs.outcomes || "Outcomes"}
                    </h3>
                    <ul className="space-y-1">
                      {study.outcomes.map((outcome, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <ArrowRight className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section variant="muted">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{cs.ctaTitle || "See How Automation Applies to Your Operation"}</h2>
          <p className="text-muted-foreground mb-6">{cs.ctaDesc || ""}</p>
          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link to="/quote" className="flex items-center gap-2">
              {t.about?.configurePaintCell || "Configure Paint Cell"}
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}