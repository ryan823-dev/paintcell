import { ResourcePageLayout, AnswerBox } from "@/components/resources";
import { ContentSection } from "@/components/resources";
import { Helmet } from "react-helmet-async";
export default function WheelCoatingApplications() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": "Aluminum Wheel Coating Automation Solutions",
        "description": "Robotic spray painting systems for aluminum wheel coating, including electrostatic bell applications, color change systems, and quality optimization.",
        "inLanguage": "en",
    };
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What equipment is used for aluminum wheel coating?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Aluminum wheel coating typically uses electrostatic rotary bells combined with automatic spray guns. Bells are used for high-speed, high-efficiency primer and basecoat application, paired with AGMD automatic color change systems for multi-color production. Reciprocators or robots carry the spray equipment for uniform coverage on complex geometries."
                }
            },
            {
                "@type": "Question",
                "name": "What is the color change time for wheel coating?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Modern wheel coating lines typically achieve color change times of 15-30 seconds. Using AGMD (Automatic Color Change Module) systems enables rapid color changes, with dual-purge systems minimizing paint waste. Quick color change is critical for multi-color wheel production lines, directly impacting production efficiency and paint consumption costs."
                }
            },
            {
                "@type": "Question",
                "name": "What are the advantages of electrostatic bells in wheel coating?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Advantages of electrostatic bells in wheel coating include: 1) Transfer efficiency of 85-95%, significantly reducing paint consumption; 2) Wraparound effect covers spoke backs and inner cavities; 3) High rotational speed (10,000-60,000 RPM) produces uniform film build; 4) Suitable for high-speed production lines, increasing capacity."
                }
            }
        ]
    };
    const breadcrumbs = [
        { label: "Engineering Library", href: "/resources/engineering-library" },
        { label: "Applications" },
        { label: "Wheel Coating" }
    ];
    // Customer references
    const customerReferences = [
        { name: "BBS", location: "Germany (Herbolzheim)", coating: "Water-borne", equipment: "Aerobell + AGMD" },
        { name: "Borbet", location: "Germany (Bad Langensalza)", coating: "Water-borne", equipment: "Aerobell + AGMD" },
        { name: "RONAL", location: "Poland (Jelcz Laskowice)", coating: "Solvent-borne", equipment: "Aerobell + Reciprocator" },
        { name: "ATS-Stahlschmidt", location: "Germany (Bad Dürkheim)", coating: "Water-borne", equipment: "Aerobell + Reciprocator" },
        { name: "AEZ", location: "Germany (Siegburg)", coating: "Solvent-borne", equipment: "Aerobell + AGMD" },
        { name: "Alcoa", location: "USA (Ohio, Pennsylvania)", coating: "Solvent-borne", equipment: "RMA-202 Robot" }
    ];
    return (<ResourcePageLayout title={"Aluminum Wheel Coating Automation Solutions"} metaTitle={"Aluminum Wheel Coating | Automated Spray Systems"} metaDescription={"Automated aluminum wheel coating solutions: electrostatic bell application, automatic color change systems, and quality control for automotive wheel manufacturers."} breadcrumbs={breadcrumbs} structuredData={structuredData}>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <AnswerBox>
        {"Aluminum wheel coating is a critical application in automotive parts finishing. Due to the complex geometry of wheels (including spokes, rim, and center bore), manual spray application struggles to achieve uniform coverage. Automated spray systems use electrostatic rotary bells with robots or reciprocators, achieving high transfer efficiency (85-95%) and consistent film quality. Modern wheel coating lines typically use water-borne paints, paired with AGMD automatic color change systems for multi-color production."}
      </AnswerBox>

      <ContentSection title={"Process Overview"}>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {"A typical aluminum wheel coating line includes the following process steps:"}
        </p>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li>{"Pretreatment (degreasing, chrome or chrome-free conversion)"}</li>
          <li>{"Primer application (powder or liquid primer)"}</li>
          <li>{"Primer bake"}</li>
          <li>{"Basecoat + Clearcoat application"}</li>
          <li>{"Final cure"}</li>
          <li>{"Cooling and inspection"}</li>
        </ol>
      </ContentSection>

      <ContentSection title={"Electrostatic Bell Application"}>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {"The electrostatic rotary bell (Aerobell) is the core equipment for wheel coating. A high-speed rotating bell cup (typically 400-600mm diameter) generates centrifugal force that atomizes paint into uniform droplets, while electrostatic charge attracts paint particles to the grounded wheel surface."}
        </p>
        <div className="bg-muted/30 rounded-lg p-4">
          <h4 className="font-semibold mb-2">{"Key Technical Parameters"}</h4>
          <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
            <li>• {"Bell speed: 10,000-60,000 RPM"}</li>
            <li>• {"Electrostatic voltage: 60-90 kV"}</li>
            <li>• {"Transfer efficiency: 85-95%"}</li>
            <li>• {"Flow rate: 100-500 ml/min"}</li>
          </ul>
        </div>
      </ContentSection>

      <ContentSection title={"Automatic Color Change Systems"}>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {"Wheel manufacturers typically produce products in multiple colors, making rapid color change systems essential. AGMD (Automatic Gun Module with Dosage) systems integrate spray guns, color change valves, and metering pumps, achieving color change times of 15-30 seconds."}
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="font-semibold mb-2">{"Dual Purge System"}</h4>
            <p className="text-sm text-muted-foreground">
              {"Uses alternating solvent and air purging to minimize paint waste. Cleaning sequences can be optimized for different colors and paint types."}
            </p>
          </div>
          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="font-semibold mb-2">{"Paint Recovery"}</h4>
            <p className="text-sm text-muted-foreground">
              {"Paint displaced during color changes can be recovered and reused, further reducing material costs and environmental impact."}
            </p>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={"Customer References"}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-3 font-medium">Customer</th>
                <th className="text-left py-2 px-3 font-medium">Location</th>
                <th className="text-left py-2 px-3 font-medium">Coating Type</th>
                <th className="text-left py-2 px-3 font-medium">Equipment</th>
              </tr>
            </thead>
            <tbody>
              {customerReferences.map((customer, i) => (<tr key={i} className="border-b border-muted/50">
                  <td className="py-2 px-3 font-medium">{customer.name}</td>
                  <td className="py-2 px-3 text-muted-foreground">{customer.location}</td>
                  <td className="py-2 px-3 text-muted-foreground">{customer.coating}</td>
                  <td className="py-2 px-3 text-muted-foreground">{customer.equipment}</td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </ContentSection>

      <ContentSection title={"Water-Borne Paint Trends"}>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {"With increasingly stringent environmental regulations, more wheel manufacturers are transitioning to water-borne paints. Key considerations for water-borne application include:"}
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>{"Temperature/humidity control: Optimal range 20-25°C, 50-70% RH"}</li>
          <li>{"Flash-off time: Water-borne paints require longer flash-off times"}</li>
          <li>{"Equipment materials: Stainless steel or special coatings required to prevent corrosion"}</li>
          <li>{"Cleaning procedures: Water-borne cleaning differs from solvent-borne"}</li>
        </ul>
      </ContentSection>

      <ContentSection title={"Quality Optimization"}>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">{"Common Defects and Solutions"}</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• {"Orange peel: Adjust atomizing air and flow rate"}</li>
              <li>• {"Runs/sags: Reduce film build or increase flash temperature"}</li>
              <li>• {"Pinholes: Check film build and bake profile"}</li>
              <li>• {"Color variation: Calibrate color matching and spray parameters"}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">{"Process Monitoring"}</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• {"Online film thickness measurement"}</li>
              <li>• {"Automated color measurement"}</li>
              <li>• {"Appearance inspection (robot vision)"}</li>
              <li>• {"Coating adhesion testing"}</li>
            </ul>
          </div>
        </div>
      </ContentSection>
    </ResourcePageLayout>);
}
