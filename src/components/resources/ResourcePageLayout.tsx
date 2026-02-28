import { ReactNode, useEffect } from "react";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ResourcePageLayoutProps {
  title: string;
  metaTitle: string;
  metaDescription: string;
  breadcrumbs: BreadcrumbItem[];
  children: ReactNode;
  showCTA?: boolean;
  structuredData?: object;
}

export function ResourcePageLayout({
  title,
  metaTitle,
  metaDescription,
  breadcrumbs,
  children,
  showCTA = true,
  structuredData,
}: ResourcePageLayoutProps) {
  useEffect(() => {
    document.title = metaTitle;
    const metaDescEl = document.querySelector('meta[name="description"]');
    if (metaDescEl) {
      metaDescEl.setAttribute("content", metaDescription);
    }

    // Add structured data
    if (structuredData) {
      const existingScript = document.querySelector('script[data-page-schema]');
      if (existingScript) {
        existingScript.remove();
      }
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-page-schema", "true");
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
      
      return () => {
        script.remove();
      };
    }
  }, [metaTitle, metaDescription, structuredData]);

  const handleConsultationClick = () => {
    const assistantButton = document.querySelector('[data-assistant-trigger]');
    if (assistantButton instanceof HTMLElement) {
      assistantButton.click();
    }
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-muted/30">
        <div className="container-wide py-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {breadcrumbs.map((item, index) => (
                <BreadcrumbItem key={index}>
                  <BreadcrumbSeparator />
                  {item.href ? (
                    <BreadcrumbLink asChild>
                      <Link to={item.href}>{item.label}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Content */}
      <div className="container-narrow py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
          {title}
        </h1>
        
        <div className="prose prose-slate max-w-none">
          {children}
        </div>

        {/* CTA Block */}
        {showCTA && (
          <div className="mt-16 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleConsultationClick}
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
              >
                Start a project consultation
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
              <Button asChild variant="outline">
                <Link to="/quote">Configure your paint cell</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
