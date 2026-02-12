import { Link } from "react-router-dom";
import tdLogo from "@/assets/td-logo.png";
import { useI18n } from "@/i18n";

export function Footer() {
  const { t } = useI18n();

  const footerLinks = {
    solutions: [
      { name: t.footer.paintCells, href: "/paint-cells" },
      { name: t.footer.applications, href: "/applications" },
      { name: t.footer.caseStudies, href: "/case-studies" },
    ],
    resources: [
      { name: t.footer.engineeringLibrary, href: "/resources/engineering-library" },
      { name: t.footer.standardsCompliance, href: "/resources/standards-compliance" },
      { name: t.footer.glossary, href: "/resources/glossary" },
      { name: t.footer.toolsTemplates, href: "/resources/tools-templates" },
    ],
    company: [
      { name: t.footer.about, href: "/about" },
      { name: t.footer.contact, href: "/quote" },
      { name: t.footer.privacyPolicy, href: "/privacy" },
      { name: t.footer.termsOfUse, href: "/terms" },
      { name: t.footer.cookiePolicy, href: "/cookies" },
    ],
  };

  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 flex flex-col">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img src={tdLogo} alt="TDPaintCell Logo" className="h-8 w-8 rounded-lg object-cover" />
              <span className="text-lg font-semibold text-heading">PaintCell</span>
            </Link>
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed mb-5">
              {t.footer.tagline}
            </p>
            <div className="text-xs leading-relaxed space-y-1 mb-5">
              <p className="text-muted-foreground">{t.footer.email}</p>
              <p className="text-muted-foreground">{t.footer.response}</p>
              <p className="text-muted-foreground">{t.footer.hours}</p>
            </div>
            <p className="text-muted-foreground/60 text-xs mt-auto">
              {t.footer.location}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-heading text-xs uppercase tracking-wider">{t.footer.solutions}</h3>
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
            <h3 className="font-semibold mb-4 text-heading text-xs uppercase tracking-wider">{t.footer.resources}</h3>
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
            <h3 className="font-semibold mb-4 text-heading text-xs uppercase tracking-wider">{t.footer.company}</h3>
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

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground/60 text-center">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
