import { ResourcePageLayout } from "@/components/resources";
import { ContentSection } from "@/components/resources";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/i18n/context";
import { Factory, Users, Zap, Globe, CheckCircle, TrendingUp, Shield } from "lucide-react";

export default function ThailandMarketPage() {
  const { t, locale } = useI18n();
  const isZh = locale === "zh-CN";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Robotic Paint Booth Automation for Thailand Industry 4.0 | TD Painting Systems",
    "description": "Industrial robotic spray painting systems supporting Thailand's automotive and electronics manufacturing growth under Industry 4.0 initiative.",
    "inLanguage": "en",
    "about": {
      "@type": "Thing",
      "name": "Industrial Paint Automation for Thailand",
      "description": "Robotic painting solutions for Thailand manufacturing"
    }
  };

  return (
    <ResourcePageLayout
      title="Robotic Paint Booth Automation for Thailand Manufacturing"
      metaTitle="Industrial Paint Automation Thailand | Robotic Spray Painting Systems"
      metaDescription="Industrial robotic spray painting systems for Thailand's automotive, electronics, and industrial manufacturing. Complete turnkey solutions supporting Thailand 4.0 initiative with local engineering support."
      breadcrumbs={[
        { label: "Solutions", href: "/solutions" },
        { label: "Global Markets" },
        {label: "Thailand" },
      ]}
      structuredData={structuredData}
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="h-8 w-8 text-primary" />
          <Badge variant="outline">Southeast Asia Market</Badge>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Robotic Paint Automation for Thailand 4.0
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Supporting Thailand's transition to high-value manufacturing, TD Painting Systems
          delivers robotic painting solutions that meet international quality standards while
          addressing regional cost and labor considerations.
        </p>
      </div>

      {/* Market Context */}
      <ContentSection title="Thailand Manufacturing Landscape">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Thailand 4.0 Opportunity
            </h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <span>Thailand is Southeast Asia's largest automotive manufacturer, producing over 1.8 million vehicles annually</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <span>Government Thailand 4.0 initiative promotes automation and high-value manufacturing</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <span>Eastern Economic Corridor (EEC) attracting significant FDI in advanced manufacturing</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <span>Strong automotive supply chain with Japanese, Chinese, and Thai OEMs</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Factory className="h-5 w-5 text-primary" />
              Key Industry Sectors
            </h3>
            <div className="space-y-3">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium">Automotive OEM & Tier 1</h4>
                <p className="text-sm text-muted-foreground mt-1">Body panels, interior components, under-hood parts - high volume, strict quality requirements</p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium">Electronics & Appliances</h4>
                <p className="text-sm text-muted-foreground mt-1">Air conditioners, refrigerators, consumer electronics - export-focused production</p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium">Agriculture Machinery</h4>
                <p className="text-sm text-muted-foreground mt-1">Tractors, harvesters, irrigation equipment - protective coating requirements</p>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Industry Challenges */}
      <ContentSection title="Addressing Industry Challenges">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="font-semibold mb-2">Skilled Workforce</h3>
            <p className="text-sm text-muted-foreground">
              Labor shortages and rising wages in automotive manufacturing regions. Robotic automation reduces headcount while improving consistency.
            </p>
          </div>
          <div className="border rounded-lg p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Quality Compliance</h3>
            <p className="text-sm text-muted-foreground">
              Meeting Japanese automotive standards (JIS) and global OEM specifications requires precise process control and full documentation.
            </p>
          </div>
          <div className="border rounded-lg p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Export Competitiveness</h3>
            <p className="text-sm text-muted-foreground">
              Competing with Vietnamese and Indonesian manufacturing requires improved efficiency and reduced per-unit costs.
            </p>
          </div>
        </div>
      </ContentSection>

      {/* Solutions for Thailand */}
      <ContentSection title="Solutions Designed for Thai Industry">
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="font-semibold mb-4">Automotive Solutions</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• High-speed robotic cells for body panel and component coating</li>
                <li>• Electrostatic rotary bell systems for Class A finish quality</li>
                <li>• Fast color change systems for multi-model production</li>
                <li>• Full process documentation for OEM quality audits</li>
                <li>• Integration with existing conveyor systems</li>
              </ul>
            </div>
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="font-semibold mb-4">Electronics & Appliance Solutions</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• High-efficiency HVLP systems for decorative finishes</li>
                <li>• Water-based coating support for environmental compliance</li>
                <li>• Compact cell designs for space-constrained facilities</li>
                <li>• Quick changeover for high-mix production</li>
                <li>• Energy-efficient designs reducing operating costs</li>
              </ul>
            </div>
          </div>
          <div className="bg-primary/5 rounded-lg p-6">
            <h3 className="font-semibold mb-4">Support & Implementation</h3>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">8+</div>
                <div className="text-sm text-muted-foreground">Regional Projects Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">20+</div>
                <div className="text-sm text-muted-foreground">Local Partner Integrators</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">48h</div>
                <div className="text-sm text-muted-foreground">Response Time Support</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Documentation Provided</div>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Regional Credibility */}
      <ContentSection title="Regional Experience">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-blue-200 rounded-lg flex items-center justify-center shrink-0">
              <Factory className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Thailand & ASEAN Paint Automation Track Record</h3>
              <p className="text-muted-foreground mb-4">
                TD Painting Systems has successfully delivered robotic painting systems across
                Southeast Asia, with extensive experience supporting Japanese automotive
                manufacturers and their Tier 1 suppliers operating in Thailand. Our solutions
                meet the rigorous quality standards demanded by international OEMs.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Japanese OEM Standards</Badge>
                <Badge variant="outline">EEC Experience</Badge>
                <Badge variant="outline">Automotive Quality Systems</Badge>
                <Badge variant="outline">Multi-language Support</Badge>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* CTA */}
      <div className="bg-primary text-primary-foreground rounded-xl p-8 text-center mt-8">
        <h2 className="text-2xl font-bold mb-4">Transform Your Paint Operation</h2>
        <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-6">
          Connect with our engineering team to discuss your automation requirements.
          We provide detailed feasibility studies and competitive solutions for the Thai market.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/quote" className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors">
            Request Feasibility Study
          </a>
          <a href="/industries/automotive-painting" className="bg-primary-foreground/20 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-foreground/30 transition-colors">
            View Automotive Solutions
          </a>
        </div>
      </div>
    </ResourcePageLayout>
  );
}
