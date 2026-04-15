import { LocalizedLink as Link } from "@/components/LocalizedLink";
import {
  TopicCluster,
  getTopicClusterByPath,
  getTopicClusterPrimaryLinks,
} from "@/data/topicClusters";
import { normalizePublicPath } from "@/lib/seo";

interface TopicClusterNavigatorProps {
  currentPath?: string;
  cluster?: TopicCluster | null;
  variant?: "light" | "dark";
}

export function TopicClusterNavigator({
  currentPath,
  cluster,
  variant = "light",
}: TopicClusterNavigatorProps) {
  const resolvedCluster = cluster ?? (currentPath ? getTopicClusterByPath(currentPath) : undefined);

  if (!resolvedCluster) {
    return null;
  }

  const activePath = currentPath ? normalizePublicPath(currentPath) : "";
  const links = getTopicClusterPrimaryLinks(resolvedCluster);
  const isDark = variant === "dark";

  return (
    <div
      className={[
        "rounded-2xl border p-6 md:p-8",
        isDark ? "border-white/10 bg-white/[0.03]" : "border-border bg-muted/20",
      ].join(" ")}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="max-w-2xl">
          <p
            className={[
              "text-[11px] font-semibold uppercase tracking-[0.2em]",
              isDark ? "text-white/50" : "text-muted-foreground",
            ].join(" ")}
          >
            Topic cluster
          </p>
          <h2 className={["mt-2 text-xl font-semibold", isDark ? "text-white" : "text-foreground"].join(" ")}>
            {resolvedCluster.keyword}
          </h2>
          <p className={["mt-2 text-sm leading-relaxed", isDark ? "text-white/65" : "text-muted-foreground"].join(" ")}>
            {resolvedCluster.summary}
          </p>
        </div>
        <Link
          to={`/resources/topics/${resolvedCluster.slug}`}
          className={[
            "text-sm font-medium underline underline-offset-4",
            isDark ? "text-accent hover:text-accent/80" : "text-primary hover:text-primary/80",
          ].join(" ")}
        >
          Open full cluster
        </Link>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {links.map((link) => {
          const isCurrent = activePath !== "" && normalizePublicPath(link.href) === activePath;

          return (
            <Link
              key={link.href}
              to={link.href}
              className={[
                "rounded-xl border p-4 transition-colors",
                isDark
                  ? isCurrent
                    ? "border-accent/40 bg-accent/10"
                    : "border-white/10 hover:border-accent/40 hover:bg-white/[0.04]"
                  : isCurrent
                    ? "border-primary/40 bg-primary/5"
                    : "border-border hover:border-primary/30 hover:bg-muted/30",
              ].join(" ")}
            >
              <div className="flex items-center justify-between gap-4">
                <p className={["text-sm font-medium", isDark ? "text-white" : "text-foreground"].join(" ")}>{link.label}</p>
                {isCurrent && (
                  <span
                    className={[
                      "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em]",
                      isDark ? "bg-accent/20 text-accent" : "bg-primary/10 text-primary",
                    ].join(" ")}
                  >
                    Current
                  </span>
                )}
              </div>
              <p className={["mt-2 text-sm leading-relaxed", isDark ? "text-white/60" : "text-muted-foreground"].join(" ")}>
                {link.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
