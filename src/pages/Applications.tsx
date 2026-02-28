import { LocalizedLink as Link } from "@/components/LocalizedLink";
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
import { ChevronRight, Car, Cpu, Building2, Plane, Truck, Package } from "lucide-react";
import heroApplications from "@/assets/hero-applications.jpg";
import { useI18n } from "@/i18n";

const appFaqs = [
  { q: "What types of products can robotic painting systems handle?", a: "Robotic painting systems are versatile and can coat automotive components, electronics housings, aerospace parts, commercial vehicles, industrial equipment, and general manufactured goods. Multi-axis robots adjust spray patterns for complex geometries, curved surfaces, and varying part sizes." },
  { q: "How does robotic spray painting improve quality over manual methods?", a: "Robots deliver consistent film thickness, uniform coverage, and repeatable spray paths every cycle. This eliminates human variability, reduces defects such as runs, sags, and orange peel, and typically achieves first-pass yield rates above 95%." },
  { q: "Can one robotic paint cell handle multiple product types?", a: "Yes. Modern paint cells support quick-change fixtures, programmable spray recipes, and automatic color-change systems, allowing a single cell to process different part families with minimal changeover time—often under 5 minutes." },
  { q: "What ROI can manufacturers expect from robotic painting?", a: "Most installations achieve full payback within 18–36 months through reduced paint waste (transfer efficiency gains of 20–40%), lower rework rates, decreased labor costs, and higher throughput. Energy savings from optimized booth airflow add further long-term value." },
];


export default function Applications() {
  const { t } = useI18n();
  const a = t.applications || {};

  const applications = [
    {
      icon: Car, title: a.automotiveTitle || "Automotive Components", description: a.automotiveDesc || "",
      challenges: [a.automotiveChallenge1 || "", a.automotiveChallenge2 || "", a.automotiveChallenge3 || ""],
      whyRobotic: a.automotiveWhy || "",
    },
    {
      icon: Cpu, title: a.electronicsTitle || "Electronics & Appliances", description: a.electronicsDesc || "",
      challenges: [a.electronicsChallenge1 || "", a.electronicsChallenge2 || "", a.electronicsChallenge3 || ""],
      whyRobotic: a.electronicsWhy || "",
    },
    {
      icon: Building2, title: a.industrialTitle || "Industrial Equipment", description: a.industrialDesc || "",
      challenges: [a.industrialChallenge1 || "", a.industrialChallenge2 || "", a.industrialChallenge3 || ""],
      whyRobotic: a.industrialWhy || "",
    },
    {
      icon: Plane, title: a.aerospaceTitle || "Aerospace Components", description: a.aerospaceDesc || "",
      challenges: [a.aerospaceChallenge1 || "", a.aerospaceChallenge2 || "", a.aerospaceChallenge3 || ""],
      whyRobotic: a.aerospaceWhy || "",
    },
    {
      icon: Truck, title: a.commercialTitle || "Commercial Vehicles", description: a.commercialDesc || "",
      challenges: [a.commercialChallenge1 || "", a.commercialChallenge2 || "", a.commercialChallenge3 || ""],
      whyRobotic: a.commercialWhy || "",
    },
    {
      icon: Package, title: a.generalTitle || "General Manufacturing", description: a.generalDesc || "",
      challenges: [a.generalChallenge1 || "", a.generalChallenge2 || "", a.generalChallenge3 || ""],
      whyRobotic: a.generalWhy || "",
    },
  ];

  return (
    <>
      <section className="relative h-[300px] md:h-[400px] overflow-hidden">
        <motion.img src={heroApplications} alt="Industrial robotic spray painting applications" className="absolute inset-0 w-full h-full object-cover" initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.2, ease: "easeOut" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-foreground/50" />
        <div className="container-wide relative h-full flex items-center">
          <motion.div className="max-w-2xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <h1 className="text-3xl md:text-4xl font-bold text-inverse mb-4">{a.title || "Applications"}</h1>
            <p className="text-lg text-inverse-muted">{a.subtitle || ""}</p>
          </motion.div>
        </div>
      </section>

      <Section variant="default">
        <StaggerContainer className="space-y-8" staggerDelay={0.15}>
          {applications.map((app) => (
            <StaggerItem key={app.title}>
              <motion.div className="bg-card rounded-xl border border-border overflow-hidden" whileHover={{ y: -3, transition: { duration: 0.2 } }}>
                <div className="p-6 md:p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <app.icon className="h-7 w-7 text-accent" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{app.title}</h2>
                      <p className="text-muted-foreground">{app.description}</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">{a.typicalChallenges || "Typical Challenges"}</h3>
                      <ul className="space-y-2">
                        {app.challenges.map((challenge, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                            {challenge}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">{a.whyRoboticPainting || "Why Robotic Painting"}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{app.whyRobotic}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      <Section variant="default">
        <FadeIn>
          <SectionHeader title="Frequently Asked Questions" description="Common questions about robotic painting applications across industries." />
        </FadeIn>
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: appFaqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            })}
          </script>
        </Helmet>
        <Accordion type="multiple" defaultValue={appFaqs.map((_, i) => `faq-${i}`)} className="space-y-2 max-w-3xl mx-auto">
          {appFaqs.map((faq, i) => (
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
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">{a.specificApplication || "Have a Specific Application in Mind?"}</h2>
            <p className="text-white/60 mb-6">{a.specificApplicationDesc || ""}</p>
          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground transition-transform hover:scale-105">
            <Link to="/quote" className="flex items-center gap-2">
              {t.about?.configurePaintCell || "Configure Paint Cell"}
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </FadeIn>
        </div>
      </section>
    </>
  );
}