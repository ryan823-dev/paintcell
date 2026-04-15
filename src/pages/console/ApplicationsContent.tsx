import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { BilingualField, ContentCard, ImageUpload, SaveButton } from "@/components/console";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ApplicationsContentData {
  id: string;
  hero_title_en: string | null;
  hero_subtitle_en: string | null;
  hero_image_url: string | null;
  intro_title_en: string | null;
  intro_body_en: string | null;
  meta_title_en: string | null;
  meta_description_en: string | null;
}

type EditableField = Exclude<keyof ApplicationsContentData, "id">;

export default function ApplicationsContent() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<ApplicationsContentData | null>(null);

  useEffect(() => {
    void fetchContent();
  }, []);

  const fetchContent = async () => {
    const { data, error } = await supabase
      .from("applications_content")
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
      .from("applications_content")
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
        description: "Applications page content updated.",
      });
    }

    setSaving(false);
  };

  const update = (field: EditableField, value: string | null) => {
    if (!content) return;
    setContent({ ...content, [field]: value });
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
        No applications page content found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Applications Page</h1>
        <p className="text-muted-foreground">Edit the current applications page content.</p>
      </div>

      <ContentCard title="Hero Section">
        <ImageUpload
          label="Hero Image"
          hint="Recommended size: 1920x600px"
          value={content.hero_image_url}
          onChange={(url) => update("hero_image_url", url)}
        />

        <BilingualField
          label="Page Title"
          valueEn={content.hero_title_en}
          onChangeEn={(value) => update("hero_title_en", value)}
        />

        <BilingualField
          label="Subtitle"
          valueEn={content.hero_subtitle_en}
          onChangeEn={(value) => update("hero_subtitle_en", value)}
          multiline
          rows={2}
        />
      </ContentCard>

      <ContentCard title="Introduction Section">
        <BilingualField
          label="Intro Title"
          valueEn={content.intro_title_en}
          onChangeEn={(value) => update("intro_title_en", value)}
        />

        <BilingualField
          label="Intro Body"
          valueEn={content.intro_body_en}
          onChangeEn={(value) => update("intro_body_en", value)}
          multiline
          rows={4}
        />
      </ContentCard>

      <ContentCard title="SEO Settings">
        <BilingualField
          label="Meta Title"
          valueEn={content.meta_title_en}
          onChangeEn={(value) => update("meta_title_en", value)}
        />

        <BilingualField
          label="Meta Description"
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
