import { ResourcePageLayout } from "@/components/resources";
import { ContentSection } from "@/components/resources";

const meta = {
  title: "Industrial Paint Robot Brands | ABB vs FANUC vs Yaskawa Comparison",
  description: "Comprehensive comparison of industrial painting robots: ABB, FANUC, Yaskawa, Kawasaki, and Estun. Specifications, programming approaches, and selection criteria for paint shop automation.",
  keywords: "industrial paint robot, ABB robot, FANUC robot, Yaskawa robot, Kawasaki robot, painting robot comparison, robotic paint booth, robot arm specifications",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": meta.title,
  "description": meta.description,
  "keywords": meta.keywords,
  "proficiencyLevel": "Advanced",
  "about": {
    "@type": "Thing",
    "name": "Industrial Painting Robots",
    "description": "Comparison of robot manufacturers and models for spray painting automation applications"
  }
};

const faqSchema = {
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Which robot brands are best for paint shop applications?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ABB, FANUC, and Yaskawa are the leading manufacturers for paint shop applications. ABB offers the IRB 5400 and IRB 5500 series specifically designed for painting with integrated fluid delivery. FANUC provides P-series robots with PaintPRO software. Yaskawa offers MPO and HP-series robots. All three have mature paint booth integration experience and established track records in automotive OEM plants."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between painting robots and standard industrial robots?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Painting robots are configured for interior booth use with explosion-proof ratings (ATEX/IECEx), integrated paint valve manifolds, hollow wrist designs for internal tubing routing, and wrist dress packages that resist paint accumulation. Standard robots may lack these certifications and features required for safe operation in flammable atmospheres with organic solvents."
      }
    },
    {
      "@type": "Question",
      "name": "What programming methods are available for painting robots?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Traditional teaching uses a teach pendant to manually move the robot through desired positions. Playback programming records paths from manual demonstration. Offline programming generates paths in simulation software without occupying production time. Advanced systems use vision-guided or adaptive programming that adjusts paths based on part variation detection."
      }
    }
  ]
};

const terminologyTable = [
  { us: "Robot controller", eu: "Robot cabinet, Control unit", definition: "Electronic system that processes programs and controls robot motion" },
  { us: "Teach pendant", eu: "Programming pendant, Pendant device", definition: "Handheld device for manual robot programming and control" },
  { us: "Payload", eu: "Load capacity, Carrying capacity", definition: "Maximum weight the robot can handle at the wrist" },
  { us: "Reach", eu: "Working radius, Span", definition: "Maximum distance from base axis to wrist center" },
  { us: "Degrees of freedom", eu: "Axes, Degrees of movement", definition: "Number of independent motion axes the robot possesses" },
  { us: "Repeatability", eu: "Positioning repeatability", definition: "Precision with which the robot returns to a taught position" },
  { us: "Cycle time", eu: "Process time, Throughput time", definition: "Duration to complete one programmed sequence" },
  { us: "Hollow wrist", eu: "Internal wrist, Through-arm cable", definition: "Robot wrist design with passages for fluid and cables internally" },
  { us: "Explosion-proof", eu: "ATEX-certified, Ex-protected", definition: "Equipment rated safe for operation in hazardous flammable atmospheres" },
  { us: "End of arm tool", eu: "Tooling, End effector", definition: "Device mounted at robot wrist to perform work (spray gun, gripper)" },
  { us: "Work envelope", eu: "Working volume, Reach zone", definition: "Three-dimensional space the robot can reach" },
  { us: "Servo motor", eu: "Servo drive motor, Axis motor", definition: "Motor enabling precise position control for each axis" },
  { us: "Offline programming", eu: "Offline path generation", definition: "Creating robot programs using simulation software without physical robot" },
  { us: "Path accuracy", eu: "Trajectory accuracy, Path precision", definition: "How closely the robot follows the programmed path versus actual motion" },
];

