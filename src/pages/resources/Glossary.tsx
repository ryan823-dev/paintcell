import { useState, useEffect } from "react";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { ResourcePageLayout } from "@/components/resources";
import { ContentSection } from "@/components/resources";
import { ArrowRight, BookOpen, Loader2 } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { supabase } from "@/integrations/supabase/client";

interface GlossaryTerm {
  title: string;
  slug: string;
}

// Static glossary terms (existing hardcoded entries)
const staticGlossaryTerms: GlossaryTerm[] = [
  { slug: "atex-certification", title: "ATEX Certification" },
  { slug: "atomization", title: "Atomization" },
  { slug: "booth-airflow", title: "Booth Airflow" },
  { slug: "color-changeover", title: "Color Changeover" },
  { slug: "cure-time", title: "Cure Time" },
  { slug: "dry-film-thickness", title: "Dry Film Thickness (DFT)" },
  { slug: "electrostatic-spraying", title: "Electrostatic Painting" },
  { slug: "film-build", title: "Film Build" },
  { slug: "flash-off-time", title: "Flash-off Time" },
  { slug: "gun-distance", title: "Gun Distance" },
  { slug: "hollow-wrist", title: "Hollow Wrist Robot" },
  { slug: "hvlp", title: "HVLP (High Volume Low Pressure)" },
  { slug: "orange-peel", title: "Orange Peel" },
  { slug: "overspray", title: "Overspray" },
  { slug: "paint-recipe", title: "Paint Recipe" },
  { slug: "spray-pattern", title: "Spray Pattern" },
  { slug: "takt-time", title: "Takt Time" },
  { slug: "teach-pendant", title: "Teach Pendant" },
  { slug: "transfer-efficiency", title: "Transfer Efficiency" },
  { slug: "2k-paint", title: "2K Paint" },
];

export default function Glossary() {
  const { t } = useI18n();
  const res = t.resources?.glossary || {};
  const breadcrumbs = t.resources?.breadcrumbs || {};
  const sections = t.resources?.sections || {};

  const [dynamicTerms, setDynamicTerms] = useState<GlossaryTerm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      const { data, error } = await supabase
        .from("resources_posts")
        .select("title, slug")
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
    "inLanguage": "en",
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
                  {item.title}
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
