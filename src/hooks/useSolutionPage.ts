import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { solutions, SolutionData } from "@/data/solutionData";

function mapDbToSolutionData(row: Record<string, unknown>): SolutionData {
  return {
    slug: row.slug as string,
    metaTitle: (row.meta_title as string) || "",
    metaDescription: (row.meta_description as string) || "",
    heroTitle: (row.hero_title as string) || "",
    heroSubtitle: (row.hero_subtitle as string) || "",
    definition: (row.definition as string) || "",
    definitionSecondary: (row.definition_secondary as string) || undefined,
    whyTitle: (row.why_title as string) || undefined,
    whyIntro: (row.why_intro as string) || undefined,
    whyItems: Array.isArray(row.why_items) ? row.why_items : undefined,
    scopeIntro: (row.scope_intro as string) || undefined,
    scopeItems: Array.isArray(row.scope_items) ? row.scope_items : undefined,
    scopeSubSections: Array.isArray(row.scope_sub_sections) ? row.scope_sub_sections : undefined,
    componentsIntro: (row.components_intro as string) || undefined,
    componentItems: Array.isArray(row.component_items) ? row.component_items : undefined,
    processSteps: Array.isArray(row.process_steps) ? row.process_steps : [],
    applicationScope: Array.isArray(row.application_scope) ? row.application_scope : [],
    applicationScopeIntro: (row.application_scope_intro as string) || undefined,
    configOptions: Array.isArray(row.config_options) ? row.config_options : [],
    technicalParameters: Array.isArray(row.technical_parameters) ? row.technical_parameters : undefined,
    technicalParametersIntro: (row.technical_parameters_intro as string) || undefined,
    constraints: Array.isArray(row.constraints) ? row.constraints : [],
    atexIntro: (row.atex_intro as string) || undefined,
    atexItems: Array.isArray(row.atex_items) ? row.atex_items : undefined,
    roiMethodology: (row.roi_methodology as string) || "",
    roiMetrics: Array.isArray(row.roi_metrics) ? row.roi_metrics : [],
    deploymentNote: (row.deployment_note as string) || undefined,
    timeline: Array.isArray(row.timeline) ? row.timeline : [],
    faqs: Array.isArray(row.faqs) ? row.faqs : [],
    relatedIndustries: Array.isArray(row.related_industries) ? row.related_industries : [],
    relatedKnowledge: Array.isArray(row.related_knowledge) ? row.related_knowledge : [],
    eeat: (row.eeat as SolutionData["eeat"]) || undefined,
    canonicalDomain: "https://tdpaint.com",
  };
}

export function useSolutionPage(slug: string | undefined) {
  return useQuery({
    queryKey: ["solution-page", slug],
    queryFn: async (): Promise<SolutionData | undefined> => {
      if (!slug) return undefined;

      const { data, error } = await supabase
        .from("solution_pages")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error || !data) {
        // Fallback to hardcoded data
        return solutions[slug];
      }

      return mapDbToSolutionData(data);
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}
