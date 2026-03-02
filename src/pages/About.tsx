import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { ChevronRight, Award, Users, Globe, Wrench, Building2, Rocket, Calendar, MapPin } from "lucide-react";
import { useI18n } from "@/i18n";

const DOMAIN = "https://tdpaintcell.com";

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${DOMAIN}/#organization`,
    name: "TD Robotic Painting Systems",
    alternateName: ["PaintCell", "Shanghai Tudou Technology Co., Ltd.", "上海涂豆科技有限公司"],
    url: DOMAIN,
    logo: `${DOMAIN}/images/og-social-share.png`,
    description: "Engineering and integration of robotic painting systems and paint booth automation for automotive, industrial, appliance, and aerospace manufacturing.",
    foundingDate: "2010",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: 38,
    },
    areaServed: "Worldwide",
    knowsAbout: [
      "Robotic spray painting",
      "Paint booth automation",
      "Industrial coating systems",
      "Electrostatic painting",
      "HVLP spray technology",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Room D23, 4th Floor, Building D, No. 399 Jianyun Road",
      addressLocality: "Pudong New District",
      addressRegion: "Shanghai",
      addressCountry: "CN",
    },
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
    description: "Learn about TD's 15+ years of experience engineering robotic painting systems. 500+ systems deployed across 30+ countries serving automotive OEMs and industrial manufacturers.",
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

const milestones = [
  { year: "2010", title: "Company Founded", description: "Shanghai Tudou Technology established in Zhangjiang Hi-Tech Park, Pudong, Shanghai." },
  { year: "2015", title: "Strategic Investment", description: "Received strategic investment from A-share listed company, validating our technology leadership." },
  { year: "2018", title: "EV Market Entry", description: "Secured first new energy vehicle OEM contracts with leading Chinese EV manufacturers." },
  { year: "2021", title: "Shenzhen Center", description: "Established Shenzhen Technical Center in partnership with CASC Aerospace Long-Hit." },
  { year: "2024", title: "International Expansion", description: "Expanded to international markets with VINFAST project in Thailand." },
];

export default function About() {
  const { t } = useI18n();

  const stats = [
    { value: "500+", label: t.about?.systemsDeployed || "Systems Deployed" },
    { value: "15+", label: t.about?.yearsExperience || "Years Experience" },
    { value: "30+", label: t.about?.countriesServed || "Countries Served" },
    { value: "38", label: "Engineering Team" },
  ];

  const values = [
    { icon: Award, title: t.about?.engineeringExcellence || "Engineering Excellence", description: t.about?.engineeringExcellenceDesc || "Top technical talents from leading robot companies and automotive enterprises with 15+ years industry experience." },
    { icon: Users, title: t.about?.customerPartnership || "Customer Partnership", description: t.about?.customerPartnershipDesc || "Serving automotive OEMs, Tier 1 suppliers, and industrial manufacturers with turnkey solutions." },
    { icon: Globe, title: t.about?.globalCapability || "Global Capability", description: t.about?.globalCapabilityDesc || "Projects across China and expanding internationally with VINFAST Thailand deployment." },
    { icon: Wrench, title: t.about?.lifecycleSupport || "Lifecycle Support", description: t.about?.lifecycleSupportDesc || "Complete supplier ecosystem with ABB, FANUC, Yaskawa, Graco, SAMES partnerships." },
  ];

  return (
    <>
      <Helmet>
        <title>About TD Robotic Painting Systems — 15+ Years of Automation Excellence</title>
        <meta name="description" content="TD Robotic Painting Systems (Shanghai Tudou Technology): 15+ years engineering robotic spray painting and paint booth automation. Serving Chery, Geely, NIO, Leapmotor and 500+ systems deployed." />
        <link rel="canonical" href={`${DOMAIN}/about`} />
        {schemas.map((s, i) => (
          <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
        ))}
      </Helmet>

      <section className="section-dark border-b border-white/10">
        <div className="container-wide py-12 md:py-16">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">{t.about?.title || "About TD Painting Systems"}</h1>
            <p className="text-lg text-white/70">International industrial coating system expert providing turnkey painting solutions for automotive OEMs, Tier 1 suppliers, and industrial manufacturers worldwide.</p>
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
              <strong className="text-foreground">Shanghai Tudou Technology Co., Ltd.</strong> was established in September 2010 in Zhangjiang Hi-Tech Park, Pudong New District, Shanghai. With a registered capital of RMB 20 million, we are an innovative automation company integrating design, R&D, manufacturing, installation, commissioning, and service.
            </p>
            <p>
              Since our founding, we have focused on robotic automation and related products. Our team comprises top technical talents from leading domestic and international robot companies and well-known automotive enterprises, all with over 15 years of industry experience.
            </p>
            <p>
              TD serves high-end clients across automotive body shops, automotive parts, rail transit, aerospace, construction machinery, 3C electronics, and furniture/bathroom industries — providing complete turnkey solutions that have earned high recognition from our customers.
            </p>
          </div>
        </div>
      </Section>

      {/* Company Timeline */}
      <Section variant="default">
        <SectionHeader title="Company Milestones" description="Key moments in our growth journey" />
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
            {milestones.map((milestone, i) => (
              <div key={milestone.year} className={`relative flex items-start gap-6 mb-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'} pl-12 md:pl-0`}>
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

      {/* Aerospace Partnership Highlight */}
      <Section variant="muted">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-accent text-sm font-semibold mb-4">
              <Rocket className="h-4 w-4" />
              Strategic Partnership
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">CASC Aerospace Collaboration</h2>
            <p className="text-muted-foreground mb-4">
              Our Shenzhen Technical Center is established in partnership with <strong className="text-foreground">China Aerospace Science and Technology Corporation (CASC)</strong> subsidiary — Aerospace Long-Hit Intelligent Equipment.
            </p>
            <p className="text-muted-foreground mb-6">
              This collaboration brings aerospace-grade precision and quality standards to our industrial coating solutions, ensuring the highest levels of engineering excellence.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-accent" />
                Shenzhen Technical Center
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="h-4 w-4 text-accent" />
                Joint R&D Facility
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="/images/office/shenzhen-office-sign.jpg" 
              alt="TD Painting Systems Shenzhen Office with CASC Aerospace Partnership" 
              className="rounded-xl shadow-lg w-full"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-3">
              <p className="text-white text-sm font-medium">Shenzhen Technical Center — CASC Aerospace Long-Hit</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Team Photo */}
      <Section variant="default">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <img 
              src="/images/team/team-shenzhen.jpg" 
              alt="TD Painting Systems Engineering Team at Shenzhen Office" 
              className="rounded-xl shadow-lg w-full"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Engineering Team</h2>
            <p className="text-muted-foreground mb-4">
              Our 38-member team includes 17 engineers, 7 technical specialists, and experienced project managers. All team members have 5+ years of industry experience in automotive painting, industrial automation, and system integration.
            </p>
            <p className="text-muted-foreground mb-6">
              We have successfully executed robotic automation painting projects for entire vehicles, automotive parts, rail transit, aerospace, construction machinery, 3C electronics, and furniture industries.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-accent mb-1">17</div>
                <div className="text-sm text-muted-foreground">Engineering Staff</div>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-accent mb-1">7</div>
                <div className="text-sm text-muted-foreground">Technical Specialists</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeader title={t.about?.whatWeStandFor || "What We Stand For"} description="Our core values and commitments" />
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
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">{t.about?.discussProject || "Let's Discuss Your Project"}</h2>
            <p className="text-white/60 mb-6">Tell us about your painting automation requirements. Our engineering team will provide a detailed assessment.</p>
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