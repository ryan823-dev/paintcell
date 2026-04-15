-- Add Vertax content push integration fields to resources_posts
ALTER TABLE resources_posts
  ADD COLUMN IF NOT EXISTS vertax_asset_id TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS featured_image_url TEXT;

-- Index for fast lookup by vertax_asset_id
CREATE INDEX IF NOT EXISTS idx_resources_posts_vertax_asset_id
  ON resources_posts (vertax_asset_id)
  WHERE vertax_asset_id IS NOT NULL;

-- Allow service role to upsert via vertax_asset_id
-- (RLS already allows service_role full access by default)
