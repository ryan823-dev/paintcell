import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Spray Pattern | Paint Cell Glossary",
  "description": "Definition of spray pattern characteristics and optimization in robotic painting."
};

export default function SprayPattern() {
  return (
    <ResourcePageLayout
      title="Spray Pattern"
      metaTitle="Spray Pattern | Paint Cell Glossary"
      metaDescription="Definition of spray pattern characteristics and optimization in robotic painting."
      breadcrumbs={[
        { label: "Glossary", href: "/resources/glossary" },
        { label: "Spray Pattern" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        Spray pattern refers to the shape, size, and paint distribution of the atomized paint cloud as it exits the spray gun and deposits on the workpiece. Common patterns include round (circular), flat (elliptical fan), and wide-fan configurations. Pattern characteristics directly impact coverage uniformity, edge definition, and material efficiency.
      </AnswerBox>

      <ContentSection title="Why it matters in paint cells">
        <BulletList
          items={[
            "Pattern width determines required overlap for uniform coverage",
            "Pattern shape affects robot path planning and cycle time",
            "Consistent pattern critical for repeatable film build",
            "Pattern testing required when changing gun or fluid setups",
          ]}
        />
      </ContentSection>

      <ContentSection title="Key pattern characteristics">
        <BulletList
          items={[
            "Width: Measured at specified distance (e.g., 200mm at 250mm gun distance)",
            "Distribution: Should be uniform or slightly tapered at edges",
            "Atomization: Fine droplets produce smoother finish quality",
            "Overlap: Typically 50-66% overlap for uniform coverage",
          ]}
        />
      </ContentSection>

      <ContentSection title="Common pattern problems">
        <BulletList
          items={[
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
