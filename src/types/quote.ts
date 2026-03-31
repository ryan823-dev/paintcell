// Quote Wizard Types - Updated Specification

export interface QuoteFormData {
  // Step 1 - Application Context
  project_scale: string;
  application_material: string;
  project_primary_goal: string[];
  project_stage: string;

  // Step 2 - Part Characteristics
  part_size: string;
  part_weight: string;
  part_geometry: string;
  part_presentation: string;
  surface_quality: string;

  // Step 3 - Production & Throughput
  production_volume: string;
  operating_schedule: string;
  changeover_frequency: string;
  production_priority: string;
  production_flow: string;

  // Step 4 - Automation Boundary
  automation_level: string;
  part_loading_method: string;
  operator_involvement: string;
  process_control_level: string;
  future_expansion: string;

  // Step 5 - Compliance & Site Conditions
  compliance_requirements: string[];
  installation_environment: string;
  available_floor_space: string;
  utilities_availability: string[];
  paint_type: string[];

  // Step 6 - Project Readiness
  project_timeline: string;
  decision_structure: string;
  current_need: string;

  // Step 8 - Contact Information
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  contact_company: string;
  contact_role: string;
  contact_message: string;
}

export const initialFormData: QuoteFormData = {
  project_scale: "",
  application_material: "",
  project_primary_goal: [],
  project_stage: "",
  part_size: "",
  part_weight: "",
  part_geometry: "",
  part_presentation: "",
  surface_quality: "",
  production_volume: "",
  operating_schedule: "",
  changeover_frequency: "",
  production_priority: "",
  production_flow: "",
  automation_level: "",
  part_loading_method: "",
  operator_involvement: "",
  process_control_level: "",
  future_expansion: "",
  compliance_requirements: [],
  installation_environment: "",
  available_floor_space: "",
  utilities_availability: [],
  paint_type: [],
  project_timeline: "",
  decision_structure: "",
  current_need: "",
  contact_name: "",
  contact_email: "",
  contact_phone: "",
  contact_company: "",
  contact_role: "",
  contact_message: "",
};

export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  id: keyof QuoteFormData;
  label: string;
  type: "radio" | "checkbox";
  options: QuestionOption[];
  required?: boolean;
  minSelections?: number;
}

export interface WizardStep {
  title: string;
  description: string;
  helperText?: string;
  questions: Question[];
}

