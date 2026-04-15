import { useState, useCallback, useRef, useEffect, type MouseEvent } from "react";
import { useLocation } from "react-router-dom";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import {
  Menu,
  X,
  Sparkles,
  ChevronDown,
  Factory,
  Bot,
  Droplets,
  Wrench,
  Users,
  Settings,
  FileText,
  Layers,
} from "lucide-react";
import tdLogo from "@/assets/td-logo.png";
import { useRouteLocale } from "@/hooks/useRouteLocale";
import { useSiteShellContent } from "@/hooks/useSiteShellContent";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface NavItem {
  name: string;
  href: string;
  icon?: typeof Factory;
  description?: string;
}

interface NavColumn {
  title: string;
  items: NavItem[];
}

interface NavGroup {
  name: string;
  columns: NavColumn[];
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();
  const locale = useRouteLocale();
  const shell = useSiteShellContent();
  const headerT = shell.header;
  const headerMenus = headerT.menus || {};
  const solutionMenu = headerMenus.solutions || {};
  const productMenu = headerMenus.products || {};
  const serviceMenu = headerMenus.services || {};
  const brandName = headerT.brandName || "";
  const aiBadge = headerT.aiBadge || "";

  const megaMenuItems: NavGroup[] = [
    {
      name: shell.nav.solutions,
      columns: [
        {
          title: headerT.turnkeyProjects || "",
          items: [
            {
              name: solutionMenu.turnkeyPaintingShops?.title || "",
              href: "/solutions/turnkey-painting-shop",
              icon: Factory,
              description: solutionMenu.turnkeyPaintingShops?.description || "",
            },
            {
              name: solutionMenu.roboticWorkstations?.title || "",
              href: "/paint-cells",
              icon: Bot,
              description: solutionMenu.roboticWorkstations?.description || "",
            },
            {
              name: solutionMenu.paintSupplySystems?.title || "",
              href: "/solutions/paint-supply-systems",
              icon: Droplets,
              description: solutionMenu.paintSupplySystems?.description || "",
            },
            {
              name: solutionMenu.paintProcessFlow?.title || "",
              href: "/solutions/paint-process-flow",
              icon: Layers,
              description: solutionMenu.paintProcessFlow?.description || "",
            },
          ],
        },
        {
          title: headerT.byApplication || "",
          items: [
            {
              name: solutionMenu.autoBodyPainting?.title || "",
              href: "/solutions/auto-body-painting",
              description: solutionMenu.autoBodyPainting?.description || "",
            },
            {
              name: solutionMenu.partsPainting?.title || "",
              href: "/solutions/parts-painting",
              description: solutionMenu.partsPainting?.description || "",
            },
            {
              name: solutionMenu.industrialCoating?.title || "",
              href: "/solutions/industrial-coating",
              description: solutionMenu.industrialCoating?.description || "",
            },
            {
              name: solutionMenu.viewAllSolutions?.title || "",
              href: "/solutions",
              description: solutionMenu.viewAllSolutions?.description || "",
            },
          ],
        },
      ],
    },
    {
      name: shell.nav.products,
      columns: [
        {
          title: productMenu.sprayEquipment || "",
          items: [
            {
              name: productMenu.rotaryBells?.title || "",
              href: "/products/rotary-bells",
              icon: Settings,
              description: productMenu.rotaryBells?.description || "",
            },
            {
              name: productMenu.sprayGuns?.title || "",
              href: "/products/spray-guns",
              description: productMenu.sprayGuns?.description || "",
            },
            {
              name: productMenu.paintPumps?.title || "",
              href: "/products/paint-pumps",
              description: productMenu.paintPumps?.description || "",
            },
          ],
        },
        {
          title: productMenu.systemsAndParts || "",
          items: [
            {
              name: productMenu.controlSystems?.title || "",
              href: "/products/control-systems",
              description: productMenu.controlSystems?.description || "",
            },
            {
              name: productMenu.spareParts?.title || "",
              href: "/products/spare-parts",
              description: productMenu.spareParts?.description || "",
            },
            {
              name: productMenu.allProducts?.title || "",
              href: "/products",
              description: productMenu.allProducts?.description || "",
            },
          ],
        },
      ],
    },
    {
      name: shell.nav.services,
      columns: [
        {
          title: headerT.engineeringServices || "",
          items: [
            {
              name: serviceMenu.solutionDesign?.title || "",
              href: "/services/solution-design",
              icon: FileText,
              description: serviceMenu.solutionDesign?.description || "",
            },
            {
              name: serviceMenu.projectManagement?.title || "",
              href: "/services/project-management",
              description: serviceMenu.projectManagement?.description || "",
            },
            {
              name: serviceMenu.commissioning?.title || "",
              href: "/services/commissioning",
              description: serviceMenu.commissioning?.description || "",
            },
          ],
        },
        {
          title: headerT.supportServices || "",
          items: [
            {
              name: serviceMenu.maintenance?.title || "",
              href: "/services/maintenance",
              icon: Wrench,
              description: serviceMenu.maintenance?.description || "",
            },
            {
              name: serviceMenu.training?.title || "",
              href: "/services/training",
              icon: Users,
              description: serviceMenu.training?.description || "",
            },
            {
              name: serviceMenu.allServices?.title || "",
              href: "/services",
              description: serviceMenu.allServices?.description || "",
            },
          ],
        },
      ],
    },
  ];

