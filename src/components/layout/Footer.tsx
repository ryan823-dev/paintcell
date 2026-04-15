import { LocalizedLink as Link } from "@/components/LocalizedLink";
import tdLogo from "@/assets/td-logo.png";
import { useSiteShellContent } from "@/hooks/useSiteShellContent";

export function Footer() {
  const footerT = useSiteShellContent().footer;

  const footerLinks = {
    solutions: [
      { name: footerT.paintCells, href: "/paint-cells" },
      { name: footerT.applications, href: "/applications" },
      { name: footerT.caseStudies, href: "/case-studies" },
    ],
    resources: [
      { name: footerT.engineeringLibrary, href: "/resources/engineering-library" },
      { name: footerT.standardsCompliance, href: "/resources/standards-compliance" },
      { name: footerT.glossary, href: "/resources/glossary" },
      { name: footerT.toolsTemplates, href: "/resources/tools-templates" },
    ],
    company: [
      { name: footerT.about, href: "/about" },
      { name: footerT.industries, href: "/industries" },
      { name: footerT.solutionsPage, href: "/solutions" },
    ],
    legal: [
      { name: footerT.privacyPolicy, href: "/privacy" },
      { name: footerT.termsOfUse, href: "/terms" },
      { name: footerT.cookiePolicy, href: "/cookies" },
    ],
  };

  return (
    <footer className="border-t border-border section-dark">
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 flex flex-col">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img src={tdLogo} alt="TDPaintCell Logo" className="h-8 w-8 rounded-lg object-cover" />
              <span className="text-lg font-semibold text-white">{footerT.brandName || "Painting Systems"}</span>
            </Link>
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed mb-5">
              {footerT.tagline}
            </p>
            <div className="text-xs leading-relaxed space-y-1 mb-5">
              <p className="text-muted-foreground">{footerT.email}</p>
              <p className="text-muted-foreground">{footerT.response}</p>
              <p className="text-muted-foreground">{footerT.hours}</p>
            </div>
            <p className="text-white/30 text-xs mt-auto">
              {footerT.location}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white text-xs uppercase tracking-wider">{footerT.solutions}</h3>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white text-xs uppercase tracking-wider">{footerT.resources}</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white text-xs uppercase tracking-wider">{footerT.company}</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            {footerT.copyright}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {footerLinks.legal.map((link, i) => (
              <span key={link.href} className="flex items-center gap-4">
                <Link to={link.href} className="text-xs text-white/30 hover:text-white/60 transition-colors">
                  {link.name}
                </Link>
                {i < footerLinks.legal.length - 1 && <span className="text-white/15 hidden sm:inline">·</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
