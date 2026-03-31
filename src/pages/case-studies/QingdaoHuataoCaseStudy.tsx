import { ResourcePageLayout, AnswerBox } from "@/components/resources";
import { ContentSection } from "@/components/resources";
import { useI18n } from "@/i18n/context";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, Zap, Clock, Users, Globe, Award } from "lucide-react";

export default function QingdaoHuataoCaseStudy() {
  const { t, locale } = useI18n();
  const isZh = locale === "zh-CN";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": isZh ? "青岛华涛汽车零部件涂装项目案例" : "Qingdao Huatao Automotive Parts Coating Project Case Study",
    "description": "Complete robotic spray painting system for automotive interior and exterior parts at Qingdao Huatao manufacturing facility.",
    "inLanguage": locale,
    "author": {
      "@type": "Organization",
      "name": "TD Robotic Painting Systems",
      "url": "https://tdpaint.com"
    }
  };

  const breadcrumbs = [
    { label: isZh ? "工程资源库" : "Engineering Library", href: "/resources/engineering-library" },
    { label: isZh ? "案例研究" : "Case Studies", href: "/case-studies" },
    { label: isZh ? "青岛华涛" : "Qingdao Huatao" },
  ];

  const projectSpecs = [
    { label: isZh ? "客户" : "Customer", value: "Qingdao Huatao Automotive Parts Co., Ltd." },
    { label: isZh ? "行业" : "Industry", value: isZh ? "汽车零部件" : "Automotive Parts" },
    { label: isZh ? "地点" : "Location", value: isZh ? "山东省青岛市" : "Qingdao, Shandong, China" },
    { label: isZh ? "项目类型" : "Project Type", value: isZh ? "新建涂装线" : "Greenfield Paint Line" },
  ];

  const systemConfiguration = [
    { 
      component: isZh ? "机器人系统" : "Robot Systems",
      details: isZh 
        ? "多台ABB喷涂机器人，配合IRB5500系列大型机器人实现复杂工件全覆盖喷涂"
        : "Multiple ABB painting robots, IRB5500 series large robots for complete coverage of complex parts"
    },
    { 
      component: isZh ? "喷涂设备" : "Spray Equipment",
      details: isZh 
        ? "ABB RB1000i静电旋杯雾化器，高压静电系统，转移效率85%以上"
        : "ABB RB1000i electrostatic rotary bell atomizers, high-voltage electrostatic system, 85%+ transfer efficiency"
    },
    { 
      component: isZh ? "供漆系统" : "Paint Supply System",
      details: isZh 
        ? "集中供漆系统，多色换色功能，换色时间小于30秒"
        : "Centralized paint supply system, multi-color change capability, color change time under 30 seconds"
    },
    { 
      component: isZh ? "输送系统" : "Conveyor System",
      details: isZh 
        ? "走珠输送系统配合积放式输送机，实现柔性生产"
        : "Ball track conveyor with power-and-free conveyor for flexible production"
    },
    { 
      component: isZh ? "控制系统" : "Control System",
      details: isZh 
        ? "PLC自动控制系统，HMI人机界面，MES系统对接"
        : "PLC automatic control system, HMI interface, MES integration"
    },
  ];

  const outcomes = [
    { icon: Zap, value: "95%+", label: isZh ? "设备利用率" : "Equipment Availability" },
    { icon: Clock, value: "15%", label: isZh ? "产能提升" : "Capacity Increase" },
    { icon: Users, value: "50%", label: isZh ? "人工减少" : "Labor Reduction" },
    { icon: Award, value: "99%", label: isZh ? "一次合格率" : "First Pass Yield" },
  ];

  return (
    <ResourcePageLayout
      title={isZh ? "青岛华涛汽车零部件涂装项目" : "Qingdao Huatao Automotive Parts Coating Project"}
      metaTitle={isZh ? "青岛华涛案例 | 汽车零部件涂装自动化" : "Qingdao Huatao Case | Automotive Parts Coating Automation"}
      metaDescription={isZh 
        ? "青岛华涛汽车零部件涂装项目案例：ABB机器人喷涂系统、静电旋杯、集中供漆、走珠输送，实现自动化涂装生产。"
        : "Qingdao Huatao automotive parts coating project: ABB robot spray systems, electrostatic bells, centralized paint supply, ball track conveyor for automated paint production."}
      breadcrumbs={breadcrumbs}
      structuredData={structuredData}
    >
      <Helmet>
        <link rel="canonical" href="https://tdpaint.com/case-studies/qingdao-huatao" />
      </Helmet>

      <AnswerBox>
        {isZh 
          ? "青岛华涛汽车零部件有限公司是一家专业生产汽车内外饰件的制造企业。本项目为其新建涂装生产线，涵盖内饰件和外饰件的自动化喷涂，采用ABB机器人配合静电旋杯雾化器，实现了高效率、高质量的自动化涂装生产。"
          : "Qingdao Huatao Automotive Parts Co., Ltd. specializes in manufacturing automotive interior and exterior components. This project involved a new paint production line covering automated spraying of interior and exterior parts, using ABB robots with electrostatic rotary bell atomizers to achieve high-efficiency, high-quality automated paint production."}
      </AnswerBox>

      {/* Project Specifications */}
      <ContentSection title={isZh ? "项目概况" : "Project Overview"}>
        <div className="grid md:grid-cols-2 gap-4">
          {projectSpecs.map((spec, i) => (
            <div key={i} className="flex justify-between py-2 border-b border-muted">
              <span className="text-muted-foreground">{spec.label}</span>
              <span className="font-medium">{spec.value}</span>
            </div>
          ))}
        </div>
      </ContentSection>

      {/* System Configuration */}
      <ContentSection title={isZh ? "系统配置" : "System Configuration"}>
        <div className="space-y-4">
          {systemConfiguration.map((item, i) => (
            <div key={i} className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold mb-2">{item.component}</h4>
              <p className="text-sm text-muted-foreground">{item.details}</p>
            </div>
          ))}
        </div>
      </ContentSection>

      {/* Project Outcomes */}
      <ContentSection title={isZh ? "项目成果" : "Project Outcomes"}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {outcomes.map((outcome, i) => (
            <div key={i} className="text-center p-4 bg-muted/30 rounded-lg">
              <outcome.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-primary">{outcome.value}</div>
              <div className="text-sm text-muted-foreground">{outcome.label}</div>
            </div>
          ))}
        </div>
      </ContentSection>

      {/* Technical Highlights */}
      <ContentSection title={isZh ? "技术亮点" : "Technical Highlights"}>
        <div className="space-y-3">
          {[
            isZh ? "机器人路径优化：通过离线编程和仿真，优化喷涂轨迹，减少空行程时间20%" : "Robot path optimization: Offline programming and simulation optimized spray trajectories, reducing idle travel time by 20%",
            isZh ? "快速换色系统：AGMD自动换色模块实现多色生产，换色时间小于30秒" : "Quick color change: AGMD automatic color change module enables multi-color production with under 30-second changeover",
            isZh ? "走珠输送：采用走珠系统配合识别系统，实现不同工件的自动识别和喷涂程序调用" : "Ball track conveyor: Ball track system with identification enables automatic part recognition and spray program selection",
            isZh ? "质量追溯：全流程数据采集，实现每件产品的喷涂参数记录和质量追溯" : "Quality traceability: Full-process data collection records spray parameters for each part for quality tracking",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      </ContentSection>

      {/* Customer Quote */}
      <ContentSection title={isZh ? "客户评价" : "Customer Feedback"}>
        <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
          {isZh 
            ? "TD团队为我们提供了一套完整的自动化涂装解决方案，从方案设计到设备安装调试都展现了专业的技术能力。新涂装线投产后，我们的产能提升了15%，产品一次合格率达到99%，大大降低了返工成本。"
            : "The TD team provided us with a complete automated paint solution, demonstrating professional technical capabilities from design to installation and commissioning. After the new paint line went into production, our capacity increased by 15% and first-pass yield reached 99%, significantly reducing rework costs."}
        </blockquote>
        <p className="text-sm text-muted-foreground mt-2">
          — {isZh ? "青岛华涛汽车零部件有限公司 生产总监" : "Production Director, Qingdao Huatao Automotive Parts Co., Ltd."}
        </p>
      </ContentSection>

      {/* Related Projects */}
      <ContentSection title={isZh ? "相关案例" : "Related Projects"}>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="font-semibold mb-1">{isZh ? "汽车保险杠喷涂" : "Bumper Painting"}</h4>
            <p className="text-sm text-muted-foreground">
              {isZh ? "多机器人保险杠喷涂线，静电旋杯+自动换色" : "Multi-robot bumper painting line, electrostatic bells + auto color change"}
            </p>
          </div>
          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="font-semibold mb-1">{isZh ? "车身涂装线" : "Body Painting Line"}</h4>
            <p className="text-sm text-muted-foreground">
              {isZh ? "整车车身内外喷涂，ABB机器人+杜尔设备" : "Full body interior/exterior spray, ABB robots + Dürr equipment"}
            </p>
          </div>
          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="font-semibold mb-1">{isZh ? "铝合金轮毂涂装" : "Aluminum Wheel Coating"}</h4>
            <p className="text-sm text-muted-foreground">
              {isZh ? "轮毂静电旋杯喷涂，水性漆快速换色" : "Wheel electrostatic bell spray, water-borne quick color change"}
            </p>
          </div>
        </div>
      </ContentSection>
    </ResourcePageLayout>
  );
}