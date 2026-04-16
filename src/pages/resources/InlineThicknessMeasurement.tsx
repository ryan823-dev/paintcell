import { ResourcePageLayout, AnswerBox } from "@/components/resources";
import { ContentSection } from "@/components/resources";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
export default function InlineThicknessMeasurement() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": "Inline Thickness Measurement for Robotic Spray Painting",
        "description": "Technical guide to inline thickness measurement systems for real-time coating quality control in automated spray painting.",
        "inLanguage": "en",
    };
    return (<ResourcePageLayout title={"Inline Coating Thickness Measurement"} metaTitle={"Inline Thickness Measurement | Real-Time Coating Quality Control"} metaDescription={"Learn how inline thickness measurement systems enable real-time monitoring during spray application for improved coating quality control."} breadcrumbs={[
            { label: "Engineering Library", href: "/resources/engineering-library" },
            { label: "Quality Control" },
            { label: "Inline Measurement" }
        ]} structuredData={structuredData}>
      <AnswerBox>
        {"Inline thickness measurement systems use non-contact measurement technologies to monitor coating thickness in real-time during the spray process. These systems integrate laser triangulation, X-ray, or eddy current sensors to achieve continuous monitoring of dry film thickness (DFT) or wet film thickness (WFT), providing immediate feedback for process parameter adjustments and enabling closed-loop quality control."}
      </AnswerBox>

      <ContentSection title={"Technology Overview"}>
        <p className="text-muted-foreground leading-relaxed">
          {"Inline thickness measurement is a critical component of modern automated coating production lines. Unlike traditional offline inspection (sampling after coating), inline measurement monitors coating thickness in real-time during production, enabling timely deviation detection and adjustment to ensure consistent product quality."}
        </p>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="border rounded-lg p-5">
            <h4 className="font-semibold mb-3">{"Dry Film Measurement (DFT)"}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {"X-ray Fluorescence (XRF)"}</li>
              <li>• {"Eddy Current Method"}</li>
              <li>• {"Beta-ray Backscatter"}</li>
              <li>• {"Magnetic Method (steel substrates only)"}</li>
            </ul>
          </div>
          <div className="border rounded-lg p-5">
            <h4 className="font-semibold mb-3">{"Wet Film Measurement (WFT)"}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {"Laser Triangulation"}</li>
              <li>• {"Confocal Sensors"}</li>
              <li>• {"Interferometry"}</li>
              <li>• {"Contact Wheel Gauge"}</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={"X-ray Fluorescence (XRF) Technology"}>
        <p className="text-muted-foreground leading-relaxed">
          {"X-ray fluorescence is the most common method for measuring coating thickness on metal substrates. The system emits X-rays to excite atoms in the coating material. When atoms return to ground state, they release characteristic X-rays. By detecting the energy and intensity of these rays, the coating type and thickness can be calculated. This method offers high accuracy (up to ±1μm) and is suitable for various metal substrates."}
        </p>

        <div className="bg-muted/30 rounded-lg p-5 mt-4">
          <h4 className="font-medium mb-3">{"XRF System Components"}</h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium">{"X-ray Source"}</p>
              <p className="text-xs text-muted-foreground">{"Miniaturized X-ray tube or isotope source"}</p>
            </div>
            <div>
              <p className="text-sm font-medium">{"Detector"}</p>
              <p className="text-xs text-muted-foreground">{"Silicon Drift Detector (SDD) or proportional counter"}</p>
            </div>
            <div>
              <p className="text-sm font-medium">{"Analysis Unit"}</p>
              <p className="text-xs text-muted-foreground">{"Real-time signal processing and thickness calculation"}</p>
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={"System Integration"}>
        <p className="text-muted-foreground leading-relaxed">
          {"Inline thickness measurement systems require close integration with production line control systems, including robotic spray systems, PLC controllers, and MES systems. A typical integration architecture is as follows:"}
        </p>

        <div className="space-y-4 mt-6">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">1</span>
            </div>
            <div>
              <h4 className="font-medium">{"Sensor Mounting Position"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {"Sensors are installed downstream of the spray station, ensuring adequate flash time for the coating. Mounting position must consider workpiece geometry, conveyor speed, and measurement window time."}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">2</span>
            </div>
            <div>
              <h4 className="font-medium">{"Data Acquisition and Processing"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {"Measurement data is transmitted to the controller in real-time, compared with target thickness, and deviation values are calculated. High-speed sampling (up to 1000 points/sec) ensures measurement coverage of the entire workpiece surface."}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">3</span>
            </div>
            <div>
              <h4 className="font-medium">{"Closed-Loop Feedback Control"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {"Deviation signals feedback to the spray system, automatically adjusting gun flow rate, pattern width, or robot trajectory to achieve automatic film thickness control. This closed-loop control can significantly improve film thickness uniformity."}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">4</span>
            </div>
            <div>
              <h4 className="font-medium">{"Data Logging and Traceability"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {"All measurement data is recorded and stored, supporting batch traceability and SPC statistical analysis. Meets strict traceability requirements in the automotive industry."}
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={"Performance Specifications"}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{"Parameter"}</TableHead>
              <TableHead>{"XRF DFT"}</TableHead>
              <TableHead>{"Laser WFT"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">{"Measurement Range"}</TableCell>
              <TableCell>1 - 500 μm</TableCell>
              <TableCell>5 - 500 μm</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Accuracy"}</TableCell>
              <TableCell>{"+/-1% or +/-1 um"}</TableCell>
              <TableCell>{"+/-2% or +/-2 um"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Repeatability"}</TableCell>
              <TableCell>{"+/-0.5 um (1 sigma)"}</TableCell>
              <TableCell>{"+/-1 um (1 sigma)"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Measurement Speed"}</TableCell>
              <TableCell>{"10 - 50 points/sec"}</TableCell>
              <TableCell>{"100 - 1000 points/sec"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Applicable Substrates"}</TableCell>
              <TableCell>{"Metal substrates"}</TableCell>
              <TableCell>{"All substrates"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Safety Requirements"}</TableCell>
              <TableCell>{"Radiation shielding"}</TableCell>
              <TableCell>{"Laser safety"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ContentSection>

      <ContentSection title={"Application Scenarios"}>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Automotive</Badge>
            <h4 className="font-medium text-sm">{"Automotive Body Painting"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {"100% inline inspection with real-time adjustment ensuring each vehicle meets specifications"}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Coil Coating</Badge>
            <h4 className="font-medium text-sm">{"Coil Coating"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {"High-speed continuous inspection, line speeds up to 200 m/min"}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Tubular Products</Badge>
            <h4 className="font-medium text-sm">{"Pipe and Tube Coating"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {"Rotary scanning measurement, 360° surface coverage"}
            </p>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={"Selection Criteria"}>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">{"Technical Considerations"}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {"Coating type and measurement range"}</li>
              <li>• {"Substrate material and geometry complexity"}</li>
              <li>• {"Line speed and measurement window"}</li>
              <li>• {"Measurement accuracy and repeatability requirements"}</li>
              <li>• {"Environmental conditions (temperature, vibration)"}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3">{"Integration Considerations"}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {"Communication protocol with existing PLC/control systems"}</li>
              <li>• {"Data interfaces (OPC UA, Profinet, EtherNet/IP)"}</li>
              <li>• {"MES/ERP system integration requirements"}</li>
              <li>• {"Maintenance and service support"}</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={"Related Resources"}>
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/resources/knowledge/paint-defects-guide" className="block p-4 border rounded-lg hover:border-primary/50 transition-colors">
            <h4 className="font-medium">{"Paint Defects Guide"}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {"Coating defects related to film thickness and solutions"}
            </p>
          </Link>
          <Link to="/resources/knowledge/paint-booth-design-basics" className="block p-4 border rounded-lg hover:border-primary/50 transition-colors">
            <h4 className="font-medium">{"Paint Booth Design Basics"}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {"Layout design considerations for inspection stations"}
            </p>
          </Link>
        </div>
      </ContentSection>
    </ResourcePageLayout>);
}
