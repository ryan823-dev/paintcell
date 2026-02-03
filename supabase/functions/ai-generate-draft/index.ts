import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// In-memory rate limit store (per function instance)
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 2 * 60 * 1000; // 2 minutes

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get auth header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    
    // Create a client with the user's JWT to verify auth
    const supabaseUser = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabaseUser.auth.getUser();
    if (authError || !user) {
      console.error("Auth error:", authError?.message);
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create service role client for admin operations
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // Check if user is admin or editor
    const { data: roleCheck, error: roleError } = await supabaseAdmin
      .rpc("is_admin_or_editor", { _user_id: user.id });
    
    if (roleError || !roleCheck) {
      console.error("Role check failed:", roleError?.message);
      return new Response(
        JSON.stringify({ error: "Forbidden: Admin or editor role required" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse request body
    const body = await req.json();
    const { content_type, record_id, language, title, keywords, audience, constraints_note, outline_optional, force } = body;

    // Validate required fields
    if (!content_type || !record_id || !title) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: content_type, record_id, title" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!["resource_post", "case_study"].includes(content_type)) {
      return new Response(
        JSON.stringify({ error: "Invalid content_type. Must be 'resource_post' or 'case_study'" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Rate limiting check
    const rateLimitKey = `${content_type}:${record_id}`;
    const lastGeneration = rateLimitMap.get(rateLimitKey);
    const now = Date.now();

    if (lastGeneration && (now - lastGeneration) < RATE_LIMIT_WINDOW_MS && !force) {
      const remainingSeconds = Math.ceil((RATE_LIMIT_WINDOW_MS - (now - lastGeneration)) / 1000);
      return new Response(
        JSON.stringify({ 
          error: `Rate limited. Please wait ${remainingSeconds} seconds before generating again, or confirm to override.`,
          rate_limited: true,
          retry_after_seconds: remainingSeconds
        }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get n8n webhook URL from environment (server-side only)
    const n8nWebhookUrl = Deno.env.get("N8N_WEBHOOK_URL");
    if (!n8nWebhookUrl) {
      console.error("N8N_WEBHOOK_URL not configured");
      return new Response(
        JSON.stringify({ error: "AI generation service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Prepare payload for n8n
    const n8nPayload = {
      content_type,
      record_id,
      language: language || "en",
      title,
      keywords: keywords || [],
      audience: audience || "engineering-led robotic spray painting projects",
      constraints_note: constraints_note || "liquid spray painting only; do not mention powder coating; avoid marketing fluff",
      outline_optional: outline_optional || []
    };

    console.log(`Calling n8n webhook for ${content_type}:${record_id}`);

    // Call n8n webhook
    const n8nResponse = await fetch(n8nWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(n8nPayload),
    });

    if (!n8nResponse.ok) {
      const errorText = await n8nResponse.text();
      console.error("n8n webhook error:", n8nResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: "Failed to generate draft. Please try again later." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const n8nResult = await n8nResponse.json();
    console.log("n8n response received for", record_id);

    // Determine table name
    const tableName = content_type === "resource_post" ? "resources_posts" : "case_studies";

    // Build update object based on what n8n returns
    const updateData: Record<string, unknown> = {
      last_ai_generation_at: new Date().toISOString(),
    };

    if (n8nResult.markdown_body) {
      updateData.body = n8nResult.markdown_body;
    }
    if (n8nResult.answer_box) {
      updateData.answer_box = n8nResult.answer_box;
    }
    if (n8nResult.meta_title) {
      updateData.meta_title = n8nResult.meta_title;
    }
    if (n8nResult.meta_description) {
      updateData.meta_description = n8nResult.meta_description;
    }
    if (n8nResult.suggested_slug && content_type === "resource_post") {
      // Only update slug if it's a new record or explicitly requested
      // For now, we'll include it but not overwrite existing slugs
    }

    // Update the record (status stays as draft)
    const { error: updateError } = await supabaseAdmin
      .from(tableName)
      .update(updateData)
      .eq("id", record_id);

    if (updateError) {
      console.error("Database update error:", updateError.message);
      return new Response(
        JSON.stringify({ error: "Failed to save generated draft" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Update rate limit
    rateLimitMap.set(rateLimitKey, now);

    // Clean up old rate limit entries (older than 5 minutes)
    for (const [key, timestamp] of rateLimitMap.entries()) {
      if (now - timestamp > 5 * 60 * 1000) {
        rateLimitMap.delete(key);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Draft generated successfully",
        generated_at: updateData.last_ai_generation_at,
        internal_links: n8nResult.internal_links || []
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Unexpected error:", error instanceof Error ? error.message : "Unknown error");
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
