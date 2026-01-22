import { Section } from "@/components/ui/section";
import { QuoteWizard } from "@/components/quote/QuoteWizard";

export default function Quote() {
  return (
    <>
      {/* Header */}
      <section className="hero-gradient relative">
        <div className="absolute inset-0 industrial-pattern opacity-30" />
        <div className="container-wide relative py-12 md:py-16">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Configure Your Workstation
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Answer a few questions about your coating requirements. 
              Our engineering team will use this information to prepare a tailored proposal.
            </p>
          </div>
        </div>
      </section>

      {/* Wizard */}
      <Section variant="default" className="py-8 md:py-12">
        <QuoteWizard />
      </Section>
    </>
  );
}
