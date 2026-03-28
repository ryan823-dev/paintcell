import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Loader2, Save, ArrowLeft, Trash2 } from "lucide-react";
import { ArrayEditor } from "@/components/console/ArrayEditor";

interface FAQItem {
  question: string;
  answer: string;
  question_zh: string;
  answer_zh: string;
}

interface FAQPage {
  id: string;
  slug: string;
  title: string;
  title_zh: string;
  summary: string;
  summary_zh: string;
  faqs: { question: string; answer: string }[];
  faqs_zh: { question: string; answer: string }[];
  meta_title: string;
  meta_title_zh: string;
  meta_description: string;
  meta_description_zh: string;
  status: "draft" | "published";
  published_at: string;
}

const faqFields = [
  { key: "question", label: "Question", labelZh: "问题", multiline: false, placeholder: "Enter question...", placeholderZh: "输入问题..." },
  { key: "answer", label: "Answer", labelZh: "答案", multiline: true, rows: 4, placeholder: "Enter answer (Markdown supported)...", placeholderZh: "输入答案（支持 Markdown）..." },
];

export default function FAQEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Form state
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [titleZh, setTitleZh] = useState("");
  const [summary, setSummary] = useState("");
  const [summaryZh, setSummaryZh] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaTitleZh, setMetaTitleZh] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaDescriptionZh, setMetaDescriptionZh] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [faqItems, setFaqItems] = useState<FAQItem[]>([]);

  useEffect(() => {
    if (!isNew && id) {
      fetchFAQPage(id);
    }
  }, [id, isNew]);

  const fetchFAQPage = async (pageId: string) => {
    const { data, error } = await supabase
      .from("faq_pages")
      .select("*")
      .eq("id", pageId)
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load FAQ page",
        variant: "destructive",
      });
      navigate("/console/faq-pages");
      setLoading(false);
      return;
    }

    if (data) {
      setSlug(data.slug || "");
      setTitle(data.title || "");
      setTitleZh(data.title_zh || "");
      setSummary(data.summary || "");
      setSummaryZh(data.summary_zh || "");
      setMetaTitle(data.meta_title || "");
      setMetaTitleZh(data.meta_title_zh || "");
      setMetaDescription(data.meta_description || "");
      setMetaDescriptionZh(data.meta_description_zh || "");
      setStatus(data.status || "draft");

      // Merge EN and ZH FAQ arrays
      const enFaqs = data.faqs || [];
      const zhFaqs = data.faqs_zh || [];
      const mergedItems: FAQItem[] = enFaqs.map((en: any, i: number) => ({
        question: en.question || "",
        answer: en.answer || "",
        question_zh: zhFaqs[i]?.question || "",
        answer_zh: zhFaqs[i]?.answer || "",
      }));
      setFaqItems(mergedItems);
    }
    setLoading(false);
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (isNew && !slug) {
      setSlug(generateSlug(newTitle));
    }
  };

  const handleSave = async () => {
    if (!title || !slug) {
      toast({
        title: "Validation Error",
        description: "Title and slug are required",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    // Split merged items into EN and ZH arrays
    const faqs = faqItems.map(item => ({
      question: item.question,
      answer: item.answer,
    }));
    const faqs_zh = faqItems.map(item => ({
      question: item.question_zh,
      answer: item.answer_zh,
    }));

    const payload = {
      slug,
      title,
      title_zh: titleZh || null,
      summary: summary || null,
      summary_zh: summaryZh || null,
      faqs,
      faqs_zh,
      meta_title: metaTitle || null,
      meta_title_zh: metaTitleZh || null,
      meta_description: metaDescription || null,
      meta_description_zh: metaDescriptionZh || null,
      status,
      published_at: status === "published" ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    };

    try {
      if (isNew) {
        const { data, error } = await supabase
          .from("faq_pages")
          .insert(payload)
          .select()
          .single();

        if (error) throw error;
        toast({ title: "Created", description: "FAQ page created successfully" });
        navigate(`/console/faq-pages/${data.id}`);
      } else {
        const { error } = await supabase
          .from("faq_pages")
          .update(payload)
          .eq("id", id);

        if (error) throw error;
        toast({ title: "Saved", description: "Changes saved successfully" });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this FAQ page?")) return;

    setDeleting(true);
    const { error } = await supabase
      .from("faq_pages")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete FAQ page",
        variant: "destructive",
      });
      setDeleting(false);
    } else {
      toast({ title: "Deleted", description: "FAQ page deleted" });
      navigate("/console/faq-pages");
    }
  };

  const handleFaqItemsChange = (items: Record<string, string>[]) => {
    setFaqItems(items as FAQItem[]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/console/faq-pages")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">
            {isNew ? "New FAQ Page" : "Edit FAQ Page"}
          </h1>
        </div>
        <div className="flex items-center gap-2">
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
      </div>

      <div className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title (EN) *</Label>
                <Input
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="FAQ page title"
                />
              </div>
              <div className="space-y-2">
                <Label>Title (ZH)</Label>
                <Input
                  value={titleZh}
                  onChange={(e) => setTitleZh(e.target.value)}
                  placeholder="FAQ 页面标题"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Slug *</Label>
              <Input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="url-friendly-slug"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Summary (EN)</Label>
                <Textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Brief summary..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Summary (ZH)</Label>
                <Textarea
                  value={summaryZh}
                  onChange={(e) => setSummaryZh(e.target.value)}
                  placeholder="简要概述..."
                  rows={3}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as "draft" | "published")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Items */}
        <Card>
          <CardHeader>
            <CardTitle>FAQ Items</CardTitle>
          </CardHeader>
          <CardContent>
            <ArrayEditor
              items={faqItems}
              onChange={handleFaqItemsChange}
              fields={faqFields}
              bilingual={true}
              addLabel="Add FAQ Item"
            />
          </CardContent>
        </Card>

        {/* SEO */}
        <Card>
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Meta Title (EN)</Label>
                <Input
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="SEO title (max 60 chars)"
                  maxLength={60}
                />
              </div>
              <div className="space-y-2">
                <Label>Meta Title (ZH)</Label>
                <Input
                  value={metaTitleZh}
                  onChange={(e) => setMetaTitleZh(e.target.value)}
                  placeholder="SEO 标题（最多 60 字符）"
                  maxLength={60}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Meta Description (EN)</Label>
                <Textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="SEO description (max 160 chars)"
                  maxLength={160}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label>Meta Description (ZH)</Label>
                <Textarea
                  value={metaDescriptionZh}
                  onChange={(e) => setMetaDescriptionZh(e.target.value)}
                  placeholder="SEO 描述（最多 160 字符）"
                  maxLength={160}
                  rows={2}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => navigate("/console/faq-pages")}>
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