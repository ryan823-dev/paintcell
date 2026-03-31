import { ResourcePageLayout, AnswerBox } from "@/components/resources";
import { ContentSection } from "@/components/resources";
import { useI18n } from "@/i18n/context";
import { Helmet } from "react-helmet-async";

export default function WheelCoatingApplications() {
  const { t, locale } = useI18n();
  const isZh = locale === "zh-CN";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": isZh ? "铝合金轮毂涂装自动化解决方案" : "Aluminum Wheel Coating Automation Solutions",
    "description": "Robotic spray painting systems for aluminum wheel coating, including electrostatic bell applications, color change systems, and quality optimization.",
    "inLanguage": locale,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": isZh ? "铝合金轮毂喷涂通常使用什么设备？" : "What equipment is used for aluminum wheel coating?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isZh 
            ? "铝合金轮毂涂装通常使用静电旋杯（Electrostatic Bell）和自动喷枪组合。旋杯用于底漆和面漆的高速高效喷涂，配合AGMD自动换色系统实现多色生产。往复机或机器人带动喷涂设备，实现复杂曲面的均匀覆盖。"
            : "Aluminum wheel coating typically uses electrostatic rotary bells combined with automatic spray guns. Bells are used for high-speed, high-efficiency primer and basecoat application, paired with AGMD automatic color change systems for multi-color production. Reciprocators or robots carry the spray equipment for uniform coverage on complex geometries."
        }
      },
      {
        "@type": "Question",
        "name": isZh ? "轮毂涂装的换色时间是多少？" : "What is the color change time for wheel coating?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isZh
            ? "现代轮毂涂装线的换色时间通常在15-30秒之间。使用AGMD（自动换色模块）系统可以实现快速换色，配合双组分清洗系统最小化涂料浪费。快速换色对于多色轮毂生产线至关重要，直接影响生产效率和涂料消耗成本。"
            : "Modern wheel coating lines typically achieve color change times of 15-30 seconds. Using AGMD (Automatic Color Change Module) systems enables rapid color changes, with dual-purge systems minimizing paint waste. Quick color change is critical for multi-color wheel production lines, directly impacting production efficiency and paint consumption costs."
        }
      },
      {
        "@type": "Question",
        "name": isZh ? "静电旋杯在轮毂涂装中的优势是什么？" : "What are the advantages of electrostatic bells in wheel coating?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isZh
            ? "静电旋杯在轮毂涂装中的优势包括：1）转移效率高达85-95%，显著降低涂料消耗；2）环绕效应使涂料覆盖轮辐背面和内腔；3）高转速（10000-60000 RPM）产生均匀的漆膜；4）适合高速生产线，提升产能。"
            : "Advantages of electrostatic bells in wheel coating include: 1) Transfer efficiency of 85-95%, significantly reducing paint consumption; 2) Wraparound effect covers spoke backs and inner cavities; 3) High rotational speed (10,000-60,000 RPM) produces uniform film build; 4) Suitable for high-speed production lines, increasing capacity."
        }
      }
    ]
  };

  const breadcrumbs = [
    { label: isZh ? "工程资源库" : "Engineering Library", href: "/resources/engineering-library" },
    { label: isZh ? "行业应用" : "Applications" },
    { label: isZh ? "轮毂涂装" : "Wheel Coating" },
  ];

  // Customer references
  const customerReferences = [
    { name: "BBS", location: "Germany (Herbolzheim)", coating: "Water-borne", equipment: "Aerobell + AGMD" },
    { name: "Borbet", location: "Germany (Bad Langensalza)", coating: "Water-borne", equipment: "Aerobell + AGMD" },
    { name: "RONAL", location: "Poland (Jelcz Laskowice)", coating: "Solvent-borne", equipment: "Aerobell + Reciprocator" },
    { name: "ATS-Stahlschmidt", location: "Germany (Bad Dürkheim)", coating: "Water-borne", equipment: "Aerobell + Reciprocator" },
    { name: "AEZ", location: "Germany (Siegburg)", coating: "Solvent-borne", equipment: "Aerobell + AGMD" },
    { name: "Alcoa", location: "USA (Ohio, Pennsylvania)", coating: "Solvent-borne", equipment: "RMA-202 Robot" },
  ];

  return (
    <ResourcePageLayout
      title={isZh ? "铝合金轮毂涂装自动化解决方案" : "Aluminum Wheel Coating Automation Solutions"}
      metaTitle={isZh ? "铝合金轮毂涂装 | 自动化喷涂系统" : "Aluminum Wheel Coating | Automated Spray Systems"}
      metaDescription={isZh 
        ? "铝合金轮毂涂装自动化解决方案：静电旋杯喷涂、自动换色系统、质量控制，适用于汽车轮毂制造商。"
        : "Automated aluminum wheel coating solutions: electrostatic bell application, automatic color change systems, and quality control for automotive wheel manufacturers."}
      breadcrumbs={breadcrumbs}
      structuredData={structuredData}
    >
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <AnswerBox>
        {isZh 
          ? "铝合金轮毂涂装是汽车零部件涂装的重要应用领域。由于轮毂复杂的几何形状（包括轮辐、轮辋、中心孔等），传统手工喷涂难以保证均匀覆盖。自动化喷涂系统采用静电旋杯配合机器人或往复机，实现高转移效率（85-95%）和稳定的漆膜质量。现代轮毂涂装线通常采用水性漆，配合AGMD自动换色系统支持多色生产。"
          : "Aluminum wheel coating is a critical application in automotive parts finishing. Due to the complex geometry of wheels (including spokes, rim, and center bore), manual spray application struggles to achieve uniform coverage. Automated spray systems use electrostatic rotary bells with robots or reciprocators, achieving high transfer efficiency (85-95%) and consistent film quality. Modern wheel coating lines typically use water-borne paints, paired with AGMD automatic color change systems for multi-color production."}
      </AnswerBox>

      <ContentSection title={isZh ? "工艺流程概述" : "Process Overview"}>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {isZh
            ? "典型的铝合金轮毂涂装线包含以下工艺步骤："
            : "A typical aluminum wheel coating line includes the following process steps:"}
        </p>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li>{isZh ? "预处理（脱脂、铬化或无铬转化）" : "Pretreatment (degreasing, chrome or chrome-free conversion)"}</li>
          <li>{isZh ? "底漆喷涂（粉末或液体底漆）" : "Primer application (powder or liquid primer)"}</li>
          <li>{isZh ? "底漆烘干" : "Primer bake"}</li>
          <li>{isZh ? "面漆喷涂（色漆+清漆）" : "Basecoat + Clearcoat application"}</li>
          <li>{isZh ? "最终烘干" : "Final cure"}</li>
          <li>{isZh ? "冷却与检验" : "Cooling and inspection"}</li>
        </ol>
      </ContentSection>

      <ContentSection title={isZh ? "静电旋杯应用" : "Electrostatic Bell Application"}>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {isZh
            ? "静电旋杯（Aerobell）是轮毂涂装的核心设备。高速旋转的杯头（通常400-600mm直径）产生的离心力将涂料雾化成均匀的微滴，同时静电荷使涂料颗粒吸附在接地的轮毂表面。"
            : "The electrostatic rotary bell (Aerobell) is the core equipment for wheel coating. A high-speed rotating bell cup (typically 400-600mm diameter) generates centrifugal force that atomizes paint into uniform droplets, while electrostatic charge attracts paint particles to the grounded wheel surface."}
        </p>
        <div className="bg-muted/30 rounded-lg p-4">
          <h4 className="font-semibold mb-2">{isZh ? "关键技术参数" : "Key Technical Parameters"}</h4>
          <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
            <li>• {isZh ? "旋杯转速：10,000-60,000 RPM" : "Bell speed: 10,000-60,000 RPM"}</li>
            <li>• {isZh ? "静电电压：60-90 kV" : "Electrostatic voltage: 60-90 kV"}</li>
            <li>• {isZh ? "转移效率：85-95%" : "Transfer efficiency: 85-95%"}</li>
            <li>• {isZh ? "流量范围：100-500 ml/min" : "Flow rate: 100-500 ml/min"}</li>
          </ul>
        </div>
      </ContentSection>

      <ContentSection title={isZh ? "自动换色系统" : "Automatic Color Change Systems"}>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {isZh
            ? "轮毂制造商通常需要生产多种颜色的产品，因此快速换色系统至关重要。AGMD（Automatic Gun Module with Dosage）系统集成了喷枪、换色阀组和计量泵，可实现15-30秒的换色时间。"
            : "Wheel manufacturers typically produce products in multiple colors, making rapid color change systems essential. AGMD (Automatic Gun Module with Dosage) systems integrate spray guns, color change valves, and metering pumps, achieving color change times of 15-30 seconds."}
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="font-semibold mb-2">{isZh ? "双清洗系统" : "Dual Purge System"}</h4>
            <p className="text-sm text-muted-foreground">
              {isZh
                ? "使用溶剂和空气交替清洗，最小化涂料浪费。清洗程序可针对不同颜色和涂料类型进行优化。"
                : "Uses alternating solvent and air purging to minimize paint waste. Cleaning sequences can be optimized for different colors and paint types."}
            </p>
          </div>
          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="font-semibold mb-2">{isZh ? "涂料回收" : "Paint Recovery"}</h4>
            <p className="text-sm text-muted-foreground">
              {isZh
                ? "换色过程中排出的涂料可回收再利用，进一步降低材料成本和环境负担。"
                : "Paint displaced during color changes can be recovered and reused, further reducing material costs and environmental impact."}
            </p>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={isZh ? "客户案例参考" : "Customer References"}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-3 font-medium">Customer</th>
                <th className="text-left py-2 px-3 font-medium">Location</th>
                <th className="text-left py-2 px-3 font-medium">Coating Type</th>
                <th className="text-left py-2 px-3 font-medium">Equipment</th>
              </tr>
            </thead>
            <tbody>
              {customerReferences.map((customer, i) => (
                <tr key={i} className="border-b border-muted/50">
                  <td className="py-2 px-3 font-medium">{customer.name}</td>
                  <td className="py-2 px-3 text-muted-foreground">{customer.location}</td>
                  <td className="py-2 px-3 text-muted-foreground">{customer.coating}</td>
                  <td className="py-2 px-3 text-muted-foreground">{customer.equipment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ContentSection>

      <ContentSection title={isZh ? "水性漆应用趋势" : "Water-Borne Paint Trends"}>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {isZh
            ? "随着环保法规日益严格，越来越多的轮毂制造商转向水性漆。水性漆的应用需要特别注意："
            : "With increasingly stringent environmental regulations, more wheel manufacturers are transitioning to water-borne paints. Key considerations for water-borne application include:"}
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>{isZh ? "温湿度控制：最佳范围20-25°C，相对湿度50-70%" : "Temperature/humidity control: Optimal range 20-25°C, 50-70% RH"}</li>
          <li>{isZh ? "闪干时间：水性漆需要更长的闪干时间" : "Flash-off time: Water-borne paints require longer flash-off times"}</li>
          <li>{isZh ? "设备材质：需要不锈钢或特殊涂层以防腐蚀" : "Equipment materials: Stainless steel or special coatings required to prevent corrosion"}</li>
          <li>{isZh ? "清洗程序：水性漆的清洗与溶剂漆不同" : "Cleaning procedures: Water-borne cleaning differs from solvent-borne"}</li>
        </ul>
      </ContentSection>

      <ContentSection title={isZh ? "质量优化要点" : "Quality Optimization"}>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">{isZh ? "常见缺陷及解决方案" : "Common Defects and Solutions"}</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• {isZh ? "橘皮：调整雾化气压和流量" : "Orange peel: Adjust atomizing air and flow rate"}</li>
              <li>• {isZh ? "流挂：降低膜厚或提高闪干温度" : "Runs/sags: Reduce film build or increase flash temperature"}</li>
              <li>• {isZh ? "针孔：检查漆膜厚度和烘干曲线" : "Pinholes: Check film build and bake profile"}</li>
              <li>• {isZh ? "色差：校准配色系统和喷涂参数" : "Color variation: Calibrate color matching and spray parameters"}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">{isZh ? "过程监控" : "Process Monitoring"}</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• {isZh ? "膜厚在线检测" : "Online film thickness measurement"}</li>
              <li>• {isZh ? "色差仪自动检测" : "Automated color measurement"}</li>
              <li>• {isZh ? "外观检测（机器人视觉）" : "Appearance inspection (robot vision)"}</li>
              <li>• {isZh ? "涂层附着力测试" : "Coating adhesion testing"}</li>
            </ul>
          </div>
        </div>
      </ContentSection>
    </ResourcePageLayout>
  );
}