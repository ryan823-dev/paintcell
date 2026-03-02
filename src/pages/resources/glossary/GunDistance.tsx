import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";
import { useI18n } from "@/i18n/context";

export default function GunDistance() {
  const { t, locale } = useI18n();
  const term = t.glossaryTerms?.gunDistance || {};
  const sections = t.glossaryTerms?.sectionTitles || {};
  const breadcrumbs = t.resources?.breadcrumbs || {};

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": term.metaTitle || "Gun Distance | Paint Cell Glossary",
    "description": term.metaDesc || "Definition of gun-to-part distance and its impact on spray painting quality.",
    "inLanguage": locale,
  };

  return (
    <ResourcePageLayout
      title={term.title || "Gun Distance"}
      metaTitle={term.metaTitle || "Gun Distance | Paint Cell Glossary"}
      metaDescription={term.metaDesc || "Definition of gun-to-part distance and its impact on spray painting quality."}
      breadcrumbs={[
        { label: breadcrumbs.glossary || "Glossary", href: "/resources/glossary" },
        { label: term.title || "Gun Distance" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        {term.answerBox || "Gun distance (also called standoff distance) is the perpendicular distance from the spray gun tip to the workpiece surface, typically measured in millimeters. Optimal gun distance varies by spray technology (150-300mm for conventional, 200-350mm for electrostatic) and significantly affects atomization quality, transfer efficiency, and finish appearance."}
      </AnswerBox>

      <ContentSection title={sections.whyMatters || "Why it matters in paint cells"}>
        <BulletList
          items={term.whyMatters || [
            "Too close: wet, heavy film with runs and sags",
            "Too far: dry spray, poor flow, orange peel texture",
            "Robot path must maintain consistent distance on contoured parts",
            "Distance variation is primary cause of film build inconsistency",
          ]}
        />
      </ContentSection>

      <ContentSection title={sections.distanceOptimization || "Distance optimization factors"}>
        <BulletList
          items={term.distanceOptimization || [
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
