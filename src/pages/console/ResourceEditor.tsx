import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Loader2, Save, ArrowLeft, Trash2 } from "lucide-react";
import { GenerateDraftButton } from "@/components/console/GenerateDraftButton";
import type { Tables, Enums } from "@/integrations/supabase/types";

type ResourcePost = Tables<"resources_posts">;
type ResourceCategory = Enums<"resource_category">;

const defaultResource: Partial<ResourcePost> = {
  title: "",
  slug: "",
  summary: "",
  body: "",
  answer_box: "",
  category: null,
  status: "draft",
  meta_title: "",
  meta_description: "",
};

export default function ResourceEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";
  
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [resource, setResource] = useState<Partial<ResourcePost>>(defaultResource);

  useEffect(() => {
    if (!isNew && id) {
      fetchResource(id);
    }
  }, [id, isNew]);

  const fetchResource = async (resourceId: string) => {
    const { data, error } = await supabase
      .from("resources_posts")
      .select("*")
      .eq("id", resourceId)
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load resource",
        variant: "destructive",
      });
      navigate("/console/resources");
    } else {
      setResource(data);
    }
    setLoading(false);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleTitleChange = (title: string) => {
    setResource((prev) => ({
      ...prev,
      title,
      slug: isNew ? generateSlug(title) : prev.slug,
    }));
  };

  const handleSave = async () => {
    if (!resource.title || !resource.slug) {
      toast({
        title: "Validation Error",
        description: "Title and slug are required",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    if (isNew) {
      const { data, error } = await supabase
        .from("resources_posts")
        .insert({
          title: resource.title,
          slug: resource.slug,
          summary: resource.summary || null,
          body: resource.body || null,
          answer_box: resource.answer_box || null,
          category: resource.category || null,
          status: resource.status || "draft",
          meta_title: resource.meta_title || null,
          meta_description: resource.meta_description || null,
        })
        .select()
        .single();

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({ title: "Created", description: "Resource created successfully" });
        navigate(`/console/resources/${data.id}`);
      }
    } else {
      const { error } = await supabase
        .from("resources_posts")
        .update({
          title: resource.title,
          slug: resource.slug,
          summary: resource.summary || null,
          body: resource.body || null,
          answer_box: resource.answer_box || null,
          category: resource.category || null,
          meta_title: resource.meta_title || null,
          meta_description: resource.meta_description || null,
        })
        .eq("id", id);

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({ title: "Saved", description: "Changes saved successfully" });
      }
    }

    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this resource?")) return;
    
    setDeleting(true);
    const { error } = await supabase
      .from("resources_posts")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete resource",
        variant: "destructive",
      });
      setDeleting(false);
    } else {
      toast({ title: "Deleted", description: "Resource deleted" });
      navigate("/console/resources");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/console/resources")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">
            {isNew ? "New Resource" : "Edit Resource"}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {!isNew && resource.id && (
            <>
              <GenerateDraftButton
                contentType="resource_post"
                recordId={resource.id}
                title={resource.title || ""}
                lastGeneratedAt={resource.last_ai_generation_at}
                onGenerated={() => fetchResource(resource.id!)}
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={resource.title || ""}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Resource title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                value={resource.slug || ""}
                onChange={(e) => setResource({ ...resource, slug: e.target.value })}
                placeholder="url-friendly-slug"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={resource.category || ""}
                onValueChange={(value) => setResource({ ...resource, category: value as ResourceCategory })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering-library">Engineering Library</SelectItem>
                  <SelectItem value="standards-compliance">Standards & Compliance</SelectItem>
                  <SelectItem value="glossary">Glossary</SelectItem>
                  <SelectItem value="tools-templates">Tools & Templates</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                value={resource.summary || ""}
                onChange={(e) => setResource({ ...resource, summary: e.target.value })}
                placeholder="Brief summary..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="body">Body (Markdown)</Label>
              <Textarea
                id="body"
                value={resource.body || ""}
                onChange={(e) => setResource({ ...resource, body: e.target.value })}
                placeholder="Full content in Markdown..."
                rows={12}
                className="font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="answer_box">Answer Box (2-4 sentences)</Label>
              <Textarea
                id="answer_box"
                value={resource.answer_box || ""}
                onChange={(e) => setResource({ ...resource, answer_box: e.target.value })}
                placeholder="Concise answer for featured snippets..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="meta_title">Meta Title</Label>
              <Input
                id="meta_title"
                value={resource.meta_title || ""}
                onChange={(e) => setResource({ ...resource, meta_title: e.target.value })}
                placeholder="SEO title (max 60 chars)"
                maxLength={60}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meta_description">Meta Description</Label>
              <Textarea
                id="meta_description"
                value={resource.meta_description || ""}
                onChange={(e) => setResource({ ...resource, meta_description: e.target.value })}
                placeholder="SEO description (max 160 chars)"
                maxLength={160}
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => navigate("/console/resources")}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {isNew ? "Create" : "Save Changes"}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
