import { Link } from "react-router-dom";
import tdLogo from "@/assets/td-logo.png";
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
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Use", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
};
export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="md:col-span-2 flex flex-col">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img src={tdLogo} alt="TDPaintCell Logo" className="h-8 w-8 rounded-lg object-cover" />
              <span className="text-lg font-semibold text-heading">PaintCell</span>
            </Link>
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed mb-5">
              AI-powered robotic spray painting project interface. 
              Engineering assessment, feasibility analysis, and project initialization.
            </p>
            <div className="text-xs leading-relaxed space-y-1 mb-5">
              <p className="text-muted-foreground">Email: engineering@tdpaintcell.com</p>
              <p className="text-muted-foreground">Response: Engineering review within 1–2 business days.</p>
              <p className="text-muted-foreground">Hours: Mon–Fri, GMT+8</p>
            </div>
            <p className="text-muted-foreground/60 text-xs mt-auto">
              Location: Shanghai, China
            </p>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold mb-4 text-heading text-xs uppercase tracking-wider">Solutions</h3>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4 text-heading text-xs uppercase tracking-wider">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-heading text-xs uppercase tracking-wider">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground/60 text-center">
            © 2026 TDPaintCell. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
