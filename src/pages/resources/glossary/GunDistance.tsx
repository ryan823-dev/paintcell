import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Gun Distance | Paint Cell Glossary",
  "description": "Definition of gun-to-part distance and its impact on spray painting quality."
};

export default function GunDistance() {
  return (
    <ResourcePageLayout
      title="Gun Distance"
      metaTitle="Gun Distance | Paint Cell Glossary"
      metaDescription="Definition of gun-to-part distance and its impact on spray painting quality."
      breadcrumbs={[
        { label: "Glossary", href: "/resources/glossary" },
        { label: "Gun Distance" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        Gun distance (also called standoff distance) is the perpendicular distance from the spray gun tip to the workpiece surface, typically measured in millimeters. Optimal gun distance varies by spray technology (150-300mm for conventional, 200-350mm for electrostatic) and significantly affects atomization quality, transfer efficiency, and finish appearance.
      </AnswerBox>

      <ContentSection title="Why it matters in paint cells">
        <BulletList
          items={[
            "Too close: wet, heavy film with runs and sags",
            "Too far: dry spray, poor flow, orange peel texture",
            "Robot path must maintain consistent distance on contoured parts",
            "Distance variation is primary cause of film build inconsistency",
          ]}
        />
      </ContentSection>

      <ContentSection title="Distance optimization factors">
        <BulletList
          items={[
            "Spray technology: HVLP typically needs closer distance than conventional",
            "Paint viscosity: Higher viscosity may need closer distance",
            "Atomization air pressure: Higher pressure allows greater distance",
            "Part geometry: Complex shapes require adaptive distance control",
          ]}
        />
      </ContentSection>

      <RelatedResources
        resources={[
          { title: "Spray Pattern", href: "/resources/glossary/spray-pattern" },
          { title: "Atomization", href: "/resources/glossary/atomization" },
          { title: "Orange Peel", href: "/resources/glossary/orange-peel" },
        ]}
      />
    </ResourcePageLayout>
  );
}
