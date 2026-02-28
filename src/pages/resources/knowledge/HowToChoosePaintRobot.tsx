import { Helmet } from "react-helmet-async";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { ChevronRight, ArrowRight, User, Calendar, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from "@/components/ui/accordion";
import { useMemo } from "react";
import { useI18n } from "@/i18n";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "How to Choose a Paint Robot for Industrial Spray Painting",
  "author": { "@type": "Organization", "name": "TD Engineering Team" },
  "datePublished": "2026-01-15",
  "dateModified": "2026-02-12",
  "publisher": { "@type": "Organization", "name": "TD Painting System" },
};

export default function HowToChoosePaintRobot() {
  const { t } = useI18n();
  
  const faqs = useMemo(() => [
    { q: t.knowledgeFaqs.choosePaintRobot.q1, a: t.knowledgeFaqs.choosePaintRobot.a1 },
    { q: t.knowledgeFaqs.choosePaintRobot.q2, a: t.knowledgeFaqs.choosePaintRobot.a2 },
    { q: t.knowledgeFaqs.choosePaintRobot.q3, a: t.knowledgeFaqs.choosePaintRobot.a3 },
    { q: t.knowledgeFaqs.choosePaintRobot.q4, a: t.knowledgeFaqs.choosePaintRobot.a4 },
  ], [t]);

  const handleConsultation = () => {
    sessionStorage.setItem("project-init-message", "I need help selecting the right paint robot for my application.");
    const btn = document.querySelector('[data-assistant-trigger]') as HTMLButtonElement;
    if (btn) btn.click();
  };

  return (
    <>
      <Helmet>
        <title>How to Choose a Paint Robot | Technical Insights | TD</title>
        <meta name="description" content="Expert guide on selecting industrial painting robots. Covers robot types, key specifications, selection criteria, and common mistakes. Downloadable checklist included." />
        <link rel="canonical" href="https://tdpaintcell.com/resources/knowledge/how-to-choose-paint-robot" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) })}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-muted/30">
          <div className="container-wide py-3">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbLink asChild><Link to="/resources/engineering-library">Knowledge</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbPage>How to Choose a Paint Robot</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        <article className="container-narrow py-12 md:py-16">
          {/* E-E-A-T Header */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-6">
            <span className="flex items-center gap-1"><User className="h-3 w-3" /> TD Engineering Team</span>
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Published: Jan 15, 2026</span>
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Updated: Feb 12, 2026</span>
            <span className="flex items-center gap-1"><Award className="h-3 w-3" /> ISO 9001 Certified Integrator</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-6">How to Choose a Paint Robot for Industrial Spray Painting</h1>
          
          <p className="text-muted-foreground leading-relaxed mb-8 text-base">
            Selecting the right painting robot is a critical engineering decision that affects coating quality, throughput, and long-term system reliability. This guide covers the fundamental selection criteria, key specifications to evaluate, common mistakes to avoid, and TD's systematic approach to robot specification.
          </p>

          {/* Section 1 */}
          <h2 className="text-2xl font-bold mt-12 mb-4">1. Fundamental Concepts</h2>
          <div className="prose prose-slate max-w-none text-muted-foreground">
            <p className="mb-4">Industrial painting robots are purpose-built 6-axis articulated robots designed for operation in explosive atmospheres. Unlike general industrial robots, they feature:</p>
            <ul className="space-y-2 mb-6 list-disc pl-6">
              <li><strong className="text-foreground">Explosion-proof construction</strong> — ATEX Zone 1 or IECEx certification for operation around flammable vapors</li>
              <li><strong className="text-foreground">Hollow wrist design</strong> — internal routing for paint hoses and air lines, preventing snag and wear</li>
              <li><strong className="text-foreground">Painting-specific software</strong> — spray path optimization, trigger control, and atomizer parameter management</li>
              <li><strong className="text-foreground">Smooth exterior surfaces</strong> — easy-clean design to prevent paint accumulation on robot body</li>
            </ul>
            <p>Major manufacturers offering dedicated painting robots include ABB (IRB 5500), FANUC (P-series), Kawasaki (KJ-series), and Yaskawa (MPX-series). Each has strengths in different reach/speed ranges.</p>
          </div>

          {/* Section 2 */}
          <h2 className="text-2xl font-bold mt-12 mb-4">2. Selection Criteria</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {[
              { title: "Reach & Work Envelope", desc: "Must cover all spray surfaces on the largest part, including edges and recesses, with proper gun angle. Add 15–20% margin for approach clearance." },
              { title: "Speed & Acceleration", desc: "Must sustain required spray speed (typically 300–800 mm/s) throughout the path without jerking. Higher acceleration improves non-spray repositioning time." },
              { title: "Protection Class", desc: "Minimum IP54 for water-based paints, ATEX Zone 1 for solvent-based. Verify certification matches your paint chemistry and local regulations." },
              { title: "Repeatability", desc: "±0.5mm or better for consistent spray overlap. Critical for film build uniformity, especially on complex 3D surfaces." },
              { title: "Controller Compatibility", desc: "Must support painting-specific I/O: gun on/off, fan width, flow rate, bell RPM, color change signals, and recipe management." },
              { title: "Maintenance Access", desc: "Consider servo motor accessibility, cable routing, grease point locations. Painting environments accelerate wear — easy maintenance reduces downtime." },
            ].map((item, i) => (
              <Card key={i} className="border-border bg-card">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-sm mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Section 3 */}
          <h2 className="text-2xl font-bold mt-12 mb-4">3. Common Mistakes to Avoid</h2>
          <div className="space-y-3 mb-6">
            {[
              "Selecting on price alone — cheapest robot often has highest total cost due to integration complexity and maintenance",
              "Ignoring explosion-proof requirements — using non-certified robots in painting zones creates unacceptable safety risks",
              "Underestimating reach requirements — measuring reach to part center instead of all spray surfaces leads to coverage gaps",
              "Overlooking programming capability — painting robots require specialized path programming that differs from pick-and-place",
              "Neglecting spare parts availability — long lead times for painting-specific components can cause extended downtime",
            ].map((mistake, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-lg border border-destructive/20 bg-destructive/5">
                <span className="text-destructive font-bold text-sm shrink-0">✗</span>
                <p className="text-sm text-muted-foreground">{mistake}</p>
              </div>
            ))}
          </div>

          {/* Section 4 */}
          <h2 className="text-2xl font-bold mt-12 mb-4">4. TD's Approach</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            TD's robot selection process is application-driven, not vendor-driven. We evaluate your specific requirements — part geometry, paint type, production volume, and integration constraints — then recommend the optimal robot model from our qualified supplier network. Every recommendation includes 3D simulation validation before commitment.
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
            <Link to="/solutions/spray-robot-integration" className="text-accent hover:text-accent/80 inline-flex items-center gap-1">Spray Robot Integration <ArrowRight className="h-3 w-3" /></Link>
            <Link to="/solutions/robotic-painting-system" className="text-accent hover:text-accent/80 inline-flex items-center gap-1">Robotic Painting System <ArrowRight className="h-3 w-3" /></Link>
            <Link to="/industries/automotive-painting" className="text-accent hover:text-accent/80 inline-flex items-center gap-1">Automotive Solutions <ArrowRight className="h-3 w-3" /></Link>
          </div>

          {/* CTA */}
          <div className="pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleConsultation} className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                Get Robot Selection Advice <ChevronRight className="h-4 w-4 ml-1" />
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
