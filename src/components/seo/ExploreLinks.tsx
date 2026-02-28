import { LocalizedLink as Link } from "@/components/LocalizedLink";

const exploreLinks = {
  solutions: [
    { label: "Robotic Painting System Integration", href: "/solutions/robotic-painting-system" },
    { label: "Paint Booth Automation", href: "/solutions/paint-booth-automation" },
  ],
  industries: [
    { label: "Automotive Painting", href: "/industries/automotive-painting" },
    { label: "Appliance Coating", href: "/industries/appliance-coating" },
    { label: "Metal Parts Finishing", href: "/industries/metal-parts-finishing" },
  ],
  knowledge: [
    { label: "How to Choose a Paint Robot", href: "/resources/knowledge/how-to-choose-paint-robot" },
    { label: "Robotic Painting Cost Guide", href: "/resources/knowledge/robotic-painting-cost-guide" },
    { label: "Paint Booth Design Basics", href: "/resources/knowledge/paint-booth-design-basics" },
  ],
};

interface ExploreLinksProps {
  /** Current page path — links matching this will be excluded */
  currentPath?: string;
}

export function ExploreLinks({ currentPath }: ExploreLinksProps) {
  const filterOut = (links: typeof exploreLinks.solutions) =>
    links.filter((l) => l.href !== currentPath);

  const solutions = filterOut(exploreLinks.solutions);
  const industries = filterOut(exploreLinks.industries);
  const knowledge = filterOut(exploreLinks.knowledge);

  return (
    <section className="border-t border-white/10 section-dark">
      <div className="container-wide py-12 md:py-16">
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
