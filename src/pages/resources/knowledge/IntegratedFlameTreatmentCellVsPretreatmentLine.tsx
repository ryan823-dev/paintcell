import { ResourcePageLayout } from "@/components/resources";
import { LocalizedLink as Link } from "@/components/LocalizedLink";

const lineRows = [
  {
    option: "Integrated flame-treatment cell",
    strongerWhen:
      "The project needs tight control between activation and coating, lower handling risk, and a compact layout around robotic painting.",
    watchOut:
      "The cell has to balance pretreatment and painting takt together, so line bottlenecks become more coupled.",
  },
  {
    option: "Separate pretreatment line",
    strongerWhen:
      "The factory needs pretreatment to serve multiple downstream processes or wants to isolate activation as a standalone capacity block.",
    watchOut:
      "Extra transfer steps can weaken the treatment-to-paint window and add contamination or timing variation.",
  },
];

export default function IntegratedFlameTreatmentCellVsPretreatmentLine() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Integrated Flame-treatment Cell vs Pretreatment Line",
    description:
      "Decision guide for choosing between an integrated flame-treatment cell and a separate pretreatment line for plastic-part coating projects.",
    author: { "@type": "Organization", name: "TD Engineering Team" },
    publisher: { "@type": "Organization", name: "TD Painting System" },
    inLanguage: "en",
  };

  return (
    <ResourcePageLayout
      title="Integrated Flame-treatment Cell vs Pretreatment Line"
      metaTitle="Integrated Flame-treatment Cell vs Pretreatment Line | Layout Decision Guide"
      metaDescription="Choose between an integrated flame-treatment cell and a separate pretreatment line by comparing handling risk, timing control, capacity logic, and contamination exposure."
      breadcrumbs={[
        { label: "Resources", href: "/resources/engineering-library" },
        { label: "Knowledge" },
        { label: "Integrated Flame-treatment Cell vs Pretreatment Line" },
      ]}
      structuredData={structuredData}
      canonicalPath="/resources/knowledge/integrated-flame-treatment-cell-vs-pretreatment-line"
    >
      <p className="text-lg text-muted-foreground mb-8">
        This decision is mostly about timing discipline. If adhesion performance depends on what happens between
        activation and coating, layout choice becomes a process-control decision, not just an equipment decision.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Choose the layout that protects the treatment-to-paint window</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="py-3 pr-4 text-left font-semibold text-foreground">Layout option</th>
              <th className="py-3 px-4 text-left font-semibold text-foreground">Usually stronger when</th>
              <th className="py-3 pl-4 text-left font-semibold text-foreground">Main watch-out</th>
            </tr>
          </thead>
          <tbody>
            {lineRows.map((row) => (
              <tr key={row.option} className="border-b border-border align-top">
                <td className="py-4 pr-4 font-medium text-foreground">{row.option}</td>
                <td className="py-4 px-4 text-muted-foreground">{row.strongerWhen}</td>
                <td className="py-4 pl-4 text-muted-foreground">{row.watchOut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Integrated cells are often better when</h2>
      <ul className="space-y-3 text-muted-foreground mb-10">
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>The line wants to minimize part handling and contamination between surface activation and paint application.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>Adhesion stability is more valuable than giving pretreatment its own independent conveyor block.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>Floor space is limited and the project benefits from shared robots, controls, or handling logic.</span>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Separate pretreatment lines are often better when</h2>
      <ul className="space-y-3 text-muted-foreground mb-10">
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>The pretreatment step must serve multiple downstream lines or product families with different paint paths.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>Capacity planning is easier when activation is buffered separately instead of being locked to a shared paint takt.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>The plant has enough handling control that extra transfer does not collapse adhesion consistency.</span>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Questions that matter more than layout preference</h2>
      <ol className="space-y-3 list-decimal pl-6 text-muted-foreground mb-10">
        <li>How quickly must the part move from treatment to coating before adhesion risk rises?</li>
        <li>How much dust, storage, or handling variation does the current factory flow add between those steps?</li>
        <li>Is pretreatment capacity the real bottleneck, or is the bigger risk losing process stability between stations?</li>
      </ol>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Read next</h2>
      <ul className="space-y-3 text-muted-foreground">
        <li><Link to="/resources/knowledge/flame-treatment" className="text-primary underline underline-offset-4">Flame treatment</Link> for the core process guide.</li>
        <li><Link to="/resources/knowledge/flame-treatment-vs-plasma-treatment" className="text-primary underline underline-offset-4">Flame treatment vs plasma treatment</Link> for method selection.</li>
        <li><Link to="/solutions/robotic-painting-system" className="text-primary underline underline-offset-4">Robotic painting system</Link> when the layout choice needs to connect to the full line scope.</li>
      </ul>
    </ResourcePageLayout>
  );
}
