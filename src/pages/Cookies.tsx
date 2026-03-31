import { ResourcePageLayout } from "@/components/resources";
import { useI18n } from "@/i18n/context";

export default function Cookies() {
  const { t } = useI18n();
  const page = t.legalPages?.cookies || {};

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": page.title || "Cookie Policy",
    "description": page.metaDesc || "Cookie Policy for TDPaintCell - how we use cookies and similar technologies.",
    "inLanguage": "en",
  };

  return (
    <ResourcePageLayout
      title={page.title || "Cookie Policy"}
      metaTitle={`${page.title || "Cookie Policy"} | TDPaintCell`}
      metaDescription={page.metaDesc || "Cookie Policy for TDPaintCell - how we use cookies and similar technologies."}
      breadcrumbs={[
        { label: page.title || "Cookie Policy" },
      ]}
      structuredData={structuredData}
      canonicalPath="/cookies"
      showCTA={false}
    >
      <p className="text-muted-foreground mb-8">{page.lastUpdated || "Last updated"}: 2026-01-01</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">{page.what?.title || "What are cookies"}</h2>
      <p className="text-muted-foreground">{page.what?.content || ""}</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">{page.howUse?.title || "How we use cookies"}</h2>
      <p className="text-muted-foreground">{page.howUse?.intro || "We may use cookies and similar technologies to:"}</p>
      <ul className="list-disc pl-6 text-muted-foreground space-y-1">
        {(page.howUse?.items || []).map((item: string, i: number) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">{page.types?.title || "Types of cookies"}</h2>
      <ul className="list-disc pl-6 text-muted-foreground space-y-1">
        {(page.types?.items || []).map((item: { name: string; desc: string }, i: number) => (
          <li key={i}><strong className="text-foreground">{item.name}</strong> {item.desc}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">{page.managing?.title || "Managing cookies"}</h2>
      <p className="text-muted-foreground">{page.managing?.content || ""}</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">{page.updates?.title || "Updates"}</h2>
      <p className="text-muted-foreground">{page.updates?.content || ""}</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">{page.contact?.title || "Contact"}</h2>
      <p className="text-muted-foreground">
        {page.contact?.content || "For questions:"} <a href="mailto:engineering@tdpaint.com" className="text-primary hover:underline">engineering@tdpaint.com</a>.
      </p>
    </ResourcePageLayout>
  );
}