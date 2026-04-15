import { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Edit,
  Eye,
  EyeOff,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import { BilingualField, ImageUpload } from "@/components/console";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface HomeBanner {
  id: string;
  title_en: string | null;
  subtitle_en: string | null;
  image_url: string;
  link_url: string | null;
  link_text_en: string | null;
  sort_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

type EditableBanner = Partial<Omit<HomeBanner, "created_at" | "updated_at">>;

const defaultBanner: EditableBanner = {
  title_en: "",
  subtitle_en: "",
  image_url: "",
  link_url: "",
  link_text_en: "",
  sort_order: 0,
  is_visible: true,
};

export default function HomeBannersEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [banners, setBanners] = useState<HomeBanner[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<EditableBanner | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    void fetchBanners();
  }, []);

  const fetchBanners = async () => {
    const { data, error } = await supabase
      .from("home_banners")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      toast({
        title: "Load Error",
        description: "Failed to load banners.",
        variant: "destructive",
      });
    } else {
      setBanners(data || []);
    }

    setLoading(false);
  };

  const handleAdd = () => {
    setEditingBanner({ ...defaultBanner, sort_order: banners.length });
    setIsNew(true);
    setDialogOpen(true);
  };

  const handleEdit = (banner: HomeBanner) => {
    setEditingBanner({ ...banner });
    setIsNew(false);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this banner?")) return;

    const { error } = await supabase
      .from("home_banners")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Delete Failed",
        description: "Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Deleted",
        description: "Banner deleted.",
      });
      await fetchBanners();
    }
  };

  const handleSave = async () => {
    if (!editingBanner?.image_url) {
      toast({
        title: "Image Required",
        description: "Please upload a banner image.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    const payload = {
      title_en: editingBanner.title_en || null,
      subtitle_en: editingBanner.subtitle_en || null,
      image_url: editingBanner.image_url,
      link_url: editingBanner.link_url || null,
      link_text_en: editingBanner.link_text_en || null,
      sort_order: editingBanner.sort_order || 0,
      is_visible: editingBanner.is_visible ?? true,
    };

    const result = isNew
      ? await supabase.from("home_banners").insert(payload)
      : await supabase.from("home_banners").update(payload).eq("id", editingBanner.id);

    if (result.error) {
      toast({
        title: "Save Failed",
        description: result.error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Saved",
        description: isNew ? "Banner created." : "Banner updated.",
      });
      setDialogOpen(false);
      setEditingBanner(null);
      await fetchBanners();
    }

    setSaving(false);
  };

  const toggleVisibility = async (banner: HomeBanner) => {
    const { error } = await supabase
      .from("home_banners")
      .update({ is_visible: !banner.is_visible })
      .eq("id", banner.id);

    if (error) {
      toast({
        title: "Update Failed",
        variant: "destructive",
      });
    } else {
      await fetchBanners();
    }
  };

  const updateSortOrders = async (orderedBanners: HomeBanner[]) => {
    for (const [index, banner] of orderedBanners.entries()) {
      await supabase
        .from("home_banners")
        .update({ sort_order: index })
        .eq("id", banner.id);
    }

    await fetchBanners();
  };

  const moveUp = async (index: number) => {
    if (index === 0) return;
    const next = [...banners];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    await updateSortOrders(next);
  };

  const moveDown = async (index: number) => {
    if (index === banners.length - 1) return;
    const next = [...banners];
    [next[index], next[index + 1]] = [next[index + 1], next[index]];
    await updateSortOrders(next);
  };

  const updateEditing = (
    field: keyof EditableBanner,
    value: string | boolean | number | null,
  ) => {
    if (!editingBanner) return;
    setEditingBanner({ ...editingBanner, [field]: value });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Home Banners</h1>
          <p className="text-muted-foreground">Manage hero banners shown on the home page.</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Banner
        </Button>
      </div>

      {banners.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No banners yet. Add one to get started.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {banners.map((banner, index) => (
            <Card key={banner.id} className={banner.is_visible ? "" : "opacity-60"}>
              <CardContent className="py-4">
                <div className="flex items-center gap-4">
                  <div className="h-20 w-32 flex-shrink-0 overflow-hidden rounded bg-muted">
                    <img
                      src={banner.image_url}
                      alt={banner.title_en || "Banner"}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-medium">
                      {banner.title_en || "Untitled"}
                    </h3>
                    {banner.subtitle_en ? (
                      <p className="truncate text-sm text-muted-foreground">
                        {banner.subtitle_en}
                      </p>
                    ) : null}
                    <div className="mt-1 flex items-center gap-2">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        {banner.is_visible ? (
                          <>
                            <Eye className="h-3 w-3" />
                            Visible
                          </>
                        ) : (
                          <>
                            <EyeOff className="h-3 w-3" />
                            Hidden
                          </>
                        )}
                      </span>
                      {banner.link_url ? (
                        <span className="text-xs text-blue-600">{banner.link_url}</span>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => void moveUp(index)}
                      disabled={index === 0}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => void moveDown(index)}
                      disabled={index === banners.length - 1}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => void toggleVisibility(banner)}
                      className="h-8 w-8 p-0"
                    >
                      {banner.is_visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(banner)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => void handleDelete(banner.id)}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isNew ? "Add Banner" : "Edit Banner"}</DialogTitle>
          </DialogHeader>

          {editingBanner ? (
            <div className="space-y-6 py-4">
              <ImageUpload
                label="Banner Image"
                hint="Recommended size: 1920x600px"
                value={editingBanner.image_url || ""}
                onChange={(url) => updateEditing("image_url", url || "")}
              />

              <BilingualField
                label="Title"
                valueEn={editingBanner.title_en}
                onChangeEn={(value) => updateEditing("title_en", value)}
              />

              <BilingualField
                label="Subtitle"
                valueEn={editingBanner.subtitle_en}
                onChangeEn={(value) => updateEditing("subtitle_en", value)}
                multiline
                rows={2}
              />

              <div className="space-y-2">
                <Label>Link URL</Label>
                <Input
                  value={editingBanner.link_url || ""}
                  onChange={(event) => updateEditing("link_url", event.target.value)}
                  placeholder="/quote or https://..."
                />
              </div>

              <BilingualField
                label="Link Button Text"
                hint="Leave empty to hide the button."
                valueEn={editingBanner.link_text_en}
                onChangeEn={(value) => updateEditing("link_text_en", value)}
              />

              <div className="flex items-center justify-between border-t pt-4">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={editingBanner.is_visible ?? true}
                    onCheckedChange={(checked) => updateEditing("is_visible", checked)}
                  />
                  <Label>Show this banner</Label>
                </div>

                <div className="flex items-center gap-2">
                  <Label>Order</Label>
                  <Input
                    type="number"
                    value={editingBanner.sort_order || 0}
                    onChange={(event) =>
                      updateEditing("sort_order", Number.parseInt(event.target.value, 10) || 0)
                    }
                    className="w-20"
                  />
                </div>
              </div>
            </div>
          ) : null}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => void handleSave()} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : isNew ? (
                "Create"
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
