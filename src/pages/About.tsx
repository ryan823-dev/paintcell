import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { ChevronRight, Award, Users, Globe, Wrench } from "lucide-react";

const stats = [
  { value: "500+", label: "Systems Deployed" },
  { value: "25+", label: "Years Experience" },
  { value: "30+", label: "Countries Served" },
  { value: "98%", label: "Customer Satisfaction" },
];

const values = [
  {
    icon: Award,
    title: "Engineering Excellence",
    description: "Every solution is designed by experienced engineers who understand both paint technology and industrial automation.",
  },
  {
    icon: Users,
    title: "Customer Partnership",
    description: "We work alongside your team from concept through commissioning, ensuring solutions that fit your real-world operations.",
  },
  {
    icon: Globe,
    title: "Global Capability",
    description: "Local support with global reach. Our network ensures you have access to expertise wherever you operate.",
  },
  {
    icon: Wrench,
    title: "Lifecycle Support",
    description: "From spare parts to system upgrades, we support your investment through its entire operational life.",
  },
];

export default function About() {
  return (
    <>
      {/* Header — light */}
      <section className="bg-muted border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              About PaintCell
            </h1>
            <p className="text-lg text-muted-foreground">
              Specialists in robotic spray painting automation with decades of experience 
              solving complex painting challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <Section variant="default">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Story */}
      <Section variant="muted">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Our Story
          </h2>
          <div className="prose prose-lg text-muted-foreground space-y-4">
            <p>
              PaintCell was founded on a simple observation: industrial spray painting is 
              too important to leave to inconsistent manual processes, yet too complex for 
              generic automation solutions.
            </p>
            <p>
              Our team brings together expertise in robotics, paint technology, and 
              manufacturing operations. We've worked with customers across automotive, 
              aerospace, electronics, and heavy industry—learning from every project and 
              continuously improving our solutions.
            </p>
            <p>
              Today, we offer a focused portfolio of robotic painting workstations that 
              deliver the quality consistency, throughput, and operational reliability 
              that modern manufacturing demands.
            </p>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section variant="default">
        <SectionHeader
          title="What We Stand For"
          description="The principles that guide how we work with customers and develop solutions."
        />
        <div className="grid md:grid-cols-2 gap-6">
          {values.map((value) => (
            <div key={value.title} className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <value.icon className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA — light */}
      <section className="bg-muted border-t border-border">
        <div className="container-wide py-16 md:py-24">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Let's Discuss Your Project
            </h2>
            <p className="text-muted-foreground mb-6">
              Start with our configurator to tell us about your painting requirements. 
              Our engineering team will review and follow up to explore solutions.
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
            >
              <Link to="/quote" className="flex items-center gap-2">
                Configure Paint Cell
                <ChevronRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
