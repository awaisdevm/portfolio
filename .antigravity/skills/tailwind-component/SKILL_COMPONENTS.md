# DRY Tailwind CSS: Component-Based Architecture Standard

A skill to enforce the DRY (Don't Repeat Yourself) principle in Tailwind CSS workspaces, shifting styles away from messy copy-pasted classes and into reusable component patterns, variant helpers, and modular CSS configurations.

---

## Use this skill when:
- Creating new UI components (React, Vue, Svelte, Angular, or NestJS-rendered views).
- Refactoring repeating Tailwind utilities or inline layouts.
- Structuring design tokens, variants, or component themes.
- Enforcing standard class patterns for state UI elements (buttons, inputs, cards).

## Do not use this skill when:
- Writing raw CSS files that have no relation to Tailwind CSS.
- Structuring pure backend business logic (unless defining data-driven style configurations).

---

## 🏗️ DRY Tailwind Implementation Guidelines

To prevent Tailwind class bloat and maintain a DRY design system, enforce these architectural layers:

### 1. The Component-Based Architecture Hierarchy
Instead of repeating strings of utility classes across multiple elements, style repetition must be solved in this order:
1. **Frontend Abstraction (Preferred):** Encapsulate styles in reusable structural components (e.g., `<Button>`, `<Card>`, `<Input>`).
2. **Tailwind Variant Helpers (`cva` / `clsx` / `tailwind-merge`):** For components that require dynamic theme variants, use utility engines to manage classes cleanly without raw string concatenation.
3. **Global Base Configuration (`@theme` / `@utility`):** Define global repeating utilities (like custom scrollbars, complex gradients, or grid layouts) directly in your main CSS file.

---

### 2. Implementation Rules

* **Zero Duplicated Layout Strings:** If the exact same layout string (e.g., `"flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800"`) is used in more than two places, it must be extracted into a structural component.
* **Leverage Native Variants:** Do not write duplicate components for hover/active/disabled states. Use peer (`peer-*`), group (`group-*`), and state modifiers (`disabled:*`, `focus-visible:*`) to handle UI changes contextually inside one DRY block.
* **Theme Tokens Over Magic Values:** Never hardcode custom hex colors or specific spacing values (e.g., `h-[482px]` or `bg-[#3f2a8b]`). Add custom scales to your CSS theme so they are reusable via semantic names (e.g., `bg-brand-primary` or `h-panel`).

---

## 🚀 Examples

### ❌ BAD (Violates DRY - Copy-pasted utility spaghetti)
```tsx
// Buttons are copy-pasted everywhere with minor changes. Easy to break, hard to maintain.
export function App() {
  return (
    <div>
      <button className="inline-flex items-center justify-center px-4 py-2 rounded-md font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-zinc-900 text-white hover:bg-zinc-800 focus:ring-zinc-950">
        Submit
      </button>
      <button className="inline-flex items-center justify-center px-4 py-2 rounded-md font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-red-600 text-white hover:bg-red-700 focus:ring-red-500">
        Delete
      </button>
    </div>
  );
}