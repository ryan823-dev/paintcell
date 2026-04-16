import { ResourcePageLayout } from "@/components/resources";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { getPageMetadata } from "@/data/pageMetadata";

export default function WhatPartsAreSuitableForRoboticPainting() {
  const pageMeta = getPageMetadata("/resources/faq/what-parts-are-suitable-for-robotic-painting");
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    dateModified: pageMeta?.updatedAt,
    author: {
      "@type": "Organization",
      name: pageMeta?.authorName || "TD Engineering Team",
    },
    mainEntity: [
      {
        "@type": "Question",
        name: "What parts are suitable for robotic painting?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The strongest candidates are repeat or semi-repeat part families where finish consistency, labor stability, and throughput justify fixtures, recipes, and repeatable presentation.",
        },
      },
    ],
  };

  return (
    <ResourcePageLayout
      title="What Parts Are Suitable for Robotic Painting?"
      metaTitle="What Parts Are Suitable for Robotic Painting? | FAQ"
      metaDescription="Learn which part families are the best fit for robotic painting based on geometry, repeatability, finish risk, and production volume."
      breadcrumbs={[
        { label: "Resources", href: "/resources/engineering-library" },
        { label: "FAQ" },
        { label: "What Parts Are Suitable for Robotic Painting?" },
      ]}
      structuredData={structuredData}
      canonicalPath="/resources/faq/what-parts-are-suitable-for-robotic-painting"
    >
      <p className="text-lg text-muted-foreground mb-8">
        The best parts for robotic painting are not simply large-volume parts. They are the parts that can be presented,
        grouped, and repeated in a way that lets automation improve quality instead of adding complexity.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Best for / not ideal for / decision changes when</h2>
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground mb-2">Best for</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Repeat or semi-repeat part families where finish consistency, labor stability, and takt matter enough to justify fixtures and recipe discipline.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground mb-2">Not ideal for</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Parts that change geometry, masking logic, or presentation method too often for the line to hold stable fixturing and repeatable paths.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground mb-2">Decision changes when</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            The answer changes when touch-up tolerance, finish class, batch size, or booth stability is different from what the team first assumed.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Strong candidates usually share three traits</h2>
      <ul className="space-y-3 text-muted-foreground mb-8">
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>They belong to repeat or semi-repeat families with predictable fixtures and recipe logic.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>The finish target is demanding enough that manual variation creates real cost.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>The wider line can keep booth conditions, changeover, and part handling stable.</span>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Typical examples</h2>
      <p className="text-muted-foreground mb-8">
        Common examples include metal enclosures, brackets, automotive components, appliance housings, repeat furniture panels,
        and other parts that justify a formal <Link to="/solutions/robotic-painting-system" className="text-primary underline underline-offset-4">robotic paint automation system</Link>.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Common mistake and field check</h2>
      <div className="space-y-4 mb-8">
        <div className="rounded-xl border border-border bg-muted/30 p-5">
          <p className="font-medium text-foreground mb-2">Common mistake</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Teams often label a part "robot-friendly" because volume is high, even when presentation, masking, or part family variation still forces heavy manual correction.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-muted/30 p-5">
          <p className="font-medium text-foreground mb-2">How to confirm on site</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Put three to five representative SKUs on the real fixture path, compare required spray angles and masking steps, and check whether a repeatable recipe can cover them without constant operator rescue.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-foreground mb-4">Pages to read next</h2>
      <ul className="space-y-3 text-muted-foreground">
        <li><Link to="/resources/knowledge/when-robotic-paint-automation-makes-sense" className="text-primary underline underline-offset-4">When Does a Robotic Paint Automation System Make Sense?</Link></li>
        <li><Link to="/industries/metal-parts-finishing" className="text-primary underline underline-offset-4">Metal Parts Finishing</Link></li>
        <li><Link to="/quote" className="text-primary underline underline-offset-4">Ask TD to review your part family</Link></li>
      </ul>
    </ResourcePageLayout>
  );
}
