import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { BilingualField, ContentCard, SaveButton } from "@/components/console";

interface QuoteContentData {
  id: string;
  hero_title_en: string | null;
  hero_title_zh: string | null;
  hero_subtitle_en: string | null;
  hero_subtitle_zh: string | null;
  form_intro_en: string | null;
  form_intro_zh: string | null;
  submit_button_text_en: string | null;
  submit_button_text_zh: string | null;
  success_title_en: string | null;
  success_title_zh: string | null;
  success_message_en: string | null;
  success_message_zh: string | null;
  meta_title_en: string | null;
  meta_title_zh: string | null;
  meta_description_en: string | null;
  meta_description_zh: string | null;
}

export default function QuoteContent() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<QuoteContentData | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const { data, error } = await supabase
      .from("quote_content")
      .select("*")
      .limit(1)
      .single();

    if (error && error.code !== "PGRST116") {
      toast({
        title: "加载失败 / Load Error",
        description: "无法加载内容 / Failed to load content",
        variant: "destructive",
      });
    } else if (data) {
      setContent(data as QuoteContentData);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);

    const { id, ...updateData } = content;
    const { error } = await supabase
      .from("quote_content")
      .update(updateData)
      .eq("id", id);

    if (error) {
      toast({
        title: "保存失败 / Save Failed",
        description: "请重试 / Please try again",
        variant: "destructive",
      });
    } else {
      toast({
        title: "保存成功 / Saved",
        description: "询价页面内容已更新 / Quote page content updated",
      });
    }
    setSaving(false);
  };

  const update = (field: keyof QuoteContentData, value: string | null) => {
    if (content) {
      setContent({ ...content, [field]: value });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        未找到内容 / No content found
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">询价页面 / Quote Page</h1>
        <p className="text-muted-foreground">编辑询价表单页面内容 / Edit quote form page content</p>
      </div>

      <ContentCard title="Hero Section" titleZh="顶部区域">
        <BilingualField
          label="页面标题 / Page Title"
          valueEn={content.hero_title_en}
          valueZh={content.hero_title_zh}
          onChangeEn={(v) => update("hero_title_en", v)}
          onChangeZh={(v) => update("hero_title_zh", v)}
        />

        <BilingualField
          label="副标题 / Subtitle"
          valueEn={content.hero_subtitle_en}
          valueZh={content.hero_subtitle_zh}
          onChangeEn={(v) => update("hero_subtitle_en", v)}
          onChangeZh={(v) => update("hero_subtitle_zh", v)}
          multiline
          rows={2}
        />
      </ContentCard>

      <ContentCard title="Form Section" titleZh="表单区域">
        <BilingualField
          label="表单介绍 / Form Introduction"
          valueEn={content.form_intro_en}
          valueZh={content.form_intro_zh}
          onChangeEn={(v) => update("form_intro_en", v)}
          onChangeZh={(v) => update("form_intro_zh", v)}
          multiline
          rows={3}
        />

        <BilingualField
          label="提交按钮文本 / Submit Button Text"
          valueEn={content.submit_button_text_en}
          valueZh={content.submit_button_text_zh}
          onChangeEn={(v) => update("submit_button_text_en", v)}
          onChangeZh={(v) => update("submit_button_text_zh", v)}
        />
      </ContentCard>

      <ContentCard title="Success Message" titleZh="提交成功提示">
        <BilingualField
          label="成功标题 / Success Title"
          valueEn={content.success_title_en}
          valueZh={content.success_title_zh}
          onChangeEn={(v) => update("success_title_en", v)}
          onChangeZh={(v) => update("success_title_zh", v)}
        />

        <BilingualField
          label="成功消息 / Success Message"
          valueEn={content.success_message_en}
          valueZh={content.success_message_zh}
          onChangeEn={(v) => update("success_message_en", v)}
          onChangeZh={(v) => update("success_message_zh", v)}
          multiline
          rows={3}
        />
      </ContentCard>

      <ContentCard title="SEO Settings" titleZh="搜索引擎优化">
        <BilingualField
          label="页面标题 / Meta Title"
          valueEn={content.meta_title_en}
          valueZh={content.meta_title_zh}
          onChangeEn={(v) => update("meta_title_en", v)}
          onChangeZh={(v) => update("meta_title_zh", v)}
        />

        <BilingualField
          label="页面描述 / Meta Description"
          valueEn={content.meta_description_en}
          valueZh={content.meta_description_zh}
          onChangeEn={(v) => update("meta_description_en", v)}
          onChangeZh={(v) => update("meta_description_zh", v)}
          multiline
          rows={2}
        />
      </ContentCard>

      <div className="flex justify-end sticky bottom-4 bg-background/95 backdrop-blur py-4 border-t">
        <SaveButton saving={saving} onClick={handleSave} />
      </div>
    </div>
  );
}
