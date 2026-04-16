import { Helmet } from "react-helmet-async";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import {
  Settings, Wrench, Gauge, Box, Cpu, Package,
  ChevronRight, FileText, ArrowRight, Bot, ListChecks,
  CircleOff, ArrowRightLeft, ClipboardList, Ruler, ShieldAlert
} from "lucide-react";
import { useI18n } from "@/i18n/context";
import { useCanonicalUrl } from "@/hooks/useRouteLocale";
import { publicCmsAvailability } from "@/lib/publicCms";
import { getPageMetadata } from "@/data/pageMetadata";

const productCategoryKeys = [
  { key: "rotaryBells", icon: Settings, href: "/products/rotary-bells", brands: ["SAMES KREMLIN PPH707", "Ransburg Robobell", "Dürr EcoBell"] },
  { key: "sprayGuns", icon: Wrench, href: "/products/spray-guns", brands: ["Graco H1050", "Ransburg RMA660", "Binks-Maple 15/30"] },
  { key: "paintPumps", icon: Gauge, href: "/products/paint-pumps", brands: ["Graco P3:1", "Graco 4D150/350", "Timmer 1060"] },
  { key: "controlSystems", icon: Cpu, href: "/products/control-systems", brands: ["Siemens S7-1500", "Allen-Bradley", "ABB IRC5"] },
  { key: "colorChangeSystems", icon: Box, href: "/products/color-change", brands: ["ABB RB1000i-WSC", "Lactec", "Timmer"] },
  { key: "spareParts", icon: Package, href: "/products/spare-parts", brands: ["OEM Parts", "Service Kits", "Wear Items"] },
];

const featuredBrands = [
  { name: "ABB", category: "Robotics (IRB5500, IRB6700)" },
  { name: "FANUC", category: "Robotics (MPX2600, MPX3500)" },
  { name: "Yaskawa", category: "Robotics" },
  { name: "Kawasaki", category: "Robotics" },
  { name: "KUKA", category: "Robotics" },
  { name: "SAMES KREMLIN", category: "Rotary Bells & Guns" },
  { name: "Graco", category: "Fluid Handling & Guns" },
  { name: "Ransburg", category: "Electrostatic Equipment" },
  { name: "Binks-Maple", category: "Spray Equipment" },
  { name: "Siemens", category: "PLC & Controls" },
];

const selectionSummary = [
  {
    icon: ListChecks,
    eyebrow: "Best for",
    title: "Projects that already know the automation boundary",
    description:
      "Use this page when you have already decided the line needs a defined equipment stack and now need to map process conditions to product families.",
  },
  {
    icon: CircleOff,
    eyebrow: "Not ideal for",
    title: "Teams still deciding whether to automate at all",
    description:
      "If the real question is manual vs semi-automatic vs robotic, a product list is too early. Start with the solution or feasibility pages first.",
  },
  {
    icon: ArrowRightLeft,
    eyebrow: "Decision changes when",
    title: "Chemistry, changeover, or takt assumptions move",
    description:
      "Model choice changes quickly when paint type, color-count, finish target, part size, or cleaning frequency changes during scope definition.",
  },
] as const;

const requiredInputs = [
  {
    icon: ClipboardList,
    title: "Part family and finish target",
    description:
      "Visible Class A surfaces, corrosion-protection coating, or utility-grade finish will drive atomizer type, control depth, and process tolerance.",
  },
  {
    icon: Ruler,
    title: "Geometry, reach, and presentation method",
    description:
      "Model choice depends on part envelope, required spray angle, robot reach, hose routing, fixture repeatability, and whether the part is indexed or conveyed.",
  },
  {
    icon: ArrowRightLeft,
    title: "Takt, batch size, and color-change frequency",
    description:
      "The right bell, gun, pump, or color-change block depends on whether the line runs long batches or frequent short runs with cleaning loss pressure.",
  },
  {
    icon: ShieldAlert,
    title: "Coating chemistry and site constraints",
    description:
      "Solvent vs water-based paint, viscosity window, ATEX classification, available utilities, and controls standards can eliminate product families early.",
  },
] as const;

