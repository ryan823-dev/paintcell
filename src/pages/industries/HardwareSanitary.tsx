import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ChevronRight, Send, AlertTriangle, Layers, Settings2,
  Clock, HelpCircle, Bot, MessageSquare, Upload,
  User, CalendarDays, FileText, Target, Wrench, BarChart3, Droplets
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

const DOMAIN = "https://tdpaintcell.com";

const faqs = [
  { question: "What finishes can replace chrome plating on hardware?", answer: "PVD (Physical Vapor Deposition) look-alike coatings, chrome-effect lacquers, and metallic basecoat/clearcoat systems provide chrome-like appearance without hexavalent chromium. These alternatives meet RoHS and REACH requirements while maintaining decorative appeal." },
  { question: "Can robotic systems handle small, complex-shaped hardware parts?", answer: "Yes. Fixtures with multiple part holders allow batch processing of small items. 6-axis robots with precision spray guns maintain consistent coverage on complex geometries including handles, knobs, hinges, and fittings." },
  { question: "How do you ensure consistent color on decorative hardware?", answer: "Closed-loop spray parameter control, climate-controlled booths, and automated paint supply systems maintain consistent color, gloss, and metallic effect across production batches. Statistical process control monitors key parameters." },
  { question: "What about coating bathroom fixtures and sanitary ware?", answer: "Sanitary ware requires moisture-resistant, chemical-resistant coatings. Robotic systems apply epoxy primers and polyurethane or acrylic topcoats uniformly on complex basin, toilet, and bathtub geometries." },
  { question: "How do you handle high-mix production with many SKUs?", answer: "Recipe-based programming with barcode or RFID part identification enables automatic parameter switching. Fixture systems accommodate multiple part types with minimal changeover time." },
  { question: "How long does deployment typically take?", answer: "Typically 8-14 weeks after design approval, depending on fixture complexity, color count, and surface preparation requirements." },
];

