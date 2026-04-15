import { useParams } from "react-router-dom";
import { ResourcePageLayout } from "@/components/resources";
import { topicClusters } from "@/data/topicClusters";
import NotFound from "@/pages/NotFound";

export default function TopicClusterScenario() {
  const { slug } = useParams<{ slug: string }>();
  const cluster = slug ? topicClusters[slug] : undefined;

  if (!cluster) {
    return <NotFound />;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": cluster.scenario.label,
    "description": cluster.scenario.description,
  };

  return (
    <ResourcePageLayout
      title={cluster.scenario.label}
      metaTitle={`${cluster.keyword} Scenario | Project Framing for ${cluster.keyword}`}
      metaDescription={cluster.metaDescription}
      breadcrumbs={[
        { label: "Resources", href: "/resources/engineering-library" },
        { label: "Topic Clusters", href: "/resources/topics" },
        { label: cluster.keyword, href: `/resources/topics/${cluster.slug}` },
        { label: "Scenario" },
      ]}
      structuredData={structuredData}
      canonicalPath={cluster.scenario.href}
    >
      <p className="text-lg text-muted-foreground mb-6">{cluster.scenario.description}</p>

      <div className="rounded-2xl border border-border p-6 mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-3">{cluster.scenarioDetails.title}</h2>
        <p className="text-muted-foreground">{cluster.scenarioDetails.summary}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border p-5">
          <h3 className="text-lg font-semibold text-foreground mb-3">Challenges</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {cluster.scenarioDetails.challengePoints.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border p-5">
          <h3 className="text-lg font-semibold text-foreground mb-3">Evaluation steps</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {cluster.scenarioDetails.evaluationSteps.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border p-5">
          <h3 className="text-lg font-semibold text-foreground mb-3">Healthy outcome signals</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {cluster.scenarioDetails.outcomeSignals.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ResourcePageLayout>
  );
}
