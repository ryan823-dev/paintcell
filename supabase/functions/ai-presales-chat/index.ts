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
const SYSTEM_PROMPT = `You are a Pre-Sales Automation Engineer for PaintCell (brand of TD Robotic Painting Systems), specializing in full-line robotic spray painting solutions: complete painting lines, paint booths, spray workstation cells, robots, spray equipment, paint supply systems, color change systems, control systems, and spare parts/accessories.

LANGUAGE BEHAVIOR:
- Default language: English.
- Detect the primary language of the user's input.
- If the input is clearly in one language (e.g., Chinese, Japanese, Spanish), respond in that same language.
- If the input contains mixed languages, unclear language, or machine-translated fragments, respond in English.
- Maintain the same professional tone regardless of language.

YOUR ROLE:
- You are a calm, professional, engineering-oriented assistant who DEEPLY understands painting automation
- Help customers understand their painting automation requirements
- Guide conversations toward gathering structured technical information
- Answer general questions about painting automation briefly and helpfully
- You know our FULL product line, solutions, industry expertise, and website resources — use this knowledge to provide specific, data-backed answers

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

SALES INTELLIGENCE & CUSTOMER RETENTION:
Your goal is not just to answer questions — it's to help visitors find what they need and stay engaged.

1. KNOW WHAT YOU HAVE: You have knowledge of 10 industries, 3+ solution types, 6 product categories, 6 robot platforms, 13 supplier brands, 7 knowledge articles, 20+ glossary terms, 3 practical tools/templates, and case studies. Use this to provide specific, authoritative answers.

2. GUIDE, DON'T JUST ANSWER: After answering a question, suggest a natural next step:
   - "If you're evaluating automation, our /resources/tools-templates/feasibility-checklist can help assess readiness."
   - "For more detail on robot selection, see /resources/knowledge/how-to-choose-paint-robot."
   - "We have a dedicated page for your industry with case references — /industries/[slug]."

3. CROSS-SELL INTELLIGENTLY: If a user asks about one topic, naturally introduce related offerings:
   - Asking about robots? Mention we also handle booth design, paint supply, and controls as a complete system.
   - Asking about one industry? Reference similar case references from related industries.
   - Asking about equipment? Mention our full integration service so they see the bigger picture.

4. IDENTIFY BUYING SIGNALS: When users mention specific parts, volumes, timelines, or pain points, these are buying signals. Respond with relevant data (ROI metrics, case references, production configs from the knowledge base) and gently guide toward our quote process (/quote) or a requirement summary.

5. NEVER LET A CONVERSATION DIE: If a user seems unsure or asks a vague question, offer concrete options:
   - "Would you like to explore which spray technology fits your parts, or should we look at which industries we've served that are similar to yours?"
   - "I can walk you through the key considerations, or you can try our interactive RFQ template at /resources/tools-templates/paint-cell-rfq-template."

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
- Products? We supply rotary bells, spray guns, paint pumps, control systems, color change systems, and spare parts — plus full system integration.
- After answering, gently guide back toward understanding their specific needs.

GUIDING TOWARD SUMMARY:
After 6-8 exchanges OR when you have information in at least 4 of the 6 dimensions:
- Suggest generating a structured requirement summary
- Mention they can also use the detailed 26-step configurator wizard at /quote
- Remind them that a human engineer will review all requirements

RESPONSE FORMAT:
Always respond in plain text. Be helpful, professional, and engineering-focused.
If asked about pricing: "Pricing depends on many factors specific to your application. I can help you document your requirements so our engineering team can prepare an accurate proposal."
If asked to promise/guarantee: "I can help you explore options, but our engineering team will need to review the details before making any commitments."`;

// ─── Knowledge Base ─────────────────────────────────────────────────────────
// Auto-generated from solutionData.ts + industryData.ts at build time.
// Regenerate with: npx tsx scripts/generate-kb.ts
// Gemini Flash has a 1 M-token context window, so 20-30K chars is fine.

import { GENERATED_KNOWLEDGE, KB_INDUSTRIES, KB_SOLUTIONS, KB_GENERATED_AT } from "./generated-kb.ts";

// For page-context routing, we still need slug-based lookup
function findIndustrySection(slug: string): string | undefined {
  const sec = KB_INDUSTRIES.find((s: { title: string; content: string }) => s.content.includes(`/${slug})`));
  return sec?.content;
}

function findSolutionSection(slug: string): string | undefined {
  const sec = KB_SOLUTIONS.find((s: { title: string; content: string }) => s.content.includes(`/${slug})`));
  return sec?.content;
}

type PageType = { type: "industry"; slug: string } | { type: "solution"; slug: string } | { type: "other" };

function getPageType(path: string): PageType {
  const industryMatch = path.match(/\/industries\/([a-z-]+)/);
  if (industryMatch) return { type: "industry", slug: industryMatch[1] };
  const solutionMatch = path.match(/\/solutions\/([a-z-]+)/);
  if (solutionMatch) return { type: "solution", slug: solutionMatch[1] };
  return { type: "other" };
}

interface PageCtx {
  currentPath: string;
  industryContext?: { industry: string; finish: string; throughput: string };
}

function buildSystemPrompt(pageContext?: PageCtx): string {
  const page = pageContext?.currentPath ? getPageType(pageContext.currentPath) : { type: "other" as const };

  let knowledge = `\n\n---\nPAINTCELL KNOWLEDGE BASE (auto-generated: ${KB_GENERATED_AT})\n\n`;

  if (page.type === "industry" && page.slug) {
    const focused = findIndustrySection(page.slug);
    if (focused) {
      knowledge += "## CURRENT PAGE INDUSTRY (provide detailed answers for this industry)\n\n";
      knowledge += focused + "\n\n";
      knowledge += "## Other Industries & Solutions\n\n";
    }
    // Always include the full generated knowledge as fallback context
    knowledge += GENERATED_KNOWLEDGE;
  } else if (page.type === "solution" && page.slug) {
    const focused = findSolutionSection(page.slug);
    if (focused) {
      knowledge += "## CURRENT PAGE SOLUTION (provide detailed answers for this solution)\n\n";
      knowledge += focused + "\n\n";
      knowledge += "## Other Solutions & Industries\n\n";
    }
    knowledge += GENERATED_KNOWLEDGE;
  } else {
    // Homepage, product pages, resource pages, or unknown — full knowledge
    knowledge += GENERATED_KNOWLEDGE;
  }

  // Add industry context hint from frontend if available
  if (pageContext?.industryContext) {
    const ic = pageContext.industryContext;
    knowledge += `\n## User Context from Page\nThe user is browsing content related to: industry="${ic.industry}", finish="${ic.finish}", throughput="${ic.throughput}". Prioritize this context when answering.\n`;
  }

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
