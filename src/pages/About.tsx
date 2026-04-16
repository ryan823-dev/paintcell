import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import {
  Award,
  Building2,
  Calendar,
  Car,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Factory,
  Globe,
  Mail,
  MapPin,
  Rocket,
  ShieldCheck,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { useI18n } from "@/i18n";
import { useCanonicalUrl } from "@/hooks/useRouteLocale";
import { companyProfile } from "@/lib/siteTrust";

const DOMAIN = "https://tdpaint.com";

const aboutDescription = `${companyProfile.brandName} is the industrial coating brand of ${companyProfile.legalName}, bringing ${companyProfile.yearsExperience}+ years of experience, ${companyProfile.systemsDeployed}+ deployed systems, and delivery references across ${companyProfile.countriesServed}+ countries.`;

const milestones = [
  {
    year: String(companyProfile.foundedYear),
    title: "Company founded",
    description: `${companyProfile.legalName} was established in Shanghai and began building industrial automation capabilities for coating-system projects.`,
  },
  {
    year: "2013",
    title: "Automotive project delivery",
    description:
      "Early automotive painting projects established the company's delivery model around robot integration, booth interfaces, and commissioning support.",
  },
  {
    year: "2015",
    title: "Integration capability expanded",
    description:
      "The team deepened multi-brand robot integration and paint-process engineering capability for larger turnkey scopes.",
  },
  {
    year: "2018",
    title: "EV and component programs",
    description:
      "Program experience expanded across EV parts, automotive components, and production lines with tighter takt and finish requirements.",
  },
  {
    year: "2021",
    title: "Shenzhen technical center",
    description:
      "A Shenzhen technical center supported deeper engineering collaboration for higher-spec finishing applications.",
  },
  {
    year: "2024",
    title: "International expansion",
    description: `International delivery activity increased while the company accumulated ${companyProfile.majorAutomotiveProjects}+ major automotive painting line references.`,
  },
  {
    year: "2026",
    title: "Qingpu headquarters",
    description: `Operations were consolidated around the current ${companyProfile.headquarters.display} headquarters and engineering base.`,
  },
];

const certifications = [
  "ISO 9001 quality management system",
  "High-tech enterprise certification",
  "Safety production licensing",
  "Multiple software copyrights and patents",
  "ABB system-integration experience",
  "ATEX-oriented system design capability",
];

const robotBrands = [
  "ABB (IRB5500, IRB6700)",
  "FANUC (MPX2600, MPX3500)",
  "Yaskawa",
  "Kawasaki",
  "KUKA",
  "CMA",
];

const paintEquipmentBrands = [
  "SAMES KREMLIN",
  "Graco",
  "Ransburg",
  "Binks-Maple",
  "Carlisle",
  "Timmer",
];

const keyClients = [
  { name: "FAW-Toyota", sector: "Automotive OEM" },
  { name: "Zhengzhou Nissan", sector: "Automotive OEM" },
  { name: "VINFAST (Thailand)", sector: "Automotive OEM" },
  { name: "NorDAO Auto Systems", sector: "Tier 1 Supplier" },
  { name: "Minth Group", sector: "Tier 1 Supplier" },
  { name: "Wuhan Minhui Molding", sector: "Tier 1 Supplier" },
  { name: "CASC Aerospace Long-Hit", sector: "Aerospace" },
  { name: "Siyang SECO Technology", sector: "Industrial" },
];

function getSchemas(canonicalUrl: string, homeUrl: string) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${DOMAIN}/#organization`,
      name: companyProfile.brandName,
      alternateName: [companyProfile.productName, companyProfile.legalName],
      url: DOMAIN,
      logo: `${DOMAIN}/images/og-social-share.png`,
      description: aboutDescription,
      foundingDate: String(companyProfile.foundedYear),
      numberOfEmployees: {
        "@type": "QuantitativeValue",
        value: companyProfile.engineeringTeamSize,
      },
      areaServed: "Worldwide",
      knowsAbout: [
        "Robotic painting systems",
        "Paint booth automation",
        "Paint supply systems",
        "Industrial coating engineering",
        "Production-line integration",
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: `${companyProfile.headquarters.streetAddress}, ${companyProfile.headquarters.district}`,
        addressLocality: companyProfile.headquarters.city,
        addressCountry: companyProfile.headquarters.countryCode,
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: companyProfile.primaryEmail,
        availableLanguage: ["English"],
      },
      sameAs: [],
    },
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": `${canonicalUrl}#webpage`,
      name: `About ${companyProfile.brandName}`,
      description: aboutDescription,
      url: canonicalUrl,
      isPartOf: { "@id": `${homeUrl}#website` },
      about: { "@id": `${DOMAIN}/#organization` },
      mainEntity: { "@id": `${DOMAIN}/#organization` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: homeUrl },
        { "@type": "ListItem", position: 2, name: "About", item: canonicalUrl },
      ],
    },
  ];
}

