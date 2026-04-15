import { ResourcePageLayout } from "@/components/resources";
import { LocalizedLink as Link } from "@/components/LocalizedLink";

export default function Zone1VsZone2SprayPaintingBooth() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Zone 1 vs Zone 2 in Spray Painting Booth Design",
    description: "Practical comparison of Zone 1 and Zone 2 logic in ATEX spray painting booth design.",
  };

  return (
    <ResourcePageLayout
      title="Zone 1 vs Zone 2 in Spray Painting Booth Design"
      metaTitle="Zone 1 vs Zone 2 in Spray Painting Booth Design | ATEX Comparison"
      metaDescription="Understand the practical difference between Zone 1 and Zone 2 in spray painting booth design, equipment choice, and retrofit scope."
      breadcrumbs={[
        { label: "Resources", href: "/resources/engineering-library" },
        { label: "Knowledge" },
        { label: "Zone 1 vs Zone 2 in Spray Painting Booth Design" },
      ]}
      structuredData={structuredData}
      canonicalPath="/resources/knowledge/zone-1-vs-zone-2-spray-painting-booth"
    >
      <p className="text-lg text-muted-foreground mb-8">
        The practical difference between Zone 1 and Zone 2 is not a labeling exercise. It changes which components can
        operate in the spray area, how conservative the safety design must be, and whether a retrofit remains realistic.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mb-4">What the distinction means in real projects</h2>
      <p className="text-muted-foreground mb-4">
        Zone 1 generally reflects a more frequent or more credible presence of explosive atmosphere during normal operation.
        Zone 2 usually reflects a lower-probability case, but it still demands disciplined engineering. Buyers often hear
        "Zone 2" and assume the scope is easy. It often is not.
      </p>
      <p className="text-muted-foreground mb-8">
        The safer way to frame the issue is through classified volume, paint and solvent behavior, airflow reliability,
        and the components that sit inside or interface with the booth envelope.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Why the zone decision affects cost and scope</h2>
      <ul className="space-y-3 text-muted-foreground mb-8">
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>Robot packages, motors, sensors, cabinets, and interfaces must align to the required protection concept.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>Low-confidence airflow or purge logic can push a project into broader compliance scope than expected.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>Retrofit assumptions fail quickly when the current booth was never validated around real classified-space behavior.</span>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-foreground mb-4">What to compare before approving hardware</h2>
      <ol className="space-y-3 text-muted-foreground list-decimal pl-6 mb-8">
        <li>How stable is booth airflow under actual production load?</li>
        <li>Which equipment sits inside the classified zone versus outside it?</li>
        <li>Do solvent handling, cleaning routines, and upset conditions expand the effective risk envelope?</li>
        <li>Does the planned <Link to="/solutions/paint-booth-automation" className="text-primary underline underline-offset-4">paint booth automation</Link> scope still make sense after those checks?</li>
      </ol>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Pages to read next</h2>
      <ul className="space-y-3 text-muted-foreground">
        <li><Link to="/resources/knowledge/atex-spray-painting-booth" className="text-primary underline underline-offset-4">ATEX Zone Classification for Spray Painting Booths</Link></li>
        <li><Link to="/resources/knowledge/how-to-design-atex-compliant-spray-painting-booth" className="text-primary underline underline-offset-4">How to Design an ATEX-Compliant Spray Painting Booth</Link></li>
        <li><Link to="/quote" className="text-primary underline underline-offset-4">Discuss a classified-booth project with TD</Link></li>
      </ul>
    </ResourcePageLayout>
  );
}
