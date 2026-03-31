import { ResourcePageLayout } from "@/components/resources";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { ArrowRight, User, Calendar, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from "@/components/ui/accordion";
import { useMemo } from "react";
import { useI18n } from "@/i18n";

export default function PaintTechnologyGuide() {
  const { t, locale } = useI18n();
  const article = t.knowledge?.paintTechnologyGuide || t.knowledge?.sprayTechnologyGuide || {};

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": article.metaTitle || "Paint Technology Selection Guide: Electrostatic vs HVLP vs Conventional",
    "author": { "@type": "Organization", "name": "TD Engineering Team" },
    "datePublished": "2026-02-20",
    "dateModified": "2026-02-27",
    "publisher": { "@type": "Organization", "name": "TD Painting System" },
    "inLanguage": locale,
  };
  
  const faqs = useMemo(() => [
    { q: t.knowledgeFaqs?.paintTechnology?.q1 || t.knowledgeFaqs?.sprayTechnology?.q1, a: t.knowledgeFaqs?.paintTechnology?.a1 || t.knowledgeFaqs?.sprayTechnology?.a1 },
    { q: t.knowledgeFaqs?.paintTechnology?.q2 || t.knowledgeFaqs?.sprayTechnology?.q2, a: t.knowledgeFaqs?.paintTechnology?.a2 || t.knowledgeFaqs?.sprayTechnology?.a2 },
    { q: t.knowledgeFaqs?.paintTechnology?.q3 || t.knowledgeFaqs?.sprayTechnology?.q3, a: t.knowledgeFaqs?.paintTechnology?.a3 || t.knowledgeFaqs?.sprayTechnology?.a3 },
    { q: t.knowledgeFaqs?.paintTechnology?.q4 || t.knowledgeFaqs?.sprayTechnology?.q4, a: t.knowledgeFaqs?.paintTechnology?.a4 || t.knowledgeFaqs?.sprayTechnology?.a4 },
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
    sessionStorage.setItem("project-init-message", "I need help selecting the right paint technology for my application.");
    const btn = document.querySelector('[data-assistant-trigger]') as HTMLButtonElement;
    if (btn) btn.click();
  };

  return (
    <ResourcePageLayout
      title={article.title || "Paint Technology Selection Guide: Electrostatic vs HVLP vs Conventional"}
      metaTitle={article.metaTitle || "Paint Technology Selection: Electrostatic vs HVLP vs Conventional | TD"}
      metaDescription={article.metaDesc || "Comprehensive guide to selecting paint technology for industrial painting. Compare electrostatic, HVLP, and conventional air spray for transfer efficiency, finish quality, and application suitability."}
      breadcrumbs={[
        { label: "Engineering Library", href: "/resources/engineering-library" },
        { label: "Knowledge" },
        { label: article.title || "Paint Technology Guide" },
      ]}
      structuredData={structuredData}
      canonicalPath="/resources/knowledge/paint-technology-guide"
    >
      {/* Meta info */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-6">
        <span className="flex items-center gap-1"><User className="h-3 w-3" /> TD Engineering Team</span>
        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Updated Feb 2026</span>
        <span className="flex items-center gap-1"><Award className="h-3 w-3" /> Technical Guide</span>
      </div>

      <p className="text-lg text-muted-foreground mb-8">
        Choosing the right paint technology is fundamental to paint cell design. This guide compares the three main atomization methods to help you make an informed decision based on your specific application requirements.
      </p>

      {/* Hero image */}
      <div className="rounded-lg overflow-hidden mb-10 border border-border">
        <img 
          src="/images/electrostatic-spray-gun.png" 
          alt="Industrial electrostatic paint gun for robotic painting"
          className="w-full h-auto"
        />
      </div>

      {/* Technology Overview */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Technology Overview</h2>
        <p className="text-muted-foreground mb-6">
          Industrial painting uses three primary atomization technologies, each with distinct characteristics that affect finish quality, transfer efficiency, and operational requirements.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Conventional Air Spray</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Uses high-pressure air (40-80 psi) to atomize paint into fine droplets. Oldest technology but still widely used.
              </p>
              <ul className="text-sm space-y-1">
                <li>• Transfer efficiency: 25-40%</li>
                <li>• Best atomization fineness</li>
                <li>• Highest overspray</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">HVLP (High Volume Low Pressure)</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Uses high air volume at low pressure (&lt;10 psi at cap) for softer spray with reduced bounce-back.
              </p>
              <ul className="text-sm space-y-1">
                <li>• Transfer efficiency: 65-75%</li>
                <li>• EPA compliant</li>
                <li>• Reduced overspray</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Electrostatic</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Charges paint particles (40-100kV) that are attracted to grounded parts. Best wrap-around coverage.
              </p>
              <ul className="text-sm space-y-1">
                <li>• Transfer efficiency: 75-95%</li>
                <li>• Superior coverage</li>
                <li>• Requires grounding</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Detailed Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-border rounded-lg">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-medium">Factor</th>
                <th className="text-left p-3 font-medium">Conventional</th>
                <th className="text-left p-3 font-medium">HVLP</th>
                <th className="text-left p-3 font-medium">Electrostatic</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">Transfer Efficiency</td>
                <td className="p-3">25-40%</td>
                <td className="p-3">65-75%</td>
                <td className="p-3">75-95%</td>
              </tr>
              <tr className="border-t border-border bg-muted/20">
                <td className="p-3 font-medium">Equipment Cost</td>
                <td className="p-3">Low</td>
                <td className="p-3">Medium</td>
                <td className="p-3">High</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">Atomization Quality</td>
                <td className="p-3">Excellent</td>
                <td className="p-3">Good</td>
                <td className="p-3">Good to Excellent</td>
              </tr>
              <tr className="border-t border-border bg-muted/20">
                <td className="p-3 font-medium">Wrap-around</td>
                <td className="p-3">Poor</td>
                <td className="p-3">Poor</td>
                <td className="p-3">Excellent</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">VOC Compliance</td>
                <td className="p-3">May not meet</td>
                <td className="p-3">Compliant</td>
                <td className="p-3">Compliant</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Application Guidelines */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Application Selection Guidelines</h2>
        
        <div className="space-y-6">
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold mb-2">Choose Electrostatic When:</h3>
            <ul className="text-muted-foreground space-y-1">
              <li>• High production volume justifies equipment investment</li>
              <li>• Parts have complex geometry requiring wrap-around coverage</li>
              <li>• Paint cost savings from high transfer efficiency are significant</li>
              <li>• Parts can be reliably grounded through fixtures or conveyor</li>
            </ul>
          </div>
          
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold mb-2">Choose HVLP When:</h3>
            <ul className="text-muted-foreground space-y-1">
              <li>• VOC emission compliance is required</li>
              <li>• Parts are non-conductive or difficult to ground</li>
              <li>• Waterborne paints are being used</li>
              <li>• Moderate transfer efficiency improvement is acceptable</li>
            </ul>
          </div>
          
          <div className="border-l-4 border-amber-500 pl-4">
            <h3 className="font-semibold mb-2">Choose Conventional When:</h3>
            <ul className="text-muted-foreground space-y-1">
              <li>• Maximum atomization fineness is critical (high-gloss finish)</li>
              <li>• Small batch or prototype production</li>
              <li>• Budget constraints limit equipment investment</li>
              <li>• Specialty coatings require conventional atomization</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="bg-muted/30 rounded-lg p-6 md:p-8">
        <h2 className="text-xl font-semibold mb-2">Need Help Selecting Paint Technology?</h2>
        <p className="text-muted-foreground mb-4">
          Our engineering team can evaluate your application and recommend the optimal paint technology for your specific requirements.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button onClick={handleConsultation}>
            Start Consultation <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" asChild>
            <Link to="/resources/glossary/electrostatic-spraying">Learn About Electrostatic</Link>
          </Button>
        </div>
      </section>
    </ResourcePageLayout>
  );
}