import { ResourcePageLayout, AnswerBox } from "@/components/resources";
import { ContentSection } from "@/components/resources";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useI18n } from "@/i18n/context";

export default function PowderCoatingSystems() {
  const { t, locale } = useI18n();
  const isZh = locale === "zh-CN";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Powder Coating Systems: Electrostatic Application Technology",
    "description": "Technical guide to powder coating systems, covering electrostatic application, curing processes, and US/EU terminology variations.",
    "inLanguage": locale,
  };

  return (
    <ResourcePageLayout
      title={isZh ? "粉末涂装系统" : "Powder Coating / Powder Finishing Systems"}
      metaTitle={isZh ? "粉末涂装系统 | 静电粉末喷涂技术" : "Powder Coating Systems | Electrostatic Powder Application"}
      metaDescription={isZh 
        ? "了解粉末涂装技术，包括静电粉末喷涂、固化工艺和应用领域。"
        : "Learn about powder coating technology including electrostatic application, curing processes, and application areas."}
      breadcrumbs={[
        { label: isZh ? "工程资源库" : "Engineering Library", href: "/resources/engineering-library" },
        { label: isZh ? "工艺" : "Process" },
        { label: isZh ? "粉末涂装" : "Powder Coating" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        {isZh 
          ? "粉末涂装是一种环保型表面处理技术，将干燥的粉末涂料通过静电吸附到金属基材表面，然后加热固化形成坚硬的涂层。与传统液体涂料相比，粉末涂装具有零VOC排放、高材料利用率（95%+）、无需溶剂等显著优势，已成为金属表面处理的主流技术之一。"
          : "Powder coating is an environmentally friendly surface treatment technology where dry powder coating is electrostatically attracted to metal substrate surfaces, then heated to cure and form a hard coating. Compared to traditional liquid coatings, powder coating offers significant advantages including zero VOC emissions, high material utilization (95%+), and no solvent requirement, making it a mainstream surface treatment technology for metal."}
      </AnswerBox>

      {/* US vs EU Terminology */}
      <ContentSection title={isZh ? "US vs EU Terminology" : "US vs EU Terminology"}>
        <div className="bg-muted/30 rounded-lg p-4 mb-6">
          <p className="text-sm text-muted-foreground">
            {isZh 
              ? "粉末涂装在不同地区有不同的术语表达："
              : "Powder coating has regional terminology variations:"}
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
              <TableCell>粉末涂装</TableCell>
              <TableCell>Powder coating, Powder finish</TableCell>
              <TableCell>Powder coating, Powder lacquering</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>粉末喷枪</TableCell>
              <TableCell>Powder gun, Electrostatic powder gun</TableCell>
              <TableCell>Powder applicator, Powder spray gun</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>固化炉</TableCell>
              <TableCell>Cure oven, Baking oven</TableCell>
              <TableCell>Curing oven, Stoving oven</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>喷粉室</TableCell>
              <TableCell>Powder booth, Spray booth</TableCell>
              <TableCell>Powder cabin, Powder spray cabin</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>回收系统</TableCell>
              <TableCell>Recovery system, Powder reclaim</TableCell>
              <TableCell>Powder reclamation, Overspray recovery</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>热固性粉末</TableCell>
              <TableCell>Thermosetting powder</TableCell>
              <TableCell>Curing powder, Thermoset powder</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ContentSection>

      <ContentSection title={isZh ? "粉末类型" : "Powder Types"}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-5">
            <h4 className="font-semibold mb-3">{isZh ? "热固性粉末 (Thermosetting)" : "Thermosetting Powder"}</h4>
            <p className="text-sm text-muted-foreground mb-3">
              {isZh 
                ? "最常用的粉末类型，通过化学反应交联固化。固化后形成三维网状结构，不可再熔融。"
                : "The most common powder type, curing through chemical crosslinking reaction. Forms 3D network structure after curing, cannot be remelted."}
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {isZh ? "环氧粉末 (Epoxy)" : "Epoxy powder"}</li>
              <li>• {isZh ? "环氧聚酯混合粉末 (Hybrid)" : "Hybrid powder"}</li>
              <li>• {isZh ? "聚酯/TGIC粉末" : "Polyester/TGIC powder"}</li>
              <li>• {isZh ? "聚氨酯粉末 (Polyurethane)" : "Polyurethane powder"}</li>
            </ul>
          </div>
          <div className="border rounded-lg p-5">
            <h4 className="font-semibold mb-3">{isZh ? "热塑性粉末 (Thermoplastic)" : "Thermoplastic Powder"}</h4>
            <p className="text-sm text-muted-foreground mb-3">
              {isZh 
                ? "加热时软化熔融，冷却时固化。可重复加工，不发生化学反应。"
                : "Softens and melts when heated, solidifies when cooled. Can be reprocessed, no chemical reaction."}
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {isZh ? "尼龙粉末 (Nylon/PA)" : "Nylon/PA powder"}</li>
              <li>• {isZh ? "PVC粉末" : "PVC powder"}</li>
              <li>• {isZh ? "聚乙烯粉末 (PE)" : "Polyethylene powder"}</li>
              <li>• {isZh ? "氟碳粉末 (PVDF)" : "Fluorocarbon powder"}</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={isZh ? "系统组成" : "System Components"}>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">1</span>
            </div>
            <div>
              <h4 className="font-medium">{isZh ? "粉末喷枪 (Powder Gun / Applicator)" : "Powder Gun / Applicator"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {isZh 
                  ? "对粉末颗粒进行静电充电并定向喷出。美式称为powder gun或electrostatic spray gun，欧式称为powder applicator。充电方式包括电晕充电（corona charging）和摩擦充电（tribo charging）。"
                  : "Electrostatic charging and directional spraying of powder particles. US terms: powder gun, electrostatic spray gun. EU terms: powder applicator, electrostatic gun. Charging methods include corona charging and tribo charging."}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">2</span>
            </div>
            <div>
              <h4 className="font-medium">{isZh ? "喷粉室 (Powder Booth / Cabin)" : "Powder Booth / Cabin"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {isZh 
                  ? "粉末喷涂的工作区域。美式常用powder booth或spray booth，欧洲更常用powder cabin或spray cabin。配备粉末回收系统，回收未附着在工件上的粉末以再利用。"
                  : "Working area for powder spraying. US: powder booth, spray booth. EU: powder cabin, spray cabin. Equipped with powder recovery system to reclaim oversprayed powder for reuse."}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">3</span>
            </div>
            <div>
              <h4 className="font-medium">{isZh ? "供粉系统 (Powder Feed System)" : "Powder Feed System"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {isZh 
                  ? "储存和输送粉末到喷枪的装置。包括粉末箱（hopper）、流化床、泵和管路系统。美式称hopper或feeder，欧州称powder reservoir或supply unit。"
                  : "Device for storing and delivering powder to the gun. Includes hopper, fluidized bed, pump, and piping. US: hopper, feeder. EU: powder reservoir, supply unit."}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">4</span>
            </div>
            <div>
              <h4 className="font-medium">{isZh ? "固化炉 (Cure Oven / Baking Oven)" : "Cure Oven / Baking Oven"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {isZh 
                  ? "对粉末涂层进行加热固化的设备。美式称为cure oven或baking oven（烘烤炉），欧洲称为curing oven或stoving oven。固化温度通常为180-200°C，时间10-30分钟。"
                  : "Equipment for heating and curing powder coating. US: cure oven, baking oven. EU: curing oven, stoving oven. Typical cure temperature: 180-200°C, time: 10-30 minutes."}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">5</span>
            </div>
            <div>
              <h4 className="font-medium">{isZh ? "前处理设备 (Pretreatment System)" : "Pretreatment System"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {isZh 
                  ? "粉末涂装前的表面准备工作。包括脱脂、磷化、钝化等处理。美式和欧式术语基本一致，包括phosphating、chromating、iron phosphate、zinc phosphate等。"
                  : "Surface preparation before powder coating. Includes degreasing, phosphating, passivation. US and EU terminology similar: phosphating, chromating, iron phosphate, zinc phosphate."}
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
              <TableHead>{isZh ? "典型值" : "Typical Value"}</TableHead>
              <TableHead>{isZh ? "说明" : "Description"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "涂层厚度" : "Film Thickness"}</TableCell>
              <TableCell>60 - 120 μm</TableCell>
              <TableCell className="text-muted-foreground">{isZh ? "通常为单层，可达200μm+厚涂" : "Typically single layer, heavy coats to 200μm+ possible"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "材料利用率" : "Material Utilization"}</TableCell>
              <TableCell>95 - 98%</TableCell>
              <TableCell className="text-muted-foreground">{isZh ? "粉末回收再利用" : "With powder recovery and reuse"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "固化温度" : "Cure Temperature"}</TableCell>
              <TableCell>180 - 200°C</TableCell>
              <TableCell className="text-muted-foreground">{isZh ? "热固性粉末" : "For thermosetting powder"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "固化时间" : "Cure Time"}</TableCell>
              <TableCell>10 - 30 min</TableCell>
              <TableCell className="text-muted-foreground">{isZh ? "取决于粉末类型和膜厚" : "Depends on powder type and film thickness"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "附着力" : "Adhesion"}</TableCell>
              <TableCell>0T - 5T</TableCell>
              <TableCell className="text-muted-foreground">{isZh ? "符合ISO等级" : "Per ISO classification"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "耐冲击性" : "Impact Resistance"}</TableCell>
              <TableCell>40 - 160 in-lb</TableCell>
              <TableCell className="text-muted-foreground">{isZh ? "取决于粉末类型" : "Depends on powder type"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ContentSection>

      <ContentSection title={isZh ? "应用领域" : "Application Areas"}>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Architecture</Badge>
            <h4 className="font-medium text-sm">{isZh ? "建筑铝材" : "Architectural Aluminum"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {isZh 
                ? "铝合金门窗、幕墙、栏杆，AAMA 2604/2605标准"
                : "Aluminum windows, curtain walls, railings, AAMA 2604/2605 standard"}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Automotive</Badge>
            <h4 className="font-medium text-sm">{isZh ? "汽车零部件" : "Automotive Components"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {isZh 
                ? "轮毂、发动机部件、底盘件"
                : "Wheels, engine components, chassis parts"}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Appliances</Badge>
            <h4 className="font-medium text-sm">{isZh ? "家用电器" : "Appliances"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {isZh 
                ? "冰箱、洗衣机、空调室外机等"
                : "Refrigerators, washers, air conditioner outdoor units"}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Furniture</Badge>
            <h4 className="font-medium text-sm">{isZh ? "家具" : "Metal Furniture"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {isZh 
                ? "办公家具、户外家具、货架"
                : "Office furniture, outdoor furniture, shelving"}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Industrial</Badge>
            <h4 className="font-medium text-sm">{isZh ? "工业设备" : "Industrial Equipment"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {isZh 
                ? "电气柜、仪器仪表、农机设备"
                : "Electrical cabinets, instruments, agricultural machinery"}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Garden</Badge>
            <h4 className="font-medium text-sm">{isZh ? "园林机械" : "Garden Equipment"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {isZh 
                ? "割草机、园艺工具、金属围栏"
                : "Lawn mowers, garden tools, metal fencing"}
            </p>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={isZh ? "优势对比" : "Advantages Comparison"}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{isZh ? "对比项" : "Comparison Factor"}</TableHead>
              <TableHead>{isZh ? "粉末涂装" : "Powder Coating"}</TableHead>
              <TableHead>{isZh ? "液体涂装" : "Liquid Coating"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "VOC排放" : "VOC Emissions"}</TableCell>
              <TableCell className="text-green-600">零VOC</TableCell>
              <TableCell className="text-red-600">高VOC</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "材料利用率" : "Material Utilization"}</TableCell>
              <TableCell className="text-green-600">95-98%</TableCell>
              <TableCell>30-60%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "膜厚控制" : "Film Thickness Control"}</TableCell>
              <TableCell>{isZh ? "一次性厚涂可达60-120μm" : "Single coat 60-120μm possible"}</TableCell>
              <TableCell>{isZh ? "需多层施工" : "Multiple coats required"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "固化时间" : "Cure Time"}</TableCell>
              <TableCell>{isZh ? "10-30分钟（高温）" : "10-30 min (high temp)"}</TableCell>
              <TableCell>{isZh ? "较长（需闪干）" : "Longer (flash time needed)"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "耐化学性" : "Chemical Resistance"}</TableCell>
              <TableCell className="text-green-600">{isZh ? "优异" : "Excellent"}</TableCell>
              <TableCell>{isZh ? "良好" : "Good"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{isZh ? "颜色切换" : "Color Change"}</TableCell>
              <TableCell>{isZh ? "需清理设备" : "Requires cleaning equipment"}</TableCell>
              <TableCell className="text-green-600">{isZh ? "相对容易" : "Relatively easy"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ContentSection>

      <ContentSection title={isZh ? "相关资源" : "Related Resources"}>
        <div className="grid md:grid-cols-2 gap-4">
          <a href="/resources/knowledge/paint-technology-guide" className="block p-4 border rounded-lg hover:border-primary/50 transition-colors">
            <h4 className="font-medium">{isZh ? "涂装技术指南" : "Coating Technology Guide"}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {isZh ? "液体和粉末涂装技术对比" : "Comparison of liquid and powder coating technologies"}
            </p>
          </a>
          <a href="/resources/glossary/powder-coating" className="block p-4 border rounded-lg hover:border-primary/50 transition-colors">
            <h4 className="font-medium">{isZh ? "粉末涂装术语" : "Powder Coating Glossary"}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {isZh ? "粉末涂装专业术语定义" : "Definitions of powder coating terminology"}
            </p>
          </a>
        </div>
      </ContentSection>
    </ResourcePageLayout>
  );
}
