import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { TopicClusterDirectory } from "@/components/seo/TopicClusterDirectory";
import { TopicClusterNavigator } from "@/components/seo/TopicClusterNavigator";
import { solutions } from "@/data/solutionData";
import { getTopicClusterByPath } from "@/data/topicClusters";
import { normalizePublicPath } from "@/lib/seo";

interface ExploreLinkItem {
  label: string;
  href: string;
  description: string;
}

interface ExploreSections {
  solutions: ExploreLinkItem[];
  industries: ExploreLinkItem[];
  knowledge: ExploreLinkItem[];
}

interface ExploreLinksProps {
  currentPath?: string;
}

type PageType = "home" | "solution" | "industry" | "resource" | "other";

const homeSections: ExploreSections = {
  solutions: [
    {
      label: "Scope a full robotic painting cell",
      href: "/solutions/robotic-painting-system",
      description: "Start with the main commercial page for robot, booth, paint supply, and controls scope.",
    },
    {
      label: "Plan booth airflow and retrofit scope",
      href: "/solutions/paint-booth-automation",
      description: "Useful when the line question is really about booth limits, airflow, and integration boundaries.",
    },
    {
      label: "Move from robot interest into integration work",
      href: "/solutions/paint-robot-integration",
      description: "A narrower page for teams already evaluating robot deployment and programming scope.",
    },
    {
      label: "Compare panel-oriented finishing layouts",
      href: "/solutions/panel-coating-finishing-systems",
      description: "Commercial entry point for flat-part, panel, and furniture-oriented line concepts.",
    },
  ],
  industries: [
    {
      label: "Review metal parts finishing projects",
      href: "/industries/metal-parts-finishing",
      description: "Strongest industry hub for mixed-model industrial finishing and robotic paint cells.",
    },
    {
      label: "See plastics and composite coating lines",
      href: "/industries/automotive-exterior-parts",
      description: "Best fit for adhesion-critical programs involving plastics, flame treatment, and surface prep.",
    },
    {
      label: "Explore furniture and wood coating systems",
      href: "/industries/furniture-woodwork",
      description: "Industry path for cabinet, furniture, and panel-finishing programs.",
    },
    {
      label: "Check automotive painting programs",
      href: "/industries/automotive-painting",
      description: "Use this when the finish target is closer to high-volume automotive quality and throughput.",
    },
  ],
  knowledge: [
    {
      label: "Decide when robotic paint automation fits",
      href: "/resources/knowledge/when-robotic-paint-automation-makes-sense",
      description: "Broad planning guide for separating real automation candidates from weak-fit lines.",
    },
    {
      label: "Choose the right paint robot for the job",
      href: "/resources/knowledge/how-to-choose-paint-robot",
      description: "Selection guide for reach, payload, protection level, and integration fit.",
    },
    {
      label: "Compare roller, spray, and robotic furniture paths",
      href: "/resources/knowledge/furniture-coating-systems-roller-vs-spray-vs-robotic",
      description: "Useful when broad painting intent starts narrowing into furniture or panel applications.",
    },
    {
      label: "Review booth design before locking equipment",
      href: "/resources/knowledge/paint-booth-design-basics",
      description: "Planning guide for airflow, footprint, and retrofit boundaries.",
    },
  ],
};

