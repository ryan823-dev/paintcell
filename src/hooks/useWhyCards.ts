import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/i18n";

export interface WhyCardModalContent {
  title: string;
  engineeringAnchor: string;
  typicalUseCase: string;
  keyConstraints: string;
  whatWeNeedToAssess: string;
}

export interface WhyCard {
  id: string;
  title: string;
  description: string;
  microLine: string;
  modalContent: WhyCardModalContent;
}

interface DbWhyCard {
  id: string;
  title: string;
  title_zh: string | null;
  card_gray_line: string;
  card_gray_line_zh: string | null;
  modal_engineering_anchor: string | null;
  modal_engineering_anchor_zh: string | null;
  modal_typical_use_case: string | null;
  modal_typical_use_case_zh: string | null;
  modal_key_constraints: string[] | null;
  modal_key_constraints_zh: string[] | null;
  modal_what_we_need_to_assess: string[] | null;
  modal_what_we_need_to_assess_zh: string[] | null;
  sort_order: number;
  is_visible: boolean;
}

function mapDbToWhyCard(row: DbWhyCard, locale: string): WhyCard {
  const isZh = locale === "zh";
  const constraints = isZh
    ? (row.modal_key_constraints_zh || row.modal_key_constraints || [])
    : (row.modal_key_constraints || []);
  const assessments = isZh
    ? (row.modal_what_we_need_to_assess_zh || row.modal_what_we_need_to_assess || [])
    : (row.modal_what_we_need_to_assess || []);

  return {
    id: row.id,
    title: isZh ? (row.title_zh || row.title) : row.title,
    description: "", // Not stored in DB - can be derived or left empty
    microLine: isZh ? (row.card_gray_line_zh || row.card_gray_line) : row.card_gray_line,
    modalContent: {
      title: isZh ? (row.title_zh || row.title) : row.title,
      engineeringAnchor: isZh
        ? (row.modal_engineering_anchor_zh || row.modal_engineering_anchor || "")
        : (row.modal_engineering_anchor || ""),
      typicalUseCase: isZh
        ? (row.modal_typical_use_case_zh || row.modal_typical_use_case || "")
        : (row.modal_typical_use_case || ""),
      keyConstraints: constraints.join(", "),
      whatWeNeedToAssess: assessments.join(", "),
    },
  };
}

export function useWhyCards() {
  const { locale } = useI18n();

  return useQuery({
    queryKey: ["why-cards", locale],
    queryFn: async (): Promise<WhyCard[]> => {
      const { data, error } = await supabase
        .from("why_cards")
        .select("*")
        .eq("is_visible", true)
        .order("sort_order", { ascending: true });

      if (error || !data || data.length === 0) {
        // Return empty array - Index.tsx will use its own fallback
        return [];
      }

      return data.map((row) => mapDbToWhyCard(row as DbWhyCard, locale));
    },
    staleTime: 5 * 60 * 1000,
  });
}
