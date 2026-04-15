-- =============================================
-- DROP ALL _zh COLUMNS (ENGLISH-ONLY CONTENT)
-- Remove bilingual fields for export market
-- =============================================

-- Note: Console UI labels remain bilingual (hardcoded in .tsx files)
-- This migration only removes database content fields

-- 1. site_settings table
ALTER TABLE public.site_settings
DROP COLUMN IF EXISTS contact_address_zh,
DROP COLUMN IF EXISTS footer_tagline_zh,
DROP COLUMN IF EXISTS copyright_text_zh;

-- 2. home_content table
ALTER TABLE public.home_content
DROP COLUMN IF EXISTS hero_title_zh,
DROP COLUMN IF EXISTS hero_subtitle_zh,
DROP COLUMN IF EXISTS hero_audience_line_zh,
DROP COLUMN IF EXISTS cta_configure_hint_zh,
DROP COLUMN IF EXISTS cta_consult_hint_zh,
DROP COLUMN IF EXISTS hero_cta_primary_text_zh,
DROP COLUMN IF EXISTS hero_cta_secondary_text_zh,
DROP COLUMN IF EXISTS meta_title_zh,
DROP COLUMN IF EXISTS meta_description_zh;

-- 3. home_banners table
ALTER TABLE public.home_banners
DROP COLUMN IF EXISTS title_zh,
DROP COLUMN IF EXISTS subtitle_zh,
DROP COLUMN IF EXISTS link_text_zh;

-- 4. why_cards table
ALTER TABLE public.why_cards
DROP COLUMN IF EXISTS title_zh,
DROP COLUMN IF EXISTS card_gray_line_zh,
DROP COLUMN IF EXISTS modal_typical_use_case_zh,
DROP COLUMN IF EXISTS modal_engineering_anchor_zh,
DROP COLUMN IF EXISTS modal_key_constraints_zh,
DROP COLUMN IF EXISTS modal_what_we_need_to_assess_zh;

-- 5. about_content table
ALTER TABLE public.about_content
DROP COLUMN IF EXISTS hero_title_zh,
DROP COLUMN IF EXISTS hero_subtitle_zh,
DROP COLUMN IF EXISTS mission_title_zh,
DROP COLUMN IF EXISTS mission_body_zh,
DROP COLUMN IF EXISTS story_title_zh,
DROP COLUMN IF EXISTS story_body_zh,
DROP COLUMN IF EXISTS values_title_zh,
DROP COLUMN IF EXISTS meta_title_zh,
DROP COLUMN IF EXISTS meta_description_zh;

-- 6. about_values table
ALTER TABLE public.about_values
DROP COLUMN IF EXISTS title_zh,
DROP COLUMN IF EXISTS description_zh;

-- 7. paint_cells_content table
ALTER TABLE public.paint_cells_content
DROP COLUMN IF EXISTS hero_title_zh,
DROP COLUMN IF EXISTS hero_subtitle_zh,
DROP COLUMN IF EXISTS overview_title_zh,
DROP COLUMN IF EXISTS overview_body_zh,
DROP COLUMN IF EXISTS cta_title_zh,
DROP COLUMN IF EXISTS cta_button_text_zh,
DROP COLUMN IF EXISTS meta_title_zh,
DROP COLUMN IF EXISTS meta_description_zh;

-- 8. paint_cells_features table
ALTER TABLE public.paint_cells_features
DROP COLUMN IF EXISTS title_zh,
DROP COLUMN IF EXISTS description_zh;

-- 9. applications_content table
ALTER TABLE public.applications_content
DROP COLUMN IF EXISTS hero_title_zh,
DROP COLUMN IF EXISTS hero_subtitle_zh,
DROP COLUMN IF EXISTS intro_title_zh,
DROP COLUMN IF EXISTS intro_body_zh,
DROP COLUMN IF EXISTS meta_title_zh,
DROP COLUMN IF EXISTS meta_description_zh;

-- 10. application_industries table
ALTER TABLE public.application_industries
DROP COLUMN IF EXISTS name_zh,
DROP COLUMN IF EXISTS description_zh;

-- 11. quote_content table
ALTER TABLE public.quote_content
DROP COLUMN IF EXISTS hero_title_zh,
DROP COLUMN IF EXISTS hero_subtitle_zh,
DROP COLUMN IF EXISTS form_intro_zh,
DROP COLUMN IF EXISTS submit_button_text_zh,
DROP COLUMN IF EXISTS success_title_zh,
DROP COLUMN IF EXISTS success_message_zh,
DROP COLUMN IF EXISTS meta_title_zh,
DROP COLUMN IF EXISTS meta_description_zh;

-- 12. case_studies table
ALTER TABLE public.case_studies
DROP COLUMN IF EXISTS title_zh,
DROP COLUMN IF EXISTS summary_zh,
DROP COLUMN IF EXISTS answer_box_zh,
DROP COLUMN IF EXISTS goals_zh,
DROP COLUMN IF EXISTS meta_title_zh,
DROP COLUMN IF EXISTS meta_description_zh;

-- 13. resources_posts table
ALTER TABLE public.resources_posts
DROP COLUMN IF EXISTS title_zh,
DROP COLUMN IF EXISTS summary_zh,
DROP COLUMN IF EXISTS body_zh,
DROP COLUMN IF EXISTS answer_box_zh,
DROP COLUMN IF EXISTS meta_title_zh,
DROP COLUMN IF EXISTS meta_description_zh;

-- 14. industry_pages table
ALTER TABLE public.industry_pages
DROP COLUMN IF EXISTS industry_label_zh,
DROP COLUMN IF EXISTS meta_title_zh,
DROP COLUMN IF EXISTS meta_description_zh,
DROP COLUMN IF EXISTS hero_title_zh,
DROP COLUMN IF EXISTS hero_subtitle_zh,
DROP COLUMN IF EXISTS cta_text_zh,
DROP COLUMN IF EXISTS pain_points_zh,
DROP COLUMN IF EXISTS system_modules_zh,
DROP COLUMN IF EXISTS production_config_zh,
DROP COLUMN IF EXISTS roi_metrics_zh,
DROP COLUMN IF EXISTS case_references_zh,
DROP COLUMN IF EXISTS faqs_zh;

-- 15. solution_pages table
ALTER TABLE public.solution_pages
DROP COLUMN IF EXISTS meta_title_zh,
DROP COLUMN IF EXISTS meta_description_zh,
DROP COLUMN IF EXISTS hero_title_zh,
DROP COLUMN IF EXISTS hero_subtitle_zh,
DROP COLUMN IF EXISTS definition_zh,
DROP COLUMN IF EXISTS definition_secondary_zh,
DROP COLUMN IF EXISTS why_title_zh,
DROP COLUMN IF EXISTS why_intro_zh,
DROP COLUMN IF EXISTS why_items_zh,
DROP COLUMN IF EXISTS scope_intro_zh,
DROP COLUMN IF EXISTS scope_items_zh,
DROP COLUMN IF EXISTS process_steps_zh,
DROP COLUMN IF EXISTS faqs_zh,
DROP COLUMN IF EXISTS roi_methodology_zh,
DROP COLUMN IF EXISTS deployment_note_zh;

-- 16. legal_pages table (if has _zh fields - check schema)
-- Note: legal_pages typically doesn't have _zh fields, skip if not exists

-- Verification comment
COMMENT ON SCHEMA public IS 'Schema updated: All _zh columns dropped for English-only export market. Console UI remains bilingual for operations team.';