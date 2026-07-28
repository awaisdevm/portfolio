# High-Ranking SEO Content & Semantic Markup Standard

A skill to enforce strict SEO (Search Engine Optimization) standards, ensuring pages rank high on search engines. It regulates semantic HTML structure, dynamic metadata, Core Web Vitals optimization, and clean keyword-optimized copy.

---

## Use this skill when:
- Creating, editing, or refactoring frontend pages, layouts, and route templates (Next.js, NestJS templates, React, HTML).
- Implementing metadata generation logic (dynamic titles, meta descriptions, canonical links).
- Structuring text content, blogs, or product pages requiring structured data (JSON-LD).
- Managing images, dynamic links, and heading hierarchies (H1 to H6).

## Do not use this skill when:
- Writing pure API endpoints, non-rendering NestJS services, or internal tooling scripts.

---

## 📈 SEO & Semantic Content Rules

To maximize crawlability, indexability, and user engagement, enforce these core principles:

### 1. Title & Meta Optimization
* **Primary Keyword Placement:** The target keyword must be at the beginning of the `<title>` tag and within the first 100 words of the body copy.
* **Length Constraints:**
  * **Title:** Must be between **50–60 characters** (to avoid truncation in SERPs).
  * **Meta Description:** Must be between **110–145 characters**, utilizing an active voice and a clear Call-to-Action (CTA).
* **Canonical URL Tags:** Every unique page must contain a self-referential `<link rel="canonical" href="..." />` tag to avoid duplicate content penalties.

### 2. Semantic Heading Hierarchy & Readability
* **Strict Heading Nesting:** Exactly one `<h1>` tag is allowed per page. Headings must follow a sequential order (`h1` ➔ `h2` ➔ `h3` ➔ `h4`). Never jump from `h1` to `h3`.
* **Keyword Density:** Maintain a natural keyword density of **1% to 1.5%**. Avoid keyword stuffing.
* **Readable Chunking:** Keep paragraphs short (**maximum 3-4 sentences** or 100 words) and use bullet points for readability to increase dwell time (a crucial ranking signal).

### 3. Image & Media Optimization (Core Web Vitals)
* **Image Descriptive Alt Text:** All `<img>` or `<Image>` tags must have explicit, descriptive, and keyword-supported `alt` attributes. Decorative images must have `alt=""` or `aria-hidden="true"`.
* **Width & Height Attributes:** Always specify explicit `width` and `height` dimensions (or use aspect-ratio utilities in Tailwind) to prevent Cumulative Layout Shift (CLS).

### 4. Schema Markup (Structured Data)
* Highly optimized pages must inject valid **JSON-LD Schema** (e.g., Organization, Article, Product, or FAQ schema) to claim Rich Snippets on Google.

---

## 🚀 Examples

### ❌ BAD (Low SEO Value, semantic issues, non-optimized images)
```tsx
// Lacks SEO elements: multiple H1 tags, missing alt attributes, dynamic layout shifts, and no meta tags.
export function Page() {
  return (
    <main>
      <h1>Awesome Products</h1>
      <h1>Buy Stuff Online</h1>
      <p>This is where we sell things like tools, software, and gear. Click here to buy now!</p>
      <img src="/banner.jpg" /> {/* Missing alt, width, height (CLS trigger) */}
    </main>
  );
}