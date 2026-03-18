export default function Home() {
  return (
    <div className="space-y-16">
      <section className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-center">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            GFS EPM Platform
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
            One additive. Five functions. Zero compromise.
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            EPM replaces 3–5 separate chemical additives with a single
            multifunctional solution — reducing costs, emissions, and
            operational complexity for refinery-scale customers.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/calculator"
              className="inline-flex items-center justify-center rounded-full bg-secondary px-6 py-2 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-secondary/90"
            >
              Calculate Your Savings
            </a>
            <a
              href="/technology/how-it-works"
              className="inline-flex items-center justify-center rounded-full border border-slate-600 px-6 py-2 text-sm font-semibold text-slate-100 transition hover:border-secondary hover:text-secondary"
            >
              Learn the Science
            </a>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-200 shadow-[0_0_60px_rgba(15,23,42,0.9)]">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
            Five functions in one
          </p>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-secondary" />
              <div>
                <p className="font-medium text-slate-50">Demulsification</p>
                <p className="text-xs text-slate-300">
                  Efficient water separation for stable downstream operations.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-secondary" />
              <div>
                <p className="font-medium text-slate-50">
                  Partial desulfurization
                </p>
                <p className="text-xs text-slate-300">
                  30–40% sulfur reduction, lowering reliance on conventional
                  HDS.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-secondary" />
              <div>
                <p className="font-medium text-slate-50">
                  Combustion enhancement
                </p>
                <p className="text-xs text-slate-300">
                  Up to 95–99% combustion efficiency for improved energy yield.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-secondary" />
              <div>
                <p className="font-medium text-slate-50">Emission reduction</p>
                <p className="text-xs text-slate-300">
                  NOx emissions up to ×284 below Euro 6 thresholds.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-secondary" />
              <div>
                <p className="font-medium text-slate-50">
                  Biocide & anti-corrosion
                </p>
                <p className="text-xs text-slate-300">
                  Protects storage and transport infrastructure over the full
                  lifecycle.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="grid gap-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 text-sm text-slate-200 sm:grid-cols-4">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
            Cost per barrel
          </p>
          <p className="mt-2 text-xl font-semibold text-slate-50">
            $0.65–5.80 → $1.50–3.00
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Consolidate 3–5 additive vendors into a single EPM solution.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
            Functions
          </p>
          <p className="mt-2 text-xl font-semibold text-slate-50">5 in 1</p>
          <p className="mt-1 text-xs text-slate-400">
            One product covering demulsification, desulfurization, combustion,
            emissions, and protection.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
            Combustion
          </p>
          <p className="mt-2 text-xl font-semibold text-slate-50">
            95–99% efficiency
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Higher yield and more stable operations across crude blends.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
            Emissions
          </p>
          <p className="mt-2 text-xl font-semibold text-slate-50">
            ×284 below Euro 6
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Preliminary data shows dramatic reductions in NOx and related
            pollutants.
          </p>
        </div>
      </section>
    </div>
  );
}

