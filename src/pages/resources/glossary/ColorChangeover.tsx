import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";
import { useI18n } from "@/i18n/context";

export default function ColorChangeover() {
  const { t, locale } = useI18n();
  const term = t.glossaryTerms?.colorChangeover || {};
  const sections = t.glossaryTerms?.sectionTitles || {};
  const breadcrumbs = t.resources?.breadcrumbs || {};

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": term.metaTitle || "Color Changeover | Paint Cell Glossary",
    "description": term.metaDesc || "Definition of color changeover and why it matters in paint cell feasibility assessment.",
    "inLanguage": locale,
  };

  return (
    <ResourcePageLayout
      title={term.title || "Color Changeover"}
      metaTitle={term.metaTitle || "Color Changeover | Paint Cell Glossary"}
      metaDescription={term.metaDesc || "Definition of color changeover and why it matters in paint cell feasibility assessment."}
      breadcrumbs={[
        { label: breadcrumbs.glossary || "Glossary", href: "/resources/glossary" },
        { label: term.title || "Color Changeover" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        {term.answerBox || "Color changeover is the time and procedure required to switch paints or colors safely and consistently. It often dominates downtime and real throughput more than robot speed. Feasibility reviews should quantify changeover frequency, cleaning expectations, and acceptable downtime."}
      </AnswerBox>

      <ContentSection title={sections.whyMatters || "Why it matters in paint cells"}>
        <BulletList
          items={term.whyMatters || [
            "Drives real capacity and scheduling stability",
            "Impacts operator routine and maintenance workload",
            "Can affect quality if cleaning is inconsistent",
          ]}
        />
      </ContentSection>

      <ContentSection title={sections.watchFor || "What to watch for"}>
        <BulletList
          items={term.watchFor || [
            "Ignoring cleaning time in throughput estimates",
            "Overlooking who owns changeover steps (boundary)",
          ]}
        />
      </ContentSection>

      <RelatedResources
        resources={[
          { title: "Feasibility: 10 Engineering Checks", href: "/resources/guides/paint-cell-feasibility-checks" },
          { title: "VOC / Solvent Handling Basics", href: "/resources/standards-compliance/voc-solvent-handling" },
          { title: "Site Readiness Checklist", href: "/resources/tools-templates/site-readiness-checklist" },
        ]}
      />
    </ResourcePageLayout>
  );
}
