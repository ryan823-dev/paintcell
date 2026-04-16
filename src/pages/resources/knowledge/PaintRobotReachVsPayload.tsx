import { ResourcePageLayout } from "@/components/resources";
import { LocalizedLink as Link } from "@/components/LocalizedLink";

const tradeoffRows = [
  {
    focus: "Reach-driven selection",
    whatItSolves: "Large parts, recessed surfaces, and awkward approach angles that smaller robots cannot access cleanly.",
    risk: "Can lead to oversizing if the layout or mounting concept could solve the reach problem more cheaply.",
  },
  {
    focus: "Payload-driven selection",
    whatItSolves: "Heavy end-of-arm packages, rotary bells, valve blocks, hose support, and future tooling margin.",
    risk: "Can mislead the team if the payload is validated but the robot still cannot maintain usable gun angles or clearance.",
  },
  {
    focus: "Balanced selection",
    whatItSolves: "Matches the real spray envelope and wrist package without forcing a larger arm than the cell needs.",
    risk: "Requires better process definition up front, which some teams try to skip.",
  },
];

export default function PaintRobotReachVsPayload() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Paint Robot Reach vs Payload",
    description:
      "How to judge the trade-off between paint robot reach and payload without oversizing the cell or underestimating the wrist package.",
    author: { "@type": "Organization", name: "TD Engineering Team" },
    publisher: { "@type": "Organization", name: "TD Painting System" },
    inLanguage: "en",
  };

  return (
    <ResourcePageLayout
      title="Paint Robot Reach vs Payload"
      metaTitle="Paint Robot Reach vs Payload | Selection Trade-off Guide"
      metaDescription="Learn how to compare paint robot reach vs payload, calculate the real wrist package, and avoid oversizing or under-specifying a robotic paint cell."
      breadcrumbs={[
        { label: "Resources", href: "/resources/engineering-library" },
        { label: "Knowledge" },
        { label: "Paint Robot Reach vs Payload" },
      ]}
      structuredData={structuredData}
      canonicalPath="/resources/knowledge/paint-robot-reach-vs-payload"
    >
      <p className="text-lg text-muted-foreground mb-8">
        Reach and payload look like simple catalog numbers, but paint projects often fail because the team optimizes one
        and assumes the other will take care of itself. In real cells, the two are tied to booth layout, hose routing,
        applicator choice, and maintenance access.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Understand what each number is really protecting</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full min-w-[700px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="py-3 pr-4 text-left font-semibold text-foreground">Selection focus</th>
              <th className="py-3 px-4 text-left font-semibold text-foreground">What it protects</th>
              <th className="py-3 pl-4 text-left font-semibold text-foreground">Typical mistake</th>
            </tr>
          </thead>
          <tbody>
            {tradeoffRows.map((row) => (
              <tr key={row.focus} className="border-b border-border align-top">
                <td className="py-4 pr-4 font-medium text-foreground">{row.focus}</td>
                <td className="py-4 px-4 text-muted-foreground">{row.whatItSolves}</td>
                <td className="py-4 pl-4 text-muted-foreground">{row.risk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-semibold text-foreground mb-4">What belongs in the real payload calculation</h2>
      <ul className="space-y-3 text-muted-foreground mb-10">
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>The applicator itself, whether that is a spray gun, rotary bell, or combined process head.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>Brackets, valves, cable packages, and any hose-management hardware riding with the wrist.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>Safety margin for dynamic movement, cleaning accessories, and future process changes that add hardware later.</span>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Why oversizing one robot is not always the safe answer</h2>
      <p className="text-muted-foreground mb-4">
        A bigger robot can hide weak process definition. It may solve reach on paper, but it can also create tighter
        service access, unnecessary booth size, slower motion on small parts, and higher integration cost than the line
        actually needs.
      </p>
      <p className="text-muted-foreground mb-10">
        Many projects do better by fixing part presentation, using a different mounting concept, or splitting part
        families before they jump to the next robot size.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mb-4">A practical decision rule</h2>
      <p className="text-muted-foreground mb-10">
        If the robot only works when the wrist is near its payload limit or the spray path uses compromised gun angles,
        the project is not balanced yet. Reach, payload, hose routing, and booth access should all make sense together.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Read next</h2>
      <ul className="space-y-3 text-muted-foreground">
        <li><Link to="/resources/knowledge/how-to-choose-paint-robot" className="text-primary underline underline-offset-4">How to choose a paint robot</Link> for the full selection framework.</li>
        <li><Link to="/resources/knowledge/industrial-robot-brands" className="text-primary underline underline-offset-4">Industrial robot brands for paint shops</Link> for shortlist-stage brand comparison.</li>
        <li><Link to="/solutions/paint-robot-integration" className="text-primary underline underline-offset-4">Paint robot integration</Link> when the trade-off needs to be tested against full cell scope.</li>
      </ul>
    </ResourcePageLayout>
  );
}
