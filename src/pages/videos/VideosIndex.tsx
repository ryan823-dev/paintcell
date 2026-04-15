import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Loader2, Video, Sparkles, Settings, FileText, BookOpen, ArrowRight, Play } from "lucide-react";
import { useI18n } from "@/i18n";
import { useCanonicalUrl } from "@/hooks/useRouteLocale";
import { getStaticPublicVideoRows, publicCmsAvailability } from "@/lib/publicCms";

type VideoCategory = "cleaning" | "process" | "equipment" | "case-study" | "knowledge";

const categoryConfig: Record<VideoCategory, { title: string; description: string; icon: React.ElementType }> = {
  cleaning: {
    title: "Cleaning",
    description: "Equipment cleaning and maintenance demonstrations",
    icon: Sparkles,
  },
  process: {
    title: "Process",
    description: "Painting process and workflow videos",
    icon: Settings,
  },
  equipment: {
    title: "Equipment",
    description: "Equipment operation and troubleshooting",
    icon: Video,
  },
  "case-study": {
    title: "Case Studies",
    description: "Project case study videos",
    icon: FileText,
  },
  knowledge: {
    title: "Knowledge",
    description: "Educational and training content",
    icon: BookOpen,
  },
};

interface VideoRow {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: VideoCategory | null;
  thumbnail_url: string | null;
  duration_seconds: number | null;
  keywords: string[] | null;
  sort_order: number;
  updated_at: string;
}

