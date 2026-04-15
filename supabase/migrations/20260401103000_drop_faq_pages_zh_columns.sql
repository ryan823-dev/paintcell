-- =============================================
-- DROP faq_pages _zh COLUMNS
-- Bring faq_pages in line with the English-only schema
-- =============================================

ALTER TABLE public.faq_pages
DROP COLUMN IF EXISTS title_zh,
DROP COLUMN IF EXISTS summary_zh,
DROP COLUMN IF EXISTS faqs_zh,
DROP COLUMN IF EXISTS meta_title_zh,
DROP COLUMN IF EXISTS meta_description_zh;
