import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ImageUpload } from "@/components/console";
import { toast } from "@/hooks/use-toast";
import { Loader2, Save, ArrowLeft, Trash2 } from "lucide-react";
import type { Enums, Tables } from "@/integrations/supabase/types";

type Product = Tables<"products_posts">;
type ProductCategory = Enums<"product_category">;
type ContentStatus = Enums<"content_status">;

const categoryOptions: Array<{ value: ProductCategory; label: string }> = [
  { value: "rotary-bells", label: "Rotary Bells" },
  { value: "spray-guns", label: "Spray Guns" },
  { value: "paint-pumps", label: "Paint Pumps" },
  { value: "control-systems", label: "Control Systems" },
  { value: "color-change", label: "Color Change Systems" },
  { value: "cleaning-systems", label: "Cleaning Systems" },
];

const reservedProductSlugs = new Set([
  "catalog",
  "rotary-bells",
  "spray-guns",
  "paint-pumps",
  "control-systems",
  "color-change",
  "spare-parts",
  "bell-cleaning-system",
  "pigging-color-change-system",
]);

const defaultProduct: Partial<Product> = {
  title: "",
  slug: "",
  summary: "",
  body: "",
  category: null,
  subcategory: null,
  featured_image_url: null,
  gallery_images: [],
  brands: [],
  specifications: {},
  status: "draft",
  meta_title: "",
  meta_description: "",
  sort_order: 0,
  is_visible: true,
};

