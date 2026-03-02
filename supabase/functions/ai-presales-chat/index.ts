import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MINUTES = 60; // 1 hour window
const MAX_REQUESTS_PER_WINDOW = 30; // Max 30 requests per hour per IP

// Input validation schemas
const MAX_MESSAGE_LENGTH = 2000;
const MAX_MESSAGES = 50;

const MessageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string()
    .min(1, "Message cannot be empty")
    .max(MAX_MESSAGE_LENGTH, `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters`)
    .transform(str => str.trim())
});

const RequestSchema = z.object({
  messages: z.array(MessageSchema)
    .min(1, "At least one message is required")
    .max(MAX_MESSAGES, `Cannot exceed ${MAX_MESSAGES} messages`),
  action: z.enum(["extract_requirements", "generate_summary"]).optional(),
  pageContext: z.object({
    currentPath: z.string().max(200),
    industryContext: z.object({
      industry: z.string().max(100),
      finish: z.string().max(100),
      throughput: z.string().max(50),
    }).optional(),
  }).optional(),
});

// Sanitize user input to prevent prompt injection
function sanitizeMessage(content: string): string {
  return content
    .replace(/\[INST\]/gi, "")
    .replace(/\[\/INST\]/gi, "")
    .replace(/<<SYS>>/gi, "")
    .replace(/<\/SYS>>/gi, "")
    .replace(/\bsystem\s*:/gi, "")
    .replace(/\bignore\s+(previous|above|all)\s+(instructions?|prompts?)/gi, "")
    .trim();
}

// Get client IP from request headers
function getClientIP(req: Request): string {
  // Check various headers for the real client IP
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, the first is the client
    return forwardedFor.split(",")[0].trim();
  }
  
  const realIP = req.headers.get("x-real-ip");
  if (realIP) {
    return realIP.trim();
  }
  
  // Fallback - use a hash of user-agent + other headers as fingerprint
  const userAgent = req.headers.get("user-agent") || "unknown";
  const acceptLanguage = req.headers.get("accept-language") || "unknown";
  return `fingerprint-${hashString(userAgent + acceptLanguage)}`;
}

// Simple hash function for fingerprinting
function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

// Rate limit tracking record type
interface RateLimitRecord {
  id: string;
  identifier: string;
  endpoint: string;
  request_count: number;
  window_start: string;
  created_at: string;
  updated_at: string;
}

// Check and update rate limit using database
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function checkRateLimit(supabase: any, identifier: string, endpoint: string): Promise<{ allowed: boolean; remaining: number; resetAt: Date }> {
  const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60 * 1000);
  
  // Get or create rate limit record
  const { data: existing, error: selectError } = await supabase
    .from("rate_limit_tracking")
    .select("*")
    .eq("identifier", identifier)
    .eq("endpoint", endpoint)
    .single() as { data: RateLimitRecord | null; error: { code?: string; message?: string } | null };
  
  if (selectError && selectError.code !== "PGRST116") {
    // PGRST116 = not found, which is fine
    console.error("Rate limit check error:", selectError);
    // On error, allow the request but log it
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW, resetAt: new Date(Date.now() + RATE_LIMIT_WINDOW_MINUTES * 60 * 1000) };
  }
  
  const now = new Date();
  
  if (!existing) {
    // First request from this identifier - create record
    const { error: insertError } = await supabase
      .from("rate_limit_tracking")
      .insert({
        identifier,
        endpoint,
        request_count: 1,
        window_start: now.toISOString()
      });
    
    if (insertError) {
      console.error("Rate limit insert error:", insertError);
    }
    
    return { 
      allowed: true, 
      remaining: MAX_REQUESTS_PER_WINDOW - 1, 
      resetAt: new Date(now.getTime() + RATE_LIMIT_WINDOW_MINUTES * 60 * 1000) 
    };
  }
  
  const recordWindowStart = new Date(existing.window_start);
  
  // Check if window has expired
  if (recordWindowStart < windowStart) {
    // Window expired - reset counter
    const { error: updateError } = await supabase
      .from("rate_limit_tracking")
      .update({
        request_count: 1,
        window_start: now.toISOString()
      })
      .eq("id", existing.id);
    
    if (updateError) {
      console.error("Rate limit reset error:", updateError);
    }
    
    return { 
      allowed: true, 
      remaining: MAX_REQUESTS_PER_WINDOW - 1, 
      resetAt: new Date(now.getTime() + RATE_LIMIT_WINDOW_MINUTES * 60 * 1000) 
    };
  }
  
  // Window still active - check count
  const currentCount = existing.request_count;
  
  if (currentCount >= MAX_REQUESTS_PER_WINDOW) {
    // Rate limit exceeded
    const resetAt = new Date(recordWindowStart.getTime() + RATE_LIMIT_WINDOW_MINUTES * 60 * 1000);
    return { 
      allowed: false, 
      remaining: 0, 
      resetAt 
    };
  }
  
  // Increment counter
  const { error: updateError } = await supabase
    .from("rate_limit_tracking")
    .update({
      request_count: currentCount + 1
    })
    .eq("id", existing.id);
  
  if (updateError) {
    console.error("Rate limit increment error:", updateError);
  }
  
  const resetAt = new Date(recordWindowStart.getTime() + RATE_LIMIT_WINDOW_MINUTES * 60 * 1000);
  return { 
    allowed: true, 
    remaining: MAX_REQUESTS_PER_WINDOW - currentCount - 1, 
    resetAt 
  };
}

