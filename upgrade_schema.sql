-- 1. App Settings (Global Application Master Control)
CREATE TABLE IF NOT EXISTS app_settings (
    app_name TEXT PRIMARY KEY,
    ads_enabled BOOLEAN DEFAULT true,
    features_enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Categories
CREATE TABLE IF NOT EXISTS categories (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  slug       TEXT NOT NULL UNIQUE,
  image_url  TEXT,
  is_active  BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Wallpapers
CREATE TABLE IF NOT EXISTS wallpapers (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title          TEXT NOT NULL,
  thumbnail_url  TEXT NOT NULL,
  full_res_url   TEXT NOT NULL,
  category_id    UUID REFERENCES categories(id) ON DELETE SET NULL,
  tags           JSONB DEFAULT '[]',
  download_count INTEGER DEFAULT 0,
  is_featured    BOOLEAN DEFAULT false,
  is_active      BOOLEAN DEFAULT true,
  created_at     TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_wallpapers_category ON wallpapers(category_id);
CREATE INDEX IF NOT EXISTS idx_wallpapers_featured ON wallpapers(is_featured);
CREATE INDEX IF NOT EXISTS idx_wallpapers_downloads ON wallpapers(download_count DESC);

-- 4. Ads Config (Specific Ad Networks per Application)
CREATE TABLE IF NOT EXISTS ads_config (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_name         TEXT NOT NULL,
  ad_network       TEXT NOT NULL CHECK (ad_network IN ('AppLovin','AdMob','UnityAds','IronSource','Other')),
  banner_id        TEXT,
  interstitial_id  TEXT,
  app_open_id      TEXT,
  is_active        BOOLEAN DEFAULT true,
  created_at       TIMESTAMPTZ DEFAULT now()
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable strict Row Level Security
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallpapers ENABLE ROW LEVEL SECURITY;
ALTER TABLE ads_config ENABLE ROW LEVEL SECURITY;

-- Allow your Frontend/Mobile App to read (GET) the public data freely
CREATE POLICY "Allow public SELECT on app_settings" ON app_settings FOR SELECT USING (true);
CREATE POLICY "Allow public SELECT on categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public SELECT on wallpapers" ON wallpapers FOR SELECT USING (true);
CREATE POLICY "Allow public SELECT on ads_config" ON ads_config FOR SELECT USING (true);

-- Restrict Insert/Update/Delete (Auth) strictly to the logged-in Admin only
CREATE POLICY "Allow authenticated ALL on app_settings" ON app_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated ALL on categories" ON categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated ALL on wallpapers" ON wallpapers FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated ALL on ads_config" ON ads_config FOR ALL TO authenticated USING (true) WITH CHECK (true);
