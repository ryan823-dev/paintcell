import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Loader2, Plus, Edit, Eye, EyeOff, Package, Settings, Droplets, Palette, Wrench, Sparkles } from "lucide-react";

// Product category configuration
const categoryConfig: Record<string, { title: string; description: string; icon: React.ElementType }> = {
  "rotary-bells": {
    title: "Rotary Bells",
    description: "Rotary bell atomizers for high-transfer efficiency coating",
    icon: Sparkles,
  },
  "spray-guns": {
    title: "Spray Guns",
    description: "HVLP and air spray guns for various coating applications",
    icon: Palette,
  },
  "paint-pumps": {
    title: "Paint Pumps",
    description: "Precision metering pumps for paint supply systems",
    icon: Droplets,
  },
  "control-systems": {
    title: "Control Systems",
    description: "PLC and automation control systems for paint lines",
    icon: Settings,
  },
  "color-change": {
    title: "Color Change Systems",
    description: "Pigging and color change equipment for fast changeover",
    icon: Palette,
  },
  "cleaning-systems": {
    title: "Cleaning Systems",
    description: "Bell cleaning and equipment maintenance systems",
    icon: Wrench,
  },
};

const statusColors = {
  draft: "bg-muted text-muted-foreground",
  review: "bg-amber-100 text-amber-800",
  published: "bg-green-100 text-green-800",
};

interface Product {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  subcategory: string | null;
  status: "draft" | "review" | "published";
  summary: string | null;
  featured_image_url: string | null;
  brands: string[] | null;
  sort_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export default function ProductsList() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<string>("rotary-bells");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products_posts")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("updated_at", { ascending: false });

    if (error) {
      // Table might not exist yet
      if (error.code === "42P01") {
        setProducts([]);
      } else {
        toast({
          title: "Error",
          description: "Failed to load products",
          variant: "destructive",
        });
      }
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const togglePublish = async (product: Product) => {
    const newStatus = product.status === "published" ? "draft" : "published";
    const { error } = await supabase
      .from("products_posts")
      .update({
        status: newStatus,
        published_at: newStatus === "published" ? new Date().toISOString() : null,
      })
      .eq("id", product.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    } else {
      fetchProducts();
      toast({
        title: "Updated",
        description: `Product ${newStatus === "published" ? "published" : "unpublished"}`,
      });
    }
  };

  const toggleVisibility = async (product: Product) => {
    const { error } = await supabase
      .from("products_posts")
      .update({ is_visible: !product.is_visible })
      .eq("id", product.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update visibility",
        variant: "destructive",
      });
    } else {
      fetchProducts();
    }
  };

  const getProductsByCategory = (category: string) => {
    return products.filter((p) => p.category === category);
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
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage product catalog and specifications</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="flex flex-wrap h-auto gap-1">
          {Object.entries(categoryConfig).map(([key, config]) => (
            <TabsTrigger key={key} value={key} className="text-sm">
              {config.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(categoryConfig).map(([category, config]) => {
          const Icon = config.icon;
          const categoryProducts = getProductsByCategory(category);

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
                      <Link to={`/console/products/new?category=${category}`}>
                        <Plus className="mr-2 h-4 w-4" />
                        New Product
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  {categoryProducts.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">
                        No products in this category yet.
                      </p>
                      <Button asChild>
                        <Link to={`/console/products/new?category=${category}`}>
                          <Plus className="mr-2 h-4 w-4" />
                          Add First Product
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {categoryProducts.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium truncate">{product.title}</span>
                              <Badge className={statusColors[product.status]}>
                                {product.status}
                              </Badge>
                              {product.brands && product.brands.length > 0 && (
                                <Badge variant="outline">
                                  {product.brands.join(", ")}
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              /products/{product.slug}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={product.is_visible}
                              onCheckedChange={() => toggleVisibility(product)}
                              title={product.is_visible ? "Visible" : "Hidden"}
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => togglePublish(product)}
                              title={product.status === "published" ? "Unpublish" : "Publish"}
                            >
                              {product.status === "published" ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                              <Link to={`/console/products/${product.id}`}>
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
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
