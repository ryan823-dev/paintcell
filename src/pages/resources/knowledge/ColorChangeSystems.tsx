import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ChevronRight, User, CalendarDays, FileText, Clock,
  Palette, Zap, Timer, DollarSign, Settings2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from "@/components/ui/accordion";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { ExploreLinks } from "@/components/seo/ExploreLinks";

const DOMAIN = "https://tdpaintcell.com";

const systemTypes = [
  {
    name: "Manual Color Change",
    description: "Operator physically changes guns or connects different paint lines",
    changeTime: "15-60 minutes",
    purgeWaste: "2-10 liters",
    colors: "2-4",
    cost: "Low",
    bestFor: "Low volume, few colors, batch production",
  },
  {
    name: "Quick-Disconnect Manifold",
    description: "Pre-connected paint lines with manual valve switching",
    changeTime: "5-15 minutes",
    purgeWaste: "0.5-2 liters",
    colors: "4-8",
    cost: "Medium",
    bestFor: "Medium volume, moderate color variety",
  },
  {
    name: "Automatic Color Changer",
    description: "PLC-controlled valve manifold with automatic sequencing",
    changeTime: "30-90 seconds",
    purgeWaste: "100-500 ml",
    colors: "8-24+",
    cost: "High",
    bestFor: "High volume, frequent changes, mixed-model production",
  },
  {
    name: "Pigging System",
    description: "Projectile pushed through lines to recover paint between colors",
    changeTime: "60-180 seconds",
    purgeWaste: "50-200 ml",
    colors: "Unlimited",
    cost: "Very High",
    bestFor: "Long paint lines, expensive coatings, minimal waste critical",
  },
];

const faqs = [
  {
    question: "What is color changeover time?",
    answer: "Color changeover time is the total duration from completing the last part in one color to producing the first acceptable part in the next color. This includes purging, cleaning, priming with new color, and any quality verification steps.",
  },
  {
    question: "How much paint is wasted during color changes?",
    answer: "Purge waste varies dramatically by system type: manual changes may waste 2-10 liters, quick-disconnect systems 0.5-2 liters, automatic changers 100-500ml, and pigging systems as little as 50-200ml per change.",
  },
  {
    question: "When is an automatic color changer worth the investment?",
    answer: "Automatic color changers typically pay back when you have 4+ color changes per shift, 8+ colors in rotation, or high-value coatings where purge waste is costly. ROI is usually 12-24 months for qualifying applications.",
  },
  {
    question: "Can different paint types share a color change system?",
    answer: "Generally, similar paint types (e.g., all solvent-based or all waterborne) can share a system. Mixing incompatible chemistries requires separate systems or extensive purging protocols.",
  },
  {
    question: "What is a pigging system?",
    answer: "A pigging system uses a foam or solid projectile (pig) pushed through paint lines by air or solvent to recover unused paint and clean the line. It minimizes waste but adds complexity and cost.",
  },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${DOMAIN}/resources/knowledge/color-change-systems#article`,
    headline: "Color Change Systems in Robotic Painting: Types, Selection & ROI",
    description: "Complete guide to paint color change systems for robotic spray painting. Compare manual, quick-disconnect, automatic, and pigging systems with changeover times, waste reduction, and ROI analysis.",
    author: { "@id": `${DOMAIN}/#organization` },
    publisher: { "@id": `${DOMAIN}/#organization` },
    datePublished: "2026-02-27",
    dateModified: "2026-02-27",
    mainEntityOfPage: { "@id": `${DOMAIN}/resources/knowledge/color-change-systems#webpage` },
    articleSection: "Technical Knowledge",
    keywords: ["color change system", "paint changeover", "automatic color changer", "pigging system", "robotic painting", "purge waste reduction"],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${DOMAIN}/resources/knowledge/color-change-systems#faq`,
    mainEntity: faqs.map(f => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${DOMAIN}/resources/knowledge/color-change-systems#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${DOMAIN}/` },
      { "@type": "ListItem", position: 2, name: "Resources", item: `${DOMAIN}/resources` },
      { "@type": "ListItem", position: 3, name: "Knowledge", item: `${DOMAIN}/resources` },
      { "@type": "ListItem", position: 4, name: "Color Change Systems", item: `${DOMAIN}/resources/knowledge/color-change-systems` },
    ],
  },
];

