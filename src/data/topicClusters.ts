import { normalizePublicPath } from "@/lib/seo";

export interface TopicClusterFaqItem {
  question: string;
  answer: string;
}

export interface TopicClusterTerm {
  term: string;
  definition: string;
  whyItMatters: string;
  href?: string;
}

export interface TopicClusterScenario {
  title: string;
  summary: string;
  challengePoints: string[];
  evaluationSteps: string[];
  outcomeSignals: string[];
}

export interface TopicClusterLink {
  label: string;
  href: string;
  description: string;
}

export interface TopicCluster {
  slug: string;
  keyword: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  searchIntent: string;
  guide: TopicClusterLink;
  faq: TopicClusterLink;
  glossary: TopicClusterLink;
  scenario: TopicClusterLink;
  industry: TopicClusterLink;
  solution: TopicClusterLink;
  whyThisClusterWorks: string[];
  faqItems: TopicClusterFaqItem[];
  glossaryTerms: TopicClusterTerm[];
  scenarioDetails: TopicClusterScenario;
  relatedLinks?: TopicClusterLink[];
  extraPaths?: string[];
}

export function getTopicClusterHubPath(slug: string) {
  return `/resources/topics/${slug}`;
}

export function getTopicClusterFaqPath(slug: string) {
  return `${getTopicClusterHubPath(slug)}/faq`;
}

export function getTopicClusterGlossaryPath(slug: string) {
  return `${getTopicClusterHubPath(slug)}/glossary`;
}

export function getTopicClusterScenarioPath(slug: string) {
  return `${getTopicClusterHubPath(slug)}/scenario`;
}

export function getTopicClusterPrimaryLinks(cluster: TopicCluster) {
  return [
    { label: "Cluster hub", href: getTopicClusterHubPath(cluster.slug), description: `Overview page for ${cluster.keyword}` },
    { label: "Core guide", ...cluster.guide },
    { label: "FAQ page", ...cluster.faq },
    { label: "Glossary page", ...cluster.glossary },
    { label: "Scenario page", ...cluster.scenario },
    { label: "Industry page", ...cluster.industry },
    { label: "Solution page", ...cluster.solution },
  ];
}

export function getTopicClusterPaths(cluster: TopicCluster) {
  return [
    getTopicClusterHubPath(cluster.slug),
    cluster.guide.href,
    cluster.faq.href,
    cluster.glossary.href,
    cluster.scenario.href,
    cluster.industry.href,
    cluster.solution.href,
    ...(cluster.extraPaths || []),
  ].map((path) => normalizePublicPath(path));
}

