"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function PilotPage() {
  const t = useTranslations();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(formData: FormData) {
    setStatus("sending");
    try {
      const payload = {
        source: "pilot" as const,
        name: String(formData.get("name") || ""),
        company: String(formData.get("company") || ""),
        email: String(formData.get("email") || ""),
        meta: {
          capacityBpd: String(formData.get("capacityBpd") || ""),
          crudeType: String(formData.get("crudeType") || ""),
        },
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
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
          {t("pilot.badge")}
        </p>
        <h1 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
          {t("pilot.title")}
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
          {t("pilot.desc")}
        </p>
      </div>

      <form action={handleSubmit} className="max-w-xl space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="name" className="block text-xs font-medium text-slate-200">
            {t("pilot.nameLbl")}
          </label>
          <input
            id="name" name="name"
            className="w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-secondary/40 placeholder:text-slate-500 focus:border-secondary focus:ring-2"
            placeholder={t("pilot.namePh")}
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="company" className="block text-xs font-medium text-slate-200">
            {t("pilot.companyLbl")}
          </label>
          <input
            id="company" name="company"
            className="w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-secondary/40 placeholder:text-slate-500 focus:border-secondary focus:ring-2"
            placeholder={t("pilot.companyPh")}
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-xs font-medium text-slate-200">
            {t("pilot.emailLbl")}
          </label>
          <input
            id="email" name="email" type="email"
            className="w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-secondary/40 placeholder:text-slate-500 focus:border-secondary focus:ring-2"
            placeholder={t("pilot.emailPh")}
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="capacityBpd" className="block text-xs font-medium text-slate-200">
            {t("pilot.capacityLbl")}
          </label>
          <input
            id="capacityBpd" name="capacityBpd" type="number" min={0}
            className="w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-secondary/40 placeholder:text-slate-500 focus:border-secondary focus:ring-2"
            placeholder={t("pilot.capacityPh")}
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="crudeType" className="block text-xs font-medium text-slate-200">
            {t("pilot.crudeLbl")}
          </label>
          <input
            id="crudeType" name="crudeType"
            className="w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-secondary/40 placeholder:text-slate-500 focus:border-secondary focus:ring-2"
            placeholder={t("pilot.crudePh")}
          />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center rounded-full bg-secondary px-6 py-2 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-secondary/90 disabled:opacity-60"
        >
          {status === "sending" ? t("pilot.submitting") : t("pilot.submit")}
        </button>
        {status === "success" && (
          <p className="text-xs text-emerald-400">{t("pilot.successMsg")}</p>
        )}
        {status === "error" && (
          <p className="text-xs text-red-400">{t("pilot.errorMsg")}</p>
        )}
      </form>
    </div>
  );
}
