import type { TranslationKeys } from "@/i18n/translations";
import type { Locale } from "@/i18n/types";
import { homeContent as enHomeContent } from "./en";
import type {
  HomeApplicationItem,
  HomeBenefitCard,
  HomeContent,
  HomeDeliveryStep,
  HomeReferenceCard,
  HomeSystemOverviewItem,
} from "./types";

export type { HomeContent, HomeProjectInterfaceContent, HomeStat } from "./types";

const systemOverviewTranslationKeys = [
  { titleKey: "industrialRobot", descriptionKey: "robotDesc" },
  { titleKey: "sprayEquipment", descriptionKey: "sprayDesc" },
  { titleKey: "boothVentilation", descriptionKey: "boothDesc" },
  { titleKey: "processControls", descriptionKey: "controlsDesc" },
] as const;

const automationBenefitTranslationKeys = [
  {
    key: "qualityConsistency",
    titleKey: "qualityConsistency",
    descriptionKey: "qualityDesc",
    microLineKey: "qualityMicro",
  },
  {
    key: "throughput",
    titleKey: "throughput",
    descriptionKey: "throughputDesc",
    microLineKey: "throughputMicro",
  },
  {
    key: "laborReduction",
    titleKey: "laborReduction",
    descriptionKey: "laborDesc",
    microLineKey: "laborMicro",
  },
  {
    key: "safetyCompliance",
    titleKey: "safetyCompliance",
    descriptionKey: "safetyDesc",
    microLineKey: "safetyMicro",
  },
] as const;

type SystemOverviewTranslationKey =
  (typeof systemOverviewTranslationKeys)[number]["titleKey" | "descriptionKey"];

type AutomationBenefitTranslationKey =
  (typeof automationBenefitTranslationKeys)[number]["titleKey" | "descriptionKey" | "microLineKey"];

type StaticHomeTranslationKey =
  | "sectionArchitecture"
  | "completeSolution"
  | "exploreSolutions"
  | "sectionRationale"
  | "whyRoboticPainting"
  | "sectionReference"
  | "projectReferences"
  | "viewCaseStudies";

type HomeTranslationKey =
  | SystemOverviewTranslationKey
  | AutomationBenefitTranslationKey
  | StaticHomeTranslationKey;

type HomeTranslation = Partial<Record<HomeTranslationKey, string>>;

type BenefitDetailKey =
  | "engineeringAnchor"
  | "typicalUseCase"
  | "keyConstraints"
  | "whatWeNeedToAssess";

type BenefitTranslationKey = (typeof automationBenefitTranslationKeys)[number]["key"];

type LocalizedBenefitDetail = Partial<Pick<HomeBenefitCard, BenefitDetailKey>>;

interface HomePageTranslation {
  metaTitle?: string;
  metaDescription?: string;
  ogDescription?: string;
  twitterDescription?: string;
  hero?: Partial<HomeContent["hero"]>;
  offering?: Partial<HomeContent["offering"]>;
  trackRecord?: Partial<HomeContent["trackRecord"]>;
  applications?: {
    label?: string;
    title?: string;
    items?: Array<Partial<HomeApplicationItem>>;
  };
  capabilities?: {
    label?: string;
    title?: string;
    items?: string[];
    links?: Partial<HomeContent["capabilities"]["links"]>;
  };
  systemOverview?: {
    label?: string;
    title?: string;
    ctaLabel?: string;
    items?: Array<Partial<HomeSystemOverviewItem>>;
  };
  deployment?: {
    label?: string;
    title?: string;
    note?: string;
    steps?: Array<Partial<HomeDeliveryStep>>;
  };
  automation?: {
    label?: string;
    title?: string;
    points?: string[];
    benefits?: Array<Partial<HomeBenefitCard>>;
  };
  cta?: Partial<HomeContent["cta"]>;
  references?: {
    label?: string;
    title?: string;
    cards?: Array<Partial<HomeReferenceCard>>;
  };
  eeat?: Partial<HomeContent["eeat"]>;
  faq?: {
    label?: string;
    title?: string;
    items?: HomeContent["faq"]["items"];
  };
  benefits?: Partial<Record<BenefitTranslationKey, LocalizedBenefitDetail>>;
}

