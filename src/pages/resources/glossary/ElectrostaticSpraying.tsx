import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Electrostatic Spraying | Paint Cell Glossary",
  "description": "Definition of electrostatic spraying and why it matters in robotic paint cell applications."
};

export default function ElectrostaticSpraying() {
  return (
    <ResourcePageLayout
      title="Electrostatic Spraying"
      metaTitle="Electrostatic Spraying | Paint Cell Glossary"
      metaDescription="Definition of electrostatic spraying and why it matters in robotic paint cell applications."
      breadcrumbs={[
        { label: "Glossary", href: "/resources/glossary" },
        { label: "Electrostatic Spraying" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        Electrostatic spraying applies a high-voltage charge (typically 40-100 kV) to atomized paint particles, causing them to be attracted to the grounded workpiece. This significantly improves transfer efficiency (often 65-85% vs 30-40% for conventional air spray) and provides superior wrap-around coverage on complex geometries.
      </AnswerBox>

      <ContentSection title="Why it matters in paint cells">
        <BulletList
          items={[
            "Reduces paint consumption by 30-50% compared to conventional spraying",
            "Improves coverage on recessed areas and back surfaces",
            "Requires proper grounding of parts and fixtures",
            "Paint conductivity must be controlled within specification",
          ]}
        />
      </ContentSection>

      <ContentSection title="What to watch for">
        <BulletList
          items={[
            "Faraday cage effect on deep recesses and inside corners",
            "Grounding integrity of conveyor systems and fixtures",
            "Paint resistivity drift affecting charge transfer",
            "Safety requirements for high-voltage equipment in booth",
          ]}
        />
      </ContentSection>

      <RelatedResources
        resources={[
          { title: "Transfer Efficiency", href: "/resources/glossary/transfer-efficiency" },
          { title: "How to Choose a Paint Robot", href: "/resources/knowledge/how-to-choose-paint-robot" },
          { title: "Grounding & Static Control", href: "/resources/standards-compliance/grounding-static-control" },
        ]}
      />
    </ResourcePageLayout>
  );
}
