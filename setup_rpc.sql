-- Run this in your Supabase SQL Editor to enable download tracking
CREATE OR REPLACE FUNCTION increment_download_count(wallpaper_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE wallpapers
  SET download_count = download_count + 1
  WHERE id = wallpaper_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
