import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { BilingualField, ContentCard, ImageUpload, SaveButton } from "@/components/console";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface HomeContentData {
  id: string;
  hero_title: string;
  hero_subtitle: string;
  hero_audience_line: string;
  hero_image_url: string | null;
  hero_cta_primary_text_en: string | null;
  hero_cta_secondary_text_en: string | null;
  cta_configure_hint: string;
  cta_consult_hint: string;
  meta_title_en: string | null;
  meta_description_en: string | null;
}

type EditableField = Exclude<keyof HomeContentData, "id">;

export default function HomeContent() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<HomeContentData | null>(null);

  useEffect(() => {
    void fetchContent();
  }, []);

  const fetchContent = async () => {
    const { data, error } = await supabase
      .from("home_content")
      .select("*")
      .limit(1)
      .single();

    if (error && error.code !== "PGRST116") {
      toast({
        title: "Load Error",
        description: "Failed to load content.",
        variant: "destructive",
      });
    } else if (data) {
      setContent(data);
    }

    setLoading(false);
  };

  const handleSave = async () => {
    if (!content) return;

    setSaving(true);
    const { id, ...updateData } = content;
    const { error } = await supabase
      .from("home_content")
      .update(updateData)
      .eq("id", id);

    if (error) {
      toast({
        title: "Save Failed",
        description: "Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Saved",
        description: "Home page content updated.",
      });
    }

    setSaving(false);
  };

  const update = (field: EditableField, value: string | null) => {
    if (!content) return;
    setContent({ ...content, [field]: value as HomeContentData[EditableField] });
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
      <div className="py-12 text-center text-muted-foreground">
        No home page content found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Home Page</h1>
        <p className="text-muted-foreground">Edit the current home page hero and SEO copy.</p>
      </div>

      <ContentCard title="Hero Section">
        <ImageUpload
          label="Hero Image"
          hint="Recommended size: 1920x800px"
          value={content.hero_image_url}
          onChange={(url) => update("hero_image_url", url)}
        />

        <BilingualField
          label="Main Title"
          valueEn={content.hero_title}
          onChangeEn={(value) => update("hero_title", value)}
        />

        <BilingualField
          label="Subtitle"
          valueEn={content.hero_subtitle}
          onChangeEn={(value) => update("hero_subtitle", value)}
        />

        <BilingualField
          label="Audience Line"
          valueEn={content.hero_audience_line}
          onChangeEn={(value) => update("hero_audience_line", value)}
        />
      </ContentCard>

      <ContentCard title="CTA Buttons">
        <BilingualField
          label="Primary Button"
          valueEn={content.hero_cta_primary_text_en}
          onChangeEn={(value) => update("hero_cta_primary_text_en", value)}
        />

        <BilingualField
          label="Secondary Button"
          valueEn={content.hero_cta_secondary_text_en}
          onChangeEn={(value) => update("hero_cta_secondary_text_en", value)}
        />

        <BilingualField
          label="Configure Hint"
          valueEn={content.cta_configure_hint}
          onChangeEn={(value) => update("cta_configure_hint", value)}
        />

        <BilingualField
          label="Consult Hint"
          valueEn={content.cta_consult_hint}
          onChangeEn={(value) => update("cta_consult_hint", value)}
        />
      </ContentCard>

      <ContentCard title="SEO Settings">
        <BilingualField
          label="Meta Title"
          hint="Shown in the browser tab."
          valueEn={content.meta_title_en}
          onChangeEn={(value) => update("meta_title_en", value)}
        />

        <BilingualField
          label="Meta Description"
          hint="Shown in search results."
          valueEn={content.meta_description_en}
          onChangeEn={(value) => update("meta_description_en", value)}
          multiline
          rows={2}
        />
      </ContentCard>

      <div className="sticky bottom-4 flex justify-end border-t bg-background/95 py-4 backdrop-blur">
        <SaveButton saving={saving} onClick={handleSave} />
      </div>
    </div>
  );
}
