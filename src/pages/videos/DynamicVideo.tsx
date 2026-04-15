import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ExternalLink, Loader2, Play } from "lucide-react";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ResourcePageLayout } from "@/components/resources";
import { supabase } from "@/integrations/supabase/client";
import NotFound from "@/pages/NotFound";
import { getStaticPublicVideoBySlug, publicCmsAvailability } from "@/lib/publicCms";

const DOMAIN = "https://tdpaint.com";

interface VideoData {
  id: string;
  video_id: string;
  title: string;
  slug: string;
  description: string | null;
  category: string | null;
  video_url: string;
  thumbnail_url: string | null;
  duration_seconds: number | null;
  keywords: string[] | null;
  transcript: string | null;
  meta_title: string | null;
  meta_description: string | null;
  published_at: string | null;
}

const categoryLabels: Record<string, string> = {
  cleaning: "Cleaning",
  process: "Process",
  equipment: "Equipment",
  "case-study": "Case Studies",
  knowledge: "Knowledge",
};

const resolveAssetUrl = (value: string | null) => {
  if (!value) return null;
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith("//")) return `https:${value}`;
  return `${DOMAIN}/${value.replace(/^\/+/, "")}`;
};

const getYoutubeId = (value: string) => {
  const patterns = [
    /youtu\.be\/([^?&#/]+)/i,
    /youtube\.com\/watch\?v=([^?&#/]+)/i,
    /youtube\.com\/embed\/([^?&#/]+)/i,
    /youtube\.com\/shorts\/([^?&#/]+)/i,
  ];

  for (const pattern of patterns) {
    const match = value.match(pattern);
    if (match?.[1]) return match[1];
  }

  return null;
};

const getVimeoId = (value: string) => {
  const match = value.match(/vimeo\.com\/(\d+)/i);
  return match?.[1] || null;
};

const formatDuration = (seconds: number | null) => {
  if (!seconds) return null;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export default function DynamicVideo() {
  const { slug } = useParams<{ slug: string }>();
  const [video, setVideo] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const publicVideoCmsEnabled = publicCmsAvailability.videos;

  useEffect(() => {
    if (!slug) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    const fetchVideo = async () => {
      if (!publicVideoCmsEnabled) {
        const fallbackVideo = getStaticPublicVideoBySlug(slug);
        if (!fallbackVideo) {
          setNotFound(true);
        } else {
          setVideo(fallbackVideo as VideoData);
        }
        setLoading(false);
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from("videos")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .eq("is_visible", true)
        .maybeSingle();

      if ((error && error.code !== "PGRST205" && error.code !== "42P01") || !data) {
        if (error?.code === "PGRST205" || error?.code === "42P01") {
          const fallbackVideo = getStaticPublicVideoBySlug(slug);
          if (fallbackVideo) {
            setVideo(fallbackVideo as VideoData);
            setLoading(false);
            return;
          }
        }
        setNotFound(true);
      } else {
        setVideo(data as VideoData);
      }
      setLoading(false);
    };

    fetchVideo();
  }, [publicVideoCmsEnabled, slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (notFound || !video) {
    return <NotFound />;
  }

  const title = video.title;
  const description = video.description || "";
  const metaTitle = video.meta_title || `${title} | TD Painting Systems`;
  const metaDescription = video.meta_description || description;
  const duration = formatDuration(video.duration_seconds);
  const categoryLabel = categoryLabels[video.category || ""] || "Videos";
  const resolvedVideoUrl = resolveAssetUrl(video.video_url);
  const resolvedThumbnailUrl = resolveAssetUrl(video.thumbnail_url);
  const youtubeId = resolvedVideoUrl ? getYoutubeId(resolvedVideoUrl) : null;
  const vimeoId = resolvedVideoUrl ? getVimeoId(resolvedVideoUrl) : null;
  const embedUrl = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}`
    : vimeoId
      ? `https://player.vimeo.com/video/${vimeoId}`
      : null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: title,
    description: metaDescription,
    uploadDate: video.published_at || undefined,
    thumbnailUrl: resolvedThumbnailUrl || undefined,
    embedUrl: embedUrl || undefined,
    contentUrl: resolvedVideoUrl || undefined,
  };

  return (
    <ResourcePageLayout
      title={title}
      metaTitle={metaTitle}
      metaDescription={metaDescription}
      breadcrumbs={[
        { label: "Videos", href: "/videos" },
        { label: categoryLabel },
        { label: title },
      ]}
      structuredData={structuredData}
      canonicalPath={`/videos/${video.slug}`}
    >
      <div className="not-prose space-y-8">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{categoryLabel}</Badge>
            {duration ? <Badge variant="outline">{duration}</Badge> : null}
            {video.keywords?.slice(0, 3).map((keyword) => (
              <Badge key={keyword} variant="secondary">
                {keyword}
              </Badge>
            ))}
          </div>
          {description ? (
            <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
          ) : null}
        </div>

        <div className="rounded-2xl border border-border overflow-hidden bg-muted/30">
          <div className="aspect-video bg-black">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : resolvedVideoUrl ? (
              <video
                className="w-full h-full"
                controls
                preload="metadata"
                poster={resolvedThumbnailUrl || undefined}
              >
                <source src={resolvedVideoUrl} />
                Your browser does not support video playback.
              </video>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <Play className="h-10 w-10" />
              </div>
            )}
          </div>
        </div>

        {resolvedVideoUrl ? (
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <a href={resolvedVideoUrl} target="_blank" rel="noreferrer">
                Open Source
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link to="/quote">Request Quote</Link>
            </Button>
          </div>
        ) : null}

        {video.transcript ? (
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Transcript</h2>
            <div className="rounded-xl border border-border bg-card p-5 whitespace-pre-wrap leading-7 text-muted-foreground">
              {video.transcript}
            </div>
          </section>
        ) : null}
      </div>
    </ResourcePageLayout>
  );
}
