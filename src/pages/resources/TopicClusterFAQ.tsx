import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { ResourcePageLayout } from "@/components/resources";
import { topicClusters } from "@/data/topicClusters";
import NotFound from "@/pages/NotFound";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function TopicClusterFAQ() {
  const { slug } = useParams<{ slug: string }>();
  const cluster = slug ? topicClusters[slug] : undefined;

  const structuredData = useMemo(() => {
    if (!cluster) {
      return null;
    }

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "name": cluster.faq.label,
      "description": cluster.faq.description,
      "mainEntity": cluster.faqItems.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer,
        },
      })),
    };
  }, [cluster]);

  if (!cluster) {
    return <NotFound />;
  }

  return (
    <ResourcePageLayout
      title={cluster.faq.label}
      metaTitle={`${cluster.keyword} FAQ | ${cluster.keyword} Questions and Answers`}
      metaDescription={cluster.metaDescription}
      breadcrumbs={[
        { label: "Resources", href: "/resources/engineering-library" },
        { label: "Topic Clusters", href: "/resources/topics" },
        { label: cluster.keyword, href: `/resources/topics/${cluster.slug}` },
        { label: "FAQ" },
      ]}
      structuredData={structuredData || undefined}
      canonicalPath={cluster.faq.href}
    >
      <p className="text-lg text-muted-foreground mb-8">{cluster.faq.description}</p>
      <Accordion type="single" collapsible className="space-y-3">
        {cluster.faqItems.map((faq, index) => (
          <AccordionItem key={faq.question} value={`faq-${index}`} className="rounded-xl border border-border px-5">
            <AccordionTrigger className="text-left font-medium hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ResourcePageLayout>
  );
}
