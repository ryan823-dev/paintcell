import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import tdLogo from "@/assets/td-logo.png";

const navigation = [
  { name: "Products", href: "/paint-cells" },
  { name: "Applications", href: "/applications" },
  { name: "Knowledge", href: "/resources/engineering-library" },
  { name: "Console", href: "/console" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <nav className="flex h-14 items-center">
        {/* Logo — aligned with sidebar width */}
        <Link to="/" className="flex items-center gap-3 shrink-0 pl-4 pr-6">
          <img 
            src={tdLogo} 
            alt="TDPaintCell Logo" 
            className="h-9 w-9 rounded-lg object-cover"
          />
          <span className="text-2xl md:text-3xl font-bold tracking-tight text-heading leading-none">
            Painting System
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-medium text-accent/80 bg-accent/10 border border-accent/20 rounded-full px-2 py-0.5">
            <Sparkles className="h-2.5 w-2.5" />
            AI
          </span>
        </Link>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-1 pr-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
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
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden p-2 text-body hover:text-heading"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container-wide py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
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
