import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";
import { useI18n } from "@/i18n/context";

export default function OrangePeel() {
  const { t, locale } = useI18n();
  const term = t.glossaryTerms?.orangePeel || {};
  const sections = t.glossaryTerms?.sectionTitles || {};
  const breadcrumbs = t.resources?.breadcrumbs || {};

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": term.metaTitle || "Orange Peel Defect | Paint Cell Glossary",
    "description": term.metaDesc || "Definition of orange peel defect in paint finishing and how to prevent it in robotic painting.",
    "inLanguage": locale,
  };

  return (
    <ResourcePageLayout
      title={term.title || "Orange Peel"}
      metaTitle={term.metaTitle || "Orange Peel Defect | Paint Cell Glossary"}
      metaDescription={term.metaDesc || "Definition of orange peel defect in paint finishing and how to prevent it in robotic painting."}
      breadcrumbs={[
        { label: breadcrumbs.glossary || "Glossary", href: "/resources/glossary" },
        { label: term.title || "Orange Peel" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        {term.answerBox || "Orange peel is a surface texture defect where the paint film exhibits a bumpy, dimpled appearance resembling orange skin. It occurs when atomized paint droplets don't flow together smoothly before the surface begins to set, often caused by improper viscosity, insufficient atomization, or incorrect gun distance."}
      </AnswerBox>

      <ContentSection title={sections.whyMatters || "Why it matters in paint cells"}>
        <BulletList
          items={term.whyMatters || [
            "Unacceptable for Class A automotive and decorative finishes",
            "Indicates process parameter issues that need correction",
            "Severe cases require sanding and repainting (costly rework)",
            "Consistent robot paths help maintain uniform results",
          ]}
        />
      </ContentSection>

      <ContentSection title={sections.causesAndSolutions || "Common causes and solutions"}>
        <BulletList
          items={term.causesAndSolutions || [
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
