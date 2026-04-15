import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ResourcePageLayout } from "@/components/resources";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import NotFound from "@/pages/NotFound";
import { Badge } from "@/components/ui/badge";
import { publicCmsAvailability } from "@/lib/publicCms";

interface ProductData {
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
  meta_title: string | null;
  meta_description: string | null;
  published_at: string | null;
  created_at: string;
}

const categoryLabels: Record<string, string> = {
  "rotary-bells": "Rotary Bells",
  "spray-guns": "Spray Guns",
  "paint-pumps": "Paint Pumps",
  "control-systems": "Control Systems",
  "color-change": "Color Change Systems",
  "cleaning-systems": "Cleaning Systems",
};

/**
 * Dynamic product page – renders products_posts by slug.
 * Route: /:lang/products/:slug
 */
export default function DynamicProduct() {
  const { slug } = useParams<{ slug: string }>();
  const publicProductCmsEnabled = publicCmsAvailability.products;

  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug || !publicProductCmsEnabled) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products_posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .eq("is_visible", true)
        .maybeSingle();

      if (error || !data) {
        setNotFound(true);
      } else {
        setProduct(data as ProductData);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [publicProductCmsEnabled, slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (notFound || !product) {
    return <NotFound />;
  }

  const title = product.title;
  const body = product.body || "";
  const metaTitle = product.meta_title || `${product.title} | TD Painting Systems`;
  const metaDescription = product.meta_description || product.summary || "";
  const catLabel = categoryLabels[product.category || ""] || "Products";
  const categoryHref = [
    "rotary-bells",
    "spray-guns",
    "paint-pumps",
    "control-systems",
    "color-change",
    "spare-parts",
  ].includes(product.category || "")
    ? `/products/${product.category}`
    : "/products/catalog";

  // Product structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": title,
    "description": metaDescription,
    "brand": product.brands?.map((b) => ({
      "@type": "Brand",
      "name": b
    })),
    "manufacturer": {
      "@type": "Organization",
      "name": "TD Painting Systems"
    },
    ...(product.featured_image_url ? { "image": product.featured_image_url } : {}),
    ...(product.specifications ? { "additionalProperty": Object.entries(product.specifications).map(([name, value]) => ({
      "@type": "PropertyValue",
      name,
      value
    }))} : {})
  };

  return (
      <ResourcePageLayout
        title={title}
        metaTitle={metaTitle}
        metaDescription={metaDescription}
        breadcrumbs={[
          { label: "Products", href: "/products" },
          { label: catLabel, href: categoryHref },
          { label: title },
        ]}
        structuredData={structuredData}
        canonicalPath={`/products/${product.slug}`}
      >
        {/* Product Header */}
        <div className="mb-8">
          {product.brands && product.brands.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {product.brands.map((brand) => (
                <Badge key={brand} variant="outline">
                  {brand}
                </Badge>
              ))}
            </div>
          )}

          {product.summary && (
            <p className="text-lg text-muted-foreground leading-relaxed">
              {product.summary}
            </p>
          )}
        </div>

        {/* Featured Image */}
        {product.featured_image_url && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={product.featured_image_url}
              alt={title}
              className="w-full h-auto object-cover max-h-[400px]"
            />
          </div>
        )}

        {/* Gallery */}
        {product.gallery_images && product.gallery_images.length > 0 && (
          <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {product.gallery_images.map((img, idx) => (
              <div key={idx} className="rounded-lg overflow-hidden">
                <img
                  src={img}
                  alt={`${title} gallery ${idx + 1}`}
                  className="w-full h-32 object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Specifications Table */}
        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Specifications</h2>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <tbody>
                  {Object.entries(product.specifications).map(([key, value], idx) => (
                    <tr key={key} className={idx % 2 === 0 ? "bg-muted/50" : ""}>
                      <td className="px-4 py-2 font-medium">{key}</td>
                      <td className="px-4 py-2">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Product Description */}
        {body && (
          <article className="prose prose-slate max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary">
            <ReactMarkdown>{body}</ReactMarkdown>
          </article>
        )}

        {/* CTA Section */}
        <div className="mt-12 p-6 bg-muted/50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Interested in this product?</h3>
          <p className="text-muted-foreground mb-4">
            Contact our team for pricing, technical specifications, and availability.
          </p>
          <Link
            to="/quote"
            className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Request a Quote
          </Link>
        </div>
      </ResourcePageLayout>
  );
}
