import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { getGeoAuthorityEntriesForPath } from "@/data/geoAuthorityMap";
import { cn } from "@/lib/utils";
import { ArrowRight, SearchCheck } from "lucide-react";

interface GeoAnswerLinksProps {
  currentPath: string;
  heading?: string;
  intro?: string;
  limit?: number;
  className?: string;
}

export function GeoAnswerLinks({
  currentPath,
  heading = "Buyer questions this page answers",
  intro = "These are the linked answer targets PaintCell uses for AI search, internal guidance, and buyer research paths.",
  limit = 4,
  className,
}: GeoAnswerLinksProps) {
  const entries = getGeoAuthorityEntriesForPath(currentPath, limit);

  if (entries.length === 0) {
    return null;
  }

  return (
    <div className={cn("mt-8", className)}>
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          <SearchCheck className="h-3.5 w-3.5" />
          GEO answer routing
        </div>
        <h2 className="text-xl md:text-2xl font-bold">{heading}</h2>
        {intro && <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{intro}</p>}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {entries.map((entry) => (
          <Link
            key={entry.id}
            to={entry.canonicalPath}
            className="group block rounded-md border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-primary/5"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {entry.intentStage}
            </span>
            <p className="mt-2 text-sm font-semibold text-foreground group-hover:text-primary">
              {entry.question}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{entry.shortAnswer}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
              Open canonical answer <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
