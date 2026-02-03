import { Link } from "react-router-dom";
import tdLogo from "@/assets/td-logo.png";
const footerLinks = {
  solutions: [{
    name: "Paint Cells",
    href: "/paint-cells"
  }, {
    name: "Applications",
    href: "/applications"
  }, {
    name: "Case Studies",
    href: "/case-studies"
  }],
  resources: [{
    name: "Engineering Library",
    href: "/resources/engineering-library"
  }, {
    name: "Standards & Compliance",
    href: "/resources/standards-compliance"
  }, {
    name: "Glossary",
    href: "/resources/glossary"
  }, {
    name: "Tools & Templates",
    href: "/resources/tools-templates"
  }],
  company: [{
    name: "About",
    href: "/about"
  }, {
    name: "Contact",
    href: "/quote"
  }, {
    name: "Privacy Policy",
    href: "/privacy"
  }, {
    name: "Terms of Use",
    href: "/terms"
  }, {
    name: "Cookie Policy",
    href: "/cookies"
  }]
};
export function Footer() {
  return <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="md:col-span-2 flex flex-col">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img 
                src={tdLogo} 
                alt="TDPaintCell Logo" 
                className="h-10 w-10 rounded-lg object-cover"
              />
              <span className="text-xl font-semibold text-primary-foreground">PaintCell</span>
            </Link>
            <p className="text-primary-foreground/70 max-w-md text-sm leading-relaxed mb-5">
              Professional robotic spray painting workstations engineered for quality, 
              throughput, and operational excellence. Transform your paint operations 
              with industrial automation.
            </p>
            
            {/* Contact & Trust */}
            <div className="text-xs leading-relaxed space-y-1 mb-5">
              <p className="text-primary-foreground/60">Email: engineering@tdpaintcell.com</p>
              <p className="text-primary-foreground/60">Response: Engineering review within 1–2 business days.</p>
              <p className="text-primary-foreground/60">Hours: Mon–Fri, GMT+8</p>
              <p className="text-primary-foreground/60">Engineering-led project assessment (not instant pricing).</p>
            </div>
            
            {/* Location */}
            <p className="text-primary-foreground/50 text-xs mt-auto">
              Location: Shanghai, China
            </p>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold mb-4 text-primary-foreground">Solutions</h3>
            <ul className="space-y-3">
              {footerLinks.solutions.map(link => <li key={link.name}>
                  <Link to={link.href} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4 text-primary-foreground">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map(link => <li key={link.name}>
                  <Link to={link.href} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-primary-foreground">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map(link => <li key={link.name}>
                  <Link to={link.href} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>)}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <p className="text-sm text-primary-foreground/50 text-center">
            © 2026 TDPaintCell. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
}