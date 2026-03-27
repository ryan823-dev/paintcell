-- =============================================
-- UPDATE RESOURCES STRUCTURE
-- Fix: Add new categories and subcategory support
-- =============================================

-- 1. Add new enum values to resource_category
ALTER TYPE public.resource_category ADD VALUE IF NOT EXISTS 'engineering-library';
ALTER TYPE public.resource_category ADD VALUE IF NOT EXISTS 'standards-compliance';

-- 2. Update existing 'learning-center' to 'engineering-library'
UPDATE public.resources_posts
SET category = 'engineering-library'
WHERE category = 'learning-center';

-- 3. Add subcategory column for supporting nested content
ALTER TABLE public.resources_posts
ADD COLUMN IF NOT EXISTS subcategory TEXT;

-- 4. Create index for category + subcategory queries
CREATE INDEX IF NOT EXISTS idx_resources_posts_category_subcategory
ON public.resources_posts (category, subcategory)
WHERE status = 'published';

-- 5. Add featured_image_url if not exists (from vertax push)
ALTER TABLE public.resources_posts
ADD COLUMN IF NOT EXISTS featured_image_url TEXT;

-- 6. Add bilingual fields if not exists
ALTER TABLE public.resources_posts
ADD COLUMN IF NOT EXISTS title_zh TEXT,
ADD COLUMN IF NOT EXISTS summary_zh TEXT,
ADD COLUMN IF NOT EXISTS body_zh TEXT,
ADD COLUMN IF NOT EXISTS answer_box_zh TEXT,
ADD COLUMN IF NOT EXISTS meta_title_zh TEXT,
ADD COLUMN IF NOT EXISTS meta_description_zh TEXT;

-- 7. Add published_at if not exists
ALTER TABLE public.resources_posts
ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;

-- Comment explaining subcategory usage
COMMENT ON COLUMN public.resources_posts.subcategory IS 'Subcategory for nested content:
  - engineering-library: insights, guides-checklists, faqs
  - standards-compliance: ventilation-airflow, voc-solvent-handling, grounding-static-control
  - glossary: null (no subcategories)
  - tools-templates: null (no subcategories)';