// System prompt for the AI Pre-Sales Engineer
const SYSTEM_PROMPT = `You are a Pre-Sales Automation Engineer for PaintCell, a company specializing in robotic spray painting workstation cells for industrial applications.

LANGUAGE BEHAVIOR:
- Default language: English.
- Detect the primary language of the user's input.
- If the input is clearly in one language (e.g., Chinese, Japanese, Spanish), respond in that same language.
- If the input contains mixed languages, unclear language, or machine-translated fragments, respond in English.
- Maintain the same professional tone regardless of language.

YOUR ROLE:
- You are a calm, professional, engineering-oriented assistant
- Help customers understand their painting automation requirements
- Guide conversations toward gathering structured technical information
- Answer general questions about painting automation briefly and helpfully

STRICT CONSTRAINTS:
1. NEVER provide pricing, cost estimates, or budgets
2. NEVER make promises about timelines, delivery, or capabilities
3. NEVER make final engineering decisions or guarantees
4. NEVER discuss specific competitor products by name
5. Always clarify that human engineers will confirm final scope

CONVERSATION STYLE:
- Ask AT MOST ONE clarifying question per response
- Prefer confirmation + one follow-up question
- Never dump multiple questions in one message
- Be concise - typical responses should be 2-4 sentences
- Use technical but accessible language
- Professional, calm, operations-oriented tone
- Do NOT use marketing tone, enthusiastic tone, or casual conversation style

INFORMATION GATHERING GOALS:
Track information across these 6 dimensions:
1. APPLICATION: Material type (metal/plastic/wood/composite), project goals, project stage
2. PART: Size, weight, geometry complexity, presentation method, surface quality requirements
3. PRODUCTION: Volume profile, operating schedule, changeover frequency, priority, production flow
4. AUTOMATION: Automation level, loading method, operator involvement, process control, future expansion
5. COMPLIANCE: Regulatory requirements (CE/UL/ATEX), installation environment, floor space, utilities, paint type
6. TIMELINE: Project timeline, decision structure, current need

WHEN USER ASKS GENERAL QUESTIONS:
- What is a paint cell? Briefly explain it's an integrated robotic spray painting workstation combining robot, spray equipment, booth, and controls.
- Certifications? Mention we work with CE, UL/NFPA, and ATEX requirements based on application.
- Applications? Automotive, aerospace, industrial equipment, consumer goods, wood finishing, etc.
- After answering, gently guide back toward understanding their specific needs.

GUIDING TOWARD SUMMARY:
After 6-8 exchanges OR when you have information in at least 4 of the 6 dimensions:
- Suggest generating a structured requirement summary
- Mention they can also use the detailed 26-step configurator wizard
- Remind them that a human engineer will review all requirements

RESPONSE FORMAT:
Always respond in plain text. Be helpful, professional, and engineering-focused.
If asked about pricing: "Pricing depends on many factors specific to your application. I can help you document your requirements so our engineering team can prepare an accurate proposal."
If asked to promise/guarantee: "I can help you explore options, but our engineering team will need to review the details before making any commitments."`;

// ─── Knowledge Base ─────────────────────────────────────────────────────────
// Structured data extracted from industryData.ts and solutionData.ts for
// injection into the system prompt.  Gemini Flash has a 1 M-token context
// window, so 15-20 K tokens of knowledge is well within budget.

interface IndustryKB {
  label: string;
  slug: string;
  finish: string;
  throughput: string;
  painPoints: string[];
  systemModules: string[];
  productionConfig: Record<string, string>;
  roiMetrics: { label: string; value: string }[];
  caseRefs: { part: string; config: string; capacity: string; roi: string }[];
  faqs: { q: string; a: string }[];
}

interface SolutionKB {
  label: string;
  slug: string;
  definition: string;
  processSteps: string[];
  configHighlights: string[];
  constraints: string[];
  roiMetrics: { label: string; value: string }[];
  faqs: { q: string; a: string }[];
}