const schemas = [
  { "@context": "https://schema.org", "@type": "Service", "@id": `${DOMAIN}/industries/hardware-sanitary#service`, name: "Hardware & Sanitary Coating Automation", description: "Robotic spray coating systems for hardware fittings, bathroom fixtures, and sanitary ware. Decorative and protective finishes including chrome alternatives, metallic effects, and chemical-resistant coatings.", provider: { "@id": `${DOMAIN}/#organization` }, serviceType: "Robotic Coating System Integration", areaServed: "Worldwide" },
  { "@context": "https://schema.org", "@type": "FAQPage", "@id": `${DOMAIN}/industries/hardware-sanitary#faq`, mainEntity: faqs.map(f => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", "@id": `${DOMAIN}/industries/hardware-sanitary#breadcrumb`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${DOMAIN}/` }, { "@type": "ListItem", position: 2, name: "Industries", item: `${DOMAIN}/industries/` }, { "@type": "ListItem", position: 3, name: "Hardware & Sanitary", item: `${DOMAIN}/industries/hardware-sanitary` }] },
];

const workflowSteps = [
  { title: "Part & finish analysis", desc: "Substrate materials, geometry, target finish (metallic, matte, gloss, chrome-effect)" },
  { title: "Fixture design", desc: "Multi-part fixtures for batch processing, orientation for optimal spray access" },
  { title: "System engineering", desc: "Robot selection, booth sizing, spray technology, surface prep integration" },
  { title: "Recipe development", desc: "Spray parameters per finish type, color matching, film build targets" },
  { title: "Build & test", desc: "System assembly, fixture validation, finish quality verification" },
  { title: "Installation & training", desc: "On-site setup, operator training, production qualification" },
];

const partCategories = [
  { category: "Door & Cabinet Hardware", examples: "Handles, knobs, hinges, pulls, lock escutcheons, shelf brackets" },
  { category: "Bathroom Fixtures", examples: "Faucet bodies, shower heads, towel bars, soap dispensers, robe hooks" },
  { category: "Kitchen Hardware", examples: "Cabinet pulls, drawer slides, sink accessories, range hood components" },
  { category: "Sanitary Ware", examples: "Basin shells, toilet cisterns, bathtub exteriors, bidet housings" },
  { category: "Architectural Hardware", examples: "Window handles, door closers, panic bars, railing connectors" },
  { category: "Furniture Fittings", examples: "Leg caps, casters, drawer runners, shelf supports, connecting bolts" },
];

export default function HardwareSanitary() {
  const [inputValue, setInputValue] = useState("We manufacture bathroom faucets and door handles, need consistent metallic finish replacing chrome plating.");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleStartConsultation = () => {
    sessionStorage.setItem("project-init-message", inputValue.trim());
    sessionStorage.setItem("industry-context", JSON.stringify({ industry: "hardware-sanitary", finish: "decorative / chrome-alternative", throughput: "medium-high" }));
    const btn = document.querySelector("[data-assistant-trigger]") as HTMLButtonElement;
    if (btn) btn.click();
  };

  return (
    <>
      <Helmet>
        <title>Hardware & Sanitary Coating Automation | Decorative Finishing | TD</title>
        <meta name="description" content="Robotic spray coating systems for hardware fittings and sanitary ware. Decorative finishes, chrome alternatives, and chemical-resistant coatings for handles, faucets, fixtures, and bathroom products." />
        <link rel="canonical" href={`${DOMAIN}/industries/hardware-sanitary`} />
        {schemas.map((s, i) => (<script key={i} type="application/ld+json">{JSON.stringify(s)}</script>))}
      </Helmet>
      <div className="min-h-screen bg-background">
        <div className="container-wide pt-4 pb-2">
          <Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbLink asChild><Link to="/industries">Industries</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Hardware & Sanitary</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
        </div>

        <section className="border-b border-border"><div className="container-wide py-12 md:py-20">
          <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold mb-6 leading-tight">Hardware & Sanitary Coating Automation</h1>
          <div className="max-w-3xl space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
            <p>Hardware and sanitary coating automation is the engineering and integration of robotic spray systems, precision fixturing, and climate-controlled environments to deliver consistent decorative and protective finishes on fittings, fixtures, and sanitary products.</p>
            <p>TD Robotic Painting Systems integrates robotic coating cells for hardware manufacturers, sanitary ware producers, and architectural hardware companies requiring high-quality decorative finishes, chrome-alternative coatings, and chemical-resistant surface treatments.</p>
          </div>
        </div></section>

        <section className="border-b border-border section-gradient"><div className="container-wide py-12 md:py-16">
          <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"><Target className="h-3.5 w-3.5" />Application Scope</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Typical Hardware & Sanitary Components</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {partCategories.map((item, i) => (<Card key={i} className="border-border bg-card"><CardContent className="p-4"><h3 className="font-semibold text-sm mb-2 flex items-center gap-2"><Droplets className="h-4 w-4 text-accent" />{item.category}</h3><p className="text-muted-foreground text-xs leading-relaxed">{item.examples}</p></CardContent></Card>))}
          </div>
        </div></section>

        <section className="border-b border-border"><div className="container-wide py-12 md:py-16">
          <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"><AlertTriangle className="h-3.5 w-3.5" />Industry Challenges</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Hardware Coating Challenges</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside max-w-2xl">
            <li>high decorative finish standards (gloss, metallic effect, color consistency)</li>
            <li>small, complex-shaped parts requiring full coverage on all surfaces</li>
            <li>chrome-plating phase-out driving demand for coating alternatives (RoHS, REACH)</li>
            <li>high SKU count with frequent finish/color changes</li>
            <li>chemical and moisture resistance requirements for bathroom environments</li>
            <li>fixture design complexity for batch processing multiple part shapes</li>
            <li>scratch and wear resistance on high-touch surfaces</li>
          </ul>
        </div></section>

        <section className="border-b border-border section-gradient"><div className="container-wide py-12 md:py-16">
          <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"><Layers className="h-3.5 w-3.5" />Coating Technologies</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Finish Systems for Hardware & Sanitary</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            <div>
              <h3 className="font-semibold text-sm mb-3">Decorative Finishes</h3>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                <li>Chrome-effect lacquers (hexavalent chrome-free alternatives)</li>
                <li>Metallic basecoat / clearcoat systems (brushed nickel, brass, bronze)</li>
                <li>High-gloss and satin topcoats</li>
                <li>Soft-touch and matte coatings for premium feel</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-3">Protective Coatings</h3>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                <li>Epoxy primers for corrosion protection on zinc/zamak substrates</li>
                <li>Chemical-resistant clearcoats for bathroom environments</li>
                <li>UV-stable topcoats for window and exterior hardware</li>
                <li>Anti-fingerprint and easy-clean functional coatings</li>
              </ul>
            </div>
          </div>
        </div></section>

        <section className="border-b border-border"><div className="container-wide py-12 md:py-16">
          <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"><Wrench className="h-3.5 w-3.5" />Scope of Delivery</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">What TD Delivers for Hardware & Sanitary</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside max-w-2xl">
            <li>robotic coating cell engineering with precision spray guns for small parts</li>
            <li>multi-part fixture design and manufacturing for batch processing</li>
            <li>climate-controlled booth environments for decorative finish consistency</li>
            <li>color change systems for high-SKU production flexibility</li>
            <li>surface preparation integration (cleaning, priming, adhesion promotion)</li>
            <li>recipe management with part identification (barcode, RFID, vision)</li>
            <li>quality control integration (gloss meters, color spectrophotometers)</li>
          </ul>
          <p className="text-muted-foreground text-sm mt-4">Related: <Link to="/industries/metal-parts-finishing" className="text-accent underline underline-offset-2 hover:text-accent/80">Metal Parts Finishing</Link> · <Link to="/industries/plastics-composites" className="text-accent underline underline-offset-2 hover:text-accent/80">Plastics & Composites</Link></p>
        </div></section>

        <section className="border-b border-border section-gradient"><div className="container-wide py-12 md:py-16">
          <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"><Clock className="h-3.5 w-3.5" />Lead Time</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Deployment Timeline</h2>
          <p className="font-semibold text-foreground text-lg">8-14 weeks after design approval</p>
          <p className="text-muted-foreground text-sm mt-1">(extended for complex fixture systems, many color variants, or surface prep integration)</p>
        </div></section>

        <section className="border-b border-border"><div className="container-wide py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Start your hardware coating assessment</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl">Tell us about your products, finish requirements, and production volume.</p>
          <div className={cn("rounded-2xl border transition-all duration-300 p-1 bg-card max-w-2xl mb-6", isFocused ? "border-accent/40 shadow-[0_0_24px_-5px_hsl(192_70%_38%/0.2)]" : "border-border hover:border-accent/20")}>
            <Textarea value={inputValue} onChange={(e) => setInputValue(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleStartConsultation(); } }} className={cn("min-h-[80px] resize-none border-0 bg-transparent text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0 text-[15px] leading-relaxed rounded-xl px-5 py-3")} />
            <div className="flex items-center justify-end px-3 pb-3 pt-1"><Button onClick={handleStartConsultation} className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-9 px-5 gap-2 rounded-xl"><Send className="h-3.5 w-3.5" />Start consultation</Button></div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleStartConsultation} className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-11 px-6 gap-2 rounded-xl"><Bot className="h-4 w-4" />Start project assessment</Button>
            <Button variant="outline" onClick={() => { const btn = document.querySelector("[data-assistant-trigger]") as HTMLButtonElement; if (btn) btn.click(); }} className="h-11 px-6 gap-2 rounded-xl"><MessageSquare className="h-4 w-4" />Talk to an engineer</Button>
            <Button variant="outline" onClick={() => navigate("/quote")} className="h-11 px-6 gap-2 rounded-xl"><Upload className="h-4 w-4" />Upload specifications</Button>
          </div>
        </div></section>

        <section className="border-b border-border section-gradient"><div className="container-wide py-12 md:py-16">
          <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"><BarChart3 className="h-3.5 w-3.5" />Benefits</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Why Robotic Coating for Hardware & Sanitary</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside max-w-2xl">
            <li>consistent decorative finish across all surfaces of complex small parts</li>
            <li>chrome-free alternatives meeting RoHS and REACH compliance</li>
            <li>batch processing of multiple parts per cycle for high throughput</li>
            <li>recipe-driven production for fast changeover between finish types</li>
            <li>reduced rework and rejection rates on high-value decorative items</li>
            <li>chemical and moisture resistance validated through automated process control</li>
            <li>reduced operator exposure to spray chemicals</li>
          </ul>
          <p className="text-muted-foreground text-sm mt-4">Further reading: <Link to="/resources/knowledge/color-change-systems" className="text-accent underline underline-offset-2 hover:text-accent/80">Color Change Systems</Link> · <Link to="/resources/knowledge/spray-technology-guide" className="text-accent underline underline-offset-2 hover:text-accent/80">Spray Technology Guide</Link></p>
        </div></section>

        <section className="border-b border-border"><div className="container-wide py-12 md:py-16">
          <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"><Settings2 className="h-3.5 w-3.5" />Implementation</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Implementation Workflow</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workflowSteps.map((step, i) => (<div key={i} className="flex gap-3"><div className="flex flex-col items-center"><span className="flex items-center justify-center h-8 w-8 rounded-full bg-accent text-accent-foreground text-xs font-bold shrink-0">{i + 1}</span>{i < workflowSteps.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}</div><div className="pb-6"><h3 className="font-semibold text-sm mb-1">{step.title}</h3><p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p></div></div>))}
          </div>
        </div></section>

        <section className="border-b border-border section-gradient"><div className="container-wide py-10 md:py-12">
          <Card className="border-border bg-card"><CardContent className="p-6 flex flex-col sm:flex-row gap-6 text-sm">
            <div className="flex items-start gap-3"><User className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" /><div><div className="font-semibold">Author</div><div className="text-muted-foreground">TD Engineering Team</div></div></div>
            <div className="flex items-start gap-3"><CalendarDays className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" /><div><div className="font-semibold">Last updated</div><div className="text-muted-foreground">2026-02-27</div></div></div>
            <div className="flex items-start gap-3"><FileText className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" /><div><div className="font-semibold">Scope</div><div className="text-muted-foreground">Hardware and sanitary product coating automation including fittings, fixtures, bathroom products, and architectural hardware.</div></div></div>
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
        <ExploreLinks currentPath="/industries/hardware-sanitary" />
      </div>
    </>
  );
}
