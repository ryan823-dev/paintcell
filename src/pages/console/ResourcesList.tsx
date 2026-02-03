import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Loader2, Plus, Edit, Eye, EyeOff } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type ResourcePost = Tables<"resources_posts">;

const statusColors = {
  draft: "bg-muted text-muted-foreground",
  review: "bg-amber-100 text-amber-800",
  published: "bg-green-100 text-green-800",
};

export default function ResourcesList() {
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState<ResourcePost[]>([]);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    const { data, error } = await supabase
      .from("resources_posts")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load resources",
        variant: "destructive",
      });
    } else {
      setResources(data || []);
    }
    setLoading(false);
  };

  const togglePublish = async (resource: ResourcePost) => {
    const newStatus = resource.status === "published" ? "draft" : "published";
    const { error } = await supabase
      .from("resources_posts")
      .update({ 
        status: newStatus,
        published_at: newStatus === "published" ? new Date().toISOString() : null
      })
      .eq("id", resource.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    } else {
      fetchResources();
      toast({
        title: "Updated",
        description: `Resource ${newStatus === "published" ? "published" : "unpublished"}`,
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
          <h1 className="text-2xl font-bold">Resources</h1>
          <p className="text-muted-foreground">Manage learning content and guides</p>
        </div>
        <Button asChild>
          <Link to="/console/resources/new">
            <Plus className="mr-2 h-4 w-4" />
            New Resource
          </Link>
        </Button>
      </div>

      {resources.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No resources yet. Create your first one!
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {resources.map((resource) => (
            <Card key={resource.id}>
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium truncate">{resource.title}</span>
                    <Badge className={statusColors[resource.status]}>
                      {resource.status}
                    </Badge>
                    {resource.category && (
                      <Badge variant="outline">{resource.category}</Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    /{resource.slug}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => togglePublish(resource)}
                    title={resource.status === "published" ? "Unpublish" : "Publish"}
                  >
                    {resource.status === "published" ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/console/resources/${resource.id}`}>
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
