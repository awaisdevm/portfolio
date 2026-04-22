-- Add view_count column and RPC for atomic increments
ALTER TABLE wallpapers ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;

-- Function to increment view count atomically
CREATE OR REPLACE FUNCTION increment_view_count(wallpaper_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE wallpapers
  SET view_count = view_count + 1
  WHERE id = wallpaper_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
