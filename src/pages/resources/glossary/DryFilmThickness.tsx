import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";
import { useI18n } from "@/i18n/context";

export default function DryFilmThickness() {
  const { t, locale } = useI18n();
  const term = t.glossaryTerms?.dryFilmThickness || {};
  const sections = t.glossaryTerms?.sectionTitles || {};
  const breadcrumbs = t.resources?.breadcrumbs || {};

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": term.metaTitle || "Dry Film Thickness | Paint Cell Glossary",
    "description": term.metaDesc || "Definition of dry film thickness and its measurement in industrial coating applications.",
    "inLanguage": locale,
  };

  return (
    <ResourcePageLayout
      title={term.title || "Dry Film Thickness (DFT)"}
      metaTitle={term.metaTitle || "Dry Film Thickness | Paint Cell Glossary"}
      metaDescription={term.metaDesc || "Definition of dry film thickness and its measurement in industrial coating applications."}
      breadcrumbs={[
        { label: breadcrumbs.glossary || "Glossary", href: "/resources/glossary" },
        { label: term.title || "Dry Film Thickness" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        {term.answerBox || "Dry Film Thickness (DFT) is the thickness of a cured paint film measured in microns (μm) or mils (1 mil = 25.4 μm). DFT is the primary quality control measurement for coating performance, as insufficient thickness compromises protection while excessive thickness wastes material and may cause defects."}
      </AnswerBox>

      <ContentSection title={sections.whyMatters || "Why it matters in paint cells"}>
        <BulletList
          items={term.whyMatters || [
            "Specification compliance requires DFT within tolerance (e.g., 50-80 μm)",
            "Robot path parameters directly control film thickness distribution",
            "Consistent DFT indicates stable, repeatable process",
            "Under-thickness leads to premature coating failure",
          ]}
        />
      </ContentSection>

      <ContentSection title={sections.measurementMethods || "Measurement methods"}>
        <BulletList
          items={term.measurementMethods || [
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