// Human-readable labels for summary display
export const optionLabels: Record<string, string> = {
  // Project Scale
  paint_cell: "Paint Cell (Single Workstation)",
  paint_booth: "Paint Booth (Multiple Stations)",
  paint_shop: "Paint Shop (Full Facility)",

  // Application Material
  metal_parts: "Metal Parts",
  plastic_components: "Plastic Components",
  mixed_materials: "Mixed Materials",
  wood_composite: "Wood / Composite",
  not_sure: "Not Sure",

  // Project Primary Goal
  quality_consistency: "Quality Consistency",
  increase_throughput: "Increase Throughput",
  reduce_labor: "Reduce Labor",
  safety_compliance: "Safety & Compliance",
  replace_manual: "Replace Manual Process",

  // Project Stage
  early_concept: "Early Concept",
  upgrade_existing: "Upgrade Existing",
  capacity_expansion: "Capacity Expansion",
  new_line: "New Production Line",

  // Part Size
  small_lt_300mm: "Small (< 300mm)",
  medium_300_800mm: "Medium (300-800mm)",
  large_gt_800mm: "Large (> 800mm)",
  varies: "Varies",

  // Part Weight
  lt_2kg: "< 2 kg",
  "2_10kg": "2-10 kg",
  "10_30kg": "10-30 kg",
  gt_30kg: "> 30 kg",

  // Part Geometry
  simple: "Simple",
  moderate: "Moderate",
  complex: "Complex",
  highly_irregular: "Highly Irregular",

  // Part Presentation
  single_part: "Single Part",
  batch_rack: "Batch Rack",
  conveyor_hanger: "Conveyor Hanger",
  not_standardized: "Not Standardized",

  // Surface Quality
  functional_only: "Functional Only",
  standard_industrial: "Standard Industrial",
  high_cosmetic: "High Cosmetic",
  precision_critical: "Precision Critical",

  // Production Volume
  small_batch_high_mix: "Small Batch / High Mix",
  medium_volume: "Medium Volume",
  high_volume_takt: "High Volume / Takt",

  // Operating Schedule
  one_shift: "One Shift",
  two_shifts: "Two Shifts",
  three_shifts_24_7: "Three Shifts / 24/7",
  variable: "Variable",

  // Changeover Frequency
  multiple_daily: "Multiple Daily",
  daily: "Daily",
  weekly: "Weekly",
  rarely: "Rarely",

  // Production Priority
  flexibility: "Flexibility",
  throughput: "Throughput",
  quality_consistency_priority: "Quality Consistency",
  balanced: "Balanced",

  // Production Flow
  standalone_cell: "Standalone Cell",
  integrated_existing: "Integrated with Existing",
  new_line_flow: "New Line",
  not_defined: "Not Defined",

  // Automation Level
  semi_automatic: "Semi-Automatic",
  fully_automatic: "Fully Automatic",
  phased_automation: "Phased Automation",

  // Part Loading Method
  manual: "Manual",
  conveyor: "Conveyor",
  robot: "Robot",
  to_be_evaluated: "To Be Evaluated",

  // Operator Involvement
  continuous: "Continuous",
  periodic: "Periodic",
  minimal: "Minimal",
  unattended: "Unattended",

  // Process Control Level
  basic_repeatability: "Basic Repeatability",
  parameter_based: "Parameter-Based",
  recipe_based: "Recipe-Based",
  high_precision: "High Precision",

  // Future Expansion
  no_expansion: "No Expansion Planned",
  capacity_increase: "Capacity Increase",
  more_part_types: "More Part Types",
  modular_required: "Modular Design Required",

  // Compliance Requirements
  ce: "CE Marking (EU)",
  ul_nfpa: "UL / NFPA (North America)",
  atex: "ATEX (EU Explosive Atmospheres)",
  iecex: "IECEx (International)",
  tiis: "TIIS (Japan)",
  ccc_ex: "CCC Ex (China)",
  local_only: "Local Requirements Only",

  // Installation Environment
  existing_booth: "Existing Paint Booth",
  standalone_cell_env: "Standalone Cell",
  integrated_line: "Integrated Line",
  brownfield_retrofit: "Brownfield Retrofit",

  // Floor Space
  compact: "Compact",
  standard: "Standard",
  flexible: "Flexible",

  // Utilities
  power: "Power",
  compressed_air: "Compressed Air",
  exhaust_ventilation: "Exhaust / Ventilation",
  to_be_provided: "To Be Provided",

  // Paint Type
  solvent_based: "Solvent-Based Paint",
  water_based: "Water-Based Paint",
  powder_coating: "Powder Coating",
  uv_curable: "UV Curable Coating",
  high_solids: "High-Solids Paint",
  multiple_types: "Multiple Types",

  // Project Timeline
  lt_6_months: "< 6 Months",
  "6_12_months": "6-12 Months",
  gt_12_months: "> 12 Months",

  // Decision Structure
  single_decision_maker: "Single Decision Maker",
  small_technical_team: "Small Technical Team",
  cross_functional_team: "Cross-Functional Team",

  // Current Need
  concept_layout: "Concept & Layout",
  feasibility_review: "Feasibility Review",
  budgetary_estimate: "Budgetary Estimate",
  compliance_risk_review: "Compliance / Risk Review",
  general_discussion: "General Discussion",
};

export const getOptionLabel = (value: string): string => {
  return optionLabels[value] || value.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};
