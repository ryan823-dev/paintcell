import { useState, useCallback, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Menu, X, Sparkles, ChevronDown, Factory, Bot, Droplets, Wrench, Users, Settings, Car, Refrigerator, HardDrive, FileText, BookOpen, Layers } from "lucide-react";
import tdLogo from "@/assets/td-logo.png";
import { useI18n } from "@/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface NavItem {
  name: string;
  nameZh?: string;
  href: string;
  icon?: typeof Factory;
  description?: string;
}

interface NavGroup {
  name: string;
  href?: string;
  items?: NavItem[];
  columns?: { title: string; items: NavItem[] }[];
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();
  const { t, locale } = useI18n();

  // Mega Menu structure
  const megaMenuItems: NavGroup[] = [
    {
      name: "Solutions",
      columns: [
        {
          title: "Turnkey Projects",
          items: [
            { name: "Turnkey Painting Shops", nameZh: "整体涂装车间", href: "/solutions/turnkey-painting-shop", icon: Factory, description: "Complete painting shop solutions" },
            { name: "Robotic Workstations", nameZh: "机器人工作站", href: "/paint-cells", icon: Bot, description: "Integrated painting cells" },
            { name: "Paint Supply Systems", nameZh: "输调漆系统", href: "/solutions/paint-supply-systems", icon: Droplets, description: "Centralized supply & mixing" },
            { name: "Paint Process Flow", nameZh: "工艺流程", href: "/solutions/paint-process-flow", icon: Layers, description: "Complete coating line stages" },
          ],
        },
        {
          title: "By Application",
          items: [
            { name: "Auto Body Painting", href: "/solutions/auto-body-painting", description: "Vehicle body coating lines" },
            { name: "Parts Painting", href: "/solutions/parts-painting", description: "Component finishing systems" },
            { name: "Industrial Coating", href: "/solutions/industrial-coating", description: "Heavy equipment & machinery" },
            { name: "View All Solutions", href: "/solutions", description: "Browse all solutions & capabilities" },
          ],
        },
      ],
    },
    {
      name: "Products",
      columns: [
        {
          title: "Spray Equipment",
          items: [
            { name: "Rotary Bells", nameZh: "旋杯", href: "/products/rotary-bells", icon: Settings, description: "High-speed electrostatic atomizers" },
            { name: "Spray Guns", nameZh: "喷枪", href: "/products/spray-guns", description: "HVLP & air spray guns" },
            { name: "Paint Pumps", nameZh: "供漆泵", href: "/products/paint-pumps", description: "Diaphragm & piston pumps" },
          ],
        },
        {
          title: "Systems & Parts",
          items: [
            { name: "Control Systems", nameZh: "控制系统", href: "/products/control-systems", description: "PLC & robot controllers" },
            { name: "Spare Parts", nameZh: "备件", href: "/products/spare-parts", description: "Replacement components" },
            { name: "All Products", href: "/products", description: "Browse full catalog" },
          ],
        },
      ],
    },
    {
      name: "Services",
      columns: [
        {
          title: "Engineering Services",
          items: [
            { name: "Solution Design", nameZh: "方案设计", href: "/services/solution-design", icon: FileText, description: "Planning & engineering" },
            { name: "Project Management", nameZh: "项目管理", href: "/services/project-management", description: "End-to-end delivery" },
            { name: "Commissioning", nameZh: "工艺调试", href: "/services/commissioning", description: "Setup & optimization" },
          ],
        },
        {
          title: "Support Services",
          items: [
            { name: "Maintenance", nameZh: "维修维护", href: "/services/maintenance", icon: Wrench, description: "Preventive & corrective" },
            { name: "Training", nameZh: "培训服务", href: "/services/training", icon: Users, description: "Operator & technician training" },
            { name: "All Services", href: "/services", description: "View all services" },
          ],
        },
      ],
    },
  ];

  const simpleNavItems = [
    { name: t.nav.industries, href: "/industries" },
    { name: "Case Studies", href: "/case-studies" },
    { name: t.nav.knowledge, href: "/resources/engineering-library" },
  ];

  const isActive = (href: string) => {
    // Strip locale prefix from pathname for comparison
    const path = location.pathname.replace(new RegExp(`^/${locale}`), "") || "/";
    if (href === "/") return path === "/";
    return path.startsWith(href);
  };

