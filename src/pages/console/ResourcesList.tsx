import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Loader2, Plus, Edit, Eye, EyeOff, BookOpen, Shield, BookMarked, Wrench } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type ResourcePost = Tables<"resources_posts">;

const categoryConfig = {
  "engineering-library": {
    title: "Engineering Library",
    description: "Technical insights, guides, and FAQs for paint cell engineering",
    icon: BookOpen,
    subcategories: [
      { value: "insights", label: "Insights" },
      { value: "guides-checklists", label: "Guides & Checklists" },
      { value: "faqs", label: "FAQs" },
    ],
  },
  "standards-compliance": {
    title: "Standards & Compliance",
    description: "Industry standards for ventilation, VOC handling, and safety",
    icon: Shield,
    subcategories: [
      { value: "ventilation-airflow", label: "Ventilation & Airflow" },
      { value: "voc-solvent-handling", label: "VOC/Solvent Handling" },
      { value: "grounding-static-control", label: "Grounding & Static Control" },
    ],
  },
  "glossary": {
    title: "Glossary",
    description: "Engineering terminology and definitions for paint cell systems",
    icon: BookMarked,
    subcategories: [],
  },
  "tools-templates": {
    title: "Tools & Templates",
    description: "Downloadable checklists, templates, and calculators",
    icon: Wrench,
    subcategories: [],
  },
};

const statusColors = {
  draft: "bg-muted text-muted-foreground",
  review: "bg-amber-100 text-amber-800",
  published: "bg-green-100 text-green-800",
};

export default function ResourcesList() {
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState<ResourcePost[]>([]);
  const [activeTab, setActiveTab] = useState<string>("engineering-library");

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
        published_at: newStatus === "published" ? new Date().toISOString() : null,
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

  const getResourcesByCategory = (category: string) => {
    return resources.filter((r) => r.category === category);
  };

  const getResourcesBySubcategory = (category: string, subcategory: string | null) => {
    return resources.filter((r) => r.category === category && r.subcategory === subcategory);
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
          <p className="text-muted-foreground">Manage learning content, glossary, and tools</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="engineering-library">Engineering</TabsTrigger>
          <TabsTrigger value="standards-compliance">Standards</TabsTrigger>
          <TabsTrigger value="glossary">Glossary</TabsTrigger>
          <TabsTrigger value="tools-templates">Tools</TabsTrigger>
        </TabsList>

        {Object.entries(categoryConfig).map(([category, config]) => {
          const Icon = config.icon;
          const categoryResources = getResourcesByCategory(category);

          return (
            <TabsContent key={category} value={category} className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="h-6 w-6 text-primary" />
                      <div>
                        <CardTitle>{config.title}</CardTitle>
                        <CardDescription>{config.description}</CardDescription>
                      </div>
                    </div>
                    <Button asChild>
                      <Link to={`/console/resources/new?category=${category}`}>
                        <Plus className="mr-2 h-4 w-4" />
                        New {config.title}
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
              </Card>

              {config.subcategories.length > 0 ? (
                <div className="space-y-4">
                  {config.subcategories.map((sub) => {
                    const subResources = getResourcesBySubcategory(category, sub.value);
                    return (
                      <Card key={sub.value}>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{sub.label}</CardTitle>
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/console/resources/new?category=${category}&subcategory=${sub.value}`}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add
                              </Link>
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {subResources.length === 0 ? (
                            <p className="text-sm text-muted-foreground py-4 text-center">
                              No content yet. Click "Add" to create one.
                            </p>
                          ) : (
                            <div className="space-y-2">
                              {subResources.map((resource) => (
                                <div
                                  key={resource.id}
                                  className="flex items-center justify-between p-3 border rounded-lg"
                                >
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="font-medium truncate">{resource.title}</span>
                                      <Badge className={statusColors[resource.status]}>
                                        {resource.status}
                                      </Badge>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      /{resource.slug}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
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
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    {categoryResources.length === 0 ? (
                      <div className="text-center py-8">
                        <Icon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-4">
                          No {config.title.toLowerCase()} entries yet.
                        </p>
                        <Button asChild>
                          <Link to={`/console/resources/new?category=${category}`}>
                            <Plus className="mr-2 h-4 w-4" />
                            Create First Entry
                          </Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {categoryResources.map((resource) => (
                          <div
                            key={resource.id}
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium truncate">{resource.title}</span>
                                <Badge className={statusColors[resource.status]}>
                                  {resource.status}
                                </Badge>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                /resources/{category}/{resource.slug}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
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
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}