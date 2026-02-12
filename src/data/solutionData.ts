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
  /** Optional second paragraph for definition block */
  definitionSecondary?: string;
  /** "What TD Delivers" scope section */
  scopeIntro?: string;
  scopeItems?: string[];
  processSteps: ProcessStep[];
  applicationScope: string[];
  applicationScopeIntro?: string;
  configOptions: ConfigOption[];
  /** Key Technical Parameters */
  technicalParameters?: string[];
  technicalParametersIntro?: string;
  constraints: string[];
  /** ATEX / Explosion-Proof section */
  atexIntro?: string;
  atexItems?: string[];
  roiMethodology: string;
  roiMetrics: { label: string; value: string }[];
  /** Deployment timeline note */
  deploymentNote?: string;
  timeline: { phase: string; duration: string; description: string }[];
  faqs: SolutionFAQ[];
  relatedIndustries: { label: string; href: string }[];
  relatedKnowledge: { label: string; href: string }[];
}

export const solutions: Record<string, SolutionData> = {
  "robotic-painting-system": {
    slug: "robotic-painting-system",
    metaTitle: "Robotic Painting System Integration | Paint Booth Automation & ATEX Options | TD",
    metaDescription: "Engineering and integration of robotic painting systems, spray painting cells, and paint booth automation. ABB-led integrations with electrostatic, HVLP, and air spray options. ATEX-ready configurations and fast deployment timelines for automotive and industrial finishing.",
    heroTitle: "Robotic Painting System Integration",
    heroSubtitle: "We provide system-level integration rather than standalone equipment. Our solutions combine robot selection, spray process configuration, booth design, control integration, and commissioning support. Applications primarily serve automotive component production and industrial finishing environments targeting global markets including Europe and North America.",
    definition: "A robotic painting system is an automated coating solution integrating industrial robots, spray technologies, paint supply systems, paint booth airflow/ventilation, and process control to deliver repeatable finish quality and stable production throughput.",
    definitionSecondary: "TD Robotic Painting Systems engineers and integrates robotic painting cells and automated spray painting workstations for automotive component manufacturing and industrial finishing worldwide.",
    scopeIntro: "TD provides end-to-end system integration, including:",
    scopeItems: [
      "Robotic painting cell design and commissioning",
      "Paint booth automation (new booth build or integration with existing booths)",
      "Paint supply and fluid control integration",
      "Controls integration (PLC + robot controller + HMI)",
      "Process tuning for repeatability and throughput",
    ],
    processSteps: [
      { title: "Part Positioning", description: "Fixture, handling, and optional conveyor interface for consistent part presentation to the robot." },
      { title: "Spray Execution", description: "Electrostatic, HVLP, or air spray application with programmable robot-controlled parameters." },
      { title: "Paint Supply & Fluid Control", description: "Pump or pressure tank delivery with viscosity, temperature, and flow regulation." },
      { title: "Paint Booth Airflow & Overspray Management", description: "New booth construction or existing booth integration with ventilation and filtration." },
      { title: "Controls & Safety", description: "PLC, robot controller, HMI coordination with interlocks, monitoring, and safety systems." },
      { title: "Process Verification", description: "Production startup support, process validation, and quality verification." },
    ],
    applicationScopeIntro: "Robotic painting systems are commonly applied in:",
    applicationScope: [
      "Automotive component painting — brackets, structural parts, metal assemblies, sub-components",
      "Industrial parts finishing and equipment coating",
      "Metal parts finishing lines requiring stable quality and controlled overspray management",
    ],
    configOptions: [
      { scenario: "Robot brand preference", recommendation: "ABB / FANUC / KUKA / others. ABB integrations are common in our projects, while we can support customer-specified brands.", suitableFor: "All applications" },
      { scenario: "Spray technology selection", recommendation: "Electrostatic, HVLP, or air spray — selected based on part geometry, finish requirement, and transfer efficiency targets.", suitableFor: "Application-dependent" },
      { scenario: "Part dimensions & geometry", recommendation: "System layout and robot reach configured based on part size constraints and fixture design.", suitableFor: "All part types" },
      { scenario: "Throughput targets", recommendation: "Cell capacity and cycle time engineered to meet parts/hour requirements.", suitableFor: "Production volume planning" },
      { scenario: "Color change requirements", recommendation: "Single color or multi-color changeover with automated flush and valve systems.", suitableFor: "Multi-product lines" },
      { scenario: "Line integration mode", recommendation: "Integration with existing production lines or standalone cell deployment.", suitableFor: "Greenfield or retrofit" },
      { scenario: "ATEX / explosion-proof requirements", recommendation: "ATEX-ready configurations depending on site classification and paint type.", suitableFor: "Solvent-based applications" },
    ],
    technicalParametersIntro: "Typical system considerations include:",
    technicalParameters: [
      "Robot reach, payload, and repeatability requirement",
      "Spray speed and coating thickness control targets",
      "Booth dimensions, airflow design, and ventilation constraints",
      "Paint supply method (pump / pressure tank) and fluid stability",
      "Control architecture (PLC + robot controller coordination)",
      "Safety classification and ATEX readiness when required",
    ],
    constraints: [
      "Configuration is finalized during engineering assessment",
      "Parameters vary by application and site constraints",
      "This is system integration, not standalone equipment supply",
      "Primary focus: automotive component manufacturing",
    ],
    atexIntro: "ATEX-ready configurations can be supported based on customer site classification and paint process requirements. ATEX scope is defined during assessment, including:",
    atexItems: [
      "Ventilation and airflow requirements",
      "Electrical and control cabinet considerations",
      "Safety interlocks and monitoring",
      "Process constraints based on paint type and environment",
    ],
    roiMethodology: "ROI depends on production volume, labor structure, and coating requirements. Robotic painting system integration enables measurable operational improvements:",
    roiMetrics: [
      { label: "Coating consistency improvement", value: "Repeatable" },
      { label: "Manual spraying dependency", value: "Reduced" },
      { label: "Production throughput", value: "Stabilized" },
      { label: "Overspray & material waste", value: "Reduced" },
      { label: "Automation scalability", value: "Enabled" },
    ],
    deploymentNote: "Typical lead time: 8–12 weeks after design approval. Extended for complex line integration, multi-color changeover, or specialized ATEX scopes.",
    timeline: [
      { phase: "Requirement Assessment", duration: "Week 1–2", description: "Parts, coating spec, throughput, site constraints" },
      { phase: "System Configuration Planning", duration: "Week 2–3", description: "Robot + spray + booth + controls selection" },
      { phase: "Layout & Integration Design", duration: "Week 3–5", description: "3D layout, electrical schematics, process design" },
      { phase: "Manufacturing & Assembly", duration: "Week 5–10", description: "System build, component procurement, assembly" },
      { phase: "Process Testing & Verification", duration: "Week 10–11", description: "Factory acceptance testing and validation" },
      { phase: "Installation & Commissioning", duration: "Week 11–13", description: "On-site setup, integration, commissioning" },
      { phase: "Production Startup", duration: "Week 13–14", description: "Training, optimization, and production handover" },
    ],
    faqs: [
      { question: "What is robotic painting system integration?", answer: "Turnkey integration of industrial robots, spray process, paint supply, booth/airflow, controls, and commissioning to achieve repeatable coating quality." },
      { question: "Can you build a new paint booth or integrate with an existing booth?", answer: "Both. We can deliver new booth automation or integrate the robotic system into an existing booth environment." },
      { question: "Do you support ABB, FANUC, and KUKA?", answer: "Yes. ABB is common in our projects, and we can also integrate other customer-specified robot brands." },
      { question: "Do you support ATEX / explosion-proof requirements?", answer: "Yes. ATEX readiness is configured based on site classification and process requirements." },
      { question: "How long does deployment typically take?", answer: "Often 8–12 weeks after design approval, depending on complexity and site constraints." },
    ],
    relatedIndustries: [
      { label: "Automotive Painting", href: "/industries/automotive-painting" },
      { label: "Appliance Coating Automation", href: "/industries/appliance-coating" },
      { label: "Metal Parts Finishing", href: "/industries/metal-parts-finishing" },
    ],
    relatedKnowledge: [
      { label: "How to Choose a Paint Robot", href: "/resources/knowledge/how-to-choose-paint-robot" },
      { label: "Robotic Painting Cost Guide", href: "/resources/knowledge/robotic-painting-cost-guide" },
      { label: "Paint Booth Automation", href: "/solutions/paint-booth-automation" },
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
