ALTER TABLE resources_posts
  ADD COLUMN IF NOT EXISTS vertax_asset_id TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS featured_image_url TEXT;

CREATE INDEX IF NOT EXISTS idx_resources_posts_vertax_asset_id
  ON resources_posts (vertax_asset_id);