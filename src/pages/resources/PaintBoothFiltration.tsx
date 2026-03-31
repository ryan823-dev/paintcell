import { ResourcePageLayout } from "@/components/resources";
import { ContentSection } from "@/components/resources";

const meta = {
  title: "Paint Booth Filtration Systems | Dry and Wet Filtration Technology",
  description: "Comprehensive guide to paint booth air filtration: dry filter systems, wet scrubbers, mist collectors, and HEPA filtration for industrial paint shops.",
  keywords: "paint booth filtration, dry filters, wet scrubbers, mist collectors, HEPA filtration, paint booth exhaust, overspray collection, air cleaning systems",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": meta.title,
  "description": meta.description,
  "keywords": meta.keywords,
  "proficiencyLevel": "Intermediate",
  "about": {
    "@type": "Thing",
    "name": "Industrial Paint Booth Filtration",
    "description": "Air filtration and overspray collection systems for paint booths and spray finishing operations"
  }
};

const faqSchema = {
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What types of filters are used in paint booths?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Paint booths use multiple filter stages: pre-filters remove large particles, paint arrestance filters (typically fiberglass or synthetic media) capture overspray, and final filters provide polished exhaust air. Wet systems use water curtains and mist eliminators instead of dry filters. HEPA filters are used for exhaust air polishing when required by environmental regulations."
      }
    },
    {
      "@type": "Question",
      "name": "How often should paint booth filters be replaced?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Filter replacement frequency depends on production volume and coating type. Pre-filters typically require replacement every 2-4 weeks, while paint arrestance filters last 1-3 months under normal production. Signs of filter saturation include increased pressure drop across the system, visible overspray on booth walls, and reduced airflow affecting finish quality."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between dry filter and wet scrubber paint booths?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dry filter booths use replaceable filter media to capture overspray, with spent filters disposed of as hazardous waste. Wet scrubber booths use continuously circulating water to wash overspray from the air, with sludge requiring periodic removal. Dry systems are simpler and produce solid waste, while wet systems handle high production volumes but require water treatment and generate liquid hazardous waste."
      }
    }
  ]
};

const terminologyTable = [
  { us: "Paint booth", eu: "Spray booth, Finishing booth", definition: "Enclosed workspace designed for spray application of coatings with integrated ventilation" },
  { us: "Dry filter", eu: "Dry arrestor, Filter panel", definition: "Replaceable filter media that captures overspray particles in dry form" },
  { us: "Wet scrubber", eu: "Water wash booth, Liquid scrubber", definition: "Filtration system using water to remove overspray from exhaust air" },
  { us: "Pre-filter", eu: "Primary filter, Coarse filter", definition: "First-stage filter removing large particles to extend main filter life" },
  { us: "HEPA filter", eu: "HEPA filter (universal), Absolute filter", definition: "High-efficiency particulate air filter capturing 99.97% of particles 0.3 microns and larger" },
  { us: "Mist eliminator", eu: "Demister, Mist collector", definition: "Device removing liquid droplets from air streams using inertial separation" },
  { us: "Exhaust stack", eu: "Extraction outlet, Outlet flue", definition: "Ductwork carrying filtered air from the booth to atmosphere" },
  { us: "Air velocity", eu: "Air speed, Face velocity", definition: "Rate of airflow through the booth, typically measured in FPM or m/s" },
  { us: "Pressure drop", eu: "Pressure loss, Differential pressure", definition: "Reduction in air pressure across filters indicating saturation level" },
  { us: "Overspray", eu: "Overspray, Spray mist", definition: "Coating material that does not adhere to the target workpiece" },
  { us: "Filter media", eu: "Filter medium, Filtration material", definition: "The physical material that captures particles in filtration systems" },
  { us: "Arrester", eu: "Arrester panel, Overspray pad", definition: "Filter specifically designed to capture paint overspray particles" },
];

