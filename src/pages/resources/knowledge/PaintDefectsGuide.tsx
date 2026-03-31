import { useEffect, useMemo } from "react";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { ResourcePageLayout } from "@/components/resources";
import {
  User, CalendarDays, FileText, Clock,
  AlertTriangle, CheckCircle2, Eye, Droplets
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from "@/components/ui/accordion";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { ExploreLinks } from "@/components/seo/ExploreLinks";
import { useI18n } from "@/i18n";

const DOMAIN = "https://tdpaint.com";

const defects = [
  {
    name: "Orange Peel",
    description: "Textured surface resembling orange skin, caused by improper atomization or flash-off.",
    causes: ["Low atomization pressure", "Gun too far from surface", "Fast solvent evaporation", "High booth temperature"],
    prevention: ["Increase atomization pressure", "Optimize gun-to-surface distance (150-250mm)", "Use slower evaporating thinner", "Control booth temperature (20-25°C)"],
    severity: "Medium",
  },
  {
    name: "Runs & Sags",
    description: "Paint flowing downward on vertical surfaces due to excessive film thickness or slow drying.",
    causes: ["Excessive film build in single pass", "Gun too close to surface", "Slow gun travel speed", "High humidity or low temperature"],
    prevention: ["Apply multiple thin coats", "Maintain proper gun distance", "Optimize robot speed", "Control environmental conditions"],
    severity: "High",
  },
  {
    name: "Fisheyes / Craters",
    description: "Small circular depressions in the coating caused by surface contamination.",
    causes: ["Silicone contamination", "Oil or grease on substrate", "Incompatible surface treatment", "Contaminated compressed air"],
    prevention: ["Thorough cleaning/degreasing", "Use silicone-free products", "Install oil/water separators", "Regular air line maintenance"],
    severity: "High",
  },
  {
    name: "Dry Spray",
    description: "Rough, sandy texture from paint drying before reaching the surface.",
    causes: ["Gun too far from surface", "Excessive atomization pressure", "Low humidity environment", "Fast evaporating solvents"],
    prevention: ["Reduce gun distance", "Lower atomization pressure", "Increase booth humidity", "Adjust solvent blend"],
    severity: "Medium",
  },
  {
    name: "Solvent Pop / Boiling",
    description: "Small bubbles or pinholes from trapped solvent escaping during cure.",
    causes: ["Film too thick", "Flash-off time too short", "Cure temperature too high", "Fast evaporating solvents"],
    prevention: ["Apply thinner coats", "Allow adequate flash time", "Reduce initial cure temperature", "Use slower solvents"],
    severity: "High",
  },
  {
    name: "Color Mismatch",
    description: "Inconsistent color between parts or areas due to application or material variation.",
    causes: ["Inconsistent film thickness", "Poor material mixing", "Spray pattern variation", "Different substrate colors"],
    prevention: ["Consistent DFT control", "Proper agitation systems", "Calibrated spray patterns", "Primer for substrate uniformity"],
    severity: "Medium",
  },
  {
    name: "Adhesion Failure",
    description: "Coating peeling or flaking from substrate due to poor bonding.",
    causes: ["Inadequate surface preparation", "Contaminated substrate", "Incompatible primer/topcoat", "Moisture on surface"],
    prevention: ["Proper cleaning and prep", "Surface treatment (plasma, flame)", "Compatible coating systems", "Control humidity"],
    severity: "Critical",
  },
  {
    name: "Dust / Dirt Inclusions",
    description: "Foreign particles embedded in the coating surface.",
    causes: ["Poor booth filtration", "Contaminated paint", "Dirty parts entering booth", "Operator contamination"],
    prevention: ["Maintain booth filters", "Filter paint supply", "Pre-clean parts", "Proper PPE and procedures"],
    severity: "Medium",
  },
];

const faqs_static = [
  {
    question: "What causes most paint defects in robotic painting?",
    answer: "Most defects in robotic painting stem from process parameter issues (gun distance, speed, atomization pressure) or environmental factors (temperature, humidity, contamination). Unlike manual painting, robotic systems eliminate operator variability but require proper initial setup and ongoing monitoring.",
  },
  {
    question: "How can robotic painting reduce defects compared to manual?",
    answer: "Robotic systems maintain consistent gun distance, travel speed, and spray patterns that eliminate human variability. Combined with controlled booth environments and proper process recipes, defect rates typically drop 60-80% compared to manual spraying.",
  },
  {
    question: "What is the most critical factor for preventing adhesion failures?",
    answer: "Surface preparation is the most critical factor. This includes proper cleaning, degreasing, and surface treatment (phosphating for metals, flame/plasma for plastics). No amount of spray optimization can compensate for inadequate surface prep.",
  },
  {
    question: "How does film thickness affect defect formation?",
    answer: "Film thickness directly impacts multiple defects: too thick causes runs, sags, and solvent pop; too thin causes poor coverage and durability issues. Robotic systems with closed-loop DFT monitoring help maintain optimal thickness.",
  },
  {
    question: "What environmental conditions are ideal for spray painting?",
    answer: "Optimal conditions are typically 20-25°C temperature, 50-70% relative humidity, and 0.3-0.5 m/s booth airflow. Deviations require process adjustments to prevent defects.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${DOMAIN}/resources/knowledge/paint-defects-guide#article`,
  headline: "Paint Defects Guide: Identification, Causes, and Prevention",
  description: "Comprehensive guide to common paint defects in industrial spray painting. Learn to identify orange peel, runs, fisheyes, and other defects with causes and prevention strategies for robotic painting systems.",
  author: { "@id": `${DOMAIN}/#organization` },
  publisher: { "@id": `${DOMAIN}/#organization` },
  datePublished: "2026-02-27",
  dateModified: "2026-02-27",
  mainEntityOfPage: { "@id": `${DOMAIN}/resources/knowledge/paint-defects-guide#webpage` },
  articleSection: "Technical Knowledge",
  keywords: ["paint defects", "orange peel", "runs sags", "fisheyes", "adhesion failure", "robotic painting", "spray coating defects"],
};

export default function PaintDefectsGuide() {
  const { t, locale } = useI18n();
  const article = t.knowledge?.paintDefectsGuide || {};
  
  const faqs = useMemo(() => [
    { question: t.knowledgeFaqs.paintDefects.q1, answer: t.knowledgeFaqs.paintDefects.a1 },
    { question: t.knowledgeFaqs.paintDefects.q2, answer: t.knowledgeFaqs.paintDefects.a2 },
    { question: t.knowledgeFaqs.paintDefects.q3, answer: t.knowledgeFaqs.paintDefects.a3 },
    { question: t.knowledgeFaqs.paintDefects.q4, answer: t.knowledgeFaqs.paintDefects.a4 },
    { question: t.knowledgeFaqs.paintDefects.q5, answer: t.knowledgeFaqs.paintDefects.a5 },
  ], [t]);

  const faqSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${DOMAIN}/resources/knowledge/paint-defects-guide#faq`,
    mainEntity: faqs.map(f => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  }), [faqs]);

  const structuredData = {
    ...articleSchema,
    ...faqSchema
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ResourcePageLayout
      title={article.title || "Paint Defects Guide: Identification, Causes & Prevention"}
      metaTitle={article.metaTitle || "Paint Defects Guide: Identification, Causes & Prevention | TD"}
      metaDescription={article.metaDesc || "Comprehensive guide to common paint defects in industrial spray painting. Learn to identify orange peel, runs, fisheyes, adhesion failures with causes and prevention strategies."}
      breadcrumbs={[
        { label: "Engineering Library", href: "/resources/engineering-library" },
        { label: "Knowledge" },
        { label: article.title || "Paint Defects Guide" },
      ]}
      structuredData={structuredData}
      canonicalPath="/resources/knowledge/paint-defects-guide"
    >
      {/* Meta info */}
      <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
        <Clock className="h-3.5 w-3.5" />
        <span>15 min read</span>
        <span className="mx-2">·</span>
        <span>Technical Knowledge</span>
      </div>

      <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed mb-8">
        Understanding paint defects is essential for maintaining finish quality in industrial coating operations. This guide covers the most common defects encountered in spray painting, their root causes, and practical prevention strategies for both manual and robotic painting systems.
      </p>

      {/* Introduction */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Why Paint Defects Matter</h2>
        <p className="text-muted-foreground mb-4">
          Paint defects represent more than cosmetic issues — they directly impact product quality, customer satisfaction, warranty costs, and production efficiency. In industrial coating operations, defect rates typically range from 2-15% depending on process maturity and automation level.
        </p>
        <p className="text-muted-foreground mb-4">
          The cost of defects extends beyond rework labor and material waste. Defective parts that reach customers generate warranty claims, damage brand reputation, and may require field repairs costing 10-100x more than in-plant correction.
        </p>
        <p className="text-muted-foreground">
          Robotic painting systems, when properly configured, can reduce defect rates by 60-80% compared to manual spraying. However, robots don't eliminate defects automatically — they require proper process development, environmental control, and ongoing monitoring.
        </p>
      </section>

      {/* Defect Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Defect Categories Overview</h2>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="h-4 w-4 text-accent" />
                <h3 className="font-semibold text-sm">Appearance Defects</h3>
              </div>
              <p className="text-muted-foreground text-xs">Orange peel, color mismatch, gloss variation, texture inconsistency</p>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="h-4 w-4 text-accent" />
                <h3 className="font-semibold text-sm">Application Defects</h3>
              </div>
              <p className="text-muted-foreground text-xs">Runs, sags, dry spray, overspray, uneven coverage</p>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-accent" />
                <h3 className="font-semibold text-sm">Adhesion & Durability</h3>
              </div>
              <p className="text-muted-foreground text-xs">Peeling, flaking, blistering, cracking, delamination</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Detailed Defect Guide */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-8">Common Paint Defects: Detailed Analysis</h2>
        <div className="space-y-6">
          {defects.map((defect, i) => (
            <Card key={i} className="border-border bg-card">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{defect.name}</h3>
                    <p className="text-muted-foreground text-sm">{defect.description}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    defect.severity === "Critical" ? "bg-red-500/10 text-red-500" :
                    defect.severity === "High" ? "bg-orange-500/10 text-orange-500" :
                    "bg-yellow-500/10 text-yellow-500"
                  }`}>
                    {defect.severity} Severity
                  </span>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-3.5 w-3.5 text-orange-500" />
                      Common Causes
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {defect.causes.map((cause, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="text-muted-foreground/50">•</span>
                          {cause}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                      Prevention Strategies
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {defect.prevention.map((prev, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="text-muted-foreground/50">•</span>
                          {prev}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Environmental Factors */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Environmental Factors in Defect Prevention</h2>
        <p className="text-muted-foreground mb-6 max-w-3xl">
          Environmental conditions significantly impact coating quality. Proper booth design and climate control are essential for consistent results.
        </p>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Parameter</TableHead>
                <TableHead>Optimal Range</TableHead>
                <TableHead>Too Low</TableHead>
                <TableHead>Too High</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Temperature</TableCell>
                <TableCell>20-25°C (68-77°F)</TableCell>
                <TableCell>Slow drying, runs, sags</TableCell>
                <TableCell>Fast flash, orange peel, dry spray</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Relative Humidity</TableCell>
                <TableCell>50-70%</TableCell>
                <TableCell>Dry spray, static buildup</TableCell>
                <TableCell>Slow drying, blushing, adhesion issues</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Booth Airflow</TableCell>
                <TableCell>0.3-0.5 m/s</TableCell>
                <TableCell>Poor overspray capture, contamination</TableCell>
                <TableCell>Dry spray, overspray on parts</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Air Cleanliness</TableCell>
                <TableCell>Class 10,000 or better</TableCell>
                <TableCell colSpan={2}>Dust inclusions, contamination defects</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Robotic Advantages */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">How Robotic Painting Reduces Defects</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          <div>
            <h3 className="font-semibold mb-3">Consistency Advantages</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span>Precise gun-to-surface distance maintained throughout spray path</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span>Constant travel speed eliminates thick/thin variations</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span>Repeatable spray patterns for uniform coverage</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span>No operator fatigue or skill variation</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Process Control Advantages</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span>Recipe-based parameter control for different parts</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span>Real-time monitoring and data logging</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span>Closed-loop film thickness control options</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span>Traceability for quality investigations</span>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-muted-foreground text-sm mt-6">
          For more on robotic painting systems, see{" "}
          <Link to="/solutions/robotic-painting-system" className="text-accent underline underline-offset-2 hover:text-accent/80">
            Robotic Painting System Integration
          </Link>.
        </p>
      </section>

      {/* E-E-A-T Block */}
      <section className="mb-10">
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
                  Common paint defects in industrial spray painting operations including liquid coatings on metal, plastic, and wood substrates.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FAQ */}
      <section className="mb-12">
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
      </section>

      {/* Related Content */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6">Related Resources</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link to="/resources/glossary/orange-peel" className="group">
            <Card className="border-border bg-card h-full transition-colors group-hover:border-accent/40">
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm mb-1 group-hover:text-accent">Orange Peel</h3>
                <p className="text-muted-foreground text-xs">Glossary definition and technical details</p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/resources/glossary/dry-film-thickness" className="group">
            <Card className="border-border bg-card h-full transition-colors group-hover:border-accent/40">
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm mb-1 group-hover:text-accent">Dry Film Thickness</h3>
                <p className="text-muted-foreground text-xs">Measurement and control fundamentals</p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/resources/knowledge/paint-technology-guide" className="group">
            <Card className="border-border bg-card h-full transition-colors group-hover:border-accent/40">
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm mb-1 group-hover:text-accent">Paint Technology Guide</h3>
                <p className="text-muted-foreground text-xs">Electrostatic vs HVLP vs conventional</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      <ExploreLinks currentPath="/resources/knowledge/paint-defects-guide" />
    </ResourcePageLayout>
  );
}