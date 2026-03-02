import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { ChevronRight, ArrowRight, Car, Truck, Rocket, MapPin, Zap, Play, Image, BarChart3, Factory, Bot } from "lucide-react";
import { useI18n } from "@/i18n";

const DOMAIN = "https://tdpaintcell.com";

const industryIcons: Record<string, React.ReactNode> = {
  Automotive: <Car className="h-5 w-5" />,
  Industrial: <Truck className="h-5 w-5" />,
  Aerospace: <Rocket className="h-5 w-5" />,
};

const projectMeta = [
  { location: "Kaifeng, China", robots: "Yaskawa + Ransburg", systems: "32 robots" },
  { location: "Wuhan, China", robots: "ABB + ABB Atomizer", systems: "10 robots" },
  { location: "Zhuhai, China", robots: "Kawasaki + Graco", systems: "4 robots" },
  { location: "Shenzhen, China", robots: "Strategic Partnership", systems: "CASC" },
];

const projectVideos = [
  { 
    id: "SKiURpSAWWY", 
    title: "Paint Line Facility Tour", 
    description: "Walkthrough of multi-station robotic spray booths" 
  },
  { 
    id: "rPuVP-NLk3Y", 
    title: "Centralized Paint Supply", 
    description: "Stainless steel pressure tanks & piping system" 
  },
  { 
    id: "rJWsR-kE_AE", 
    title: "Spray Booth Interior", 
    description: "Conveyor system & safety controls" 
  },
];

const oemGallery = [
  {
    src: "/images/projects/body-painting-yaskawa.jpg",
    title: "Yaskawa Body Painting Line",
    description: "4 Yaskawa robots painting complete vehicle body (BIW) with electrostatic rotary bells"
  },
  {
    src: "/images/projects/body-painting-abb.jpg",
    title: "ABB Robot Commissioning",
    description: "6 ABB IRB5500 robots during installation and commissioning phase"
  },
  {
    src: "/images/projects/body-painting-line.jpg",
    title: "Complete Paint Line",
    description: "Full vehicle body painting line with multi-robot configuration"
  },
];

