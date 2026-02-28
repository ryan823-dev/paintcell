import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronRight, Cog, Layers, Wind, Gauge, Shield, Zap, RefreshCw, Settings } from "lucide-react";
import heroPaintCells from "@/assets/hero-paint-cells.jpg";
import { useI18n } from "@/i18n";

const cellFaqs = [
  { q: "What is a robotic paint cell and how does it differ from a paint booth?", a: "A robotic paint cell is a fully integrated workstation that combines an industrial robot, spray equipment, ventilation, and process controls in a single engineered package. Unlike a standalone paint booth that only provides an enclosed spray environment, a paint cell delivers a complete turnkey automation solution ready for production." },
  { q: "What automation level is right for my production volume?", a: "Semi-automatic cells suit low-to-medium volumes where operators load parts manually and the robot handles spraying. Fully automatic cells are ideal for high-volume, continuous production with conveyor integration and automatic part handling. Phased automation lets you start semi-automatic and upgrade incrementally as demand grows." },
  { q: "How long does it take to install and commission a paint cell?", a: "Typical installation takes 4–8 weeks depending on cell complexity, site preparation, and integration requirements. This includes mechanical setup, robot programming, spray parameter tuning, safety validation, and operator training. Modular pre-engineered cells can reduce this timeline significantly." },
  { q: "What maintenance does a robotic paint cell require?", a: "Routine maintenance includes daily tip cleaning, weekly filter inspections, monthly robot calibration checks, and quarterly full-system audits. Paint supply lines, pumps, and regulators need periodic service. Most facilities schedule a comprehensive preventive maintenance session every 6–12 months to maintain peak performance." },
];


