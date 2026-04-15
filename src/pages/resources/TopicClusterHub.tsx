import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { ResourcePageLayout } from "@/components/resources";
import { TopicClusterNavigator } from "@/components/seo/TopicClusterNavigator";
import { topicClusters } from "@/data/topicClusters";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import NotFound from "@/pages/NotFound";

export default function TopicClusterHub() {
  const { slug } = useParams<{ slug: string }>();
  const cluster = slug ? topicClusters[slug] : undefined;

  const structuredData = useMemo(() => {
    if (!cluster) {
      return null;
    }

    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": cluster.keyword,
      "description": cluster.metaDescription,
      "hasPart": [
        cluster.guide.href,
        cluster.faq.href,
        cluster.glossary.href,
        cluster.scenario.href,
        cluster.industry.href,
        cluster.solution.href,
      ].map((href) => ({
        "@type": "WebPage",
        "url": `https://tdpaint.com/en${href}`,
      })),
    };
  }, [cluster]);

  if (!cluster) {
    return <NotFound />;
  }

  return (
    <ResourcePageLayout
      title={cluster.keyword}
      metaTitle={cluster.metaTitle}
      metaDescription={cluster.metaDescription}
      breadcrumbs={[
        { label: "Resources", href: "/resources/engineering-library" },
        { label: "Topic Clusters", href: "/resources/topics" },
        { label: cluster.keyword },
      ]}
      structuredData={structuredData || undefined}
      canonicalPath={`/resources/topics/${cluster.slug}`}
    >
      <p className="text-lg text-muted-foreground mb-8">{cluster.summary}</p>
      <p className="text-muted-foreground mb-10">{cluster.searchIntent}</p>

      <TopicClusterNavigator cluster={cluster} currentPath={`/resources/topics/${cluster.slug}`} />

      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Why this cluster is worth expanding</h2>
        <ul className="space-y-3 text-muted-foreground">
          {cluster.whyThisClusterWorks.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {cluster.relatedLinks && cluster.relatedLinks.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-foreground mb-4">More supporting pages</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {cluster.relatedLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="rounded-xl border border-border p-4 hover:border-primary/30 hover:bg-muted/20 transition-colors"
              >
                <p className="font-medium text-foreground">{link.label}</p>
                <p className="mt-2 text-sm text-muted-foreground">{link.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </ResourcePageLayout>
  );
}
