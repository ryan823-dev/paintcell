import { ResourcePageLayout, AnswerBox } from "@/components/resources";
import { ContentSection } from "@/components/resources";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
export default function VisionInspection() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": "Vision Inspection Systems for Paint Finish Quality Control",
        "description": "Comprehensive guide to automated vision inspection systems for detecting coating defects in robotic spray painting applications.",
        "inLanguage": "en",
    };
    return (<ResourcePageLayout title={"Vision Inspection for Paint Finish Quality Control"} metaTitle={"Vision Inspection Systems | Automated Paint Quality Control"} metaDescription={"Learn how automated vision inspection systems detect coating defects in robotic spray painting for improved quality control."} breadcrumbs={[
            { label: "Engineering Library", href: "/resources/engineering-library" },
            { label: "Quality Control" },
            { label: "Vision Inspection" }
        ]} structuredData={structuredData}>
      <AnswerBox>
        {"Vision inspection systems utilize high-resolution industrial cameras and advanced image processing algorithms to automatically identify and classify coating defects. These systems integrate into spray painting production lines to detect orange peel, sags, misses, and other defects in real-time, improving quality control efficiency and reducing manual inspection costs."}
      </AnswerBox>

      <ContentSection title={"System Overview"}>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-muted-foreground leading-relaxed">
            {"In modern industrial coating production, surface defect inspection is critical for ensuring product quality. Traditional visual inspection relies on manual patrol, which is not only inefficient but also prone to missed defects due to inspector fatigue. Vision inspection systems leverage automation technology to achieve high-precision, high-speed detection of coating surface defects."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="border rounded-lg p-5">
            <h4 className="font-semibold mb-3">{"Detection Capabilities"}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {"Orange peel defects"}</li>
              <li>• {"Sags and runs"}</li>
              <li>• {"Missed or insufficient coverage"}</li>
              <li>• {"Particles and foreign matter"}</li>
              <li>• {"Color variation"}</li>
              <li>• {"Gloss inconsistency"}</li>
            </ul>
          </div>
          <div className="border rounded-lg p-5">
            <h4 className="font-semibold mb-3">{"System Advantages"}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {"100% inline inspection"}</li>
              <li>• {"Consistent inspection criteria"}</li>
              <li>• {"Real-time defect classification"}</li>
              <li>• {"Full data traceability"}</li>
              <li>• {"MES system integration"}</li>
              <li>• {"Reduced labor costs"}</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={"Technical Architecture"}>
        <div className="space-y-4">
          <h4 className="font-medium">{"1. Image Acquisition Module"}</h4>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {"Industrial-grade high-resolution cameras paired with specialized optical lenses and illumination systems are used. Common configurations include line-scan cameras (for continuous production lines) and area-scan cameras (for discrete workpieces). Lighting schemes are selected based on the inspection object—coaxial, dark-field, or structured light—to achieve optimal defect contrast."}
          </p>

          <h4 className="font-medium mt-6">{"2. Image Processing Algorithms"}</h4>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {"Deep learning-based defect detection algorithms automatically learn and identify various defect types. Convolutional Neural Network (CNN) models trained on extensive defect sample libraries achieve classification accuracy exceeding manual inspection. Algorithms also incorporate surface texture analysis, color space conversion, and frequency domain analysis techniques."}
          </p>

          <h4 className="font-medium mt-6">{"3. System Integration"}</h4>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {"Vision inspection systems achieve seamless integration with PLCs, robot controllers, and MES systems through standard industrial protocols (Profinet, EtherNet/IP, OPC UA). Inspection results feed back to the spray system in real-time, supporting closed-loop quality control. Systems simultaneously generate detailed inspection reports supporting quality traceability and process optimization."}
          </p>
        </div>
      </ContentSection>

      <ContentSection title={"Performance Specifications"}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{"Parameter"}</TableHead>
              <TableHead>{"Typical Value"}</TableHead>
              <TableHead>{"Description"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">{"Detection Resolution"}</TableCell>
              <TableCell>0.05 - 0.2 mm</TableCell>
              <TableCell className="text-muted-foreground">{"Minimum detectable defect size"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Inspection Speed"}</TableCell>
              <TableCell>1 - 5 s/piece</TableCell>
              <TableCell className="text-muted-foreground">{"Per-part cycle time"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Detection Accuracy"}</TableCell>
              <TableCell>&gt; 95%</TableCell>
              <TableCell className="text-muted-foreground">{"Defect detection rate"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"False Positive Rate"}</TableCell>
              <TableCell>&lt; 5%</TableCell>
              <TableCell className="text-muted-foreground">{"Good parts incorrectly flagged"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Classification Accuracy"}</TableCell>
              <TableCell>&gt; 90%</TableCell>
              <TableCell className="text-muted-foreground">{"Correct defect type identification"}</TableCell>
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
              {"Class A surface inspection, 100% inspection of doors, hoods, and other exterior panels"}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Components</Badge>
            <h4 className="font-medium text-sm">{"Automotive Components"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {"Coating inspection for bumpers, mirrors, dashboards, and other plastic parts"}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Electronics</Badge>
            <h4 className="font-medium text-sm">{"Consumer Electronics"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {"Appearance quality inspection for phone cases, appliance panels, and other products"}
            </p>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={"Implementation Considerations"}>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">1</span>
            </div>
            <div>
              <h4 className="font-medium">{"Lighting Environment Control"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {"Inspection zones require stable lighting conditions to avoid ambient light interference. Dedicated inspection rooms or light-shielding enclosures ensure consistent illumination."}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">2</span>
            </div>
            <div>
              <h4 className="font-medium">{"Sample Library Development"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {"Develop a sample library covering all defect types and severity levels for algorithm training and validation. Samples should include coated surfaces in various colors and gloss levels."}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">3</span>
            </div>
            <div>
              <h4 className="font-medium">{"System Calibration and Maintenance"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {"Regular system calibration using standard reference panels ensures inspection accuracy. Camera cleaning, lens calibration, and light source replacement should be included in routine maintenance schedules."}
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={"Related Resources"}>
        <div className="grid md:grid-cols-2 gap-4">
          <a href="/resources/knowledge/paint-defects-guide" className="block p-4 border rounded-lg hover:border-primary/50 transition-colors">
            <h4 className="font-medium">{"Paint Defects Guide"}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {"Detailed guide on common coating defects, causes, and prevention measures"}
            </p>
          </a>
          <a href="/resources/knowledge/paint-booth-design-basics" className="block p-4 border rounded-lg hover:border-primary/50 transition-colors">
            <h4 className="font-medium">{"Paint Booth Design Basics"}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {"Paint booth design factors and their impact on coating quality"}
            </p>
          </a>
        </div>
      </ContentSection>
    </ResourcePageLayout>);
}
