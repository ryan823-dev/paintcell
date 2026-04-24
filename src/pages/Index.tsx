import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentType,
} from "react";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { BenefitDetailModal, BenefitModalContent } from "@/components/home/BenefitDetailModal";
import { ProjectInterfacePanel } from "@/components/home/ProjectInterfacePanel";
import { HomeSidebar } from "@/components/home/HomeSidebar";
import { TrustStats } from "@/components/home/TrustStats";
import { TrustLogos } from "@/components/home/TrustLogos";
import { BusinessPyramid } from "@/components/home/BusinessPyramid";
import { ExploreLinks } from "@/components/seo/ExploreLinks";
import {
  ChevronRight, Target, Zap, Shield, Users, Cog, Box, Settings, Gauge,
  Car, Refrigerator, Wrench, Factory, CheckCircle2, Loader2,
  MessageSquare, FileText, Upload, User, CalendarDays, HelpCircle
} from "lucide-react";
import { deliverySteps } from "@/data/industryData";
import { getPageMetadata } from "@/data/pageMetadata";
import { useHomeContent } from "@/hooks/useHomeContent";
import { useCanonicalUrl, useRouteLocale } from "@/hooks/useRouteLocale";
import { companyProfile } from "@/lib/siteTrust";

interface Benefit {
  icon: typeof Target;
  title: string;
  description: string;
  microLine: string;
  modalContent: BenefitModalContent;
}
const DOMAIN = "https://tdpaint.com";

const industryEntries = [
  { icon: Car, href: "/industries/automotive-painting" },
  { icon: Refrigerator, href: "/industries/appliance-coating" },
  { icon: Wrench, href: "/industries/metal-parts-finishing" },
  { icon: Factory, href: "/industries" },
];

const benefitIcons = [Target, Zap, Users, Shield] as const;
const systemComponentIcons = [Cog, Box, Settings, Gauge] as const;

interface InlineChatPanelProps {
  initialMessage?: string | null;
  onClose: () => void;
}

