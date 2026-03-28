import { useState, useEffect } from "react";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { ResourcePageLayout, AnswerBox } from "@/components/resources";
import { ContentSection } from "@/components/resources";
import { ArrowRight, Loader2 } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQPage {
  id: string;
  slug: string;
  title: string;
  title_zh: string | null;
  summary: string;
  summary_zh: string | null;
  faqs: { question: string; answer: string }[];
  faqs_zh: { question: string; answer: string }[];
  meta_title: string | null;
  meta_title_zh: string | null;
  meta_description: string | null;
  meta_description_zh: string | null;
}

export default function FAQs() {
  const { t, locale } = useI18n();
  const isZh = locale === "zh-CN";
  const res = t.resources?.faqs || {};
  const breadcrumbs = t.resources?.breadcrumbs || {};
  const sections = t.resources?.sections || {};
  const faqItems = res.items || [];

  const [faqPages, setFaqPages] = useState<FAQPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("faq_pages")
      .select("id, slug, title, title_zh, summary, summary_zh, faqs, faqs_zh, meta_title, meta_title_zh, meta_description, meta_description_zh")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) {
          setFaqPages(data as FAQPage[]);
        }
        setLoading(false);
      });
  }, []);

  // Generate FAQPage schema from all FAQ items
  const generateSchema = () => {
    const allFAQItems: { question: string; answer: string }[] = [];

    // Collect all FAQ items from published pages
    faqPages.forEach((page) => {
      const items = isZh && page.faqs_zh?.length ? page.faqs_zh : page.faqs;
      if (items?.length) {
        allFAQItems.push(...items);
      }
    });

    // If no dynamic FAQs, use static fallback
    if (allFAQItems.length === 0 && faqItems.length > 0) {
      allFAQItems.push(...(faqItems as { q: string; a: string }[]).map((item) => ({
        question: item.q,
        answer: item.a,
      })));
    }

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "name": res.metaTitle || "Paint Cell FAQs | Engineering Library",
      "description": res.metaDesc || "Concise answers to common questions about paint cell feasibility, site readiness, and what inputs are needed.",
      "inLanguage": locale,
      "mainEntity": allFAQItems.slice(0, 10).map((item) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer,
        },
      })),
    };
  };

  const structuredData = generateSchema();

  return (
    <ResourcePageLayout
      title={res.title || "Paint Cell FAQs"}
      metaTitle={res.metaTitle || "Paint Cell FAQs | Engineering Library"}
      metaDescription={res.metaDesc || "Concise answers to common questions about paint cell feasibility, site readiness, and what inputs are needed."}
      breadcrumbs={[
        { label: breadcrumbs.resources || "Resources", href: "/resources" },
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
            {/* Dynamic FAQ Pages from database */}
            {faqPages.map((page) => {
              const items = isZh && page.faqs_zh?.length ? page.faqs_zh : page.faqs;
              const pageTitle = isZh && page.title_zh ? page.title_zh : page.title;

              if (!items?.length) return null;

              return (
                <div key={page.id} className="space-y-4">
                  <h2 className="text-lg font-semibold text-foreground">
                    {pageTitle}
                  </h2>
                  {(isZh && page.summary_zh ? page.summary_zh : page.summary) && (
                    <p className="text-sm text-muted-foreground mb-4">
                      {isZh && page.summary_zh ? page.summary_zh : page.summary}
                    </p>
                  )}
                  <Accordion type="single" collapsible className="w-full">
                    {items.map((item, index) => (
                      <AccordionItem key={index} value={`${page.id}-${index}`}>
                        <AccordionTrigger className="text-left">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="prose prose-sm max-w-none text-muted-foreground">
                            <ReactMarkdown>{item.answer}</ReactMarkdown>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              );
            })}

            {/* Static FAQs as fallback */}
            {faqPages.length === 0 && faqItems.length > 0 && (
              <Accordion type="single" collapsible className="w-full">
                {(faqItems as { q: string; a: string }[]).map((item, index) => (
                  <AccordionItem key={index} value={`static-${index}`}>
                    <AccordionTrigger className="text-left">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{item.a}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}

            {/* Default static FAQs */}
            {faqPages.length === 0 && faqItems.length === 0 && (
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="default-1">
                  <AccordionTrigger className="text-left">
                    Can you provide an instant quote from the website?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      No. Early accuracy depends on geometry, takt/changeover, and site constraints. We start with a structured pre-engineering assessment to determine what must be validated.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="default-2">
                  <AccordionTrigger className="text-left">
                    What is the minimum information you need to assess feasibility?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Part photos or CAD, finish target (visual vs functional), takt or parts/hour, changeover frequency/batch size, and basic site constraints (space, booth/room, ventilation info if known).
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="default-3">
                  <AccordionTrigger className="text-left">
                    What makes a paint cell "not a good fit"?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      High variation with frequent unplanned changeovers, unstable part presentation, or unknown/unmet ventilation/EHS constraints.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="default-4">
                  <AccordionTrigger className="text-left">
                    How do you handle touch-up and manual work?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      We define an explicit automation boundary. Prep, masking, touch-up, and inspection often remain manual and must be planned to avoid unrealistic expectations.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="default-5">
                  <AccordionTrigger className="text-left">
                    Does throughput depend only on robot speed?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      No. Handling, indexing, curing/dry time, and changeover/cleaning often dominate real capacity.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="default-6">
                  <AccordionTrigger className="text-left">
                    What site constraints matter most early?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Ventilation/airflow, paint handling routines, grounding/static control, and the facility's EHS approval path.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </div>
        )}
      </ContentSection>
    </ResourcePageLayout>
  );
}