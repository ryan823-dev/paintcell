import { useEffect, useMemo } from "react";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Helmet } from "react-helmet-async";
import {
  ChevronRight, Bot, Ruler, Weight, Zap, Settings,
  CheckCircle2, FileText, ArrowRight, Cpu, Target,
  Timer, DollarSign, Gauge, Move3D, Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FadeIn } from "@/components/animations";
import { useI18n } from "@/i18n";

const DOMAIN = "https://tdpaint.com";

// Robot selection criteria
const selectionCriteria = [
  {
    icon: Ruler,
    titleKey: "workEnvelope",
    defaultTitle: "Work Envelope",
    descKey: "workEnvelopeDesc",
    defaultDesc: "Match robot reach to your largest workpiece. Consider 7-axis robots for complex geometries and internal surfaces.",
    tip: "Add 10-15% margin for tooling and approach angles",
  },
  {
    icon: Weight,
    titleKey: "payloadCapacity",
    defaultTitle: "Payload Capacity",
    descKey: "payloadDesc",
    defaultDesc: "Calculate total load: atomizer weight + paint hose + cable bundle + safety margin. Painting robots typically need 5-15 kg payload.",
    tip: "Hollow wrist robots carry less but offer better hose routing",
  },
  {
    icon: Gauge,
    titleKey: "repeatability",
    defaultTitle: "Repeatability",
    descKey: "repeatabilityDesc",
    defaultDesc: "Painting requires ±0.2mm or better for consistent film thickness. Higher precision robots justify cost in quality-critical applications.",
    tip: "Consider thermal expansion in high-temperature booths",
  },
  {
    icon: Shield,
    titleKey: "environmentRating",
    defaultTitle: "Environment Rating",
    descKey: "environmentDesc",
    defaultDesc: "Paint robots must be IP67 or better. Foundry Plus (IP67) for wet booths, Clean Room versions for sensitive coatings.",
    tip: "ATEX certification required for Zone 1 explosive atmospheres",
  },
  {
    icon: Move3D,
    titleKey: "axisConfiguration",
    defaultTitle: "Axis Configuration",
    descKey: "axisDesc",
    defaultDesc: "6-axis standard for most applications. 7-axis (linear rail) for extended reach. Consider wall-mount or inverted for space optimization.",
    tip: "7th axis enables larger work envelope without larger robot",
  },
  {
    icon: Zap,
    titleKey: "integrationFeatures",
    defaultTitle: "Integration Features",
    descKey: "integrationDesc",
    defaultDesc: "Paint-specific software (paint path generation), hollow wrist design, integrated paint supply, explosion-proof certification.",
    tip: "Check availability of painting-specific software options",
  },
];

// Robot comparison by application
const robotModels = [
  {
    brand: "ABB",
    series: "IRB 5500 Series",
    application: "Large Parts / Automotive Body",
    reach: "2.7-3.5 m",
    payload: "15-25 kg",
    features: ["7-axis available", "IP67 Foundry Plus", "Hollow wrist option", "IRC5P controller"],
    priceRange: "$80,000 - $150,000",
  },
  {
    brand: "ABB",
    series: "IRB 5400 Series",
    application: "Medium Parts / Components",
    reach: "1.8-2.5 m",
    payload: "12-20 kg",
    features: ["Compact design", "IP67 standard", "PaintWare software", "Flexible mounting"],
    priceRange: "$60,000 - $100,000",
  },
  {
    brand: "ABB",
    series: "IRB 52 / IRB 58",
    application: "Small Parts / Plastic Components",
    reach: "1.2-1.5 m",
    payload: "5-10 kg",
    features: ["Hollow wrist", "Slim arm", "Fast cycle times", "Cost-effective"],
    priceRange: "$40,000 - $70,000",
  },
  {
    brand: "FANUC",
    series: "P-50iB / P-250iB",
    application: "Automotive / Industrial",
    reach: "1.8-2.8 m",
    payload: "10-20 kg",
    features: ["Hollow wrist", "R-30iB controller", "PaintTool software", "IP67 rated"],
    priceRange: "$70,000 - $120,000",
  },
  {
    brand: "KUKA",
    series: "KR 10-16 Paint",
    application: "General Industrial",
    reach: "1.6-2.0 m",
    payload: "10-16 kg",
    features: ["In-line wrist", "KRC4 controller", "Paint-specific options", "ATEX certified"],
    priceRange: "$65,000 - $95,000",
  },
  {
    brand: "Yaskawa",
    series: "EP10 / EP20",
    application: "Industrial Coating",
    reach: "1.5-2.1 m",
    payload: "10-20 kg",
    features: ["Motoman style", "YRC1000 controller", "Explosion-proof", "Cost competitive"],
    priceRange: "$55,000 - $85,000",
  },
];

