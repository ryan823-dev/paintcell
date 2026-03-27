import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import ReactMarkdown from "react-markdown";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ResourcePageLayout } from "@/components/resources";
import { useI18n } from "@/i18n/context";
import NotFound from "@/pages/NotFound";

interface GlossaryTermData {
  id: string;
  title: string;
  title_zh: string | null;
  slug: string;
  body: string | null;
  body_zh: string | null;
  summary: string | null;
  summary_zh: string | null;
  answer_box: string | null;
  answer_box_zh: string | null;
  meta_title: string | null;
  meta_title_zh: string | null;
  meta_description: string | null;
  meta_description_zh: string | null;
}

/**
 * Dynamic glossary term page – renders glossary entries from database.
 * Falls back to static pages if no database entry found.
 * Route: /:lang/resources/glossary/:slug
 */
export default function DynamicGlossaryTerm() {
  const { slug } = useParams<{ slug: string }>();
  const { locale } = useI18n();
  const isZh = locale === "zh-CN";

  const [term, setTerm] = useState<GlossaryTermData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    const fetchTerm = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("resources_posts")
        .select("*")
        .eq("slug", slug)
        .eq("category", "glossary")
        .eq("status", "published")
        .maybeSingle();

      if (error || !data) {
        setNotFound(true);
      } else {
        setTerm(data as GlossaryTermData);
      }
      setLoading(false);
    };

    fetchTerm();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (notFound || !term) {
    return <NotFound />;
  }

  // Pick localized fields
  const title = (isZh && term.title_zh) ? term.title_zh : term.title;
  const body = (isZh && term.body_zh) ? term.body_zh : (term.body || "");
  const metaTitle = (isZh && term.meta_title_zh) ? term.meta_title_zh : (term.meta_title || `${title} | Paint Cell Glossary`);
  const metaDescription = (isZh && term.meta_description_zh)
    ? term.meta_description_zh
    : (term.meta_description || term.summary || "");

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": title,
    "description": metaDescription,
    "inDefinedTermSet": {
      "@type": "DefinedTermSet",
      "name": "Paint Cell Glossary",
      "url": "https://www.tdpaint.com/resources/glossary"
    },
    "inLanguage": locale,
  };

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={`https://www.tdpaint.com/${locale}/resources/glossary/${term.slug}`} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <ResourcePageLayout
        title={title}
        metaTitle={metaTitle}
        metaDescription={metaDescription}
        breadcrumbs={[
          { label: "Resources", href: "/resources/engineering-library" },
          { label: "Glossary", href: "/resources/glossary" },
          { label: title },
        ]}
        structuredData={structuredData}
      >
        {term.answer_box && (
          <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <p className="text-foreground font-medium">
              {(isZh && term.answer_box_zh) ? term.answer_box_zh : term.answer_box}
            </p>
          </div>
        )}

        <article className="prose prose-slate max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary">
          <ReactMarkdown>{body}</ReactMarkdown>
        </article>
      </ResourcePageLayout>
    </>
  );
}