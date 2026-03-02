import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";
import { useI18n } from "@/i18n/context";

export default function HollowWrist() {
  const { t, locale } = useI18n();
  const term = t.glossaryTerms?.hollowWrist || {};
  const sections = t.glossaryTerms?.sectionTitles || {};
  const breadcrumbs = t.resources?.breadcrumbs || {};

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": term.metaTitle || "Hollow Wrist Robot | Paint Cell Glossary",
    "description": term.metaDesc || "Definition of hollow wrist robot design and why it's essential for paint applications.",
    "inLanguage": locale,
  };

  return (
    <ResourcePageLayout
      title={term.title || "Hollow Wrist Robot"}
      metaTitle={term.metaTitle || "Hollow Wrist Robot | Paint Cell Glossary"}
      metaDescription={term.metaDesc || "Definition of hollow wrist robot design and why it's essential for paint applications."}
      breadcrumbs={[
        { label: breadcrumbs.glossary || "Glossary", href: "/resources/glossary" },
        { label: term.title || "Hollow Wrist" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        {term.answerBox || "A hollow wrist robot features an internal passage through the wrist joint (axis 4-5-6) that allows paint hoses, air lines, and cables to be routed inside the robot arm rather than externally. This design prevents cable interference, reduces snagging risks, and enables smooth motion around complex part geometries essential for painting applications."}
      </AnswerBox>

      <ContentSection title={sections.whyMatters || "Why it matters in paint cells"}>
        <BulletList
          items={term.whyMatters || [
            "External hoses can catch on parts or fixtures during complex paths",
            "Internal routing protects lines from paint overspray and solvents",
            "Enables tighter robot motions without cable stretch or interference",
            "Standard feature on dedicated paint robots (ABB IRB 5500, FANUC P-series)",
          ]}
        />
      </ContentSection>

      <ContentSection title={sections.hollowWristSpecs || "Hollow wrist specifications"}>
        <BulletList
          items={term.hollowWristSpecs || [
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
