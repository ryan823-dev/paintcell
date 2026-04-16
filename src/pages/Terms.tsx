import { ResourcePageLayout } from "@/components/resources";
import { useI18n } from "@/i18n/context";
import { companyProfile } from "@/lib/siteTrust";

export default function Terms() {
  const { t } = useI18n();
  const page = t.legalPages?.terms || {};
  const lastUpdated = companyProfile.legalLastUpdated;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": page.title || "Terms of Use",
    "description": page.metaDesc || "Terms of Use for TDPaintCell website and services.",
    "inLanguage": "en",
    "publisher": {
      "@type": "Organization",
      "name": companyProfile.legalName,
      "email": companyProfile.primaryEmail,
    },
  };

  return (
    <ResourcePageLayout
      title={page.title || "Terms of Use"}
      metaTitle={`${page.title || "Terms of Use"} | ${companyProfile.productName}`}
      metaDescription={page.metaDesc || "Terms of Use for TDPaintCell website and services."}
      breadcrumbs={[
        { label: page.title || "Terms of Use" },
      ]}
      structuredData={structuredData}
      canonicalPath="/terms"
      showCTA={false}
    >
      <p className="text-muted-foreground mb-3">{page.lastUpdated || "Last updated"}: {lastUpdated}</p>
      <p className="text-muted-foreground mb-8">
        These terms govern public website use and inquiry submissions handled by {companyProfile.legalName},
        operating publicly as {companyProfile.brandName}.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">{page.acceptance?.title || "Acceptance of terms"}</h2>
      <p className="text-muted-foreground">{page.acceptance?.content || ""}</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">{page.purpose?.title || "Site purpose"}</h2>
      <p className="text-muted-foreground">{page.purpose?.content || ""}</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">{page.noPricing?.title || "No instant pricing"}</h2>
      <p className="text-muted-foreground">{page.noPricing?.content || ""}</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">{page.ip?.title || "Intellectual property"}</h2>
      <p className="text-muted-foreground">{page.ip?.content || ""}</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">{page.submissions?.title || "User submissions"}</h2>
      <p className="text-muted-foreground">{page.submissions?.content || ""}</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">{page.thirdParty?.title || "Third-party links"}</h2>
      <p className="text-muted-foreground">{page.thirdParty?.content || ""}</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">{page.disclaimers?.title || "Disclaimers"}</h2>
      <p className="text-muted-foreground">{page.disclaimers?.content || ""}</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">{page.liability?.title || "Limitation of liability"}</h2>
      <p className="text-muted-foreground">{page.liability?.content || ""}</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">{page.indemnity?.title || "Indemnity"}</h2>
      <p className="text-muted-foreground">{page.indemnity?.content || ""}</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">{page.governing?.title || "Governing law"}</h2>
      <p className="text-muted-foreground">{page.governing?.content || ""}</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">{page.changes?.title || "Changes"}</h2>
      <p className="text-muted-foreground">{page.changes?.content || ""}</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">{page.contact?.title || "Contact"}</h2>
      <p className="text-muted-foreground">
        {page.contact?.content || "Questions about these Terms:"} <a href={`mailto:${companyProfile.primaryEmail}`} className="text-primary hover:underline">{companyProfile.primaryEmail}</a>.
      </p>
    </ResourcePageLayout>
  );
}
