import { ResourcePageLayout } from "@/components/resources";
import { useI18n } from "@/i18n/context";
import { companyProfile } from "@/lib/siteTrust";

export default function Cookies() {
  const { t } = useI18n();
  const page = t.legalPages?.cookies || {};
  const lastUpdated = companyProfile.legalLastUpdated;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": page.title || "Cookie Policy",
    "description": page.metaDesc || "Cookie Policy for TDPaintCell - how we use cookies and similar technologies.",
    "inLanguage": "en",
    "publisher": {
      "@type": "Organization",
      "name": companyProfile.legalName,
      "email": companyProfile.primaryEmail,
    },
  };

  return (
    <ResourcePageLayout
      title={page.title || "Cookie Policy"}
      metaTitle={`${page.title || "Cookie Policy"} | ${companyProfile.productName}`}
      metaDescription={page.metaDesc || "Cookie Policy for TDPaintCell - how we use cookies and similar technologies."}
      breadcrumbs={[
        { label: page.title || "Cookie Policy" },
      ]}
      structuredData={structuredData}
      canonicalPath="/cookies"
      showCTA={false}
    >
      <p className="text-muted-foreground mb-3">{page.lastUpdated || "Last updated"}: {lastUpdated}</p>
      <p className="text-muted-foreground mb-8">
        This cookie notice applies to site functionality operated by {companyProfile.legalName},
        publicly presented as {companyProfile.brandName}.
      </p>

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
        {page.contact?.content || "For questions:"} <a href={`mailto:${companyProfile.primaryEmail}`} className="text-primary hover:underline">{companyProfile.primaryEmail}</a>.
      </p>
    </ResourcePageLayout>
  );
}
