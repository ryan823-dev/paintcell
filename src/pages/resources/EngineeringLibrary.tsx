import { useState, useEffect } from "react";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { ResourcePageLayout } from "@/components/resources";
import { ContentSection } from "@/components/resources";
import { ArrowRight, BookOpen, FileText, HelpCircle } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { supabase } from "@/integrations/supabase/client";

interface DynamicPost {
  id: string;
  title: string;
  title_zh: string | null;
  slug: string;
  subcategory: string | null;
}

export default function EngineeringLibrary() {
  const { t, locale } = useI18n();
  const isZh = locale === "zh-CN";
  const res = t.resources?.engineeringLibrary || {};
  const breadcrumbs = t.resources?.breadcrumbs || {};
  const sections = t.resources?.sections || {};
  const cards = res.cards || {};

  const [insightsPosts, setInsightsPosts] = useState<DynamicPost[]>([]);
  const [guidesPosts, setGuidesPosts] = useState<DynamicPost[]>([]);
  const [faqsPosts, setFaqsPosts] = useState<DynamicPost[]>([]);

  useEffect(() => {
    // Fetch posts by subcategory
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("resources_posts")
        .select("id, title, title_zh, slug, subcategory")
        .eq("status", "published")
        .eq("category", "engineering-library")
        .order("published_at", { ascending: false });

      if (!error && data) {
        const posts = data as DynamicPost[];
        setInsightsPosts(posts.filter(p => p.subcategory === "insights"));
        setGuidesPosts(posts.filter(p => p.subcategory === "guides-checklists"));
        setFaqsPosts(posts.filter(p => p.subcategory === "faqs"));
      }
    };

    fetchPosts();
  }, []);

  const renderPostList = (posts: DynamicPost[]) => (
    <ul className="space-y-3">
      {posts.map((post) => (
        <li key={post.id}>
          <Link
            to={`/resources/articles/${post.slug}`}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            <ArrowRight className="h-4 w-4" />
            {(isZh && post.title_zh) ? post.title_zh : post.title}
          </Link>
        </li>
      ))}
    </ul>
  );

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": res.metaTitle || "Engineering Library | Paint Cell Engineering Notes",
    "description": res.metaDesc || "Engineering-first notes on feasibility, constraints, and readiness for robotic spray painting paint cells.",
    "inLanguage": locale,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": breadcrumbs.home || "Home", "item": "/" },
        { "@type": "ListItem", "position": 2, "name": breadcrumbs.resources || "Resources", "item": "/resources" },
        { "@type": "ListItem", "position": 3, "name": breadcrumbs.engineeringLibrary || "Engineering Library" }
      ]
    }
  };

  return (
    <ResourcePageLayout
      title={res.title || "Engineering Library"}
      metaTitle={res.metaTitle || "Engineering Library | Paint Cell Engineering Notes"}
      metaDescription={res.metaDesc || "Engineering-first notes on feasibility, constraints, and readiness for robotic spray painting paint cells."}
      breadcrumbs={[
        { label: breadcrumbs.resources || "Resources", href: "/resources/engineering-library" },
        { label: breadcrumbs.engineeringLibrary || "Engineering Library" },
      ]}
      structuredData={structuredData}
    >
      <p className="text-lg text-muted-foreground mb-10">
        {res.description || "Engineering notes for paint cell feasibility, constraints, and project readiness. Written to support engineering-led evaluation—not marketing claims."}
      </p>

      <ContentSection title={sections.explore || "Explore"}>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link
            to="/resources/engineering-library/insights"
            className="group p-6 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-all"
          >
            <BookOpen className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {cards.insights?.title || "Insights"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {cards.insights?.desc || "Short engineering viewpoints and boundary-setting notes"}
            </p>
            {insightsPosts.length > 0 && (
              <p className="text-xs text-primary mt-2">{insightsPosts.length} articles</p>
            )}
          </Link>
          <Link
            to="/resources/engineering-library/guides-checklists"
            className="group p-6 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-all"
          >
            <FileText className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {cards.guidesChecklists?.title || "Guides & Checklists"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {cards.guidesChecklists?.desc || "Practical evaluation steps and preparation templates"}
            </p>
            {guidesPosts.length > 0 && (
              <p className="text-xs text-primary mt-2">{guidesPosts.length} articles</p>
            )}
          </Link>
          <Link
            to="/resources/engineering-library/faqs"
            className="group p-6 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-all"
          >
            <HelpCircle className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {cards.faqs?.title || "FAQs"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {cards.faqs?.desc || "Concise answers to common engineering questions"}
            </p>
            {faqsPosts.length > 0 && (
              <p className="text-xs text-primary mt-2">{faqsPosts.length} articles</p>
            )}
          </Link>
        </div>
      </ContentSection>

      {/* Dynamic content by subcategory */}
      {faqsPosts.length > 0 && (
        <ContentSection title="Recent FAQs">
          {renderPostList(faqsPosts)}
          <Link
            to="/resources/engineering-library/faqs"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mt-4"
          >
            View all FAQs <ArrowRight className="h-3 w-3" />
          </Link>
        </ContentSection>
      )}

      {insightsPosts.length > 0 && (
        <ContentSection title="Recent Insights">
          {renderPostList(insightsPosts)}
          <Link
            to="/resources/engineering-library/insights"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mt-4"
          >
            View all Insights <ArrowRight className="h-3 w-3" />
          </Link>
        </ContentSection>
      )}

      {guidesPosts.length > 0 && (
        <ContentSection title="Recent Guides & Checklists">
          {renderPostList(guidesPosts)}
          <Link
            to="/resources/engineering-library/guides-checklists"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mt-4"
          >
            View all Guides <ArrowRight className="h-3 w-3" />
          </Link>
        </ContentSection>
      )}

      <ContentSection title={sections.featured || "Featured Resources"}>
        <ul className="space-y-4">
          <li>
            <Link
              to="/resources/guides/paint-cell-feasibility-checks"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
            >
              <ArrowRight className="h-4 w-4" />
              {res.links?.feasibilityChecks || "Robotic Spray Painting Feasibility: 10 Engineering Checks Before You Automate"}
            </Link>
          </li>
          <li>
            <Link
              to="/resources/insights/automation-boundary-spray-painting"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
            >
              <ArrowRight className="h-4 w-4" />
              {res.links?.automationBoundary || "Automation Boundary in Spray Painting: What to Automate vs Keep Manual"}
            </Link>
          </li>
          <li>
            <Link
              to="/resources/engineering-library/faqs"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
            >
              <ArrowRight className="h-4 w-4" />
              {res.links?.paintCellFaqs || "Paint Cell FAQs: Feasibility, Site Readiness, and What We Need From You"}
            </Link>
          </li>
        </ul>
      </ContentSection>

      <ContentSection title={sections.projectContext || "Start with your project context"}>
        <p className="text-muted-foreground mb-4">
          {res.projectContextDesc || "If you already have clear requirements, use the configurator. If you're unsure where to start, use project consultation."}
        </p>
      </ContentSection>
    </ResourcePageLayout>
  );
}