import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

/**
 * Escapes HTML special characters to prevent XSS attacks in email content.
 * User-submitted data must be escaped before embedding in HTML templates.
 */
function escapeHtml(text: string | undefined): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Escapes an array of strings for safe HTML embedding.
 */
function escapeHtmlArray(arr: string[] | string | undefined): string {
  if (!arr) return "";
  if (Array.isArray(arr)) {
    return arr.map(escapeHtml).join(", ");
  }
  return escapeHtml(arr);
}

interface QuoteSubmission {
  // Contact info
  contact_name: string;
  contact_email: string;
  contact_company: string;
  contact_phone?: string;
  
  // Form data
  application_industry: string;
  paint_type: string[];
  substrate_material: string[];
  part_geometry: string;
  part_dimensions: string;
  throughput_requirement: string;
  batch_size: string;
  production_type: string;
  upstream_integration: string;
  downstream_integration: string;
  material_handling: string;
  robot_loading: string;
  color_change_frequency: string;
  automation_level: string;
  industry_standards: string[];
  hazardous_environment: string;
  floor_space: string;
  ceiling_height: string;
  power_availability: string;
  utility_access: string;
  project_timeline: string;
  budget_range: string;
  decision_stage: string;
  additional_requirements?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate API key is configured
    if (!RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY configuration");
      return new Response(
        JSON.stringify({ error: "Service configuration error. Please contact support." }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const data: QuoteSubmission = await req.json();

    // Basic input validation
    if (!data.contact_name || !data.contact_email || !data.contact_company) {
      return new Response(
        JSON.stringify({ error: "Missing required contact information." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.contact_email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Format the email content
    // All user-submitted data is HTML-escaped to prevent XSS attacks
    const emailHtml = `
      <h1>New Quote Request from ${escapeHtml(data.contact_name)}</h1>
      
      <h2>Contact Information</h2>
      <ul>
        <li><strong>Name:</strong> ${escapeHtml(data.contact_name)}</li>
        <li><strong>Email:</strong> ${escapeHtml(data.contact_email)}</li>
        <li><strong>Company:</strong> ${escapeHtml(data.contact_company)}</li>
        <li><strong>Phone:</strong> ${escapeHtml(data.contact_phone) || "Not provided"}</li>
      </ul>

      <h2>Application Context</h2>
      <ul>
        <li><strong>Industry:</strong> ${escapeHtml(data.application_industry)}</li>
        <li><strong>Paint Types:</strong> ${escapeHtmlArray(data.paint_type)}</li>
        <li><strong>Substrate Materials:</strong> ${escapeHtmlArray(data.substrate_material)}</li>
      </ul>

      <h2>Part Characteristics</h2>
      <ul>
        <li><strong>Part Geometry:</strong> ${escapeHtml(data.part_geometry)}</li>
        <li><strong>Part Dimensions:</strong> ${escapeHtml(data.part_dimensions)}</li>
      </ul>

      <h2>Production & Throughput</h2>
      <ul>
        <li><strong>Throughput Requirement:</strong> ${escapeHtml(data.throughput_requirement)}</li>
        <li><strong>Batch Size:</strong> ${escapeHtml(data.batch_size)}</li>
        <li><strong>Production Type:</strong> ${escapeHtml(data.production_type)}</li>
      </ul>

      <h2>Automation Boundary</h2>
      <ul>
        <li><strong>Upstream Integration:</strong> ${escapeHtml(data.upstream_integration)}</li>
        <li><strong>Downstream Integration:</strong> ${escapeHtml(data.downstream_integration)}</li>
        <li><strong>Material Handling:</strong> ${escapeHtml(data.material_handling)}</li>
        <li><strong>Robot Loading:</strong> ${escapeHtml(data.robot_loading)}</li>
        <li><strong>Color Change Frequency:</strong> ${escapeHtml(data.color_change_frequency)}</li>
        <li><strong>Automation Level:</strong> ${escapeHtml(data.automation_level)}</li>
      </ul>

      <h2>Compliance & Site</h2>
      <ul>
        <li><strong>Industry Standards:</strong> ${escapeHtmlArray(data.industry_standards)}</li>
        <li><strong>Hazardous Environment:</strong> ${escapeHtml(data.hazardous_environment)}</li>
        <li><strong>Floor Space:</strong> ${escapeHtml(data.floor_space)}</li>
        <li><strong>Ceiling Height:</strong> ${escapeHtml(data.ceiling_height)}</li>
        <li><strong>Power Availability:</strong> ${escapeHtml(data.power_availability)}</li>
        <li><strong>Utility Access:</strong> ${escapeHtml(data.utility_access)}</li>
      </ul>

      <h2>Project Readiness</h2>
      <ul>
        <li><strong>Project Timeline:</strong> ${escapeHtml(data.project_timeline)}</li>
        <li><strong>Budget Range:</strong> ${escapeHtml(data.budget_range)}</li>
        <li><strong>Decision Stage:</strong> ${escapeHtml(data.decision_stage)}</li>
        <li><strong>Additional Requirements:</strong> ${escapeHtml(data.additional_requirements) || "None"}</li>
      </ul>
    `;

    // Send email notification using Resend API directly
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "PaintCell Quotes <onboarding@resend.dev>",
        to: [data.contact_email],
        subject: `Quote Request Received - ${data.contact_company}`,
        html: emailHtml,
      }),
    });

    const result = await emailResponse.json();

    if (!emailResponse.ok) {
      // Log detailed error server-side only
      console.error("Email service error:", result);
      return new Response(
        JSON.stringify({ error: "Unable to send email notification. Please try again later." }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Email sent successfully");

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    // Log detailed error server-side only
    console.error("Error in send-quote-notification:", error instanceof Error ? error.message : "Unknown error");
    return new Response(
      JSON.stringify({ error: "Unable to process your request. Please try again later." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
