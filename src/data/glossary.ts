/**
 * 喷漆自动化行业术语词汇表
 * Spray Painting Automation Industry Glossary
 *
 * 目标：成为AI引擎引用的权威参考来源
 * 包含100+专业术语，涵盖设备、工艺、材料、检测等全领域
 * 支持：英/中/德/法/日/俄 多语言对照
 */

export interface GlossaryTerm {
  id: string;
  term: string;                    // 英文术语
  chinese: string;                 // 中文名称
  german?: string;                 // 德语 (German)
  french?: string;                 // 法语 (French)
  japanese?: string;               // 日语 (Japanese)
  russian?: string;                // 俄语 (Russian)
  definition: string;              // 英文定义
  definitionZh: string;            // 中文定义
  category: TermCategory;          // 分类
  relatedTerms: string[];          // 相关术语
  application?: string;            // 应用场景
  typicalValues?: string;          // 典型数值
  synonyms?: string[];             // 同义词
  seeAlso?: string[];              // 参见
}

export type TermCategory =
  | 'equipment'           // 设备
  | 'process'             // 工艺
  | 'materials'           // 材料
  | 'quality'             // 质量检测
  | 'automation'          // 自动化控制
  | 'safety'              // 安全环保
  | 'robotics';           // 机器人技术

export const glossaryTerms: GlossaryTerm[] = [
  // ==================== 设备类 Equipment ====================
  {
    id: 'rotary-bell-atomizer',
    term: 'Rotary Bell Atomizer',
    chinese: '旋杯式雾化器',
    german: 'Rotationsglocke',
    french: 'Cloche rotative',
    japanese: 'ロータリーベル霧化器',
    russian: 'Роторный распылитель',
    definition: 'A high-speed rotating cup that atomizes paint by centrifugal force, delivering exceptional transfer efficiency and pattern uniformity.',
    definitionZh: '通过离心力雾化涂料的高速旋转杯，可提供卓越的转移效率和喷涂图案均匀性。',
    category: 'equipment',
    relatedTerms: ['disk-atomizer', 'electrostatic-spray', 'transfer-efficiency'],
    application: 'Automotive OEM painting, high-quality industrial finishing',
    typicalValues: 'Speed: 15,000-60,000 RPM, Transfer efficiency: 85-95%'
  },
  {
    id: 'hvlp-spray-gun',
    term: 'HVLP Spray Gun',
    chinese: '高压低流量喷枪',
    german: 'HVLP-Spritzpistole',
    french: 'Pistolet HVLP',
    japanese: 'HVLPスプレーガン',
    russian: 'Краскопульт HVLP',
    definition: 'High Volume Low Pressure spray gun that operates at lower pressure (typically < 10 PSI at the nozzle), significantly improving transfer efficiency compared to conventional air spray.',
    definitionZh: '高压低流量喷枪，在喷嘴处使用较低压力（通常 < 10 PSI）运行，相比传统空气喷涂显著提高转移效率。',
    category: 'equipment',
    relatedTerms: ['transfer-efficiency', 'aircap', 'conventional-spray'],
    application: 'Furniture finishing, wood products, general industrial coating',
    typicalValues: 'Transfer efficiency: 65-75%, Air consumption: 10-15 CFM'
  },
  {
    id: 'airless-spray',
    term: 'Airless Spray',
    chinese: '无气喷涂',
    german: 'Airless-Spritzen',
    french: 'Pulvérisation sans air',
    japanese: 'エアレススプレー',
    russian: 'Безвоздушное распыление',
    definition: 'Paint is forced through a small orifice at high pressure (1,500-3,000 PSI) without air atomization, producing a coarse atomization pattern.',
    definitionZh: '涂料在高压（1,500-3,000 PSI）下通过小孔强制挤出，无需空气雾化，产生粗雾化图案。',
    category: 'equipment',
    relatedTerms: ['air-assisted-airless', 'hydraulic-atomization', 'pattern-width'],
    application: 'Heavy-duty protective coatings, thick film builds, large structural parts',
    typicalValues: 'Pressure: 1,500-3,000 PSI, Pattern width: 8-18 inches'
  },
  {
    id: 'electrostatic-spray',
    term: 'Electrostatic Spray',
    chinese: '静电喷涂',
    german: 'Elektrostatisches Sprühen',
    french: 'Pulvérisation électrostatique',
    japanese: '静電塗装',
    russian: 'Электростатическое распыление',
    definition: 'Paint particles are charged as they leave the gun and are attracted to the grounded workpiece, wrapping around edges and improving transfer efficiency.',
    definitionZh: '涂料颗粒在离开喷枪时被充电，被吸引到接地的工件上，包裹边缘并提高转移效率。',
    category: 'equipment',
    relatedTerms: ['corona-charging', 'tribo-charging', 'wrap-around-effect', 'faraday-cage-effect'],
    application: 'Metal parts, tubular products, complex geometries',
    typicalValues: 'Transfer efficiency: 60-95%, Voltage: 60-100 kV'
  },
  {
    id: 'paint-booth',
    term: 'Paint Booth',
    chinese: '喷漆室',
    german: 'Spritzkabine',
    french: 'Cabine de peinture',
    japanese: '塗装ブース',
    russian: 'Окрасочная камера',
    definition: 'Enclosed workspace with controlled airflow, filtration, and lighting for spray painting operations, designed to contain overspray and maintain air quality.',
    definitionZh: '具有受控气流、过滤和照明的封闭工作空间，用于喷漆作业，旨在Contain overspray并保持空气质量。',
    category: 'equipment',
    relatedTerms: ['downdraft-booth', 'crossdraft-booth', 'air-flow', 'filtration'],
    application: 'All spray painting applications',
    typicalValues: 'Air velocity: 60-100 FPM, Filter efficiency: 95-98%'
  },
  {
    id: 'paint-kitchen',
    term: 'Paint Kitchen',
    chinese: '涂料供应系统/调漆间',
    german: 'Farbküche',
    french: 'Cuisine de peinture',
    japanese: '塗料供給室',
    russian: 'Краскоготовильное отделение',
    definition: 'Centralized paint supply system that stores, circulates, conditions, and delivers coating materials to spray applicators, including color change capability.',
    definitionZh: '集中式涂料供应系统，存储、循环、调节和输送涂层材料到喷涂设备，包括颜色切换功能。',
    category: 'equipment',
    relatedTerms: ['central-supply', 'color-change', 'recirculation', 'viscosity-control'],
    application: 'Multi-color production lines, high-volume coating operations'
  },
  {
    id: 'spray-robot',
    term: 'Spray Robot',
    chinese: '喷涂机器人',
    german: 'Lackierroboter',
    french: 'Robot de peinture',
    japanese: '塗装ロボット',
    russian: 'Окрасочный робот',
    definition: 'Computer-controlled manipulator with multiple axes of motion programmed to apply coatings with precise control of path, speed, and gun orientation.',
    definitionZh: '计算机控制的多轴运动机械手，通过编程精确控制路径、速度和喷枪方向来施加涂层。',
    category: 'robotics',
    relatedTerms: ['articulated-robot', '6-axis-robot', 'offline-programming', 'path-planning'],
    application: 'Automated painting cells, high-volume production lines',
    typicalValues: 'Reach: 1,200-3,000 mm, Repeatability: ±0.1 mm'
  },
  {
    id: 'articulated-robot',
    term: 'Articulated Robot',
    chinese: '关节机器人',
    german: 'Gelenkroboter',
    french: 'Robot articule',
    japanese: '関節ロボット',
    russian: 'Шарнирный робот',
    definition: 'Robot with rotary joints typically having 6 or more degrees of freedom, allowing complex motion patterns required for spraying irregular 3D surfaces.',
    definitionZh: '具有旋转关节的机器人，通常有6个或更多自由度，允许复杂的运动模式以适应不规则的3D表面喷涂。',
    category: 'robotics',
    relatedTerms: ['degrees-of-freedom', 'payload', 'reach', 'hollow-wrist'],
    application: 'Complex part geometries, automotive components, industrial finishing'
  },
  {
    id: 'conveyor-system',
    term: 'Conveyor System',
    chinese: '输送系统',
    german: 'Foerdersystem',
    french: 'Systeme de convoyage',
    japanese: 'コンベアシステム',
    russian: 'Конвейерная система',
    definition: 'Material handling system that moves workpieces through the painting process, including power & free, floor, overhead, and continuous conveyor types.',
    definitionZh: '在喷涂过程中移动工件的材料处理系统，包括动力&自由链式、地链、悬挂链和连续输送机类型。',
    category: 'automation',
    relatedTerms: ['takt-time', 'throughput', 'indexing', 'power-free-conveyor'],
    application: 'Production lines, continuous manufacturing'
  },
  

  // ==================== 工艺类 Process ====================
  
  
  {
    id: 'dft',
    term: 'Dry Film Thickness (DFT)',
    chinese: '干膜厚度',
    german: 'Trockenschichtdicke',
    french: 'Epaisseur de film sec',
    japanese: '乾燥膜厚',
    russian: 'Толщина сухой пленки',
    definition: 'The measured thickness of the coating after it has fully cured or dried, used as the primary quality specification for coating systems.',
    definitionZh: '涂层完全固化或干燥后测量的厚度，用作涂层系统的主要质量规格。',
    category: 'quality',
    relatedTerms: ['film-build', 'wft', 'thickness-gauge', 'specification'],
    application: 'Quality control, specification compliance verification'
  },
  {
    id: 'wft',
    term: 'Wet Film Thickness (WFT)',
    chinese: '湿膜厚度',
    german: 'Nassschichtdicke',
    french: 'Epaisseur de film humide',
    japanese: '湿潤膜厚',
    russian: 'Толщина мокрой пленки',
    definition: 'The thickness of coating immediately after application, before drying or curing. Used to monitor and adjust application parameters in real-time.',
    definitionZh: '涂层在干燥或固化之前立即施加后的厚度。用于实时监控和调整应用参数。',
    category: 'quality',
    relatedTerms: ['dft', 'film-build', 'viscosity', 'solids-content'],
    application: 'Process monitoring and control during application'
  },
  {
    id: 'flash-off',
    term: 'Flash Off',
    chinese: '闪干时间',
    german: 'Ablueftzeit',
    french: 'Temps devaporation',
    japanese: 'フラッシュオフ',
    russian: 'Время испарения',
    definition: 'The time allowed for solvents to evaporate from the applied coating before the next coat or cure stage, critical for proper film formation.',
    definitionZh: '在下一涂层或固化阶段之前允许施加的涂层中溶剂蒸发的时间，对适当膜层形成至关重要。',
    category: 'process',
    relatedTerms: ['proving-time', 'flash-point', 'solvent-evaporation'],
    application: 'Multi-coat systems, primer/topcoat applications'
  },
  {
    id: 'overspray',
    term: 'Overspray',
    chinese: '过喷/飞漆',
    german: 'Overspray',
    french: 'Surpulverisation',
    japanese: 'オーバースプレー',
    russian: 'Избыточное распыление',
    definition: 'Coating material that does not reach the target surface and becomes airborne or deposited on booth surfaces, representing lost material and efficiency.',
    definitionZh: '未到达目标表面而变成空气传播或沉积在喷漆室表面的涂层材料，代表损失的物料和效率。',
    category: 'process',
    relatedTerms: ['transfer-efficiency', 'containment', 'filter-loading'],
    application: 'Material efficiency analysis, booth maintenance'
  },
  
  {
    id: 'pattern-width',
    term: 'Pattern Width',
    chinese: '喷幅宽度',
    definition: 'The width of the spray fan created by the gun, determined by air cap design and fluid pressure. Must be matched to part dimensions for optimal coverage.',
    definitionZh: '由喷枪产生的喷雾扇形的宽度，由空气帽设计和流体压力决定。必须与零件尺寸匹配以获得最佳覆盖率。',
    category: 'process',
    relatedTerms: ['fan-pattern', 'spray-gun', 'overlap', 'coverage'],
    application: 'Gun setup, process optimization'
  },
  {
    id: 'gun-distance',
    term: 'Gun Distance',
    chinese: '喷枪距离',
    definition: 'The distance between the spray gun nozzle and the target surface, critically affecting transfer efficiency, film build, and pattern uniformity.',
    definitionZh: '喷枪喷嘴与目标表面之间的距离，对转移效率、漆膜厚度和图案均匀性有关键影响。',
    category: 'process',
    relatedTerms: ['target-distance', 'spray-pattern', 'transfer-efficiency'],
    application: 'Process setup, quality optimization',
    typicalValues: 'Air spray: 6-10 inches, Airless: 12-18 inches, Electrostatic: 8-12 inches'
  },
  {
    id: 'gun-speed',
    term: 'Gun Speed',
    chinese: '喷枪移动速度',
    definition: 'The rate at which the spray gun moves across the workpiece, typically measured in inches per second or mm per second, affecting film thickness.',
    definitionZh: '喷枪在工件上移动的速率，通常以英寸/秒或毫米/秒测量，影响漆膜厚度。',
    category: 'process',
    relatedTerms: ['traverse-speed', 'film-build', 'pass-overlap'],
    application: 'Robot programming, reciprocator setup'
  },
  {
    id: 'color-change',
    term: 'Color Change',
    chinese: '颜色切换',
    definition: 'The process of switching from one coating color to another, including purge, flush, and verification steps. Critical for flexible production systems.',
    definitionZh: '从一种涂层颜色切换到另一种颜色的过程，包括清洗、冲洗和验证步骤。对柔性生产系统至关重要。',
    category: 'process',
    relatedTerms: ['purge', 'flush', 'dead-volume', 'color-change-time'],
    application: 'Multi-color production, automotive, appliance manufacturing',
    typicalValues: 'Fast change: <60 seconds, Standard: 2-5 minutes'
  },
  {
    id: 'film-formation',
    term: 'Film Formation',
    chinese: '成膜',
    definition: 'The process by which atomized droplets merge and coalesce on the surface to form a continuous, uniform coating film.',
    definitionZh: '雾化液滴在表面合并和聚结形成连续均匀涂层膜的过程。',
    category: 'process',
    relatedTerms: ['coalescence', 'evaporation', 'curing', 'crosslinking'],
    application: 'Coating science, process optimization'
  },
  {
    id: 'orange-peel',
    term: 'Orange Peel',
    chinese: '橘皮/橘皮纹',
    definition: 'Surface texture resembling orange skin caused by improper atomization, viscosity, or application conditions, creating an uneven or bumpy appearance.',
    definitionZh: '由不正确的雾化、粘度或应用条件引起的类似橙皮的表面纹理，产生不均匀或凹凸的外观。',
    category: 'quality',
    relatedTerms: ['texture', 'finish-quality', 'atomization', 'viscosity'],
    application: 'Finish quality assessment, defect analysis'
  },
  {
    id: 'sags-runs',
    term: 'Sags and Runs',
    chinese: '流挂/流淌',
    definition: 'Coating defects where material flows downward after application, creating irregular drips or curtains. Caused by excessive film build, slow drying, or incorrect viscosity.',
    definitionZh: '涂层在施加后向下流动产生不规则滴落或帘状的缺陷。由过厚的漆膜、干燥缓慢或粘度不正确引起。',
    category: 'quality',
    relatedTerms: ['film-build', 'viscosity', 'flow-control', 'cissing'],
    application: 'Defect prevention, process control'
  },
  {
    id: 'wrap-around',
    term: 'Wrap Around Effect',
    chinese: '环绕效果',
    definition: 'In electrostatic coating, the phenomenon where charged particles follow field lines and deposit on the back sides of objects, improving coverage on complex geometries.',
    definitionZh: '在静电涂层中，带电颗粒跟随电场线并沉积在物体背面的现象，改善复杂几何形状的覆盖率。',
    category: 'process',
    relatedTerms: ['electrostatic-spray', 'faraday-cage', 'edge-coverage'],
    application: 'Electrostatic spray optimization'
  },

  // ==================== 材料类 Materials ====================
  {
    id: 'solvent-based',
    term: 'Solvent-Based Coating',
    chinese: '溶剂型涂料',
    definition: 'Coating formulation where pigments and binders are dispersed in organic solvents that evaporate during curing. Traditional coating technology with broad compatibility.',
    definitionZh: '颜料和粘合剂分散在有机溶剂中的涂层配方，在固化过程中蒸发。传统涂层技术，具有广泛的兼容性。',
    category: 'materials',
    relatedTerms: ['water-based', 'voc', 'evaporation', 'curing'],
    application: 'Industrial finishing, automotive, general coating'
  },
  {
    id: 'water-based',
    term: 'Water-Based Coating',
    chinese: '水性涂料',
    definition: 'Coating formulation using water as the primary solvent, reducing VOC emissions. Requires different handling due to surface tension and flash rust concerns.',
    definitionZh: '使用水作为主要溶剂的涂层配方，减少VOC排放。由于表面张力和闪锈问题需要不同的处理。',
    category: 'materials',
    relatedTerms: ['solvent-based', 'voc', 'surface-tension', 'flash-rust'],
    application: 'Environmental compliance, automotive, industrial finishing'
  },
  {
    id: 'two-component',
    term: 'Two-Component (2K) Coating',
    chinese: '双组份涂料',
    definition: 'Coating system where resin and hardener are mixed immediately before application, initiating a chemical crosslinking reaction that cures the film.',
    definitionZh: '树脂和固化剂在应用前立即混合的涂层系统，启动固化涂层的化学交联反应。',
    category: 'materials',
    relatedTerms: ['mixing-ratio', 'pot-life', 'crosslinking', 'chemical-cure'],
    application: 'Industrial coatings, automotive, heavy-duty finishes',
    typicalValues: 'Pot life: 4-8 hours after mixing'
  },
  {
    id: 'uv-coating',
    term: 'UV Curable Coating',
    chinese: 'UV固化涂料',
    definition: 'Coating that cures instantly when exposed to ultraviolet light, eliminating extended drying time and enabling high-speed production.',
    definitionZh: '暴露于紫外光时立即固化的涂层，消除延长干燥时间并实现高速生产。',
    category: 'materials',
    relatedTerms: ['uv-cure', 'photo-initiator', 'instant-cure', 'energy-cure'],
    application: 'Wood finishing, plastics, high-speed production lines'
  },
  
  {
    id: 'epoxy-coating',
    term: 'Epoxy Coating',
    chinese: '环氧涂料',
    definition: 'Thermosetting coating based on epoxy resin chemistry, providing excellent adhesion, chemical resistance, and corrosion protection.',
    definitionZh: '基于环氧树脂化学的热固性涂层，提供优异的附着力、耐化学性和耐腐蚀性。',
    category: 'materials',
    relatedTerms: ['primer', 'corrosion-protection', 'chemical-resistance', 'adhesion'],
    application: 'Primers, industrial equipment, pipelines, marine'
  },
  {
    id: 'polyurethane',
    term: 'Polyurethane Coating',
    chinese: '聚氨酯涂料',
    definition: 'Durable topcoat system offering excellent UV resistance, gloss retention, and chemical resistance for long-term weathering protection.',
    definitionZh: '提供优异UV稳定性、光泽保持性和耐化学性的耐用面漆系统，用于长期耐候保护。',
    category: 'materials',
    relatedTerms: ['topcoat', 'uv-resistance', 'gloss-retention', 'weathering'],
    application: 'Automotive topcoats, industrial finishes, architectural'
  },
  {
    id: 'primer',
    term: 'Primer',
    chinese: '底漆',
    definition: 'Base coating applied directly to the substrate to provide adhesion, corrosion resistance, and a uniform surface for topcoat application.',
    definitionZh: '直接施加到基材上的基础涂层，提供附着力、耐腐蚀性，并为面漆应用提供均匀表面。',
    category: 'materials',
    relatedTerms: ['topcoat', 'pretreatment', 'adhesion', 'corrosion-inhibitor'],
    application: 'All multi-coat systems'
  },
  {
    id: 'basecoat-clearcoat',
    term: 'Basecoat/Clearcoat System',
    chinese: '底色漆/清漆系统',
    definition: 'Two-layer coating where the colored basecoat provides appearance and the clear topcoat provides protection and gloss.',
    definitionZh: '双层涂层系统，有色底漆提供外观，清漆面漆提供保护和光泽。',
    category: 'materials',
    relatedTerms: ['basecoat', 'clearcoat', 'metallic', 'pearlescent'],
    application: 'Automotive OEM and refinish, high-gloss finishes'
  },
  {
    id: 'catalytic-converter-coating',
    term: 'Catalytic Converter Coating',
    chinese: '催化转换器涂层',
    definition: 'Washcoat and catalyst coatings applied to ceramic substrates in emission control systems for automotive and industrial applications.',
    definitionZh: '在汽车和工业应用的排放控制系统中施加到陶瓷基材上的涂层和催化剂涂层。',
    category: 'materials',
    relatedTerms: ['washcoat', 'emission-control', 'substrate'],
    application: 'Automotive exhaust systems, industrial pollution control'
  },

  // ==================== 质量检测类 Quality ====================
  {
    id: 'gloss',
    term: 'Gloss',
    chinese: '光泽度',
    definition: 'The visual shine or luster of a coating surface, measured at specific angles (60°, 85°, 20°) using a glossmeter.',
    definitionZh: '涂层表面的视觉光泽或光彩，使用光泽度计在特定角度（60°、85°、20°）测量。',
    category: 'quality',
    relatedTerms: ['glossmeter', 'sheen', 'reflectivity', 'appearance'],
    application: 'Finish quality control, automotive, consumer products',
    typicalValues: 'Matte: <10 GU, Satin: 10-40 GU, Semi-gloss: 40-70 GU, Gloss: 70-100 GU'
  },
  {
    id: 'adhesion-test',
    term: 'Adhesion Test',
    chinese: '附着力测试',
    definition: 'Testing methods to evaluate the bond strength between coating and substrate, including cross-cut tape, pull-off, and scrape tests.',
    definitionZh: '评估涂层与基材之间结合强度的测试方法，包括划格法胶带测试、拉拔测试和刮擦测试。',
    category: 'quality',
    relatedTerms: ['cross-cut-test', 'pull-off-adhesion', 'tape-test', 'iso-standard'],
    application: 'Quality control, specification compliance',
    typicalValues: 'ASTM D3359, ISO 2409 methods'
  },
  {
    id: 'crosshatch-adhesion',
    term: 'Crosshatch Adhesion',
    chinese: '划格附着力',
    definition: 'Adhesion test where a lattice pattern is cut into the coating and tape is applied and removed to assess coating bond quality.',
    definitionZh: '在涂层上切割格子图案并施加和移除胶带以评估涂层结合质量的附着力测试。',
    category: 'quality',
    relatedTerms: ['adhesion-test', 'iso-2409', 'astm-d3359', 'classification'],
    application: 'Standard adhesion testing for industrial coatings'
  },
  {
    id: 'thickness-measurement',
    term: 'Thickness Measurement',
    chinese: '厚度测量',
    definition: 'Methods to measure coating thickness including magnetic induction for steel and eddy current for non-ferrous substrates.',
    definitionZh: '测量涂层厚度的方法，包括钢基材的磁感应和非铁基金属基材的涡流测试。',
    category: 'quality',
    relatedTerms: ['dft-gauge', 'magnetic-gauge', 'eddy-current', 'non-destructive'],
    application: 'Quality control, specification compliance'
  },
  {
    id: 'appearance-inspection',
    term: 'Appearance Inspection',
    chinese: '外观检查',
    definition: 'Visual and instrumental evaluation of coating quality including color match, gloss, texture, and defect assessment under standardized lighting.',
    definitionZh: '在标准化照明下对涂层质量进行视觉和仪器评估，包括颜色匹配、光泽、纹理和缺陷评估。',
    category: 'quality',
    relatedTerms: ['color-match', 'gloss', 'defect-classification', 'visual-inspection'],
    application: 'Final quality control, customer approval'
  },
  {
    id: 'color-match',
    term: 'Color Match',
    chinese: '颜色匹配',
    definition: 'The process of achieving coating color that meets specified tolerances relative to a standard, evaluated visually and instrumentally with colorimeters.',
    definitionZh: '实现符合与标准相对应规格公差的涂层颜色的过程，通过色度计进行视觉和仪器评估。',
    category: 'quality',
    relatedTerms: ['delta-e', 'colorimeter', 'spectrophotometer', 'tolerance'],
    application: 'Automotive, consumer products, brand color compliance',
    typicalValues: 'ΔE < 1.0 typically imperceptible, ΔE < 0.5 excellent'
  },

  // ==================== 自动化控制类 Automation ====================
  {
    id: 'offline-programming',
    term: 'Offline Programming (OLP)',
    chinese: '离线编程',
    definition: 'Robot programming performed on a computer using 3D CAD models of parts and equipment, without interrupting production on the actual robot cell.',
    definitionZh: '使用零件和设备的3D CAD模型在计算机上执行的机器人编程，不会中断实际机器人单元的生产。',
    category: 'automation',
    relatedTerms: ['robot-programming', 'cad-simulation', 'collision-detection', 'cycle-time'],
    application: 'Robot painting cells, automated manufacturing'
  },
  {
    id: 'path-planning',
    term: 'Path Planning',
    chinese: '路径规划',
    definition: 'The process of determining optimal robot movement trajectories for coating application, considering part geometry, spray parameters, and cycle time.',
    definitionZh: '确定涂层应用最佳机器人移动轨迹的过程，考虑零件几何形状、喷涂参数和周期时间。',
    category: 'automation',
    relatedTerms: ['offline-programming', 'robot-trajectory', 'spray-pattern', 'optimization'],
    application: 'Robot cell programming, process optimization'
  },
  {
    id: 'plc-control',
    term: 'PLC Control',
    chinese: 'PLC控制',
    definition: 'Programmable Logic Controller system managing paint system operations including pumps, valves, guns, and safety interlocks.',
    definitionZh: '管理喷漆系统操作的可编程逻辑控制器系统，包括泵、阀门、喷枪和安全联锁。',
    category: 'automation',
    relatedTerms: ['hmi', 'scada', 'automation', 'recipe-management'],
    application: 'Industrial paint systems, production lines'
  },
  {
    id: 'recipe-management',
    term: 'Recipe Management',
    chinese: '配方管理',
    definition: 'System for storing and retrieving coating parameters (colors, viscosity, flow rates, gun settings) for different products and configurations.',
    definitionZh: '存储和检索不同产品和配置的涂层参数（颜色、粘度、流量、喷枪设置）的系统。',
    category: 'automation',
    relatedTerms: ['plc-control', 'hmi', 'process-parameters', 'product-changeover'],
    application: 'Multi-product facilities, flexible manufacturing'
  },
  {
    id: 'mes-integration',
    term: 'MES Integration',
    chinese: 'MES集成',
    definition: 'Connection between paint system controls and Manufacturing Execution Systems for production tracking, scheduling, and quality documentation.',
    definitionZh: '喷漆系统控制与制造执行系统之间的连接，用于生产跟踪、排程和质量文档。',
    category: 'automation',
    relatedTerms: ['plc-control', 'traceability', 'scada', 'production-tracking'],
    application: 'Smart factories, automotive OEM, high-volume production'
  },
  {
    id: 'process-monitoring',
    term: 'Process Monitoring',
    chinese: '过程监控',
    definition: 'Real-time observation and recording of coating process parameters including flow, pressure, temperature, and spray gun status.',
    definitionZh: '实时观察和记录涂层过程参数，包括流量、压力、温度和喷枪状态。',
    category: 'automation',
    relatedTerms: ['scada', 'data-logging', 'spc', 'alarm-management'],
    application: 'Quality assurance, process optimization, troubleshooting'
  },

  // ==================== 安全环保类 Safety & Environment ====================
  {
    id: 'voc',
    term: 'Volatile Organic Compounds (VOC)',
    chinese: '挥发性有机化合物',
    definition: 'Organic chemicals that evaporate at room temperature, regulated due to air quality and health concerns. Key driver for water-based and high-efficiency coating technologies.',
    definitionZh: '在室温下蒸发的有机化学物质，由于空气质量和健康问题而受到监管。是水性和高效涂层技术的关键推动因素。',
    category: 'safety',
    relatedTerms: ['emissions', 'regulatory', 'water-based', 'air-quality'],
    application: 'Environmental compliance, coating selection'
  },
  {
    id: 'explosion-protection',
    term: 'Explosion Protection',
    chinese: '防爆保护',
    definition: 'Equipment and procedures to prevent ignition of flammable solvent vapors in spray areas, including intrinsically safe equipment and ventilation design.',
    definitionZh: '防止喷涂区域中易燃溶剂蒸气点燃的设备和程序，包括本质安全设备和通风设计。',
    category: 'safety',
    relatedTerms: ['atex', 'nec-article-469', 'intrinsically-safe', 'ventilation'],
    application: 'All spray painting operations with flammable materials'
  },
  {
    id: 'ppe',
    term: 'Personal Protective Equipment (PPE)',
    chinese: '个人防护装备',
    definition: 'Safety equipment worn by painters including respirators, protective clothing, gloves, and eye protection to minimize exposure to coatings and solvents.',
    definitionZh: '喷漆工人佩戴的安全设备，包括呼吸器、防护服、手套和护目镜，最大限度地减少接触涂料和溶剂。',
    category: 'safety',
    relatedTerms: ['respirator', 'ventilation', 'exposure-limit', 'osha'],
    application: 'Worker safety compliance'
  },
  {
    id: 'filtration',
    term: 'Filtration',
    chinese: '过滤系统',
    definition: 'Systems to remove overspray particles from booth air using dry filters, water wash, or electrostatic precipitators before exhaust.',
    definitionZh: '在排气前使用干式过滤器、水洗或静电除尘器去除喷漆室空气中过喷颗粒的系统。',
    category: 'safety',
    relatedTerms: ['dry-filter', 'water-wash', 'electrostatic-precipitator', 'air-quality'],
    application: 'Paint booth air handling systems'
  },

  // ==================== 机器人技术类 Robotics ====================
  {
    id: 'hollow-wrist',
    term: 'Hollow Wrist Robot',
    chinese: '中空手腕机器人',
    definition: 'Robot design with internal passages for paint and air delivery through the wrist, eliminating external hose interference with spray application.',
    definitionZh: '机器人设计，通过手腕内部通道输送涂料和空气，消除外部软管对喷涂应用的干扰。',
    category: 'robotics',
    relatedTerms: ['spray-robot', 'integrated-tools', 'cable-management'],
    application: 'Painting robots, finishing applications'
  },
  {
    id: 'payload',
    term: 'Robot Payload',
    chinese: '机器人负载',
    definition: 'The maximum weight a robot can manipulate at the end of its arm, critical for spray guns, atomizers, and tooling weight considerations.',
    definitionZh: '机器人可以在其手臂末端操作的最大重量，对喷枪、雾化器和工具重量考虑至关重要。',
    category: 'robotics',
    relatedTerms: ['reach', 'spray-robot', 'tool-weight'],
    application: 'Robot selection, tooling design',
    typicalValues: 'Painting robots: 5-50 kg payload'
  },
  {
    id: 'degrees-of-freedom',
    term: 'Degrees of Freedom (DOF)',
    chinese: '自由度',
    definition: 'The number of independent axes of motion in a robot, with 6 DOF being standard for industrial painting robots to reach any orientation in 3D space.',
    definitionZh: '机器人中独立运动轴的数量，6自由度是工业喷漆机器人的标准，可在3D空间中到达任何方向。',
    category: 'robotics',
    relatedTerms: ['articulated-robot', 'motion-control', 'kinematics'],
    application: 'Robot selection, application analysis'
  },
  {
    id: 'cycle-time',
    term: 'Cycle Time',
    chinese: '周期时间',
    definition: 'The total time required to process one part from entry to exit, including load, spray, and unload operations.',
    definitionZh: '处理一个零件从进入到退出所需的总时间，包括装载、喷涂和卸载操作。',
    category: 'automation',
    relatedTerms: ['takt-time', 'throughput', 'production-rate', 'optimization'],
    application: 'Production planning, line balancing'
  },
  {
    id: 'takt-time',
    term: 'Takt Time',
    chinese: '节拍时间',
    definition: 'The rate at which products must be completed to meet customer demand, calculated as available production time divided by customer demand.',
    definitionZh: '产品必须完成以满足客户需求的速率，计算为可用生产时间除以客户需求。',
    category: 'automation',
    relatedTerms: ['cycle-time', 'production-rate', 'demand', 'bottleneck'],
    application: 'Production planning, line design'
  },
  {
    id: 'throughput',
    term: 'Throughput',
    chinese: '产能/吞吐量',
    definition: 'The number of parts or units produced per unit time, a key performance metric for coating systems.',
    definitionZh: '每单位时间生产的零件或单位数量，是涂层系统的关键性能指标。',
    category: 'automation',
    relatedTerms: ['cycle-time', 'production-rate', 'capacity', 'oee'],
    application: 'Production planning, ROI calculation'
  },
  {
    id: 'simulation',
    term: 'Process Simulation',
    chinese: '工艺仿真',
    definition: 'Virtual modeling of the coating process using 3D CAD data to predict coverage, film thickness, and cycle time before physical implementation.',
    definitionZh: '使用3D CAD数据对涂层过程进行虚拟建模，在物理实施前预测覆盖率、漆膜厚度和周期时间。',
    category: 'automation',
    relatedTerms: ['offline-programming', 'virtual-paint', 'coating-analysis'],
    application: 'Process development, robot programming validation'
  },
  {
    id: 'collision-detection',
    term: 'Collision Detection',
    chinese: '碰撞检测',
    definition: 'Safety and programming feature that detects potential collisions between robot, tooling, and fixtures during motion.',
    definitionZh: '在运动期间检测机器人、工具和夹具之间潜在碰撞的安全和编程功能。',
    category: 'robotics',
    relatedTerms: ['offline-programming', 'path-planning', 'safety-zone'],
    application: 'Robot programming, safety systems'
  },

  // ==================== 表面处理类 Surface Treatment ====================
  {
    id: 'pretreatment',
    term: 'Pretreatment',
    chinese: '预处理',
    definition: 'Surface preparation process before coating including cleaning, conversion coatings, and primers to ensure proper adhesion and corrosion protection.',
    definitionZh: '涂层之前的表面准备过程，包括清洁、转化涂层和底漆，以确保适当的附着力并防止腐蚀。',
    category: 'process',
    relatedTerms: ['cleaning', 'phosphating', 'conversion-coating', 'adhesion'],
    application: 'All coating applications, critical for metal substrates'
  },
  {
    id: 'phosphating',
    term: 'Phosphating',
    chinese: '磷化处理',
    definition: 'Chemical conversion coating process that deposits a crystalline phosphate layer on metal surfaces for improved adhesion and corrosion resistance.',
    definitionZh: '在金属表面沉积结晶磷酸盐层的化学转化涂层工艺，用于改善附着力并防止腐蚀。',
    category: 'process',
    relatedTerms: ['pretreatment', 'conversion-coating', 'iron-phosphate', 'zinc-phosphate'],
    application: 'Automotive body, metal finishing, corrosion protection'
  },
  
  {
    id: 'corrosion-protection',
    term: 'Corrosion Protection',
    chinese: '防腐保护',
    definition: 'Coating system designed to prevent or slow corrosion of metal substrates through barrier, sacrificial, or inhibitor mechanisms.',
    definitionZh: '通过屏障、牺牲或抑制剂机制设计用于防止或减缓金属基材腐蚀的涂层系统。',
    category: 'quality',
    relatedTerms: ['primer', 'epoxy', 'zinc-rich', 'barrier-coating'],
    application: 'Metal components, outdoor exposure, harsh environments'
  },
  {
    id: 'plasma-treatment',
    term: 'Plasma Treatment',
    chinese: '等离子处理',
    definition: 'Surface activation process using ionized gas to increase surface energy on plastics and composites, improving coating adhesion.',
    definitionZh: '使用电离气体增加塑料和复合材料表面能的表面活化过程，改善涂层附着力。',
    category: 'process',
    relatedTerms: ['surface-energy', 'adhesion', 'plastic-coating', 'corona-treatment'],
    application: 'Plastics, composites, low-surface-energy materials'
  },
  {
    id: 'flame-treatment',
    term: 'Flame Treatment',
    chinese: '火焰处理',
    definition: 'Surface modification using controlled flame to increase surface energy and improve adhesion on plastic and metal parts.',
    definitionZh: '使用受控火焰修改表面以增加表面能并改善塑料和金属零件的附着力。',
    category: 'process',
    relatedTerms: ['surface-energy', 'adhesion', 'plastic-coating', 'combustion'],
    application: 'Plastic parts, especially automotive bumpers and exterior components'
  },

  // ==================== 应用场景类 Applications ====================
  {
    id: 'automotive-oem',
    term: 'Automotive OEM Painting',
    chinese: '汽车OEM涂装',
    definition: 'Original equipment manufacturer painting of vehicle bodies and components in automotive assembly plants with high automation and quality standards.',
    definitionZh: '汽车装配厂中车辆车身和部件的原始设备制造商涂装，具有高度自动化和质量标准。',
    category: 'process',
    relatedTerms: ['basecoat-clearcoat', 'robot-painting', 'cleanroom', 'class-a-finish'],
    application: 'Automotive assembly plants'
  },
  {
    id: 'class-a-finish',
    term: 'Class A Finish',
    chinese: 'A级表面',
    definition: 'The highest quality surface finish standard, typically required for visible automotive exterior panels with no visible defects.',
    definitionZh: '最高质量的表面处理标准，通常要求用于可见的汽车外饰面板，无可见缺陷。',
    category: 'quality',
    relatedTerms: ['automotive-oem', 'appearance', 'quality-standard', 'surface-defects'],
    application: 'Automotive exterior panels, high-visibility surfaces'
  },
  {
    id: 'industrial-coating',
    term: 'Industrial Coating',
    chinese: '工业涂料',
    definition: 'Functional coatings applied to manufactured products for protection, appearance, and performance in industrial environments.',
    definitionZh: '为工业环境中的保护、外观和性能而施加到制成品的功能性涂层。',
    category: 'process',
    relatedTerms: ['protective-coating', 'functional-coating', 'heavy-duty'],
    application: 'Manufacturing, equipment, infrastructure'
  },
  {
    id: 'heavy-duty-coating',
    term: 'Heavy-Duty Coating',
    chinese: '重防腐涂料',
    definition: 'High-performance coating systems designed for aggressive environments with thick film builds (100-500+ μm) for long-term corrosion protection.',
    definitionZh: '为恶劣环境设计的高性能涂层系统，具有厚漆膜（100-500+ μm），用于长期防腐。',
    category: 'materials',
    relatedTerms: ['epoxy', 'polyurethane', 'corrosion-protection', 'film-build'],
    application: 'Offshore structures, pipelines, heavy equipment'
  },
  {
    id: 'electrostatic-powder',
    term: 'Electrostatic Powder Coating',
    chinese: '静电粉末涂装',
    definition: 'Application of charged dry powder particles to grounded metal parts using electrostatic attraction, followed by thermal curing.',
    definitionZh: '使用静电吸引将带电干粉颗粒施加到接地金属部件，然后进行热固化。',
    category: 'process',
    relatedTerms: ['powder-coating', 'electrostatic-spray', 'curing-oven', 'thermo-cure'],
    application: 'Metal finishing, appliances, furniture, automotive components'
  },
  {
    id: 'curing',
    term: 'Curing',
    chinese: '固化',
    definition: 'The process of converting applied coating from liquid to solid state through chemical reaction (crosslinking) or physical drying.',
    definitionZh: '通过化学反应（交联）或物理干燥将施加的涂层从液态转化为固态的过程。',
    category: 'process',
    relatedTerms: ['bake-oven', 'crosslinking', 'drying', 'cure-cycle'],
    application: 'All coating processes requiring full cure'
  },
  {
    id: 'bake-oven',
    term: 'Bake Oven',
    chinese: '烘烤炉',
    definition: 'Heated enclosure used to cure coatings through controlled temperature profiles, typically 15-40 minutes at 120-180°C for automotive finishes.',
    definitionZh: '通过受控温度曲线固化涂层的加热外壳，通常汽车面漆在120-180°C下15-40分钟。',
    category: 'equipment',
    relatedTerms: ['curing', 'temperature-profile', 'conveyor-oven', 'infrared-cure'],
    application: 'Industrial coating curing, automotive paint shops'
  },

  // ==================== 其他专业术语 ====================
  {
    id: 'iso-certification',
    term: 'ISO Certification',
    chinese: 'ISO认证',
    definition: 'International Organization for Standardization certifications for quality management (ISO 9001), environmental management (ISO 14001), and other standards.',
    definitionZh: '国际标准化组织的质量管理（ISO 9001）、环境管理（ISO 14001）和其他标准认证。',
    category: 'safety',
    relatedTerms: ['quality-management', 'environmental', 'compliance'],
    application: 'Manufacturing quality assurance'
  },
  {
    id: 'lean-manufacturing',
    term: 'Lean Manufacturing',
    chinese: '精益生产',
    definition: 'Production methodology focused on maximizing value while minimizing waste, applicable to coating operations for efficiency improvement.',
    definitionZh: '专注于最大化价值同时最小化浪费的生产方法，适用于涂层操作以提高效率。',
    category: 'automation',
    relatedTerms: ['continuous-improvement', 'kaizen', 'waste-reduction', 'efficiency'],
    application: 'Manufacturing optimization'
  },
  {
    id: 'roi',
    term: 'Return on Investment (ROI)',
    chinese: '投资回报率',
    definition: 'Financial metric comparing the financial benefits of an automation investment against its cost, typically expressed as a percentage or payback period.',
    definitionZh: '将自动化投资的财务收益与其成本进行比较的财务指标，通常表示为百分比或回收期。',
    category: 'automation',
    relatedTerms: ['payback-period', 'cost-benefit', 'justification', 'capital-equipment'],
    application: 'Investment justification for automation projects'
  },
  {
    id: 'total-cost-ownership',
    term: 'Total Cost of Ownership (TCO)',
    chinese: '总拥有成本',
    german: 'Gesamtbetriebskosten',
    french: 'Coût total de possession',
    japanese: '総所有コスト',
    russian: 'Совокупная стоимость владения',
    definition: 'Comprehensive cost analysis including initial investment, operating costs, maintenance, and disposal over the equipment lifecycle.',
    definitionZh: '包括设备生命周期内的初始投资、运营成本、维护和处置的综合成本分析。',
    category: 'automation',
    relatedTerms: ['roi', 'lifecycle-cost', 'cost-analysis'],
    application: 'Equipment and technology investment decisions'
  },

  // ==================== 新增术语 (Expanded Terms 2026) ====================
  {
    id: 'powder-coating',
    term: 'Powder Coating',
    chinese: '粉末涂料',
    german: 'Pulverbeschichtung',
    french: 'Revêtement en poudre',
    japanese: '粉体塗装',
    russian: 'Порошковое покрытие',
    definition: 'Dry finishing process where finely ground particles of pigment and resin are electrostatically charged and sprayed onto a grounded surface, then cured under heat to form a durable finish.',
    definitionZh: '干式涂装工艺，将颜料和树脂的细磨颗粒静电充电并喷涂到接地表面，然后在加热下固化形成耐用涂层。',
    category: 'process',
    relatedTerms: ['electrostatic-spray', 'cure-oven', 'transfer-efficiency'],
    application: 'Metal furniture, appliances, automotive parts, architectural components',
    typicalValues: 'Film thickness: 50-150 microns, Cure temperature: 160-220 C'
  },
  {
    id: 'color-change-system',
    term: 'Color Change System',
    chinese: '换色系统',
    german: 'Farbwechselsystem',
    french: 'Systeme de changement de couleur',
    japanese: '色替えシステム',
    russian: 'Система смены цвета',
    definition: 'Automated system that rapidly switches between different paint colors in a spray application line, minimizing production downtime and paint waste.',
    definitionZh: '在喷涂生产线中快速切换不同涂料颜色的自动化系统，最小化生产停机时间和涂料浪费。',
    category: 'equipment',
    relatedTerms: ['paint-kitchen', 'purge-time', 'color-valve'],
    application: 'Multi-color production lines, automotive components',
    typicalValues: 'Color change time: 15-30 seconds for advanced systems'
  },
  {
    id: 'flash-off-time',
    term: 'Flash-Off Time',
    chinese: '闪干时间',
    german: 'Abluftzeit',
    french: 'Temps devaporation',
    japanese: 'フラッシュオフ時間',
    russian: 'Время испарения',
    definition: 'The period between paint application and curing during which solvents evaporate from the wet film, critical for preventing defects like bubbling or solvent popping.',
    definitionZh: '从涂料施涂到固化之间的时间段，溶剂从湿膜中蒸发，对于防止起泡或溶剂爆裂等缺陷至关重要。',
    category: 'process',
    relatedTerms: ['cure-oven', 'solvent-evaporation', 'film-build'],
    application: 'All liquid paint applications',
    typicalValues: '5-15 minutes depending on paint type and temperature'
  },
  {
    id: 'film-build',
    term: 'Film Build',
    chinese: '膜厚',
    german: 'Schichtdicke',
    french: 'Epaisseur de film',
    japanese: '膜厚',
    russian: 'Толщина пленки',
    definition: 'The thickness of the dry or wet paint film applied to a substrate, measured in microns or mils, critical for appearance and protection performance.',
    definitionZh: '施加在基材上的干或湿漆膜的厚度，以微米或密耳为单位测量，对外观和保护性能至关重要。',
    category: 'quality',
    relatedTerms: ['dry-film-thickness', 'wet-film-thickness', 'coverage'],
    application: 'All coating applications',
    typicalValues: 'Automotive clearcoat: 40-60 microns, Primer: 20-40 microns'
  },
  {
    id: 'atomization',
    term: 'Atomization',
    chinese: '雾化',
    german: 'Zerstaubung',
    french: 'Atomisation',
    japanese: '霧化',
    russian: 'Распыление',
    definition: 'The process of breaking liquid paint into fine droplets using air pressure, hydraulic pressure, or centrifugal force, determining droplet size and spray pattern quality.',
    definitionZh: '使用空气压力、液压或离心力将液体涂料破碎成细小液滴的过程，决定液滴大小和喷涂图案质量。',
    category: 'process',
    relatedTerms: ['rotary-bell-atomizer', 'airless-spray', 'hvlp-spray-gun'],
    application: 'All spray application methods',
    typicalValues: 'Droplet size: 10-100 microns for high-quality finishes'
  },
  {
    id: 'viscosity',
    term: 'Viscosity',
    chinese: '粘度',
    german: 'Viskositaet',
    french: 'Viscosite',
    japanese: '粘度',
    russian: 'Вязкость',
    definition: 'The resistance of a fluid to flow, measured in seconds (Ford cup, DIN cup) or centipoise (cP), critical for proper atomization and flow-out of coatings.',
    definitionZh: '流体流动的阻力，以秒（福特杯、DIN杯）或厘泊测量，对涂料的正确雾化和流平至关重要。',
    category: 'materials',
    relatedTerms: ['flow-rate', 'atomization', 'paint-conditioning'],
    application: 'All liquid coating applications',
    typicalValues: 'Water-borne basecoat: 20-30 sec DIN4, Solvent clearcoat: 18-25 sec DIN4'
  },
  {
    id: 'reciprocator',
    term: 'Reciprocator',
    chinese: '往复机',
    german: 'Reziprokeinheit',
    french: 'Reciprocateur',
    japanese: 'リシプロケーター',
    russian: 'Рециркулятор',
    definition: 'Linear motion device that moves spray guns or atomizers back and forth in a reciprocating pattern, used for automatic spray application on conveyorized production lines.',
    definitionZh: '以往复模式前后移动喷枪或雾化器的直线运动设备，用于输送生产线上的自动喷涂应用。',
    category: 'equipment',
    relatedTerms: ['spray-robot', 'conveyor', 'automatic-spray'],
    application: 'Flat parts, door panels, appliance panels',
    typicalValues: 'Stroke length: 0.5-3m, Speed: 0.1-2 m/s'
  },
  {
    id: 'surface-preparation',
    term: 'Surface Preparation',
    chinese: '表面预处理',
    german: 'Oberflaechenvorbereitung',
    french: 'Preparation de surface',
    japanese: '表面処理',
    russian: 'Подготовка поверхности',
    definition: 'The process of cleaning, degreasing, and treating substrate surfaces before coating application, essential for paint adhesion and corrosion protection.',
    definitionZh: '涂装前清洁、脱脂和处理基材表面的过程，对涂料附着和防腐保护至关重要。',
    category: 'process',
    relatedTerms: ['pretreatment', 'phosphating', 'adhesion'],
    application: 'All coating applications',
    typicalValues: 'Surface cleanliness: Sa 2.5 per ISO 8501-1'
  },
  {
    id: 'transfer-efficiency',
    term: 'Transfer Efficiency',
    chinese: '转移效率',
    german: 'Uebertragungseffizienz',
    french: 'Efficacite de transfert',
    japanese: '塗着効率',
    russian: 'Эффективность переноса',
    definition: 'The percentage of sprayed paint that actually deposits on the target workpiece, a key indicator of application efficiency and material utilization.',
    definitionZh: '实际沉积在目标工件上的喷涂涂料的百分比，是应用效率和材料利用率的关键指标。',
    category: 'process',
    relatedTerms: ['overspray', 'electrostatic-spray', 'hvlp-spray-gun'],
    application: 'All spray painting operations',
    typicalValues: 'Conventional: 30-50%, HVLP: 65-75%, Electrostatic: 85-95%'
  },
  {
    id: 'ball-track-conveyor',
    term: 'Ball Track Conveyor',
    chinese: '走珠输送系统',
    german: 'Kugelbahnbahnfoerderer',
    french: 'Convoyeur a billes',
    japanese: 'ボールトラックコンベア',
    russian: 'Шариковый конвейер',
    definition: 'Specialized conveyor system using recirculating steel balls in tracks to support and move parts through paint booths, enabling flexible routing and accumulation.',
    definitionZh: '专用输送系统，使用轨道中循环的钢球支撑和移动零件通过喷漆室，实现灵活的路径分配和积放。',
    category: 'equipment',
    relatedTerms: ['conveyor', 'accumulation', 'flexible-routing'],
    application: 'Automotive painting, multi-model production lines',
    typicalValues: 'Load capacity: 50-500 kg per carrier'
  },
  // ==================== 新增术语 (Additional Terms) ====================
  {
    id: 'flow-rate',
    term: 'Flow Rate',
    chinese: '流量',
    german: 'Foerdermenge',
    french: 'Debit',
    japanese: '流量',
    russian: 'Расход',
    definition: 'The volume of coating material delivered per unit time through the spray system, typically measured in cc/min or ml/min, controlling film build.',
    definitionZh: '单位时间内通过喷涂系统输送的涂料体积，通常以cc/min或ml/min为单位测量，控制漆膜厚度。',
    category: 'process',
    relatedTerms: ['film-build', 'viscosity', 'pump-pressure'],
    application: 'All spray application systems',
    typicalValues: 'Automotive: 200-500 cc/min, Industrial: 100-300 cc/min'
  },
  {
    id: 'spray-pattern',
    term: 'Spray Pattern',
    chinese: '喷涂图案',
    german: 'Spraybild',
    french: 'Motif de pulvérisation',
    japanese: 'スプレーパターン',
    russian: 'Факел распыления',
    definition: 'The shape and distribution of atomized paint droplets as they exit the spray gun, affected by nozzle design, air pressure, and fluid flow.',
    definitionZh: '雾化涂料液滴从喷枪射出时的形状和分布，受喷嘴设计、空气压力和流体流量影响。',
    category: 'process',
    relatedTerms: ['atomization', 'pattern-width', 'fan-angle'],
    application: 'Gun setup and optimization'
  },
  {
    id: 'fan-angle',
    term: 'Fan Angle',
    chinese: '扇形角度',
    german: 'Facherwinkel',
    french: 'Angle de ventilateur',
    japanese: 'ファン角度',
    russian: 'Угол факела',
    definition: 'The angle of the spray pattern as it exits the gun, typically adjustable from narrow (15-25°) to wide (60-80°) for different part geometries.',
    definitionZh: '喷涂图案从喷枪射出时的角度，通常可从窄角度（15-25°）调节到宽角度（60-80°）以适应不同的零件几何形状。',
    category: 'process',
    relatedTerms: ['spray-pattern', 'pattern-width', 'air-cap'],
    application: 'Gun adjustment for different part sizes',
    typicalValues: 'Narrow: 15-30°, Medium: 30-50°, Wide: 50-80°'
  },
  {
    id: 'grounding',
    term: 'Grounding',
    chinese: '接地',
    german: 'Erdung',
    french: 'Mise a la terre',
    japanese: '接地',
    russian: 'Заземление',
    definition: 'Electrical connection of workpiece and equipment to earth ground in electrostatic spray systems, essential for proper paint attraction and safety.',
    definitionZh: '静电喷涂系统中工件和设备与大地的电气连接，对涂料吸引和安全至关重要。',
    category: 'safety',
    relatedTerms: ['electrostatic-spray', 'static-electricity', 'conductivity'],
    application: 'Electrostatic spray systems, safety compliance'
  },
  {
    id: 'corona-charging',
    term: 'Corona Charging',
    chinese: '电晕充电',
    german: 'Koronaufladung',
    french: 'Charge corona',
    japanese: 'コロナ帯電',
    russian: 'Коронный заряд',
    definition: 'Method of charging paint particles using high-voltage electrode at the gun tip, creating an electric field that charges particles as they pass through.',
    definitionZh: '在喷枪尖端使用高压电极为涂料颗粒充电的方法，产生电场使颗粒在通过时带电。',
    category: 'equipment',
    relatedTerms: ['electrostatic-spray', 'tribo-charging', 'voltage'],
    application: 'Electrostatic spray guns, powder coating'
  },
  {
    id: 'tribo-charging',
    term: 'Tribo Charging',
    chinese: '摩擦充电',
    german: 'Triboaufladung',
    french: 'Charge tribo',
    japanese: '摩擦帯電',
    russian: 'Трибо-заряд',
    definition: 'Friction-based charging method where paint particles gain charge through contact with specialized surfaces inside the gun, eliminating need for high voltage.',
    definitionZh: '基于摩擦的充电方法，涂料颗粒通过与枪内特殊表面接触获得电荷，无需高电压。',
    category: 'equipment',
    relatedTerms: ['electrostatic-spray', 'corona-charging', 'powder-coating'],
    application: 'Powder coating applications, conductive coatings'
  },
  {
    id: 'faraday-cage-effect',
    term: 'Faraday Cage Effect',
    chinese: '法拉第笼效应',
    german: 'Faradayischer Kaefigeffekt',
    french: 'Effet de cage de Faraday',
    japanese: 'ファラデーケージ効果',
    russian: 'Эффект клетки Фарадея',
    definition: 'Shielding phenomenon in electrostatic spray where charged particles are repelled from recessed or interior surfaces, causing poor coverage in corners and cavities.',
    definitionZh: '静电喷涂中的屏蔽现象，带电颗粒被凹陷或内表面排斥，导致角落和空腔覆盖率差。',
    category: 'process',
    relatedTerms: ['electrostatic-spray', 'wrap-around', 'coverage'],
    application: 'Complex part geometries, recessed areas'
  },
  {
    id: 'cure-temperature',
    term: 'Cure Temperature',
    chinese: '固化温度',
    german: 'Einbrenntemperatur',
    french: 'Temperature de cuisson',
    japanese: '焼付温度',
    russian: 'Температура отверждения',
    definition: 'The temperature required to initiate crosslinking or chemical reaction in thermosetting coatings, critical for achieving specified film properties.',
    definitionZh: '热固性涂料引发交联或化学反应所需的温度，对实现规定的漆膜性能至关重要。',
    category: 'process',
    relatedTerms: ['curing', 'bake-oven', 'cure-cycle'],
    application: 'All thermosetting coatings',
    typicalValues: 'Powder: 160-200°C, Liquid: 120-160°C'
  },
  {
    id: 'pot-life',
    term: 'Pot Life',
    chinese: '适用期',
    german: 'Topfzeit',
    french: 'Duree de vie en pot',
    japanese: 'ポットライフ',
    russian: 'Жизнеспособность',
    definition: 'The usable working time of a coating after mixing components (for 2K systems) or opening container, before viscosity increases beyond application limits.',
    definitionZh: '混合组分（双组份系统）或打开容器后，粘度增加到超出应用限制之前的可用工作时间。',
    category: 'materials',
    relatedTerms: ['two-component', 'viscosity', 'mixing'],
    application: '2K coatings, activated materials',
    typicalValues: '2K urethane: 2-8 hours, Epoxy: 30-60 minutes'
  },
  {
    id: 'mixing-ratio',
    term: 'Mixing Ratio',
    chinese: '混合比',
    german: 'Mischungsverhaeltnis',
    french: 'Rapport de melange',
    japanese: '混合比',
    russian: 'Соотношение смешения',
    definition: 'The proportion of resin to hardener or activator in two-component coating systems, critical for proper cure and film properties.',
    definitionZh: '双组份涂料系统中树脂与固化剂或活化剂的比例，对正确固化和漆膜性能至关重要。',
    category: 'materials',
    relatedTerms: ['two-component', 'pot-life', 'mixing'],
    application: '2K coatings, catalyzed materials',
    typicalValues: 'Common ratios: 2:1, 3:1, 4:1, 10:1'
  },
  {
    id: 'solids-content',
    term: 'Solids Content',
    chinese: '固体含量',
    german: 'Festkoerpergehalt',
    french: 'Teneur en matieres solides',
    japanese: '固形分',
    russian: 'Содержание сухого остатка',
    definition: 'Percentage of non-volatile material in coating formulation that remains on the surface after solvent evaporation, determining build per coat.',
    definitionZh: '涂料配方中溶剂蒸发后残留在表面上的非挥发性材料百分比，决定每道涂层的厚度。',
    category: 'materials',
    relatedTerms: ['voc', 'film-build', 'coverage'],
    application: 'Coating selection, cost calculation',
    typicalValues: 'Solvent-borne: 30-60%, Water-borne: 35-55%, High-solids: 60-80%'
  },
  {
    id: 'coverage',
    term: 'Coverage',
    chinese: '覆盖率',
    german: 'Deckkraft',
    french: 'Pouvoir couvrant',
    japanese: '隠蔽力',
    russian: 'Укрывистость',
    definition: 'The area that can be covered by a given volume of coating at specified film thickness, expressed in square meters per liter or square feet per gallon.',
    definitionZh: '一定体积的涂料在规定漆膜厚度下可以覆盖的面积，以每升平方米或每加仑平方英尺表示。',
    category: 'materials',
    relatedTerms: ['film-build', 'solids-content', 'hiding-power'],
    application: 'Material estimation, cost analysis',
    typicalValues: 'Typical: 8-12 m²/L at 50 microns DFT'
  },
  {
    id: 'hiding-power',
    term: 'Hiding Power',
    chinese: '遮盖力',
    german: 'Deckfaehigkeit',
    french: 'Pouvoir masquant',
    japanese: '隠蔽力',
    russian: 'Кроющая способность',
    definition: 'The ability of a coating to obscure the substrate color or previous coat, determined by pigment type, concentration, and film thickness.',
    definitionZh: '涂层遮盖基材颜色或前一道涂层的能力，由颜料类型、浓度和漆膜厚度决定。',
    category: 'materials',
    relatedTerms: ['coverage', 'pigment', 'film-build'],
    application: 'Color coats, primers'
  },
  {
    id: 'adhesion',
    term: 'Adhesion',
    chinese: '附着力',
    german: 'Haftung',
    french: 'Adherence',
    japanese: '付着性',
    russian: 'Адгезия',
    definition: 'The bond strength between coating and substrate, affected by surface preparation, substrate type, and coating chemistry.',
    definitionZh: '涂层与基材之间的结合强度，受表面处理、基材类型和涂料化学性质影响。',
    category: 'quality',
    relatedTerms: ['pretreatment', 'surface-preparation', 'adhesion-test'],
    application: 'All coating applications'
  },
  {
    id: 'flexibility',
    term: 'Flexibility',
    chinese: '柔韧性',
    german: 'Flexibilitaet',
    french: 'Flexibilite',
    japanese: '可撓性',
    russian: 'Гибкость',
    definition: 'The ability of a coating to bend or flex without cracking or delaminating, important for coated parts that may deform in service.',
    definitionZh: '涂层在弯曲或挠曲时不开裂或不脱落的能力，对使用中可能变形的涂层部件很重要。',
    category: 'quality',
    relatedTerms: ['impact-resistance', 'elongation', 'mandrel-bend'],
    application: 'Automotive, formed parts, plastics'
  },
  {
    id: 'impact-resistance',
    term: 'Impact Resistance',
    chinese: '耐冲击性',
    german: 'Schlagfestigkeit',
    french: 'Resistance aux chocs',
    japanese: '耐衝撃性',
    russian: 'Ударопрочность',
    definition: 'The ability of a coating to resist damage from impact without cracking, chipping, or delaminating, tested by dropping weight or pendulum.',
    definitionZh: '涂层在冲击下抵抗损坏而不开裂、剥落或脱落的能力，通过落重或摆锤测试。',
    category: 'quality',
    relatedTerms: ['flexibility', 'hardness', 'chip-resistance'],
    application: 'Automotive, industrial equipment'
  },
  {
    id: 'salt-spray-test',
    term: 'Salt Spray Test',
    chinese: '盐雾测试',
    german: 'Salzspruehtest',
    french: 'Essai au brouillard salin',
    japanese: '塩水噴霧試験',
    russian: 'Испытание соляным туманом',
    definition: 'Accelerated corrosion test per ASTM B117 or ISO 9227, exposing coated panels to salt fog to evaluate corrosion protection performance.',
    definitionZh: '根据ASTM B117或ISO 9227的加速腐蚀测试，将涂层板暴露在盐雾中以评估防腐性能。',
    category: 'quality',
    relatedTerms: ['corrosion-protection', 'accelerated-testing', 'rust'],
    application: 'Quality control, specification testing',
    typicalValues: 'Automotive primer: 500-1000 hours, Heavy-duty: 2000+ hours'
  },
  {
    id: 'humidity-resistance',
    term: 'Humidity Resistance',
    chinese: '耐湿性',
    german: 'Feuchtigkeitsbestaendigkeit',
    french: 'Resistance a lhumidite',
    japanese: '耐湿性',
    russian: 'Влагостойкость',
    definition: 'The ability of a coating to withstand exposure to high humidity without blistering, loss of adhesion, or other degradation.',
    definitionZh: '涂层在高湿度暴露下抵抗起泡、附着力丧失或其他降解的能力。',
    category: 'quality',
    relatedTerms: ['corrosion-protection', 'blistering', 'water-resistance'],
    application: 'Marine, outdoor, humid environments'
  },
  {
    id: 'uv-resistance',
    term: 'UV Resistance',
    chinese: '耐候性',
    german: 'UV-Bestaendigkeit',
    french: 'Resistance aux UV',
    japanese: '耐候性',
    russian: 'УФ-стойкость',
    definition: 'The ability of a coating to resist degradation from ultraviolet radiation exposure, including color change, gloss loss, and chalking.',
    definitionZh: '涂层抵抗紫外线辐射降解的能力，包括变色、失光和粉化。',
    category: 'quality',
    relatedTerms: ['weathering', 'gloss-retention', 'color-stability'],
    application: 'Outdoor applications, automotive'
  },
  {
    id: 'solvent-resistance',
    term: 'Solvent Resistance',
    chinese: '耐溶剂性',
    german: 'Loesemittelbestaendigkeit',
    french: 'Resistance aux solvants',
    japanese: '耐溶剤性',
    russian: 'Стойкость к растворителям',
    definition: 'The ability of a cured coating to resist softening, swelling, or dissolution when contacted with solvents, indicating crosslink density.',
    definitionZh: '固化涂层在与溶剂接触时抵抗软化、溶胀或溶解的能力，表明交联密度。',
    category: 'quality',
    relatedTerms: ['chemical-resistance', 'cure', 'meck-test'],
    application: 'Industrial, chemical exposure'
  },
  {
    id: 'cleanroom',
    term: 'Cleanroom',
    chinese: '洁净室',
    german: 'Reinraum',
    french: 'Salle blanche',
    japanese: 'クリーンルーム',
    russian: 'Чистая комната',
    definition: 'Controlled environment with filtered air, temperature, and humidity control for high-quality paint application, minimizing dust and contamination.',
    definitionZh: '具有过滤空气、温度和湿度控制的受控环境，用于高质量涂装应用，最小化灰尘和污染。',
    category: 'equipment',
    relatedTerms: ['class-a-finish', 'air-filtration', 'contamination'],
    application: 'Automotive OEM, electronics, aerospace'
  }
];

