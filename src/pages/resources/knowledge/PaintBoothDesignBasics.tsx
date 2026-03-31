import { ResourcePageLayout } from "@/components/resources";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { ChevronRight, ArrowRight, User, Calendar, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from "@/components/ui/accordion";
import { useMemo } from "react";
import { useI18n } from "@/i18n";

export default function PaintBoothDesignBasics() {
  const { t, locale } = useI18n();
  const article = t.knowledge?.paintBoothDesignBasics || {};

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": article.metaTitle || "Paint Booth Design Basics for Robotic Spray Painting",
    "author": { "@type": "Organization", "name": "TD Engineering Team" },
    "datePublished": "2026-02-01",
    "dateModified": "2026-02-12",
    "publisher": { "@type": "Organization", "name": "TD Painting System" },
    "inLanguage": locale,
  };
  
  const faqs = useMemo(() => [
    { q: t.knowledgeFaqs.boothDesign.q1, a: t.knowledgeFaqs.boothDesign.a1 },
    { q: t.knowledgeFaqs.boothDesign.q2, a: t.knowledgeFaqs.boothDesign.a2 },
    { q: t.knowledgeFaqs.boothDesign.q3, a: t.knowledgeFaqs.boothDesign.a3 },
    { q: t.knowledgeFaqs.boothDesign.q4, a: t.knowledgeFaqs.boothDesign.a4 },
  ], [t]);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a }
    }))
  };

  const structuredData = {
    ...articleSchema,
    ...faqSchema
  };

  const handleConsultation = () => {
    sessionStorage.setItem("project-init-message", "I need guidance on paint booth design for my robotic painting project.");
    const btn = document.querySelector('[data-assistant-trigger]') as HTMLButtonElement;
    if (btn) btn.click();
  };

  return (
    <ResourcePageLayout
      title={article.title || "Paint Booth Design Basics for Robotic Spray Painting"}
      metaTitle={article.metaTitle || "Paint Booth Design Basics | Technical Insights | TD"}
      metaDescription={article.metaDesc || "Expert guide on paint booth design for robotic spray painting. Covers airflow types, sizing methodology, ventilation requirements, and common design mistakes."}
      breadcrumbs={[
        { label: "Engineering Library", href: "/resources/engineering-library" },
        { label: "Knowledge" },
        { label: article.title || "Paint Booth Design Basics" },
      ]}
      structuredData={structuredData}
      canonicalPath="/resources/knowledge/paint-booth-design-basics"
    >
      {/* E-E-A-T Header */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-6">
        <span className="flex items-center gap-1"><User className="h-3 w-3" /> TD Engineering Team</span>
        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Published: Feb 1, 2026</span>
        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Updated: Feb 12, 2026</span>
        <span className="flex items-center gap-1"><Award className="h-3 w-3" /> ISO 9001 Certified Integrator</span>
      </div>

      <p className="text-muted-foreground leading-relaxed mb-8 text-base">
        A well-designed spray booth is the foundation of any robotic painting system. It controls the spray environment, captures overspray, manages ventilation, and ensures compliance with safety regulations. This guide covers fundamental design principles, sizing methodology, common mistakes, and TD's engineering approach.
      </p>

      {/* Section 1 */}
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

      {/* Section 2 */}
      <h2 className="text-2xl font-bold mt-12 mb-4">2. Sizing Methodology</h2>
      <p className="text-muted-foreground mb-4">Booth dimensions must accommodate three space requirements simultaneously:</p>
      <ul className="space-y-2 list-disc pl-6 mb-4 text-muted-foreground">
        <li><strong className="text-foreground">Part clearance</strong> — maximum part dimensions + 600mm clearance each side for spray coverage</li>
        <li><strong className="text-foreground">Robot envelope</strong> — full robot reach circle + 200mm safety margin from walls</li>
        <li><strong className="text-foreground">Service access</strong> — 1200mm minimum for robot maintenance and part handling paths</li>
      </ul>
      <p className="text-muted-foreground">Height: Minimum 3.5m clear inside for standard robot mounting. Add 1–1.5m for downdraft plenum and lighting. Total booth height typically 4.5–5.5m.</p>

      {/* Section 3 */}
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

      {/* Section 4 */}
      <h2 className="text-2xl font-bold mt-12 mb-4">4. TD's Design Approach</h2>
      <p className="text-muted-foreground leading-relaxed mb-6">
        TD designs booths as integrated components of the complete painting system — not isolated enclosures. Every booth design starts with the painting process requirements (part size, paint type, cycle time) and works outward to determine optimal dimensions, airflow, and environmental controls. 3D CFD simulation validates airflow patterns before fabrication.
      </p>

      {/* FAQ */}
      <h2 className="text-2xl font-bold mt-12 mb-6">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="space-y-2 mb-12">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-5 bg-card">
            <AccordionTrigger className="text-sm font-medium text-left py-4 hover:no-underline">{faq.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Related */}
      <div className="flex flex-wrap gap-2 mb-8 text-sm">
        <span className="text-muted-foreground font-medium">Related:</span>
        <Link to="/solutions/paint-booth-automation" className="text-accent hover:text-accent/80 inline-flex items-center gap-1">Paint Booth Automation <ArrowRight className="h-3 w-3" /></Link>
        <Link to="/resources/standards-compliance/ventilation-airflow" className="text-accent hover:text-accent/80 inline-flex items-center gap-1">Ventilation & Airflow Standards <ArrowRight className="h-3 w-3" /></Link>
      </div>

      {/* CTA */}
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
    </ResourcePageLayout>
  );
}