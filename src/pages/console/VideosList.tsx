import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Loader2, Plus, Edit, Eye, EyeOff, Video, Sparkles, Settings, Palette, FileText, BookOpen } from "lucide-react";

// Video category configuration
const categoryConfig: Record<string, { title: string; description: string; icon: React.ElementType }> = {
  "cleaning": {
    title: "Cleaning",
    description: "Equipment cleaning and maintenance demonstrations",
    icon: Sparkles,
  },
  "process": {
    title: "Process",
    description: "Painting process and workflow videos",
    icon: Settings,
  },
  "equipment": {
    title: "Equipment",
    description: "Equipment operation and troubleshooting",
    icon: Video,
  },
  "case-study": {
    title: "Case Studies",
    description: "Project case study videos",
    icon: FileText,
  },
  "knowledge": {
    title: "Knowledge",
    description: "Educational and training content",
    icon: BookOpen,
  },
};

const statusColors = {
  draft: "bg-muted text-muted-foreground",
  review: "bg-amber-100 text-amber-800",
  published: "bg-green-100 text-green-800",
};

interface VideoPost {
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
  status: "draft" | "review" | "published";
  sort_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export default function VideosList() {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<VideoPost[]>([]);
  const [activeTab, setActiveTab] = useState<string>("cleaning");

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const { data, error } = await supabase
      .from("videos")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("updated_at", { ascending: false });

    if (error) {
      // Table might not exist yet
      if (error.code === "42P01") {
        setVideos([]);
      } else {
        toast({
          title: "Error",
          description: "Failed to load videos",
          variant: "destructive",
        });
      }
    } else {
      setVideos(data || []);
    }
    setLoading(false);
  };

  const togglePublish = async (video: VideoPost) => {
    const newStatus = video.status === "published" ? "draft" : "published";
    const { error } = await supabase
      .from("videos")
      .update({
        status: newStatus,
        published_at: newStatus === "published" ? new Date().toISOString() : null,
      })
      .eq("id", video.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    } else {
      fetchVideos();
      toast({
        title: "Updated",
        description: `Video ${newStatus === "published" ? "published" : "unpublished"}`,
      });
    }
  };

  const toggleVisibility = async (video: VideoPost) => {
    const { error } = await supabase
      .from("videos")
      .update({ is_visible: !video.is_visible })
      .eq("id", video.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update visibility",
        variant: "destructive",
      });
    } else {
      fetchVideos();
    }
  };

  const getVideosByCategory = (category: string) => {
    return videos.filter((v) => v.category === category);
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return "";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Videos</h1>
          <p className="text-muted-foreground">Manage video library metadata</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="flex flex-wrap h-auto gap-1">
          {Object.entries(categoryConfig).map(([key, config]) => (
            <TabsTrigger key={key} value={key} className="text-sm">
              {config.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(categoryConfig).map(([category, config]) => {
          const Icon = config.icon;
          const categoryVideos = getVideosByCategory(category);

          return (
            <TabsContent key={category} value={category} className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="h-6 w-6 text-primary" />
                      <div>
                        <CardTitle>{config.title}</CardTitle>
                        <CardDescription>{config.description}</CardDescription>
                      </div>
                    </div>
                    <Button asChild>
                      <Link to={`/console/videos/new?category=${category}`}>
                        <Plus className="mr-2 h-4 w-4" />
                        New Video
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  {categoryVideos.length === 0 ? (
                    <div className="text-center py-8">
                      <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">
                        No videos in this category yet.
                      </p>
                      <Button asChild>
                        <Link to={`/console/videos/new?category=${category}`}>
                          <Plus className="mr-2 h-4 w-4" />
                          Add First Video
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {categoryVideos.map((video) => (
                        <div
                          key={video.id}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium truncate">{video.title}</span>
                              <Badge className={statusColors[video.status]}>
                                {video.status}
                              </Badge>
                              {video.duration_seconds && (
                                <Badge variant="outline">
                                  {formatDuration(video.duration_seconds)}
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              ID: {video.video_id} | /videos/{video.slug}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={video.is_visible}
                              onCheckedChange={() => toggleVisibility(video)}
                              title={video.is_visible ? "Visible" : "Hidden"}
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => togglePublish(video)}
                              title={video.status === "published" ? "Unpublish" : "Publish"}
                            >
                              {video.status === "published" ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                              <Link to={`/console/videos/${video.id}`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
