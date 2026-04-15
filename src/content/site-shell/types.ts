export interface SiteShellContent {
  nav: Record<string, string>;
  header: {
    brandName: string;
    aiBadge: string;
    turnkeyProjects: string;
    byApplication: string;
    engineeringServices: string;
    supportServices: string;
    menus: Record<string, any>;
  };
  footer: Record<string, string>;
  assistant: {
    cta: string;
    mobileLabel: string;
  };
  quote: {
    badge: string;
    title: string;
    subtitle: string;
    metaTitle: string;
    metaDescription: string;
    ogTitle: string;
    ogDescription: string;
    twitterTitle: string;
    twitterDescription: string;
    breadcrumbLabel: string;
  };
}
