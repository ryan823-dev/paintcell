import { ResourcePageLayout, AnswerBox } from "@/components/resources";
import { ContentSection } from "@/components/resources";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useI18n } from "@/i18n/context";

export default function ElectrostaticBellAtomizers() {
  const { t, locale } = useI18n();
  const isZh = locale === "zh-CN";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Electrostatic Rotary Bell Atomizers for High-Efficiency Paint Application",
    "description": "Technical guide to electrostatic rotary bell atomizers combining centrifugal atomization with electrostatic charging for superior transfer efficiency.",
    "inLanguage": locale,
  };

  return (
    <ResourcePageLayout
      title={isZh ? "静电旋杯雾化系统" : "Electrostatic Rotary Bell / Disc Atomizers"}
      metaTitle={isZh ? "静电旋杯雾化系统 | 高效涂层应用" : "Electrostatic Rotary Bell Atomizers | High-Efficiency Coating"}
      metaDescription={isZh 
        ? "了解静电旋杯雾化技术如何结合离心雾化和静电充电，实现卓越的转移效率。"
        : "Learn how electrostatic rotary bell atomization technology combines centrifugal atomization with electrostatic charging for superior transfer efficiency."}
      breadcrumbs={[
        { label: isZh ? "工程资源库" : "Engineering Library", href: "/resources/engineering-library" },
        { label: isZh ? "设备" : "Equipment" },
        { label: isZh ? "静电旋杯" : "Electrostatic Bells" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        {isZh 
          ? "静电旋杯雾化系统结合了旋杯式离心雾化技术和静电充电技术。涂料在高速旋转的旋杯边缘被甩出形成细雾，同时通过电晕放电或感应充电使雾化颗粒带电。被充电的涂料颗粒被吸引到接地的工件表面，实现更高的转移效率（通常可达85-95%）和优异的边缘包裹效果。"
          : "Electrostatic rotary bell atomizer systems combine rotary bell centrifugal atomization technology with electrostatic charging. Coating material is flung off the edge of a high-speed rotating bell to form fine mist, while simultaneously being charged through corona discharge or induction charging. Charged coating particles are attracted to grounded workpiece surfaces, achieving higher transfer efficiency (typically 85-95%) and excellent edge wrap-around coverage."}
      </AnswerBox>

      {/* Terminology Section */}
      <ContentSection title={isZh ? "US vs EU Terminology" : "US vs EU Terminology"}>
        <div className="bg-muted/30 rounded-lg p-4 mb-6">
          <p className="text-sm text-muted-foreground">
            {isZh 
              ? "静电旋杯在不同地区有不同的名称，了解这些差异有助于SEO优化："
              : "Electrostatic bells have regional naming variations important for SEO optimization:"}
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{isZh ? "中文" : "Chinese"}</TableHead>
              <TableHead>{isZh ? "美式英语 (US)" : "US English"}</TableHead>
              <TableHead>{isZh ? "欧洲英语 (EU)" : "EU English"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>静电旋杯</TableCell>
              <TableCell>Electrostatic rotary bell, Charged bell atomizer</TableCell>
              <TableCell>Electrostatic disc atomizer, Charged rotary cup</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>旋杯</TableCell>
              <TableCell>Rotary bell, Bell cup, Atomizing disc</TableCell>
              <TableCell>Rotary cup, Spray disc, Atomizing cup</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>静电充电</TableCell>
              <TableCell>Electrostatic charging, Corona charging</TableCell>
              <TableCell>Electrostatic atomization, Induction charging</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>转移效率</TableCell>
              <TableCell>Transfer efficiency, Material utilization</TableCell>
              <TableCell>Transfer rate, Coating efficiency, Utilization factor</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>包裹效果</TableCell>
              <TableCell>Wrap-around, Back spray coverage</TableCell>
              <TableCell>Edge coverage, Enveloping effect, Turnaround coverage</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ContentSection>

      <ContentSection title={isZh ? "工作原理" : "Operating Principle"}>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">1</span>
            </div>
            <div>
              <h4 className="font-medium">{isZh ? "离心雾化" : "Centrifugal Atomization"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {isZh 
                  ? "涂料通过内部通道输送至高速旋转（15,000-60,000 RPM）的旋杯中心，在离心力作用下被甩向杯边缘，形成均匀的细雾。旋杯速度决定雾化颗粒大小：速度越高，颗粒越细。"
                  : "Coating is fed through internal passages to the center of a high-speed rotating bell (15,000-60,000 RPM). Centrifugal force flings the material toward the bell edge, forming uniform fine mist. Bell speed determines droplet size: higher speed produces finer particles."}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">2</span>
            </div>
            <div>
              <h4 className="font-medium">{isZh ? "静电充电" : "Electrostatic Charging"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {isZh 
                  ? "雾化颗粒在离开旋杯边缘时通过电晕放电（高压电极）或感应充电（旋杯本身带电）获得电荷。充电方式影响涂料适用范围：电晕充电适用于所有类型涂料，感应充电仅适用于导电涂料。"
                  : "Atomized particles receive an electrical charge as they leave the bell edge through corona discharge (high-voltage electrode) or induction charging (bell itself charged). Charging method affects coating compatibility: corona charging works with all coating types, induction charging only with conductive coatings."}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">3</span>
            </div>
            <div>
              <h4 className="font-medium">{isZh ? "静电沉积" : "Electrostatic Deposition"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {isZh 
                  ? "带电颗粒被工件表面的电场吸引，优先沉积在面向电场方向（通常是工件边缘和背面）。这种包裹效果是静电喷涂的核心优势，特别适合有复杂几何形状的工件。"
                  : "Charged particles are attracted by the electric field at workpiece surfaces, preferentially depositing on edges and backsides facing the field. This wrap-around effect is the core advantage of electrostatic spraying, especially for workpieces with complex geometries."}
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={isZh ? "技术优势" : "Technical Advantages"}>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-green-600">{isZh ? "高转移效率" : "High Transfer Efficiency"}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {isZh ? "转移效率可达85-95%" : "Transfer efficiency up to 85-95%"}</li>
              <li>• {isZh ? "显著减少涂料浪费" : "Significant paint waste reduction"}</li>
              <li>• {isZh ? "降低过喷处理成本" : "Lower overspray handling costs"}</li>
              <li>• {isZh ? "减少VOC排放" : "Reduced VOC emissions"}</li>
            </ul>
          </div>
          <div className="border rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-green-600">{isZh ? "优异的包裹效果" : "Excellent Wrap-Around"}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {isZh ? "覆盖工件背面和凹陷处" : "Coverage on backsides and recesses"}</li>
              <li>• {isZh ? "减少遮蔽工序" : "Reduced masking operations"}</li>
              <li>• {isZh ? "边缘覆盖均匀" : "Uniform edge coverage"}</li>
              <li>• {isZh ? "提高一次上漆率" : "Improved first-pass coverage"}</li>
            </ul>
          </div>
          <div className="border rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-green-600">{isZh ? "涂层质量" : "Coating Quality"}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {isZh ? "雾化均匀，颗粒细小" : "Uniform atomization, fine particles"}</li>
              <li>• {isZh ? "表面光滑，橘皮少" : "Smooth finish, minimal orange peel"}</li>
              <li>• {isZh ? "膜厚分布均匀" : "Uniform film thickness distribution"}</li>
              <li>• {isZh ? "适合高质量外观要求" : "Suitable for high-quality appearance"}</li>
            </ul>
          </div>
          <div className="border rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-green-600">{isZh ? "环保合规" : "Environmental Compliance"}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {isZh ? "减少涂料用量30-50%" : "30-50% paint consumption reduction"}</li>
              <li>• {isZh ? "降低溶剂使用" : "Reduced solvent usage"}</li>
              <li>• {isZh ? "减少固废产生" : "Less hazardous waste generation"}</li>
              <li>• {isZh ? "易于环保法规达标" : "Easier regulatory compliance"}</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={isZh ? "性能参数" : "Performance Specifications"}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{isZh ? "参数" : "Parameter"}</TableHead>
              <TableHead>{isZh ? "典型范围" : "Typical Range"}</TableHead>
              <TableHead>{isZh ? "说明" : "Description"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "旋杯转速" : "Bell Speed"}</TableCell>
              <TableCell>15,000 - 60,000 RPM</TableCell>
              <TableCell className="text-muted-foreground">{isZh ? "决定雾化颗粒大小" : "Determines droplet size"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "静电电压" : "Electrostatic Voltage"}</TableCell>
              <TableCell>60 - 100 kV DC</TableCell>
              <TableCell className="text-muted-foreground">{isZh ? "电晕充电典型值" : "Typical for corona charging"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "转移效率" : "Transfer Efficiency"}</TableCell>
              <TableCell>85 - 95%</TableCell>
              <TableCell className="text-muted-foreground">{isZh ? "理想条件下" : "Under ideal conditions"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "雾化颗粒尺寸" : "Droplet Size"}</TableCell>
              <TableCell>20 - 80 μm</TableCell>
              <TableCell className="text-muted-foreground">{isZh ? "取决于涂料粘度和旋杯速度" : "Depends on viscosity and bell speed"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "最大涂料流量" : "Max Flow Rate"}</TableCell>
              <TableCell>200 - 1000 ml/min</TableCell>
              <TableCell className="text-muted-foreground">{isZh ? "取决于旋杯尺寸和涂料" : "Depends on bell size and coating"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "喷涂宽度" : "Spray Width"}</TableCell>
              <TableCell>150 - 400 mm</TableCell>
              <TableCell className="text-muted-foreground">{isZh ? "取决于旋杯尺寸和空气成型" : "Depends on bell size and shaping air"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ContentSection>

      <ContentSection title={isZh ? "应用领域" : "Application Areas"}>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Automotive OEM</Badge>
            <h4 className="font-medium text-sm">{isZh ? "汽车OEM涂装" : "Automotive OEM Finishing"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {isZh 
                ? "车身底漆、色漆、清漆的自动化喷涂"
                : "Automated primer, basecoat, and clearcoat application"}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Automotive Components</Badge>
            <h4 className="font-medium text-sm">{isZh ? "汽车零部件" : "Automotive Components"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {isZh 
                ? "保险杠、仪表板、门板等塑料件"
                : "Bumpers, dashboards, door panels, plastic parts"}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Appliances</Badge>
            <h4 className="font-medium text-sm">{isZh ? "家用电器" : "Appliance Finishing"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {isZh 
                ? "冰箱、洗衣机、空调等家电外壳"
                : "Refrigerator, washer, air conditioner enclosures"}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Garden Equipment</Badge>
            <h4 className="font-medium text-sm">{isZh ? "园林机械" : "Garden & Power Equipment"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {isZh 
                ? "割草机、园林工具等金属和塑料件"
                : "Lawn mowers, garden tools, metal and plastic parts"}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Furniture</Badge>
            <h4 className="font-medium text-sm">{isZh ? "家具制造" : "Furniture Manufacturing"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {isZh 
                ? "金属家具、办公家具的粉末和液体涂装"
                : "Metal furniture, office furniture powder and liquid coating"}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Architectural</Badge>
            <h4 className="font-medium text-sm">{isZh ? "建筑装饰" : "Architectural Products"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {isZh 
                ? "铝门窗、栏杆、幕墙等建材"
                : "Aluminum windows, railings, curtain walls"}
            </p>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={isZh ? "注意事项" : "Key Considerations"}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-amber-800">{isZh ? "适用性限制" : "Applicability Limitations"}</h4>
            <ul className="space-y-2 text-sm text-amber-900">
              <li>• {isZh ? "法拉第笼效应：深凹处覆盖率可能降低" : "Faraday cage effect: reduced coverage in deep recesses"}</li>
              <li>• {isZh ? "需良好接地：工件和夹具接地不良影响效果" : "Requires good grounding: poor grounding affects performance"}</li>
              <li>• {isZh ? "绝缘涂料限制：部分涂料不适合静电喷涂" : "Insulating coating limitations: some coatings unsuitable"}</li>
              <li>• {isZh ? "安全要求：需防爆设备和措施" : "Safety requirements: explosion-proof equipment needed"}</li>
            </ul>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-blue-800">{isZh ? "选型要点" : "Selection Points"}</h4>
            <ul className="space-y-2 text-sm text-blue-900">
              <li>• {isZh ? "旋杯尺寸：决定喷涂宽度和流量" : "Bell size: determines spray width and flow rate"}</li>
              <li>• {isZh ? "充电方式：根据涂料类型选择" : "Charging method: select based on coating type"}</li>
              <li>• {isZh ? "换色速度：快速换色系统的要求" : "Color change speed: requirements for quick-change"}</li>
              <li>• {isZh ? "维护间隔：轴承寿命和更换周期" : "Maintenance interval: bearing life and replacement cycle"}</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={isZh ? "相关资源" : "Related Resources"}>
        <div className="grid md:grid-cols-2 gap-4">
          <a href="/resources/glossary/electrostatic-spray" className="block p-4 border rounded-lg hover:border-primary/50 transition-colors">
            <h4 className="font-medium">{isZh ? "静电喷涂术语" : "Electrostatic Spraying Glossary"}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {isZh ? "静电喷涂相关术语定义" : "Definitions of electrostatic spraying terminology"}
            </p>
          </a>
          <a href="/resources/knowledge/robot-path-optimization" className="block p-4 border rounded-lg hover:border-primary/50 transition-colors">
            <h4 className="font-medium">{isZh ? "机器人路径优化" : "Robot Path Optimization"}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {isZh ? "静电旋杯的机器人编程技巧" : "Programming tips for electrostatic bell robots"}
            </p>
          </a>
        </div>
      </ContentSection>
    </ResourcePageLayout>
  );
}
