import { ResourcePageLayout } from "@/components/resources";
import { LocalizedLink as Link } from "@/components/LocalizedLink";

const comparisonRows = [
  {
    type: "Downdraft",
    bestFor: "Appearance-critical finishes, tighter overspray control, and buyers that can support higher booth infrastructure scope.",
    tradeoff: "Usually brings the cleanest spray zone, but asks more from plenums, exhaust layout, and building coordination.",
  },
  {
    type: "Crossdraft",
    bestFor: "Industrial coatings where lower installation complexity matters and the finish target is less cosmetic.",
    tradeoff: "Can be cost-effective, but part orientation and spray direction must prevent overspray from traveling across the workpiece.",
  },
  {
    type: "Side-draft",
    bestFor: "Large or awkward parts, retrofit sites, and projects where full downdraft floor scope is unrealistic.",
    tradeoff: "Practical for bulky work, but the layout has to prevent stagnant zones and poor visibility near the exhaust path.",
  },
];

export default function DowndraftVsCrossdraftVsSideDraft() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Downdraft vs Crossdraft vs Side-draft Paint Booths",
    description:
      "Practical comparison of downdraft, crossdraft, and side-draft paint booth designs for robotic painting projects.",
    author: { "@type": "Organization", name: "TD Engineering Team" },
    publisher: { "@type": "Organization", name: "TD Painting System" },
    inLanguage: "en",
  };

  return (
    <ResourcePageLayout
      title="Downdraft vs Crossdraft vs Side-draft Paint Booths"
      metaTitle="Downdraft vs Crossdraft vs Side-draft Paint Booths | Comparison Guide"
      metaDescription="Compare downdraft, crossdraft, and side-draft paint booths by finish target, retrofit practicality, overspray behavior, and facility scope."
      breadcrumbs={[
        { label: "Resources", href: "/resources/engineering-library" },
        { label: "Knowledge" },
        { label: "Downdraft vs Crossdraft vs Side-draft Paint Booths" },
      ]}
      structuredData={structuredData}
      canonicalPath="/resources/knowledge/downdraft-vs-crossdraft-vs-side-draft"
    >
      <p className="text-lg text-muted-foreground mb-8">
        Booth-type selection is rarely about which airflow pattern sounds most advanced. It is about which pattern
        keeps finish quality, overspray capture, maintenance access, and facility scope aligned for the actual line.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Compare airflow patterns by project fit</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full min-w-[680px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="py-3 pr-4 text-left font-semibold text-foreground">Booth type</th>
              <th className="py-3 px-4 text-left font-semibold text-foreground">Usually best for</th>
              <th className="py-3 pl-4 text-left font-semibold text-foreground">Main trade-off</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row.type} className="border-b border-border align-top">
                <td className="py-4 pr-4 font-medium text-foreground">{row.type}</td>
                <td className="py-4 px-4 text-muted-foreground">{row.bestFor}</td>
                <td className="py-4 pl-4 text-muted-foreground">{row.tradeoff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-semibold text-foreground mb-4">When downdraft is worth paying for</h2>
      <p className="text-muted-foreground mb-4">
        Downdraft becomes compelling when the buyer is chasing appearance quality, tighter overspray control, and more
        stable robot conditions around decorative or defect-sensitive finishes.
      </p>
      <p className="text-muted-foreground mb-10">
        It is less compelling when the building cannot absorb the extra floor, plenum, or exhaust complexity without
        turning the booth into a facility project first.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mb-4">When crossdraft or side-draft is the smarter answer</h2>
      <ul className="space-y-3 text-muted-foreground mb-10">
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>Crossdraft is often good enough for industrial protective coatings if the spray path and part loading avoid dirty airflow across the finish surface.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>Side-draft is often more realistic for large parts or retrofit buildings where a downdraft floor solution is structurally difficult.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>Both alternatives require more discipline around part orientation, exhaust placement, and service visibility.</span>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-foreground mb-4">What buyers should validate before approving the booth type</h2>
      <ol className="space-y-3 list-decimal pl-6 text-muted-foreground mb-10">
        <li>How sensitive is the finish to airborne contamination and overspray recirculation?</li>
        <li>Can the building support the makeup air and exhaust path the preferred booth type needs?</li>
        <li>Will robot access, part loading, and filter maintenance still work after the airflow pattern is fixed?</li>
        <li>Does the chosen booth type still make sense once the full <Link to="/solutions/paint-booth-automation" className="text-primary underline underline-offset-4">paint booth automation</Link> scope is priced honestly?</li>
      </ol>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Read next</h2>
      <ul className="space-y-3 text-muted-foreground">
        <li><Link to="/resources/knowledge/paint-booth-design-basics" className="text-primary underline underline-offset-4">Paint booth design basics</Link> for the full booth-scoping guide.</li>
        <li><Link to="/resources/standards-compliance/ventilation-airflow" className="text-primary underline underline-offset-4">Ventilation and airflow</Link> for facility-level constraints.</li>
        <li><Link to="/resources/equipment/paint-booth-filtration" className="text-primary underline underline-offset-4">Paint booth filtration</Link> for filter strategy and maintenance trade-offs.</li>
      </ul>
    </ResourcePageLayout>
  );
}
