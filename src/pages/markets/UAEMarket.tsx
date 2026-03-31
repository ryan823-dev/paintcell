import { ResourcePageLayout } from "@/components/resources";
import { ContentSection } from "@/components/resources";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/i18n/context";
import { Factory, Building, Sun, Globe, CheckCircle, TrendingUp, Shield } from "lucide-react";

export default function UAEMarketPage() {
  const { t, locale } = useI18n();
  const isZh = locale === "zh-CN";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Industrial Robotic Paint Booth Systems for UAE & Middle East | TD Painting Systems",
    "description": "Premium robotic spray painting automation for UAE, Saudi Arabia, and Gulf region. Meeting GCC standards and supporting industrial diversification under Vision 2030.",
    "inLanguage": "en",
    "about": {
      "@type": "Thing",
      "name": "Industrial Paint Automation for UAE",
      "description": "Robotic painting solutions for Middle East industrial diversification"
    }
  };

  return (
    <ResourcePageLayout
      title="Industrial Robotic Paint Automation for UAE & Middle East"
      metaTitle="Robotic Paint Booth UAE | Industrial Coating Systems Middle East"
      metaDescription="Premium robotic spray painting automation for UAE and Gulf region. Complete turnkey solutions meeting GCC standards, supporting industrial diversification under Vision 2030 with international quality certification."
      breadcrumbs={[
        { label: "Solutions", href: "/solutions" },
        { label: "Global Markets" },
        { label: "Middle East" },
      ]}
      structuredData={structuredData}
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="h-8 w-8 text-primary" />
          <Badge variant="outline">Middle East Market</Badge>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Robotic Paint Automation for UAE & Gulf Industry
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Supporting the Middle East's industrial diversification journey, TD Painting Systems
          delivers premium robotic painting solutions designed for GCC manufacturing requirements,
          extreme climate considerations, and international quality standards.
        </p>
      </div>

      {/* Regional Context */}
      <ContentSection title="Gulf Industrial Transformation">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Vision 2030 Opportunity
            </h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <span>Saudi Arabia and UAE investing heavily in manufacturing diversification beyond oil</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <span>Growing automotive sector with new assembly plants and component manufacturing</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <span>HVAC, construction, and infrastructure creating demand for protective coatings</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <span>Premium quality expectations from regional markets require advanced automation</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              Key Industry Sectors
            </h3>
            <div className="space-y-3">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium">Automotive Assembly & Components</h4>
                <p className="text-sm text-muted-foreground mt-1">New OEM plants and supplier networks requiring modern coating systems</p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium">HVAC & Refrigeration</h4>
                <p className="text-sm text-muted-foreground mt-1">Desert climate drives massive demand for air conditioning equipment coating</p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium">Construction & Infrastructure</h4>
                <p className="text-sm text-muted-foreground mt-1">Structural steel, aluminum, and architectural metal finishing</p>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Regional Considerations */}
      <ContentSection title="Addressing Middle East Challenges">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <Sun className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="font-semibold mb-2">Climate Considerations</h3>
            <p className="text-sm text-muted-foreground">
              Extreme temperatures and desert conditions require robust booth climate control and equipment designed for challenging environments.
            </p>
          </div>
          <div className="border rounded-lg p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">GCC Standards Compliance</h3>
            <p className="text-sm text-muted-foreground">
              Meeting regional quality standards and certifications required for government and infrastructure projects.
            </p>
          </div>
          <div className="border rounded-lg p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Globe className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Export Quality</h3>
            <p className="text-sm text-muted-foreground">
              Regional manufacturers often export to international markets requiring documented quality systems and traceability.
            </p>
          </div>
        </div>
      </ContentSection>

      {/* Solutions */}
      <ContentSection title="Premium Solutions for Gulf Industry">
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="font-semibold mb-4">Climate-Ready Systems</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Enhanced booth insulation and climate control for 50°C+ ambient conditions</li>
                <li>• Robust ventilation systems maintaining consistent booth environment</li>
                <li>• Equipment rated for demanding industrial environments</li>
                <li>• Reduced maintenance intervals for remote locations</li>
                <li>• Remote monitoring capabilities for reduced service calls</li>
              </ul>
            </div>
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="font-semibold mb-4">Quality & Documentation</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Complete process documentation for GCC certification requirements</li>
                <li>• Full traceability from paint batch to finished product</li>
                <li>• Statistical process control and quality reporting</li>
                <li>• Integration with customer ERP and quality management systems</li>
                <li>• Third-party audit support and documentation</li>
              </ul>
            </div>
          </div>
          <div className="bg-primary/5 rounded-lg p-6">
            <h3 className="font-semibold mb-4">Service & Support</h3>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Remote Support Available</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">72h</div>
                <div className="text-sm text-muted-foreground">On-site Response</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">GCC</div>
                <div className="text-sm text-muted-foreground">Standards Compliant</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">EN/AR</div>
                <div className="text-sm text-muted-foreground">Documentation Languages</div>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Regional Experience */}
      <ContentSection title="Regional Expertise">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-blue-200 rounded-lg flex items-center justify-center shrink-0">
              <Factory className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Middle East Industrial Experience</h3>
              <p className="text-muted-foreground mb-4">
                TD Painting Systems understands the unique requirements of Middle East manufacturing.
                Our solutions are designed for the region's climate, quality expectations, and
                operational requirements. We provide complete turnkey solutions with local support
                coordination and international quality standards.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">GCC Quality Standards</Badge>
                <Badge variant="outline">Climate-Ready Design</Badge>
                <Badge variant="outline">Turnkey Solutions</Badge>
                <Badge variant="outline">Multi-language Support</Badge>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* CTA */}
      <div className="bg-primary text-primary-foreground rounded-xl p-8 text-center mt-8">
        <h2 className="text-2xl font-bold mb-4">Partner for Gulf Region Excellence</h2>
        <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-6">
          Discuss your manufacturing requirements with our regional team.
          We deliver solutions that meet Middle East quality standards and business practices.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/quote" className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors">
            Request Consultation
          </a>
          <a href="/industries/automotive-painting" className="bg-primary-foreground/20 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-foreground/30 transition-colors">
            View Industry Solutions
          </a>
        </div>
      </div>
    </ResourcePageLayout>
  );
}
