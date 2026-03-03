import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/i18n";

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
  title_zh: string | null;
  subtitle_en: string | null;
  subtitle_zh: string | null;
  image_url: string;
  link_url: string | null;
  link_text_en: string | null;
  link_text_zh: string | null;
  sort_order: number;
  is_visible: boolean;
}

function mapDbToBanner(row: DbHomeBanner, locale: string): HomeBanner {
  const isZh = locale === "zh";
  return {
    id: row.id,
    title: isZh ? (row.title_zh || row.title_en || "") : (row.title_en || ""),
    subtitle: isZh ? (row.subtitle_zh || row.subtitle_en || "") : (row.subtitle_en || ""),
    imageUrl: row.image_url,
    linkUrl: row.link_url,
    linkText: isZh ? (row.link_text_zh || row.link_text_en || null) : (row.link_text_en || null),
  };
}

export function useHomeBanners() {
  const { locale } = useI18n();

  return useQuery({
    queryKey: ["home-banners", locale],
    queryFn: async (): Promise<HomeBanner[]> => {
      const { data, error } = await supabase
        .from("home_banners")
        .select("*")
        .eq("is_visible", true)
        .order("sort_order", { ascending: true });

      if (error || !data || data.length === 0) {
        return [];
      }

      return data.map((row) => mapDbToBanner(row as DbHomeBanner, locale));
    },
    staleTime: 5 * 60 * 1000,
  });
}
