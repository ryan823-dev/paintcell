import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";
import { useI18n } from "@/i18n/context";
import { getPageMetadata } from "@/data/pageMetadata";

export default function HollowWrist() {
  const { t } = useI18n();
  const pageMeta = getPageMetadata("/resources/glossary/hollow-wrist");
  const term = t.glossaryTerms?.hollowWrist || {};
  const sections = t.glossaryTerms?.sectionTitles || {};
  const breadcrumbs = t.resources?.breadcrumbs || {};
  const pageTitle = term.title || "Hollow Wrist Robot";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": term.metaTitle || "Hollow Wrist Robot | Paint Cell Glossary",
    "description": term.metaDesc || "Definition of hollow wrist robot design and why it's essential for paint applications.",
    "inLanguage": "en",
    ...(pageMeta?.updatedAt ? { "dateModified": pageMeta.updatedAt } : {}),
    "author": {
      "@type": "Organization",
      "name": pageMeta?.authorName || "TD Engineering Team",
    },
  };

  return (
    <ResourcePageLayout
      title={pageTitle}
      metaTitle={term.metaTitle || "Hollow Wrist Robot | Paint Cell Glossary"}
      metaDescription={term.metaDesc || "Definition of hollow wrist robot design and why it's essential for paint applications."}
      breadcrumbs={[
        { label: breadcrumbs.glossary || "Glossary", href: "/resources/glossary" },
        { label: pageTitle },
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

      <ContentSection title="Best for / not ideal for / decision changes when">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Best for</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Dedicated paint robots that need clean hose routing, high path freedom, and low snag risk around complex parts and booth fixtures.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Not ideal for</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Buyers treating hollow-wrist design as a standalone quality guarantee, even when reach, payload, ATEX rating, and process package still do not fit the line.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Decision changes when</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              The decision changes when hose bundle size, atomizer type, multi-gun scope, or rail integration exceeds the robot's internal routing capacity.
            </p>
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Common misread and field check">
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-muted/30 p-5">
            <p className="mb-2 font-medium text-foreground">Common misread</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Teams often assume "paint robot" automatically means the hose routing problem is solved. In reality,
              the internal passage still has to match the real hose set, cable count, solvent routing, and end-of-arm package.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-muted/30 p-5">
            <p className="mb-2 font-medium text-foreground">How to confirm on site</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Check the robot datasheet for internal routing diameter, list the actual paint and air bundle, and verify full-motion clearance with the chosen atomizer and bracket before final robot selection.
            </p>
          </div>
        </div>
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
