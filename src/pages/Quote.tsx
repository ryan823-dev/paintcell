import { useI18n } from "@/i18n";
import { Helmet } from "react-helmet-async";
import { QuoteWizard } from "@/components/quote/QuoteWizard";

export default function Quote() {
  const { t } = useI18n();

  return (
    <div className="bg-background min-h-screen">
      <Helmet>
        <title>Paint Cell Project Assessment — Configure Your System | TD</title>
        <meta name="description" content="Start your robotic painting project assessment. Configure paint cell specifications including robot selection, spray technology, booth requirements, and production targets." />
        <link rel="canonical" href="https://tdpaint.com/quote" />
        <meta property="og:title" content="Paint Cell Project Assessment | TD" />
        <meta property="og:description" content="Configure your robotic painting system. Select robots, spray technology, and booth specifications for your production requirements." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tdpaint.com/quote" />
        <meta property="og:image" content="https://tdpaint.com/images/og-social-share.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Paint Cell Project Assessment | TD" />
        <meta name="twitter:description" content="Configure your robotic painting system specifications and get an engineering assessment." />
        <meta name="twitter:image" content="https://tdpaint.com/images/og-social-share.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": "https://tdpaint.com/quote#webpage",
          "name": "Paint Cell Project Assessment",
          "description": "Configure robotic painting system specifications and request an engineering assessment.",
          "url": "https://tdpaint.com/quote",
          "isPartOf": { "@id": "https://tdpaint.com/#website" },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tdpaint.com/" },
              { "@type": "ListItem", "position": 2, "name": "Project Assessment", "item": "https://tdpaint.com/quote" }
            ]
          }
        })}</script>
      </Helmet>
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