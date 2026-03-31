import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { ChevronRight, Award, Users, Globe, Wrench, Building2, Rocket, Calendar, MapPin, ShieldCheck, Car, Factory, Zap, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/i18n";

const DOMAIN = "https://tdpaint.com";

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
      "Robotic painting",
      "Paint booth automation",
      "Industrial coating systems",
      "Electrostatic painting",
      "HVLP technology",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "4th Floor, Building 7, No. 3888 Beiqing Road",
      addressLocality: "Qingpu District",
      addressRegion: "Shanghai",
      addressCountry: "CN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "info@tdpaint.com",
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
  { year: "2010", title: "Company Founded", description: "Shanghai Tudou Technology established in Zhangjiang Hi-Tech Park, Pudong, Shanghai, with RMB 20 million registered capital." },
  { year: "2013", title: "First Major Automotive Project", description: "Delivered first large-scale automotive painting system for FAW-Toyota with ABB IRB5500 robots in 2-3-2 configuration." },
  { year: "2015", title: "Strategic Investment & ABB Partnership", description: "Received strategic investment from A-share listed company. Became authorized ABB system integrator for painting robots." },
  { year: "2018", title: "EV Market Entry", description: "Secured EV OEM contracts with leading Chinese EV manufacturers. Expanded to FANUC and Yaskawa robot platforms." },
  { year: "2019", title: "Multi-Brand Expansion", description: "Expanded robot integration capabilities to include FANUC MPX series, Kawasaki, and CMA platforms for diverse application scenarios." },
  { year: "2021", title: "Shenzhen Aerospace Center", description: "Established Shenzhen Technical Center in partnership with CASC Aerospace Long-Hit for aerospace-grade coating solutions." },
  { year: "2024", title: "International Expansion", description: "Expanded to international markets with VINFAST project in Thailand. Completed 17+ major automotive painting line projects." },
  { year: "2026", title: "Company Relocation", description: "Relocated headquarters to new facility in Qingpu District, Shanghai with expanded R&D and technical center." },
];

const certifications = [
  "ISO 9001 Quality Management System",
  "High-Tech Enterprise Certification",
  "Safety Production License",
  "Multiple Software Copyrights & Patents",
  "ABB Authorized System Integrator",
  "ATEX-Compliant System Design Capability",
];

