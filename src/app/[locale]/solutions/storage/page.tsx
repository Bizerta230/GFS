export default function StorageSolutionsPage() {
  const problems = [
    {
      problem: "Microbial contamination",
      traditional: "Biobor JF or similar biocides dosed separately — $0.05–0.10/bbl, regular re-dosing required",
      epm: "EPM's biocide function eliminates bacteria and fungi at root cause. Included in standard dose.",
    },
    {
      problem: "Tank corrosion & pitting",
      traditional: "Amine-based corrosion inhibitors $0.10–0.25/bbl, plus inspection and maintenance costs",
      epm: "EPM forms a protective layer on metal surfaces. Corrosion inhibitor included in EPM dose.",
    },
    {
      problem: "Sludge accumulation",
      traditional: "Periodic tank cleaning required — costly downtime, waste disposal fees",
      epm: "EPM's demulsification and biocide chemistry prevents sludge formation at source.",
    },
    {
      problem: "Phase separation in blends",
      traditional: "Stability additives and re-blending required, especially for bio-blend storage",
      epm: "EPM stabilizes fuel chemistry and prevents phase separation in long-term storage.",
    },
  ];

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Solutions</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
          Storage &amp; Transportation
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
          Long-term fuel storage and pipeline transportation introduce corrosion, microbial
          growth, and sludge accumulation that reduce fuel quality and increase maintenance costs.
          EPM&apos;s biocide and anti-corrosion functions protect infrastructure from the inside out.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-100">Problem → EPM Solution</h2>
        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full text-xs text-slate-300">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80 text-left">
                <th className="px-4 py-3 font-semibold text-slate-200">Problem</th>
                <th className="px-4 py-3 font-semibold text-red-400">Traditional Approach</th>
                <th className="px-4 py-3 font-semibold text-green-400">EPM Solution</th>
              </tr>
            </thead>
            <tbody>
              {problems.map((row, i) => (
                <tr key={row.problem} className={`border-b border-slate-800/60 ${i % 2 === 0 ? "bg-slate-950/40" : "bg-slate-900/20"}`}>
                  <td className="px-4 py-4 font-medium text-slate-100 w-36">{row.problem}</td>
                  <td className="px-4 py-4 leading-relaxed text-red-300/80">{row.traditional}</td>
                  <td className="px-4 py-4 leading-relaxed text-green-300/80">{row.epm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { value: "$0.15–0.35", label: "Biocide + corrosion inhibitor replaced", sub: "per barrel, traditional cost" },
          { value: "1 SKU", label: "One product for all storage needs", sub: "biocide + anti-corrosion + demulsification" },
          { value: "Extended", label: "Tank inspection intervals", sub: "reduced fouling and corrosion rate" },
        ].map((m) => (
          <div key={m.label} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-1">
            <p className="text-xl font-bold text-secondary">{m.value}</p>
            <p className="text-sm font-medium text-slate-100">{m.label}</p>
            <p className="text-xs text-slate-400">{m.sub}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
