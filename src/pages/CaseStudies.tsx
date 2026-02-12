import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { ChevronRight, ArrowRight } from "lucide-react";

const caseStudies = [
  {
    id: 1,
    title: "Automotive Tier 1 Supplier",
    industry: "Automotive",
    challenge: "Manual spray booth struggling with Class A finish requirements and increasing production demands. Reject rate at 8% with significant rework labor.",
    solution: "Deployed fully automatic paint cell with dual robot configuration, electrostatic spray system, and integrated quality inspection.",
    outcomes: ["Reject rate reduced to 1.2%", "Throughput increased 40%", "Rework labor eliminated", "ROI achieved in 18 months"],
  },
  {
    id: 2,
    title: "Heavy Equipment Manufacturer",
    challenge: "Large parts requiring thick protective paint. Manual process led to inconsistent film build and paint failures in field.",
    industry: "Industrial",
    solution: "Custom cell design with rail-mounted robot for extended reach. Recipe-based control ensures consistent paint thickness across all part geometries.",
    outcomes: ["Film build variation reduced 75%", "Field warranty claims down 60%", "Operator safety significantly improved", "Material waste reduced 25%"],
  },
  {
    id: 3,
    title: "Consumer Electronics Contract Manufacturer",
    industry: "Electronics",
    challenge: "High product mix with daily color changes. Previous system required 2-hour changeovers and generated significant purge waste.",
    solution: "Flexible cell with automatic color change system and quick-clean gun technology. Recipe management handles 50+ part numbers.",
    outcomes: ["Color changeover under 15 minutes", "Purge waste reduced 80%", "Same cell handles all product variants", "Production schedule flexibility improved"],
  },
  {
    id: 4,
    title: "Aerospace Component Supplier",
    industry: "Aerospace",
    challenge: "Specialized paints on high-value parts with stringent documentation requirements. Manual process couldn't meet traceability standards.",
    solution: "Semi-automatic cell with comprehensive data logging, barcode tracking, and automatic process verification.",
    outcomes: ["Full compliance with AS9100 requirements", "Zero documentation non-conformances", "Paint consistency improved significantly", "Audit preparation time reduced 90%"],
  },
];

export default function CaseStudies() {
  return (
    <>
      {/* Header — light */}
      <section className="bg-muted border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Case Studies
            </h1>
            <p className="text-lg text-muted-foreground">
              Real implementations demonstrating measurable improvements in quality, 
              throughput, and operational efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <Section variant="default">
        <div className="space-y-8">
          {caseStudies.map((study) => (
            <div key={study.id} className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full">
                    {study.industry}
                  </span>
                  <h2 className="text-2xl font-bold">{study.title}</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-destructive" />
                      Challenge
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{study.challenge}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent" />
                      Solution
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{study.solution}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent" />
                      Outcomes
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

      {/* CTA */}
      <Section variant="muted">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            See How Automation Applies to Your Operation
          </h2>
          <p className="text-muted-foreground mb-6">
            Every painting challenge is unique. Our configurator helps you define your specific 
            requirements so we can identify the right solution approach.
          </p>
          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link to="/quote" className="flex items-center gap-2">
              Configure Paint Cell
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
