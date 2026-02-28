import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ChevronRight, Send, AlertTriangle, Layers, Settings2,
  Clock, HelpCircle, Bot, MessageSquare, Upload,
  User, CalendarDays, FileText, Target, Wrench, BarChart3, Plane
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
  { question: "What specifications govern aerospace coatings?", answer: "Aerospace coatings are governed by OEM specifications (Boeing BMS, Airbus AIMS), military specifications (MIL-PRF-85285, MIL-PRF-23377), and industry standards (AMS, SAE). Each coating application requires documented compliance with specific specification callouts." },
  { question: "Why is traceability so important in aerospace painting?", answer: "AS9100D and NADCAP require full traceability of coating processes. Every part must have documented records of paint batch, application parameters, environmental conditions, and operator/system identification for the full service life of the aircraft." },
  { question: "Can robotic systems handle low-volume aerospace production?", answer: "Yes. Semi-automatic cells with offline programming are designed for high-mix, low-volume production typical in aerospace. Recipe management allows quick changeover between different part types and coating specifications." },
  { question: "What about masking and multi-color schemes?", answer: "Aerospace parts often require complex masking for livery, markings, and functional zones. Systems can integrate automated masking, multi-pass color application, and vision-based verification." },
  { question: "How do you handle hazardous coatings like chromate primers?", answer: "Robotic application of hazardous coatings (chromate primers, cadmium-based paints) reduces operator exposure. Enclosed cells with proper ventilation, filtration, and waste handling ensure regulatory compliance." },
  { question: "How long does deployment typically take?", answer: "Typically 14-20 weeks after design approval due to specification validation, documentation requirements, and qualification testing. First article inspection (FAI) is part of the commissioning process." },
];