const defaultIndustrySections: ExploreSections = {
  solutions: [
    {
      label: "See the full robotic painting system scope",
      href: "/solutions/robotic-painting-system",
      description: "Main commercial page for the broader system boundary behind most industry projects.",
    },
    {
      label: "Review booth automation and airflow scope",
      href: "/solutions/paint-booth-automation",
      description: "Helpful when the real constraint sits in the booth, airflow, or retrofit layer.",
    },
    {
      label: "Check paint robot integration work",
      href: "/solutions/paint-robot-integration",
      description: "A narrower next step for projects already validating robot deployment details.",
    },
    {
      label: "Compare panel-style finishing architectures",
      href: "/solutions/panel-coating-finishing-systems",
      description: "Useful when the product family is repeated enough to justify a panel-oriented line concept.",
    },
  ],
  industries: [
    {
      label: "Compare against metal parts finishing",
      href: "/industries/metal-parts-finishing",
      description: "A strong benchmark for mixed-model industrial finishing requirements.",
    },
    {
      label: "Review plastics and exterior-part coating",
      href: "/industries/automotive-exterior-parts",
      description: "Good comparison when adhesion, surface prep, or substrate behavior drives the project.",
    },
    {
      label: "Look at furniture and panel programs",
      href: "/industries/furniture-woodwork",
      description: "Useful if the line has repeated flat parts or visible-surface finishing priorities.",
    },
    {
      label: "See appliance coating lines",
      href: "/industries/appliance-coating",
      description: "Helpful when color change and high-throughput visible surfaces matter more than geometry variation.",
    },
  ],
  knowledge: [
    {
      label: "Check when robotic automation really fits",
      href: "/resources/knowledge/when-robotic-paint-automation-makes-sense",
      description: "Broad fit guide for moving from industry interest into project qualification.",
    },
    {
      label: "Review booth design before layout decisions",
      href: "/resources/knowledge/paint-booth-design-basics",
      description: "Useful when airflow, footprint, and retrofit constraints shape the industry solution.",
    },
    {
      label: "Estimate robotic painting cost and payback",
      href: "/resources/knowledge/robotic-painting-cost-guide",
      description: "Commercial support page for investment range and payback framing.",
    },
    {
      label: "Translate line ambition into floor-space planning",
      href: "/resources/faq/how-much-floor-space-does-an-automated-paint-line-need",
      description: "Planning FAQ for whether the line concept still fits the real plant footprint.",
    },
  ],
};

const defaultResourceSections: ExploreSections = {
  solutions: [
    {
      label: "Map the broader robotic painting system scope",
      href: "/solutions/robotic-painting-system",
      description: "Use this when a guide or FAQ turns into a real project discussion.",
    },
    {
      label: "Connect the topic back to booth automation",
      href: "/solutions/paint-booth-automation",
      description: "Best next step when airflow, ventilation, or retrofit constraints are central.",
    },
    {
      label: "Move from research into paint robot integration",
      href: "/solutions/paint-robot-integration",
      description: "Narrower path for teams already working through robot deployment details.",
    },
    {
      label: "See panel and furniture line alternatives",
      href: "/solutions/panel-coating-finishing-systems",
      description: "Useful when flat-part flow or furniture finishing starts shaping the equipment concept.",
    },
  ],
  industries: [
    {
      label: "Review metal parts finishing programs",
      href: "/industries/metal-parts-finishing",
      description: "Commercial industry page for fabricated parts, enclosures, and mixed-model industrial work.",
    },
    {
      label: "Check plastics and composite coating lines",
      href: "/industries/automotive-exterior-parts",
      description: "Industry page for adhesion-critical exterior parts and surface-prep-heavy workflows.",
    },
    {
      label: "See furniture and wood coating systems",
      href: "/industries/furniture-woodwork",
      description: "Industry page for cabinet, furniture, and panel-focused finishing flow.",
    },
  ],
  knowledge: [
    {
      label: "Compare manual, semi-auto, and robotic paths",
      href: "/resources/knowledge/manual-vs-semi-auto-vs-robotic-painting-systems",
      description: "Broad decision guide for choosing the right automation level before solution scoping.",
    },
    {
      label: "Choose a paint robot with the right constraints",
      href: "/resources/knowledge/how-to-choose-paint-robot",
      description: "Robot-planning guide for reach, payload, protection, and maintainability.",
    },
    {
      label: "Review booth design basics next",
      href: "/resources/knowledge/paint-booth-design-basics",
      description: "Layout and airflow guide for teams whose process topic is turning into a line design question.",
    },
    {
      label: "Estimate the footprint before you over-scope",
      href: "/resources/faq/how-much-floor-space-does-an-automated-paint-line-need",
      description: "FAQ for checking whether the planned line still fits the plant reality.",
    },
  ],
};

