import { ResourcePageLayout, AnswerBox } from "@/components/resources";
import { ContentSection } from "@/components/resources";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useI18n } from "@/i18n/context";

export default function ReciprocatorSpraySystems() {
  const { t, locale } = useI18n();
  const isZh = locale === "zh-CN";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Reciprocating Sprayer Systems for Industrial Paint Applications",
    "description": "Comprehensive guide to reciprocating sprayer systems (oscillators) for automated industrial painting, including US and EU terminology variations.",
    "inLanguage": locale,
  };

  return (
    <ResourcePageLayout
      title={isZh ? "往复式喷涂系统" : "Reciprocating Sprayer / Oscillator Systems"}
      metaTitle={isZh ? "往复式喷涂系统 | 自动化工业涂装" : "Reciprocating Sprayer Systems | Automated Industrial Painting"}
      metaDescription={isZh 
        ? "了解往复式喷涂系统在工业涂装中的应用，包括设备选型、参数设置和US/EU术语差异。"
        : "Learn about reciprocating sprayer systems for industrial paint applications, including equipment selection, parameter setup, and US/EU terminology variations."}
      breadcrumbs={[
        { label: isZh ? "工程资源库" : "Engineering Library", href: "/resources/engineering-library" },
        { label: isZh ? "设备" : "Equipment" },
        { label: isZh ? "往复式喷涂" : "Reciprocators" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        {isZh 
          ? "往复式喷涂系统（又称振荡器、自动喷漆机等）通过线性往复运动带动喷枪或旋杯对工件进行喷涂。相比机器人系统，结构简单、成本较低，适用于平面工件如门板、玻璃、金属板材等的大批量生产。系统可单轴或多轴配置，实现复杂路径喷涂。"
          : "Reciprocating sprayer systems (also called oscillators, automatic spray machines, or linear traverses) use linear reciprocating motion to move spray guns or rotary bells over workpieces for paint application. Compared to robotic systems, they offer simpler construction and lower cost, making them suitable for high-volume production of flat workpieces such as doors, glass, and metal panels. Systems can be configured with single or multiple axes for complex path spraying."}
      </AnswerBox>

      {/* US vs EU Terminology */}
      <ContentSection title={isZh ? "术语差异：US vs EU" : "Terminology Variations: US vs EU"}>
        <div className="bg-muted/30 rounded-lg p-4 mb-6">
          <p className="text-sm text-muted-foreground">
            {isZh 
              ? "注意：以下术语在不同地区有不同用法，这对于GEO SEO优化很重要："
              : "Note: The following terms have regional variations, which is important for GEO SEO optimization:"}
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{isZh ? "中文" : "Chinese"}</TableHead>
              <TableHead>{isZh ? "美式英语 (US)" : "US English"}</TableHead>
              <TableHead>{isZh ? "英式/欧洲英语 (UK/EU)" : "UK/EU English"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>往复式喷涂</TableCell>
              <TableCell>Reciprocating sprayer, Linear traverse, Oscillator</TableCell>
              <TableCell>Reciprocator, Spray oscillator, Linear spray machine</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>自动喷漆机</TableCell>
              <TableCell>Automatic spray machine, Auto-spray</TableCell>
              <TableCell>Automatic lacquer machine, Spray applicator</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>喷涂系统</TableCell>
              <TableCell>Spray system, Coating system</TableCell>
              <TableCell>Lacquer system, Finishing system, Spray application system</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>平面喷涂</TableCell>
              <TableCell>Flat line spraying, Panel coating</TableCell>
              <TableCell>Panel lacquering, Sheet spraying</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ContentSection>

      <ContentSection title={isZh ? "系统类型" : "System Types"}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-5">
            <h4 className="font-semibold mb-3">{isZh ? "单轴往复机" : "Single-Axis Reciprocator"}</h4>
            <p className="text-sm text-muted-foreground mb-3">
              {isZh 
                ? "最简单的配置，喷枪在单一方向上往复运动（通常为垂直方向）。适用于单一宽度范围的平面工件。"
                : "The simplest configuration, with spray gun reciprocating in a single direction (typically vertical). Suitable for flat workpieces within a single width range."}
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {isZh ? "结构简单，成本低" : "Simple structure, lower cost"}</li>
              <li>• {isZh ? "易于操作和维护" : "Easy operation and maintenance"}</li>
              <li>• {isZh ? "适用于标准尺寸工件" : "Suitable for standard-sized workpieces"}</li>
            </ul>
          </div>
          <div className="border rounded-lg p-5">
            <h4 className="font-semibold mb-3">{isZh ? "多轴往复机" : "Multi-Axis Reciprocator"}</h4>
            <p className="text-sm text-muted-foreground mb-3">
              {isZh 
                ? "配备多个运动轴，可实现复杂路径喷涂。支持工件旋转或喷枪多方向运动，提高对复杂形状的适应性。"
                : "Equipped with multiple motion axes, enabling complex path spraying. Supports workpiece rotation or multi-directional gun motion for improved adaptation to complex shapes."}
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {isZh ? "路径灵活，可编程" : "Flexible programming, programmable paths"}</li>
              <li>• {isZh ? "适用于复杂形状" : "Suitable for complex geometries"}</li>
              <li>• {isZh ? "可集成多把喷枪" : "Multiple gun integration possible"}</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={isZh ? "关键参数" : "Key Parameters"}>
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
              <TableCell className="font-medium">{isZh ? "行程长度" : "Stroke Length"}</TableCell>
              <TableCell>200 - 3000 mm</TableCell>
              <TableCell className="text-muted-foreground">{isZh ? "往复运动的最大距离" : "Maximum reciprocating motion distance"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "往复速度" : "Traverse Speed"}</TableCell>
              <TableCell>0.1 - 2 m/s</TableCell>
              <TableCell className="text-muted-foreground">{isZh ? "影响涂层厚度和表面质量" : "Affects film thickness and surface quality"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "加速度" : "Acceleration"}</TableCell>
              <TableCell>1 - 10 m/s²</TableCell>
              <TableCell className="text-muted-foreground">{isZh ? "影响启停平稳性" : "Affects start/stop smoothness"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "定位精度" : "Positioning Accuracy"}</TableCell>
              <TableCell>±0.5 - ±2 mm</TableCell>
              <TableCell className="text-muted-foreground">{isZh ? "影响涂层均匀性" : "Affects coating uniformity"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "喷枪数量" : "Number of Guns"}</TableCell>
              <TableCell>1 - 12</TableCell>
              <TableCell className="text-muted-foreground">{isZh ? "根据产能和宽度需求" : "Based on capacity and width requirements"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ContentSection>

      <ContentSection title={isZh ? "应用领域" : "Application Areas"}>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Building Materials</Badge>
            <h4 className="font-medium text-sm">{isZh ? "建材行业" : "Building Materials"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {isZh 
                ? "金属门窗、天花板扣板、铝塑板等平面建材喷涂"
                : "Metal doors/windows, ceiling panels, aluminum-plastic panels"}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Glass</Badge>
            <h4 className="font-medium text-sm">{isZh ? "玻璃加工" : "Glass Processing"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {isZh 
                ? "建筑玻璃、家电玻璃、汽车玻璃的涂层喷涂"
                : "Architectural glass, appliance glass, automotive glass coating"}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Furniture</Badge>
            <h4 className="font-medium text-sm">{isZh ? "家具制造" : "Furniture Manufacturing"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {isZh 
                ? "木质门板、金属家具件、板材等的底漆和面漆喷涂"
                : "Wooden doors, metal furniture parts, panels priming and topcoating"}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Appliances</Badge>
            <h4 className="font-medium text-sm">{isZh ? "家电行业" : "Appliance Industry"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {isZh 
                ? "冰箱面板、洗衣机外筒、空调外壳等"
                : "Refrigerator panels, washer drums, air conditioner casings"}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Automotive</Badge>
            <h4 className="font-medium text-sm">{isZh ? "汽车零部件" : "Automotive Components"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {isZh 
                ? "汽车内饰件、仪表板、门板等平面部件"
                : "Interior panels, dashboards, door panels"}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Sheet Metal</Badge>
            <h4 className="font-medium text-sm">{isZh ? "钣金加工" : "Sheet Metal Processing"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {isZh 
                ? "电气柜、控制箱、机械外壳等钣金件"
                : "Electrical cabinets, control boxes, machinery enclosures"}
            </p>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={isZh ? "与机器人系统对比" : "Comparison with Robotic Systems"}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{isZh ? "对比项" : "Comparison Factor"}</TableHead>
              <TableHead>{isZh ? "往复式系统" : "Reciprocator"}</TableHead>
              <TableHead>{isZh ? "机器人系统" : "Robot System"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "初始投资" : "Initial Investment"}</TableCell>
              <TableCell className="text-green-600">{isZh ? "较低" : "Lower"}</TableCell>
              <TableCell className="text-red-600">{isZh ? "较高" : "Higher"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "适用工件" : "Workpiece Type"}</TableCell>
              <TableCell>{isZh ? "平面为主" : "Primarily flat"}</TableCell>
              <TableCell>{isZh ? "任意形状" : "Any geometry"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "路径灵活性" : "Path Flexibility"}</TableCell>
              <TableCell>{isZh ? "有限" : "Limited"}</TableCell>
              <TableCell>{isZh ? "高度灵活" : "Highly flexible"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "维护成本" : "Maintenance Cost"}</TableCell>
              <TableCell className="text-green-600">{isZh ? "较低" : "Lower"}</TableCell>
              <TableCell>{isZh ? "中等" : "Medium"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "调试难度" : "Programming Difficulty"}</TableCell>
              <TableCell className="text-green-600">{isZh ? "简单" : "Simple"}</TableCell>
              <TableCell className="text-red-600">{isZh ? "复杂" : "Complex"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "产能" : "Throughput"}</TableCell>
              <TableCell>{isZh ? "高（简单工件）" : "High (simple parts)"}</TableCell>
              <TableCell>{isZh ? "高（复杂工件）" : "High (complex parts)"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ContentSection>

      <ContentSection title={isZh ? "选型要点" : "Selection Criteria"}>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">1</span>
            </div>
            <div>
              <h4 className="font-medium">{isZh ? "工件尺寸范围" : "Workpiece Dimensions"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {isZh 
                  ? "确定最大和最小工件的尺寸，据此选择行程长度和工作宽度。多工件同时喷涂时需考虑总体尺寸。"
                  : "Determine max/min workpiece dimensions to select stroke length and working width. Consider overall dimensions for simultaneous multi-part spraying."}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">2</span>
            </div>
            <div>
              <h4 className="font-medium">{isZh ? "产能要求" : "Throughput Requirements"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {isZh 
                  ? "根据生产线节拍要求确定往复速度、喷枪数量和自动化程度。高产能可能需要多工位配置。"
                  : "Determine reciprocator speed, number of guns, and automation level based on line takt time. High throughput may require multi-station configuration."}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">3</span>
            </div>
            <div>
              <h4 className="font-medium">{isZh ? "涂层类型" : "Coating Type"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {isZh 
                  ? "不同涂料（溶剂型、水性、UV）对喷涂参数和设备材质有不同要求。含金属颜料涂料需特殊配置。"
                  : "Different coatings (solvent-based, water-based, UV) have varying requirements for spray parameters and equipment materials. Metallic coatings require special configuration."}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">4</span>
            </div>
            <div>
              <h4 className="font-medium">{isZh ? "喷涂质量" : "Spray Quality"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {isZh 
                  ? "根据外观要求选择雾化方式和喷枪类型。A级表面需使用高压低流量(HVLP)或旋杯雾化。"
                  : "Select atomization method and gun type based on appearance requirements. Class A finish requires HVLP or rotary bell atomization."}
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={isZh ? "相关资源" : "Related Resources"}>
        <div className="grid md:grid-cols-2 gap-4">
          <a href="/resources/knowledge/paint-booth-design-basics" className="block p-4 border rounded-lg hover:border-primary/50 transition-colors">
            <h4 className="font-medium">{isZh ? "喷漆室设计基础" : "Paint Booth Design Basics"}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {isZh ? "往复机安装的喷漆室布局设计" : "Booth layout design for reciprocator installation"}
            </p>
          </a>
          <a href="/resources/knowledge/paint-technology-guide" className="block p-4 border rounded-lg hover:border-primary/50 transition-colors">
            <h4 className="font-medium">{isZh ? "喷涂技术指南" : "Spray Technology Guide"}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {isZh ? "各种雾化技术对比和选型" : "Comparison and selection of atomization technologies"}
            </p>
          </a>
        </div>
      </ContentSection>
    </ResourcePageLayout>
  );
}
