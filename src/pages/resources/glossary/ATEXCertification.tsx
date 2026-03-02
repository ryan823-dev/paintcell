import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";
import { useI18n } from "@/i18n/context";

export default function ATEXCertification() {
  const { t, locale } = useI18n();
  const term = t.glossaryTerms?.atexCertification || {};
  const sections = t.glossaryTerms?.sectionTitles || {};
  const breadcrumbs = t.resources?.breadcrumbs || {};

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": term.metaTitle || "ATEX Certification | Paint Cell Glossary",
    "description": term.metaDesc || "Definition of ATEX certification requirements for paint booths and robotic spray painting equipment.",
    "inLanguage": locale,
  };

  return (
    <ResourcePageLayout
      title={term.title || "ATEX Certification"}
      metaTitle={term.metaTitle || "ATEX Certification | Paint Cell Glossary"}
      metaDescription={term.metaDesc || "Definition of ATEX certification requirements for paint booths and robotic spray painting equipment."}
      breadcrumbs={[
        { label: breadcrumbs.glossary || "Glossary", href: "/resources/glossary" },
        { label: term.title || "ATEX Certification" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        {term.answerBox || "ATEX (Atmosphères Explosibles) is the EU directive requiring equipment used in explosive atmospheres to meet specific safety standards. In paint cells using solvent-based coatings, ATEX-rated robots, electrical equipment, and ventilation systems are mandatory to prevent ignition of flammable vapor-air mixtures."}
      </AnswerBox>

      <ContentSection title={sections.whyMatters || "Why it matters in paint cells"}>
        <BulletList
          items={term.whyMatters || [
            "Legal requirement for installations in EU and many other regions",
            "Solvent vapors create Zone 1 or Zone 2 explosive atmospheres",
            "Non-ATEX robots cannot legally operate in classified zones",
            "Affects robot selection, electrical design, and overall cost",
          ]}
        />
      </ContentSection>

      <ContentSection title={sections.zoneClassifications || "Zone classifications"}>
        <BulletList
          items={term.zoneClassifications || [
            "Zone 0: Explosive atmosphere present continuously (rare in paint cells)",
            "Zone 1: Explosive atmosphere likely during normal operation (spray zone)",
            "Zone 2: Explosive atmosphere unlikely, only under fault conditions",
            "Zone classification determines required equipment protection level",
          ]}
        />
      </ContentSection>

      <ContentSection title={sections.watchFor || "What to watch for"}>
        <BulletList
          items={term.watchFor || [
            "Robot manufacturers offer ATEX variants at premium pricing",
            "Electrical installation must follow IEC 60079 standards",
            "Ventilation design critical to limit explosive atmosphere extent",
            "Waterborne paints may reduce but not eliminate ATEX requirements",
          ]}
        />
      </ContentSection>

      <RelatedResources
        resources={[
          { title: "VOC & Solvent Handling", href: "/resources/standards-compliance/voc-solvent-handling" },
          { title: "Ventilation & Airflow", href: "/resources/standards-compliance/ventilation-airflow" },
          { title: "Paint Booth Design Basics", href: "/resources/knowledge/paint-booth-design-basics" },
        ]}
      />
    </ResourcePageLayout>
  );
}
