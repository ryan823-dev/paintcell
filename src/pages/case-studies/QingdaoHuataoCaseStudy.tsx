import { CheckCircle2, Zap, Clock, Users, Award, Play } from "lucide-react";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Button } from "@/components/ui/button";
import { AnswerBox, ContentSection, ResourcePageLayout } from "@/components/resources";
import { useI18n } from "@/i18n/context";

export default function QingdaoHuataoCaseStudy() {
  const { locale } = useI18n();
  const isZh = locale.startsWith("zh");

  const copy = isZh
    ? {
        title: "青岛华涛汽车零部件涂装项目",
        metaTitle: "青岛华涛案例 | 汽车零部件自动化涂装",
        metaDescription:
          "青岛华涛汽车零部件涂装项目案例，涵盖 ABB 喷涂机器人、静电旋杯、集中供漆与输送集成，展示自动化涂装线的交付结果。",
        headline: "青岛华涛汽车零部件涂装项目案例",
        description:
          "面向汽车内外饰件生产的完整机器人喷涂系统，包含喷涂、供漆、输送与控制集成。",
        breadcrumbs: [
          { label: "工程资源库", href: "/resources/engineering-library" },
          { label: "案例研究", href: "/case-studies" },
          { label: "青岛华涛" },
        ],
        answer:
          "青岛华涛汽车零部件有限公司新建了一条自动化涂装生产线，用于覆盖汽车内饰件和外饰件的喷涂。项目采用 ABB 喷涂机器人与静电旋杯雾化器，并配套集中供漆、走珠输送与控制系统，目标是提升节拍稳定性、喷涂一致性和换色效率。",
        overviewTitle: "项目概况",
        systemTitle: "系统配置",
        outcomesTitle: "项目成果",
        highlightsTitle: "技术亮点",
        quoteTitle: "客户反馈",
        relatedTitle: "相关项目",
        quote:
          "TD 团队为我们提供了一套完整的自动化涂装解决方案。从方案设计到设备安装调试，整体推进非常专业。新线投产后，产能和一次合格率都得到了明显提升，返工与切换损失也大幅下降。",
        quoteAuthor: "青岛华涛汽车零部件有限公司 生产负责人",
        specs: [
          { label: "客户", value: "Qingdao Huatao Automotive Parts Co., Ltd." },
          { label: "行业", value: "汽车零部件" },
          { label: "地点", value: "中国山东青岛" },
          { label: "项目类型", value: "新建自动化涂装线" },
        ],
        systems: [
          {
            component: "机器人系统",
            details: "多台 ABB 喷涂机器人，覆盖复杂内外饰件的姿态与轨迹要求。",
          },
          {
            component: "喷涂设备",
            details: "ABB RB1000i 静电旋杯雾化器，支持高转移效率和稳定雾化。",
          },
          {
            component: "供漆系统",
            details: "集中供漆与多色换色模块，缩短切换时间并降低材料浪费。",
          },
          {
            component: "输送系统",
            details: "走珠输送配合积放式输送，实现不同工件的柔性切换。",
          },
          {
            component: "控制系统",
            details: "PLC 自动控制、HMI 可视化界面，并预留 MES 对接能力。",
          },
        ],
        outcomes: [
          { icon: Zap, value: "95%+", label: "设备可利用率" },
          { icon: Clock, value: "15%", label: "产能提升" },
          { icon: Users, value: "50%", label: "人工减少" },
          { icon: Award, value: "99%", label: "一次合格率" },
        ],
        highlights: [
          "机器人路径通过离线编程与仿真优化，减少空行程并提升节拍稳定性。",
          "快速换色模块支持多色生产，帮助项目缩短切换时间并控制冲洗损耗。",
          "输送识别与喷涂程序联动，不同工件可自动匹配工艺参数。",
          "全过程数据记录支持质量追溯，便于后续工艺优化与异常分析。",
        ],
        relatedProjects: [
          {
            title: "保险杠喷涂线",
            description: "多机器人保险杠喷涂，结合静电旋杯与自动换色。",
          },
          {
            title: "车身内外饰喷涂",
            description: "针对更大工件的机器人覆盖与输送协同方案。",
          },
          {
            title: "铝轮毂涂装",
            description: "面向轮毂件的高一致性静电喷涂与快速换色项目。",
          },
        ],
      }
    : {
        title: "Qingdao Huatao Automotive Parts Coating Project",
        metaTitle: "Qingdao Huatao Case | Automotive Parts Coating Automation",
        metaDescription:
          "Case study of a robotic coating line for Qingdao Huatao, covering ABB painting robots, electrostatic bells, centralized paint supply, and conveyor integration.",
        headline: "Qingdao Huatao Automotive Parts Coating Project Case Study",
        description:
          "A complete robotic spray painting system for automotive interior and exterior components, including spray, paint supply, conveyor, and controls integration.",
        breadcrumbs: [
          { label: "Engineering Library", href: "/resources/engineering-library" },
          { label: "Case Studies", href: "/case-studies" },
          { label: "Qingdao Huatao" },
        ],
        answer:
          "Qingdao Huatao Automotive Parts Co., Ltd. launched a new automated paint line for interior and exterior automotive parts. The project combined ABB painting robots, electrostatic rotary bell atomizers, centralized paint supply, ball-track conveying, and integrated controls to improve takt stability, finish consistency, and color change efficiency.",
        overviewTitle: "Project Overview",
        systemTitle: "System Configuration",
        outcomesTitle: "Project Outcomes",
        highlightsTitle: "Technical Highlights",
        quoteTitle: "Customer Feedback",
        relatedTitle: "Related Projects",
        quote:
          "The TD team delivered a complete automated paint solution for us. From engineering design to installation and commissioning, execution was professional throughout. After startup, the new line improved both throughput and first-pass yield while reducing rework and changeover losses.",
        quoteAuthor: "Production Lead, Qingdao Huatao Automotive Parts Co., Ltd.",
        specs: [
          { label: "Customer", value: "Qingdao Huatao Automotive Parts Co., Ltd." },
          { label: "Industry", value: "Automotive Parts" },
          { label: "Location", value: "Qingdao, Shandong, China" },
          { label: "Project Type", value: "Greenfield automated paint line" },
        ],
        systems: [
          {
            component: "Robot Systems",
            details: "Multiple ABB painting robots configured for complex interior and exterior components.",
          },
          {
            component: "Spray Equipment",
            details: "ABB RB1000i electrostatic rotary bell atomizers for stable atomization and high transfer efficiency.",
          },
          {
            component: "Paint Supply System",
            details: "Centralized paint supply with multi-color change capability to reduce waste and downtime.",
          },
          {
            component: "Conveyor System",
            details: "Ball-track conveyor integrated with power-and-free handling for flexible part flow.",
          },
          {
            component: "Control System",
            details: "PLC-based automation, HMI visualization, and readiness for MES integration.",
          },
        ],
        outcomes: [
          { icon: Zap, value: "95%+", label: "Equipment Availability" },
          { icon: Clock, value: "15%", label: "Capacity Increase" },
          { icon: Users, value: "50%", label: "Labor Reduction" },
          { icon: Award, value: "99%", label: "First Pass Yield" },
        ],
        highlights: [
          "Robot trajectories were optimized through offline programming and simulation to cut idle travel time.",
          "Fast color change modules supported multi-color production with tighter changeover control.",
          "Conveyor identification was linked with spray recipes so each part could receive the correct program automatically.",
          "Full-process data capture improved traceability and created a better baseline for process tuning.",
        ],
        relatedProjects: [
          {
            title: "Bumper Painting Line",
            description: "Multi-robot bumper coating with electrostatic bells and automated color change.",
          },
          {
            title: "Body and Trim Painting",
            description: "Robot coverage and conveyor coordination for larger automotive parts.",
          },
          {
            title: "Aluminum Wheel Coating",
            description: "High-consistency electrostatic coating with faster color changes for wheel parts.",
          },
        ],
      };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: copy.headline,
    description: copy.description,
    inLanguage: locale,
    author: {
      "@type": "Organization",
      name: "TD Robotic Painting Systems",
      url: "https://tdpaint.com",
    },
  };

  const projectVideos = [
    {
      slug: "qingdao-huatao-facility-tour",
      title: "Paint Line Facility Tour - Part 1",
      description:
        "Walkthrough of the overall Qingdao Huatao coating line layout, including the robotic spray booth arrangement and project-level facility flow.",
    },
    {
      slug: "qingdao-huatao-centralized-paint-supply",
      title: "Centralized Paint Supply - Part 2",
      description:
        "Overview of the centralized paint supply installation, covering tank layout, circulation piping, and paint delivery integration for the robotic line.",
    },
    {
      slug: "qingdao-huatao-spray-booth-interior",
      title: "Spray Booth Interior - Part 3",
      description:
        "Interior view of the spray booth showing conveyor flow, booth structure, and the safety and control interfaces used during automated production.",
    },
  ];

  const projectVideosTitle = "Project Videos";
  const projectVideosDescription =
    "Three project clips covering facility layout, centralized paint supply, and spray booth/conveyor details from the Qingdao Huatao installation.";

  return (
    <ResourcePageLayout
      title={copy.title}
      metaTitle={copy.metaTitle}
      metaDescription={copy.metaDescription}
      breadcrumbs={copy.breadcrumbs}
      structuredData={structuredData}
      canonicalPath="/case-studies/qingdao-huatao"
    >
      <AnswerBox>{copy.answer}</AnswerBox>

      <ContentSection title={copy.overviewTitle}>
        <div className="grid gap-4 md:grid-cols-2">
          {copy.specs.map((spec) => (
            <div key={spec.label} className="flex justify-between border-b border-muted py-2">
              <span className="text-muted-foreground">{spec.label}</span>
              <span className="font-medium text-right">{spec.value}</span>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection title={copy.systemTitle}>
        <div className="space-y-4">
          {copy.systems.map((item) => (
            <div key={item.component} className="rounded-lg bg-muted/30 p-4">
              <h4 className="mb-2 font-semibold">{item.component}</h4>
              <p className="text-sm text-muted-foreground">{item.details}</p>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection title={copy.outcomesTitle}>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {copy.outcomes.map((outcome) => (
            <div key={outcome.label} className="rounded-lg bg-muted/30 p-4 text-center">
              <outcome.icon className="mx-auto mb-2 h-8 w-8 text-primary" />
              <div className="text-2xl font-bold text-primary">{outcome.value}</div>
              <div className="text-sm text-muted-foreground">{outcome.label}</div>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection title={copy.highlightsTitle}>
        <div className="space-y-3">
          {copy.highlights.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
              <span className="text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection title={copy.quoteTitle}>
        <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
          {copy.quote}
        </blockquote>
        <p className="mt-2 text-sm text-muted-foreground">{copy.quoteAuthor}</p>
      </ContentSection>

      <ContentSection title={projectVideosTitle}>
        <p className="mb-6 text-sm text-muted-foreground">{projectVideosDescription}</p>
        <div className="grid gap-4 md:grid-cols-3">
          {projectVideos.map((video) => (
            <div key={video.slug} className="rounded-lg bg-muted/30 p-4">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Play className="h-5 w-5" />
              </div>
              <h4 className="mb-2 font-semibold">{video.title}</h4>
              <p className="text-sm text-muted-foreground">{video.description}</p>
              <Button asChild variant="outline" className="mt-4 w-full">
                <Link to={`/videos/${video.slug}`}>Watch Video</Link>
              </Button>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection title={copy.relatedTitle}>
        <div className="grid gap-4 md:grid-cols-3">
          {copy.relatedProjects.map((project) => (
            <div key={project.title} className="rounded-lg bg-muted/30 p-4">
              <h4 className="mb-1 font-semibold">{project.title}</h4>
              <p className="text-sm text-muted-foreground">{project.description}</p>
            </div>
          ))}
        </div>
      </ContentSection>
    </ResourcePageLayout>
  );
}
