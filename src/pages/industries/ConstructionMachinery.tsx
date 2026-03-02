import { useEffect, useState, useMemo } from "react";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { useLocalizedNavigate as useNavigate } from "@/hooks/useLocalizedNavigate";
import { Helmet } from "react-helmet-async";
import {
  ChevronRight, Send, AlertTriangle, Layers, Settings2,
  Clock, HelpCircle, Bot, MessageSquare, Upload,
  User, CalendarDays, FileText, Target, Wrench, BarChart3, HardHat
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from "@/components/ui/accordion";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { ExploreLinks } from "@/components/seo/ExploreLinks";
import { useI18n } from "@/i18n";

const DOMAIN = "https://tdpaintcell.com";

const partCategories = [
  { category: "Excavator Components", examples: "Boom arms, buckets, cab frames, counterweights, track frames" },
  { category: "Loader & Dozer Parts", examples: "Lift arms, bucket linkages, blade assemblies, ROPS structures" },
  { category: "Crane Components", examples: "Boom sections, outrigger beams, turntable assemblies, counterweights" },
  { category: "Agricultural Equipment", examples: "Tractor frames, implement arms, grain handling, harvester components" },
  { category: "Mining Equipment", examples: "Dump body panels, drill rig frames, conveyor structures, crusher housings" },
  { category: "Material Handling", examples: "Forklift masts, pallet rack beams, container frames, lifting equipment" },
];

const workflowSteps = [
  { title: "Assessment", desc: "Part dimensions, coating spec, production volume, booth situation" },
  { title: "System design", desc: "Robot reach analysis, rail system, booth sizing, airflow design" },
  { title: "Integration", desc: "Robot programming, recipe development, conveyor integration" },
  { title: "Testing", desc: "Film build validation, adhesion testing, cycle time verification" },
  { title: "Installation", desc: "On-site setup, utility connections, safety commissioning" },
  { title: "Qualification", desc: "Production trials, operator training, process handover" },
];

export default function ConstructionMachinery() {
  const { t } = useI18n();
  const [inputValue, setInputValue] = useState("We manufacture excavator boom arms and need consistent protective coating for outdoor durability.");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const faqs = useMemo(() => [
    { question: t.industryFaqs.construction.q1, answer: t.industryFaqs.construction.a1 },
    { question: t.industryFaqs.construction.q2, answer: t.industryFaqs.construction.a2 },
    { question: t.industryFaqs.construction.q3, answer: t.industryFaqs.construction.a3 },
    { question: t.industryFaqs.construction.q4, answer: t.industryFaqs.construction.a4 },
    { question: t.industryFaqs.construction.q5, answer: t.industryFaqs.construction.a5 },
    { question: t.industryFaqs.construction.q6, answer: t.industryFaqs.construction.a6 },
  ], [t]);

  const schemas = useMemo(() => [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${DOMAIN}/#organization`,
      name: "TD Robotic Painting Systems",
      url: DOMAIN,
      logo: `${DOMAIN}/images/td-logo.png`,
      description: "Engineering and integration of robotic painting systems and paint booth automation.",
      contactPoint: { "@type": "ContactPoint", contactType: "sales", email: "info@tdpaintcell.com" },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${DOMAIN}/#website`,
      name: "TD Robotic Painting Systems",
      url: `${DOMAIN}/`,
      publisher: { "@id": `${DOMAIN}/#organization` },
      inLanguage: "en",
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${DOMAIN}/industries/construction-machinery#service`,
      name: "Construction Machinery Coating Automation",
      description: "Robotic painting systems for construction and heavy equipment with protective coatings.",
      provider: { "@id": `${DOMAIN}/#organization` },
      serviceType: "Robotic Coating System Integration",
      areaServed: "Worldwide",
      mainEntityOfPage: { "@id": `${DOMAIN}/industries/construction-machinery#webpage` },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${DOMAIN}/industries/construction-machinery#faq`,
      mainEntity: faqs.map(f => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${DOMAIN}/industries/construction-machinery#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${DOMAIN}/` },
        { "@type": "ListItem", position: 2, name: "Industries", item: `${DOMAIN}/industries/` },
        { "@type": "ListItem", position: 3, name: "Construction Machinery", item: `${DOMAIN}/industries/construction-machinery` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${DOMAIN}/industries/construction-machinery#webpage`,
      name: "Construction Machinery Coating Automation",
      url: `${DOMAIN}/industries/construction-machinery`,
      isPartOf: { "@id": `${DOMAIN}/#website` },
      mainEntity: { "@id": `${DOMAIN}/industries/construction-machinery#service` },
      inLanguage: "en",
    },
  ], [faqs]);

  const handleStartConsultation = () => {
    sessionStorage.setItem("project-init-message", inputValue.trim());
    sessionStorage.setItem("industry-context", JSON.stringify({ industry: "construction-machinery", finish: "heavy-duty protective", throughput: "medium" }));
    const btn = document.querySelector("[data-assistant-trigger]") as HTMLButtonElement;
    if (btn) btn.click();
  };

  return (
    <>
      <Helmet>
        <title>Construction Machinery Coating Automation | Heavy Equipment Painting | TD</title>
        <meta name="description" content="Robotic painting systems for construction and heavy equipment. Heavy-duty protective coatings for excavators, loaders, cranes, and industrial machinery with consistent film build and corrosion protection." />
        <link rel="canonical" href={`${DOMAIN}/industries/construction-machinery`} />
        {schemas.map((s, i) => (<script key={i} type="application/ld+json">{JSON.stringify(s)}</script>))}
      </Helmet>
      <div className="min-h-screen bg-background">
        <div className="container-wide pt-4 pb-2">
          <Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbLink asChild><Link to="/industries">Industries</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Construction Machinery</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
        </div>

        <section className="border-b border-border"><div className="container-wide py-12 md:py-20">
          <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold mb-6 leading-tight">Construction Machinery Coating Automation</h1>
          <div className="max-w-3xl space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
            <p>Construction machinery coating automation is the engineering and integration of robotic spray systems, large-format paint booths, and heavy-duty process controls to deliver consistent protective finishes on oversized structural components and heavy equipment.</p>
            <p>TD Robotic Painting Systems integrates robotic painting cells with extended-reach capability for construction equipment manufacturers, agricultural OEMs, and heavy industry producers worldwide.</p>
          </div>
        </div></section>

        <section className="border-b border-border "><div className="container-wide py-12 md:py-16">
          <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"><Target className="h-3.5 w-3.5" />Application Scope</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Typical Components</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {partCategories.map((item, i) => (<Card key={i} className="border-border bg-card"><CardContent className="p-4"><h3 className="font-semibold text-sm mb-2 flex items-center gap-2"><HardHat className="h-4 w-4 text-accent" />{item.category}</h3><p className="text-muted-foreground text-xs leading-relaxed">{item.examples}</p></CardContent></Card>))}
          </div>
        </div></section>

        <section className="border-b border-border"><div className="container-wide py-12 md:py-16">
          <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"><AlertTriangle className="h-3.5 w-3.5" />Production Challenges</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Heavy Equipment Coating Challenges</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside max-w-2xl">
            <li>large part dimensions (2-12m) requiring extended robot reach</li>
            <li>thick film build requirements (100-200+ microns) prone to runs and sags</li>
            <li>heavy weld seams, sharp edges, and complex geometries</li>
            <li>corrosion protection critical for outdoor/harsh environment operation</li>
            <li>inconsistent coverage in recessed areas and interior surfaces</li>
            <li>high paint consumption with manual spraying on large surfaces</li>
            <li>skilled labor shortage for large-scale spray operations</li>
          </ul>
        </div></section>

        <section className="border-b border-border "><div className="container-wide py-12 md:py-16">
          <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"><Layers className="h-3.5 w-3.5" />Engineering Logic</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">System Approach for Large Parts</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside max-w-2xl">
            <li>7th-axis rail systems extending robot reach to 8-12+ meters</li>
            <li>multi-robot configurations for simultaneous painting of large assemblies</li>
            <li>heavy-duty turntables and positioners for part rotation</li>
            <li>high-flow spray guns for thick film builds (airless, air-assisted airless)</li>
            <li>large-format booth design with proper airflow for oversized parts</li>
            <li>recipe management for mixed-model production</li>
          </ul>
          <p className="text-muted-foreground text-sm mt-6">For system integration overview, see <Link to="/solutions/robotic-painting-system" className="text-accent underline underline-offset-2 hover:text-accent/80">Robotic Painting System Integration</Link>.</p>
        </div></section>

        <section className="border-b border-border"><div className="container-wide py-12 md:py-16">
          <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"><Wrench className="h-3.5 w-3.5" />Scope of Delivery</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">What TD Delivers</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside max-w-2xl">
            <li>extended-reach robotic painting cell engineering and integration</li>
            <li>large-format booth design and construction</li>
            <li>heavy-duty part handling (turntables, positioners, conveyors)</li>
            <li>spray process optimization for thick protective coatings</li>
            <li>controls integration, HMI, and recipe management</li>
            <li>commissioning, operator training, and production startup</li>
          </ul>
          <p className="text-muted-foreground text-sm mt-4">Related: <Link to="/industries/metal-parts-finishing" className="text-accent underline underline-offset-2 hover:text-accent/80">Metal Parts Finishing</Link> · <Link to="/industries/automotive-painting" className="text-accent underline underline-offset-2 hover:text-accent/80">Automotive Painting</Link></p>
        </div></section>

        <section className="border-b border-border "><div className="container-wide py-12 md:py-16">
          <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"><Clock className="h-3.5 w-3.5" />Lead Time</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Deployment Timeline</h2>
          <p className="font-semibold text-foreground text-lg">10-16 weeks after design approval</p>
          <p className="text-muted-foreground text-sm mt-1">(extended for multi-robot systems, custom booth builds, or complex conveyor integration)</p>
        </div></section>

        <section className="border-b border-border"><div className="container-wide py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Start your heavy equipment coating assessment</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl">Tell us about your components (size, material), coating requirements, and production volume.</p>
          <div className={cn("rounded-2xl border transition-all duration-300 p-1 bg-card max-w-2xl mb-6", isFocused ? "border-accent/40 shadow-[0_0_24px_-5px_hsl(192_70%_38%/0.2)]" : "border-border hover:border-accent/20")}>
            <Textarea value={inputValue} onChange={(e) => setInputValue(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleStartConsultation(); } }} className={cn("min-h-[80px] resize-none border-0 bg-transparent text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0 text-[15px] leading-relaxed rounded-xl px-5 py-3")} />
            <div className="flex items-center justify-end px-3 pb-3 pt-1"><Button onClick={handleStartConsultation} className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-9 px-5 gap-2 rounded-xl"><Send className="h-3.5 w-3.5" />Start consultation</Button></div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleStartConsultation} className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-11 px-6 gap-2 rounded-xl"><Bot className="h-4 w-4" />Start project assessment</Button>
            <Button variant="outline" onClick={() => { const btn = document.querySelector("[data-assistant-trigger]") as HTMLButtonElement; if (btn) btn.click(); }} className="h-11 px-6 gap-2 rounded-xl"><MessageSquare className="h-4 w-4" />Talk to an engineer</Button>
          </div>
        </div></section>

        <section className="border-b border-border "><div className="container-wide py-12 md:py-16">
          <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"><BarChart3 className="h-3.5 w-3.5" />Benefits</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Why Robotic Coating for Heavy Equipment</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside max-w-2xl">
            <li>uniform film build on large surfaces for consistent corrosion protection</li>
            <li>coverage of hard-to-reach areas (interior surfaces, recessed geometries)</li>
            <li>reduced paint waste on large-area spraying (25-40% savings typical)</li>
            <li>faster cycle times with multi-robot simultaneous application</li>
            <li>reduced field warranty claims from coating failures</li>
            <li>less operator exposure to paint fumes in large booth environments</li>
          </ul>
        </div></section>

        <section className="border-b border-border"><div className="container-wide py-12 md:py-16">
          <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"><Settings2 className="h-3.5 w-3.5" />Implementation</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Implementation Workflow</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workflowSteps.map((step, i) => (<div key={i} className="flex gap-3"><div className="flex flex-col items-center"><span className="flex items-center justify-center h-8 w-8 rounded-full bg-accent text-accent-foreground text-xs font-bold shrink-0">{i + 1}</span>{i < workflowSteps.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}</div><div className="pb-6"><h3 className="font-semibold text-sm mb-1">{step.title}</h3><p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p></div></div>))}
          </div>
        </div></section>

        <section className="border-b border-border "><div className="container-wide py-10 md:py-12">
          <Card className="border-border bg-card"><CardContent className="p-6 flex flex-col sm:flex-row gap-6 text-sm">
            <div className="flex items-start gap-3"><User className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" /><div><div className="font-semibold">Author</div><div className="text-muted-foreground">TD Engineering Team</div></div></div>
            <div className="flex items-start gap-3"><CalendarDays className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" /><div><div className="font-semibold">Last updated</div><div className="text-muted-foreground">2026-02-27</div></div></div>
            <div className="flex items-start gap-3"><FileText className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" /><div><div className="font-semibold">Scope</div><div className="text-muted-foreground">Construction machinery and heavy equipment coating automation including excavators, loaders, cranes, and agricultural equipment.</div></div></div>
          </CardContent></Card>
        </div></section>

        <section><div className="container-wide py-12 md:py-16">
          <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"><HelpCircle className="h-3.5 w-3.5" />FAQ</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="max-w-3xl">
            <Accordion type="multiple" defaultValue={faqs.map((_, i) => `faq-${i}`)} className="space-y-2">
              {faqs.map((faq, i) => (<AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-5 bg-card"><AccordionTrigger className="text-sm font-medium text-left py-4 hover:no-underline">{faq.question}</AccordionTrigger><AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">{faq.answer}</AccordionContent></AccordionItem>))}
            </Accordion>
          </div>
        </div></section>
        {/* PROJECT REFERENCES — CONSTRUCTION */}
        <section className="border-b border-border bg-muted/30">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Project Track Record
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Construction Equipment Painting References</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              TD has delivered robotic painting systems for heavy equipment and construction machinery manufacturers, utilizing 7-axis rail-mounted robots for extended reach on large structural components.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                { client: "Major Excavator OEM (Zhuhai)", config: "4 Kawasaki robots on 7th-axis tracks", highlight: "Boom arms, frames — 12min cycle" },
                { client: "Weichai / Lovol Heavy Equipment", config: "Multi-robot protective coating line", highlight: "High-build 2K corrosion protection" },
                { client: "Baosteel Wheel (Chongqing)", config: "Robotic wheel painting system", highlight: "Aluminum wheel finishing line" },
              ].map((project, idx) => (
                <Card key={idx} className="border-border bg-card hover:border-accent/30 transition-colors">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-sm mb-2">{project.client}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{project.config}</p>
                    <div className="text-xs text-accent font-medium bg-accent/5 px-2 py-1 rounded inline-block">
                      {project.highlight}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <ExploreLinks currentPath="/industries/construction-machinery" />
      </div>
    </>
  );
}
