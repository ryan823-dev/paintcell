export interface IndustryPainPoint {
  title: string;
  description: string;
}

export interface SystemModule {
  name: string;
  description: string;
}

export interface ProductionConfig {
  partsPerHour: string;
  paintType: string;
  finishRequirement: string;
  automationLevel: string;
  lineIntegration: string;
}

export interface ROIMetric {
  label: string;
  value: string;
}

export interface CaseReference {
  partType: string;
  systemConfig: string;
  capacity: string;
  roi: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface DeliveryStep {
  step: number;
  title: string;
  description: string;
}

export interface IndustryData {
  slug: string;
  industry: string;
  industryLabel: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: string;
  ctaText: string;
  examplePrompt: string;
  aiContext: {
    industry: string;
    finish: string;
    throughput: string;
  };
  painPoints: IndustryPainPoint[];
  systemModules: SystemModule[];
  productionConfig: ProductionConfig;
  roiMetrics: ROIMetric[];
  caseReferences: CaseReference[];
  faqs: FAQItem[];
  comingSoon?: boolean;
}

const deliverySteps: DeliveryStep[] = [
  { step: 1, title: "Requirement Analysis", description: "Technical assessment of parts, volumes, and finish specifications." },
  { step: 2, title: "Concept Design", description: "System architecture, robot selection, and layout planning." },
  { step: 3, title: "Detail Engineering", description: "3D modeling, electrical design, and process simulation." },
  { step: 4, title: "Manufacturing", description: "Booth fabrication, system assembly, and component integration." },
  { step: 5, title: "Factory Testing", description: "Full system commissioning and quality validation at our facility." },
  { step: 6, title: "Installation & Deploy", description: "On-site installation, integration with your production line." },
  { step: 7, title: "Training & Handover", description: "Operator training, documentation, and ongoing support." },
];

export { deliverySteps };

export const industries: Record<string, IndustryData> = {
  "automotive-painting": {
    slug: "automotive-painting",
    industry: "automotive",
    industryLabel: "Automotive",
    metaTitle: "Robotic Painting Automation for Automotive Industry | TD",
    metaDescription: "Engineered robotic spray painting systems for automotive parts. Class A finish, high throughput, and full process control for brackets, housings, and trim components.",
    heroTitle: "Robotic painting automation for automotive",
    heroSubtitle: "Engineered systems for consistent finish, throughput, and process control.",
    heroImage: "/industry-heroes/automotive.jpg",
    ctaText: "Start your automotive project",
    examplePrompt: "We need automated painting for automotive brackets, ~300 parts/hour, Class A finish required.",
    aiContext: {
      industry: "automotive",
      finish: "Class A / industrial",
      throughput: "medium-high",
    },
    painPoints: [
      { title: "Inconsistent finish quality", description: "Manual spraying produces variable film build and orange peel across shifts, failing OEM inspection criteria." },
      { title: "Labor dependency", description: "Skilled painters are difficult to recruit and retain, creating production bottlenecks and quality variance." },
      { title: "Throughput bottlenecks", description: "Manual processes cannot sustain takt time requirements for high-volume automotive production." },
      { title: "Overspray waste", description: "Poor transfer efficiency increases paint consumption by 30–50%, raising material costs significantly." },
      { title: "Environmental compliance", description: "VOC emissions and solvent handling must meet increasingly strict automotive industry regulations." },
    ],
    systemModules: [
      { name: "Robot Selection", description: "6-axis articulated robots with hollow-wrist design for optimal spray angle coverage on complex automotive geometries." },
      { name: "Spray Technology", description: "Electrostatic rotary bell atomizers or HVLP guns matched to paint chemistry and finish requirements." },
      { name: "Booth & Ventilation", description: "Downdraft or crossdraft booths with multi-stage filtration meeting automotive OEM cleanliness standards." },
      { name: "Paint Supply System", description: "Centralized paint kitchen with color change valves, pressure regulation, and recirculation loops." },
      { name: "Controls & HMI", description: "PLC-based control with recipe management, production tracking, and MES integration capability." },
    ],
    productionConfig: {
      partsPerHour: "200–400",
      paintType: "Solvent-based, water-based, 2K",
      finishRequirement: "Class A / OEM grade",
      automationLevel: "Full robotic with auto color change",
      lineIntegration: "Conveyor-integrated with existing assembly line",
    },
    roiMetrics: [
      { label: "Labor reduction", value: "50–70%" },
      { label: "Throughput increase", value: "30–60%" },
      { label: "Paint savings", value: "20–35%" },
      { label: "Typical ROI", value: "12–18 months" },
    ],
    caseReferences: [
      { partType: "Aluminum brackets", systemConfig: "2× robot cell, rotary bell", capacity: "320 parts/hr", roi: "14 months" },
      { partType: "Plastic trim panels", systemConfig: "3× robot line, HVLP", capacity: "180 parts/hr", roi: "16 months" },
      { partType: "Steel housings", systemConfig: "1× robot cell, 2K system", capacity: "240 parts/hr", roi: "12 months" },
    ],
    faqs: [
      { question: "How to automate painting in automotive manufacturing?", answer: "Start with a feasibility assessment covering part geometry, production volume, and finish specs. Our AI agent can guide you through the initial technical review in minutes." },
      { question: "How much does a robotic painting line cost for automotive?", answer: "System costs vary based on throughput, number of robots, and paint technology. A single-cell system typically starts from a different baseline than a multi-robot line. Contact us for a preliminary budget range." },
      { question: "What robot brands are used for automotive painting?", answer: "We integrate industry-standard painting robots from major manufacturers, selected based on reach, payload, and your specific process requirements." },
      { question: "How long is deployment time for an automotive painting system?", answer: "Typical project timelines range from 16–24 weeks depending on system complexity and integration requirements." },
      { question: "Can robotic painting achieve Class A finish on automotive parts?", answer: "Yes. With proper atomizer selection, process parameters, and booth environment control, robotic systems consistently achieve Class A finish quality." },
    ],
  },

  "metal-parts-finishing": {
    slug: "metal-parts-finishing",
    industry: "metal-parts",
    industryLabel: "Metal Parts",
    metaTitle: "Robotic Painting Automation for Metal Parts Finishing | TD",
    metaDescription: "Automated spray painting systems for metal components. Consistent coating quality, corrosion protection, and high-volume finishing for fabricated metal parts.",
    heroTitle: "Robotic painting automation for metal parts",
    heroSubtitle: "Engineered systems for consistent finish, throughput, and process control.",
    heroImage: "/industry-heroes/metal.jpg",
    ctaText: "Start your metal finishing project",
    examplePrompt: "We fabricate steel enclosures and need consistent powder-free liquid coating, ~150 parts/shift.",
    aiContext: {
      industry: "metal-parts",
      finish: "industrial / protective",
      throughput: "medium",
    },
    painPoints: [
      { title: "Inconsistent coating thickness", description: "Manual application produces uneven film build, leading to corrosion failures and rework on metal surfaces." },
      { title: "High labor costs", description: "Metal finishing requires experienced painters who are increasingly difficult to find and retain." },
      { title: "Throughput limitations", description: "Manual painting cannot keep pace with CNC and fabrication output, creating production bottlenecks." },
      { title: "Overspray and material waste", description: "Complex metal geometries cause significant overspray, increasing paint consumption and booth maintenance." },
      { title: "Surface preparation sensitivity", description: "Inconsistent spray patterns amplify surface prep defects, increasing rejection rates." },
    ],
    systemModules: [
      { name: "Robot Selection", description: "6-axis robots with extended reach for large metal assemblies and tight cavity access on smaller components." },
      { name: "Spray Technology", description: "Airless, air-assisted airless, or HVLP guns optimized for primers, topcoats, and protective coatings on metal." },
      { name: "Booth & Ventilation", description: "Dry filter or water wash booths sized for metal part dimensions with proper airflow velocity control." },
      { name: "Paint Supply System", description: "Pressure pot or diaphragm pump systems with material heating for viscosity control in varying conditions." },
      { name: "Controls & HMI", description: "Recipe-based control for multiple part types with automatic parameter adjustment and production logging." },
    ],
    productionConfig: {
      partsPerHour: "80–250",
      paintType: "Primers, topcoats, 2K polyurethane",
      finishRequirement: "Industrial / protective / decorative",
      automationLevel: "Robotic with fixture-based part handling",
      lineIntegration: "Batch or inline with existing fabrication flow",
    },
    roiMetrics: [
      { label: "Labor reduction", value: "40–60%" },
      { label: "Throughput increase", value: "25–50%" },
      { label: "Material savings", value: "15–30%" },
      { label: "Typical ROI", value: "14–22 months" },
    ],
    caseReferences: [
      { partType: "Steel enclosures", systemConfig: "2× robot cell, airless spray", capacity: "120 parts/hr", roi: "18 months" },
      { partType: "Aluminum heat sinks", systemConfig: "1× robot cell, HVLP", capacity: "200 parts/hr", roi: "15 months" },
      { partType: "Cast iron housings", systemConfig: "2× robot line, 2K system", capacity: "90 parts/hr", roi: "20 months" },
    ],
    faqs: [
      { question: "How to automate painting for metal parts finishing?", answer: "Begin with a part analysis covering geometry complexity, surface prep requirements, and target throughput. Our AI assessment tool can evaluate feasibility in minutes." },
      { question: "How much does a robotic painting system cost for metal finishing?", answer: "Costs depend on part size, volume, and coating requirements. We provide preliminary budget ranges after the initial technical assessment." },
      { question: "What spray technologies work best for metal parts?", answer: "Airless and air-assisted airless systems excel for protective coatings, while HVLP provides finer finish for decorative applications on metal." },
      { question: "Can robots paint complex metal geometries consistently?", answer: "Yes. 6-axis robots with offline programming can reach complex surfaces, cavities, and edges that are difficult for manual painters." },
      { question: "How long does it take to deploy a metal finishing paint system?", answer: "Typical timelines range from 14–20 weeks depending on system size and integration complexity." },
    ],
  },

  "appliance-coating": {
    slug: "appliance-coating",
    industry: "appliance",
    industryLabel: "Appliance",
    metaTitle: "Robotic Painting Automation for Appliance Coating | TD",
    metaDescription: "Automated spray painting systems for home and commercial appliances. High-volume, consistent finish quality with color flexibility for appliance manufacturing.",
    heroTitle: "Robotic painting automation for appliances",
    heroSubtitle: "Engineered systems for consistent finish, throughput, and process control.",
    heroImage: "/industry-heroes/appliance.jpg",
    ctaText: "Start your appliance project",
    examplePrompt: "We manufacture washing machine panels and need automated painting with fast color changeover, ~500 parts/shift.",
    aiContext: {
      industry: "appliance",
      finish: "decorative / consumer-grade",
      throughput: "high",
    },
    painPoints: [
      { title: "Color changeover delays", description: "Frequent color changes in appliance production cause significant downtime and material waste with manual processes." },
      { title: "Finish consistency across batches", description: "Consumer-grade appearance requires uniform gloss, texture, and color match across production runs." },
      { title: "High-volume throughput demands", description: "Appliance manufacturing requires continuous, high-speed painting that manual processes cannot sustain." },
      { title: "Material waste on large panels", description: "Flat panel geometries with edges and corners lead to overspray and uneven coverage manually." },
      { title: "Regulatory compliance", description: "VOC emission limits and workplace safety standards require controlled, enclosed painting environments." },
    ],
    systemModules: [
      { name: "Robot Selection", description: "High-speed 6-axis robots with optimized motion profiles for flat panel and curved appliance surfaces." },
      { name: "Spray Technology", description: "Electrostatic bell or disc atomizers for maximum transfer efficiency on large appliance panels." },
      { name: "Booth & Ventilation", description: "High-volume downdraft booths with automated filter management for continuous production runs." },
      { name: "Paint Supply System", description: "Fast color change systems with minimal flush volume, supporting 10+ colors with <60 second changeover." },
      { name: "Controls & HMI", description: "Production scheduling integration with automatic recipe selection based on part/color identification." },
    ],
    productionConfig: {
      partsPerHour: "300–600",
      paintType: "Water-based, UV curable, solvent-based",
      finishRequirement: "Consumer-grade decorative",
      automationLevel: "Full robotic with auto color change",
      lineIntegration: "Conveyor-integrated with assembly line",
    },
    roiMetrics: [
      { label: "Labor reduction", value: "60–80%" },
      { label: "Throughput increase", value: "40–70%" },
      { label: "Color changeover time", value: "<60 seconds" },
      { label: "Typical ROI", value: "10–16 months" },
    ],
    caseReferences: [
      { partType: "Washing machine panels", systemConfig: "4× robot line, electrostatic bell", capacity: "480 parts/hr", roi: "12 months" },
      { partType: "Refrigerator doors", systemConfig: "3× robot line, HVLP", capacity: "360 parts/hr", roi: "14 months" },
      { partType: "AC unit housings", systemConfig: "2× robot cell, 2K system", capacity: "200 parts/hr", roi: "16 months" },
    ],
    faqs: [
      { question: "How to automate painting in appliance manufacturing?", answer: "Start with production volume analysis and color change frequency assessment. Our AI agent evaluates your specific requirements and recommends system configurations." },
      { question: "How much does a robotic painting line cost for appliances?", answer: "High-volume appliance lines vary significantly based on throughput and color flexibility requirements. Contact us for a preliminary budget assessment." },
      { question: "How fast can robotic systems change colors?", answer: "Modern fast color change systems achieve changeover in under 60 seconds with minimal paint waste, supporting 10+ colors in production." },
      { question: "Can robots handle both flat panels and curved appliance surfaces?", answer: "Yes. Offline programming and adaptive spray patterns allow robots to maintain consistent film build across varying surface geometries." },
      { question: "What finish quality can robotic systems achieve for consumer appliances?", answer: "Robotic systems consistently achieve consumer-grade finish with uniform gloss, texture, and color match that exceeds manual painting quality." },
    ],
  },

  "construction-machinery": {
    slug: "construction-machinery",
    industry: "construction",
    industryLabel: "Construction Machinery",
    metaTitle: "Robotic Painting Automation for Construction Machinery | TD",
    metaDescription: "Robotic painting systems for construction and heavy equipment. Heavy-duty protective coatings for excavators, loaders, cranes, and industrial machinery with consistent film build and corrosion protection.",
    heroTitle: "Robotic painting automation for construction machinery",
    heroSubtitle: "Engineered systems for heavy-duty protective finishes on large structural components.",
    heroImage: "/industry-heroes/construction.jpg",
    ctaText: "Start your construction machinery project",
    examplePrompt: "We manufacture excavator boom arms and need consistent protective coating for outdoor durability.",
    aiContext: { industry: "construction-machinery", finish: "heavy-duty protective", throughput: "medium" },
    painPoints: [
      { title: "Large part dimensions", description: "Parts spanning 2-12 meters require extended robot reach via rail-mounted systems." },
      { title: "Thick film build requirements", description: "100-200+ micron targets prone to runs and sags without precise robotic control." },
      { title: "Complex weld seams and edges", description: "Heavy weld beads and sharp edges cause inconsistent coating coverage manually." },
      { title: "Corrosion protection critical", description: "Outdoor/harsh environment operation demands uniform coating for long-term durability." },
      { title: "High paint consumption", description: "Large surface areas with manual spraying result in significant overspray waste." },
    ],
    systemModules: [
      { name: "Extended-Reach Robots", description: "Rail-mounted robots with 7th-axis linear tracks extending reach to 8-12+ meters for large assemblies." },
      { name: "Spray Technology", description: "Airless and air-assisted airless guns for thick film builds; high-flow spray for large surfaces." },
      { name: "Large-Format Booths", description: "Oversized booth design with proper airflow for parts up to 12+ meters in length." },
      { name: "Part Handling", description: "Heavy-duty turntables, positioners, and conveyors for rotating and transporting large components." },
      { name: "Controls & HMI", description: "Recipe management for mixed-model production with automatic parameter adjustment per part type." },
    ],
    productionConfig: {
      partsPerHour: "10–60",
      paintType: "High-build epoxy primers, polyurethane topcoats, 2K systems",
      finishRequirement: "Heavy-duty protective / corrosion-resistant",
      automationLevel: "Robotic with rail systems and positioners",
      lineIntegration: "Large-format booth with conveyor or batch processing",
    },
    roiMetrics: [
      { label: "Paint savings", value: "25–40%" },
      { label: "Throughput increase", value: "30–50%" },
      { label: "Coating consistency", value: "±5 micron DFT" },
      { label: "Typical ROI", value: "14–20 months" },
    ],
    caseReferences: [
      { partType: "Excavator boom arms", systemConfig: "2× rail-mounted robots, airless spray", capacity: "18 parts/hr", roi: "16 months" },
      { partType: "Loader bucket linkages", systemConfig: "1× robot cell, turntable", capacity: "30 parts/hr", roi: "18 months" },
      { partType: "Crane boom sections", systemConfig: "3× robot line, 12m rail", capacity: "8 sections/hr", roi: "20 months" },
    ],
    faqs: [
      { question: "Can robots handle large construction equipment parts?", answer: "Yes. Rail-mounted robots with 7th-axis linear tracks extend reach to 8-12 meters for large boom arms, frames, and structural components." },
      { question: "How do you handle thick film builds?", answer: "Multi-pass application with controlled flash-off between coats. Automated DFT monitoring ensures target film build (100-200+ microns) without runs or sags." },
      { question: "What coating types are used?", answer: "High-build epoxy primers, polyurethane topcoats, 2K systems, and heavy-duty protective coatings for UV resistance and corrosion protection." },
      { question: "How does robotic painting improve corrosion protection?", answer: "Consistent film thickness on all surfaces, including hard-to-reach areas, ensures uniform protection. Robots maintain proper gun distance and angle on complex geometries." },
      { question: "How long does deployment take?", answer: "Typically 10-16 weeks after design approval, depending on part size, number of robots, and booth/conveyor requirements." },
    ],
  },

    painPoints: [
      { title: "High decorative standards", description: "Gloss, metallic effect, and color consistency demands exceed typical industrial coating requirements." },
      { title: "Complex small parts", description: "Handles, knobs, and fittings require full coverage on all surfaces including recessed areas." },
      { title: "Chrome-plating phase-out", description: "RoHS and REACH driving demand for hexavalent chromium-free coating alternatives." },
      { title: "High SKU count", description: "Many product variants with different finishes require fast changeover and recipe management." },
      { title: "Chemical resistance", description: "Bathroom and kitchen environments require moisture, chemical, and wear-resistant finishes." },
    ],
    systemModules: [
      { name: "Precision Spray Guns", description: "Fine-atomization spray guns for consistent decorative finishes on small, complex-shaped parts." },
      { name: "Multi-Part Fixtures", description: "Custom batch fixtures holding multiple parts per cycle for high-throughput processing." },
      { name: "Climate-Controlled Booth", description: "Temperature and humidity controlled environments for consistent metallic and decorative finishes." },
      { name: "Color Change System", description: "Fast color change with minimal flush volume for high-SKU production flexibility." },
      { name: "Part Identification", description: "Barcode, RFID, or vision-based part identification for automatic recipe selection." },
    ],
    productionConfig: {
      partsPerHour: "100–500",
      paintType: "Chrome-effect lacquers, metallic basecoats, clearcoats, epoxy primers",
      finishRequirement: "Decorative / chrome-alternative / chemical-resistant",
      automationLevel: "Robotic with batch fixtures and recipe management",
      lineIntegration: "Batch processing or conveyor-integrated",
    },
    roiMetrics: [
      { label: "Finish consistency", value: "±0.5 gloss units" },
      { label: "Rework reduction", value: "70–90%" },
      { label: "Material savings", value: "20–35%" },
      { label: "Typical ROI", value: "12–18 months" },
    ],
    caseReferences: [
      { partType: "Door handles (zamak)", systemConfig: "2× robot cell, HVLP, batch fixtures", capacity: "300 parts/hr", roi: "14 months" },
      { partType: "Bathroom faucets", systemConfig: "2× robot cell, chrome-effect system", capacity: "180 parts/hr", roi: "12 months" },
      { partType: "Cabinet pulls (stainless)", systemConfig: "1× robot cell, clearcoat", capacity: "400 parts/hr", roi: "16 months" },
    ],
    faqs: [
      { question: "What finishes can replace chrome plating?", answer: "Chrome-effect lacquers, metallic basecoat/clearcoat systems, and PVD look-alike coatings provide chrome appearance without hexavalent chromium, meeting RoHS and REACH requirements." },
      { question: "Can robots handle small hardware parts?", answer: "Yes. Multi-part fixtures allow batch processing. 6-axis robots with precision spray guns maintain coverage on complex geometries including handles, knobs, and fittings." },
      { question: "How do you handle high-mix production?", answer: "Recipe-based programming with barcode or RFID part identification enables automatic parameter switching with minimal changeover time." },
      { question: "What about chemical resistance for bathroom fixtures?", answer: "Epoxy primers and polyurethane or acrylic topcoats provide moisture, chemical, and wear resistance validated through salt spray and humidity testing." },
      { question: "How long does deployment take?", answer: "Typically 8-14 weeks after design approval, depending on fixture complexity, color count, and surface preparation requirements." },
    ],
  },

