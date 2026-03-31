import { ResourcePageLayout } from "@/components/resources";
import { ContentSection } from "@/components/resources";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/i18n/context";
import { Factory, Users, Zap, Globe, CheckCircle, TrendingUp } from "lucide-react";

export default function VietnamMarketPage() {
  const { t, locale } = useI18n();
  const isZh = locale === "zh-CN";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Robotic Paint Booth Automation for Vietnam Manufacturing | TD Painting Systems",
    "description": "Industrial robotic spray painting systems designed for Vietnam's growing automotive and electronics manufacturing sector. Turnkey solutions with local support.",
    "inLanguage": "en",
    "about": {
      "@type": "Thing",
      "name": "Industrial Paint Automation for Vietnam",
      "description": "Robotic painting solutions for Vietnam manufacturing"
    }
  };

  return (
    <ResourcePageLayout
      title="Robotic Paint Booth Automation for Vietnam Manufacturing"
      metaTitle="Industrial Paint Automation Vietnam | Robotic Spray Painting Systems"
      metaDescription="Industrial robotic spray painting systems for Vietnam's automotive, electronics, and appliance manufacturing. Complete turnkey solutions with local engineering support and competitive pricing."
      breadcrumbs={[
        { label: "Solutions", href: "/solutions" },
        { label: "Global Markets" },
        { label: "Vietnam" },
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
          Robotic Paint Automation Solutions for Vietnam
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          As Vietnam emerges as a manufacturing hub for automotive components and electronics,
          TD Painting Systems delivers turnkey robotic painting solutions designed for
          Vietnamese industrial requirements and global quality standards.
        </p>
      </div>

      {/* Market Opportunity */}
      <ContentSection title="Vietnam Manufacturing Opportunity">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Market Drivers
            </h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <span>Vietnam FDI inflows exceeded $18B in 2023, with major investments in automotive and electronics sectors</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <span>Japanese and Korean automotive suppliers (Toyota, Hyundai, VinFast) expanding local production</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <span>Electronics manufacturing cluster in Bac Ninh, Vinh Phuc, and Hai Phong growing rapidly</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <span>Labor costs rising 8-12% annually, driving automation investment</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Factory className="h-5 w-5 text-primary" />
              Target Industries
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium">Automotive Components</h4>
                <p className="text-sm text-muted-foreground mt-1">Brackets, housings, interior parts for OEMs and tier suppliers</p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium">Electronics</h4>
                <p className="text-sm text-muted-foreground mt-1">Appliance enclosures, consumer electronics housings</p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium">Motorcycle Parts</h4>
                <p className="text-sm text-muted-foreground mt-1">High-volume two-wheeler component finishing</p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium">Hardware & Fixtures</h4>
                <p className="text-sm text-muted-foreground mt-1">Bathroom fixtures, furniture hardware, metal parts</p>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Localized Challenges */}
      <ContentSection title="Addressing Vietnam Manufacturing Challenges">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="font-semibold mb-2">Skilled Labor Shortage</h3>
            <p className="text-sm text-muted-foreground">
              Finding and retaining skilled spray painters is increasingly difficult. Our automated systems reduce dependency on specialized labor while maintaining consistent quality.
            </p>
          </div>
          <div className="border rounded-lg p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Production Efficiency</h3>
            <p className="text-sm text-muted-foreground">
              International competition requires improved throughput and consistency. Our robotic systems deliver 2-3x productivity improvement over manual processes.
            </p>
          </div>
          <div className="border rounded-lg p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Global Quality Standards</h3>
            <p className="text-sm text-muted-foreground">
              Export markets demand consistent finish quality and documentation. Automated systems provide traceability and repeatable results meeting international specifications.
            </p>
          </div>
        </div>
      </ContentSection>

      {/* Solution Approach */}
      <ContentSection title="Our Vietnam Market Approach">
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="font-semibold mb-4">Cost-Effective Solutions</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Modular systems scalable from single robot to full production lines</li>
                <li>• Flexible financing options for capital equipment</li>
                <li>• Energy-efficient designs reducing operational costs</li>
                <li>• High transfer efficiency minimizing paint consumption</li>
              </ul>
            </div>
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="font-semibold mb-4">Local Support Network</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Vietnamese-speaking engineering support team</li>
                <li>• Regional spare parts inventory in Ho Chi Minh City</li>
                <li>• Remote monitoring and troubleshooting capabilities</li>
                <li>• On-site training and documentation in Vietnamese</li>
              </ul>
            </div>
          </div>
          <div className="bg-primary/5 rounded-lg p-6">
            <h3 className="font-semibold mb-4">Typical Project Scope</h3>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">2-4</div>
                <div className="text-sm text-muted-foreground">Weeks Feasibility Study</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">12-20</div>
                <div className="text-sm text-muted-foreground">Weeks Implementation</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">150-400</div>
                <div className="text-sm text-muted-foreground">Parts/Hour Capacity</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">15-24</div>
                <div className="text-sm text-muted-foreground">Months to ROI</div>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Case Reference */}
      <ContentSection title="Regional Experience">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-blue-200 rounded-lg flex items-center justify-center shrink-0">
              <Factory className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Asia-Pacific Paint Automation Track Record</h3>
              <p className="text-muted-foreground mb-4">
                TD Painting Systems has delivered robotic painting solutions across Asia-Pacific,
                including projects in China, Thailand, Indonesia, and Malaysia. Our experience with
                Japanese automotive standards and Korean manufacturing practices ensures solutions
                that meet your international customers' requirements.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge>ABB/FANUC/Yaskawa Integration</Badge>
                <Badge>ISO 9001 Quality Systems</Badge>
                <Badge>Multi-language Documentation</Badge>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* CTA */}
      <div className="bg-primary text-primary-foreground rounded-xl p-8 text-center mt-8">
        <h2 className="text-2xl font-bold mb-4">Ready to Automate Your Paint Operation?</h2>
        <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-6">
          Discuss your production requirements with our engineering team.
          We provide feasibility assessments and budget proposals tailored to Vietnam market conditions.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/quote" className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors">
            Request Feasibility Study
          </a>
          <a href="/industries/automotive-painting" className="bg-primary-foreground/20 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-foreground/30 transition-colors">
            View Industry Solutions
          </a>
        </div>
      </div>
    </ResourcePageLayout>
  );
}
