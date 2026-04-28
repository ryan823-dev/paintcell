export interface GeoAuthorityEntry {
  id: string;
  question: string;
  intentStage: "research" | "evaluation" | "commercial" | "compliance";
  audience: string;
  shortAnswer: string;
  canonicalPath: string;
  relatedPaths: string[];
}

export const GEO_AUTHORITY_MAP_VERSION = "2026-04-28.two-week-seo-geo";
export const GEO_AUTHORITY_MAP_GENERATED_AT = "2026-04-28";
export const GEO_AUTHORITY_SITE_URL = "https://tdpaint.com";
export const GEO_AUTHORITY_DEFAULT_LOCALE = "en";

function normalizePath(pathname: string) {
  const normalized = `/${pathname.replace(/^\/+/, "").replace(/\/+/g, "/")}`.replace(/\/$/, "");
  return normalized === "" ? "/" : normalized;
}

export function buildGeoAuthorityUrl(pathname: string) {
  const normalizedPath = normalizePath(pathname);
  return `${GEO_AUTHORITY_SITE_URL}/${GEO_AUTHORITY_DEFAULT_LOCALE}${
    normalizedPath === "/" ? "" : normalizedPath
  }`;
}

export const geoAuthorityEntries: GeoAuthorityEntry[] = [
  {
    id: "robotic-painting-system-definition",
    question: "What is a robotic painting system?",
    intentStage: "research",
    audience: "manufacturing engineers and plant managers",
    shortAnswer:
      "A robotic painting system combines painting robots, spray technology, paint supply, booth airflow, safety controls, and commissioning into a repeatable industrial finishing process.",
    canonicalPath: "/solutions/robotic-painting-system",
    relatedPaths: [
      "/resources/topics/robotic-painting",
      "/resources/knowledge/how-to-choose-paint-robot",
      "/resources/knowledge/manual-vs-semi-auto-vs-robotic-painting-systems",
    ],
  },
  {
    id: "robotic-painting-fit",
    question: "When does robotic paint automation make sense?",
    intentStage: "evaluation",
    audience: "operations leaders comparing manual and automated finishing",
    shortAnswer:
      "Robotic paint automation usually makes sense when production has repeatable part families, quality variation, skilled labor pressure, coating waste, or throughput bottlenecks that justify engineered repeatability.",
    canonicalPath: "/resources/knowledge/when-robotic-paint-automation-makes-sense",
    relatedPaths: [
      "/resources/knowledge/manual-vs-semi-auto-vs-robotic-painting-systems",
      "/solutions/robotic-painting-system",
      "/resources/tools/roi-calculator",
    ],
  },
  {
    id: "robotic-painting-cost",
    question: "How much does a robotic painting system cost?",
    intentStage: "commercial",
    audience: "buyers preparing budget or RFQ discussions",
    shortAnswer:
      "Robotic painting system cost depends on part size, robot count, booth scope, spray technology, paint supply, safety classification, color change requirements, and integration complexity.",
    canonicalPath: "/resources/knowledge/robotic-painting-cost-guide",
    relatedPaths: [
      "/resources/tools/roi-calculator",
      "/resources/tools-templates/paint-cell-rfq-template",
      "/solutions/robotic-painting-system",
    ],
  },
  {
    id: "paint-robot-selection",
    question: "How do I choose a paint robot?",
    intentStage: "evaluation",
    audience: "engineering teams selecting robot platforms",
    shortAnswer:
      "Choose a paint robot by matching reach, payload, wrist design, explosion-proof rating, spray package, cycle time, path access, and controls integration to the real part family and booth environment.",
    canonicalPath: "/resources/knowledge/how-to-choose-paint-robot",
    relatedPaths: [
      "/resources/topics/paint-robot-selection",
      "/resources/knowledge/painting-robot-selection-guide",
      "/resources/knowledge/paint-robot-reach-vs-payload",
    ],
  },
  {
    id: "paint-booth-automation-definition",
    question: "What is paint booth automation?",
    intentStage: "research",
    audience: "buyers assessing booth upgrades and retrofit projects",
    shortAnswer:
      "Paint booth automation integrates airflow, overspray control, safety interlocks, paint process controls, and robotic spray execution so the booth can support stable finish quality and safer operation.",
    canonicalPath: "/solutions/paint-booth-automation",
    relatedPaths: [
      "/resources/topics/paint-booth-design",
      "/resources/knowledge/paint-booth-design-basics",
      "/resources/knowledge/new-paint-booth-vs-retrofit",
    ],
  },
  {
    id: "new-booth-vs-retrofit",
    question: "Should I build a new paint booth or retrofit an existing booth?",
    intentStage: "evaluation",
    audience: "plant teams planning booth automation scope",
    shortAnswer:
      "A retrofit can work when airflow, footprint, utilities, safety logic, and production access are strong enough; a new booth is usually better when the existing enclosure limits robot access, ventilation, or compliance scope.",
    canonicalPath: "/resources/knowledge/new-paint-booth-vs-retrofit",
    relatedPaths: [
      "/solutions/paint-booth-automation",
      "/resources/knowledge/paint-booth-sizing-measurements",
      "/resources/standards-compliance/ventilation-airflow",
    ],
  },
  {
    id: "atex-spray-booth",
    question: "When does a spray painting booth need ATEX-rated equipment?",
    intentStage: "compliance",
    audience: "EHS, engineering, and maintenance teams",
    shortAnswer:
      "A booth needs ATEX-rated equipment when solvent vapor or other flammable atmosphere risks create classified zones during normal operation or foreseeable upset conditions.",
    canonicalPath: "/resources/standards-compliance/atex-zone-classification-spray-painting-booth",
    relatedPaths: [
      "/resources/topics/atex-spray-painting-booth",
      "/resources/knowledge/zone-1-vs-zone-2-spray-painting-booth",
      "/resources/standards-compliance/voc-solvent-handling",
    ],
  },
  {
    id: "manual-semi-auto-robotic",
    question: "What is the difference between manual, semi-automatic, and robotic painting systems?",
    intentStage: "evaluation",
    audience: "buyers choosing an automation level",
    shortAnswer:
      "Manual systems maximize flexibility, semi-automatic systems stabilize repeated motions, and robotic systems provide the strongest repeatability, data control, and labor reduction for stable part families.",
    canonicalPath: "/resources/knowledge/manual-vs-semi-auto-vs-robotic-painting-systems",
    relatedPaths: [
      "/resources/knowledge/when-robotic-paint-automation-makes-sense",
      "/solutions/robotic-painting-system",
      "/resources/faq/what-parts-are-suitable-for-robotic-painting",
    ],
  },
  {
    id: "metal-parts-finishing",
    question: "How should metal parts finishing be automated?",
    intentStage: "evaluation",
    audience: "fabricators and industrial component manufacturers",
    shortAnswer:
      "Metal parts finishing should be automated around part family grouping, surface preparation, film build targets, corrosion protection, booth airflow, and spray method selection.",
    canonicalPath: "/industries/metal-parts-finishing",
    relatedPaths: [
      "/resources/topics/metal-parts-finishing",
      "/resources/knowledge/metal-parts-finishing-guide",
      "/solutions/robotic-painting-system",
    ],
  },
  {
    id: "furniture-coating-system",
    question: "What is the best coating system for furniture panels and wood components?",
    intentStage: "evaluation",
    audience: "furniture and panel manufacturers",
    shortAnswer:
      "The best furniture coating system depends on panel geometry, finish quality target, throughput, edge coverage, changeover frequency, and whether roller, reciprocator, robotic spray, or a hybrid line fits the product mix.",
    canonicalPath: "/industries/furniture-woodwork",
    relatedPaths: [
      "/resources/topics/furniture-coating",
      "/resources/knowledge/furniture-coating-systems-roller-vs-spray-vs-robotic",
      "/solutions/panel-coating-finishing-systems",
    ],
  },
  {
    id: "paint-defects",
    question: "How can robotic painting reduce coating defects?",
    intentStage: "research",
    audience: "quality engineers and production managers",
    shortAnswer:
      "Robotic painting reduces coating defects by controlling gun distance, spray angle, speed, overlap, recipe settings, booth conditions, and repeatable part presentation.",
    canonicalPath: "/resources/knowledge/paint-defects-guide",
    relatedPaths: [
      "/resources/knowledge/robot-path-optimization",
      "/resources/glossary/film-build",
      "/resources/glossary/overspray",
    ],
  },
  {
    id: "rfq-preparation",
    question: "What information is needed before requesting a robotic painting quote?",
    intentStage: "commercial",
    audience: "buyers preparing RFQ packages",
    shortAnswer:
      "A useful RFQ includes part drawings or photos, part dimensions, production volume, paint type, finish target, current defects, booth constraints, utilities, safety requirements, and desired automation level.",
    canonicalPath: "/resources/tools-templates/paint-cell-rfq-template",
    relatedPaths: [
      "/quote",
      "/resources/tools-templates/feasibility-checklist",
      "/resources/tools-templates/site-readiness-checklist",
    ],
  },
];

