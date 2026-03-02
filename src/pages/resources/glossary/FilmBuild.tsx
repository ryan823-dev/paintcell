import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";
import { useI18n } from "@/i18n/context";

export default function FilmBuild() {
  const { t, locale } = useI18n();
  const term = t.glossaryTerms?.filmBuild || {};
  const sections = t.glossaryTerms?.sectionTitles || {};
  const breadcrumbs = t.resources?.breadcrumbs || {};

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": term.metaTitle || "Film Build | Paint Cell Glossary",
    "description": term.metaDesc || "Definition of film build and why it matters in paint cell feasibility assessment.",
    "inLanguage": locale,
  };

  return (
    <ResourcePageLayout
      title={term.title || "Film Build"}
      metaTitle={term.metaTitle || "Film Build | Paint Cell Glossary"}
      metaDescription={term.metaDesc || "Definition of film build and why it matters in paint cell feasibility assessment."}
      breadcrumbs={[
        { label: breadcrumbs.glossary || "Glossary", href: "/resources/glossary" },
        { label: term.title || "Film Build" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        {term.answerBox || "Film build is the thickness of applied paint after spraying and curing/drying. It is a key requirement input that affects spray parameters, cycle time, and quality checks. In paint cells, film build targets must be paired with acceptable variability and inspection expectations."}
      </AnswerBox>

      <ContentSection title={sections.whyMatters || "Why it matters in paint cells"}>
        <BulletList
          items={term.whyMatters || [
            "Determines number of passes and path time",
            "Impacts inspection and acceptable variability",
            "Links to atomization stability and environmental control",
          ]}
        />
      </ContentSection>

      <ContentSection title={sections.watchFor || "What to watch for"}>
        <BulletList
          items={term.watchFor || [
            "Targets without tolerance ranges or acceptance criteria",
            "Confusing appearance uniformity with film build specs",
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
