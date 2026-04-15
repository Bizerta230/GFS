export default function UpstreamSolutionsPage() {
  const useCases = [
    {
      title: "Wellhead emulsion breaking",
      body: "Produced crude from wellheads arrives as a water-in-oil emulsion. Traditional electrostatic desalters require $2–5M CAPEX. EPM breaks emulsions chemically, eliminating or significantly downsizing desalting equipment.",
    },
    {
      title: "Pipeline flow assurance",
      body: "Waxy crude in long-distance pipelines gels during shutdowns and temperature drops. EPM modifies wax crystal structure, reducing pour point and restart pressure — lowering pump energy and pigging frequency.",
    },
    {
      title: "Produced water treatment",
      body: "Microbial activity in produced water causes souring and H₂S generation. EPM's biocide function inhibits sulfate-reducing bacteria at the wellbore level, reducing H₂S risk upstream before it reaches surface facilities.",
    },
    {
      title: "Crude stabilization before transport",
      body: "Unstabilized crude shipped to refineries with high water, sediment, or microbial load incurs demurrage penalties and processing surcharges. EPM-treated crude arrives cleaner and more consistent.",
    },
  ];

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Solutions</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
          Upstream Solutions
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
          Upstream crude quality directly determines downstream refinery costs. EPM applied at
          the wellhead or gathering station reduces variability, prevents souring, breaks emulsions,
          and improves flow — so refineries receive better feedstock with fewer surprises.
        </p>
      </section>

      <section className="grid gap-5 sm:grid-cols-2">
        {useCases.map((u) => (
          <div key={u.title} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 space-y-2">
            <h3 className="text-sm font-semibold text-slate-100">{u.title}</h3>
            <p className="text-xs leading-relaxed text-slate-400">{u.body}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-secondary/20 bg-secondary/5 p-6 space-y-2">
        <h2 className="text-base font-semibold text-slate-100">
          Integrated upstream–downstream value chain
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          EPM is the only additive that can be applied at the wellhead and continue delivering
          value through transportation, storage, and refinery processing — without reapplication
          or chemical incompatibility. One chemistry, the full value chain.
        </p>
      </section>
    </div>
  );
}
