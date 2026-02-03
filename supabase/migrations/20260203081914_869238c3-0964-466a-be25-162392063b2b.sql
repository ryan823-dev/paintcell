-- =============================================
-- ADMIN CONSOLE DATABASE SCHEMA
-- =============================================

-- Create role enum for admin/editor access
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

-- User roles table (for admin/editor permissions)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to check if user is admin or editor
CREATE OR REPLACE FUNCTION public.is_admin_or_editor(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('admin', 'editor')
  )
$$;

-- RLS policy for user_roles (only admins can manage roles)
CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- HOME CONTENT TABLE (single row)
-- =============================================
CREATE TABLE public.home_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_title TEXT NOT NULL DEFAULT 'Turnkey Paint Cell Solutions',
  hero_subtitle TEXT NOT NULL DEFAULT 'Built for precision liquid finishing',
  hero_audience_line TEXT NOT NULL DEFAULT 'For industrial manufacturers who need repeatable, reliable results',
  cta_configure_hint TEXT NOT NULL DEFAULT 'Start your paint cell configuration',
  cta_consult_hint TEXT NOT NULL DEFAULT 'Talk to an automation engineer',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.home_content ENABLE ROW LEVEL SECURITY;

-- Public can read home_content
CREATE POLICY "Public can read home_content"
ON public.home_content
FOR SELECT
TO anon, authenticated
USING (true);

-- Only admin/editor can modify home_content
CREATE POLICY "Admin/editor can modify home_content"
ON public.home_content
FOR ALL
TO authenticated
USING (public.is_admin_or_editor(auth.uid()))
WITH CHECK (public.is_admin_or_editor(auth.uid()));

-- Insert default row
INSERT INTO public.home_content (
  hero_title,
  hero_subtitle,
  hero_audience_line,
  cta_configure_hint,
  cta_consult_hint
) VALUES (
  'Turnkey Paint Cell Solutions',
  'Purpose-built robotic paint cells for industrial liquid finishing',
  'For OEMs and contract manufacturers who need repeatable, automated coating with minimal downtime',
  'Start your paint cell configuration',
  'Schedule a consultation with our engineering team'
);

-- =============================================
-- WHY CARDS TABLE (4 rows)
-- =============================================
CREATE TABLE public.why_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order INTEGER NOT NULL DEFAULT 0,
  title TEXT NOT NULL,
  card_gray_line TEXT NOT NULL,
  modal_engineering_anchor TEXT,
  modal_typical_use_case TEXT,
  modal_key_constraints TEXT[], -- bullet list
  modal_what_we_need_to_assess TEXT[], -- bullet list
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.why_cards ENABLE ROW LEVEL SECURITY;

-- Public can read why_cards
CREATE POLICY "Public can read why_cards"
ON public.why_cards
FOR SELECT
TO anon, authenticated
USING (true);

-- Only admin/editor can modify why_cards
CREATE POLICY "Admin/editor can modify why_cards"
ON public.why_cards
FOR ALL
TO authenticated
USING (public.is_admin_or_editor(auth.uid()))
WITH CHECK (public.is_admin_or_editor(auth.uid()));

-- Insert default 4 cards
INSERT INTO public.why_cards (sort_order, title, card_gray_line, modal_engineering_anchor, modal_typical_use_case, modal_key_constraints, modal_what_we_need_to_assess) VALUES
(1, 'Single-Part Precision', 'High-value parts requiring perfect finish', 'Engineered for complex geometries', 'Aerospace components, medical devices', ARRAY['Tight tolerances', 'Zero defects acceptable'], ARRAY['Part geometry', 'Surface prep requirements']),
(2, 'Multi-Part Throughput', 'Batch processing for production volumes', 'Optimized for takt time efficiency', 'Automotive trim, consumer goods', ARRAY['Consistent cycle times', 'Color changeover speed'], ARRAY['Production volume', 'Part mix variety']),
(3, 'Retrofit Integration', 'Add automation to existing lines', 'Designed for brownfield installation', 'Upgrading manual spray booths', ARRAY['Space constraints', 'Existing infrastructure'], ARRAY['Current layout', 'Utility availability']),
(4, 'Greenfield Cells', 'Purpose-built from the ground up', 'Complete turnkey solutions', 'New manufacturing facilities', ARRAY['Full system design', 'End-to-end responsibility'], ARRAY['Facility requirements', 'Timeline constraints']);

-- =============================================
-- CASE STUDIES TABLE
-- =============================================
CREATE TYPE public.content_status AS ENUM ('draft', 'review', 'published');

