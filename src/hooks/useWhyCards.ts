import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
  card_gray_line: string;
  modal_engineering_anchor: string | null;
  modal_typical_use_case: string | null;
  modal_key_constraints: string[] | null;
  modal_what_we_need_to_assess: string[] | null;
  sort_order: number;
  is_visible: boolean;
}

function mapDbToWhyCard(row: DbWhyCard): WhyCard {
  const constraints = row.modal_key_constraints || [];
  const assessments = row.modal_what_we_need_to_assess || [];
  return {
    id: row.id,
    title: row.title,
    description: "", // Not stored in DB - can be derived or left empty
    microLine: row.card_gray_line,
    modalContent: {
      title: row.title,
      engineeringAnchor: row.modal_engineering_anchor || "",
      typicalUseCase: row.modal_typical_use_case || "",
      keyConstraints: constraints.join(", "),
      whatWeNeedToAssess: assessments.join(", "),
    },
  };
}

export function useWhyCards() {
  return useQuery({
    queryKey: ["why-cards"],
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

      return data.map((row) => mapDbToWhyCard(row as DbWhyCard));
    },
    staleTime: 5 * 60 * 1000,
  });
}
