import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Loader2, Plus, Edit, Eye, EyeOff } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type CaseStudy = Tables<"case_studies">;

const statusColors = {
  draft: "bg-muted text-muted-foreground",
  review: "bg-amber-100 text-amber-800",
  published: "bg-green-100 text-green-800",
};

export default function CaseStudiesList() {
  const [loading, setLoading] = useState(true);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    const { data, error } = await supabase
      .from("case_studies")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load case studies",
        variant: "destructive",
      });
    } else {
      setCaseStudies(data || []);
    }
    setLoading(false);
  };

  const togglePublish = async (caseStudy: CaseStudy) => {
    const newStatus = caseStudy.status === "published" ? "draft" : "published";
    const { error } = await supabase
      .from("case_studies")
      .update({ 
        status: newStatus,
        published_at: newStatus === "published" ? new Date().toISOString() : null
      })
      .eq("id", caseStudy.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    } else {
      fetchCaseStudies();
      toast({
        title: "Updated",
        description: `Case study ${newStatus === "published" ? "published" : "unpublished"}`,
      });
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
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Case Studies</h1>
          <p className="text-muted-foreground">Manage project case studies</p>
        </div>
        <Button asChild>
          <Link to="/console/case-studies/new">
            <Plus className="mr-2 h-4 w-4" />
            New Case Study
          </Link>
        </Button>
      </div>

      {caseStudies.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No case studies yet. Create your first one!
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {caseStudies.map((cs) => (
            <Card key={cs.id}>
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium truncate">{cs.title}</span>
                    <Badge className={statusColors[cs.status]}>
                      {cs.status}
                    </Badge>
                    {cs.industry && (
                      <Badge variant="outline">{cs.industry}</Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    /{cs.slug}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => togglePublish(cs)}
                    title={cs.status === "published" ? "Unpublish" : "Publish"}
                  >
                    {cs.status === "published" ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/console/case-studies/${cs.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
