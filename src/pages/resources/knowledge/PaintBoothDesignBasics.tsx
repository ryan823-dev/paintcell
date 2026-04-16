import { ResourcePageLayout } from "@/components/resources";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Card, CardContent } from "@/components/ui/card";

const designChecks = [
  {
    title: "Part family",
    description:
      "Start with the largest real work envelope, finish requirement, and fixture logic instead of a nominal part size on a quotation sheet.",
  },
  {
    title: "Airflow strategy",
    description:
      "Choose airflow to match finish quality, overspray load, and available building constraints before you place robots or conveyors.",
  },
  {
    title: "Service access",
    description:
      "Robot reach only matters if operators can still load parts, change filters, and maintain the cell without creating blind spots.",
  },
  {
    title: "Facility boundary",
    description:
      "Makeup air, exhaust, filtration, and fire logic often decide whether a booth design is truly viable in the existing plant.",
  },
];

const boothTypeRows = [
  {
    type: "Downdraft",
    bestFit: "Appearance-critical finishes, cleaner spray zones, and projects that can support more booth infrastructure.",
    optimizes: "Finish consistency, overspray capture near the part, and repeatable robot conditions.",
    watchOut: "Usually costs more in plenums, pit or floor exhaust scope, and building integration.",
  },
  {
    type: "Crossdraft",
    bestFit: "Industrial coatings where budget and retrofit simplicity matter more than the highest cosmetic finish.",
    optimizes: "Lower upfront complexity and easier installation in existing buildings.",
    watchOut: "Airflow can carry overspray across the part if layout, loading, and spray direction are not disciplined.",
  },
  {
    type: "Side-draft",
    bestFit: "Large parts, awkward geometries, or facilities where downdraft floor scope is unrealistic.",
    optimizes: "Practical airflow for bulky work and retrofit-friendly exhaust placement.",
    watchOut: "Needs careful validation of dead zones, robot approach angles, and operator visibility.",
  },
];

const quickAnswers = [
  {
    question: "Is downdraft always the best paint booth design?",
    answer:
      "No. Downdraft is often the cleanest option, but crossdraft or side-draft can be the better engineering answer when the finish target, part size, or building constraints do not justify full downdraft scope.",
  },
  {
    question: "What usually breaks a retrofit plan first?",
    answer:
      "The weak points are normally airflow stability, service clearance, and the hidden facility work around makeup air, exhaust, and controls.",
  },
  {
    question: "Why is booth sizing not just a part-size exercise?",
    answer:
      "Because the booth has to fit the part, the robot envelope, maintenance access, loading logic, filtration load, and safe airflow path at the same time.",
  },
];

