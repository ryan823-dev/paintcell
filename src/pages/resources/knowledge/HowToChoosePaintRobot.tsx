import { ResourcePageLayout } from "@/components/resources";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Card, CardContent } from "@/components/ui/card";

const selectionOrder = [
  {
    title: "Classify the paint environment",
    description:
      "Solvent-based, waterborne, ATEX, cleaning media, and booth zoning all affect what robot package is even allowed in the cell.",
  },
  {
    title: "Define part families first",
    description:
      "Robot choice only makes sense after you know the real part envelope, fixture logic, gun angle requirements, and changeover pattern.",
  },
  {
    title: "Calculate the real wrist package",
    description:
      "Payload must cover the applicator, hose package, mounting hardware, and margin for dynamic movement, not just the gun weight.",
  },
  {
    title: "Check programming and service practicality",
    description:
      "A robot that fits on paper can still be the wrong choice if the plant cannot maintain it, support it locally, or program changes efficiently.",
  },
];

const selectionTable = [
  {
    factor: "Reach",
    validation: "Cover the full spray envelope with workable approach angles and hose routing margin.",
    trap: "Using catalog reach to the wrist center without testing real gun orientation at the part.",
  },
  {
    factor: "Payload",
    validation: "Add the atomizer, brackets, valves, hoses, and safety margin into the load case.",
    trap: "Selecting from the spray-gun weight alone and leaving no headroom for a real paint package.",
  },
  {
    factor: "Protection and zone rating",
    validation: "Match the robot package to the actual booth classification, chemistry, and washdown conditions.",
    trap: "Treating explosion protection or IP rating as an optional upgrade after layout is done.",
  },
  {
    factor: "Mounting and envelope",
    validation: "Check whether floor, wall, inverted, or rail-mounted geometry simplifies the booth.",
    trap: "Forcing a larger robot when a better mounting concept would solve the reach problem.",
  },
  {
    factor: "Programming workflow",
    validation: "Evaluate offline programming, paint process controls, recipe handling, and ease of changeover.",
    trap: "Assuming any 6-axis robot is equally practical to tune for paint quality and mixed-model work.",
  },
  {
    factor: "Service support",
    validation: "Confirm spares, local field support, and in-house familiarity before you lock brand preference.",
    trap: "Choosing a brand only because it looks strong in a brochure comparison.",
  },
];

const quickAnswers = [
  {
    question: "What matters more at the start: brand or application fit?",
    answer:
      "Application fit. Brand becomes useful after reach, payload, zone rating, mounting, and service constraints are already narrowed by the actual line.",
  },
  {
    question: "Do paint robots always need hollow wrists?",
    answer:
      "Not always, but hollow wrists are often preferred because they reduce snag risk and simplify hose routing in painting environments.",
  },
  {
    question: "Why do robot projects fail even when the robot can technically reach the part?",
    answer:
      "Because technical reach alone does not guarantee usable gun angles, clean hose routing, stable cycle time, or maintainable service access inside the booth.",
  },
];

