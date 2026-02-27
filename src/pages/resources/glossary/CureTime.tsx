import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Cure Time | Paint Cell Glossary",
  "description": "Definition of cure time and its role in paint system design and throughput planning."
};

export default function CureTime() {
  return (
    <ResourcePageLayout
      title="Cure Time"
      metaTitle="Cure Time | Paint Cell Glossary"
      metaDescription="Definition of cure time and its role in paint system design and throughput planning."
      breadcrumbs={[
        { label: "Glossary", href: "/resources/glossary" },
        { label: "Cure Time" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        Cure time is the duration required for a paint film to fully crosslink and develop its final properties (hardness, adhesion, chemical resistance). Cure can be ambient (air dry), forced (elevated temperature oven), or UV-initiated. Cure time directly impacts system throughput and determines oven sizing in production paint lines.
      </AnswerBox>

      <ContentSection title="Why it matters in paint cells">
        <BulletList
          items={[
            "Defines oven length and energy consumption in continuous lines",
            "Affects work-in-process inventory for batch operations",
            "Under-cured parts fail adhesion and durability tests",
            "Over-curing wastes energy and may degrade certain coatings",
          ]}
        />
      </ContentSection>

      <ContentSection title="Cure types">
        <BulletList
          items={[
            "Air dry: Ambient cure, slowest (hours to days), minimal equipment",
            "Force dry: 60-80°C, accelerates air-dry coatings",
            "Bake cure: 120-180°C, required for thermosetting coatings",
            "UV cure: Seconds, requires specialized lamps and coatings",
          ]}
        />
      </ContentSection>

      <ContentSection title="Cure verification">
        <BulletList
          items={[
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
