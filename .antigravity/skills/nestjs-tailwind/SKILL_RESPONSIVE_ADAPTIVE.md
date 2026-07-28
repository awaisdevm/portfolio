# Responsive & Adaptive UI Architecture Standard

A skill to enforce fluid responsive design systems and multi-platform adaptive layouts using modern Tailwind CSS (v4+) breakpoints, fluid typography, interaction media queries, and device-aware rendering.

---

## Use this skill when:
- Designing or refactoring UI components, page layouts, grids, and navigation.
- Implementing container queries, fluid spacing, or responsive design tokens.
- Handling cross-device interaction adaptations (e.g., hover states on desktop vs. touch targets on mobile).
- Configuring screen-size breakpoints or layout strategies.

## Do not use this skill when:
- Writing data models, background application logic, or database schemas.

---

## 📱 Responsive vs. Adaptive UI Rules

* **Responsive UI (Fluid Scaling):** The layout gracefully reflows and scales across dynamic screen widths using Tailwind's breakpoint modifiers (`sm:`, `md:`, `lg:`, `xl:`).
* **Adaptive UI (Contextual Modification):** The interface changes its structural behavior, touch targets, or visibility based on the *user's device capabilities* (e.g., hiding hover animations on touch screens, switching tabs to dropdowns).

### 1. Mobile-First Development Workflow
* **Default to Mobile:** Always write the default class names for the smallest screen sizes (mobile). Use responsive modifiers exclusively to scale up for larger viewports.
  * ❌ *Bad:* `w-full max-w-4xl md:max-w-sm` (Desktop first)
  *  *Good:* `w-full max-w-sm md:max-w-4xl` (Mobile first)
* **Never Hardcode Fixed Widths:** Layout containers must use fluid widths (`w-full`, `max-w-screen-xl`) and relative padding/margins to prevent text and element clipping.

### 2. Modern Adaptive Styling & Interactions
* **Touch-Safe Targets:** Interactive elements (buttons, inputs, links) must maintain a minimum hit target size of **44x44px** on mobile screens (`min-h-[44px]`).
* **Hover State Protection:** Prevent sticky hover states on mobile touch screens by wrapping hover styles in the pointer media query modifier (`@media (hover: hover)` or Tailwind's `hover:` with device utilities).
* **Container Queries Over Media Queries:** For modular components that change layout depending on their *parent container's size* rather than the whole screen, utilize Tailwind CSS container queries (`@container` and `@md:` etc.).

---

## 🚀 Examples

### ❌ BAD (Desktop-first hardcoded sizes, broken touch-targets, and sticky mobile hovers)
```tsx
// This breaks on mobile: narrow fixed widths, tiny buttons, and desktop-first styling rules.
export function SidebarLayout() {
  return (
    <div className="w-[1200px] flex flex-row"> 
      {/* 1. Fixed width layout causes horizontal scrolling on mobile */}
      <aside className="w-[300px] hidden md:block">Sidebar Links</aside>
      
      <main className="w-[900px] p-8">
        <h1 className="text-3xl">Dashboard</h1>
        {/* 2. Tiny target height, hover effect gets stuck on mobile taps */}
        <button className="h-6 w-12 bg-zinc-900 text-white text-xs hover:bg-zinc-700">
          Save
        </button>
      </main>
    </div>
  );
}