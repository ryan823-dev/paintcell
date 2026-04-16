import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader2, Trash2 } from "lucide-react";
import { SaveButton } from "@/components/console";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const jsonFields = [
  "why_items",
  "scope_items",
  "scope_sub_sections",
  "component_items",
  "process_steps",
  "application_scope",
  "config_options",
  "technical_parameters",
  "constraints",
  "atex_items",
  "roi_metrics",
  "timeline",
  "faqs",
  "related_industries",
  "related_knowledge",
  "eeat",
] as const;

interface SolutionPageForm {
  slug: string;
  meta_title: string;
  meta_description: string;
  hero_title: string;
  hero_subtitle: string;
  definition: string;
  definition_secondary: string;
  why_title: string;
  why_intro: string;
  why_items: string;
  scope_intro: string;
  scope_items: string;
  scope_sub_sections: string;
  components_intro: string;
  component_items: string;
  process_steps: string;
  application_scope_intro: string;
  application_scope: string;
  config_options: string;
  technical_parameters_intro: string;
  technical_parameters: string;
  constraints: string;
  atex_intro: string;
  atex_items: string;
  roi_methodology: string;
  roi_metrics: string;
  deployment_note: string;
  timeline: string;
  faqs: string;
  related_industries: string;
  related_knowledge: string;
  eeat: string;
}

const defaultForm: SolutionPageForm = {
  slug: "",
  meta_title: "",
  meta_description: "",
  hero_title: "",
  hero_subtitle: "",
  definition: "",
  definition_secondary: "",
  why_title: "",
  why_intro: "",
  why_items: "[]",
  scope_intro: "",
  scope_items: "[]",
  scope_sub_sections: "[]",
  components_intro: "",
  component_items: "[]",
  process_steps: "[]",
  application_scope_intro: "",
  application_scope: "[]",
  config_options: "[]",
  technical_parameters_intro: "",
  technical_parameters: "[]",
  constraints: "[]",
  atex_intro: "",
  atex_items: "[]",
  roi_methodology: "",
  roi_metrics: "[]",
  deployment_note: "",
  timeline: "[]",
  faqs: "[]",
  related_industries: "[]",
  related_knowledge: "[]",
  eeat: "{}",
};

