import { Helmet } from "react-helmet-async";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import {
  Settings, Wrench, Gauge, Box, Cpu, Package,
  ChevronRight, FileText, ArrowRight
} from "lucide-react";

const DOMAIN = "https://tdpaintcell.com";

const productCategories = [
  {
    icon: Settings,
    title: "Rotary Bells",
    titleZh: "旋杯",
    description: "High-speed electrostatic rotary atomizers for automotive and industrial coating applications. Achieve superior transfer efficiency and finish quality.",
    href: "/products/rotary-bells",
    brands: ["Dürr", "SAMES KREMLIN", "Ransburg"],
    features: ["Electrostatic charging", "High-speed rotation", "Automatic cleaning"],
  },
  {
    icon: Wrench,
    title: "Spray Guns",
    titleZh: "喷枪",
    description: "HVLP, air spray, and electrostatic spray guns for manual and robotic applications. Precision atomization for various coating materials.",
    href: "/products/spray-guns",
    brands: ["SATA", "DeVilbiss", "Graco"],
    features: ["HVLP technology", "Air spray", "Electrostatic options"],
  },
  {
    icon: Gauge,
    title: "Paint Pumps",
    titleZh: "供漆泵",
    description: "Diaphragm and piston pumps for paint supply systems. Reliable material delivery for production coating lines.",
    href: "/products/paint-pumps",
    brands: ["Graco", "ARO", "Wilden"],
    features: ["Diaphragm pumps", "Piston pumps", "Ratio controllers"],
  },
  {
    icon: Cpu,
    title: "Control Systems",
    titleZh: "控制系统",
    description: "PLC-based control systems, robot controllers, and process automation for integrated painting lines.",
    href: "/products/control-systems",
    brands: ["Siemens", "Allen-Bradley", "ABB"],
    features: ["PLC automation", "HMI interfaces", "Data logging"],
  },
  {
    icon: Box,
    title: "Color Change Systems",
    titleZh: "换色系统",
    description: "Fast color change valve blocks, manifolds, and flushing systems for multi-color production lines.",
    href: "/products/color-change",
    brands: ["Dürr", "SAMES KREMLIN", "Graco"],
    features: ["Quick change valves", "Flush systems", "Waste reduction"],
  },
  {
    icon: Package,
    title: "Spare Parts",
    titleZh: "备件",
    description: "Genuine replacement parts and consumables for spray equipment maintenance and repair.",
    href: "/products/spare-parts",
    brands: ["OEM Parts", "Service Kits", "Wear Items"],
    features: ["Fast delivery", "OEM quality", "Technical support"],
  },
];

const featuredBrands = [
  { name: "ABB", category: "Robotics" },
  { name: "FANUC", category: "Robotics" },
  { name: "KUKA", category: "Robotics" },
  { name: "Dürr", category: "Paint Systems" },
  { name: "SAMES KREMLIN", category: "Spray Equipment" },
  { name: "Graco", category: "Fluid Handling" },
  { name: "SATA", category: "Spray Guns" },
  { name: "Siemens", category: "Controls" },
];

export default function ProductsIndex() {
  return (
    <>
      <Helmet>
        <title>Products | Spray Equipment, Pumps & Spare Parts | TD Painting Systems</title>
        <meta name="description" content="Industrial coating equipment including rotary bells, spray guns, paint pumps, control systems, and spare parts. Quality products from leading brands for automotive and industrial applications." />
        <link rel="canonical" href={`${DOMAIN}/products`} />
      </Helmet>

      <div className="bg-background">
        {/* Hero */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="container-wide">
            <FadeIn>
              <div className="max-w-4xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Package className="h-5 w-5 text-accent" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
                    Product Catalog
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                  Coating Equipment & Parts
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-3xl">
                  Quality spray equipment, pumps, control systems, and spare parts from leading manufacturers. Technical support and fast delivery for your coating operations.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg" className="rounded-xl">
                    <Link to="/quote">
                      <FileText className="h-4 w-4 mr-2" />
                      Request Quote
                    </Link>
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Product Categories */}
        <section className="py-16 md:py-20 border-b border-border">
          <div className="container-wide">
            <FadeIn>
              <div className="mb-12">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">
                  Categories
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                  Product Categories
                </h2>
                <div className="h-px w-12 bg-accent/50" />
              </div>
            </FadeIn>
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productCategories.map((category) => (
                <StaggerItem key={category.title}>
                  <Link
                    to={category.href}
                    className="group block rounded-xl border border-border bg-card p-6 h-full hover:border-accent/30 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <category.icon className="h-6 w-6 text-accent" />
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{category.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                    
                    {/* Brands */}
                    <div className="pt-4 border-t border-border">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-2">
                        Brands
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {category.brands.map((brand) => (
                          <span
                            key={brand}
                            className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                          >
                            {brand}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Featured Brands */}
        <section className="py-16 md:py-20 border-b border-border bg-muted/30">
          <div className="container-wide">
            <FadeIn>
              <div className="mb-12 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">
                  Technology Partners
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                  Brands We Work With
                </h2>
                <div className="h-px w-12 bg-accent/50 mx-auto" />
              </div>
            </FadeIn>
            <div className="flex flex-wrap justify-center gap-4">
              {featuredBrands.map((brand, index) => (
                <FadeIn key={brand.name} delay={index * 0.05}>
                  <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-border bg-card">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                      {brand.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-semibold leading-tight">{brand.name}</div>
                      <div className="text-[10px] text-muted-foreground">{brand.category}</div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 section-dark relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-accent/[0.08] blur-[100px]" />
          </div>
          <div className="container-wide relative">
            <FadeIn>
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4 text-white">
                  Need Equipment or Parts?
                </h2>
                <p className="text-sm text-white/60 mb-8">
                  Contact us for product specifications, pricing, and availability. Technical support included.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button asChild size="lg" className="rounded-xl bg-accent hover:bg-accent/90">
                    <Link to="/quote">
                      Request Product Quote
                    </Link>
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </div>
    </>
  );
}