export const topicClusters: Record<string, TopicCluster> = {
  "atex-spray-painting-booth": {
    slug: "atex-spray-painting-booth",
    keyword: "ATEX spray painting booth",
    title: "ATEX Spray Painting Booth Topic Cluster",
    metaTitle: "ATEX Spray Painting Booth Topic Cluster | Guide, FAQ, Glossary, Scenario",
    metaDescription: "Explore the ATEX spray painting booth topic cluster with a core guide, FAQ page, glossary page, project scenario, industry page, and solution links for internal SEO depth.",
    summary: "This cluster organizes the safety, zoning, airflow, and retrofit decisions behind ATEX-ready spray booth projects for solvent-based robotic painting.",
    searchIntent: "Users exploring this topic usually need to understand whether a booth must be ATEX-rated, what that changes in design, and how it impacts retrofit scope, robot choice, and safety controls.",
    guide: {
      label: "ATEX Spray Painting Booth Guide",
      href: "/resources/standards-compliance/atex-zone-classification-spray-painting-booth",
      description: "Core engineering guide covering zoning, airflow, ignition control, and retrofit logic.",
    },
    faq: {
      label: "ATEX Spray Painting Booth FAQ",
      href: getTopicClusterFaqPath("atex-spray-painting-booth"),
      description: "Common questions about classification, waterborne exceptions, and retrofit scope.",
    },
    glossary: {
      label: "ATEX Booth Glossary",
      href: getTopicClusterGlossaryPath("atex-spray-painting-booth"),
      description: "Curated terms for ATEX, Zone 1, booth airflow, overspray, and solvent handling.",
    },
    scenario: {
      label: "ATEX Booth Retrofit Scenario",
      href: getTopicClusterScenarioPath("atex-spray-painting-booth"),
      description: "A practical retrofit scenario for a solvent-based metal parts line entering classified space.",
    },
    industry: {
      label: "Metal Parts Finishing",
      href: "/industries/metal-parts-finishing",
      description: "Typical industrial context where ATEX booth decisions affect real production lines.",
    },
    solution: {
      label: "Paint Booth Automation",
      href: "/solutions/paint-booth-automation",
      description: "Solution page covering booth integration, ventilation, controls, and ATEX-ready scope.",
    },
    whyThisClusterWorks: [
      "It connects compliance vocabulary with booth engineering decisions instead of leaving ATEX as an isolated glossary term.",
      "It links a high-intent safety keyword to solution and industry pages that can capture project-stage traffic.",
      "It reinforces topical depth through cross-links between zoning concepts, airflow topics, retrofit scenarios, and booth scope.",
    ],
    faqItems: [
      {
        question: "When does a spray painting booth need ATEX-rated equipment?",
        answer: "When solvent vapors can create a classified explosive atmosphere during normal operation or foreseeable upset conditions, the booth layout, electrical equipment, robot package, and safety logic must match the zone classification.",
      },
      {
        question: "Does switching to waterborne paint remove ATEX requirements?",
        answer: "Not automatically. Waterborne systems may reduce solvent vapor risk, but classification still depends on the full process, cleaning solvents, flash-off behavior, and site EHS rules.",
      },
      {
        question: "What changes first when retrofitting an existing booth for ATEX work?",
        answer: "The first checks are usually airflow and exhaust performance, classified volume boundaries, ignition sources, and whether current controls, motors, and robot packages match the required protection level.",
      },
      {
        question: "Is ATEX mainly a legal paperwork issue or a design issue?",
        answer: "It is a design issue first. Documentation matters, but the real engineering work is in ventilation stability, zoning, interlocks, grounding, and component selection.",
      },
    ],
    glossaryTerms: [
      {
        term: "ATEX Certification",
        href: "/resources/glossary/atex-certification",
        definition: "Equipment suitability for explosive atmospheres under the ATEX framework.",
        whyItMatters: "This is the baseline term buyers use when checking whether robots, controls, and booth hardware can legally operate in classified spray zones.",
      },
      {
        term: "Booth Airflow",
        href: "/resources/glossary/booth-airflow",
        definition: "The airflow pattern and capture behavior inside the spray booth.",
        whyItMatters: "Airflow directly affects solvent vapor dilution, overspray capture, and the practical size of the classified zone.",
      },
      {
        term: "Overspray",
        href: "/resources/glossary/overspray",
        definition: "Paint that misses the part and remains suspended or deposits on booth surfaces.",
        whyItMatters: "Overspray load influences booth contamination, solvent concentration, and the stress placed on ventilation and filtration systems.",
      },
      {
        term: "VOC and solvent handling",
        href: "/resources/standards-compliance/voc-solvent-handling",
        definition: "The storage, transfer, purge, and exhaust-management rules surrounding volatile coatings and cleaning media.",
        whyItMatters: "Many ATEX discussions begin with booth zoning but are actually driven by solvent handling and purge routines across the full line.",
      },
    ],
    scenarioDetails: {
      title: "Retrofitting a solvent-based steel cabinet line into an ATEX-classified booth",
      summary: "A manufacturer has an existing booth and wants to add robots without replacing the whole line. The key issue is not robot programming first, but whether the booth can safely support classified operation.",
      challengePoints: [
        "Current exhaust volume is documented loosely and no recent airflow validation exists.",
        "The team wants to keep solvent-based topcoat because of finish expectations and local supply constraints.",
        "Existing controls were not originally engineered around classified-space interlocks.",
      ],
      evaluationSteps: [
        "Validate current airflow, exhaust balance, and overspray loading before choosing robot hardware.",
        "Map the classified volume and identify all components that fall inside or interface with it.",
        "Define whether retrofit logic is viable or whether new booth automation is cheaper than staged compliance fixes.",
      ],
      outcomeSignals: [
        "A stable retrofit plan usually ends with a clear airflow baseline, zone map, and explicit list of ATEX-dependent components.",
        "If these cannot be defined early, the project often drifts into unplanned scope, delayed approvals, or expensive rework.",
      ],
    },
    relatedLinks: [
      {
        label: "Ventilation and Airflow",
        href: "/resources/standards-compliance/ventilation-airflow",
        description: "Support article for airflow constraints in classified spray areas.",
      },
      {
        label: "Grounding and Static Control",
        href: "/resources/standards-compliance/grounding-static-control",
        description: "Safety article covering grounding and static behavior in paint cells.",
      },
      {
        label: "Zone 1 vs Zone 2 in Spray Painting Booth Design",
        href: "/resources/knowledge/zone-1-vs-zone-2-spray-painting-booth",
        description: "Comparison page for understanding what zone classification changes in real booth scope.",
      },
      {
        label: "How to Design an ATEX-Compliant Spray Painting Booth",
        href: "/resources/knowledge/how-to-design-atex-compliant-spray-painting-booth",
        description: "Design guide linking classification logic to booth engineering decisions.",
      },
      {
        label: "Common ATEX Classification Mistakes",
        href: "/resources/articles/common-atex-classification-mistakes-spray-booth-projects",
        description: "Mistake-focused support page for avoiding avoidable scope and compliance errors.",
      },
    ],
    extraPaths: [
      "/resources/standards-compliance/atex-zone-classification-spray-painting-booth",
      "/resources/standards-compliance/ventilation-airflow",
      "/resources/standards-compliance/voc-solvent-handling",
      "/resources/standards-compliance/grounding-static-control",
      "/resources/knowledge/zone-1-vs-zone-2-spray-painting-booth",
      "/resources/knowledge/how-to-design-atex-compliant-spray-painting-booth",
      "/resources/articles/common-atex-classification-mistakes-spray-booth-projects",
    ],
  },
  "flame-treatment": {
    slug: "flame-treatment",
    keyword: "flame treatment",
    title: "Flame Treatment Topic Cluster",
    metaTitle: "Flame Treatment Topic Cluster | Guide, FAQ, Glossary, Scenario",
    metaDescription: "Explore the flame treatment topic cluster with guide, FAQ, glossary, scenario, industry, and solution pages connected through internal links.",
    summary: "This cluster centers on adhesion-critical coating projects where flame treatment turns low-surface-energy plastics into paintable parts.",
    searchIntent: "Traffic around flame treatment usually sits between technical research and project scoping: users want to know when to use it, what it changes in cycle time, and how it connects to plastic-part coating lines.",
    guide: {
      label: "Flame Treatment Guide",
      href: "/resources/knowledge/flame-treatment",
      description: "Core guide to robotic flame treatment for plastic parts and paint adhesion.",
    },
    faq: {
      label: "Flame Treatment FAQ",
      href: getTopicClusterFaqPath("flame-treatment"),
      description: "Questions about treatment window, surface energy targets, and integrated cells.",
    },
    glossary: {
      label: "Flame Treatment Glossary",
      href: getTopicClusterGlossaryPath("flame-treatment"),
      description: "Surface-energy and adhesion terms that support flame treatment queries.",
    },
    scenario: {
      label: "Flame Treatment Scenario",
      href: getTopicClusterScenarioPath("flame-treatment"),
      description: "Scenario page for a bumper line needing reliable adhesion before basecoat and clearcoat.",
    },
    industry: {
      label: "Automotive Exterior Parts",
      href: "/industries/automotive-exterior-parts",
      description: "Industry page covering plastic and composite part coating with adhesion-focused workflows.",
    },
    solution: {
      label: "Robotic Painting System",
      href: "/solutions/robotic-painting-system",
      description: "System-level solution connecting surface preparation, robots, booth control, and painting.",
    },
    whyThisClusterWorks: [
      "It captures both technical-explainer traffic and project-ready traffic from plastics coating lines.",
      "It connects a process step with the broader industry and solution context instead of leaving it as a standalone article.",
      "It reinforces topical authority around adhesion, plastic substrates, and integrated paint-line design.",
    ],
    faqItems: [
      {
        question: "Which plastics most often need flame treatment before painting?",
        answer: "Polyolefin materials such as PP, PE, and TPO are the most common candidates because their low surface energy prevents reliable wetting and adhesion without pretreatment.",
      },
      {
        question: "How quickly should parts be painted after flame treatment?",
        answer: "The usable window depends on the substrate and handling conditions, but many lines try to move treated parts into primer or topcoat steps quickly so the surface activation is not lost in storage or contamination.",
      },
      {
        question: "Can flame treatment run in the same robotic cell as painting?",
        answer: "Yes. Integrated cells are common when the project needs tight control over handling, contamination, and cycle timing between surface activation and coating.",
      },
      {
        question: "Is flame treatment always better than plasma treatment?",
        answer: "No. Flame treatment is often cost-effective and robust, but the right choice depends on substrate sensitivity, geometry, cycle time, and whether the project prefers thermal or non-thermal surface activation.",
      },
    ],
    glossaryTerms: [
      {
        term: "Surface energy",
        definition: "A measure of how easily a liquid coating can wet and bond to the substrate surface.",
        whyItMatters: "Flame treatment exists mainly to raise surface energy on difficult plastics so primers and topcoats can bond reliably.",
      },
      {
        term: "Adhesion",
        definition: "The bond strength between the coating film and the substrate.",
        whyItMatters: "Most flame-treatment projects are judged by adhesion-test results rather than by appearance alone.",
      },
      {
        term: "Flash-off Time",
        href: "/resources/glossary/flash-off-time",
        definition: "The time allowed for solvent or water to leave the coating before the next process step.",
        whyItMatters: "In integrated lines, treatment timing and flash-off timing both influence whether the final film remains stable and defect-free.",
      },
      {
        term: "Orange Peel",
        href: "/resources/glossary/orange-peel",
        definition: "A textured finish defect caused by poor flow or atomization behavior.",
        whyItMatters: "Surface activation issues and coating-parameter issues often get confused; this term helps separate adhesion failures from finish defects.",
      },
    ],
    scenarioDetails: {
      title: "Automotive bumper line needing flame treatment before decorative topcoat",
      summary: "The line coats PP/TPO bumpers and sees inconsistent adhesion after storage between treatment and painting. The project goal is to stabilize the process without adding manual handling.",
      challengePoints: [
        "The substrate family has low surface energy and limited tolerance for overheating.",
        "Production wants multi-color flexibility without sacrificing the treatment-to-paint window.",
        "Current handling introduces dust and timing variation between activation and coating.",
      ],
      evaluationSteps: [
        "Confirm substrate family and adhesion target before choosing burner layout or robot reach.",
        "Define whether flame treatment should be standalone, conveyor-integrated, or combined with painting in one cell.",
        "Set controls around timing, distance, and part presentation so the activation result remains consistent.",
      ],
      outcomeSignals: [
        "A good scenario outcome shows better adhesion stability, fewer untreated zones, and less manual intervention between treatment and painting.",
        "If these signals do not improve, the project may need a different pretreatment method or tighter part-handling control.",
      ],
    },
    relatedLinks: [
      {
        label: "Flame Treatment vs Plasma Treatment",
        href: "/resources/knowledge/flame-treatment-vs-plasma-treatment",
        description: "Comparison page for choosing between thermal and non-thermal adhesion activation.",
      },
      {
        label: "Integrated Flame-treatment Cell vs Pretreatment Line",
        href: "/resources/knowledge/integrated-flame-treatment-cell-vs-pretreatment-line",
        description: "Layout decision page for choosing between a shared cell and a separate pretreatment line.",
      },
      {
        label: "Paint Technology Guide",
        href: "/resources/knowledge/paint-technology-guide",
        description: "Broader context on substrate, coating chemistry, and process behavior.",
      },
    ],
    extraPaths: [
      "/resources/knowledge/flame-treatment-vs-plasma-treatment",
      "/resources/knowledge/integrated-flame-treatment-cell-vs-pretreatment-line",
      "/resources/knowledge/paint-technology-guide",
    ],
  },
  "paint-booth-design": {
    slug: "paint-booth-design",
    keyword: "paint booth design",
    title: "Paint Booth Design Topic Cluster",
    metaTitle: "Paint Booth Design Topic Cluster | Guide, FAQ, Glossary, Scenario",
    metaDescription: "Explore the paint booth design topic cluster with guide, FAQ, glossary, scenario, industry, and solution pages built for internal SEO depth.",
    summary: "This cluster ties booth layout, airflow, ventilation, filtration, and project-scope decisions into one organized topic pathway.",
    searchIntent: "Users searching paint booth design often want practical engineering rules: booth type selection, sizing, airflow, retrofit limits, and the link between booth stability and coating quality.",
    guide: {
      label: "Paint Booth Design Basics",
      href: "/resources/knowledge/paint-booth-design-basics",
      description: "Core guide to booth sizing, airflow pattern choices, and design mistakes to avoid.",
    },
    faq: {
      label: "Paint Booth Design FAQ",
      href: getTopicClusterFaqPath("paint-booth-design"),
      description: "Answers on airflow, makeup air, booth sizing, and retrofit constraints.",
    },
    glossary: {
      label: "Paint Booth Design Glossary",
      href: getTopicClusterGlossaryPath("paint-booth-design"),
      description: "Curated booth-design terms including airflow, overspray, filtration, and flash-off.",
    },
    scenario: {
      label: "Paint Booth Design Scenario",
      href: getTopicClusterScenarioPath("paint-booth-design"),
      description: "Scenario page for choosing between new booth build and retrofit in a mixed-model factory.",
    },
    industry: {
      label: "Metal Parts Finishing",
      href: "/industries/metal-parts-finishing",
      description: "Industry context where booth sizing and airflow stability drive real production outcomes.",
    },
    solution: {
      label: "Paint Booth Automation",
      href: "/solutions/paint-booth-automation",
      description: "Solution page for booth automation scope, controls integration, and ventilation logic.",
    },
    whyThisClusterWorks: [
      "It turns an often-generic keyword into a deep content path that includes design rules, terminology, and project decision pages.",
      "It links informational traffic directly to booth automation solution pages without forcing a hard sales transition.",
      "It creates repeated semantic reinforcement around airflow, ventilation, overspray, and retrofit planning.",
    ],
    faqItems: [
      {
        question: "What is usually the first mistake in paint booth design projects?",
        answer: "Teams often start with robot layout or equipment cost before validating airflow, booth dimensions, service access, and conditioned makeup air requirements.",
      },
      {
        question: "How do new booth builds and retrofits differ in scope?",
        answer: "New builds offer more freedom around airflow path, plenum design, and service access. Retrofits usually begin with hard checks on existing exhaust capacity, booth geometry, and disruption tolerance.",
      },
      {
        question: "Is downdraft always the best booth type?",
        answer: "Not always. Downdraft often supports the cleanest finish zone, but crossdraft or side-draft approaches may be more realistic for larger parts, retrofit constraints, or lower finish requirements.",
      },
      {
        question: "Why does booth design affect robot performance if the robot path is correct?",
        answer: "A robot can repeat the same path every cycle, but poor airflow, unstable temperature, or overloaded filtration will still create finish variation and overspray problems.",
      },
    ],
    glossaryTerms: [
      {
        term: "Booth Airflow",
        href: "/resources/glossary/booth-airflow",
        definition: "The direction, speed, and stability of air movement inside the booth.",
        whyItMatters: "It is the anchor term behind booth design, finish quality, and overspray capture.",
      },
      {
        term: "Overspray",
        href: "/resources/glossary/overspray",
        definition: "Paint that does not land on the target part and loads the booth environment.",
        whyItMatters: "Booth sizing and filtration choices only make sense when overspray behavior is understood.",
      },
      {
        term: "Flash-off Time",
        href: "/resources/glossary/flash-off-time",
        definition: "Time allowed for volatiles to leave the film before the next step.",
        whyItMatters: "Booth design decisions often affect the environment around flash-off and cure transitions.",
      },
      {
        term: "Ventilation and airflow",
        href: "/resources/standards-compliance/ventilation-airflow",
        definition: "The broader site-level airflow and exhaust rules that shape booth performance.",
        whyItMatters: "Many booth design questions become ventilation questions once the project reaches real facility constraints.",
      },
    ],
    scenarioDetails: {
      title: "Choosing between new booth build and retrofit for a mixed-model metal parts line",
      summary: "The factory wants robotic painting for steel enclosures and brackets. Management prefers retrofit, but the current booth was not designed for mixed-model robotic flow.",
      challengePoints: [
        "Existing booth dimensions leave limited maintenance and robot approach clearance.",
        "Color change and part variety increase overspray and handling complexity.",
        "Operations wants low disruption, but finish stability is already inconsistent.",
      ],
      evaluationSteps: [
        "Validate if the current booth can physically support robot envelope, parts, and service access together.",
        "Check whether airflow and filtration can remain stable under the projected overspray load.",
        "Decide if retrofit savings remain real after ventilation, controls, and downtime risk are priced in.",
      ],
      outcomeSignals: [
        "A sound design path will show clear booth dimensions, verified airflow, and an integration sequence that does not hide safety or maintenance tradeoffs.",
        "If those signals remain ambiguous, the project usually benefits from resetting around a new booth design rather than forcing retrofit assumptions.",
      ],
    },
    relatedLinks: [
      {
        label: "Paint Booth Sizing and Measurements",
        href: "/resources/knowledge/paint-booth-sizing-measurements",
        description: "Sizing-focused support page for booth footprint, dimensions, and clearance logic.",
      },
      {
        label: "Downdraft vs Crossdraft vs Side-draft",
        href: "/resources/knowledge/downdraft-vs-crossdraft-vs-side-draft",
        description: "Comparison page for choosing the booth airflow pattern that fits the project.",
      },
      {
        label: "New Paint Booth vs Retrofit",
        href: "/resources/knowledge/new-paint-booth-vs-retrofit",
        description: "Decision page for judging when retrofit savings are real and when a new booth is the cleaner answer.",
      },
      {
        label: "Ventilation and Airflow",
        href: "/resources/standards-compliance/ventilation-airflow",
        description: "Detailed supporting article for booth airflow constraints.",
      },
      {
        label: "Paint Booth Automation",
        href: "/solutions/paint-booth-automation",
        description: "System-level scope once booth design moves into implementation.",
      },
      {
        label: "How Much Floor Space Does an Automated Paint Line Need?",
        href: "/resources/faq/how-much-floor-space-does-an-automated-paint-line-need",
        description: "FAQ page that translates booth sizing into real line-footprint planning.",
      },
    ],
    extraPaths: [
      "/resources/knowledge/paint-booth-sizing-measurements",
      "/resources/knowledge/downdraft-vs-crossdraft-vs-side-draft",
      "/resources/knowledge/new-paint-booth-vs-retrofit",
      "/resources/standards-compliance/ventilation-airflow",
      "/resources/equipment/paint-booth-filtration",
      "/resources/faq/how-much-floor-space-does-an-automated-paint-line-need",
    ],
  },
  "paint-robot-selection": {
    slug: "paint-robot-selection",
    keyword: "paint robot selection",
    title: "Paint Robot Selection Topic Cluster",
    metaTitle: "Paint Robot Selection Topic Cluster | Guide, FAQ, Glossary, Scenario",
    metaDescription: "Explore the paint robot selection topic cluster with guide, FAQ, glossary, scenario, industry, and solution pages connected through internal SEO links.",
    summary: "This cluster turns robot-selection traffic into a full decision path covering specs, terminology, real use cases, and integration scope.",
    searchIntent: "Users searching paint robot selection are rarely looking for a robot alone. They usually need to connect reach, payload, ATEX rating, part geometry, and paint-line integration into one purchase decision.",
    guide: {
      label: "How to Choose a Paint Robot",
      href: "/resources/knowledge/how-to-choose-paint-robot",
      description: "Core guide to robot reach, protection level, repeatability, and integration criteria.",
    },
    faq: {
      label: "Paint Robot Selection FAQ",
      href: getTopicClusterFaqPath("paint-robot-selection"),
      description: "Questions around brand choice, ATEX, payload, and mixed-model flexibility.",
    },
    glossary: {
      label: "Paint Robot Selection Glossary",
      href: getTopicClusterGlossaryPath("paint-robot-selection"),
      description: "Selection vocabulary including hollow wrist, teach pendant, takt time, and spray pattern.",
    },
    scenario: {
      label: "Paint Robot Selection Scenario",
      href: getTopicClusterScenarioPath("paint-robot-selection"),
      description: "Scenario page for a high-mix industrial line comparing robot options for different part families.",
    },
    industry: {
      label: "Metal Parts Finishing",
      href: "/industries/metal-parts-finishing",
      description: "Industry page where robot choice affects reach, throughput, and part variety.",
    },
    solution: {
      label: "Paint Robot Integration",
      href: "/solutions/paint-robot-integration",
      description: "Solution page focused on robot deployment, programming, and line integration.",
    },
    whyThisClusterWorks: [
      "It groups decision-stage content around selection logic instead of spreading it across disconnected articles.",
      "It lets informational queries flow into integration and industry pages that match commercial intent.",
      "It reinforces entity relationships among robot brands, robot features, painting requirements, and line constraints.",
    ],
    faqItems: [
      {
        question: "What matters more in paint robot selection: brand or application fit?",
        answer: "Application fit matters first. Brand preference becomes useful after reach, payload, protection class, service support, and painting-specific options are aligned to the project.",
      },
      {
        question: "Do paint robots always need explosion-proof certification?",
        answer: "Not always, but solvent-based applications and classified spaces often require it. The robot package has to match the actual booth classification, not just the buyer's preference.",
      },
      {
        question: "How much payload is usually needed for painting?",
        answer: "Painting payload is often driven by the full end-of-arm package rather than the spray gun alone, including hoses, cable routing, bell hardware, and safety margin.",
      },
      {
        question: "Can one robot handle high-mix production if the part family keeps changing?",
        answer: "Sometimes, but only if reach, part presentation, and changeover logic still allow stable cycle time and maintainable programming.",
      },
    ],
    glossaryTerms: [
      {
        term: "Hollow Wrist Robot",
        href: "/resources/glossary/hollow-wrist",
        definition: "A robot wrist design that routes hoses and cables internally.",
        whyItMatters: "It reduces snag risk and is a core feature buyers compare when selecting paint robots.",
      },
      {
        term: "Teach Pendant",
        href: "/resources/glossary/teach-pendant",
        definition: "The handheld interface used to jog and teach robot positions.",
        whyItMatters: "Robot selection is not only mechanical; maintainability and programming workflow also affect real operating cost.",
      },
      {
        term: "Takt Time",
        href: "/resources/glossary/takt-time",
        definition: "The required production pace the line must meet.",
        whyItMatters: "Reach and payload alone do not justify a robot if the cell still misses takt requirements.",
      },
      {
        term: "Spray Pattern",
        href: "/resources/glossary/spray-pattern",
        definition: "The shape and distribution of paint leaving the applicator.",
        whyItMatters: "Robot choice affects how consistently the applicator can maintain angle, distance, and pattern behavior.",
      },
    ],
    scenarioDetails: {
      title: "Selecting robots for a high-mix metal enclosure and bracket line",
      summary: "The factory paints both compact brackets and larger steel enclosures. It wants one platform decision, but the part family has conflicting reach and changeover demands.",
      challengePoints: [
        "Small parts reward fast motion, while larger cabinets need more reach and service clearance.",
        "The team is comparing ABB, FANUC, and KUKA based mainly on price sheets rather than line context.",
        "Current estimates ignore hose routing, booth constraints, and the cost of awkward maintenance access.",
      ],
      evaluationSteps: [
        "Define part family boundaries first instead of assuming one robot size covers every case efficiently.",
        "Compare robot packages against real end-of-arm load, classification needs, and booth layout.",
        "Use the integration scope to test whether one flexible cell or two narrower cells is actually the better choice.",
      ],
      outcomeSignals: [
        "A good selection outcome will narrow the robot choice using reach, payload, protection, programming workflow, and service practicality together.",
        "If brand comparison remains detached from layout and process data, the project is not ready for a final robot decision.",
      ],
    },
    relatedLinks: [
      {
        label: "Paint Robot Reach vs Payload",
        href: "/resources/knowledge/paint-robot-reach-vs-payload",
        description: "Focused comparison page for the trade-off that usually narrows robot choices first.",
      },
      {
        label: "Hollow Wrist vs Non-hollow Wrist for Painting",
        href: "/resources/knowledge/hollow-wrist-vs-non-hollow-wrist-painting",
        description: "Decision page for comparing dress-package practicality and hose-routing risk.",
      },
      {
        label: "Painting Robot Selection Guide",
        href: "/resources/knowledge/painting-robot-selection-guide",
        description: "Long-form comparison page covering models, brands, and cost logic.",
      },
      {
        label: "Industrial Robot Brands",
        href: "/resources/knowledge/industrial-robot-brands",
        description: "Brand-comparison support page for deeper vendor evaluation.",
      },
    ],
    extraPaths: [
      "/resources/knowledge/paint-robot-reach-vs-payload",
      "/resources/knowledge/hollow-wrist-vs-non-hollow-wrist-painting",
      "/resources/knowledge/painting-robot-selection-guide",
      "/resources/knowledge/industrial-robot-brands",
      "/resources/glossary/hollow-wrist",
      "/resources/glossary/teach-pendant",
    ],
  },
  "robotic-painting": {
    slug: "robotic-painting",
    keyword: "robotic painting",
    title: "Robotic Painting Topic Cluster",
    metaTitle: "Robotic Painting Topic Cluster | Guide, FAQ, Glossary, Scenario",
    metaDescription: "Explore the robotic painting topic cluster with a guide, FAQ, glossary, scenario, and linked industry and solution pages built for commercial evaluation.",
    summary: "This cluster organizes broad robotic painting research into a clearer path from automation fit and ROI questions to system scope, robot planning, and deployment decisions.",
    searchIntent: "Users searching robotic painting are usually trying to decide whether automation fits their part families, what system boundary they actually need, and how robot, booth, and integration choices connect to a real project.",
    guide: {
      label: "Robotic Painting Guide",
      href: "/resources/knowledge/manual-vs-semi-auto-vs-robotic-painting-systems",
      description: "Core guide comparing manual, semi-automatic, and robotic painting paths.",
    },
    faq: {
      label: "Robotic Painting FAQ",
      href: getTopicClusterFaqPath("robotic-painting"),
      description: "Questions about fit, payback, part families, and deployment scope.",
    },
    glossary: {
      label: "Robotic Painting Glossary",
      href: getTopicClusterGlossaryPath("robotic-painting"),
      description: "Core terms covering transfer efficiency, hollow wrist design, spray pattern, and paint recipes.",
    },
    scenario: {
      label: "Robotic Painting Scenario",
      href: getTopicClusterScenarioPath("robotic-painting"),
      description: "Scenario page for a manufacturer deciding where robotic painting should start and what the first cell should cover.",
    },
    industry: {
      label: "Metal Parts Finishing Industry Page",
      href: "/industries/metal-parts-finishing",
      description: "A strong commercial entry point for turning broad automation interest into part-family evaluation.",
    },
    solution: {
      label: "Robotic Painting System",
      href: "/solutions/robotic-painting-system",
      description: "Main commercial solution page covering robot, booth, paint supply, controls, and commissioning scope.",
    },
    whyThisClusterWorks: [
      "It gives the site a true commercial hub for broad robotic painting searches instead of forcing that intent through narrower selection content.",
      "It connects early-stage fit questions with the solution and industry pages most likely to convert project-stage traffic.",
      "It creates cleaner topical separation between broad automation evaluation and the narrower paint robot selection cluster.",
    ],
    faqItems: [
      {
        question: "When does robotic painting usually make sense?",
        answer: "It usually makes sense when part families are repeatable enough to justify fixtures and recipes, finish quality matters, and labor or throughput instability is already constraining production.",
      },
      {
        question: "Is robotic painting only for high-volume lines?",
        answer: "No. High volume helps, but medium-volume programs can also justify automation when quality, labor availability, or material efficiency create enough operational pressure.",
      },
      {
        question: "What usually defines the project boundary first?",
        answer: "The boundary is usually defined by part family, finish requirement, and the current booth or handling constraints before robot brand or atomizer model becomes the main decision.",
      },
      {
        question: "Should buyers start with a robot model or a full system concept?",
        answer: "A full system concept comes first. Robot choice matters, but it only makes sense after the spray method, booth environment, part presentation, and integration scope are clear.",
      },
    ],
    glossaryTerms: [
      {
        term: "Transfer Efficiency",
        href: "/resources/glossary/transfer-efficiency",
        definition: "The percentage of sprayed paint that lands on the part instead of becoming waste.",
        whyItMatters: "This is one of the most practical ways buyers compare manual and robotic painting economics.",
      },
      {
        term: "Hollow Wrist Robot",
        href: "/resources/glossary/hollow-wrist",
        definition: "A robot wrist design that routes paint hoses and cables internally.",
        whyItMatters: "It improves hose management and is one of the first painting-specific features buyers evaluate.",
      },
      {
        term: "Spray Pattern",
        href: "/resources/glossary/spray-pattern",
        definition: "The shape and distribution of paint leaving the applicator.",
        whyItMatters: "Robotic painting only performs well when the robot path and spray pattern stay aligned to the part geometry.",
      },
      {
        term: "Paint Recipe",
        href: "/resources/glossary/paint-recipe",
        definition: "A stored set of process parameters for a specific part or finish condition.",
        whyItMatters: "Recipes are a core reason robotic systems can scale across repeated part families without losing consistency.",
      },
    ],
    scenarioDetails: {
      title: "Qualifying robotic painting for a mixed metal and plastics program",
      summary: "A manufacturer paints metal enclosures, plastic covers, and a smaller family of decorative parts. Management wants automation, but the team has not yet decided whether the first project should be one flexible cell or a narrower application-specific line.",
      challengePoints: [
        "The current discussion mixes ROI, robot brand choice, and booth limits before the automation boundary is defined.",
        "Part families have different finish priorities and do not all justify the same spray technology or handling logic.",
        "The plant wants a business case quickly, but the current estimates do not separate what belongs in phase one versus a later rollout.",
      ],
      evaluationSteps: [
        "Group the parts by geometry, finish requirement, and presentation stability before estimating one shared cell.",
        "Define which constraints come from the booth, paint process, or part handling before choosing robot hardware.",
        "Compare the value of one broader system against a narrower first cell that proves throughput and quality gains sooner.",
      ],
      outcomeSignals: [
        "A healthy outcome shows a clear first automation boundary, a realistic solution scope, and part families that match the selected cell concept.",
        "If the project still cannot separate broad interest from a real first deployment scope, the line is not ready for final equipment decisions.",
      ],
    },
    relatedLinks: [
      {
        label: "When Does a Robotic Paint Automation System Make Sense?",
        href: "/resources/knowledge/when-robotic-paint-automation-makes-sense",
        description: "Decision page for judging when robotic automation has a real business case.",
      },
      {
        label: "How to Choose a Paint Robot",
        href: "/resources/knowledge/how-to-choose-paint-robot",
        description: "Planning guide for turning broad automation interest into robot requirements.",
      },
      {
        label: "What Parts Are Suitable for Robotic Painting?",
        href: "/resources/faq/what-parts-are-suitable-for-robotic-painting",
        description: "FAQ page for checking whether the part family is automation-ready.",
      },
      {
        label: "Robotic Painting Cost Guide",
        href: "/resources/knowledge/robotic-painting-cost-guide",
        description: "Commercial support page for comparing investment and payback logic.",
      },
      {
        label: "Paint Robot Integration",
        href: "/solutions/paint-robot-integration",
        description: "Narrower solution page for teams already moving from system scope into robot deployment work.",
      },
    ],
    extraPaths: [
      "/resources/knowledge/when-robotic-paint-automation-makes-sense",
      "/resources/faq/what-parts-are-suitable-for-robotic-painting",
      "/resources/knowledge/robotic-painting-cost-guide",
      "/solutions/paint-robot-integration",
      "/industries/automotive-exterior-parts",
      "/industries/furniture-woodwork",
    ],
  },
  "furniture-coating": {
    slug: "furniture-coating",
    keyword: "furniture coating",
    title: "Furniture Coating Topic Cluster",
    metaTitle: "Furniture Coating Topic Cluster | Guide, FAQ, Glossary, Scenario",
    metaDescription: "Explore the furniture coating topic cluster with a guide, FAQ, glossary, scenario, and linked industry and solution pages for commercial furniture-finishing intent.",
    summary: "This cluster connects furniture finishing research to the real choices behind panel lines, robotic spray cells, visible-surface quality, and mixed-product flow.",
    searchIntent: "Furniture coating searches usually sit between process research and line planning: users want to compare roller, spray, and robotic approaches, understand product-family fit, and connect finish targets to a real equipment scope.",
    guide: {
      label: "Furniture Coating Guide",
      href: "/resources/knowledge/furniture-coating-systems-roller-vs-spray-vs-robotic",
      description: "Core guide comparing roller, spray, and robotic paths for furniture finishing.",
    },
    faq: {
      label: "Furniture Coating FAQ",
      href: getTopicClusterFaqPath("furniture-coating"),
      description: "Questions about visible-surface quality, panel flow, changeover, and automation fit.",
    },
    glossary: {
      label: "Furniture Coating Glossary",
      href: getTopicClusterGlossaryPath("furniture-coating"),
      description: "Key finish and process terms for cabinet, furniture, and panel programs.",
    },
    scenario: {
      label: "Furniture Coating Scenario",
      href: getTopicClusterScenarioPath("furniture-coating"),
      description: "Scenario page for a cabinet and door manufacturer deciding between panel-oriented and robotic finishing flow.",
    },
    industry: {
      label: "Furniture Coating Systems",
      href: "/industries/furniture-woodwork",
      description: "Industry page covering cabinets, furniture parts, and architectural millwork finishing.",
    },
    solution: {
      label: "Panel Coating and Finishing Systems",
      href: "/solutions/panel-coating-finishing-systems",
      description: "Commercial solution page for flat-part and panel-oriented finishing layouts.",
    },
    whyThisClusterWorks: [
      "It adds the missing furniture hub the site needed without inventing a new content model.",
      "It connects furniture-industry intent to the commercial panel-coating page instead of leaving the line concept split across isolated articles.",
      "It broadens anchor diversity by routing furniture traffic through method-comparison, planning, and visible-surface quality pages rather than repeating one exact-match phrase.",
    ],
    faqItems: [
      {
        question: "When is a furniture program better suited to a panel line than a robotic spray cell?",
        answer: "Panel lines usually fit repeated flat or semi-profiled products with stable presentation and high throughput, while robotic spray cells make more sense when geometry, edge coverage, or recipe flexibility become more important.",
      },
      {
        question: "Do furniture coating projects always need robotic spray?",
        answer: "No. Many furniture programs are better served by a roller, reciprocator, or hybrid layout. The right answer depends on product mix, visible-surface quality, and changeover behavior.",
      },
      {
        question: "What usually constrains furniture finishing automation first?",
        answer: "The real constraint is often product-family behavior, footprint, and curing balance rather than the spray device alone.",
      },
      {
        question: "How should buyers think about finish quality on furniture lines?",
        answer: "They should look at visible-surface consistency, edge behavior, defect sensitivity, and whether the chosen line concept can keep those results stable across repeated products.",
      },
    ],
    glossaryTerms: [
      {
        term: "HVLP",
        href: "/resources/glossary/hvlp",
        definition: "High Volume Low Pressure spray technology used for softer atomization and improved transfer efficiency.",
        whyItMatters: "It is common in visible-surface furniture work where finish quality and overspray control both matter.",
      },
      {
        term: "Flash-off Time",
        href: "/resources/glossary/flash-off-time",
        definition: "The time allowed for volatiles to leave the coating before the next process step.",
        whyItMatters: "Furniture lines often depend on steady flash-off behavior to protect appearance and downstream cure balance.",
      },
      {
        term: "Orange Peel",
        href: "/resources/glossary/orange-peel",
        definition: "A textured finish defect caused by poor flow or atomization behavior.",
        whyItMatters: "Visible furniture surfaces expose this defect quickly, so line choice and process stability both matter.",
      },
      {
        term: "Paint Recipe",
        href: "/resources/glossary/paint-recipe",
        definition: "A stored set of process parameters for a defined part family or finish requirement.",
        whyItMatters: "Recipe discipline is essential when furniture programs mix doors, boards, and decorative parts with different finish targets.",
      },
    ],
    scenarioDetails: {
      title: "Choosing the right finishing architecture for a cabinet door and panel program",
      summary: "A cabinet manufacturer runs repeated doors and side panels, but also a smaller range of decorative furniture components. The team needs better finish consistency and throughput, yet it is unclear whether the first investment should be a panel line, a robotic spray cell, or a staged hybrid.",
      challengePoints: [
        "The repeated door flow suggests panel-line efficiency, but edge quality and visible-surface expectations remain high.",
        "Decorative side products create recipe variation that could make a purely narrow line harder to justify.",
        "Available floor space is limited, so drying and cure balance matters as much as application speed.",
      ],
      evaluationSteps: [
        "Separate repeated flat products from flexible side programs before deciding that one line must serve everything.",
        "Compare panel-oriented throughput gains against the quality and flexibility value of robotic spray for visible parts.",
        "Validate footprint, flash-off, and curing balance so the chosen architecture still works in the real plant layout.",
      ],
      outcomeSignals: [
        "A healthy outcome shows a clear product-family split, a fitting application method, and a line concept that matches visible-surface expectations.",
        "If the project still treats all furniture products as one undifferentiated flow, the selected equipment scope will likely be unstable.",
      ],
    },
    relatedLinks: [
      {
        label: "How Much Floor Space Does an Automated Paint Line Need?",
        href: "/resources/faq/how-much-floor-space-does-an-automated-paint-line-need",
        description: "Planning FAQ for translating finish ambition into a real line footprint.",
      },
      {
        label: "Paint Defects Guide",
        href: "/resources/knowledge/paint-defects-guide",
        description: "Support page for the visible-surface defects that matter most in furniture finishing.",
      },
      {
        label: "HVLP Spray Gun Guide",
        href: "/resources/knowledge/hvlp-spray-gun-guide",
        description: "Supporting guide for the spray technology often evaluated in furniture programs.",
      },
      {
        label: "Robotic Painting System Integration",
        href: "/solutions/robotic-painting-system",
        description: "Broader commercial page for buyers whose furniture program still needs a more flexible full-cell scope.",
      },
    ],
    extraPaths: [
      "/resources/faq/how-much-floor-space-does-an-automated-paint-line-need",
      "/resources/knowledge/paint-defects-guide",
      "/resources/knowledge/hvlp-spray-gun-guide",
      "/solutions/robotic-painting-system",
    ],
  },
  "metal-parts-finishing": {
    slug: "metal-parts-finishing",
    keyword: "metal parts finishing",
    title: "Metal Parts Finishing Topic Cluster",
    metaTitle: "Metal Parts Finishing Topic Cluster | Guide, FAQ, Glossary, Scenario",
    metaDescription: "Explore the metal parts finishing topic cluster with guide, FAQ, glossary, scenario, industry, and solution pages designed for internal SEO depth.",
    summary: "This cluster focuses on the engineering choices behind robotic finishing lines for fabricated metal parts, enclosures, frames, and mixed-model industrial components.",
    searchIntent: "Metal parts finishing searches typically blend process education with buying intent: teams want to know whether robotic finishing fits their parts, what quality gains are realistic, and how booth, robot, and paint supply choices connect.",
    guide: {
      label: "Metal Parts Finishing Guide",
      href: "/resources/knowledge/metal-parts-finishing-guide",
      description: "Core guide explaining where robotic finishing works well for industrial metal parts.",
    },
    faq: {
      label: "Metal Parts Finishing FAQ",
      href: getTopicClusterFaqPath("metal-parts-finishing"),
      description: "Questions about fit, throughput, part variation, and coating quality for metal parts.",
    },
    glossary: {
      label: "Metal Parts Finishing Glossary",
      href: getTopicClusterGlossaryPath("metal-parts-finishing"),
      description: "Key terms including DFT, transfer efficiency, overspray, and 2K paint.",
    },
    scenario: {
      label: "Metal Parts Finishing Scenario",
      href: getTopicClusterScenarioPath("metal-parts-finishing"),
      description: "Scenario page for a steel enclosure line moving from manual spray to robotic finishing.",
    },
    industry: {
      label: "Metal Parts Finishing Industry Page",
      href: "/industries/metal-parts-finishing",
      description: "Industry page describing parts, workflow, and delivery scope for metal fabricators.",
    },
    solution: {
      label: "Robotic Painting System",
      href: "/solutions/robotic-painting-system",
      description: "Solution page covering full system integration for robotic finishing projects.",
    },
    whyThisClusterWorks: [
      "It builds topical authority around one of the clearest commercial themes already visible in the site.",
      "It connects industrial-process education with the exact industry and solution pages that close the intent gap.",
      "It gives Google multiple semantically related entry points around metal finishing rather than a single industry page.",
    ],
    faqItems: [
      {
        question: "What kinds of metal parts are usually a good fit for robotic finishing?",
        answer: "The best fit is usually repeat or semi-repeat part families where finish quality, labor stability, and throughput matter enough to justify fixtures, recipes, and booth control.",
      },
      {
        question: "Does high part variety eliminate the case for automation?",
        answer: "Not necessarily. High variety is manageable when the part families can still be grouped into realistic recipes, handling methods, and robot access envelopes.",
      },
      {
        question: "What usually limits throughput first on a metal finishing line?",
        answer: "It is often not robot speed alone. Handling, flash-off, color change, booth condition, and recipe stability can dominate effective throughput.",
      },
      {
        question: "How should buyers judge coating quality on automated metal parts lines?",
        answer: "Look at film build stability, edge coverage, repeatability, defect rate, and how consistently the line maintains those results across shifts and part families.",
      },
    ],
    glossaryTerms: [
      {
        term: "Dry Film Thickness",
        href: "/resources/glossary/dry-film-thickness",
        definition: "The cured coating thickness measured on the part after drying or curing.",
        whyItMatters: "Metal finishing projects often live or die on whether DFT is consistent enough for protection and appearance requirements.",
      },
      {
        term: "Transfer Efficiency",
        href: "/resources/glossary/transfer-efficiency",
        definition: "The percentage of sprayed paint that lands on the part instead of becoming waste.",
        whyItMatters: "It is one of the clearest ways to explain ROI for robotic finishing versus manual spray.",
      },
      {
        term: "Overspray",
        href: "/resources/glossary/overspray",
        definition: "Material that misses the part and loads the booth environment.",
        whyItMatters: "Overspray drives material loss, booth maintenance, and many quality-stability discussions on metal finishing lines.",
      },
      {
        term: "2K Paint",
        href: "/resources/glossary/2k-paint",
        definition: "A two-component coating system that mixes base and activator before use.",
        whyItMatters: "Many industrial metal finishing lines use 2K systems, so mixing, pot life, and cleanup logic become part of automation planning.",
      },
    ],
    scenarioDetails: {
      title: "Steel enclosure line moving from manual spray to robotic finishing",
      summary: "The manufacturer runs cabinets, frames, and brackets in medium volume. Manual spray quality varies by shift, and skilled-painter availability is becoming a bottleneck.",
      challengePoints: [
        "Part size varies enough that fixture strategy and robot envelope need to be defined carefully.",
        "The business wants paint savings and quality stability, but also needs quick response to mixed-model schedules.",
        "Existing booth and handling methods were designed around manual flexibility, not robotic repeatability.",
      ],
      evaluationSteps: [
        "Group parts into families by geometry, finish requirement, and handling method.",
        "Check booth and paint-supply limits before locking robot scope.",
        "Use the system-level solution scope to define what must change beyond the robot itself.",
      ],
      outcomeSignals: [
        "A good scenario outcome shows fewer quality swings, lower labor dependence, and a realistic automation boundary for mixed-model work.",
        "If part families cannot be grouped sensibly, the project may need partial automation instead of a single universal cell.",
      ],
    },
    relatedLinks: [
      {
        label: "Paint Defects Guide",
        href: "/resources/knowledge/paint-defects-guide",
        description: "Supporting knowledge page for defect-focused finishing questions.",
      },
      {
        label: "Paint Supply Systems",
        href: "/resources/knowledge/paint-supply-systems",
        description: "Supporting knowledge page for fluid handling and recipe stability.",
      },
    ],
    extraPaths: [
      "/resources/knowledge/paint-defects-guide",
      "/resources/knowledge/paint-supply-systems",
    ],
  },
};

