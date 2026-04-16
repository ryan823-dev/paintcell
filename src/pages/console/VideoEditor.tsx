import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ImageUpload } from "@/components/console";
import { toast } from "@/hooks/use-toast";
import { Loader2, Save, ArrowLeft, Trash2 } from "lucide-react";
import type { Enums, Tables } from "@/integrations/supabase/types";

type VideoPost = Tables<"videos">;
type VideoCategory = Enums<"video_category">;
type ContentStatus = Enums<"content_status">;

const categoryOptions: Array<{ value: VideoCategory; label: string }> = [
  { value: "cleaning", label: "Cleaning" },
  { value: "process", label: "Process" },
  { value: "equipment", label: "Equipment" },
  { value: "case-study", label: "Case Study" },
  { value: "knowledge", label: "Knowledge" },
];

const defaultVideo: Partial<VideoPost> = {
  video_id: "",
  title: "",
  slug: "",
  description: "",
  category: null,
  video_url: "",
  thumbnail_url: null,
  duration_seconds: null,
  keywords: [],
  status: "draft",
  meta_title: "",
  meta_description: "",
  transcript: "",
  sort_order: 0,
  is_visible: true,
};

export default function VideoEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isNew = id === "new";

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [video, setVideo] = useState<Partial<VideoPost>>(() => {
    if (isNew) {
      const categoryParam = searchParams.get("category");
      const category = categoryOptions.some((option) => option.value === categoryParam)
        ? (categoryParam as VideoCategory)
        : null;
      return {
        ...defaultVideo,
        category,
      };
    }
    return defaultVideo;
  });

  // For managing keywords as comma-separated input
  const [keywordsInput, setKeywordsInput] = useState("");

  const fetchVideo = useCallback(async (videoId: string) => {
    const { data, error } = await supabase
      .from("videos")
      .select("*")
      .eq("id", videoId)
      .single();

    if (error) {
      if (error.code === "42P01") {
        toast({
          title: "Table Not Found",
          description: "Videos table not created yet. Please run migrations first.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to load video",
          variant: "destructive",
        });
      }
      navigate("/console/videos");
    } else {
      setVideo(data);
      setKeywordsInput((data.keywords || []).join(", "));
    }
    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    if (!isNew && id) {
      void fetchVideo(id);
    }
  }, [fetchVideo, id, isNew]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const generateVideoId = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleTitleChange = (title: string) => {
    setVideo((prev) => ({
      ...prev,
      title,
      slug: isNew ? generateSlug(title) : prev.slug,
      video_id: isNew ? generateVideoId(title) : prev.video_id,
    }));
  };

  const handleKeywordsChange = (value: string) => {
    setKeywordsInput(value);
    const keywords = value.split(",").map((k) => k.trim()).filter(Boolean);
    setVideo((prev) => ({ ...prev, keywords }));
  };

  const handleSave = async () => {
    if (!video.title || !video.slug || !video.video_id || !video.video_url) {
      toast({
        title: "Validation Error",
        description: "Title, slug, video ID, and video URL are required",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    const normalizedSlug = video.slug
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-|-$/g, "");

    if (!normalizedSlug) {
      toast({
        title: "Validation Error",
        description: "Slug must contain letters or numbers",
        variant: "destructive",
      });
      setSaving(false);
      return;
    }

    if (normalizedSlug !== video.slug) {
      setVideo((prev) => ({ ...prev, slug: normalizedSlug }));
    }

    if (isNew) {
      const { data: existingSlug, error: slugError } = await supabase
        .from("videos")
        .select("id")
        .eq("slug", normalizedSlug)
        .limit(1);

      if (slugError) {
        toast({ title: "Error", description: slugError.message, variant: "destructive" });
        setSaving(false);
        return;
      }

      if (existingSlug && existingSlug.length > 0) {
        toast({
          title: "Validation Error",
          description: "Slug already exists. Please choose a different slug.",
          variant: "destructive",
        });
        setSaving(false);
        return;
      }

      const { data: existingVideoId, error: videoIdError } = await supabase
        .from("videos")
        .select("id")
        .eq("video_id", video.video_id)
        .limit(1);

      if (videoIdError) {
        toast({ title: "Error", description: videoIdError.message, variant: "destructive" });
        setSaving(false);
        return;
      }

      if (existingVideoId && existingVideoId.length > 0) {
        toast({
          title: "Validation Error",
          description: "Video ID already exists. Please choose a different ID.",
          variant: "destructive",
        });
        setSaving(false);
        return;
      }
    }

    const publishedAt =
      (video.status || "draft") === "published"
        ? video.published_at || new Date().toISOString()
        : null;

    const videoData = {
      video_id: video.video_id,
      title: video.title,
      slug: normalizedSlug,
      description: video.description || null,
      category: (video.category as VideoCategory | null) || null,
      video_url: video.video_url,
      thumbnail_url: video.thumbnail_url || null,
      duration_seconds: video.duration_seconds || null,
      keywords: video.keywords || [],
      status: (video.status as ContentStatus | null) || "draft",
      published_at: publishedAt,
      meta_title: video.meta_title || null,
      meta_description: video.meta_description || null,
      transcript: video.transcript || null,
      sort_order: video.sort_order || 0,
      is_visible: video.is_visible ?? true,
    };

    if (isNew) {
      const { data, error } = await supabase
        .from("videos")
        .insert(videoData)
        .select()
        .single();

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({ title: "Created", description: "Video created successfully" });
        navigate(`/console/videos/${data.id}`);
      }
    } else {
      const { error } = await supabase
        .from("videos")
        .update(videoData)
        .eq("id", id);

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({ title: "Saved", description: "Changes saved successfully" });
      }
    }

    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this video?")) return;

    setDeleting(true);
    const { error } = await supabase
      .from("videos")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete video",
        variant: "destructive",
      });
      setDeleting(false);
    } else {
      toast({ title: "Deleted", description: "Video deleted" });
      navigate("/console/videos");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/console/videos")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">
            {isNew ? "New Video" : "Edit Video"}
          </h1>
        </div>
        {!isNew && (
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
          </Button>
        )}
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={video.title || ""}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Video title"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="video_id">Video ID *</Label>
                <Input
                  id="video_id"
                  value={video.video_id || ""}
                  onChange={(e) => setVideo({ ...video, video_id: e.target.value })}
                  placeholder="unique-video-id"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={video.slug || ""}
                  onChange={(e) => setVideo({ ...video, slug: e.target.value })}
                  placeholder="url-friendly-slug"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={video.category || ""}
                  onValueChange={(value) =>
                    setVideo({ ...video, category: value as VideoCategory })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={video.status || "draft"}
                  onValueChange={(value: ContentStatus) =>
                    setVideo({ ...video, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <Label>Visible</Label>
                <p className="text-xs text-muted-foreground">
                  Controls whether the video is visible on the public site
                </p>
              </div>
              <Switch
                checked={video.is_visible ?? true}
                onCheckedChange={(checked) => setVideo({ ...video, is_visible: checked })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={video.description || ""}
                onChange={(e) => setVideo({ ...video, description: e.target.value })}
                placeholder="Video description..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Video Source</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="video_url">Video URL *</Label>
              <Input
                id="video_url"
                value={video.video_url || ""}
                onChange={(e) => setVideo({ ...video, video_url: e.target.value })}
                placeholder="videos/knowledge/demo.mp4 or https://youtube.com/..."
              />
              <p className="text-xs text-muted-foreground">
                OSS path (e.g., videos/knowledge/demo.mp4) or external URL (YouTube/Vimeo)
              </p>
            </div>
            <div className="space-y-2">
              <ImageUpload
                label="Thumbnail"
                hint="Optional thumbnail for listings and social previews"
                value={video.thumbnail_url || null}
                onChange={(url) => setVideo({ ...video, thumbnail_url: url })}
              />
              <div className="space-y-2">
                <Label htmlFor="thumbnail_url">Thumbnail URL (optional)</Label>
                <Input
                  id="thumbnail_url"
                  value={video.thumbnail_url || ""}
                  onChange={(e) => setVideo({ ...video, thumbnail_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration_seconds">Duration (seconds)</Label>
                <Input
                  id="duration_seconds"
                  type="number"
                  value={video.duration_seconds || ""}
                  onChange={(e) => setVideo({ ...video, duration_seconds: parseInt(e.target.value) || null })}
                  placeholder="120"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sort_order">Sort Order</Label>
                <Input
                  id="sort_order"
                  type="number"
                  value={video.sort_order || 0}
                  onChange={(e) => setVideo({ ...video, sort_order: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Metadata</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords (comma-separated)</Label>
              <Input
                id="keywords"
                value={keywordsInput}
                onChange={(e) => handleKeywordsChange(e.target.value)}
                placeholder="rotary bell, cleaning, maintenance"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="transcript">Transcript (optional)</Label>
              <Textarea
                id="transcript"
                value={video.transcript || ""}
                onChange={(e) => setVideo({ ...video, transcript: e.target.value })}
                placeholder="Video transcript for accessibility and SEO..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="meta_title">Meta Title</Label>
              <Input
                id="meta_title"
                value={video.meta_title || ""}
                onChange={(e) => setVideo({ ...video, meta_title: e.target.value })}
                placeholder="SEO title (max 60 chars)"
                maxLength={60}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meta_description">Meta Description</Label>
              <Textarea
                id="meta_description"
                value={video.meta_description || ""}
                onChange={(e) => setVideo({ ...video, meta_description: e.target.value })}
                placeholder="SEO description (max 160 chars)"
                maxLength={160}
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => navigate("/console/videos")}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {isNew ? "Create" : "Save Changes"}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
