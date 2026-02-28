import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SaveButton } from "@/components/console";
import { toast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft, Trash2 } from "lucide-react";

const jsonFields = [
  "why_items", "scope_items", "scope_sub_sections", "component_items",
  "process_steps", "application_scope", "config_options",
  "technical_parameters", "constraints", "atex_items",
  "roi_metrics", "timeline", "faqs", "related_industries", "related_knowledge", "eeat",
];

const jsonFieldsZh = [
  "why_items_zh", "scope_items_zh", "process_steps_zh", "faqs_zh",
];

export default function SolutionPageEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({
    slug: "",
    meta_title: "", meta_title_zh: "",
    meta_description: "", meta_description_zh: "",
    hero_title: "", hero_title_zh: "",
    hero_subtitle: "", hero_subtitle_zh: "",
    definition: "", definition_zh: "",
    definition_secondary: "", definition_secondary_zh: "",
    why_title: "", why_title_zh: "",
    why_intro: "", why_intro_zh: "",
    scope_intro: "", scope_intro_zh: "",
    components_intro: "",
    application_scope_intro: "",
    technical_parameters_intro: "",
    atex_intro: "",
    roi_methodology: "", roi_methodology_zh: "",
    deployment_note: "", deployment_note_zh: "",
    // JSON fields
    why_items: "[]", scope_items: "[]", scope_sub_sections: "[]",
    component_items: "[]", process_steps: "[]", application_scope: "[]",
    config_options: "[]", technical_parameters: "[]", constraints: "[]",
    atex_items: "[]", roi_metrics: "[]", timeline: "[]",
    faqs: "[]", related_industries: "[]", related_knowledge: "[]",
    eeat: "{}",
    // ZH JSON
    why_items_zh: "[]", scope_items_zh: "[]",
    process_steps_zh: "[]", faqs_zh: "[]",
  });

  useEffect(() => {
    if (!isNew && id) fetchPage();
  }, [id, isNew]);

  const fetchPage = async () => {
    const { data, error } = await supabase
      .from("solution_pages")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      toast({ title: "Error", description: "Page not found", variant: "destructive" });
      navigate("/console/solution-pages");
      return;
    }

    const newForm: Record<string, string> = {};
    for (const key of Object.keys(form)) {
      const val = (data as Record<string, unknown>)[key];
      if (jsonFields.includes(key) || jsonFieldsZh.includes(key)) {
        newForm[key] = JSON.stringify(val || (key === "eeat" ? {} : []), null, 2);
      } else {
        newForm[key] = (val as string) || "";
      }
    }
    setForm(newForm);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!form.slug) {
      toast({ title: "必填 / Required", description: "Slug is required", variant: "destructive" });
      return;
    }

    setSaving(true);
    try {
      const payload: Record<string, unknown> = { updated_at: new Date().toISOString() };
      for (const key of Object.keys(form)) {
        if (jsonFields.includes(key) || jsonFieldsZh.includes(key)) {
          payload[key] = JSON.parse(form[key]);
        } else {
          payload[key] = form[key] || null;
        }
      }

      if (isNew) {
        const { error } = await supabase.from("solution_pages").insert(payload as any);
        if (error) throw error;
        toast({ title: "已创建 / Created" });
        navigate("/console/solution-pages");
      } else {
        const { error } = await supabase.from("solution_pages").update(payload).eq("id", id!);
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
    const { error } = await supabase.from("solution_pages").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "已删除 / Deleted" });
      navigate("/console/solution-pages");
    }
  };

  const update = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const textSection = (title: string, fields: { label: string; key: string; textarea?: boolean }[]) => (
    <Card>
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        {fields.map(f => (
          <div key={f.key} className="space-y-2">
            <Label>{f.label}</Label>
            {f.textarea ? (
              <Textarea value={form[f.key]} onChange={e => update(f.key, e.target.value)} rows={3} />
            ) : (
              <Input value={form[f.key]} onChange={e => update(f.key, e.target.value)} />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const jsonSection = (title: string, key: string, zhKey?: string) => (
    <Card>
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className={zhKey ? "grid grid-cols-2 gap-4" : ""}>
          <div className="space-y-2">
            <Label>EN (JSON)</Label>
            <Textarea value={form[key]} onChange={e => update(key, e.target.value)} rows={6} className="font-mono text-xs" />
          </div>
          {zhKey && (
            <div className="space-y-2">
              <Label>ZH (JSON)</Label>
              <Textarea value={form[zhKey]} onChange={e => update(zhKey, e.target.value)} rows={6} className="font-mono text-xs" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/console/solution-pages")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">{isNew ? "新建方案页 / New" : "编辑方案页 / Edit"}</h1>
        </div>
        <div className="flex gap-2">
          {!isNew && (
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              <Trash2 className="mr-2 h-4 w-4" /> 删除
            </Button>
          )}
          <SaveButton saving={saving} onClick={handleSave} />
        </div>
      </div>

      <div className="space-y-6">
        {textSection("基本信息 / Basic", [
          { label: "Slug (URL路径)", key: "slug" },
        ])}

        {textSection("SEO", [
          { label: "Meta Title EN", key: "meta_title" },
          { label: "Meta Title ZH", key: "meta_title_zh" },
          { label: "Meta Description EN", key: "meta_description", textarea: true },
          { label: "Meta Description ZH", key: "meta_description_zh", textarea: true },
        ])}

        {textSection("Hero 区块", [
          { label: "Hero Title EN", key: "hero_title" },
          { label: "Hero Title ZH", key: "hero_title_zh" },
          { label: "Hero Subtitle EN", key: "hero_subtitle", textarea: true },
          { label: "Hero Subtitle ZH", key: "hero_subtitle_zh", textarea: true },
        ])}

        {textSection("技术定义 / Definition", [
          { label: "Definition EN", key: "definition", textarea: true },
          { label: "Definition ZH", key: "definition_zh", textarea: true },
          { label: "Secondary EN", key: "definition_secondary", textarea: true },
          { label: "Secondary ZH", key: "definition_secondary_zh", textarea: true },
        ])}

        {textSection("Why 区块", [
          { label: "Why Title EN", key: "why_title" },
          { label: "Why Title ZH", key: "why_title_zh" },
          { label: "Why Intro EN", key: "why_intro", textarea: true },
          { label: "Why Intro ZH", key: "why_intro_zh", textarea: true },
        ])}
        {jsonSection("Why Items", "why_items", "why_items_zh")}

        {textSection("Scope 区块", [
          { label: "Scope Intro EN", key: "scope_intro", textarea: true },
          { label: "Scope Intro ZH", key: "scope_intro_zh", textarea: true },
        ])}
        {jsonSection("Scope Items", "scope_items", "scope_items_zh")}
        {jsonSection("Scope Sub-Sections", "scope_sub_sections")}
        {jsonSection("Components", "component_items")}
        {jsonSection("Process Steps", "process_steps", "process_steps_zh")}

        {textSection("应用范围 / Application", [
          { label: "Intro", key: "application_scope_intro", textarea: true },
        ])}
        {jsonSection("Application Scope", "application_scope")}
        {jsonSection("Config Options", "config_options")}

        {textSection("技术参数 / Technical", [
          { label: "Intro", key: "technical_parameters_intro", textarea: true },
        ])}
        {jsonSection("Technical Parameters", "technical_parameters")}
        {jsonSection("Constraints", "constraints")}

        {textSection("ATEX", [
          { label: "ATEX Intro", key: "atex_intro", textarea: true },
        ])}
        {jsonSection("ATEX Items", "atex_items")}

        {textSection("ROI", [
          { label: "ROI Methodology EN", key: "roi_methodology", textarea: true },
          { label: "ROI Methodology ZH", key: "roi_methodology_zh", textarea: true },
        ])}
        {jsonSection("ROI Metrics", "roi_metrics")}

        {textSection("部署 / Deployment", [
          { label: "Deployment Note EN", key: "deployment_note", textarea: true },
          { label: "Deployment Note ZH", key: "deployment_note_zh", textarea: true },
        ])}
        {jsonSection("Timeline", "timeline")}
        {jsonSection("FAQs", "faqs", "faqs_zh")}
        {jsonSection("Related Industries", "related_industries")}
        {jsonSection("Related Knowledge", "related_knowledge")}
        {jsonSection("E-E-A-T", "eeat")}
      </div>
    </div>
  );
}
