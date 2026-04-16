import { ResourcePageLayout } from "@/components/resources";
import { LocalizedLink as Link } from "@/components/LocalizedLink";

const decisionRows = [
  {
    option: "New booth build",
    strongerWhen:
      "The project needs cleaner airflow, more predictable maintenance access, future capacity margin, or a cleaner automation layout than the current booth can support.",
    hiddenCost:
      "Higher initial capital and more obvious facility work, but fewer compromises hidden inside later integration changes.",
  },
  {
    option: "Retrofit",
    strongerWhen:
      "The existing booth already has usable airflow capacity, workable geometry, and shutdown constraints that make staged improvement more valuable than a full rebuild.",
    hiddenCost:
      "Can look cheaper at first, but hidden controls, exhaust, filtration, and downtime work often erode the savings.",
  },
];

export default function NewPaintBoothVsRetrofit() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "New Paint Booth vs Retrofit",
    description:
      "Decision guide for choosing between a new paint booth build and retrofit based on airflow, geometry, maintenance access, facility scope, and downtime risk.",
    author: { "@type": "Organization", name: "TD Engineering Team" },
    publisher: { "@type": "Organization", name: "TD Painting System" },
    inLanguage: "en",
  };

  return (
    <ResourcePageLayout
      title="New Paint Booth vs Retrofit"
      metaTitle="New Paint Booth vs Retrofit | Decision Guide for Robotic Painting"
      metaDescription="Choose between a new paint booth and retrofit by comparing airflow risk, geometry limits, facility work, maintenance access, and downtime trade-offs."
      breadcrumbs={[
        { label: "Resources", href: "/resources/engineering-library" },
        { label: "Knowledge" },
        { label: "New Paint Booth vs Retrofit" },
      ]}
      structuredData={structuredData}
      canonicalPath="/resources/knowledge/new-paint-booth-vs-retrofit"
    >
      <p className="text-lg text-muted-foreground mb-8">
        The real choice is not between spending more or spending less. It is between paying openly for the booth the
        process needs or paying later for compromises that retrofit logic failed to expose early.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Use the decision to test process fit, not just budget</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full min-w-[700px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="py-3 pr-4 text-left font-semibold text-foreground">Option</th>
              <th className="py-3 px-4 text-left font-semibold text-foreground">Usually stronger when</th>
              <th className="py-3 pl-4 text-left font-semibold text-foreground">Hidden cost to check</th>
            </tr>
          </thead>
          <tbody>
            {decisionRows.map((row) => (
              <tr key={row.option} className="border-b border-border align-top">
                <td className="py-4 pr-4 font-medium text-foreground">{row.option}</td>
                <td className="py-4 px-4 text-muted-foreground">{row.strongerWhen}</td>
                <td className="py-4 pl-4 text-muted-foreground">{row.hiddenCost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-semibold text-foreground mb-4">A new booth is usually the better answer when</h2>
      <ul className="space-y-3 text-muted-foreground mb-10">
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>The current booth cannot support the robot envelope, part access, and maintenance clearance together.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>Finish quality depends on cleaner airflow control than the old booth can deliver reliably under production load.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>Future model mix, automation growth, or service access would be boxed in by the retrofit footprint.</span>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Retrofit can still be the right answer when</h2>
      <ul className="space-y-3 text-muted-foreground mb-10">
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>The booth shell, airflow path, and exhaust baseline are already strong enough that the project is not fighting the structure.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>The part family is stable enough that the old footprint does not create awkward robot motion or unsafe access.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>Shutdown tolerance is so limited that staged improvement creates more business value than a clean-sheet replacement.</span>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Three questions that usually settle the argument</h2>
      <ol className="space-y-3 list-decimal pl-6 text-muted-foreground mb-10">
        <li>Can the current booth maintain stable airflow and filtration under the overspray load the robotic line will create?</li>
        <li>After controls, exhaust, safety, and downtime are included, does retrofit still save enough to justify the constraints?</li>
        <li>Will the chosen path still look sensible two years later when maintenance and model-change pressure increase?</li>
      </ol>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Read next</h2>
      <ul className="space-y-3 text-muted-foreground">
        <li><Link to="/resources/knowledge/paint-booth-design-basics" className="text-primary underline underline-offset-4">Paint booth design basics</Link> for the broader booth-scoping guide.</li>
        <li><Link to="/resources/knowledge/downdraft-vs-crossdraft-vs-side-draft" className="text-primary underline underline-offset-4">Downdraft vs crossdraft vs side-draft</Link> for airflow-pattern selection.</li>
        <li><Link to="/solutions/paint-booth-automation" className="text-primary underline underline-offset-4">Paint booth automation</Link> when the decision needs to move into implementation scope.</li>
      </ul>
    </ResourcePageLayout>
  );
}
