import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";

interface HomeContentData {
  id: string;
  hero_title: string;
  hero_subtitle: string;
  hero_audience_line: string;
  cta_configure_hint: string;
  cta_consult_hint: string;
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
        title: "Error",
        description: "Failed to load content",
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

    const { error } = await supabase
      .from("home_content")
      .update({
        hero_title: content.hero_title,
        hero_subtitle: content.hero_subtitle,
        hero_audience_line: content.hero_audience_line,
        cta_configure_hint: content.cta_configure_hint,
        cta_consult_hint: content.cta_consult_hint,
      })
      .eq("id", content.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save changes",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Saved",
        description: "Home content updated successfully",
      });
    }
    setSaving(false);
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
        No home content found. Please create initial content in the database.
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Home Page Content</h1>
        <p className="text-muted-foreground">Edit the hero section and CTA hints</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
          <CardDescription>Main headline and supporting text</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hero_title">Hero Title</Label>
            <Input
              id="hero_title"
              value={content.hero_title}
              onChange={(e) => setContent({ ...content, hero_title: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hero_subtitle">Hero Subtitle</Label>
            <Input
              id="hero_subtitle"
              value={content.hero_subtitle}
              onChange={(e) => setContent({ ...content, hero_subtitle: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hero_audience_line">Audience Line</Label>
            <Input
              id="hero_audience_line"
              value={content.hero_audience_line}
              onChange={(e) => setContent({ ...content, hero_audience_line: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>CTA Hints</CardTitle>
          <CardDescription>Helper text for call-to-action buttons</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cta_configure_hint">Configure Button Hint</Label>
            <Input
              id="cta_configure_hint"
              value={content.cta_configure_hint}
              onChange={(e) => setContent({ ...content, cta_configure_hint: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cta_consult_hint">Consult Button Hint</Label>
            <Input
              id="cta_consult_hint"
              value={content.cta_consult_hint}
              onChange={(e) => setContent({ ...content, cta_consult_hint: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
