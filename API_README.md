# 📱 Wallpaper App Mobile API Documentation

This documentation provides all the necessary endpoints for your mobile applications (Android/iOS) to seamlessly fetch categories, wallpapers, and dynamic ad configurations from the backend.

---

## 🌍 Base Information

- **Base URL (Local):** `http://localhost:3000/wallpaper/api`
- **Base URL (Production):** `https://your-domain.com/wallpaper/api` *(Replace with your deployed Vercel domain)*
- **Content-Type:** `application/json`
- **Authentication:** No API Keys or Bearer tokens are required for these `GET` endpoints, as they are specifically designed for public read-only consumption by mobile clients.

---

## 1. 📂 Categories API

Fetch all available, active wallpaper categories.

- **Endpoint:** `/categories`
- **Method:** `GET`
- **Response Format:**
```json
{
  "data": [
    {
      "id": "e2ba3...",
      "name": "Nature",
      "slug": "nature",
      "image_url": "https://...",
      "is_active": true,
      "created_at": "2024-03-22T..."
    }
  ],
  "count": 1
}
```

---

## 2. 🖼️ Wallpapers by Category

Fetch all wallpapers belonging to a specific category using its `slug`.

- **Endpoint:** `/wallpapers?category={slug}`
- **Method:** `GET`
- **Query Parameters:**
  - `category` (Required): The slug of the category (e.g., `nature`, `abstract-art`).
- **Response Format:**
```json
{
  "data": [
    {
      "id": "512dc...",
      "title": "Mountain Peak",
      "thumbnail_url": "https://...",
      "full_res_url": "https://...",
      "category_id": "...",
      "tags": ["mountain", "snow", "landscape"],
      "download_count": 125,
      "is_featured": false,
      "is_active": true,
      "created_at": "2024-03-22T..."
    }
  ],
  "count": 1,
  "category_type": "nature"
}
```

---

## 3. ⭐ Featured Wallpapers

Fetch exclusively wallpapers that have been marked as "Featured" via the Admin Dashboard.

- **Endpoint:** `/wallpapers/featured`
- **Method:** `GET`
- **Response Format:**
```json
{
  "data": [
    {
      "id": "...",
      "title": "Neon Cityscape",
      "thumbnail_url": "https://...",
      "full_res_url": "https://...",
      "is_featured": true,
      "download_count": 500,
      "is_active": true
      // ...
    }
  ],
  "count": 1
}
```

---

## 4. 🔥 Popular Wallpapers (Trending)

Fetch wallpapers sorted automatically by their `download_count` in descending order (highest downloads first).

- **Endpoint:** `/wallpapers/popular`
- **Method:** `GET`
- **Response Format:**
```json
{
  "data": [
    {
      "id": "...",
      "title": "Dark Aesthetic",
      "download_count": 9845,
      // ...
    }
  ],
  "count": 1
}
```

---

## 5. ⚙️ App Settings & Dynamic Ads Config

Fetch the master configuration for a specific mobile application. This endpoint tells your mobile app whether ads should run, whether premium features are globally unlocked, and exactly which ad networks (AdMob, AppLovin, Unity) and unit IDs should be initialized.

- **Endpoint:** `/ads/{app_package_name}`
- **Method:** `GET`
- **Path Variables:**
  - `app_package_name` (Required): Your app's unique bundle identifier (e.g., `com.awais.wallpapers`).
- **Response Format:**
```json
{
  "app_name": "com.awais.wallpapers",
  "ads_enabled": true,            // Master Kill Switch for ALL ads in this app
  "features_enabled": true,       // Global toggle to unlock/lock premium app features remotely
  "count": 2,                     // Number of active ad network configurations
  "networks": [
    {
      "id": "...",
      "ad_network": "AdMob",
      "is_active": true,          // Is this specific network active?
      "banner_id": "ca-app-pub-...",
      "interstitial_id": "ca-app-pub-...",
      "app_open_id": ""
    },
    {
      "id": "...",
      "ad_network": "AppLovin",
      "is_active": false,         // E.g., The admin turned off AppLovin for this app
      "banner_id": "1234abc...",
      "interstitial_id": "",
      "app_open_id": "789xyz..."
    }
  ]
}
```

### Mobile Implementation Logic for Ads:
When your mobile app launches, call `/ads/com.your.package`.
1. Check `ads_enabled`. If `false`, do not initialize any SDKs.
2. If `true`, loop through the `networks` array.
3. For each network where `is_active === true`, retrieve the IDs (`banner_id`, `interstitial_id`) and inject them into the respective mobile Ad SDK setup logic.
