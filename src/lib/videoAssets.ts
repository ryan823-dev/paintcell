import type { VideoMetadata } from "../data/videoLibrary";

export const SITE_URL = "https://tdpaint.com";
export const VERTAX_OSS_BASE_URL = "https://vertax.oss-cn-hangzhou.aliyuncs.com";

export type StaticVideoAvailability = "ready" | "placeholder" | "missing";

const STATIC_VIDEO_STATUS_OVERRIDES: Record<string, StaticVideoAvailability> = {
  "bell-cleaning-demo-1": "placeholder",
  "bell-cleaning-demo-2": "placeholder",
  "endura-flo-dc-intro": "placeholder",
  "endura-flo-cleaning-demo": "placeholder",
  "pigging-color-change-demo": "missing",
};

function normalizeRelativePath(value: string) {
  return value.replace(/^\/+/, "");
}

export function resolveSiteAssetUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith("//")) return `https:${value}`;

  const normalized = normalizeRelativePath(value);

  if (normalized.startsWith("videos/")) {
    return `${VERTAX_OSS_BASE_URL}/${normalized}`;
  }

  return `${SITE_URL}/${normalized}`;
}

export function getStaticVideoAvailability(video: Pick<VideoMetadata, "id"> | string): StaticVideoAvailability {
  const videoId = typeof video === "string" ? video : video.id;
  return STATIC_VIDEO_STATUS_OVERRIDES[videoId] || "ready";
}

export function isStaticVideoPlayable(video: Pick<VideoMetadata, "id"> | string): boolean {
  return getStaticVideoAvailability(video) === "ready";
}

export function getStaticVideoSourceUrl(
  video: Pick<VideoMetadata, "id" | "ossPath">,
): string | null {
  if (!isStaticVideoPlayable(video)) {
    return null;
  }

  return resolveSiteAssetUrl(video.ossPath);
}
