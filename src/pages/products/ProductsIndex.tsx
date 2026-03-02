import { Helmet } from "react-helmet-async";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import {
  Settings, Wrench, Gauge, Box, Cpu, Package,
  ChevronRight, FileText, ArrowRight
} from "lucide-react";
import { useI18n } from "@/i18n/context";

const DOMAIN = "https://tdpaintcell.com";

const productCategoryKeys = [
  { key: "rotaryBells", icon: Settings, href: "/products/rotary-bells", brands: ["Dürr", "SAMES KREMLIN", "Ransburg"] },
  { key: "sprayGuns", icon: Wrench, href: "/products/spray-guns", brands: ["SATA", "DeVilbiss", "Graco"] },
  { key: "paintPumps", icon: Gauge, href: "/products/paint-pumps", brands: ["Graco", "ARO", "Wilden"] },
  { key: "controlSystems", icon: Cpu, href: "/products/control-systems", brands: ["Siemens", "Allen-Bradley", "ABB"] },
  { key: "colorChangeSystems", icon: Box, href: "/products/color-change", brands: ["Dürr", "SAMES KREMLIN", "Graco"] },
  { key: "spareParts", icon: Package, href: "/products/spare-parts", brands: ["OEM Parts", "Service Kits", "Wear Items"] },
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
  const { t } = useI18n();
  const page = t.productsPage || {};

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
                    {page.badge || "Product Catalog"}
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                  {page.heroTitle || "Coating Equipment & Parts"}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-3xl">
                  {page.heroSubtitle || "Quality spray equipment, pumps, control systems, and spare parts from leading manufacturers. Technical support and fast delivery for your coating operations."}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg" className="rounded-xl">
                    <Link to="/quote">
                      <FileText className="h-4 w-4 mr-2" />
                      {page.requestQuote || "Request Quote"}
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
                  {page.categoriesLabel || "Categories"}
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                  {page.categoriesTitle || "Product Categories"}
                </h2>
                <div className="h-px w-12 bg-accent/50" />
              </div>
            </FadeIn>
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productCategoryKeys.map((category) => {
                const categoryData = page[category.key] || {};
                return (
                  <StaggerItem key={category.key}>
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
                      <h3 className="text-lg font-semibold mb-3">{categoryData.title || category.key}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{categoryData.description || ""}</p>
                      
                      {/* Brands */}
                      <div className="pt-4 border-t border-border">
                        <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-2">
                          {page.brands || "Brands"}
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
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* Featured Brands */}
        <section className="py-16 md:py-20 border-b border-border bg-muted/30">
          <div className="container-wide">
            <FadeIn>
              <div className="mb-12 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">
                  {page.partnersLabel || "Technology Partners"}
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                  {page.partnersTitle || "Brands We Work With"}
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
                  {page.ctaTitle || "Need Equipment or Parts?"}
                </h2>
                <p className="text-sm text-white/60 mb-8">
                  {page.ctaSubtitle || "Contact us for product specifications, pricing, and availability. Technical support included."}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button asChild size="lg" className="rounded-xl bg-accent hover:bg-accent/90">
                    <Link to="/quote">
                      {page.ctaButton || "Request Product Quote"}
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
