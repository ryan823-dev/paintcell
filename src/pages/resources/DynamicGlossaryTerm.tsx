import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AnswerBox, ResourcePageLayout } from "@/components/resources";
import NotFound from "@/pages/NotFound";
import { useCanonicalUrl } from "@/hooks/useRouteLocale";
import { readPreloadedJson, serializeJsonForScript } from "@/lib/preloadedPageData";
import { toDateOnly } from "@/data/pageMetadata";

const PRELOADED_GLOSSARY_DATA_ID = "dynamic-glossary-data";

interface GlossaryTermData {
  id: string;
  title: string;
  slug: string;
  body: string | null;
  summary: string | null;
  answer_box: string | null;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  published_at: string | null;
  updated_at: string;
}

function getPreloadedGlossaryTerm(slug?: string) {
  if (!slug) {
    return null;
  }

  const term = readPreloadedJson<GlossaryTermData>(PRELOADED_GLOSSARY_DATA_ID);
  return term?.slug === slug ? term : null;
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
  return markdown
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`>#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 180)
    .trim();
}

/**
 * Dynamic glossary term page - renders glossary entries from database.
 * Falls back to runtime fetch when the page was not prerendered with hydrated data.
 * Route: /:lang/resources/glossary/:slug
 */
export default function DynamicGlossaryTerm() {
  const { slug } = useParams<{ slug: string }>();
  const pagePath = slug ? `/resources/glossary/${slug}` : "/resources/glossary";
  const canonicalUrl = useCanonicalUrl(pagePath);
  const glossarySetUrl = useCanonicalUrl("/resources/glossary");
  const preloadedTerm = useMemo(() => getPreloadedGlossaryTerm(slug), [slug]);

  const [term, setTerm] = useState<GlossaryTermData | null>(preloadedTerm);
  const [loading, setLoading] = useState(() => Boolean(slug) && !preloadedTerm);
  const [notFound, setNotFound] = useState(() => !slug);

  useEffect(() => {
    if (!slug) {
      setTerm(null);
      setNotFound(true);
      setLoading(false);
      return;
    }

    if (preloadedTerm) {
      setTerm(preloadedTerm);
      setNotFound(false);
      setLoading(false);
      return;
    }

    let isActive = true;

    const fetchTerm = async () => {
      setTerm(null);
      setNotFound(false);
      setLoading(true);

      const { data, error } = await supabase
        .from("resources_posts")
        .select("*")
        .eq("slug", slug)
        .eq("category", "glossary")
        .eq("status", "published")
        .maybeSingle();

      if (!isActive) {
        return;
      }

      if (error || !data) {
        setNotFound(true);
        setTerm(null);
      } else {
        setTerm(data as GlossaryTermData);
      }

      setLoading(false);
    };

    void fetchTerm();

    return () => {
      isActive = false;
    };
  }, [preloadedTerm, slug]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (notFound || !term) {
    return <NotFound />;
  }

  const title = term.title;
  const body = stripLeadingHeading(term.body || "");
  const leadAnswer = term.answer_box || term.summary || getMarkdownLead(body);
  const metaTitle = term.meta_title || `${title} | Paint Cell Glossary`;
  const metaDescription = term.meta_description || term.summary || term.answer_box || getMarkdownLead(body) || title;
  const datePublished = toDateOnly(term.published_at || term.created_at) || undefined;
  const dateModified = toDateOnly(term.updated_at || term.published_at || term.created_at) || undefined;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: title,
    description: metaDescription,
    url: canonicalUrl,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Paint Cell Glossary",
      url: glossarySetUrl,
    },
    author: {
      "@type": "Organization",
      name: "TD Engineering Team",
    },
    inLanguage: "en",
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
  };

  return (
    <ResourcePageLayout
      title={title}
      metaTitle={metaTitle}
      metaDescription={metaDescription}
      breadcrumbs={[
        { label: "Resources", href: "/resources" },
        { label: "Glossary", href: "/resources/glossary" },
        { label: title },
      ]}
      structuredData={structuredData}
      canonicalPath={pagePath}
    >
      <script
        id={PRELOADED_GLOSSARY_DATA_ID}
        type="application/json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: serializeJsonForScript(term) }}
      />

      {leadAnswer ? <AnswerBox>{leadAnswer}</AnswerBox> : null}

      {term.summary && term.summary !== leadAnswer ? (
        <p className="mb-6 text-lg leading-relaxed text-muted-foreground">{term.summary}</p>
      ) : null}

      <article className="prose prose-slate max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary">
        <ReactMarkdown>{body}</ReactMarkdown>
      </article>
    </ResourcePageLayout>
  );
}