export default function Index() {
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("ai-consultation");
  const [chatActive, setChatActive] = useState(false);
  const [chatInitialMessage, setChatInitialMessage] = useState<string | null>(null);
  const [InlineChatPanelComponent, setInlineChatPanelComponent] =
    useState<ComponentType<InlineChatPanelProps> | null>(null);
  const [isLoadingChatPanel, setIsLoadingChatPanel] = useState(false);
  const inlineChatPanelImportRef = useRef<Promise<ComponentType<InlineChatPanelProps>> | null>(null);
  const locale = useRouteLocale();
  const homeContent = useHomeContent();
  const heroCopy = homeContent.hero;
  const offeringCopy = homeContent.offering;
  const trackRecordCopy = homeContent.trackRecord;
  const applicationsCopy = homeContent.applications;
  const capabilitiesCopy = homeContent.capabilities;
  const capabilityLinks = capabilitiesCopy.links;
  const systemOverviewCopy = homeContent.systemOverview;
  const deploymentCopy = homeContent.deployment;
  const automationCopy = homeContent.automation;
  const ctaCopy = homeContent.cta;
  const eeatCopy = homeContent.eeat;
  const faqCopy = homeContent.faq;
  const referencesCopy = homeContent.references;
  const projectInterfaceCopy = homeContent.projectInterface;
  const trustStatsCopy = homeContent.trustStats;
  const homeUrl = useCanonicalUrl("/");
  const homePageMeta = getPageMetadata("/");
  const localizedFaqs = faqCopy.items;
  const localizedIndustryEntries = industryEntries.map((entry, index) => ({
    ...entry,
    title: applicationsCopy.items[index]?.title || "",
    description: applicationsCopy.items[index]?.description || "",
  }));
  const localizedCoreCapabilities = capabilitiesCopy.items;
  const localizedDeliverySteps = deliverySteps.map((step, index) => ({
    ...step,
    title: deploymentCopy.steps[index]?.title || step.title,
    description: deploymentCopy.steps[index]?.description || step.description,
  }));
  const localizedReferenceCards = referencesCopy.cards;
  const benefits: Benefit[] = automationCopy.benefits.map((benefit, index) => ({
    icon: benefitIcons[index] || Target,
    title: benefit.title,
    description: benefit.description,
    microLine: benefit.microLine,
    modalContent: {
      title: benefit.title,
      engineeringAnchor: benefit.engineeringAnchor,
      typicalUseCase: benefit.typicalUseCase,
      keyConstraints: benefit.keyConstraints,
      whatWeNeedToAssess: benefit.whatWeNeedToAssess,
    },
  }));
  const systemComponents = systemOverviewCopy.items.map((component, index) => ({
    icon: systemComponentIcons[index] || Cog,
    title: component.title,
    description: component.description,
  }));

  const localizedJsonLdSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${DOMAIN}/#organization`,
      name: companyProfile.brandName,
      url: DOMAIN,
      logo: `${DOMAIN}/images/og-social-share.png`,
      description: homeContent.seo.organizationDescription,
      contactPoint: { "@type": "ContactPoint", contactType: "sales", email: companyProfile.primaryEmail },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${homeUrl}#website`,
      name: homeContent.seo.websiteName,
      url: homeUrl,
      publisher: { "@id": `${DOMAIN}/#organization` },
      inLanguage: locale,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${homeUrl}#webpage`,
      name: homeContent.seo.webpageName,
      url: homeUrl,
      isPartOf: { "@id": `${homeUrl}#website` },
      about: { "@id": `${DOMAIN}/#organization` },
      inLanguage: locale,
      ...(homePageMeta?.updatedAt ? { dateModified: homePageMeta.updatedAt } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${homeUrl}#faq`,
      mainEntity: localizedFaqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];

  useEffect(() => {
    // Hide static FAQ visually (keep in DOM for crawlers) once React renders its own FAQ
    const staticFaq = document.getElementById("static-faq");
    if (staticFaq) {
      staticFaq.style.position = "absolute";
      staticFaq.style.width = "1px";
      staticFaq.style.height = "1px";
      staticFaq.style.overflow = "hidden";
      staticFaq.style.clip = "rect(0,0,0,0)";
      staticFaq.style.whiteSpace = "nowrap";
    }
  }, []);

  useEffect(() => {
    const handleReset = () => {
      setChatActive(false);
      setChatInitialMessage(null);
      setActiveSection("ai-consultation");
    };
    window.addEventListener("reset-homepage", handleReset);
    return () => window.removeEventListener("reset-homepage", handleReset);
  }, []);

  const handleCardClick = (benefit: Benefit) => {
    setSelectedBenefit(benefit);
    setIsModalOpen(true);
  };

  const loadInlineChatPanel = useCallback(async () => {
    if (InlineChatPanelComponent) {
      return InlineChatPanelComponent;
    }

    if (!inlineChatPanelImportRef.current) {
      setIsLoadingChatPanel(true);
      inlineChatPanelImportRef.current = import("@/components/home/InlineChatPanel")
        .then((module) => {
          const ChatPanel = module.InlineChatPanel as ComponentType<InlineChatPanelProps>;
          setInlineChatPanelComponent(() => ChatPanel);
          return ChatPanel;
        })
        .finally(() => {
          setIsLoadingChatPanel(false);
          inlineChatPanelImportRef.current = null;
        });
    }

    return inlineChatPanelImportRef.current;
  }, [InlineChatPanelComponent]);

  const handleStartConsultation = () => {
    setIsModalOpen(false);
    setChatActive(true);
    setActiveSection("ai-consultation");
    void loadInlineChatPanel();
  };

  const handleSidebarClick = (id: string) => {
    setActiveSection(id);
    if (id === "ai-consultation") {
      setChatActive(true);
      setChatInitialMessage(null);
      void loadInlineChatPanel();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setChatActive(false);
    }
  };

  const handleStartChat = (message?: string) => {
    setChatActive(true);
    setActiveSection("ai-consultation");
    if (message) {
      setChatInitialMessage(message);
    }
    void loadInlineChatPanel();
  };

  return (
    <>
      <Helmet>
        <title>{homeContent.seo.metaTitle}</title>
        <meta name="description" content={homeContent.seo.metaDescription} />
        <link rel="canonical" href={homeUrl} />
        <meta property="og:title" content={homeContent.seo.metaTitle} />
        <meta property="og:description" content={homeContent.seo.ogDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={homeUrl} />
        <meta property="og:image" content={`${DOMAIN}/images/og-social-share.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={homeContent.seo.metaTitle} />
        <meta name="twitter:description" content={homeContent.seo.twitterDescription} />
        <meta name="twitter:image" content={`${DOMAIN}/images/og-social-share.png`} />
        {localizedJsonLdSchemas.map((schema, i) => (
          <script key={i} type="application/ld+json">{JSON.stringify(schema)}</script>
        ))}
      </Helmet>

      <div className="bg-background flex">
        <HomeSidebar activeItem={activeSection} onItemClick={handleSidebarClick} />

        <div className="flex-1 min-w-0">
          {/* Hero — AI Project Interface */}
          {chatActive ? (
            InlineChatPanelComponent ? (
              <InlineChatPanelComponent
                initialMessage={chatInitialMessage}
                onClose={() => {
                  setChatActive(false);
                  setChatInitialMessage(null);
                }}
              />
            ) : (
              <section className="bg-background h-[calc(100vh-3.5rem)] flex items-center justify-center border-b border-border">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {isLoadingChatPanel ? "Loading AI consultation..." : "Preparing AI consultation..."}
                </div>
              </section>
            )
          ) : (
            <ProjectInterfacePanel content={projectInterfaceCopy} onStartChat={handleStartChat} />
          )}

          {/* H1 + Definition Block */}
          <section id="definition" className="py-12 md:py-16 border-t border-border">
            <div className="container-wide">
              <FadeIn>
                <div className="max-w-4xl">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent mb-3">
                    {heroCopy.badge || "International Industrial Coating System Expert"}
                  </p>
                  <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                    {heroCopy.title || "Complete Industrial Coating Solutions"}
                  </h1>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
                    {heroCopy.introPrimary || "TD Painting Systems delivers comprehensive industrial coating solutions spanning the full value chain: from complete turnkey painting shops and robotic workstations to paint supply systems, spare parts, and expert technical services."}
                  </p>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                    {heroCopy.introSecondary || `With ${companyProfile.systemsDeployed}+ systems deployed across ${companyProfile.countriesServed}+ countries, we serve automotive body shops, parts paint lines, and industrial manufacturing facilities. Our integrated approach delivers consistent quality, optimized throughput, and reduced total cost of ownership.`}
                  </p>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                    For a broader view of{" "}
                    <Link to="/solutions" className="text-accent hover:text-accent/80 underline">
                      industrial painting systems
                    </Link>
                    , start with the solutions hub before narrowing into booth, robot, or process-specific pages.
                  </p>
                  <div className="border-l-2 border-accent/40 pl-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {heroCopy.highlight || "Whether you need a complete painting shop design, a single robotic cell, paint supply equipment, or ongoing maintenance support, we provide the expertise and equipment to meet your industrial coating requirements."}
                    </p>
                  </div>
                  <div className="mt-8 grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-border bg-card p-5">
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Best fit</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Projects that need a defined robotic painting, booth-automation, or industrial-finishing integration scope.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-border bg-card p-5">
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Not ideal for</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        One-off low-volume requests that only need a generic equipment quote without stable process inputs or site review.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-border bg-card p-5">
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Prepare before inquiry</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Bring part family, finish target, takt or throughput, changeover pattern, and current booth or layout constraints.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* Business Pyramid - Our Complete Offering */}
          <section id="business-pyramid" className="py-14 md:py-18 border-t border-border bg-muted/30">
            <div className="container-wide">
              <FadeIn>
                <div className="mb-10 text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">
                    {offeringCopy.label || "Our Complete Offering"}
                  </p>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                    {offeringCopy.title || "Full-Spectrum Coating Solutions"}
                  </h2>
                  <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                    {offeringCopy.description || "From turnkey painting shops to spare parts and services, explore our integrated business model."}
                  </p>
                  <div className="h-px w-12 bg-accent/50 mx-auto mt-4" />
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <BusinessPyramid />
              </FadeIn>
            </div>
          </section>

          {/* Trust Stats — Animated Numbers */}
          <section id="trust-stats" className="py-14 md:py-18 border-t border-border">
            <div className="container-wide">
              <FadeIn>
                <div className="mb-10 text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">{trackRecordCopy.label || "Track record"}</p>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">{trackRecordCopy.title || "Proven at Scale"}</h2>
                  <div className="h-px w-12 bg-accent/50 mx-auto" />
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <TrustStats items={trustStatsCopy.items} />
              </FadeIn>
            </div>
          </section>

          {/* Industry Entry */}
          <section id="industry-entry" className="py-14 md:py-18 border-t border-border">
            <div className="container-wide">
              <FadeIn>
                <div className="mb-8">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">{applicationsCopy.label || "Application sectors"}</p>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">{applicationsCopy.title || "Select your application"}</h2>
                  <div className="h-px w-12 bg-accent/50" />
                </div>
              </FadeIn>
              <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {localizedIndustryEntries.map((entry) => (
                  <StaggerItem key={entry.title}>
                    <Link
                      to={entry.href}
                      className="group relative block rounded-xl p-5 border border-border hover:border-accent/40 transition-all duration-300 h-full bg-card overflow-hidden card-elevated"
                    >
                      {/* Hover accent indicator */}
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                          <entry.icon className="h-5 w-5 text-accent" />
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-300" />
                      </div>
                      <h3 className="text-sm font-semibold mb-1">{entry.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{entry.description}</p>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>

          {/* Core Capabilities — with internal links */}
          <section id="core-capabilities" className="py-14 md:py-18 border-t border-border">
            <div className="container-wide">
              <FadeIn>
                <div className="mb-8">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">{capabilitiesCopy.label || "Engineering scope"}</p>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">{capabilitiesCopy.title || "What We Deliver"}</h2>
                  <div className="h-px w-12 bg-accent/50" />
                </div>
              </FadeIn>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 max-w-4xl">
                {localizedCoreCapabilities.map((capability, i) => (
                  <FadeIn key={i} delay={i * 0.05}>
                    <div className="flex items-start gap-3 py-2">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground leading-relaxed">{capability}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
              <FadeIn delay={0.4}>
                <div className="mt-6 pt-4 border-t border-border max-w-4xl space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {capabilityLinks.systemIntro || "For system-level integration details, see"}{" "}
                    <Link to="/solutions/robotic-painting-system" className="text-accent hover:text-accent/80 underline">{capabilityLinks.systemLink || "Robotic Painting System"}</Link>.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {capabilityLinks.boothIntro || "For booth-specific scope, see"}{" "}
                    <Link to="/solutions/paint-booth-automation" className="text-accent hover:text-accent/80 underline">{capabilityLinks.boothLink || "Paint Booth Automation"}</Link>.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {capabilityLinks.planningIntro || "Planning robot selection? See"}{" "}
                    <Link to="/resources/knowledge/how-to-choose-paint-robot" className="text-accent hover:text-accent/80 underline">{capabilityLinks.planningLink1 || "How to Choose a Paint Robot"}</Link>
                    {" "}{capabilityLinks.connector || "and"}{" "}
                    <Link to="/resources/knowledge/robotic-painting-cost-guide" className="text-accent hover:text-accent/80 underline">{capabilityLinks.planningLink2 || "Robotic Painting Cost Guide"}</Link>.
                  </p>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* System Architecture */}
          <section id="system-overview" className="py-16 md:py-20 border-t border-border">
            <div className="container-wide">
              <FadeIn>
                <div className="mb-10">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">
                    {systemOverviewCopy.label || "System Architecture"}
                  </p>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                    {systemOverviewCopy.title || "Complete Paint Cell Solution"}
                  </h2>
                  <div className="h-px w-12 bg-accent/50" />
                </div>
              </FadeIn>
              <StaggerContainer className="grid md:grid-cols-2 gap-3">
                {systemComponents.map((component) => (
                  <StaggerItem key={component.title}>
                    <div className="rounded-xl p-5 border border-border flex gap-4 h-full hover:border-accent/20 transition-all duration-200 bg-card">
                      <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                        <component.icon className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold mb-1.5">{component.title}</h3>
                        <p className="text-muted-foreground text-xs leading-relaxed">{component.description}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
              <FadeIn delay={0.4} className="mt-8 text-center">
                <Button asChild variant="outline">
                  <Link to="/paint-cells">
                    {systemOverviewCopy.ctaLabel || "Explore solutions"}
                  </Link>
                </Button>
              </FadeIn>
            </div>
          </section>

          {/* Deployment Process */}
          <section id="deployment-process" className="py-14 md:py-18 border-t border-border">
            <div className="container-wide">
              <FadeIn>
                <div className="mb-10">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">{deploymentCopy.label || "Project lifecycle"}</p>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">{deploymentCopy.title || "Deployment process"}</h2>
                  <div className="h-px w-12 bg-accent/50" />
                </div>
              </FadeIn>
              <div className="max-w-4xl">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {localizedDeliverySteps.slice(0, 4).map((step) => (
                    <FadeIn key={step.step} delay={step.step * 0.08}>
                      <div className="rounded-xl p-4 border border-border bg-card h-full">
                        <span className="text-lg font-bold text-accent/60 mb-2 block">{step.step}</span>
                        <h3 className="text-sm font-semibold mb-1">{step.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
                <div className="grid sm:grid-cols-3 gap-3 mt-3">
                  {localizedDeliverySteps.slice(4).map((step) => (
                    <FadeIn key={step.step} delay={step.step * 0.08}>
                      <div className="rounded-xl p-4 border border-border bg-card h-full">
                        <span className="text-lg font-bold text-accent/60 mb-2 block">{step.step}</span>
                        <h3 className="text-sm font-semibold mb-1">{step.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
                <FadeIn delay={0.6}>
                  <p className="text-sm text-muted-foreground mt-6">
                    {deploymentCopy.note || "TD systems are designed for rapid deployment within standard industrial timelines."}
                  </p>
                </FadeIn>
              </div>
            </div>
          </section>

          {/* Why Robotic Painting Automation */}
          <section id="why-robotic-painting" className="py-16 md:py-20 border-t border-border">
            <div className="container-wide">
              <FadeIn>
                <div className="mb-10">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">
                    {automationCopy.label || "Engineering Rationale"}
                  </p>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">{automationCopy.title || "Why Robotic Painting?"}</h2>
                  <div className="h-px w-12 bg-accent/50" />
                </div>
              </FadeIn>
              <div className="max-w-3xl space-y-2 mb-8">
                {(automationCopy.points || [
                  "Improve coating consistency with repeatable spray paths and reduced human variability.",
                  "Reduce paint waste through optimized transfer efficiency and tighter process control.",
                  "Stabilize production throughput with repeatable cycle times and planned changeovers.",
                  "Lower labor pressure by shifting skilled operators toward prep, QA, and process oversight.",
                  "Meet VOC and safety requirements with enclosed robotic cells and engineered ventilation.",
                ]).map((item, i) => (
                  <FadeIn key={i} delay={i * 0.05}>
                    <div className="flex items-start gap-3 py-1">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">{item}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
              <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                {benefits.map((benefit: Benefit) => (
                  <StaggerItem key={benefit.title}>
                    <div
                      className="rounded-xl p-5 border border-border hover:border-accent/30 transition-all duration-200 h-full flex flex-col cursor-pointer bg-card group"
                      onClick={() => handleCardClick(benefit)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleCardClick(benefit);
                        }
                      }}
                    >
                      <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-colors">
                        <benefit.icon className="h-4 w-4 text-accent" />
                      </div>
                      <h3 className="text-sm font-semibold mb-1.5">{benefit.title}</h3>
                      <p className="text-muted-foreground text-xs leading-relaxed flex-1">{benefit.description}</p>
                      <p className="text-[11px] text-muted-foreground/60 mt-3 pt-2.5 border-t border-border italic">
                        {benefit.microLine}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>

          {/* Project Initiation — Dark CTA Section */}
          <section id="project-initiation" className="py-14 md:py-18 border-t border-border bg-muted/35 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-primary/[0.05] blur-[100px]" />
              <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/[0.035] blur-[84px] translate-x-1/4 translate-y-1/4" />
            </div>
            <div className="container-wide relative">
              <FadeIn>
                <div className="max-w-3xl mx-auto text-center rounded-[28px] border border-border bg-card/95 px-6 py-8 shadow-[0_18px_48px_hsl(var(--foreground)/0.08)] md:px-10 md:py-10">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary mb-2">{ctaCopy.label || "Get started"}</p>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3 text-heading">{ctaCopy.title || "Start your robotic painting project"}</h2>
                  <p className="text-sm text-muted-foreground mb-8">
                    {ctaCopy.subtitle || "Tell us about your parts, coating requirements, and production needs."}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                    <Button
                      onClick={() => handleStartChat()}
                      className="bg-primary hover:bg-accent text-primary-foreground font-semibold gap-2 h-12 px-8 text-sm rounded-xl shadow-[0_12px_28px_hsl(var(--primary)/0.18)] transition-all duration-300"
                    >
                      <MessageSquare className="h-4 w-4" />
                      {ctaCopy.startAssessment}
                    </Button>
                    <Button asChild variant="outline" className="gap-2 h-12 px-8 text-sm rounded-xl border-border bg-card text-heading hover:bg-muted hover:text-heading">
                      <Link to="/quote">
                        <FileText className="h-4 w-4" />
                        {ctaCopy.talkToEngineer}
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="gap-2 h-12 px-8 text-sm rounded-xl border-border bg-card text-heading hover:bg-muted hover:text-heading"
                      onClick={() => handleStartChat(ctaCopy.uploadMessage)}
                    >
                      <Upload className="h-4 w-4" />
                      {ctaCopy.uploadDrawings}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {ctaCopy.footnote}
                  </p>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* Project References */}
          <section id="project-references" className="py-14 md:py-18 border-t border-border">
            <div className="container-wide">
              <FadeIn>
                <div className="mb-8">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">{referencesCopy.label}</p>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">{referencesCopy.title}</h2>
                  <div className="h-px w-12 bg-accent/50" />
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                  {localizedReferenceCards.map((ref, i) => (
                    <Link
                      key={i}
                      to="/case-studies"
                      className="group rounded-xl p-5 border border-border bg-card card-elevated hover:border-accent/30 transition-all duration-300"
                    >
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-accent mb-2 block">
                        {ref.industry}
                      </span>
                      <p className="text-sm font-semibold text-foreground mb-1">{ref.metric}</p>
                      <p className="text-xs text-muted-foreground">{ref.detail}</p>
                    </Link>
                  ))}
                </div>
              </FadeIn>
              <FadeIn delay={0.2} className="text-center">
                <Button asChild variant="outline" className="rounded-xl">
                  <Link to="/case-studies" className="flex items-center gap-2">
                    {referencesCopy.viewAllLabel}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </FadeIn>
            </div>
          </section>

          {/* Technology Partners & Trust */}
          <section id="trust-logos" className="py-14 md:py-18 border-t border-border">
            <div className="container-wide">
              <FadeIn>
                <TrustLogos />
              </FadeIn>
            </div>
          </section>

          {/* Explore Links */}
          <ExploreLinks currentPath="/" />

          {/* E-E-A-T Block */}
          <section className="border-t border-border">
            <div className="container-wide py-8 md:py-10">
              <div className="flex flex-wrap gap-6 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  {eeatCopy.authorLabel || "Author"}: {eeatCopy.authorValue || companyProfile.authorTeamName}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {eeatCopy.updatedLabel || "Last updated"}: {homePageMeta?.updatedAt || eeatCopy.updatedValue || companyProfile.trustReviewDate}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  {eeatCopy.scopeLabel || "Scope"}: {eeatCopy.scopeValue || "Robotic painting system integration and paint booth automation for automotive components and industrial finishing. Specifications depend on application and site classification (including ATEX where required)."}
                </span>
              </div>
            </div>
          </section>

          {/* FAQ — all expanded by default */}
          <section id="faq" className="py-14 md:py-18 border-t border-border">
            <div className="container-wide">
              <FadeIn>
                <div className="mb-10">
                  <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                    <HelpCircle className="h-3.5 w-3.5" />
                    {faqCopy.label || "FAQ"}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">{faqCopy.title || "Frequently asked questions"}</h2>
                  <div className="h-px w-12 bg-accent/50" />
                </div>
              </FadeIn>
              <div className="max-w-3xl space-y-2">
                {localizedFaqs.map((faq, i) => (
                  <FadeIn key={i} delay={i * 0.08}>
                    <div className="border border-border rounded-xl bg-card overflow-hidden">
                      <div className="p-4">
                        <h3 className="text-sm font-semibold mb-2">{faq.question}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          <BenefitDetailModal open={isModalOpen} onOpenChange={setIsModalOpen} content={selectedBenefit?.modalContent || null} onStartConsultation={handleStartConsultation} />
        </div>
      </div>
    </>
  );
}