const INDUSTRIES: IndustryKB[] = [
  {
    label: "Automotive", slug: "automotive-painting",
    finish: "Class A / industrial", throughput: "medium-high",
    painPoints: ["Inconsistent finish quality across shifts", "Labor dependency & recruitment challenges", "Throughput bottlenecks in high-volume production", "30-50% overspray waste", "VOC emission compliance"],
    systemModules: ["6-axis hollow-wrist robots", "Electrostatic rotary bell / HVLP", "Downdraft/crossdraft booths", "Centralized paint kitchen with color change", "PLC + HMI + MES integration"],
    productionConfig: { partsPerHour: "200-400", paintType: "Solvent, water-based, 2K", finish: "Class A / OEM grade", automation: "Full robotic + auto color change", integration: "Conveyor-integrated" },
    roiMetrics: [{ label: "Labor reduction", value: "50-70%" }, { label: "Throughput increase", value: "30-60%" }, { label: "Paint savings", value: "20-35%" }, { label: "ROI", value: "12-18 months" }],
    caseRefs: [{ part: "Aluminum brackets", config: "2x robot, rotary bell", capacity: "320/hr", roi: "14mo" }, { part: "Plastic trim panels", config: "3x robot, HVLP", capacity: "180/hr", roi: "16mo" }, { part: "Steel housings", config: "1x robot, 2K", capacity: "240/hr", roi: "12mo" }],
    faqs: [{ q: "How to automate painting in automotive?", a: "Start with feasibility assessment covering part geometry, production volume, and finish specs." }, { q: "Can robotic painting achieve Class A finish?", a: "Yes, with proper atomizer selection, process parameters, and booth environment control." }, { q: "Deployment time?", a: "16-24 weeks depending on complexity." }],
  },
  {
    label: "Metal Parts", slug: "metal-parts-finishing",
    finish: "industrial / protective", throughput: "medium",
    painPoints: ["Uneven film build causing corrosion failures", "High labor costs", "CNC output bottleneck", "Complex geometry overspray", "Surface prep sensitivity"],
    systemModules: ["6-axis extended reach robots", "Airless / air-assisted airless / HVLP", "Dry filter or water wash booths", "Pressure pot / diaphragm pump systems", "Recipe-based multi-part control"],
    productionConfig: { partsPerHour: "80-250", paintType: "Primers, topcoats, 2K polyurethane", finish: "Industrial / protective / decorative", automation: "Robotic + fixture-based", integration: "Batch or inline" },
    roiMetrics: [{ label: "Labor reduction", value: "40-60%" }, { label: "Throughput increase", value: "25-50%" }, { label: "Material savings", value: "15-30%" }, { label: "ROI", value: "14-22 months" }],
    caseRefs: [{ part: "Steel enclosures", config: "2x robot, airless", capacity: "120/hr", roi: "18mo" }, { part: "Aluminum heat sinks", config: "1x robot, HVLP", capacity: "200/hr", roi: "15mo" }, { part: "Cast iron housings", config: "2x robot, 2K", capacity: "90/hr", roi: "20mo" }],
    faqs: [{ q: "Best spray tech for metal parts?", a: "Airless/air-assisted for protective coatings; HVLP for decorative finishes." }, { q: "Can robots paint complex metal geometries?", a: "Yes, 6-axis robots with offline programming reach complex surfaces, cavities, and edges." }],
  },
  {
    label: "Appliance", slug: "appliance-coating",
    finish: "decorative / consumer-grade", throughput: "high",
    painPoints: ["Color changeover delays", "Consumer-grade consistency demands", "High-volume throughput requirements", "Large panel overspray", "VOC regulatory compliance"],
    systemModules: ["High-speed 6-axis robots", "Electrostatic bell/disc atomizers", "High-volume downdraft booths", "Fast color change <60s, 10+ colors", "Production scheduling + recipe selection"],
    productionConfig: { partsPerHour: "300-600", paintType: "Water-based, UV curable, solvent", finish: "Consumer-grade decorative", automation: "Full robotic + auto color change", integration: "Conveyor-integrated" },
    roiMetrics: [{ label: "Labor reduction", value: "60-80%" }, { label: "Throughput increase", value: "40-70%" }, { label: "Color changeover", value: "<60 seconds" }, { label: "ROI", value: "10-16 months" }],
    caseRefs: [{ part: "Washing machine panels", config: "4x robot, electrostatic bell", capacity: "480/hr", roi: "12mo" }, { part: "Refrigerator doors", config: "3x robot, HVLP", capacity: "360/hr", roi: "14mo" }, { part: "AC unit housings", config: "2x robot, 2K", capacity: "200/hr", roi: "16mo" }],
    faqs: [{ q: "How fast can robots change colors?", a: "Under 60 seconds with minimal waste, supporting 10+ colors." }],
  },
  {
    label: "Construction Machinery", slug: "construction-machinery",
    finish: "heavy-duty protective", throughput: "medium",
    painPoints: ["Large parts 2-12m", "Thick film 100-200+ microns", "Complex weld seams", "Critical corrosion protection", "High paint consumption"],
    systemModules: ["Rail-mounted robots with 7th-axis (8-12m reach)", "Airless/air-assisted for thick builds", "Oversized booths for 12m+ parts", "Heavy-duty turntables & positioners", "Recipe management per part type"],
    productionConfig: { partsPerHour: "10-60", paintType: "High-build epoxy, polyurethane, 2K", finish: "Heavy-duty protective", automation: "Robotic + rail systems", integration: "Large-format booth" },
    roiMetrics: [{ label: "Paint savings", value: "25-40%" }, { label: "Throughput increase", value: "30-50%" }, { label: "DFT consistency", value: "±5 micron" }, { label: "ROI", value: "14-20 months" }],
    caseRefs: [{ part: "Excavator boom arms", config: "2x rail robots, airless", capacity: "18/hr", roi: "16mo" }, { part: "Loader bucket linkages", config: "1x robot, turntable", capacity: "30/hr", roi: "18mo" }],
    faqs: [{ q: "Can robots handle large construction parts?", a: "Yes, rail-mounted robots with 7th-axis tracks extend reach to 8-12m." }, { q: "How are thick film builds handled?", a: "Multi-pass application with flash-off and automated DFT monitoring." }],
  },
  {
    label: "Hardware & Sanitary", slug: "hardware-sanitary",
    finish: "decorative / chrome-alternative", throughput: "medium-high",
    painPoints: ["High decorative standards", "Complex small parts", "Chrome-plating phase-out (RoHS/REACH)", "High SKU count", "Chemical resistance needs"],
    systemModules: ["Fine-atomization spray guns", "Multi-part batch fixtures", "Climate-controlled booth", "Fast color change for high-SKU", "Barcode/RFID part identification"],
    productionConfig: { partsPerHour: "100-500", paintType: "Chrome-effect lacquers, metallic, clearcoats, epoxy", finish: "Decorative / chrome-alternative", automation: "Robotic + batch fixtures", integration: "Batch or conveyor" },
    roiMetrics: [{ label: "Finish consistency", value: "±0.5 gloss units" }, { label: "Rework reduction", value: "70-90%" }, { label: "Material savings", value: "20-35%" }, { label: "ROI", value: "12-18 months" }],
    caseRefs: [{ part: "Door handles", config: "2x robot, HVLP, batch", capacity: "300/hr", roi: "14mo" }, { part: "Bathroom faucets", config: "2x robot, chrome-effect", capacity: "180/hr", roi: "12mo" }],
    faqs: [{ q: "What replaces chrome plating?", a: "Chrome-effect lacquers and metallic basecoat/clearcoat systems meet RoHS/REACH without hexavalent chromium." }],
  },
  {
    label: "Furniture & Woodwork", slug: "furniture-woodwork",
    finish: "lacquer / stain / UV", throughput: "medium",
    painPoints: ["Runs/sags from hand spraying", "Skilled finisher shortage", "High material waste", "Finishing bottleneck", "Solvent exposure risks"],
    systemModules: ["6-axis robots for furniture geometries", "HVLP / air-assisted airless", "Climate-controlled booths", "Conveyor/rotary table handling", "Optional UV curing integration"],
    productionConfig: { partsPerHour: "60-200", paintType: "Lacquers, stains, UV coatings, water-based", finish: "Decorative / furniture-grade", automation: "Robotic + recipe management", integration: "Standalone or conveyor" },
    roiMetrics: [{ label: "Labor reduction", value: "50-70%" }, { label: "Material savings", value: "20-40%" }, { label: "Throughput increase", value: "30-60%" }, { label: "ROI", value: "14-20 months" }],
    caseRefs: [{ part: "Cabinet doors", config: "2x robot, HVLP", capacity: "120/hr", roi: "16mo" }, { part: "Table tops", config: "2x robot, UV cure", capacity: "60/hr", roi: "14mo" }],
    faqs: [{ q: "What coatings for furniture?", a: "Lacquers (NC, acrylic, PU), stains, UV-curable, water-based, and pigmented paints." }],
  },
  {
    label: "Aerospace & Defense", slug: "aerospace-defense",
    finish: "mil-spec / aerospace-grade", throughput: "low-medium",
    painPoints: ["Strict OEM/mil-spec compliance (MIL-PRF-85285, Boeing BMS)", "AS9100D/NADCAP traceability", "Hazardous chromate handling", "Complex masking", "High-mix low-volume"],
    systemModules: ["Climate-controlled enclosed cells", "6-axis robots + offline programming", "HVLP and electrostatic systems", "Full traceability / batch records", "Hazmat ventilation & filtration"],
    productionConfig: { partsPerHour: "5-40", paintType: "Chromate/non-chromate primers, PU topcoats, specialty", finish: "Mil-spec / aerospace-grade", automation: "Semi to full robotic", integration: "Batch with FAI support" },
    roiMetrics: [{ label: "Rework reduction", value: "60-80%" }, { label: "Traceability", value: "100%" }, { label: "Operator exposure reduction", value: "95%+" }, { label: "ROI", value: "18-28 months" }],
    caseRefs: [{ part: "Flight control surfaces", config: "2x robot, HVLP, enclosed", capacity: "12/hr", roi: "22mo" }, { part: "Interior panels", config: "2x robot, multi-color", capacity: "30/hr", roi: "18mo" }],
    faqs: [{ q: "What specs govern aerospace coatings?", a: "OEM specs (Boeing BMS, Airbus AIMS), mil-specs (MIL-PRF-85285, MIL-PRF-23377), and AS9100D/NADCAP." }],
  },
  {
    label: "Plastics & Composites", slug: "plastics-composites",
    finish: "decorative / functional", throughput: "medium-high",
    painPoints: ["Adhesion failures on low-energy substrates", "Static & dust attraction", "Molding variation", "Heat sensitivity", "Complex deep-draw geometries"],
    systemModules: ["Flame/plasma/primer surface prep", "6-axis robots + vision", "HVLP / electrostatic / air-assisted", "Temperature-controlled booths", "IR/convection/air-dry curing"],
    productionConfig: { partsPerHour: "80-300", paintType: "Primers, basecoats, clearcoats, soft-touch", finish: "Automotive-grade / decorative", automation: "Robotic + surface prep integration", integration: "Inline or batch" },
    roiMetrics: [{ label: "Adhesion failures reduced", value: "90%+" }, { label: "Transfer efficiency", value: "65-85%" }, { label: "Throughput increase", value: "35-60%" }, { label: "ROI", value: "12-18 months" }],
    caseRefs: [{ part: "Automotive bumpers", config: "3x robot, flame prep", capacity: "180/hr", roi: "14mo" }, { part: "Electronics housings", config: "2x robot, plasma", capacity: "240/hr", roi: "12mo" }],
    faqs: [{ q: "Why is painting plastics different?", a: "Low surface energy, static buildup, heat sensitivity, and outgassing require specialized surface preparation." }],
  },
  {
    label: "Battery & Energy Storage", slug: "battery-coating",
    finish: "functional / thermal barrier", throughput: "medium-high",
    painPoints: ["±5 micron coating tolerance", "ISO 7/8 cleanroom requirements", "Gigafactory volume scaling", "Specialized material handling", "OEM traceability/MES demands"],
    systemModules: ["Servo-controlled precision dispensing", "ISO 7/8 cleanroom enclosures", "IP65+ cleanroom-rated robots", "Inline 3D scanning + thermal imaging", "Automotive-grade MES/SPC connectivity"],
    productionConfig: { partsPerHour: "100-500", paintType: "Thermal barrier, ceramic, silicone, dielectric", finish: "Functional / thermal management", automation: "Full robotic + inline inspection", integration: "Cleanroom-integrated" },
    roiMetrics: [{ label: "DFT consistency", value: "±5 micron" }, { label: "Scrap reduction", value: "85-95%" }, { label: "Throughput increase", value: "200-400%" }, { label: "ROI", value: "8-14 months" }],
    caseRefs: [{ part: "Battery cell casings", config: "2x robot, precision dispense", capacity: "300/hr", roi: "10mo" }, { part: "Module thermal barriers", config: "3x robot, ceramic spray", capacity: "120/hr", roi: "12mo" }],
    faqs: [{ q: "What coatings for batteries?", a: "Thermal barrier, ceramic insulation, dielectric, and silicone materials for thermal management and fire resistance." }],
  },
  {
    label: "Medical Device", slug: "medical-device-coating",
    finish: "biocompatible / antimicrobial", throughput: "low-medium",
    painPoints: ["FDA 21 CFR Part 11 / ISO 13485 compliance", "ISO 10993 biocompatibility validation", "Micrometer-level precision", "ISO 5-7 cleanroom production", "Full lot traceability"],
    systemModules: ["Ultra-precision micro-dispensing", "21 CFR Part 11 validated controls", "ISO 5-7 cleanroom enclosures", "Compact cleanroom-certified robots", "Automated IQ/OQ/PQ documentation"],
    productionConfig: { partsPerHour: "20-200", paintType: "PTFE, silicone, antimicrobial, hydrophilic, drug-eluting", finish: "Biocompatible / functional", automation: "Robotic + validated process", integration: "Cleanroom + sterilization workflow" },
    roiMetrics: [{ label: "Coating uniformity", value: "±2 micron" }, { label: "Regulatory compliance", value: "100%" }, { label: "Rework reduction", value: "90-98%" }, { label: "ROI", value: "14-24 months" }],
    caseRefs: [{ part: "Surgical instruments", config: "1x robot, PTFE", capacity: "150/hr", roi: "18mo" }, { part: "Orthopedic implants", config: "2x robot, hydroxyapatite", capacity: "60/hr", roi: "20mo" }],
    faqs: [{ q: "What regulatory requirements?", a: "FDA 21 CFR Part 11, ISO 13485, ISO 10993, and EU MDR." }, { q: "Can small implants be coated robotically?", a: "Yes, micro-dispensing with sub-millimeter accuracy." }],
  },
];

