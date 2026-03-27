import { useState, useEffect } from "react";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { ResourcePageLayout } from "@/components/resources";
import { ContentSection } from "@/components/resources";
import { ArrowRight, BookOpen, Loader2 } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { supabase } from "@/integrations/supabase/client";

interface GlossaryTerm {
  title: string;
  title_zh: string | null;
  slug: string;
}

// Static glossary terms (existing hardcoded entries)
const staticGlossaryTerms: GlossaryTerm[] = [
  { term: "ATEX Certification", slug: "atex-certification", title: "ATEX Certification", title_zh: null },
  { term: "Atomization", slug: "atomization", title: "Atomization", title_zh: null },
  { term: "Booth Airflow", slug: "booth-airflow", title: "Booth Airflow", title_zh: null },
  { term: "Color Changeover", slug: "color-changeover", title: "Color Changeover", title_zh: null },
  { term: "Cure Time", slug: "cure-time", title: "Cure Time", title_zh: null },
  { term: "Dry Film Thickness (DFT)", slug: "dry-film-thickness", title: "Dry Film Thickness (DFT)", title_zh: null },
  { term: "Electrostatic Spraying", slug: "electrostatic-spraying", title: "Electrostatic Spraying", title_zh: null },
  { term: "Film Build", slug: "film-build", title: "Film Build", title_zh: null },
  { term: "Flash-off Time", slug: "flash-off-time", title: "Flash-off Time", title_zh: null },
  { term: "Gun Distance", slug: "gun-distance", title: "Gun Distance", title_zh: null },
  { term: "Hollow Wrist Robot", slug: "hollow-wrist", title: "Hollow Wrist Robot", title_zh: null },
  { term: "HVLP (High Volume Low Pressure)", slug: "hvlp", title: "HVLP (High Volume Low Pressure)", title_zh: null },
  { term: "Orange Peel", slug: "orange-peel", title: "Orange Peel", title_zh: null },
  { term: "Overspray", slug: "overspray", title: "Overspray", title_zh: null },
  { term: "Paint Recipe", slug: "paint-recipe", title: "Paint Recipe", title_zh: null },
  { term: "Spray Pattern", slug: "spray-pattern", title: "Spray Pattern", title_zh: null },
  { term: "Takt Time", slug: "takt-time", title: "Takt Time", title_zh: null },
  { term: "Teach Pendant", slug: "teach-pendant", title: "Teach Pendant", title_zh: null },
  { term: "Transfer Efficiency", slug: "transfer-efficiency", title: "Transfer Efficiency", title_zh: null },
  { term: "2K Paint", slug: "2k-paint", title: "2K Paint", title_zh: null },
];

export default function Glossary() {
  const { t, locale } = useI18n();
  const isZh = locale === "zh-CN";
  const res = t.resources?.glossary || {};
  const breadcrumbs = t.resources?.breadcrumbs || {};
  const sections = t.resources?.sections || {};

  const [dynamicTerms, setDynamicTerms] = useState<GlossaryTerm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      const { data, error } = await supabase
        .from("resources_posts")
        .select("title, title_zh, slug")
        .eq("category", "glossary")
        .eq("status", "published")
        .order("title", { ascending: true });

      if (!error && data) {
        setDynamicTerms(data as GlossaryTerm[]);
      }
      setLoading(false);
    };

    fetchTerms();
  }, []);

  // Merge static and dynamic terms, removing duplicates by slug
  const allTerms = [...dynamicTerms];
  staticGlossaryTerms.forEach((staticTerm) => {
    if (!allTerms.find((t) => t.slug === staticTerm.slug)) {
      allTerms.push(staticTerm);
    }
  });

  // Sort alphabetically by title
  allTerms.sort((a, b) => a.title.localeCompare(b.title));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": res.metaTitle || "Glossary | Paint Cell Terms",
    "description": res.metaDesc || "Short definitions for common paint cell engineering terms and why they matter.",
    "inLanguage": locale,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": breadcrumbs.home || "Home", "item": "/" },
        { "@type": "ListItem", "position": 2, "name": breadcrumbs.resources || "Resources", "item": "/resources" },
        { "@type": "ListItem", "position": 3, "name": breadcrumbs.glossary || "Glossary" }
      ]
    }
  };

  return (
    <ResourcePageLayout
      title={res.title || "Glossary"}
      metaTitle={res.metaTitle || "Glossary | Paint Cell Terms"}
      metaDescription={res.metaDesc || "Short definitions for common paint cell engineering terms and why they matter."}
      breadcrumbs={[
        { label: breadcrumbs.resources || "Resources", href: "/resources/engineering-library" },
        { label: breadcrumbs.glossary || "Glossary" },
      ]}
      structuredData={structuredData}
    >
      <p className="text-lg text-muted-foreground mb-10">
        {res.description || "Short, engineering-oriented definitions for common paint cell terms. Each term includes why it matters and what to watch for during feasibility assessment."}
      </p>

      <ContentSection title={sections.terms || "Terms"}>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {allTerms.map((item) => (
              <Link
                key={item.slug}
                to={`/resources/glossary/${item.slug}`}
                className="group flex items-center gap-3 p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-all"
              >
                <BookOpen className="h-5 w-5 text-primary shrink-0" />
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {(isZh && item.title_zh) ? item.title_zh : item.title}
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto group-hover:text-primary transition-colors" />
              </Link>
            ))}
          </div>
        )}
      </ContentSection>
    </ResourcePageLayout>
  );
}