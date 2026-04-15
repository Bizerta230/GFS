"use client";
import { useState } from "react";

export default function DemoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", company: "", role: "", email: "", phone: "",
    throughput: "", crude: "", interest: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: POST to /api/lead when CRM is wired
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <span className="text-4xl">✓</span>
        <h2 className="text-xl font-semibold text-slate-100">Request received</h2>
        <p className="max-w-sm text-sm text-slate-400">
          We will review your details and reach out within one business day to
          schedule a consultation or live demo.
        </p>
        <a href="/" className="mt-4 rounded-full bg-secondary px-6 py-2.5 text-xs font-semibold text-slate-950 hover:bg-secondary/90">
          Back to home
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Get started</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
          Request a Demo or Consultation
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-300">
          Tell us about your operation and we will schedule a live demonstration
          of the EPM ROI calculator, technical briefing, or a pilot program consultation.
          No sales pitch — just substance.
        </p>
      </section>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Full name *</label>
            <input required name="name" value={form.name} onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-secondary focus:outline-none"
              placeholder="John Smith" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Company *</label>
            <input required name="company" value={form.company} onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-secondary focus:outline-none"
              placeholder="Refinery / Operator name" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Role / Title *</label>
            <input required name="role" value={form.role} onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-secondary focus:outline-none"
              placeholder="VP Operations, Chief Engineer…" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Work email *</label>
            <input required type="email" name="email" value={form.email} onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-secondary focus:outline-none"
              placeholder="you@company.com" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Phone / WhatsApp</label>
            <input name="phone" value={form.phone} onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-secondary focus:outline-none"
              placeholder="+1 555 000 0000" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Throughput (bbl/day)</label>
            <input name="throughput" value={form.throughput} onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-secondary focus:outline-none"
              placeholder="e.g. 100,000" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-300">Primary crude grade</label>
          <select name="crude" value={form.crude} onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 focus:border-secondary focus:outline-none">
            <option value="">Select crude type…</option>
            <option value="light_sweet">Light Sweet</option>
            <option value="medium_sour">Medium Sour</option>
            <option value="heavy_sour">Heavy Sour</option>
            <option value="marine_hfo">Marine HFO / VLSFO</option>
            <option value="other">Other / Mixed</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-300">What are you most interested in?</label>
          <textarea name="interest" value={form.interest} onChange={handleChange} rows={3}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-secondary focus:outline-none resize-none"
            placeholder="e.g. cost reduction, emission compliance, pilot program, investment discussion…" />
        </div>

        <button type="submit"
          className="rounded-full bg-secondary px-8 py-3 text-sm font-semibold text-slate-950 transition hover:bg-secondary/90">
          Request Demo
        </button>
      </form>
    </div>
  );
}
