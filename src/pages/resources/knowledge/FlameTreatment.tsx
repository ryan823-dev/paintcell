import { ResourcePageLayout } from "@/components/resources";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { ChevronRight, ArrowRight, User, Calendar, Award, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from "@/components/ui/accordion";
import { useI18n } from "@/i18n";

const DOMAIN = "https://tdpaint.com";

export default function FlameTreatment() {
  const { t, locale } = useI18n();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Flame Treatment for Plastic Parts: Surface Activation for Paint Adhesion",
    "author": { "@type": "Organization", "name": "TD Engineering Team" },
    "datePublished": "2026-03-18",
    "dateModified": "2026-03-18",
    "publisher": { "@type": "Organization", "name": "TD Painting System" },
    "inLanguage": locale,
  };

  const faqs = [
    {
      q: "What is flame treatment and why is it necessary?",
      a: "Flame treatment is a surface activation process that oxidizes plastic surfaces to improve paint adhesion. It's essential for polyolefin plastics (PP, PE, TPO) commonly used in automotive bumpers and interior trim, which have low surface energy and poor paint bonding without treatment."
    },
    {
      q: "How does robotic flame treatment improve quality?",
      a: "Robotic flame treatment ensures consistent flame distance (8-12mm), travel speed (200-400mm/s), and coverage across all part surfaces. This eliminates human variability and prevents defects like poor adhesion, fish eyes, or surface melting from overheating."
    },
    {
      q: "What's the typical cycle time for flame treatment?",
      a: "For automotive bumpers, robotic flame treatment typically takes 30-60 seconds per part depending on part size and number of burners. Multi-robot cells with 2-4 burners can achieve takt times of 60-90 seconds per fixture."
    },
    {
      q: "Can flame treatment be integrated with painting in the same cell?",
      a: "Yes. TD designs integrated cells where robots perform flame treatment, then immediately proceed to primer, basecoat, and clearcoat application. This reduces part handling, minimizes contamination risk, and improves overall line efficiency."
    },
  ];

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
    sessionStorage.setItem("project-init-message", "I need information about flame treatment systems for plastic parts.");
    const btn = document.querySelector('[data-assistant-trigger]') as HTMLButtonElement;
    if (btn) btn.click();
  };

  return (
    <ResourcePageLayout
      title="Flame Treatment for Plastic Parts: Surface Activation Guide"
      metaTitle="Flame Treatment for Plastic Parts | Surface Activation Guide | TD"
      metaDescription="Complete guide to robotic flame treatment systems for automotive plastic parts. Surface activation, paint adhesion improvement, cycle time optimization, and system integration."
      breadcrumbs={[
        { label: "Engineering Library", href: "/resources/engineering-library" },
        { label: "Knowledge" },
        { label: "Flame Treatment" },
      ]}
      structuredData={structuredData}
      canonicalPath="/resources/knowledge/flame-treatment"
    >
      {/* Meta info */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-6">
        <span className="flex items-center gap-1"><User className="h-3 w-3" /> TD Engineering Team</span>
        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Updated Mar 2026</span>
        <span className="flex items-center gap-1"><Award className="h-3 w-3" /> Technical Guide</span>
      </div>

      <p className="text-lg text-muted-foreground mb-8">
        Essential surface preparation for painting polyolefin plastics in automotive applications.
      </p>

      {/* Hero image */}
      <div className="rounded-lg overflow-hidden mb-10 border border-border">
        <img 
          src="/images/flame-treatment-robot.jpg" 
          alt="Robotic flame treatment system for automotive plastic parts"
          className="w-full h-auto"
        />
      </div>

      {/* Introduction */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Why Flame Treatment is Necessary</h2>
        <p className="text-muted-foreground mb-6">
          Automotive plastic parts—especially bumpers, mirror housings, and interior trim—are commonly made from polypropylene (PP), polyethylene (PE), or thermoplastic olefin (TPO). These materials have <strong className="text-foreground">low surface energy</strong> (typically 28-32 dynes/cm), which prevents paint from properly wetting and adhering to the surface.
        </p>
        <p className="text-muted-foreground mb-6">
          Flame treatment oxidizes the plastic surface, increasing surface energy to 42-48 dynes/cm and creating chemical bonds that enable strong paint adhesion. Without proper flame treatment, paint will delaminate, peel, or show poor adhesion in cross-hatch testing.
        </p>

        <Card className="bg-muted/30 mb-6">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-3">Key Benefits of Robotic Flame Treatment</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>✓ <strong>Consistent surface activation:</strong> Precise flame distance (8-12mm) and travel speed (200-400mm/s)</li>
              <li>✓ <strong>Complete coverage:</strong> 6-axis robots access complex geometries and recessed areas</li>
              <li>✓ <strong>No overheating:</strong> Automated control prevents part distortion or melting</li>
              <li>✓ <strong>Repeatability:</strong> Same parameters every cycle, eliminating operator variability</li>
              <li>✓ <strong>Integration:</strong> Can be combined with painting in the same robotic cell</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* System Components */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Flame Treatment System Components</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5 text-accent" />
                Burner Types
              </h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• <strong>Ribbon burners:</strong> 50-300mm wide, for flat surfaces</li>
                <li>• <strong>Point burners:</strong> Localized treatment for edges and corners</li>
                <li>• <strong>Multi-flame arrays:</strong> Multiple burners for high-throughput lines</li>
                <li>• <strong>Rotary burners:</strong> For cylindrical parts like fuel tanks</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Award className="h-5 w-5 text-accent" />
                Process Parameters
              </h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• <strong>Flame distance:</strong> 8-12mm from part surface</li>
                <li>• <strong>Travel speed:</strong> 200-400mm/s</li>
                <li>• <strong>Gas mixture:</strong> Propane/natural gas + compressed air</li>
                <li>• <strong>Surface temp:</strong> &lt;80°C (to prevent distortion)</li>
                <li>• <strong>Treatment window:</strong> Paint within 24-72 hours after treatment</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Integration Options */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Integration Options</h2>
        
        <div className="space-y-6">
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold mb-2">Standalone Flame Treatment Cell</h3>
            <p className="text-muted-foreground">
              Dedicated cell with 1-2 robots performing flame treatment before parts move to separate painting area. Best for high-volume production where flame treatment is the bottleneck.
            </p>
          </div>
          
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold mb-2">Integrated Flame + Paint Cell</h3>
            <p className="text-muted-foreground">
              Single robot or multi-robot cell performs flame treatment, then immediately applies primer, basecoat, and clearcoat. Reduces part handling, minimizes contamination, and optimizes floor space.
            </p>
          </div>
          
          <div className="border-l-4 border-amber-500 pl-4">
            <h3 className="font-semibold mb-2">Conveyor-Integrated System</h3>
            <p className="text-muted-foreground">
              Flame treatment robots mounted alongside overhead or floor conveyors. Parts are treated in-line during transport between loading and painting stations.
            </p>
          </div>
        </div>
      </section>

      {/* Quality Control */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Quality Control & Testing</h2>
        <p className="text-muted-foreground mb-4">
          Proper flame treatment quality is verified through:
        </p>
        <ul className="space-y-2 text-muted-foreground mb-6">
          <li>• <strong>Dyne pens:</strong> Quick field test for surface energy (target: 42-48 dynes/cm)</li>
          <li>• <strong>Cross-hatch adhesion test:</strong> ASTM D3359, achieve 4B-5B rating</li>
          <li>• <strong>Water break test:</strong> Water should sheet uniformly, not bead up</li>
          <li>• <strong>Visual inspection:</strong> Uniform light brown color indicates proper treatment</li>
        </ul>

        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2 text-amber-800 dark:text-amber-200">
              ⚠️ Common Defects from Improper Flame Treatment
            </h3>
            <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
              <li>• <strong>Under-treatment:</strong> Poor adhesion, paint peeling, fish eyes</li>
              <li>• <strong>Over-treatment:</strong> Surface melting, part distortion, orange peel</li>
              <li>• <strong>Inconsistent coverage:</strong> Adhesion failures in untreated areas</li>
              <li>• <strong>Delayed painting:</strong> Surface energy decays after 72 hours, requiring re-treatment</li>
            </ul>
          </CardContent>
        </Card>
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
        <h2 className="text-xl font-semibold mb-2">Need Help with Flame Treatment?</h2>
        <p className="text-muted-foreground mb-4">
          Our engineering team can evaluate your application and design the optimal flame treatment system for your plastic parts.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button onClick={handleConsultation}>
            Start Consultation <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" asChild>
            <Link to="/industries/automotive-exterior-parts">Automotive Solutions</Link>
          </Button>
        </div>
      </section>
    </ResourcePageLayout>
  );
}