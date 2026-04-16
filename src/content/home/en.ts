import { companyProfile } from "@/lib/siteTrust";
import type { HomeContent } from "./types";

export const homeContent: HomeContent = {
  seo: {
    metaTitle: "TD Painting Systems | Robotic Painting and Paint Booth Automation",
    metaDescription:
      `Eliminate manual spraying variability with turnkey robotic painting cells and paint booth automation. ${companyProfile.systemsDeployed}+ systems deployed across ${companyProfile.countriesServed}+ countries.`,
    ogDescription:
      `System-level integration of robotic spray painting cells and paint booth automation. ${companyProfile.systemsDeployed}+ systems deployed, ${companyProfile.yearsExperience}+ years of experience, and projects delivered across ${companyProfile.countriesServed}+ countries.`,
    twitterDescription:
      `System-level integration of robotic spray painting cells and paint booth automation. ${companyProfile.systemsDeployed}+ systems deployed across ${companyProfile.countriesServed}+ countries.`,
    organizationDescription:
      "International industrial coating system expert providing turnkey painting shops, robotic workstations, paint supply systems, and technical services.",
    websiteName: "TD Painting Systems - Industrial Coating System Expert",
    webpageName: "TD Painting Systems | Robotic Painting and Paint Booth Automation",
  },
  projectInterface: {
    status: {
      systemActive: "System Active",
      assistantOnline: "AI Online",
      interfaceReady: "Project Interface Ready",
    },
    badge: "AI-Powered Engineering",
    title: "Robotic Painting Systems & Paint Booth Automation Integrator",
    description:
      "Describe your application, parts, or production line - our AI agent will guide you through the assessment.",
    inputPlaceholder:
      "e.g. We need to automate spray painting of aluminium housings, ~200 parts/shift, Class A finish...",
    footerNote: "No pricing provided | Human engineers confirm scope",
    useFormInsteadLabel: "Use form instead",
    startLabel: "Start",
    quickStarters: [
      "Automate manual spraying",
      "Improve finish consistency",
      "Feasibility check for my parts",
    ],
    wizard: {
      label: "Pre-Engineering Assessment - 6 Steps",
      ctaLabel: "Start assessment ->",
      mobileStepsLabel: "6 assessment steps",
      mobileDurationLabel: "~4 min",
    },
  },
  hero: {
    badge: "International Industrial Coating System Expert",
    title: "TD Painting Systems",
    introPrimary:
      "TD Painting Systems delivers industrial painting systems across the full value chain: turnkey painting shops, robotic workstations, paint supply systems, spare parts, and technical services.",
    introSecondary:
      `With ${companyProfile.systemsDeployed}+ systems deployed across ${companyProfile.countriesServed}+ countries, we serve automotive body shops, parts paint lines, and industrial manufacturing facilities. Our integrated approach delivers consistent quality, optimized throughput, and reduced total cost of ownership.`,
    highlight:
      "Whether you need a complete painting shop design, a single robotic cell, paint supply equipment, or ongoing maintenance support, we provide the expertise and equipment to meet your industrial coating requirements.",
  },
  offering: {
    label: "Our Complete Offering",
    title: "Full-Spectrum Coating Solutions",
    description:
      "From turnkey painting shops to spare parts and services, explore our integrated business model.",
  },
  trackRecord: {
    label: "Track record",
    title: "Proven at Scale",
  },
  trustStats: {
    items: [
      { numericValue: companyProfile.systemsDeployed, suffix: "+", label: "Systems Deployed" },
      { numericValue: companyProfile.yearsExperience, suffix: "+", label: "Years Experience" },
      { numericValue: companyProfile.countriesServed, suffix: "+", label: "Countries Served" },
      { numericValue: companyProfile.engineeringTeamSize, suffix: "", label: "Engineering Team" },
    ],
  },
  applications: {
    label: "Application sectors",
    title: "Select your application",
    items: [
      {
        title: "Automotive component painting",
        description: "Body panels, brackets, trim, structural parts",
      },
      {
        title: "Appliance coating automation",
        description: "Panels, housings, consumer-grade finishes",
      },
      {
        title: "Metal parts finishing",
        description: "Enclosures, fabricated steel, aluminum components",
      },
      {
        title: "Industrial equipment coating",
        description: "Machinery, frames, heavy equipment",
      },
    ],
  },
  capabilities: {
    label: "Engineering scope",
    title: "What We Deliver",
    items: [
      "Robotic painting system integration for automotive production",
      "Automated spray painting workstations and robotic painting cells",
      "Paint booth automation and process engineering (new booth or retrofit)",
      "Industrial robot configuration (ABB / FANUC / KUKA)",
      "Spray technology options: electrostatic, HVLP, air spray",
      "Control integration with PLC and robot controllers",
      "Commissioning, deployment, and production startup support",
    ],
    links: {
      systemIntro: "For system-level integration details, see",
      systemLink: "Robotic Painting System",
      boothIntro: "For booth-specific scope, see",
      boothLink: "Paint Booth Automation",
      planningIntro: "Planning robot selection? See",
      planningLink1: "How to Choose a Paint Robot",
      connector: "and",
      planningLink2: "Robotic Painting Cost Guide",
    },
  },
  systemOverview: {
    label: "System Architecture",
    title: "Complete Paint Cell Solution",
    ctaLabel: "Explore solutions",
    items: [
      {
        title: "Industrial Robot",
        description:
          "6-axis articulated robot optimized for spray painting applications with extended reach and payload.",
      },
      {
        title: "Spray Equipment",
        description:
          "Integrated spray guns, pumps, and fluid handling systems for precise paint delivery.",
      },
      {
        title: "Paint Booth & Ventilation",
        description:
          "Purpose-built spray booth with exhaust systems meeting safety and environmental standards.",
      },
      {
        title: "Process Controls",
        description:
          "Advanced HMI and recipe management for consistent paint parameters and traceability.",
      },
    ],
  },
  deployment: {
    label: "Project lifecycle",
    title: "Deployment process",
    note: "TD systems are designed for rapid deployment within standard industrial timelines.",
    steps: [
      {
        title: "Requirements Review",
        description:
          "Confirm parts, coating targets, throughput, and site constraints before detailed engineering.",
      },
      {
        title: "Concept & Layout",
        description:
          "Define cell architecture, robot selection, booth interfaces, and material handling approach.",
      },
      {
        title: "Detailed Engineering",
        description:
          "Finalize process flow, controls, utility scope, and integration details for manufacturing and site prep.",
      },
      {
        title: "Manufacturing & FAT",
        description:
          "Assemble core equipment, verify controls, and complete factory acceptance checks before shipment.",
      },
      {
        title: "Installation",
        description:
          "Coordinate equipment delivery, mechanical and electrical hookup, and site readiness checks.",
      },
      {
        title: "Commissioning",
        description:
          "Tune robot paths, spray parameters, airflow, and recipe logic for stable startup performance.",
      },
      {
        title: "Ramp-Up Support",
        description:
          "Support production validation, operator training, and the first phase of steady-state operation.",
      },
    ],
  },
  automation: {
    label: "Engineering Rationale",
    title: "Why Robotic Painting?",
    points: [
      "Improve coating consistency with repeatable spray paths and reduced human variability.",
      "Reduce paint waste through optimized transfer efficiency and tighter process control.",
      "Stabilize production throughput with repeatable cycle times and planned changeovers.",
      "Lower labor pressure by shifting skilled operators toward prep, QA, and process oversight.",
      "Meet VOC and safety requirements with enclosed robotic cells and engineered ventilation.",
    ],
    benefits: [
      {
        title: "Quality Consistency",
        description:
          "Achieve repeatable, high-quality paint finishes with robotic precision that eliminates human variability.",
        microLine: "Driven by part presentation and path repeatability.",
        engineeringAnchor:
          "Repeatability depends on fixturing, path control, and paint stability.",
        typicalUseCase:
          "Tight appearance requirements, reduced rework, and stable finish quality across shifts.",
        keyConstraints:
          "Part presentation and fixturing, spray distance and angle, edge coverage, paint viscosity and atomization, and booth airflow and temperature.",
        whatWeNeedToAssess:
          "Part CAD or photos, finish specification, target film-build range, acceptable touch-up level, and the current defect or rework drivers.",
      },
      {
        title: "Increased Throughput",
        description:
          "Maximize production capacity with faster cycle times and continuous operation capabilities.",
        microLine: "Takt time and changeover define real capacity.",
        engineeringAnchor:
          "True capacity is limited by takt time, changeovers, and handling time.",
        typicalUseCase:
          "Increase line output, stabilize cycle time, and support longer unattended operation windows.",
        keyConstraints:
          "Robot path length versus takt time, loading and unloading method, curing or dry time, color change and cleaning time, and buffer or conveyor logic.",
        whatWeNeedToAssess:
          "Required parts per hour or takt, shift pattern, batch size and changeover frequency, the current bottleneck, and handling or conveyor constraints.",
      },
      {
        title: "Labor Reduction",
        description:
          "Reduce dependency on skilled manual painters and reallocate workforce to higher-value tasks.",
        microLine: "Automation boundary determines operator workload.",
        engineeringAnchor:
          "Labor savings come from a clear automation boundary.",
        typicalUseCase:
          "Reduce dependency on skilled painters, shift labor toward prep and QA, and improve staffing stability.",
        keyConstraints:
          "Masking and prep workload, manual touch-up expectations, paint mixing and refill routine, maintenance and daily checks, and inspection plus rework loops.",
        whatWeNeedToAssess:
          "Which tasks must remain manual, acceptable manual touch-up percentage, paint supply method, operator skill availability, and current staffing pain points.",
      },
      {
        title: "Safety & Compliance",
        description:
          "Protect workers from hazardous paint fumes and overspray while meeting stringent regulatory requirements.",
        microLine: "Ventilation and site constraints set the baseline.",
        engineeringAnchor:
          "Compliance is defined by ventilation, fire risk, and site conditions.",
        typicalUseCase:
          "Reduce exposure to fumes and overspray, standardize safety controls, and align with plant and local compliance requirements.",
        keyConstraints:
          "Booth ventilation and airflow, VOC and solvent handling, grounding and static control, fire suppression, and hazardous-area classification where applicable.",
        whatWeNeedToAssess:
          "Paint type, booth or room dimensions, ventilation and exhaust capacity, required plant safety standards, and waste-handling constraints.",
      },
    ],
  },
  cta: {
    label: "Get started",
    title: "Start your robotic painting project",
    subtitle: "Tell us about your parts, coating requirements, and production needs.",
    startAssessment: "Start project assessment",
    talkToEngineer: "Talk to an engineer",
    uploadDrawings: "Upload part drawings",
    uploadMessage: "I'd like to share part drawings for a robotic painting feasibility assessment.",
    footnote: companyProfile.responseFootnote,
  },
  references: {
    label: "Project references",
    title: "Project References",
    viewAllLabel: "View Case Studies",
    cards: [
      { industry: "Automotive OEM", metric: "200,000 vehicles/year capacity", detail: "32-robot complete vehicle body painting line" },
      { industry: "EV Plastic Parts", metric: "65-96 sec per fixture", detail: "ABB line with integrated flame treatment" },
      { industry: "Tier 1 Exterior Parts", metric: "26+ robots on dual-color line", detail: "Water-based exterior trim and bumper references" },
      { industry: "International Project", metric: "VINFAST Thailand deployment", detail: "Yaskawa MPX2600 exterior-parts project" },
    ],
  },
  eeat: {
    authorLabel: "Author",
    authorValue: companyProfile.authorTeamName,
    updatedLabel: "Last updated",
    updatedValue: companyProfile.trustReviewDate,
    scopeLabel: "Scope",
    scopeValue:
      "Robotic painting system integration and paint booth automation for automotive components and industrial finishing. Specifications depend on application and site classification, including ATEX where required.",
  },
  faq: {
    label: "FAQ",
    title: "Frequently asked questions",
    items: [
      {
        question: "What is a robotic painting system integrator?",
        answer:
          "A robotic painting system integrator designs and integrates robots, spray technologies, paint supply systems, controls, and commissioning workflows into a complete finishing solution that delivers repeatable quality and stable throughput.",
      },
      {
        question: "How does paint booth automation improve production?",
        answer:
          "Paint booth automation stabilizes airflow, ventilation, and safety controls, reduces process variability, and supports repeatable finishing outcomes with reduced rework and more consistent production conditions.",
      },
      {
        question: "What industries use robotic spray painting?",
        answer:
          "Robotic spray painting is commonly used for automotive components and other industrial finishing applications where repeatable coating quality, controlled process stability, and scalable throughput are required.",
      },
      {
        question: "What is required to start a robotic painting project?",
        answer:
          "To start a project assessment, provide part drawings or dimensions, coating requirements, throughput targets, booth situation information, and site-classification needs such as ATEX where applicable.",
      },
    ],
  },
};