const SOLUTIONS: SolutionKB[] = [
  {
    label: "Robotic Painting System Integration", slug: "robotic-painting-system",
    definition: "Turnkey integration of industrial robots, spray process, paint supply, booth/airflow, controls, and commissioning for repeatable coating quality.",
    processSteps: ["Part Positioning (fixture/conveyor)", "Spray Execution (electrostatic/HVLP/air)", "Paint Supply & Fluid Control", "Booth Airflow & Overspray Management", "Controls & Safety (PLC+HMI)", "Process Verification"],
    configHighlights: ["Robot brands: ABB/FANUC/KUKA", "Spray tech: electrostatic, HVLP, air spray", "New booth build or existing booth integration", "ATEX-ready configurations available", "Single or multi-color changeover"],
    constraints: ["System integration, not standalone equipment", "Final config during engineering assessment", "Primary focus: automotive + industrial finishing"],
    roiMetrics: [{ label: "Coating consistency", value: "Repeatable" }, { label: "Manual dependency", value: "Reduced" }, { label: "Throughput", value: "Stabilized" }, { label: "Lead time", value: "8-12 weeks" }],
    faqs: [{ q: "What is robotic painting system integration?", a: "Turnkey integration of robots, spray process, paint supply, booth, controls, and commissioning." }, { q: "New booth or existing?", a: "Both. New build or retrofit into existing booth environment." }, { q: "ATEX support?", a: "Yes, configured based on site classification and process requirements." }],
  },
  {
    label: "Paint Booth Automation", slug: "paint-booth-automation",
    definition: "Engineering and integration of spray booth airflow/ventilation, overspray management, safety interlocks, paint process controls, and robotic spray execution into a stable finishing environment.",
    processSteps: ["Airflow & Ventilation control", "Safety Design & interlocks", "Controls Integration (PLC+HMI)", "Paint Supply coordination", "Monitoring & Alarms"],
    configHighlights: ["New booth build or retrofit", "Airflow/ventilation aligned with spray process", "ATEX-ready where applicable", "Controls + safety logic update"],
    constraints: ["Final config depends on paint type, throughput, site constraints", "Finalized during engineering assessment"],
    roiMetrics: [{ label: "Quality stability", value: "Improved" }, { label: "Production continuity", value: "Stabilized" }, { label: "Rework", value: "Reduced" }, { label: "Lead time", value: "8-12 weeks" }],
    faqs: [{ q: "What is paint booth automation?", a: "Integration of airflow, overspray management, safety, controls, and robotic spray into a stable finishing environment." }, { q: "How does it affect quality?", a: "Stable booth environment reduces variability and supports repeatable finishes." }],
  },
  {
    label: "Spray Robot Integration", slug: "spray-robot-integration",
    definition: "Selection, configuration, programming, and deployment of industrial robots for spray painting: explosion-proof design, hollow-wrist construction, and specialized path programming.",
    processSteps: ["Requirements Analysis (geometry, volume, quality)", "Robot Selection (reach, speed, EX-proof)", "Cell Layout Design (3D)", "Path Programming (offline + on-site)", "Production Validation (Cpk, cycle time)"],
    configHighlights: ["Compact robots for small parts (900-1400mm reach)", "Standard painting robots (1800-2500mm reach)", "Extended reach (2800mm+) on linear track", "Explosion-proof ATEX/IECEx certified", "Hollow wrist for paint line routing"],
    constraints: ["ATEX/IECEx certification required for solvent-based", "Hollow wrist strongly recommended", "Painting-specific programming expertise required"],
    roiMetrics: [{ label: "Transfer efficiency", value: "30% → 65-85%" }, { label: "Cycle time reduction", value: "20-50%" }, { label: "Quality Cpk", value: ">1.33" }, { label: "Payback", value: "14-24 months" }],
    faqs: [{ q: "How is a painting robot different?", a: "Explosion-proof, hollow wrist for paint lines, specialized painting software, and process I/O for gun control." }, { q: "Can robots be reprogrammed for new parts?", a: "Yes, offline programming from CAD without stopping production." }],
  },
];

