import { Building2, CalendarDays, FileText, Mail, ShieldAlert, User } from "lucide-react";
import type { ResourceTrustMeta } from "@/lib/siteTrust";

interface ResourceTrustPanelLabels {
  title: string;
  author: string;
  updated: string;
  publisher: string;
  contact: string;
  scope: string;
  useWith: string;
  limitations: string;
  sourceBasis: string;
}

interface ResourceTrustPanelProps {
  labels: ResourceTrustPanelLabels;
  trust: ResourceTrustMeta;
}

export function ResourceTrustPanel({ labels, trust }: ResourceTrustPanelProps) {
  return (
    <section className="mb-10 rounded-2xl border border-border bg-muted/30 p-5 md:p-6">
      <div className="mb-5">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {labels.title}
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="flex items-start gap-3 rounded-xl border border-border bg-background p-4">
          <User className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <div>
            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-foreground">
              {labels.author}
            </div>
            <div className="text-sm text-muted-foreground">{trust.authorName}</div>
          </div>
        </div>

        {trust.updatedAt ? (
          <div className="flex items-start gap-3 rounded-xl border border-border bg-background p-4">
            <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <div>
              <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-foreground">
                {labels.updated}
              </div>
              <div className="text-sm text-muted-foreground">{trust.updatedAt}</div>
            </div>
          </div>
        ) : null}

        <div className="flex items-start gap-3 rounded-xl border border-border bg-background p-4">
          <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <div>
            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-foreground">
              {labels.publisher}
            </div>
            <div className="text-sm text-muted-foreground">
              {trust.publisherName}
              {trust.publisherLocation ? ` | ${trust.publisherLocation}` : ""}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-border bg-background p-4">
          <Mail className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <div>
            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-foreground">
              {labels.contact}
            </div>
            <a
              href={`mailto:${trust.contactEmail}`}
              className="text-sm text-primary hover:underline"
            >
              {trust.contactEmail}
            </a>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-background p-4">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-foreground">
            <FileText className="h-4 w-4 text-muted-foreground" />
            {labels.scope}
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{trust.scope}</p>
        </div>

        <div className="rounded-xl border border-border bg-background p-4">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-foreground">
            <FileText className="h-4 w-4 text-muted-foreground" />
            {labels.useWith}
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{trust.useWith}</p>
        </div>

        <div className="rounded-xl border border-border bg-background p-4">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-foreground">
            <ShieldAlert className="h-4 w-4 text-muted-foreground" />
            {labels.limitations}
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{trust.limitations}</p>
        </div>

        <div className="rounded-xl border border-border bg-background p-4">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-foreground">
            <FileText className="h-4 w-4 text-muted-foreground" />
            {labels.sourceBasis}
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{trust.sourceBasis}</p>
        </div>
      </div>
    </section>
  );
}
