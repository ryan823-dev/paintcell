import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2, Plus, Eye, EyeOff, Trash2, Edit, ChevronUp, ChevronDown } from "lucide-react";
import { BilingualField, ImageUpload } from "@/components/console";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface HomeBanner {
  id: string;
  title_en: string | null;
  title_zh: string | null;
  subtitle_en: string | null;
  subtitle_zh: string | null;
  image_url: string;
  link_url: string | null;
  link_text_en: string | null;
  link_text_zh: string | null;
  sort_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

const defaultBanner: Partial<HomeBanner> = {
  title_en: "",
  title_zh: "",
  subtitle_en: "",
  subtitle_zh: "",
  image_url: "",
  link_url: "",
  link_text_en: "",
  link_text_zh: "",
  sort_order: 0,
  is_visible: true,
};

export default function HomeBannersEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [banners, setBanners] = useState<HomeBanner[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Partial<HomeBanner> | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    const { data, error } = await supabase
      .from("home_banners")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      toast({
        title: "加载失败 / Load Error",
        description: "无法加载轮播图 / Failed to load banners",
        variant: "destructive",
      });
    } else {
      setBanners((data as HomeBanner[]) || []);
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
    if (!confirm("确定要删除此轮播图吗？/ Are you sure you want to delete this banner?")) {
      return;
    }

    const { error } = await supabase
      .from("home_banners")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "删除失败 / Delete Failed",
        description: "请重试 / Please try again",
        variant: "destructive",
      });
    } else {
      toast({
        title: "删除成功 / Deleted",
        description: "轮播图已删除 / Banner deleted",
      });
      fetchBanners();
    }
  };

  const handleSave = async () => {
    if (!editingBanner) return;

    if (!editingBanner.image_url) {
      toast({
        title: "缺少图片 / Image Required",
        description: "请上传轮播图图片 / Please upload a banner image",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    const payload = {
      title_en: editingBanner.title_en || null,
      title_zh: editingBanner.title_zh || null,
      subtitle_en: editingBanner.subtitle_en || null,
      subtitle_zh: editingBanner.subtitle_zh || null,
      image_url: editingBanner.image_url,
      link_url: editingBanner.link_url || null,
      link_text_en: editingBanner.link_text_en || null,
      link_text_zh: editingBanner.link_text_zh || null,
      sort_order: editingBanner.sort_order || 0,
      is_visible: editingBanner.is_visible ?? true,
    };

    let error;
    if (isNew) {
      const result = await supabase.from("home_banners").insert(payload);
      error = result.error;
    } else {
      const result = await supabase
        .from("home_banners")
        .update(payload)
        .eq("id", editingBanner.id);
      error = result.error;
    }

    if (error) {
      toast({
        title: "保存失败 / Save Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "保存成功 / Saved",
        description: isNew ? "轮播图已创建 / Banner created" : "轮播图已更新 / Banner updated",
      });
      setDialogOpen(false);
      setEditingBanner(null);
      fetchBanners();
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
        title: "更新失败 / Update Failed",
        variant: "destructive",
      });
    } else {
      fetchBanners();
    }
  };

  const moveUp = async (index: number) => {
    if (index === 0) return;
    const newBanners = [...banners];
    [newBanners[index - 1], newBanners[index]] = [newBanners[index], newBanners[index - 1]];
    await updateSortOrders(newBanners);
  };

  const moveDown = async (index: number) => {
    if (index === banners.length - 1) return;
    const newBanners = [...banners];
    [newBanners[index], newBanners[index + 1]] = [newBanners[index + 1], newBanners[index]];
    await updateSortOrders(newBanners);
  };

  const updateSortOrders = async (orderedBanners: HomeBanner[]) => {
    for (let i = 0; i < orderedBanners.length; i++) {
      await supabase
        .from("home_banners")
        .update({ sort_order: i })
        .eq("id", orderedBanners[i].id);
    }
    fetchBanners();
  };

  const updateEditing = (field: keyof HomeBanner, value: string | boolean | number | null) => {
    if (editingBanner) {
      setEditingBanner({ ...editingBanner, [field]: value });
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
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">首页轮播图 / Home Banners</h1>
          <p className="text-muted-foreground">
            管理首页顶部轮播图 / Manage home page hero banners
          </p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          添加轮播图 / Add Banner
        </Button>
      </div>

      {banners.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            暂无轮播图，点击上方按钮添加 / No banners yet. Click the button above to add one.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {banners.map((banner, index) => (
            <Card key={banner.id} className={!banner.is_visible ? "opacity-60" : ""}>
              <CardContent className="py-4">
                <div className="flex items-center gap-4">
                  {/* Thumbnail */}
                  <div className="w-32 h-20 flex-shrink-0 rounded overflow-hidden bg-muted">
                    <img
                      src={banner.image_url}
                      alt={banner.title_en || "Banner"}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">
                      {banner.title_en || banner.title_zh || "无标题 / Untitled"}
                    </h3>
                    {banner.subtitle_en && (
                      <p className="text-sm text-muted-foreground truncate">
                        {banner.subtitle_en}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      {banner.is_visible ? (
                        <span className="text-xs text-green-600 flex items-center gap-1">
                          <Eye className="h-3 w-3" /> 显示中
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <EyeOff className="h-3 w-3" /> 已隐藏
                        </span>
                      )}
                      {banner.link_url && (
                        <span className="text-xs text-blue-600">
                          → {banner.link_url}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveUp(index)}
                      disabled={index === 0}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveDown(index)}
                      disabled={index === banners.length - 1}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleVisibility(banner)}
                      className="h-8 w-8 p-0"
                    >
                      {banner.is_visible ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
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
                      onClick={() => handleDelete(banner.id)}
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

      {/* Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isNew ? "添加轮播图 / Add Banner" : "编辑轮播图 / Edit Banner"}
            </DialogTitle>
          </DialogHeader>

          {editingBanner && (
            <div className="space-y-6 py-4">
              <ImageUpload
                label="轮播图图片 / Banner Image *"
                hint="建议尺寸: 1920x600px / Recommended: 1920x600px"
                value={editingBanner.image_url}
                onChange={(url) => updateEditing("image_url", url || "")}
              />

              <BilingualField
                label="标题 / Title"
                valueEn={editingBanner.title_en}
                valueZh={editingBanner.title_zh}
                onChangeEn={(v) => updateEditing("title_en", v)}
                onChangeZh={(v) => updateEditing("title_zh", v)}
              />

              <BilingualField
                label="副标题 / Subtitle"
                valueEn={editingBanner.subtitle_en}
                valueZh={editingBanner.subtitle_zh}
                onChangeEn={(v) => updateEditing("subtitle_en", v)}
                onChangeZh={(v) => updateEditing("subtitle_zh", v)}
                multiline
                rows={2}
              />

              <div className="space-y-2">
                <Label>链接地址 / Link URL</Label>
                <Input
                  value={editingBanner.link_url || ""}
                  onChange={(e) => updateEditing("link_url", e.target.value)}
                  placeholder="/quote 或 https://..."
                />
              </div>

              <BilingualField
                label="链接按钮文本 / Link Button Text"
                hint="留空则不显示按钮 / Leave empty to hide button"
                valueEn={editingBanner.link_text_en}
                valueZh={editingBanner.link_text_zh}
                onChangeEn={(v) => updateEditing("link_text_en", v)}
                onChangeZh={(v) => updateEditing("link_text_zh", v)}
              />

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={editingBanner.is_visible ?? true}
                    onCheckedChange={(checked) => updateEditing("is_visible", checked)}
                  />
                  <Label>显示此轮播图 / Show this banner</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Label>排序 / Order:</Label>
                  <Input
                    type="number"
                    value={editingBanner.sort_order || 0}
                    onChange={(e) => updateEditing("sort_order", parseInt(e.target.value) || 0)}
                    className="w-20"
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              取消 / Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  保存中...
                </>
              ) : (
                isNew ? "创建 / Create" : "保存 / Save"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
