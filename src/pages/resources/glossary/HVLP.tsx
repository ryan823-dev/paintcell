import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "HVLP (High Volume Low Pressure) | Paint Cell Glossary",
  "description": "Definition of HVLP spray technology and its applications in robotic painting systems."
};

export default function HVLP() {
  return (
    <ResourcePageLayout
      title="HVLP (High Volume Low Pressure)"
      metaTitle="HVLP Spraying | Paint Cell Glossary"
      metaDescription="Definition of HVLP spray technology and its applications in robotic painting systems."
      breadcrumbs={[
        { label: "Glossary", href: "/resources/glossary" },
        { label: "HVLP" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        HVLP (High Volume Low Pressure) is a spray technology that atomizes paint using high air volume at low pressure (typically below 10 psi at the air cap). This produces a softer spray pattern with less overspray and bounce-back, achieving 65%+ transfer efficiency while meeting VOC emission regulations.
      </AnswerBox>

      <ContentSection title="Why it matters in paint cells">
        <BulletList
          items={[
            "Reduces overspray and material waste significantly",
            "Lower spray velocity reduces bounce-back on complex parts",
            "Often required to meet EPA and local VOC regulations",
            "Produces finer atomization for high-quality finishes",
          ]}
        />
      </ContentSection>

      <ContentSection title="What to watch for">
        <BulletList
          items={[
            "Requires higher air volume than conventional spray guns",
            "May need closer gun-to-part distance for proper atomization",
            "Flow rate and fan pattern adjustments differ from conventional",
            "Not ideal for very high-viscosity coatings without heating",
          ]}
        />
      </ContentSection>

      <RelatedResources
        resources={[
          { title: "Atomization", href: "/resources/glossary/atomization" },
          { title: "Transfer Efficiency", href: "/resources/glossary/transfer-efficiency" },
          { title: "VOC & Solvent Handling", href: "/resources/standards-compliance/voc-solvent-handling" },
        ]}
      />
    </ResourcePageLayout>
  );
}
