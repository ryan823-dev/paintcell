import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { TopicClusterDirectory } from "@/components/seo/TopicClusterDirectory";
import { TopicClusterNavigator } from "@/components/seo/TopicClusterNavigator";

const exploreLinks = {
  solutions: [
    { label: "Industrial Painting Systems", href: "/solutions" },
    { label: "Robotic Paint Automation System", href: "/solutions/robotic-painting-system" },
    { label: "Paint Booth Automation", href: "/solutions/paint-booth-automation" },
    { label: "Panel Coating and Finishing Systems", href: "/solutions/panel-coating-finishing-systems" },
  ],
  industries: [
    { label: "Automotive Painting", href: "/industries/automotive-painting" },
    { label: "Appliance Coating", href: "/industries/appliance-coating" },
    { label: "Metal Parts Finishing", href: "/industries/metal-parts-finishing" },
    { label: "Furniture Coating Systems", href: "/industries/furniture-woodwork" },
  ],
  knowledge: [
    { label: "Manual vs Semi-Automatic vs Robotic Painting Systems", href: "/resources/knowledge/manual-vs-semi-auto-vs-robotic-painting-systems" },
    { label: "When Does a Robotic Paint Automation System Make Sense?", href: "/resources/knowledge/when-robotic-paint-automation-makes-sense" },
    { label: "ATEX Zone Classification for Spray Painting Booths", href: "/resources/knowledge/atex-spray-painting-booth" },
    { label: "Paint Booth Design Basics", href: "/resources/knowledge/paint-booth-design-basics" },
  ],
};

interface ExploreLinksProps {
  currentPath?: string;
}

export function ExploreLinks({ currentPath }: ExploreLinksProps) {
  const filterOut = (links: typeof exploreLinks.solutions) =>
    links.filter((link) => link.href !== currentPath);

  const solutions = filterOut(exploreLinks.solutions);
  const industries = filterOut(exploreLinks.industries);
  const knowledge = filterOut(exploreLinks.knowledge);

  return (
    <section className="border-t border-white/10 section-dark">
      <div className="container-wide py-12 md:py-16">
        <TopicClusterNavigator currentPath={currentPath} variant="dark" />
        <div className="mt-8">
          <TopicClusterDirectory variant="dark" />
        </div>
        <h2 className="text-lg font-semibold mb-6 text-white">Explore</h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {solutions.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3">Solutions</h3>
              <ul className="space-y-2">
                {solutions.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-sm text-accent hover:text-accent/80 underline underline-offset-2">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {industries.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3">Industries</h3>
              <ul className="space-y-2">
                {industries.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-sm text-accent hover:text-accent/80 underline underline-offset-2">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {knowledge.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3">Knowledge</h3>
              <ul className="space-y-2">
                {knowledge.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-sm text-accent hover:text-accent/80 underline underline-offset-2">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
