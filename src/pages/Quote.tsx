import { Helmet } from "react-helmet-async";
import { QuoteWizard } from "@/components/quote/QuoteWizard";
import { getQuoteContent } from "@/content/quote";
import { buildLocalizedUrl } from "@/lib/seo";
import { useRouteLocale } from "@/hooks/useRouteLocale";

export default function Quote() {
  const locale = useRouteLocale();
  const quote = getQuoteContent(locale);
  const quoteUrl = buildLocalizedUrl(locale, "/quote");
  const homeUrl = buildLocalizedUrl(locale, "/");

  return (
    <div className="bg-background min-h-screen">
      <Helmet>
        <title>{quote.page.metaTitle}</title>
        <meta name="description" content={quote.page.metaDescription} />
        <link rel="canonical" href={quoteUrl} />
        <meta property="og:title" content={quote.page.ogTitle} />
        <meta property="og:description" content={quote.page.ogDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={quoteUrl} />
        <meta property="og:image" content="https://tdpaint.com/images/og-social-share.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={quote.page.twitterTitle} />
        <meta name="twitter:description" content={quote.page.twitterDescription} />
        <meta name="twitter:image" content="https://tdpaint.com/images/og-social-share.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${quoteUrl}#webpage`,
          "name": quote.page.title,
          "description": quote.page.metaDescription,
          "url": quoteUrl,
          "isPartOf": { "@id": "https://tdpaint.com/#website" },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": quote.page.homeLabel, "item": homeUrl },
              { "@type": "ListItem", "position": 2, "name": quote.page.breadcrumbLabel, "item": quoteUrl },
            ],
          },
        })}</script>
      </Helmet>
      <div className="section-dark border-b border-white/10">
        <div className="container-wide pt-10 md:pt-14 pb-8">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent mb-3">
              {quote.page.badge}
            </p>
            <h1 className="text-2xl md:text-3xl font-bold mb-3 text-white">
              {quote.page.title}
            </h1>
            <p className="text-white/70 text-sm">
              {quote.page.subtitle}
            </p>
          </div>
        </div>
      </div>
      <div className="container-wide pb-16">
        <QuoteWizard content={quote.wizard} />
      </div>
    </div>
  );
}
