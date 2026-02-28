import { useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import tdLogo from "@/assets/td-logo.png";
import { useI18n } from "@/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useI18n();

  const navigation = [
    { name: t.nav.industries, href: "/industries" },
    { name: t.nav.products, href: "/paint-cells" },
    { name: t.nav.applications, href: "/applications" },
    { name: t.nav.knowledge, href: "/resources/engineering-library" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const handleLogoClick = useCallback((e: React.MouseEvent) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.dispatchEvent(new CustomEvent("reset-homepage"));
    }
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <nav className="flex h-14 items-center">
        <Link to="/" className="flex items-center gap-3 shrink-0 pl-4 pr-6" onClick={handleLogoClick}>
          <img src={tdLogo} alt="TDPaintCell Logo" className="h-9 w-9 rounded-lg object-cover" />
          <span className="text-2xl md:text-3xl font-bold tracking-tight text-heading leading-none">
            Painting Systems
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-medium text-accent/80 bg-accent/10 border border-accent/20 rounded-full px-2 py-0.5">
            <Sparkles className="h-2.5 w-2.5" />
            AI
          </span>
        </Link>

        <div className="flex-1" />

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-1 pr-2">
          {navigation.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`px-3.5 py-1.5 text-sm font-medium transition-colors rounded-md ${
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

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container-wide py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`block px-4 py-3 text-base font-medium rounded-md transition-colors ${
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
      )}
    </header>
  );
}
