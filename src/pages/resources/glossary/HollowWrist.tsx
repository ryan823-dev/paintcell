import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Hollow Wrist Robot | Paint Cell Glossary",
  "description": "Definition of hollow wrist robot design and why it's essential for paint applications."
};

export default function HollowWrist() {
  return (
    <ResourcePageLayout
      title="Hollow Wrist Robot"
      metaTitle="Hollow Wrist Robot | Paint Cell Glossary"
      metaDescription="Definition of hollow wrist robot design and why it's essential for paint applications."
      breadcrumbs={[
        { label: "Glossary", href: "/resources/glossary" },
        { label: "Hollow Wrist" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        A hollow wrist robot features an internal passage through the wrist joint (axis 4-5-6) that allows paint hoses, air lines, and cables to be routed inside the robot arm rather than externally. This design prevents cable interference, reduces snagging risks, and enables smooth motion around complex part geometries essential for painting applications.
      </AnswerBox>

      <ContentSection title="Why it matters in paint cells">
        <BulletList
          items={[
            "External hoses can catch on parts or fixtures during complex paths",
            "Internal routing protects lines from paint overspray and solvents",
            "Enables tighter robot motions without cable stretch or interference",
            "Standard feature on dedicated paint robots (ABB IRB 5500, FANUC P-series)",
          ]}
        />
      </ContentSection>

      <ContentSection title="Hollow wrist specifications">
        <BulletList
          items={[
            "Passage diameter: Typically 50-70mm for paint line bundle",
            "Must accommodate: Paint hose, atomization air, pattern air, solvent, electrostatic cable",
            "Some robots offer multiple passages for multi-gun configurations",
            "Process equipment must be matched to hollow wrist capacity",
          ]}
        />
      </ContentSection>

      <RelatedResources
        resources={[
          { title: "How to Choose a Paint Robot", href: "/resources/knowledge/how-to-choose-paint-robot" },
          { title: "ATEX Certification", href: "/resources/glossary/atex-certification" },
          { title: "Robotic Painting Cost Guide", href: "/resources/knowledge/robotic-painting-cost-guide" },
        ]}
      />
    </ResourcePageLayout>
  );
}
