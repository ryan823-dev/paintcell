import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight, User, Calendar, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from "@/components/ui/accordion";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Paint Booth Design Basics for Robotic Spray Painting",
  "author": { "@type": "Organization", "name": "TD Engineering Team" },
  "datePublished": "2026-02-01",
  "dateModified": "2026-02-12",
  "publisher": { "@type": "Organization", "name": "TD Painting System" },
};

const faqs = [
  { q: "What are the key design parameters for a painting booth?", a: "Critical parameters include booth dimensions (part clearance + robot envelope), airflow type (downdraft vs crossdraft), air velocity (60–100 FPM), filtration efficiency, temperature/humidity control, and lighting levels (>800 lux for quality inspection)." },
  { q: "What is the difference between downdraft and crossdraft booths?", a: "Downdraft booths pull air from ceiling to floor, providing the cleanest spray environment and best finish quality. Crossdraft booths move air horizontally, are simpler to install, but may cause more contamination on large parts. Downdraft is preferred for automotive and decorative finishes." },
  { q: "How is booth size determined?", a: "Booth size is determined by: largest part dimensions + robot working envelope + safety clearances + operator access. Add 600mm minimum clearance on each side of the part for spray coverage, and 1200mm for maintenance access to robots." },
  { q: "What ventilation capacity does a robotic painting booth need?", a: "Air volume depends on booth cross-section area and required velocity (typically 0.3–0.5 m/s). For a 4m × 3m booth, this means approximately 12,000–20,000 m³/h. Include makeup air heating/cooling to maintain ±2°C temperature stability." },
];

export default function PaintBoothDesignBasics() {
  const handleConsultation = () => {
    sessionStorage.setItem("project-init-message", "I need guidance on paint booth design for my robotic painting project.");
    const btn = document.querySelector('[data-assistant-trigger]') as HTMLButtonElement;
    if (btn) btn.click();
  };

  return (
    <>
      <Helmet>
        <title>Paint Booth Design Basics | Technical Insights | TD</title>
        <meta name="description" content="Expert guide on paint booth design for robotic spray painting. Covers airflow types, sizing methodology, ventilation requirements, and common design mistakes." />
        <link rel="canonical" href="https://tdpaintcell.com/resources/knowledge/paint-booth-design-basics" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="border-b border-border bg-muted/30">
          <div className="container-wide py-3">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbLink asChild><Link to="/resources/engineering-library">Knowledge</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbPage>Paint Booth Design Basics</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        <article className="container-narrow py-12 md:py-16">
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-6">
            <span className="flex items-center gap-1"><User className="h-3 w-3" /> TD Engineering Team</span>
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Published: Feb 1, 2026</span>
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Updated: Feb 12, 2026</span>
            <span className="flex items-center gap-1"><Award className="h-3 w-3" /> ISO 9001 Certified Integrator</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-6">Paint Booth Design Basics for Robotic Spray Painting</h1>
          <p className="text-muted-foreground leading-relaxed mb-8 text-base">
            A well-designed spray booth is the foundation of any robotic painting system. It controls the spray environment, captures overspray, manages ventilation, and ensures compliance with safety regulations. This guide covers fundamental design principles, sizing methodology, common mistakes, and TD's engineering approach.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">1. Airflow Types & Selection</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {[
              { title: "Downdraft Booth", desc: "Air flows vertically from ceiling plenum to floor exhaust. Provides cleanest spray zone — overspray is pulled away from part surface immediately. Best for: automotive, decorative, and precision finishes.", pros: "Best finish quality, minimal contamination" },
              { title: "Crossdraft Booth", desc: "Air flows horizontally from intake wall to exhaust wall. Simpler construction, lower installation cost. Acceptable for: industrial protective coatings, primer applications.", pros: "Lower cost, easier retrofit" },
              { title: "Semi-Downdraft", desc: "Air enters from ceiling at rear, exits at floor in front. Compromise between quality and cost. Good for: medium-quality industrial finishes.", pros: "Balanced cost/quality" },
              { title: "Side Draft", desc: "Air enters from one wall, exits from opposite wall at floor level. Used for: large parts, heavy machinery painting where full downdraft is impractical.", pros: "Flexible for large parts" },
            ].map((item, i) => (
              <Card key={i} className="border-border bg-card">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-sm mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-2">{item.desc}</p>
                  <p className="text-xs text-accent font-medium">Advantage: {item.pros}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">2. Sizing Methodology</h2>
          <div className="prose prose-slate max-w-none text-muted-foreground mb-6">
            <p className="mb-4">Booth dimensions must accommodate three space requirements simultaneously:</p>
            <ul className="space-y-2 list-disc pl-6 mb-4">
              <li><strong className="text-foreground">Part clearance</strong> — maximum part dimensions + 600mm clearance each side for spray coverage</li>
              <li><strong className="text-foreground">Robot envelope</strong> — full robot reach circle + 200mm safety margin from walls</li>
              <li><strong className="text-foreground">Service access</strong> — 1200mm minimum for robot maintenance and part handling paths</li>
            </ul>
            <p>Height: Minimum 3.5m clear inside for standard robot mounting. Add 1–1.5m for downdraft plenum and lighting. Total booth height typically 4.5–5.5m.</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">3. Common Design Mistakes</h2>
          <div className="space-y-3 mb-6">
            {[
              "Undersizing the booth — squeezing robots into tight booths creates spray quality issues and maintenance access problems",
              "Inadequate makeup air — exhaust without properly conditioned supply air causes negative pressure and uncontrolled dust ingress",
              "Ignoring temperature control — paint viscosity changes ±10% per 5°C temperature shift, causing film build variation",
              "Poor lighting design — inadequate or wrongly positioned lighting makes in-booth quality checks impossible",
              "Skipping fire suppression — painting booths are inherently fire-risk environments; suppression is not optional",
            ].map((mistake, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-lg border border-destructive/20 bg-destructive/5">
                <span className="text-destructive font-bold text-sm shrink-0">✗</span>
                <p className="text-sm text-muted-foreground">{mistake}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">4. TD's Design Approach</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            TD designs booths as integrated components of the complete painting system — not isolated enclosures. Every booth design starts with the painting process requirements (part size, paint type, cycle time) and works outward to determine optimal dimensions, airflow, and environmental controls. 3D CFD simulation validates airflow patterns before fabrication.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-2 mb-12">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-5 bg-card">
                <AccordionTrigger className="text-sm font-medium text-left py-4 hover:no-underline">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="flex flex-wrap gap-2 mb-8 text-sm">
            <span className="text-muted-foreground font-medium">Related:</span>
            <Link to="/solutions/paint-booth-automation" className="text-accent hover:text-accent/80 inline-flex items-center gap-1">Paint Booth Automation <ArrowRight className="h-3 w-3" /></Link>
            <Link to="/resources/standards-compliance/ventilation-airflow" className="text-accent hover:text-accent/80 inline-flex items-center gap-1">Ventilation & Airflow Standards <ArrowRight className="h-3 w-3" /></Link>
          </div>

          <div className="pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleConsultation} className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                Get Booth Design Guidance <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
              <Button asChild variant="outline">
                <Link to="/quote">Configure Your System</Link>
              </Button>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
