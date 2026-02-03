import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { BilingualField, ContentCard, SaveButton } from "@/components/console";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SiteSettingsData {
  id: string;
  contact_email: string | null;
  contact_phone: string | null;
  contact_address_en: string | null;
  contact_address_zh: string | null;
  linkedin_url: string | null;
  wechat_id: string | null;
  footer_tagline_en: string | null;
  footer_tagline_zh: string | null;
  copyright_text_en: string | null;
  copyright_text_zh: string | null;
}

export default function SiteSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<SiteSettingsData | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .limit(1)
      .single();

    if (error && error.code !== "PGRST116") {
      toast({
        title: "加载失败 / Load Error",
        description: "无法加载设置 / Failed to load settings",
        variant: "destructive",
      });
    } else if (data) {
      setSettings(data as SiteSettingsData);
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
        title: "保存失败 / Save Failed",
        description: "请重试 / Please try again",
        variant: "destructive",
      });
    } else {
      toast({
        title: "保存成功 / Saved",
        description: "全站设置已更新 / Site settings updated",
      });
    }
    setSaving(false);
  };

  const update = (field: keyof SiteSettingsData, value: string | null) => {
    if (settings) {
      setSettings({ ...settings, [field]: value });
    }
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
      <div className="text-center py-12 text-muted-foreground">
        未找到设置 / No settings found
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">全站设置 / Site Settings</h1>
        <p className="text-muted-foreground">管理联系信息、社交链接和页脚 / Manage contact info, social links, and footer</p>
      </div>

      <ContentCard title="Contact Information" titleZh="联系信息">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>邮箱 / Email</Label>
            <Input
              value={settings.contact_email || ""}
              onChange={(e) => update("contact_email", e.target.value)}
              placeholder="info@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label>电话 / Phone</Label>
            <Input
              value={settings.contact_phone || ""}
              onChange={(e) => update("contact_phone", e.target.value)}
              placeholder="+86 xxx xxxx xxxx"
            />
          </div>

          <BilingualField
            label="地址 / Address"
            valueEn={settings.contact_address_en}
            valueZh={settings.contact_address_zh}
            onChangeEn={(v) => update("contact_address_en", v)}
            onChangeZh={(v) => update("contact_address_zh", v)}
            multiline
            rows={2}
          />
        </div>
      </ContentCard>

      <ContentCard title="Social Links" titleZh="社交链接">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>LinkedIn URL</Label>
            <Input
              value={settings.linkedin_url || ""}
              onChange={(e) => update("linkedin_url", e.target.value)}
              placeholder="https://linkedin.com/company/..."
            />
          </div>

          <div className="space-y-2">
            <Label>微信号 / WeChat ID</Label>
            <Input
              value={settings.wechat_id || ""}
              onChange={(e) => update("wechat_id", e.target.value)}
              placeholder="WeChat ID"
            />
          </div>
        </div>
      </ContentCard>

      <ContentCard title="Footer" titleZh="页脚">
        <BilingualField
          label="页脚标语 / Footer Tagline"
          valueEn={settings.footer_tagline_en}
          valueZh={settings.footer_tagline_zh}
          onChangeEn={(v) => update("footer_tagline_en", v)}
          onChangeZh={(v) => update("footer_tagline_zh", v)}
        />

        <BilingualField
          label="版权文本 / Copyright Text"
          valueEn={settings.copyright_text_en}
          valueZh={settings.copyright_text_zh}
          onChangeEn={(v) => update("copyright_text_en", v)}
          onChangeZh={(v) => update("copyright_text_zh", v)}
        />
      </ContentCard>

      <div className="flex justify-end sticky bottom-4 bg-background/95 backdrop-blur py-4 border-t">
        <SaveButton saving={saving} onClick={handleSave} />
      </div>
    </div>
  );
}
