import { ResourcePageLayout } from "@/components/resources";
import { ContentSection } from "@/components/resources";

const meta = {
  title: "HVLP Spray Gun Guide: High Volume Low Pressure Technology",
  description: "Complete guide to HVLP spray guns for industrial applications. Understand transfer efficiency benefits, air cap selection, and proper setup for optimal finish quality.",
  keywords: "HVLP spray gun, high volume low pressure, paint gun, spray gun guide, industrial coating equipment, finishing equipment",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": meta.title,
  "description": meta.description,
  "keywords": meta.keywords,
  "proficiencyLevel": "Intermediate",
};

const faqSchema = {
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the transfer efficiency of HVLP spray guns?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HVLP spray guns typically achieve 60-75% transfer efficiency compared to 25-40% for conventional air spray guns. This means 60-75% of the material exiting the gun actually adheres to the target surface, significantly reducing overspray and material costs. The high volume of air at low pressure creates finer atomization while minimizing the bounce-back effect that causes overspray in conventional systems."
      }
    },
    {
      "@type": "Question",
      "name": "What air pressure is required for HVLP spray guns?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HVLP spray guns typically require 10-25 psi (0.7-1.7 bar) at the air cap, though the incoming air pressure is higher (40-60 psi / 2.8-4.1 bar) to achieve the high air volume. The critical specification is air cap pressure, not line pressure. Using a pressure gauge at the gun inlet is essential for proper setup. Some systems use turbine units that provide constant air volume without requiring compressed air."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between conventional and HVLP spray guns?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The primary difference is air pressure at the cap. Conventional guns use high pressure (40-80 psi) at the air cap, creating efficient atomization but causing significant overspray from particle rebound. HVLP guns use low pressure (10-25 psi) at the cap with high air volume, achieving similar atomization quality with dramatically reduced overspray. This makes HVLP the preferred choice for environmental compliance and material efficiency."
      }
    }
  ]
};

const terminologyTable = [
  { us: "HVLP", eu: "High Volume Low Pressure", definition: "Spray technology using high air volume at low pressure for reduced overspray" },
  { us: "Air cap", eu: "Nozzle head, Atomizing head", definition: "Component at gun tip that shapes and directs the spray pattern" },
  { us: "Fluid tip", eu: "Nozzle, Orifice", definition: "Precision orifice controlling paint flow rate" },
  { us: "Pattern width", eu: "Spray width, Fan width", definition: "Diameter of the spray pattern at the target distance" },
  { us: "Transfer efficiency", eu: "Material utilization", definition: "Percentage of sprayed material adhering to surface" },
  { us: "Atomization", eu: "Particle size reduction", definition: "Breaking liquid into droplets for application" },
  { us: "Gun distance", eu: "Spray distance, Target distance", definition: "Distance from gun to work surface" },
  { us: "Film build", eu: "Coating thickness, DFT", definition: "Resulting dry coating thickness per coat" },
];

