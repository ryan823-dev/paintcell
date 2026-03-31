import { ResourcePageLayout } from "@/components/resources";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { ArrowRight, User, Calendar, Award, Zap, Droplets, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from "@/components/ui/accordion";
import { useI18n } from "@/i18n";

const DOMAIN = "https://tdpaint.com";

export default function SnowflakeCleaning() {
  const { t, locale } = useI18n();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Snowflake Cleaning for Paint Booths: Dry Ice Alternative Surface Preparation",
    "author": { "@type": "Organization", "name": "TD Engineering Team" },
    "datePublished": "2026-03-19",
    "dateModified": "2026-03-19",
    "publisher": { "@type": "Organization", "name": "TD Painting System" },
    "inLanguage": locale,
  };

  const faqs = [
    {
      q: "What is snowflake cleaning and how does it work?",
      a: "Snowflake cleaning (ACP - Air Crystal Pellet) uses compressed air to accelerate dry ice pellets or specialized cleaning crystals at high velocity onto surfaces. The impact creates thermal shock and kinetic energy that dislodges contaminants without damaging the substrate. Unlike traditional blasting, snowflake cleaning leaves no secondary waste."
    },
    {
      q: "What are the advantages of snowflake cleaning over solvent cleaning?",
      a: "Snowflake cleaning is completely dry, non-abrasive, and produces no secondary waste. It eliminates VOC emissions from solvents, reduces cleaning time by 50-70%, and can be performed in-place without disassembly. The process is environmentally friendly and operator-safe."
    },
    {
      q: "Can snowflake cleaning be automated for paint booth maintenance?",
      a: "Yes. TD integrates robotic snowflake cleaning systems that automatically clean paint booth walls, floors, and grates on scheduled intervals. Robots achieve consistent coverage, reduce labor costs, and eliminate human exposure to paint overspray accumulation."
    },
    {
      q: "What types of contaminants can snowflake cleaning remove?",
      a: "Snowflake cleaning effectively removes paint overspray, powder coating residue, grease, oil, carbon deposits, release agents, and general industrial contamination. It's suitable for paint booth maintenance, conveyor cleaning, and fixture preparation."
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
    sessionStorage.setItem("project-init-message", "I need information about snowflake cleaning systems for paint booth maintenance.");
    const btn = document.querySelector('[data-assistant-trigger]') as HTMLButtonElement;
    if (btn) btn.click();
  };

  return (
    <ResourcePageLayout
      title="Snowflake Cleaning for Paint Booths: Dry Ice Alternative"
      metaTitle="Snowflake Cleaning for Paint Booths | Dry Ice Cleaning Alternative | TD"
      metaDescription="Complete guide to snowflake cleaning (ACP) technology for paint booth maintenance. Automated robotic cleaning, contaminant removal, and waste reduction without solvents or secondary waste."
      breadcrumbs={[
        { label: "Engineering Library", href: "/resources/engineering-library" },
        { label: "Knowledge" },
        { label: "Snowflake Cleaning" },
      ]}
      structuredData={structuredData}
      canonicalPath="/resources/knowledge/snowflake-cleaning"
    >
      {/* Meta info */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-6">
        <span className="flex items-center gap-1"><User className="h-3 w-3" /> TD Engineering Team</span>
        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Updated Mar 2026</span>
        <span className="flex items-center gap-1"><Award className="h-3 w-3" /> Technical Guide</span>
      </div>

      <p className="text-lg text-muted-foreground mb-8">
        Advanced surface preparation and maintenance technology for automotive painting operations.
      </p>

      {/* Hero image */}
      <div className="rounded-lg overflow-hidden mb-10 border border-border">
        <img 
          src="/images/snowflake-cleaning-system.jpg" 
          alt="Robotic snowflake cleaning system for paint booth maintenance"
          className="w-full h-auto"
        />
      </div>

      {/* Introduction */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">What is Snowflake Cleaning?</h2>
        <p className="text-muted-foreground mb-6">
          Snowflake cleaning, also known as ACP (Air Crystal Pellet) technology, is an advanced dry cleaning method that uses compressed air to accelerate specialized cleaning pellets onto contaminated surfaces. The pellets—typically made from compressed dry ice (CO₂) or biodegradable crystals—impact the surface at high velocity, creating three cleaning actions:
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5 text-accent" />
                Kinetic Energy
              </h3>
              <p className="text-sm text-muted-foreground">
                High-velocity impact (150-300 m/s) dislodges contaminants through mechanical force without substrate damage
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Wind className="h-5 w-5 text-accent" />
                Thermal Shock
              </h3>
              <p className="text-sm text-muted-foreground">
                Dry ice pellets at -78.5°C freeze contaminants, causing them to crack and separate from the surface
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Droplets className="h-5 w-5 text-accent" />
                Sublimation
              </h3>
              <p className="text-sm text-muted-foreground">
                Dry ice converts directly from solid to gas, expanding 800x and lifting contaminants away
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-muted/30 mb-6">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-3">Key Advantages Over Traditional Cleaning</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>✓ <strong>No secondary waste:</strong> Cleaning media sublimates or evaporates, leaving only removed contaminants</li>
              <li>✓ <strong>Non-abrasive:</strong> Won't damage paint booth walls, conveyor surfaces, or delicate fixtures</li>
              <li>✓ <strong>Dry process:</strong> No water, solvents, or chemicals required—immediate return to service</li>
              <li>✓ <strong>Environmentally friendly:</strong> Uses recycled CO₂, zero VOC emissions, no hazardous waste</li>
              <li>✓ <strong>Reduced downtime:</strong> 50-70% faster than manual cleaning, no drying time needed</li>
              <li>✓ <strong>In-place cleaning:</strong> Equipment doesn't require disassembly or relocation</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Applications */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Paint Booth Applications</h2>
        
        <div className="space-y-6">
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold mb-2">Paint Booth Wall & Floor Cleaning</h3>
            <p className="text-muted-foreground">
              Removes accumulated overspray from booth walls, floors, and grates without damaging coatings or creating sludge. Robotic systems can be programmed for automatic cleaning cycles during shift changes or weekends.
            </p>
          </div>
          
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold mb-2">Conveyor System Maintenance</h3>
            <p className="text-muted-foreground">
              Cleans paint buildup from overhead conveyors, carrier fixtures, and hangers without removing them from the production line. Prevents paint chips from falling onto finished parts.
            </p>
          </div>
          
          <div className="border-l-4 border-amber-500 pl-4">
            <h3 className="font-semibold mb-2">Robot & Bell Cleaning</h3>
            <p className="text-muted-foreground">
              Gently removes paint contamination from robot arms, bell housings, and high-voltage insulation without abrasive damage. Can be integrated into automatic bell wash cycles.
            </p>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-semibold mb-2">Fixture & Rack Cleaning</h3>
            <p className="text-muted-foreground">
              Strips paint buildup from part fixtures, racks, and masking without dimensional changes or substrate damage. Extends fixture life and improves part grounding.
            </p>
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
        <h2 className="text-xl font-semibold mb-2">Need Help with Snowflake Cleaning?</h2>
        <p className="text-muted-foreground mb-4">
          Our engineering team can design automated snowflake cleaning systems integrated with your paint booth operations.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button onClick={handleConsultation}>
            Start Consultation <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" asChild>
            <Link to="/solutions/robotic-painting-system">Paint Booth Solutions</Link>
          </Button>
        </div>
      </section>
    </ResourcePageLayout>
  );
}