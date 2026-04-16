import { ResourcePageLayout, AnswerBox } from "@/components/resources";
import { ContentSection } from "@/components/resources";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
export default function PowderCoatingSystems() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": "Powder Coating Systems: Electrostatic Application Technology",
        "description": "Technical guide to powder coating systems, covering electrostatic application, curing processes, and US/EU terminology variations.",
        "inLanguage": "en",
    };
    return (<ResourcePageLayout title={"Powder Coating / Powder Finishing Systems"} metaTitle={"Powder Coating Systems | Electrostatic Powder Application"} metaDescription={"Learn about powder coating technology including electrostatic application, curing processes, and application areas."} breadcrumbs={[
            { label: "Engineering Library", href: "/resources/engineering-library" },
            { label: "Process" },
            { label: "Powder Coating" }
        ]} structuredData={structuredData}>
      <AnswerBox>
        {"Powder coating is an environmentally friendly surface treatment technology where dry powder coating is electrostatically attracted to metal substrate surfaces, then heated to cure and form a hard coating. Compared to traditional liquid coatings, powder coating offers significant advantages including zero VOC emissions, high material utilization (95%+), and no solvent requirement, making it a mainstream surface treatment technology for metal."}
      </AnswerBox>

      {/* US vs EU Terminology */}
      <ContentSection title={"US vs EU Terminology"}>
        <div className="bg-muted/30 rounded-lg p-4 mb-6">
          <p className="text-sm text-muted-foreground">
            {"Powder coating has regional terminology variations:"}
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
              <TableCell>{"Powder coating"}</TableCell>
              <TableCell>Powder coating, Powder finish</TableCell>
              <TableCell>Powder coating, Powder lacquering</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{"Powder gun"}</TableCell>
              <TableCell>Powder gun, Electrostatic powder gun</TableCell>
              <TableCell>Powder applicator, Powder spray gun</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{"Cure oven"}</TableCell>
              <TableCell>Cure oven, Baking oven</TableCell>
              <TableCell>Curing oven, Stoving oven</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{"Powder booth"}</TableCell>
              <TableCell>Powder booth, Spray booth</TableCell>
              <TableCell>Powder cabin, Powder spray cabin</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{"Recovery system"}</TableCell>
              <TableCell>Recovery system, Powder reclaim</TableCell>
              <TableCell>Powder reclamation, Overspray recovery</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{"Thermosetting powder"}</TableCell>
              <TableCell>Thermosetting powder</TableCell>
              <TableCell>Curing powder, Thermoset powder</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ContentSection>

      <ContentSection title={"Powder Types"}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-5">
            <h4 className="font-semibold mb-3">{"Thermosetting Powder"}</h4>
            <p className="text-sm text-muted-foreground mb-3">
              {"The most common powder type, curing through chemical crosslinking reaction. Forms 3D network structure after curing, cannot be remelted."}
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {"Epoxy powder"}</li>
              <li>• {"Hybrid powder"}</li>
              <li>• {"Polyester/TGIC powder"}</li>
              <li>• {"Polyurethane powder"}</li>
            </ul>
          </div>
          <div className="border rounded-lg p-5">
            <h4 className="font-semibold mb-3">{"Thermoplastic Powder"}</h4>
            <p className="text-sm text-muted-foreground mb-3">
              {"Softens and melts when heated, solidifies when cooled. Can be reprocessed, no chemical reaction."}
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {"Nylon/PA powder"}</li>
              <li>• {"PVC powder"}</li>
              <li>• {"Polyethylene powder"}</li>
              <li>• {"Fluorocarbon powder"}</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={"System Components"}>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">1</span>
            </div>
            <div>
              <h4 className="font-medium">{"Powder Gun / Applicator"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {"Electrostatic charging and directional spraying of powder particles. US terms: powder gun, electrostatic spray gun. EU terms: powder applicator, electrostatic gun. Charging methods include corona charging and tribo charging."}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">2</span>
            </div>
            <div>
              <h4 className="font-medium">{"Powder Booth / Cabin"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {"Working area for powder spraying. US: powder booth, spray booth. EU: powder cabin, spray cabin. Equipped with powder recovery system to reclaim oversprayed powder for reuse."}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">3</span>
            </div>
            <div>
              <h4 className="font-medium">{"Powder Feed System"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {"Device for storing and delivering powder to the gun. Includes hopper, fluidized bed, pump, and piping. US: hopper, feeder. EU: powder reservoir, supply unit."}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">4</span>
            </div>
            <div>
              <h4 className="font-medium">{"Cure Oven / Baking Oven"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {"Equipment for heating and curing powder coating. US: cure oven, baking oven. EU: curing oven, stoving oven. Typical cure temperature: 180-200°C, time: 10-30 minutes."}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">5</span>
            </div>
            <div>
              <h4 className="font-medium">{"Pretreatment System"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {"Surface preparation before powder coating. Includes degreasing, phosphating, passivation. US and EU terminology similar: phosphating, chromating, iron phosphate, zinc phosphate."}
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
              <TableHead>{"Typical Value"}</TableHead>
              <TableHead>{"Description"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">{"Film Thickness"}</TableCell>
              <TableCell>60 - 120 μm</TableCell>
              <TableCell className="text-muted-foreground">{"Typically single layer, heavy coats to 200μm+ possible"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Material Utilization"}</TableCell>
              <TableCell>95 - 98%</TableCell>
              <TableCell className="text-muted-foreground">{"With powder recovery and reuse"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Cure Temperature"}</TableCell>
              <TableCell>180 - 200°C</TableCell>
              <TableCell className="text-muted-foreground">{"For thermosetting powder"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Cure Time"}</TableCell>
              <TableCell>10 - 30 min</TableCell>
              <TableCell className="text-muted-foreground">{"Depends on powder type and film thickness"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Adhesion"}</TableCell>
              <TableCell>0T - 5T</TableCell>
              <TableCell className="text-muted-foreground">{"Per ISO classification"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Impact Resistance"}</TableCell>
              <TableCell>40 - 160 in-lb</TableCell>
              <TableCell className="text-muted-foreground">{"Depends on powder type"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ContentSection>

      <ContentSection title={"Application Areas"}>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Architecture</Badge>
            <h4 className="font-medium text-sm">{"Architectural Aluminum"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {"Aluminum windows, curtain walls, railings, AAMA 2604/2605 standard"}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Automotive</Badge>
            <h4 className="font-medium text-sm">{"Automotive Components"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {"Wheels, engine components, chassis parts"}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Appliances</Badge>
            <h4 className="font-medium text-sm">{"Appliances"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {"Refrigerators, washers, air conditioner outdoor units"}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Furniture</Badge>
            <h4 className="font-medium text-sm">{"Metal Furniture"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {"Office furniture, outdoor furniture, shelving"}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Industrial</Badge>
            <h4 className="font-medium text-sm">{"Industrial Equipment"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {"Electrical cabinets, instruments, agricultural machinery"}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <Badge variant="outline" className="mb-2">Garden</Badge>
            <h4 className="font-medium text-sm">{"Garden Equipment"}</h4>
            <p className="text-xs text-muted-foreground mt-2">
              {"Lawn mowers, garden tools, metal fencing"}
            </p>
          </div>
        </div>
      </ContentSection>

      <ContentSection title={"Advantages Comparison"}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{"Comparison Factor"}</TableHead>
              <TableHead>{"Powder Coating"}</TableHead>
              <TableHead>{"Liquid Coating"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">{"VOC Emissions"}</TableCell>
              <TableCell className="text-green-600">{"Zero VOC"}</TableCell>
              <TableCell className="text-red-600">{"High VOC"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Material Utilization"}</TableCell>
              <TableCell className="text-green-600">95-98%</TableCell>
              <TableCell>30-60%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Film Thickness Control"}</TableCell>
              <TableCell>{"Single coat 60-120μm possible"}</TableCell>
              <TableCell>{"Multiple coats required"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Cure Time"}</TableCell>
              <TableCell>{"10-30 min (high temp)"}</TableCell>
              <TableCell>{"Longer (flash time needed)"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Chemical Resistance"}</TableCell>
              <TableCell className="text-green-600">{"Excellent"}</TableCell>
              <TableCell>{"Good"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Color Change"}</TableCell>
              <TableCell>{"Requires cleaning equipment"}</TableCell>
              <TableCell className="text-green-600">{"Relatively easy"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ContentSection>

      <ContentSection title={"Related Resources"}>
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/resources/knowledge/paint-technology-guide" className="block p-4 border rounded-lg hover:border-primary/50 transition-colors">
            <h4 className="font-medium">{"Coating Technology Guide"}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {"Comparison of liquid and powder coating technologies"}
            </p>
          </Link>
          <Link to="/resources/knowledge/powder-coating-systems" className="block p-4 border rounded-lg hover:border-primary/50 transition-colors">
            <h4 className="font-medium">{"Powder Coating Systems Guide"}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {"Overview of powder coating process terms, equipment, and selection factors"}
            </p>
          </Link>
        </div>
      </ContentSection>
    </ResourcePageLayout>);
}
