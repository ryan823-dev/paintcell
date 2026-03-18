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

export default function RobotPathOptimization() {
  const { t, locale } = useI18n();
  const article = t.knowledge?.robotPathOptimization || {};
  const breadcrumbs = t.resources?.breadcrumbs || {};

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": article.metaTitle || "Robot Spray Path Optimization: Techniques for Consistent Coating Quality",
    "author": { "@type": "Organization", "name": "TD Engineering Team" },
    "datePublished": "2026-02-22",
    "dateModified": "2026-02-27",
    "publisher": { "@type": "Organization", "name": "TD Painting System" },
    "inLanguage": locale,
  };
  
  const faqs = useMemo(() => [
    { q: t.knowledgeFaqs.pathOptimization.q1, a: t.knowledgeFaqs.pathOptimization.a1 },
    { q: t.knowledgeFaqs.pathOptimization.q2, a: t.knowledgeFaqs.pathOptimization.a2 },
    { q: t.knowledgeFaqs.pathOptimization.q3, a: t.knowledgeFaqs.pathOptimization.a3 },
    { q: t.knowledgeFaqs.pathOptimization.q4, a: t.knowledgeFaqs.pathOptimization.a4 },
  ], [t]);

  const handleConsultation = () => {
    sessionStorage.setItem("project-init-message", "I need help optimizing robot spray paths for my painting application.");
    const btn = document.querySelector('[data-assistant-trigger]') as HTMLButtonElement;
    if (btn) btn.click();
  };

  return (
    <>
      <Helmet>
        <title>{article.metaTitle || "Robot Spray Path Optimization for Consistent Coating | TD"}</title>
        <meta name="description" content={article.metaDesc || "Technical guide to optimizing robotic spray paths for consistent paint coverage. Learn about path strategies, gun distance control, overlap techniques, and cycle time optimization."} />
        <link rel="canonical" href="https://tdpaint.com/resources/knowledge/robot-path-optimization" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) })}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-muted/30">
          <div className="container-wide py-3">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">{breadcrumbs.home || "Home"}</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbLink asChild><Link to="/resources/engineering-library">{breadcrumbs.knowledge || "Knowledge"}</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbPage>{article.title || "Robot Path Optimization"}</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        <article className="container-narrow py-12 md:py-16">
          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-6">
            <span className="flex items-center gap-1"><User className="h-3 w-3" /> TD Engineering Team</span>
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Updated Feb 2026</span>
            <span className="flex items-center gap-1"><Award className="h-3 w-3" /> Technical Guide</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-heading mb-4">
            Robot Spray Path Optimization: Techniques for Consistent Coating Quality
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            The robot path is the single most critical factor in achieving consistent paint quality. This guide covers proven techniques for path optimization that ensure uniform coverage, minimize cycle time, and reduce defects.
          </p>

          {/* Hero image */}
          <div className="rounded-lg overflow-hidden mb-10 border border-border">
            <img 
              src="/images/robotic-paint-cell-overview.png" 
              alt="Robotic paint cell with optimized spray path"
              className="w-full h-auto"
            />
          </div>

          {/* Path Fundamentals */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-heading mb-4">Path Fundamentals</h2>
            <p className="text-body mb-6">
              A well-optimized spray path controls three critical parameters simultaneously: gun distance, gun angle, and spray velocity. Consistency in these parameters across the entire part surface is what separates professional results from amateur attempts.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Gun Distance</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Maintain consistent standoff distance (typically 200-300mm) across all surfaces.
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Too close: runs and sags</li>
                    <li>• Too far: dry spray, orange peel</li>
                    <li>• Variation: uneven film build</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Gun Angle</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Keep gun perpendicular to surface (±15°) for optimal transfer and uniform coverage.
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Perpendicular = best transfer</li>
                    <li>• Angled = overspray, thin edges</li>
                    <li>• Surface-following critical</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Spray Velocity</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Control robot TCP speed to achieve target film build per pass.
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Too fast: thin, incomplete</li>
                    <li>• Too slow: heavy, runs</li>
                    <li>• Typical: 300-600 mm/s</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Path Strategies */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-heading mb-4">Path Strategy Selection</h2>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Horizontal Raster (Most Common)</h3>
                  <p className="text-muted-foreground mb-3">
                    Parallel horizontal passes with consistent overlap. Best for flat and gently curved surfaces.
                  </p>
                  <div className="bg-muted/30 p-4 rounded-lg text-sm">
                    <p className="font-medium mb-2">When to use:</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Flat panels, hoods, roofs</li>
                      <li>• Surfaces with single primary curvature</li>
                      <li>• When gravity-assisted flow is desired</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Vertical Raster</h3>
                  <p className="text-muted-foreground mb-3">
                    Parallel vertical passes, useful for tall parts where horizontal paths would exceed reach.
                  </p>
                  <div className="bg-muted/30 p-4 rounded-lg text-sm">
                    <p className="font-medium mb-2">When to use:</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Tall vertical surfaces</li>
                      <li>• Side panels and doors</li>
                      <li>• Parts on vertical fixtures</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Contour Following</h3>
                  <p className="text-muted-foreground mb-3">
                    Path follows part contours (edges, features). Provides best coverage on complex geometry.
                  </p>
                  <div className="bg-muted/30 p-4 rounded-lg text-sm">
                    <p className="font-medium mb-2">When to use:</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Complex 3D shapes</li>
                      <li>• Parts with multiple surface transitions</li>
                      <li>• When edge coverage is critical</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Spiral/Circular</h3>
                  <p className="text-muted-foreground mb-3">
                    Continuous spiral pattern, typically for round parts. Minimizes gun on/off triggers.
                  </p>
                  <div className="bg-muted/30 p-4 rounded-lg text-sm">
                    <p className="font-medium mb-2">When to use:</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Wheels, discs, drums</li>
                      <li>• Cylindrical parts on rotary fixtures</li>
                      <li>• Rotationally symmetric geometry</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Overlap Techniques */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-heading mb-4">Overlap Optimization</h2>
            <p className="text-body mb-4">
              Proper overlap ensures uniform film build across the entire surface. Inconsistent overlap is the #1 cause of visible banding and coating defects.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">50% Overlap (Standard)</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Each pass covers half the previous pass</li>
                    <li>• Provides 2x coverage across entire surface</li>
                    <li>• Best balance of uniformity and speed</li>
                    <li>• Use for most standard applications</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">66% Overlap (Heavy Build)</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Each pass covers 2/3 of previous pass</li>
                    <li>• Provides 3x coverage for heavy builds</li>
                    <li>• Better hiding on difficult colors</li>
                    <li>• Use for primers, heavy coats</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg">
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                Key principle: Calculate step-over distance from actual spray pattern width, not theoretical values. 
                Always verify pattern width during setup.
              </p>
            </div>
          </section>

          {/* Cycle Time Optimization */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-heading mb-4">Cycle Time Optimization</h2>
            <p className="text-body mb-4">
              After achieving quality targets, optimize for speed without sacrificing consistency:
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-sm font-semibold text-primary">1</span>
                </div>
                <div>
                  <h4 className="font-medium">Minimize air moves</h4>
                  <p className="text-sm text-muted-foreground">Reduce non-spraying travel between passes. Sequence passes to minimize repositioning.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-sm font-semibold text-primary">2</span>
                </div>
                <div>
                  <h4 className="font-medium">Optimize approach/retract</h4>
                  <p className="text-sm text-muted-foreground">Use smooth blends instead of hard stops. Trigger gun on/off during motion, not at standstill.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-sm font-semibold text-primary">3</span>
                </div>
                <div>
                  <h4 className="font-medium">Maximize spray velocity</h4>
                  <p className="text-sm text-muted-foreground">Find the fastest TCP speed that still achieves target film build. Increase flow rate if needed.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-sm font-semibold text-primary">4</span>
                </div>
                <div>
                  <h4 className="font-medium">Use continuous paths</h4>
                  <p className="text-sm text-muted-foreground">Where possible, connect passes into continuous motion rather than discrete segments.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-heading mb-4">Common Path Mistakes to Avoid</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-red-200 dark:border-red-900">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-red-600 dark:text-red-400 mb-2">❌ Don't:</h3>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li>• Assume CAD path works without verification</li>
                    <li>• Ignore edge coverage in favor of cycle time</li>
                    <li>• Use constant speed on varying curvatures</li>
                    <li>• Skip spray pattern testing after setup</li>
                    <li>• Copy paths between different paint systems</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-green-200 dark:border-green-900">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-green-600 dark:text-green-400 mb-2">✓ Do:</h3>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li>• Validate paths on actual production parts</li>
                    <li>• Add extra passes on edges and corners</li>
                    <li>• Adjust speed for surface curvature changes</li>
                    <li>• Document and version control all programs</li>
                    <li>• Re-optimize when changing paint materials</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-heading mb-4">Frequently Asked Questions</h2>
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
            <h2 className="text-xl font-semibold mb-2">Need Path Programming Support?</h2>
            <p className="text-muted-foreground mb-4">
              Our team provides robot programming services including path development, optimization, and training for your operators.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleConsultation}>
                Discuss Your Application <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" asChild>
                <Link to="/resources/glossary/teach-pendant">Learn About Teach Pendants</Link>
              </Button>
            </div>
          </section>
        </article>
      </div>
    </>
  );
}
