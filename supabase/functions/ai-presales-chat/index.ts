import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// System prompt for the AI Pre-Sales Engineer
const SYSTEM_PROMPT = `You are a Pre-Sales Automation Engineer for PaintCell, a company specializing in robotic spray painting workstation cells for industrial applications.

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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, action } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
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

      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: extractionPrompt },
            ...messages,
          ],
          temperature: 0.1,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("AI gateway error:", response.status, errorText);
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
        // Extract JSON from response (may be wrapped in markdown code blocks)
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

      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: summaryPrompt },
            ...messages,
          ],
          temperature: 0.3,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("AI gateway error:", response.status, errorText);
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

    // Regular chat - use streaming
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

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
    console.error("Chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
