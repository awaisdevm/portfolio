-- Categories
CREATE TABLE categories (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  slug       TEXT NOT NULL UNIQUE,
  image_url  TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Wallpapers
CREATE TABLE wallpapers (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title          TEXT NOT NULL,
  thumbnail_url  TEXT NOT NULL,
  full_res_url   TEXT NOT NULL,
  category_id    UUID REFERENCES categories(id) ON DELETE SET NULL,
  tags           JSONB DEFAULT '[]',
  download_count INTEGER DEFAULT 0,
  is_featured    BOOLEAN DEFAULT false,
  created_at     TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_wallpapers_category ON wallpapers(category_id);
CREATE INDEX idx_wallpapers_featured ON wallpapers(is_featured);
CREATE INDEX idx_wallpapers_downloads ON wallpapers(download_count DESC);

-- Ads Config
CREATE TABLE ads_config (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_name         TEXT NOT NULL,
  ad_network       TEXT NOT NULL CHECK (ad_network IN ('AppLovin','AdMob','UnityAds','IronSource','Other')),
  banner_id        TEXT,
  interstitial_id  TEXT,
  app_open_id      TEXT,
  is_active        BOOLEAN DEFAULT true,
  created_at       TIMESTAMPTZ DEFAULT now()
);
