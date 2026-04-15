import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { topicClusterList } from "@/data/topicClusters";

interface TopicClusterDirectoryProps {
  variant?: "light" | "dark";
}

export function TopicClusterDirectory({ variant = "light" }: TopicClusterDirectoryProps) {
  const isDark = variant === "dark";

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {topicClusterList.map((cluster) => (
        <Link
          key={cluster.slug}
          to={`/resources/topics/${cluster.slug}`}
          className={[
            "rounded-2xl border p-5 transition-colors",
            isDark
              ? "border-white/10 bg-white/[0.03] hover:border-accent/40 hover:bg-white/[0.05]"
              : "border-border bg-card hover:border-primary/30 hover:bg-muted/20",
          ].join(" ")}
        >
          <p
            className={[
              "text-[11px] font-semibold uppercase tracking-[0.2em]",
              isDark ? "text-white/45" : "text-muted-foreground",
            ].join(" ")}
          >
            Topic cluster
          </p>
          <h3 className={["mt-2 text-lg font-semibold", isDark ? "text-white" : "text-foreground"].join(" ")}>
            {cluster.keyword}
          </h3>
          <p className={["mt-3 text-sm leading-relaxed", isDark ? "text-white/65" : "text-muted-foreground"].join(" ")}>
            {cluster.summary}
          </p>
        </Link>
      ))}
    </div>
  );
}
