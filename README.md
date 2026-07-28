# 📱 Muhammad Awais — Senior Kotlin Multiplatform & Android Developer Portfolio

A premium, fully responsive, animated, and SEO-optimized portfolio application built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion v12**. 

This repository leverages **Clean Architecture principles** and **dynamic internationalization (i18n)** to separate the core portfolio content from component layouts, ensuring modularity, scalability, and seamless translation.

---

## 🚀 Key Features

*   **Clean Architecture & Data Decoupling:** Absolutely no portfolio content is hardcoded inside components. All content is structured as JSON schema data and mapped dynamically per locale.
*   **Multilingual Support (i18n):** Native internationalization support built on custom, ultra-lightweight translation utilities and `next-intl`.
    *   **Supported Locales:** English (`en`), Arabic (`ar` - RTL), Urdu (`ur` - RTL), German (`de`), Spanish (`es`), French (`fr`), Japanese (`ja`), and Turkish (`tr`).
    *   **Auto-Directionality:** Dynamic HTML `dir` switcher supporting LTR and RTL.
*   **Advanced Visual Polish:** Interactive shaders with `@paper-design/shaders` combined with custom Framer Motion v12 transitions, smooth scroll animations, glassmorphic UI components, and radial backdrop glows.
*   **Production-Ready SEO:** Rich schema metadata, structured JSON-LD data mapping, automated `sitemap.ts` and `robots.ts` generation, and image preload optimizations.
*   **Secure API Route Handlers:** Secure contact form submission with built-in rate-limiting, honeypot spam prevention, and email dispatch using the Resend SDK.

---

## 📂 Architecture & Directory Structure

The project is structured under strict separation of concerns, separating data definition, translation mapper/logic, layout views, and routing logic:

```
├── public/                 # Static assets, branding, and icons
└── src/
    ├── app/                # Next.js App Router (100% routing & SSR configuration)
    │   ├── [locale]/       # Internationalized path parameters (e.g. /en/projects)
    │   └── api/            # Serverless Route Handlers (e.g. Contact API)
    ├── components/         # Shared presentational layouts and atom components
    │   ├── icons/          # SVGs wrapped as React components
    │   ├── layout/         # Header, Footer, and Navigation components
    │   ├── providers/      # Animation and locale context providers
    │   └── seo/            # Structured Schema markup and metadata containers
    ├── data/               # Raw JSON database files containing portfolio content
    │   ├── personal-data.json
    │   ├── projects.json
    │   ├── services.json
    │   └── testimonials.json
    ├── features/           # Feature Modules (Clean Architecture design)
    │   ├── about/          # Components, configs, and types specific to "About" page
    │   ├── home/           # Components, configs, and types specific to "Home" page
    │   ├── projects/       # Grid layouts, filtering, and detail views
    │   └── ...             # Services, Contact, Blog, Testimonials features
    ├── i18n/               # Localization Core
    │   ├── locales/        # Translation JSON dictionary arrays for each locale
    │   ├── data-mapper.ts  # Clean data translator helper linking data and locales
    │   ├── engine.ts       # Translation resolver engine with safety fallbacks
    │   └── loader.ts       # Locale loading modules
    ├── lib/                # Utility helpers
    │   ├── data-provider.ts# Orchestrates localization mapping over raw data
    │   ├── site-config.ts  # Site information metadata definitions
    │   └── seo.ts          # Structured Schema generator
    └── types/              # TypeScript typings and interfaces
```

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Core Framework** | [Next.js 16](https://nextjs.org/) (App Router) | Static site generation, server components, dynamic routing |
| **Runtime** | [React 19](https://react.dev/) | Advanced hooks, fast rendering |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Modular layout utilities, modern token system, fluid gradients |
| **Animations** | [Framer Motion v12](https://motion.dev/) | Page transitions, viewport scroll reveals, and micro-interactions |
| **Special Effects** | `@paper-design/shaders` | Interactive canvas shaders and graphics |
| **Email Service** | [Resend](https://resend.com/) | Secure email delivery for contact forms |

---

## ⚙️ Getting Started

### Prerequisites
Make sure you have Node.js (v18.x or later) installed.

### Installation
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Create a local environment variables file:
   ```bash
   cp .env.example .env.local
   ```
   *(Ensure to configure variables inside `.env.local` to fully enable the contact forms)*

3. Spin up the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

---

## 📧 Contact Form & Email Integration

The application contains a contact form route handler in [route.ts](file:///Users/awais/Downloads/mobile-portfolio/src/app/api/contact/route.ts) powered by Resend.

### Configuration
Update the following environment variables in `.env.local` or on your hosting provider dashboard:
```env
RESEND_API_KEY=re_your_api_key_here
CONTACT_TO_EMAIL=your-recipient-email@domain.com
CONTACT_FROM_EMAIL=onboarding@resend.dev
```

### Security & Anti-Spam Measures
*   **Honeypot Field:** Includes a hidden input field (`company`) that is completely invisible to human users. If filled, the request is immediately discarded as bot activity.
*   **IP-Based Rate Limiting:** Enforces a maximum of 5 requests per IP address per 10 minutes to protect against API abuse.
*   **Fail-Safe Confirmation Email:** Dispatches a structured confirmation email to the submitter without interrupting the main delivery flow if client-side constraints fail.

---

## 📊 Google Analytics & Performance Tracking

The portfolio features a fully integrated Google Analytics (gtag.js) setup combined with native Next.js Core Web Vitals telemetry tracking.

### Configuration
Provide your Google Analytics measurement ID (G-XXXXXX) as a public environment variable in `.env.local` or your hosting dashboard:
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Metrics Tracked Automatically
*   **Page Views & Navigation:** Listens to client-side path and search query parameters inside localized paths to fire GA page views.
*   **Core Web Vitals:** Automatically reports runtime performance data directly to Google Analytics:
    *   `LCP` (Largest Contentful Paint)
    *   `FID` / `INP` (First Input Delay / Interaction to Next Paint)
    *   `CLS` (Cumulative Layout Shift)
    *   `FCP` (First Contentful Paint)
    *   `TTFB` (Time to First Byte)
*   **Performance Ratings:** Categorizes each metrics rating (`good`, `needs-improvement`, or `poor`) and sends them along with standard numerical tags.
*   **Development Console Logging:** Displays live Web Vitals telemetry in the console when running in local development mode (`NODE_ENV === "development"`).

---

## ⚙️ Content Editing & Data Management

To change the bio, projects, testimonials, or other content, edit the configuration files inside `src/data/` or `src/lib/site-config.ts` without modifying the core TSX layout elements:

1.  **General Info & Bio:** Edit [personal-data.json](file:///Users/awais/Downloads/mobile-portfolio/src/data/personal-data.json) (Name, Role, Location, Social URLs, etc.).
2.  **Projects:** Edit [projects.json](file:///Users/awais/Downloads/mobile-portfolio/src/data/projects.json) (Add highlights, project details, categories, and tags).
3.  **Services:** Edit [services.json](file:///Users/awais/Downloads/mobile-portfolio/src/data/services.json).
4.  **Testimonials:** Edit [testimonials.json](file:///Users/awais/Downloads/mobile-portfolio/src/data/testimonials.json).
5.  **Locales & Translations:** Translation dictionaries reside in [src/i18n/locales/](file:///Users/awais/Downloads/mobile-portfolio/src/i18n/locales/). Add or edit keys corresponding to pages and component structures.

---

## 🚀 Deployment

The portfolio can be deployed out-of-the-box on platforms like Vercel, Netlify, or self-hosted platforms:

```bash
# Build the production bundle
npm run build

# Start production server
npm run start
```
