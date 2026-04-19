-- Run these commands in your Supabase SQL Editor to support unified App Settings!

CREATE TABLE IF NOT EXISTS app_settings (
    app_name TEXT PRIMARY KEY,
    ads_enabled BOOLEAN DEFAULT true,
    features_enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Ensure public access to app_settings via API
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public SELECT on app_settings" ON app_settings FOR SELECT USING (true);
CREATE POLICY "Allow authenticated ALL on app_settings" ON app_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
