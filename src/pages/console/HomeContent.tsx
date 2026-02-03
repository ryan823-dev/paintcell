import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { BilingualField, ContentCard, ImageUpload, SaveButton } from "@/components/console";

interface HomeContentData {
  id: string;
  hero_title: string;
  hero_title_zh: string | null;
  hero_subtitle: string;
  hero_subtitle_zh: string | null;
  hero_audience_line: string;
  hero_audience_line_zh: string | null;
  hero_image_url: string | null;
  hero_cta_primary_text_en: string | null;
  hero_cta_primary_text_zh: string | null;
  hero_cta_secondary_text_en: string | null;
  hero_cta_secondary_text_zh: string | null;
  cta_configure_hint: string;
  cta_configure_hint_zh: string | null;
  cta_consult_hint: string;
  cta_consult_hint_zh: string | null;
  meta_title_en: string | null;
  meta_title_zh: string | null;
  meta_description_en: string | null;
  meta_description_zh: string | null;
}

export default function HomeContent() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<HomeContentData | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const { data, error } = await supabase
      .from("home_content")
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
      setContent(data as HomeContentData);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);

    const { error } = await supabase
      .from("home_content")
      .update({
        hero_title: content.hero_title,
        hero_title_zh: content.hero_title_zh,
        hero_subtitle: content.hero_subtitle,
        hero_subtitle_zh: content.hero_subtitle_zh,
        hero_audience_line: content.hero_audience_line,
        hero_audience_line_zh: content.hero_audience_line_zh,
        hero_image_url: content.hero_image_url,
        hero_cta_primary_text_en: content.hero_cta_primary_text_en,
        hero_cta_primary_text_zh: content.hero_cta_primary_text_zh,
        hero_cta_secondary_text_en: content.hero_cta_secondary_text_en,
        hero_cta_secondary_text_zh: content.hero_cta_secondary_text_zh,
        cta_configure_hint: content.cta_configure_hint,
        cta_configure_hint_zh: content.cta_configure_hint_zh,
        cta_consult_hint: content.cta_consult_hint,
        cta_consult_hint_zh: content.cta_consult_hint_zh,
        meta_title_en: content.meta_title_en,
        meta_title_zh: content.meta_title_zh,
        meta_description_en: content.meta_description_en,
        meta_description_zh: content.meta_description_zh,
      })
      .eq("id", content.id);

    if (error) {
      toast({
        title: "保存失败 / Save Failed",
        description: "请重试 / Please try again",
        variant: "destructive",
      });
    } else {
      toast({
        title: "保存成功 / Saved",
        description: "首页内容已更新 / Home content updated",
      });
    }
    setSaving(false);
  };

  const update = (field: keyof HomeContentData, value: string | null) => {
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
        未找到首页内容 / No home content found
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">首页内容 / Home Page Content</h1>
        <p className="text-muted-foreground">编辑首页所有文本和图片 / Edit all home page text and images</p>
      </div>

      <ContentCard title="Hero Section" titleZh="主视觉区">
        <ImageUpload
          label="主视觉图片 / Hero Image"
          hint="建议尺寸: 1920x800px / Recommended: 1920x800px"
          value={content.hero_image_url}
          onChange={(url) => update("hero_image_url", url)}
        />
        
        <BilingualField
          label="主标题 / Main Title"
          valueEn={content.hero_title}
          valueZh={content.hero_title_zh}
          onChangeEn={(v) => update("hero_title", v)}
          onChangeZh={(v) => update("hero_title_zh", v)}
        />

        <BilingualField
          label="副标题 / Subtitle"
          valueEn={content.hero_subtitle}
          valueZh={content.hero_subtitle_zh}
          onChangeEn={(v) => update("hero_subtitle", v)}
          onChangeZh={(v) => update("hero_subtitle_zh", v)}
        />

        <BilingualField
          label="目标受众说明 / Audience Line"
          valueEn={content.hero_audience_line}
          valueZh={content.hero_audience_line_zh}
          onChangeEn={(v) => update("hero_audience_line", v)}
          onChangeZh={(v) => update("hero_audience_line_zh", v)}
        />
      </ContentCard>

      <ContentCard title="CTA Buttons" titleZh="按钮文本">
        <BilingualField
          label="主按钮 / Primary Button"
          valueEn={content.hero_cta_primary_text_en}
          valueZh={content.hero_cta_primary_text_zh}
          onChangeEn={(v) => update("hero_cta_primary_text_en", v)}
          onChangeZh={(v) => update("hero_cta_primary_text_zh", v)}
        />

        <BilingualField
          label="副按钮 / Secondary Button"
          valueEn={content.hero_cta_secondary_text_en}
          valueZh={content.hero_cta_secondary_text_zh}
          onChangeEn={(v) => update("hero_cta_secondary_text_en", v)}
          onChangeZh={(v) => update("hero_cta_secondary_text_zh", v)}
        />

        <BilingualField
          label="配置按钮提示 / Configure Hint"
          valueEn={content.cta_configure_hint}
          valueZh={content.cta_configure_hint_zh}
          onChangeEn={(v) => update("cta_configure_hint", v)}
          onChangeZh={(v) => update("cta_configure_hint_zh", v)}
        />

        <BilingualField
          label="咨询按钮提示 / Consult Hint"
          valueEn={content.cta_consult_hint}
          valueZh={content.cta_consult_hint_zh}
          onChangeEn={(v) => update("cta_consult_hint", v)}
          onChangeZh={(v) => update("cta_consult_hint_zh", v)}
        />
      </ContentCard>

      <ContentCard title="SEO Settings" titleZh="搜索引擎优化">
        <BilingualField
          label="页面标题 / Meta Title"
          hint="显示在浏览器标签页 / Shown in browser tab"
          valueEn={content.meta_title_en}
          valueZh={content.meta_title_zh}
          onChangeEn={(v) => update("meta_title_en", v)}
          onChangeZh={(v) => update("meta_title_zh", v)}
        />

        <BilingualField
          label="页面描述 / Meta Description"
          hint="搜索结果描述文字 / Shown in search results"
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
