import { Target, Box, FolderOpen, BookOpen, FileText, MessageSquare, Factory, Layers, CheckCircle2, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { id: "ai-consultation", icon: MessageSquare, label: "AI Consultation", action: "open-assistant" },
  { id: "industry-entry", icon: Factory, label: "Applications", anchor: "#industry-entry" },
  { id: "core-capabilities", icon: CheckCircle2, label: "Capabilities", anchor: "#core-capabilities" },
  { id: "system-overview", icon: Box, label: "System Architecture", anchor: "#system-overview" },
  { id: "deployment-process", icon: Layers, label: "Deployment", anchor: "#deployment-process" },
  { id: "why-robotic-painting", icon: Target, label: "Why Automation", anchor: "#why-robotic-painting" },
  { id: "project-references", icon: FolderOpen, label: "References", anchor: "#project-references" },
  { id: "faq", icon: HelpCircle, label: "FAQ", anchor: "#faq" },
  { id: "engineering-library", icon: BookOpen, label: "Engineering Library", href: "/resources/engineering-library" },
  { id: "request-quote", icon: FileText, label: "Request a Quote", href: "/quote" },
];

interface HomeSidebarProps {
  activeItem?: string;
  onItemClick?: (id: string) => void;
}

export function HomeSidebar({ activeItem = "ai-consultation", onItemClick }: HomeSidebarProps) {
  const handleClick = (item: typeof sidebarItems[0]) => {
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
          Navigation
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
              <span className="font-medium">{item.label}</span>
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
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-accent">Online</span>
          </div>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            AI agent ready for project consultation
          </p>
        </div>
      </div>
    </aside>
  );
}
