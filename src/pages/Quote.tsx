import { QuoteWizard } from "@/components/quote/QuoteWizard";

export default function Quote() {
  return (
    <div className="bg-primary min-h-screen">
      {/* Header */}
      <div className="container-wide pt-10 md:pt-14 pb-8">
        <div className="max-w-3xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent/70 mb-3">
            Pre-Engineering Assessment
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
            Paint Cell Project Assessment
          </h1>
          <p className="text-primary-foreground/50 text-sm">
            A structured feasibility and readiness check for robotic spray painting (not a pricing tool).
          </p>
        </div>
      </div>

      {/* Wizard */}
      <div className="container-wide pb-16">
        <QuoteWizard />
      </div>
    </div>
  );
}
