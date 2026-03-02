/**
 * generate-kb.ts — Build-time knowledge base generator for AI presales chatbot
 *
 * Reads solutionData.ts, industryData.ts, and page content to produce a
 * consolidated knowledge-base.json that the Edge Function can import.
 *
 * Usage:  npx tsx scripts/generate-kb.ts
 * Runs:   Automatically via "prebuild" npm script
 */

import { solutions } from "../src/data/solutionData";
import { industries } from "../src/data/industryData";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── Types ──────────────────────────────────────────────────────────────────

interface KBSection {
  title: string;
  content: string;
}

// ─── Extract industries ─────────────────────────────────────────────────────

function extractIndustries(): KBSection[] {
  return Object.values(industries).map((ind) => {
    const lines: string[] = [];
    lines.push(`### ${ind.industryLabel} (/industries/${ind.slug})`);
    lines.push(`Finish: ${ind.aiContext.finish} | Throughput: ${ind.aiContext.throughput}`);

    if (ind.painPoints?.length) {
      lines.push("Pain points: " + ind.painPoints.map((p) => `${p.title} — ${p.description}`).join("; "));
    }
    if (ind.systemModules?.length) {
      lines.push("System modules: " + ind.systemModules.map((m) => `${m.name} (${m.description})`).join("; "));
    }
    if (ind.productionConfig) {
      const pc = ind.productionConfig;
      lines.push(
        `Production config: ${pc.partsPerHour} parts/hr | Paint: ${pc.paintType} | Finish: ${pc.finishRequirement} | Automation: ${pc.automationLevel} | Integration: ${pc.lineIntegration}`
      );
    }
    if (ind.roiMetrics?.length) {
      lines.push(
        "ROI metrics: " + ind.roiMetrics.map((m) => `${m.label}: ${m.value}`).join(" | ")
      );
    }
    if (ind.caseReferences?.length) {
      lines.push("Case references:");
      ind.caseReferences.forEach((c) => {
        lines.push(`  - ${c.partType}: ${c.systemConfig}, ${c.capacity}, ROI ${c.roi}`);
      });
    }
    if (ind.faqs?.length) {
      lines.push("FAQ:");
      ind.faqs.forEach((f) => {
        lines.push(`  Q: ${f.question}`);
        lines.push(`  A: ${f.answer}`);
      });
    }

    return { title: ind.industryLabel, content: lines.join("\n") };
  });
}

// ─── Extract solutions (comprehensive) ──────────────────────────────────────

