export interface DynamicArticlePrimaryLink {
  href: string;
  intro: string;
  label: string;
}

export interface DynamicArticleOverride {
  metaTitle?: string;
  primaryLink?: DynamicArticlePrimaryLink;
  title: string;
}

export const dynamicArticleRedirects = {
  "atex-spray-painting-booth-guide": "/resources/standards-compliance/atex-zone-classification-spray-painting-booth",
  "robot-paint-booth": "/solutions/paint-booth-automation",
  "robotic-painting-systems-guide": "/solutions/robotic-painting-system",
} as const;

export const dynamicArticleRedirectSlugs = new Set<string>(Object.keys(dynamicArticleRedirects));

export const dynamicArticleOverrides: Record<string, DynamicArticleOverride> = {
  "how-robotic-painting-works": {
    title: "How Robotic Painting Works in a Production Cell",
    primaryLink: {
      href: "/solutions/robotic-painting-system",
      intro: "If you are moving from process basics into project scope, start with the",
      label: "robotic paint automation system",
    },
  },
  "how-to-choose-a-spray-booth": {
    title: "How to Choose a Spray Booth",
    metaTitle: "How to Choose a Spray Booth | Layout, Airflow and Compliance Fit",
    primaryLink: {
      href: "/solutions/paint-booth-automation",
      intro: "If the project is already moving into implementation scope, start with",
      label: "paint booth automation",
    },
  },
  "industrial-coating-automation-guide": {
    title: "Industrial Coating Automation Guide",
    metaTitle: "Industrial Coating Automation Guide | Where Automation Fits in Manufacturing",
    primaryLink: {
      href: "/solutions",
      intro: "If you are comparing commercial solution scope, start with",
      label: "industrial painting systems",
    },
  },
  "industrial-coating-system": {
    title: "Industrial Coating System Guide",
    metaTitle: "Industrial Coating System Guide | Types, Layouts and Selection Questions",
    primaryLink: {
      href: "/solutions",
      intro: "If you are evaluating full solution scope, start with",
      label: "industrial painting systems",
    },
  },
  "manual-vs-robotic-painting": {
    title: "Manual vs Robotic Painting",
    metaTitle: "Manual vs Robotic Painting | Quality, Throughput and Process Fit",
    primaryLink: {
      href: "/solutions/robotic-painting-system",
      intro: "If the line is close to automation-ready, review the",
      label: "robotic paint automation system",
    },
  },
  "paint-booth-design-guide": {
    title: "Industrial Paint Booth Design Guide",
    metaTitle: "Industrial Paint Booth Design Guide | Layout, Airflow and Retrofit Checks",
    primaryLink: {
      href: "/solutions/paint-booth-automation",
      intro: "When layout questions start turning into delivery scope, move next to",
      label: "paint booth automation",
    },
  },
  "paint-booth-furniture": {
    title: "Paint Booth Requirements for Furniture Finishing Lines",
    primaryLink: {
      href: "/industries/furniture-woodwork",
      intro: "If the wider project is still being scoped, start with the",
      label: "furniture coating systems",
    },
  },
  "robotic-painting-system-design": {
    title: "Robotic Painting System Design Guide",
    metaTitle: "Robotic Painting System Design Guide | Cell Layout, Airflow and Integration",
    primaryLink: {
      href: "/solutions/robotic-painting-system",
      intro: "For the main commercial solution page, start with the",
      label: "robotic paint automation system",
    },
  },
  "spray-booth-metal-parts": {
    title: "Spray Booth Setup for Metal Parts Finishing",
    primaryLink: {
      href: "/industries/metal-parts-finishing",
      intro: "If the broader project is still being qualified, start with",
      label: "metal parts finishing",
    },
  },
  "what-is-a-spray-booth": {
    title: "What Is a Spray Booth?",
    metaTitle: "What Is a Spray Booth? Airflow, Use Cases and Process Basics",
    primaryLink: {
      href: "/solutions/paint-booth-automation",
      intro: "If you are moving from definitions into real project scope, start with",
      label: "paint booth automation",
    },
  },
  "what-is-robotic-painting": {
    title: "What Is Robotic Painting?",
    metaTitle: "What Is Robotic Painting? Process Basics and Typical Applications",
    primaryLink: {
      href: "/solutions/robotic-painting-system",
      intro: "If you are evaluating a real project, start with the",
      label: "robotic paint automation system",
    },
  },
} as const;

export function getDynamicArticleRedirectTarget(slug?: string) {
  if (!slug) {
    return null;
  }

  return dynamicArticleRedirects[slug as keyof typeof dynamicArticleRedirects] ?? null;
}

export function getDynamicArticleOverride(slug?: string) {
  if (!slug) {
    return null;
  }

  return dynamicArticleOverrides[slug] ?? null;
}
