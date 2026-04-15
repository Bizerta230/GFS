export default function ComparisonPage() {
  const rows = [
    {
      category: "Demulsification",
      traditional: "Electrostatic desalter — $2–5M CAPEX + $0.05–0.15/bbl operating",
      epm: "$0 CAPEX. Included in EPM dose.",
      advantage: "Eliminates capital cost",
    },
    {
      category: "Partial Desulfurization",
      traditional: "HDS unit — $100–500M CAPEX. Requires H₂, high pressure.",
      epm: "30–40% sulfur reduction. No H₂ required. Reduces HDS load.",
      advantage: "Reduces HDS operating costs",
    },
    {
      category: "Combustion Enhancement",
      traditional: "Cetane improvers $0.10–0.30/bbl + FBC additives $0.05–0.15/bbl",
      epm: "Included in EPM. 95–99% combustion efficiency.",
      advantage: "Higher energy yield per barrel",
    },
    {
      category: "Emission Reduction",
      traditional: "SCR $50–200K + DPF $10–50K + EGR systems. Ongoing maintenance.",
      epm: "NOx ×284, CO ×10, SO₂ ×15,000 below limits (preliminary data).",
      advantage: "Exceeds IMO 2020, EPA Tier 4",
    },
    {
      category: "Biocide & Anti-Corrosion",
      traditional: "Biobor JF $0.05–0.10/bbl + corrosion inhibitors $0.10–0.25/bbl",
      epm: "Included in EPM. Eliminates microbial and corrosion root causes.",
      advantage: "Single product replaces two",
    },
  ];

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
          Technology
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
          EPM vs. Traditional Approach
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
          A direct comparison of EPM against the conventional multi-product approach
          across all five performance areas.
        </p>
      </section>

      {/* Summary cards */}
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-center space-y-1">
          <p className="text-3xl font-bold text-red-400">$0.65–5.80</p>
          <p className="text-xs text-slate-400">Traditional (USD/bbl combined)</p>
        </div>
        <div className="flex items-center justify-center">
          <span className="text-2xl font-bold text-slate-500">vs</span>
        </div>
        <div className="rounded-2xl border border-secondary/30 bg-secondary/5 p-5 text-center space-y-1">
          <p className="text-3xl font-bold text-green-400">$1.50–3.00</p>
          <p className="text-xs text-slate-400">EPM (USD/bbl all-in)</p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="overflow-x-auto rounded-2xl border border-slate-800">
        <table className="w-full text-xs text-slate-300">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/80 text-left">
              <th className="px-4 py-3 font-semibold text-slate-200 w-40">Function</th>
              <th className="px-4 py-3 font-semibold text-slate-200">Traditional</th>
              <th className="px-4 py-3 font-semibold text-secondary">EPM</th>
              <th className="px-4 py-3 font-semibold text-slate-200 w-44">Advantage</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.category}
                className={`border-b border-slate-800/60 ${i % 2 === 0 ? "bg-slate-950/40" : "bg-slate-900/20"}`}
              >
                <td className="px-4 py-4 font-medium text-slate-100">{row.category}</td>
                <td className="px-4 py-4 leading-relaxed text-red-300/80">{row.traditional}</td>
                <td className="px-4 py-4 leading-relaxed text-green-300/80">{row.epm}</td>
                <td className="px-4 py-4 text-secondary">{row.advantage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Disclaimer */}
      <section className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
        <p className="text-xs text-amber-300/80">
          <span className="font-semibold">Note:</span> All EPM performance data is preliminary
          and based on initial testing. Results are subject to independent verification.
          EPM does not fully replace HDS — conventional desulfurization is still required
          for regulatory compliance.
        </p>
      </section>
    </div>
  );
}