function overlayItems<T>(
  fallbackItems: T[],
  localizedItems: unknown,
  mergeItem: (fallbackItem: T, localizedItem: Partial<T>) => T,
): T[] {
  if (!Array.isArray(localizedItems) || localizedItems.length !== fallbackItems.length) {
    return fallbackItems;
  }

  return fallbackItems.map((fallbackItem, index) =>
    mergeItem(fallbackItem, (localizedItems[index] as Partial<T> | undefined) || {}),
  );
}

function buildSystemOverviewItems(
  home: HomeTranslation,
  page: HomePageTranslation,
): HomeSystemOverviewItem[] {
  return enHomeContent.systemOverview.items.map((fallbackItem, index) => {
    const localizedItem = page.systemOverview?.items?.[index];
    const keyConfig = systemOverviewTranslationKeys[index];

    return {
      ...fallbackItem,
      title: localizedItem?.title || home[keyConfig.titleKey] || fallbackItem.title,
      description:
        localizedItem?.description || home[keyConfig.descriptionKey] || fallbackItem.description,
    };
  });
}

function buildAutomationBenefits(
  home: HomeTranslation,
  page: HomePageTranslation,
): HomeBenefitCard[] {
  return enHomeContent.automation.benefits.map((fallbackBenefit, index) => {
    const localizedBenefit = page.automation?.benefits?.[index];
    const keyConfig = automationBenefitTranslationKeys[index];
    const localizedDetail = page.benefits?.[keyConfig.key];

    return {
      ...fallbackBenefit,
      title: localizedBenefit?.title || home[keyConfig.titleKey] || fallbackBenefit.title,
      description:
        localizedBenefit?.description || home[keyConfig.descriptionKey] || fallbackBenefit.description,
      microLine:
        localizedBenefit?.microLine || home[keyConfig.microLineKey] || fallbackBenefit.microLine,
      engineeringAnchor:
        localizedBenefit?.engineeringAnchor ||
        localizedDetail?.engineeringAnchor ||
        fallbackBenefit.engineeringAnchor,
      typicalUseCase:
        localizedBenefit?.typicalUseCase ||
        localizedDetail?.typicalUseCase ||
        fallbackBenefit.typicalUseCase,
      keyConstraints:
        localizedBenefit?.keyConstraints ||
        localizedDetail?.keyConstraints ||
        fallbackBenefit.keyConstraints,
      whatWeNeedToAssess:
        localizedBenefit?.whatWeNeedToAssess ||
        localizedDetail?.whatWeNeedToAssess ||
        fallbackBenefit.whatWeNeedToAssess,
    };
  });
}

function pickString(
  candidate: unknown,
  fallback: string,
  invalidFragments: string[] = [],
): string {
  if (typeof candidate !== "string") {
    return fallback;
  }

  const trimmed = candidate.trim();
  if (!trimmed) {
    return fallback;
  }

  if (invalidFragments.some((fragment) => trimmed.includes(fragment))) {
    return fallback;
  }

  return trimmed;
}