  "furniture-woodwork": {
    slug: "furniture-woodwork",
    industry: "furniture",
    industryLabel: "Furniture & Woodwork",
    metaTitle: "Robotic Painting Automation for Furniture & Woodwork | TD",
    metaDescription: "Automated spray finishing systems for furniture, cabinets, and wood products. Consistent lacquering, staining, and coating with reduced labor dependency.",
    heroTitle: "Robotic finishing automation for furniture & woodwork",
    heroSubtitle: "Engineered systems for consistent lacquering, staining, and coating on wood surfaces.",
    heroImage: "/industry-heroes/furniture.jpg",
    ctaText: "Start your furniture project",
    examplePrompt: "We manufacture kitchen cabinets and need automated lacquer application for consistent finish quality.",
    aiContext: { industry: "furniture", finish: "lacquer / stain / UV", throughput: "medium" },
    painPoints: [
      { title: "Inconsistent finish quality", description: "Hand spraying produces runs, sags, and uneven coverage that requires extensive rework and rejects." },
      { title: "Skilled labor shortage", description: "Experienced furniture finishers are increasingly difficult to find and retain." },
      { title: "High material waste", description: "Manual spraying results in significant overspray and coating waste." },
      { title: "Production bottleneck", description: "Finishing stage limits overall throughput and delivery schedules." },
      { title: "Health and safety concerns", description: "Solvent exposure and fine particle inhalation present ongoing risks." },
    ],
    systemModules: [
      { name: "Robot Selection", description: "6-axis robots optimized for furniture geometries with offline programming for product variety." },
      { name: "Spray Technology", description: "HVLP or air-assisted airless guns matched to lacquer, stain, or UV coating requirements." },
      { name: "Booth & Climate Control", description: "Controlled-environment booths with temperature and humidity management for sensitive finishes." },
      { name: "Material Handling", description: "Conveyor, rotary table, or manual load stations based on product size and volume." },
      { name: "UV Curing Integration", description: "Optional UV curing systems for instant-cure coatings and high productivity." },
    ],
    productionConfig: {
      partsPerHour: "60–200",
      paintType: "Lacquers, stains, UV coatings, water-based",
      finishRequirement: "Decorative / furniture-grade",
      automationLevel: "Robotic with recipe management",
      lineIntegration: "Standalone or conveyor-integrated",
    },
    roiMetrics: [
      { label: "Labor reduction", value: "50–70%" },
      { label: "Material savings", value: "20–40%" },
      { label: "Throughput increase", value: "30–60%" },
      { label: "Typical ROI", value: "14–20 months" },
    ],
    caseReferences: [
      { partType: "Cabinet doors", systemConfig: "2× robot cell, HVLP", capacity: "120 doors/hr", roi: "16 months" },
      { partType: "Chair frames", systemConfig: "1× robot cell, rotary table", capacity: "80 parts/hr", roi: "18 months" },
      { partType: "Table tops", systemConfig: "2× robot line, UV cure", capacity: "60 panels/hr", roi: "14 months" },
    ],
    faqs: [
      { question: "What coatings can robotic systems apply to furniture?", answer: "Robotic systems can apply lacquers (nitrocellulose, acrylic, polyurethane), stains, UV-curable coatings, water-based finishes, and pigmented paints." },
      { question: "Can robots handle different furniture shapes?", answer: "Yes. 6-axis robots with offline programming can adapt to various furniture geometries including flat panels, curved surfaces, and complex assemblies." },
      { question: "How does robotic finishing compare to hand spraying quality?", answer: "Robotic systems deliver consistent film thickness and coverage, eliminating common defects like runs, sags, and orange peel that occur with manual application." },
      { question: "What about dust contamination?", answer: "Furniture finishing cells include controlled-environment booths with filtered air supply and proper airflow to prevent dust contamination." },
      { question: "How long does deployment take?", answer: "Typically 10-16 weeks after design approval, depending on system complexity and coating requirements." },
    ],
  },