// Decision matrix
const decisionMatrix = [
  {
    scenario: "Automotive Body - High Volume",
    recommendation: "ABB IRB 5500-22/IRB 5500-13",
    reason: "Large work envelope, 7-axis capability, proven automotive track record",
    investment: "High",
    roi: "12-24 months",
  },
  {
    scenario: "Automotive Parts - Medium Volume",
    recommendation: "ABB IRB 5400-24 / FANUC P-50iB",
    reason: "Optimal reach/payload ratio, flexible mounting, mature software ecosystem",
    investment: "Medium-High",
    roi: "18-30 months",
  },
  {
    scenario: "Plastic Components - Multi-color",
    recommendation: "ABB IRB 52 / IRB 58",
    reason: "Hollow wrist for hose routing, compact design, fast color change integration",
    investment: "Medium",
    roi: "12-18 months",
  },
  {
    scenario: "Small Parts - Batch Production",
    recommendation: "ABB IRB 1200 / KUKA KR 6",
    reason: "Compact footprint, cost-effective, sufficient for small workpieces",
    investment: "Low-Medium",
    roi: "8-15 months",
  },
];

// Cost factors
const costFactors = [
  { factor: "Robot (naked)", range: "$40,000 - $150,000", note: "Based on size and brand" },
  { factor: "Controller", range: "$15,000 - $35,000", note: "IRC5P, R-30iB, KRC4" },
  { factor: "Paint Package", range: "$10,000 - $30,000", note: "Hollow wrist, software, hoses" },
  { factor: "Installation", range: "$5,000 - $20,000", note: "Mounting, integration, commissioning" },
  { factor: "Safety Systems", range: "$3,000 - $15,000", note: "Light curtains, E-stops, ATEX" },
];