// ─── Dynamic System Prompt Builder ──────────────────────────────────────────

interface PageCtx {
  currentPath?: string;
  industryContext?: { industry?: string; finish?: string; throughput?: string };
}

function getPageType(path: string): { type: "industry" | "solution" | "product" | "resource" | "other"; slug?: string } {
  const clean = path.replace(/^\/(en|zh|ja|ko|de|fr|es|pt|ar)(\/|$)/, "/");
  const indMatch = clean.match(/^\/industries\/([a-z-]+)/);
  if (indMatch) return { type: "industry", slug: indMatch[1] };
  const solMatch = clean.match(/^\/solutions\/([a-z-]+)/);
  if (solMatch) return { type: "solution", slug: solMatch[1] };
  if (clean.startsWith("/products")) return { type: "product" };
  if (clean.startsWith("/resources")) return { type: "resource" };
  return { type: "other" };
}

function formatIndustryFull(ind: IndustryKB): string {
  let s = `### ${ind.label} (/${ind.slug})\n`;
  s += `Finish: ${ind.finish} | Throughput: ${ind.throughput}\n`;
  s += `Pain points: ${ind.painPoints.join("; ")}\n`;
  s += `System modules: ${ind.systemModules.join("; ")}\n`;
  s += `Production: ${Object.entries(ind.productionConfig).map(([k, v]) => `${k}: ${v}`).join(", ")}\n`;
  s += `ROI: ${ind.roiMetrics.map(m => `${m.label} ${m.value}`).join(", ")}\n`;
  s += `Case references:\n${ind.caseRefs.map(c => `  - ${c.part}: ${c.config}, ${c.capacity}, ROI ${c.roi}`).join("\n")}\n`;
  s += `FAQs:\n${ind.faqs.map(f => `  Q: ${f.q}\n  A: ${f.a}`).join("\n")}\n`;
  return s;
}