export const topicClusterList = Object.values(topicClusters);

const preferredTopicClusterByPath: Record<string, keyof typeof topicClusters> = {
  "/solutions/paint-booth-automation": "paint-booth-design",
  "/solutions/robotic-painting-system": "robotic-painting",
  "/solutions/paint-robot-integration": "paint-robot-selection",
  "/solutions/panel-coating-finishing-systems": "furniture-coating",
  "/industries/metal-parts-finishing": "metal-parts-finishing",
  "/industries/automotive-exterior-parts": "flame-treatment",
  "/industries/furniture-woodwork": "furniture-coating",
  "/resources/knowledge/manual-vs-semi-auto-vs-robotic-painting-systems": "robotic-painting",
  "/resources/knowledge/when-robotic-paint-automation-makes-sense": "robotic-painting",
  "/resources/faq/what-parts-are-suitable-for-robotic-painting": "robotic-painting",
  "/resources/knowledge/robotic-painting-cost-guide": "robotic-painting",
  "/resources/knowledge/furniture-coating-systems-roller-vs-spray-vs-robotic": "furniture-coating",
  "/resources/faq/how-much-floor-space-does-an-automated-paint-line-need": "furniture-coating",
  "/resources/knowledge/paint-defects-guide": "metal-parts-finishing",
  "/resources/knowledge/paint-booth-sizing-measurements": "paint-booth-design",
  "/resources/standards-compliance/atex-zone-classification-spray-painting-booth": "atex-spray-painting-booth",
};

export function getTopicClusterByPath(pathname: string) {
  const normalizedPath = normalizePublicPath(pathname);
  const preferredClusterSlug = preferredTopicClusterByPath[normalizedPath];

  if (preferredClusterSlug) {
    return topicClusters[preferredClusterSlug];
  }

  return topicClusterList.find((cluster) => getTopicClusterPaths(cluster).includes(normalizedPath));
}

export function getAllTopicClusterPaths() {
  return topicClusterList.flatMap((cluster) => [
    getTopicClusterHubPath(cluster.slug),
    cluster.faq.href,
    cluster.glossary.href,
    cluster.scenario.href,
  ]);
}
