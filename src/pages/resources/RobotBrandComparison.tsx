import { ResourcePageLayout } from "@/components/resources";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Card, CardContent } from "@/components/ui/card";

const brandRows = [
  {
    brand: "ABB",
    strength: "Often strong in mature automotive paint shops and projects that value established paint application workflows.",
    watchOut: "Usually sits in a premium position, so the value case depends on how much ecosystem depth the plant will really use.",
    fit: "Good fit when the team wants proven paint-line references, broad offline programming support, and strong service coverage.",
  },
  {
    brand: "FANUC",
    strength: "Common choice for plants that already standardize on FANUC or want a broad industrial support footprint.",
    watchOut: "The best answer still depends on local paint-package experience, not just the general installed base.",
    fit: "Good fit when integration familiarity, support availability, and multi-cell standardization matter.",
  },
  {
    brand: "KUKA",
    strength: "Can be attractive in factories with an existing KUKA automation base or integrator preference.",
    watchOut: "Practical fit depends heavily on the local partner's painting experience and the exact booth application.",
    fit: "Good fit when the project benefits from consistency with the plant's broader robotics platform.",
  },
  {
    brand: "Yaskawa",
    strength: "Often considered for pragmatic industrial coating lines that need solid value and dependable motion performance.",
    watchOut: "Selection should still verify paint-process tooling, programming flow, and local application support.",
    fit: "Good fit when the buyer wants a balanced package and already has confidence in regional support.",
  },
  {
    brand: "Kawasaki",
    strength: "Has paint-specific history in some markets and can be competitive on targeted projects.",
    watchOut: "Support depth and ecosystem familiarity can vary more by region than with the largest global players.",
    fit: "Good fit when a local partner has strong experience with the exact painting application and support model.",
  },
];

const shortlistChecks = [
  "Does the robot package match the real booth classification and paint chemistry?",
  "Can the chosen platform handle the end-of-arm package, hose routing, and service access cleanly?",
  "Will operators and maintenance staff be able to program and support the cell without creating a dependency bottleneck?",
  "Is local service support strong enough for the plant's uptime expectations and spare-part strategy?",
];

export default function RobotBrandComparison() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Industrial Robot Brands for Paint Shops",
    description:
      "Decision-stage comparison of ABB, FANUC, KUKA, Yaskawa, and Kawasaki for paint-shop applications, with a focus on application fit rather than brand-first selection.",
    author: { "@type": "Organization", name: "TD Engineering Team" },
    publisher: { "@type": "Organization", name: "TD Painting System" },
    inLanguage: "en",
  };

  return (
    <ResourcePageLayout
      title="Industrial Robot Brands for Paint Shops"
      metaTitle="Industrial Robot Brands for Paint Shops | ABB vs FANUC vs KUKA vs Yaskawa"
      metaDescription="Compare industrial robot brands for paint-shop applications the right way: by application fit, service model, programming workflow, and paint-line integration."
      breadcrumbs={[
        { label: "Resources", href: "/resources/engineering-library" },
        { label: "Knowledge" },
        { label: "Industrial Robot Brands for Paint Shops" },
      ]}
      structuredData={structuredData}
      canonicalPath="/resources/knowledge/industrial-robot-brands"
    >
      <p className="text-lg text-muted-foreground mb-8">
        Brand comparison helps only after the project already understands part family, booth constraints, end-of-arm
        load, and service expectations. A robot brand is not a substitute for application fit.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Use brand comparison as a shortlist tool</h2>
      <p className="text-muted-foreground mb-6">
        Buyers usually get better results when they narrow the field with reach, payload, zone rating, mounting concept,
        and programming workflow first. Brand choice becomes useful after the obvious misfits are already removed.
      </p>

      <div className="overflow-x-auto mb-10">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="py-3 pr-4 text-left font-semibold text-foreground">Brand</th>
              <th className="py-3 px-4 text-left font-semibold text-foreground">Often strong when</th>
              <th className="py-3 px-4 text-left font-semibold text-foreground">Buyer concern to check</th>
              <th className="py-3 pl-4 text-left font-semibold text-foreground">Typical fit</th>
            </tr>
          </thead>
          <tbody>
            {brandRows.map((row) => (
              <tr key={row.brand} className="border-b border-border align-top">
                <td className="py-4 pr-4 font-medium text-foreground">{row.brand}</td>
                <td className="py-4 px-4 text-muted-foreground">{row.strength}</td>
                <td className="py-4 px-4 text-muted-foreground">{row.watchOut}</td>
                <td className="py-4 pl-4 text-muted-foreground">{row.fit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Questions that matter more than the logo on the arm</h2>
      <div className="grid gap-4 md:grid-cols-2 mb-10">
        {shortlistChecks.map((item) => (
          <Card key={item} className="border-border">
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-semibold text-foreground mb-4">What a healthy brand decision looks like</h2>
      <p className="text-muted-foreground mb-4">
        The strongest decisions normally end with two or three viable brands that already fit the line technically.
        At that point, the buyer can compare support quality, integrator familiarity, installed base, and commercial
        terms without drifting back into generic marketing claims.
      </p>
      <p className="text-muted-foreground mb-10">
        If the conversation is still mostly about logo preference, the project probably needs more work on booth
        layout, reach and payload logic, or service assumptions before it is ready for a final robot choice.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Read next</h2>
      <ul className="space-y-3 text-muted-foreground">
        <li>
          <Link to="/resources/knowledge/how-to-choose-paint-robot" className="text-primary underline underline-offset-4">
            How to choose a paint robot
          </Link>
          {" "}for the main decision flow.
        </li>
        <li>
          <Link to="/resources/knowledge/paint-robot-reach-vs-payload" className="text-primary underline underline-offset-4">
            Paint robot reach vs payload
          </Link>
          {" "}for the trade-off that usually narrows the shortlist fastest.
        </li>
        <li>
          <Link to="/solutions/paint-robot-integration" className="text-primary underline underline-offset-4">
            Paint robot integration
          </Link>
          {" "}when the robot choice needs to be tested against full cell scope.
        </li>
      </ul>
    </ResourcePageLayout>
  );
}
