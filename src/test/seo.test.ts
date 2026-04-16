import { describe, expect, it } from "vitest";
import { homeContent } from "../content/home/en";
import { getPageMetadata, toDateOnly } from "../data/pageMetadata";
import { generateVideoSchema } from "../data/videoLibrary";
import { locales } from "../i18n/types";
import { getIndexableLocalesForPath, getPrerenderLocalesForPath } from "../lib/seo";

describe("getPrerenderLocalesForPath", () => {
  it("keeps multi-locale prerendering only for explicitly multi-locale paths", () => {
    expect(getPrerenderLocalesForPath("/quote")).toEqual(locales);
    expect(getPrerenderLocalesForPath("/about")).toEqual(["en"]);
  });

  it("still prerenders default-locale noindex routes that are useful in-product", () => {
    expect(getIndexableLocalesForPath("/thank-you")).toEqual([]);
    expect(getPrerenderLocalesForPath("/thank-you")).toEqual(["en"]);
    expect(getPrerenderLocalesForPath("/products/catalog")).toEqual(["en"]);
  });

  it("keeps the homepage title aligned with the canonical execution plan", () => {
    expect(homeContent.seo.metaTitle).toBe(
      "TD Painting Systems | Robotic Painting and Paint Booth Automation",
    );
    expect(homeContent.seo.metaTitle.length).toBeLessThanOrEqual(70);
  });

  it("builds reusable video schema for dynamic video detail pages", () => {
    const schema = generateVideoSchema({
      slug: "robotic-painting-demo",
      title: "Robotic Painting Demo",
      description: "Video walkthrough for a robotic paint cell.",
      keywords: ["robotic painting", "paint booth automation"],
      contentUrl: "https://cdn.example.com/demo.mp4",
      embedUrl: "https://www.youtube.com/embed/demo123",
      thumbnailUrl: "/images/og-social-share.png",
      uploadDate: "2026-04-16",
      durationSeconds: 125,
    });

    expect(schema).toMatchObject({
      "@type": "VideoObject",
      url: "https://tdpaint.com/videos/robotic-painting-demo",
      embedUrl: "https://www.youtube.com/embed/demo123",
      contentUrl: "https://cdn.example.com/demo.mp4",
      thumbnailUrl: "https://tdpaint.com/images/og-social-share.png",
      uploadDate: "2026-04-16",
      duration: "PT2M5S",
      publisher: {
        "@id": "https://tdpaint.com/#organization",
        name: "TD Painting Systems",
      },
    });
  });

  it("exposes unified page metadata for reviewed static pages", () => {
    expect(getPageMetadata("/products")).toMatchObject({
      updatedAt: "2026-04-16",
      authorName: "TD Engineering Team",
    });
  });

  it("normalizes timestamps to sitemap-friendly date strings", () => {
    expect(toDateOnly("2026-04-16T12:30:45.000Z")).toBe("2026-04-16");
    expect(toDateOnly(null)).toBeNull();
  });
});
