# Declarative Code Minimization & Clean Code Standard

A skill to eliminate boilerplate, extract repetitive layouts, enforce declarative UI patterns, and minimize file sizing across React/Next.js and TypeScript codebases.

---

## Use this skill when:
- Refactoring bulky components containing inline data structures or mappings.
- Writing form components with manual, repetitive validation patterns.
- Detecting duplicate layout templates (e.g., custom wrappers like fields, cards, grids).
- Trimming multi-line runtime checks into clean util pipelines.

## Do not use this skill when:
- Writing low-level configurations or third-party core bindings where verbosity is required by the API.

---

## 🧹 Code Minimization & Refactoring Rules

### 1. Data-Driven Declarative UI
* **No Inline Configuration Mappings:** Arrays, maps, metadata configs, and lookup dictionaries (like static select dropdown choices, icon dictionaries) must be extracted outside the main component function scope or imported from clean mock/config layers.

### 2. Guard Rails & Fallback Abstractions
* **Clean Fallbacks:** Abstract structural fallback checks (e.g., translation key missing validation) into unified utility pure-functions instead of polluting the render engine cycle.

### 3. Component Extraction & Form Reusability
* **Field Wrappers:** Inputs, textareas, and select components must share a single decoupled `<FormField>` wrapper or be composed elegantly to prevent repeating structural label/error markups.

---

## 🚀 Before vs After Examples (Based on your provided code)

### ❌ Code Before Refactoring (Bulky, Inline Options, Heavy Boilerplate)
*(Aapka original `ContactForm` aur `ServicesPage` ka code jahan forms aur lists bohot lines le rahe thay aur configuration inline thi).*

###  Cleaned & Minimized Code (Using this Skill)

Yahan aapka poora code clean aur heavily minimize karke functional parts me convert kar diya gaya hai:

```tsx
import { FormEvent, useState } from "react";
import Head from 'next/head';
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Cpu, Zap, GitBranch, CheckCircle2, AlertCircle, Loader2, LucideIcon } from "lucide-react";

// ==========================================
// 1. EXTRACTED LOOKUPS & CONFIGS (Zero Component Bloat)
// ==========================================
export const metadata = {
  title: "Android & Kotlin Multiplatform Development Services",
  description: "Senior mobile application engineering services: Jetpack Compose, Kotlin Multiplatform, and Flutter development.",
  alternates: { canonical: "/services" }
};

const iconMap: Record<string, LucideIcon> = { Smartphone, Cpu, Zap, GitBranch };

const getLocalizedValue = (t: Function, baseKey: string, fallback: string) => {
  const val = t(baseKey);
  return val.startsWith("services.items") ? fallback : val;
};

// ==========================================
// 2. SERVICES PAGE COMPONENT (Minimized Layout)
// ==========================================
export default async function ServicesPage() {
  const locale = await getLocaleServer();
  const t = getTranslationServer(locale);

  return (
    <>
      <PageHeader eyebrow={t("services.title")} title={t("services.headerTitle")} description={t("services.headerDesc")} />
      <section className="pb-24">
        <div className="container-page grid gap-5 sm:grid-cols-2">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Smartphone;
            return (
              <AnimatedSection key={service.id} delay={i * 0.08} className="card-surface p-6 sm:p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary-light">
                  <Icon size={20} />
                </span>
                <h2 className="mt-4 font-display text-xl font-semibold">{getLocalizedValue(t, `services.items.${service.id}.title`, service.title)}</h2>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{getLocalizedValue(t, `services.items.${service.id}.description`, service.description)}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {service.tech.map((tech) => (
                    <span key={tech} className="rounded-full border border-border px-3 py-1.5 font-mono text-xs text-muted">{tech}</span>
                  ))}
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </section>
      <CTASection />
    </>
  );
}

// ==========================================
// 3. REUSABLE CORE FIELD LAYER (Enforces DRY Layout)
// ==========================================
function FormField({ label, name, error, children }: { label: string; name: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-ink">{label}</label>
      {children}
      {error && <span className="text-xs text-accent-light">{error}</span>}
    </div>
  );
}

// ==========================================
// 4. CONTACT FORM COMPONENT (Boilerplate Removed)
// ==========================================
export function ContactForm() {
  const { t } = useI18n();
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string>("");

  const options = {
    platforms: ["Android Native (Kotlin/Java)", "Kotlin Multiplatform (KMP)", "Compose Multiplatform (CMP)", "Flutter", "Not sure yet"].map((v, i) => ({ value: v, label: t(`contact.form.platforms.${["android", "kmp", "cmp", "flutter", "notsure"][i]}`) })),
    budgets: ["Under $10k", "10k – $30k", "30k – $75k", "75k+"].map((v, i) => ({ value: v, label: t(`contact.form.budgets.${["under10k", "10k_30k", "30k_75k", "over75k"][i]}`) }))
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());
    
    // Quick Declarative Validation Pipeline
    const nextErrors: Record<string, string> = {};
    if (!String(data.name).trim()) nextErrors.name = t("contact.form.nameRequired");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email))) nextErrors.email = t("contact.form.emailRequired");
    if (String(data.message).trim().length < 12) nextErrors.message = t("contact.form.detailsRequired");

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const resData = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (resData?.fields) setErrors(resData.fields);
        throw new Error(resData?.error || "Something went wrong.");
      }
      setStatus("done");
    } catch (err: any) {
      setServerError(err.message || "Network error — please check your connection.");
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card-surface flex flex-col items-center gap-3 px-6 py-16 text-center">
        <CheckCircle2 className="text-mint" size={40} />
        <h3 className="font-display text-xl font-semibold">{t("contact.form.successTitle")}</h3>
        <p className="max-w-sm text-sm text-muted">{t("contact.form.successMessage")}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card-surface flex flex-col gap-5 p-6 sm:p-8">
      <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label={t("contact.form.nameLabel")} name="name" error={errors.name}>
          <input id="name" name="name" type="text" placeholder={t("contact.form.namePlaceholder")} className="input-base min-h-[44px]" />
        </FormField>
        <FormField label={t("contact.form.emailLabel")} name="email" error={errors.email}>
          <input id="email" name="email" type="email" placeholder={t("contact.form.emailPlaceholder")} className="input-base min-h-[44px]" />
        </FormField>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label={t("contact.form.platformLabel")} name="platform">
          <select id="platform" name="platform" className="input-base min-h-[44px]" defaultValue={options.platforms[4].value}>
            {options.platforms.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </FormField>
        <FormField label={t("contact.form.budgetLabel")} name="budget">
          <select id="budget" name="budget" className="input-base min-h-[44px]" defaultValue={options.budgets[1].value}>
            {options.budgets.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </FormField>
      </div>

      <FormField label={t("contact.form.detailsLabel")} name="message" error={errors.message}>
        <textarea id="message" name="message" rows={5} placeholder={t("contact.form.detailsPlaceholder")} className="input-base resize-none" />
      </FormField>

      {status === "error" && serverError && (
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2.5 rounded-lg border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accent-light">
          <AlertCircle size={16} className="mt-0.5 shrink-0" /> {serverError}
        </motion.div>
      )}

      <Button type="submit" disabled={status === "submitting"} className="mt-2 w-full sm:w-fit min-h-[44px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={status} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
            {status === "submitting" ? <><Loader2 size={16} className="animate-spin" /> {t("contact.form.buttonSending")}</> : t("contact.form.buttonSend")}
          </motion.span>
        </AnimatePresence>
      </Button>
      <p className="text-xs text-muted">{t("contact.form.preferDirect")}</p>
    </form>
  );
}