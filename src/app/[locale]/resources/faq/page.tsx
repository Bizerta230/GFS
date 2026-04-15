"use client";
import { useState } from "react";

const faqs = [
  {
    q: "What is EPM and what does it do?",
    a: "EPM (Enhanced Performance Material) is a multifunctional fuel additive that replaces 3–5 separate chemical products. In a single dose, it provides: (1) demulsification — separates water from crude, (2) partial desulfurization — reduces sulfur content 30–40%, (3) combustion enhancement — raises efficiency to 95–99%, (4) emission reduction — NOx, CO, and SO₂ well below regulatory limits, and (5) biocide/anti-corrosion — protects tanks, pipelines, and engines from microbial and corrosion damage.",
  },
  {
    q: "What is the typical cost of EPM per barrel?",
    a: "EPM is priced at $1.50–3.00 per barrel all-in. For medium-sour and heavy-sour crude, this is already below the combined cost of the products it replaces ($1.50–5.80/bbl). For light sweet crude, operators typically break even at around $1.71/bbl EPM cost. Use the ROI Calculator to get a precise estimate for your specific throughput and crude grade.",
  },
  {
    q: "Does EPM replace HDS (Hydrodesulfurization)?",
    a: "No — EPM reduces sulfur content by 30–40%, which reduces HDS unit loading and operating cost, but does not eliminate the need for HDS for regulatory compliance. HDS is still required for final sulfur specs. EPM's value in desulfurization is reducing the HDS load, saving catalyst consumption, hydrogen cost, and energy.",
  },
  {
    q: "What crude grades is EPM compatible with?",
    a: "EPM is designed for light sweet, medium sour, and heavy sour crude grades. The economic case is strongest for medium and heavy sour crudes, where EPM's demulsification and partial desulfurization functions provide the most value relative to traditional approaches.",
  },
  {
    q: "Has EPM been independently verified?",
    a: "Performance data shared on this site is preliminary and based on initial testing. Independent third-party verification is underway. Pilot program partners receive full test data and methodology documentation. We do not make regulatory compliance claims beyond what has been verified.",
  },
  {
    q: "How is EPM dosed and at what point in the process?",
    a: "EPM can be introduced at multiple points: wellhead, gathering station, crude storage tank, or refinery inlet. The optimal dosing point depends on which functions are prioritized. For demulsification, dosing upstream of the desalter is typical. For combustion and emission benefits, dosing before the combustion unit is required. Our technical team determines the optimal injection strategy for each site during the pilot phase.",
  },
  {
    q: "What is the minimum throughput to justify EPM?",
    a: "EPM delivers positive ROI at throughputs as low as 10,000 bbl/day for medium and heavy sour crudes where it replaces expensive multi-additive stacks. At higher throughputs (100K+ bbl/day), the per-barrel cost savings compound quickly. The ROI Calculator on this site supports throughput from 5,000 to 500,000 bbl/day.",
  },
  {
    q: "How do I start a pilot program?",
    a: "Contact us via the Pilot Request form or through the contact page. A typical pilot engagement includes: (1) technical review of your crude slate and current additive stack, (2) baseline testing, (3) supervised EPM introduction at agreed dosing points, (4) comparative performance reporting over 30–90 days. Pilots are structured as commercially valid agreements, not free trials.",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Resources</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
          Frequently Asked Questions
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-300">
          Technical, commercial, and operational questions about EPM. For real-time answers,
          use the chat assistant in the bottom-right corner.
        </p>
      </section>

      <section className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="rounded-2xl border border-slate-800 bg-slate-900/50">
            <button
              className="flex w-full items-center justify-between px-5 py-4 text-left"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
            >
              <span className="text-sm font-medium text-slate-100 pr-4">{faq.q}</span>
              <span className="flex-shrink-0 text-secondary text-lg leading-none">
                {openIndex === i ? "−" : "+"}
              </span>
            </button>
            {openIndex === i && (
              <div className="border-t border-slate-800 px-5 py-4">
                <p className="text-xs leading-relaxed text-slate-400">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </section>

      <section className="rounded-xl border border-secondary/20 bg-secondary/5 p-5 space-y-2">
        <p className="text-sm font-semibold text-slate-100">Still have questions?</p>
        <p className="text-xs text-slate-400">
          Our AI agent is trained on the full EPM knowledge base. Use the chat widget
          in the bottom-right corner for instant answers, or{" "}
          <a href="/contact" className="text-secondary underline underline-offset-2">contact us</a>{" "}
          directly.
        </p>
      </section>
    </div>
  );
}
