import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Loader2, Plus, Pencil, Trash2, Eye } from "lucide-react";

interface FAQPage {
  id: string;
  slug: string;
  title: string;
  title_zh: string;
  summary: string;
  faqs: { question: string; answer: string }[];
  status: string;
  created_at: string;
  updated_at: string;
}

export default function FAQList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [faqPages, setFaqPages] = useState<FAQPage[]>([]);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchFAQPages();
  }, []);

  const fetchFAQPages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("faq_pages")
      .select("id, slug, title, title_zh, summary, faqs, status, created_at, updated_at")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load FAQ pages",
        variant: "destructive",
      });
    } else {
      setFaqPages(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ page?")) return;

    setDeleting(id);
    const { error } = await supabase
      .from("faq_pages")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete FAQ page",
        variant: "destructive",
      });
      setDeleting(null);
    } else {
      toast({ title: "Deleted", description: "FAQ page deleted successfully" });
      setFaqPages(faqPages.filter(p => p.id !== id));
      setDeleting(null);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getPreviewUrl = (slug: string) => {
    return `/resources/faqs/${slug}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">FAQ Pages</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Independent FAQ pages with multiple Q&A items
          </p>
        </div>
        <Button onClick={() => navigate("/console/faq-pages/new")}>
          <Plus className="h-4 w-4 mr-2" />
          New FAQ Page
        </Button>
      </div>

      {/* List */}
      {faqPages.length === 0 ? (
        <Card>
          <CardContent className="py-8">
            <div className="text-center text-muted-foreground">
              <p>No FAQ pages yet.</p>
              <Button
                variant="link"
                onClick={() => navigate("/console/faq-pages/new")}
                className="mt-2"
              >
                Create your first FAQ page
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {faqPages.map((page) => (
            <Card key={page.id}>
              <CardContent className="py-4">
                <div className="flex items-start justify-between gap-4">
                  {/* Left: Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium truncate">
                        {page.title_zh || page.title}
                      </h3>
                      <Badge variant={page.status === "published" ? "default" : "secondary"}>
                        {page.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {page.summary || "No summary"}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span>Slug: {page.slug}</span>
                      <span>Items: {page.faqs?.length || 0}</span>
                      <span>Created: {formatDate(page.created_at)}</span>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2">
                    {page.status === "published" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(getPreviewUrl(page.slug), "_blank")}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/console/faq-pages/${page.id}`)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(page.id)}
                      disabled={deleting === page.id}
                      className="text-destructive hover:text-destructive"
                    >
                      {deleting === page.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}