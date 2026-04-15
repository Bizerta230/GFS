"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(formData: FormData) {
    setStatus("sending");
    try {
      const payload = {
        source: "contact" as const,
        name: String(formData.get("name") || ""),
        company: String(formData.get("company") || ""),
        email: String(formData.get("email") || ""),
        message: String(formData.get("message") || ""),
      };
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="max-w-xl space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
          {t("contact.badge")}
        </p>
        <h1 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
          {t("contact.title")}
        </h1>
        <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
          {t("contact.desc")}
        </p>
      </div>

      <form action={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-200" htmlFor="name">
            {t("contact.nameLbl")}
          </label>
          <input
            id="name" name="name"
            className="w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-secondary/40 placeholder:text-slate-500 focus:border-secondary focus:ring-2"
            placeholder={t("contact.namePh")}
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-200" htmlFor="company">
            {t("contact.companyLbl")}
          </label>
          <input
            id="company" name="company"
            className="w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-secondary/40 placeholder:text-slate-500 focus:border-secondary focus:ring-2"
            placeholder={t("contact.companyPh")}
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-200" htmlFor="email">
            {t("contact.emailLbl")}
          </label>
          <input
            type="email" id="email" name="email"
            className="w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-secondary/40 placeholder:text-slate-500 focus:border-secondary focus:ring-2"
            placeholder={t("contact.emailPh")}
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-200" htmlFor="message">
            {t("contact.messageLbl")}
          </label>
          <textarea
            rows={4} id="message" name="message"
            className="w-full resize-none rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-secondary/40 placeholder:text-slate-500 focus:border-secondary focus:ring-2"
            placeholder={t("contact.messagePh")}
          />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center rounded-full bg-secondary px-6 py-2 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-secondary/90 disabled:opacity-60"
        >
          {status === "sending" ? t("contact.submitting") : t("contact.submit")}
        </button>
        {status === "success" && (
          <p className="text-xs text-emerald-400">{t("contact.successMsg")}</p>
        )}
        {status === "error" && (
          <p className="text-xs text-red-400">{t("contact.errorMsg")}</p>
        )}
      </form>
    </div>
  );
}
