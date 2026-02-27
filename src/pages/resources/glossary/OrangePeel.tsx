import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Orange Peel | Paint Cell Glossary",
  "description": "Definition of orange peel defect in paint finishing and how to prevent it in robotic painting."
};

export default function OrangePeel() {
  return (
    <ResourcePageLayout
      title="Orange Peel"
      metaTitle="Orange Peel Defect | Paint Cell Glossary"
      metaDescription="Definition of orange peel defect in paint finishing and how to prevent it in robotic painting."
      breadcrumbs={[
        { label: "Glossary", href: "/resources/glossary" },
        { label: "Orange Peel" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        Orange peel is a surface texture defect where the paint film exhibits a bumpy, dimpled appearance resembling orange skin. It occurs when atomized paint droplets don't flow together smoothly before the surface begins to set, often caused by improper viscosity, insufficient atomization, or incorrect gun distance.
      </AnswerBox>

      <ContentSection title="Why it matters in paint cells">
        <BulletList
          items={[
            "Unacceptable for Class A automotive and decorative finishes",
            "Indicates process parameter issues that need correction",
            "Severe cases require sanding and repainting (costly rework)",
            "Consistent robot paths help maintain uniform results",
          ]}
        />
      </ContentSection>

      <ContentSection title="Common causes and solutions">
        <BulletList
          items={[
            "Paint viscosity too high → reduce viscosity or add thinner",
            "Gun distance too far → optimize robot path distance",
            "Atomization pressure too low → increase air pressure",
            "Booth temperature too high → adjust environmental controls",
            "Spray speed too fast → reduce robot TCP velocity",
          ]}
        />
      </ContentSection>

      <RelatedResources
        resources={[
          { title: "Atomization", href: "/resources/glossary/atomization" },
          { title: "Film Build", href: "/resources/glossary/film-build" },
          { title: "How to Choose a Paint Robot", href: "/resources/knowledge/how-to-choose-paint-robot" },
        ]}
      />
    </ResourcePageLayout>
  );
}
