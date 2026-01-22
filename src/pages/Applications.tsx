import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { ChevronRight, Car, Cpu, Building2, Plane, Truck, Package } from "lucide-react";

const applications = [
  {
    icon: Car,
    title: "Automotive Components",
    description: "High-volume coating of body panels, trim, and structural components with Class A finish requirements.",
    challenges: [
      "Complex geometries requiring multi-angle spray",
      "High cosmetic standards with zero tolerance for defects",
      "Takt-time constraints in synchronized production",
    ],
    whyRobotic: "Robotic coating ensures consistent film build and surface finish across thousands of parts while maintaining cycle time targets.",
  },
  {
    icon: Cpu,
    title: "Electronics & Appliances",
    description: "Precision coating of housings, enclosures, and consumer product components.",
    challenges: [
      "Mixed materials (metal and plastic) on same line",
      "Frequent color and product changeovers",
      "EMI shielding and functional coating requirements",
    ],
    whyRobotic: "Flexible robot programming handles part variety while recipe management ensures coating specification compliance.",
  },
  {
    icon: Building2,
    title: "Industrial Equipment",
    description: "Protective and decorative coating of machinery, enclosures, and heavy equipment.",
    challenges: [
      "Large part dimensions requiring extended reach",
      "Thick coating builds for corrosion protection",
      "Batch production with part-to-part variation",
    ],
    whyRobotic: "6-axis robots with high payload capacity handle large parts with consistent coverage in all orientations.",
  },
  {
    icon: Plane,
    title: "Aerospace Components",
    description: "Specialized coatings for structural and interior aerospace parts.",
    challenges: [
      "Stringent traceability and documentation requirements",
      "Exotic materials and precise coating specifications",
      "Low volume with high part value",
    ],
    whyRobotic: "Process control and data logging ensure full compliance while robotic precision minimizes rework on high-value parts.",
  },
  {
    icon: Truck,
    title: "Commercial Vehicles",
    description: "Coating of truck bodies, trailers, and construction equipment components.",
    challenges: [
      "Very large part sizes",
      "Outdoor exposure durability requirements",
      "Mixed production with custom configurations",
    ],
    whyRobotic: "Gantry or rail-mounted robots extend reach for oversized parts while maintaining coating quality standards.",
  },
  {
    icon: Package,
    title: "General Manufacturing",
    description: "Broad category covering metal fabrication, furniture, and consumer goods.",
    challenges: [
      "High product mix with varying batch sizes",
      "Labor availability and training challenges",
      "Inconsistent quality from manual processes",
    ],
    whyRobotic: "Flexible automation handles product variety while providing consistent quality independent of operator skill.",
  },
];

export default function Applications() {
  return (
    <>
      {/* Header */}
      <section className="hero-gradient relative">
        <div className="absolute inset-0 industrial-pattern opacity-30" />
        <div className="container-wide relative py-12 md:py-16">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Applications
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Robotic spray coating solutions across industries. Each application presents unique 
              challenges that industrial automation is engineered to solve.
            </p>
          </div>
        </div>
      </section>

      {/* Applications Grid */}
      <Section variant="default">
        <div className="space-y-8">
          {applications.map((app, index) => (
            <div
              key={app.title}
              className={`bg-card rounded-xl border border-border overflow-hidden ${
                index % 2 === 0 ? "" : "md:flex-row-reverse"
              }`}
            >
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <app.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">{app.title}</h2>
                    <p className="text-muted-foreground">{app.description}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Typical Challenges</h3>
                    <ul className="space-y-2">
                      {app.challenges.map((challenge, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Why Robotic Coating</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{app.whyRobotic}</p>
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
            Have a Specific Application in Mind?
          </h2>
          <p className="text-muted-foreground mb-6">
            Our configurator helps you define your requirements regardless of industry. 
            Start by answering a few questions about your coating needs.
          </p>
          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link to="/quote" className="flex items-center gap-2">
              Configure Your Workstation
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
