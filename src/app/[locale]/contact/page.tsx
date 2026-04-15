"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );

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

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
        Contact GFS
      </h1>
      <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
        Share a few details about your refinery or operation and the GFS team
        will follow up with preliminary analysis and next steps.
      </p>
      <form action={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label
            className="block text-xs font-medium text-slate-200"
            htmlFor="name"
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
            className="block text-xs font-medium text-slate-200"
            htmlFor="company"
          >
            Company
          </label>
          <input
            id="company"
            name="company"
            className="w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-secondary/40 placeholder:text-slate-500 focus:border-secondary focus:ring-2"
            placeholder="Company name"
          />
        </div>
        <div className="space-y-1.5">
          <label
            className="block text-xs font-medium text-slate-200"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-secondary/40 placeholder:text-slate-500 focus:border-secondary focus:ring-2"
            placeholder="you@example.com"
          />
        </div>
        <div className="space-y-1.5">
          <label
            className="block text-xs font-medium text-slate-200"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            rows={4}
            id="message"
            name="message"
            className="w-full resize-none rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-secondary/40 placeholder:text-slate-500 focus:border-secondary focus:ring-2"
            placeholder="Share context about your refinery, capacity, and current additive approach."
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-secondary px-6 py-2 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-secondary/90"
        >
          Submit
        </button>
        {status === "success" && (
          <p className="text-xs text-emerald-400">
            Thank you — your message has been received.
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

