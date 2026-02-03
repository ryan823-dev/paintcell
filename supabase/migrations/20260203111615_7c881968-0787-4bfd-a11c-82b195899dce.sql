-- ============================================
-- CMS CONTENT TABLES WITH BILINGUAL SUPPORT
-- ============================================

-- 1. Site-wide settings (contact info, social links, footer)
CREATE TABLE public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Contact Information
  contact_email text,
  contact_phone text,
  contact_address_en text,
  contact_address_zh text,
  -- Social Links
  linkedin_url text,
  wechat_id text,
  -- Footer
  footer_tagline_en text,
  footer_tagline_zh text,
  copyright_text_en text,
  copyright_text_zh text,
  -- Timestamps
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Ensure only one row exists
CREATE UNIQUE INDEX site_settings_singleton ON public.site_settings ((true));

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read site_settings"
ON public.site_settings FOR SELECT
USING (true);

CREATE POLICY "Admin/editor can modify site_settings"
ON public.site_settings FOR ALL
TO authenticated
USING (is_admin_or_editor(auth.uid()))
WITH CHECK (is_admin_or_editor(auth.uid()));

-- 2. About Page Content
CREATE TABLE public.about_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Hero Section
  hero_title_en text,
  hero_title_zh text,
  hero_subtitle_en text,
  hero_subtitle_zh text,
  hero_image_url text,
  -- Mission Section
  mission_title_en text,
  mission_title_zh text,
  mission_body_en text,
  mission_body_zh text,
  -- Story Section
  story_title_en text,
  story_title_zh text,
  story_body_en text,
  story_body_zh text,
  story_image_url text,
  -- Values Section
  values_title_en text,
  values_title_zh text,
  -- Meta
  meta_title_en text,
  meta_title_zh text,
  meta_description_en text,
  meta_description_zh text,
  -- Timestamps
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX about_content_singleton ON public.about_content ((true));

ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read about_content"
ON public.about_content FOR SELECT
USING (true);

CREATE POLICY "Admin/editor can modify about_content"
ON public.about_content FOR ALL
TO authenticated
USING (is_admin_or_editor(auth.uid()))
WITH CHECK (is_admin_or_editor(auth.uid()));

