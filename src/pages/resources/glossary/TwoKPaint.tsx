import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";
import { useI18n } from "@/i18n/context";

export default function TwoKPaint() {
  const { t, locale } = useI18n();
  const term = t.glossaryTerms?.twoKPaint || {};
  const sections = t.glossaryTerms?.sectionTitles || {};
  const breadcrumbs = t.resources?.breadcrumbs || {};

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": term.metaTitle || "2K Paint | Paint Cell Glossary",
    "description": term.metaDesc || "Definition of 2K paint and why it matters in paint cell feasibility assessment.",
    "inLanguage": locale,
  };

  return (
    <ResourcePageLayout
      title={term.title || "2K Paint"}
      metaTitle={term.metaTitle || "2K Paint | Paint Cell Glossary"}
      metaDescription={term.metaDesc || "Definition of 2K paint and why it matters in paint cell feasibility assessment."}
      breadcrumbs={[
        { label: breadcrumbs.glossary || "Glossary", href: "/resources/glossary" },
        { label: term.title || "2K Paint" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        {term.answerBox || "2K paint is a two-component paint system mixed before application. It adds constraints around mixing, pot life, and handling routines. In paint cells, feasibility depends on how mixing and refill are managed and validated under site procedures."}
      </AnswerBox>

      <ContentSection title={sections.whyMatters || "Why it matters in paint cells"}>
        <BulletList
          items={term.whyMatters || [
            "Adds routine complexity for mixing/refill",
            "Can affect uptime and staffing routines",
            "Requires clear responsibility and validation plan",
          ]}
        />
      </ContentSection>

      <ContentSection title={sections.watchFor || "What to watch for"}>
        <BulletList
          items={term.watchFor || [
            "Underestimating pot-life and refill impacts on takt",
            "Missing clarity on who owns mixing procedures",
          ]}
        />
      </ContentSection>

      <RelatedResources
        resources={[
          { title: "Feasibility: 10 Engineering Checks", href: "/resources/guides/paint-cell-feasibility-checks" },
          { title: "VOC / Solvent Handling Basics", href: "/resources/standards-compliance/voc-solvent-handling" },
          { title: "Paint Cell RFQ Spec Template", href: "/resources/tools-templates/paint-cell-rfq-template" },
        ]}
      />
    </ResourcePageLayout>
  );
}
