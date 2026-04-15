"use client";

import { useState } from "react";

export default function PilotPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );

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

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
        Pilot Program
      </h1>
      <p className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
        Refineries processing 50,000+ bbl/day can request participation in the
        EPM pilot program here. The final form will capture the data required
        for custom ROI calculation and technical validation.
      </p>
      <form action={handleSubmit} className="max-w-xl space-y-4">
        <div className="space-y-1.5">
          <label
            htmlFor="name"
            className="block text-xs font-medium text-slate-200"
          >
            Full name
          </label>
          <input
            id="name"
            name="name"
            className="w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-secondary/40 placeholder:text-slate-500 focus:border-secondary focus:ring-2"
            placeholder="Your name"
          />
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="company"
            className="block text-xs font-medium text-slate-200"
          >
            Company
          </label>
          <input
            id="company"
            name="company"
            className="w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-secondary/40 placeholder:text-slate-500 focus:border-secondary focus:ring-2"
            placeholder="Refinery name"
          />
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="block text-xs font-medium text-slate-200"
          >
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-secondary/40 placeholder:text-slate-500 focus:border-secondary focus:ring-2"
            placeholder="you@example.com"
          />
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="capacityBpd"
            className="block text-xs font-medium text-slate-200"
          >
            Refinery capacity (bbl/day)
          </label>
          <input
            id="capacityBpd"
            name="capacityBpd"
            type="number"
            min={0}
            className="w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-secondary/40 placeholder:text-slate-500 focus:border-secondary focus:ring-2"
            placeholder="e.g. 150000"
          />
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="crudeType"
            className="block text-xs font-medium text-slate-200"
          >
            Dominant crude type
          </label>
          <input
            id="crudeType"
            name="crudeType"
            className="w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-secondary/40 placeholder:text-slate-500 focus:border-secondary focus:ring-2"
            placeholder="Light sweet, medium sour, heavy sour…"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-secondary px-6 py-2 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-secondary/90"
        >
          Request pilot evaluation
        </button>
        {status === "success" && (
          <p className="text-xs text-emerald-400">
            Thank you — the team will review your pilot request.
          </p>
        )}
        {status === "error" && (
          <p className="text-xs text-red-400">
            Something went wrong. Please try again later.
          </p>
        )}
      </form>
    </div>
  );
}

