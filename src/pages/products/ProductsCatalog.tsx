import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navigate } from "react-router-dom";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { supabase } from "@/integrations/supabase/client";
import { Toaster } from "@/components/ui/toaster";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Loader2, Package, Sparkles, Palette, Droplets, Settings, Wrench, ArrowRight } from "lucide-react";
import { useCanonicalUrl, useRouteLocale } from "@/hooks/useRouteLocale";
import { publicCmsAvailability } from "@/lib/publicCms";

type ProductCategory =
  | "rotary-bells"
  | "spray-guns"
  | "paint-pumps"
  | "control-systems"
  | "color-change"
  | "cleaning-systems";

const categoryConfig: Record<
  ProductCategory,
  { title: string; description: string; icon: React.ElementType }
> = {
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

interface ProductRow {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  category: ProductCategory | null;
  featured_image_url: string | null;
  brands: string[] | null;
  sort_order: number;
  updated_at: string;
}

function ProductsCatalogContent({ canonicalUrl }: { canonicalUrl: string }) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [activeTab, setActiveTab] = useState<ProductCategory>("rotary-bells");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products_posts")
        .select("id,title,slug,summary,category,featured_image_url,brands,sort_order,updated_at")
        .eq("status", "published")
        .eq("is_visible", true)
        .order("sort_order", { ascending: true })
        .order("updated_at", { ascending: false });

      if (error) {
        if (error.code !== "42P01" && error.code !== "PGRST205") {
          toast({
            title: "Error",
            description: "Failed to load products",
            variant: "destructive",
          });
        }
        setProducts([]);
      } else {
        setProducts((data as ProductRow[]) || []);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const firstCategoryWithContent = (Object.keys(categoryConfig) as ProductCategory[]).find((key) =>
      products.some((product) => product.category === key),
    );

    if (firstCategoryWithContent) {
      setActiveTab(firstCategoryWithContent);
    }
  }, [products]);

  const productsByCategory = new Map<ProductCategory, ProductRow[]>();
  (Object.keys(categoryConfig) as ProductCategory[]).forEach((key) => productsByCategory.set(key, []));
  products.forEach((product) => {
    if (!product.category) return;
    const list = productsByCategory.get(product.category) || [];
    list.push(product);
    productsByCategory.set(product.category, list);
  });

  return (
    <>
      <Toaster />
      <Helmet>
        <title>Products Catalog | TD Painting Systems</title>
        <meta
          name="description"
          content="Explore published products maintained in our CMS, grouped by category with specs and technical summaries."
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <div className="bg-background">
        <section className="py-12 md:py-16 border-b border-border">
          <div className="container-wide">
            <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Package className="h-5 w-5 text-accent" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
                    Product Catalog
                  </span>
                </div>
                <h1 className="text-2xl md:text-4xl font-bold mb-3 leading-tight">
                  CMS Products
                </h1>
                <p className="text-muted-foreground">
                  Published products from the CMS. Use categories to browse, then open a product page for full details.
                </p>
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline">
                  <Link to="/products">Static Catalog</Link>
                </Button>
                <Button asChild>
                  <Link to="/quote">
                    Request Quote <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container-wide">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as ProductCategory)} className="space-y-6">
                <TabsList className="flex flex-wrap h-auto gap-1">
                  {(Object.keys(categoryConfig) as ProductCategory[]).map((key) => (
                    <TabsTrigger key={key} value={key} className="text-sm">
                      {categoryConfig[key].title}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {(Object.keys(categoryConfig) as ProductCategory[]).map((key) => {
                  const config = categoryConfig[key];
                  const Icon = config.icon;
                  const list = productsByCategory.get(key) || [];

                  return (
                    <TabsContent key={key} value={key} className="space-y-6">
                      <Card>
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <Icon className="h-6 w-6 text-primary" />
                            <div>
                              <CardTitle>{config.title}</CardTitle>
                              <CardDescription>{config.description}</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>

                      {list.length === 0 ? (
                        <Card>
                          <CardContent className="py-10 text-center text-muted-foreground">
                            No published products in this category yet.
                          </CardContent>
                        </Card>
                      ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {list.map((p) => (
                            <Card key={p.id} className="overflow-hidden hover:shadow-md transition-shadow">
                              {p.featured_image_url ? (
                                <div className="h-40 bg-muted">
                                  <img
                                    src={p.featured_image_url}
                                    alt={p.title}
                                    className="h-full w-full object-cover"
                                    loading="lazy"
                                  />
                                </div>
                              ) : (
                                <div className="h-40 bg-muted flex items-center justify-center text-muted-foreground">
                                  <Package className="h-8 w-8" />
                                </div>
                              )}
                              <CardContent className="p-5 space-y-3">
                                <div className="space-y-1">
                                  <div className="font-semibold leading-snug line-clamp-2">{p.title}</div>
                                  {p.summary ? (
                                    <div className="text-sm text-muted-foreground line-clamp-3">{p.summary}</div>
                                  ) : null}
                                </div>
                                {p.brands && p.brands.length > 0 ? (
                                  <div className="flex flex-wrap gap-1">
                                    {p.brands.slice(0, 3).map((b) => (
                                      <Badge key={b} variant="outline" className="text-xs">
                                        {b}
                                      </Badge>
                                    ))}
                                    {p.brands.length > 3 ? (
                                      <Badge variant="outline" className="text-xs">
                                        +{p.brands.length - 3}
                                      </Badge>
                                    ) : null}
                                  </div>
                                ) : null}
                                <Button asChild className="w-full">
                                  <Link to={`/products/${p.slug}`}>Open</Link>
                                </Button>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                  );
                })}
              </Tabs>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default function ProductsCatalog() {
  const locale = useRouteLocale();
  const canonicalPath = "/products/catalog";
  const canonicalUrl = useCanonicalUrl(canonicalPath);

  if (!publicCmsAvailability.products) {
    return <Navigate to={`/${locale}/products`} replace />;
  }

  return <ProductsCatalogContent canonicalUrl={canonicalUrl} />;
}
