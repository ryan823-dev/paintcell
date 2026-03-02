import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";
import { useI18n } from "@/i18n/context";

export default function FlashOffTime() {
  const { t, locale } = useI18n();
  const term = t.glossaryTerms?.flashOffTime || {};
  const sections = t.glossaryTerms?.sectionTitles || {};
  const breadcrumbs = t.resources?.breadcrumbs || {};

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": term.metaTitle || "Flash-off Time | Paint Cell Glossary",
    "description": term.metaDesc || "Definition of flash-off time and its importance in multi-coat painting processes.",
    "inLanguage": locale,
  };

  return (
    <ResourcePageLayout
      title={term.title || "Flash-off Time"}
      metaTitle={term.metaTitle || "Flash-off Time | Paint Cell Glossary"}
      metaDescription={term.metaDesc || "Definition of flash-off time and its importance in multi-coat painting processes."}
      breadcrumbs={[
        { label: breadcrumbs.glossary || "Glossary", href: "/resources/glossary" },
        { label: term.title || "Flash-off Time" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        {term.answerBox || "Flash-off time is the waiting period between paint application and subsequent processing (next coat or curing), allowing solvents to evaporate from the wet film surface. Proper flash-off prevents solvent entrapment, which causes defects like blistering, solvent pop, and poor adhesion."}
      </AnswerBox>

      <ContentSection title={sections.whyMatters || "Why it matters in paint cells"}>
        <BulletList
          items={term.whyMatters || [
            "Directly impacts cycle time and system throughput",
            "Insufficient flash causes quality defects requiring rework",
            "Flash zones require controlled airflow and temperature",
            "Multi-coat processes need flash between each layer",
          ]}
        />
      </ContentSection>

      <ContentSection title={sections.watchFor || "What to watch for"}>
        <BulletList
          items={term.watchFor || [
            "Waterborne paints typically need longer flash times than solvent-based",
            "High humidity extends flash time for waterborne coatings",
            "Flash zone sizing affects overall system footprint",
            "Temperature control critical for consistent flash behavior",
          ]}
        />
      </ContentSection>

      <RelatedResources
        resources={[
          { title: "Film Build", href: "/resources/glossary/film-build" },
          { title: "2K Paint", href: "/resources/glossary/2k-paint" },
          { title: "Paint Booth Design Basics", href: "/resources/knowledge/paint-booth-design-basics" },
        ]}
      />
    </ResourcePageLayout>
  );
}
