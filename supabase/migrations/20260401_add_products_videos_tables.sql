-- =============================================
-- ADD PRODUCTS AND VIDEOS CMS TABLES
-- Lightweight Supabase-based CMS extension
-- =============================================

-- 1. Create product_category enum
CREATE TYPE public.product_category AS ENUM (
  'rotary-bells',
  'spray-guns',
  'paint-pumps',
  'control-systems',
  'color-change',
  'cleaning-systems'
);

-- 2. Create video_category enum
CREATE TYPE public.video_category AS ENUM (
  'cleaning',
  'process',
  'equipment',
  'case-study',
  'knowledge'
);

-- 3. Create products_posts table (English-only, no _zh fields)
CREATE TABLE public.products_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  summary TEXT,
  body TEXT,
  category public.product_category,
  subcategory TEXT,
  featured_image_url TEXT,
  gallery_images TEXT[],
  brands TEXT[],
  specifications JSONB,
  status public.content_status DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  meta_title TEXT,
  meta_description TEXT,
  sort_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Create videos table
CREATE TABLE public.videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  category public.video_category,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration_seconds INTEGER,
  keywords TEXT[],
  status public.content_status DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  meta_title TEXT,
  meta_description TEXT,
  transcript TEXT,
  sort_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Add indexes for efficient queries
CREATE INDEX idx_products_posts_category ON public.products_posts (category) WHERE status = 'published';
CREATE INDEX idx_products_posts_slug ON public.products_posts (slug);
CREATE INDEX idx_products_posts_status ON public.products_posts (status);

CREATE INDEX idx_videos_category ON public.videos (category) WHERE status = 'published';
CREATE INDEX idx_videos_slug ON public.videos (slug);
CREATE INDEX idx_videos_video_id ON public.videos (video_id);
CREATE INDEX idx_videos_status ON public.videos (status);

-- 6. RLS Policies for products_posts
ALTER TABLE public.products_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published products" 
ON public.products_posts FOR SELECT
USING (status = 'published' AND is_visible = true);

CREATE POLICY "Admin/editor can modify products" 
ON public.products_posts FOR ALL
TO authenticated
USING (is_admin_or_editor(auth.uid()))
WITH CHECK (is_admin_or_editor(auth.uid()));

-- 7. RLS Policies for videos
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published videos" 
ON public.videos FOR SELECT
USING (status = 'published' AND is_visible = true);

CREATE POLICY "Admin/editor can modify videos" 
ON public.videos FOR ALL
TO authenticated
USING (is_admin_or_editor(auth.uid()))
WITH CHECK (is_admin_or_editor(auth.uid()));

-- 8. Add updated_at trigger for products
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_posts_updated_at
BEFORE UPDATE ON public.products_posts
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_videos_updated_at
BEFORE UPDATE ON public.videos
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 9. Comments for documentation
COMMENT ON TABLE public.products_posts IS 'Product catalog entries for CMS management. English-only content for export market.';
COMMENT ON TABLE public.videos IS 'Video library metadata for OSS-hosted and external videos. English-only content for export market.';

COMMENT ON COLUMN public.products_posts.specifications IS 'JSONB structured technical specifications: {"key": "value"} pairs for specs table display';
COMMENT ON COLUMN public.videos.video_url IS 'OSS path (e.g., videos/knowledge/demo.mp4) or external URL (YouTube/Vimeo)';
COMMENT ON COLUMN public.videos.transcript IS 'Optional transcript for accessibility and SEO';