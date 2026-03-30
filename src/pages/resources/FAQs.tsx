import { useState, useEffect } from "react";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { ResourcePageLayout, AnswerBox } from "@/components/resources";
import { ContentSection } from "@/components/resources";
import { ArrowRight, Loader2 } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";

interface FAQPost {
  id: string;
  title: string;
  title_zh: string | null;
  slug: string;
  body: string | null;
  body_zh: string | null;
  answer_box: string | null;
  answer_box_zh: string | null;
  summary: string | null;
  summary_zh: string | null;
}

export default function FAQs() {
  const { t, locale } = useI18n();
  const isZh = locale === "zh-CN";
  const res = t.resources?.faqs || {};
  const breadcrumbs = t.resources?.breadcrumbs || {};
  const sections = t.resources?.sections || {};
  const faqItems = res.items || [];

  const [dynamicFAQs, setDynamicFAQs] = useState<FAQPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("resources_posts")
      .select("id, title, title_zh, slug, body, body_zh, answer_box, answer_box_zh, summary, summary_zh")
      .eq("status", "published")
      .eq("category", "engineering-library")
      .eq("subcategory", "faqs")
      .order("published_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) {
          setDynamicFAQs(data as FAQPost[]);
        }
        setLoading(false);
      });
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": res.metaTitle || "Paint Cell FAQs | Engineering Library",
    "description": res.metaDesc || "Concise answers to common questions about paint cell feasibility, site readiness, and what inputs are needed.",
    "inLanguage": locale,
    "mainEntity": [
      ...dynamicFAQs.slice(0, 5).map((item) => ({
        "@type": "Question",
        "name": (isZh && item.title_zh) ? item.title_zh : item.title,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": (isZh && item.answer_box_zh) ? item.answer_box_zh : (item.answer_box || item.summary || "")
        }
      })),
      ...faqItems.slice(0, 2).map((item: { q: string; a: string }) => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a
        }
      }))
    ]
  };

  return (
    <ResourcePageLayout
      title={res.title || "Paint Cell FAQs"}
      metaTitle={res.metaTitle || "Paint Cell FAQs | Engineering Library"}
      metaDescription={res.metaDesc || "Concise answers to common questions about paint cell feasibility, site readiness, and what inputs are needed."}
      breadcrumbs={[
        { label: breadcrumbs.engineeringLibrary || "Engineering Library", href: "/resources/engineering-library" },
        { label: breadcrumbs.faqs || "FAQs" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        {res.introduction || "These FAQs cover feasibility, readiness, and what information is needed to start a serious paint cell assessment. Answers are engineering-oriented and assume robotic spray painting with liquid paint. Always validate site safety and compliance requirements with your facility team."}
      </AnswerBox>

      <ContentSection title={sections.faqs || "FAQs"}>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Dynamic FAQs from database */}
            {dynamicFAQs.map((item) => {
              const title = (isZh && item.title_zh) ? item.title_zh : item.title;
              const body = (isZh && item.body_zh) ? item.body_zh : item.body;
              const answerBox = (isZh && item.answer_box_zh) ? item.answer_box_zh : item.answer_box;

              return (
                <div key={item.id} className="border-b border-border pb-6 last:border-0">
                  <h3 className="font-semibold text-foreground mb-2">
                    Q: {title}
                  </h3>
                  {answerBox && (
                    <p className="text-muted-foreground mb-3">{answerBox}</p>
                  )}
                  {body && (
                    <div className="prose prose-sm max-w-none text-muted-foreground">
                      <ReactMarkdown>{body}</ReactMarkdown>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Static FAQs as fallback */}
            {dynamicFAQs.length === 0 && faqItems.length > 0 && faqItems.map((item: { q: string; a: string }, index: number) => (
              <div key={index}>
                <h3 className="font-semibold text-foreground mb-2">
                  Q{index + 1}: {item.q}
                </h3>
                <p className="text-muted-foreground">
                  {item.a}
                </p>
              </div>
            ))}

            {/* Default static FAQs */}
            {dynamicFAQs.length === 0 && faqItems.length === 0 && (
              <>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Q1: Can you provide an instant quote from the website?
                  </h3>
                  <p className="text-muted-foreground">
                    No. Early accuracy depends on geometry, takt/changeover, and site constraints. We start with a structured pre-engineering assessment to determine what must be validated.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Q2: What is the minimum information you need to assess feasibility?
                  </h3>
                  <p className="text-muted-foreground">
                    Part photos or CAD, finish target (visual vs functional), takt or parts/hour, changeover frequency/batch size, and basic site constraints (space, booth/room, ventilation info if known).
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Q3: What makes a paint cell "not a good fit"?
                  </h3>
                  <p className="text-muted-foreground">
                    High variation with frequent unplanned changeovers, unstable part presentation, or unknown/unmet ventilation/EHS constraints.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Q4: How do you handle touch-up and manual work?
                  </h3>
                  <p className="text-muted-foreground">
                    We define an explicit automation boundary. Prep, masking, touch-up, and inspection often remain manual and must be planned to avoid unrealistic expectations.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Q5: Does throughput depend only on robot speed?
                  </h3>
                  <p className="text-muted-foreground">
                    No. Handling, indexing, curing/dry time, and changeover/cleaning often dominate real capacity.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Q6: What site constraints matter most early?
                  </h3>
                  <p className="text-muted-foreground">
                    Ventilation/airflow, paint handling routines, grounding/static control, and the facility's EHS approval path.
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </ContentSection>
    </ResourcePageLayout>
  );
}