export default function CaseStudies() {
  const { t } = useI18n();
  const cs = t.caseStudies || {};

  const caseStudies = [
    {
      id: 1, title: cs.study1Title || "Automotive Tier 1 Supplier", industry: cs.study1Industry || "Automotive",
      challenge: cs.study1Challenge || "", solution: cs.study1Solution || "",
      outcomes: [cs.study1Outcome1 || "", cs.study1Outcome2 || "", cs.study1Outcome3 || "", cs.study1Outcome4 || ""],
    },
    {
      id: 2, title: cs.study2Title || "Heavy Equipment Manufacturer", industry: cs.study2Industry || "Industrial",
      challenge: cs.study2Challenge || "", solution: cs.study2Solution || "",
      outcomes: [cs.study2Outcome1 || "", cs.study2Outcome2 || "", cs.study2Outcome3 || "", cs.study2Outcome4 || ""],
    },
    {
      id: 3, title: cs.study3Title || "Consumer Electronics Contract Manufacturer", industry: cs.study3Industry || "Electronics",
      challenge: cs.study3Challenge || "", solution: cs.study3Solution || "",
      outcomes: [cs.study3Outcome1 || "", cs.study3Outcome2 || "", cs.study3Outcome3 || "", cs.study3Outcome4 || ""],
    },
    {
      id: 4, title: cs.study4Title || "Aerospace Component Supplier", industry: cs.study4Industry || "Aerospace",
      challenge: cs.study4Challenge || "", solution: cs.study4Solution || "",
      outcomes: [cs.study4Outcome1 || "", cs.study4Outcome2 || "", cs.study4Outcome3 || "", cs.study4Outcome4 || ""],
    },
  ];

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${DOMAIN}/case-studies#webpage`,
      name: "Robotic Painting Automation Case Studies",
      description: "Real implementations demonstrating measurable improvements in quality, throughput, and operational efficiency across automotive, industrial, electronics, and aerospace industries.",
      url: `${DOMAIN}/case-studies`,
      isPartOf: { "@id": `${DOMAIN}/#website` },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: caseStudies.map((study, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Article",
            headline: study.title,
            description: study.challenge,
            articleSection: study.industry,
            author: { "@id": `${DOMAIN}/#organization` },
            publisher: { "@id": `${DOMAIN}/#organization` },
          },
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${DOMAIN}/case-studies#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${DOMAIN}/` },
        { "@type": "ListItem", position: 2, name: "Case Studies", item: `${DOMAIN}/case-studies` },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Case Studies — Robotic Painting Automation Success Stories | TD</title>
        <meta name="description" content="Explore real-world robotic painting automation implementations. Case studies from automotive, industrial, electronics, and aerospace industries showing measurable improvements in quality, throughput, and ROI." />
        <link rel="canonical" href={`${DOMAIN}/case-studies`} />
        <meta property="og:title" content="Case Studies — Robotic Painting Automation Success Stories | TD" />
        <meta property="og:description" content="Real-world robotic painting automation case studies across automotive, industrial, and aerospace industries." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${DOMAIN}/case-studies`} />
        <meta property="og:image" content={`${DOMAIN}/images/projects/body-painting-yaskawa.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Robotic Painting Automation Case Studies | TD" />
        <meta name="twitter:description" content="Real implementations showing measurable improvements in quality, throughput, and ROI." />
        <meta name="twitter:image" content={`${DOMAIN}/images/projects/body-painting-yaskawa.jpg`} />
        {schemas.map((s, i) => (
          <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
        ))}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "@id": `${DOMAIN}/case-studies#videos`,
          "name": "Robotic Painting Project Videos",
          "itemListElement": projectVideos.map((v, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "item": {
              "@type": "VideoObject",
              "name": v.title,
              "description": v.description,
              "thumbnailUrl": `https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`,
              "uploadDate": "2024-01-01",
              "contentUrl": `https://www.youtube.com/watch?v=${v.id}`,
              "embedUrl": `https://www.youtube.com/embed/${v.id}`,
              "publisher": { "@id": `${DOMAIN}/#organization` }
            }
          }))
        })}</script>
      </Helmet>

      <section className="section-dark border-b border-white/10">
        <div className="container-wide py-12 md:py-16">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">{cs.title || "Case Studies"}</h1>
            <p className="text-lg text-white/70">{cs.subtitle || ""}</p>
          </div>
        </div>
      </section>

      <Section variant="default">
        <div className="space-y-8">
          {caseStudies.map((study, idx) => (
            <div key={study.id} className="bg-card rounded-xl border border-border overflow-hidden hover:border-accent/30 transition-colors">
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full flex items-center gap-1.5">
                    {industryIcons[study.industry]}
                    {study.industry}
                  </span>
                  <h2 className="text-2xl font-bold">{study.title}</h2>
                </div>
                
                {/* Project Meta Info */}
                <div className="flex flex-wrap gap-4 mb-6 text-sm">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-accent" />
                    {projectMeta[idx]?.location}
                  </span>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Zap className="h-4 w-4 text-accent" />
                    {projectMeta[idx]?.robots}
                  </span>
                  <span className="px-2 py-0.5 bg-accent/5 text-accent rounded text-xs font-medium">
                    {projectMeta[idx]?.systems}
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-destructive" />
                      {cs.challenge || "Challenge"}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{study.challenge}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent" />
                      {cs.solution || "Solution"}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{study.solution}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      {cs.outcomes || "Outcomes"}
                    </h3>
                    <ul className="space-y-1">
                      {study.outcomes.map((outcome, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <ArrowRight className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Project Videos Section */}
      <Section variant="muted">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full mb-4">
            <Play className="h-4 w-4" />
            Project Videos
          </span>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Qingdao Huatao Painting Facility</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Take a virtual tour of a complete automotive plastic component painting line featuring ABB robots, centralized paint supply, and multi-station spray booths.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {projectVideos.map((video) => (
            <div key={video.id} className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="aspect-[9/16] relative">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">{video.title}</h3>
                <p className="text-sm text-muted-foreground">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-center text-sm text-muted-foreground mt-6">
          Project: Chengdu HTMS (Qingdao Huatao) — ABB IRB5500 + Centralized Paint Supply — Turnkey by TD
        </p>
      </Section>

      {/* OEM Body Painting Gallery */}
      <Section variant="default">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full mb-4">
            <Image className="h-4 w-4" />
            Vehicle OEM Projects
          </span>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Complete Body Painting Systems</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Full vehicle body-in-white (BIW) painting lines featuring Yaskawa and ABB robots with 200,000+ units annual capacity.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {oemGallery.map((item, idx) => (
            <div key={idx} className="bg-card rounded-xl border border-border overflow-hidden group hover:border-accent/30 transition-colors">
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 bg-accent/5 rounded-xl p-6 border border-accent/10">
          <div className="grid md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-accent">200K+</div>
              <div className="text-sm text-muted-foreground">Units/Year Capacity</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">32</div>
              <div className="text-sm text-muted-foreground">Robots per Line</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">5</div>
              <div className="text-sm text-muted-foreground">Coating Stations</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">Class A</div>
              <div className="text-sm text-muted-foreground">Finish Quality</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Industry Experience Data Section */}
      <Section variant="muted">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full mb-4">
            <BarChart3 className="h-4 w-4" />
            Industry Experience
          </span>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">By the Numbers</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Cumulative project experience across China's robotic painting automation market.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Geographic Reach */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">30+</div>
                <div className="text-sm text-muted-foreground">Cities Covered</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Deployment experience from Changchun to Hainan, Shanghai to Urumqi. Strong presence in all major automotive manufacturing clusters.
            </p>
          </div>

          {/* Scale Versatility */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Bot className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">1–169</div>
                <div className="text-sm text-muted-foreground">Robots per Project</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              From single-robot compact cells for parts suppliers to 169-robot complete vehicle OEM paint shops. 45% of projects in 11-40 robot mid-scale range.
            </p>
          </div>

          {/* Industry Focus */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Factory className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">60%+</div>
                <div className="text-sm text-muted-foreground">Automotive OEM</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Primary expertise in complete vehicle body painting. Remaining 40% spans tier-1 parts suppliers, heavy equipment, and general industrial coating.
            </p>
          </div>
        </div>

        {/* Project Lifecycle Bar */}
        <div className="mt-8 bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold mb-4 text-center">Full Project Lifecycle Capability</h3>
          <div className="flex rounded-full overflow-hidden h-4 bg-muted">
            <div className="bg-accent h-full" style={{ width: "60%" }} title="New Line Builds" />
            <div className="bg-blue-500 h-full" style={{ width: "33%" }} title="Line Modifications" />
            <div className="bg-emerald-500 h-full" style={{ width: "7%" }} title="Capacity Expansions" />
          </div>
          <div className="flex justify-between mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-accent inline-block" />
              New Line Builds (60%)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
              Modifications (33%)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              Expansions (7%)
            </span>
          </div>
        </div>
      </Section>

      <section className="section-dark border-t border-white/10">
        <div className="container-wide py-16 md:py-24">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">{cs.ctaTitle || "See How Automation Applies to Your Operation"}</h2>
            <p className="text-white/60 mb-6">{cs.ctaDesc || ""}</p>
          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link to="/quote" className="flex items-center gap-2">
              {t.about?.configurePaintCell || "Configure Paint Cell"}
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        </div>
      </section>
    </>
  );
}