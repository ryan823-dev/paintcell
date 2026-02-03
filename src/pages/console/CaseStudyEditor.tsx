import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Loader2, Save, ArrowLeft, Trash2 } from "lucide-react";
import { GenerateDraftButton } from "@/components/console/GenerateDraftButton";
import type { Tables } from "@/integrations/supabase/types";

type CaseStudy = Tables<"case_studies">;

const defaultCaseStudy: Partial<CaseStudy> = {
  title: "",
  slug: "",
  summary: "",
  industry: "",
  part_type: "",
  paint_type: "liquid",
  goals: "",
  constraints: [],
  solution_scope: [],
  validation_acceptance: [],
  answer_box: "",
  status: "draft",
  meta_title: "",
  meta_description: "",
};

export default function CaseStudyEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";
  
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [caseStudy, setCaseStudy] = useState<Partial<CaseStudy>>(defaultCaseStudy);

  // For array fields, we'll use newline-separated strings for editing
  const [constraintsText, setConstraintsText] = useState("");
  const [solutionScopeText, setSolutionScopeText] = useState("");
  const [validationText, setValidationText] = useState("");

  useEffect(() => {
    if (!isNew && id) {
      fetchCaseStudy(id);
    }
  }, [id, isNew]);

  const fetchCaseStudy = async (csId: string) => {
    const { data, error } = await supabase
      .from("case_studies")
      .select("*")
      .eq("id", csId)
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load case study",
        variant: "destructive",
      });
      navigate("/console/case-studies");
    } else {
      setCaseStudy(data);
      setConstraintsText((data.constraints || []).join("\n"));
      setSolutionScopeText((data.solution_scope || []).join("\n"));
      setValidationText((data.validation_acceptance || []).join("\n"));
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
    setCaseStudy((prev) => ({
      ...prev,
      title,
      slug: isNew ? generateSlug(title) : prev.slug,
    }));
  };

  const textToArray = (text: string): string[] => {
    return text.split("\n").map((s) => s.trim()).filter(Boolean);
  };

  const handleSave = async () => {
    if (!caseStudy.title || !caseStudy.slug) {
      toast({
        title: "Validation Error",
        description: "Title and slug are required",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    const payload = {
      title: caseStudy.title,
      slug: caseStudy.slug,
      summary: caseStudy.summary || null,
      industry: caseStudy.industry || null,
      part_type: caseStudy.part_type || null,
      paint_type: caseStudy.paint_type || "liquid",
      goals: caseStudy.goals || null,
      constraints: textToArray(constraintsText),
      solution_scope: textToArray(solutionScopeText),
      validation_acceptance: textToArray(validationText),
      answer_box: caseStudy.answer_box || null,
      meta_title: caseStudy.meta_title || null,
      meta_description: caseStudy.meta_description || null,
    };

    if (isNew) {
      const { data, error } = await supabase
        .from("case_studies")
        .insert({ ...payload, status: "draft" })
        .select()
        .single();

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({ title: "Created", description: "Case study created successfully" });
        navigate(`/console/case-studies/${data.id}`);
      }
    } else {
      const { error } = await supabase
        .from("case_studies")
        .update(payload)
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
    if (!confirm("Are you sure you want to delete this case study?")) return;
    
    setDeleting(true);
    const { error } = await supabase
      .from("case_studies")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete case study",
        variant: "destructive",
      });
      setDeleting(false);
    } else {
      toast({ title: "Deleted", description: "Case study deleted" });
      navigate("/console/case-studies");
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
          <Button variant="ghost" size="sm" onClick={() => navigate("/console/case-studies")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">
            {isNew ? "New Case Study" : "Edit Case Study"}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {!isNew && caseStudy.id && (
            <>
              <GenerateDraftButton
                contentType="case_study"
                recordId={caseStudy.id}
                title={caseStudy.title || ""}
                lastGeneratedAt={caseStudy.last_ai_generation_at}
                onGenerated={() => fetchCaseStudy(caseStudy.id!)}
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
                value={caseStudy.title || ""}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Case study title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                value={caseStudy.slug || ""}
                onChange={(e) => setCaseStudy({ ...caseStudy, slug: e.target.value })}
                placeholder="url-friendly-slug"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  value={caseStudy.industry || ""}
                  onChange={(e) => setCaseStudy({ ...caseStudy, industry: e.target.value })}
                  placeholder="e.g., Automotive"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="part_type">Part Type</Label>
                <Input
                  id="part_type"
                  value={caseStudy.part_type || ""}
                  onChange={(e) => setCaseStudy({ ...caseStudy, part_type: e.target.value })}
                  placeholder="e.g., Metal brackets"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                value={caseStudy.summary || ""}
                onChange={(e) => setCaseStudy({ ...caseStudy, summary: e.target.value })}
                placeholder="Brief summary..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="goals">Goals</Label>
              <Textarea
                id="goals"
                value={caseStudy.goals || ""}
                onChange={(e) => setCaseStudy({ ...caseStudy, goals: e.target.value })}
                placeholder="Project goals..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Details (one item per line)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="constraints">Constraints</Label>
              <Textarea
                id="constraints"
                value={constraintsText}
                onChange={(e) => setConstraintsText(e.target.value)}
                placeholder="One constraint per line..."
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="solution_scope">Solution Scope</Label>
              <Textarea
                id="solution_scope"
                value={solutionScopeText}
                onChange={(e) => setSolutionScopeText(e.target.value)}
                placeholder="One solution item per line..."
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="validation">Validation & Acceptance</Label>
              <Textarea
                id="validation"
                value={validationText}
                onChange={(e) => setValidationText(e.target.value)}
                placeholder="One validation item per line..."
                rows={4}
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
              <Label htmlFor="answer_box">Answer Box (2-4 sentences)</Label>
              <Textarea
                id="answer_box"
                value={caseStudy.answer_box || ""}
                onChange={(e) => setCaseStudy({ ...caseStudy, answer_box: e.target.value })}
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
                value={caseStudy.meta_title || ""}
                onChange={(e) => setCaseStudy({ ...caseStudy, meta_title: e.target.value })}
                placeholder="SEO title (max 60 chars)"
                maxLength={60}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meta_description">Meta Description</Label>
              <Textarea
                id="meta_description"
                value={caseStudy.meta_description || ""}
                onChange={(e) => setCaseStudy({ ...caseStudy, meta_description: e.target.value })}
                placeholder="SEO description (max 160 chars)"
                maxLength={160}
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => navigate("/console/case-studies")}>
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