const schemas = [
  { "@context": "https://schema.org", "@type": "Service", "@id": `${DOMAIN}/industries/aerospace-defense#service`, name: "Aerospace & Defense Coating Automation", description: "Robotic spray coating systems for aerospace and defense components. Mil-spec and aerospace-grade finishing with full traceability, AS9100D compliance, and NADCAP-ready process control.", provider: { "@id": `${DOMAIN}/#organization` }, serviceType: "Robotic Coating System Integration", areaServed: "Worldwide" },
  { "@context": "https://schema.org", "@type": "FAQPage", "@id": `${DOMAIN}/industries/aerospace-defense#faq`, mainEntity: faqs.map(f => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", "@id": `${DOMAIN}/industries/aerospace-defense#breadcrumb`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${DOMAIN}/` }, { "@type": "ListItem", position: 2, name: "Industries", item: `${DOMAIN}/industries/` }, { "@type": "ListItem", position: 3, name: "Aerospace & Defense", item: `${DOMAIN}/industries/aerospace-defense` }] },
];

const workflowSteps = [
  { title: "Specification review", desc: "OEM specs, mil-specs, material callouts, traceability requirements" },
  { title: "Process qualification", desc: "Coating system validation, adhesion testing, salt spray, humidity" },
  { title: "System design", desc: "Robot selection, enclosed cell design, controls architecture" },
  { title: "Documentation", desc: "Process specifications, IPC/ITAR compliance documentation" },
  { title: "Build & test", desc: "FAI parts, process capability studies, parameter verification" },
  { title: "Installation", desc: "On-site setup, utility integration, safety validation" },
  { title: "Qualification", desc: "Production qualification, operator certification, handover" },
];

const partCategories = [
  { category: "Airframe Structures", examples: "Fuselage panels, wing skins, bulkheads, floor panels, fairings" },
  { category: "Flight Controls", examples: "Ailerons, flaps, rudders, elevators, spoilers" },
  { category: "Engine Components", examples: "Nacelles, cowlings, inlet guide vanes, exhaust components" },
  { category: "Interior Components", examples: "Sidewall panels, overhead bins, galley units, lavatory modules" },
  { category: "Landing Gear", examples: "Struts, doors, actuator housings, wheel wells" },
  { category: "Defense Systems", examples: "Radar housings, antenna covers, vehicle armor, weapon systems" },
];

export default function AerospaceDefense() {
  const [inputValue, setInputValue] = useState("We need automated primer and topcoat application for flight control surfaces, MIL-PRF-85285 compliant.");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleStartConsultation = () => {
    sessionStorage.setItem("project-init-message", inputValue.trim());
    sessionStorage.setItem("industry-context", JSON.stringify({ industry: "aerospace", finish: "mil-spec / aerospace-grade", throughput: "low-medium" }));
    const btn = document.querySelector("[data-assistant-trigger]") as HTMLButtonElement;
    if (btn) btn.click();
  };

  return (
    <>
      <Helmet>
        <title>Aerospace & Defense Coating Automation | Mil-Spec Robotic Painting | TD</title>
        <meta name="description" content="Robotic spray coating systems for aerospace and defense components. Mil-spec finishing with full traceability, AS9100D compliance, and NADCAP-ready process control for flight-critical parts." />
        <link rel="canonical" href={`${DOMAIN}/industries/aerospace-defense`} />
        {schemas.map((s, i) => (<script key={i} type="application/ld+json">{JSON.stringify(s)}</script>))}
      </Helmet>
      <div className="min-h-screen bg-background">
        <div className="container-wide pt-4 pb-2">
          <Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbLink asChild><Link to="/industries">Industries</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Aerospace & Defense</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
        </div>

        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-20">
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold mb-6 leading-tight">Aerospace & Defense Coating Automation</h1>
            <div className="max-w-3xl space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
              <p>Aerospace coating automation is the engineering and integration of robotic spray systems, specification-compliant process controls, and comprehensive data acquisition to deliver repeatable, traceable finishes on flight-critical and defense components.</p>
              <p>TD Robotic Painting Systems integrates robotic coating cells for aerospace manufacturers, MRO facilities, and defense contractors requiring mil-spec and OEM-specification compliance with full process traceability.</p>
            </div>
          </div>
        </section>

        <section className="border-b border-border ">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"><Target className="h-3.5 w-3.5" />Application Scope</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Typical Aerospace & Defense Components</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {partCategories.map((item, i) => (
                <Card key={i} className="border-border bg-card"><CardContent className="p-4"><h3 className="font-semibold text-sm mb-2 flex items-center gap-2"><Plane className="h-4 w-4 text-accent" />{item.category}</h3><p className="text-muted-foreground text-xs leading-relaxed">{item.examples}</p></CardContent></Card>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"><AlertTriangle className="h-3.5 w-3.5" />Industry Challenges</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Aerospace Coating Challenges</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside max-w-2xl">
              <li>stringent specification compliance (MIL-PRF-85285, MIL-PRF-23377, Boeing BMS, Airbus AIMS)</li>
              <li>comprehensive traceability requirements for every coated part (AS9100D, NADCAP)</li>
              <li>hazardous coating handling (chromate primers, cadmium-based paints)</li>
              <li>complex masking for multi-color livery and functional zones</li>
              <li>high-mix, low-volume production with frequent specification changes</li>
              <li>critical surface preparation requirements on aluminum, titanium, and composites</li>
              <li>documentation burden consuming significant engineering resources</li>
            </ul>
          </div>
        </section>

        <section className="border-b border-border ">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"><Layers className="h-3.5 w-3.5" />Specification Compliance</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Coating Systems & Specifications</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
              <div>
                <h3 className="font-semibold text-sm mb-3">Primer Systems</h3>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                  <li>Chromate primers (MIL-PRF-23377)</li>
                  <li>Non-chromate primers (MIL-PRF-32239)</li>
                  <li>Epoxy primers for structural components</li>
                  <li>Wash primers for aluminum preparation</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-3">Topcoat Systems</h3>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                  <li>Polyurethane topcoats (MIL-PRF-85285)</li>
                  <li>High-solids aerospace enamels</li>
                  <li>Camouflage and low-observable coatings</li>
                  <li>Specialty coatings (thermal barrier, anti-ice, EMI shielding)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"><Wrench className="h-3.5 w-3.5" />Scope of Delivery</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">What TD Delivers for Aerospace</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside max-w-2xl">
              <li>robotic coating cell engineering with enclosed, climate-controlled environments</li>
              <li>comprehensive data acquisition (temperature, humidity, DFT, spray parameters)</li>
              <li>automatic batch record generation and traceability documentation</li>
              <li>process specification development and qualification support</li>
              <li>hazardous material handling and ventilation systems</li>
              <li>controls integration with MES/ERP connectivity</li>
              <li>first article inspection (FAI) support and production qualification</li>
            </ul>
            <p className="text-muted-foreground text-sm mt-4">Related: <Link to="/industries/metal-parts-finishing" className="text-accent underline underline-offset-2 hover:text-accent/80">Metal Parts Finishing</Link> · <Link to="/industries/plastics-composites" className="text-accent underline underline-offset-2 hover:text-accent/80">Plastics & Composites</Link></p>
          </div>
        </section>

        <section className="border-b border-border ">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"><Clock className="h-3.5 w-3.5" />Lead Time</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Deployment Timeline</h2>
            <p className="font-semibold text-foreground text-lg">14-20 weeks after design approval</p>
            <p className="text-muted-foreground text-sm mt-1">(includes specification validation, FAI, and production qualification)</p>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Start your aerospace coating assessment</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">Tell us about your components, specification requirements, and production profile.</p>
            <div className={cn("rounded-2xl border transition-all duration-300 p-1 bg-card max-w-2xl mb-6", isFocused ? "border-accent/40 shadow-[0_0_24px_-5px_hsl(192_70%_38%/0.2)]" : "border-border hover:border-accent/20")}>
              <Textarea value={inputValue} onChange={(e) => setInputValue(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleStartConsultation(); } }} className={cn("min-h-[80px] resize-none border-0 bg-transparent text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0 text-[15px] leading-relaxed rounded-xl px-5 py-3")} />
              <div className="flex items-center justify-end px-3 pb-3 pt-1"><Button onClick={handleStartConsultation} className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-9 px-5 gap-2 rounded-xl"><Send className="h-3.5 w-3.5" />Start consultation</Button></div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleStartConsultation} className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-11 px-6 gap-2 rounded-xl"><Bot className="h-4 w-4" />Start project assessment</Button>
              <Button variant="outline" onClick={() => { const btn = document.querySelector("[data-assistant-trigger]") as HTMLButtonElement; if (btn) btn.click(); }} className="h-11 px-6 gap-2 rounded-xl"><MessageSquare className="h-4 w-4" />Talk to an engineer</Button>
              <Button variant="outline" onClick={() => navigate("/quote")} className="h-11 px-6 gap-2 rounded-xl"><Upload className="h-4 w-4" />Upload specifications</Button>
            </div>
          </div>
        </section>

        <section className="border-b border-border ">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"><BarChart3 className="h-3.5 w-3.5" />Benefits</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Why Robotic Coating for Aerospace</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside max-w-2xl">
              <li>consistent DFT control within specification limits across all surfaces</li>
              <li>automated traceability and batch record generation (AS9100D/NADCAP)</li>
              <li>reduced operator exposure to hazardous coatings</li>
              <li>repeatable process parameters for qualification and audit compliance</li>
              <li>real-time parameter monitoring with out-of-spec alerting</li>
              <li>reduced rework and non-conformance rates</li>
              <li>flexible programming for high-mix, low-volume production</li>
            </ul>
            <p className="text-muted-foreground text-sm mt-4">Further reading: <Link to="/resources/knowledge/paint-defects-guide" className="text-accent underline underline-offset-2 hover:text-accent/80">Paint Defects Guide</Link> · <Link to="/resources/knowledge/spray-technology-guide" className="text-accent underline underline-offset-2 hover:text-accent/80">Spray Technology Guide</Link></p>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"><Settings2 className="h-3.5 w-3.5" />Implementation</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Implementation Workflow</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {workflowSteps.map((step, i) => (<div key={i} className="flex gap-3"><div className="flex flex-col items-center"><span className="flex items-center justify-center h-8 w-8 rounded-full bg-accent text-accent-foreground text-xs font-bold shrink-0">{i + 1}</span>{i < workflowSteps.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}</div><div className="pb-6"><h3 className="font-semibold text-sm mb-1">{step.title}</h3><p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p></div></div>))}
            </div>
          </div>
        </section>

        <section className="border-b border-border ">
          <div className="container-wide py-10 md:py-12">
            <Card className="border-border bg-card"><CardContent className="p-6 flex flex-col sm:flex-row gap-6 text-sm">
              <div className="flex items-start gap-3"><User className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" /><div><div className="font-semibold text-foreground">Author</div><div className="text-muted-foreground">TD Engineering Team</div></div></div>
              <div className="flex items-start gap-3"><CalendarDays className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" /><div><div className="font-semibold text-foreground">Last updated</div><div className="text-muted-foreground">2026-02-27</div></div></div>
              <div className="flex items-start gap-3"><FileText className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" /><div><div className="font-semibold text-foreground">Scope</div><div className="text-muted-foreground">Aerospace and defense coating automation. Mil-spec and OEM-specification compliant finishing for flight-critical components with full traceability.</div></div></div>
            </CardContent></Card>
          </div>
        </section>

        <section>
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"><HelpCircle className="h-3.5 w-3.5" />Frequently Asked Questions</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">FAQ</h2>
            <div className="max-w-3xl">
              <Accordion type="multiple" defaultValue={faqs.map((_, i) => `faq-${i}`)} className="space-y-2">
                {faqs.map((faq, i) => (<AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-5 bg-card"><AccordionTrigger className="text-sm font-medium text-left py-4 hover:no-underline">{faq.question}</AccordionTrigger><AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">{faq.answer}</AccordionContent></AccordionItem>))}
              </Accordion>
            </div>
          </div>
        </section>
        <ExploreLinks currentPath="/industries/aerospace-defense" />
      </div>
    </>
  );
}
