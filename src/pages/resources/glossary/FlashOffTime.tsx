import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Flash-off Time | Paint Cell Glossary",
  "description": "Definition of flash-off time and its importance in multi-coat painting processes."
};

export default function FlashOffTime() {
  return (
    <ResourcePageLayout
      title="Flash-off Time"
      metaTitle="Flash-off Time | Paint Cell Glossary"
      metaDescription="Definition of flash-off time and its importance in multi-coat painting processes."
      breadcrumbs={[
        { label: "Glossary", href: "/resources/glossary" },
        { label: "Flash-off Time" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        Flash-off time is the waiting period between paint application and subsequent processing (next coat or curing), allowing solvents to evaporate from the wet film surface. Proper flash-off prevents solvent entrapment, which causes defects like blistering, solvent pop, and poor adhesion.
      </AnswerBox>

      <ContentSection title="Why it matters in paint cells">
        <BulletList
          items={[
            "Directly impacts cycle time and system throughput",
            "Insufficient flash causes quality defects requiring rework",
            "Flash zones require controlled airflow and temperature",
            "Multi-coat processes need flash between each layer",
          ]}
        />
      </ContentSection>

      <ContentSection title="What to watch for">
        <BulletList
          items={[
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