export default function PaintCells() {
  const { t } = useI18n();
  const p = t.paintCells || {};

  const systemComponents = [
    { icon: Cog, title: p.industrialRobot || "Industrial Robot", description: p.industrialRobotDesc || "", specs: [p.robotSpec1 || "", p.robotSpec2 || "", p.robotSpec3 || "", p.robotSpec4 || ""] },
    { icon: Layers, title: p.sprayEquipment || "Spray Equipment", description: p.sprayEquipmentDesc || "", specs: [p.spraySpec1 || "", p.spraySpec2 || "", p.spraySpec3 || "", p.spraySpec4 || ""] },
    { icon: Wind, title: p.paintBooth || "Paint Booth & Ventilation", description: p.paintBoothDesc || "", specs: [p.boothSpec1 || "", p.boothSpec2 || "", p.boothSpec3 || "", p.boothSpec4 || ""] },
    { icon: Gauge, title: p.processControls || "Process Controls", description: p.processControlsDesc || "", specs: [p.controlSpec1 || "", p.controlSpec2 || "", p.controlSpec3 || "", p.controlSpec4 || ""] },
  ];

  const automationLevels = [
    { level: p.semiAutomatic || "Semi-Automatic", description: p.semiAutomaticDesc || "", features: [p.semiFeature1 || "", p.semiFeature2 || "", p.semiFeature3 || ""] },
    { level: p.fullyAutomatic || "Fully Automatic", description: p.fullyAutomaticDesc || "", features: [p.fullFeature1 || "", p.fullFeature2 || "", p.fullFeature3 || ""] },
    { level: p.phasedAutomation || "Phased Automation", description: p.phasedAutomationDesc || "", features: [p.phasedFeature1 || "", p.phasedFeature2 || "", p.phasedFeature3 || ""] },
  ];

  const keyFeatures = [
    { icon: Shield, title: p.safetyCompliance || "Safety & Compliance", description: p.safetyComplianceDesc || "" },
    { icon: Zap, title: p.rapidDeployment || "Rapid Deployment", description: p.rapidDeploymentDesc || "" },
    { icon: RefreshCw, title: p.flexibleConfig || "Flexible Configuration", description: p.flexibleConfigDesc || "" },
    { icon: Settings, title: p.serviceSupport || "Service & Support", description: p.serviceSupportDesc || "" },
  ];

  return (
    <>
      <section className="relative h-[300px] md:h-[400px] overflow-hidden">
        <motion.img src={heroPaintCells} alt="Complete robotic spray painting workstation cell" className="absolute inset-0 w-full h-full object-cover" initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.2, ease: "easeOut" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-foreground/50" />
        <div className="container-wide relative h-full flex items-center">
          <motion.div className="max-w-2xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <h1 className="text-3xl md:text-4xl font-bold text-inverse mb-4">{p.title || "Paint Cell Solutions"}</h1>
            <p className="text-lg text-inverse-muted">{p.subtitle || ""}</p>
          </motion.div>
        </div>
      </section>

      <Section variant="default">
        <FadeIn><SectionHeader title={p.systemArchitecture || "System Architecture"} description={p.systemArchitectureDesc || ""} /></FadeIn>
        <StaggerContainer className="grid md:grid-cols-2 gap-6">
          {systemComponents.map((component) => (
            <StaggerItem key={component.title}>
              <motion.div className="bg-card rounded-xl border border-border p-6 h-full" whileHover={{ y: -3, transition: { duration: 0.2 } }}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0"><component.icon className="h-6 w-6 text-accent" /></div>
                  <div><h3 className="text-lg font-semibold">{component.title}</h3><p className="text-sm text-muted-foreground mt-1">{component.description}</p></div>
                </div>
                <ul className="space-y-2 pl-16">
                  {component.specs.map((spec, i) => (<li key={i} className="flex items-start gap-2 text-sm text-muted-foreground"><span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />{spec}</li>))}
                </ul>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      <Section variant="muted">
        <FadeIn><SectionHeader title={p.automationLevels || "Automation Levels"} description={p.automationLevelsDesc || ""} /></FadeIn>
        <StaggerContainer className="grid md:grid-cols-3 gap-6">
          {automationLevels.map((level) => (
            <StaggerItem key={level.level}>
              <motion.div className="bg-card rounded-xl border border-border p-6 h-full" whileHover={{ y: -3, transition: { duration: 0.2 } }}>
                <h3 className="text-lg font-semibold mb-2">{level.level}</h3>
                <p className="text-sm text-muted-foreground mb-4">{level.description}</p>
                <ul className="space-y-2">
                  {level.features.map((feature, i) => (<li key={i} className="flex items-center gap-2 text-sm text-muted-foreground"><span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />{feature}</li>))}
                </ul>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      <Section variant="default">
        <FadeIn><SectionHeader title={p.whyPaintCell || "Why PaintCell?"} description={p.whyPaintCellDesc || ""} /></FadeIn>
        <StaggerContainer className="grid md:grid-cols-2 gap-6">
          {keyFeatures.map((feature) => (
            <StaggerItem key={feature.title}>
              <motion.div className="flex gap-4" whileHover={{ x: 5, transition: { duration: 0.2 } }}>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0"><feature.icon className="h-6 w-6 text-accent" /></div>
                <div><h3 className="font-semibold mb-1">{feature.title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p></div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      <Section variant="default">
        <FadeIn>
          <SectionHeader title="Frequently Asked Questions" description="Common questions about robotic paint cell solutions and configurations." />
        </FadeIn>
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: cellFaqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            })}
          </script>
        </Helmet>
        <Accordion type="multiple" defaultValue={cellFaqs.map((_, i) => `faq-${i}`)} className="space-y-2 max-w-3xl mx-auto">
          {cellFaqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-4">
              <AccordionTrigger className="text-left font-medium">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      <section className="section-dark border-t border-white/10">
        <div className="container-wide py-16 md:py-24">
          <FadeIn className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">{p.readyConfigure || "Ready to Configure Your Solution?"}</h2>
            <p className="text-white/60 mb-6">{p.readyConfigureDesc || ""}</p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold transition-transform hover:scale-105">
              <Link to="/quote" className="flex items-center gap-2">
                {p.startAssessment || "Start Assessment"}
                <ChevronRight className="h-5 w-5" />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}