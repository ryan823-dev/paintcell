import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { ChevronRight, Award, Users, Globe, Wrench } from "lucide-react";
import { useI18n } from "@/i18n";

const DOMAIN = "https://tdpaintcell.com";

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${DOMAIN}/#organization`,
    name: "TD Robotic Painting Systems",
    alternateName: "PaintCell",
    url: DOMAIN,
    logo: `${DOMAIN}/images/og-social-share.png`,
    description: "Engineering and integration of robotic painting systems and paint booth automation for automotive, industrial, appliance, and aerospace manufacturing.",
    foundingDate: "2000",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 50,
      maxValue: 200,
    },
    areaServed: "Worldwide",
    knowsAbout: [
      "Robotic spray painting",
      "Paint booth automation",
      "Industrial coating systems",
      "Electrostatic painting",
      "HVLP spray technology",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "info@tdpaintcell.com",
      availableLanguage: ["English", "Chinese", "Japanese"],
    },
    sameAs: [],
  },
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${DOMAIN}/about#webpage`,
    name: "About TD Robotic Painting Systems",
    description: "Learn about TD's 25+ years of experience engineering robotic painting systems. 500+ systems deployed across 30+ countries with 98% customer satisfaction.",
    url: `${DOMAIN}/about`,
    isPartOf: { "@id": `${DOMAIN}/#website` },
    about: { "@id": `${DOMAIN}/#organization` },
    mainEntity: { "@id": `${DOMAIN}/#organization` },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${DOMAIN}/about#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${DOMAIN}/` },
      { "@type": "ListItem", position: 2, name: "About", item: `${DOMAIN}/about` },
    ],
  },
];

export default function About() {
  const { t } = useI18n();

  const stats = [
    { value: "500+", label: t.about?.systemsDeployed || "Systems Deployed" },
    { value: "25+", label: t.about?.yearsExperience || "Years Experience" },
    { value: "30+", label: t.about?.countriesServed || "Countries Served" },
    { value: "98%", label: t.about?.customerSatisfaction || "Customer Satisfaction" },
  ];

  const values = [
    { icon: Award, title: t.about?.engineeringExcellence || "Engineering Excellence", description: t.about?.engineeringExcellenceDesc || "" },
    { icon: Users, title: t.about?.customerPartnership || "Customer Partnership", description: t.about?.customerPartnershipDesc || "" },
    { icon: Globe, title: t.about?.globalCapability || "Global Capability", description: t.about?.globalCapabilityDesc || "" },
    { icon: Wrench, title: t.about?.lifecycleSupport || "Lifecycle Support", description: t.about?.lifecycleSupportDesc || "" },
  ];

  return (
    <>
      <Helmet>
        <title>About TD Robotic Painting Systems — 25+ Years of Automation Excellence</title>
        <meta name="description" content="TD Robotic Painting Systems: 25+ years engineering robotic spray painting and paint booth automation. 500+ systems deployed across 30+ countries with 98% customer satisfaction." />
        <link rel="canonical" href={`${DOMAIN}/about`} />
        {schemas.map((s, i) => (
          <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
        ))}
      </Helmet>

      <section className="bg-muted border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t.about?.title || "About PaintCell"}</h1>
            <p className="text-lg text-muted-foreground">{t.about?.subtitle || ""}</p>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">{t.about?.ourStory || "Our Story"}</h2>
          <div className="prose prose-lg text-muted-foreground space-y-4">
            <p>{t.about?.storyP1 || ""}</p>
            <p>{t.about?.storyP2 || ""}</p>
            <p>{t.about?.storyP3 || ""}</p>
          </div>
        </div>
      </Section>

      <Section variant="default">
        <SectionHeader title={t.about?.whatWeStandFor || "What We Stand For"} description={t.about?.valuesSubtitle || ""} />
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

      <section className="bg-muted border-t border-border">
        <div className="container-wide py-16 md:py-24">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t.about?.discussProject || "Let's Discuss Your Project"}</h2>
            <p className="text-muted-foreground mb-6">{t.about?.discussProjectDesc || ""}</p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
              <Link to="/quote" className="flex items-center gap-2">
                {t.about?.configurePaintCell || "Configure Paint Cell"}
                <ChevronRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}