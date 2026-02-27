import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Dry Film Thickness (DFT) | Paint Cell Glossary",
  "description": "Definition of dry film thickness and its measurement in industrial coating applications."
};

export default function DryFilmThickness() {
  return (
    <ResourcePageLayout
      title="Dry Film Thickness (DFT)"
      metaTitle="Dry Film Thickness | Paint Cell Glossary"
      metaDescription="Definition of dry film thickness and its measurement in industrial coating applications."
      breadcrumbs={[
        { label: "Glossary", href: "/resources/glossary" },
        { label: "Dry Film Thickness" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        Dry Film Thickness (DFT) is the thickness of a cured paint film measured in microns (μm) or mils (1 mil = 25.4 μm). DFT is the primary quality control measurement for coating performance, as insufficient thickness compromises protection while excessive thickness wastes material and may cause defects.
      </AnswerBox>

      <ContentSection title="Why it matters in paint cells">
        <BulletList
          items={[
            "Specification compliance requires DFT within tolerance (e.g., 50-80 μm)",
            "Robot path parameters directly control film thickness distribution",
            "Consistent DFT indicates stable, repeatable process",
            "Under-thickness leads to premature coating failure",
          ]}
        />
      </ContentSection>

      <ContentSection title="Measurement methods">
        <BulletList
          items={[
            "Magnetic gauges for ferrous substrates (non-destructive)",
            "Eddy current gauges for non-ferrous metals (non-destructive)",
            "Ultrasonic gauges for non-metallic substrates",
            "Destructive cross-section measurement for verification",
          ]}
        />
      </ContentSection>

      <RelatedResources
        resources={[
          { title: "Film Build", href: "/resources/glossary/film-build" },
          { title: "Transfer Efficiency", href: "/resources/glossary/transfer-efficiency" },
          { title: "Robotic Painting Cost Guide", href: "/resources/knowledge/robotic-painting-cost-guide" },
        ]}
      />
    </ResourcePageLayout>
  );
}
