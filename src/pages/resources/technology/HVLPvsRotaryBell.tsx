import { ResourcePageLayout } from "@/components/resources";
import { ContentSection } from "@/components/resources";
import { AnswerBox } from "@/components/resources";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useI18n } from "@/i18n/context";

export default function HVLPvsRotaryBell() {
  const { t, locale } = useI18n();
  const isZh = locale === "zh-CN";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": isZh ? "HVLP喷枪 vs 静电旋杯雾化器对比" : "HVLP Spray Gun vs Rotary Bell Atomizer Comparison",
    "description": isZh
      ? "详细对比HVLP喷枪和静电旋杯雾化器的技术特点、转移效率、应用场景和选型建议。"
      : "Comprehensive comparison of HVLP spray guns and rotary bell atomizers: transfer efficiency, application areas, and selection guidance.",
    "inLanguage": locale,
    "proficiencyLevel": "Advanced",
  };

  const faqSchema = {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": isZh ? "HVLP和旋杯雾化器哪个转移效率更高？" : "Which has higher transfer efficiency, HVLP or rotary bell?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isZh
            ? "静电旋杯雾化器的转移效率通常为85-95%，远高于HVLP的60-75%。静电旋杯通过离心雾化结合静电吸附，涂料颗粒被吸引到工件表面，显著减少过喷。"
            : "Electrostatic rotary bell atomizers typically achieve 85-95% transfer efficiency, significantly higher than HVLP's 60-75%. The electrostatic attraction pulls coating particles to the workpiece surface, dramatically reducing overspray."
        }
      },
      {
        "@type": "Question",
        "name": isZh ? "什么情况下选择HVLP而不是旋杯？" : "When should I choose HVLP over rotary bell atomizer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isZh
            ? "HVLP适用于：中小批量生产、预算有限、对涂层质量要求不是最高、表面形状复杂难以静电覆盖的工件。HVLP设备成本低、维护简单、换色速度快。"
            : "HVLP is suitable for: small-to-medium batch production, limited budgets, applications where highest finish quality is not critical, and complex geometries where electrostatic wrap-around is difficult. HVLP equipment has lower cost, simpler maintenance, and faster color change."
        }
      },
      {
        "@type": "Question",
        "name": isZh ? "旋杯雾化器适合哪些应用？" : "What applications are rotary bell atomizers best suited for?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isZh
            ? "旋杯雾化器最适合：高产能流水线（如汽车OEM）、高质量外观要求（如汽车车身）、大面积平板件、需要频繁换色的多色生产。静电旋杯在汽车行业是标准配置。"
            : "Rotary bell atomizers are best for: high-throughput production lines (automotive OEM), high-quality appearance requirements (automotive body), large flat surfaces, and frequent color changes in multi-color production. Electrostatic bells are the standard in automotive industry."
        }
      }
    ]
  };

  return (
    <ResourcePageLayout
      title={isZh ? "HVLP喷枪 vs 静电旋杯雾化器" : "HVLP Spray Gun vs Rotary Bell Atomizer"}
      metaTitle={isZh ? "HVLP vs 静电旋杯 | 喷涂技术对比指南" : "HVLP vs Rotary Bell Atomizer | Spray Technology Comparison Guide"}
      metaDescription={isZh
        ? "了解HVLP喷枪和静电旋杯雾化器的技术差异、转移效率对比和应用场景选择。"
        : "Compare HVLP spray guns and electrostatic rotary bell atomizers for industrial painting applications. Technical specifications, efficiency data, and selection guidance."}
      breadcrumbs={[
        { label: isZh ? "工程资源库" : "Engineering Library", href: "/resources/engineering-library" },
        { label: isZh ? "技术对比" : "Technology Comparisons" },
        { label: isZh ? "HVLP vs 旋杯" : "HVLP vs Bell" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        {isZh
          ? "HVLP（高压低量）和静电旋杯雾化器代表了两种不同的喷涂理念：HVLP通过低压高流量减少过喷，适合中小批量；静电旋杯通过离心雾化+静电吸附实现极高转移效率，适合大批量高质量生产。选型关键在于产能需求、涂层质量要求和投资预算的平衡。"
          : "HVLP (High Volume Low Pressure) and electrostatic rotary bell atomizers represent two different spray philosophies: HVLP reduces overspray through low-pressure high-volume air, suitable for small-to-medium batches; electrostatic bells combine centrifugal atomization with electrostatic attraction for extremely high transfer efficiency, ideal for high-volume high-quality production. Selection depends on balancing throughput requirements, finish quality, and budget."}
      </AnswerBox>

      {/* Quick Comparison Table */}
      <ContentSection title={isZh ? "快速参数对比" : "Quick Comparison"}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{isZh ? "参数" : "Parameter"}</TableHead>
              <TableHead>HVLP</TableHead>
              <TableHead>{isZh ? "静电旋杯" : "Rotary Bell"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "转移效率" : "Transfer Efficiency"}</TableCell>
              <TableCell>60-75%</TableCell>
              <TableCell className="text-green-600 font-medium">85-95%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "雾化方式" : "Atomization"}</TableCell>
              <TableCell>{isZh ? "压缩空气雾化" : "Air atomized"}</TableCell>
              <TableCell>{isZh ? "离心力雾化 + 静电" : "Centrifugal + electrostatic"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "喷涂速度" : "Spray Speed"}</TableCell>
              <TableCell>{isZh ? "中速" : "Medium"}</TableCell>
              <TableCell className="text-green-600 font-medium">{isZh ? "高速" : "High speed"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "涂层质量" : "Finish Quality"}</TableCell>
              <TableCell>{isZh ? "良好" : "Good"}</TableCell>
              <TableCell className="text-green-600 font-medium">{isZh ? "优异" : "Excellent"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "换色速度" : "Color Change"}</TableCell>
              <TableCell className="text-green-600 font-medium">{isZh ? "快速 (<30s)" : "Fast (<30s)"}</TableCell>
              <TableCell>{isZh ? "中等 (60-120s)" : "Medium (60-120s)"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "设备成本" : "Equipment Cost"}</TableCell>
              <TableCell className="text-green-600 font-medium">{isZh ? "较低" : "Lower"}</TableCell>
              <TableCell>{isZh ? "较高" : "Higher"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "维护复杂度" : "Maintenance"}</TableCell>
              <TableCell className="text-green-600 font-medium">{isZh ? "简单" : "Simple"}</TableCell>
              <TableCell>{isZh ? "中等" : "Moderate"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "适用产能" : "Throughput"}</TableCell>
              <TableCell>{isZh ? "中低" : "Low-medium"}</TableCell>
              <TableCell className="text-green-600 font-medium">{isZh ? "中高" : "Medium-high"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ContentSection>

      {/* HVLP Section */}
      <ContentSection title={isZh ? "HVLP喷枪技术详解" : "HVLP Spray Gun Technology"}>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">{isZh ? "工作原理" : "Operating Principle"}</h4>
            <p className="text-sm text-muted-foreground mb-4">
              {isZh
                ? "HVLP使用高压（10-15 CFM）低压力（<10 PSI）空气进行雾化。低压减少了涂料颗粒的反弹，提高了转移效率。相比传统空气喷枪，HVLP可减少30-50%的过喷。"
                : "HVLP atomizes coating using high air volume (10-15 CFM) at low pressure (<10 PSI). The reduced pressure minimizes particle bounce-back, improving transfer efficiency. Compared to conventional air caps, HVLP reduces overspray by 30-50%."}
            </p>
            <h4 className="font-semibold mb-3">{isZh ? "典型应用" : "Typical Applications"}</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• {isZh ? "一般工业涂层" : "General industrial coating"}</li>
              <li>• {isZh ? "底漆和中涂" : "Primer and intermediate coats"}</li>
              <li>• {isZh ? "中小批量生产" : "Small to medium batch production"}</li>
              <li>• {isZh ? "多色换色频繁的产品" : "Frequent color change products"}</li>
              <li>• {isZh ? "汽车零部件修补" : "Automotive component touch-up"}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">{isZh ? "优势" : "Advantages"}</h4>
            <ul className="text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-muted-foreground">{isZh ? "设备成本低，投资回报快" : "Lower equipment cost, faster ROI"}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-muted-foreground">{isZh ? "换色快速，维护简单" : "Fast color change, simple maintenance"}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-muted-foreground">{isZh ? "适合复杂几何形状" : "Suitable for complex geometries"}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-muted-foreground">{isZh ? "对压缩空气要求相对较低" : "Lower compressed air requirements"}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-muted-foreground">{isZh ? "操作培训简单" : "Easy operator training"}</span>
              </li>
            </ul>
          </div>
        </div>
      </ContentSection>

      {/* Rotary Bell Section */}
      <ContentSection title={isZh ? "静电旋杯雾化器技术详解" : "Electrostatic Rotary Bell Technology"}>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">{isZh ? "工作原理" : "Operating Principle"}</h4>
            <p className="text-sm text-muted-foreground mb-4">
              {isZh
                ? "涂料被送入高速旋转（15,000-60,000 RPM）的旋杯，在离心力作用下被甩向杯边缘形成细雾。同时通过电晕放电或感应充电使雾化颗粒带电。被充电的颗粒被吸引到接地的工件表面，实现极高的转移效率。"
                : "Coating is fed to a high-speed rotating bell (15,000-60,000 RPM). Centrifugal force flings the material toward the bell edge, forming fine mist. Simultaneously, particles are charged through corona discharge or induction charging. Charged particles are attracted to grounded workpiece surfaces, achieving extremely high transfer efficiency."}
            </p>
            <h4 className="font-semibold mb-3">{isZh ? "典型应用" : "Typical Applications"}</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• {isZh ? "汽车OEM车身涂装" : "Automotive OEM body painting"}</li>
              <li>• {isZh ? "家电外壳（冰箱、洗衣机）" : "Appliance enclosures (refrigerator, washer)"}</li>
              <li>• {isZh ? "高产能流水线" : "High-throughput production lines"}</li>
              <li>• {isZh ? "对外观质量要求高的产品" : "Products requiring high appearance quality"}</li>
              <li>• {isZh ? "大面积平板件" : "Large flat panel parts"}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">{isZh ? "优势" : "Advantages"}</h4>
            <ul className="text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-muted-foreground">{isZh ? "转移效率85-95%，显著节省涂料" : "85-95% transfer efficiency, significant paint savings"}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-muted-foreground">{isZh ? "优异的边缘包裹效果" : "Excellent edge wrap-around coverage"}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-muted-foreground">{isZh ? "雾化均匀，涂层质量优异" : "Uniform atomization, excellent finish quality"}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-muted-foreground">{isZh ? "高速喷涂，产能高" : "High-speed spraying, high throughput"}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-muted-foreground">{isZh ? "减少VOC排放，环保合规" : "Reduced VOC emissions, environmental compliance"}</span>
              </li>
            </ul>
          </div>
        </div>
      </ContentSection>

      {/* Selection Guide */}
      <ContentSection title={isZh ? "选型指南" : "Selection Guide"}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-blue-800">{isZh ? "选择HVLP当..." : "Choose HVLP When..."}</h4>
            <ul className="text-sm text-blue-900 space-y-2">
              <li>• {isZh ? "产能需求：<200件/小时" : "Throughput: <200 parts/hour"}</li>
              <li>• {isZh ? "预算有限，需要快速ROI" : "Limited budget, need fast ROI"}</li>
              <li>• {isZh ? "产品种类多，换色频繁" : "High product variety, frequent color changes"}</li>
              <li>• {isZh ? "工件形状复杂，有深凹区域" : "Complex part geometry with deep recesses"}</li>
              <li>• {isZh ? "操作人员需要快速上手" : "Operators need quick training"}</li>
              <li>• {isZh ? "现有设备升级改造" : "Upgrading existing equipment"}</li>
            </ul>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-green-800">{isZh ? "选择静电旋杯当..." : "Choose Rotary Bell When..."}</h4>
            <ul className="text-sm text-green-900 space-y-2">
              <li>• {isZh ? "产能需求：>200件/小时" : "Throughput: >200 parts/hour"}</li>
              <li>• {isZh ? "外观质量：Class A 或更高" : "Finish quality: Class A or higher"}</li>
              <li>• {isZh ? "大批量单一产品生产" : "High-volume single product production"}</li>
              <li>• {isZh ? "涂料成本占比高" : "Paint cost is significant portion"}</li>
              <li>• {isZh ? "VOC排放要求严格" : "Strict VOC emission requirements"}</li>
              <li>• {isZh ? "新建自动化涂装线" : "New automated painting line"}</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      {/* ROI Comparison */}
      <ContentSection title={isZh ? "投资回报对比" : "ROI Comparison"}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{isZh ? "对比维度" : "Comparison Dimension"}</TableHead>
              <TableHead>HVLP</TableHead>
              <TableHead>{isZh ? "静电旋杯" : "Rotary Bell"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "假设：年产100万件工件" : "Assumption: 1M parts/year"}</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "涂料用量节省" : "Paint Consumption Savings"}</TableCell>
              <TableCell>{isZh ? "基准" : "Baseline"}</TableCell>
              <TableCell className="text-green-600 font-medium">20-30% {isZh ? "节省" : "savings"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "VOC减排" : "VOC Reduction"}</TableCell>
              <TableCell>{isZh ? "基准" : "Baseline"}</TableCell>
              <TableCell className="text-green-600 font-medium">25-35% {isZh ? "减排" : "reduction"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "过喷处理成本" : "Overspray Handling Cost"}</TableCell>
              <TableCell>{isZh ? "基准" : "Baseline"}</TableCell>
              <TableCell className="text-green-600 font-medium">40-60% {isZh ? "降低" : "lower"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "典型ROI" : "Typical ROI"}</TableCell>
              <TableCell>12-18 {isZh ? "个月" : "months"}</TableCell>
              <TableCell>14-24 {isZh ? "个月" : "months"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <p className="text-sm text-muted-foreground mt-4">
          {isZh
            ? "注：实际ROI取决于具体产能、涂料单价、工件尺寸等因素。静电旋杯虽然初始投资较高，但在涂料成本节省方面通常可在2年内收回额外投资。"
            : "Note: Actual ROI depends on specific throughput, paint unit cost, part dimensions, and other factors. While rotary bells require higher initial investment, the paint cost savings typically recover the extra investment within 2 years."}
        </p>
      </ContentSection>

      {/* Related Resources */}
      <ContentSection title={isZh ? "相关资源" : "Related Resources"}>
        <div className="grid md:grid-cols-3 gap-4">
          <a href="/resources/technology/spray-gun-technology" className="block p-4 border rounded-lg hover:border-primary/50 transition-colors">
            <Badge variant="outline" className="mb-2">{isZh ? "技术对比" : "Technology"}</Badge>
            <h4 className="font-medium">{isZh ? "喷枪技术全解" : "Spray Gun Technology Guide"}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {isZh ? "空气雾化、无气、静电技术对比" : "Air atomized, airless, electrostatic comparison"}
            </p>
          </a>
          <a href="/resources/equipment/electrostatic-bell-atomizers" className="block p-4 border rounded-lg hover:border-primary/50 transition-colors">
            <Badge variant="outline" className="mb-2">{isZh ? "设备详解" : "Equipment"}</Badge>
            <h4 className="font-medium">{isZh ? "静电旋杯详解" : "Electrostatic Bell Atomizers"}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {isZh ? "旋杯雾化器工作原理和选型" : "Bell atomizer operation and selection"}
            </p>
          </a>
          <a href="/resources/knowledge/hvlp-spray-gun-guide" className="block p-4 border rounded-lg hover:border-primary/50 transition-colors">
            <Badge variant="outline" className="mb-2">{isZh ? "选型指南" : "Selection"}</Badge>
            <h4 className="font-medium">{isZh ? "HVLP喷枪指南" : "HVLP Spray Gun Guide"}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {isZh ? "HVLP选型和应用要点" : "HVLP selection and application tips"}
            </p>
          </a>
        </div>
      </ContentSection>

      {/* FAQ Schema */}
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
    </ResourcePageLayout>
  );
}
