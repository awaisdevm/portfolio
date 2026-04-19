# 📱 Wallpaper App Mobile API Documentation

This documentation provides all the necessary endpoints for your mobile applications (Android/iOS) to seamlessly fetch categories, wallpapers, and dynamic ad configurations from the backend.

---

## 🌍 Base Information

- **Base URL (Local):** `http://localhost:3000/wallpaper/api`
- **Base URL (Production):** `https://your-domain.com/wallpaper/api` *(Replace with your deployed Vercel domain)*
- **Content-Type:** `application/json`

### 🔒 Security & Authentication
To protect your data from public scrapers and unauthorized apps, the API has a strict Gateway deployed. All mobile `GET` requests **MUST** include two specific HTTP Headers:

1. `x-api-key`: Your secret API key. Default fallback: `awais_mobile_secure_999` *(You can change this by adding `MOBILE_API_KEY=your_secret` to your `.env` file)*.
2. `x-app-package`: The exact Package Name of your app (e.g. `com.awais.wallpapers`). This package name MUST exist inside your Admin Dashboard's Ads Manager list!

Example Headers in Flutter/Dart:
```dart
final headers = {
  "Content-Type": "application/json",
  "x-api-key": "awais_mobile_secure_999",
  "x-app-package": "com.awais.wallpapers"
};
```
---

## 1. 📂 Categories API

Fetch all available, active wallpaper categories to display in your mobile app.

- **Endpoint (Global):** `/categories`
- **Endpoint (By App):** `/categories/{app_package_name}` *(Validates your app and returns its categories)*
- **Method:** `GET`
- **Response Format:**
```json
{
  "app_package": "com.awais.wallpapers", // Optional depending on endpoint
  "count": 1,
  "categories": [
    {
      "id": "e2ba3...", 
      "name": "Nature",
      "slug": "nature",
      "image_url": "https://...",
      "is_active": true,
      "created_at": "2024-03-22T..."
    }
  ]
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

---

## 🚀 Production Deployment (Revenue Scale)

To handle professional traffic levels and ensure your **Portfolio** and **API Backend** don't interfere with each other, follow this "Dual Deployment" strategy on Vercel:

### 1. Create Two Projects on Vercel
Go to the Vercel dashboard and import this GitHub repository **twice**:

| Project Name | Primary Domain | `NEXT_PUBLIC_API_DOMAIN` Env Var |
| :--- | :--- | :--- |
| `devawais-portfolio` | `devawais.com` | *Leave Empty* |
| `wallpaper-backend` | `api.devawais.com` | `api.devawais.com` |

### 2. How the Isolation Works
The `middleware.ts` contains a **Domain Shield** I've implemented for you. 

- **On `devawais.com`:** Everything works normally (Portfolio + Admin Panel).
- **On `api.devawais.com` (or any domain matching the env var):** 
    - Only paths starting with `/wallpaper` are allowed.
    - If anyone tries to visit your home page, about page, or portfolio projects on this subdomain, the server instantly redirects them to your main `devawais.com` site.
    - This ensures your portfolio branding is never "seen" on your technical API subdomain.

### 3. Recommended Environment Variables
Make sure the **Backend Project** in Vercel has these variables set:
- `NEXT_PUBLIC_API_DOMAIN`: `api.devawais.com` (or your chosen subdomain)
- `MOBILE_API_KEY`: A complex secret string.
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon Key.

---
*Created by Antigravity AI for devawais*

