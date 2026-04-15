import videoLibrary, { type VideoMetadata } from "@/data/videoLibrary";

const SITE_URL = "https://tdpaint.com";
const STATIC_VIDEO_UPDATED_AT = "2026-04-14T00:00:00.000Z";

export const publicCmsAvailability = {
  products: import.meta.env.VITE_ENABLE_PUBLIC_PRODUCTS_CMS === "true",
  videos: import.meta.env.VITE_ENABLE_PUBLIC_VIDEOS_CMS === "true",
} as const;

export type PublicVideoCategory = VideoMetadata["category"];

export interface PublicVideoRow {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: PublicVideoCategory | null;
  thumbnail_url: string | null;
  duration_seconds: number | null;
  keywords: string[] | null;
  sort_order: number;
  updated_at: string;
}

export interface PublicVideoDetail extends PublicVideoRow {
  video_id: string;
  video_url: string;
  transcript: string | null;
  meta_title: string | null;
  meta_description: string | null;
  published_at: string | null;
}

function toAbsoluteSiteUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith("//")) return `https:${value}`;
  return `${SITE_URL}/${value.replace(/^\/+/, "")}`;
}

function getStaticVideoSlug(video: Pick<VideoMetadata, "id">): string {
  return video.id;
}

function mapVideoToPublicDetail(video: VideoMetadata, index: number): PublicVideoDetail {
  return {
    id: video.id,
    video_id: video.id,
    title: video.title,
    slug: getStaticVideoSlug(video),
    description: video.description,
    category: video.category,
    video_url: toAbsoluteSiteUrl(video.ossPath) || "",
    thumbnail_url: toAbsoluteSiteUrl(video.thumbnailPath),
    duration_seconds: null,
    keywords: video.keywords,
    transcript: null,
    meta_title: `${video.title} | TD Painting Systems`,
    meta_description: video.description,
    published_at: null,
    sort_order: index,
    updated_at: STATIC_VIDEO_UPDATED_AT,
  };
}

export function getStaticPublicVideoRows(): PublicVideoRow[] {
  return videoLibrary.map((video, index) => mapVideoToPublicDetail(video, index));
}

export function getStaticPublicVideoBySlug(slug: string): PublicVideoDetail | null {
  const index = videoLibrary.findIndex((video) => getStaticVideoSlug(video) === slug);
  if (index === -1) {
    return null;
  }

  return mapVideoToPublicDetail(videoLibrary[index], index);
}
