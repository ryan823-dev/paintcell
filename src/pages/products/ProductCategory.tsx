import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations";
import { ChevronRight, FileText, ArrowLeft } from "lucide-react";

const DOMAIN = "https://tdpaintcell.com";

// Category data - in production this would come from database
const categoryData: Record<string, {
  title: string;
  titleZh: string;
  description: string;
  products: { name: string; description: string; brands: string[] }[];
}> = {
  "rotary-bells": {
    title: "Rotary Bells",
    titleZh: "旋杯",
    description: "High-speed electrostatic rotary atomizers for automotive and industrial coating applications.",
    products: [
      { name: "High-Speed Bells", description: "60,000+ RPM for fine atomization", brands: ["Dürr", "SAMES KREMLIN"] },
      { name: "Standard Bells", description: "General purpose electrostatic atomizers", brands: ["Ransburg", "Graco"] },
      { name: "Waterborne Bells", description: "Optimized for water-based coatings", brands: ["Dürr", "SAMES KREMLIN"] },
    ],
  },
  "spray-guns": {
    title: "Spray Guns",
    titleZh: "喷枪",
    description: "HVLP, air spray, and electrostatic spray guns for manual and robotic applications.",
    products: [
      { name: "HVLP Guns", description: "High volume low pressure for efficiency", brands: ["SATA", "DeVilbiss"] },
      { name: "Air Spray Guns", description: "Traditional atomization technology", brands: ["Graco", "Binks"] },
      { name: "Electrostatic Guns", description: "Enhanced transfer efficiency", brands: ["Ransburg", "Graco"] },
    ],
  },
  "paint-pumps": {
    title: "Paint Pumps",
    titleZh: "供漆泵",
    description: "Diaphragm and piston pumps for paint supply systems.",
    products: [
      { name: "Diaphragm Pumps", description: "For low to medium viscosity materials", brands: ["Graco", "ARO"] },
      { name: "Piston Pumps", description: "High pressure applications", brands: ["Graco", "Wilden"] },
      { name: "Ratio Controllers", description: "2K material mixing systems", brands: ["Graco", "SAMES KREMLIN"] },
    ],
  },
  "control-systems": {
    title: "Control Systems",
    titleZh: "控制系统",
    description: "PLC-based control systems and robot controllers for painting automation.",
    products: [
      { name: "PLC Systems", description: "Industrial automation controllers", brands: ["Siemens", "Allen-Bradley"] },
      { name: "Robot Controllers", description: "Paint robot integration", brands: ["ABB", "FANUC", "KUKA"] },
      { name: "HMI Panels", description: "Operator interface systems", brands: ["Siemens", "Pro-face"] },
    ],
  },
  "color-change": {
    title: "Color Change Systems",
    titleZh: "换色系统",
    description: "Fast color change valve blocks and flushing systems.",
    products: [
      { name: "Valve Blocks", description: "Multi-color manifolds", brands: ["Dürr", "SAMES KREMLIN"] },
      { name: "Flush Systems", description: "Solvent management", brands: ["Graco", "Dürr"] },
      { name: "Color Selectors", description: "Automated color routing", brands: ["SAMES KREMLIN", "Graco"] },
    ],
  },
  "spare-parts": {
    title: "Spare Parts",
    titleZh: "备件",
    description: "Genuine replacement parts and consumables for spray equipment.",
    products: [
      { name: "Seals & O-Rings", description: "Pump and valve seals", brands: ["OEM"] },
      { name: "Nozzles & Tips", description: "Spray pattern components", brands: ["OEM"] },
      { name: "Service Kits", description: "Maintenance packages", brands: ["OEM"] },
    ],
  },
};

export default function ProductCategory() {
  const { category } = useParams<{ category: string }>();
  const data = category ? categoryData[category] : null;

  if (!data) {
    return (
      <div className="bg-background py-20">
        <div className="container-wide text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-6">The requested product category does not exist.</p>
          <Button asChild>
            <Link to="/products">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{data.title} | TD Painting Systems</title>
        <meta name="description" content={data.description} />
        <link rel="canonical" href={`${DOMAIN}/products/${category}`} />
      </Helmet>

      <div className="bg-background">
        {/* Breadcrumb */}
        <div className="border-b border-border">
          <div className="container-wide py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/products" className="hover:text-foreground">Products</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{data.title}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="py-12 md:py-16 border-b border-border">
          <div className="container-wide">
            <FadeIn>
              <div className="max-w-3xl">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{data.title}</h1>
                <p className="text-muted-foreground">{data.description}</p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Products */}
        <section className="py-12 md:py-16 border-b border-border">
          <div className="container-wide">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.products.map((product, index) => (
                <FadeIn key={product.name} delay={index * 0.1}>
                  <div className="rounded-xl border border-border bg-card p-6 h-full">
                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                    <div className="pt-4 border-t border-border">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-2">
                        Available Brands
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {product.brands.map((brand) => (
                          <span
                            key={brand}
                            className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                          >
                            {brand}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16">
          <div className="container-wide">
            <FadeIn>
              <div className="rounded-xl border border-border bg-muted/30 p-8 text-center">
                <h2 className="text-xl font-semibold mb-2">Need {data.title}?</h2>
                <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
                  Contact us for specifications, pricing, and availability. We provide technical support and fast delivery.
                </p>
                <Button asChild>
                  <Link to="/quote">
                    <FileText className="h-4 w-4 mr-2" />
                    Request Quote
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>
      </div>
    </>
  );
}
