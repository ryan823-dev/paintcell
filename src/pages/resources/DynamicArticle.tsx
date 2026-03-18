import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import ReactMarkdown from "react-markdown";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ResourcePageLayout } from "@/components/resources";
import { useI18n } from "@/i18n/context";
import NotFound from "@/pages/NotFound";

interface ArticleData {
  id: string;
  title: string;
  title_zh: string | null;
  slug: string;
  body: string | null;
  body_zh: string | null;
  summary: string | null;
  summary_zh: string | null;
  meta_title: string | null;
  meta_title_zh: string | null;
  meta_description: string | null;
  meta_description_zh: string | null;
  category: string | null;
  featured_image_url: string | null;
  published_at: string | null;
  created_at: string;
}

/**
 * Dynamic article page – renders resources_posts by slug.
 * Used for content pushed from Vertax CMS pipeline.
 * Route: /:lang/resources/articles/:slug
 */
export default function DynamicArticle() {
  const { slug } = useParams<{ slug: string }>();
  const { locale } = useI18n();
  const isZh = locale === "zh-CN";

  const [article, setArticle] = useState<ArticleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    const fetchArticle = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("resources_posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();

      if (error || !data) {
        setNotFound(true);
      } else {
        setArticle(data as ArticleData);
      }
      setLoading(false);
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (notFound || !article) {
    return <NotFound />;
  }

  // Pick localized fields
  const title = (isZh && article.title_zh) ? article.title_zh : article.title;
  const body = (isZh && article.body_zh) ? article.body_zh : (article.body || "");
  const metaTitle = (isZh && article.meta_title_zh) ? article.meta_title_zh : (article.meta_title || title);
  const metaDescription = (isZh && article.meta_description_zh)
    ? article.meta_description_zh
    : (article.meta_description || article.summary || "");

  const categoryLabel: Record<string, string> = {
    "engineering-library": "Engineering Library",
    "standards-compliance": "Standards & Compliance",
    "glossary": "Glossary",
    "tools-templates": "Tools & Templates",
    // Legacy mappings
    "learning-center": "Engineering Library",
  };
  
  const categoryHref: Record<string, string> = {
    "engineering-library": "/resources/engineering-library",
    "standards-compliance": "/resources/standards-compliance",
    "glossary": "/resources/glossary",
    "tools-templates": "/resources/tools-templates",
    // Legacy mappings
    "learning-center": "/resources/engineering-library",
  };
  
  const catLabel = categoryLabel[article.category || "engineering-library"] || "Engineering Library";
  const catHref = categoryHref[article.category || "engineering-library"] || "/resources/engineering-library";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": metaTitle,
    "description": metaDescription,
    "author": { "@type": "Organization", "name": "TD Painting Systems" },
    "publisher": { "@type": "Organization", "name": "TD Painting Systems" },
    "datePublished": article.published_at || article.created_at,
    "inLanguage": locale,
    ...(article.featured_image_url ? { "image": article.featured_image_url } : {}),
  };

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={`https://www.tdpaint.com/${locale}/resources/articles/${article.slug}`} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <ResourcePageLayout
        title={title}
        metaTitle={metaTitle}
        metaDescription={metaDescription}
        breadcrumbs={[
          { label: "Resources", href: "/resources/engineering-library" },
          { label: catLabel, href: catHref },
          { label: title },
        ]}
        structuredData={structuredData}
      >
        {article.featured_image_url && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={article.featured_image_url}
              alt={title}
              className="w-full h-auto object-cover max-h-[400px]"
            />
          </div>
        )}

        <article className="prose prose-slate max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary">
          <ReactMarkdown>{body}</ReactMarkdown>
        </article>
      </ResourcePageLayout>
    </>
  );
}
