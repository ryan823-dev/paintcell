import { Helmet } from "react-helmet-async";

interface SpeakableSchemaProps {
  /**
   * CSS selector for the speakable content area.
   * Usually the main article content.
   */
  cssSelector?: string;
  /**
   * Alternative XPath selector (optional).
   */
  xpath?: string;
}

/**
 * SpeakableSpecification Schema for voice search optimization (AEO).
 * Helps voice assistants identify content that can be read aloud.
 * 
 * Usage: Add to article pages with the main content selector.
 * Google Assistant and other voice assistants use this for voice search results.
 */
export function SpeakableSchema({ 
  cssSelector = "[data-speakable]", 
  xpath 
}: SpeakableSchemaProps) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SpeakableSpecification",
    "cssSelector": [cssSelector]
  };

  if (xpath) {
    schema["xpath"] = [xpath];
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

/**
 * Combined Article Schema with Speakable for tech articles.
 * Includes headline, description, and speakable content areas.
 */
interface ArticleWithSpeakableProps {
  headline: string;
  description: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
  url: string;
  image?: string;
  speakableSelector?: string;
}

export function ArticleWithSpeakable({
  headline,
  description,
  author = "TD Robotic Painting Systems",
  datePublished,
  dateModified,
  url,
  image,
  speakableSelector = "article, [data-speakable], .prose"
}: ArticleWithSpeakableProps) {
  const schemas: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "headline": headline,
      "description": description,
      "author": {
        "@type": "Organization",
        "name": author,
        "url": "https://tdpaint.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "TD Robotic Painting Systems",
        "url": "https://tdpaint.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://tdpaint.com/images/og-social-share.png"
        }
      },
      "url": url,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": url
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "SpeakableSpecification",
      "cssSelector": [speakableSelector]
    }
  ];

  if (datePublished) {
    schemas[0]["datePublished"] = datePublished;
  }
  if (dateModified) {
    schemas[0]["dateModified"] = dateModified;
  }
  if (image) {
    schemas[0]["image"] = image;
  }

  return (
    <Helmet>
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">{JSON.stringify(schema)}</script>
      ))}
    </Helmet>
  );
}