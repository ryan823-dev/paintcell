import { normalizePublicPath } from "../lib/seo";
import { companyProfile } from "../lib/siteTrust";

export interface PageMetadata {
  updatedAt: string;
  publishedAt?: string;
  authorName?: string;
  sourceBasis?: string;
}

const defaultAuthorName = companyProfile.authorTeamName;

const pageMetadata: Record<string, PageMetadata> = {
  "/": {
    updatedAt: "2026-04-16",
    authorName: defaultAuthorName,
    sourceBasis:
      "Homepage positioning reviewed against current solution pages, reference projects, and active public messaging.",
  },
  "/products": {
    updatedAt: "2026-04-16",
    authorName: defaultAuthorName,
    sourceBasis:
      "Selection guidance reviewed against current equipment families, typical integration scope, and public product coverage.",
  },
  "/solutions/robotic-painting-system": {
    updatedAt: "2026-04-16",
    authorName: defaultAuthorName,
    sourceBasis:
      "System-scope positioning reviewed against current delivery workflow, robot/booth integration scope, and feasibility inputs.",
  },
  "/industries/automotive-painting": {
    updatedAt: "2026-04-16",
    authorName: defaultAuthorName,
    sourceBasis:
      "Industry fit and delivery guidance reviewed against current automotive component references, takt ranges, and integration boundaries.",
  },
  "/resources": {
    updatedAt: "2026-04-16",
    authorName: defaultAuthorName,
    sourceBasis:
      "Resource navigation reviewed against the current topic structure, FAQ paths, glossary coverage, and solution/industry links.",
  },
  "/resources/knowledge/flame-treatment": {
    updatedAt: "2026-04-16",
    authorName: defaultAuthorName,
    sourceBasis:
      "Flame-treatment guidance reviewed against low-surface-energy plastics workflows, adhesion-risk patterns, and integrated pretreatment-plus-painting cell scope.",
  },
  "/resources/standards-compliance/ventilation-airflow": {
    updatedAt: "2026-04-16",
    authorName: defaultAuthorName,
    sourceBasis:
      "Ventilation guidance reviewed against booth airflow constraints, makeup-air behavior, overspray capture requirements, and facility-side validation needs.",
  },
  "/resources/standards-compliance/atex-zone-classification-spray-painting-booth": {
    updatedAt: "2026-04-16",
    authorName: defaultAuthorName,
    sourceBasis:
      "ATEX zoning guidance reviewed against classified-booth project scoping, ventilation assumptions, ignition-control boundaries, and retrofit-risk patterns.",
  },
  "/resources/knowledge/paint-booth-sizing-measurements": {
    updatedAt: "2026-04-16",
    authorName: defaultAuthorName,
    sourceBasis:
      "Booth-sizing guidance reviewed against part-envelope planning, robot-access clearances, airflow-path requirements, and line-footprint assumptions.",
  },
  "/resources/faq/what-parts-are-suitable-for-robotic-painting": {
    updatedAt: "2026-04-16",
    authorName: defaultAuthorName,
    sourceBasis:
      "FAQ guidance reviewed against current automation-boundary criteria, repeatability requirements, and part-family qualification logic.",
  },
  "/resources/glossary/hollow-wrist": {
    updatedAt: "2026-04-16",
    authorName: defaultAuthorName,
    sourceBasis:
      "Glossary guidance reviewed against paint-robot hose routing requirements, robot-arm design constraints, and selection practice.",
  },
  "/case-studies/qingdao-huatao": {
    updatedAt: "2026-04-16",
    authorName: defaultAuthorName,
    sourceBasis:
      "Case-study summary reviewed against TD project records, commissioning summaries, and the published project video archive.",
  },
};

export function getPageMetadata(pathname: string): PageMetadata | null {
  return pageMetadata[normalizePublicPath(pathname)] ?? null;
}

export function toDateOnly(value?: string | null): string | null {
  if (!value) {
    return null;
  }

  return value.slice(0, 10);
}
