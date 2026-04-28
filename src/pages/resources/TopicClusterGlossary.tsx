import { useParams } from "react-router-dom";
import { ResourcePageLayout } from "@/components/resources";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { topicClusters } from "@/data/topicClusters";
import NotFound from "@/pages/NotFound";

export default function TopicClusterGlossary() {
  const { slug } = useParams<{ slug: string }>();
  const cluster = slug ? topicClusters[slug] : undefined;

  if (!cluster) {
    return <NotFound />;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "name": cluster.glossary.label,
    "description": cluster.glossary.description,
    "hasDefinedTerm": cluster.glossaryTerms.map((term) => ({
      "@type": "DefinedTerm",
      "name": term.term,
      "description": term.definition,
    })),
  };
  const metaDescription = `${cluster.glossary.description} Defines ${cluster.glossaryTerms
    .slice(0, 3)
    .map((term) => term.term)
    .join(", ")} for ${cluster.keyword} project planning.`;

  return (
    <ResourcePageLayout
      title={cluster.glossary.label}
      metaTitle={`${cluster.keyword} Glossary | Terms That Support ${cluster.keyword}`}
      metaDescription={metaDescription}
      breadcrumbs={[
        { label: "Resources", href: "/resources/engineering-library" },
        { label: "Topic Clusters", href: "/resources/topics" },
        { label: cluster.keyword, href: `/resources/topics/${cluster.slug}` },
        { label: "Glossary" },
      ]}
      structuredData={structuredData}
      canonicalPath={cluster.glossary.href}
    >
      <p className="text-lg text-muted-foreground mb-8">{cluster.glossary.description}</p>
      <div className="space-y-4">
        {cluster.glossaryTerms.map((term) => (
          <div key={term.term} className="rounded-2xl border border-border p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-foreground">{term.term}</h2>
                <p className="mt-2 text-muted-foreground">{term.definition}</p>
              </div>
              {term.href && (
                <Link to={term.href} className="text-sm font-medium text-primary hover:text-primary/80 underline underline-offset-4">
                  Open related page
                </Link>
              )}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Why it matters:</span> {term.whyItMatters}
            </p>
          </div>
        ))}
      </div>
    </ResourcePageLayout>
  );
}
