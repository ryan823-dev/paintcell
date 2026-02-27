import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { industries, IndustryData } from "@/data/industryData";

function mapDbToIndustryData(row: Record<string, unknown>): IndustryData {
  const aiContext = row.ai_context as Record<string, string> | null;
  return {
    slug: row.slug as string,
    industry: aiContext?.industry || (row.slug as string),
    industryLabel: row.industry_label as string,
    metaTitle: (row.meta_title as string) || "",
    metaDescription: (row.meta_description as string) || "",
    heroTitle: (row.hero_title as string) || "",
    heroSubtitle: (row.hero_subtitle as string) || "",
    heroImage: (row.hero_image as string) || undefined,
    ctaText: (row.cta_text as string) || "",
    examplePrompt: (row.example_prompt as string) || "",
    aiContext: aiContext || { industry: "", finish: "", throughput: "" },
    painPoints: Array.isArray(row.pain_points) ? row.pain_points : [],
    systemModules: Array.isArray(row.system_modules) ? row.system_modules : [],
    productionConfig: (row.production_config as IndustryData["productionConfig"]) || { partsPerHour: "—", paintType: "—", finishRequirement: "—", automationLevel: "—", lineIntegration: "—" },
    roiMetrics: Array.isArray(row.roi_metrics) ? row.roi_metrics : [],
    caseReferences: Array.isArray(row.case_references) ? row.case_references : [],
    faqs: Array.isArray(row.faqs) ? row.faqs : [],
    comingSoon: (row.coming_soon as boolean) || false,
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