    painPoints: [
      { title: "Specification compliance", description: "Strict OEM specs (Boeing BMS, Airbus AIMS), mil-specs (MIL-PRF-85285, MIL-PRF-23377), and industry standards require documented compliance." },
      { title: "Traceability requirements", description: "AS9100D and NADCAP require full traceability of coating processes, paint batches, and environmental conditions." },
      { title: "Hazardous coating handling", description: "Chromate primers and cadmium-based paints require enclosed cells with proper ventilation and operator protection." },
      { title: "Complex masking", description: "Multi-color livery, markings, and functional zones require intricate masking for each application step." },
      { title: "High-mix, low-volume", description: "Frequent specification changes and diverse part types demand flexible, recipe-driven programming." },
    ],
    systemModules: [
      { name: "Enclosed Coating Cell", description: "Climate-controlled enclosures with data acquisition for temperature, humidity, DFT, and spray parameters." },
      { name: "Robot Selection", description: "6-axis robots with offline programming for high-mix, low-volume aerospace production environments." },
      { name: "Spray Technology", description: "HVLP and electrostatic systems matched to primer, topcoat, and specialty coating requirements." },
      { name: "Traceability System", description: "Automatic batch record generation with full process documentation for AS9100D/NADCAP compliance." },
      { name: "Hazmat Handling", description: "Ventilation, filtration, and waste handling systems for chromate primers and hazardous coatings." },
    ],
    productionConfig: {
      partsPerHour: "5–40",
      paintType: "Chromate/non-chromate primers, polyurethane topcoats, specialty coatings",
      finishRequirement: "Mil-spec / aerospace-grade / OEM specification",
      automationLevel: "Semi-automatic to full robotic with offline programming",
      lineIntegration: "Batch processing with FAI support",
    },
    roiMetrics: [
      { label: "Rework reduction", value: "60–80%" },
      { label: "Traceability coverage", value: "100%" },
      { label: "Operator exposure reduction", value: "95%+" },
      { label: "Typical ROI", value: "18–28 months" },
    ],
    caseReferences: [
      { partType: "Flight control surfaces", systemConfig: "2× robot cell, HVLP, enclosed", capacity: "12 parts/hr", roi: "22 months" },
      { partType: "Nacelle components", systemConfig: "1× robot cell, electrostatic", capacity: "8 parts/hr", roi: "24 months" },
      { partType: "Interior panels", systemConfig: "2× robot line, multi-color", capacity: "30 panels/hr", roi: "18 months" },
    ],
    faqs: [
      { question: "What specifications govern aerospace coatings?", answer: "OEM specifications (Boeing BMS, Airbus AIMS), military specifications (MIL-PRF-85285, MIL-PRF-23377), and industry standards (AMS, SAE)." },
      { question: "Why is traceability so important in aerospace painting?", answer: "AS9100D and NADCAP require full traceability including paint batch, application parameters, environmental conditions, and system identification for the aircraft's service life." },
      { question: "Can robotic systems handle low-volume aerospace production?", answer: "Yes. Semi-automatic cells with offline programming and recipe management enable quick changeover for high-mix, low-volume production." },
      { question: "How do you handle hazardous coatings?", answer: "Enclosed cells with proper ventilation, filtration, and waste handling reduce operator exposure to chromate primers and cadmium-based paints." },
      { question: "How long does deployment take?", answer: "Typically 14-20 weeks due to specification validation, documentation requirements, and qualification testing including FAI." },
    ],
  },

  "automotive-exterior-parts": {
    slug: "automotive-exterior-parts",
    industry: "plastics",
    industryLabel: "Automotive Exterior Parts",
    metaTitle: "Robotic Coating Automation for Automotive Exterior Parts | TD",
    metaDescription: "Automated spray coating systems for plastic and composite parts. Specialized surface preparation and adhesion-optimized processes for automotive, consumer, and industrial applications.",
    heroTitle: "Robotic coating automation for plastics & composites",
    heroSubtitle: "Engineered systems for adhesion-critical coatings on plastic and composite substrates.",
    heroImage: "/industry-heroes/plastics.jpg",
    ctaText: "Start your plastics project",
    examplePrompt: "We manufacture automotive bumpers and need consistent basecoat/clearcoat finish with proper adhesion.",
    aiContext: { industry: "plastics", finish: "decorative / functional", throughput: "medium-high" },
    painPoints: [
      { title: "Adhesion failures", description: "Coatings peeling or flaking due to improper surface preparation on low-energy plastic substrates." },
      { title: "Static and dust", description: "Non-conductive surfaces attract contamination and affect spray patterns." },
      { title: "Part-to-part variation", description: "Molding variation requires adaptive spray paths for consistent coverage." },
      { title: "Heat sensitivity", description: "Standard curing processes may damage heat-sensitive plastic substrates." },
      { title: "Complex geometries", description: "Deep draws and undercuts difficult to coat consistently by hand." },
    ],
    systemModules: [
      { name: "Surface Preparation", description: "Flame, plasma, or primer systems integrated for reliable adhesion on challenging substrates." },
      { name: "Robot Selection", description: "6-axis robots with vision systems for part detection and spray path adaptation." },
      { name: "Spray Technology", description: "HVLP, electrostatic, or air-assisted systems matched to coating and substrate requirements." },
      { name: "Booth & Controls", description: "Temperature-controlled booths with static elimination and proper airflow management." },
      { name: "Low-Temp Curing", description: "IR, convection, or air-dry options compatible with heat-sensitive substrates." },
    ],
    productionConfig: {
      partsPerHour: "80–300",
      paintType: "Primers, basecoats, clearcoats, soft-touch",
      finishRequirement: "Automotive-grade / decorative",
      automationLevel: "Robotic with surface prep integration",
      lineIntegration: "Inline or batch with flame/plasma stations",
    },
    roiMetrics: [
      { label: "Adhesion failures reduced", value: "90%+" },
      { label: "Transfer efficiency", value: "65–85%" },
      { label: "Throughput increase", value: "35–60%" },
      { label: "Typical ROI", value: "12–18 months" },
    ],
    caseReferences: [
      { partType: "Automotive bumpers", systemConfig: "3× robot line, flame prep", capacity: "180 parts/hr", roi: "14 months" },
      { partType: "Electronics housings", systemConfig: "2× robot cell, plasma", capacity: "240 parts/hr", roi: "12 months" },
      { partType: "Appliance panels", systemConfig: "2× robot line, electrostatic", capacity: "300 parts/hr", roi: "16 months" },
    ],
    faqs: [
      { question: "Why is painting plastics different from metal?", answer: "Plastics have low surface energy, static buildup, heat sensitivity, and outgassing issues that require specialized surface preparation and coating processes." },
      { question: "What surface preparation is needed?", answer: "Depending on substrate, preparation may include flame treatment, plasma treatment, adhesion promoters, or conductive primers." },
      { question: "Can electrostatic spraying work on non-conductive plastics?", answer: "Yes, with conductive primers or specialized techniques to enable electrostatic wraparound and improved transfer efficiency." },
      { question: "How do robots handle molding variation?", answer: "Vision systems can detect part position and adapt spray paths in real-time to compensate for part-to-part variation." },
      { question: "How long does deployment take?", answer: "Typically 10-14 weeks after design approval, depending on surface preparation requirements and coating complexity." },
    ],
  },

  "battery-coating": {
    slug: "battery-coating",
    industry: "battery",
    industryLabel: "Battery & Energy Storage",
    metaTitle: "Robotic Coating Automation for Battery Manufacturing | TD",
    metaDescription: "Precision coating systems for EV battery cells, modules, and packs. Thermal barrier coatings, insulation application, and electrode coating with cleanroom-ready automation.",
    heroTitle: "Robotic coating automation for battery manufacturing",
    heroSubtitle: "Engineered systems for precision coating in EV battery and energy storage production.",
    heroImage: "/industry-heroes/battery.jpg",
    ctaText: "Start your battery coating project",
    examplePrompt: "We manufacture EV battery modules and need automated thermal barrier coating with precise thickness control.",
    aiContext: { industry: "battery", finish: "functional / thermal barrier", throughput: "medium-high" },
    painPoints: [
      { title: "Coating thickness precision", description: "Battery thermal coatings require ±5 micron tolerance for consistent thermal management and safety performance." },
      { title: "Cleanroom requirements", description: "Lithium-ion battery production demands ISO Class 7/8 cleanroom environments with controlled humidity and particulate levels." },
      { title: "High-volume scaling", description: "EV market growth requires rapid production scaling from pilot to gigafactory volumes." },
      { title: "Material compatibility", description: "Specialized coatings (ceramic, silicone, polyurethane) require precise temperature and viscosity control." },
      { title: "Traceability demands", description: "Automotive OEMs require full process traceability and MES integration for quality assurance." },
    ],
    systemModules: [
      { name: "Precision Dispensing", description: "Servo-controlled dispensing heads with flow monitoring for consistent coating weight and thickness." },
      { name: "Cleanroom Integration", description: "ISO Class 7/8 compatible enclosures with HEPA filtration and positive pressure maintenance." },
      { name: "Robot Selection", description: "6-axis robots with cleanroom-rated IP65+ protection and low-particle generation design." },
      { name: "Vision Inspection", description: "Inline 3D scanning and thermal imaging for real-time coating quality verification." },
      { name: "MES Connectivity", description: "Full process data logging with automotive-grade traceability and SPC integration." },
    ],
    productionConfig: {
      partsPerHour: "100–500",
      paintType: "Thermal barrier, ceramic, silicone, dielectric coatings",
      finishRequirement: "Functional / thermal management / insulation",
      automationLevel: "Full robotic with inline inspection",
      lineIntegration: "Cleanroom-integrated with battery assembly line",
    },
    roiMetrics: [
      { label: "Coating consistency", value: "±5 micron DFT" },
      { label: "Scrap reduction", value: "85–95%" },
      { label: "Throughput increase", value: "200–400%" },
      { label: "Typical ROI", value: "8–14 months" },
    ],
    caseReferences: [
      { partType: "Battery cell casings", systemConfig: "2× robot cell, precision dispense", capacity: "300 cells/hr", roi: "10 months" },
      { partType: "Module thermal barriers", systemConfig: "3× robot line, ceramic spray", capacity: "120 modules/hr", roi: "12 months" },
      { partType: "Pack enclosures", systemConfig: "2× robot cell, insulation coating", capacity: "40 packs/hr", roi: "14 months" },
    ],
    faqs: [
      { question: "What coatings are used in battery manufacturing?", answer: "Thermal barrier coatings, ceramic insulation, dielectric coatings, and silicone-based materials for thermal management, electrical insulation, and fire resistance." },
      { question: "Can robotic systems operate in cleanroom environments?", answer: "Yes. Cleanroom-rated robots with IP65+ protection, low-particle generation, and HEPA-filtered enclosures maintain ISO Class 7/8 requirements." },
      { question: "How is coating thickness controlled?", answer: "Servo-controlled dispensing with flow monitoring, inline thickness measurement, and closed-loop feedback maintain ±5 micron tolerance." },
      { question: "What traceability is available?", answer: "Full process data logging including coating weight, thickness, cure parameters, and environmental conditions with MES integration for automotive OEM requirements." },
      { question: "How long does deployment take?", answer: "Typically 12-18 weeks including cleanroom qualification, depending on production volume and integration complexity." },
    ],
  },

  "medical-device-coating": {
    slug: "medical-device-coating",
    industry: "medical",
    industryLabel: "Medical Device",
    metaTitle: "Robotic Coating Automation for Medical Device Manufacturing | TD",
    metaDescription: "Precision coating systems for medical devices and implants. Biocompatible coatings, antimicrobial finishes, and FDA-compliant process control for surgical instruments, implants, and diagnostic equipment.",
    heroTitle: "Robotic coating automation for medical devices",
    heroSubtitle: "Engineered systems for biocompatible and functional coatings with regulatory compliance.",
    heroImage: "/industry-heroes/medical.jpg",
    ctaText: "Start your medical device coating project",
    examplePrompt: "We manufacture surgical instruments and need automated antimicrobial coating with FDA 21 CFR Part 11 compliance.",
    aiContext: { industry: "medical", finish: "biocompatible / antimicrobial", throughput: "low-medium" },
    painPoints: [
      { title: "Regulatory compliance", description: "FDA 21 CFR Part 11, ISO 13485, and MDR requirements demand validated processes with full documentation." },
      { title: "Biocompatibility validation", description: "Coating materials must meet ISO 10993 biocompatibility testing standards for patient safety." },
      { title: "Micro-coating precision", description: "Small medical devices and implants require micrometer-level coating thickness control." },
      { title: "Cleanroom production", description: "ISO Class 5-7 cleanroom environments required for implant and sterile device coating." },
      { title: "Batch traceability", description: "Complete lot traceability and electronic batch records required for regulatory audits." },
    ],
    systemModules: [
      { name: "Micro-Dispensing", description: "Ultra-precision dispensing systems for coatings on small-scale medical devices and implants." },
      { name: "Validated Process Control", description: "21 CFR Part 11 compliant software with electronic signatures, audit trails, and access control." },
      { name: "Cleanroom Enclosure", description: "ISO Class 5-7 compatible coating cells with laminar flow and environmental monitoring." },
      { name: "Robot Selection", description: "Compact 6-axis robots with cleanroom certification and sterilization-compatible materials." },
      { name: "Quality Documentation", description: "Automated IQ/OQ/PQ documentation generation and electronic batch record systems." },
    ],
    productionConfig: {
      partsPerHour: "20–200",
      paintType: "PTFE, silicone, antimicrobial, hydrophilic, drug-eluting coatings",
      finishRequirement: "Biocompatible / antimicrobial / functional",
      automationLevel: "Robotic with validated process control",
      lineIntegration: "Cleanroom-integrated with sterilization workflow",
    },
    roiMetrics: [
      { label: "Coating uniformity", value: "±2 micron" },
      { label: "Regulatory compliance", value: "100%" },
      { label: "Rework reduction", value: "90–98%" },
      { label: "Typical ROI", value: "14–24 months" },
    ],
    caseReferences: [
      { partType: "Surgical instruments", systemConfig: "1× robot cell, PTFE spray", capacity: "150 parts/hr", roi: "18 months" },
      { partType: "Orthopedic implants", systemConfig: "2× robot cell, hydroxyapatite", capacity: "60 implants/hr", roi: "20 months" },
      { partType: "Catheter assemblies", systemConfig: "1× robot cell, hydrophilic dip", capacity: "200 parts/hr", roi: "16 months" },
    ],
    faqs: [
      { question: "What regulatory requirements apply to medical device coating?", answer: "FDA 21 CFR Part 11 for electronic records, ISO 13485 for quality management, ISO 10993 for biocompatibility, and EU MDR for European market compliance." },
      { question: "What coating types are used for medical devices?", answer: "PTFE for lubricity, antimicrobial coatings for infection control, hydrophilic coatings for catheters, drug-eluting coatings for stents, and hydroxyapatite for implant osseointegration." },
      { question: "How is process validation handled?", answer: "Full IQ/OQ/PQ validation protocols with documented evidence, process capability studies, and ongoing process verification per FDA guidance." },
      { question: "Can small implants be coated robotically?", answer: "Yes. Micro-dispensing systems with sub-millimeter accuracy enable coating of small implants, stents, and micro-surgical instruments." },
      { question: "How long does deployment take including validation?", answer: "Typically 16-24 weeks including equipment qualification, process validation, and documentation per regulatory requirements." },
    ],
  },
};
