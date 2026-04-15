export default function RefinerySolutionsPage() {
  const metrics = [
    { value: "30–40%", label: "Sulfur reduction", sub: "without additional HDS load" },
    { value: "95–99%", label: "Combustion efficiency", sub: "vs. 85–90% baseline" },
    { value: "$1.50–3.00", label: "All-in cost per barrel", sub: "replaces 3–5 separate additives" },
    { value: "<6 mo", label: "Typical payback", sub: "for medium-sour crude operations" },
  ];

  const challenges = [
    {
      title: "Crude quality variability",
      body: "High-sulfur and high-paraffin crudes stress desalters, foul heat exchangers, and push HDS units to capacity limits. EPM addresses all three vectors in a single dosing point.",
    },
    {
      title: "Regulatory tightening",
      body: "IMO 2020, EPA Tier 4, and regional NOx/SO₂ caps require emission controls that traditionally cost $50–200K per unit. EPM's combustion chemistry produces NOx 284× below IMO limits and SO₂ 15,000× below limits (preliminary data).",
    },
    {
      title: "Multi-additive procurement",
      body: "Refineries typically manage separate procurement, dosing, and QA for 3–5 additives: demulsifiers, cetane improvers, biocides, corrosion inhibitors, and FBC additives. EPM consolidates all five into one SKU.",
    },
    {
      title: "Desalter CAPEX",
      body: "Electrostatic desalters cost $2–5M in capital plus $0.05–0.15/bbl operating. EPM's demulsification function eliminates the need in many crude grades — zero CAPEX, included in the per-barrel dose.",
    },
  ];

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Solutions</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
          Refinery &amp; Crude Processing
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
          EPM was engineered for refinery-scale throughput. A single additive manages
          demulsification, partial desulfurization, combustion optimization, emission reduction,
          and biocide/corrosion protection — across light sweet to heavy sour crude grades.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-1">
            <p className="text-2xl font-bold text-secondary">{m.value}</p>
            <p className="text-sm font-medium text-slate-100">{m.label}</p>
            <p className="text-xs text-slate-400">{m.sub}</p>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-100">Challenges EPM Solves</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {challenges.map((c) => (
            <div key={c.title} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 space-y-2">
              <h3 className="text-sm font-semibold text-slate-100">{c.title}</h3>
              <p className="text-xs leading-relaxed text-slate-400">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-100">Breakeven by Crude Grade</h2>
        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full text-xs text-slate-300">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80 text-left">
                <th className="px-4 py-3 font-semibold text-slate-200">Crude Type</th>
                <th className="px-4 py-3 font-semibold text-slate-200">Traditional ($/bbl)</th>
                <th className="px-4 py-3 font-semibold text-secondary">EPM ($/bbl)</th>
                <th className="px-4 py-3 font-semibold text-green-400">Breakeven</th>
              </tr>
            </thead>
            <tbody>
              {[
                { type: "Light Sweet",  trad: "$0.65–1.20", epm: "$1.50–1.71", be: "~$1.71/bbl" },
                { type: "Medium Sour",  trad: "$1.50–3.00", epm: "$2.20–2.81", be: "~$2.81/bbl" },
                { type: "Heavy Sour",   trad: "$3.50–5.80", epm: "$2.80–3.00", be: "~$4.68/bbl" },
              ].map((row, i) => (
                <tr key={row.type} className={`border-b border-slate-800/60 ${i % 2 === 0 ? "bg-slate-950/40" : "bg-slate-900/20"}`}>
                  <td className="px-4 py-3 font-medium text-slate-100">{row.type}</td>
                  <td className="px-4 py-3 text-red-300/80">{row.trad}</td>
                  <td className="px-4 py-3 text-green-300/80">{row.epm}</td>
                  <td className="px-4 py-3 text-green-400 font-medium">{row.be}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
        <p className="text-xs text-amber-300/80">
          <span className="font-semibold">Note:</span> All performance data is preliminary and based
          on initial testing. Results are subject to independent verification. EPM does not fully
          replace conventional HDS for regulatory compliance.
        </p>
      </section>
    </div>
  );
}
