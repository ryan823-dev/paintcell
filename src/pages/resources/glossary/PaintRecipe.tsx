import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Paint Recipe | Paint Cell Glossary",
  "description": "Definition of paint recipe management in automated robotic painting systems."
};

export default function PaintRecipe() {
  return (
    <ResourcePageLayout
      title="Paint Recipe"
      metaTitle="Paint Recipe Management | Paint Cell Glossary"
      metaDescription="Definition of paint recipe management in automated robotic painting systems."
      breadcrumbs={[
        { label: "Glossary", href: "/resources/glossary" },
        { label: "Paint Recipe" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        A paint recipe is a stored set of process parameters that define how a specific part should be painted, including robot path, spray gun settings (flow rate, atomization pressure, fan width), booth conditions, and curing parameters. Recipe management enables consistent quality across production runs and simplifies changeover between part types.
      </AnswerBox>

      <ContentSection title="Why it matters in paint cells">
        <BulletList
          items={[
            "Ensures repeatability when returning to previously painted parts",
            "Reduces setup time for high-mix production environments",
            "Enables traceability by linking batch records to specific recipes",
            "Facilitates continuous improvement through parameter optimization",
          ]}
        />
      </ContentSection>

      <ContentSection title="Typical recipe parameters">
        <BulletList
          items={[
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
