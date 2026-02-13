import { Target, Box, FolderOpen, BookOpen, FileText, MessageSquare, Factory, Layers, CheckCircle2, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n";

interface SidebarItem {
  id: string;
  icon: typeof MessageSquare;
  labelKey: string;
  action?: string;
  anchor?: string;
  href?: string;
}

const sidebarItems: SidebarItem[] = [
  { id: "ai-consultation", icon: MessageSquare, labelKey: "aiConsultation", action: "open-assistant" },
  { id: "industry-entry", icon: Factory, labelKey: "applications", anchor: "#industry-entry" },
  { id: "core-capabilities", icon: CheckCircle2, labelKey: "capabilities", anchor: "#core-capabilities" },
  { id: "system-overview", icon: Box, labelKey: "systemArchitecture", anchor: "#system-overview" },
  { id: "deployment-process", icon: Layers, labelKey: "deployment", anchor: "#deployment-process" },
  { id: "why-robotic-painting", icon: Target, labelKey: "whyAutomation", anchor: "#why-robotic-painting" },
  { id: "project-references", icon: FolderOpen, labelKey: "references", anchor: "#project-references" },
  { id: "faq", icon: HelpCircle, labelKey: "faq", anchor: "#faq" },
  { id: "engineering-library", icon: BookOpen, labelKey: "engineeringLibrary", href: "/resources/engineering-library" },
  { id: "request-quote", icon: FileText, labelKey: "requestQuote", href: "/quote" },
];

interface HomeSidebarProps {
  activeItem?: string;
  onItemClick?: (id: string) => void;
}

export function HomeSidebar({ activeItem = "ai-consultation", onItemClick }: HomeSidebarProps) {
  const { t } = useI18n();

  const handleClick = (item: SidebarItem) => {
    if (onItemClick) {
      onItemClick(item.id);
    }
    if (item.action === "open-assistant") {
      return;
    }
    if (item.anchor) {
      const el = document.querySelector(item.anchor);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (item.href) {
      window.location.href = item.href;
    }
  };

  return (
    <aside className="hidden lg:flex flex-col w-[220px] shrink-0 sticky top-[3.5rem] h-[calc(100vh-3.5rem)] border-r border-border bg-muted/50 z-20">
      <nav className="relative flex flex-col gap-0.5 p-4 pt-8 overflow-y-auto flex-1">
        <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-3 px-3">
          {t.sidebar.navigation}
        </p>
        {sidebarItems.map((item) => {
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item)}
              className={cn(
                "group flex items-center gap-3 px-3 py-2 rounded-lg text-[12px] transition-all duration-200 text-left relative",
                isActive
                  ? "text-heading bg-background shadow-sm"
                  : "text-muted-foreground hover:text-heading hover:bg-background/60"
              )}
            >
              <span className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 w-[2px] bg-accent rounded-r transition-all duration-200",
                isActive ? "h-4" : "h-0 group-hover:h-4"
              )} />
              <div className={cn(
                "w-6 h-6 rounded-md flex items-center justify-center transition-colors duration-200",
                isActive ? "bg-accent/15" : "bg-muted group-hover:bg-accent/10"
              )}>
                <item.icon className={cn(
                  "h-3 w-3 transition-colors duration-200",
                  isActive ? "text-accent" : "text-muted-foreground group-hover:text-accent"
                )} />
              </div>
              <span className="font-medium">{t.sidebar[item.labelKey]}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom tech decoration */}
      <div className="p-4">
        <div className="border border-border rounded-lg p-3 bg-background">
          <div className="flex items-center gap-2 mb-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-accent">{t.sidebar.online}</span>
          </div>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            {t.sidebar.aiReady}
          </p>
        </div>
      </div>
    </aside>
  );
}