export default function ColorChangeSystems() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Color Change Systems in Robotic Painting: Types, Selection & ROI | TD</title>
        <meta name="description" content="Complete guide to paint color change systems for robotic spray painting. Compare manual, quick-disconnect, automatic, and pigging systems with changeover times and ROI analysis." />
        <link rel="canonical" href={`${DOMAIN}/resources/knowledge/color-change-systems`} />
        {schemas.map((s, i) => (
          <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
        ))}
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="container-wide pt-4 pb-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/resources">Resources</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Color Change Systems</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Hero */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>12 min read</span>
              <span className="mx-2">·</span>
              <span>Technical Knowledge</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold mb-6 leading-tight">
              Color Change Systems in Robotic Painting
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
              Color changeover is one of the most significant factors affecting production efficiency in multi-color painting operations. This guide covers the different types of color change systems, their performance characteristics, and how to select the right approach for your production requirements.
            </p>
          </div>
        </section>

        {/* Why Color Change Matters */}
        <section className="border-b border-border">
          <div className="container-wide py-12">
            <h2 className="text-2xl font-bold mb-6">Why Color Change Efficiency Matters</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="border-border bg-card">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Timer className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold">Production Time</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    A facility with 6 color changes per shift at 30 minutes each loses 3 hours of production daily — 750+ hours annually.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold">Material Waste</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Purge waste at 5 liters per change, 6 changes daily = 30 liters/day. At $15/liter, that's $450/day or $110,000+ annually.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Palette className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold">Flexibility</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Fast color change enables smaller batch sizes, better customer responsiveness, and reduced inventory requirements.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="prose prose-sm max-w-3xl text-muted-foreground">
              <p>
                The true cost of color changeover extends beyond obvious factors. Long changeover times force larger batch sizes to amortize downtime, increasing work-in-process inventory and reducing scheduling flexibility. Purge waste represents direct material cost plus disposal expenses. And inconsistent changeover quality leads to first-part defects and additional scrap.
              </p>
            </div>
          </div>
        </section>

        {/* System Types Comparison */}
        <section className="border-b border-border ">
          <div className="container-wide py-12">
            <h2 className="text-2xl font-bold mb-6">Color Change System Types</h2>
            <div className="overflow-x-auto mb-8">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>System Type</TableHead>
                    <TableHead>Change Time</TableHead>
                    <TableHead>Purge Waste</TableHead>
                    <TableHead>Colors</TableHead>
                    <TableHead>Investment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {systemTypes.map((system, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{system.name}</TableCell>
                      <TableCell>{system.changeTime}</TableCell>
                      <TableCell>{system.purgeWaste}</TableCell>
                      <TableCell>{system.colors}</TableCell>
                      <TableCell>{system.cost}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        {/* Detailed System Descriptions */}
        <section className="border-b border-border">
          <div className="container-wide py-12">
            <h2 className="text-2xl font-bold mb-8">System Types: Detailed Analysis</h2>
            <div className="space-y-6">
              {systemTypes.map((system, i) => (
                <Card key={i} className="border-border bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{system.name}</h3>
                        <p className="text-muted-foreground text-sm">{system.description}</p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">
                        {system.cost} Cost
                      </span>
                    </div>
                    <div className="grid md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Change Time:</span>
                        <p className="font-medium">{system.changeTime}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Purge Waste:</span>
                        <p className="font-medium">{system.purgeWaste}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Color Capacity:</span>
                        <p className="font-medium">{system.colors}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Best For:</span>
                        <p className="font-medium">{system.bestFor}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Automatic Color Changer Deep Dive */}
        <section className="border-b border-border ">
          <div className="container-wide py-12">
            <h2 className="text-2xl font-bold mb-6">Automatic Color Changers: How They Work</h2>
            <div className="prose prose-sm max-w-3xl text-muted-foreground space-y-4 mb-8">
              <p>
                Automatic color changers are the most common solution for high-volume, multi-color robotic painting. They use a manifold block with pneumatic or electric valves connected to multiple paint supply lines. A PLC sequences the valves to:
              </p>
              <ol className="list-decimal list-inside space-y-2">
                <li>Close the current color supply valve</li>
                <li>Open solvent flush valve to purge the common line and gun</li>
                <li>Optionally pulse air to clear residual solvent</li>
                <li>Open the new color supply valve</li>
                <li>Prime the line with new color (to waste or recirculation)</li>
                <li>Resume spraying when color is verified</li>
              </ol>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
              <div>
                <h3 className="font-semibold mb-3">Key Components</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Settings2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    <span><strong>Valve Manifold:</strong> 8-24+ color positions plus solvent and air</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Settings2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    <span><strong>Common Line:</strong> Single line from manifold to gun (minimize volume)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Settings2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    <span><strong>Dump Valve:</strong> Directs purge waste to collection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Settings2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    <span><strong>Color Sensor:</strong> Optional verification of correct color</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Optimization Strategies</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    <span>Minimize common line volume (shorter = less purge)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    <span>Use quick-flush gun technology</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    <span>Optimize purge sequence timing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    <span>Schedule similar colors sequentially when possible</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ROI Analysis */}
        <section className="border-b border-border">
          <div className="container-wide py-12">
            <h2 className="text-2xl font-bold mb-6">ROI Analysis: When to Upgrade</h2>
            <div className="prose prose-sm max-w-3xl text-muted-foreground space-y-4 mb-8">
              <p>
                The decision to invest in advanced color change equipment depends on your specific production profile. Key factors include:
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mb-8">
              <Card className="border-border bg-card">
                <CardContent className="p-5">
                  <h3 className="font-semibold mb-3">Factors Favoring Investment</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• 4+ color changes per shift</li>
                    <li>• 8+ colors in active rotation</li>
                    <li>• High-value coatings ($20+/liter)</li>
                    <li>• Small batch sizes or JIT production</li>
                    <li>• Customer demands for color variety</li>
                    <li>• Production capacity constraints</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-border bg-card">
                <CardContent className="p-5">
                  <h3 className="font-semibold mb-3">Factors Against Investment</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• 1-2 color changes per shift</li>
                    <li>• Stable color schedule (few changes)</li>
                    <li>• Low-cost coatings</li>
                    <li>• Large batch sizes</li>
                    <li>• Excess production capacity</li>
                    <li>• Limited capital budget</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            <div className="bg-muted/50 rounded-lg p-6 max-w-3xl">
              <h3 className="font-semibold mb-3">Example ROI Calculation</h3>
              <div className="text-sm text-muted-foreground space-y-2">
                <p><strong>Current state:</strong> 6 changes/day × 30 min = 3 hr downtime; 5 L purge × 6 = 30 L waste</p>
                <p><strong>With automatic changer:</strong> 6 changes/day × 1 min = 6 min downtime; 0.3 L × 6 = 1.8 L waste</p>
                <p><strong>Daily savings:</strong> 2.9 hr production time + 28.2 L material</p>
                <p><strong>Annual value:</strong> ~$150,000 (varies by production rate and material cost)</p>
                <p><strong>System cost:</strong> $40,000-80,000 → <strong>ROI: 4-8 months</strong></p>
              </div>
            </div>
          </div>
        </section>

        {/* Selection Guide */}
        <section className="border-b border-border ">
          <div className="container-wide py-12">
            <h2 className="text-2xl font-bold mb-6">System Selection Guide</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Production Profile</TableHead>
                    <TableHead>Recommended System</TableHead>
                    <TableHead>Key Considerations</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">1-2 colors, large batches</TableCell>
                    <TableCell>Manual or Quick-Disconnect</TableCell>
                    <TableCell>Low investment, adequate for infrequent changes</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">4-8 colors, medium batches</TableCell>
                    <TableCell>Quick-Disconnect or Basic Automatic</TableCell>
                    <TableCell>Balance of cost and flexibility</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">8+ colors, small batches</TableCell>
                    <TableCell>Full Automatic Color Changer</TableCell>
                    <TableCell>Fast changeover critical for efficiency</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Many colors, long lines, expensive paint</TableCell>
                    <TableCell>Pigging System</TableCell>
                    <TableCell>Maximum material recovery, highest investment</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        {/* E-E-A-T Block */}
        <section className="border-b border-border">
          <div className="container-wide py-10">
            <Card className="border-border bg-card">
              <CardContent className="p-6 flex flex-col sm:flex-row gap-6 text-sm">
                <div className="flex items-start gap-3">
                  <User className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-foreground">Author</div>
                    <div className="text-muted-foreground">TD Engineering Team</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CalendarDays className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-foreground">Last updated</div>
                    <div className="text-muted-foreground">2026-02-27</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-foreground">Scope</div>
                    <div className="text-muted-foreground">
                      Color change systems for liquid paint applications in robotic spray painting. Covers solvent-based and waterborne coatings.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-border ">
          <div className="container-wide py-12">
            <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="max-w-3xl">
              <Accordion type="multiple" defaultValue={faqs.map((_, i) => `faq-${i}`)} className="space-y-2">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-5 bg-card">
                    <AccordionTrigger className="text-sm font-medium text-left py-4 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Related Content */}
        <section className="border-b border-border">
          <div className="container-wide py-12">
            <h2 className="text-xl font-bold mb-6">Related Resources</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link to="/resources/glossary/color-changeover" className="group">
                <Card className="border-border bg-card h-full transition-colors group-hover:border-accent/40">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm mb-1 group-hover:text-accent">Color Changeover</h3>
                    <p className="text-muted-foreground text-xs">Glossary definition and metrics</p>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/resources/knowledge/robotic-painting-cost-guide" className="group">
                <Card className="border-border bg-card h-full transition-colors group-hover:border-accent/40">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm mb-1 group-hover:text-accent">Robotic Painting Cost Guide</h3>
                    <p className="text-muted-foreground text-xs">Complete investment analysis</p>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/solutions/robotic-painting-system" className="group">
                <Card className="border-border bg-card h-full transition-colors group-hover:border-accent/40">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm mb-1 group-hover:text-accent">Robotic Painting System</h3>
                    <p className="text-muted-foreground text-xs">System integration overview</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        <ExploreLinks currentPath="/resources/knowledge/color-change-systems" />
      </div>
    </>
  );
}