const keyClients = [
  { name: "FAW-Toyota", sector: "Automotive OEM" },
  { name: "Zhengzhou Nissan", sector: "Automotive OEM" },
  { name: "Chengdu FAW-Toyota", sector: "Automotive OEM" },
  { name: "Guangdong FAW-Toyota", sector: "Automotive OEM" },
  { name: "VINFAST (Thailand)", sector: "Automotive OEM" },
  { name: "NorDAO Auto Systems", sector: "Tier 1 Supplier" },
  { name: "Changzhou Nanebot", sector: "Tier 1 Supplier" },
  { name: "Minth Group (Minshi)", sector: "Tier 1 Supplier" },
  { name: "Jitai Vehicle Technology", sector: "Tier 1 Supplier" },
  { name: "Wuhan Minhui Molding", sector: "Tier 1 Supplier" },
  { name: "Zhejiang Jinfeiji Group", sector: "Auto Parts" },
  { name: "Ningbo Xingtong Auto Parts", sector: "Auto Parts" },
  { name: "Qingdao Deshengtai Auto Parts", sector: "Auto Parts" },
  { name: "Changzhou Feichi Auto Tech", sector: "Auto Parts" },
  { name: "CASC Aerospace Long-Hit", sector: "Aerospace" },
  { name: "Siyang SECO Technology", sector: "Industrial" },
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
        <meta name="description" content="TD Robotic Painting Systems (Shanghai Tudou Technology): 15+ years engineering robotic painting and paint booth automation. Serving Chery, Geely, NIO, Leapmotor and 500+ systems deployed." />
        <link rel="canonical" href={`${DOMAIN}/about`} />
        <meta property="og:title" content="About TD Robotic Painting Systems — 15+ Years of Automation Excellence" />
        <meta property="og:description" content="15+ years engineering robotic painting and paint booth automation. Serving automotive OEMs and industrial manufacturers with 500+ systems deployed." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${DOMAIN}/about`} />
        <meta property="og:image" content={`${DOMAIN}/images/og-social-share.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About TD Robotic Painting Systems" />
        <meta name="twitter:description" content="15+ years engineering robotic painting and paint booth automation. 500+ systems deployed across 30+ countries." />
        <meta name="twitter:image" content={`${DOMAIN}/images/og-social-share.png`} />
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
              <strong className="text-foreground">Shanghai Tudou Technology Co., Ltd.</strong> (formerly Shanghai Angshan Intelligent Machinery Co., Ltd.) was established in September 2010 in Zhangjiang Hi-Tech Park, Pudong New District, Shanghai. With a paid-in capital of RMB 20 million, we are an innovative automation company integrating system design, R&D, manufacturing, installation, commissioning, and lifecycle service.
            </p>
            <p>
              Since our founding, we have specialized in robotic painting automation and intelligent boundary products for industrial coating applications. Our team comprises senior technical talents recruited from leading international robot companies (ABB, FANUC, Yaskawa) and well-known automotive enterprises, each bringing 15+ years of industry experience in painting process engineering, robot integration, and system commissioning.
            </p>
            <p>
              TD serves high-end clients across <strong className="text-foreground">automotive OEM body shops, automotive plastic components (bumpers, mirrors, trim), rail transit, construction machinery, 3C electronics, and furniture & sanitary ware industries</strong>. We deliver complete turnkey solutions — from initial feasibility assessment and system design through equipment supply, installation, robot programming, spray parameter optimization, and production validation.
            </p>
            <p>
              With 17+ completed major automotive painting line projects and deployment experience across 30+ cities in China plus international markets, TD has established itself as a trusted partner for manufacturers requiring high-quality, high-efficiency robotic coating systems.
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

      {/* Certifications & Qualifications */}
      <Section variant="muted">
        <SectionHeader title="Certifications & Qualifications" description="Industry-recognized standards ensuring quality, safety, and engineering excellence" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {certifications.map((cert) => (
            <div key={cert} className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border">
              <ShieldCheck className="h-5 w-5 text-accent shrink-0" />
              <span className="text-sm font-medium">{cert}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Robot Brand Partnerships */}
      <Section variant="default">
        <SectionHeader title="Technology Partnerships" description="Multi-brand robot and spray equipment integration capability" />
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-accent" />
              Robot Brands
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {["ABB (IRB5500, IRB6700)", "FANUC (MPX2600, MPX3500)", "Yaskawa", "Kawasaki", "KUKA", "CMA"].map((brand) => (
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
              Paint Equipment Brands
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {["SAMES KREMLIN", "Graco", "Ransburg", "Binks-Maple", "Carlisle", "Timmer"].map((brand) => (
                <div key={brand} className="flex items-center gap-2 p-3 rounded-lg bg-muted text-sm">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Key Clients */}
      <Section variant="muted">
        <SectionHeader title="Trusted by Industry Leaders" description="Selected clients across automotive, aerospace, and industrial sectors" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {keyClients.map((client) => (
            <div key={client.name} className="p-4 rounded-lg bg-card border border-border hover:border-accent/30 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                {client.sector === "Automotive OEM" ? <Car className="h-4 w-4 text-accent" /> :
                 client.sector === "Aerospace" ? <Rocket className="h-4 w-4 text-accent" /> :
                 <Factory className="h-4 w-4 text-accent" />}
                <span className="text-xs text-accent font-medium">{client.sector}</span>
              </div>
              <div className="font-medium text-sm">{client.name}</div>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-6">
          Project footprint spanning 30+ cities across China, with international deployments in Thailand and expanding.
        </p>
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