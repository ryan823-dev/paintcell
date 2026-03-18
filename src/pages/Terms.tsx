import { Helmet } from "react-helmet-async";
import { useI18n } from "@/i18n/context";

export default function Terms() {
  const { t } = useI18n();
  const page = t.legalPages?.terms || {};

  return (
    <>
      <Helmet>
        <title>{page.title || "Terms of Use"} | TDPaintCell</title>
        <meta name="description" content={page.metaDesc || "Terms of Use for TDPaintCell website and services."} />
      </Helmet>
      
      <div className="container-wide py-16 md:py-24">
        <article className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
          <h1>{page.title || "Terms of Use"}</h1>
          <p className="text-muted-foreground">{page.lastUpdated || "Last updated"}: 2026-01-01</p>

          <h2>{page.acceptance?.title || "Acceptance of terms"}</h2>
          <p>{page.acceptance?.content || ""}</p>

          <h2>{page.purpose?.title || "Site purpose"}</h2>
          <p>{page.purpose?.content || ""}</p>

          <h2>{page.noPricing?.title || "No instant pricing"}</h2>
          <p>{page.noPricing?.content || ""}</p>

          <h2>{page.ip?.title || "Intellectual property"}</h2>
          <p>{page.ip?.content || ""}</p>

          <h2>{page.submissions?.title || "User submissions"}</h2>
          <p>{page.submissions?.content || ""}</p>

          <h2>{page.thirdParty?.title || "Third-party links"}</h2>
          <p>{page.thirdParty?.content || ""}</p>

          <h2>{page.disclaimers?.title || "Disclaimers"}</h2>
          <p>{page.disclaimers?.content || ""}</p>

          <h2>{page.liability?.title || "Limitation of liability"}</h2>
          <p>{page.liability?.content || ""}</p>

          <h2>{page.indemnity?.title || "Indemnity"}</h2>
          <p>{page.indemnity?.content || ""}</p>

          <h2>{page.governing?.title || "Governing law"}</h2>
          <p>{page.governing?.content || ""}</p>

          <h2>{page.changes?.title || "Changes"}</h2>
          <p>{page.changes?.content || ""}</p>

          <h2>{page.contact?.title || "Contact"}</h2>
          <p>
            {page.contact?.content || "Questions about these Terms:"} <a href="mailto:engineering@tdpaint.com">engineering@tdpaint.com</a>.
          </p>
        </article>
      </div>
    </>
  );
}
