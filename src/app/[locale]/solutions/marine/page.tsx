export default function MarineSolutionsPage() {
  const benefits = [
    {
      icon: "⚓",
      title: "IMO 2020 / MARPOL Annex VI compliance",
      body: "EPM's combustion chemistry reduces SO₂ emissions 15,000× below IMO Annex VI limits and NOx 284× below Tier III limits (preliminary data). Ships meet emission standards without scrubbers or fuel switching.",
    },
    {
      icon: "🛢️",
      title: "Bunker fuel stability",
      body: "Low-quality HFO and VLSFO blends are prone to microbial contamination and sludge formation. EPM's biocide function eliminates bacteria and fungi at source, extending tank cleanliness between washes.",
    },
    {
      icon: "⚙️",
      title: "Engine protection & efficiency",
      body: "EPM's combustion catalyst and corrosion inhibitor work together: cleaner combustion reduces carbon deposits, while corrosion protection extends injector and cylinder liner life. Operators report reduced maintenance intervals.",
    },
    {
      icon: "📦",
      title: "Single product, simpler logistics",
      body: "Fleet operators managing multiple additive SKUs across bunkering ports face constant inventory and compatibility challenges. EPM is one product — one order, one handling procedure, one SDS.",
    },
  ];

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Solutions</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
          Marine Fuel Solutions
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
          The maritime industry faces tightening emission regulations, fuel quality variability,
          and pressure to reduce operating costs. EPM addresses all three simultaneously — in a
          single, bunkering-compatible additive.
        </p>
      </section>

      <section className="grid gap-5 sm:grid-cols-2">
        {benefits.map((b) => (
          <div key={b.title} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 space-y-3">
            <span className="text-2xl">{b.icon}</span>
            <h3 className="text-sm font-semibold text-slate-100">{b.title}</h3>
            <p className="text-xs leading-relaxed text-slate-400">{b.body}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-secondary/20 bg-secondary/5 p-6 space-y-3">
        <h2 className="text-lg font-semibold text-slate-100">Emission Performance Summary</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "NOx", value: "284×", sub: "below IMO Tier III" },
            { label: "CO",  value: "10×",  sub: "below EPA limits" },
            { label: "SO₂", value: "15,000×", sub: "below IMO Annex VI" },
          ].map((s) => (
            <div key={s.label} className="text-center space-y-1">
              <p className="text-xs font-medium text-slate-400">{s.label}</p>
              <p className="text-2xl font-bold text-green-400">{s.value}</p>
              <p className="text-xs text-slate-500">{s.sub}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-amber-300/70 pt-2">Preliminary data. Subject to independent verification.</p>
      </section>
    </div>
  );
}
