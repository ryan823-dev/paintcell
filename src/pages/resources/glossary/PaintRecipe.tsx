import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";
import { useI18n } from "@/i18n/context";

export default function PaintRecipe() {
  const { t, locale } = useI18n();
  const term = t.glossaryTerms?.paintRecipe || {};
  const sections = t.glossaryTerms?.sectionTitles || {};
  const breadcrumbs = t.resources?.breadcrumbs || {};

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": term.metaTitle || "Paint Recipe Management | Paint Cell Glossary",
    "description": term.metaDesc || "Definition of paint recipe management in automated robotic painting systems.",
    "inLanguage": locale,
  };

  return (
    <ResourcePageLayout
      title={term.title || "Paint Recipe"}
      metaTitle={term.metaTitle || "Paint Recipe Management | Paint Cell Glossary"}
      metaDescription={term.metaDesc || "Definition of paint recipe management in automated robotic painting systems."}
      breadcrumbs={[
        { label: breadcrumbs.glossary || "Glossary", href: "/resources/glossary" },
        { label: term.title || "Paint Recipe" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        {term.answerBox || "A paint recipe is a stored set of process parameters that define how a specific part should be painted, including robot path, spray gun settings (flow rate, atomization pressure, fan width), booth conditions, and curing parameters. Recipe management enables consistent quality across production runs and simplifies changeover between part types."}
      </AnswerBox>

      <ContentSection title={sections.whyMatters || "Why it matters in paint cells"}>
        <BulletList
          items={term.whyMatters || [
            "Ensures repeatability when returning to previously painted parts",
            "Reduces setup time for high-mix production environments",
            "Enables traceability by linking batch records to specific recipes",
            "Facilitates continuous improvement through parameter optimization",
          ]}
        />
      </ContentSection>

      <ContentSection title={sections.typicalRecipeParams || "Typical recipe parameters"}>
        <BulletList
          items={term.typicalRecipeParams || [
            "Robot program selection and TCP speed settings",
            "Fluid flow rate and atomization air pressure",
            "Electrostatic voltage (if applicable)",
            "Number of passes and overlap percentage",
            "Flash-off time and cure temperature/duration",
            "Color and material identification codes",
          ]}
        />
      </ContentSection>

      <RelatedResources
        resources={[
          { title: "Color Changeover", href: "/resources/glossary/color-changeover" },
          { title: "Takt Time", href: "/resources/glossary/takt-time" },
          { title: "How to Choose a Paint Robot", href: "/resources/knowledge/how-to-choose-paint-robot" },
        ]}
      />
    </ResourcePageLayout>
  );
}