export default function PaintBoothDesignBasics() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: "Paint Booth Design Basics for Robotic Painting Projects",
        description:
          "Decision-oriented guide to paint booth design covering booth type selection, sizing inputs, retrofit checks, ventilation, and filtration dependencies.",
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
      title="Paint Booth Design Basics for Robotic Painting Projects"
      metaTitle="Paint Booth Design Basics | Booth Type, Sizing, Retrofit Decisions"
      metaDescription="Learn the paint booth design basics that actually change project scope: downdraft vs crossdraft vs side-draft, sizing inputs, retrofit limits, ventilation, and filtration."
      breadcrumbs={[
        { label: "Resources", href: "/resources/engineering-library" },
        { label: "Knowledge" },
        { label: "Paint Booth Design Basics" },
      ]}
      structuredData={structuredData}
      canonicalPath="/resources/knowledge/paint-booth-design-basics"
    >
      <p className="text-lg text-muted-foreground mb-8">
        Good booth design starts with process risk, finish target, and part handling logic. If the team jumps
        straight to steel dimensions or robot placement, the project usually looks cheaper on paper than it is
        in production.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Use booth design to answer the real project questions</h2>
      <p className="text-muted-foreground mb-6">
        A booth is not just an enclosure around a robot. It is the environment that decides whether airflow,
        overspray capture, service access, and finish stability will remain predictable after startup.
      </p>
      <div className="grid gap-4 md:grid-cols-2 mb-10">
        {designChecks.map((item) => (
          <Card key={item.title} className="border-border">
            <CardContent className="p-5">
              <h3 className="text-base font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Compare booth types before you lock the layout</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="py-3 pr-4 text-left font-semibold text-foreground">Booth type</th>
              <th className="py-3 px-4 text-left font-semibold text-foreground">Best fit</th>
              <th className="py-3 px-4 text-left font-semibold text-foreground">What it optimizes</th>
              <th className="py-3 pl-4 text-left font-semibold text-foreground">Watch-outs</th>
            </tr>
          </thead>
          <tbody>
            {boothTypeRows.map((row) => (
              <tr key={row.type} className="border-b border-border align-top">
                <td className="py-4 pr-4 font-medium text-foreground">{row.type}</td>
                <td className="py-4 px-4 text-muted-foreground">{row.bestFit}</td>
                <td className="py-4 px-4 text-muted-foreground">{row.optimizes}</td>
                <td className="py-4 pl-4 text-muted-foreground">{row.watchOut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Sizing inputs that change the answer</h2>
      <ul className="space-y-3 text-muted-foreground mb-10">
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>
            <strong className="text-foreground">Part envelope:</strong> Use the largest paintable part plus fixture,
            rotation, and loading orientation rather than the catalog dimensions alone.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>
            <strong className="text-foreground">Robot envelope:</strong> Validate reach, approach angle, hose routing,
            and maintenance clearance together. Tight booths create hidden programming and service cost.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>
            <strong className="text-foreground">Air and exhaust load:</strong> Overspray volume, coating chemistry, and
            target face velocity decide whether the booth can stay stable under production load.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>
            <strong className="text-foreground">Line interface:</strong> Conveyor pitch, loading method, flash-off logic,
            and color change strategy often change the preferred booth footprint.
          </span>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-foreground mb-4">New booth vs retrofit is usually a facility question</h2>
      <div className="grid gap-4 md:grid-cols-2 mb-10">
        <Card className="border-border">
          <CardContent className="p-5">
            <h3 className="text-base font-semibold text-foreground mb-3">New booth build is usually stronger when</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>The finish target needs cleaner airflow and more stable environmental control.</li>
              <li>Robot access, future capacity, or maintenance space would be compromised in the old footprint.</li>
              <li>Exhaust, filtration, and controls upgrades are large enough that retrofit savings stop being real.</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-5">
            <h3 className="text-base font-semibold text-foreground mb-3">Retrofit can still work when</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>The current booth already has usable airflow capacity and safe access for the intended robot package.</li>
              <li>Part families and finish requirements are tolerant of the existing booth geometry.</li>
              <li>Shutdown limits make staged improvement more valuable than a clean-sheet rebuild.</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Three mistakes that keep a booth project half-scoped</h2>
      <ul className="space-y-3 text-muted-foreground mb-10">
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>Choosing booth type from habit instead of matching it to finish target, building limits, and overspray behavior.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>Pricing the robot and booth shell before checking ventilation, filtration, and conditioned makeup air scope.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>Treating maintenance access as optional, which usually becomes a reliability problem after commissioning.</span>
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
          <Link to="/resources/knowledge/downdraft-vs-crossdraft-vs-side-draft" className="text-primary underline underline-offset-4">
            Downdraft vs crossdraft vs side-draft
          </Link>
          {" "}for a focused booth-type decision page.
        </li>
        <li>
          <Link to="/resources/knowledge/new-paint-booth-vs-retrofit" className="text-primary underline underline-offset-4">
            New paint booth vs retrofit
          </Link>
          {" "}for the facility and downtime decision.
        </li>
        <li>
          <Link to="/resources/standards-compliance/ventilation-airflow" className="text-primary underline underline-offset-4">
            Ventilation and airflow
          </Link>
          {" "}to validate the facility side of booth scope.
        </li>
        <li>
          <Link to="/resources/equipment/paint-booth-filtration" className="text-primary underline underline-offset-4">
            Paint booth filtration
          </Link>
          {" "}to connect filter strategy with overspray load and maintenance.
        </li>
        <li>
          <Link to="/resources/faq/how-much-floor-space-does-an-automated-paint-line-need" className="text-primary underline underline-offset-4">
            How much floor space does an automated paint line need?
          </Link>
          {" "}for footprint planning.
        </li>
        <li>
          <Link to="/solutions/paint-booth-automation" className="text-primary underline underline-offset-4">
            Paint booth automation
          </Link>
          {" "}when the project is ready to move from layout questions into implementation scope.
        </li>
      </ul>
    </ResourcePageLayout>
  );
}
