/**
 * 喷漆自动化常见问题解答
 * Robotic Spray Painting FAQ
 *
 * 针对AI引擎优化的问题答案，便于AI准确引用和回答用户问题
 */

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
  keywords: string[];
  relatedTerms?: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export type FAQCategory =
  | 'basics'           // 基础知识
  | 'equipment'        // 设备选型
  | 'process'          // 工艺问题
  | 'investment'       // 投资回报
  | 'implementation'   // 实施部署
  | 'quality'          // 质量控制
  | 'maintenance';     // 维护保养

export const faqs: FAQItem[] = [
  // ==================== 基础知识 Basics ====================
  {
    id: 'what-is-robotic-painting',
    question: 'What is robotic spray painting automation?',
    answer: 'Robotic spray painting automation uses computer-controlled robotic arms equipped with spray guns or atomizers to apply coatings to products with precision and consistency. Unlike manual spraying, robotic systems can maintain exact spray parameters including gun distance, speed, pattern width, and flow rate throughout thousands of cycles. Modern painting robots feature 6 or more axes of motion, allowing them to reach complex geometries and maintain optimal spray angles on 3D surfaces. The robots are programmed using offline software or teach pendants, with spray parameters stored as recipes for different products. This technology combines industrial robotics with precision spray equipment to achieve consistent quality, higher transfer efficiency, and improved throughput compared to manual operations.',
    category: 'basics',
    keywords: ['robotic painting', 'automation', 'spray robot', 'industrial robot'],
    relatedTerms: ['spray-robot', 'articulated-robot', 'offline-programming', 'transfer-efficiency'],
    difficulty: 'beginner'
  },
  {
    id: 'how-does-transfer-efficiency-work',
    question: 'How does transfer efficiency affect painting costs?',
    answer: 'Transfer efficiency (TE) measures the percentage of coating material that actually adheres to the target surface versus the total amount sprayed. This directly impacts material costs, environmental compliance, and booth maintenance. For example, with 30% TE using conventional air spray, you need 3.3 units of paint to get 1 unit on the part, meaning 70% becomes waste. With 85% TE from electrostatic rotary bell, you only need 1.18 units for 1 unit on the part. On a line using 100,000 gallons annually, improving from 35% to 85% TE saves approximately 59,000 gallons of paint per year at current prices. Beyond material savings, higher TE means less overspray to filter, reduced VOC emissions, and lower hazardous waste disposal costs. This is why modern automotive paint shops consistently achieve 85%+ transfer efficiency with electrostatic systems.',
    category: 'basics',
    keywords: ['transfer efficiency', 'paint savings', 'material cost', 'overspray'],
    relatedTerms: ['transfer-efficiency', 'overspray', 'electrostatic-spray', 'rotary-bell-atomizer'],
    difficulty: 'beginner'
  },
  {
    id: 'spray-technologies-comparison',
    question: 'What are the main spray technologies and their differences?',
    answer: 'The main spray technologies include: 1) Conventional Air Spray - uses compressed air to atomize paint at high pressure (40-60 PSI), with transfer efficiency of 25-40%. Simple but wasteful. 2) HVLP (High Volume Low Pressure) - operates at lower pressure (<10 PSI at nozzle) improving TE to 65-75%. Industry standard for furniture and woodwork. 3) Airless Spray - uses hydraulic pressure (1,500-3,000 PSI) without air, producing coarse atomization for heavy coatings. TE of 40-55%. 4) Air-Assisted Airless - combines airless atomization with air shaping for better control, TE of 55-65%. 5) Electrostatic Spray - charges paint particles attracted to grounded parts, achieving 60-95% TE depending on configuration. Excellent for metal parts with complex geometries. 6) Rotary Bell Atomizer - high-speed rotating cup using centrifugal force, TE of 85-95%. Standard for automotive OEM.',
    category: 'basics',
    keywords: ['spray technology', 'HVLP', 'airless', 'electrostatic', 'comparison'],
    relatedTerms: ['hvlp-spray-gun', 'airless-spray', 'electrostatic-spray', 'rotary-bell-atomizer'],
    difficulty: 'beginner'
  },
  {
    id: 'automation-vs-manual-cost',
    question: 'When does robotic painting become more cost-effective than manual?',
    answer: 'Robotic painting typically becomes cost-effective when: 1) Production volume exceeds 50,000 parts annually (depending on part size and coating time), 2) Multiple shifts operate (8+ hours/day), 3) Paint consumption exceeds 500 gallons annually, 4) Quality requirements demand consistency, 5) Skilled painters are difficult to recruit or retain, or 6) Throughput requirements exceed manual capability. A common ROI threshold is 18-24 months. For example, a manual spray booth requiring 3 painters at $25/hour for 2 shifts costs approximately $312,000 annually in labor alone. A robotic cell might cost $400,000-600,000 with annual operating costs of $50,000-80,000 (maintenance, programming, utilities), achieving payback in under 2 years while delivering consistent quality and 30-60% paint savings.',
    category: 'basics',
    keywords: ['cost comparison', 'ROI', 'automation justification', 'labor savings'],
    relatedTerms: ['roi', 'payback-period', 'throughput', 'transfer-efficiency'],
    difficulty: 'beginner'
  },

  // ==================== 设备选型 Equipment Selection ====================
  {
    id: 'robot-brand-selection',
    question: 'What robot brands are used for spray painting applications?',
    answer: 'Industry-standard painting robots come from major manufacturers including: 1) FANUC - Known for reliable painting robots with established automotive OEM presence. 2) ABB - Offers the FlexPainter series specifically for painting applications. 3) KUKA - German engineering with strong automotive sector integration. 4) Yaskawa/Motoman - Comprehensive robot lineup with painting-specific models. 5) Kawasaki Robotics - Specializes in painting and coating robots. 6) Estun - Chinese manufacturer with competitive pricing for cost-sensitive applications. All major brands offer 6-axis articulated robots with hollow-wrist designs for paint hose routing. Robot selection depends on reach requirements (typically 2,000-3,000 mm for automotive), payload (5-15 kg for spray guns), integration compatibility with existing PLC systems, and local service support. The robot brand matters less than proper system integration, programming quality, and maintenance support.',
    category: 'equipment',
    keywords: ['robot brands', 'FANUC', 'ABB', 'KUKA', 'robot selection'],
    relatedTerms: ['spray-robot', 'articulated-robot', 'hollow-wrist', 'payload'],
    difficulty: 'intermediate'
  },
  {
    id: 'booth-design-considerations',
    question: 'What factors affect paint booth design?',
    answer: 'Paint booth design must consider: 1) Airflow pattern - downdraft (air flows downward from ceiling to floor, best for large parts), crossdraft (horizontal flow, economical for smaller parts), or semi-downdraft (combination). 2) Air velocity - typically 60-100 FPM to capture overspray without disturbing application. 3) Filtration system - dry filters (cost-effective, requires regular replacement), water wash (handles high paint loads, higher operating cost), or electrostatic precipitators (captures fine particles). 4) Booth size - must accommodate largest part plus robot reach envelope with adequate clearance. 5) Lighting - minimum 800-1000 lux at spray position for quality inspection. 6) Climate control - temperature (65-75°F) and humidity (40-60% RH) affect coating viscosity and flash times. 7) Exhaust volume - must match airflow requirements while meeting local exhaust regulations. Oversizing increases operating costs; undersizing causes spray bounce-back and quality issues.',
    category: 'equipment',
    keywords: ['paint booth', 'airflow', 'downdraft', 'filtration', 'booth design'],
    relatedTerms: ['paint-booth', 'downdraft-booth', 'filtration', 'air-flow'],
    difficulty: 'intermediate'
  },
  {
    id: 'atomizer-selection',
    question: 'How do I select the right atomizer for my application?',
    answer: 'Atomizer selection depends on: 1) Finish quality required - automotive Class A needs rotary bell (85-95% TE), industrial finishes can use HVLP or air-assisted airless (55-75% TE). 2) Part geometry - complex shapes with recesses benefit from electrostatic (wrap-around effect), flat panels work well with any atomizer. 3) Paint type - high solids materials may need different atomization than thin solvent-based coatings. 4) Color change frequency - rotary bell with quick-change cassettes for frequent changes, dedicated guns for high-volume single colors. 5) Paint delivery pressure - affects atomization quality and pattern width. General guidelines: Automotive exterior: Rotary bell with electrostatic. Automotive interior: Electrostatic or HVLP. Furniture/wood: HVLP. Protective coating: Airless or air-assisted airless. Agricultural equipment: Airless. The key is matching atomizer capabilities to your specific quality, productivity, and material cost requirements.',
    category: 'equipment',
    keywords: ['atomizer selection', 'rotary bell', 'spray gun', 'finish quality'],
    relatedTerms: ['rotary-bell-atomizer', 'hvlp-spray-gun', 'airless-spray', 'electrostatic-spray'],
    difficulty: 'intermediate'
  },
  {
    id: 'color-change-system',
    question: 'What is a fast color change system and when is it needed?',
    answer: 'A fast color change system enables rapid switching between different coating colors with minimal purge material and downtime. It becomes necessary when: 1) Production requires multiple colors daily (automotive trim, appliance panels, consumer products), 2) Batch sizes are small, requiring frequent changeovers, 3) Just-in-time production demands flexibility, or 4) Color family production requires variations within a shift. Modern fast change systems achieve <60 second color swaps through: dead-volume minimization (smaller piping and valve internal volumes), split-second valve designs, purge optimization (pre-purge with solvent, intermediate purge, post-purge), and automated recipe execution. The tradeoff is higher equipment cost and complexity. For facilities running 10+ colors with frequent changes, fast change systems deliver significant ROI through reduced downtime. Single-color or rare-changeover operations should stick with dedicated paint lines.',
    category: 'equipment',
    keywords: ['color change', 'fast change', 'purge', 'color changeover'],
    relatedTerms: ['color-change', 'paint-kitchen', 'dead-volume', 'flush'],
    difficulty: 'intermediate'
  },

  // ==================== 工艺问题 Process Questions ====================
  {
    id: 'spray-parameters-setup',
    question: 'How do I set up spray parameters for a new part?',
    answer: 'Setting up spray parameters for new parts involves: 1) Part analysis - identify flat areas, edges, recesses, and complex geometry requiring different coverage. 2) Target film build - based on specification, determine wet film thickness needed (WFT = DFT / % solids). 3) Gun distance - typically 6-10 inches for air spray, 8-12 inches for electrostatic. 4) Pattern width - match to part dimensions, overlap passes by 30-50%. 5) Gun speed - start with 1-2 feet/second, adjust based on film build measurements. 6) Flow rate - set to achieve target WFT at chosen gun speed. 7) Pattern shape - adjust fan width for uniform coverage. Use paint thickness gauges (magnasonic or eddy current) to measure DFT and adjust parameters accordingly. Offline programming software can simulate coverage and film build before trial runs. The key is documenting successful parameters as recipes for repeatability.',
    category: 'process',
    keywords: ['spray parameters', 'setup', 'film build', 'gun distance', 'process setup'],
    relatedTerms: ['film-build', 'dft', 'gun-distance', 'gun-speed', 'recipe-management'],
    difficulty: 'intermediate'
  },
  {
    id: 'multi-coat-process',
    question: 'How do I set up a multi-coat painting process?',
    answer: 'Multi-coat systems (primer/basecoat/clearcoat or primer/topcoat) require careful process sequencing: 1) Surface prep - ensure proper cleaning and pretreatment before primer. 2) Primer application - typically 25-75 μm DFT, provides adhesion and corrosion protection. Allow proper flash-off time per manufacturer spec (usually 5-10 minutes). 3) Primer cure or flash - either fully cure primer or allow sufficient flash for primer before next coat. 4) Basecoat application - 10-25 μm color coat, may require multiple passes. Do not fully cure between base and clear. 5) Clearcoat application - 30-50 μm for gloss and protection, applied wet-on-wet over basecoat. 6) Combined cure - bake entire system together per clearcoat cure schedule. Key parameters: flash-off times between coats, application viscosity, film builds, and cure temperature/time. Each layer must be compatible with adjacent layers. Proper flash-off prevents solvent entrapment and blistering during cure.',
    category: 'process',
    keywords: ['multi-coat', 'primer', 'basecoat', 'clearcoat', 'process sequence'],
    relatedTerms: ['film-formation', 'flash-off', 'curing', 'basecoat-clearcoat'],
    difficulty: 'advanced'
  },
  {
    id: 'plastic-coating-challenges',
    question: 'What are the challenges of coating plastic parts?',
    answer: 'Coating plastics presents unique challenges: 1) Low surface energy - most plastics have poor wetting characteristics, causing fish-eyes and poor adhesion. Surface energy must be >38 dynes/cm for water-based, >42 for solvent-based. Treatment methods include corona, plasma, or flame treatment. 2) Outgassing - plastic parts may release internal gases during cure, causing bubbles or blistering. Pre-bake parts to remove volatiles. 3) Heat sensitivity - standard cure temperatures may warp or damage substrates. Low-bake or air-dry systems may be required. 4) Static buildup - non-conductive surfaces attract dust and affect spray patterns. Use static eliminators and ionized air. 5) Coefficient of expansion - plastic expands more than coating during bake, potentially causing cracking. Flexible coatings or lower cure temperatures help. 6) Adhesion promoters - may be required for polypropylene, polyethylene, and other difficult plastics. Testing with cross-hatch adhesion testing is essential.',
    category: 'process',
    keywords: ['plastic coating', 'surface energy', 'adhesion', 'outgassing', 'plastic parts'],
    relatedTerms: ['pretreatment', 'plasma-treatment', 'flame-treatment', 'adhesion-test'],
    difficulty: 'advanced'
  },
  {
    id: 'viscosity-control',
    question: 'Why is viscosity control important and how is it maintained?',
    answer: 'Viscosity control is critical because it directly affects atomization quality, film build, and appearance. Too thin: excessive sag, poor coverage, low film build. Too thick: poor atomization, orange peel, uneven coverage. Viscosity is controlled through: 1) Temperature - coating viscosity decreases as temperature increases. Maintaining consistent temperature (typically 68-72°F) eliminates viscosity drift. 2) Solvent addition - thinning to adjust viscosity, but excessive thinner dilutes solids and affects film build. 3) Material heating - pre-heating coating to 100-120°F reduces viscosity without adding solvent. 4) Continuous agitation - prevents settling and maintains consistent properties. Use viscosity cups (Ford #4, Zahn) or digital viscometers for measurement. Automated viscosity control systems measure and adjust in real-time. Target viscosity depends on application method: HVLP typically 18-22 seconds Ford #4, airless 20-30 seconds, rotary bell 14-18 seconds.',
    category: 'process',
    keywords: ['viscosity', 'temperature control', 'thinning', 'coat consistency'],
    relatedTerms: ['film-build', 'atomization', 'temperature-control', 'viscosity-control'],
    difficulty: 'intermediate'
  },

  // ==================== 投资回报 Investment ====================
  {
    id: 'system-cost-breakdown',
    question: 'What is the typical cost breakdown for a robotic painting system?',
    answer: 'Typical robotic painting system costs include: 1) Robots - $80,000-200,000 per robot depending on brand, reach, payload. 2) Spray equipment - $20,000-80,000 for atomizers, guns, hoses. 3) Paint system - $50,000-200,000 for pumps, valves, color change system, paint kitchen. 4) Booth - $100,000-500,000 depending on size, airflow system, filtration. 5) Conveyors/fixtures - $50,000-300,000 for part handling. 6) Controls - $30,000-100,000 for PLC, HMI, safety systems. 7) Engineering - $50,000-200,000 for design, programming, simulation. 8) Installation - $50,000-200,000 for labor. 9) Miscellaneous - electrical, permits, training. Total: Single robot cell: $300,000-800,000. Multi-robot line: $1,000,000-5,000,000+. Budget 15-25% contingency. Operating costs include: labor ($30,000-100,000/year for operator/maintenance), maintenance contracts ($20,000-50,000/year), utilities, paint waste, and consumables.',
    category: 'investment',
    keywords: ['system cost', 'investment', 'budget', 'cost breakdown', 'capital'],
    relatedTerms: ['roi', 'total-cost-ownership', 'payback-period'],
    difficulty: 'intermediate'
  },
  {
    id: 'roi-calculation',
    question: 'How do I calculate ROI for a robotic painting investment?',
    answer: 'ROI calculation components: 1) Labor savings - (Current labor cost) - (Automated system operator cost). Include benefits, training, turnover. 2) Paint savings - (Current paint usage × price) × (1 - New TE/Current TE). Example: 100,000 gal × $25/gal × (1-0.85/0.35) = $357,000 annual savings. 3) Throughput gains - additional revenue from increased production capacity. 4) Quality improvements - reduced rework, warranty claims, customer penalties. 5) Compliance savings - avoided fines, reduced hazardous waste disposal. 6) Floor space - potential savings from reduced footprint. Total annual benefits divided by total investment cost equals ROI %. Typical payback: 12-24 months for high-volume applications, 24-36 months for lower volume. Online ROI calculators and detailed financial models help justify investments. Consider total cost of ownership including maintenance over 5-7 year equipment life.',
    category: 'investment',
    keywords: ['ROI calculation', 'return on investment', 'payback', 'justification'],
    relatedTerms: ['roi', 'total-cost-ownership', 'payback-period', 'transfer-efficiency'],
    difficulty: 'intermediate'
  },
  {
    id: 'leasing-vs-buying',
    question: 'Should I lease or buy robotic painting equipment?',
    answer: 'Leasing vs. buying depends on your financial situation and business priorities: BUYING advantages: 1) Lower total cost over equipment life, 2) Build equity, 3) No restrictions on modifications, 4) Potential tax benefits through depreciation. BUYING disadvantages: 1) Large upfront capital requirement, 2) Technology becomes dated, 3) Full maintenance responsibility. LEASING advantages: 1) Preserve capital for other uses, 2) Predictable monthly expenses, 3) Easier budget with operating vs. capital expenses, 4) May include maintenance. LEASING disadvantages: 1) Higher total cost over time, 2) Terms may restrict modifications, 3) End-of-lease obligations. Recommendations: Buy if you have strong cash flow, equipment will be used 5+ years, and technology is mature. Lease if cash is limited, technology evolves rapidly, or you want to test before committing. Many equipment vendors offer both options.',
    category: 'investment',
    keywords: ['leasing', 'financing', 'capital equipment', 'buying decision'],
    relatedTerms: ['roi', 'total-cost-ownership', 'investment'],
    difficulty: 'intermediate'
  },

  // ==================== 实施部署 Implementation ====================
  {
    id: 'implementation-timeline',
    question: 'How long does it take to implement a robotic painting system?',
    answer: 'Typical implementation timeline: 1) Feasibility/quoting: 2-6 weeks - assess application, develop preliminary design, budget quote. 2) Order to delivery: 12-20 weeks - robot and equipment lead times vary by manufacturer and customization. 3) Design/engineering: 6-12 weeks (often overlaps with delivery) - detailed design, 3D modeling, simulation. 4) Installation: 4-8 weeks - equipment installation, electrical, piping. 5) Integration: 2-4 weeks - connect PLC controls, paint systems, conveyors. 6) Programming: 2-6 weeks - robot programming, parameter development, offline program creation. 7) Trials/validation: 2-4 weeks - production trials, quality validation, customer approval. 8) Ramp-up: 2-4 weeks - production gradually increases to full speed. Total: 6-12 months from decision to full production. Fastest implementations are repeat orders of proven configurations. Complex integrations with multiple robots, extensive customization, or unique requirements take longer.',
    category: 'implementation',
    keywords: ['implementation timeline', 'project duration', 'deployment', 'installation'],
    relatedTerms: ['project-management', 'offline-programming', 'cycle-time'],
    difficulty: 'intermediate'
  },
  {
    id: 'space-requirements',
    question: 'How much space is needed for a robotic painting cell?',
    answer: 'Space requirements depend on: 1) Robot reach - cells need clearance equal to robot reach radius plus tooling. A 2,000mm reach robot needs ~4m × 4m base area. 2) Part size - booth must accommodate largest part plus fixtures. 3) Paint system - pumps, valves, paint kitchen may be inside or outside booth. 4) Conveyor integration - entry/exit zones add length. 5) Operator access - space for loading/unloading, HMI operation. Minimum typical: Single robot cell with small parts: 3m × 4m. Single robot cell with medium parts: 5m × 6m. Multi-robot line: 10m × 8m+. Booth height: minimum 3.5m for small parts, 5m+ for large parts. Additional space for: maintenance access, paint storage, control cabinet, air handling equipment. Consider future flexibility - easier to start with more space than to expand later. Mezzanines or separate control rooms help minimize floor space.',
    category: 'implementation',
    keywords: ['space requirements', 'cell layout', 'facility planning', 'footprint'],
    relatedTerms: ['paint-booth', 'conveyor-system', 'layout'],
    difficulty: 'beginner'
  },
  {
    id: 'integration-challenges',
    question: 'What are common integration challenges with existing production lines?',
    answer: `Common integration challenges: 1) Takt time mismatch - robotic cell must match or exceed line speed. May require multiple robots or optimized programming. 2) Communication protocols - PLC brands may not communicate directly. Need protocol converters or gateway devices. 3) Part presentation - conveyor positioning accuracy, part orientation, fixture design. 4) Quality gates - integrating inspection stations within cycle time. 5) Changeover flexibility - adding automation should not slow product changeovers. 6) Maintenance access - robots and equipment need clearance for servicing. 7) Utility capacity - electrical (typically 480V 3-phase), compressed air, ventilation may need upgrades. 8) Training - operators and maintenance need new skills. 9) MES integration - sharing production data with factory systems requires planning. Address these in design phase through detailed simulation and stakeholder interviews. Budget time and resources for integration issues.`,
    category: 'implementation',
    keywords: ['integration', 'challenges', 'production line', 'PLC', 'takt time'],
    relatedTerms: ['mes-integration', 'plc-control', 'takt-time', 'cycle-time'],
    difficulty: 'advanced'
  },
  {
    id: 'training-requirements',
    question: 'What training is required for operating robotic painting systems?',
    answer: 'Training requirements by role: OPERATORS: 1-2 days on basic operation, part loading, routine cleaning, alarm response. Weekly to monthly ongoing. PAINT TECHNICIANS: 1-2 weeks on spray parameter adjustment, viscosity control, gun maintenance, quality troubleshooting. MAINTENANCE TECHNICIANS: 2-4 weeks on preventive maintenance, robot calibration, electrical systems, pump rebuilds. PROGRAMMERS: 4-8 weeks on offline programming software, path planning, robot operations. SUPERVISORS/MANAGEMENT: 1-2 days on system capabilities, capacity planning, performance monitoring. Training sources: Equipment vendors typically include basic training. Extended training available for additional cost. Third-party training organizations offer specialized courses. Online resources from robot manufacturers. Consider: Operator turnover may require frequent retraining. Documenting procedures reduces training burden. Cross-training multiple people ensures coverage. Refresher training periodically prevents skill decay.',
    category: 'implementation',
    keywords: ['training', 'operators', 'maintenance', 'programming', 'skills'],
    relatedTerms: ['offline-programming', 'maintenance', 'process-monitoring'],
    difficulty: 'beginner'
  },

  // ==================== 质量控制 Quality Control ====================
  {
    id: 'quality-consistency',
    question: 'How does robotic painting achieve better quality consistency than manual?',
    answer: 'Robotic painting achieves consistency through: 1) Identical motion every cycle - robots repeat programmed paths within ±0.1mm accuracy, eliminating human variation. 2) Constant parameters - spray distance, speed, and pattern maintained precisely across all parts. Humans naturally vary gun distance and speed. 3) Environmental control - temperature, humidity, and airflow are controlled and monitored. 4) Recipe-based processes - exact parameters stored and retrieved from database. 5) No fatigue - robots maintain performance throughout entire shift, while humans degrade near end of shift. 6) Integrated inspection - vision systems and sensors can verify coverage and flag defects. 7) Process logging - every cycle parameters recorded for traceability. These factors enable first-pass quality rates of 99%+ vs. 85-95% typical for manual operations. Reduced variation means fewer customer complaints, less rework, and consistent appearance.',
    category: 'quality',
    keywords: ['quality consistency', 'repeatability', 'automation advantages', 'first-pass yield'],
    relatedTerms: ['throughput', 'film-build', 'appearance-inspection', 'process-monitoring'],
    difficulty: 'intermediate'
  },
  {
    id: 'film-thickness-control',
    question: 'How is film thickness controlled in automated systems?',
    answer: 'Film thickness control methods: 1) Wet film monitoring - use comb gauges to measure WFT during application and adjust parameters in real-time. 2) DFT gauges - magnasonic for steel, eddy current for non-ferrous. Take readings at multiple points per part. 3) Automated thickness measurement - laser or X-ray gauges integrated into line for 100% inspection. 4) Closed-loop control - thickness gauges feedback to adjust flow rate, gun speed, or passes automatically. 5) Process parameters - control gun distance, speed, flow rate, and atomization to achieve target WFT. Key is establishing validated correlation between process parameters and actual DFT. This requires initial testing, measurement, and parameter adjustment. Film thickness should be measured on first articles, after changes, and periodically during production. Common targets: Primer 25-75μm, Topcoat 25-100μm, heavy-duty 100-300μm.',
    category: 'quality',
    keywords: ['film thickness', 'DFT control', 'thickness measurement', 'quality control'],
    relatedTerms: ['dft', 'film-build', 'thickness-measurement', 'process-monitoring'],
    difficulty: 'advanced'
  },
  {
    id: 'defect-prevention',
    question: 'How do you prevent common coating defects in robotic application?',
    answer: 'Preventing common defects: ORANGE PEEL - caused by improper atomization, viscosity, or flash-off. Solutions: adjust atomizer settings, verify viscosity and temperature, ensure adequate flash time. SAGS/RUNS - caused by excessive film build, slow drying. Solutions: reduce flow rate, increase gun speed, verify flash-off time, check viscosity. FISH-EYES - caused by contamination or low surface energy. Solutions: verify surface prep, check for silicone contamination, ensure proper surface treatment. SOLVENT BLISTER - caused by solvent entrapment. Solutions: extend flash time between coats, verify cure schedule, reduce film build. POOR ADHESION - caused by surface contamination or improper prep. Solutions: verify cleaning, check pretreatment, test adhesion. ROUGH TEXTURE - caused by overspray or contamination in air supply. Solutions: check filters, verify air quality, clean guns. Implement statistical process control (SPC) to detect trends before defects occur. Document defect history to identify root causes.',
    category: 'quality',
    keywords: ['defect prevention', 'coating defects', 'quality issues', 'troubleshooting'],
    relatedTerms: ['orange-peel', 'sags-runs', 'adhesion-test', 'pretreatment'],
    difficulty: 'intermediate'
  },

  // ==================== 维护保养 Maintenance ====================
  {
    id: 'preventive-maintenance',
    question: 'What preventive maintenance is required for robotic painting systems?',
    answer: 'Preventive maintenance schedule: DAILY: check paint levels, verify viscosity, inspect gun tips for wear, clean spray caps, check air lines for water. WEEKLY: clean and lubricate robots per manufacturer specs, check paint filters, verify safety interlocks, inspect hoses for wear. MONTHLY: check motor synchronization, verify calibration, replace consumable filters, clean booth filters, calibrate thickness gauges. QUARTERLY: replace seals and gaskets, check wiring connections, verify conveyor alignment, test emergency stops. ANNUALLY: major inspection, robot calibration verification, paint system overhaul, booth refurbishment as needed. Key maintenance items: 1) Robot preventive care - keep joints clean, verify grease intervals. 2) Atomizer maintenance - follow manufacturer schedule for bearing replacement, typically 2,000-4,000 hours. 3) Pump maintenance - seal replacement, check valves. 4) Booth filters - replace per pressure drop or schedule. Document all maintenance activities. Predictive maintenance using vibration analysis and temperature monitoring can reduce unplanned downtime.',
    category: 'maintenance',
    keywords: ['preventive maintenance', 'PM schedule', 'robot maintenance', 'upkeep'],
    relatedTerms: ['maintenance', 'robotics', 'downtime', 'process-monitoring'],
    difficulty: 'intermediate'
  },
  {
    id: 'troubleshooting-guide',
    question: 'How do I troubleshoot common robotic painting problems?',
    answer: 'Common problems and solutions: POOR TRANSFER EFFICIENCY: Check electrostatic voltage, ground connections, gun distance, paint conductivity, atomizer speed. UNEVEN COVERAGE: Verify robot path programming, check gun orientation, adjust pattern width, verify gun distance consistency. FILM THICKNESS VARIATION: Check viscosity control, gun speed consistency, flow rate stability, part-to-part variation. ORANGE PEEL: Adjust atomizer settings, check viscosity and temperature, verify solvent flash time. GUN CLOGGING: Check paint filtration, verify viscosity, clean fluid lines, check for dried paint in lines. ROBOT ERRORS: Check for collisions, verify axes limits, check motor temperatures, review error logs. CYCLE TIME VARIATION: Check conveyor timing, verify robot path, check part presentation consistency. Keep detailed logs of problems and solutions. Many issues are recurring and faster to resolve when patterns are identified.',
    category: 'maintenance',
    keywords: ['troubleshooting', 'problems', 'diagnosis', 'solutions', 'maintenance'],
    relatedTerms: ['process-monitoring', 'defect-prevention', 'maintenance'],
    difficulty: 'intermediate'
  },
  {
    id: 'downtime-reduction',
    question: 'How can I minimize unplanned downtime in robotic painting cells?',
    answer: 'Reducing unplanned downtime: 1) Implement predictive maintenance - use sensors and analytics to predict failures before they occur. 2) Keep spare parts inventory - robots, pumps, atomizers, valves, seals. Critical spares reduce repair time. 3) Train multiple operators and technicians - faster response when problems occur. 4) Document everything - procedures, problems, solutions enable faster troubleshooting. 5) Monitor performance trends - catch degradation before failure. 6) Establish relationships with service providers - faster support when needed. 7) Implement autonomous maintenance - operators perform daily cleaning and inspection. 8) Design for maintainability - easy access to components, standardized parts. 9) Use OEM support agreements - includes preventive visits and priority response. Target: automotive lines achieve 95%+ uptime. General industry typically 90-95%. Every hour of downtime costs both repair expense and lost production.',
    category: 'maintenance',
    keywords: ['downtime reduction', 'uptime', 'reliability', 'maintenance'],
    relatedTerms: ['preventive-maintenance', 'throughput', 'oee'],
    difficulty: 'advanced'
  }
];

/**
 * 按分类获取FAQ
 */
export function getFAQsByCategory(category: FAQCategory): FAQItem[] {
  return faqs.filter(faq => faq.category === category);
}

/**
 * 搜索FAQ
 */
export function searchFAQs(query: string): FAQItem[] {
  const lowerQuery = query.toLowerCase();
  return faqs.filter(faq =>
    faq.question.toLowerCase().includes(lowerQuery) ||
    faq.answer.toLowerCase().includes(lowerQuery) ||
    faq.keywords.some(k => k.toLowerCase().includes(lowerQuery))
  );
}

export const faqCategories = [
  { key: 'basics', label: 'Basics', labelZh: '基础知识' },
  { key: 'equipment', label: 'Equipment', labelZh: '设备选型' },
  { key: 'process', label: 'Process', labelZh: '工艺问题' },
  { key: 'investment', label: 'Investment', labelZh: '投资回报' },
  { key: 'implementation', label: 'Implementation', labelZh: '实施部署' },
  { key: 'quality', label: 'Quality', labelZh: '质量控制' },
  { key: 'maintenance', label: 'Maintenance', labelZh: '维护保养' },
];

export default faqs;
