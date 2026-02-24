import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Loader2, Plus, Edit, Eye, EyeOff, GripVertical } from "lucide-react";

interface IndustryPage {
  id: string;
  slug: string;
  status: string;
  industry_label: string;
  hero_title: string | null;
  coming_soon: boolean;
  sort_order: number;
  updated_at: string;
}

const statusColors: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  review: "bg-amber-100 text-amber-800",
  published: "bg-green-100 text-green-800",
};

export default function IndustryPagesList() {
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState<IndustryPage[]>([]);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    const { data, error } = await supabase
      .from("industry_pages")
      .select("id, slug, status, industry_label, hero_title, coming_soon, sort_order, updated_at")
      .order("sort_order", { ascending: true });

    if (error) {
      toast({ title: "Error", description: "Failed to load industry pages", variant: "destructive" });
    } else {
      setPages(data || []);
    }
    setLoading(false);
  };

  const togglePublish = async (page: IndustryPage) => {
    const newStatus = page.status === "published" ? "draft" : "published";
    const { error } = await supabase
      .from("industry_pages")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", page.id);

    if (error) {
      toast({ title: "Error", description: "Failed to update", variant: "destructive" });
    } else {
      fetchPages();
      toast({ title: "已更新 / Updated" });
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
          <h1 className="text-2xl font-bold">行业页面 / Industry Pages</h1>
          <p className="text-muted-foreground">管理行业落地页内容</p>
        </div>
        <Button asChild>
          <Link to="/console/industry-pages/new">
            <Plus className="mr-2 h-4 w-4" />
            新建行业页 / New
          </Link>
        </Button>
      </div>

      {pages.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            暂无行业页面。点击上方按钮创建第一个。
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {pages.map(page => (
            <Card key={page.id}>
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <GripVertical className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium truncate">{page.industry_label}</span>
                      <Badge className={statusColors[page.status]}>{page.status}</Badge>
                      {page.coming_soon && <Badge variant="outline">Coming Soon</Badge>}
                    </div>
                    <div className="text-sm text-muted-foreground">/industries/{page.slug}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button variant="ghost" size="sm" onClick={() => togglePublish(page)}>
                    {page.status === "published" ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/console/industry-pages/${page.id}`}>
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
