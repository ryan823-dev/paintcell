import { useI18n } from "@/i18n";
import { QuoteWizard } from "@/components/quote/QuoteWizard";

export default function Quote() {
  const { t } = useI18n();

  return (
    <div className="bg-background min-h-screen">
      <div className="section-dark border-b border-white/10">
        <div className="container-wide pt-10 md:pt-14 pb-8">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent mb-3">
              {t.quote?.badge || "Pre-Engineering Assessment"}
            </p>
            <h1 className="text-2xl md:text-3xl font-bold mb-3 text-white">
              {t.quote?.title || "Paint Cell Project Assessment"}
            </h1>
            <p className="text-white/70 text-sm">
              {t.quote?.subtitle || ""}
            </p>
          </div>
        </div>
      </div>
      <div className="container-wide pb-16">
        <QuoteWizard />
      </div>
    </div>
  );
}