export default function InvestorsPage() {
  const highlights = [
    {
      label: "Market size",
      value: "$12B+",
      sub: "Global fuel additives market (2024)",
    },
    {
      label: "Target segment",
      value: "$3.2B",
      sub: "Refinery & marine chemical treatments",
    },
    {
      label: "EPM unit economics",
      value: "$1.50–3.00/bbl",
      sub: "vs. $0.65–5.80/bbl traditional stack",
    },
    {
      label: "Addressable customers",
      value: "700+",
      sub: "Refineries globally processing >50K bbl/day",
    },
  ];

  const stages = [
    { phase: "Completed", title: "Product development", desc: "EPM formulation finalized. Preliminary lab data across all 5 functions." },
    { phase: "Active", title: "Pilot program", desc: "First pilot engagements underway. Performance data collection and independent verification." },
    { phase: "Next", title: "Commercial launch", desc: "First paying customers. Distribution agreements in target geographies." },
    { phase: "Scale", title: "Geographic expansion", desc: "Middle East, Southeast Asia, and Latin America refinery markets." },
  ];

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Investors</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
          Investor Overview
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-300">
          GFS is commercializing EPM — a proprietary multifunctional petroleum additive that
          replaces a $0.65–5.80/bbl multi-product chemical stack with a single $1.50–3.00/bbl
          solution. We are at the pilot-to-commercial transition stage.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((h) => (
          <div key={h.label} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-1">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{h.label}</p>
            <p className="text-2xl font-bold text-secondary">{h.value}</p>
            <p className="text-xs text-slate-400">{h.sub}</p>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-100">Development Roadmap</h2>
        <div className="space-y-3">
          {stages.map((s) => (
            <div key={s.phase} className="flex gap-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <span className={`mt-0.5 flex-shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold h-fit
                ${s.phase === "Completed" ? "bg-green-500/10 text-green-400 border border-green-700/40" :
                  s.phase === "Active" ? "bg-secondary/10 text-secondary border border-secondary/40" :
                  "bg-slate-800 text-slate-500 border border-slate-700"}`}>
                {s.phase}
              </span>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-100">{s.title}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-secondary/20 bg-secondary/5 p-6 space-y-3">
        <h2 className="text-base font-semibold text-slate-100">Request investor materials</h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          Qualified investors can request an investor deck, financial model, and technical
          validation package. All materials are shared under NDA.
        </p>
        <a href="/contact"
          className="inline-block rounded-full bg-secondary px-5 py-2.5 text-xs font-semibold text-slate-950 transition hover:bg-secondary/90">
          Request Investor Deck
        </a>
      </section>

      <section className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
        <p className="text-xs text-amber-300/80">
          <span className="font-semibold">Disclaimer:</span> This page contains forward-looking
          statements and preliminary performance data. Market size figures are based on
          publicly available industry reports. EPM performance data is preliminary and subject
          to independent verification. Nothing on this page constitutes an offer or solicitation
          of investment.
        </p>
      </section>
    </div>
  );
}