function extractSolutions(): KBSection[] {
  return Object.values(solutions).map((sol) => {
    const lines: string[] = [];
    lines.push(`### ${sol.heroTitle || sol.metaTitle} (/solutions/${sol.slug})`);
    lines.push(sol.definition);
    if (sol.definitionSecondary) lines.push(sol.definitionSecondary);

    // Why it matters
    if (sol.whyItems?.length) {
      lines.push(`Why it matters: ${sol.whyItems.join("; ")}`);
    }

    // Scope of delivery
    if (sol.scopeItems?.length) {
      lines.push("Scope of delivery: " + sol.scopeItems.join("; "));
    }
    if (sol.scopeSubSections?.length) {
      sol.scopeSubSections.forEach((sub) => {
        lines.push(`${sub.title}: ${sub.items.join("; ")}`);
      });
    }

    // Components
    if (sol.componentItems?.length) {
      lines.push("Typical components: " + sol.componentItems.join("; "));
    }

    // Process steps
    if (sol.processSteps?.length) {
      lines.push(
        "Process flow: " + sol.processSteps.map((s, i) => `${i + 1}. ${s.title} — ${s.description}`).join(" → ")
      );
    }

    // Application scope
    if (sol.applicationScope?.length) {
      lines.push("Application scope: " + sol.applicationScope.join("; "));
    }

    // Configuration options (replaces configHighlights)
    if (sol.configOptions?.length) {
      lines.push("Configuration options:");
      sol.configOptions.forEach((co) => {
        lines.push(`  - ${co.scenario}: ${co.recommendation} (for: ${co.suitableFor})`);
      });
    }

    // Technical parameters
    if (sol.technicalParameters?.length) {
      lines.push("Key technical parameters: " + sol.technicalParameters.join("; "));
    }

    // Constraints
    if (sol.constraints?.length) {
      lines.push("Constraints: " + sol.constraints.join("; "));
    }

    // ATEX
    if (sol.atexItems?.length) {
      lines.push("ATEX considerations: " + sol.atexItems.join("; "));
    }

    // ROI
    if (sol.roiMetrics?.length) {
      lines.push(
        "ROI metrics: " + sol.roiMetrics.map((m) => `${m.label}: ${m.value}`).join(" | ")
      );
    }
    if (sol.roiMethodology) {
      lines.push(`ROI methodology: ${sol.roiMethodology}`);
    }

    // Deployment
    if (sol.deploymentNote) {
      lines.push(`Deployment: ${sol.deploymentNote}`);
    }
    if (sol.timeline?.length) {
      lines.push("Timeline: " + sol.timeline.map((t) => `${t.phase} (${t.duration})`).join(" → "));
    }

    // FAQ
    if (sol.faqs?.length) {
      lines.push("FAQ:");
      sol.faqs.forEach((f) => {
        lines.push(`  Q: ${f.question}`);
        lines.push(`  A: ${f.answer}`);
      });
    }

    // Related links for cross-sell
    if (sol.relatedIndustries?.length) {
      lines.push("Related industries: " + sol.relatedIndustries.map((r) => `${r.label} (${r.href})`).join(", "));
    }
    if (sol.relatedKnowledge?.length) {
      lines.push("Related resources: " + sol.relatedKnowledge.map((r) => `${r.label} (${r.href})`).join(", "));
    }

    return { title: sol.heroTitle || sol.metaTitle, content: lines.join("\n") };
  });
}

// ─── Static knowledge sections ──────────────────────────────────────────────

