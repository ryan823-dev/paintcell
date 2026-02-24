import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { solutions, SolutionData } from "@/data/solutionData";

function mapDbToSolutionData(row: any): SolutionData {
  return {
    slug: row.slug,
    metaTitle: row.meta_title || "",
    metaDescription: row.meta_description || "",
    heroTitle: row.hero_title || "",
    heroSubtitle: row.hero_subtitle || "",
    definition: row.definition || "",
    definitionSecondary: row.definition_secondary || undefined,
    whyTitle: row.why_title || undefined,
    whyIntro: row.why_intro || undefined,
    whyItems: Array.isArray(row.why_items) ? row.why_items : undefined,
    scopeIntro: row.scope_intro || undefined,
    scopeItems: Array.isArray(row.scope_items) ? row.scope_items : undefined,
    scopeSubSections: Array.isArray(row.scope_sub_sections) ? row.scope_sub_sections : undefined,
    componentsIntro: row.components_intro || undefined,
    componentItems: Array.isArray(row.component_items) ? row.component_items : undefined,
    processSteps: Array.isArray(row.process_steps) ? row.process_steps : [],
    applicationScope: Array.isArray(row.application_scope) ? row.application_scope : [],
    applicationScopeIntro: row.application_scope_intro || undefined,
    configOptions: Array.isArray(row.config_options) ? row.config_options : [],
    technicalParameters: Array.isArray(row.technical_parameters) ? row.technical_parameters : undefined,
    technicalParametersIntro: row.technical_parameters_intro || undefined,
    constraints: Array.isArray(row.constraints) ? row.constraints : [],
    atexIntro: row.atex_intro || undefined,
    atexItems: Array.isArray(row.atex_items) ? row.atex_items : undefined,
    roiMethodology: row.roi_methodology || "",
    roiMetrics: Array.isArray(row.roi_metrics) ? row.roi_metrics : [],
    deploymentNote: row.deployment_note || undefined,
    timeline: Array.isArray(row.timeline) ? row.timeline : [],
    faqs: Array.isArray(row.faqs) ? row.faqs : [],
    relatedIndustries: Array.isArray(row.related_industries) ? row.related_industries : [],
    relatedKnowledge: Array.isArray(row.related_knowledge) ? row.related_knowledge : [],
    eeat: row.eeat || undefined,
    canonicalDomain: "https://tdpaintcell.com",
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
