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
  tags: string[];
  download_count: number;
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
  is_active: boolean;
  created_at: string;
}

export interface AppSetting {
  app_name: string;
  ads_enabled: boolean;
  features_enabled: boolean;
  created_at?: string;
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