export default function ProductEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isNew = id === "new";

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [product, setProduct] = useState<Partial<Product>>(() => {
    if (isNew) {
      const categoryParam = searchParams.get("category");
      const category = categoryOptions.some((option) => option.value === categoryParam)
        ? (categoryParam as ProductCategory)
        : null;
      return {
        ...defaultProduct,
        category,
      };
    }
    return defaultProduct;
  });

  // For managing brands as comma-separated input
  const [brandsInput, setBrandsInput] = useState("");
  // For managing specifications as JSON input
  const [specificationsText, setSpecificationsText] = useState("{}");

  useEffect(() => {
    if (!isNew && id) {
      fetchProduct(id);
    }
  }, [id, isNew]);

  const fetchProduct = async (productId: string) => {
    const { data, error } = await supabase
      .from("products_posts")
      .select("*")
      .eq("id", productId)
      .single();

    if (error) {
      if (error.code === "42P01") {
        toast({
          title: "Table Not Found",
          description: "Products table not created yet. Please run migrations first.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to load product",
          variant: "destructive",
        });
      }
      navigate("/console/products");
    } else {
      setProduct(data);
      setBrandsInput((data.brands || []).join(", "));
      setSpecificationsText(JSON.stringify(data.specifications || {}, null, 2));
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
    setProduct((prev) => ({
      ...prev,
      title,
      slug: isNew ? generateSlug(title) : prev.slug,
    }));
  };

  const handleBrandsChange = (value: string) => {
    setBrandsInput(value);
    const brands = value.split(",").map((b) => b.trim()).filter(Boolean);
    setProduct((prev) => ({ ...prev, brands }));
  };

  const handleSave = async () => {
    if (!product.title || !product.slug) {
      toast({
        title: "Validation Error",
        description: "Title and slug are required",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    // Normalize/validate slug format
    const normalizedSlug = product.slug
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-|-$/g, "");

    if (!normalizedSlug) {
      toast({
        title: "Validation Error",
        description: "Slug must contain letters or numbers",
        variant: "destructive",
      });
      setSaving(false);
      return;
    }

    if (reservedProductSlugs.has(normalizedSlug)) {
      toast({
        title: "Validation Error",
        description: "This slug is reserved by an existing product section or page.",
        variant: "destructive",
      });
      setSaving(false);
      return;
    }

    if (normalizedSlug !== product.slug) {
      setProduct((prev) => ({ ...prev, slug: normalizedSlug }));
    }

    if (isNew) {
      const { data: existing, error: existingError } = await supabase
        .from("products_posts")
        .select("id")
        .eq("slug", normalizedSlug)
        .limit(1);

      if (existingError) {
        toast({
          title: "Error",
          description: existingError.message,
          variant: "destructive",
        });
        setSaving(false);
        return;
      }

      if (existing && existing.length > 0) {
        toast({
          title: "Validation Error",
          description: "Slug already exists. Please choose a different slug.",
          variant: "destructive",
        });
        setSaving(false);
        return;
      }
    }

    let parsedSpecifications: Record<string, string> = {};
    try {
      const maybe = JSON.parse(specificationsText || "{}");
      if (typeof maybe !== "object" || maybe === null || Array.isArray(maybe)) {
        throw new Error("Specifications must be a JSON object");
      }
      parsedSpecifications = maybe as Record<string, string>;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Invalid JSON";
      toast({
        title: "Validation Error",
        description: `Specifications JSON is invalid: ${message}`,
        variant: "destructive",
      });
      setSaving(false);
      return;
    }

    const publishedAt =
      (product.status || "draft") === "published"
        ? product.published_at || new Date().toISOString()
        : null;

    const productData = {
      title: product.title,
      slug: normalizedSlug,
      summary: product.summary || null,
      body: product.body || null,
      category: (product.category as ProductCategory | null) || null,
      subcategory: product.subcategory || null,
      featured_image_url: product.featured_image_url || null,
      gallery_images: product.gallery_images || [],
      brands: product.brands || [],
      specifications: parsedSpecifications,
      status: (product.status as ContentStatus | null) || "draft",
      published_at: publishedAt,
      meta_title: product.meta_title || null,
      meta_description: product.meta_description || null,
      sort_order: product.sort_order || 0,
      is_visible: product.is_visible ?? true,
    };

    if (isNew) {
      const { data, error } = await supabase
        .from("products_posts")
        .insert(productData)
        .select()
        .single();

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({ title: "Created", description: "Product created successfully" });
        navigate(`/console/products/${data.id}`);
      }
    } else {
      const { error } = await supabase
        .from("products_posts")
        .update(productData)
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
    if (!confirm("Are you sure you want to delete this product?")) return;

    setDeleting(true);
    const { error } = await supabase
      .from("products_posts")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
      setDeleting(false);
    } else {
      toast({ title: "Deleted", description: "Product deleted" });
      navigate("/console/products");
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
          <Button variant="ghost" size="sm" onClick={() => navigate("/console/products")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">
            {isNew ? "New Product" : "Edit Product"}
          </h1>
        </div>
        {!isNew && (
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
          </Button>
        )}
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
                value={product.title || ""}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Product name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                value={product.slug || ""}
                onChange={(e) => setProduct({ ...product, slug: e.target.value })}
                placeholder="url-friendly-slug"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={product.category || ""}
                  onValueChange={(value) =>
                    setProduct({ ...product, category: value as ProductCategory })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={product.status || "draft"}
                  onValueChange={(value: ContentStatus) =>
                    setProduct({ ...product, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subcategory">Subcategory</Label>
                <Input
                  id="subcategory"
                  value={product.subcategory || ""}
                  onChange={(e) => setProduct({ ...product, subcategory: e.target.value })}
                  placeholder="Optional subcategory"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sort_order">Sort Order</Label>
                <Input
                  id="sort_order"
                  type="number"
                  value={product.sort_order ?? 0}
                  onChange={(e) =>
                    setProduct({ ...product, sort_order: parseInt(e.target.value) || 0 })
                  }
                  placeholder="0"
                />
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <Label>Visible</Label>
                <p className="text-xs text-muted-foreground">
                  Controls whether the product is visible on the public site
                </p>
              </div>
              <Switch
                checked={product.is_visible ?? true}
                onCheckedChange={(checked) => setProduct({ ...product, is_visible: checked })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brands">Brands (comma-separated)</Label>
              <Input
                id="brands"
                value={brandsInput}
                onChange={(e) => handleBrandsChange(e.target.value)}
                placeholder="ABB, FANUC, KUKA"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                value={product.summary || ""}
                onChange={(e) => setProduct({ ...product, summary: e.target.value })}
                placeholder="Brief product description..."
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
                value={product.body || ""}
                onChange={(e) => setProduct({ ...product, body: e.target.value })}
                placeholder="Full product description in Markdown..."
                rows={12}
                className="font-mono text-sm"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Media</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <ImageUpload
              label="Featured Image"
              hint="Main product image displayed in listings and header"
              value={product.featured_image_url || null}
              onChange={(url) => setProduct({ ...product, featured_image_url: url })}
            />
            <div className="space-y-2">
              <Label htmlFor="featured_image_url">Featured Image URL (optional)</Label>
              <Input
                id="featured_image_url"
                value={product.featured_image_url || ""}
                onChange={(e) => setProduct({ ...product, featured_image_url: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gallery_images">Gallery Images (one URL per line)</Label>
              <Textarea
                id="gallery_images"
                value={(product.gallery_images || []).join("\n")}
                onChange={(e) => {
                  const urls = e.target.value
                    .split("\n")
                    .map((u) => u.trim())
                    .filter(Boolean);
                  setProduct({ ...product, gallery_images: urls });
                }}
                placeholder="https://...\nhttps://..."
                rows={5}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Optional additional images for product gallery
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Specifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Label htmlFor="specifications">Specifications JSON</Label>
            <Textarea
              id="specifications"
              value={specificationsText}
              onChange={(e) => setSpecificationsText(e.target.value)}
              placeholder='{\n  "Flow rate": "1.2 L/min",\n  "Voltage": "60 kV"\n}'
              rows={10}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Stored as key/value pairs and rendered as a specs table on the public page
            </p>
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
                value={product.meta_title || ""}
                onChange={(e) => setProduct({ ...product, meta_title: e.target.value })}
                placeholder="SEO title (max 60 chars)"
                maxLength={60}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meta_description">Meta Description</Label>
              <Textarea
                id="meta_description"
                value={product.meta_description || ""}
                onChange={(e) => setProduct({ ...product, meta_description: e.target.value })}
                placeholder="SEO description (max 160 chars)"
                maxLength={160}
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => navigate("/console/products")}>
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
