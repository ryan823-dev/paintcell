import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const VERTAX_PUSH_SECRET = Deno.env.get("VERTAX_PUSH_SECRET");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContentPushPayload {
  vertax_asset_id: string;
  title: string;
  title_zh?: string;
  slug: string;
  body: string;
  body_zh?: string;
  summary?: string;
  summary_zh?: string;
  answer_box?: string;
  answer_box_zh?: string;
  meta_title?: string;
  meta_title_zh?: string;
  meta_description?: string;
  meta_description_zh?: string;
  category?: "learning-center" | "tools-templates" | "glossary";
  featured_image_url?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate service configuration
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error("Missing Supabase configuration");
      return new Response(
        JSON.stringify({ error: "Service configuration error" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!VERTAX_PUSH_SECRET) {
      console.error("Missing VERTAX_PUSH_SECRET");
      return new Response(
        JSON.stringify({ error: "Service configuration error" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Authenticate: verify shared secret
    const authHeader = req.headers.get("authorization");
    if (!authHeader || authHeader !== `Bearer ${VERTAX_PUSH_SECRET}`) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const payload: ContentPushPayload = await req.json();

    // Validate required fields
    if (!payload.vertax_asset_id || !payload.title || !payload.slug || !payload.body) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: vertax_asset_id, title, slug, body" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Sanitize slug
    const slug = payload.slug
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 100);

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // UPSERT by vertax_asset_id (idempotent push)
    const record = {
      vertax_asset_id: payload.vertax_asset_id,
      title: payload.title,
      title_zh: payload.title_zh || null,
      slug,
      body: payload.body,
      body_zh: payload.body_zh || null,
      summary: payload.summary || payload.body.slice(0, 200),
      summary_zh: payload.summary_zh || (payload.body_zh ? payload.body_zh.slice(0, 200) : null),
      answer_box: payload.answer_box || null,
      answer_box_zh: payload.answer_box_zh || null,
      meta_title: payload.meta_title || payload.title.slice(0, 60),
      meta_title_zh: payload.meta_title_zh || null,
      meta_description: payload.meta_description || payload.body.slice(0, 160),
      meta_description_zh: payload.meta_description_zh || null,
      category: payload.category || "learning-center",
      featured_image_url: payload.featured_image_url || null,
      status: (payload as any).status || "published",
      last_ai_generation_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Check if record exists (update) or not (insert)
    const { data: existing } = await supabase
      .from("resources_posts")
      .select("id, slug")
      .eq("vertax_asset_id", payload.vertax_asset_id)
      .maybeSingle();

    let result;
    if (existing) {
      // Update existing record
      const { data, error } = await supabase
        .from("resources_posts")
        .update(record)
        .eq("vertax_asset_id", payload.vertax_asset_id)
        .select("id, slug")
        .single();

      if (error) throw error;
      result = data;
      console.log(`[receive-content-push] Updated: ${result.id} (slug: ${result.slug})`);
    } else {
      // Insert new record
      const { data, error } = await supabase
        .from("resources_posts")
        .insert(record)
        .select("id, slug")
        .single();

      if (error) throw error;
      result = data;
      console.log(`[receive-content-push] Inserted: ${result.id} (slug: ${result.slug})`);
    }

    return new Response(
      JSON.stringify({ success: true, id: result.id, slug: result.slug }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: unknown) {
    console.error("[receive-content-push] Error:", error instanceof Error ? error.message : "Unknown error");
    return new Response(
      JSON.stringify({ error: "Failed to process content push" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
