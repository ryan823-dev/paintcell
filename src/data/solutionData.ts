export interface SolutionFAQ {
  question: string;
  answer: string;
}

export interface ProcessStep {
  title: string;
  description: string;
  parameters?: string;
}

export interface ConfigOption {
  scenario: string;
  recommendation: string;
  suitableFor: string;
}

export interface SolutionData {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  definition: string;
  processSteps: ProcessStep[];
  applicationScope: string[];
  configOptions: ConfigOption[];
  constraints: string[];
  roiMethodology: string;
  roiMetrics: { label: string; value: string }[];
  timeline: { phase: string; duration: string; description: string }[];
  faqs: SolutionFAQ[];
  relatedIndustries: { label: string; href: string }[];
  relatedKnowledge: { label: string; href: string }[];
}

export const solutions: Record<string, SolutionData> = {
  "robotic-painting-system": {
    slug: "robotic-painting-system",
    metaTitle: "Robotic Painting System | Robotic Painting System Integrator | TD",
    metaDescription: "Robotic painting system implementation guide. Process flow, ROI analysis, and configuration options. Engineering-focused approach for industrial applications.",
    heroTitle: "Robotic Painting System",
    heroSubtitle: "End-to-end automated spray painting solution — from feasibility to production deployment.",
    definition: "A robotic painting system is a fully integrated automation cell that replaces manual spray painting with programmable robot-controlled application. The system encompasses industrial robots, spray equipment, paint supply infrastructure, environmental controls (booth, ventilation), and process management software. TD designs, engineers, and deploys these systems as turnkey solutions tailored to specific production requirements.",
    processSteps: [
      { title: "Surface Preparation", description: "Parts are cleaned, masked, and fixtured for consistent presentation to the robot.", parameters: "Cleanliness standard, masking complexity, fixture design" },
      { title: "Paint Preparation", description: "Coating material is mixed, filtered, and conditioned to specification (viscosity, temperature, catalyst ratio).", parameters: "Viscosity range, pot life, mixing ratio, filtration grade" },
      { title: "Robotic Application", description: "6-axis robot executes pre-programmed spray paths with controlled parameters: fan width, atomization pressure, flow rate, and gun distance.", parameters: "Spray speed, overlap %, gun distance, bell/cup RPM" },
      { title: "Flash & Cure", description: "Coated parts undergo flash-off and curing per paint specification — ambient, forced air, IR, or oven.", parameters: "Flash time, cure temperature, dwell time" },
      { title: "Quality Inspection", description: "Film build, appearance, and adhesion are verified against acceptance criteria.", parameters: "DFT range, gloss target, cross-cut adhesion grade" },
    ],
    applicationScope: [
      "Automotive components — brackets, housings, trim panels, under-body parts",
      "Metal fabrication — enclosures, frames, structural steel, heat sinks",
      "Appliance manufacturing — panels, doors, housings, internal components",
      "General industrial — valves, fittings, machinery covers, equipment parts",
    ],
    configOptions: [
      { scenario: "Low volume, high mix", recommendation: "Single robot cell with offline programming and quick-change fixturing", suitableFor: "Job shops, prototype runs, contract coaters" },
      { scenario: "Medium volume, moderate mix", recommendation: "Dual robot cell with automated part handling and recipe management", suitableFor: "OEM Tier 1-2 suppliers, batch production" },
      { scenario: "High volume, low mix", recommendation: "Multi-robot inline system with conveyor integration and auto color change", suitableFor: "Mass production, appliance lines, automotive assembly" },
    ],
    constraints: [
      "Part geometry must allow robot reach and spray angle coverage",
      "Production environment must support ATEX/NFPA requirements for spray painting",
      "Minimum production volume should justify automation investment (typically >50 parts/day)",
      "Paint chemistry must be compatible with robotic application equipment",
      "Facility must have adequate power, compressed air, and ventilation infrastructure",
    ],
    roiMethodology: "ROI is calculated by comparing total cost of ownership (TCO) between manual and automated painting. Key variables include labor rates, paint consumption (transfer efficiency delta), reject/rework rates, throughput improvement, and maintenance costs. Payback is typically measured from system commissioning to breakeven.",
    roiMetrics: [
      { label: "Labor cost reduction", value: "40–70%" },
      { label: "Paint material savings", value: "15–35%" },
      { label: "Throughput improvement", value: "25–60%" },
      { label: "Rework reduction", value: "50–80%" },
      { label: "Typical payback", value: "12–24 months" },
    ],
    timeline: [
      { phase: "Feasibility & Concept", duration: "2–3 weeks", description: "Technical assessment, layout concept, budget estimate" },
      { phase: "Detail Engineering", duration: "4–6 weeks", description: "3D design, electrical schematics, process simulation" },
      { phase: "Manufacturing", duration: "6–10 weeks", description: "Booth fabrication, system assembly, component procurement" },
      { phase: "Factory Acceptance", duration: "1–2 weeks", description: "Full system testing, customer witness, adjustments" },
      { phase: "Installation", duration: "2–4 weeks", description: "On-site setup, integration, commissioning" },
      { phase: "Training & Handover", duration: "1–2 weeks", description: "Operator training, documentation, support transition" },
    ],
    faqs: [
      { question: "What is a robotic painting system?", answer: "A robotic painting system is an automated manufacturing cell where industrial robots perform spray painting operations. It includes the robot, spray equipment, paint delivery system, spray booth with ventilation, and process control software — all integrated into a turnkey production solution." },
      { question: "How much does a robotic painting system cost?", answer: "System costs vary significantly based on throughput requirements, number of robots, paint technology, and integration complexity. A single-cell system starts at a different baseline than a multi-robot production line. Contact us for a preliminary budget assessment based on your specific requirements." },
      { question: "How long does it take to deploy a robotic painting system?", answer: "Typical project timelines range from 16–26 weeks from concept approval to production handover, depending on system complexity, custom engineering requirements, and integration scope." },
      { question: "Can a robotic system handle multiple paint types and colors?", answer: "Yes. Modern systems support automatic color change with changeover times under 60 seconds. They handle solvent-based, water-based, 2K, and specialty coatings with appropriate equipment selection." },
      { question: "What maintenance does a robotic painting system require?", answer: "Routine maintenance includes robot calibration checks, spray equipment cleaning/replacement (nozzles, filters), paint supply system maintenance, and booth filter management. Most systems require 30–60 minutes of daily maintenance and periodic scheduled service intervals." },
    ],
    relatedIndustries: [
      { label: "Automotive Painting", href: "/industries/automotive-painting" },
      { label: "Metal Parts Finishing", href: "/industries/metal-parts-finishing" },
      { label: "Appliance Coating", href: "/industries/appliance-coating" },
    ],
    relatedKnowledge: [
      { label: "How to Choose a Paint Robot", href: "/resources/knowledge/how-to-choose-paint-robot" },
      { label: "Robotic Painting Cost Guide", href: "/resources/knowledge/robotic-painting-cost-guide" },
    ],
  },

  "paint-booth-automation": {
    slug: "paint-booth-automation",
    metaTitle: "Paint Booth Automation | Robotic Painting System Integrator | TD",
    metaDescription: "Paint booth automation implementation guide. Process flow, ROI analysis, and configuration options. Engineering-focused approach for industrial painting environments.",
    heroTitle: "Paint Booth Automation",
    heroSubtitle: "Engineered spray booth systems with integrated robotics, ventilation, and environmental controls.",
    definition: "Paint booth automation transforms a passive spray enclosure into an active, controlled production system. TD integrates robotic application, automated part handling, intelligent ventilation control, and real-time process monitoring into a unified booth architecture. The result is a production-ready environment that meets safety, quality, and throughput requirements simultaneously.",
    processSteps: [
      { title: "Booth Design & Sizing", description: "Booth dimensions, airflow type (downdraft/crossdraft), and filtration are engineered based on part size, paint type, and throughput.", parameters: "Booth dimensions, air velocity, filter stages, exhaust CFM" },
      { title: "Ventilation Engineering", description: "Supply and exhaust air systems are designed to maintain proper airflow, temperature, and humidity for coating quality and safety.", parameters: "Air changes/hour, temperature range, humidity control, filter efficiency" },
      { title: "Robot Integration", description: "Robots are positioned within the booth envelope with optimized reach coverage and safe maintenance access.", parameters: "Robot reach envelope, mounting position, safety zones" },
      { title: "Environmental Controls", description: "PLC-controlled systems manage booth pressure, temperature, lighting, and fire suppression automatically.", parameters: "Pressure differential, temp tolerance, lux level, suppression type" },
      { title: "Compliance Verification", description: "Completed system is tested against applicable safety and environmental standards.", parameters: "NFPA 33, local fire codes, VOC emission limits" },
    ],
    applicationScope: [
      "New booth construction — purpose-built for robotic painting operations",
      "Existing booth retrofit — adding automation to manual spray booths",
      "Multi-booth production lines — sequential prime/base/clear coat application",
      "Specialty environments — cleanroom-grade, high-temperature, or hazardous area booths",
    ],
    configOptions: [
      { scenario: "Small parts, batch production", recommendation: "Compact enclosed booth with single robot and dry filter exhaust", suitableFor: "Job shops, small component painting" },
      { scenario: "Medium parts, continuous flow", recommendation: "Drive-through booth with dual robots and water wash exhaust", suitableFor: "Automotive suppliers, metal fabrication" },
      { scenario: "Large parts or assemblies", recommendation: "Open-face or tunnel booth with extended robot reach and multi-zone ventilation", suitableFor: "Heavy machinery, large panel painting" },
    ],
    constraints: [
      "Facility ceiling height must accommodate booth structure plus HVAC ducting",
      "Adequate makeup air supply required for booth exhaust volume",
      "Floor loading capacity must support booth structure and equipment weight",
      "Local fire code compliance may require specific suppression systems",
      "Noise levels from ventilation must comply with workplace regulations",
    ],
    roiMethodology: "Booth automation ROI combines direct savings (labor, material, energy) with indirect benefits (quality improvement, reduced rework, compliance risk mitigation). Energy cost reduction from intelligent ventilation control alone can account for 15–25% of annual operating savings.",
    roiMetrics: [
      { label: "Energy savings", value: "15–30%" },
      { label: "Filter consumption reduction", value: "20–40%" },
      { label: "Overspray capture rate", value: ">95%" },
      { label: "Defect reduction", value: "40–70%" },
      { label: "Typical payback", value: "18–30 months" },
    ],
    timeline: [
      { phase: "Site Survey & Concept", duration: "1–2 weeks", description: "Facility assessment, layout options, preliminary design" },
      { phase: "Detail Engineering", duration: "3–5 weeks", description: "Structural design, HVAC engineering, electrical layout" },
      { phase: "Fabrication", duration: "6–12 weeks", description: "Booth panel manufacture, ductwork, system assembly" },
      { phase: "Installation", duration: "3–6 weeks", description: "On-site construction, equipment mounting, utilities connection" },
      { phase: "Commissioning", duration: "1–2 weeks", description: "Airflow balancing, safety testing, production trials" },
      { phase: "Handover", duration: "1 week", description: "Documentation, training, warranty activation" },
    ],
    faqs: [
      { question: "What is paint booth automation?", answer: "Paint booth automation is the integration of robotic spray painting, automated part handling, and intelligent environmental controls into a spray booth. It transforms a passive enclosure into an active, production-ready system that manages coating application, ventilation, and safety automatically." },
      { question: "Can an existing spray booth be automated?", answer: "In many cases, yes. Retrofit feasibility depends on booth dimensions (robot reach envelope), structural integrity (robot mounting), ventilation capacity, and electrical infrastructure. A site survey determines what modifications are required." },
      { question: "What ventilation requirements does an automated booth need?", answer: "Automated booths typically require 60–100 FPM (feet per minute) air velocity across the spray zone, with proper makeup air heating/cooling and multi-stage filtration. Exact requirements depend on paint type, booth size, and local regulations." },
      { question: "How does booth automation improve paint quality?", answer: "Controlled airflow eliminates contaminants, consistent temperature and humidity stabilize paint behavior, and robotic application ensures repeatable film build and coverage. These factors combined reduce defects by 40–70% compared to manual booths." },
    ],
    relatedIndustries: [
      { label: "Automotive Painting", href: "/industries/automotive-painting" },
      { label: "Appliance Coating", href: "/industries/appliance-coating" },
    ],
    relatedKnowledge: [
      { label: "Paint Booth Design Basics", href: "/resources/knowledge/paint-booth-design-basics" },
      { label: "Ventilation & Airflow", href: "/resources/standards-compliance/ventilation-airflow" },
    ],
  },

  "spray-robot-integration": {
    slug: "spray-robot-integration",
    metaTitle: "Spray Robot Integration | Robotic Painting System Integrator | TD",
    metaDescription: "Spray robot integration implementation guide. Robot selection, programming, and production line integration for industrial spray painting automation.",
    heroTitle: "Spray Robot Integration",
    heroSubtitle: "Expert selection, programming, and production-line integration of industrial spray painting robots.",
    definition: "Spray robot integration is the engineering discipline of selecting, configuring, and deploying industrial robots specifically for spray painting applications. Unlike general robotics, painting robots require explosion-proof design, hollow-wrist construction for paint line routing, and specialized programming for spray path optimization. TD provides end-to-end integration from robot selection through production validation.",
    processSteps: [
      { title: "Requirements Analysis", description: "Part geometry, production volume, paint type, and quality targets are analyzed to define robot specifications.", parameters: "Reach requirement, payload, IP rating, EX certification" },
      { title: "Robot Selection", description: "Robot model is selected based on reach, speed, repeatability, and painting-specific features (hollow wrist, EX-proof).", parameters: "Brand/model, axes, reach, repeatability, protection class" },
      { title: "Cell Layout Design", description: "Robot position, part flow, safety zones, and service access are engineered in 3D.", parameters: "Working envelope, cycle time simulation, safety distance" },
      { title: "Path Programming", description: "Spray paths are programmed offline using CAD data, then optimized on-site with actual parts.", parameters: "Path speed, trigger points, overlap pattern, approach angles" },
      { title: "Production Validation", description: "System runs production trials to verify cycle time, quality, and reliability targets.", parameters: "Cpk values, cycle time consistency, uptime %" },
    ],
    applicationScope: [
      "New cell integration — robot as core of a new painting system",
      "Line addition — adding robots to existing painting lines",
      "Robot replacement — upgrading or replacing aging painting robots",
      "Multi-robot coordination — synchronized painting with multiple robots",
    ],
    configOptions: [
      { scenario: "Small parts, simple geometry", recommendation: "Compact 6-axis robot (900–1400mm reach) with HVLP or airless gun", suitableFor: "Small components, hardware, fittings" },
      { scenario: "Medium parts, complex geometry", recommendation: "Standard painting robot (1800–2500mm reach) with rotary bell atomizer", suitableFor: "Automotive parts, enclosures, panels" },
      { scenario: "Large parts or multi-surface", recommendation: "Extended reach robot (2800mm+) on linear track, or dual robot setup", suitableFor: "Large assemblies, vehicles, heavy machinery" },
    ],
    constraints: [
      "Robot must be certified for use in explosive atmospheres (ATEX/IECEx) for solvent-based painting",
      "Hollow wrist design is strongly recommended for spray line routing and maintenance",
      "Robot controller must support painting-specific I/O for gun control, color change, and flow regulation",
      "Foundation and mounting must account for robot weight and dynamic loads",
      "Programming requires painting-specific expertise — general robot programming skills are insufficient",
    ],
    roiMethodology: "Robot integration ROI is driven by labor displacement, quality improvement, and throughput gains. Key calculation inputs include current manual painting cost per part, target automated cost per part, capital investment, and ongoing maintenance. Transfer efficiency improvement (from ~30% manual to ~65–85% robotic) directly reduces paint material cost.",
    roiMetrics: [
      { label: "Transfer efficiency gain", value: "30% → 65–85%" },
      { label: "Cycle time reduction", value: "20–50%" },
      { label: "Quality consistency", value: "Cpk >1.33" },
      { label: "Robot utilization rate", value: ">85%" },
      { label: "Typical payback", value: "14–24 months" },
    ],
    timeline: [
      { phase: "Specification & Selection", duration: "1–2 weeks", description: "Requirements definition, robot model selection" },
      { phase: "Cell Engineering", duration: "3–5 weeks", description: "Layout, electrical, safety design" },
      { phase: "Procurement & Build", duration: "4–8 weeks", description: "Robot delivery, cell construction, wiring" },
      { phase: "Programming", duration: "2–4 weeks", description: "Offline programming, on-site teach, optimization" },
      { phase: "Commissioning", duration: "1–2 weeks", description: "Production trials, parameter tuning, acceptance" },
      { phase: "Training", duration: "1 week", description: "Operator and maintenance training" },
    ],
    faqs: [
      { question: "What is spray robot integration?", answer: "Spray robot integration is the process of selecting, configuring, programming, and deploying industrial robots specifically designed for spray painting applications. It requires expertise in both robotics and coating technology to achieve optimal results." },
      { question: "Which robot brands are best for spray painting?", answer: "Major painting robot manufacturers include ABB, FANUC, Kawasaki, and Yaskawa. Each offers explosion-proof models with hollow-wrist designs specific to painting. Robot selection depends on reach, speed, and specific application requirements rather than brand alone." },
      { question: "How is a painting robot different from a general industrial robot?", answer: "Painting robots feature explosion-proof construction (ATEX/IECEx certified), hollow wrist designs for internal paint line routing, specialized painting software, and process I/O for gun control. General robots lack these safety features and painting-specific capabilities." },
      { question: "Can an existing robot be reprogrammed for different parts?", answer: "Yes. One of the key advantages of robotic painting is flexibility. Offline programming allows new parts to be programmed from CAD data without stopping production. Recipe-based systems can store hundreds of part programs for quick changeover." },
    ],
    relatedIndustries: [
      { label: "Automotive Painting", href: "/industries/automotive-painting" },
      { label: "Metal Parts Finishing", href: "/industries/metal-parts-finishing" },
    ],
    relatedKnowledge: [
      { label: "How to Choose a Paint Robot", href: "/resources/knowledge/how-to-choose-paint-robot" },
      { label: "Robotic Painting Cost Guide", href: "/resources/knowledge/robotic-painting-cost-guide" },
    ],
  },
};
