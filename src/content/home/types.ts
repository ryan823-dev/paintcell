export interface HomeProjectInterfaceContent {
  status: {
    systemActive: string;
    assistantOnline: string;
    interfaceReady: string;
  };
  badge: string;
  title: string;
  description: string;
  inputPlaceholder: string;
  footerNote: string;
  useFormInsteadLabel: string;
  startLabel: string;
  quickStarters: string[];
  wizard: {
    label: string;
    ctaLabel: string;
    mobileStepsLabel: string;
    mobileDurationLabel: string;
  };
}

export interface HomeStat {
  numericValue: number;
  suffix: string;
  label: string;
}

export interface HomeSectionCopy {
  label: string;
  title: string;
}

export interface HomeApplicationItem {
  title: string;
  description: string;
}

export interface HomeCapabilityLinks {
  systemIntro: string;
  systemLink: string;
  boothIntro: string;
  boothLink: string;
  planningIntro: string;
  planningLink1: string;
  connector: string;
  planningLink2: string;
}

export interface HomeDeliveryStep {
  title: string;
  description: string;
}

export interface HomeSystemOverviewItem {
  title: string;
  description: string;
}

export interface HomeBenefitCard {
  title: string;
  description: string;
  microLine: string;
  engineeringAnchor: string;
  typicalUseCase: string;
  keyConstraints: string;
  whatWeNeedToAssess: string;
}

export interface HomeReferenceCard {
  industry: string;
  metric: string;
  detail: string;
}

export interface HomeFaqItem {
  question: string;
  answer: string;
}

export interface HomeContent {
  seo: {
    metaTitle: string;
    metaDescription: string;
    ogDescription: string;
    twitterDescription: string;
    organizationDescription: string;
    websiteName: string;
    webpageName: string;
  };
  projectInterface: HomeProjectInterfaceContent;
  hero: {
    badge: string;
    title: string;
    introPrimary: string;
    introSecondary: string;
    highlight: string;
  };
  offering: {
    label: string;
    title: string;
    description: string;
  };
  trackRecord: HomeSectionCopy;
  trustStats: {
    items: HomeStat[];
  };
  applications: {
    label: string;
    title: string;
    items: HomeApplicationItem[];
  };
  capabilities: {
    label: string;
    title: string;
    items: string[];
    links: HomeCapabilityLinks;
  };
  systemOverview: {
    label: string;
    title: string;
    ctaLabel: string;
    items: HomeSystemOverviewItem[];
  };
  deployment: {
    label: string;
    title: string;
    note: string;
    steps: HomeDeliveryStep[];
  };
  automation: {
    label: string;
    title: string;
    points: string[];
    benefits: HomeBenefitCard[];
  };
  cta: {
    label: string;
    title: string;
    subtitle: string;
    startAssessment: string;
    talkToEngineer: string;
    uploadDrawings: string;
    uploadMessage: string;
    footnote: string;
  };
  references: {
    label: string;
    title: string;
    viewAllLabel: string;
    cards: HomeReferenceCard[];
  };
  eeat: {
    authorLabel: string;
    authorValue: string;
    updatedLabel: string;
    updatedValue: string;
    scopeLabel: string;
    scopeValue: string;
  };
  faq: {
    label: string;
    title: string;
    items: HomeFaqItem[];
  };
}
