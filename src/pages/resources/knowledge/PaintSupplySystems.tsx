import { ResourcePageLayout } from "@/components/resources";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { ArrowRight, User, Calendar, Award, Droplets, Gauge, Settings, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from "@/components/ui/accordion";
import { useI18n } from "@/i18n";

const DOMAIN = "https://tdpaint.com";

export default function PaintSupplySystems() {
  const { t, locale } = useI18n();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Paint Supply Systems: Centralized Circulation & Color Change for Robotic Painting",
    "author": { "@type": "Organization", "name": "TD Engineering Team" },
    "datePublished": "2026-03-19",
    "dateModified": "2026-03-19",
    "publisher": { "@type": "Organization", "name": "TD Painting System" },
    "inLanguage": locale,
  };

  const faqs = [
    {
      q: "What is a centralized paint circulation system?",
      a: "A centralized paint circulation system maintains paint at optimal viscosity and temperature while continuously circulating it from a central kitchen to multiple spray stations. This ensures consistent paint quality, reduces waste, and enables automated color changes across 10-50+ spray robots."
    },
    {
      q: "How fast is an automatic color change?",
      a: "Modern color change systems achieve flush times of 8-15 seconds for similar colors and 20-40 seconds for difficult transitions (e.g., white to black). Total cycle time including valve actuation and purge is typically 30-60 seconds per robot."
    },
    {
      q: "What's the difference between 2K and 1K paint supply?",
      a: "1K (single-component) paints are ready-to-use after viscosity adjustment. 2K (two-component) paints require precise metering and mixing of base resin and hardener just before application, with pot life ranging from 30 minutes to 8 hours depending on chemistry."
    },
    {
      q: "How do you prevent paint settling in circulation lines?",
      a: "Proper circulation systems maintain turbulent flow (Reynolds number >4000) with flow velocities of 0.3-0.6 m/s, use recirculation loops with back-pressure regulators, and employ magnetic or mechanical agitators in supply tanks."
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
    sessionStorage.setItem("project-init-message", "I need information about paint supply systems and color change equipment.");
    const btn = document.querySelector('[data-assistant-trigger]') as HTMLButtonElement;
    if (btn) btn.click();
  };

  return (
    <ResourcePageLayout
      title="Paint Supply Systems: Circulation & Color Change"
      metaTitle="Paint Supply Systems: Circulation & Color Change | TD Engineering"
      metaDescription="Complete guide to industrial paint supply systems: centralized circulation, automatic color change, 2K mixing, pressure regulation, and solvent flushing for robotic painting."
      breadcrumbs={[
        { label: "Engineering Library", href: "/resources/engineering-library" },
        { label: "Knowledge" },
        { label: "Paint Supply Systems" },
      ]}
      structuredData={structuredData}
      canonicalPath="/resources/knowledge/paint-supply-systems"
    >
      {/* Meta info */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-6">
        <span className="flex items-center gap-1"><User className="h-3 w-3" /> TD Engineering Team</span>
        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Updated Mar 2026</span>
        <span className="flex items-center gap-1"><Award className="h-3 w-3" /> Technical Guide</span>
      </div>

      <p className="text-lg text-muted-foreground mb-8">
        Engineered for consistent paint delivery, rapid color changes, and minimal waste in high-volume robotic painting operations.
      </p>

      {/* Hero image */}
      <div className="rounded-lg overflow-hidden mb-10 border border-border">
        <img 
          src="/images/paint-supply-circulation.jpg" 
          alt="Centralized paint circulation system with color change valves"
          className="w-full h-auto"
        />
      </div>

      {/* Video Demo */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Video Demo: Paint Supply Technology</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-lg overflow-hidden border border-border bg-muted/30">
            <video controls className="w-full" poster="/images/video-thumbnails/paint-pump-1.jpg">
              <source src="/videos/endura-flo-cleaning-demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="p-4">
              <h3 className="font-semibold mb-2">Endura-Flo Quick Cleaning</h3>
              <p className="text-sm text-muted-foreground">
                Pneumatic diaphragm pump with rapid cleaning capability reduces color change time by 50%.
              </p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden border border-border bg-muted/30">
            <video controls className="w-full" poster="/images/video-thumbnails/paint-pump-2.jpg">
              <source src="/videos/e-flo-dc-intro.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="p-4">
              <h3 className="font-semibold mb-2">E-Flo DC Electric Pump</h3>
              <p className="text-sm text-muted-foreground">
                Advanced electric pump technology with precise pressure control and energy efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* System Overview */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">System Overview</h2>
        <p className="text-muted-foreground mb-6">
          A complete paint supply system consists of four integrated subsystems that work together to deliver paint at precise pressure, flow rate, viscosity, and temperature to each spray station:
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Droplets className="h-5 w-5 text-accent" />
                Paint Kitchen
              </h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Central supply tanks (50-2000L) with agitators</li>
                <li>• Temperature control (±0.5°C accuracy)</li>
                <li>• Viscosity monitoring and adjustment</li>
                <li>• Level sensors and low-level alarms</li>
                <li>• Drum decanting stations with filtration</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Settings className="h-5 w-5 text-accent" />
                Circulation System
              </h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Main supply and return manifolds</li>
                <li>• Circulation pumps (gear, diaphragm, peristaltic)</li>
                <li>• Back-pressure regulators (0.5-350 bar)</li>
                <li>• Flow meters and pressure transducers</li>
                <li>• Insulated and heat-traced piping</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <RefreshCcw className="h-5 w-5 text-accent" />
                Color Change
              </h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Cartridge-style color valves (4-36 colors)</li>
                <li>• Cascading flush for reduced solvent use</li>
                <li>• Recipe-based changeover sequences</li>
                <li>• Integrated solvent management</li>
                <li>• {'<'}150ml waste per color change</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Gauge className="h-5 w-5 text-accent" />
                Pressure Control
              </h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Electronic pressure regulators</li>
                <li>• Closed-loop feedback control</li>
                <li>• Remote setpoint adjustment via PLC</li>
                <li>• Pressure relief and safety valves</li>
                <li>• Pulse-free delivery for consistent spray</li>
              </ul>
            </CardContent>
          </Card>
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
        <h2 className="text-xl font-semibold mb-2">Need Help with Paint Supply?</h2>
        <p className="text-muted-foreground mb-4">
          Our engineering team can design complete paint supply systems from kitchen to spray gun, including circulation, color change, and 2K handling.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button onClick={handleConsultation}>
            Start Consultation <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" asChild>
            <Link to="/products/control-systems">Control Systems</Link>
          </Button>
        </div>
      </section>
    </ResourcePageLayout>
  );
}