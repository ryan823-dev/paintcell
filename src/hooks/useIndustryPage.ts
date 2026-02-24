import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { industries, IndustryData } from "@/data/industryData";

function mapDbToIndustryData(row: any): IndustryData {
  return {
    slug: row.slug,
    industry: row.ai_context?.industry || row.slug,
    industryLabel: row.industry_label,
    metaTitle: row.meta_title || "",
    metaDescription: row.meta_description || "",
    heroTitle: row.hero_title || "",
    heroSubtitle: row.hero_subtitle || "",
    heroImage: row.hero_image || undefined,
    ctaText: row.cta_text || "",
    examplePrompt: row.example_prompt || "",
    aiContext: row.ai_context || { industry: "", finish: "", throughput: "" },
    painPoints: Array.isArray(row.pain_points) ? row.pain_points : [],
    systemModules: Array.isArray(row.system_modules) ? row.system_modules : [],
    productionConfig: row.production_config || { partsPerHour: "—", paintType: "—", finishRequirement: "—", automationLevel: "—", lineIntegration: "—" },
    roiMetrics: Array.isArray(row.roi_metrics) ? row.roi_metrics : [],
    caseReferences: Array.isArray(row.case_references) ? row.case_references : [],
    faqs: Array.isArray(row.faqs) ? row.faqs : [],
    comingSoon: row.coming_soon || false,
  };
}

export function useIndustryPage(slug: string | undefined) {
  return useQuery({
    queryKey: ["industry-page", slug],
    queryFn: async (): Promise<IndustryData | undefined> => {
      if (!slug) return undefined;

      const { data, error } = await supabase
        .from("industry_pages")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error || !data) {
        // Fallback to hardcoded data
        return industries[slug];
      }

      return mapDbToIndustryData(data);
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}
