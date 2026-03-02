import { Helmet } from "react-helmet-async";
import { useI18n } from "@/i18n/context";

export default function Privacy() {
  const { t } = useI18n();
  const page = t.legalPages?.privacy || {};

  return (
    <>
      <Helmet>
        <title>{page.title || "Privacy Policy"} | TDPaintCell</title>
        <meta name="description" content={page.metaDesc || "Privacy Policy for TDPaintCell - how we collect, use, and protect your personal information."} />
      </Helmet>
      
      <div className="container-wide py-16 md:py-24">
        <article className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
          <h1>{page.title || "Privacy Policy"}</h1>
          <p className="text-muted-foreground">{page.lastUpdated || "Last updated"}: 2026-01-01</p>

          <h2>{page.overview?.title || "Overview"}</h2>
          <p>{page.overview?.content || ""}</p>

          <h2>{page.infoCollect?.title || "Information we collect"}</h2>
          <p>{page.infoCollect?.intro || "We may collect the following categories of information:"}</p>
          <ul>
            {(page.infoCollect?.items || []).map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h2>{page.howUse?.title || "How we use information"}</h2>
          <p>{page.howUse?.intro || "We use information to:"}</p>
          <ul>
            {(page.howUse?.items || []).map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h2>{page.legalBases?.title || "Legal bases (where applicable)"}</h2>
          <p>{page.legalBases?.content || ""}</p>

          <h2>{page.sharing?.title || "Sharing of information"}</h2>
          <p>{page.sharing?.intro || "We do not sell your personal information. We may share information only when necessary:"}</p>
          <ul>
            {(page.sharing?.items || []).map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h2>{page.international?.title || "International transfers"}</h2>
          <p>{page.international?.content || ""}</p>

          <h2>{page.retention?.title || "Data retention"}</h2>
          <p>{page.retention?.content || ""}</p>

          <h2>{page.security?.title || "Security"}</h2>
          <p>{page.security?.content || ""}</p>

          <h2>{page.rights?.title || "Your rights"}</h2>
          <p>{page.rights?.content || ""}</p>
          <p>
            {page.rights?.contact || "To exercise rights, contact:"} <a href="mailto:engineering@tdpaintcell.com">engineering@tdpaintcell.com</a>.
          </p>

          <h2>{page.children?.title || "Children's privacy"}</h2>
          <p>{page.children?.content || ""}</p>

          <h2>{page.changes?.title || "Changes to this policy"}</h2>
          <p>{page.changes?.content || ""}</p>

          <h2>{page.contact?.title || "Contact"}</h2>
          <p>
            {page.contact?.content || "For privacy requests and questions, contact:"} <a href="mailto:engineering@tdpaintcell.com">engineering@tdpaintcell.com</a>.
          </p>
        </article>
      </div>
    </>
  );
}
