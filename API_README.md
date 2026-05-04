# 📱 Wallpaper App Mobile API Documentation

This documentation provides all the necessary endpoints for your mobile applications (Android/iOS) to seamlessly fetch categories, wallpapers, and dynamic ad configurations from the backend.

---

## 🌍 Base Information

- **Base URL (Local):** `http://localhost:3000/wallpaper/api`
- **Base URL (Production):** `https://your-domain.com/wallpaper/api` *(Replace with your deployed Vercel domain)*
- **Content-Type:** `application/json`

To protect your data from public scrapers and unauthorized apps, the API has a multi-layered Security Shield. All mobile `GET` requests **MUST** include four specific HTTP Headers:
1. `x-api-key`: Your secret API key. *(Configured via `MOBILE_API_KEY` in your `.env` file)*.
2. `x-app-package`: The exact Package Name of your app (e.g., `com.awais.wallpapers`).
3. `x-device-id`: A unique identifier for the phone (e.g., Android Device ID or a UUID). Used for per-device rate limiting.
4. `x-integrity-token`: A fresh "Play Integrity" token generated on the phone. This proves the request is from a real, untampered device.

final headers = {
  "Content-Type": "application/json",
  "x-api-key": "YOUR_SECRET_API_KEY",
  "x-app-package": "com.awais.wallpapers",
  "x-device-id": "device_uuid_here",
  "x-integrity-token": "eyJhbGciOi..." // Token from Play Integrity API
};

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

## 2. 🖼️ Wallpapers (By Category or All)

Fetch wallpapers. You can optionally filter by a specific category, otherwise, it returns all wallpapers. This endpoint is **paginated**.

- **Endpoint:** `/wallpapers?category={slug}&page={page}&limit={limit}`
- **Method:** `GET`
- **Security NOTE:** The `thumbnail_url` and `full_res_url` returned are **Temporary Signed URLs** that expire after 1 hour.
- **Query Parameters:**
  - `category` (Optional): The slug of the category (e.g., `nature`, `abstract-art`). If omitted, fetches all wallpapers.
  - `page` (Optional): The page number (default: `1`).
  - `limit` (Optional): Items per page (default: `20`).
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
      "categories": {
        "name": "Nature"
      },
      "tags": ["mountain", "snow", "landscape"],
      "download_count": 125,
      "view_count": 450,
      "is_featured": false,
      "is_active": true,
      "created_at": "2024-03-22T..."
    }
  ],
  "count": 1,
  "page": 1,
  "limit": 20,
  "category_type": "nature" // or "all"
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
      "view_count": 1200,
      "is_active": true
      // ...
    }
  ],
  "count": 1
}
```

---

## 4. 🔥 Popular Wallpapers (Trending)

Fetch wallpapers sorted automatically by their `download_count` and `view_count` in descending order (highest engagement first). This endpoint is **paginated**.

- **Endpoint:** `/wallpapers/popular?page={page}&limit={limit}`
- **Method:** `GET`
- **Query Parameters:**
  - `page` (Optional): The page number (default: `1`).
  - `limit` (Optional): Items per page (default: `20`).
- **Response Format:**
```json
{
  "data": [
    {
      "id": "...",
      "title": "Dark Aesthetic",
      "categories": {
        "name": "Abstract"
      },
      "download_count": 9845,
      "view_count": 25000
      // ...
    }
  ],
  "count": 100,
  "page": 1,
  "limit": 20
}
```

---

## 5. 🆕 Recent Wallpapers (Last 7 Days)

Fetch fresh wallpapers uploaded strictly within the last 1 week. This endpoint is **paginated** and optionally filtered by category.

- **Endpoint:** `/wallpapers/recent?category={slug}&page={page}&limit={limit}`
- **Method:** `GET`
- **Query Parameters:**
  - `category` (Optional): The slug of the category. If omitted, fetches recent wallpapers from all categories.
  - `page` (Optional): The page number (default: `1`).
  - `limit` (Optional): Items per page (default: `20`).
- **Response Format:**
```json
{
  "data": [
    {
      "id": "...",
      "title": "New Arrival",
      "categories": {
        "name": "Nature"
      },
      "created_at": "2024-03-22T..."
      // ...
    }
  ],
  "count": 45,
  "page": 1,
  "limit": 20,
  "category_type": "all"
}
```

---

## 6. ⚙️ App Settings & Dynamic Ads Config

Fetch the master configuration for a specific mobile application. This endpoint tells your mobile app whether ads should run, whether premium features are globally unlocked, and exactly which ad networks (AdMob, AppLovin, Unity) and unit IDs should be initialized.

- **Endpoint:** `/ads/{app_package_name}`
- **Method:** `GET`
- **Path Variables:**
  - `app_package_name` (Required): Your app's unique bundle identifier (e.g., `com.awais.wallpapers`).
- **Response Format:**
```json
{
  "app_name": "com.awais.wallpapers",
  "ads_enabled": true,            // Master Kill Switch for ALL ads in this specific app
  "global_ads_online": true,      // Global status. If false, ALL apps are forced ad-free
  "features_enabled": true,       // Global toggle to unlock/lock premium app features remotely
  "count": 2,                     // Number of ACTIVE ad configurations. Returns 0 if ads are disabled!
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
1. Check `ads_enabled` and `global_ads_online`. If either is `false`, do not initialize any SDKs.
2. **Double Safety**: The server will automatically return an **empty `networks` array** if advertisements are disabled in the dashboard.
3. If IDs are present, loop through the `networks` array and initialize the respective SDKs.

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
### 📈 Interaction Tracking (Public APIs)

To keep your analytics fresh, the mobile app should notify the server whenever a wallpaper is interacted with. These tracking endpoints are **Public** and do not require the standard security shield headers.

#### 1. Track Downloads
Call this when the user successfully saves a wallpaper or sets it as a background.
- **Endpoint:** `POST /wallpapers/[id]/download`
- **Method:** `POST`
- **Response:** `{"success": true, "message": "Download count incremented"}`

#### 2. Track Views
Call this whenever a user clicks/opens a wallpaper to preview it in the app.
- **Endpoint:** `POST /wallpapers/[id]/view`
- **Method:** `POST`
- **Response:** `{"success": true, "message": "View count incremented"}`

> [!TIP]
> Use the **Views API** to track user interest and the **Downloads API** to track final conversions. Both are reflected in your Admin Analytics Dashboard.
