import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { AnswerBox, ResourcePageLayout } from "@/components/resources";
import NotFound from "@/pages/NotFound";
import { useCanonicalUrl } from "@/hooks/useRouteLocale";
import { getDynamicArticleOverride } from "@/data/dynamicArticleSeo";
import { readPreloadedJson, serializeJsonForScript } from "@/lib/preloadedPageData";
import { toDateOnly } from "@/data/pageMetadata";

const PRELOADED_ARTICLE_DATA_ID = "dynamic-article-data";

interface ArticleData {
  id: string;
  title: string;
  slug: string;
  body: string | null;
  summary: string | null;
  answer_box: string | null;
  meta_title: string | null;
  meta_description: string | null;
  category: string | null;
  subcategory: string | null;
  featured_image_url: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

function getPreloadedArticle(slug?: string) {
  if (!slug) {
    return null;
  }

  const article = readPreloadedJson<ArticleData>(PRELOADED_ARTICLE_DATA_ID);
  return article?.slug === slug ? article : null;
}

function stripLeadingHeading(markdown: string) {
  const normalized = markdown.trimStart();

  if (!normalized.startsWith("# ")) {
    return markdown;
  }

  const lines = normalized.split(/\r?\n/);
  return lines.slice(1).join("\n").trimStart();
}

function getMarkdownLead(markdown: string) {
  const plainText = markdown
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`>#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!plainText) {
    return "";
  }

  return plainText.slice(0, 220).trim();
}

/**
 * Dynamic article page - renders published resources_posts entries by slug.
 * Route: /:lang/resources/articles/:slug
 */
export default function DynamicArticle() {
  const { slug } = useParams<{ slug: string }>();
  const pagePath = slug ? `/resources/articles/${slug}` : "/resources/articles";
  const canonicalUrl = useCanonicalUrl(pagePath);
  const preloadedArticle = useMemo(() => getPreloadedArticle(slug), [slug]);

  const [article, setArticle] = useState<ArticleData | null>(preloadedArticle);
  const [loading, setLoading] = useState(() => Boolean(slug) && !preloadedArticle);
  const [notFound, setNotFound] = useState(() => !slug);

  useEffect(() => {
    if (!slug) {
      setArticle(null);
      setNotFound(true);
      setLoading(false);
      return;
    }

    if (preloadedArticle) {
      setArticle(preloadedArticle);
      setNotFound(false);
      setLoading(false);
      return;
    }

    let isActive = true;

    const fetchArticle = async () => {
      setArticle(null);
      setNotFound(false);
      setLoading(true);

      const { data, error } = await supabase
        .from("resources_posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();

      if (!isActive) {
        return;
      }

      if (error || !data) {
        setNotFound(true);
        setArticle(null);
      } else {
        setArticle(data as ArticleData);
      }

      setLoading(false);
    };

    void fetchArticle();

    return () => {
      isActive = false;
    };
  }, [preloadedArticle, slug]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (notFound || !article) {
    return <NotFound />;
  }

  const override = getDynamicArticleOverride(slug);
  const title = override?.title || article.title;
  const body = stripLeadingHeading(article.body || "");
  const leadAnswer = article.answer_box || article.summary || getMarkdownLead(body);
  const metaTitle = override?.metaTitle || article.meta_title || title;
  const metaDescription =
    article.meta_description || article.summary || article.answer_box || getMarkdownLead(body) || title;
  const datePublished = toDateOnly(article.published_at || article.created_at) || undefined;
  const dateModified = toDateOnly(article.updated_at || article.published_at || article.created_at) || undefined;

  const categoryLabel: Record<string, string> = {
    "engineering-library": "Engineering Library",
    "standards-compliance": "Standards & Compliance",
    glossary: "Glossary",
    "tools-templates": "Tools & Templates",
    "learning-center": "Engineering Library",
  };

  const categoryHref: Record<string, string> = {
    "engineering-library": "/resources/engineering-library",
    "standards-compliance": "/resources/standards-compliance",
    glossary: "/resources/glossary",
    "tools-templates": "/resources/tools-templates",
    "learning-center": "/resources/engineering-library",
  };

  const resolvedCategory = article.category || "engineering-library";
  const catLabel = categoryLabel[resolvedCategory] || "Engineering Library";
  const catHref = categoryHref[resolvedCategory] || "/resources/engineering-library";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: metaTitle,
    description: metaDescription,
    url: canonicalUrl,
    author: { "@type": "Organization", name: "TD Engineering Team" },
    publisher: { "@type": "Organization", name: "TD Painting Systems" },
    articleSection: catLabel,
    inLanguage: "en",
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(article.featured_image_url ? { image: article.featured_image_url } : {}),
  };

  return (
    <ResourcePageLayout
      title={title}
      metaTitle={metaTitle}
      metaDescription={metaDescription}
      breadcrumbs={[
        { label: "Resources", href: "/resources" },
        { label: catLabel, href: catHref },
        { label: title },
      ]}
      structuredData={structuredData}
      canonicalPath={pagePath}
    >
      <script
        id={PRELOADED_ARTICLE_DATA_ID}
        type="application/json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: serializeJsonForScript(article) }}
      />

      {leadAnswer ? <AnswerBox>{leadAnswer}</AnswerBox> : null}

      {article.summary && article.summary !== leadAnswer ? (
        <p className="mb-8 text-lg leading-relaxed text-muted-foreground">{article.summary}</p>
      ) : null}

      {override?.primaryLink ? (
        <div className="not-prose mb-8 rounded-xl border border-accent/20 bg-accent/5 p-5 text-sm text-muted-foreground">
          <p>
            {override.primaryLink.intro}{" "}
            <Link to={override.primaryLink.href} className="font-medium text-primary underline underline-offset-4">
              {override.primaryLink.label}
            </Link>
            .
          </p>
        </div>
      ) : null}

      {article.featured_image_url ? (
        <div className="mb-8 overflow-hidden rounded-lg">
          <img
            src={article.featured_image_url}
            alt={title}
            className="max-h-[400px] h-auto w-full object-cover"
          />
        </div>
      ) : null}

      <article className="prose prose-slate max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary">
        <ReactMarkdown>{body}</ReactMarkdown>
      </article>
    </ResourcePageLayout>
  );
}
