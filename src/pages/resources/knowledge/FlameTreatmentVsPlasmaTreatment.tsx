import { ResourcePageLayout } from "@/components/resources";
import { LocalizedLink as Link } from "@/components/LocalizedLink";

const comparisonRows = [
  {
    process: "Flame treatment",
    strength: "Often preferred for robust activation on polyolefin parts and lines that value speed, simplicity, and lower process cost.",
    watchOut: "Thermal input must be controlled carefully on heat-sensitive or thin-walled substrates.",
  },
  {
    process: "Plasma treatment",
    strength: "Often preferred when the substrate is heat-sensitive, treatment needs to be localized, or the project wants a lower-thermal process.",
    watchOut: "Can bring higher equipment complexity or cost, so the quality gain must matter enough to justify it.",
  },
];

export default function FlameTreatmentVsPlasmaTreatment() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Flame Treatment vs Plasma Treatment",
    description:
      "Comparison of flame treatment and plasma treatment for paint adhesion on plastic parts, with guidance on substrate fit, heat sensitivity, and line integration.",
    author: { "@type": "Organization", name: "TD Engineering Team" },
    publisher: { "@type": "Organization", name: "TD Painting System" },
    inLanguage: "en",
  };

  return (
    <ResourcePageLayout
      title="Flame Treatment vs Plasma Treatment"
      metaTitle="Flame Treatment vs Plasma Treatment | Adhesion and Pretreatment Guide"
      metaDescription="Compare flame treatment vs plasma treatment for plastic-part coating lines by substrate fit, heat sensitivity, operating cost, and integration strategy."
      breadcrumbs={[
        { label: "Resources", href: "/resources/engineering-library" },
        { label: "Knowledge" },
        { label: "Flame Treatment vs Plasma Treatment" },
      ]}
      structuredData={structuredData}
      canonicalPath="/resources/knowledge/flame-treatment-vs-plasma-treatment"
    >
      <p className="text-lg text-muted-foreground mb-8">
        Flame and plasma treatment both exist to improve adhesion, but they solve it in different ways. The right
        choice depends on substrate behavior, thermal sensitivity, geometry, cycle time, and how tightly pretreatment
        must connect to the paint process.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Start with substrate and line behavior, not just technology preference</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full min-w-[700px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="py-3 pr-4 text-left font-semibold text-foreground">Process</th>
              <th className="py-3 px-4 text-left font-semibold text-foreground">Often strong when</th>
              <th className="py-3 pl-4 text-left font-semibold text-foreground">Main watch-out</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row.process} className="border-b border-border align-top">
                <td className="py-4 pr-4 font-medium text-foreground">{row.process}</td>
                <td className="py-4 px-4 text-muted-foreground">{row.strength}</td>
                <td className="py-4 pl-4 text-muted-foreground">{row.watchOut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Choose flame treatment when</h2>
      <ul className="space-y-3 text-muted-foreground mb-10">
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>The line coats PP, PE, TPO, or similar low-surface-energy plastics and needs a robust, production-friendly activation step.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>Cycle time and operating simplicity matter more than the extra precision of a more specialized surface-treatment method.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>The project wants pretreatment integrated tightly with robotic handling or painting in the same production cell.</span>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Choose plasma treatment when</h2>
      <ul className="space-y-3 text-muted-foreground mb-10">
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>The substrate is more heat-sensitive, has localized treatment requirements, or cannot tolerate the thermal window of flame treatment.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>The geometry or quality target benefits from a more selective non-thermal activation approach.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>The project can justify higher process complexity because adhesion stability or cosmetic risk is otherwise too costly.</span>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Questions that usually settle the decision</h2>
      <ol className="space-y-3 list-decimal pl-6 text-muted-foreground mb-10">
        <li>Which substrate family actually fails adhesion today, and how sensitive is it to heat?</li>
        <li>How much time can pass between treatment and painting before quality becomes unstable?</li>
        <li>Does the line need a standalone pretreatment station or a more integrated robotic cell?</li>
        <li>Will the chosen method still make sense after maintenance, safety, and cycle-time impact are priced honestly?</li>
      </ol>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Read next</h2>
      <ul className="space-y-3 text-muted-foreground">
        <li><Link to="/resources/knowledge/flame-treatment" className="text-primary underline underline-offset-4">Flame treatment</Link> for the core process guide.</li>
        <li><Link to="/resources/knowledge/paint-technology-guide" className="text-primary underline underline-offset-4">Paint technology guide</Link> for chemistry and adhesion context.</li>
        <li><Link to="/industries/automotive-exterior-parts" className="text-primary underline underline-offset-4">Automotive exterior parts</Link> for a real industry landing page where pretreatment choices matter.</li>
      </ul>
    </ResourcePageLayout>
  );
}
