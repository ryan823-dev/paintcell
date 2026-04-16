export const companyProfile = {
  brandName: "TD Painting Systems",
  productName: "TDPaintCell",
  legalName: "Shanghai Tudou Technology Co., Ltd.",
  foundedYear: 2010,
  yearsExperience: 15,
  systemsDeployed: 500,
  countriesServed: 30,
  engineeringTeamSize: 38,
  majorAutomotiveProjects: 17,
  trustReviewDate: "2026-04-16",
  legalLastUpdated: "2026-04-16",
  primaryEmail: "engineering@tdpaint.com",
  responseTime: "Engineering review within 1-2 business days",
  responseFootnote: "Free initial assessment | No commitment | Engineering review within 1-2 business days",
  supportHours: "Mon-Fri, GMT+8",
  authorTeamName: "TD Engineering Team",
  headquarters: {
    display: "Shanghai, China",
    streetAddress: "4th Floor, Building 7, No. 3888 Beiqing Road",
    district: "Qingpu District",
    city: "Shanghai",
    countryCode: "CN",
  },
} as const;

export interface ResourceTrustMeta {
  authorName?: string;
  updatedAt?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  scope?: string;
  useWith?: string;
  limitations?: string;
  sourceBasis?: string;
  publisherName?: string;
  publisherLocation?: string;
  contactEmail?: string;
  sourceLinks?: Array<{
    href: string;
    label: string;
  }>;
}

function getKnowledgeTrustDefaults(): ResourceTrustMeta {
  return {
    authorName: companyProfile.authorTeamName,
    scope:
      "Engineering guidance for robotic spray painting, paint booths, paint supply systems, and production-scope decisions.",
    useWith:
      "Best used for early-stage feasibility checks, vendor comparison, scope definition, and internal project alignment.",
    limitations:
      "Final specifications still depend on coating chemistry, part family, takt, utilities, site layout, local code, and EHS review.",
    sourceBasis:
      "Based on TD engineering team experience, recurring project delivery patterns, and equipment-integration practice.",
    publisherName: companyProfile.legalName,
    publisherLocation: companyProfile.headquarters.display,
    contactEmail: companyProfile.primaryEmail,
  };
}

function getStandardsTrustDefaults(): ResourceTrustMeta {
  return {
    authorName: companyProfile.authorTeamName,
    scope:
      "Engineering interpretation of ventilation, solvent handling, grounding, and hazardous-area constraints that shape paint-cell design.",
    useWith:
      "Best used to identify validation items early and align operations, engineering, and EHS before equipment selection.",
    limitations:
      "Always confirm code interpretation, zoning, and compliance obligations with your local EHS team and jurisdiction before procurement or installation.",
    sourceBasis:
      "Compiled from TD engineering workflows and common industrial-painting compliance pathways referenced during project scoping.",
    publisherName: companyProfile.legalName,
    publisherLocation: companyProfile.headquarters.display,
    contactEmail: companyProfile.primaryEmail,
  };
}

function getGlossaryTrustDefaults(): ResourceTrustMeta {
  return {
    authorName: companyProfile.authorTeamName,
    scope:
      "Reference definitions for paint-cell terminology used in feasibility reviews, equipment selection, process setup, and production planning.",
    useWith:
      "Best used to create shared vocabulary across engineering, purchasing, operations, integrators, and external suppliers.",
    limitations:
      "Definitions do not replace equipment datasheets, coating TDS/SDS documents, or site-specific compliance review.",
    sourceBasis:
      "Compiled from TD engineering terminology, project scoping language, and equipment-integration workflows.",
    publisherName: companyProfile.legalName,
    publisherLocation: companyProfile.headquarters.display,
    contactEmail: companyProfile.primaryEmail,
  };
}

function getToolsTrustDefaults(): ResourceTrustMeta {
  return {
    authorName: companyProfile.authorTeamName,
    scope:
      "Planning tools and templates for feasibility, RFQ preparation, site readiness review, and investment screening.",
    useWith:
      "Best used to surface constraints early and align engineering, operations, procurement, and management before detailed design.",
    limitations:
      "Outputs are reference-only and should be validated through detailed process review, layout work, coating trials, and commercial clarification.",
    sourceBasis:
      "Assumptions reflect typical TD pre-engineering workflows, scope reviews, and project planning ranges.",
    publisherName: companyProfile.legalName,
    publisherLocation: companyProfile.headquarters.display,
    contactEmail: companyProfile.primaryEmail,
  };
}

function getCaseStudyTrustDefaults(): ResourceTrustMeta {
  return {
    authorName: companyProfile.authorTeamName,
    scope:
      "Project reference material describing delivered system scope, equipment choices, layout logic, and observed production outcomes.",
    useWith:
      "Best used to compare application fit, delivery model, equipment stack, and project scale against your own line requirements.",
    limitations:
      "Every project differs by part geometry, coating stack, takt target, utilities, customer standards, and facility conditions.",
    sourceBasis:
      "Compiled from TD project records, commissioning summaries, and published customer reference material.",
    publisherName: companyProfile.legalName,
    publisherLocation: companyProfile.headquarters.display,
    contactEmail: companyProfile.primaryEmail,
  };
}

function getGenericTrustDefaults(): ResourceTrustMeta {
  return {
    authorName: companyProfile.authorTeamName,
    scope:
      "Engineering-oriented reference content for industrial coating, robotic painting, and related project planning.",
    useWith:
      "Best used to frame project discussions, compare options, and identify validation items before detailed implementation work starts.",
    limitations:
      "Final engineering decisions should be confirmed against the real line, coating data, local requirements, and customer acceptance criteria.",
    sourceBasis:
      "Built from TD engineering workflows, recurring project questions, and industrial coating delivery experience.",
    publisherName: companyProfile.legalName,
    publisherLocation: companyProfile.headquarters.display,
    contactEmail: companyProfile.primaryEmail,
  };
}

export function getResourceTrustDefaults(pathname: string): ResourceTrustMeta {
  if (pathname.startsWith("/case-studies")) {
    return getCaseStudyTrustDefaults();
  }

  if (pathname.startsWith("/resources/standards-compliance")) {
    return getStandardsTrustDefaults();
  }

  if (pathname.startsWith("/resources/glossary")) {
    return getGlossaryTrustDefaults();
  }

  if (pathname.startsWith("/resources/tools")) {
    return getToolsTrustDefaults();
  }

  if (pathname.startsWith("/resources")) {
    return getKnowledgeTrustDefaults();
  }

  return getGenericTrustDefaults();
}
