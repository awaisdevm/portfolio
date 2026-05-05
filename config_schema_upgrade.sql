-- =============================================
-- Config API Schema Upgrade
-- Adds full multi-app management with versioning,
-- maintenance mode, and enable/disable control
-- =============================================

-- 1. Apps Master Table (replaces limited app_settings for app management)
CREATE TABLE IF NOT EXISTS apps (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_name        TEXT NOT NULL,                         -- Display name (e.g., "HD Wallpapers Pro")
  package_name    TEXT NOT NULL UNIQUE,                   -- Android package (e.g., "com.awais.hdwallpapers")
  is_enabled      BOOLEAN DEFAULT true,                   -- Master kill switch for this app
  is_maintenance  BOOLEAN DEFAULT false,                  -- Maintenance mode flag
  maintenance_msg TEXT DEFAULT 'We are currently under maintenance. Please check back later.',
  current_version TEXT NOT NULL DEFAULT '1.0.0',          -- Latest version available
  min_version     TEXT NOT NULL DEFAULT '1.0.0',          -- Minimum required version (force update below this)
  update_url      TEXT DEFAULT '',                        -- Play Store / direct APK link
  force_update    BOOLEAN DEFAULT false,                  -- If true, app must update to current_version
  ads_enabled     BOOLEAN DEFAULT true,                   -- Master ads switch for this app
  extra_config    JSONB DEFAULT '{}',                      -- Flexible key-value config (feature flags etc.)
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- 2. Add rewarded_id and native_id to ads_config for broader ad format support
ALTER TABLE ads_config ADD COLUMN IF NOT EXISTS rewarded_id TEXT;
ALTER TABLE ads_config ADD COLUMN IF NOT EXISTS native_id TEXT;

-- 3. RLS for apps table
ALTER TABLE apps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public SELECT on apps" ON apps FOR SELECT USING (true);
CREATE POLICY "Allow authenticated ALL on apps" ON apps FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 4. Index for fast lookup by package_name
CREATE INDEX IF NOT EXISTS idx_apps_package ON apps(package_name);
