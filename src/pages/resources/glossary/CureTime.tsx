import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";
import { useI18n } from "@/i18n/context";

export default function CureTime() {
  const { t, locale } = useI18n();
  const term = t.glossaryTerms?.cureTime || {};
  const sections = t.glossaryTerms?.sectionTitles || {};
  const breadcrumbs = t.resources?.breadcrumbs || {};

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": term.metaTitle || "Cure Time | Paint Cell Glossary",
    "description": term.metaDesc || "Definition of cure time and its role in paint system design and throughput planning.",
    "inLanguage": locale,
  };

  return (
    <ResourcePageLayout
      title={term.title || "Cure Time"}
      metaTitle={term.metaTitle || "Cure Time | Paint Cell Glossary"}
      metaDescription={term.metaDesc || "Definition of cure time and its role in paint system design and throughput planning."}
      breadcrumbs={[
        { label: breadcrumbs.glossary || "Glossary", href: "/resources/glossary" },
        { label: term.title || "Cure Time" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        {term.answerBox || "Cure time is the duration required for a paint film to fully crosslink and develop its final properties (hardness, adhesion, chemical resistance). Cure can be ambient (air dry), forced (elevated temperature oven), or UV-initiated. Cure time directly impacts system throughput and determines oven sizing in production paint lines."}
      </AnswerBox>

      <ContentSection title={sections.whyMatters || "Why it matters in paint cells"}>
        <BulletList
          items={term.whyMatters || [
            "Defines oven length and energy consumption in continuous lines",
            "Affects work-in-process inventory for batch operations",
            "Under-cured parts fail adhesion and durability tests",
            "Over-curing wastes energy and may degrade certain coatings",
          ]}
        />
      </ContentSection>

      <ContentSection title={sections.cureTypes || "Cure types"}>
        <BulletList
          items={term.cureTypes || [
            "Air dry: Ambient cure, slowest (hours to days), minimal equipment",
            "Force dry: 60-80°C, accelerates air-dry coatings",
            "Bake cure: 120-180°C, required for thermosetting coatings",
            "UV cure: Seconds, requires specialized lamps and coatings",
          ]}
        />
      </ContentSection>

      <ContentSection title={sections.cureVerification || "Cure verification"}>
        <BulletList
          items={term.cureVerification || [
            "Pencil hardness or MEK rub tests for cure confirmation",
            "Adhesion testing (cross-hatch) verifies film integrity",
            "Cure window tracking ensures time-temperature profile met",
            "Under-cure often shows as soft film or poor solvent resistance",
          ]}
        />
      </ContentSection>

      <RelatedResources
        resources={[
          { title: "Flash-off Time", href: "/resources/glossary/flash-off-time" },
          { title: "2K Paint", href: "/resources/glossary/2k-paint" },
          { title: "Film Build", href: "/resources/glossary/film-build" },
        ]}
      />
    </ResourcePageLayout>
  );
}