export default function SolutionPageEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<SolutionPageForm>(defaultForm);

  const fetchPage = useCallback(async () => {
    if (!id) {
      return;
    }

    const { data, error } = await supabase
      .from("solution_pages")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      toast({
        title: "Error",
        description: "Page not found.",
        variant: "destructive",
      });
      navigate("/console/solution-pages");
      return;
    }

    const nextForm = { ...defaultForm };

    for (const key of Object.keys(nextForm) as Array<keyof SolutionPageForm>) {
      const value = data[key];
      nextForm[key] = (jsonFields as readonly string[]).includes(key)
        ? JSON.stringify(value || (key === "eeat" ? {} : []), null, 2)
        : typeof value === "string"
          ? value
          : "";
    }

    setForm(nextForm);
    setLoading(false);
  }, [id, navigate]);

  useEffect(() => {
    if (!isNew && id) {
      void fetchPage();
    }
  }, [fetchPage, id, isNew]);

  const handleSave = async () => {
    if (!form.slug) {
      toast({
        title: "Required",
        description: "Slug is required.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    try {
      const payload = {
        slug: form.slug,
        meta_title: form.meta_title || null,
        meta_description: form.meta_description || null,
        hero_title: form.hero_title || null,
        hero_subtitle: form.hero_subtitle || null,
        definition: form.definition || null,
        definition_secondary: form.definition_secondary || null,
        why_title: form.why_title || null,
        why_intro: form.why_intro || null,
        why_items: JSON.parse(form.why_items),
        scope_intro: form.scope_intro || null,
        scope_items: JSON.parse(form.scope_items),
        scope_sub_sections: JSON.parse(form.scope_sub_sections),
        components_intro: form.components_intro || null,
        component_items: JSON.parse(form.component_items),
        process_steps: JSON.parse(form.process_steps),
        application_scope_intro: form.application_scope_intro || null,
        application_scope: JSON.parse(form.application_scope),
        config_options: JSON.parse(form.config_options),
        technical_parameters_intro: form.technical_parameters_intro || null,
        technical_parameters: JSON.parse(form.technical_parameters),
        constraints: JSON.parse(form.constraints),
        atex_intro: form.atex_intro || null,
        atex_items: JSON.parse(form.atex_items),
        roi_methodology: form.roi_methodology || null,
        roi_metrics: JSON.parse(form.roi_metrics),
        deployment_note: form.deployment_note || null,
        timeline: JSON.parse(form.timeline),
        faqs: JSON.parse(form.faqs),
        related_industries: JSON.parse(form.related_industries),
        related_knowledge: JSON.parse(form.related_knowledge),
        eeat: JSON.parse(form.eeat),
        updated_at: new Date().toISOString(),
      };

      const result = isNew
        ? await supabase.from("solution_pages").insert(payload)
        : await supabase.from("solution_pages").update(payload).eq("id", id);

      if (result.error) throw result.error;

      toast({ title: isNew ? "Created" : "Saved" });
      if (isNew) {
        navigate("/console/solution-pages");
      }
    } catch (error: unknown) {
      toast({
        title: "Save Failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this solution page?")) return;

    const { error } = await supabase
      .from("solution_pages")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Delete Failed",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({ title: "Deleted" });
    navigate("/console/solution-pages");
  };

  const update = (key: keyof SolutionPageForm, value: string) => {
    setForm((previous) => ({ ...previous, [key]: value }));
  };

  const textSection = (
    title: string,
    fields: Array<{ label: string; key: keyof SolutionPageForm; textarea?: boolean }>,
  ) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map((field) => (
          <div key={field.key} className="space-y-2">
            <Label>{field.label}</Label>
            {field.textarea ? (
              <Textarea
                value={form[field.key]}
                onChange={(event) => update(field.key, event.target.value)}
                rows={3}
              />
            ) : (
              <Input
                value={form[field.key]}
                onChange={(event) => update(field.key, event.target.value)}
              />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const jsonSection = (title: string, key: keyof SolutionPageForm) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Label>JSON</Label>
        <Textarea
          value={form[key]}
          onChange={(event) => update(key, event.target.value)}
          rows={6}
          className="font-mono text-xs"
        />
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/console/solution-pages")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">{isNew ? "New Solution Page" : "Edit Solution Page"}</h1>
        </div>

        <div className="flex gap-2">
          {!isNew ? (
            <Button variant="destructive" size="sm" onClick={() => void handleDelete()}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          ) : null}
          <SaveButton saving={saving} onClick={handleSave} />
        </div>
      </div>

      <div className="space-y-6">
        {textSection("Basic", [{ label: "Slug", key: "slug" }])}

        {textSection("SEO", [
          { label: "Meta Title", key: "meta_title" },
          { label: "Meta Description", key: "meta_description", textarea: true },
        ])}

        {textSection("Hero", [
          { label: "Hero Title", key: "hero_title" },
          { label: "Hero Subtitle", key: "hero_subtitle", textarea: true },
        ])}

        {textSection("Definition", [
          { label: "Definition", key: "definition", textarea: true },
          { label: "Definition Secondary", key: "definition_secondary", textarea: true },
        ])}

        {textSection("Why", [
          { label: "Why Title", key: "why_title" },
          { label: "Why Intro", key: "why_intro", textarea: true },
        ])}
        {jsonSection("Why Items", "why_items")}

        {textSection("Scope", [{ label: "Scope Intro", key: "scope_intro", textarea: true }])}
        {jsonSection("Scope Items", "scope_items")}
        {jsonSection("Scope Sub-Sections", "scope_sub_sections")}

        {textSection("Components", [{ label: "Components Intro", key: "components_intro", textarea: true }])}
        {jsonSection("Component Items", "component_items")}
        {jsonSection("Process Steps", "process_steps")}

        {textSection("Application", [
          { label: "Application Scope Intro", key: "application_scope_intro", textarea: true },
        ])}
        {jsonSection("Application Scope", "application_scope")}
        {jsonSection("Config Options", "config_options")}

        {textSection("Technical Parameters", [
          { label: "Technical Parameters Intro", key: "technical_parameters_intro", textarea: true },
        ])}
        {jsonSection("Technical Parameters", "technical_parameters")}
        {jsonSection("Constraints", "constraints")}

        {textSection("ATEX", [{ label: "ATEX Intro", key: "atex_intro", textarea: true }])}
        {jsonSection("ATEX Items", "atex_items")}

        {textSection("ROI", [{ label: "ROI Methodology", key: "roi_methodology", textarea: true }])}
        {jsonSection("ROI Metrics", "roi_metrics")}

        {textSection("Deployment", [{ label: "Deployment Note", key: "deployment_note", textarea: true }])}
        {jsonSection("Timeline", "timeline")}
        {jsonSection("FAQs", "faqs")}
        {jsonSection("Related Industries", "related_industries")}
        {jsonSection("Related Knowledge", "related_knowledge")}
        {jsonSection("E-E-A-T", "eeat")}
      </div>
    </div>
  );
}
