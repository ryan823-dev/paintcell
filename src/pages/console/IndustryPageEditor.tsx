import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SaveButton } from "@/components/console";
import { toast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft, Trash2 } from "lucide-react";

export default function IndustryPageEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    slug: "",
    industry_label: "",
    industry_label_zh: "",
    coming_soon: false,
    meta_title: "",
    meta_title_zh: "",
    meta_description: "",
    meta_description_zh: "",
    hero_title: "",
    hero_title_zh: "",
    hero_subtitle: "",
    hero_subtitle_zh: "",
    hero_image: "",
    cta_text: "",
    cta_text_zh: "",
    example_prompt: "",
    ai_context: "{}",
    pain_points: "[]",
    pain_points_zh: "[]",
    system_modules: "[]",
    system_modules_zh: "[]",
    production_config: "{}",
    production_config_zh: "{}",
    roi_metrics: "[]",
    roi_metrics_zh: "[]",
    case_references: "[]",
    case_references_zh: "[]",
    faqs: "[]",
    faqs_zh: "[]",
  });

  useEffect(() => {
    if (!isNew && id) {
      fetchPage();
    }
  }, [id, isNew]);

  const fetchPage = async () => {
    const { data, error } = await supabase
      .from("industry_pages")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      toast({ title: "Error", description: "Page not found", variant: "destructive" });
      navigate("/console/industry-pages");
      return;
    }

    setForm({
      slug: data.slug,
      industry_label: data.industry_label,
      industry_label_zh: data.industry_label_zh || "",
      coming_soon: data.coming_soon,
      meta_title: data.meta_title || "",
      meta_title_zh: data.meta_title_zh || "",
      meta_description: data.meta_description || "",
      meta_description_zh: data.meta_description_zh || "",
      hero_title: data.hero_title || "",
      hero_title_zh: data.hero_title_zh || "",
      hero_subtitle: data.hero_subtitle || "",
      hero_subtitle_zh: data.hero_subtitle_zh || "",
      hero_image: data.hero_image || "",
      cta_text: data.cta_text || "",
      cta_text_zh: data.cta_text_zh || "",
      example_prompt: data.example_prompt || "",
      ai_context: JSON.stringify(data.ai_context || {}, null, 2),
      pain_points: JSON.stringify(data.pain_points || [], null, 2),
      pain_points_zh: JSON.stringify(data.pain_points_zh || [], null, 2),
      system_modules: JSON.stringify(data.system_modules || [], null, 2),
      system_modules_zh: JSON.stringify(data.system_modules_zh || [], null, 2),
      production_config: JSON.stringify(data.production_config || {}, null, 2),
      production_config_zh: JSON.stringify(data.production_config_zh || {}, null, 2),
      roi_metrics: JSON.stringify(data.roi_metrics || [], null, 2),
      roi_metrics_zh: JSON.stringify(data.roi_metrics_zh || [], null, 2),
      case_references: JSON.stringify(data.case_references || [], null, 2),
      case_references_zh: JSON.stringify(data.case_references_zh || [], null, 2),
      faqs: JSON.stringify(data.faqs || [], null, 2),
      faqs_zh: JSON.stringify(data.faqs_zh || [], null, 2),
    });
    setLoading(false);
  };

  const handleSave = async () => {
    if (!form.slug || !form.industry_label) {
      toast({ title: "必填 / Required", description: "Slug and industry label are required", variant: "destructive" });
      return;
    }

    setSaving(true);
    try {
      const payload = {
        slug: form.slug,
        industry_label: form.industry_label,
        industry_label_zh: form.industry_label_zh || null,
        coming_soon: form.coming_soon,
        meta_title: form.meta_title || null,
        meta_title_zh: form.meta_title_zh || null,
        meta_description: form.meta_description || null,
        meta_description_zh: form.meta_description_zh || null,
        hero_title: form.hero_title || null,
        hero_title_zh: form.hero_title_zh || null,
        hero_subtitle: form.hero_subtitle || null,
        hero_subtitle_zh: form.hero_subtitle_zh || null,
        hero_image: form.hero_image || null,
        cta_text: form.cta_text || null,
        cta_text_zh: form.cta_text_zh || null,
        example_prompt: form.example_prompt || null,
        ai_context: JSON.parse(form.ai_context),
        pain_points: JSON.parse(form.pain_points),
        pain_points_zh: JSON.parse(form.pain_points_zh),
        system_modules: JSON.parse(form.system_modules),
        system_modules_zh: JSON.parse(form.system_modules_zh),
        production_config: JSON.parse(form.production_config),
        production_config_zh: JSON.parse(form.production_config_zh),
        roi_metrics: JSON.parse(form.roi_metrics),
        roi_metrics_zh: JSON.parse(form.roi_metrics_zh),
        case_references: JSON.parse(form.case_references),
        case_references_zh: JSON.parse(form.case_references_zh),
        faqs: JSON.parse(form.faqs),
        faqs_zh: JSON.parse(form.faqs_zh),
        updated_at: new Date().toISOString(),
      };

      if (isNew) {
        const { error } = await supabase.from("industry_pages").insert(payload);
        if (error) throw error;
        toast({ title: "已创建 / Created" });
        navigate("/console/industry-pages");
      } else {
        const { error } = await supabase.from("industry_pages").update(payload).eq("id", id);
        if (error) throw error;
        toast({ title: "已保存 / Saved" });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast({ title: "保存失败 / Failed", description: message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("确认删除？/ Confirm delete?")) return;
    const { error } = await supabase.from("industry_pages").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "已删除 / Deleted" });
      navigate("/console/industry-pages");
    }
  };

  const update = (key: string, value: string | boolean) => setForm(prev => ({ ...prev, [key]: value }));

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/console/industry-pages")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">{isNew ? "新建行业页 / New Industry Page" : "编辑行业页 / Edit"}</h1>
        </div>
        <div className="flex gap-2">
          {!isNew && (
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              删除 / Delete
            </Button>
          )}
          <SaveButton saving={saving} onClick={handleSave} />
        </div>
      </div>

      <div className="space-y-6">
        {/* Basic Info */}
        <Card>
          <CardHeader><CardTitle>基本信息 / Basic Info</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Slug (URL路径)</Label>
                <Input value={form.slug} onChange={e => update("slug", e.target.value)} placeholder="automotive-painting" />
              </div>
              <div className="flex items-center gap-3 pt-6">
                <Switch checked={form.coming_soon} onCheckedChange={v => update("coming_soon", v)} />
                <Label>即将上线 / Coming Soon</Label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>行业标签 EN</Label>
                <Input value={form.industry_label} onChange={e => update("industry_label", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>行业标签 ZH</Label>
                <Input value={form.industry_label_zh} onChange={e => update("industry_label_zh", e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SEO */}
        <Card>
          <CardHeader><CardTitle>SEO</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Meta Title EN</Label>
                <Input value={form.meta_title} onChange={e => update("meta_title", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Meta Title ZH</Label>
                <Input value={form.meta_title_zh} onChange={e => update("meta_title_zh", e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Meta Description EN</Label>
                <Textarea value={form.meta_description} onChange={e => update("meta_description", e.target.value)} rows={2} />
              </div>
              <div className="space-y-2">
                <Label>Meta Description ZH</Label>
                <Textarea value={form.meta_description_zh} onChange={e => update("meta_description_zh", e.target.value)} rows={2} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hero */}
        <Card>
          <CardHeader><CardTitle>Hero 区块</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Hero Title EN</Label>
                <Input value={form.hero_title} onChange={e => update("hero_title", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Hero Title ZH</Label>
                <Input value={form.hero_title_zh} onChange={e => update("hero_title_zh", e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Hero Subtitle EN</Label>
                <Textarea value={form.hero_subtitle} onChange={e => update("hero_subtitle", e.target.value)} rows={2} />
              </div>
              <div className="space-y-2">
                <Label>Hero Subtitle ZH</Label>
                <Textarea value={form.hero_subtitle_zh} onChange={e => update("hero_subtitle_zh", e.target.value)} rows={2} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Hero 图片URL</Label>
              <Input value={form.hero_image} onChange={e => update("hero_image", e.target.value)} placeholder="/industry-heroes/automotive.jpg" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>CTA Text EN</Label>
                <Input value={form.cta_text} onChange={e => update("cta_text", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>CTA Text ZH</Label>
                <Input value={form.cta_text_zh} onChange={e => update("cta_text_zh", e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Context */}
        <Card>
          <CardHeader><CardTitle>AI 上下文</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>AI Context (JSON)</Label>
              <Textarea value={form.ai_context} onChange={e => update("ai_context", e.target.value)} rows={4} className="font-mono text-sm" />
            </div>
            <div className="space-y-2">
              <Label>示例提示语 / Example Prompt</Label>
              <Textarea value={form.example_prompt} onChange={e => update("example_prompt", e.target.value)} rows={2} />
            </div>
          </CardContent>
        </Card>

        {/* Structured Data - JSON editors */}
        {[
          { label: "痛点 / Pain Points", key: "pain_points" },
          { label: "系统模块 / System Modules", key: "system_modules" },
          { label: "生产配置 / Production Config", key: "production_config" },
          { label: "ROI 指标 / ROI Metrics", key: "roi_metrics" },
          { label: "案例参考 / Case References", key: "case_references" },
          { label: "FAQ", key: "faqs" },
        ].map(({ label, key }) => (
          <Card key={key}>
            <CardHeader><CardTitle>{label}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>EN (JSON)</Label>
                  <Textarea
                    value={form[key as keyof typeof form] as string}
                    onChange={e => update(key, e.target.value)}
                    rows={6}
                    className="font-mono text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <Label>ZH (JSON)</Label>
                  <Textarea
                    value={form[`${key}_zh` as keyof typeof form] as string}
                    onChange={e => update(`${key}_zh`, e.target.value)}
                    rows={6}
                    className="font-mono text-xs"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
