import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Factory, Bot, Droplets, Wrench, Users, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "@/i18n/context";

interface BusinessLevel {
  level: number;
  icon: typeof Factory;
  titleKey: string;
  descriptionKey: string;
  examplesKey: string;
  href: string;
  width: string;
}

const businessLevels: BusinessLevel[] = [
  {
    level: 1,
    icon: Factory,
    titleKey: "level1",
    descriptionKey: "level1",
    examplesKey: "level1",
    href: "/solutions/turnkey-painting-shop",
    width: "w-[50%]",
  },
  {
    level: 2,
    icon: Bot,
    titleKey: "level2",
    descriptionKey: "level2",
    examplesKey: "level2",
    href: "/paint-cells",
    width: "w-[62%]",
  },
  {
    level: 3,
    icon: Droplets,
    titleKey: "level3",
    descriptionKey: "level3",
    examplesKey: "level3",
    href: "/solutions/paint-supply-systems",
    width: "w-[74%]",
  },
  {
    level: 4,
    icon: Wrench,
    titleKey: "level4",
    descriptionKey: "level4",
    examplesKey: "level4",
    href: "/products",
    width: "w-[86%]",
  },
  {
    level: 5,
    icon: Users,
    titleKey: "level5",
    descriptionKey: "level5",
    examplesKey: "level5",
    href: "/services",
    width: "w-full",
  },
];

export function BusinessPyramid() {
  const { t } = useI18n();
  const pyramid = t.businessPyramid || {};

  return (
    <div className="space-y-3">
      {businessLevels.map((item, index) => {
        const levelData = pyramid[item.titleKey] || {};
        const title = levelData.title || "";
        const description = levelData.description || "";
        const examples = levelData.examples || [];

        return (
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
                          {title}
                        </h3>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                    </div>
                    
                    <p className="text-xs text-muted-foreground mt-2 hidden sm:block">
                      {description}
                    </p>
                    
                    {/* Example tags */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {examples.map((example: string) => (
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
        );
      })}
    </div>
  );
}
