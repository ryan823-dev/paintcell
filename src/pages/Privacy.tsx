import { ResourcePageLayout } from "@/components/resources";
import { useI18n } from "@/i18n/context";

export default function Privacy() {
  const { t } = useI18n();
  const page = t.legalPages?.privacy || {};

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": page.title || "Privacy Policy",
    "description": page.metaDesc || "Privacy Policy for TDPaintCell - how we collect, use, and protect your personal information.",
    "inLanguage": "en",
  };

  return (
    <ResourcePageLayout
      title={page.title || "Privacy Policy"}
      metaTitle={`${page.title || "Privacy Policy"} | TDPaintCell`}
      metaDescription={page.metaDesc || "Privacy Policy for TDPaintCell - how we collect, use, and protect your personal information."}
      breadcrumbs={[
        { label: page.title || "Privacy Policy" },
      ]}
      structuredData={structuredData}
      canonicalPath="/privacy"
      showCTA={false}
    >
      <p className="text-muted-foreground mb-8">{page.lastUpdated || "Last updated"}: 2026-01-01</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">{page.overview?.title || "Overview"}</h2>
      <p className="text-muted-foreground">{page.overview?.content || ""}</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">{page.infoCollect?.title || "Information we collect"}</h2>
      <p className="text-muted-foreground">{page.infoCollect?.intro || "We may collect the following categories of information:"}</p>
      <ul className="list-disc pl-6 text-muted-foreground space-y-1">
        {(page.infoCollect?.items || []).map((item: string, i: number) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">{page.howUse?.title || "How we use information"}</h2>
      <p className="text-muted-foreground">{page.howUse?.intro || "We use information to:"}</p>
      <ul className="list-disc pl-6 text-muted-foreground space-y-1">
        {(page.howUse?.items || []).map((item: string, i: number) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">{page.legalBases?.title || "Legal bases (where applicable)"}</h2>
      <p className="text-muted-foreground">{page.legalBases?.content || ""}</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">{page.sharing?.title || "Sharing of information"}</h2>
      <p className="text-muted-foreground">{page.sharing?.intro || "We do not sell your personal information. We may share information only when necessary:"}</p>
      <ul className="list-disc pl-6 text-muted-foreground space-y-1">
        {(page.sharing?.items || []).map((item: string, i: number) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">{page.international?.title || "International transfers"}</h2>
      <p className="text-muted-foreground">{page.international?.content || ""}</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">{page.retention?.title || "Data retention"}</h2>
      <p className="text-muted-foreground">{page.retention?.content || ""}</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">{page.security?.title || "Security"}</h2>
      <p className="text-muted-foreground">{page.security?.content || ""}</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">{page.rights?.title || "Your rights"}</h2>
      <p className="text-muted-foreground">{page.rights?.content || ""}</p>
      <p className="text-muted-foreground">
        {page.rights?.contact || "To exercise rights, contact:"} <a href="mailto:engineering@tdpaint.com" className="text-primary hover:underline">engineering@tdpaint.com</a>.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">{page.children?.title || "Children's privacy"}</h2>
      <p className="text-muted-foreground">{page.children?.content || ""}</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">{page.changes?.title || "Changes to this policy"}</h2>
      <p className="text-muted-foreground">{page.changes?.content || ""}</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">{page.contact?.title || "Contact"}</h2>
      <p className="text-muted-foreground">
        {page.contact?.content || "For privacy requests and questions, contact:"} <a href="mailto:engineering@tdpaint.com" className="text-primary hover:underline">engineering@tdpaint.com</a>.
      </p>
    </ResourcePageLayout>
  );
}