const sections = [
  {
    title: "Understanding Paint Booth Filtration Fundamentals",
    content: `Paint booth filtration systems serve two essential functions: protecting worker health by removing airborne coating materials and meeting environmental regulations for exhaust air quality. All spray finishing operations generate overspray - particles of coating material that do not adhere to the target workpiece. Without effective filtration, these particles would enter the atmosphere, contaminate surrounding areas, and create health hazards for workers. Modern filtration technology encompasses dry filter systems, wet scrubber systems, and hybrid configurations, each optimized for specific production requirements and regulatory environments. Understanding the mechanics of particle capture, filter media selection, and system design enables maintenance personnel and procurement engineers to optimize booth performance and reduce operating costs. The choice between dry and wet systems significantly impacts waste disposal methods, water treatment requirements, and ongoing operational expenses.`
  },
  {
    title: "Dry Filter Paint Booth Systems",
    content: `Dry filter paint booths capture overspray on replaceable filter media, with spent filters disposed of as hazardous solid waste. This approach offers simplicity, lower initial capital cost, and straightforward waste management compared to wet systems. Standard configuration includes multiple filter stages: pre-filters handle coarse particles and extend the service life of primary arrestance filters, which capture the majority of overspray material. Final filters, when used, polish exhaust air to meet specific environmental requirements. Paint arrestance filters utilize fiberglass mats, synthetic fiber pads, or cardboard frames with pleated media to maximize capture surface area. Standard efficiency ratings include MERV (Minimum Efficiency Reporting Value) classifications for coarse particles and specific arrestance ratings for paint capture. Most industrial paint booths use arrestance filters with 90-95% efficiency for overspray capture, with 85% efficiency as a minimum acceptable standard. Filter selection must account for coating type: solvent-borne coatings require filters rated for solvent resistance, while water-borne coatings require filters that maintain structural integrity when wet. Pleated filters offer longer service life and higher dust-holding capacity than flat-panel designs of equivalent efficiency. Pressure drop monitoring through differential pressure gauges provides early warning of filter saturation, enabling proactive replacement before airflow reduction impacts finish quality.`
  },
  {
    title: "Wet Scrubber Paint Booth Systems",
    content: `Wet scrubber paint booths use recirculating water to capture and remove overspray from exhaust air, with contaminated water treated on-site or removed for disposal. Water enters the booth through nozzles or slots, creating a continuous curtain or spray that washes airborne particles from the air stream. The water-coating mixture collects in a tank at the booth base, where pumps recirculate the liquid through filtration and back to the application nozzles. Mist eliminators or demister pads at the exhaust outlet remove water droplets carried over from the scrubbing zone, preventing visible exhaust plumes and water damage to downstream equipment. Sludge accumulation in the sump requires periodic removal, typically through automated drag-out systems or manual cleaning intervals. Water treatment systems including oil-water separators and pH adjustment maintain recirculation water quality and prevent biological growth. Operating costs for wet systems include water consumption, chemical treatment, sludge disposal, and pump energy. Initial capital costs exceed dry filter systems, but per-part operating costs can be lower for high-production operations due to elimination of filter replacement labor and disposal costs. Wet booths are particularly suited for high-solids coatings and heavy production schedules where filter replacement frequency would be impractical.`
  },
  {
    title: "HEPA Filtration and Final Polishing",
    content: `High-efficiency particulate air (HEPA) filters capture 99.97% of particles 0.3 microns in diameter and larger, providing polishing filtration for exhaust air that must meet stringent environmental or safety requirements. HEPA filters are mandatory in certain regulated industries and locations, and are recommended as best practice for booths applying isocyanate-containing coatings or other hazardous materials. Standard construction uses randomly arranged glass fiber media with interstices sized to capture particles through multiple mechanisms: direct interception, inertial impaction, diffusion, and electrostatic attraction. HEPA filters require prefilters to remove coarse particles that would rapidly clog the expensive media, with typical configurations including G4 prefiltration, F7 or F9 secondary filtration, and HEPA as the final stage. Differential pressure across HEPA filters indicates saturation and replacement requirement, though pressure drop is typically much lower than for HEPA media that would cause clogging concerns. HEPA filter housing design must prevent bypass leakage around filter edges, requiring continuous gaskets and positive sealing mechanisms. Filter installation requires careful handling to prevent media damage, and certification testing (DOP or PAO challenge) verifies integrity before service. Operating costs include higher pressure drop compared to standard arrestance filters, increasing fan energy consumption proportionally.`
  },
  {
    title: "Filter Selection Criteria and Sizing",
    content: `Proper filter selection balances capture efficiency, service life, and pressure drop to optimize both filtration performance and operating economy. Booth airflow requirements determine total filter surface area needed: undersized filters experience rapid pressure drop increases and frequent replacement, while oversized filters increase material costs without proportional benefit. Coating type influences filter media selection: metal paints typically require standard arrestance media, while gel coats and high-viscosity materials require extended-surface or specialized media designs. Production volume per shift affects replacement frequency calculations: high-volume operations may benefit from higher-efficiency filters with higher initial cost but longer service life. Airflow rate, measured in CFM or m3/h, must be maintained within manufacturer specifications to ensure proper capture velocity and prevent overspray escape from the booth opening. Uniform airflow distribution across the filter bank prevents bypass channels where unfiltered air could exit the booth. Filter bank design should include spare filter capacity for continuous operation during replacement intervals. Environmental temperature and humidity may affect filter media performance in extreme conditions, with special consideration for outdoor installations or unheated facilities.`
  },
  {
    title: "Maintenance Best Practices",
    content: `Effective filter maintenance extends service life, maintains air quality, and prevents costly production interruptions. Regular inspection schedules should include visual checks for visible damage, tears, or bypass channels around filter frames. Differential pressure monitoring through manometers or electronic sensors provides objective data for replacement timing rather than calendar-based schedules that may not reflect actual loading. Replacement procedures should include booth isolation (production shutdown with exhaust running to clear residual overspray), personal protective equipment for handling contaminated media, and proper hazardous waste labeling and disposal. Spare filter stock should be maintained at sufficient levels to prevent production delays, typically including prefilters and primary arrestance filters for multiple replacement cycles. Filter installation quality checks verify proper seating, gasket compression, and absence of bypass gaps. Sump water quality in wet systems requires regular testing including pH, total dissolved solids, and biological contamination. Water treatment chemicals including biocides, pH adjusters, and coagulants maintain water clarity and prevent odor issues. Sludge removal schedules depend on coating loading and water volume, with automated systems providing continuous operation compared to periodic manual cleaning.`
  },
  {
    title: "Environmental Compliance and Exhaust Design",
    content: `Paint booth exhaust systems must meet air quality regulations that vary by jurisdiction, typically limiting visible emissions, VOC concentration, and particulate loading. Exhaust stack design affects dispersion of remaining contaminants into the atmosphere, with taller stacks improving dilution and reducing ground-level concentrations. Visible emission limits often specify opacity thresholds (typically 0-20% opacity) that may require HEPA filtration or wet scrubbers to achieve. Stack testing may be required to verify compliance, involving isokinetic sampling and laboratory analysis of exhaust stream composition. VOC emission limits may be expressed as concentration (ppm), mass per time (lb/hr), or capture efficiency percentage, with capture and control systems required to meet thresholds. Afterburners or thermal oxidizers may be required for solvent-laden exhaust streams, destroying solvents through high-temperature combustion. Recordkeeping requirements typically include filter replacement logs, differential pressure readings, and waste disposal documentation demonstrating proper handling of contaminated filters and sludge. Permitting requirements vary by operation scale and location, with new installations requiring agency approval of exhaust specifications and emission estimates. Regular monitoring and reporting maintain compliance and demonstrate ongoing regulatory adherence.`
  }
];

