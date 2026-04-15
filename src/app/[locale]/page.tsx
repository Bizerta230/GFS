export default function TechnologyPage() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
          Technology
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
          How EPM Works
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
          EPM (Enhanced Performance Material) is a multifunctional fuel additive
          that replaces 3–5 separate chemical products with a single solution.
          It operates across the entire fuel lifecycle — from crude processing
          to final combustion.
        </p>
      </section>

      {/* Five Functions Detail */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold text-slate-50">
          Five Functions in One Product
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Function 1 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 text-lg">
                💧
              </span>
              <h3 className="text-lg font-semibold text-slate-50">Demulsification</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-300">
              Efficient water-oil separation without energy-intensive
              electrostatic desalters. EPM breaks emulsions at the molecular
              level, achieving separation within 30 days of treatment with zero
              external energy input.
            </p>
            <div className="rounded-lg bg-slate-800/50 p-3 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Replaces:</span>{" "}
              Electrostatic desalters ($2–5M CAPEX), chemical demulsifiers ($0.05–0.15/bbl)
            </div>
          </div>

          {/* Function 2 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-400 text-lg">
                ⚗️
              </span>
              <h3 className="text-lg font-semibold text-slate-50">Partial Desulfurization</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-300">
              30–40% sulfur reduction without hydrogen or high-pressure
              reactors. EPM achieves partial desulfurization through catalytic
              interaction, significantly reducing the load on conventional
              hydrodesulfurization (HDS) units.
            </p>
            <div className="rounded-lg bg-slate-800/50 p-3 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Replaces:</span>{" "}
              Partial HDS load ($100–500M CAPEX for full HDS unit)
            </div>
          </div>

          {/* Function 3 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/20 text-orange-400 text-lg">
                🔥
              </span>
              <h3 className="text-lg font-semibold text-slate-50">Combustion Enhancement</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-300">
              Achieves 95–99% combustion efficiency compared to 85–92% with
              standard fuels. More complete combustion means higher energy
              yield per barrel and dramatically less unburned particulate
              matter.
            </p>
            <div className="rounded-lg bg-slate-800/50 p-3 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Replaces:</span>{" "}
              Cetane improvers ($0.10–0.30/bbl), FBC additives ($0.05–0.15/bbl)
            </div>
          </div>

          {/* Function 4 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20 text-green-400 text-lg">
                🌿
              </span>
              <h3 className="text-lg font-semibold text-slate-50">Emission Reduction</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-300">
              Preliminary testing shows NOx emissions reduced by a factor of
              ×284 below Euro 6 limits, CO by ×10, and SO₂ by ×15,000.
              These results exceed all current global emission standards
              including IMO 2020 and EPA Tier 4.
            </p>
            <div className="rounded-lg bg-slate-800/50 p-3 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Replaces:</span>{" "}
              SCR systems ($50–200K), DPF filters ($10–50K), EGR systems
            </div>
          </div>

          {/* Function 5 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/20 text-purple-400 text-lg">
                🛡️
              </span>
              <h3 className="text-lg font-semibold text-slate-50">Biocide &amp; Anti-Corrosion</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-300">
              EPM eliminates microbial contamination (bacteria, fungi, algae)
              and removes the root causes of internal corrosion — water,
              sulfur compounds, and microbial acids. Protects pipelines,
              storage tanks, and transport infrastructure.
            </p>
            <div className="rounded-lg bg-slate-800/50 p-3 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Replaces:</span>{" "}
              Biobor JF ($0.05–0.10/bbl), corrosion inhibitors ($0.10–0.25/bbl), cathodic protection systems
            </div>
          </div>

          {/* Summary card */}
          <div className="rounded-2xl border border-secondary/30 bg-secondary/5 p-6 space-y-3">
            <h3 className="text-lg font-semibold text-secondary">Total Value</h3>
            <p className="text-sm leading-relaxed text-slate-300">
              Traditional approach requires 3–5 separate vendors, 3–5
              contracts, and $0.65–5.80/bbl in combined additive costs.
              EPM consolidates everything into a single product at
              $1.50–3.00/bbl.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-red-400">$0.65–5.80</p>
                <p className="text-xs text-slate-400">Traditional (per bbl)</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-400">$1.50–3.00</p>
                <p className="text-xs text-slate-400">EPM (per bbl)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-50">
          Mechanism of Action
        </h2>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/20 text-sm font-bold text-secondary">
                1
              </div>
              <h3 className="font-semibold text-slate-50">Molecular Integration</h3>
              <p className="text-sm text-slate-300">
                EPM integrates at the molecular level with hydrocarbon chains,
                modifying surface tension and interfacial properties to enable
                water separation and sulfur interaction.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/20 text-sm font-bold text-secondary">
                2
              </div>
              <h3 className="font-semibold text-slate-50">Catalytic Enhancement</h3>
              <p className="text-sm text-slate-300">
                During combustion, EPM acts as a catalyst that promotes more
                complete oxidation of fuel molecules, reducing unburned
                hydrocarbons and particulate emissions.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/20 text-sm font-bold text-secondary">
                3
              </div>
              <h3 className="font-semibold text-slate-50">Protective Layer</h3>
              <p className="text-sm text-slate-300">
                EPM forms a protective molecular layer on metal surfaces,
                preventing corrosion while simultaneously eliminating microbial
                growth that causes biofouling and MIC (Microbiologically
                Influenced Corrosion).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
        <p className="text-xs text-amber-300/80">
          <span className="font-semibold">Important:</span> All EPM performance
          data presented on this page is preliminary and based on initial
          testing. Results are subject to independent verification. The NOx
          reduction mechanism is currently under investigation. EPM does not
          fully replace HDS — conventional desulfurization is still required
          for regulatory compliance.
        </p>
      </section>

      {/* CTA */}
      <section className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-2xl font-semibold text-slate-50">
          See How EPM Impacts Your Bottom Line
        </h2>
        <p className="max-w-xl text-sm text-slate-300">
          Use our ROI calculator to estimate potential savings based on your
          refinery&apos;s specific parameters.
        </p>
        <a
          href="/calculator"
          className="inline-flex items-center justify-center rounded-full bg-secondary px-8 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-secondary/90"
        >
          Calculate Your Savings
        </a>
      </section>
    </div>
  );
}
