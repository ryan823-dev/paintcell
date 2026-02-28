import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Section, SectionHeader } from "@/components/ui/section";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { Car, Wrench, Armchair, CircleDot, ChevronRight } from "lucide-react";

const entryPoints = [
  {
    icon: Car,
    title: "Automotive components",
    href: "/quote",
    description: "Body panels, bumpers, trim, interior parts",
  },
  {
    icon: Wrench,
    title: "Metal fabrication",
    href: "/quote",
    description: "Structural steel, enclosures, frames",
  },
  {
    icon: Armchair,
    title: "Furniture production",
    href: "/quote",
    description: "Wood, MDF, metal furniture finishing",
  },
  {
    icon: CircleDot,
    title: "Plastic parts",
    href: "/quote",
    description: "Consumer goods, housings, covers",
  },
];

export function ProjectEntryPoints() {
  return (
    <Section variant="muted">
      <FadeIn>
        <SectionHeader
          title="Project entry points"
          description="Select your industry category to initialize project parameters."
        />
      </FadeIn>
      <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {entryPoints.map((entry) => (
          <StaggerItem key={entry.title}>
            <Link
              to={entry.href}
              className="group block bg-card rounded-lg p-5 border border-border hover:border-primary/20 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-md bg-primary/8 flex items-center justify-center">
                  <entry.icon className="h-5 w-5 text-primary" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">
                {entry.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {entry.description}
              </p>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  );
}
