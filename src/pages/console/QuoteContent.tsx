import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { BilingualField, ContentCard, SaveButton } from "@/components/console";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface QuoteContentData {
  id: string;
  hero_title_en: string | null;
  hero_subtitle_en: string | null;
  form_intro_en: string | null;
  submit_button_text_en: string | null;
  success_title_en: string | null;
  success_message_en: string | null;
  meta_title_en: string | null;
  meta_description_en: string | null;
}

type EditableField = Exclude<keyof QuoteContentData, "id">;

export default function QuoteContent() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<QuoteContentData | null>(null);

  useEffect(() => {
    void fetchContent();
  }, []);

  const fetchContent = async () => {
    const { data, error } = await supabase
      .from("quote_content")
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
      .from("quote_content")
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
        description: "Quote page content updated.",
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
        No quote page content found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Quote Page</h1>
        <p className="text-muted-foreground">Edit the current quote form page copy.</p>
      </div>

      <ContentCard title="Hero Section">
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

      <ContentCard title="Form Section">
        <BilingualField
          label="Form Introduction"
          valueEn={content.form_intro_en}
          onChangeEn={(value) => update("form_intro_en", value)}
          multiline
          rows={3}
        />

        <BilingualField
          label="Submit Button Text"
          valueEn={content.submit_button_text_en}
          onChangeEn={(value) => update("submit_button_text_en", value)}
        />
      </ContentCard>

      <ContentCard title="Success Message">
        <BilingualField
          label="Success Title"
          valueEn={content.success_title_en}
          onChangeEn={(value) => update("success_title_en", value)}
        />

        <BilingualField
          label="Success Message"
          valueEn={content.success_message_en}
          onChangeEn={(value) => update("success_message_en", value)}
          multiline
          rows={3}
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