export function getPrimaryGeoAuthorityEntry(currentPath: string): GeoAuthorityEntry | null {
  const normalizedPath = normalizePath(currentPath);
  return geoAuthorityEntries.find((entry) => entry.canonicalPath === normalizedPath) ?? null;
}

export function getGeoAuthorityEntriesForPath(currentPath: string, limit = 4): GeoAuthorityEntry[] {
  const normalizedPath = normalizePath(currentPath);
  const primaryEntries = geoAuthorityEntries.filter((entry) => entry.canonicalPath === normalizedPath);
  const relatedEntries = geoAuthorityEntries.filter(
    (entry) => entry.canonicalPath !== normalizedPath && entry.relatedPaths.includes(normalizedPath),
  );

  return [...primaryEntries, ...relatedEntries].slice(0, limit);
}

export function buildGeoAuthorityMapPayload() {
  return {
    version: GEO_AUTHORITY_MAP_VERSION,
    generatedAt: GEO_AUTHORITY_MAP_GENERATED_AT,
    site: GEO_AUTHORITY_SITE_URL,
    defaultLocale: GEO_AUTHORITY_DEFAULT_LOCALE,
    purpose:
      "Question-to-authority routing for search engines, AI answer engines, internal linking, and the PaintCell presales assistant.",
    entries: geoAuthorityEntries.map((entry) => ({
      ...entry,
      canonicalUrl: buildGeoAuthorityUrl(entry.canonicalPath),
      relatedUrls: entry.relatedPaths.map((pathname) => buildGeoAuthorityUrl(pathname)),
    })),
  };
}
