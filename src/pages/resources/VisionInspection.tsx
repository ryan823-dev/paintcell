import { ResourcePageLayout, AnswerBox } from "@/components/resources";
import { ContentSection } from "@/components/resources";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useI18n } from "@/i18n/context";

export default function VisionInspection() {
  const { t, locale } = useI18n();
  const isZh = locale === "zh-CN";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Vision Inspection Systems for Paint Finish Quality Control",
    "description": "Comprehensive guide to automated vision inspection systems for detecting coating defects in robotic spray painting applications.",
    "inLanguage": locale,
  };

  return (
    <ResourcePageLayout
      title={isZh ? "漆面视觉检测系统" : "Vision Inspection for Paint Finish Quality Control"}
      metaTitle={isZh ? "漆面视觉检测系统 | 自动化质量控制" : "Vision Inspection Systems | Automated Paint Quality Control"}
      metaDescription={isZh 
        ? "了解漆面视觉检测系统如何实现涂层缺陷的自动化识别，提升喷涂质量控制的效率和精度。"
        : "Learn how automated vision inspection systems detect coating defects in robotic spray painting for improved quality control."}
      breadcrumbs={[
        { label: isZh ? "工程资源库" : "Engineering Library", href: "/resources/engineering-library" },
        { label: isZh ? "质量控制" : "Quality Control" },
        { label: isZh ? "视觉检测" : "Vision Inspection" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        {isZh 
          ? "视觉检测系统通过高分辨率工业相机和先进图像处理算法，实现涂层缺陷的自动化识别与分类。系统可集成于喷涂生产线，实时检测橘皮、流挂、漏喷等缺陷，提升质量控制效率并降低人工检测成本。"
          : "Vision inspection systems utilize high-resolution industrial cameras and advanced image processing algorithms to automatically identify and classify coating defects. These systems integrate into spray painting production lines to detect orange peel, sags, misses, and other defects in real-time, improving quality control efficiency and reducing manual inspection costs."}
      </AnswerBox>

      <ContentSection title={isZh ? "系统概述" : "System Overview"}>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-muted-foreground leading-relaxed">
            {isZh 
              ? "在现代工业涂装生产中，表面缺陷检测是确保产品质量的关键环节。传统的目视检测方法依赖人工巡检，不仅效率低下，而且容易因视觉疲劳导致漏检。视觉检测系统通过自动化技术，实现了对涂层表面缺陷的高精度、高速度检测。"
              : "In modern industrial coating production, surface defect inspection is critical for ensuring product quality. Traditional visual inspection relies on manual patrol, which is not only inefficient but also prone to missed defects due to inspector fatigue. Vision inspection systems leverage automation technology to achieve high-precision, high-speed detection of coating surface defects."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="border rounded-lg p-5">
            <h4 className="font-semibold mb-3">{isZh ? "检测能力" : "Detection Capabilities"}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {isZh ? "橘皮缺陷 (Orange Peel)" : "Orange peel defects"}</li>
              <li>• {isZh ? "流挂/流淌 (Sags and Runs)" : "Sags and runs"}</li>
              <li>• {isZh ? "漏喷/少喷 (Misses)" : "Missed or insufficient coverage"}</li>
              <li>• {isZh ? "颗粒/异物 (Particles)" : "Particles and foreign matter"}</li>
              <li>• {isZh ? "色差 (Color Variation)" : "Color variation"}</li>
              <li>• {isZh ? "光泽度不均 (Gloss Deviation)" : "Gloss inconsistency"}</li>
            </ul>
          </div>
          <div className="border rounded-lg p-5">
            <h4 className="font-semibold mb-3">{isZh ? "系统优势" : "System Advantages"}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {isZh ? "100%在线检测" : "100% inline inspection"}</li>
              <li>• {isZh ? "一致性检测标准" : "Consistent inspection criteria"}</li>
              <li>• {isZh ? "实时缺陷分类" : "Real-time defect classification"}</li>
              <li>• {isZh ? "数据可追溯" : "Full data traceability"}</li>
              <li>• {isZh ? "与MES系统集成" : "MES system integration"}</li>
              <li>• {isZh ? "降低人工成本" : "Reduced labor costs"}</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={isZh ? "技术架构" : "Technical Architecture"}>
        <div className="space-y-4">
          <h4 className="font-medium">{isZh ? "1. 图像采集模块" : "1. Image Acquisition Module"}</h4>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {isZh 
              ? "采用工业级高分辨率相机，配合专用光学镜头和照明系统。常用配置包括线扫描相机（适用于连续生产线）和面阵相机（适用于离散工件）。照明方案根据检测对象选择同轴光、暗场光或结构光，以获得最佳缺陷对比度。"
              : "Industrial-grade high-resolution cameras paired with specialized optical lenses and illumination systems are used. Common configurations include line-scan cameras (for continuous production lines) and area-scan cameras (for discrete workpieces). Lighting schemes are selected based on the inspection object—coaxial, dark-field, or structured light—to achieve optimal defect contrast."}
          </p>

          <h4 className="font-medium mt-6">{isZh ? "2. 图像处理算法" : "2. Image Processing Algorithms"}</h4>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {isZh 
              ? "基于深度学习的缺陷检测算法能够自动学习和识别各种缺陷类型。卷积神经网络（CNN）模型经过大量缺陷样本训练后，可实现高于人工检测的分类精度。算法还包括表面纹理分析、颜色空间转换、频域分析等技术手段。"
              : "Deep learning-based defect detection algorithms automatically learn and identify various defect types. Convolutional Neural Network (CNN) models trained on extensive defect sample libraries achieve classification accuracy exceeding manual inspection. Algorithms also incorporate surface texture analysis, color space conversion, and frequency domain analysis techniques."}
          </p>

          <h4 className="font-medium mt-6">{isZh ? "3. 系统集成" : "3. System Integration"}</h4>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {isZh 
              ? "视觉检测系统通过标准工业协议（Profinet, EtherNet/IP, OPC UA）与PLC、机器人控制系统、MES系统实现无缝集成。检测结果可实时反馈至喷涂系统，支持闭环质量控制。系统同时生成详细的检测报告，支持质量追溯和工艺优化。"
              : "Vision inspection systems achieve seamless integration with PLCs, robot controllers, and MES systems through standard industrial protocols (Profinet, EtherNet/IP, OPC UA). Inspection results feed back to the spray system in real-time, supporting closed-loop quality control. Systems simultaneously generate detailed inspection reports supporting quality traceability and process optimization."}
          </p>
        </div>
      </ContentSection>

      <ContentSection title={isZh ? "性能指标" : "Performance Specifications"}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{isZh ? "参数" : "Parameter"}</TableHead>
              <TableHead>{isZh ? "典型值" : "Typical Value"}</TableHead>
              <TableHead>{isZh ? "说明" : "Description"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "检测精度" : "Detection Resolution"}</TableCell>
              <TableCell>0.05 - 0.2 mm</TableCell>
              <TableCell className="text-muted-foreground">{isZh ? "最小可检测缺陷尺寸" : "Minimum detectable defect size"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "检测速度" : "Inspection Speed"}</TableCell>
              <TableCell>1 - 5 s/piece</TableCell>
              <TableCell className="text-muted-foreground">{isZh ? "单件检测周期" : "Per-part cycle time"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "检测准确率" : "Detection Accuracy"}</TableCell>
              <TableCell>&gt; 95%</TableCell>
              <TableCell className="text-muted-foreground">{isZh ? "缺陷检出率" : "Defect detection rate"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "误检率" : "False Positive Rate"}</TableCell>
              <TableCell>&lt; 5%</TableCell>
              <TableCell className="text-muted-foreground">{isZh ? "正常品误判率" : "Good parts incorrectly flagged"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "缺陷分类准确率" : "Classification Accuracy"}</TableCell>
              <TableCell>&gt; 90%</TableCell>
              <TableCell className="text-muted-foreground">{isZh ? "缺陷类型识别正确率" : "Correct defect type identification"}</TableCell>
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
                ? "Class A表面检测，车门、引擎盖等外覆盖件100%检测"
                : "Class A surface inspection, 100% inspection of doors, hoods, and other exterior panels"}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Components</Badge>
            <h4 className="font-medium text-sm">{isZh ? "汽车零部件" : "Automotive Components"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {isZh 
                ? "保险杠、后视镜、仪表盘等塑料件涂层检测"
                : "Coating inspection for bumpers, mirrors, dashboards, and other plastic parts"}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Electronics</Badge>
            <h4 className="font-medium text-sm">{isZh ? "电子消费品" : "Consumer Electronics"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {isZh 
                ? "手机壳、家电面板等产品的外观质量检测"
                : "Appearance quality inspection for phone cases, appliance panels, and other products"}
            </p>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={isZh ? "实施要点" : "Implementation Considerations"}>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">1</span>
            </div>
            <div>
              <h4 className="font-medium">{isZh ? "光照环境控制" : "Lighting Environment Control"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {isZh 
                  ? "检测区域需保持稳定的光照条件，避免环境光干扰。专用检测室或遮光罩设计确保一致的照明环境。"
                  : "Inspection zones require stable lighting conditions to avoid ambient light interference. Dedicated inspection rooms or light-shielding enclosures ensure consistent illumination."}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">2</span>
            </div>
            <div>
              <h4 className="font-medium">{isZh ? "样本库建立" : "Sample Library Development"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {isZh 
                  ? "建立涵盖各种缺陷类型和严重程度的样本库，用于算法训练和验证。样本需包含不同颜色、光泽度的涂层样本。"
                  : "Develop a sample library covering all defect types and severity levels for algorithm training and validation. Samples should include coated surfaces in various colors and gloss levels."}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">3</span>
            </div>
            <div>
              <h4 className="font-medium">{isZh ? "系统标定与维护" : "System Calibration and Maintenance"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {isZh 
                  ? "定期使用标准样板进行系统标定，确保检测精度。相机清洁、镜头校准、光源更换等维护工作需纳入日常保养计划。"
                  : "Regular system calibration using standard reference panels ensures inspection accuracy. Camera cleaning, lens calibration, and light source replacement should be included in routine maintenance schedules."}
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={isZh ? "相关资源" : "Related Resources"}>
        <div className="grid md:grid-cols-2 gap-4">
          <a href="/resources/knowledge/paint-defects-guide" className="block p-4 border rounded-lg hover:border-primary/50 transition-colors">
            <h4 className="font-medium">{isZh ? "涂层缺陷分析指南" : "Paint Defects Guide"}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {isZh ? "常见涂层缺陷类型、原因及预防措施详解" : "Detailed guide on common coating defects, causes, and prevention measures"}
            </p>
          </a>
          <a href="/resources/knowledge/paint-booth-design-basics" className="block p-4 border rounded-lg hover:border-primary/50 transition-colors">
            <h4 className="font-medium">{isZh ? "喷漆室设计基础" : "Paint Booth Design Basics"}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {isZh ? "喷漆室设计要素及其对涂层质量的影响" : "Paint booth design factors and their impact on coating quality"}
            </p>
          </a>
        </div>
      </ContentSection>
    </ResourcePageLayout>
  );
}
