export default function TechnologyDataPage() {
  const datasets = [
    {
      test: "Sulfur Content — Medium Sour Crude",
      method: "ASTM D4294 (X-ray fluorescence)",
      baseline: "2,200 ppm S",
      result: "1,340 ppm S",
      reduction: "39%",
      status: "Preliminary",
    },
    {
      test: "Combustion Efficiency — HFO",
      method: "Bomb calorimetry + exhaust gas analysis",
      baseline: "87.3%",
      result: "97.1%",
      reduction: "+9.8 pp",
      status: "Preliminary",
    },
    {
      test: "NOx Emissions — Marine Diesel",
      method: "FTIR exhaust analysis, IMO NOx cycle",
      baseline: "11.2 g/kWh",
      result: "0.039 g/kWh",
      reduction: "×284 below limit",
      status: "Preliminary",
    },
    {
      test: "CO Emissions — Marine Diesel",
      method: "FTIR exhaust analysis",
      baseline: "4.1 g/kWh",
      result: "0.41 g/kWh",
      reduction: "×10 below limit",
      status: "Preliminary",
    },
    {
      test: "SO₂ Emissions",
      method: "FTIR exhaust analysis",
      baseline: "7,500 mg/Nm³",
      result: "0.48 mg/Nm³",
      reduction: "×15,000 below limit",
      status: "Preliminary",
    },
    {
      test: "Demulsification — Water-in-Oil Emulsion",
      method: "ASTM D1796 centrifuge test",
      baseline: "Stable emulsion (BSW 12%)",
      result: "BSW <0.5%",
      reduction: "97% water removal",
      status: "Preliminary",
    },
    {
      test: "Microbial Growth Inhibition",
      method: "ASTM E2315 — sulfate-reducing bacteria",
      baseline: "1.2 × 10⁶ CFU/mL",
      result: "<10 CFU/mL",
      reduction: ">99.99% reduction",
      status: "Preliminary",
    },
  ];

  const limitations = [
    "All data from controlled lab conditions or limited field samples — not large-scale continuous operations.",
    "Sulfur reduction results vary by crude composition and sulfur speciation. Organosulfur compounds respond differently than H₂S.",
    "Combustion efficiency data based on specific engine types. Results in different combustion systems may vary.",
    "NOx/SO₂/CO emission data requires independent verification under regulatory test protocols.",
    "EPM does not replace HDS for regulatory compliance — it reduces HDS load.",
    "Long-term corrosion protection data is pending extended field testing.",
  ];

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Technology</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
          Test Data &amp; Results
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-300">
          Preliminary performance data from laboratory and initial field testing.
          All results are marked as preliminary and are subject to independent verification.
          We publish this data transparently — including limitations.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-100">Performance Data Table</h2>
        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full text-xs text-slate-300">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80 text-left">
                <th className="px-4 py-3 font-semibold text-slate-200">Test</th>
                <th className="px-4 py-3 font-semibold text-slate-200">Method</th>
                <th className="px-4 py-3 font-semibold text-slate-400">Baseline</th>
                <th className="px-4 py-3 font-semibold text-green-400">With EPM</th>
                <th className="px-4 py-3 font-semibold text-secondary">Result</th>
                <th className="px-4 py-3 font-semibold text-amber-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {datasets.map((row, i) => (
                <tr key={row.test} className={`border-b border-slate-800/60 ${i % 2 === 0 ? "bg-slate-950/40" : "bg-slate-900/20"}`}>
                  <td className="px-4 py-3 font-medium text-slate-100 leading-snug">{row.test}</td>
                  <td className="px-4 py-3 text-slate-500 leading-snug">{row.method}</td>
                  <td className="px-4 py-3 text-slate-400">{row.baseline}</td>
                  <td className="px-4 py-3 text-green-300/80">{row.result}</td>
                  <td className="px-4 py-3 font-semibold text-secondary">{row.reduction}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full border border-amber-600/40 bg-amber-500/10 px-2 py-0.5 text-[10px] text-amber-400">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-100">Known Limitations</h2>
        <ul className="space-y-2">
          {limitations.map((l, i) => (
            <li key={i} className="flex gap-3 text-xs text-slate-400 leading-relaxed">
              <span className="mt-0.5 flex-shrink-0 text-amber-500">⚠</span>
              <span>{l}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-secondary/20 bg-secondary/5 p-5 space-y-2">
        <p className="text-sm font-semibold text-slate-100">Access full test reports</p>
        <p className="text-xs text-slate-400 leading-relaxed">
          Complete test methodology, raw data, and analysis are available to pilot program
          partners and qualified technical reviewers under NDA.{" "}
          <a href="/contact" className="text-secondary underline underline-offset-2">Contact us</a>{" "}
          to request access.
        </p>
      </section>
    </div>
  );
}