function buildHomeContentFromTranslations(translation: TranslationKeys): HomeContent {
  const page = (translation.homePage as HomePageTranslation | undefined) || {};
  const home = (translation.home as HomeTranslation | undefined) || {};

  return {
    ...enHomeContent,
    seo: {
      ...enHomeContent.seo,
      metaTitle: page.metaTitle || enHomeContent.seo.metaTitle,
      metaDescription: page.metaDescription || enHomeContent.seo.metaDescription,
      ogDescription: page.ogDescription || enHomeContent.seo.ogDescription,
      twitterDescription: page.twitterDescription || enHomeContent.seo.twitterDescription,
      organizationDescription: page.metaDescription || enHomeContent.seo.organizationDescription,
      websiteName: page.metaTitle || enHomeContent.seo.websiteName,
      webpageName: page.metaTitle || enHomeContent.seo.webpageName,
    },
    hero: {
      ...enHomeContent.hero,
      badge: page.hero?.badge || enHomeContent.hero.badge,
      title: page.hero?.title || enHomeContent.hero.title,
      introPrimary: page.hero?.introPrimary || enHomeContent.hero.introPrimary,
      introSecondary: page.hero?.introSecondary || enHomeContent.hero.introSecondary,
      highlight: page.hero?.highlight || enHomeContent.hero.highlight,
    },
    offering: {
      ...enHomeContent.offering,
      label: page.offering?.label || enHomeContent.offering.label,
      title: page.offering?.title || enHomeContent.offering.title,
      description: page.offering?.description || enHomeContent.offering.description,
    },
    trackRecord: {
      label: page.trackRecord?.label || enHomeContent.trackRecord.label,
      title: page.trackRecord?.title || enHomeContent.trackRecord.title,
    },
    applications: {
      label: page.applications?.label || enHomeContent.applications.label,
      title: page.applications?.title || enHomeContent.applications.title,
      items: overlayItems<HomeApplicationItem>(
        enHomeContent.applications.items,
        page.applications?.items,
        (fallbackItem, localizedItem) => ({
          ...fallbackItem,
          title: localizedItem?.title || fallbackItem.title,
          description: localizedItem?.description || fallbackItem.description,
        }),
      ),
    },
    capabilities: {
      ...enHomeContent.capabilities,
      label: page.capabilities?.label || enHomeContent.capabilities.label,
      title: page.capabilities?.title || enHomeContent.capabilities.title,
      items: page.capabilities?.items || enHomeContent.capabilities.items,
      links: {
        ...enHomeContent.capabilities.links,
        ...(page.capabilities?.links || {}),
      },
    },
    systemOverview: {
      label:
        page.systemOverview?.label || home.sectionArchitecture || enHomeContent.systemOverview.label,
      title: page.systemOverview?.title || home.completeSolution || enHomeContent.systemOverview.title,
      ctaLabel: pickString(
        page.systemOverview?.ctaLabel || home.exploreSolutions,
        enHomeContent.systemOverview.ctaLabel,
        ["鈫"],
      ),
      items: buildSystemOverviewItems(home, page),
    },
    deployment: {
      label: page.deployment?.label || enHomeContent.deployment.label,
      title: page.deployment?.title || enHomeContent.deployment.title,
      note: page.deployment?.note || enHomeContent.deployment.note,
      steps: overlayItems<HomeDeliveryStep>(
        enHomeContent.deployment.steps,
        page.deployment?.steps,
        (fallbackStep, localizedStep) => ({
          ...fallbackStep,
          title: localizedStep?.title || fallbackStep.title,
          description: localizedStep?.description || fallbackStep.description,
        }),
      ),
    },
    automation: {
      label: page.automation?.label || home.sectionRationale || enHomeContent.automation.label,
      title:
        page.automation?.title || home.whyRoboticPainting || enHomeContent.automation.title,
      points: page.automation?.points || enHomeContent.automation.points,
      benefits: buildAutomationBenefits(home, page),
    },
    cta: {
      ...enHomeContent.cta,
      label: page.cta?.label || enHomeContent.cta.label,
      title: page.cta?.title || enHomeContent.cta.title,
      subtitle: page.cta?.subtitle || enHomeContent.cta.subtitle,
      startAssessment: page.cta?.startAssessment || enHomeContent.cta.startAssessment,
      talkToEngineer: page.cta?.talkToEngineer || enHomeContent.cta.talkToEngineer,
      uploadDrawings: page.cta?.uploadDrawings || enHomeContent.cta.uploadDrawings,
      uploadMessage: page.cta?.uploadMessage || enHomeContent.cta.uploadMessage,
      footnote: pickString(page.cta?.footnote, enHomeContent.cta.footnote, ["路"]),
    },
    references: {
      label: home.sectionReference || enHomeContent.references.label,
      title: home.projectReferences || enHomeContent.references.title,
      viewAllLabel: home.viewCaseStudies || enHomeContent.references.viewAllLabel,
      cards: overlayItems<HomeReferenceCard>(
        enHomeContent.references.cards,
        page.references?.cards,
        (fallbackCard, localizedCard) => ({
          ...fallbackCard,
          industry: localizedCard?.industry || fallbackCard.industry,
          metric: localizedCard?.metric || fallbackCard.metric,
          detail: localizedCard?.detail || fallbackCard.detail,
        }),
      ),
    },
    eeat: {
      ...enHomeContent.eeat,
      ...(page.eeat || {}),
    },
    faq: {
      label: page.faq?.label || enHomeContent.faq.label,
      title: page.faq?.title || enHomeContent.faq.title,
      items: page.faq?.items || enHomeContent.faq.items,
    },
  };
}

const migratedHomeContentByLocale: Partial<Record<Locale, HomeContent>> = {
  en: enHomeContent,
};

export function getHomeFallbackContent(): HomeContent {
  return enHomeContent;
}

export function getHomeContent(locale: Locale, translation: TranslationKeys): HomeContent {
  const migratedContent = migratedHomeContentByLocale[locale];

  if (migratedContent) {
    return migratedContent;
  }

  return buildHomeContentFromTranslations(translation);
}
