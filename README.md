# Professional Portfolio — Senior Android & Flutter Developer

A high-performance, SEO-optimized professional portfolio built with **Next.js 15**, **Tailwind CSS**, and **Framer Motion**. This project is designed to showcase senior-level mobile development expertise with a focus on core web vitals and premium UX.

## 🚀 Key Features

- **Next.js 15 (App Router)**: Leveraging the latest React Server Components (RSC) for optimal performance.
- **Hyper-Optimized Performance**: 
  - **LazyMotion**: Strategic loading of Framer Motion to minimize initial JS bundle.
  - **Strategic Lazy Loading**: Heavy sections are loaded dynamically below the fold.
  - **High SEO Score**: Semantic HTML5, JSON-LD structured data, and optimized metadata.
- **Premium UI/UX**: Futuristic HUD-inspired design with smooth parallax effects and micro-animations.
- **Zero Backend Residuals**: Pruned for maximum efficiency as a pure static/edge-ready portfolio.
- **Clean Architecture**: Following the "Clean Dev" standards defined in `Agents.md`.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/)
- **Analytics**: [Vercel Analytics & Speed Insights](https://vercel.com/analytics)

## 📋 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm / pnpm / yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/awaisdevm/portfolio.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run start
```

## 📐 Project Structure

- `src/app`: Next.js App Router pages and layouts.
- `src/components/sections`: Individual portfolio sections (Hero, About, Projects, etc.).
- `src/components/ui`: Atomic, reusable UI components.
- `src/data`: Centralized `portfolio.json` for content management.
- `src/lib`: Animation variants and utility functions.

## 📜 Coding Standards

This project adheres to strict architectural guidelines. See [Agents.md](./public/Agents.md) for details on:
- Performance-first development.
- Server-side rendering (SSR) vs. Client-side rendering (CSR).
- Typography and design tokens.

---

Built with ❤️ by [Awais](https://github.com/awaisdevm)