const sections = [
  {
    title: "Understanding HVLP Spray Gun Technology",
    content: `High Volume Low Pressure (HVLP) spray guns represent a significant advancement in finishing technology, combining high air volume with low air cap pressure to achieve superior transfer efficiency while maintaining excellent atomization quality. The technology emerged from environmental regulations targeting VOC emissions and overspray reduction in industrial finishing operations. Unlike conventional air spray guns that operate at 40-80 psi air cap pressure, HVLP systems operate at 10-25 psi, dramatically reducing the bounce-back effect that causes overspray. The high air volume—typically 15-25 CFM (425-700 L/min)—compensates for the lower pressure to maintain excellent atomization and pattern formation. This combination makes HVLP the preferred choice for applications where material efficiency, environmental compliance, or finish quality are priorities. The technology is particularly well-suited for industrial painting robots where consistent transfer efficiency reduces material costs and booth maintenance requirements.`
  },
  {
    title: "HVLP Components and Air Delivery Systems",
    content: `HVLP spray guns require higher air volume than conventional guns, necessitating careful system design. The air delivery system must supply 15-25 CFM continuously, requiring appropriately sized compressors or dedicated turbine units. Compressor-based systems require larger tanks and recovery systems to maintain consistent pressure during continuous operation. Turbine units provide a self-contained air supply with consistent volume, eliminating compressor sizing concerns but requiring dedicated electrical circuits for higher-powered models. The gun itself features a larger air cap with multiple ports, a precision fluid tip and needle valve assembly, and ergonomic design for extended use. Air pressure regulation is critical—most HVLP guns require a pressure gauge at the gun inlet to verify cap pressure, as line pressure can be significantly higher. Temperature and humidity of the supply air also affect performance; air drying and conditioning systems may be required for consistent results.`
  },
  {
    title: "Selecting the Right HVLP Gun for Industrial Applications",
    content: `Industrial HVLP applications range from manual touch-up operations to automated robotic spray systems. For robotic integration, the gun must be compatible with robot mounting interfaces, have provisions for fluid and air connections that accommodate robot wrist movement, and provide repeatable pattern characteristics across color changes. Fluid tip selection determines flow rate and atomization characteristics. Smaller tips (0.8-1.2mm) produce finer atomization for clear coats and thin-film applications. Medium tips (1.3-1.5mm) handle general industrial coatings including primers and topcoats. Larger tips (1.8-2.5mm) accommodate high-viscosity materials and high-flow applications. Pattern width adjustment allows matching to part geometry—narrow patterns for small parts or edges, wide patterns for large flat surfaces. Automation-specific guns may incorporate features like automatic air cap pressure monitoring, integrated fluid regulators, and compatibility with color change manifolds.`
  },
  {
    title: "Optimizing HVLP Performance Parameters",
    content: `Proper parameter selection optimizes transfer efficiency and finish quality for specific applications. The standard starting point is 10-12 psi at the air cap, 3-4 inches spray distance, and 50% pattern overlap. These parameters then adjust based on material viscosity and target film thickness. Viscosity affects atomization quality and flow rate. Higher viscosity materials require larger fluid tips or reduced atomization pressure. Temperature affects viscosity significantly; heating the material or the spray environment can improve atomization for high-viscosity coatings. Spray distance optimization balances transfer efficiency against application speed. Longer distances increase transfer efficiency but reduce control and increase atomization scatter. Shorter distances improve control but may reduce efficiency if particles bounce. Pattern width adjustment affects coverage rate and edge definition. Wide patterns cover more area per pass but may reduce control at edges. Multiple overlapping passes typically produce more uniform coverage than single-pass applications.`
  },
  {
    title: "Maintenance and Troubleshooting",
    content: `Regular maintenance ensures consistent performance and extends equipment life. Daily tasks include cleaning the fluid tip and air cap with appropriate solvents, checking for wear on the fluid needle and seat, and verifying air pressure at the gun inlet. Weekly maintenance includes thorough gun disassembly and cleaning of all passages, inspection of seals and gaskets for wear, and verification of pattern symmetry and atomization quality. Common issues and solutions include: Pattern drift or asymmetry indicates clogged or damaged air cap ports—clean with a soft brush and non-metallic pick. Reduced atomization suggests low air cap pressure or worn fluid tip—verify pressure and inspect tip for wear. Heavy orange peel indicates material viscosity too high or spray distance too far—adjust viscosity with thinner or reducer, reduce spray distance. Runs and sags indicate excessive film build—reduce flow rate or increase spray distance. The fluid needle and seat are critical wear items; replace as a matched set when leakage develops at low pressures.`
  },
  {
    title: "HVLP in Robotic Paint Application Systems",
    content: `HVLP technology integrates effectively with robotic spray systems, offering benefits in material efficiency and finish consistency. The predictable atomization characteristics simplify programming and reduce variation between programmed paths. Transfer efficiency averaging 65-75% significantly reduces material consumption compared to conventional spray methods. The lower air cap pressure reduces the disturbance of freshly applied wet film, improving edge definition and reducing overspray accumulation on booth walls. Robot-mounted HVLP guns require careful hose routing and connection design to accommodate the larger air volume requirements. The air supply must maintain consistent pressure regardless of gun movement; pressure drops during rapid acceleration can cause visible defects. Anti-cavitation fluid designs prevent material separation during intermittent spray operations. Color change manifold integration must account for the larger fluid passages and longer purge times compared to rotary atomizer systems. Overall, HVLP guns offer a cost-effective alternative to electrostatic rotary systems for applications not requiring wrap-around electrostatic attraction.`
  }
];

const structuredData = {
  ...schema,
  ...faqSchema
};

export default function HVLPGuide() {
  return (
    <ResourcePageLayout
      title={meta.title}
      metaTitle={`${meta.title} | TD Paintcell`}
      metaDescription={meta.description}
      breadcrumbs={[
        { label: "Engineering Library", href: "/resources/engineering-library" },
        { label: "Knowledge" },
        { label: "HVLP Spray Gun Guide" },
      ]}
      structuredData={structuredData}
      canonicalPath="/resources/knowledge/hvlp-spray-gun-guide"
    >
      {/* Terminology Table */}
      <ContentSection title="US/EU Terminology Reference">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4">US Term</th>
                <th className="text-left py-2 pr-4">EU Term</th>
                <th className="text-left py-2">Definition</th>
              </tr>
            </thead>
            <tbody>
              {terminologyTable.map((row, i) => (
                <tr key={i} className="border-b border-muted/50 last:border-0">
                  <td className="py-2 pr-4 font-medium">{row.us}</td>
                  <td className="py-2 pr-4 text-muted-foreground">{row.eu}</td>
                  <td className="py-2 text-muted-foreground text-xs">{row.definition}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ContentSection>

      {/* Content Sections */}
      {sections.map((section, i) => (
        <ContentSection key={i} title={section.title}>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {section.content}
          </p>
        </ContentSection>
      ))}

      {/* FAQ Section */}
      <section className="mt-12 bg-muted/30 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqSchema.mainEntity.map((faq, i) => (
            <div key={i}>
              <h3 className="font-medium mb-2">{faq.name}</h3>
              <p className="text-muted-foreground text-sm">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>
      </section>
    </ResourcePageLayout>
  );
}