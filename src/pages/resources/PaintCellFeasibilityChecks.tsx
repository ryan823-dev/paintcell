import { ResourcePageLayout, AnswerBox, RelatedResources } from "@/components/resources";
import { ContentSection, BulletList } from "@/components/resources";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Robotic Spray Painting Feasibility: 10 Engineering Checks Before You Automate",
  "description": "A practical pre-engineering checklist to assess whether a robotic spray painting paint cell makes sense—and what must be validated.",
  "author": {
    "@type": "Organization",
    "name": "PaintCell"
  }
};

export default function PaintCellFeasibilityChecks() {
  return (
    <ResourcePageLayout
      title="Robotic Spray Painting Feasibility: 10 Engineering Checks Before You Automate"
      metaTitle="Paint Cell Feasibility Checks | Robotic Spray Painting Guide"
      metaDescription="A practical pre-engineering checklist to assess whether a robotic spray painting paint cell makes sense—and what must be validated."
      breadcrumbs={[
        { label: "Engineering Library", href: "/resources/engineering-library" },
        { label: "Guides", href: "/resources/engineering-library/guides-checklists" },
        { label: "Feasibility Checks" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        A paint cell is feasible when part presentation is stable, takt and changeovers are compatible with robot path time, and site safety constraints can be met. Most failures come from unclear automation boundaries, underestimated handling and changeover time, or missing ventilation/EHS requirements. Use the checks below to decide what to validate before committing to a build.
      </AnswerBox>

      <ContentSection title="When a paint cell is usually a good fit">
        <BulletList
          items={[
            "Repeated part families with stable fixturing and presentation",
            "Finish requirements that benefit from repeatable paths and controlled distance/angle",
            "Volume and scheduling stability that justify automation and predictable changeovers",
          ]}
        />
      </ContentSection>

      <ContentSection title="When it is usually NOT a good fit (or needs a phased approach)">
        <BulletList
          items={[
            "Extreme variation with frequent, unplanned changeovers",
            "Highly subjective appearance expectations where \"hand feel\" dominates and touch-up is the norm",
            "Site constraints (ventilation / EHS / space) are unknown or cannot be met without major facility changes",
          ]}
        />
      </ContentSection>

      <ContentSection title="The 10 engineering checks">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">1) Part presentation and fixturing</h3>
            <p className="text-muted-foreground">
              If the part can't be presented the same way every time, repeatable coverage and stable finish become difficult. Fixturing drives repeatability.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">2) Geometry reach and edge coverage</h3>
            <p className="text-muted-foreground">
              Recesses, deep pockets, and sharp edges often require validation runs for coverage. Geometry drives path complexity and cycle time.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">3) Surface targets (appearance vs functional coverage)</h3>
            <p className="text-muted-foreground">
              Clarify whether the target is visual uniformity or functional coverage. This changes acceptable variability and inspection expectations.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">4) Takt time vs robot path time (include handling)</h3>
            <p className="text-muted-foreground">
              The path time alone is not the cycle time. Include load/unload, part indexing, and any staging or buffering logic.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">5) Changeover and cleaning time</h3>
            <p className="text-muted-foreground">
              Changeover frequency and cleaning time can dominate throughput. Define batch size, color/paint change expectations, and acceptable downtime.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">6) Paint supply and refill routine</h3>
            <p className="text-muted-foreground">
              Decide how paint will be supplied, mixed, and refilled. Paint stability, refill intervals, and operator routines affect uptime.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">7) Booth airflow and overspray containment</h3>
            <p className="text-muted-foreground">
              Airflow is a design constraint. It affects finish stability, overspray capture, and baseline safety requirements.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">8) Grounding/static and fire risk basics</h3>
            <p className="text-muted-foreground">
              Static control and grounding are not optional details. Identify early who owns safety validation and what site requirements apply.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">9) Manual tasks that remain (automation boundary)</h3>
            <p className="text-muted-foreground">
              Define what stays manual (masking/prep, touch-up, inspection, mixing). A clear boundary prevents false expectations and scope creep.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">10) Validation plan (what must be tested)</h3>
            <p className="text-muted-foreground">
              List what requires trials: coverage on edges, cycle time under real handling, paint stability, and site constraints verification.
            </p>
          </div>
        </div>
      </ContentSection>

      <ContentSection title="What must be validated (before final design)">
        <BulletList
          items={[
            "Spray coverage on edges/recesses for your geometry",
            "Cycle time including loading/unloading and changeover",
            "Atomization stability under your paint type and environmental conditions",
            "Ventilation/airflow and EHS constraints with your local requirements",
          ]}
        />
      </ContentSection>

      <ContentSection title="What we need from you (to start a serious assessment)">
        <BulletList
          items={[
            "Part photos or CAD + key dimensions",
            "Target finish spec (visual vs functional) + acceptable touch-up level",
            "Required throughput or takt + shift pattern",
            "Changeover frequency and batch size",
            "Site constraints (booth/room size, exhaust capacity if known)",
          ]}
        />
      </ContentSection>

      <ContentSection title="Quick checklist table">
        <div className="border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Input</TableHead>
                <TableHead>Why it matters</TableHead>
                <TableHead>What to prepare</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Part photos/CAD</TableCell>
                <TableCell>Coverage and path complexity</TableCell>
                <TableCell>Photos, CAD, key dimensions</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Finish target</TableCell>
                <TableCell>Defines inspection and tolerance</TableCell>
                <TableCell>Visual vs functional, acceptable touch-up</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Takt / parts per hour</TableCell>
                <TableCell>Sets cycle time boundary</TableCell>
                <TableCell>Target rate + shifts</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Changeover frequency</TableCell>
                <TableCell>Drives downtime and design</TableCell>
                <TableCell>Batch size, frequency, cleaning expectations</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Paint type (liquid)</TableCell>
                <TableCell>Affects equipment and routines</TableCell>
                <TableCell>Paint type + handling routine</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Booth/ventilation constraints</TableCell>
                <TableCell>Baseline safety + finish stability</TableCell>
                <TableCell>Booth/room info, exhaust data if known</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </ContentSection>
    </ResourcePageLayout>
  );
}
