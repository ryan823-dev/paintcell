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

export default function RoboticPaintingCostGuide() {
  const { t, locale } = useI18n();
  const article = t.knowledge?.roboticPaintingCostGuide || {};
  const breadcrumbs = t.resources?.breadcrumbs || {};

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": article.metaTitle || "Robotic Painting Cost Guide — Investment Analysis for Industrial Automation",
    "author": { "@type": "Organization", "name": "TD Engineering Team" },
    "datePublished": "2026-01-20",
    "dateModified": "2026-02-12",
    "publisher": { "@type": "Organization", "name": "TD Painting System" },
    "inLanguage": locale,
  };
  
  const faqs = useMemo(() => [
    { q: t.knowledgeFaqs.costGuide.q1, a: t.knowledgeFaqs.costGuide.a1 },
    { q: t.knowledgeFaqs.costGuide.q2, a: t.knowledgeFaqs.costGuide.a2 },
    { q: t.knowledgeFaqs.costGuide.q3, a: t.knowledgeFaqs.costGuide.a3 },
    { q: t.knowledgeFaqs.costGuide.q4, a: t.knowledgeFaqs.costGuide.a4 },
  ], [t]);

  const handleConsultation = () => {
    sessionStorage.setItem("project-init-message", "I need a preliminary budget estimate for a robotic painting system.");
    const btn = document.querySelector('[data-assistant-trigger]') as HTMLButtonElement;
    if (btn) btn.click();
  };

  return (
    <>
      <Helmet>
        <title>{article.metaTitle || "Robotic Painting Cost Guide | Technical Insights | TD"}</title>
        <meta name="description" content={article.metaDesc || "Expert guide on robotic painting system costs. Covers capital investment breakdown, operating costs, ROI calculation methodology, and cost optimization strategies."} />
        <link rel="canonical" href="https://tdpaint.com/resources/knowledge/robotic-painting-cost-guide" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) })}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="border-b border-border bg-muted/30">
          <div className="container-wide py-3">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">{breadcrumbs.home || "Home"}</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbLink asChild><Link to="/resources/engineering-library">{breadcrumbs.knowledge || "Knowledge"}</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbPage>{article.title || "Robotic Painting Cost Guide"}</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        <article className="container-narrow py-12 md:py-16">
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-6">
            <span className="flex items-center gap-1"><User className="h-3 w-3" /> TD Engineering Team</span>
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Published: Jan 20, 2026</span>
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Updated: Feb 12, 2026</span>
            <span className="flex items-center gap-1"><Award className="h-3 w-3" /> ISO 9001 Certified Integrator</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-6">{article.title || "Robotic Painting Cost Guide"}</h1>
          <p className="text-muted-foreground leading-relaxed mb-8 text-base">
            Understanding the true cost of robotic painting automation requires looking beyond the equipment price tag. This guide breaks down capital investment components, ongoing operating costs, ROI calculation methodology, and strategies for optimizing your automation investment.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">1. Capital Investment Breakdown</h2>
          <div className="prose prose-slate max-w-none text-muted-foreground mb-6">
            <p className="mb-4">A complete robotic painting system investment consists of several major categories:</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {[
              { title: "Industrial Robot (20–35%)", desc: "Painting robot with controller, including ATEX certification, hollow wrist, and painting software packages." },
              { title: "Spray Equipment (10–20%)", desc: "Guns, pumps, regulators, color change systems, and paint supply infrastructure." },
              { title: "Spray Booth (20–30%)", desc: "Booth structure, ventilation system, filtration, lighting, and fire suppression." },
              { title: "Controls & Integration (15–25%)", desc: "PLC, HMI, safety systems, conveyor interface, MES connectivity, and recipe management." },
              { title: "Engineering & Project Management (5–10%)", desc: "System design, simulation, documentation, project coordination, and commissioning." },
              { title: "Installation & Training (5–10%)", desc: "On-site installation, startup, operator training, and warranty period support." },
            ].map((item, i) => (
              <Card key={i} className="border-border bg-card">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-sm mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">2. Operating Cost Comparison</h2>
          <Card className="border-border bg-card overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left py-3 px-5 font-semibold text-muted-foreground uppercase text-[11px] tracking-wider">Cost Category</th>
                    <th className="text-left py-3 px-5 font-semibold text-muted-foreground uppercase text-[11px] tracking-wider">Manual</th>
                    <th className="text-left py-3 px-5 font-semibold text-muted-foreground uppercase text-[11px] tracking-wider">Robotic</th>
                    <th className="text-left py-3 px-5 font-semibold text-muted-foreground uppercase text-[11px] tracking-wider">Savings</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Direct labor", "3–5 painters/shift", "0.5–1 operator/shift", "50–80%"],
                    ["Paint material", "30–40% transfer efficiency", "65–85% transfer efficiency", "15–35%"],
                    ["Rework/reject", "5–15% reject rate", "1–3% reject rate", "60–80%"],
                    ["Energy (booth)", "Continuous full ventilation", "Variable speed, demand-based", "15–30%"],
                    ["Quality cost", "Inspection-heavy", "Process-controlled", "40–60%"],
                  ].map(([cat, manual, robotic, savings], i) => (
                    <tr key={i} className="border-b border-border last:border-0">
                      <td className="py-3 px-5 font-medium">{cat}</td>
                      <td className="py-3 px-5 text-muted-foreground">{manual}</td>
                      <td className="py-3 px-5 text-muted-foreground">{robotic}</td>
                      <td className="py-3 px-5 text-accent font-medium">{savings}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <h2 className="text-2xl font-bold mt-12 mb-4">3. Common Cost Mistakes to Avoid</h2>
          <div className="space-y-3 mb-6">
            {[
              "Comparing equipment-only quotes — always compare total installed cost including engineering, installation, and training",
              "Ignoring operating cost savings — a higher-quality system with better transfer efficiency pays for itself in material savings",
              "Underbudgeting for site preparation — facility modifications (power, air, ventilation) can be 10–20% of project cost",
              "Skipping simulation validation — programming surprises during commissioning are expensive to resolve on-site",
              "Not planning for production ramp-up — include 2–4 weeks of reduced output during learning curve",
            ].map((mistake, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-lg border border-destructive/20 bg-destructive/5">
                <span className="text-destructive font-bold text-sm shrink-0">✗</span>
                <p className="text-sm text-muted-foreground">{mistake}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">4. TD's Cost Optimization Approach</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            TD optimizes total cost of ownership through right-sized system design, simulation-validated engineering, and phased implementation options. Our AI-powered feasibility assessment provides preliminary budget ranges within minutes, helping you plan resources before committing to detailed engineering.
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
            <Link to="/solutions/robotic-painting-system" className="text-accent hover:text-accent/80 inline-flex items-center gap-1">Robotic Painting System <ArrowRight className="h-3 w-3" /></Link>
            <Link to="/resources/knowledge/how-to-choose-paint-robot" className="text-accent hover:text-accent/80 inline-flex items-center gap-1">How to Choose a Paint Robot <ArrowRight className="h-3 w-3" /></Link>
          </div>

          <div className="pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleConsultation} className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                Get Budget Estimate <ChevronRight className="h-4 w-4 ml-1" />
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
