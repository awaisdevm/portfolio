# Centralized Color Scheme & Semantic Theming Standard

A skill to enforce a strict, centralized theming architecture. This separates raw design tokens (colors, spacing) from semantic themes (light/dark modes) using modern Tailwind CSS (v4+) configurations and CSS custom properties.

---

## Use this skill when:
- Creating, modifying, or refactoring CSS/styling files.
- Configuring tailwind-specific theme systems or custom configurations.
- Declaring color codes, semantic palettes (primary, surface, border), or Dark Mode variations.
- Inspecting components for hardcoded hex/rgb/hsl color values.

## Do not use this skill when:
- Working with logic-only code (e.g., pure NestJS controllers, use cases, or non-UI components).

---

## 🎨 Centralized Theming Rules

To prevent CSS duplication and color drift, styles must be split into two decoupled layers:
1. **Raw Tokens:** Absolute values (e.g., `#0f172a`, `#ffffff`) defined centrally in one global theme file.
2. **Semantic Variables:** Functional aliases (e.g., `--color-bg-primary`, `--color-text-muted`) mapped to CSS variables that automatically transition when changing dark/light/system themes.

### 1. Centralized Tailwind CSS v4 Configuration (Primary CSS File)
All colors must be registered inside the centralized theme wrapper using Tailwind CSS's CSS-first theme directives.
* **No hardcoded arbitrary values** in template files (e.g., `bg-[#1a202c]`).
* **Strict semantic naming convention:** Use functional names instead of literal color names (`bg-primary-50` or `text-brand-accent` instead of `bg-indigo-600`).

### 2. Implementation Architecture (Clean CSS Separation)
Define semantic mappings in your global stylesheet (`global.css`):

```css
@import "tailwindcss";

@theme {
  /* Centralizing design tokens via CSS variables */
  --color-brand-primary: var(--brand-primary);
  --color-brand-secondary: var(--brand-secondary);
  
  --color-ui-bg: var(--ui-bg);
  --color-ui-surface: var(--ui-surface);
  --color-ui-text: var(--ui-text);
  --color-ui-border: var(--ui-border);
}

/* Centralized Light Mode (Default) */
:root {
  --brand-primary: oklch(0.60 0.25 294); /* Vibrant purple */
  --brand-secondary: oklch(0.68 0.19 142);
  
  --ui-bg: oklch(0.99 0.005 120); /* Pure light bg */
  --ui-surface: oklch(1 0 0);
  --ui-text: oklch(0.15 0.01 120);
  --ui-border: oklch(0.92 0.01 120);
}

/* Centralized Dark Mode (Separated) */
@media (prefers-color-scheme: dark) {
  :root {
    --brand-primary: oklch(0.70 0.22 294);
    --brand-secondary: oklch(0.78 0.16 142);
    
    --ui-bg: oklch(0.12 0.015 256); /* Deep dark bg */
    --ui-surface: oklch(0.16 0.015 256);
    --ui-text: oklch(0.95 0.005 256);
    --ui-border: oklch(0.24 0.015 256);
  }
}

/* Explicit class-based override (e.g., if user manually toggles dark mode) */
html.dark {
  --ui-bg: oklch(0.12 0.015 256);
  --ui-surface: oklch(0.16 0.015 256);
  --ui-text: oklch(0.95 0.005 256);
  --ui-border: oklch(0.24 0.015 256);
}