import { ResourcePageLayout, AnswerBox } from "@/components/resources";
import { ContentSection } from "@/components/resources";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useI18n } from "@/i18n/context";

export default function InlineThicknessMeasurement() {
  const { t, locale } = useI18n();
  const isZh = locale === "zh-CN";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Inline Thickness Measurement for Robotic Spray Painting",
    "description": "Technical guide to inline thickness measurement systems for real-time coating quality control in automated spray painting.",
    "inLanguage": locale,
  };

  return (
    <ResourcePageLayout
      title={isZh ? "在线膜厚检测系统" : "Inline Coating Thickness Measurement"}
      metaTitle={isZh ? "在线膜厚检测 | 实时涂层质量控制" : "Inline Thickness Measurement | Real-Time Coating Quality Control"}
      metaDescription={isZh 
        ? "了解在线膜厚检测系统如何实现喷涂过程中的实时监控，提高涂层质量控制效率。"
        : "Learn how inline thickness measurement systems enable real-time monitoring during spray application for improved coating quality control."}
      breadcrumbs={[
        { label: isZh ? "工程资源库" : "Engineering Library", href: "/resources/engineering-library" },
        { label: isZh ? "质量控制" : "Quality Control" },
        { label: isZh ? "在线检测" : "Inline Measurement" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        {isZh 
          ? "在线膜厚检测系统通过非接触式测量技术，在喷涂过程中实时监测涂层厚度。这些系统集成了激光三角测量、X射线或涡流传感器，可实现对干膜厚度（DFT）或湿膜厚度（WFT）的连续监控，为工艺参数调整提供即时反馈，实现闭环质量控制。"
          : "Inline thickness measurement systems use non-contact measurement technologies to monitor coating thickness in real-time during the spray process. These systems integrate laser triangulation, X-ray, or eddy current sensors to achieve continuous monitoring of dry film thickness (DFT) or wet film thickness (WFT), providing immediate feedback for process parameter adjustments and enabling closed-loop quality control."}
      </AnswerBox>

      <ContentSection title={isZh ? "技术概述" : "Technology Overview"}>
        <p className="text-muted-foreground leading-relaxed">
          {isZh 
            ? "在线膜厚检测是现代自动化涂装生产线的关键技术组件。与传统的离线检测（涂层后取样测量）不同，在线检测在生产过程中实时监控涂层厚度，能够及时发现偏差并进行调整，确保产品质量的一致性。"
            : "Inline thickness measurement is a critical component of modern automated coating production lines. Unlike traditional offline inspection (sampling after coating), inline measurement monitors coating thickness in real-time during production, enabling timely deviation detection and adjustment to ensure consistent product quality."}
        </p>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="border rounded-lg p-5">
            <h4 className="font-semibold mb-3">{isZh ? "干膜检测 (DFT)" : "Dry Film Measurement (DFT)"}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {isZh ? "X射线荧光法 (XRF)" : "X-ray Fluorescence (XRF)"}</li>
              <li>• {isZh ? "涡流法" : "Eddy Current Method"}</li>
              <li>• {isZh ? "β射线背散射法" : "Beta-ray Backscatter"}</li>
              <li>• {isZh ? "磁性法（仅限钢铁基材）" : "Magnetic Method (steel substrates only)"}</li>
            </ul>
          </div>
          <div className="border rounded-lg p-5">
            <h4 className="font-semibold mb-3">{isZh ? "湿膜检测 (WFT)" : "Wet Film Measurement (WFT)"}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {isZh ? "激光三角测量" : "Laser Triangulation"}</li>
              <li>• {isZh ? "共焦传感器" : "Confocal Sensors"}</li>
              <li>• {isZh ? "干涉测量法" : "Interferometry"}</li>
              <li>• {isZh ? "接触式轮询仪" : "Contact Wheel Gauge"}</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={isZh ? "X射线荧光法 (XRF)" : "X-ray Fluorescence (XRF) Technology"}>
        <p className="text-muted-foreground leading-relaxed">
          {isZh 
            ? "X射线荧光法是测量金属基材涂层厚度的最常用方法。系统发射X射线激发涂层材料的原子，当原子返回基态时释放特征X射线，通过检测这些射线的能量和强度，可以计算出涂层的种类和厚度。该方法精度高（可达±1μm），适用于各种金属基材。"
            : "X-ray fluorescence is the most common method for measuring coating thickness on metal substrates. The system emits X-rays to excite atoms in the coating material. When atoms return to ground state, they release characteristic X-rays. By detecting the energy and intensity of these rays, the coating type and thickness can be calculated. This method offers high accuracy (up to ±1μm) and is suitable for various metal substrates."}
        </p>

        <div className="bg-muted/30 rounded-lg p-5 mt-4">
          <h4 className="font-medium mb-3">{isZh ? "XRF系统组成" : "XRF System Components"}</h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium">{isZh ? "X射线源" : "X-ray Source"}</p>
              <p className="text-xs text-muted-foreground">{isZh ? "小型化X射线管或同位素源" : "Miniaturized X-ray tube or isotope source"}</p>
            </div>
            <div>
              <p className="text-sm font-medium">{isZh ? "探测器" : "Detector"}</p>
              <p className="text-xs text-muted-foreground">{isZh ? "硅漂移探测器(SDD)或正比计数器" : "Silicon Drift Detector (SDD) or proportional counter"}</p>
            </div>
            <div>
              <p className="text-sm font-medium">{isZh ? "分析单元" : "Analysis Unit"}</p>
              <p className="text-xs text-muted-foreground">{isZh ? "实时信号处理和厚度计算" : "Real-time signal processing and thickness calculation"}</p>
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={isZh ? "系统集成" : "System Integration"}>
        <p className="text-muted-foreground leading-relaxed">
          {isZh 
            ? "在线膜厚检测系统需要与生产线控制系统紧密集成，包括机器人喷涂系统、PLC控制器、MES系统等。典型的集成架构如下："
            : "Inline thickness measurement systems require close integration with production line control systems, including robotic spray systems, PLC controllers, and MES systems. A typical integration architecture is as follows:"}
        </p>

        <div className="space-y-4 mt-6">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">1</span>
            </div>
            <div>
              <h4 className="font-medium">{isZh ? "传感器安装位置" : "Sensor Mounting Position"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {isZh 
                  ? "传感器安装在喷涂工位下游，确保涂层有足够的闪干时间。安装位置需考虑工件形状、输送速度和测量窗口时间。"
                  : "Sensors are installed downstream of the spray station, ensuring adequate flash time for the coating. Mounting position must consider workpiece geometry, conveyor speed, and measurement window time."}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">2</span>
            </div>
            <div>
              <h4 className="font-medium">{isZh ? "数据采集与处理" : "Data Acquisition and Processing"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {isZh 
                  ? "测量数据实时传输至控制器，与目标厚度比较，计算偏差值。高速度采样（可达1000点/秒）确保测量覆盖整个工件表面。"
                  : "Measurement data is transmitted to the controller in real-time, compared with target thickness, and deviation values are calculated. High-speed sampling (up to 1000 points/sec) ensures measurement coverage of the entire workpiece surface."}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">3</span>
            </div>
            <div>
              <h4 className="font-medium">{isZh ? "闭环反馈控制" : "Closed-Loop Feedback Control"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {isZh 
                  ? "偏差信号反馈至喷涂系统，自动调整喷枪流量、喷幅或机器人轨迹，实现膜厚的自动控制。这种闭环控制可显著提高膜厚均匀性。"
                  : "Deviation signals feedback to the spray system, automatically adjusting gun flow rate, pattern width, or robot trajectory to achieve automatic film thickness control. This closed-loop control can significantly improve film thickness uniformity."}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">4</span>
            </div>
            <div>
              <h4 className="font-medium">{isZh ? "数据记录与追溯" : "Data Logging and Traceability"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {isZh 
                  ? "所有测量数据记录存储，支持批次追溯和SPC统计分析。满足汽车行业对质量数据可追溯性的严格要求。"
                  : "All measurement data is recorded and stored, supporting batch traceability and SPC statistical analysis. Meets strict traceability requirements in the automotive industry."}
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={isZh ? "性能指标" : "Performance Specifications"}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{isZh ? "参数" : "Parameter"}</TableHead>
              <TableHead>{isZh ? "XRF干膜检测" : "XRF DFT"}</TableHead>
              <TableHead>{isZh ? "激光湿膜检测" : "Laser WFT"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "测量范围" : "Measurement Range"}</TableCell>
              <TableCell>1 - 500 μm</TableCell>
              <TableCell>5 - 500 μm</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "测量精度" : "Accuracy"}</TableCell>
              <TableCell>±1% 或 ±1 μm</TableCell>
              <TableCell>±2% 或 ±2 μm</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "重复性" : "Repeatability"}</TableCell>
              <TableCell>±0.5 μm (1σ)</TableCell>
              <TableCell>±1 μm (1σ)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "测量速度" : "Measurement Speed"}</TableCell>
              <TableCell>10 - 50 点/秒</TableCell>
              <TableCell>100 - 1000 点/秒</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "适用基材" : "Applicable Substrates"}</TableCell>
              <TableCell>{isZh ? "金属基材" : "Metal substrates"}</TableCell>
              <TableCell>{isZh ? "所有基材" : "All substrates"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "安全要求" : "Safety Requirements"}</TableCell>
              <TableCell>{isZh ? "辐射防护" : "Radiation shielding"}</TableCell>
              <TableCell>{isZh ? "激光安全" : "Laser safety"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ContentSection>

      <ContentSection title={isZh ? "应用场景" : "Application Scenarios"}>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Automotive</Badge>
            <h4 className="font-medium text-sm">{isZh ? "汽车车身涂装" : "Automotive Body Painting"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {isZh 
                ? "100%在线检测，实时调整确保每辆车符合规格要求"
                : "100% inline inspection with real-time adjustment ensuring each vehicle meets specifications"}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Coil Coating</Badge>
            <h4 className="font-medium text-sm">{isZh ? "卷材涂装" : "Coil Coating"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {isZh 
                ? "高速连续检测，线速度可达200米/分钟"
                : "High-speed continuous inspection, line speeds up to 200 m/min"}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Tubular Products</Badge>
            <h4 className="font-medium text-sm">{isZh ? "管材涂装" : "Pipe and Tube Coating"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {isZh 
                ? "旋转扫描测量，覆盖管材360度表面"
                : "Rotary scanning measurement, 360° surface coverage"}
            </p>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={isZh ? "选型要点" : "Selection Criteria"}>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">{isZh ? "技术参数考量" : "Technical Considerations"}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {isZh ? "涂层种类和测量范围" : "Coating type and measurement range"}</li>
              <li>• {isZh ? "基材材质和形状复杂性" : "Substrate material and geometry complexity"}</li>
              <li>• {isZh ? "生产线速度和测量窗口" : "Line speed and measurement window"}</li>
              <li>• {isZh ? "测量精度和重复性要求" : "Measurement accuracy and repeatability requirements"}</li>
              <li>• {isZh ? "环境条件（温度、振动）" : "Environmental conditions (temperature, vibration)"}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3">{isZh ? "系统集成考量" : "Integration Considerations"}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {isZh ? "与现有PLC/控制系统的通信协议" : "Communication protocol with existing PLC/control systems"}</li>
              <li>• {isZh ? "数据接口（OPC UA, Profinet, EtherNet/IP）" : "Data interfaces (OPC UA, Profinet, EtherNet/IP)"}</li>
              <li>• {isZh ? "MES/ERP系统集成需求" : "MES/ERP system integration requirements"}</li>
              <li>• {isZh ? "维护和服务支持" : "Maintenance and service support"}</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={isZh ? "相关资源" : "Related Resources"}>
        <div className="grid md:grid-cols-2 gap-4">
          <a href="/resources/knowledge/paint-defects-guide" className="block p-4 border rounded-lg hover:border-primary/50 transition-colors">
            <h4 className="font-medium">{isZh ? "涂层缺陷分析指南" : "Paint Defects Guide"}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {isZh ? "膜厚相关的涂层缺陷及解决方案" : "Coating defects related to film thickness and solutions"}
            </p>
          </a>
          <a href="/resources/knowledge/paint-booth-design-basics" className="block p-4 border rounded-lg hover:border-primary/50 transition-colors">
            <h4 className="font-medium">{isZh ? "喷漆室设计基础" : "Paint Booth Design Basics"}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {isZh ? "检测工位的布局设计要点" : "Layout design considerations for inspection stations"}
            </p>
          </a>
        </div>
      </ContentSection>
    </ResourcePageLayout>
  );
}
