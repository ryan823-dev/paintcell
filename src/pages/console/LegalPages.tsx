import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";

interface LegalPagesData {
  id: string;
  privacy_policy: string | null;
  terms_of_use: string | null;
  cookie_policy: string | null;
}

export default function LegalPages() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<LegalPagesData | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const { data, error } = await supabase
      .from("legal_pages")
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
      .from("legal_pages")
      .update({
        privacy_policy: content.privacy_policy,
        terms_of_use: content.terms_of_use,
        cookie_policy: content.cookie_policy,
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
        description: "Legal pages updated successfully",
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
        No legal pages found. Please create initial content in the database.
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Legal Pages</h1>
        <p className="text-muted-foreground">Edit privacy policy, terms, and cookie policy (Markdown)</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Legal Content</CardTitle>
          <CardDescription>All content supports Markdown formatting</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="privacy" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
              <TabsTrigger value="terms">Terms of Use</TabsTrigger>
              <TabsTrigger value="cookies">Cookie Policy</TabsTrigger>
            </TabsList>

            <TabsContent value="privacy">
              <div className="space-y-2">
                <Label htmlFor="privacy_policy">Privacy Policy</Label>
                <Textarea
                  id="privacy_policy"
                  value={content.privacy_policy || ""}
                  onChange={(e) => setContent({ ...content, privacy_policy: e.target.value })}
                  placeholder="# Privacy Policy\n\nYour content here..."
                  rows={20}
                  className="font-mono text-sm"
                />
              </div>
            </TabsContent>

            <TabsContent value="terms">
              <div className="space-y-2">
                <Label htmlFor="terms_of_use">Terms of Use</Label>
                <Textarea
                  id="terms_of_use"
                  value={content.terms_of_use || ""}
                  onChange={(e) => setContent({ ...content, terms_of_use: e.target.value })}
                  placeholder="# Terms of Use\n\nYour content here..."
                  rows={20}
                  className="font-mono text-sm"
                />
              </div>
            </TabsContent>

            <TabsContent value="cookies">
              <div className="space-y-2">
                <Label htmlFor="cookie_policy">Cookie Policy</Label>
                <Textarea
                  id="cookie_policy"
                  value={content.cookie_policy || ""}
                  onChange={(e) => setContent({ ...content, cookie_policy: e.target.value })}
                  placeholder="# Cookie Policy\n\nYour content here..."
                  rows={20}
                  className="font-mono text-sm"
                />
              </div>
            </TabsContent>
          </Tabs>
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
