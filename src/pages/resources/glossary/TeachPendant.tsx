import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Robot Teach Pendant | Paint Cell Glossary",
  "description": "Definition of robot teach pendant and its use in programming robotic painting systems."
};

export default function TeachPendant() {
  return (
    <ResourcePageLayout
      title="Robot Teach Pendant"
      metaTitle="Robot Teach Pendant | Paint Cell Glossary"
      metaDescription="Definition of robot teach pendant and its use in programming robotic painting systems."
      breadcrumbs={[
        { label: "Glossary", href: "/resources/glossary" },
        { label: "Teach Pendant" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        A teach pendant is the handheld programming device used to manually guide a robot through positions and motions, recording waypoints that form the robot's path program. In painting applications, operators use the pendant to teach spray paths by jogging the robot while observing spray coverage, then fine-tuning parameters like speed and gun triggers.
      </AnswerBox>

      <ContentSection title="Why it matters in paint cells">
        <BulletList
          items={[
            "Primary tool for creating and modifying spray paths",
            "Enables on-site path optimization based on actual results",
            "Operator skill with pendant affects path quality and teach time",
            "Modern pendants include touchscreens and simulation preview",
          ]}
        />
      </ContentSection>

      <ContentSection title="Teaching vs offline programming">
        <BulletList
          items={[
            "Pendant teaching: Hands-on, sees real part, time-consuming",
            "Offline programming: CAD-based, faster, requires calibration",
            "Most paint cells use combination: offline base path, pendant refinement",
            "Complex parts may need 4-8 hours of teach time per program",
          ]}
        />
      </ContentSection>

      <RelatedResources
        resources={[
          { title: "Paint Recipe", href: "/resources/glossary/paint-recipe" },
          { title: "Takt Time", href: "/resources/glossary/takt-time" },
          { title: "How to Choose a Paint Robot", href: "/resources/knowledge/how-to-choose-paint-robot" },
        ]}
      />
    </ResourcePageLayout>
  );
}
