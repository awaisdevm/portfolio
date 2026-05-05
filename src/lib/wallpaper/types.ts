export interface Category {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
  wallpaper_count?: number;
}

export interface Wallpaper {
  id: string;
  title: string;
  thumbnail_url: string;
  full_res_url: string;
  category_id: string | null;
  category_ids: string[];
  tags: string[];
  download_count: number;
  view_count: number;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
}

export interface AdsConfig {
  id: string;
  app_name: string;
  ad_network: 'AppLovin' | 'AdMob' | 'UnityAds' | 'IronSource' | 'Other';
  banner_id: string | null;
  interstitial_id: string | null;
  app_open_id: string | null;
  rewarded_id: string | null;
  native_id: string | null;
  is_active: boolean;
  created_at: string;
}

export interface AppSetting {
  app_name: string;
  ads_enabled: boolean;
  features_enabled: boolean;
  created_at?: string;
}

export interface App {
  id: string;
  app_name: string;
  package_name: string;
  is_enabled: boolean;
  is_maintenance: boolean;
  maintenance_msg: string;
  current_version: string;
  min_version: string;
  update_url: string;
  force_update: boolean;
  ads_enabled: boolean;
  extra_config: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface ConfigResponse {
  app: {
    name: string;
    package_name: string;
    is_enabled: boolean;
    is_maintenance: boolean;
    maintenance_msg: string;
  };
  version: {
    current: string;
    minimum: string;
    force_update: boolean;
    update_url: string;
    needs_update: boolean;
    needs_force_update: boolean;
  };
  ads: {
    enabled: boolean;
    global_enabled: boolean;
    networks: AdsConfig[];
  };
  extra_config: Record<string, unknown>;
  timestamp: string;
}

export interface WallpaperWithCategory extends Wallpaper {
  categories?: {
    name: string;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number | null;
  error?: string | null;
}