const brandComparison = [
  { feature: "ABB IRB 5400", payload: "15 kg", reach: "1550 mm", protection: "IP67", explosion: "ATEX Zone 2", controller: "IRC5" },
  { feature: "ABB IRB 5500", payload: "25 kg", reach: "2485 mm", protection: "IP67", explosion: "ATEX Zone 2", controller: "IRC5" },
  { feature: "FANUC P-250iB", payload: "15 kg", reach: "2800 mm", protection: "IP67", explosion: "ATEX Zone 2", controller: "R-30iB" },
  { feature: "FANUC P-50iB", payload: "10 kg", reach: "1300 mm", protection: "IP67", explosion: "ATEX Zone 2", controller: "R-30iB" },
  { feature: "Yaskawa MPX 3500", payload: "15 kg", reach: "2650 mm", protection: "IP67", explosion: "ATEX Zone 2", controller: "DX200" },
  { feature: "Kawasaki Paintmate 200", payload: "6 kg", reach: "1000 mm", protection: "IP67", explosion: "ATEX Zone 2", controller: "E02" },
];

const sections = [
  {
    title: "Industrial Robot Landscape for Paint Applications",
    content: `Industrial robots have become indispensable in modern paint shops, offering consistent quality, reduced material consumption, and improved working conditions compared to manual spray application. The global market for painting robots is dominated by several major manufacturers, each offering specialized equipment optimized for spray finishing applications. Understanding the capabilities and limitations of different brands and models enables facilities managers and automation engineers to select appropriate equipment for their specific requirements. The choice between manufacturers involves consideration of initial cost, ongoing maintenance, programming approach, integration complexity, and long-term support infrastructure. Regional preferences exist due to established dealer networks, existing equipment bases, and historical relationships with automotive OEMs and tier suppliers. The fundamental technology among major brands has converged, with differentiation occurring through software ecosystems, specific application features, and total cost of ownership over equipment lifecycle. Paint-specific robot configurations universally feature explosion-proof ratings for safe operation in spray booth atmospheres containing flammable solvent vapors, hollow wrist designs for internal routing of paint tubing and cables, and wrist dress packages designed to resist paint accumulation and simplify cleaning between color changes.`
  },
  {
    title: "ABB Robotics",
    content: `ABB Robotics is a leading global supplier of industrial robots, with extensive experience in paint shop applications dating back decades. The IRC5 controller platform represents ABB's current standard, offering proven reliability and comprehensive I/O integration capabilities for paint system control. ABB paint robots feature the proprietary Paint Application Software (PAS) which provides specialized functions for paint flow control, atomization parameter management, and recipe handling. The hollow wrist design with internal fluid passages reduces external hose routing, improving movement dynamics and reducing paint accumulation on external surfaces. Key models include the IRB 5400 series (15 kg payload, approximately 1550 mm reach) optimized for interior and body painting applications, and the IRB 5500 series (25 kg payload, extended reach options) suited for larger parts and exterior painting. ABB's RobotStudio simulation software enables comprehensive offline programming and cell layout verification before physical installation. The global service network provides installation, training, and maintenance support across major manufacturing regions. System integration partners offer turnkey paint booth solutions incorporating ABB robots with customer-specified spray equipment, conveyor interfaces, and plant management system connections. Total solution cost includes consideration of robot arm, controller, paint integration package, and installation engineering.`
  },
  {
    title: "FANUC Robotics",
    content: `FANUC Corporation is one of the world's largest robot manufacturers, with a strong presence in automotive paint shop applications through the P-series (Paint) robot lineup. The R-30iB controller platform provides the computational foundation for current FANUC paint robots, with PaintPRO software offering comprehensive spray application functionality. FANUC paint robots are known for high-speed motion capabilities, with acceleration and deceleration profiles optimized for spray application where smooth, consistent velocity affects finish quality. The integrated vision capability in some models enables adaptive path correction for part-to-part variation, though this feature is more commonly used in material handling than painting applications. Key P-series models include the P-250iB (15 kg payload, extended reach) for general paint booth applications, and the P-50iB (10 kg payload, compact design) for smaller parts and tight spaces. FANUC's FIELD system (FANUC Intelligent Edge Link and Drive) enables factory-wide connectivity and data collection for Industry 4.0 implementations. The iRVision integrated vision system provides quality inspection and adaptive path capabilities. Programming through the standard teach pendant is similar across FANUC robot types, simplifying operator training when expanding robot populations. Offline programming through roboguide provides detailed simulation and path optimization. Service and support through authorized integrators and direct FANUC offices provides comprehensive installation and maintenance capability.`
  },
  {
    title: "Yaskawa Motoman",
    content: `Yaskawa Motoman offers the MPX and HP series robots optimized for paint applications, with the DX200 controller providing advanced motion control and application-specific functionality. Yaskawa paint robots feature the MotoPaint application package with integrated paint parameter management, multi-gun control, and color change functionality. The manufacturer emphasizes high-speed motion performance and precision path accuracy that benefits spray application consistency. Yaskawa robots have strong market penetration in Japanese automotive supplier networks and in general industrial paint applications globally. Key models include the MPX 3500 (15 kg payload, extended reach) positioned for automotive interior and exterior painting, and the HP series models (various payloads) providing options across the range of application requirements. The Yaskawa Lincoln Automation acquisition expanded capabilities in welding and material handling, though paint application remains a specialized focus area. Programming through the DX200 teach pendant follows Yaskawa's established approach with application-specific screens for paint parameter configuration. Simulation through MotoSim EG provides offline programming capability with accurate motion time calculation. Global support through Yaskawa sales offices and authorized integrators provides installation, training, and spare parts availability. The manufacturer's broader motion control product line including drives and servos enables coordinated system solutions when robot integration involves synchronized external axes.`
  },
  {
    title: "Kawasaki Robotics",
    content: `Kawasaki Robotics offers the Paintmate and other series robots with paint booth configurations, providing an alternative to the dominant ABB-FANUC-Yaskawa triad. The E02 controller platform delivers the control capability for Kawasaki paint robots, with application software for spray parameter management. Kawasaki robots are recognized for robust mechanical design and competitive pricing, making them attractive for cost-sensitive applications where functionality requirements are well-defined. The Paintmate 200 series (6 kg payload) targets smaller parts applications, while larger Kawasaki paint robots address general industrial painting requirements. Programming through the Kawasaki teach pendant follows the manufacturer's established approach, with paint-specific functions accessible through application screens. The global Kawasaki service network provides support, though density varies by region compared to the larger competitors. Kawasaki has historically maintained strong relationships in Asian manufacturing networks, particularly with Japanese and Korean automotive suppliers establishing facilities globally. Integration with established spray equipment manufacturers ensures compatibility with industry-standard paint delivery systems and color change manifolds. The smaller global footprint may require consideration for facilities expanding robot populations across multiple locations with different regional support structures.`
  },
  {
    title: "Estun and Other Manufacturers",
    content: `Estun Automation represents the emerging Chinese robot manufacturer segment, with growing presence in industrial automation including painting applications. The company offers robot products at competitive price points, supported by extensive manufacturing in China and expanding global distribution. Estun paint robots target cost-sensitive applications where total solution cost is a primary selection criterion, with functionality progressively approaching established competitors. Quality and reliability track records continue to develop as populations grow in production applications. Other regional manufacturers including OTC (Japan), Denso (Japan), and Nachi (Japan) offer paint-capable robots with varying levels of specialization for spray applications. These alternatives may suit facilities with existing relationships or specific regional support requirements. The robot arm represents one component of total solution cost, with integration engineering, spray equipment, installation, and training often comprising the majority of total investment. Selecting less-established manufacturers requires careful evaluation of long-term support capability, spare parts availability, and software roadmap continuity. Proof of concept testing with representative production parts provides valuable data for evaluation of any manufacturer's equipment in specific application requirements.`
  },
  {
    title: "Selection Criteria for Paint Shop Implementation",
    content: `Selecting the appropriate robot manufacturer and model requires systematic evaluation of multiple factors beyond initial equipment pricing. Application requirements establish baseline specifications: part size determines reach requirements, weight determines payload needs, and cycle time determines speed requirements. Paint booth environment considerations include available mounting configurations (floor, wall, angle, rail), booth dimensions affecting work envelope fit, and access requirements for maintenance. Integration complexity varies with the chosen spray equipment and existing plant control systems. Manufacturers with established partnerships with specific spray equipment vendors may offer simplified integration for those configurations. Programming approach should match available operator skills and production changeover requirements. Facilities with frequent product changes may prioritize intuitive programming interfaces and rapid offline program deployment. Long-term support considerations include service response time, spare parts availability, and training accessibility for maintenance and operations personnel. Existing robot populations with established suppliers create advantages for consistent programming approaches and shared spare parts inventories. Total cost of ownership analysis should include initial investment, installation and integration, programming and commissioning, ongoing maintenance, and eventual replacement over a 10-15 year equipment lifecycle. Energy consumption differences between manufacturers are typically minor compared to other factors. Finally, proof-of-concept testing with actual production parts and conditions provides the most reliable data for final selection decisions, though this is often impractical for routine applications.`
  }
];

