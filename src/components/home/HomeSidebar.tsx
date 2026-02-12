import { Target, Box, FolderOpen, BookOpen, FileText, MessageSquare } from "lucide-react";

const sidebarItems = [
  { icon: Target, label: "Why Robotic Painting", anchor: "#why-robotic-painting" },
  { icon: Box, label: "Paint Cell Solution", anchor: "#system-overview" },
  { icon: FolderOpen, label: "Project References", anchor: "#project-references" },
  { icon: BookOpen, label: "Engineering Library", href: "/resources/engineering-library" },
  { icon: FileText, label: "Request a Quote", href: "/quote" },
  { icon: MessageSquare, label: "AI Consultation", action: "open-assistant" },
];

export function HomeSidebar() {
  const handleClick = (item: typeof sidebarItems[0]) => {
    if (item.action === "open-assistant") {
      const btn = document.querySelector('[data-assistant-trigger]') as HTMLButtonElement;
      if (btn) btn.click();
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
    <aside className="hidden lg:flex flex-col w-[220px] shrink-0 sticky top-[3.5rem] h-[calc(100vh-3.5rem)] border-r border-primary-foreground/8 bg-primary z-20">
      {/* Subtle tech pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary-foreground)) 0.5px, transparent 0.5px)`,
          backgroundSize: '20px 20px',
        }}
      />

      <nav className="relative flex flex-col gap-1 p-4 pt-8">
        <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-primary-foreground/20 mb-3 px-3">
          Navigation
        </p>
        {sidebarItems.map((item, index) => (
          <button
            key={item.label}
            onClick={() => handleClick(item)}
            className="group flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] text-primary-foreground/45 hover:text-primary-foreground hover:bg-primary-foreground/8 transition-all duration-200 text-left relative"
          >
            {/* Active indicator line */}
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 group-hover:h-5 bg-accent rounded-r transition-all duration-200" />
            <div className="w-7 h-7 rounded-md bg-primary-foreground/5 group-hover:bg-accent/15 flex items-center justify-center transition-colors duration-200">
              <item.icon className="h-3.5 w-3.5 group-hover:text-accent transition-colors duration-200" />
            </div>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom tech decoration */}
      <div className="mt-auto p-4">
        <div className="border border-primary-foreground/8 rounded-lg p-3 bg-primary-foreground/[0.02]">
          <div className="flex items-center gap-2 mb-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-accent/70">Online</span>
          </div>
          <p className="text-[10px] text-primary-foreground/25 leading-relaxed">
            AI agent ready for project consultation
          </p>
        </div>
      </div>
    </aside>
  );
}
