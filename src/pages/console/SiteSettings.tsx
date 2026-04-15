import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { BilingualField, ContentCard, SaveButton } from "@/components/console";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SiteSettingsData {
  id: string;
  contact_email: string | null;
  contact_phone: string | null;
  contact_address_en: string | null;
  linkedin_url: string | null;
  wechat_id: string | null;
  footer_tagline_en: string | null;
  copyright_text_en: string | null;
}

type EditableField = Exclude<keyof SiteSettingsData, "id">;

export default function SiteSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<SiteSettingsData | null>(null);

  useEffect(() => {
    void fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .limit(1)
      .single();

    if (error && error.code !== "PGRST116") {
      toast({
        title: "Load Error",
        description: "Failed to load settings.",
        variant: "destructive",
      });
    } else if (data) {
      setSettings(data);
    }

    setLoading(false);
  };

  const handleSave = async () => {
    if (!settings) return;

    setSaving(true);
    const { id, ...updateData } = settings;
    const { error } = await supabase
      .from("site_settings")
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
        description: "Site settings updated.",
      });
    }

    setSaving(false);
  };

  const update = (field: EditableField, value: string | null) => {
    if (!settings) return;
    setSettings({ ...settings, [field]: value });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        No site settings found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Site Settings</h1>
        <p className="text-muted-foreground">Manage contact details, social links, and footer copy.</p>
      </div>

      <ContentCard title="Contact Information">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              value={settings.contact_email || ""}
              onChange={(event) => update("contact_email", event.target.value)}
              placeholder="info@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label>Phone</Label>
            <Input
              value={settings.contact_phone || ""}
              onChange={(event) => update("contact_phone", event.target.value)}
              placeholder="+86 xxx xxxx xxxx"
            />
          </div>

          <BilingualField
            label="Address"
            valueEn={settings.contact_address_en}
            onChangeEn={(value) => update("contact_address_en", value)}
            multiline
            rows={2}
          />
        </div>
      </ContentCard>

      <ContentCard title="Social Links">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>LinkedIn URL</Label>
            <Input
              value={settings.linkedin_url || ""}
              onChange={(event) => update("linkedin_url", event.target.value)}
              placeholder="https://linkedin.com/company/..."
            />
          </div>

          <div className="space-y-2">
            <Label>WeChat ID</Label>
            <Input
              value={settings.wechat_id || ""}
              onChange={(event) => update("wechat_id", event.target.value)}
              placeholder="WeChat ID"
            />
          </div>
        </div>
      </ContentCard>

      <ContentCard title="Footer">
        <BilingualField
          label="Footer Tagline"
          valueEn={settings.footer_tagline_en}
          onChangeEn={(value) => update("footer_tagline_en", value)}
        />

        <BilingualField
          label="Copyright Text"
          valueEn={settings.copyright_text_en}
          onChangeEn={(value) => update("copyright_text_en", value)}
        />
      </ContentCard>

      <div className="sticky bottom-4 flex justify-end border-t bg-background/95 py-4 backdrop-blur">
        <SaveButton saving={saving} onClick={handleSave} />
      </div>
    </div>
  );
}