// Combine schemas for structured data
const structuredData = {
  ...schema,
  ...faqSchema
};

export default function RobotBrandComparison() {
  return (
    <ResourcePageLayout
      title={meta.title}
      metaTitle={`${meta.title} | TD Paintcell`}
      metaDescription={meta.description}
      breadcrumbs={[
        { label: "Engineering Library", href: "/resources/engineering-library" },
        { label: "Technology" },
        { label: "Robot Brand Comparison" },
      ]}
      structuredData={structuredData}
      canonicalPath="/resources/technology/robot-brand-comparison"
    >
      {/* Terminology Table */}
      <ContentSection title="US/EU Terminology Reference">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-3 font-medium">US Term</th>
                <th className="text-left py-2 px-3 font-medium">EU Term</th>
                <th className="text-left py-2 px-3 font-medium">Definition</th>
              </tr>
            </thead>
            <tbody>
              {terminologyTable.map((term, i) => (
                <tr key={i} className="border-b border-muted/50">
                  <td className="py-2 px-3">{term.us}</td>
                  <td className="py-2 px-3">{term.eu}</td>
                  <td className="py-2 px-3 text-muted-foreground">{term.definition}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ContentSection>

      {/* Brand Comparison Table */}
      <ContentSection title="Popular Paint Robot Specifications">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-3 font-medium">Model</th>
                <th className="text-left py-2 px-3 font-medium">Payload</th>
                <th className="text-left py-2 px-3 font-medium">Reach</th>
                <th className="text-left py-2 px-3 font-medium">Protection</th>
                <th className="text-left py-2 px-3 font-medium">ATEX</th>
                <th className="text-left py-2 px-3 font-medium">Controller</th>
              </tr>
            </thead>
            <tbody>
              {brandComparison.map((robot, i) => (
                <tr key={i} className="border-b border-muted/50">
                  <td className="py-2 px-3 font-medium">{robot.feature}</td>
                  <td className="py-2 px-3">{robot.payload}</td>
                  <td className="py-2 px-3">{robot.reach}</td>
                  <td className="py-2 px-3">{robot.protection}</td>
                  <td className="py-2 px-3">{robot.explosion}</td>
                  <td className="py-2 px-3">{robot.controller}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ContentSection>

      {/* Content Sections */}
      {sections.map((section, i) => (
        <ContentSection key={i} title={section.title}>
          <p className="whitespace-pre-line text-muted-foreground leading-relaxed">
            {section.content}
          </p>
        </ContentSection>
      ))}

      {/* Key Selection Factors */}
      <section className="mt-12 p-6 bg-primary/5 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Key Selection Factors</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-medium mb-2">Technical Requirements</h3>
            <ul className="text-muted-foreground space-y-1">
              <li>Payload capacity must exceed spray equipment plus reserve margin</li>
              <li>Reach must cover work envelope with adequate clearance</li>
              <li>ATEX certification required for paint booth installation</li>
              <li>Cycle time must meet production rate requirements</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Operational Considerations</h3>
            <ul className="text-muted-foreground space-y-1">
              <li>Programming interface familiarity of maintenance staff</li>
              <li>Existing robot population brand consistency</li>
              <li>Local service support and spare parts availability</li>
              <li>Offline programming and simulation capability</li>
            </ul>
          </div>
        </div>
      </section>
    </ResourcePageLayout>
  );
}