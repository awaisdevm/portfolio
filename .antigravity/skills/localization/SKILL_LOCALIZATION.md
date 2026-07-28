# Localized Text Extraction & i18n Best Practices

A skill to enforce the extraction of hardcoded UI strings into structured translation files, ensuring type-safe localizations (i18n) and clean, multi-language UI rendering.

---

## Use this skill when:
- Creating, editing, or refactoring UI templates and components (React, NestJS templates, Vue, etc.).
- Creating or structuring JSON locale/translation dictionaries (e.g., `en.json`, `ur.json`).
- Implementing localization hooks, pipes, or utility functions.
- Auditing the codebase to extract hardcoded user-facing text.

## Do not use this skill when:
- Writing internal backend error logs, debugging scripts, or database queries (which do not need user-facing translations).

---

## 🌍 Localization & Text Extraction Rules

To prevent translation fragmentation, maintain strict type-safety, and ensure code is fully localizable, enforce these guidelines:

### 1. Zero Hardcoded User-Facing Strings
* **No Inline Texts:** No raw text nodes (e.g., `<label>Submit Form</label>`) are allowed in components. All user-facing text must use the project's translation hook, pipe, or helper (e.g., `$t('common.submit')`, `t('auth.login')`).
* **Attributes Localization:** Ensure text attributes such as `placeholder`, `aria-label`, `alt`, and `title` are also extracted and localized.

### 2. Structured & Nested Locale JSON Keys
* **Hierarchical Namespace Structure:** Organize translation keys logically by feature area inside the JSON files rather than using a single flat file.
  ```json
  {
    "common": { "save": "Save", "cancel": "Cancel" },
    "auth": {
      "login": {
        "title": "Welcome Back",
        "emailPlaceholder": "Enter your email"
      }
    }
  }