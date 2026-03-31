import { ResourcePageLayout } from "@/components/resources";
import { ContentSection } from "@/components/resources";
import { AnswerBox } from "@/components/resources";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useI18n } from "@/i18n/context";

export default function RobotvsManualSpray() {
  const { t, locale } = useI18n();
  const isZh = locale === "zh-CN";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": isZh ? "机器人喷涂 vs 人工喷涂对比" : "Robotic Spray Painting vs Manual Spray Comparison",
    "description": isZh
      ? "详细对比机器人喷涂系统和人工喷涂的技术特点、效率、成本和选型建议。"
      : "Comprehensive comparison of robotic spray painting systems vs manual spray application: efficiency, quality, cost, and ROI analysis.",
    "inLanguage": locale,
    "proficiencyLevel": "Advanced",
  };

  const faqSchema = {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": isZh ? "机器人喷涂相比人工喷涂有什么优势？" : "What are the advantages of robotic painting over manual spraying?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isZh
            ? "机器人喷涂的优势包括：一致性（每件产品涂层完全相同）、转移效率（可提高20-40%）、24小时连续生产、降低VOC暴露风险、减少对熟练工人的依赖。一致性和效率是核心优势。"
            : "Robotic painting advantages include: consistency (identical coating on every part), transfer efficiency (20-40% improvement), 24/7 production capability, reduced VOC exposure risk, and less dependency on skilled workers. Consistency and efficiency are the core benefits."
        }
      },
      {
        "@type": "Question",
        "name": isZh ? "机器人喷涂系统多久能收回投资？" : "How long does it take to recoup the robotic painting investment?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isZh
            ? "典型的投资回收期为12-24个月，主要取决于产能、涂料成本、当前人工成本和质量不良率。一个班次生产300+件的中等规模项目通常可在18个月内实现正回报。"
            : "Typical ROI ranges from 12-24 months, depending on throughput, paint cost, current labor cost, and defect rates. A medium-scale project producing 300+ parts per shift typically achieves positive ROI within 18 months."
        }
      },
      {
        "@type": "Question",
        "name": isZh ? "什么情况下仍应选择人工喷涂？" : "When should I still choose manual spraying?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isZh
            ? "人工喷涂仍适用于：极小批量（<100件/年）、超大型工件（无法放入喷漆室）、工件变化频繁（每件几何形状不同）、临时或短期项目、预算极其有限的情况。"
            : "Manual spraying is still suitable for: very small batches (<100 parts/year), extremely large parts (won't fit in spray booth), frequent product changes (each part geometry differs), temporary or short-term projects, and extremely limited budgets."
        }
      }
    ]
  };

  return (
    <ResourcePageLayout
      title={isZh ? "机器人喷涂 vs 人工喷涂" : "Robotic Spray Painting vs Manual Spray"}
      metaTitle={isZh ? "机器人 vs 人工喷涂 | ROI对比指南" : "Robot vs Manual Spray Painting | ROI Comparison Guide"}
      metaDescription={isZh
        ? "了解机器人喷涂系统和人工喷涂的效率、质量、成本对比以及投资回报分析。"
        : "Compare robotic spray painting systems with manual spray application. Efficiency, quality, cost breakdown, and ROI analysis for paint automation investment."}
      breadcrumbs={[
        { label: isZh ? "工程资源库" : "Engineering Library", href: "/resources/engineering-library" },
        { label: isZh ? "技术对比" : "Technology Comparisons" },
        { label: isZh ? "机器人 vs 人工" : "Robot vs Manual" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        {isZh
          ? "机器人喷涂和人工喷涂的选择本质上是自动化程度和投资规模的决策。机器人系统提供无与伦比的一致性和效率，但需要较高的前期投资；人工喷涂灵活性高、启动成本低，但面临劳动力成本上升和质量波动的挑战。本指南帮助您评估哪种方案适合您的生产需求。"
          : "The choice between robotic and manual spray painting is fundamentally about automation level and investment scale. Robot systems offer unmatched consistency and efficiency but require higher upfront investment; manual spraying provides flexibility and low startup cost but faces rising labor costs and quality variation. This guide helps you evaluate which approach fits your production needs."}
      </AnswerBox>

      {/* ROI Calculator Introduction */}
      <ContentSection title={isZh ? "快速ROI评估" : "Quick ROI Assessment"}>
        <div className="bg-primary/5 rounded-lg p-6">
          <p className="text-sm text-muted-foreground mb-4">
            {isZh
              ? "使用以下公式快速估算机器人喷涂的投资回报："
              : "Use the following formula to quickly estimate robotic painting ROI:"}
          </p>
          <div className="bg-white rounded p-4 font-mono text-center text-lg">
            {isZh
              ? "ROI时间（月）= 机器人系统投资 ÷ 月度节省（涂料 + 人工 + 不良品）"
              : "ROI (months) = Robot system investment ÷ Monthly savings (paint + labor + defects)"}
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            {isZh
              ? "典型值：一套单机器人喷漆单元投资约$150,000-$300,000，月度节省$8,000-$25,000，ROI约12-24个月。"
              : "Typical values: Single robot spray cell investment $150,000-$300,000, monthly savings $8,000-$25,000, ROI 12-24 months."}
          </p>
        </div>
      </ContentSection>

      {/* Quick Comparison Table */}
      <ContentSection title={isZh ? "快速参数对比" : "Quick Comparison"}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{isZh ? "参数" : "Parameter"}</TableHead>
              <TableHead>{isZh ? "人工喷涂" : "Manual Spray"}</TableHead>
              <TableHead>{isZh ? "机器人喷涂" : "Robot Painting"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "转移效率" : "Transfer Efficiency"}</TableCell>
              <TableCell>30-50%</TableCell>
              <TableCell className="text-green-600 font-medium">60-85%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "涂层一致性" : "Coating Consistency"}</TableCell>
              <TableCell className="text-amber-600">{isZh ? "批次间波动" : "Batch variation"}</TableCell>
              <TableCell className="text-green-600 font-medium">{isZh ? "±2% DFT" : "±2% DFT"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "日产能（8小时）" : "Daily output (8hr)"}</TableCell>
              <TableCell>200-400件</TableCell>
              <TableCell className="text-green-600 font-medium">400-800件</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "操作人员" : "Operators"}</TableCell>
              <TableCell>2-4人/班</TableCell>
              <TableCell className="text-green-600 font-medium">1人/班</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "VOC暴露" : "VOC Exposure"}</TableCell>
              <TableCell className="text-red-600">{isZh ? "高" : "High"}</TableCell>
              <TableCell className="text-green-600 font-medium">{isZh ? "低（隔离操作）" : "Low (isolated)"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "生产时间" : "Production Hours"}</TableCell>
              <TableCell>{isZh ? "8小时/天" : "8 hours/day"}</TableCell>
              <TableCell className="text-green-600 font-medium">24小时/天</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "初始投资" : "Initial Investment"}</TableCell>
              <TableCell className="text-green-600 font-medium">$5,000-20,000</TableCell>
              <TableCell>$150,000-500,000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "典型ROI" : "Typical ROI"}</TableCell>
              <TableCell>{isZh ? "不适用" : "N/A"}</TableCell>
              <TableCell className="text-green-600 font-medium">12-24个月</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ContentSection>

      {/* Manual Spray Section */}
      <ContentSection title={isZh ? "人工喷涂特点分析" : "Manual Spray Characteristics"}>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">{isZh ? "优势" : "Advantages"}</h4>
            <ul className="text-sm space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-muted-foreground">{isZh ? "初始投资低，门槛低" : "Low initial investment, easy entry"}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-muted-foreground">{isZh ? "灵活性高，适应性强" : "High flexibility, adaptable"}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-muted-foreground">{isZh ? "适合小批量多品种" : "Good for small batch, high mix"}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-muted-foreground">{isZh ? "换色快速简单" : "Fast and simple color change"}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-muted-foreground">{isZh ? "设备维修简单" : "Simple equipment maintenance"}</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-red-600">{isZh ? "挑战" : "Challenges"}</h4>
            <ul className="text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-red-600">✗</span>
                <span className="text-muted-foreground">{isZh ? "熟练工人招聘困难，留存率低" : "Difficult to hire/retain skilled workers"}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600">✗</span>
                <span className="text-muted-foreground">{isZh ? "涂层质量随工人状态波动" : "Quality varies with worker condition"}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600">✗</span>
                <span className="text-muted-foreground">{isZh ? "转移效率低，涂料浪费大" : "Low transfer efficiency, high paint waste"}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600">✗</span>
                <span className="text-muted-foreground">{isZh ? "健康风险（VOC暴露）" : "Health risks (VOC exposure)"}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600">✗</span>
                <span className="text-muted-foreground">{isZh ? "产能受限，难以扩展" : "Limited throughput, hard to scale"}</span>
              </li>
            </ul>
          </div>
        </div>
      </ContentSection>

      {/* Robotic Spray Section */}
      <ContentSection title={isZh ? "机器人喷涂特点分析" : "Robotic Spray Painting Characteristics"}>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3 text-green-600">{isZh ? "优势" : "Advantages"}</h4>
            <ul className="text-sm space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-muted-foreground">{isZh ? "涂层质量完全一致" : "Completely consistent coating quality"}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-muted-foreground">{isZh ? "转移效率提高20-40%" : "20-40% improvement in transfer efficiency"}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-muted-foreground">{isZh ? "24小时连续生产" : "24/7 continuous production"}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-muted-foreground">{isZh ? "减少VOC暴露，改善工作环境" : "Reduced VOC exposure, better work environment"}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-muted-foreground">{isZh ? "可追溯性，数据记录完整" : "Full traceability and data logging"}</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">{isZh ? "考虑因素" : "Considerations"}</h4>
            <ul className="text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span className="text-muted-foreground">{isZh ? "较高的前期投资" : "Higher upfront investment"}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span className="text-muted-foreground">{isZh ? "需要编程和维护技术人员" : "Requires programming/maintenance expertise"}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span className="text-muted-foreground">{isZh ? "换色需要清洗循环时间" : "Color change requires purge cycle time"}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span className="text-muted-foreground">{isZh ? "对于超大型工件可能有局限性" : "May have limitations for very large parts"}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span className="text-muted-foreground">{isZh ? "需要稳定的工件供给系统" : "Requires consistent part feeding system"}</span>
              </li>
            </ul>
          </div>
        </div>
      </ContentSection>

      {/* Cost Breakdown */}
      <ContentSection title={isZh ? "成本对比分析" : "Cost Comparison Analysis"}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{isZh ? "成本项目" : "Cost Item"}</TableHead>
              <TableHead>{isZh ? "人工喷涂/年" : "Manual Spray/Year"}</TableHead>
              <TableHead>{isZh ? "机器人喷涂/年" : "Robot Painting/Year"}</TableHead>
              <TableHead>{isZh ? "年度节省" : "Annual Savings"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "人工成本（2人班次）" : "Labor cost (2 operators/shift)"}</TableCell>
              <TableCell>$120,000</TableCell>
              <TableCell>$40,000</TableCell>
              <TableCell className="text-green-600 font-medium">$80,000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "涂料成本（年用量50,000L）" : "Paint cost (50,000L/year)"}</TableCell>
              <TableCell>$250,000</TableCell>
              <TableCell>$175,000</TableCell>
              <TableCell className="text-green-600 font-medium">$75,000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "不良品/返工" : "Defects/rework"}</TableCell>
              <TableCell>$30,000</TableCell>
              <TableCell>$5,000</TableCell>
              <TableCell className="text-green-600 font-medium">$25,000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "设备维护" : "Equipment maintenance"}</TableCell>
              <TableCell>$10,000</TableCell>
              <TableCell>$20,000</TableCell>
              <TableCell>-$10,000</TableCell>
            </TableRow>
            <TableRow className="font-bold">
              <TableCell>{isZh ? "年度运营成本合计" : "Total Annual Operating Cost"}</TableCell>
              <TableCell>$410,000</TableCell>
              <TableCell>$240,000</TableCell>
              <TableCell className="text-green-600 font-medium">$170,000</TableCell>
            </TableRow>
            <TableRow className="bg-muted/50">
              <TableCell colspan={4} className="text-sm text-muted-foreground">
                {isZh
                  ? "假设条件：产能400件/天，每年250工作日，涂料单价$5/L，工时费率$30/小时。机器人系统投资$300,000，折旧10年。"
                  : "Assumptions: Throughput 400 parts/day, 250 working days/year, paint unit price $5/L, labor rate $30/hour. Robot system investment $300,000, depreciated over 10 years."}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ContentSection>

      {/* Selection Criteria */}
      <ContentSection title={isZh ? "选型决策树" : "Selection Decision Tree"}>
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-blue-800">{isZh ? "选择人工喷涂" : "Choose Manual Spray When"}</h4>
            <ul className="text-sm text-blue-900 space-y-1">
              <li>□ {isZh ? "年产能 < 50,000件" : "Annual throughput < 50,000 parts"}</li>
              <li>□ {isZh ? "工件尺寸变化大 (>20种不同几何形状)" : "High part variation (>20 different geometries)"}</li>
              <li>□ {isZh ? "单次订单批量 < 200件" : "Order batch size < 200 parts"}</li>
              <li>□ {isZh ? "预算 < $50,000 自动化投资" : "Budget < $50,000 for automation"}</li>
              <li>□ {isZh ? "工件尺寸超出机器人可达范围" : "Part size exceeds robot reach envelope"}</li>
            </ul>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-green-800">{isZh ? "选择机器人喷涂" : "Choose Robot Painting When"}</h4>
            <ul className="text-sm text-green-900 space-y-1">
              <li>□ {isZh ? "年产能 > 100,000件" : "Annual throughput > 100,000 parts"}</li>
              <li>□ {isZh ? "产品质量要求一致（+/- 5 micron DFT）" : "Quality consistency required ( +/- 5 micron DFT)"}</li>
              <li>□ {isZh ? "涂料成本 > $100,000/年" : "Paint cost > $100,000/year"}</li>
              <li>□ {isZh ? "熟练喷漆工招聘困难或成本高" : "Difficulty hiring/retaining skilled painters"}</li>
              <li>□ {isZh ? "需要扩展产能但场地有限" : "Need to expand capacity with limited space"}</li>
              <li>□ {isZh ? "客户/法规要求可追溯性" : "Customer/regulatory traceability required"}</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      {/* ROI Calculator Interactive */}
      <ContentSection title={isZh ? "ROI计算示例" : "ROI Calculation Examples"}>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-5">
            <Badge variant="outline" className="mb-3">{isZh ? "低产能场景" : "Low Volume Scenario"}</Badge>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{isZh ? "年产能：" : "Throughput:"}</span>
                <span>50,000件</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{isZh ? "涂料节省：" : "Paint savings:"}</span>
                <span className="text-green-600">$25,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{isZh ? "人工节省：" : "Labor savings:"}</span>
                <span className="text-green-600">$30,000</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t">
                <span>{isZh ? "ROI时间：" : "ROI period:"}</span>
                <span>36个月</span>
              </div>
            </div>
          </div>
          <div className="border rounded-lg p-5">
            <Badge variant="outline" className="mb-3">{isZh ? "中等产能场景" : "Medium Volume Scenario"}</Badge>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{isZh ? "年产能：" : "Throughput:"}</span>
                <span>150,000件</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{isZh ? "涂料节省：" : "Paint savings:"}</span>
                <span className="text-green-600">$60,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{isZh ? "人工节省：" : "Labor savings:"}</span>
                <span className="text-green-600">$80,000</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t">
                <span>{isZh ? "ROI时间：" : "ROI period:"}</span>
                <span className="text-green-600">18个月</span>
              </div>
            </div>
          </div>
          <div className="border rounded-lg p-5">
            <Badge variant="outline" className="mb-3">{isZh ? "高产能场景" : "High Volume Scenario"}</Badge>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{isZh ? "年产能：" : "Throughput:"}</span>
                <span>500,000件</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{isZh ? "涂料节省：" : "Paint savings:"}</span>
                <span className="text-green-600">$150,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{isZh ? "人工节省：" : "Labor savings:"}</span>
                <span className="text-green-600">$120,000</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t">
                <span>{isZh ? "ROI时间：" : "ROI period:"}</span>
                <span className="text-green-600">12个月</span>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Related Resources */}
      <ContentSection title={isZh ? "相关资源" : "Related Resources"}>
        <div className="grid md:grid-cols-3 gap-4">
          <a href="/resources/knowledge/robotic-painting-cost-guide" className="block p-4 border rounded-lg hover:border-primary/50 transition-colors">
            <Badge variant="outline" className="mb-2">{isZh ? "成本指南" : "Cost Guide"}</Badge>
            <h4 className="font-medium">{isZh ? "机器人喷涂成本指南" : "Robotic Painting Cost Guide"}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {isZh ? "系统成本、投资回报详解" : "System costs and ROI breakdown"}
            </p>
          </a>
          <a href="/resources/knowledge/how-to-choose-paint-robot" className="block p-4 border rounded-lg hover:border-primary/50 transition-colors">
            <Badge variant="outline" className="mb-2">{isZh ? "选型指南" : "Selection"}</Badge>
            <h4 className="font-medium">{isZh ? "如何选择喷涂机器人" : "How to Choose Paint Robot"}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {isZh ? "选型关键参数和考虑因素" : "Key selection parameters"}
            </p>
          </a>
          <a href="/resources/knowledge/robot-path-optimization" className="block p-4 border rounded-lg hover:border-primary/50 transition-colors">
            <Badge variant="outline" className="mb-2">{isZh ? "技术详解" : "Technical"}</Badge>
            <h4 className="font-medium">{isZh ? "机器人路径优化" : "Robot Path Optimization"}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {isZh ? "最大化喷涂效率和质量的路径技巧" : "Maximize efficiency and quality"}
            </p>
          </a>
        </div>
      </ContentSection>

      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
    </ResourcePageLayout>
  );
}
