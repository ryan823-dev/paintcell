import { ResourcePageLayout } from "@/components/resources";
import { LocalizedLink as Link } from "@/components/LocalizedLink";

const wristRows = [
  {
    design: "Hollow wrist",
    strongerWhen:
      "The cell needs cleaner internal hose routing, lower snag risk, and a painting-specific package that stays practical inside the booth.",
    tradeoff:
      "Can narrow model options or shift cost, so the value depends on how much hose management and finish stability matter in the actual line.",
  },
  {
    design: "Non-hollow wrist",
    strongerWhen:
      "The application is simpler, the dress package is manageable externally, or the line prioritizes broader robot choice over paint-specific wrist design.",
    tradeoff:
      "External routing can become a maintenance, contamination, or motion-clearance problem if the booth and dress package are not disciplined.",
  },
];

export default function HollowWristVsNonHollowWristPainting() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Hollow Wrist vs Non-hollow Wrist for Painting",
    description:
      "Compare hollow wrist and non-hollow wrist robot designs for painting applications based on hose routing, snag risk, maintainability, and booth practicality.",
    author: { "@type": "Organization", name: "TD Engineering Team" },
    publisher: { "@type": "Organization", name: "TD Painting System" },
    inLanguage: "en",
  };

  return (
    <ResourcePageLayout
      title="Hollow Wrist vs Non-hollow Wrist for Painting"
      metaTitle="Hollow Wrist vs Non-hollow Wrist for Painting | Robot Selection Guide"
      metaDescription="Learn when a hollow wrist robot is worth it for painting, and when a non-hollow wrist package can still be the right choice."
      breadcrumbs={[
        { label: "Resources", href: "/resources/engineering-library" },
        { label: "Knowledge" },
        { label: "Hollow Wrist vs Non-hollow Wrist for Painting" },
      ]}
      structuredData={structuredData}
      canonicalPath="/resources/knowledge/hollow-wrist-vs-non-hollow-wrist-painting"
    >
      <p className="text-lg text-muted-foreground mb-8">
        This comparison is really about dress package discipline. The wrist design matters because paint cells punish
        bad hose routing more quickly than many other robot applications.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Compare the wrist designs by cell practicality</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full min-w-[700px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="py-3 pr-4 text-left font-semibold text-foreground">Wrist design</th>
              <th className="py-3 px-4 text-left font-semibold text-foreground">Usually stronger when</th>
              <th className="py-3 pl-4 text-left font-semibold text-foreground">Trade-off to check</th>
            </tr>
          </thead>
          <tbody>
            {wristRows.map((row) => (
              <tr key={row.design} className="border-b border-border align-top">
                <td className="py-4 pr-4 font-medium text-foreground">{row.design}</td>
                <td className="py-4 px-4 text-muted-foreground">{row.strongerWhen}</td>
                <td className="py-4 pl-4 text-muted-foreground">{row.tradeoff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Why hollow wrists are often favored in paint cells</h2>
      <ul className="space-y-3 text-muted-foreground mb-10">
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>Internal routing reduces snag risk around fixtures, booth walls, and rotating part presentations.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>Cleaner dress packages usually help maintenance teams keep the robot practical in overspray-heavy environments.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>They often make paint-specific end-of-arm packages easier to manage over long production life.</span>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-foreground mb-4">When non-hollow wrist robots can still work well</h2>
      <p className="text-muted-foreground mb-4">
        Non-hollow wrist designs can still be viable when the dress package is simple, the booth geometry is forgiving,
        and the integrator has a disciplined external routing strategy that does not create service headaches later.
      </p>
      <p className="text-muted-foreground mb-10">
        They become risky when external hoses start solving the wrong problem by brute force instead of good cell design.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Questions to answer before you choose</h2>
      <ol className="space-y-3 list-decimal pl-6 text-muted-foreground mb-10">
        <li>How complex is the full paint package at the wrist once hoses, valves, and accessories are included?</li>
        <li>Does the booth layout create many opportunities for hose rub, snag, or difficult maintenance access?</li>
        <li>Will the line stay practical after years of color changes, cleaning cycles, and mixed-model changeovers?</li>
      </ol>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Read next</h2>
      <ul className="space-y-3 text-muted-foreground">
        <li><Link to="/resources/knowledge/how-to-choose-paint-robot" className="text-primary underline underline-offset-4">How to choose a paint robot</Link> for the full selection workflow.</li>
        <li><Link to="/resources/knowledge/paint-robot-reach-vs-payload" className="text-primary underline underline-offset-4">Paint robot reach vs payload</Link> for the key sizing trade-off.</li>
        <li><Link to="/resources/glossary/hollow-wrist" className="text-primary underline underline-offset-4">Hollow wrist glossary</Link> for the core term definition.</li>
      </ul>
    </ResourcePageLayout>
  );
}
