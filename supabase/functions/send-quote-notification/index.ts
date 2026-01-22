import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface QuoteSubmission {
  // Contact info
  contact_name: string;
  contact_email: string;
  contact_company: string;
  contact_phone?: string;
  
  // Form data
  application_industry: string;
  coating_material_type: string[];
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
    const data: QuoteSubmission = await req.json();

    // Format the email content
    const emailHtml = `
      <h1>New Quote Request from ${data.contact_name}</h1>
      
      <h2>Contact Information</h2>
      <ul>
        <li><strong>Name:</strong> ${data.contact_name}</li>
        <li><strong>Email:</strong> ${data.contact_email}</li>
        <li><strong>Company:</strong> ${data.contact_company}</li>
        <li><strong>Phone:</strong> ${data.contact_phone || "Not provided"}</li>
      </ul>

      <h2>Application Context</h2>
      <ul>
        <li><strong>Industry:</strong> ${data.application_industry}</li>
        <li><strong>Coating Materials:</strong> ${Array.isArray(data.coating_material_type) ? data.coating_material_type.join(", ") : data.coating_material_type}</li>
        <li><strong>Substrate Materials:</strong> ${Array.isArray(data.substrate_material) ? data.substrate_material.join(", ") : data.substrate_material}</li>
      </ul>

      <h2>Part Characteristics</h2>
      <ul>
        <li><strong>Part Geometry:</strong> ${data.part_geometry}</li>
        <li><strong>Part Dimensions:</strong> ${data.part_dimensions}</li>
      </ul>

      <h2>Production & Throughput</h2>
      <ul>
        <li><strong>Throughput Requirement:</strong> ${data.throughput_requirement}</li>
        <li><strong>Batch Size:</strong> ${data.batch_size}</li>
        <li><strong>Production Type:</strong> ${data.production_type}</li>
      </ul>

      <h2>Automation Boundary</h2>
      <ul>
        <li><strong>Upstream Integration:</strong> ${data.upstream_integration}</li>
        <li><strong>Downstream Integration:</strong> ${data.downstream_integration}</li>
        <li><strong>Material Handling:</strong> ${data.material_handling}</li>
        <li><strong>Robot Loading:</strong> ${data.robot_loading}</li>
        <li><strong>Color Change Frequency:</strong> ${data.color_change_frequency}</li>
        <li><strong>Automation Level:</strong> ${data.automation_level}</li>
      </ul>

      <h2>Compliance & Site</h2>
      <ul>
        <li><strong>Industry Standards:</strong> ${Array.isArray(data.industry_standards) ? data.industry_standards.join(", ") : data.industry_standards}</li>
        <li><strong>Hazardous Environment:</strong> ${data.hazardous_environment}</li>
        <li><strong>Floor Space:</strong> ${data.floor_space}</li>
        <li><strong>Ceiling Height:</strong> ${data.ceiling_height}</li>
        <li><strong>Power Availability:</strong> ${data.power_availability}</li>
        <li><strong>Utility Access:</strong> ${data.utility_access}</li>
      </ul>

      <h2>Project Readiness</h2>
      <ul>
        <li><strong>Project Timeline:</strong> ${data.project_timeline}</li>
        <li><strong>Budget Range:</strong> ${data.budget_range}</li>
        <li><strong>Decision Stage:</strong> ${data.decision_stage}</li>
        <li><strong>Additional Requirements:</strong> ${data.additional_requirements || "None"}</li>
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
        from: "CoatingCell Quotes <onboarding@resend.dev>",
        to: [data.contact_email],
        subject: `Quote Request Received - ${data.contact_company}`,
        html: emailHtml,
      }),
    });

    const result = await emailResponse.json();

    if (!emailResponse.ok) {
      throw new Error(result.message || "Failed to send email");
    }

    console.log("Email sent successfully:", result);

    return new Response(JSON.stringify({ success: true, emailResponse: result }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-quote-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
