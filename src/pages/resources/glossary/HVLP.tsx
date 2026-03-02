import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";
import { useI18n } from "@/i18n/context";

export default function HVLP() {
  const { t, locale } = useI18n();
  const term = t.glossaryTerms?.hvlp || {};
  const sections = t.glossaryTerms?.sectionTitles || {};
  const breadcrumbs = t.resources?.breadcrumbs || {};

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": term.metaTitle || "HVLP (High Volume Low Pressure) | Paint Cell Glossary",
    "description": term.metaDesc || "Definition of HVLP spray technology and its applications in robotic painting systems.",
    "inLanguage": locale,
  };

  return (
    <ResourcePageLayout
      title={term.title || "HVLP (High Volume Low Pressure)"}
      metaTitle={term.metaTitle || "HVLP Spraying | Paint Cell Glossary"}
      metaDescription={term.metaDesc || "Definition of HVLP spray technology and its applications in robotic painting systems."}
      breadcrumbs={[
        { label: breadcrumbs.glossary || "Glossary", href: "/resources/glossary" },
        { label: "HVLP" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        {term.answerBox || "HVLP (High Volume Low Pressure) is a spray technology that atomizes paint using high air volume at low pressure (typically below 10 psi at the air cap). This produces a softer spray pattern with less overspray and bounce-back, achieving 65%+ transfer efficiency while meeting VOC emission regulations."}
      </AnswerBox>

      <ContentSection title={sections.whyMatters || "Why it matters in paint cells"}>
        <BulletList
          items={term.whyMatters || [
            "Reduces overspray and material waste significantly",
            "Lower spray velocity reduces bounce-back on complex parts",
            "Often required to meet EPA and local VOC regulations",
            "Produces finer atomization for high-quality finishes",
          ]}
        />
      </ContentSection>

      <ContentSection title={sections.watchFor || "What to watch for"}>
        <BulletList
          items={term.watchFor || [
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