const clusterSections: Record<string, ExploreSections> = {
  "atex-spray-painting-booth": {
    solutions: [
      {
        label: "Scope booth automation for classified spray zones",
        href: "/solutions/paint-booth-automation",
        description: "Commercial page for turning ATEX, airflow, and retrofit questions into real booth scope.",
      },
      {
        label: "See how ATEX affects the full paint cell boundary",
        href: "/solutions/robotic-painting-system",
        description: "Useful once the safety discussion starts impacting robot, controls, and commissioning scope.",
      },
    ],
    industries: [
      {
        label: "Review classified-space metal finishing lines",
        href: "/industries/metal-parts-finishing",
        description: "Industry path where solvent handling, ventilation, and mixed-part flow often meet ATEX decisions.",
      },
      {
        label: "Compare with automotive paint operations",
        href: "/industries/automotive-painting",
        description: "Helpful when booth cleanliness, throughput, and finish targets create tighter environment demands.",
      },
    ],
    knowledge: [
      {
        label: "Compare Zone 1 and Zone 2 design impact",
        href: "/resources/knowledge/zone-1-vs-zone-2-spray-painting-booth",
        description: "Decision page for what zone classification changes in real booth engineering.",
      },
      {
        label: "Review ATEX-compliant booth design steps",
        href: "/resources/knowledge/how-to-design-atex-compliant-spray-painting-booth",
        description: "Engineering guide for translating classification into physical design choices.",
      },
      {
        label: "Check grounding and static-control constraints",
        href: "/resources/standards-compliance/grounding-static-control",
        description: "Supporting safety page for ignition-risk reduction around spray operations.",
      },
    ],
  },
  "flame-treatment": {
    solutions: [
      {
        label: "Connect pretreatment to full robotic painting scope",
        href: "/solutions/robotic-painting-system",
        description: "Commercial page for systems where flame treatment must hand off cleanly into painting.",
      },
      {
        label: "Move from adhesion planning into robot integration",
        href: "/solutions/paint-robot-integration",
        description: "Useful when the pretreatment method is clear and the project is now about cell execution.",
      },
    ],
    industries: [
      {
        label: "See plastics coating lines with adhesion focus",
        href: "/industries/automotive-exterior-parts",
        description: "Industry page for bumpers, plastic housings, and composite parts where pretreatment matters.",
      },
      {
        label: "Compare with appliance exterior finishing",
        href: "/industries/appliance-coating",
        description: "Helpful when repeated visible surfaces create a different balance between adhesion and throughput.",
      },
    ],
    knowledge: [
      {
        label: "Compare flame treatment and plasma treatment",
        href: "/resources/knowledge/flame-treatment-vs-plasma-treatment",
        description: "Best next step when the team is choosing the pretreatment method itself.",
      },
      {
        label: "Decide between integrated and standalone pretreatment",
        href: "/resources/knowledge/integrated-flame-treatment-cell-vs-pretreatment-line",
        description: "Layout guide for whether treatment should live in the cell or upstream.",
      },
      {
        label: "Check which parts are automation-ready",
        href: "/resources/faq/what-parts-are-suitable-for-robotic-painting",
        description: "Useful if the adhesion discussion is expanding into a broader automation-fit decision.",
      },
    ],
  },
  "paint-booth-design": {
    solutions: [
      {
        label: "Scope booth automation around airflow and retrofit risk",
        href: "/solutions/paint-booth-automation",
        description: "Primary commercial page for booth-focused layout, controls, and ventilation decisions.",
      },
      {
        label: "See the wider robotic painting system boundary",
        href: "/solutions/robotic-painting-system",
        description: "Useful when booth design starts touching robot, paint supply, and commissioning scope too.",
      },
      {
        label: "Review robot integration after booth constraints are clear",
        href: "/solutions/paint-robot-integration",
        description: "A narrower next step if the booth direction is already fixed and robot work is next.",
      },
    ],
    industries: [
      {
        label: "Review metal parts lines that depend on booth stability",
        href: "/industries/metal-parts-finishing",
        description: "Industry path where mixed-model flow and overspray load make booth design especially visible.",
      },
      {
        label: "Compare with automotive painting environments",
        href: "/industries/automotive-painting",
        description: "Helpful when cleanliness, appearance, and production rhythm raise the booth standard.",
      },
    ],
    knowledge: [
      {
        label: "Compare downdraft, crossdraft, and side-draft paths",
        href: "/resources/knowledge/downdraft-vs-crossdraft-vs-side-draft",
        description: "Useful once the team is narrowing the booth airflow pattern.",
      },
      {
        label: "Check new booth versus retrofit logic",
        href: "/resources/knowledge/new-paint-booth-vs-retrofit",
        description: "Decision page for whether retrofit savings are still real after full scope is counted.",
      },
      {
        label: "Translate layout ambition into floor-space reality",
        href: "/resources/faq/how-much-floor-space-does-an-automated-paint-line-need",
        description: "Planning FAQ for footprint, access, and process-sequence space needs.",
      },
    ],
  },
  "paint-robot-selection": {
    solutions: [
      {
        label: "Turn robot selection into integration scope",
        href: "/solutions/paint-robot-integration",
        description: "Best next step once reach, payload, and protection questions are turning into deployment work.",
      },
      {
        label: "Compare against the full robotic painting system scope",
        href: "/solutions/robotic-painting-system",
        description: "Useful when robot choice alone no longer captures the real project boundary.",
      },
      {
        label: "Check booth constraints that affect robot choice",
        href: "/solutions/paint-booth-automation",
        description: "Helpful when service clearance, airflow, or classified-space limits are shaping the selection.",
      },
    ],
    industries: [
      {
        label: "See how robot choice plays out on metal parts lines",
        href: "/industries/metal-parts-finishing",
        description: "Industry page where mixed-model geometry and service access make selection logic practical.",
      },
      {
        label: "Review plastics programs with tighter path demands",
        href: "/industries/automotive-exterior-parts",
        description: "Industry page for exterior parts where part geometry and surface-prep flow affect robot planning.",
      },
    ],
    knowledge: [
      {
        label: "Narrow the choice through reach-versus-payload tradeoffs",
        href: "/resources/knowledge/paint-robot-reach-vs-payload",
        description: "Focused comparison for one of the first real robot-screening questions.",
      },
      {
        label: "Compare hollow-wrist and non-hollow wrist designs",
        href: "/resources/knowledge/hollow-wrist-vs-non-hollow-wrist-painting",
        description: "Useful for dress-package practicality and hose-routing risk.",
      },
      {
        label: "Use the long-form robot selection comparison",
        href: "/resources/knowledge/painting-robot-selection-guide",
        description: "Broader guide for brand, model, and application-fit comparisons.",
      },
    ],
  },
  "robotic-painting": {
    solutions: [
      {
        label: "Review the full robotic painting system scope",
        href: "/solutions/robotic-painting-system",
        description: "Primary commercial page for the broad system boundary behind most automation projects.",
      },
      {
        label: "Move into paint robot integration details",
        href: "/solutions/paint-robot-integration",
        description: "Useful once the line already knows automation makes sense and needs robot execution scope.",
      },
      {
        label: "Compare panel-oriented finishing alternatives",
        href: "/solutions/panel-coating-finishing-systems",
        description: "Helpful for flat-part or furniture programs that should not default to one generic cell concept.",
      },
    ],
    industries: [
      {
        label: "See robotic painting on metal parts lines",
        href: "/industries/metal-parts-finishing",
        description: "Strongest industry entry point for broad robotic painting commercial intent.",
      },
      {
        label: "Review robotic coating on plastics and composites",
        href: "/industries/automotive-exterior-parts",
        description: "Useful when substrate behavior and surface prep change the automation boundary.",
      },
      {
        label: "Explore robotic finishing for furniture flow",
        href: "/industries/furniture-woodwork",
        description: "Good fit for programs weighing flexible spray cells against panel-style lines.",
      },
    ],
    knowledge: [
      {
        label: "Check when robotic automation has a real business case",
        href: "/resources/knowledge/when-robotic-paint-automation-makes-sense",
        description: "Best next step for separating broad interest from credible project fit.",
      },
      {
        label: "See which parts are suitable for robotic painting",
        href: "/resources/faq/what-parts-are-suitable-for-robotic-painting",
        description: "FAQ for whether the part family is stable enough to justify automation.",
      },
      {
        label: "Estimate cost and payback before overscoping",
        href: "/resources/knowledge/robotic-painting-cost-guide",
        description: "Commercial support page for rough investment range and payback framing.",
      },
      {
        label: "Choose a paint robot after the fit is clear",
        href: "/resources/knowledge/how-to-choose-paint-robot",
        description: "Selection guide for teams moving from broad automation fit into hardware planning.",
      },
    ],
  },
  "furniture-coating": {
    solutions: [
      {
        label: "Review panel and flat-part finishing scope",
        href: "/solutions/panel-coating-finishing-systems",
        description: "Primary commercial page for panel-oriented line concepts in furniture programs.",
      },
      {
        label: "Compare against a more flexible robotic paint cell",
        href: "/solutions/robotic-painting-system",
        description: "Useful when the furniture program may need more geometry flexibility than a narrow panel line.",
      },
    ],
    industries: [
      {
        label: "See the core furniture and wood finishing page",
        href: "/industries/furniture-woodwork",
        description: "Industry entry point for cabinet, furniture, and millwork finishing projects.",
      },
      {
        label: "Compare with appliance-style visible-surface programs",
        href: "/industries/appliance-coating",
        description: "Helpful when repeated flat parts and color consistency dominate the process logic.",
      },
      {
        label: "Benchmark against metal parts finishing flow",
        href: "/industries/metal-parts-finishing",
        description: "Useful when the line mixes decorative and industrial parts or needs a contrast in handling logic.",
      },
    ],
    knowledge: [
      {
        label: "Compare roller, spray, and robotic furniture paths",
        href: "/resources/knowledge/furniture-coating-systems-roller-vs-spray-vs-robotic",
        description: "Core comparison guide for choosing the right furniture line architecture.",
      },
      {
        label: "Check whether the line footprint still works",
        href: "/resources/faq/how-much-floor-space-does-an-automated-paint-line-need",
        description: "Useful when curing and infeed space begin to constrain the furniture concept.",
      },
      {
        label: "Review finish defects visible furniture lines expose",
        href: "/resources/knowledge/paint-defects-guide",
        description: "Support page for orange peel, dry spray, and other visible-surface risks.",
      },
      {
        label: "Use HVLP guidance for visible-surface spray work",
        href: "/resources/knowledge/hvlp-spray-gun-guide",
        description: "Helpful when the furniture project is comparing spray technology rather than only line type.",
      },
    ],
  },
  "metal-parts-finishing": {
    solutions: [
      {
        label: "Review the full robotic finishing system scope",
        href: "/solutions/robotic-painting-system",
        description: "Main commercial page for robot, booth, and paint-supply scope on metal parts programs.",
      },
      {
        label: "Check booth automation for overspray-heavy lines",
        href: "/solutions/paint-booth-automation",
        description: "Useful when the metal-parts problem is really about booth stability and retrofit boundaries.",
      },
      {
        label: "Move into paint robot integration planning",
        href: "/solutions/paint-robot-integration",
        description: "A narrower next step for teams already moving from system fit into robot execution.",
      },
    ],
    industries: [
      {
        label: "Compare with heavy construction-machinery finishing",
        href: "/industries/construction-machinery",
        description: "Helpful when metal parts are trending larger, heavier, or more protective-coating-driven.",
      },
      {
        label: "Contrast with appliance-style visible surfaces",
        href: "/industries/appliance-coating",
        description: "Useful if flat parts, color change, or appearance demands are rising in the program.",
      },
    ],
    knowledge: [
      {
        label: "Use the metal parts finishing guide",
        href: "/resources/knowledge/metal-parts-finishing-guide",
        description: "Core guide for where robotic finishing fits fabricated metal-part programs best.",
      },
      {
        label: "Check defect patterns before scaling the line",
        href: "/resources/knowledge/paint-defects-guide",
        description: "Supporting page for the finish problems that often hide weak process stability.",
      },
      {
        label: "Review paint-supply constraints next",
        href: "/resources/knowledge/paint-supply-systems",
        description: "Useful when fluid handling and recipe stability are becoming the real bottleneck.",
      },
    ],
  },
};

