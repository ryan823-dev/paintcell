import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations";
import { ChevronRight, FileText, ArrowLeft } from "lucide-react";
import { useCanonicalUrl } from "@/hooks/useRouteLocale";

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

const categoryGeoCopy: Record<string, {
  metaDescription: string;
  answer: string;
  bestFit: string;
  selectionFactors: string[];
  projectInputs: string[];
}> = {
  "rotary-bells": {
    metaDescription:
      "Compare electrostatic rotary bells for robotic painting cells, including bell speed, cup size, voltage, waterborne fit, maintenance access, and integration requirements.",
    answer:
      "Rotary bells are high-speed electrostatic atomizers used when a robotic painting cell needs high transfer efficiency, stable film build, and repeatable Class A or industrial finish quality.",
    bestFit:
      "Best fit for medium- to high-volume parts with repeatable geometry, controlled booth airflow, and enough project scope to validate paint chemistry, electrostatics, and cleaning routines together.",
    selectionFactors: [
      "Confirm coating type, solids content, target film build, and whether waterborne isolation is required.",
      "Match bell cup size, speed range, voltage package, and robot wrist routing to the part geometry.",
      "Validate cleaning cycle, color-change frequency, spare bell cups, turbines, and preventive maintenance access.",
    ],
    projectInputs: [
      "Part drawings or photos",
      "Paint system and finish target",
      "Throughput and color-change pattern",
      "Robot brand, wrist type, and booth classification",
    ],
  },
  "spray-guns": {
    metaDescription:
      "Compare HVLP, air spray, electrostatic, and robotic spray guns for industrial paint cells by finish quality, transfer efficiency, coating type, and automation fit.",
    answer:
      "Spray guns are selected around atomization quality, transfer efficiency, coating chemistry, available utilities, and whether the process is manual, semi-automatic, or robot-mounted.",
    bestFit:
      "Best fit for projects where part mix, coating type, and finish tolerance need a practical balance between equipment cost, process stability, and maintenance simplicity.",
    selectionFactors: [
      "Use HVLP or air spray for flexible low- to medium-volume work where setup simplicity matters.",
      "Use electrostatic guns when wrap-around coverage and transfer efficiency justify voltage controls and grounding checks.",
      "Use robotic spray guns when repeatable paths, automatic triggering, and booth interlocks are part of the cell scope.",
    ],
    projectInputs: [
      "Coating data sheet",
      "Required finish class",
      "Manual or robotic application mode",
      "Available air, fluid, and safety interfaces",
    ],
  },
  "paint-pumps": {
    metaDescription:
      "Select paint pumps for industrial paint supply systems by coating viscosity, pressure range, flow stability, recirculation, 2K mixing, and maintenance requirements.",
    answer:
      "Paint pumps keep coating pressure and flow stable from the supply room to spray guns or rotary bells; the right pump depends on viscosity, pressure, flow rate, recirculation, and mixing requirements.",
    bestFit:
      "Best fit for paint supply upgrades, robotic cells, centralized supply rooms, and lines where unstable pressure or pulsation is already causing finish variation.",
    selectionFactors: [
      "Use diaphragm pumps for many low- to medium-viscosity circulation and transfer duties.",
      "Use piston or metering pumps when high pressure, high viscosity, or controlled 2K ratio delivery is required.",
      "Check pulsation, seal compatibility, cleaning routine, explosion protection, and spare-part availability before final selection.",
    ],
    projectInputs: [
      "Paint viscosity and solvent compatibility",
      "Flow rate per applicator",
      "Line length and pressure drop",
      "Number of colors and 2K ratio requirements",
    ],
  },
  "color-change": {
    metaDescription:
      "Plan color change systems for robotic paint lines, including valve blocks, flush boxes, recipe control, solvent waste, cycle time, and contamination prevention.",
    answer:
      "Color change systems route paint, solvent, and air through controlled valve blocks so a robotic painting line can switch colors with predictable cycle time, low waste, and low contamination risk.",
    bestFit:
      "Best fit for high-mix production where color-change time, purge volume, and repeatability affect takt time, coating cost, and first-pass quality.",
    selectionFactors: [
      "Define the real number of active colors, daily change frequency, and acceptable purge volume.",
      "Place valve blocks and flush boxes close enough to applicators to reduce dead volume and cleaning time.",
      "Connect color recipes, solvent handling, interlocks, and waste collection to the main cell control logic.",
    ],
    projectInputs: [
      "Color list and change sequence",
      "Target changeover time",
      "Solvent and paint chemistry",
      "Applicator count and booth layout",
    ],
  },
  "spare-parts": {
    metaDescription:
      "Plan spare parts and consumables for robotic painting systems, including seals, nozzles, bell cups, turbines, service kits, and preventive maintenance stock.",
    answer:
      "Spare parts planning protects paint-cell uptime by stocking the wear items that directly affect atomization, pressure stability, color-change reliability, and rotary bell performance.",
    bestFit:
      "Best fit for plants that already operate spray equipment or robotic cells and need predictable maintenance windows instead of emergency part sourcing.",
    selectionFactors: [
      "Separate critical uptime parts from routine consumables so inventory is tied to production risk.",
      "Track seals, nozzles, tips, bell cups, turbines, bearings, and service kits by applicator model.",
      "Base stock levels on shifts, color-change frequency, coating abrasiveness, and supplier lead time.",
    ],
    projectInputs: [
      "Equipment model list",
      "Current failure or wear history",
      "Operating hours per week",
      "Required response time for line stoppages",
    ],
  },
};

interface ProductCategoryProps {
  categoryKey?: string;
}

export default function ProductCategory({ categoryKey }: ProductCategoryProps) {
  const { category: routeCategory } = useParams<{ category: string }>();
  const category = categoryKey || routeCategory;
  const canonicalPath = category ? `/products/${category}` : "/products";
  const canonicalUrl = useCanonicalUrl(canonicalPath);
  const data = category ? categoryData[category] : null;
  const geoCopy = category ? categoryGeoCopy[category] : null;

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
        <meta name="description" content={geoCopy?.metaDescription || data.description || "Industrial coating equipment for automotive and industrial applications."} />
        <link rel="canonical" href={canonicalUrl} />
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

        {geoCopy ? (
          <section className="py-10 md:py-12 border-b border-border bg-muted/20">
            <div className="container-wide">
              <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-xl border border-border bg-card p-6">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    Direct answer
                  </p>
                  <p className="text-base leading-relaxed text-foreground">{geoCopy.answer}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{geoCopy.bestFit}</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-6">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    Prepare before inquiry
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {geoCopy.projectInputs.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {geoCopy.selectionFactors.map((item) => (
                  <div key={item} className="rounded-xl border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

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