const formatDuration = (seconds: number | null) => {
  if (!seconds) return null;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export default function VideosIndex() {
  const { t } = useI18n();
  const page = t.videosPage || {};
  const publicVideoCmsEnabled = publicCmsAvailability.videos;
  const metaDescription = publicVideoCmsEnabled
    ? page.metaDescription || "Browse published videos maintained in our CMS."
    : "Browse demonstration, process, equipment, and case-study videos from TD Painting Systems.";
  const heroSubtitle = publicVideoCmsEnabled
    ? page.heroSubtitle || "Published videos from the CMS, grouped by category."
    : "Browse cleaning, process, equipment, and case-study videos from TD Painting Systems.";
  const localizedCategoryConfig: Record<
    VideoCategory,
    { title: string; description: string; icon: React.ElementType }
  > = {
    cleaning: { ...categoryConfig.cleaning, ...(page.categories?.cleaning || {}) },
    process: { ...categoryConfig.process, ...(page.categories?.process || {}) },
    equipment: { ...categoryConfig.equipment, ...(page.categories?.equipment || {}) },
    "case-study": { ...categoryConfig["case-study"], ...(page.categories?.["case-study"] || {}) },
    knowledge: { ...categoryConfig.knowledge, ...(page.categories?.knowledge || {}) },
  };
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<VideoRow[]>([]);
  const [activeTab, setActiveTab] = useState<VideoCategory>("cleaning");
  const canonicalUrl = useCanonicalUrl("/videos");

  useEffect(() => {
    const fetchVideos = async () => {
      if (!publicVideoCmsEnabled) {
        setVideos(getStaticPublicVideoRows() as VideoRow[]);
        setLoading(false);
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from("videos")
        .select("id,title,slug,description,category,thumbnail_url,duration_seconds,keywords,sort_order,updated_at")
        .eq("status", "published")
        .eq("is_visible", true)
        .order("sort_order", { ascending: true })
        .order("updated_at", { ascending: false });

      if (error) {
        if (error.code !== "42P01" && error.code !== "PGRST205") {
          toast({
            title: page.errorTitle || "Error",
            description: page.errorDescription || "Failed to load videos",
            variant: "destructive",
          });
        }
        setVideos(getStaticPublicVideoRows() as VideoRow[]);
      } else {
        setVideos((data as VideoRow[]) || []);
      }
      setLoading(false);
    };

    fetchVideos();
  }, [page.errorDescription, page.errorTitle, publicVideoCmsEnabled]);

  useEffect(() => {
    const firstCategoryWithContent = (Object.keys(localizedCategoryConfig) as VideoCategory[]).find((key) =>
      videos.some((video) => video.category === key),
    );

    if (firstCategoryWithContent) {
      setActiveTab(firstCategoryWithContent);
    }
  }, [videos]);

  const videosByCategory = new Map<VideoCategory, VideoRow[]>();
  (Object.keys(localizedCategoryConfig) as VideoCategory[]).forEach((key) => videosByCategory.set(key, []));
  videos.forEach((video) => {
    if (!video.category) return;
    const list = videosByCategory.get(video.category) || [];
    list.push(video);
    videosByCategory.set(video.category, list);
  });

  return (
    <>
      <Helmet>
        <title>{page.metaTitle || "Videos | TD Painting Systems"}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <div className="bg-background">
        <section className="py-12 md:py-16 border-b border-border">
          <div className="container-wide">
            <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Video className="h-5 w-5 text-accent" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
                    {page.badge || "Video Library"}
                  </span>
                </div>
                <h1 className="text-2xl md:text-4xl font-bold mb-3 leading-tight">{page.heroTitle || "Videos"}</h1>
                <p className="text-muted-foreground">{heroSubtitle}</p>
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline">
                  <Link to="/quote">{t.common.requestQuote || "Request Quote"}</Link>
                </Button>
                <Button asChild>
                  <Link to="/resources/engineering-library">
                    {t.common.engineeringLibrary || "Engineering Library"} <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container-wide">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as VideoCategory)} className="space-y-6">
                <TabsList className="flex flex-wrap h-auto gap-1">
                  {(Object.keys(localizedCategoryConfig) as VideoCategory[]).map((key) => (
                    <TabsTrigger key={key} value={key} className="text-sm">
                      {localizedCategoryConfig[key].title}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {(Object.keys(localizedCategoryConfig) as VideoCategory[]).map((key) => {
                  const config = localizedCategoryConfig[key];
                  const Icon = config.icon;
                  const list = videosByCategory.get(key) || [];

                  return (
                    <TabsContent key={key} value={key} className="space-y-6">
                      <Card>
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <Icon className="h-6 w-6 text-primary" />
                            <div>
                              <CardTitle>{config.title}</CardTitle>
                              <CardDescription>{config.description}</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>

                      {list.length === 0 ? (
                        <Card>
                          <CardContent className="py-10 text-center text-muted-foreground">
                            {page.emptyState || "No published videos in this category yet."}
                          </CardContent>
                        </Card>
                      ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {list.map((v) => {
                            const duration = formatDuration(v.duration_seconds);
                            return (
                              <Card key={v.id} className="overflow-hidden hover:shadow-md transition-shadow">
                                {v.thumbnail_url ? (
                                  <div className="h-40 bg-muted relative">
                                    <img
                                      src={v.thumbnail_url}
                                      alt={v.title}
                                      className="h-full w-full object-cover"
                                      loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                      <div className="h-10 w-10 rounded-full bg-black/60 flex items-center justify-center">
                                        <Play className="h-5 w-5 text-white" />
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="h-40 bg-muted flex items-center justify-center text-muted-foreground">
                                    <Video className="h-8 w-8" />
                                  </div>
                                )}
                                <CardContent className="p-5 space-y-3">
                                  <div className="space-y-1">
                                    <div className="font-semibold leading-snug line-clamp-2">{v.title}</div>
                                    {v.description ? (
                                      <div className="text-sm text-muted-foreground line-clamp-3">{v.description}</div>
                                    ) : null}
                                  </div>
                                  <div className="flex flex-wrap gap-1 items-center">
                                    {duration ? (
                                      <Badge variant="outline" className="text-xs">
                                        {duration}
                                      </Badge>
                                    ) : null}
                                    {v.keywords && v.keywords.length > 0 ? (
                                      <Badge variant="outline" className="text-xs">
                                        {v.keywords[0]}
                                      </Badge>
                                    ) : null}
                                  </div>
                                  <Button asChild className="w-full">
                                    <Link to={`/videos/${v.slug}`}>{t.common.watch || "Watch"}</Link>
                                  </Button>
                                </CardContent>
                              </Card>
                            );
                          })}
                        </div>
                      )}
                    </TabsContent>
                  );
                })}
              </Tabs>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