function getPageType(pathname?: string): PageType {
  if (!pathname || pathname === "/") {
    return "home";
  }

  if (pathname.startsWith("/solutions/")) {
    return "solution";
  }

  if (pathname.startsWith("/industries/")) {
    return "industry";
  }

  if (pathname.startsWith("/resources/")) {
    return "resource";
  }

  return "other";
}

function dedupeLinks(links: ExploreLinkItem[], currentPath?: string) {
  const current = currentPath ? normalizePublicPath(currentPath) : "";
  const seen = new Set<string>();

  return links.filter((link) => {
    const normalizedHref = normalizePublicPath(link.href);

    if (normalizedHref === current || seen.has(normalizedHref)) {
      return false;
    }

    seen.add(normalizedHref);
    return true;
  });
}

function sanitizeSections(sections: ExploreSections, currentPath?: string): ExploreSections {
  return {
    solutions: dedupeLinks(sections.solutions, currentPath).slice(0, 4),
    industries: dedupeLinks(sections.industries, currentPath).slice(0, 4),
    knowledge: dedupeLinks(sections.knowledge, currentPath).slice(0, 4),
  };
}

function getSolutionFallback(pathname?: string): ExploreSections {
  const slug = pathname?.replace(/^\/solutions\//, "") || "";
  const solution = solutions[slug];

  if (!solution) {
    return defaultIndustrySections;
  }

  return {
    solutions: [
      {
        label: "Compare the broader solution mix",
        href: "/solutions",
        description: "Browse the wider solution hub if the current page still feels too narrow for the project.",
      },
      {
        label: "Review the full robotic painting system scope",
        href: "/solutions/robotic-painting-system",
        description: "Useful when the current solution sits inside a wider robot, booth, and controls boundary.",
      },
      {
        label: "Check booth automation and retrofit scope",
        href: "/solutions/paint-booth-automation",
        description: "Best next step when airflow, booth condition, or classified-space limits drive the project.",
      },
      {
        label: "See paint robot integration work",
        href: "/solutions/paint-robot-integration",
        description: "A narrower next step for robot deployment and programming work.",
      },
    ],
    industries: solution.relatedIndustries.map((link) => ({
      label: `See ${link.label.toLowerCase()} applications`,
      href: link.href,
      description: "Industry page commonly reviewed alongside this solution scope.",
    })),
    knowledge: solution.relatedKnowledge.map((link) => ({
      label: `Read ${link.label.toLowerCase()}`,
      href: link.href,
      description: "Supporting guide often used after solution scoping starts.",
    })),
  };
}

function getSectionsForPath(pathname?: string): ExploreSections {
  const normalizedPath = pathname ? normalizePublicPath(pathname) : "/";
  const cluster = getTopicClusterByPath(normalizedPath);

  if (cluster && clusterSections[cluster.slug]) {
    return sanitizeSections(clusterSections[cluster.slug], normalizedPath);
  }

  const pageType = getPageType(normalizedPath);

  if (pageType === "solution") {
    return sanitizeSections(getSolutionFallback(normalizedPath), normalizedPath);
  }

  if (pageType === "industry") {
    return sanitizeSections(defaultIndustrySections, normalizedPath);
  }

  if (pageType === "resource") {
    return sanitizeSections(defaultResourceSections, normalizedPath);
  }

  return sanitizeSections(homeSections, normalizedPath);
}

export function ExploreLinks({ currentPath }: ExploreLinksProps) {
  const normalizedPath = currentPath ? normalizePublicPath(currentPath) : "/";
  const pageType = getPageType(normalizedPath);
  const cluster = getTopicClusterByPath(normalizedPath);
  const sections = getSectionsForPath(normalizedPath);
  const showClusterNavigator = Boolean(cluster && pageType !== "resource");
  const showClusterDirectory = !cluster && pageType !== "resource";
  const sectionEntries = [
    { title: "Solutions", links: sections.solutions },
    { title: "Industries", links: sections.industries },
    { title: "Knowledge", links: sections.knowledge },
  ].filter((section) => section.links.length > 0);

  if (!showClusterNavigator && !showClusterDirectory && sectionEntries.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-white/10 section-dark">
      <div className="container-wide py-12 md:py-16">
        {showClusterNavigator ? <TopicClusterNavigator currentPath={normalizedPath} variant="dark" /> : null}
        {showClusterDirectory ? (
          <div className={showClusterNavigator ? "mt-8" : undefined}>
            <TopicClusterDirectory variant="dark" />
          </div>
        ) : null}
        {sectionEntries.length > 0 ? (
          <>
            <h2 className="mt-8 text-lg font-semibold text-white">{cluster ? "Next Paths" : "Explore"}</h2>
            <div className="mt-6 grid gap-8 sm:grid-cols-3">
              {sectionEntries.map((section) => (
                <div key={section.title}>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {section.title}
                  </h3>
                  <ul className="space-y-4">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          to={link.href}
                          className="text-sm font-medium text-accent underline underline-offset-2 hover:text-accent/80"
                        >
                          {link.label}
                        </Link>
                        <p className="mt-1 text-xs leading-relaxed text-white/55">{link.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
