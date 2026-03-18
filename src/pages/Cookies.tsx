import { Helmet } from "react-helmet-async";
import { useI18n } from "@/i18n/context";

export default function Cookies() {
  const { t } = useI18n();
  const page = t.legalPages?.cookies || {};

  return (
    <>
      <Helmet>
        <title>{page.title || "Cookie Policy"} | TDPaintCell</title>
        <meta name="description" content={page.metaDesc || "Cookie Policy for TDPaintCell - how we use cookies and similar technologies."} />
      </Helmet>
      
      <div className="container-wide py-16 md:py-24">
        <article className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
          <h1>{page.title || "Cookie Policy"}</h1>
          <p className="text-muted-foreground">{page.lastUpdated || "Last updated"}: 2026-01-01</p>

          <h2>{page.what?.title || "What are cookies"}</h2>
          <p>{page.what?.content || ""}</p>

          <h2>{page.howUse?.title || "How we use cookies"}</h2>
          <p>{page.howUse?.intro || "We may use cookies and similar technologies to:"}</p>
          <ul>
            {(page.howUse?.items || []).map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h2>{page.types?.title || "Types of cookies"}</h2>
          <ul>
            {(page.types?.items || []).map((item: { name: string; desc: string }, i: number) => (
              <li key={i}><strong>{item.name}</strong> {item.desc}</li>
            ))}
          </ul>

          <h2>{page.managing?.title || "Managing cookies"}</h2>
          <p>{page.managing?.content || ""}</p>

          <h2>{page.updates?.title || "Updates"}</h2>
          <p>{page.updates?.content || ""}</p>

          <h2>{page.contact?.title || "Contact"}</h2>
          <p>
            {page.contact?.content || "For questions:"} <a href="mailto:engineering@tdpaint.com">engineering@tdpaint.com</a>.
          </p>
        </article>
      </div>
    </>
  );
}
