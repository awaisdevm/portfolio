"use client";

import React, { useState } from "react";
import { m, type Variants } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ContactFormLabels } from "../types";
import { ContactService, ContactFormValues } from "../services/contact-service";
import { useTranslations } from "next-intl";

interface ContactFormProps {
  labels: ContactFormLabels;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ContactForm({ labels }: ContactFormProps) {
  const t = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const [formData, setFormData] = useState<ContactFormValues>({
    name: "",
    email: "",
    message: "",
    company: "", // Honeypot
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const result = await ContactService.sendInquiry(formData);

      if (result.ok) {
        setStatus({
          type: "success",
          msg: t("contact.form.successMsg") || "Message sent successfully! I'll get back to you soon.",
        });
        setFormData({
          name: "",
          email: "",
          message: "",
          company: "",
        });
      } else {
        setStatus({
          type: "error",
          msg: result.error || t("contact.form.errorMsg") || "Validation failed. Please check your input.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        msg: t("contact.form.connectionError") || "A connection error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <m.div variants={cardVariants} className="card-surface p-6 md:p-8">
      <form className="grid gap-5" onSubmit={handleSubmit}>
        {/* Honeypot Field */}
        <input
          type="text"
          name="company"
          id="contact-company-hp"
          value={formData.company}
          onChange={handleChange}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="space-y-1.5">
          <label htmlFor="contact-name" className="ml-1 font-mono text-xs uppercase tracking-widest text-muted">
            {labels.nameLabel}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder={labels.nameLabel}
            className="input-base w-full border-border/20 transition-all duration-300 focus:border-primary"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="contact-email" className="ml-1 font-mono text-xs uppercase tracking-widest text-muted">
            {labels.emailLabel}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder={labels.emailLabel}
            className="input-base w-full border-border/20 transition-all duration-300 focus:border-primary"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="contact-message" className="ml-1 font-mono text-xs uppercase tracking-widest text-muted">
            {labels.messageLabel}
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            placeholder={labels.messageLabel}
            rows={5}
            className="input-base w-full resize-none border-border/20 transition-all duration-300 focus:border-primary"
          />
        </div>

        {/* Status Display */}
        {status && (
          <div
            className={`rounded-md border p-3 text-xs font-medium ${
              status.type === "success"
                ? "border-green-500/20 bg-green-500/10 text-green-500"
                : "border-red-500/20 bg-red-500/10 text-red-500"
            }`}
          >
            {status.msg}
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full py-6 text-sm uppercase tracking-widest disabled:opacity-50"
        >
          {isSubmitting ? (t("contact.form.sending") || "Sending...") : labels.buttonSend}
        </Button>
      </form>
    </m.div>
  );
}