export default function About() {
  const { t } = useI18n();
  const homeUrl = useCanonicalUrl("/");
  const canonicalUrl = useCanonicalUrl("/about");
  const schemas = getSchemas(canonicalUrl, homeUrl);

  const stats = [
    { value: `${companyProfile.systemsDeployed}+`, label: t.about?.systemsDeployed || "Systems Deployed" },
    { value: `${companyProfile.yearsExperience}+`, label: t.about?.yearsExperience || "Years Experience" },
    { value: `${companyProfile.countriesServed}+`, label: t.about?.countriesServed || "Countries Served" },
    { value: `${companyProfile.engineeringTeamSize}`, label: "Engineering Team" },
  ];

  const values = [
    {
      icon: Award,
      title: t.about?.engineeringExcellence || "Engineering Excellence",
      description:
        t.about?.engineeringExcellenceDesc ||
        `Engineering work is grounded in delivery experience across robotic painting, booth integration, and process commissioning built over ${companyProfile.yearsExperience}+ years.`,
    },
    {
      icon: Users,
      title: t.about?.customerPartnership || "Customer Partnership",
      description:
        t.about?.customerPartnershipDesc ||
        "Projects are scoped around actual production constraints, not generic automation claims, so teams can make decisions with realistic boundaries and tradeoffs.",
    },
    {
      icon: Globe,
      title: t.about?.globalCapability || "Global Capability",
      description:
        t.about?.globalCapabilityDesc ||
        `Reference programs span ${companyProfile.countriesServed}+ countries across automotive, industrial, appliance, and specialty finishing applications.`,
    },
    {
      icon: Wrench,
      title: t.about?.lifecycleSupport || "Lifecycle Support",
      description:
        t.about?.lifecycleSupportDesc ||
        "Support covers concept definition, equipment integration, commissioning, ramp-up, and ongoing engineering communication after handover.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>{`About ${companyProfile.brandName} | ${companyProfile.yearsExperience}+ Years of Industrial Coating Engineering`}</title>
        <meta name="description" content={aboutDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`About ${companyProfile.brandName}`} />
        <meta property="og:description" content={aboutDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`${DOMAIN}/images/og-social-share.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`About ${companyProfile.brandName}`} />
        <meta name="twitter:description" content={aboutDescription} />
        <meta name="twitter:image" content={`${DOMAIN}/images/og-social-share.png`} />
        {schemas.map((schema, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
      </Helmet>

      <section className="section-dark border-b border-white/10">
        <div className="container-wide py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              {t.about?.title || `About ${companyProfile.brandName}`}
            </h1>
            <p className="text-lg text-white/70 mb-6">
              {companyProfile.brandName} is the industrial coating brand of {companyProfile.legalName},
              headquartered in {companyProfile.headquarters.display}. We focus on robotic painting systems,
              paint booth automation, paint supply systems, and engineering support for production-scale
              finishing lines.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                <div className="mb-1 flex items-center gap-2 text-white">
                  <Mail className="h-4 w-4 text-accent" />
                  Contact
                </div>
                <a href={`mailto:${companyProfile.primaryEmail}`} className="hover:text-white transition-colors">
                  {companyProfile.primaryEmail}
                </a>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                <div className="mb-1 flex items-center gap-2 text-white">
                  <Clock3 className="h-4 w-4 text-accent" />
                  Response time
                </div>
                <span>{companyProfile.responseTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section variant="default">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section variant="muted">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Our Story</h2>
          <div className="prose prose-lg text-muted-foreground space-y-4">
            <p>
              <strong className="text-foreground">{companyProfile.legalName}</strong> was founded in{" "}
              {companyProfile.foundedYear} and today operates publicly as{" "}
              <strong className="text-foreground">{companyProfile.brandName}</strong>. The company is
              based in {companyProfile.headquarters.display} and focuses on industrial coating-system
              delivery rather than general automation marketing.
            </p>
            <p>
              Our engineering and delivery team covers robot integration, booth interfaces, paint supply,
              controls, commissioning, and startup support. That structure matters because coating projects
              succeed or fail on how well process, equipment, and site constraints are handled together.
            </p>
            <p>
              We support automotive OEMs, Tier 1 suppliers, appliance manufacturers, and general industrial
              finishing teams that need clearer project scoping, stronger engineering alignment, and more
              predictable production outcomes.
            </p>
            <p>
              Publicly shared track record today centers on {companyProfile.systemsDeployed}+ deployed
              systems, {companyProfile.majorAutomotiveProjects}+ major automotive painting line references,
              and delivery coverage across {companyProfile.countriesServed}+ countries.
            </p>
          </div>
        </div>
      </Section>

      <Section variant="default">
        <SectionHeader title="Company milestones" description="Selected moments that shaped our delivery capability" />
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className={`relative flex items-start gap-6 mb-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div
                  className={`flex-1 ${
                    index % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"
                  } pl-12 md:pl-0`}
                >
                  <div className="inline-flex items-center gap-2 text-accent font-bold text-lg mb-1">
                    <Calendar className="h-4 w-4 md:hidden" />
                    {milestone.year}
                  </div>
                  <h3 className="font-semibold mb-1">{milestone.title}</h3>
                  <p className="text-sm text-muted-foreground">{milestone.description}</p>
                </div>
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-accent -translate-x-1/2 mt-1.5" />
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section variant="muted">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-accent text-sm font-semibold mb-4">
              <Rocket className="h-4 w-4" />
              Strategic partnership
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">CASC aerospace collaboration</h2>
            <p className="text-muted-foreground mb-4">
              Our Shenzhen technical center has worked alongside China Aerospace Science and Technology
              Corporation (CASC) partner teams on higher-spec coating and equipment-engineering programs.
            </p>
            <p className="text-muted-foreground mb-6">
              That collaboration reinforces the same principle used throughout our commercial projects:
              engineering credibility comes from disciplined process definition, not inflated marketing claims.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-accent" />
                Shenzhen technical center
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="h-4 w-4 text-accent" />
                Joint engineering collaboration
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="/images/office/shenzhen-office-sign.jpg"
              alt="TD Painting Systems Shenzhen office"
              className="rounded-xl shadow-lg w-full"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-3">
              <p className="text-white text-sm font-medium">Shenzhen technical center</p>
            </div>
          </div>
        </div>
      </Section>

      <Section variant="default">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <img
              src="/images/team/team-shenzhen.jpg"
              alt="TD Painting Systems engineering team"
              className="rounded-xl shadow-lg w-full"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Engineering and delivery team</h2>
            <p className="text-muted-foreground mb-4">
              The current public fact base centers on a {companyProfile.engineeringTeamSize}-person
              engineering and delivery team spanning system design, controls, robot programming,
              commissioning, and project management.
            </p>
            <p className="text-muted-foreground mb-6">
              We keep this section deliberately tight on claims: the point is to show the scope we can
              support, while avoiding internal headcount breakdowns or proof-light metrics that are hard to
              maintain consistently across the site.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-accent mb-1">{companyProfile.engineeringTeamSize}</div>
                <div className="text-sm text-muted-foreground">Engineering and delivery team</div>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-accent mb-1">{companyProfile.majorAutomotiveProjects}+</div>
                <div className="text-sm text-muted-foreground">Major automotive line references</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeader
          title="Certifications and qualifications"
          description="Signals that support quality, safety, and engineering discipline"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {certifications.map((certification) => (
            <div
              key={certification}
              className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border"
            >
              <ShieldCheck className="h-5 w-5 text-accent shrink-0" />
              <span className="text-sm font-medium">{certification}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section variant="default">
        <SectionHeader
          title="Technology partnerships"
          description="Multi-brand robot and spray-equipment integration capability"
        />
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-accent" />
              Robot platforms
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {robotBrands.map((brand) => (
                <div key={brand} className="flex items-center gap-2 p-3 rounded-lg bg-muted text-sm">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                  {brand}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Wrench className="h-5 w-5 text-accent" />
              Paint equipment brands
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {paintEquipmentBrands.map((brand) => (
                <div key={brand} className="flex items-center gap-2 p-3 rounded-lg bg-muted text-sm">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeader
          title="Selected client references"
          description="Examples across automotive, aerospace, and industrial sectors"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {keyClients.map((client) => (
            <div
              key={client.name}
              className="p-4 rounded-lg bg-card border border-border hover:border-accent/30 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                {client.sector === "Automotive OEM" ? (
                  <Car className="h-4 w-4 text-accent" />
                ) : client.sector === "Aerospace" ? (
                  <Rocket className="h-4 w-4 text-accent" />
                ) : (
                  <Factory className="h-4 w-4 text-accent" />
                )}
                <span className="text-xs text-accent font-medium">{client.sector}</span>
              </div>
              <div className="font-medium text-sm">{client.name}</div>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-6">
          Public project footprint currently rolls up to {companyProfile.countriesServed}+ countries,
          including automotive, industrial, and international deployment references.
        </p>
      </Section>

      <Section variant="muted">
        <SectionHeader
          title={t.about?.whatWeStandFor || "What We Stand For"}
          description="The principles behind how we present capability and scope"
        />
        <div className="grid md:grid-cols-2 gap-6">
          {values.map((value) => (
            <div key={value.title} className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <value.icon className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <section className="section-dark border-t border-white/10">
        <div className="container-wide py-16 md:py-24">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              {t.about?.discussProject || "Let's Discuss Your Project"}
            </h2>
            <p className="text-white/60 mb-6">
              Send your project brief to {companyProfile.primaryEmail}. {companyProfile.responseTime}.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
              <Link to="/quote" className="flex items-center gap-2">
                {t.about?.configurePaintCell || "Start Project Assessment"}
                <ChevronRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