function staticSections(): KBSection[] {
  return [
    {
      title: "Company Overview",
      content: `TD Robotic Painting Systems (brand: PaintCell) provides end-to-end robotic painting system integration for 10+ industries worldwide. We integrate robots (ABB/FANUC/KUKA/Yaskawa/Kawasaki), spray technology (electrostatic/HVLP/airless), paint booth automation, paint supply systems, and PLC-based controls. Delivery process: Requirement Analysis → Concept Design → Detail Engineering → Manufacturing → Factory Testing → Installation → Training & Handover. Typical deployment: 8-24 weeks after design approval.`,
    },
    {
      title: "Product Catalog & Equipment We Integrate",
      content: `### Spray Equipment Categories
We supply and integrate equipment across 6 major product categories:

1. **Rotary Bells (electrostatic atomizers)**: SAMES KREMLIN PPH707, Ransburg Robobell, Dürr EcoBell — high transfer efficiency, 60,000 RPM, multi-color fast-change
2. **Spray Guns**: Graco H1050 (air-assisted airless), Ransburg RMA660 (rotary), Binks-Maple 15/30 (HVLP) — matched to application requirements
3. **Paint Pumps & Fluid Supply**: Graco P3:1 (piston), Graco 4D150/350 (diaphragm), Timmer 1060 — pressure-regulated, temperature-controlled delivery
4. **Control Systems**: Siemens S7-1500 PLC, Allen-Bradley (Rockwell), ABB IRC5 robot controllers — unified PROFINET + EtherNet/IP integration
5. **Color Change Systems**: ABB RB1000i-WSC, Lactec, Timmer valve blocks — <3 min change, 20+ colors, <150ml waste per change
6. **Spare Parts & Service Kits**: OEM replacement parts, wear item kits, maintenance packages for all integrated brands

### Robot Platforms
- **ABB IRB 5500**: 2.98m reach, 13kg payload — most widely used in our automotive projects
- **ABB IRB 6700**: 2.6-3.2m reach, 150-235kg payload — flame treatment and pre-treatment
- **FANUC MPX 3500**: 1.56m reach — compact EX-proof for bumpers and plastic parts
- **FANUC MPX 2600**: 1.86m reach — medium parts, used in VINFAST Thailand project
- **Kawasaki Painting Series**: 7-axis + linear track — excavator arms and large machinery
- **CMA Painting Robots**: 6-axis cost-effective — industrial and 3C electronics applications

### Supplier Partners (13 brands)
Robots: ABB, FANUC, Yaskawa, Kawasaki, KUKA
Spray equipment: SAMES KREMLIN, Graco, Ransburg, Binks-Maple
Controls: Siemens (PLC), Allen-Bradley (Rockwell)
Fluid systems: Timmer, Lactec

IMPORTANT: When users ask about specific equipment, reference our product pages at /products and specific categories. Help them understand the right combination for their application rather than just listing specs.`,
    },
    {
      title: "Services We Provide",
      content: `We offer 6 full-lifecycle service categories:

1. **Solution Design**: Feasibility analysis, system architecture, 3D layout, process simulation, robot selection
2. **Project Management**: Timeline coordination, procurement, multi-vendor integration, quality milestones
3. **Commissioning**: On-site installation, robot calibration, paint process parameter tuning, production validation
4. **Maintenance**: Preventive maintenance plans, spare parts supply, 24-48hr critical response
5. **Training**: Operator training (on-site), maintenance certification, robot programming workshops
6. **Consulting**: Process audits, upgrade feasibility, ATEX compliance review, capacity planning

Service coverage:
- 30+ cities across China covering all major automotive manufacturing clusters
- International project capability (Thailand, Vietnam, etc.)
- Remote diagnostics via RobotStudio/ShopFloor Editor — 50%+ faster fault resolution
- 24-48hr critical on-site response for production-down situations
- Full lifecycle from concept through production handover and ongoing support`,
    },
    {
      title: "Website Resources & Knowledge Library",
      content: `Our website contains extensive technical resources that can help users at different stages of their journey:

### For Early Research:
- Knowledge articles (/resources/knowledge/): How to Choose a Paint Robot, Robotic Painting Cost Guide, Paint Booth Design Basics, Spray Technology Guide, Robot Path Optimization, Paint Defects Guide, Color Change Systems
- Engineering Library (/resources/engineering-library): Technical guides, checklists, and industry insights
- Glossary (/resources/glossary/): 20+ technical terms explained — takt time, overspray, transfer efficiency, film build, ATEX certification, hollow wrist, electrostatic spraying, etc.

### For Active Evaluation:
- Solution pages (/solutions): Detailed technical specs and process flows for each solution type
- Industry pages (/industries): Industry-specific pain points, system configs, ROI data, and case references
- Case Studies (/case-studies): Real project examples and outcomes
- Products (/products): Equipment catalog with specs for rotary bells, spray guns, pumps, controls, color change systems

### For Decision & Action:
- RFQ Template (/resources/tools-templates/paint-cell-rfq-template): Structured requirements document
- Site Readiness Checklist (/resources/tools-templates/site-readiness-checklist): Pre-installation preparation guide
- Feasibility Checklist (/resources/tools-templates/feasibility-checklist): Self-assessment for automation readiness
- Quote Request (/quote): 26-step configurator wizard that captures all 6 dimensions of requirements

INSTRUCTION: When users ask questions that a webpage can answer in more depth, proactively suggest the relevant page link. For example: "We have a detailed guide on this topic — you can read more at /resources/knowledge/how-to-choose-paint-robot". This helps users self-serve while showing the depth of our expertise.`,
    },
    {
      title: "Core Technology Advantages",
      content: `### Multi-Brand Robot Integration Platform
- Supports ABB (IRB5500/6700), Yaskawa (MPX3500/2600), Kawasaki, FANUC robots
- Integrates with Sames, Ransburg, Binks, Graco spray equipment (rotary bells, gear pumps, color change valves)
- Unified control on Siemens S7-1500 PLC + PROFINET industrial bus
- Advantage: Break vendor lock-in, flexible equipment selection, reduced integration risk

### Intelligent Quality Control System
- Vision-based part recognition (model + position verification)
- Skip-station interlocks (primer incomplete → block topcoat/clearcoat)
- Hardener flow active monitoring (prevent clogging defects)
- Radar-based electronic level control (dual-threshold alarms + pump interlock)
- Compliance: IATF 16949, full batch traceability, MES integration

### 20+ Color Fast Change System
- Sames PPH707 high-speed electrostatic rotary bells
- Automatic purge sequence: inject → retract → purge → clean
- Color change under 3 minutes with <150ml purge waste
- Supports water-based + solvent-based + 2K clearcoat multi-media

### Water-Based Paint Temperature Control
- Pipe-in-pipe thermal management system
- Precision: ±1°C for water-based coatings
- Ensures atomization stability and film thickness uniformity
- Separate waste solvent collection for VOC compliance

### Remote Diagnostics & Industry 4.0 Ready
- Robostudio/Shopfloor Editor remote access modules
- PROFINET + Ethernet dual-redundant network topology
- HMI direct connection to MES/CCR systems
- Digital twin interface ready (Web3D visualization, AI algorithm ports)
- Result: 50%+ faster fault response, >80% remote diagnostic coverage

### Integrated Pre-Treatment Robot Package
- RAPIDFLAME flame treatment system (propane + natural gas + compressed air)
- Shared PLC and HMI platform with painting robots
- Synchronized takt time and process interlocks
- Safety: Flame detection + logic interlock, ATEX compliant
- Benefit: Reduced equipment investment and footprint`,
    },
    {
      title: "Reference Projects",
      content: `- Complete vehicle body painting: 32 Yaskawa robots, 200K units/year capacity (Kaifeng)
- Plastic bumper line: 8 ABB IRB5500 + 25 Binks Maple supply systems (Leapmotor)
- Engineering machinery: 4 Kawasaki 7-axis + Graco high-pressure electrostatic (Zhuhai)
- International: VINFAST Thailand project with Yaskawa MPX2600 + Iwata supply`,
    },
    {
      title: "Market Experience & Track Record",
      content: `Based on cumulative project portfolio across China's robotic painting market:

Geographic Coverage:
- Deployment experience across 30+ cities in major industrial regions
- Coverage from northeast (Changchun, Harbin) to south (Guangzhou, Hainan), east coast (Shanghai, Nanjing) to northwest (Urumqi, Xi'an)
- Strong presence in automotive clusters: Changchun, Wuhan, Chongqing, Guangzhou, Shanghai

Project Scale Range:
- From single-robot compact cells (1-3 robots) to complete paint shop turnkey delivery (100+ robots)
- Distribution: 38% small scale (1-10 robots), 45% mid-scale (11-40 robots), 17% large scale (40+ robots)
- Largest single project: 169 robots in a complete vehicle OEM paint shop

Industry Mix:
- 60%+ automotive OEM (complete vehicle body painting, BIW coating)
- 40% industrial & parts suppliers (tier-1 components, heavy equipment, general industrial)
- Full lifecycle support: 60% new line builds, 33% line modifications/upgrades, 7% capacity expansions

Capability Positioning:
- When asked about experience: Reference 30+ city coverage and scale range to demonstrate breadth
- When asked about automotive: Emphasize 60%+ OEM focus and 200K+ units/year capacity track record
- When asked about scale: Can handle anything from 1-robot cell to 169-robot mega-line
- When asked about project types: Majority new builds, but significant retrofit/upgrade capability
- IMPORTANT: Do not mention specific competitor names, customer names, or pricing from market data`,
    },
    {
      title: "Rotary Atomizer Technical Knowledge",
      content: `### Electrostatic Rotary Bell Specifications
- Bell speed: up to 60,000 RPM (closed-loop fiber optic speed reading)
- Bell cup sizes: 15mm, 30mm, 50mm diameter (aluminum or composite material, serrated or smooth edge)
- Electrostatic HV: 0-100kV adjustable cascade, 0-150μA current, arc protection
- Fluid flow: up to 500 cc/min through Ø0.7-1.57mm nozzles
- Shaping air: dual shaping air control for fan pattern width adjustment
- Communication: CAN-bus + discrete I/O, PLC-integrated
- Safety: 3 interlock inputs + 1 fault output, bearing air detection, brake air control
- Applications by conductivity: Standard conductivity, High conductivity, Waterborne-specific configurations
- Mounting options: Fixed mount, Reciprocator mount, Solid wrist robot, Hollow wrist robot

### Robot Selection Checklist (Key Parameters for Painting Projects)
- Production data: Gross yearly capacity (units/year), working days, shifts, JPH per line
- Car body data: Max body size (L×W×H mm), ground clearance, max external painting surface (m²)
- Line data: Conveyor speed (m/min), body pitch (m), cycle time per station
- Paint data: Color count (primer/metallic/solid/clearcoat), solvent vs water-based, 1K vs 2K, solid content (vol%), target film thickness (μm)
- Process: Primer → Basecoat → Clearcoat lines, flash-off requirements, special processes (pearl/metallic)
- Integration: Control system brand (Siemens/Rockwell/Mitsubishi), network protocol (PROFINET/EtherNet IP)
- Services: Training (overseas/domestic/on-site), standby support, spare parts, guarantee period

### Deidentified Vehicle Painting Market Data
Based on industry portfolio analysis (1,000+ robots deployed across 45+ vehicle painting projects):
- Robot technology evolution: IRB5400 era (2002-2008) → IRB5500 era (2008-2014) → Current multi-brand
- Typical OEM line: 6-48 robots per line for standard capacity, 60-130+ for high-volume plants
- Applications covered: exterior spraying, interior cavity spraying, sealing/adhesive, door opening, wipe-down
- Major automotive regions served: Changchun, Beijing, Shanghai, Wuhan, Chongqing, Guangzhou, Chengdu, Nanjing
- IMPORTANT: Present as general industry knowledge, never cite specific customer names or project details`,
    },
  ];
}

