import { ResourcePageLayout, AnswerBox } from "@/components/resources";
import { ContentSection } from "@/components/resources";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
export default function ElectrostaticBellAtomizers() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": "Electrostatic Rotary Bell Atomizers for High-Efficiency Paint Application",
        "description": "Technical guide to electrostatic rotary bell atomizers combining centrifugal atomization with electrostatic charging for superior transfer efficiency.",
        "inLanguage": "en",
    };
    return (<ResourcePageLayout title={"Electrostatic Rotary Bell / Disc Atomizers"} metaTitle={"Electrostatic Rotary Bell Atomizers | High-Efficiency Coating"} metaDescription={"Learn how electrostatic rotary bell atomization technology combines centrifugal atomization with electrostatic charging for superior transfer efficiency."} breadcrumbs={[
            { label: "Engineering Library", href: "/resources/engineering-library" },
            { label: "Equipment" },
            { label: "Electrostatic Bells" }
        ]} structuredData={structuredData}>
      <AnswerBox>
        {"Electrostatic rotary bell atomizer systems combine rotary bell centrifugal atomization technology with electrostatic charging. Coating material is flung off the edge of a high-speed rotating bell to form fine mist, while simultaneously being charged through corona discharge or induction charging. Charged coating particles are attracted to grounded workpiece surfaces, achieving higher transfer efficiency (typically 85-95%) and excellent edge wrap-around coverage."}
      </AnswerBox>

      {/* Terminology Section */}
      <ContentSection title={"US vs EU Terminology"}>
        <div className="bg-muted/30 rounded-lg p-4 mb-6">
          <p className="text-sm text-muted-foreground">
            {"Electrostatic bells have regional naming variations important for SEO optimization:"}
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{"Concept"}</TableHead>
              <TableHead>{"US English"}</TableHead>
              <TableHead>{"EU English"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{"Electrostatic rotary bell"}</TableCell>
              <TableCell>Electrostatic rotary bell, Charged bell atomizer</TableCell>
              <TableCell>Electrostatic disc atomizer, Charged rotary cup</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{"Rotary bell / cup"}</TableCell>
              <TableCell>Rotary bell, Bell cup, Atomizing disc</TableCell>
              <TableCell>Rotary cup, Spray disc, Atomizing cup</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{"Electrostatic charging"}</TableCell>
              <TableCell>Electrostatic charging, Corona charging</TableCell>
              <TableCell>Electrostatic atomization, Induction charging</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{"Transfer efficiency"}</TableCell>
              <TableCell>Transfer efficiency, Material utilization</TableCell>
              <TableCell>Transfer rate, Coating efficiency, Utilization factor</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{"Wrap-around effect"}</TableCell>
              <TableCell>Wrap-around, Back spray coverage</TableCell>
              <TableCell>Edge coverage, Enveloping effect, Turnaround coverage</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ContentSection>

      <ContentSection title={"Operating Principle"}>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">1</span>
            </div>
            <div>
              <h4 className="font-medium">{"Centrifugal Atomization"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {"Coating is fed through internal passages to the center of a high-speed rotating bell (15,000-60,000 RPM). Centrifugal force flings the material toward the bell edge, forming uniform fine mist. Bell speed determines droplet size: higher speed produces finer particles."}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">2</span>
            </div>
            <div>
              <h4 className="font-medium">{"Electrostatic Charging"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {"Atomized particles receive an electrical charge as they leave the bell edge through corona discharge (high-voltage electrode) or induction charging (bell itself charged). Charging method affects coating compatibility: corona charging works with all coating types, induction charging only with conductive coatings."}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">3</span>
            </div>
            <div>
              <h4 className="font-medium">{"Electrostatic Deposition"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {"Charged particles are attracted by the electric field at workpiece surfaces, preferentially depositing on edges and backsides facing the field. This wrap-around effect is the core advantage of electrostatic spraying, especially for workpieces with complex geometries."}
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={"Technical Advantages"}>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-green-600">{"High Transfer Efficiency"}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {"Transfer efficiency up to 85-95%"}</li>
              <li>• {"Significant paint waste reduction"}</li>
              <li>• {"Lower overspray handling costs"}</li>
              <li>• {"Reduced VOC emissions"}</li>
            </ul>
          </div>
          <div className="border rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-green-600">{"Excellent Wrap-Around"}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {"Coverage on backsides and recesses"}</li>
              <li>• {"Reduced masking operations"}</li>
              <li>• {"Uniform edge coverage"}</li>
              <li>• {"Improved first-pass coverage"}</li>
            </ul>
          </div>
          <div className="border rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-green-600">{"Coating Quality"}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {"Uniform atomization, fine particles"}</li>
              <li>• {"Smooth finish, minimal orange peel"}</li>
              <li>• {"Uniform film thickness distribution"}</li>
              <li>• {"Suitable for high-quality appearance"}</li>
            </ul>
          </div>
          <div className="border rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-green-600">{"Environmental Compliance"}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {"30-50% paint consumption reduction"}</li>
              <li>• {"Reduced solvent usage"}</li>
              <li>• {"Less hazardous waste generation"}</li>
              <li>• {"Easier regulatory compliance"}</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={"Performance Specifications"}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{"Parameter"}</TableHead>
              <TableHead>{"Typical Range"}</TableHead>
              <TableHead>{"Description"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">{"Bell Speed"}</TableCell>
              <TableCell>15,000 - 60,000 RPM</TableCell>
              <TableCell className="text-muted-foreground">{"Determines droplet size"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Electrostatic Voltage"}</TableCell>
              <TableCell>60 - 100 kV DC</TableCell>
              <TableCell className="text-muted-foreground">{"Typical for corona charging"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Transfer Efficiency"}</TableCell>
              <TableCell>85 - 95%</TableCell>
              <TableCell className="text-muted-foreground">{"Under ideal conditions"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Droplet Size"}</TableCell>
              <TableCell>20 - 80 μm</TableCell>
              <TableCell className="text-muted-foreground">{"Depends on viscosity and bell speed"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Max Flow Rate"}</TableCell>
              <TableCell>200 - 1000 ml/min</TableCell>
              <TableCell className="text-muted-foreground">{"Depends on bell size and coating"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Spray Width"}</TableCell>
              <TableCell>150 - 400 mm</TableCell>
              <TableCell className="text-muted-foreground">{"Depends on bell size and shaping air"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ContentSection>

      <ContentSection title={"Application Areas"}>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Automotive OEM</Badge>
            <h4 className="font-medium text-sm">{"Automotive OEM Finishing"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {"Automated primer, basecoat, and clearcoat application"}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Automotive Components</Badge>
            <h4 className="font-medium text-sm">{"Automotive Components"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {"Bumpers, dashboards, door panels, plastic parts"}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Appliances</Badge>
            <h4 className="font-medium text-sm">{"Appliance Finishing"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {"Refrigerator, washer, air conditioner enclosures"}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Garden Equipment</Badge>
            <h4 className="font-medium text-sm">{"Garden & Power Equipment"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {"Lawn mowers, garden tools, metal and plastic parts"}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Furniture</Badge>
            <h4 className="font-medium text-sm">{"Furniture Manufacturing"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {"Metal furniture, office furniture powder and liquid coating"}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Architectural</Badge>
            <h4 className="font-medium text-sm">{"Architectural Products"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {"Aluminum windows, railings, curtain walls"}
            </p>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={"Key Considerations"}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-amber-800">{"Applicability Limitations"}</h4>
            <ul className="space-y-2 text-sm text-amber-900">
              <li>• {"Faraday cage effect: reduced coverage in deep recesses"}</li>
              <li>• {"Requires good grounding: poor grounding affects performance"}</li>
              <li>• {"Insulating coating limitations: some coatings unsuitable"}</li>
              <li>• {"Safety requirements: explosion-proof equipment needed"}</li>
            </ul>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-blue-800">{"Selection Points"}</h4>
            <ul className="space-y-2 text-sm text-blue-900">
              <li>• {"Bell size: determines spray width and flow rate"}</li>
              <li>• {"Charging method: select based on coating type"}</li>
              <li>• {"Color change speed: requirements for quick-change"}</li>
              <li>• {"Maintenance interval: bearing life and replacement cycle"}</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={"Related Resources"}>
        <div className="grid md:grid-cols-2 gap-4">
          <a href="/resources/glossary/electrostatic-spray" className="block p-4 border rounded-lg hover:border-primary/50 transition-colors">
            <h4 className="font-medium">{"Electrostatic Spraying Glossary"}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {"Definitions of electrostatic spraying terminology"}
            </p>
          </a>
          <a href="/resources/knowledge/robot-path-optimization" className="block p-4 border rounded-lg hover:border-primary/50 transition-colors">
            <h4 className="font-medium">{"Robot Path Optimization"}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {"Programming tips for electrostatic bell robots"}
            </p>
          </a>
        </div>
      </ContentSection>
    </ResourcePageLayout>);
}
