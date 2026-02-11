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
    <aside className="hidden lg:flex flex-col w-[240px] shrink-0 border-r border-primary-foreground/8 h-full">
      <nav className="flex flex-col gap-0.5 p-3 pt-6">
        {sidebarItems.map((item) => (
          <button
            key={item.label}
            onClick={() => handleClick(item)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-primary-foreground/50 hover:text-primary-foreground hover:bg-primary-foreground/5 transition-colors text-left"
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