// ─── Main ───────────────────────────────────────────────────────────────────

function main() {
  const industrySections = extractIndustries();
  const solutionSections = extractSolutions();
  const statics = staticSections();

  const kb = {
    generatedAt: new Date().toISOString(),
    version: "auto",
    industries: industrySections,
    solutions: solutionSections,
    static: statics,
  };

  // 1. Write JSON for reference / debugging
  const jsonPath = path.resolve(
    __dirname,
    "../supabase/functions/ai-presales-chat/knowledge-base.json"
  );
  fs.writeFileSync(jsonPath, JSON.stringify(kb, null, 2), "utf-8");

  // 2. Build a markdown string for direct injection into Edge Function
  let md = "";

  md += "\n## Industries We Serve (10 industries)\n\n";
  for (const sec of industrySections) {
    md += sec.content + "\n\n";
  }

  md += "\n## Solutions We Offer\n\n";
  for (const sec of solutionSections) {
    md += sec.content + "\n\n";
  }

  for (const sec of statics) {
    md += `\n## ${sec.title}\n\n${sec.content}\n\n`;
  }

  // 3. Generate a TypeScript constants file that the Edge Function can import
  const tsContent = `// AUTO-GENERATED by scripts/generate-kb.ts — DO NOT EDIT MANUALLY
// Generated at: ${new Date().toISOString()}
// Re-generate with: npx tsx scripts/generate-kb.ts

export const GENERATED_KNOWLEDGE = ${JSON.stringify(md)};

export const KB_INDUSTRIES = ${JSON.stringify(industrySections)} as const;
export const KB_SOLUTIONS = ${JSON.stringify(solutionSections)} as const;
export const KB_GENERATED_AT = "${new Date().toISOString()}";
`;

  const tsPath = path.resolve(
    __dirname,
    "../supabase/functions/ai-presales-chat/generated-kb.ts"
  );
  fs.writeFileSync(tsPath, tsContent, "utf-8");

  // Stats
  const totalSections =
    industrySections.length + solutionSections.length + statics.length;
  const totalChars = md.length;
  console.log(
    `✅ Knowledge base generated: ${totalSections} sections, ${totalChars} chars`
  );
  console.log(`   → ${jsonPath}`);
  console.log(`   → ${tsPath}`);
}

main();
