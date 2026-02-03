import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { BilingualField, ContentCard, ImageUpload, SaveButton } from "@/components/console";

interface ApplicationsContentData {
  id: string;
  hero_title_en: string | null;
  hero_title_zh: string | null;
  hero_subtitle_en: string | null;
  hero_subtitle_zh: string | null;
  hero_image_url: string | null;
  intro_title_en: string | null;
  intro_title_zh: string | null;
  intro_body_en: string | null;
  intro_body_zh: string | null;
  meta_title_en: string | null;
  meta_title_zh: string | null;
  meta_description_en: string | null;
  meta_description_zh: string | null;
}

export default function ApplicationsContent() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<ApplicationsContentData | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const { data, error } = await supabase
      .from("applications_content")
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
      setContent(data as ApplicationsContentData);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);

    const { id, ...updateData } = content;
    const { error } = await supabase
      .from("applications_content")
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
        description: "应用场景页面内容已更新 / Applications content updated",
      });
    }
    setSaving(false);
  };

  const update = (field: keyof ApplicationsContentData, value: string | null) => {
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
        <h1 className="text-2xl font-bold">应用场景 / Applications Page</h1>
        <p className="text-muted-foreground">编辑应用场景页面内容 / Edit applications page content</p>
      </div>

      <ContentCard title="Hero Section" titleZh="顶部区域">
        <ImageUpload
          label="顶部背景图 / Hero Image"
          hint="建议尺寸: 1920x600px / Recommended: 1920x600px"
          value={content.hero_image_url}
          onChange={(url) => update("hero_image_url", url)}
        />
        
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

      <ContentCard title="Introduction Section" titleZh="介绍区域">
        <BilingualField
          label="介绍标题 / Intro Title"
          valueEn={content.intro_title_en}
          valueZh={content.intro_title_zh}
          onChangeEn={(v) => update("intro_title_en", v)}
          onChangeZh={(v) => update("intro_title_zh", v)}
        />

        <BilingualField
          label="介绍内容 / Intro Body"
          valueEn={content.intro_body_en}
          valueZh={content.intro_body_zh}
          onChangeEn={(v) => update("intro_body_en", v)}
          onChangeZh={(v) => update("intro_body_zh", v)}
          multiline
          rows={4}
        />
      </ContentCard>

      <ContentCard title="Industries" titleZh="行业列表">
        <p className="text-sm text-muted-foreground">
          行业列表在"行业管理"中编辑 / Edit individual industries in the Industries section
        </p>
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
