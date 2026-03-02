import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";
import { useI18n } from "@/i18n/context";

export default function SprayPattern() {
  const { t, locale } = useI18n();
  const term = t.glossaryTerms?.sprayPattern || {};
  const sections = t.glossaryTerms?.sectionTitles || {};
  const breadcrumbs = t.resources?.breadcrumbs || {};

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": term.metaTitle || "Spray Pattern | Paint Cell Glossary",
    "description": term.metaDesc || "Definition of spray pattern characteristics and optimization in robotic painting.",
    "inLanguage": locale,
  };

  return (
    <ResourcePageLayout
      title={term.title || "Spray Pattern"}
      metaTitle={term.metaTitle || "Spray Pattern | Paint Cell Glossary"}
      metaDescription={term.metaDesc || "Definition of spray pattern characteristics and optimization in robotic painting."}
      breadcrumbs={[
        { label: breadcrumbs.glossary || "Glossary", href: "/resources/glossary" },
        { label: term.title || "Spray Pattern" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        {term.answerBox || "Spray pattern refers to the shape, size, and paint distribution of the atomized paint cloud as it exits the spray gun and deposits on the workpiece. Common patterns include round (circular), flat (elliptical fan), and wide-fan configurations. Pattern characteristics directly impact coverage uniformity, edge definition, and material efficiency."}
      </AnswerBox>

      <ContentSection title={sections.whyMatters || "Why it matters in paint cells"}>
        <BulletList
          items={term.whyMatters || [
            "Pattern width determines required overlap for uniform coverage",
            "Pattern shape affects robot path planning and cycle time",
            "Consistent pattern critical for repeatable film build",
            "Pattern testing required when changing gun or fluid setups",
          ]}
        />
      </ContentSection>

      <ContentSection title={sections.keyCharacteristics || "Key pattern characteristics"}>
        <BulletList
          items={term.keyCharacteristics || [
            "Width: Measured at specified distance (e.g., 200mm at 250mm gun distance)",
            "Distribution: Should be uniform or slightly tapered at edges",
            "Atomization: Fine droplets produce smoother finish quality",
            "Overlap: Typically 50-66% overlap for uniform coverage",
          ]}
        />
      </ContentSection>

      <ContentSection title={sections.commonProblems || "Common pattern problems"}>
        <BulletList
          items={term.commonProblems || [
            "Heavy center (banana pattern) indicates clogged air cap or worn tip",
            "Split pattern suggests too high atomization pressure",
            "Teardrop shape indicates fluid or air balance issue",
            "Inconsistent pattern width may signal pressure fluctuations",
          ]}
        />
      </ContentSection>

      <RelatedResources
        resources={[
          { title: "Atomization", href: "/resources/glossary/atomization" },
          { title: "Overspray", href: "/resources/glossary/overspray" },
          { title: "Film Build", href: "/resources/glossary/film-build" },
        ]}
      />
    </ResourcePageLayout>
  );
}
