import { ResourcePageLayout, AnswerBox } from "@/components/resources";
import { ContentSection } from "@/components/resources";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
export default function ReciprocatorSpraySystems() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": "Reciprocating Sprayer Systems for Industrial Paint Applications",
        "description": "Comprehensive guide to reciprocating sprayer systems (oscillators) for automated industrial painting, including US and EU terminology variations.",
        "inLanguage": "en",
    };
    return (<ResourcePageLayout title={"Reciprocating Sprayer / Oscillator Systems"} metaTitle={"Reciprocating Sprayer Systems | Automated Industrial Painting"} metaDescription={"Learn about reciprocating sprayer systems for industrial paint applications, including equipment selection, parameter setup, and US/EU terminology variations."} breadcrumbs={[
            { label: "Engineering Library", href: "/resources/engineering-library" },
            { label: "Equipment" },
            { label: "Reciprocators" }
        ]} structuredData={structuredData}>
      <AnswerBox>
        {"Reciprocating sprayer systems (also called oscillators, automatic spray machines, or linear traverses) use linear reciprocating motion to move spray guns or rotary bells over workpieces for paint application. Compared to robotic systems, they offer simpler construction and lower cost, making them suitable for high-volume production of flat workpieces such as doors, glass, and metal panels. Systems can be configured with single or multiple axes for complex path spraying."}
      </AnswerBox>

      {/* US vs EU Terminology */}
      <ContentSection title={"Terminology Variations: US vs EU"}>
        <div className="bg-muted/30 rounded-lg p-4 mb-6">
          <p className="text-sm text-muted-foreground">
            {"Note: The following terms have regional variations, which is important for GEO SEO optimization:"}
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{"Concept"}</TableHead>
              <TableHead>{"US English"}</TableHead>
              <TableHead>{"UK/EU English"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{"Reciprocating sprayer"}</TableCell>
              <TableCell>Reciprocating sprayer, Linear traverse, Oscillator</TableCell>
              <TableCell>Reciprocator, Spray oscillator, Linear spray machine</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{"Automatic spray machine"}</TableCell>
              <TableCell>Automatic spray machine, Auto-spray</TableCell>
              <TableCell>Automatic lacquer machine, Spray applicator</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{"Spray system"}</TableCell>
              <TableCell>Spray system, Coating system</TableCell>
              <TableCell>Lacquer system, Finishing system, Spray application system</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{"Flat line spraying"}</TableCell>
              <TableCell>Flat line spraying, Panel coating</TableCell>
              <TableCell>Panel lacquering, Sheet spraying</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ContentSection>

      <ContentSection title={"System Types"}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-5">
            <h4 className="font-semibold mb-3">{"Single-Axis Reciprocator"}</h4>
            <p className="text-sm text-muted-foreground mb-3">
              {"The simplest configuration, with spray gun reciprocating in a single direction (typically vertical). Suitable for flat workpieces within a single width range."}
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {"Simple structure, lower cost"}</li>
              <li>• {"Easy operation and maintenance"}</li>
              <li>• {"Suitable for standard-sized workpieces"}</li>
            </ul>
          </div>
          <div className="border rounded-lg p-5">
            <h4 className="font-semibold mb-3">{"Multi-Axis Reciprocator"}</h4>
            <p className="text-sm text-muted-foreground mb-3">
              {"Equipped with multiple motion axes, enabling complex path spraying. Supports workpiece rotation or multi-directional gun motion for improved adaptation to complex shapes."}
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {"Flexible programming, programmable paths"}</li>
              <li>• {"Suitable for complex geometries"}</li>
              <li>• {"Multiple gun integration possible"}</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={"Key Parameters"}>
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
              <TableCell className="font-medium">{"Stroke Length"}</TableCell>
              <TableCell>200 - 3000 mm</TableCell>
              <TableCell className="text-muted-foreground">{"Maximum reciprocating motion distance"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Traverse Speed"}</TableCell>
              <TableCell>0.1 - 2 m/s</TableCell>
              <TableCell className="text-muted-foreground">{"Affects film thickness and surface quality"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Acceleration"}</TableCell>
              <TableCell>1 - 10 m/s²</TableCell>
              <TableCell className="text-muted-foreground">{"Affects start/stop smoothness"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Positioning Accuracy"}</TableCell>
              <TableCell>±0.5 - ±2 mm</TableCell>
              <TableCell className="text-muted-foreground">{"Affects coating uniformity"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Number of Guns"}</TableCell>
              <TableCell>1 - 12</TableCell>
              <TableCell className="text-muted-foreground">{"Based on capacity and width requirements"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ContentSection>

      <ContentSection title={"Application Areas"}>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Building Materials</Badge>
            <h4 className="font-medium text-sm">{"Building Materials"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {"Metal doors/windows, ceiling panels, aluminum-plastic panels"}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Glass</Badge>
            <h4 className="font-medium text-sm">{"Glass Processing"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {"Architectural glass, appliance glass, automotive glass coating"}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Furniture</Badge>
            <h4 className="font-medium text-sm">{"Furniture Manufacturing"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {"Wooden doors, metal furniture parts, panels priming and topcoating"}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Appliances</Badge>
            <h4 className="font-medium text-sm">{"Appliance Industry"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {"Refrigerator panels, washer drums, air conditioner casings"}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Automotive</Badge>
            <h4 className="font-medium text-sm">{"Automotive Components"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {"Interior panels, dashboards, door panels"}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Sheet Metal</Badge>
            <h4 className="font-medium text-sm">{"Sheet Metal Processing"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {"Electrical cabinets, control boxes, machinery enclosures"}
            </p>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={"Comparison with Robotic Systems"}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{"Comparison Factor"}</TableHead>
              <TableHead>{"Reciprocator"}</TableHead>
              <TableHead>{"Robot System"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">{"Initial Investment"}</TableCell>
              <TableCell className="text-green-600">{"Lower"}</TableCell>
              <TableCell className="text-red-600">{"Higher"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Workpiece Type"}</TableCell>
              <TableCell>{"Primarily flat"}</TableCell>
              <TableCell>{"Any geometry"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Path Flexibility"}</TableCell>
              <TableCell>{"Limited"}</TableCell>
              <TableCell>{"Highly flexible"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Maintenance Cost"}</TableCell>
              <TableCell className="text-green-600">{"Lower"}</TableCell>
              <TableCell>{"Medium"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Programming Difficulty"}</TableCell>
              <TableCell className="text-green-600">{"Simple"}</TableCell>
              <TableCell className="text-red-600">{"Complex"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Throughput"}</TableCell>
              <TableCell>{"High (simple parts)"}</TableCell>
              <TableCell>{"High (complex parts)"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ContentSection>

      <ContentSection title={"Selection Criteria"}>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">1</span>
            </div>
            <div>
              <h4 className="font-medium">{"Workpiece Dimensions"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {"Determine max/min workpiece dimensions to select stroke length and working width. Consider overall dimensions for simultaneous multi-part spraying."}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">2</span>
            </div>
            <div>
              <h4 className="font-medium">{"Throughput Requirements"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {"Determine reciprocator speed, number of guns, and automation level based on line takt time. High throughput may require multi-station configuration."}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">3</span>
            </div>
            <div>
              <h4 className="font-medium">{"Coating Type"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {"Different coatings (solvent-based, water-based, UV) have varying requirements for spray parameters and equipment materials. Metallic coatings require special configuration."}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">4</span>
            </div>
            <div>
              <h4 className="font-medium">{"Spray Quality"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {"Select atomization method and gun type based on appearance requirements. Class A finish requires HVLP or rotary bell atomization."}
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={"Related Resources"}>
        <div className="grid md:grid-cols-2 gap-4">
          <a href="/resources/knowledge/paint-booth-design-basics" className="block p-4 border rounded-lg hover:border-primary/50 transition-colors">
            <h4 className="font-medium">{"Paint Booth Design Basics"}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {"Booth layout design for reciprocator installation"}
            </p>
          </a>
          <a href="/resources/knowledge/paint-technology-guide" className="block p-4 border rounded-lg hover:border-primary/50 transition-colors">
            <h4 className="font-medium">{"Spray Technology Guide"}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {"Comparison and selection of atomization technologies"}
            </p>
          </a>
        </div>
      </ContentSection>
    </ResourcePageLayout>);
}
