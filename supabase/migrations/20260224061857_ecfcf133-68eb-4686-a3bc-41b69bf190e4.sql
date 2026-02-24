
-- Industry pages table
CREATE TABLE public.industry_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  status public.content_status NOT NULL DEFAULT 'draft',
  sort_order integer NOT NULL DEFAULT 0,
  coming_soon boolean NOT NULL DEFAULT false,
  industry_label text NOT NULL,
  meta_title text,
  meta_description text,
  hero_title text,
  hero_subtitle text,
  hero_image text,
  cta_text text,
  example_prompt text,
  ai_context jsonb DEFAULT '{}',
  pain_points jsonb DEFAULT '[]',
  system_modules jsonb DEFAULT '[]',
  production_config jsonb DEFAULT '{}',
  roi_metrics jsonb DEFAULT '[]',
  case_references jsonb DEFAULT '[]',
  faqs jsonb DEFAULT '[]',
  -- ZH translations
  industry_label_zh text,
  meta_title_zh text,
  meta_description_zh text,
  hero_title_zh text,
  hero_subtitle_zh text,
  cta_text_zh text,
  pain_points_zh jsonb DEFAULT '[]',
  system_modules_zh jsonb DEFAULT '[]',
  production_config_zh jsonb DEFAULT '{}',
  roi_metrics_zh jsonb DEFAULT '[]',
  case_references_zh jsonb DEFAULT '[]',
  faqs_zh jsonb DEFAULT '[]',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.industry_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin/editor can modify industry_pages" ON public.industry_pages
  FOR ALL TO authenticated
  USING (is_admin_or_editor(auth.uid()))
  WITH CHECK (is_admin_or_editor(auth.uid()));

CREATE POLICY "Public can read published industry_pages" ON public.industry_pages
  FOR SELECT TO anon, authenticated
  USING (status = 'published');

-- Solution pages table
CREATE TABLE public.solution_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  status public.content_status NOT NULL DEFAULT 'draft',
  sort_order integer NOT NULL DEFAULT 0,
  meta_title text,
  meta_description text,
  hero_title text,
  hero_subtitle text,
  definition text,
  definition_secondary text,
  why_title text,
  why_intro text,
  why_items jsonb DEFAULT '[]',
  scope_intro text,
  scope_items jsonb DEFAULT '[]',
  scope_sub_sections jsonb DEFAULT '[]',
  components_intro text,
  component_items jsonb DEFAULT '[]',
  process_steps jsonb DEFAULT '[]',
  application_scope_intro text,
  application_scope jsonb DEFAULT '[]',
  config_options jsonb DEFAULT '[]',
  technical_parameters_intro text,
  technical_parameters jsonb DEFAULT '[]',
  constraints jsonb DEFAULT '[]',
  atex_intro text,
  atex_items jsonb DEFAULT '[]',
  roi_methodology text,
  roi_metrics jsonb DEFAULT '[]',
  deployment_note text,
  timeline jsonb DEFAULT '[]',
  faqs jsonb DEFAULT '[]',
  related_industries jsonb DEFAULT '[]',
  related_knowledge jsonb DEFAULT '[]',
  eeat jsonb DEFAULT '{}',
  -- ZH translations
  meta_title_zh text,
  meta_description_zh text,
  hero_title_zh text,
  hero_subtitle_zh text,
  definition_zh text,
  definition_secondary_zh text,
  why_title_zh text,
  why_intro_zh text,
  why_items_zh jsonb DEFAULT '[]',
  scope_intro_zh text,
  scope_items_zh jsonb DEFAULT '[]',
  process_steps_zh jsonb DEFAULT '[]',
  faqs_zh jsonb DEFAULT '[]',
  roi_methodology_zh text,
  deployment_note_zh text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.solution_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin/editor can modify solution_pages" ON public.solution_pages
  FOR ALL TO authenticated
  USING (is_admin_or_editor(auth.uid()))
  WITH CHECK (is_admin_or_editor(auth.uid()));

CREATE POLICY "Public can read published solution_pages" ON public.solution_pages
  FOR SELECT TO anon, authenticated
  USING (status = 'published');
