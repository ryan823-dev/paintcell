import { ResourcePageLayout } from "@/components/resources";
import { TopicClusterDirectory } from "@/components/seo/TopicClusterDirectory";
import { topicClusterList } from "@/data/topicClusters";

export default function TopicClusters() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Paint Topic Clusters",
    "description": "Topic clusters for robotic painting, furniture coating, ATEX spray painting booth, flame treatment, paint booth design, and other high-intent coating themes.",
    "hasPart": topicClusterList.map((cluster, index) => ({
      "@type": "WebPage",
      "position": index + 1,
      "name": cluster.keyword,
      "url": `https://tdpaint.com/en/resources/topics/${cluster.slug}`,
    })),
  };

  return (
    <ResourcePageLayout
      title="Paint Topic Clusters"
      metaTitle="Paint Topic Clusters | Robotic Painting, Furniture Coating, ATEX, Booth Design"
      metaDescription="Structured topic clusters built around robotic painting, furniture coating, ATEX spray painting booth, flame treatment, paint booth design, metal parts finishing, and related commercial themes."
      breadcrumbs={[
        { label: "Resources", href: "/resources/engineering-library" },
        { label: "Topic Clusters" },
      ]}
      structuredData={structuredData}
      canonicalPath="/resources/topics"
    >
      <p className="text-lg text-muted-foreground mb-8">
        These topic clusters organize high-intent themes into connected guide, FAQ, glossary, scenario, industry, and solution pages.
        The goal is to make depth visible to search engines and easier to navigate for project-stage visitors.
      </p>

      <TopicClusterDirectory />

      <div className="mt-10 space-y-4 text-muted-foreground">
        <h2 className="text-2xl font-semibold text-foreground">Why clusters matter here</h2>
        <p>
          The site already shows early exposure around a handful of engineering themes.
          Turning each theme into a small cluster helps search engines see that the content is not isolated, but part of a deeper body of knowledge.
        </p>
        <p>
          Each cluster links informational pages to industry and solution pages so traffic can move naturally from education into project evaluation.
        </p>
      </div>
    </ResourcePageLayout>
  );
}