-- 3. About Page Values (multiple items)
CREATE TABLE public.about_values (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_zh text,
  description_en text,
  description_zh text,
  icon text, -- lucide icon name
  sort_order integer NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.about_values ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read visible about_values"
ON public.about_values FOR SELECT
USING (is_visible = true);

CREATE POLICY "Admin/editor can read all about_values"
ON public.about_values FOR SELECT
TO authenticated
USING (is_admin_or_editor(auth.uid()));

CREATE POLICY "Admin/editor can modify about_values"
ON public.about_values FOR ALL
TO authenticated
USING (is_admin_or_editor(auth.uid()))
WITH CHECK (is_admin_or_editor(auth.uid()));

-- 4. Paint Cells Page Content
CREATE TABLE public.paint_cells_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Hero Section
  hero_title_en text,
  hero_title_zh text,
  hero_subtitle_en text,
  hero_subtitle_zh text,
  hero_image_url text,
  -- Overview Section
  overview_title_en text,
  overview_title_zh text,
  overview_body_en text,
  overview_body_zh text,
  -- CTA Section
  cta_title_en text,
  cta_title_zh text,
  cta_button_text_en text,
  cta_button_text_zh text,
  -- Meta
  meta_title_en text,
  meta_title_zh text,
  meta_description_en text,
  meta_description_zh text,
  -- Timestamps
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX paint_cells_content_singleton ON public.paint_cells_content ((true));

ALTER TABLE public.paint_cells_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read paint_cells_content"
ON public.paint_cells_content FOR SELECT
USING (true);

CREATE POLICY "Admin/editor can modify paint_cells_content"
ON public.paint_cells_content FOR ALL
TO authenticated
USING (is_admin_or_editor(auth.uid()))
WITH CHECK (is_admin_or_editor(auth.uid()));

-- 5. Paint Cells Features (multiple items)
CREATE TABLE public.paint_cells_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_zh text,
  description_en text,
  description_zh text,
  icon text,
  image_url text,
  sort_order integer NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.paint_cells_features ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read visible paint_cells_features"
ON public.paint_cells_features FOR SELECT
USING (is_visible = true);

CREATE POLICY "Admin/editor can read all paint_cells_features"
ON public.paint_cells_features FOR SELECT
TO authenticated
USING (is_admin_or_editor(auth.uid()));

CREATE POLICY "Admin/editor can modify paint_cells_features"
ON public.paint_cells_features FOR ALL
TO authenticated
USING (is_admin_or_editor(auth.uid()))
WITH CHECK (is_admin_or_editor(auth.uid()));

-- 6. Applications Page Content
CREATE TABLE public.applications_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Hero Section
  hero_title_en text,
  hero_title_zh text,
  hero_subtitle_en text,
  hero_subtitle_zh text,
  hero_image_url text,
  -- Intro Section
  intro_title_en text,
  intro_title_zh text,
  intro_body_en text,
  intro_body_zh text,
  -- Meta
  meta_title_en text,
  meta_title_zh text,
  meta_description_en text,
  meta_description_zh text,
  -- Timestamps
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX applications_content_singleton ON public.applications_content ((true));

ALTER TABLE public.applications_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read applications_content"
ON public.applications_content FOR SELECT
USING (true);

CREATE POLICY "Admin/editor can modify applications_content"
ON public.applications_content FOR ALL
TO authenticated
USING (is_admin_or_editor(auth.uid()))
WITH CHECK (is_admin_or_editor(auth.uid()));

-- 7. Application Industries (multiple items)
CREATE TABLE public.application_industries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en text NOT NULL,
  name_zh text,
  description_en text,
  description_zh text,
  image_url text,
  icon text,
  sort_order integer NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.application_industries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read visible application_industries"
ON public.application_industries FOR SELECT
USING (is_visible = true);

CREATE POLICY "Admin/editor can read all application_industries"
ON public.application_industries FOR SELECT
TO authenticated
USING (is_admin_or_editor(auth.uid()));

CREATE POLICY "Admin/editor can modify application_industries"
ON public.application_industries FOR ALL
TO authenticated
USING (is_admin_or_editor(auth.uid()))
WITH CHECK (is_admin_or_editor(auth.uid()));

-- 8. Quote Page Content
CREATE TABLE public.quote_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Hero Section
  hero_title_en text,
  hero_title_zh text,
  hero_subtitle_en text,
  hero_subtitle_zh text,
  -- Form Section
  form_intro_en text,
  form_intro_zh text,
  submit_button_text_en text,
  submit_button_text_zh text,
  -- Success Message
  success_title_en text,
  success_title_zh text,
  success_message_en text,
  success_message_zh text,
  -- Meta
  meta_title_en text,
  meta_title_zh text,
  meta_description_en text,
  meta_description_zh text,
  -- Timestamps
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX quote_content_singleton ON public.quote_content ((true));

ALTER TABLE public.quote_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read quote_content"
ON public.quote_content FOR SELECT
USING (true);

CREATE POLICY "Admin/editor can modify quote_content"
ON public.quote_content FOR ALL
TO authenticated
USING (is_admin_or_editor(auth.uid()))
WITH CHECK (is_admin_or_editor(auth.uid()));

-- 9. Expand home_content with bilingual support and more fields
ALTER TABLE public.home_content
ADD COLUMN IF NOT EXISTS hero_title_zh text,
ADD COLUMN IF NOT EXISTS hero_subtitle_zh text,
ADD COLUMN IF NOT EXISTS hero_audience_line_zh text,
ADD COLUMN IF NOT EXISTS cta_configure_hint_zh text,
ADD COLUMN IF NOT EXISTS cta_consult_hint_zh text,
ADD COLUMN IF NOT EXISTS hero_image_url text,
ADD COLUMN IF NOT EXISTS hero_cta_primary_text_en text DEFAULT 'Configure Your Cell',
ADD COLUMN IF NOT EXISTS hero_cta_primary_text_zh text,
ADD COLUMN IF NOT EXISTS hero_cta_secondary_text_en text DEFAULT 'Talk to an Engineer',
ADD COLUMN IF NOT EXISTS hero_cta_secondary_text_zh text,
ADD COLUMN IF NOT EXISTS meta_title_en text,
ADD COLUMN IF NOT EXISTS meta_title_zh text,
ADD COLUMN IF NOT EXISTS meta_description_en text,
ADD COLUMN IF NOT EXISTS meta_description_zh text;

-- 10. Homepage Banner/Carousel Items
CREATE TABLE public.home_banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text,
  title_zh text,
  subtitle_en text,
  subtitle_zh text,
  image_url text NOT NULL,
  link_url text,
  link_text_en text,
  link_text_zh text,
  sort_order integer NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.home_banners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read visible home_banners"
ON public.home_banners FOR SELECT
USING (is_visible = true);

CREATE POLICY "Admin/editor can read all home_banners"
ON public.home_banners FOR SELECT
TO authenticated
USING (is_admin_or_editor(auth.uid()));

CREATE POLICY "Admin/editor can modify home_banners"
ON public.home_banners FOR ALL
TO authenticated
USING (is_admin_or_editor(auth.uid()))
WITH CHECK (is_admin_or_editor(auth.uid()));

-- 11. Expand why_cards with bilingual support
ALTER TABLE public.why_cards
ADD COLUMN IF NOT EXISTS title_zh text,
ADD COLUMN IF NOT EXISTS card_gray_line_zh text,
ADD COLUMN IF NOT EXISTS modal_typical_use_case_zh text,
ADD COLUMN IF NOT EXISTS modal_engineering_anchor_zh text,
ADD COLUMN IF NOT EXISTS modal_key_constraints_zh text[],
ADD COLUMN IF NOT EXISTS modal_what_we_need_to_assess_zh text[],
ADD COLUMN IF NOT EXISTS is_visible boolean NOT NULL DEFAULT true;

-- 12. Expand case_studies with bilingual support
ALTER TABLE public.case_studies
ADD COLUMN IF NOT EXISTS title_zh text,
ADD COLUMN IF NOT EXISTS summary_zh text,
ADD COLUMN IF NOT EXISTS answer_box_zh text,
ADD COLUMN IF NOT EXISTS goals_zh text,
ADD COLUMN IF NOT EXISTS meta_title_zh text,
ADD COLUMN IF NOT EXISTS meta_description_zh text;

-- 13. Expand resources_posts with bilingual support
ALTER TABLE public.resources_posts
ADD COLUMN IF NOT EXISTS title_zh text,
ADD COLUMN IF NOT EXISTS summary_zh text,
ADD COLUMN IF NOT EXISTS body_zh text,
ADD COLUMN IF NOT EXISTS answer_box_zh text,
ADD COLUMN IF NOT EXISTS meta_title_zh text,
ADD COLUMN IF NOT EXISTS meta_description_zh text;

-- 14. Create storage bucket for CMS images
INSERT INTO storage.buckets (id, name, public)
VALUES ('cms-images', 'cms-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for cms-images bucket
CREATE POLICY "Public can view cms images"
ON storage.objects FOR SELECT
USING (bucket_id = 'cms-images');

CREATE POLICY "Admin/editor can upload cms images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'cms-images' 
  AND is_admin_or_editor(auth.uid())
);

CREATE POLICY "Admin/editor can update cms images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'cms-images' 
  AND is_admin_or_editor(auth.uid())
);

CREATE POLICY "Admin/editor can delete cms images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'cms-images' 
  AND is_admin_or_editor(auth.uid())
);

-- Insert default rows for singleton tables
INSERT INTO public.site_settings (contact_email) VALUES ('info@example.com')
ON CONFLICT DO NOTHING;

INSERT INTO public.about_content (hero_title_en) VALUES ('About Us')
ON CONFLICT DO NOTHING;

INSERT INTO public.paint_cells_content (hero_title_en) VALUES ('Paint Cell Solutions')
ON CONFLICT DO NOTHING;

INSERT INTO public.applications_content (hero_title_en) VALUES ('Applications')
ON CONFLICT DO NOTHING;

INSERT INTO public.quote_content (hero_title_en) VALUES ('Get a Quote')
ON CONFLICT DO NOTHING;