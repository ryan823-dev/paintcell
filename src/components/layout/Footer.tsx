import { Link } from "react-router-dom";

const footerLinks = {
  solutions: [
    { name: "Paint Cells", href: "/paint-cells" },
    { name: "Applications", href: "/applications" },
    { name: "Case Studies", href: "/case-studies" },
  ],
  resources: [
    { name: "Engineering Library", href: "/resources/engineering-library" },
    { name: "Standards & Compliance", href: "/resources/standards-compliance" },
    { name: "Glossary", href: "/resources/glossary" },
    { name: "Tools & Templates", href: "/resources/tools-templates" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/quote" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground">
                <span className="text-lg font-bold text-primary">P</span>
              </div>
              <span className="text-xl font-semibold">PaintCell</span>
            </Link>
            <p className="text-primary-foreground/70 max-w-md text-sm leading-relaxed">
              Professional robotic spray painting workstations engineered for quality, 
              throughput, and operational excellence. Transform your paint operations 
              with industrial automation.
            </p>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold mb-4">Solutions</h3>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <p className="text-sm text-primary-foreground/50 text-center">
            © {new Date().getFullYear()} PaintCell. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