export default function PaintingRobotSelectionGuide() {
  const { t, locale } = useI18n();
  const isZh = locale === "zh-CN";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const schemas = useMemo(() => [
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "@id": `${DOMAIN}/resources/knowledge/painting-robot-selection-guide#article`,
      headline: isZh ? "涂装机器人选型指南" : "Painting Robot Selection Guide",
      description: isZh
        ? "全面的涂装机器人选型指南，涵盖ABB、FANUC、KUKA、安川等主流品牌的技术参数对比和选型决策。"
        : "Comprehensive guide to selecting painting robots. Compare specifications from ABB, FANUC, KUKA, Yaskawa and make informed decisions.",
      author: { "@type": "Organization", name: "TD Engineering Team" },
      publisher: { "@type": "Organization", name: "TD Painting System" },
      inLanguage: locale,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${DOMAIN}/resources/knowledge/painting-robot-selection-guide#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${DOMAIN}/` },
        { "@type": "ListItem", position: 2, name: isZh ? "工程资源库" : "Engineering Library", item: `${DOMAIN}/resources/engineering-library` },
        { "@type": "ListItem", position: 3, name: isZh ? "机器人选型指南" : "Robot Selection Guide", item: `${DOMAIN}/resources/knowledge/painting-robot-selection-guide` },
      ],
    },
  ], [locale, isZh]);

  const content = {
    metaTitle: isZh ? "涂装机器人选型指南 | 技术参数与决策矩阵" : "Painting Robot Selection Guide | Specs & Decision Matrix",
    metaDescription: isZh
      ? "全面的涂装机器人选型指南，涵盖工作范围、负载能力、精度要求、防爆等级等关键参数，对比ABB、FANUC、KUKA、安川等主流品牌。"
      : "Comprehensive painting robot selection guide covering work envelope, payload, precision, and explosion-proof ratings. Compare ABB, FANUC, KUKA, Yaskawa models.",
    badge: isZh ? "工程指南" : "Engineering Guide",
    heroTitle: isZh ? "涂装机器人选型指南" : "Painting Robot Selection Guide",
    heroSubtitle: isZh
      ? "选择合适的喷涂机器人是项目成功的关键。本指南提供系统化的选型方法论，涵盖关键技术参数、主流品牌对比、应用场景推荐和成本分析，帮助工程师做出明智的设备选型决策。"
      : "Selecting the right painting robot is critical for project success. This guide provides a systematic approach covering key specifications, brand comparisons, application recommendations, and cost analysis for informed decision-making.",
  };

  return (
    <>
      <Helmet>
        <title>{content.metaTitle}</title>
        <meta name="description" content={content.metaDescription} />
        <link rel="canonical" href={`${DOMAIN}/resources/knowledge/painting-robot-selection-guide`} />
        {schemas.map((s, i) => (
          <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
        ))}
      </Helmet>

      <div className="min-h-screen bg-background">

        {/* Breadcrumb */}
        <div className="container-wide pt-4 pb-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">{isZh ? "首页" : "Home"}</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/resources/engineering-library">{isZh ? "工程资源库" : "Engineering Library"}</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{isZh ? "机器人选型指南" : "Robot Selection Guide"}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Hero */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-20">
            <FadeIn>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Bot className="h-6 w-6 text-accent" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
                  {content.badge}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold mb-6 leading-tight">
                {content.heroTitle}
              </h1>
              <div className="max-w-3xl space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
                <p>{content.heroSubtitle}</p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Selection Criteria */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <FadeIn>
              <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <Target className="h-3.5 w-3.5" />
                {isZh ? "选型要素" : "Selection Criteria"}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                {isZh ? "关键选型参数" : "Key Selection Parameters"}
              </h2>
            </FadeIn>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectionCriteria.map((criteria, index) => (
                <FadeIn key={criteria.titleKey} delay={index * 0.1}>
                  <Card className="border-border bg-card h-full">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                        <criteria.icon className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        {isZh ? criteria.titleKey : criteria.defaultTitle}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {isZh ? criteria.descKey : criteria.defaultDesc}
                      </p>
                      <div className="pt-3 border-t border-border">
                        <p className="text-xs text-accent font-medium">
                          {isZh ? "提示：" : "Tip: "}{criteria.tip}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Robot Models Comparison */}
        <section className="border-b border-border bg-muted/30">
          <div className="container-wide py-12 md:py-16">
            <FadeIn>
              <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <Settings className="h-3.5 w-3.5" />
                {isZh ? "型号对比" : "Model Comparison"}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                {isZh ? "主流涂装机器人型号" : "Popular Painting Robot Models"}
              </h2>
            </FadeIn>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-sm">{isZh ? "品牌" : "Brand"}</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">{isZh ? "系列" : "Series"}</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">{isZh ? "应用场景" : "Application"}</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">{isZh ? "臂展" : "Reach"}</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">{isZh ? "负载" : "Payload"}</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">{isZh ? "价格范围" : "Price Range"}</th>
                  </tr>
                </thead>
                <tbody>
                  {robotModels.map((robot, index) => (
                    <tr key={`${robot.brand}-${robot.series}`} className="border-b border-border">
                      <td className="py-3 px-4 font-medium">{robot.brand}</td>
                      <td className="py-3 px-4">{robot.series}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{robot.application}</td>
                      <td className="py-3 px-4">{robot.reach}</td>
                      <td className="py-3 px-4">{robot.payload}</td>
                      <td className="py-3 px-4 text-sm">{robot.priceRange}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              {isZh
                ? "* 价格仅供参考，实际价格因配置、数量、市场等因素而异。"
                : "* Prices are indicative only. Actual prices vary by configuration, quantity, and market conditions."}
            </p>
          </div>
        </section>

        {/* Decision Matrix */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <FadeIn>
              <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <Cpu className="h-3.5 w-3.5" />
                {isZh ? "决策矩阵" : "Decision Matrix"}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                {isZh ? "应用场景推荐" : "Application Recommendations"}
              </h2>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-6">
              {decisionMatrix.map((item, index) => (
                <FadeIn key={item.scenario} delay={index * 0.1}>
                  <Card className="border-border bg-card h-full">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-accent mb-2">{item.scenario}</h3>
                      <p className="text-lg font-bold mb-2">{item.recommendation}</p>
                      <p className="text-sm text-muted-foreground mb-4">{item.reason}</p>
                      <div className="flex gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">{isZh ? "投资：" : "Investment: "}</span>
                          <span className="font-medium">{item.investment}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">{isZh ? "回报周期：" : "ROI: "}</span>
                          <span className="font-medium">{item.roi}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Cost Breakdown */}
        <section className="border-b border-border bg-muted/30">
          <div className="container-wide py-12 md:py-16">
            <FadeIn>
              <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <DollarSign className="h-3.5 w-3.5" />
                {isZh ? "成本分析" : "Cost Analysis"}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                {isZh ? "机器人系统成本构成" : "Robot System Cost Breakdown"}
              </h2>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-sm">{isZh ? "成本项目" : "Cost Item"}</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm">{isZh ? "价格范围" : "Range"}</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm">{isZh ? "备注" : "Note"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {costFactors.map((item, index) => (
                      <tr key={item.factor} className="border-b border-border">
                        <td className="py-3 px-4 font-medium">{item.factor}</td>
                        <td className="py-3 px-4">{item.range}</td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{item.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold">{isZh ? "成本优化建议" : "Cost Optimization Tips"}</h3>
                <ul className="space-y-2">
                  {[
                    isZh ? "裸机价格：选择合适尺寸，避免过大规格" : "Naked robot: Right-size to avoid overspecification",
                    isZh ? "二手设备：考虑翻新机器人降低初始投资" : "Used equipment: Consider refurbished robots for lower initial cost",
                    isZh ? "框架协议：多台采购争取批量折扣" : "Framework agreements: Negotiate volume discounts for multiple units",
                    isZh ? "备件包：合理配置备件，避免过度库存" : "Spare parts: Rational inventory to avoid overstocking",
                    isZh ? "国产替代：评估国产机器人的适用性" : "Domestic alternatives: Evaluate local brands where suitable",
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="border-b border-border">
          <div className="container-wide py-12 md:py-16">
            <FadeIn>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                {isZh ? "相关资源" : "Related Resources"}
              </h2>
            </FadeIn>
            <div className="grid md:grid-cols-3 gap-6">
              <FadeIn delay={0}>
                <Link
                  to="/resources/knowledge/industrial-robot-brands"
                  className="block p-6 rounded-xl border border-border bg-card hover:border-accent/30 transition-colors"
                >
                  <Bot className="h-8 w-8 text-accent mb-4" />
                  <h3 className="font-semibold mb-2">{isZh ? "工业机器人品牌对比" : "Robot Brand Comparison"}</h3>
                  <p className="text-sm text-muted-foreground">
                    {isZh
                      ? "ABB、FANUC、KUKA、安川等品牌详细对比"
                      : "Detailed comparison of ABB, FANUC, KUKA, Yaskawa brands"}
                  </p>
                </Link>
              </FadeIn>
              <FadeIn delay={0.1}>
                <Link
                  to="/resources/knowledge/how-to-choose-paint-robot"
                  className="block p-6 rounded-xl border border-border bg-card hover:border-accent/30 transition-colors"
                >
                  <Target className="h-8 w-8 text-accent mb-4" />
                  <h3 className="font-semibold mb-2">{isZh ? "如何选择涂装机器人" : "How to Choose Paint Robot"}</h3>
                  <p className="text-sm text-muted-foreground">
                    {isZh
                      ? "涂装机器人选型的实用指南"
                      : "Practical guide to painting robot selection"}
                  </p>
                </Link>
              </FadeIn>
              <FadeIn delay={0.2}>
                <Link
                  to="/resources/tools/roi-calculator"
                  className="block p-6 rounded-xl border border-border bg-card hover:border-accent/30 transition-colors"
                >
                  <DollarSign className="h-8 w-8 text-accent mb-4" />
                  <h3 className="font-semibold mb-2">{isZh ? "ROI投资回报计算器" : "ROI Calculator"}</h3>
                  <p className="text-sm text-muted-foreground">
                    {isZh
                      ? "计算机器人涂装系统的投资回报"
                      : "Calculate return on investment for robotic painting"}
                  </p>
                </Link>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16">
          <div className="container-wide">
            <FadeIn>
              <div className="rounded-2xl border border-border bg-muted/30 p-8 md:p-12 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  {isZh ? "需要帮助选择合适的机器人？" : "Need Help Selecting the Right Robot?"}
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  {isZh
                    ? "我们的工程师可以根据您的具体应用需求，提供专业的机器人选型建议和方案设计。"
                    : "Our engineers can provide professional robot selection advice and solution design based on your specific application requirements."}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button
                    onClick={() => {
                      const btn = document.querySelector("[data-assistant-trigger]") as HTMLButtonElement;
                      if (btn) btn.click();
                    }}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-11 px-6 gap-2 rounded-xl"
                  >
                    <Target className="h-4 w-4" />
                    {isZh ? "开始选型评估" : "Start Selection Assessment"}
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="h-11 px-6 gap-2 rounded-xl"
                  >
                    <Link to="/quote">
                      <FileText className="h-4 w-4" />
                      {isZh ? "获取报价" : "Request Quote"}
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