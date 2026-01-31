import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Applications", href: "/applications" },
  { name: "Paint Cells", href: "/paint-cells" },
  { name: "Case Studies", href: "/case-studies" },
];

const resourcesLinks = [
  { name: "Engineering Library", href: "/resources/engineering-library" },
  { name: "Standards & Compliance", href: "/resources/standards-compliance" },
  { name: "Glossary", href: "/resources/glossary" },
  { name: "Tools & Templates", href: "/resources/tools-templates" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const isResourcesActive = location.pathname.startsWith("/resources");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <nav className="container-wide flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">P</span>
          </div>
          <span className="text-xl font-semibold text-foreground">PaintCell</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                isActive(item.href)
                  ? "text-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Resources Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`px-4 py-2 text-sm font-medium transition-colors rounded-md inline-flex items-center gap-1 ${
                  isResourcesActive
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                Resources
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {resourcesLinks.map((item) => (
                <DropdownMenuItem key={item.name} asChild>
                  <Link to={item.href} className="cursor-pointer">
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            to="/about"
            className={`px-4 py-2 text-sm font-medium transition-colors rounded-md ${
              isActive("/about")
                ? "text-primary bg-primary/5"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            About
          </Link>
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex md:items-center md:gap-4">
          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
            <Link to="/quote" className="flex items-center gap-2">
              Configure Paint Cell
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container-wide py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-4 py-3 text-base font-medium rounded-md transition-colors ${
                  isActive(item.href)
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Resources Section in Mobile */}
            <div className="pt-2 border-t border-border">
              <span className="block px-4 py-2 text-sm font-semibold text-foreground">
                Resources
              </span>
              {resourcesLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-4 py-3 pl-8 text-base font-medium rounded-md transition-colors ${
                    isActive(item.href)
                      ? "text-primary bg-primary/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <Link
              to="/about"
              className={`block px-4 py-3 text-base font-medium rounded-md transition-colors ${
                isActive("/about")
                  ? "text-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <div className="pt-4 border-t border-border">
              <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                <Link to="/quote" onClick={() => setMobileMenuOpen(false)}>
                  Configure Paint Cell
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
