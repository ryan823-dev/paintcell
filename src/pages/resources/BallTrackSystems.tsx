import { ResourcePageLayout, AnswerBox } from "@/components/resources";
import { ContentSection } from "@/components/resources";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useI18n } from "@/i18n/context";

export default function BallTrackSystems() {
  const { t, locale } = useI18n();
  const isZh = locale === "zh-CN";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Ball Track Conveyor Systems for Paint Shops",
    "description": "Technical guide to ball track conveyor systems for material handling in industrial paint and coating facilities.",
    "inLanguage": locale,
  };

  return (
    <ResourcePageLayout
      title={isZh ? "走珠系统：涂装车间物料输送" : "Ball Track Conveyor Systems for Paint Shops"}
      metaTitle={isZh ? "走珠系统 | 涂装车间输送方案" : "Ball Track Conveyor Systems | Paint Shop Material Handling"}
      metaDescription={isZh 
        ? "了解走珠系统如何实现涂装车间的自动化物料输送，提高生产效率和物流流畅性。"
        : "Learn how ball track conveyor systems enable automated material handling in paint and coating facilities, improving production efficiency and logistics flow."}
      breadcrumbs={[
        { label: isZh ? "工程资源库" : "Engineering Library", href: "/resources/engineering-library" },
        { label: isZh ? "设备选型" : "Equipment Selection" },
        { label: isZh ? "走珠系统" : "Ball Track Systems" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        {isZh 
          ? "走珠系统（Ball Track System）是一种专为涂装生产线设计的物料输送解决方案，通过精密的滚珠轨道和传动机构，实现工件在预处理、喷涂、固化等各工序间的自动化流转。系统可与机器人喷涂、干燥炉等设备无缝衔接，构建高效的涂装生产线。"
          : "Ball track conveyor systems are material handling solutions specifically designed for coating production lines. Through precision ball tracks and drive mechanisms, these systems enable automated flow of workpieces between pretreatment, spraying, curing, and other process stages. Systems integrate seamlessly with robotic spray equipment, drying ovens, and other machines to build efficient coating production lines."}
      </AnswerBox>

      <ContentSection title={isZh ? "系统概述" : "System Overview"}>
        <p className="text-muted-foreground leading-relaxed">
          {isZh 
            ? "走珠系统广泛应用于汽车涂装、家电喷涂、建材涂装等行业，特别适用于需要连续生产的自动化涂装流水线。系统通过地面或悬挂式轨道布局，配合驱动装置和控制单元，实现工件托盘或吊具的精确输送和定位。"
            : "Ball track systems are widely used in automotive painting, appliance coating, building materials coating, and other industries, particularly suited for continuous production automated coating lines. Through floor or overhead track layouts paired with drive units and control systems, these systems achieve precise transport and positioning of workpiece pallets or hangers."}
        </p>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="border rounded-lg p-5">
            <h4 className="font-semibold mb-3">{isZh ? "输送类型" : "Conveyor Types"}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {isZh ? "地面链式输送" : "Floor chain conveyor"}</li>
              <li>• {isZh ? "悬挂输送" : "Overhead conveyor"}</li>
              <li>• {isZh ? "Power & Free 输送" : "Power & Free conveyor"}</li>
              <li>• {isZh ? "积放式输送" : "Accumulation conveyor"}</li>
            </ul>
          </div>
          <div className="border rounded-lg p-5">
            <h4 className="font-semibold mb-3">{isZh ? "应用领域" : "Application Areas"}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {isZh ? "汽车车身涂装线" : "Automotive body paint lines"}</li>
              <li>• {isZh ? "汽车零部件喷涂" : "Automotive component coating"}</li>
              <li>• {isZh ? "家电产品涂装" : "Appliance finishing"}</li>
              <li>• {isZh ? "建材产品喷涂" : "Building materials coating"}</li>
            </ul>
          </div>
          <div className="border rounded-lg p-5">
            <h4 className="font-semibold mb-3">{isZh ? "核心优势" : "Core Advantages"}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {isZh ? "连续稳定输送" : "Continuous stable transport"}</li>
              <li>• {isZh ? "灵活路径规划" : "Flexible routing"}</li>
              <li>• {isZh ? "易于系统集成" : "Easy system integration"}</li>
              <li>• {isZh ? "维护成本低" : "Low maintenance cost"}</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={isZh ? "工作原理" : "Operating Principle"}>
        <div className="space-y-6">
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-medium">{isZh ? "1. 滚珠传动机构" : "1. Ball Drive Mechanism"}</h4>
            <p className="text-sm text-muted-foreground mt-2">
              {isZh 
                ? "走珠系统的核心是精密滚珠轴承和驱动链条。工件托盘底部安装滚珠组，嵌入地面或悬挂轨道中的凹槽运行。驱动电机通过链条驱动滚珠旋转，实现工件的平稳推进。滚珠采用高强度轴承钢，耐磨耐腐蚀，适应涂装车间的恶劣环境。"
                : "The core of ball track systems is precision ball bearings and drive chains. Ball groups installed on workpiece pallet bottoms run in grooves in floor or overhead tracks. Drive motors propel pallets forward through chain-driven ball rotation. Balls use high-strength bearing steel, offering wear and corrosion resistance for harsh paint shop environments."}
            </p>
          </div>

          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-medium">{isZh ? "2. 分流与合流控制" : "2. Diverging and Merging Control"}</h4>
            <p className="text-sm text-muted-foreground mt-2">
              {isZh 
                ? "系统通过转台、摆杆等装置实现工件的分流与合流。在喷涂工位前，转向机构将工件从主轨导入喷涂室；喷涂完成后，再将工件导回主轨继续向前输送。控制逻辑由PLC或专用的输送控制系统完成，确保各工序的同步协调。"
                : "Systems achieve workpiece diverging and merging through turntables, swing arms, and other mechanisms. Before spray stations, steering mechanisms divert workpieces from the main track into the spray booth; after coating, they guide workpieces back to the main track for continued transport. Control logic managed by PLCs or dedicated conveyor control systems ensures synchronized coordination of all processes."}
            </p>
          </div>

          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-medium">{isZh ? "3. 速度与节拍控制" : "3. Speed and Takt Control"}</h4>
            <p className="text-sm text-muted-foreground mt-2">
              {isZh 
                ? "驱动系统配备变频器，可实现无级调速。通过编码器和位置传感器，系统实时监测工件位置和间距，自动调整输送速度以匹配各工序的处理时间。在烘干炉入口等关键位置，系统可实现工件的精确停位，便于机器人或人工进行操作。"
                : "Drive systems equipped with variable frequency drives enable stepless speed adjustment. Through encoders and position sensors, systems monitor workpiece position and spacing in real-time, automatically adjusting conveyor speed to match processing times at each station. At critical positions like drying oven entrances, systems achieve precise workpiece stopping for robot or manual operations."}
            </p>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={isZh ? "系统配置" : "System Configuration"}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{isZh ? "组件" : "Component"}</TableHead>
              <TableHead>{isZh ? "功能" : "Function"}</TableHead>
              <TableHead>{isZh ? "选型要点" : "Selection Criteria"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "轨道" : "Track"}</TableCell>
              <TableCell className="text-muted-foreground">{isZh ? "承载和导向滚珠组" : "Bearing and guiding ball groups"}</TableCell>
              <TableCell className="text-muted-foreground">{isZh ? "承载能力、耐磨性、安装方式" : "Load capacity, wear resistance, mounting"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "滚珠组" : "Ball Units"}</TableCell>
              <TableCell className="text-muted-foreground">{isZh ? "支撑和传递工件重量" : "Supporting and transferring workpiece weight"}</TableCell>
              <TableCell className="text-muted-foreground">{isZh ? "承载能力、运动平稳性" : "Load capacity, movement smoothness"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "驱动装置" : "Drive Unit"}</TableCell>
              <TableCell className="text-muted-foreground">{isZh ? "提供输送动力" : "Providing transport power"}</TableCell>
              <TableCell className="text-muted-foreground">{isZh ? "驱动力、速度范围、调速方式" : "Drive force, speed range, control method"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "转向机构" : "Steering Mechanism"}</TableCell>
              <TableCell className="text-muted-foreground">{isZh ? "改变工件运动方向" : "Changing workpiece travel direction"}</TableCell>
              <TableCell className="text-muted-foreground">{isZh ? "转向角度、承载能力、响应速度" : "Steering angle, load capacity, response speed"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "控制系统" : "Control System"}</TableCell>
              <TableCell className="text-muted-foreground">{isZh ? "协调各部件动作" : "Coordinating component actions"}</TableCell>
              <TableCell className="text-muted-foreground">{isZh ? "通信协议、人机界面、故障诊断" : "Communication protocol, HMI, diagnostics"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ContentSection>

      <ContentSection title={isZh ? "快速换色系统" : "Quick Color Change Systems"}>
        <p className="text-muted-foreground leading-relaxed">
          {isZh 
            ? "在多色喷涂应用中，走珠系统与快速换色系统配合使用，实现不同颜色工件的高效分流处理。分支管路清洗技术（Side Branch Cleaning）可在换色时快速清洗残留涂料，最小化换色时间和涂料浪费。"
            : "In multi-color paint applications, ball track systems work with quick color change systems for efficient divergent processing of different colored workpieces. Side branch cleaning technology enables rapid paint residue purging during color changes, minimizing changeover time and paint waste."}
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-muted/30 rounded-lg p-5">
            <h4 className="font-semibold mb-3">{isZh ? "分支清洗技术" : "Side Branch Cleaning Technology"}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {isZh ? "独立清洗管路，减少溶剂消耗" : "Independent purge lines, reduced solvent consumption"}</li>
              <li>• {isZh ? "快速接头设计，便于维护" : "Quick-connect design, easy maintenance"}</li>
              <li>• {isZh ? "适用于频繁换色场景" : "Suitable for frequent color change scenarios"}</li>
              <li>• {isZh ? "换色时间可控制在60秒以内" : "Color change time under 60 seconds"}</li>
            </ul>
          </div>
          <div className="bg-muted/30 rounded-lg p-5">
            <h4 className="font-semibold mb-3">{isZh ? "分流控制逻辑" : "Diverging Control Logic"}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {isZh ? "RFID或条码识别工件颜色" : "RFID or barcode identifying workpiece color"}</li>
              <li>• {isZh ? "自动分配至对应颜色的喷涂工位" : "Automatic allocation to matching spray station"}</li>
              <li>• {isZh ? "智能调度避免工位闲置" : "Smart scheduling to avoid station idle time"}</li>
              <li>• {isZh ? "实时追踪工件位置和状态" : "Real-time tracking of workpiece position and status"}</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={isZh ? "与机器人系统集成" : "Integration with Robotic Systems"}>
        <p className="text-muted-foreground leading-relaxed">
          {isZh 
            ? "走珠系统与机器人喷涂系统的集成是实现全自动涂装生产线的关键。系统间通过标准工业协议实现数据交换，确保工件到位检测、喷涂信号同步、节拍协调等功能的顺畅运行。"
            : "Integration between ball track and robotic spray systems is key to achieving fully automated coating production lines. Data exchange between systems through standard industrial protocols ensures smooth operation of functions including workpiece arrival detection, spray signal synchronization, and cycle coordination."}
        </p>

        <div className="mt-4 space-y-2">
          <div className="flex items-start gap-3">
            <Badge className="shrink-0">1</Badge>
            <p className="text-sm text-muted-foreground">
              {isZh 
                ? "<b>到位检测：</b>光电传感器或视觉系统检测工件位置，触发机器人开始喷涂程序"
                : "<b>Arrival Detection:</b> Photoelectric sensors or vision systems detect workpiece position, triggering robot spray programs"}
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Badge className="shrink-0">2</Badge>
            <p className="text-sm text-muted-foreground">
              {isZh 
                ? "<b>节拍同步：</b>输送速度与机器人喷涂时间精确匹配，确保工件在最佳位置接受喷涂"
                : "<b>Cycle Synchronization:</b> Conveyor speed precisely matches robot spray time, ensuring optimal spray position"}
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Badge className="shrink-0">3</Badge>
            <p className="text-sm text-muted-foreground">
              {isZh 
                ? "<b>异常处理：</b>喷涂缺陷检测信号可触发工件分流至返工工位"
                : "<b>Exception Handling:</b> Spray defect detection signals can trigger workpiece diversion to rework stations"}
            </p>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={isZh ? "选型要点" : "Selection Considerations"}>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-sm mb-2">{isZh ? "生产参数" : "Production Parameters"}</h4>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• {isZh ? "日产能（件/天）" : "Daily production capacity (pcs/day)"}</li>
              <li>• {isZh ? "工件尺寸和重量" : "Workpiece dimensions and weight"}</li>
              <li>• {isZh ? "输送线长度和布局" : "Conveyor line length and layout"}</li>
              <li>• {isZh ? "颜色数量和换色频率" : "Number of colors and change frequency"}</li>
            </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-sm mb-2">{isZh ? "环境要求" : "Environmental Requirements"}</h4>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• {isZh ? "温度范围（烘干炉附近）" : "Temperature range (near drying ovens)"}</li>
              <li>• {isZh ? "防爆等级要求" : "Explosion protection class requirements"}</li>
              <li>• {isZh ? "清洁度要求" : "Cleanliness requirements"}</li>
              <li>• {isZh ? "维护通道空间" : "Maintenance access space"}</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={isZh ? "相关资源" : "Related Resources"}>
        <div className="grid md:grid-cols-2 gap-4">
          <a href="/resources/knowledge/color-change-systems" className="block p-4 border rounded-lg hover:border-primary/50 transition-colors">
            <h4 className="font-medium">{isZh ? "换色系统" : "Color Change Systems"}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {isZh ? "快速换色系统的设计原理和应用实践" : "Design principles and application practices for quick color change systems"}
            </p>
          </a>
          <a href="/resources/knowledge/paint-booth-design-basics" className="block p-4 border rounded-lg hover:border-primary/50 transition-colors">
            <h4 className="font-medium">{isZh ? "喷漆室设计" : "Paint Booth Design"}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {isZh ? "喷漆室设计与输送系统的配合要点" : "Key points for coordinating paint booth design with conveyor systems"}
            </p>
          </a>
        </div>
      </ContentSection>
    </ResourcePageLayout>
  );
}
