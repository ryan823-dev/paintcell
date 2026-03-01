import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Factory, Bot, Droplets, Wrench, Users, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface BusinessLevel {
  level: number;
  icon: typeof Factory;
  titleEn: string;
  titleZh: string;
  descriptionEn: string;
  descriptionZh: string;
  href: string;
  width: string;
  examples: string[];
}

const businessLevels: BusinessLevel[] = [
  {
    level: 1,
    icon: Factory,
    titleEn: "Turnkey Painting Shops",
    titleZh: "整体涂装车间",
    descriptionEn: "Complete painting shop solutions from design to commissioning",
    descriptionZh: "从设计到调试的完整涂装车间解决方案",
    href: "/solutions/turnkey-painting-shop",
    width: "w-[50%]",
    examples: ["Auto Body Shops", "Parts Painting Lines", "Industrial Coating Plants"],
  },
  {
    level: 2,
    icon: Bot,
    titleEn: "Robotic Workstations",
    titleZh: "机器人喷涂工作站",
    descriptionEn: "Integrated robotic painting cells and automation systems",
    descriptionZh: "集成式机器人喷涂单元与自动化系统",
    href: "/paint-cells",
    width: "w-[62%]",
    examples: ["Standard Cells", "Flexible Lines", "Custom Workstations"],
  },
  {
    level: 3,
    icon: Droplets,
    titleEn: "Paint Supply Systems",
    titleZh: "输调漆系统",
    descriptionEn: "Centralized paint supply, color change, and mixing systems",
    descriptionZh: "集中供漆、换色及调漆系统",
    href: "/solutions/paint-supply-systems",
    width: "w-[74%]",
    examples: ["Central Supply", "Mixing Rooms", "Color Change"],
  },
  {
    level: 4,
    icon: Wrench,
    titleEn: "Parts & Consumables",
    titleZh: "备件与耗材",
    descriptionEn: "Spray equipment, rotary bells, guns, pumps, and spare parts",
    descriptionZh: "旋杯、喷枪、供漆泵及周边备件",
    href: "/products",
    width: "w-[86%]",
    examples: ["Rotary Bells", "Spray Guns", "Paint Pumps"],
  },
  {
    level: 5,
    icon: Users,
    titleEn: "Technical Services",
    titleZh: "技术服务",
    descriptionEn: "Engineering, commissioning, maintenance, and training services",
    descriptionZh: "工程、调试、维护及培训服务",
    href: "/services",
    width: "w-full",
    examples: ["Engineering", "Maintenance", "Training"],
  },
];

export function BusinessPyramid() {
  return (
    <div className="space-y-3">
      {businessLevels.map((item, index) => (
        <motion.div
          key={item.level}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          className="flex justify-center"
        >
          <Link
            to={item.href}
            className={`group relative ${item.width} max-w-3xl`}
          >
            <div className="relative rounded-xl border border-border bg-card p-4 md:p-5 hover:border-accent/40 hover:shadow-lg transition-all duration-300 overflow-hidden">
              {/* Level indicator */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent/60 to-accent/20 group-hover:from-accent group-hover:to-accent/40 transition-colors" />
              
              <div className="flex items-start gap-4 pl-3">
                {/* Icon */}
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                  <item.icon className="h-5 w-5 md:h-6 md:w-6 text-accent" />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm md:text-base font-semibold text-foreground leading-tight">
                        {item.titleEn}
                      </h3>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-2 hidden sm:block">
                    {item.descriptionEn}
                  </p>
                  
                  {/* Example tags */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {item.examples.map((example) => (
                      <span
                        key={example}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