function formatIndustrySummary(ind: IndustryKB): string {
  return `- ${ind.label}: ${ind.finish}, ${ind.throughput} throughput, ${ind.productionConfig.partsPerHour} parts/hr, ROI ${ind.roiMetrics.find(m => m.label.toLowerCase().includes("roi"))?.value || "varies"}`;
}

function formatSolutionFull(sol: SolutionKB): string {
  let s = `### ${sol.label} (/${sol.slug})\n`;
  s += `${sol.definition}\n`;
  s += `Process: ${sol.processSteps.join(" → ")}\n`;
  s += `Config highlights: ${sol.configHighlights.join("; ")}\n`;
  s += `Constraints: ${sol.constraints.join("; ")}\n`;
  s += `ROI: ${sol.roiMetrics.map(m => `${m.label} ${m.value}`).join(", ")}\n`;
  s += `FAQs:\n${sol.faqs.map(f => `  Q: ${f.q}\n  A: ${f.a}`).join("\n")}\n`;
  return s;
}

function formatSolutionSummary(sol: SolutionKB): string {
  return `- ${sol.label}: ${sol.definition.slice(0, 120)}...`;
}

function buildSystemPrompt(pageContext?: PageCtx): string {
  const page = pageContext?.currentPath ? getPageType(pageContext.currentPath) : { type: "other" as const };

  let knowledge = "\n\n---\nPAINTCELL KNOWLEDGE BASE\n\n";
  knowledge += "## Company Overview\nTD Robotic Painting Systems (brand: PaintCell) provides end-to-end robotic painting system integration for 10+ industries worldwide. We integrate robots (ABB/FANUC/KUKA), spray technology (electrostatic/HVLP/airless), paint booth automation, paint supply systems, and PLC-based controls. Our delivery process: Requirement Analysis → Concept Design → Detail Engineering → Manufacturing → Factory Testing → Installation → Training & Handover. Typical deployment: 8-24 weeks after design approval.\n\n";

  if (page.type === "industry" && page.slug) {
    const focused = INDUSTRIES.find(i => i.slug === page.slug);
    if (focused) {
      knowledge += "## CURRENT PAGE INDUSTRY (provide detailed answers for this industry)\n";
      knowledge += formatIndustryFull(focused);
      knowledge += "\n## Other Industries We Serve\n";
      for (const ind of INDUSTRIES) {
        if (ind.slug !== page.slug) knowledge += formatIndustrySummary(ind) + "\n";
      }
    } else {
      for (const ind of INDUSTRIES) knowledge += formatIndustryFull(ind) + "\n";
    }
    knowledge += "\n## Solutions\n";
    for (const sol of SOLUTIONS) knowledge += formatSolutionSummary(sol) + "\n";
  } else if (page.type === "solution" && page.slug) {
    const focused = SOLUTIONS.find(s => s.slug === page.slug);
    if (focused) {
      knowledge += "## CURRENT PAGE SOLUTION (provide detailed answers for this solution)\n";
      knowledge += formatSolutionFull(focused);
      knowledge += "\n## Other Solutions\n";
      for (const sol of SOLUTIONS) {
        if (sol.slug !== page.slug) knowledge += formatSolutionSummary(sol) + "\n";
      }
    } else {
      for (const sol of SOLUTIONS) knowledge += formatSolutionFull(sol) + "\n";
    }
    knowledge += "\n## Industries We Serve\n";
    for (const ind of INDUSTRIES) knowledge += formatIndustrySummary(ind) + "\n";
  } else {
    // Homepage, product pages, resource pages, or unknown - provide balanced overview
    knowledge += "## Industries We Serve (10 industries)\n";
    for (const ind of INDUSTRIES) knowledge += formatIndustrySummary(ind) + "\n";
    knowledge += "\n## Solutions We Offer\n";
    for (const sol of SOLUTIONS) knowledge += formatSolutionFull(sol) + "\n";
  }

  // Add industry context hint from frontend if available
  if (pageContext?.industryContext) {
    const ic = pageContext.industryContext;
    knowledge += `\n## User Context from Page\nThe user is browsing content related to: industry="${ic.industry}", finish="${ic.finish}", throughput="${ic.throughput}". Prioritize this context when answering.\n`;
  }

  // Core Technology Features (extracted from company technical documents)
  knowledge += `
## Core Technology Advantages

### Multi-Brand Robot Integration Platform
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
- Benefit: Reduced equipment investment and footprint

## Reference Projects
- Complete vehicle body painting: 32 Yaskawa robots, 200K units/year capacity (Kaifeng)
- Plastic bumper line: 8 ABB IRB5500 + 25 Binks Maple supply systems (Leapmotor)
- Engineering machinery: 4 Kawasaki 7-axis + Graco high-pressure electrostatic (Zhuhai)
- International: VINFAST Thailand project with Yaskawa MPX2600 + Iwata supply
`;

  knowledge += `\n---
KNOWLEDGE USAGE INSTRUCTIONS:
- Use the knowledge base above to provide specific, accurate answers with real data points (throughput, ROI, case references).
- When the user asks about an industry, reference its pain points, system modules, production config, and case references.
- When the user asks about solutions, reference process steps, config highlights, and constraints.
- If the user's question spans multiple industries or solutions, provide a comparative overview.
- Always maintain constraints: no pricing, no guarantees, human engineers confirm final scope.
---\n`;

  return SYSTEM_PROMPT + knowledge;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Initialize Supabase client with service role for rate limit tracking
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(req);
    
    // Check rate limit using persistent database tracking
    const rateLimitResult = await checkRateLimit(supabase, clientIP, "ai-presales-chat");
    
    if (!rateLimitResult.allowed) {
      console.log(`Rate limit exceeded for ${clientIP}`);
      return new Response(
        JSON.stringify({ 
          error: "Too many requests. Please try again later.",
          retryAfter: Math.ceil((rateLimitResult.resetAt.getTime() - Date.now()) / 1000)
        }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            "Content-Type": "application/json",
            "Retry-After": Math.ceil((rateLimitResult.resetAt.getTime() - Date.now()) / 1000).toString()
          } 
        }
      );
    }

    const rawBody = await req.json();
    
    // Validate request body
    const validationResult = RequestSchema.safeParse(rawBody);
    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors
        .map(e => e.message)
        .join(", ");
      console.error("Validation error:", errorMessage);
      return new Response(
        JSON.stringify({ error: "Invalid request format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const { messages: rawMessages, action, pageContext } = validationResult.data;
    
    // Sanitize all user messages to prevent prompt injection
    const messages = rawMessages.map(msg => ({
      ...msg,
      content: msg.role === "user" ? sanitizeMessage(msg.content) : msg.content
    }));
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const OPENROUTER_API_KEY = Deno.env.get("OPENROUTER_API_KEY");
    const DASHSCOPE_API_KEY = Deno.env.get("DASHSCOPE_API_KEY");

    // Provider fallback chain: Lovable → OpenRouter → DashScope
    interface AIProvider {
      name: string;
      endpoint: string;
      apiKey: string | undefined;
      model: string;
      extraHeaders?: Record<string, string>;
    }

    const providers: AIProvider[] = [
      LOVABLE_API_KEY ? {
        name: "lovable",
        endpoint: "https://ai.gateway.lovable.dev/v1/chat/completions",
        apiKey: LOVABLE_API_KEY,
        model: "google/gemini-3-flash-preview",
      } : null,
      OPENROUTER_API_KEY ? {
        name: "openrouter",
        endpoint: "https://openrouter.ai/api/v1/chat/completions",
        apiKey: OPENROUTER_API_KEY,
        model: "anthropic/claude-3.5-haiku",
        extraHeaders: { "HTTP-Referer": "https://tdpaintcell.com", "X-Title": "PaintCell AI Assistant" },
      } : null,
      DASHSCOPE_API_KEY ? {
        name: "dashscope",
        endpoint: "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
        apiKey: DASHSCOPE_API_KEY,
        model: "qwen-plus",
      } : null,
    ].filter((p): p is AIProvider => p !== null);

    if (providers.length === 0) {
      console.error("No AI provider API keys configured");
      return new Response(
        JSON.stringify({ error: "Service configuration error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Unified AI call with automatic fallback
    async function callAIWithFallback(
      systemContent: string,
      chatMessages: { role: string; content: string }[],
      options: { stream?: boolean; temperature?: number } = {}
    ): Promise<Response> {
      const { stream = false, temperature } = options;

      for (let i = 0; i < providers.length; i++) {
        const provider = providers[i];
        try {
          const headers: Record<string, string> = {
            Authorization: `Bearer ${provider.apiKey}`,
            "Content-Type": "application/json",
            ...provider.extraHeaders,
          };

          const body: Record<string, unknown> = {
            model: provider.model,
            messages: [
              { role: "system", content: systemContent },
              ...chatMessages,
            ],
          };
          if (stream) body.stream = true;
          if (temperature !== undefined) body.temperature = temperature;

          const response = await fetch(provider.endpoint, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
          });

          // If response is OK, return it
          if (response.ok) {
            console.log(`AI provider: ${provider.name} succeeded`);
            return response;
          }

          // Retriable failures → try next provider
          const status = response.status;
          if (status === 429 || status === 402 || status === 500 || status === 502 || status === 503) {
            const errText = await response.text().catch(() => "");
            console.warn(`AI provider ${provider.name} failed (${status}): ${errText.slice(0, 200)}`);
            if (i < providers.length - 1) {
              console.log(`Falling back to next provider: ${providers[i + 1].name}`);
              continue;
            }
          }

          // Non-retriable failure on last provider → return as-is
          return response;
        } catch (err) {
          // Network error → try next provider
          console.warn(`AI provider ${provider.name} network error: ${err instanceof Error ? err.message : "unknown"}`);
          if (i < providers.length - 1) {
            console.log(`Falling back to next provider: ${providers[i + 1].name}`);
            continue;
          }
          // All providers failed
          throw err;
        }
      }

      // Should not reach here, but safety fallback
      throw new Error("All AI providers exhausted");
    }

    // Handle requirement extraction action
    if (action === "extract_requirements") {
      const extractionPrompt = `Based on the conversation, extract any mentioned requirements into this EXACT JSON structure. 
Only include values that were EXPLICITLY stated by the user. Use the default values shown for anything not mentioned.

REQUIRED OUTPUT FORMAT (return ONLY valid JSON, no other text):
{
  "application_material": "not_sure",
  "project_primary_goal": [],
  "project_stage": "not_sure",
  "part_size": "not_sure",
  "part_weight": "not_sure",
  "part_geometry": "not_sure",
  "part_presentation": "not_sure",
  "surface_quality": "not_sure",
  "production_volume": "not_sure",
  "operating_schedule": "not_sure",
  "changeover_frequency": "not_sure",
  "production_priority": "not_sure",
  "production_flow": "not_defined",
  "automation_level": "not_sure",
  "part_loading_method": "to_be_evaluated",
  "operator_involvement": "not_sure",
  "process_control_level": "not_sure",
  "future_expansion": "not_sure",
  "compliance_requirements": [],
  "installation_environment": "not_sure",
  "available_floor_space": "not_defined",
  "utilities_availability": [],
  "paint_type": [],
  "project_timeline": "not_defined",
  "decision_structure": "not_sure",
  "current_need": "general_discussion"
}

Valid values for each field:
- application_material: metal_parts, plastic_components, mixed_materials, wood_composite, not_sure
- project_primary_goal: [quality_consistency, increase_throughput, reduce_labor, safety_compliance, replace_manual]
- project_stage: early_concept, upgrade_existing, capacity_expansion, new_line, not_sure
- part_size: small_lt_300mm, medium_300_800mm, large_gt_800mm, varies
- part_weight: lt_2kg, 2_10kg, 10_30kg, gt_30kg, varies
- part_geometry: simple, moderate, complex, highly_irregular
- part_presentation: single_part, batch_rack, conveyor_hanger, not_standardized
- surface_quality: functional_only, standard_industrial, high_cosmetic, precision_critical
- production_volume: small_batch_high_mix, medium_volume, high_volume_takt, varies
- operating_schedule: one_shift, two_shifts, three_shifts_24_7, variable
- changeover_frequency: multiple_daily, daily, weekly, rarely, not_sure
- production_priority: flexibility, throughput, quality_consistency, balanced
- production_flow: standalone_cell, integrated_existing, new_line, not_defined
- automation_level: semi_automatic, fully_automatic, phased_automation, not_sure
- part_loading_method: manual, conveyor, robot, to_be_evaluated
- operator_involvement: continuous, periodic, minimal, unattended
- process_control_level: basic_repeatability, parameter_based, recipe_based, high_precision
- future_expansion: no_expansion, capacity_increase, more_part_types, modular_required, not_sure
- compliance_requirements: [ce, ul_nfpa, atex, local_only, not_sure]
- installation_environment: existing_booth, standalone_cell, integrated_line, brownfield_retrofit
- available_floor_space: compact, standard, flexible, not_defined
- utilities_availability: [power, compressed_air, exhaust_ventilation, to_be_provided, not_sure]
- paint_type: [solvent_based, water_based, powder_paint, uv_curable, multiple_types, not_sure]
- project_timeline: lt_6_months, 6_12_months, gt_12_months, not_defined
- decision_structure: single_decision_maker, small_technical_team, cross_functional_team, not_sure
- current_need: concept_layout, feasibility_review, budgetary_estimate, compliance_risk_review, general_discussion`;

      const response = await callAIWithFallback(extractionPrompt, messages, { temperature: 0.1 });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("AI extraction error:", response.status, errorText);
        return new Response(JSON.stringify({ error: "Failed to extract requirements" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || "{}";
      
      // Try to parse JSON from response
      let requirements;
      try {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        requirements = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
      } catch {
        requirements = {};
      }

      return new Response(JSON.stringify({ requirements }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Handle summary generation action
    if (action === "generate_summary") {
      const summaryPrompt = `Based on the conversation, create a human-readable requirement summary.

Format the summary with these sections (only include sections with actual information):
## Application Context
## Part Characteristics  
## Production Requirements
## Automation Scope
## Compliance & Site
## Timeline & Decision

For each piece of information mentioned, provide a clear bullet point.
End with a note: "Note: This summary is for discussion purposes. Our engineering team will review and confirm all requirements."

Keep it concise and professional.`;

      const response = await callAIWithFallback(summaryPrompt, messages, { temperature: 0.3 });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("AI summary error:", response.status, errorText);
        return new Response(JSON.stringify({ error: "Failed to generate summary" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const data = await response.json();
      const summary = data.choices?.[0]?.message?.content || "";

      return new Response(JSON.stringify({ summary }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Regular chat - use streaming with dynamic knowledge-enriched prompt + fallback
    const systemPrompt = buildSystemPrompt(pageContext);
    const response = await callAIWithFallback(systemPrompt, messages, { stream: true });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Chat error:", e instanceof Error ? e.message : "Unknown error");
    return new Response(
      JSON.stringify({ error: "Unable to process your request. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
