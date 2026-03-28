-- =============================================
-- FAQ PAGES TABLE
-- Independent FAQ pages with multiple Q&A items
-- =============================================

CREATE TABLE public.faq_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  title_zh text,
  summary text,
  summary_zh text,
  faqs jsonb DEFAULT '[]'::jsonb,
  faqs_zh jsonb DEFAULT '[]'::jsonb,
  meta_title text,
  meta_title_zh text,
  meta_description text,
  meta_description_zh text,
  status public.content_status NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.faq_pages ENABLE ROW LEVEL SECURITY;

-- Public can read ONLY published faq_pages
CREATE POLICY "Public can read published faq_pages"
ON public.faq_pages
FOR SELECT
TO anon
USING (status = 'published');

-- Authenticated admin/editor can read all
CREATE POLICY "Authenticated can read all faq_pages"
ON public.faq_pages
FOR SELECT
TO authenticated
USING (public.is_admin_or_editor(auth.uid()) OR status = 'published');

-- Only admin/editor can insert
CREATE POLICY "Admin/editor can insert faq_pages"
ON public.faq_pages
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin_or_editor(auth.uid()));

-- Only admin/editor can update
CREATE POLICY "Admin/editor can update faq_pages"
ON public.faq_pages
FOR UPDATE
TO authenticated
USING (public.is_admin_or_editor(auth.uid()))
WITH CHECK (public.is_admin_or_editor(auth.uid()));

-- Only admin/editor can delete
CREATE POLICY "Admin/editor can delete faq_pages"
ON public.faq_pages
FOR DELETE
TO authenticated
USING (public.is_admin_or_editor(auth.uid()));

-- Add updated_at trigger
CREATE TRIGGER update_faq_pages_updated_at
BEFORE UPDATE ON public.faq_pages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Comment on table
COMMENT ON TABLE public.faq_pages IS 'FAQ pages with multiple Q&A items stored as JSONB arrays';
COMMENT ON COLUMN public.faq_pages.faqs IS 'Array of {question: string, answer: string} objects';
COMMENT ON COLUMN public.faq_pages.faqs_zh IS 'Chinese translation of FAQ items';