  const simpleNavItems = [
    { name: shell.nav.industries, href: "/industries" },
    { name: shell.nav.caseStudies, href: "/case-studies" },
    { name: shell.nav.videos, href: "/videos" },
    { name: shell.nav.knowledge, href: "/resources/engineering-library" },
  ];

  const isActive = (href: string) => {
    const path = location.pathname.replace(new RegExp(`^/${locale}`), "") || "/";
    if (href === "/") return path === "/";
    return path.startsWith(href);
  };

  const handleLogoClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      const path = location.pathname.replace(new RegExp(`^/${locale}`), "") || "/";
      if (path === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.dispatchEvent(new CustomEvent("reset-homepage"));
      }
    },
    [location.pathname, locale],
  );

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
          <img src={tdLogo} alt={`${brandName} logo`} className="h-9 w-9 rounded-lg object-cover" />
          <span className="text-xl md:text-2xl font-bold tracking-tight text-heading leading-none">
            {brandName}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-accent/20 bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent/80">
            <Sparkles className="h-2.5 w-2.5" />
            {aiBadge}
          </span>
        </Link>

        <div className="flex-1" />

        <div className="hidden lg:flex lg:items-center lg:gap-0.5 pr-2">
          {megaMenuItems.map((group) => (
            <div
              key={group.name}
              className="relative"
              onMouseEnter={() => handleDropdownEnter(group.name)}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeDropdown === group.name
                    ? "bg-accent/10 text-accent"
                    : "text-body hover:bg-muted hover:text-heading"
                }`}
              >
                {group.name}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${
                    activeDropdown === group.name ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeDropdown === group.name && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="min-w-[480px] rounded-xl border border-border bg-background p-4 shadow-xl">
                    <div className="grid grid-cols-2 gap-6">
                      {group.columns.map((column) => (
                        <div key={column.title}>
                          <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            {column.title}
                          </p>
                          <div className="space-y-0.5">
                            {column.items.map((item) => (
                              <Link
                                key={item.href}
                                to={item.href}
                                className="group flex items-start gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted"
                                onClick={() => setActiveDropdown(null)}
                              >
                                {item.icon ? (
                                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 transition-colors group-hover:bg-accent/20">
                                    <item.icon className="h-4 w-4 text-accent" />
                                  </div>
                                ) : null}
                                <div className={item.icon ? "" : "pt-0.5"}>
                                  <div className="text-sm font-medium leading-tight text-foreground">
                                    {item.name}
                                  </div>
                                  {item.description ? (
                                    <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>
                                  ) : null}
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

          {simpleNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-accent/10 text-accent"
                  : "text-body hover:bg-muted hover:text-heading"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <LanguageSwitcher />
        </div>

        <div className="hidden md:flex lg:hidden md:items-center md:gap-1 pr-2">
          {[
            { name: shell.nav.solutions, href: "/solutions" },
            { name: shell.nav.products, href: "/products" },
            { name: shell.nav.services, href: "/services" },
            ...simpleNavItems,
          ].map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-accent/10 text-accent"
                  : "text-body hover:bg-muted hover:text-heading"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <LanguageSwitcher />
        </div>

        <div className="flex items-center gap-1 pr-2 md:hidden">
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

      {mobileMenuOpen ? (
        <div className="max-h-[80vh] overflow-y-auto border-t border-border bg-background md:hidden">
          <div className="space-y-4 py-4">
            {megaMenuItems.map((group) => (
              <div key={group.name} className="px-4">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {group.name}
                </p>
                <div className="space-y-1">
                  {group.columns.flatMap((column) => column.items).map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-body transition-colors hover:bg-muted hover:text-heading"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.icon ? (
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                          <item.icon className="h-3.5 w-3.5 text-accent" />
                        </div>
                      ) : null}
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div className="border-t border-border px-4 pt-2">
              {simpleNavItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-accent/10 text-accent"
                      : "text-body hover:bg-muted hover:text-heading"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