/**
 * 按分类获取术语
 */
export function getTermsByCategory(category: TermCategory): GlossaryTerm[] {
  return glossaryTerms.filter(term => term.category === category);
}

/**
 * 按关键词搜索术语
 */
export function searchTerms(query: string): GlossaryTerm[] {
  const lowerQuery = query.toLowerCase();
  return glossaryTerms.filter(term =>
    term.term.toLowerCase().includes(lowerQuery) ||
    term.chinese.includes(query) ||
    term.definition.toLowerCase().includes(lowerQuery) ||
    term.definitionZh.includes(query)
  );
}

/**
 * 获取相关术语
 */
export function getRelatedTerms(termId: string): GlossaryTerm[] {
  const term = glossaryTerms.find(t => t.id === termId);
  if (!term) return [];
  return glossaryTerms.filter(t => term.relatedTerms.includes(t.id));
}

/**
 * 获取所有分类
 */
export const categories: { key: TermCategory; label: string; labelZh: string }[] = [
  { key: 'equipment', label: 'Equipment', labelZh: '设备' },
  { key: 'process', label: 'Process', labelZh: '工艺' },
  { key: 'materials', label: 'Materials', labelZh: '材料' },
  { key: 'quality', label: 'Quality Control', labelZh: '质量检测' },
  { key: 'automation', label: 'Automation', labelZh: '自动化控制' },
  { key: 'safety', label: 'Safety & Environment', labelZh: '安全环保' },
  { key: 'robotics', label: 'Robotics', labelZh: '机器人技术' },
];

export default glossaryTerms;