const modelMappings = [
  {
    scenario: "High-volume exterior plastic parts with tight finish consistency",
    mapping: "ABB IRB 5500 + electrostatic rotary bell + centralized color change",
    why: "Best fit when the line needs repeatable Class A appearance, stable film build, and disciplined multi-color production.",
  },
  {
    scenario: "Medium-size automotive or appliance parts with frequent geometry variation",
    mapping: "FANUC MPX 2600/3500 + gun-based spray package + recipe-based controls",
    why: "Useful when reach, path speed, and changeover control matter more than maximum bell throughput.",
  },
  {
    scenario: "Large metal structures, rails, or heavy pre-treatment tasks",
    mapping: "ABB IRB 6700 or rail-mounted robot + heavy-duty fluid handling + PLC integration",
    why: "Better for larger envelopes, heavier end-of-arm loads, and jobs where handling scope matters as much as spraying.",
  },
  {
    scenario: "Short-run or retrofit lines that still need simpler fluid handling",
    mapping: "Air-spray or HVLP gun package + pump/pressure-tank supply + staged controls upgrade",
    why: "Often the safer step when the line needs cleaner presentation and process discipline before a full robotic bell system is justified.",
  },
] as const;

export default function ProductsIndex() {
  const { t } = useI18n();
  const page = t.productsPage || {};
  const publicProductCmsEnabled = publicCmsAvailability.products;
  const pageMeta = getPageMetadata("/products");
  const robotModels = page.robotModels || [
    {
      brand: "ABB",
      model: "IRB 5500",
      spec: "Reach 2.98m, Payload 13kg",
      description:
        "Dedicated painting robot with hollow wrist, explosion-proof design. Ideal for automotive bumpers, trim, and component painting.",
      use: "Most deployed model in TD projects",
    },
    {
      brand: "ABB",
      model: "IRB 6700",
      spec: "Reach 2.6-3.2m, Payload 150-235kg",
      description:
        "High-payload robot used for flame treatment, heavy fixturing, and pre-treatment stations in painting lines.",
      use: "Pre-treatment & material handling",
    },
    {
      brand: "FANUC",
      model: "MPX 3500",
      spec: "Reach 1.56m, Painting-specific",
      description:
        "Compact explosion-proof painting robot with integrated hollow arm for paint line routing. Fast axis speeds for high takt-time production.",
      use: "Bumper & plastic component lines",
    },
    {
      brand: "FANUC",
      model: "MPX 2600",
      spec: "Reach 1.86m, Painting-specific",
      description:
        "Extended-reach painting robot for larger parts and booth configurations. Used in international deployments including VINFAST Thailand.",
      use: "Versatile mid-range painting",
    },
    {
      brand: "Kawasaki",
      model: "Painting Series",
      spec: "7-axis with linear track",
      description:
        "7th-axis rail-mounted painting robots for extended reach on large parts such as excavator booms, frames, and structural components.",
      use: "Construction machinery & heavy parts",
    },
    {
      brand: "CMA",
      model: "Painting Robots",
      spec: "6-axis, cost-effective",
      description:
        "Chinese-manufactured painting robots offering competitive pricing for general industrial applications and 3C electronics coating.",
      use: "Industrial & 3C applications",
    },
  ];
  const localizedFeaturedBrands = page.featuredBrands || featuredBrands;
  const canonicalUrl = useCanonicalUrl("/products");

  return (
    <>
      <Helmet>
        <title>{page.metaTitle || "Products | Spray Equipment, Pumps & Spare Parts | TD Painting Systems"}</title>
        <meta name="description" content={page.metaDescription || "Industrial coating equipment including rotary bells, spray guns, paint pumps, control systems, and spare parts. Quality products from leading brands for automotive and industrial applications."} />
        <link rel="canonical" href={canonicalUrl} />
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
                    {page.badge || "Product Selection Guide"}
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                  {page.heroTitle || "Select the Right Paint-System Equipment Stack"}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-3xl">
                  {page.heroSubtitle || "Use this page when you already know the project needs a defined paint-cell equipment stack and now need to narrow which atomizer, fluid-handling, robot, and controls family actually fits the job."}
                </p>
                <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground mb-6">
                  Product selection is usually wrong when teams start from brand preference or a single model number.
                  The better sequence is: confirm part family, finish target, takt, changeover, and coating chemistry first,
                  then map those constraints to equipment families and only then compare specific models.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg" className="rounded-xl">
                    <Link to="/quote">
                      <FileText className="h-4 w-4 mr-2" />
                      {page.requestQuote || "Request Quote"}
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-xl">
                    <Link to={publicProductCmsEnabled ? "/products/catalog" : "/products/rotary-bells"}>
                      <ArrowRight className="h-4 w-4 mr-2" />
                      {publicProductCmsEnabled
                        ? page.catalogButton || "Browse CMS Catalog"
                        : page.catalogFallbackButton || "Browse Categories"}
                    </Link>
                  </Button>
                </div>
                <div className="mt-6 max-w-3xl rounded-2xl border border-border bg-muted/30 p-5">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                    Selection basis
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Updated on {pageMeta?.updatedAt || "2026-04-16"}.
                    This page is for narrowing equipment families, not for replacing process review.
                    Final model choice still depends on coating chemistry, part presentation, changeover logic,
                    controls standards, and site compliance constraints.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="py-16 md:py-20 border-b border-border">
          <div className="container-wide">
            <FadeIn>
              <div className="mb-10 max-w-3xl">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">
                  Decision first
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
                  Decide the fit before you compare brands
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  The best product page is not a catalog. It should tell you whether you are even solving the right problem,
                  where equipment selection is likely to go wrong, and which inputs can change the answer.
                </p>
              </div>
            </FadeIn>
            <div className="grid gap-4 lg:grid-cols-3">
              {selectionSummary.map((item, index) => (
                <FadeIn key={item.title} delay={index * 0.06}>
                  <div className="h-full rounded-2xl border border-border bg-card p-6">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                      {item.eyebrow}
                    </p>
                    <h3 className="mb-3 text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 border-b border-border bg-muted/30">
          <div className="container-wide">
            <FadeIn>
              <div className="mb-10 max-w-3xl">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">
                  Inputs to confirm
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
                  Confirm these four inputs before choosing any model
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  If any of these inputs are still vague, model names are premature. This is the minimum information set
                  needed before a product recommendation becomes reliable.
                </p>
              </div>
            </FadeIn>
            <div className="grid gap-4 md:grid-cols-2">
              {requiredInputs.map((item, index) => (
                <FadeIn key={item.title} delay={index * 0.06}>
                  <div className="h-full rounded-2xl border border-border bg-background p-6">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mb-3 text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 border-b border-border">
          <div className="container-wide">
            <FadeIn>
              <div className="mb-10 max-w-3xl">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">
                  Typical mapping
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
                  Typical scenario-to-model mapping
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  These are starting points, not fixed prescriptions. The mapping changes when finish class, color count,
                  solvent strategy, or part handling changes.
                </p>
              </div>
            </FadeIn>
            <div className="grid gap-4 lg:grid-cols-2">
              {modelMappings.map((item, index) => (
                <FadeIn key={item.scenario} delay={index * 0.06}>
                  <div className="h-full rounded-2xl border border-border bg-card p-6">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                      Scenario
                    </p>
                    <h3 className="mb-3 text-lg font-semibold">{item.scenario}</h3>
                    <p className="mb-3 text-sm font-medium text-foreground">{item.mapping}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.why}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Product Categories */}
        <section className="py-16 md:py-20 border-b border-border">
          <div className="container-wide">
            <FadeIn>
              <div className="mb-12">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">
                  {page.categoriesLabel || "Equipment Families"}
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                  {page.categoriesTitle || "Browse by equipment family"}
                </h2>
                <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  Once the decision boundary is clear, use these categories to drill into the specific hardware family
                  that needs commercial comparison or technical clarification.
                </p>
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

        {/* Robot Models Section */}
        <section className="py-16 md:py-20 border-b border-border">
          <div className="container-wide">
            <FadeIn>
              <div className="mb-12">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">
                  {page.robotPlatformsLabel || "Robot Platforms"}
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                  {page.robotPlatformsTitle || "Painting Robot Models We Integrate"}
                </h2>
                <div className="h-px w-12 bg-accent/50" />
              </div>
            </FadeIn>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {robotModels.map((robot, idx) => (
                <FadeIn key={idx} delay={idx * 0.05}>
                  <div className="rounded-xl border border-border bg-card p-6 h-full hover:border-accent/30 transition-colors">
                    <div className="flex items-center gap-2 mb-3">
                      <Bot className="h-5 w-5 text-accent" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-accent">{robot.brand}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{robot.model}</h3>
                    <p className="text-xs text-muted-foreground mb-3 font-mono">{robot.spec}</p>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{robot.description}</p>
                    <div className="text-xs text-accent font-medium bg-accent/5 px-2 py-1 rounded inline-block">
                      {robot.use}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
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
              {localizedFeaturedBrands.map((brand, index) => (
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