export default function HowToChoosePaintRobot() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: "How to Choose a Paint Robot for Industrial Spray Painting",
        description:
          "Guide to choosing a paint robot using reach, payload, zone rating, mounting, programming workflow, and service support instead of brand-first selection.",
        author: { "@type": "Organization", name: "TD Engineering Team" },
        publisher: { "@type": "Organization", name: "TD Painting System" },
        inLanguage: "en",
      },
      {
        "@type": "FAQPage",
        mainEntity: quickAnswers.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <ResourcePageLayout
      title="How to Choose a Paint Robot for Industrial Spray Painting"
      metaTitle="How to Choose a Paint Robot | Reach, Payload, ATEX, Service Fit"
      metaDescription="Choose a paint robot using the criteria that actually affect project success: reach, payload, zone rating, mounting, programming workflow, and service support."
      breadcrumbs={[
        { label: "Resources", href: "/resources/engineering-library" },
        { label: "Knowledge" },
        { label: "How to Choose a Paint Robot" },
      ]}
      structuredData={structuredData}
      canonicalPath="/resources/knowledge/how-to-choose-paint-robot"
    >
      <p className="text-lg text-muted-foreground mb-8">
        The right paint robot is usually the result of a line decision, not a catalog decision. If the team starts
        with brand loyalty or sticker price, it often misses the factors that actually control finish quality,
        maintainability, and cycle time.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Use a selection order that filters bad options early</h2>
      <div className="grid gap-4 md:grid-cols-2 mb-10">
        {selectionOrder.map((item) => (
          <Card key={item.title} className="border-border">
            <CardContent className="p-5">
              <h3 className="text-base font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-semibold text-foreground mb-4">What to validate before you compare brands</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="py-3 pr-4 text-left font-semibold text-foreground">Decision factor</th>
              <th className="py-3 px-4 text-left font-semibold text-foreground">What to validate</th>
              <th className="py-3 pl-4 text-left font-semibold text-foreground">Common trap</th>
            </tr>
          </thead>
          <tbody>
            {selectionTable.map((row) => (
              <tr key={row.factor} className="border-b border-border align-top">
                <td className="py-4 pr-4 font-medium text-foreground">{row.factor}</td>
                <td className="py-4 px-4 text-muted-foreground">{row.validation}</td>
                <td className="py-4 pl-4 text-muted-foreground">{row.trap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Brand should be a late-stage filter, not the first filter</h2>
      <p className="text-muted-foreground mb-4">
        ABB, FANUC, KUKA, Yaskawa, and other paint-capable platforms can all be the right choice in the right line.
        The useful comparison is not "which brand is best?" but "which package stays practical once the booth, part
        family, paint chemistry, and maintenance model are fixed?"
      </p>
      <p className="text-muted-foreground mb-10">
        That is why the strongest shortlists usually connect brand, robot envelope, wrist design, local service, and
        programming workflow instead of treating the robot arm as a standalone purchase.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Three mistakes that create expensive robot mismatch</h2>
      <ul className="space-y-3 text-muted-foreground mb-10">
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>Oversizing the robot to solve a layout problem that should be fixed with part presentation or mounting strategy.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>Ignoring the full end-of-arm package, which makes payload look fine until hoses and paint hardware are added.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>Picking the robot before checking how operators will teach, maintain, and recover the cell during real production changes.</span>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Quick answers buyers usually need</h2>
      <div className="space-y-4 mb-10">
        {quickAnswers.map((item) => (
          <div key={item.question} className="rounded-xl border border-border p-5">
            <h3 className="text-base font-semibold text-foreground mb-2">{item.question}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Read next</h2>
      <ul className="space-y-3 text-muted-foreground">
        <li>
          <Link to="/resources/knowledge/paint-robot-reach-vs-payload" className="text-primary underline underline-offset-4">
            Paint robot reach vs payload
          </Link>
          {" "}for the most common trade-off buyers misread.
        </li>
        <li>
          <Link to="/resources/knowledge/hollow-wrist-vs-non-hollow-wrist-painting" className="text-primary underline underline-offset-4">
            Hollow wrist vs non-hollow wrist for painting
          </Link>
          {" "}for the dress-package decision that affects real booth practicality.
        </li>
        <li>
          <Link to="/resources/knowledge/industrial-robot-brands" className="text-primary underline underline-offset-4">
            Industrial robot brands for paint shops
          </Link>
          {" "}to compare vendor fit after the application is narrowed.
        </li>
        <li>
          <Link to="/resources/knowledge/painting-robot-selection-guide" className="text-primary underline underline-offset-4">
            Painting robot selection guide
          </Link>
          {" "}for a broader model and investment overview.
        </li>
        <li>
          <Link to="/solutions/paint-robot-integration" className="text-primary underline underline-offset-4">
            Paint robot integration
          </Link>
          {" "}when the conversation needs to move from robot choice into full cell scope.
        </li>
      </ul>
    </ResourcePageLayout>
  );
}
