/**
 * SEO Components for tdpaint.com
 * 
 * These components generate structured data (Schema.org) for search engines
 * and AI-powered search assistants (AEO - Answer Engine Optimization).
 * 
 * Components:
 * - BreadcrumbSchema: BreadcrumbList for navigation structure
 * - Hreflang: Multi-language alternate links
 * - SpeakableSchema: Voice search optimization
 * - ArticleWithSpeakable: Combined TechArticle + Speakable
 * - ServiceSchema: Service structured data for solution pages
 */

export { BreadcrumbSchema, createBreadcrumbSchema } from "./BreadcrumbSchema";
export { Hreflang } from "./Hreflang";
export { SpeakableSchema, ArticleWithSpeakable } from "./SpeakableSchema";
export { ServiceSchema, services } from "./ServiceSchema";