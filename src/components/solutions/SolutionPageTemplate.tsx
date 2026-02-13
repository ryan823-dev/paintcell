import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ChevronRight, Sparkles, Layers, Settings2, BarChart3,
  AlertTriangle, Clock, HelpCircle, ArrowRight, BookOpen,
  Shield, Wrench, Target, CheckCircle2, User, CalendarDays, FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from "@/components/ui/accordion";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SolutionData } from "@/data/solutionData";
import { ExploreLinks } from "@/components/seo/ExploreLinks";

interface SolutionPageTemplateProps {
  data: SolutionData;
}

export function SolutionPageTemplate({ data }: SolutionPageTemplateProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data.slug]);

  const domain = data.canonicalDomain || "https://paintcell.lovable.app";

  // Build JSON-LD schemas
  const schemas: Record<string, unknown>[] = data.customSchemas
    ? [
        ...data.customSchemas,
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${domain}/solutions/${data.slug}#faq`,
          "mainEntity": data.faqs.map(f => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": { "@type": "Answer", "text": f.answer },
          })),
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "@id": `${domain}/solutions/${data.slug}#breadcrumb`,
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${domain}/` },
            { "@type": "ListItem", "position": 2, "name": "Solutions", "item": `${domain}/solutions/` },
            { "@type": "ListItem", "position": 3, "name": data.heroTitle, "item": `${domain}/solutions/${data.slug}` },
          ],
        },
      ]
    : [
        {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": data.heroTitle,
          "description": data.metaDescription,
          "brand": { "@type": "Brand", "name": "TD" },
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": data.faqs.map(f => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": { "@type": "Answer", "text": f.answer },
          })),
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": domain },
            { "@type": "ListItem", "position": 2, "name": "Solutions", "item": `${domain}/solutions` },
            { "@type": "ListItem", "position": 3, "name": data.heroTitle, "item": `${domain}/solutions/${data.slug}` },
          ],
        },
      ];

  const handleConsultation = () => {
    sessionStorage.setItem("project-init-message", `I'm interested in ${data.heroTitle}. Can you help assess feasibility for my project?`);
    const btn = document.querySelector('[data-assistant-trigger]') as HTMLButtonElement;
    if (btn) btn.click();
  };

  return (
    <>
      <Helmet>
        <title>{data.metaTitle}</title>
        <meta name="description" content={data.metaDescription} />
        <link rel="canonical" href={`${domain}/solutions/${data.slug}`} />
        {schemas.map((schema, i) => (
          <script key={i} type="application/ld+json">{JSON.stringify(schema)}</script>
        ))}
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-muted/30">
          <div className="container-wide py-3">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbLink asChild><Link to="/solutions">Solutions</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbPage>{data.heroTitle}</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Hero */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-20">
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent text-[11px] font-semibold tracking-wider uppercase">
              <Sparkles className="h-3 w-3" />
              Solution
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold mb-4 leading-tight max-w-3xl">
              {data.heroTitle}
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mb-8">
              {data.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleConsultation} className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-11 px-6 gap-2 rounded-xl">
                Start Project Assessment
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button asChild variant="outline" className="h-11 px-6 rounded-xl">
                <Link to="/quote">Talk to an Engineer</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Definition Block */}
        <section className="border-b border-border section-gradient">
          <div className="container-narrow py-12 md:py-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Process Overview</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{data.definition}</p>
            {data.definitionSecondary && (
              <p className="text-muted-foreground leading-relaxed mb-10">{data.definitionSecondary}</p>
            )}

            {/* What TD Delivers (Scope) */}
            {data.scopeItems && data.scopeItems.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  <Wrench className="h-3.5 w-3.5" />
                  What TD delivers
                </div>
                {data.scopeIntro && (
                  <p className="text-muted-foreground text-sm mb-4">{data.scopeIntro}</p>
                )}
                <ul className="space-y-2">
                  {data.scopeItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-accent mt-1 shrink-0">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* Why Section */}
        {data.whyTitle && data.whyItems && data.whyItems.length > 0 && (
          <section className="border-b border-border">
            <div className="container-narrow py-12 md:py-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{data.whyTitle}</h2>
              {data.whyIntro && (
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{data.whyIntro}</p>
              )}
              <ul className="space-y-2">
                {data.whyItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Scope Sub-Sections */}
        {data.scopeSubSections && data.scopeSubSections.length > 0 && (
          <section className="border-b border-border section-gradient">
            <div className="container-narrow py-12 md:py-16">
              <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <Wrench className="h-3.5 w-3.5" />
                Scope of delivery
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">Scope of Delivery</h2>
              {data.scopeIntro && (
                <p className="text-muted-foreground text-sm mb-8">{data.scopeIntro}</p>
              )}
              <div className="space-y-8">
                {data.scopeSubSections.map((sub, i) => (
                  <div key={i}>
                    <h3 className="font-semibold text-base mb-3">{sub.title}</h3>
                    <ul className="space-y-2">
                      {sub.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-accent mt-1 shrink-0">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Typical Components */}
        {data.componentItems && data.componentItems.length > 0 && (
          <section className="border-b border-border">
            <div className="container-narrow py-12 md:py-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Typical Paint Booth Automation Components</h2>
              {data.componentsIntro && (
                <p className="text-muted-foreground text-sm mb-6">{data.componentsIntro}</p>
              )}
              <ul className="space-y-2">
                {data.componentItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-accent mt-1 shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground/60 mt-4 italic">Final configuration depends on paint type, throughput, and site constraints.</p>
            </div>
          </section>
        )}

        {/* System Architecture (only if no scopeSubSections — avoid duplication) */}
        {!data.scopeSubSections && (
          <section className="border-b border-border">
            <div className="container-narrow py-12 md:py-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">System Architecture</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8">Architecture is configured based on part geometry, finish requirement, and production throughput.</p>
              <div className="space-y-4">
                {data.processSteps.map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="flex items-center justify-center h-8 w-8 rounded-full bg-accent text-accent-foreground text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                    <div>
                      <h3 className="font-semibold text-sm mb-1">{step.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                      {step.parameters && (
                        <p className="text-xs text-muted-foreground/60 mt-1 italic">Key parameters: {step.parameters}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Application Scope */}
        <section className="border-b border-border section-gradient">
          <div className="container-narrow py-12 md:py-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Common Use Cases</h2>
            {data.applicationScopeIntro && (
              <p className="text-muted-foreground text-sm mb-6">{data.applicationScopeIntro}</p>
            )}
            <div className="grid md:grid-cols-2 gap-3">
              {data.applicationScope.map((scope, i) => (
                <Card key={i} className="border-border bg-card">
                  <CardContent className="p-5 flex items-start gap-3">
                    <span className="flex items-center justify-center h-6 w-6 rounded-md bg-accent/10 text-accent text-xs font-bold shrink-0 mt-0.5">{String.fromCharCode(65 + i)}</span>
                    <p className="text-sm text-muted-foreground leading-relaxed">{scope}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Configuration */}
        <section className="border-b border-border">
          <div className="container-narrow py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Settings2 className="h-3.5 w-3.5" />
              Configuration logic
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Integration Options</h2>
            <div className="space-y-4">
              {data.configOptions.map((opt, i) => (
                <Card key={i} className="border-border bg-card">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-sm mb-2">{opt.scenario}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{opt.recommendation}</p>
                    <p className="text-xs text-accent font-medium">Suitable for: {opt.suitableFor}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Key Technical Parameters */}
            {data.technicalParameters && data.technicalParameters.length > 0 && (
              <div className="mt-10">
                <div className="flex items-center gap-2 mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  <Target className="h-3.5 w-3.5" />
                  Key technical parameters
                </div>
                {data.technicalParametersIntro && (
                  <p className="text-muted-foreground text-sm mb-4">{data.technicalParametersIntro}</p>
                )}
                <ul className="space-y-2">
                  {data.technicalParameters.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-accent mt-1 shrink-0">•</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Constraints */}
            {data.constraints.length > 0 && (
              <div className="mt-10">
                <div className="flex items-center gap-2 mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  Constraints & notes
                </div>
                <ul className="space-y-2">
                  {data.constraints.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-destructive mt-1 shrink-0">•</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* ATEX / Explosion-Proof */}
        {data.atexItems && data.atexItems.length > 0 && (
          <section className="border-b border-border section-gradient">
            <div className="container-narrow py-12 md:py-16">
              <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <Shield className="h-3.5 w-3.5" />
                Safety classification
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">ATEX / Explosion-Proof Readiness</h2>
              {data.atexIntro && (
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{data.atexIntro}</p>
              )}
              <ul className="space-y-2">
                {data.atexItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-accent mt-1 shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ROI */}
        <section className="border-b border-border">
          <div className="container-narrow py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <BarChart3 className="h-3.5 w-3.5" />
              Production benefits
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Benefits and ROI</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">{data.roiMethodology}</p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {data.roiMetrics.map((m, i) => (
                <Card key={i} className="border-border bg-card text-center">
                  <CardContent className="p-5">
                    <div className="text-xl md:text-2xl font-bold text-accent mb-1">{m.value}</div>
                    <div className="text-xs text-muted-foreground font-medium">{m.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Implementation Timeline */}
        <section className="border-b border-border section-gradient">
          <div className="container-narrow py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              Project timeline
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Implementation Workflow</h2>
            {data.deploymentNote && (
              <p className="text-muted-foreground text-sm leading-relaxed mb-8">{data.deploymentNote}</p>
            )}
            <div className="space-y-4">
              {data.timeline.map((phase, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="flex flex-col items-center">
                    <span className="flex items-center justify-center h-8 w-8 rounded-full bg-accent text-accent-foreground text-xs font-bold shrink-0">{i + 1}</span>
                    {i < data.timeline.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                  </div>
                  <div className="pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm">{phase.phase}</h3>
                      <span className="text-[10px] text-accent font-medium bg-accent/10 px-2 py-0.5 rounded-full">{phase.duration}</span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{phase.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* E-E-A-T Block */}
        {data.eeat && (
          <section className="border-b border-border">
            <div className="container-narrow py-8 md:py-10">
              <div className="flex flex-wrap gap-6 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  Author: {data.eeat.author}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  Last updated: {data.eeat.lastUpdated}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  Scope: {data.eeat.scope}
                </span>
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="border-b border-border">
          <div className="container-narrow py-12 md:py-16">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <HelpCircle className="h-3.5 w-3.5" />
              FAQ
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <Accordion type="multiple" defaultValue={data.faqs.map((_, i) => `faq-${i}`)} className="space-y-2">
              {data.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-5 bg-card">
                  <AccordionTrigger className="text-sm font-medium text-left py-4 hover:no-underline">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Related Links + Project Initiation CTA */}
        <section>
          <div className="container-narrow py-12 md:py-16">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {data.relatedIndustries.length > 0 && (
                <div>
                  <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
                    <Layers className="h-4 w-4 text-accent" />
                    Related Industries
                  </h3>
                  <ul className="space-y-2">
                    {data.relatedIndustries.map((link, i) => (
                      <li key={i}>
                        <Link to={link.href} className="text-sm text-accent hover:text-accent/80 inline-flex items-center gap-1">
                          {link.label} <ArrowRight className="h-3 w-3" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {data.relatedKnowledge.length > 0 && (
                <div>
                  <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-accent" />
                    Related Knowledge
                  </h3>
                  <ul className="space-y-2">
                    {data.relatedKnowledge.map((link, i) => (
                      <li key={i}>
                        <Link to={link.href} className="text-sm text-accent hover:text-accent/80 inline-flex items-center gap-1">
                          {link.label} <ArrowRight className="h-3 w-3" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Project Initiation */}
            <div className="pt-8 border-t border-border">
              <h2 className="text-xl font-bold mb-3">Start Your Paint Booth Automation Assessment</h2>
              <p className="text-muted-foreground text-sm mb-6 max-w-xl">
                Tell us whether you need a new booth or integration into an existing booth, your parts/coating requirements, throughput targets, and ATEX classification (if applicable).
              </p>
              <div className="flex flex-wrap gap-3">
                <Button onClick={handleConsultation} className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-11 px-6 gap-2 rounded-xl">
                  Start Project Assessment <ChevronRight className="h-4 w-4" />
                </Button>
                <Button asChild variant="outline" className="h-11 px-6 rounded-xl">
                  <Link to="/quote">Talk to an Engineer</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Explore Links */}
        <ExploreLinks currentPath={`/solutions/${data.slug}`} />
      </div>
    </>
  );
}
