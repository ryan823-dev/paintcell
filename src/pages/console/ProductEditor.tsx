import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Loader2, Save, ArrowLeft, Trash2 } from "lucide-react";

const categoryOptions = [
  { value: "rotary-bells", label: "Rotary Bells" },
  { value: "spray-guns", label: "Spray Guns" },
  { value: "paint-pumps", label: "Paint Pumps" },
  { value: "control-systems", label: "Control Systems" },
  { value: "color-change", label: "Color Change Systems" },
  { value: "cleaning-systems", label: "Cleaning Systems" },
];

interface Product {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  body: string | null;
  category: string | null;
  subcategory: string | null;
  featured_image_url: string | null;
  gallery_images: string[] | null;
  brands: string[] | null;
  specifications: Record<string, string> | null;
  status: "draft" | "review" | "published";
  published_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
  sort_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

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
      const category = searchParams.get("category");
      return {
        ...defaultProduct,
        category,
      };
    }
    return defaultProduct;
  });

  // For managing brands as comma-separated input
  const [brandsInput, setBrandsInput] = useState("");

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

    const productData = {
      title: product.title,
      slug: product.slug,
      summary: product.summary || null,
      body: product.body || null,
      category: product.category || null,
      subcategory: product.subcategory || null,
      featured_image_url: product.featured_image_url || null,
      gallery_images: product.gallery_images || [],
      brands: product.brands || [],
      specifications: product.specifications || {},
      status: product.status || "draft",
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
                  onValueChange={(value) => setProduct({ ...product, category: value })}
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
                  onValueChange={(value: "draft" | "review" | "published") =>
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
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="featured_image_url">Featured Image URL</Label>
              <Input
                id="featured_image_url"
                value={product.featured_image_url || ""}
                onChange={(e) => setProduct({ ...product, featured_image_url: e.target.value })}
                placeholder="https://..."
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