// Combine schemas for structured data
const structuredData = {
  ...schema,
  ...faqSchema
};

export default function PaintBoothFiltration() {
  return (
    <ResourcePageLayout
      title={meta.title}
      metaTitle={`${meta.title} | TD Paintcell`}
      metaDescription={meta.description}
      breadcrumbs={[
        { label: "Engineering Library", href: "/resources/engineering-library" },
        { label: "Equipment" },
        { label: "Paint Booth Filtration" },
      ]}
      structuredData={structuredData}
      canonicalPath="/resources/equipment/paint-booth-filtration"
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

      {/* Content Sections */}
      {sections.map((section, i) => (
        <ContentSection key={i} title={section.title}>
          <p className="whitespace-pre-line text-muted-foreground leading-relaxed">
            {section.content}
          </p>
        </ContentSection>
      ))}

      {/* System Selection Guide */}
      <section className="mt-12 p-6 bg-primary/5 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">System Selection Guide</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">Choose Dry Filters When:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Production volume is moderate (low to medium)</li>
              <li>Solid hazardous waste disposal is preferred</li>
              <li>Initial capital cost must be minimized</li>
              <li>Simple maintenance procedures are required</li>
              <li>Multiple coating colors require frequent cleaning</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Choose Wet Scrubbers When:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Production volume is high (continuous operation)</li>
              <li>Heavy overspray loads are expected</li>
              <li>Water treatment infrastructure exists</li>
              <li>Higher initial investment is acceptable</li>
              <li>Fibrous or gelatinous coatings are applied</li>
            </ul>
          </div>
        </div>
      </section>
    </ResourcePageLayout>
  );
}