import { Helmet } from "react-helmet-async";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

/**
 * Generates BreadcrumbList structured data for SEO and AEO.
 * Critical for AI search engines to understand site structure.
 */
export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

/**
 * Generates BreadcrumbList from breadcrumb array used in ResourcePageLayout.
 * Automatically creates full URLs from relative paths.
 */
export function createBreadcrumbSchema(items: Array<{ label: string; href?: string }>) {
  const baseUrl = "https://tdpaint.com";
  return items.map((item, index) => {
    const isLast = index === items.length - 1;
    return {
      name: item.label,
      url: isLast && !item.href ? "" : `${baseUrl}${item.href || ""}`
    };
  }).filter(item => item.url); // Remove items without URLs (current page)
}