  const handleLogoClick = useCallback((e: React.MouseEvent) => {
    const path = location.pathname.replace(new RegExp(`^/${locale}`), "") || "/";
    if (path === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.dispatchEvent(new CustomEvent("reset-homepage"));
    }
  }, [location.pathname, locale]);

  const handleDropdownEnter = (name: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(name);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <nav className="flex h-14 items-center">
        <Link to="/" className="flex items-center gap-3 shrink-0 pl-4 pr-6" onClick={handleLogoClick}>
          <img src={tdLogo} alt="TDPaintCell Logo" className="h-9 w-9 rounded-lg object-cover" />
          <span className="text-xl md:text-2xl font-bold tracking-tight text-heading leading-none">
            TD Painting Systems
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-medium text-accent/80 bg-accent/10 border border-accent/20 rounded-full px-2 py-0.5">
            <Sparkles className="h-2.5 w-2.5" />
            AI
          </span>
        </Link>

        <div className="flex-1" />

        {/* Desktop Navigation with Mega Menu */}
        <div className="hidden lg:flex lg:items-center lg:gap-0.5 pr-2">
          {/* Mega Menu Items */}
          {megaMenuItems.map((group) => (
            <div
              key={group.name}
              className="relative"
              onMouseEnter={() => handleDropdownEnter(group.name)}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                className={`flex items-center gap-1 px-3 py-1.5 text-sm font-medium transition-colors rounded-md ${
                  activeDropdown === group.name
                    ? "text-accent bg-accent/10"
                    : "text-body hover:text-heading hover:bg-muted"
                }`}
              >
                {group.name}
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${activeDropdown === group.name ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Panel */}
              {activeDropdown === group.name && group.columns && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="bg-background border border-border rounded-xl shadow-xl p-4 min-w-[480px]">
                    <div className="grid grid-cols-2 gap-6">
                      {group.columns.map((column) => (
                        <div key={column.title}>
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2 px-2">
                            {column.title}
                          </p>
                          <div className="space-y-0.5">
                            {column.items.map((item) => (
                              <Link
                                key={item.href}
                                to={item.href}
                                className="flex items-start gap-3 px-2 py-2 rounded-lg hover:bg-muted transition-colors group"
                                onClick={() => setActiveDropdown(null)}
                              >
                                {item.icon && (
                                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                                    <item.icon className="h-4 w-4 text-accent" />
                                  </div>
                                )}
                                <div className={item.icon ? "" : "pt-0.5"}>
                                  <div className="text-sm font-medium text-foreground leading-tight">
                                    {item.name}
                                  </div>
                                  {item.description && (
                                    <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                                  )}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Simple Nav Items */}
          {simpleNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`px-3 py-1.5 text-sm font-medium transition-colors rounded-md ${
                isActive(item.href)
                  ? "text-accent bg-accent/10"
                  : "text-body hover:text-heading hover:bg-muted"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <LanguageSwitcher />
        </div>

        {/* Medium screens - simplified nav */}
        <div className="hidden md:flex lg:hidden md:items-center md:gap-1 pr-2">
          {[
            { name: "Solutions", href: "/solutions" },
            { name: "Products", href: "/products" },
            { name: "Services", href: "/services" },
            ...simpleNavItems,
          ].map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`px-2.5 py-1.5 text-xs font-medium transition-colors rounded-md ${
                isActive(item.href)
                  ? "text-accent bg-accent/10"
                  : "text-body hover:text-heading hover:bg-muted"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <LanguageSwitcher />
        </div>

        {/* Mobile: language + menu */}
        <div className="md:hidden flex items-center gap-1 pr-2">
          <LanguageSwitcher />
          <button
            type="button"
            className="p-2 text-body hover:text-heading"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background max-h-[80vh] overflow-y-auto">
          <div className="py-4 space-y-4">
            {/* Mega Menu Groups */}
            {megaMenuItems.map((group) => (
              <div key={group.name} className="px-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  {group.name}
                </p>
                <div className="space-y-1">
                  {group.columns?.flatMap((col) => col.items).map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors text-body hover:text-heading hover:bg-muted"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.icon && (
                        <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                          <item.icon className="h-3.5 w-3.5 text-accent" />
                        </div>
                      )}
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Simple Nav Items */}
            <div className="px-4 pt-2 border-t border-border">
              {simpleNavItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.href)
                      ? "text-accent bg-accent/10"
                      : "text-body hover:text-heading hover:bg-muted"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
