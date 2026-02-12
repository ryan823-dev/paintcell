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
    metaDescription: "Automated spray painting systems for construction and heavy machinery components.",
    heroTitle: "Robotic painting automation for construction machinery",
    heroSubtitle: "Engineered systems for heavy-duty protective finishes and high-volume production.",
    ctaText: "Start your construction machinery project",
    examplePrompt: "",
    aiContext: { industry: "construction-machinery", finish: "heavy-duty protective", throughput: "medium" },
    painPoints: [],
    systemModules: [],
    productionConfig: { partsPerHour: "—", paintType: "—", finishRequirement: "—", automationLevel: "—", lineIntegration: "—" },
    roiMetrics: [],
    caseReferences: [],
    faqs: [],
    comingSoon: true,
  },

  "hardware-sanitary": {
    slug: "hardware-sanitary",
    industry: "hardware",
    industryLabel: "Hardware & Sanitary",
    metaTitle: "Robotic Painting Automation for Hardware & Sanitary Products | TD",
    metaDescription: "Automated spray painting systems for hardware fittings and sanitary ware.",
    heroTitle: "Robotic painting automation for hardware & sanitary",
    heroSubtitle: "Engineered systems for decorative finishes on fittings, fixtures, and sanitary products.",
    ctaText: "Start your hardware project",
    examplePrompt: "",
    aiContext: { industry: "hardware-sanitary", finish: "decorative / chrome-alternative", throughput: "medium-high" },
    painPoints: [],
    systemModules: [],
    productionConfig: { partsPerHour: "—", paintType: "—", finishRequirement: "—", automationLevel: "—", lineIntegration: "—" },
    roiMetrics: [],
    caseReferences: [],
    faqs: [],
    comingSoon: true,
  },

  "furniture-woodwork": {
    slug: "furniture-woodwork",
    industry: "furniture",
    industryLabel: "Furniture & Woodwork",
    metaTitle: "Robotic Painting Automation for Furniture & Woodwork | TD",
    metaDescription: "Automated spray painting and lacquering systems for furniture and wood products.",
    heroTitle: "Robotic painting automation for furniture & woodwork",
    heroSubtitle: "Engineered systems for precision lacquering and staining on wood surfaces.",
    ctaText: "Start your furniture project",
    examplePrompt: "",
    aiContext: { industry: "furniture", finish: "lacquer / stain / UV", throughput: "medium" },
    painPoints: [],
    systemModules: [],
    productionConfig: { partsPerHour: "—", paintType: "—", finishRequirement: "—", automationLevel: "—", lineIntegration: "—" },
    roiMetrics: [],
    caseReferences: [],
    faqs: [],
    comingSoon: true,
  },

  "aerospace-defense": {
    slug: "aerospace-defense",
    industry: "aerospace",
    industryLabel: "Aerospace & Defense",
    metaTitle: "Robotic Painting Automation for Aerospace & Defense | TD",
    metaDescription: "Automated spray painting systems for aerospace and defense components with strict specification compliance.",
    heroTitle: "Robotic painting automation for aerospace & defense",
    heroSubtitle: "Engineered systems for mil-spec and aerospace-grade finishing requirements.",
    ctaText: "Start your aerospace project",
    examplePrompt: "",
    aiContext: { industry: "aerospace", finish: "mil-spec / aerospace-grade", throughput: "low-medium" },
    painPoints: [],
    systemModules: [],
    productionConfig: { partsPerHour: "—", paintType: "—", finishRequirement: "—", automationLevel: "—", lineIntegration: "—" },
    roiMetrics: [],
    caseReferences: [],
    faqs: [],
    comingSoon: true,
  },

  "plastics-composites": {
    slug: "plastics-composites",
    industry: "plastics",
    industryLabel: "Plastics & Composites",
    metaTitle: "Robotic Painting Automation for Plastics & Composites | TD",
    metaDescription: "Automated spray painting systems for plastic and composite parts requiring specialized adhesion and finish quality.",
    heroTitle: "Robotic painting automation for plastics & composites",
    heroSubtitle: "Engineered systems for adhesion-critical coatings on plastic and composite substrates.",
    ctaText: "Start your plastics project",
    examplePrompt: "",
    aiContext: { industry: "plastics", finish: "decorative / functional", throughput: "medium-high" },
    painPoints: [],
    systemModules: [],
    productionConfig: { partsPerHour: "—", paintType: "—", finishRequirement: "—", automationLevel: "—", lineIntegration: "—" },
    roiMetrics: [],
    caseReferences: [],
    faqs: [],
    comingSoon: true,
  },
};
