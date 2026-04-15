import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface HomeBanner {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  linkUrl: string | null;
  linkText: string | null;
}

interface DbHomeBanner {
  id: string;
  title_en: string | null;
  subtitle_en: string | null;
  image_url: string;
  link_url: string | null;
  link_text_en: string | null;
  sort_order: number;
  is_visible: boolean;
}

function mapDbToBanner(row: DbHomeBanner): HomeBanner {
  return {
    id: row.id,
    title: row.title_en || "",
    subtitle: row.subtitle_en || "",
    imageUrl: row.image_url,
    linkUrl: row.link_url,
    linkText: row.link_text_en || null,
  };
}

export function useHomeBanners() {
  return useQuery({
    queryKey: ["home-banners"],
    queryFn: async (): Promise<HomeBanner[]> => {
      const { data, error } = await supabase
        .from("home_banners")
        .select("*")
        .eq("is_visible", true)
        .order("sort_order", { ascending: true });

      if (error || !data || data.length === 0) {
        return [];
      }

      return data.map((row) => mapDbToBanner(row as DbHomeBanner));
    },
    staleTime: 5 * 60 * 1000,
  });
}
