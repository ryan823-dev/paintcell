import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations";
import { ChevronRight, FileText, ArrowLeft } from "lucide-react";

const DOMAIN = "https://tdpaint.com";

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
      { 
        name: "High-Speed Bells", 
        description: "60,000 RPM, 100kV cascade, bell cups 15-50mm", 
        brands: ["Dürr", "SAMES KREMLIN", "ABB RB1000i"] 
      },
      { 
        name: "Standard Bells", 
        description: "General purpose electrostatic atomizers, 30,000-45,000 RPM", 
        brands: ["Ransburg Robobell 925", "Graco G1 Copes"] 
      },
      { 
        name: "Waterborne Bells", 
        description: "Optimized for water-based coatings, external charge", 
        brands: ["Dürr EcoBell", "SAMES PPH707"] 
      },
      {
        name: "Miniature Bells",
        description: "For small parts and touch-up, 80,000 RPM",
        brands: ["SAMES MiniBell", "Graco MicroBell"]
      },
    ],
  },
  "spray-guns": {
    title: "Spray Guns",
    titleZh: "喷枪",
    description: "HVLP, air spray, and electrostatic spray guns for manual and robotic applications.",
    products: [
      { 
        name: "HVLP Guns", 
        description: "High volume low pressure, <10 psi at cap, 65-75% transfer efficiency", 
        brands: ["SATAjet", "DeVilbiss GTi", "Graco Ultra"] 
      },
      { 
        name: "Air Spray Guns", 
        description: "Traditional atomization, 40-80 psi, 25-40% transfer efficiency", 
        brands: ["Graco H1050", "Binks-Maple 15/30", "SAMES"] 
      },
      { 
        name: "Electrostatic Guns", 
        description: "40-100kV, 75-95% transfer efficiency, wrap-around coverage", 
        brands: ["Ransburg 704", "Graco Pro Xp", "SAMES F209"] 
      },
      {
        name: "Robotic Spray Guns",
        description: "Hollow wrist design, explosion-proof, ATEX certified",
        brands: ["Graco H1050 Robot", "Binks-Maple Robot", "Timmer 1060"]
      },
    ],
  },
  "paint-pumps": {
    title: "Paint Pumps",
    titleZh: "供漆泵",
    description: "Diaphragm and piston pumps for paint supply systems.",
    products: [
      { 
        name: "Diaphragm Pumps", 
        description: "For low to medium viscosity, air-operated, explosion-proof", 
        brands: ["Graco Husky", "ARO", "Wilden"] 
      },
      { 
        name: "Piston Pumps", 
        description: "High pressure up to 350 bar, for viscous materials", 
        brands: ["Graco HFR", "Graco Matrix", "SAMES"] 
      },
      { 
        name: "Gear Pumps", 
        description: "Precise metering, constant pressure, low pulsation", 
        brands: ["Graco", "SAMES KREMLIN"] 
      },
      {
        name: "2K Ratio Controllers",
        description: "Precision mixing of base and catalyst, 1:1 to 10:1 ratios",
        brands: ["Graco Reactor", "SAMES KREMLIN"]
      },
    ],
  },
  "control-systems": {
    title: "Control Systems",
    titleZh: "控制系统",
    description: "PLC-based control systems and robot controllers for painting automation.",
    products: [
      { 
        name: "PLC Systems", 
        description: "Siemens S7-1500, Allen-Bradley ControlLogix, PROFINET/EtherNet/IP", 
        brands: ["Siemens", "Allen-Bradley", "Mitsubishi"] 
      },
      { 
        name: "Robot Controllers", 
        description: "IRC5 (ABB), R-30iB (FANUC), KRC4 (KUKA), painting-specific software", 
        brands: ["ABB", "FANUC", "KUKA", "Yaskawa"] 
      },
      { 
        name: "HMI Panels", 
        description: "Touch screen operator interface, recipe management", 
        brands: ["Siemens", "Pro-face", "Allen-Bradley"] 
      },
      {
        name: "Safety Systems",
        description: "ATEX-certified safety controllers, emergency stops, gas detection",
        brands: ["Pilz", "SICK", "Omron"]
      },
    ],
  },
  "color-change": {
    title: "Color Change Systems",
    titleZh: "换色系统",
    description: "Fast color change valve blocks and flushing systems.",
    products: [
      { 
        name: "Valve Blocks", 
        description: "Multi-color manifolds, 2-20 colors, <3 min change time", 
        brands: ["Dürr", "SAMES KREMLIN PPH707", "Graco"] 
      },
      { 
        name: "Flush Boxes", 
        description: "Solvent management, <150ml waste per color change", 
        brands: ["Graco", "Dürr"] 
      },
      { 
        name: "Color Selectors", 
        description: "Automated color routing with recipe management", 
        brands: ["SAMES KREMLIN", "Graco"] 
      },
      {
        name: "Fast Color Change Guns",
        description: "Integrated valve-in-gun, zero cross-contamination",
        brands: ["SAMES PPH707", "Graco Fusion"]
      },
    ],
  },
  "spare-parts": {
    title: "Spare Parts",
    titleZh: "备件",
    description: "Genuine replacement parts and consumables for spray equipment.",
    products: [
      { 
        name: "Seals & O-Rings", 
        description: "Pump and valve seals, chemical-resistant materials", 
        brands: ["OEM", "Graco", "SAMES"] 
      },
      { 
        name: "Nozzles & Tips", 
        description: "Spray pattern components, various orifice sizes", 
        brands: ["OEM", "Graco", "Binks"] 
      },
      { 
        name: "Service Kits", 
        description: "Preventive maintenance packages", 
        brands: ["OEM", "Graco", "ABB"] 
      },
      {
        name: "Bell Cups",
        description: "15-50mm diameter, various patterns for rotary atomizers",
        brands: ["Dürr", "SAMES", "ABB"]
      },
      {
        name: "Turbines & Bearings",
        description: "High-speed rotation components, 60,000+ RPM rated",
        brands: ["OEM", "FAG", "SKF"]
      },
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
        <meta name="description" content={data.description || "Industrial coating equipment for automotive and industrial applications."} />
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
