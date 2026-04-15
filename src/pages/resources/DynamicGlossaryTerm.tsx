import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ResourcePageLayout } from "@/components/resources";
import NotFound from "@/pages/NotFound";
import { useCanonicalUrl } from "@/hooks/useRouteLocale";

interface GlossaryTermData {
  id: string;
  title: string;
  slug: string;
  body: string | null;
  summary: string | null;
  answer_box: string | null;
  meta_title: string | null;
  meta_description: string | null;
}

/**
 * Dynamic glossary term page – renders glossary entries from database.
 * Falls back to static pages if no database entry found.
 * Route: /:lang/resources/glossary/:slug
 */
export default function DynamicGlossaryTerm() {
  const { slug } = useParams<{ slug: string }>();
  const pagePath = slug ? `/resources/glossary/${slug}` : "/resources/glossary";
  const canonicalUrl = useCanonicalUrl(pagePath);
  const glossarySetUrl = useCanonicalUrl("/resources/glossary");

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

  const title = term.title;
  const body = term.body || "";
  const metaTitle = term.meta_title || `${title} | Paint Cell Glossary`;
  const metaDescription = term.meta_description || term.summary || "";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": title,
    "description": metaDescription,
    "url": canonicalUrl,
    "inDefinedTermSet": {
      "@type": "DefinedTermSet",
      "name": "Paint Cell Glossary",
      "url": glossarySetUrl
    },
    "inLanguage": "en",
  };

  return (
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
      canonicalPath={pagePath}
    >
      {term.answer_box && (
        <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <p className="text-foreground font-medium">{term.answer_box}</p>
        </div>
      )}

      <article className="prose prose-slate max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary">
        <ReactMarkdown>{body}</ReactMarkdown>
      </article>
    </ResourcePageLayout>
  );
}