CREATE TABLE public.case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  summary TEXT,
  industry TEXT,
  part_type TEXT,
  paint_type TEXT DEFAULT 'liquid',
  goals TEXT,
  constraints TEXT[], -- bullet list
  solution_scope TEXT[], -- bullet list
  validation_acceptance TEXT[], -- bullet list
  images TEXT[], -- up to 3 image URLs
  answer_box TEXT, -- 2-4 sentences for SEO
  meta_title TEXT,
  meta_description TEXT,
  status content_status NOT NULL DEFAULT 'draft',
  published_at TIMESTAMP WITH TIME ZONE,
  last_ai_generation_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

-- Public can read ONLY published case_studies
CREATE POLICY "Public can read published case_studies"
ON public.case_studies
FOR SELECT
TO anon
USING (status = 'published');

-- Authenticated users can read all case_studies (for console)
CREATE POLICY "Authenticated can read all case_studies"
ON public.case_studies
FOR SELECT
TO authenticated
USING (public.is_admin_or_editor(auth.uid()) OR status = 'published');

-- Only admin/editor can insert/update/delete
CREATE POLICY "Admin/editor can modify case_studies"
ON public.case_studies
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admin/editor can update case_studies"
ON public.case_studies
FOR UPDATE
TO authenticated
USING (public.is_admin_or_editor(auth.uid()))
WITH CHECK (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admin/editor can delete case_studies"
ON public.case_studies
FOR DELETE
TO authenticated
USING (public.is_admin_or_editor(auth.uid()));

-- =============================================
-- RESOURCES POSTS TABLE
-- =============================================
CREATE TYPE public.resource_category AS ENUM ('learning-center', 'tools-templates', 'glossary');

CREATE TABLE public.resources_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  summary TEXT,
  body TEXT, -- markdown content
  answer_box TEXT, -- 2-4 sentences for SEO
  category resource_category,
  meta_title TEXT,
  meta_description TEXT,
  status content_status NOT NULL DEFAULT 'draft',
  published_at TIMESTAMP WITH TIME ZONE,
  last_ai_generation_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.resources_posts ENABLE ROW LEVEL SECURITY;

-- Public can read ONLY published resources_posts
CREATE POLICY "Public can read published resources_posts"
ON public.resources_posts
FOR SELECT
TO anon
USING (status = 'published');

-- Authenticated admin/editor can read all
CREATE POLICY "Authenticated can read all resources_posts"
ON public.resources_posts
FOR SELECT
TO authenticated
USING (public.is_admin_or_editor(auth.uid()) OR status = 'published');

-- Only admin/editor can insert/update/delete
CREATE POLICY "Admin/editor can insert resources_posts"
ON public.resources_posts
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admin/editor can update resources_posts"
ON public.resources_posts
FOR UPDATE
TO authenticated
USING (public.is_admin_or_editor(auth.uid()))
WITH CHECK (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admin/editor can delete resources_posts"
ON public.resources_posts
FOR DELETE
TO authenticated
USING (public.is_admin_or_editor(auth.uid()));

-- =============================================
-- LEGAL PAGES TABLE
-- =============================================
CREATE TABLE public.legal_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  privacy_policy TEXT,
  terms_of_use TEXT,
  cookie_policy TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.legal_pages ENABLE ROW LEVEL SECURITY;

-- Public can read legal_pages
CREATE POLICY "Public can read legal_pages"
ON public.legal_pages
FOR SELECT
TO anon, authenticated
USING (true);

-- Only admin/editor can modify legal_pages
CREATE POLICY "Admin/editor can modify legal_pages"
ON public.legal_pages
FOR ALL
TO authenticated
USING (public.is_admin_or_editor(auth.uid()))
WITH CHECK (public.is_admin_or_editor(auth.uid()));

-- Insert default row with placeholder content
INSERT INTO public.legal_pages (privacy_policy, terms_of_use, cookie_policy) VALUES (
  '# Privacy Policy\n\nThis privacy policy describes how TD PaintCell collects and uses your information.',
  '# Terms of Use\n\nBy using this website, you agree to these terms and conditions.',
  '# Cookie Policy\n\nThis website uses cookies to improve your experience.'
);

-- =============================================
-- TRIGGERS FOR updated_at
-- =============================================
CREATE TRIGGER update_home_content_updated_at
BEFORE UPDATE ON public.home_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_why_cards_updated_at
BEFORE UPDATE ON public.why_cards
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_case_studies_updated_at
BEFORE UPDATE ON public.case_studies
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_resources_posts_updated_at
BEFORE UPDATE ON public.resources_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_legal_pages_updated_at
BEFORE UPDATE ON public.legal_pages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();