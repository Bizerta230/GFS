export default function WhitePaperPage() {
  const sections = [
    "Abstract — EPM performance summary and market positioning",
    "Section 1 — Mechanism of action: how EPM interacts with hydrocarbon and sulfur chemistry",
    "Section 2 — Demulsification: electrostatic vs. chemical separation at scale",
    "Section 3 — Partial desulfurization: 30–40% reduction, HDS interaction model",
    "Section 4 — Combustion enhancement: catalyst chemistry, efficiency curve",
    "Section 5 — Emission profile: NOx, CO, SO₂ — preliminary test data and methodology",
    "Section 6 — Biocide and anti-corrosion: microbial inhibition and metal protection",
    "Section 7 — Economic model: breakeven by crude grade, ROI scenarios",
    "Section 8 — Pilot program structure: KPIs, timeline, reporting",
    "Appendix A — Comparative data vs. traditional additive stack",
    "Appendix B — Regulatory compliance matrix (IMO, EPA, EU)",
  ];

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Resources</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
          Technical White Paper
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-300">
          The EPM Technical White Paper provides a comprehensive overview of the chemistry,
          performance data, economic model, and pilot program methodology. Available to qualified
          prospects and pilot program participants.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 space-y-4">
        <h2 className="text-base font-semibold text-slate-100">Table of Contents</h2>
        <ol className="space-y-2">
          {sections.map((s, i) => (
            <li key={i} className="flex gap-3 text-xs text-slate-400">
              <span className="flex-shrink-0 text-slate-600">{String(i + 1).padStart(2, "0")}</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-xl border border-secondary/20 bg-secondary/5 p-6 space-y-3">
        <h2 className="text-base font-semibold text-slate-100">Request the White Paper</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          The white paper is provided to technically qualified prospects in the petroleum processing,
          marine, and upstream sectors. Submit a request via the{" "}
          <a href="/contact" className="text-secondary underline underline-offset-2">contact form</a>{" "}
          or use the AI chat assistant to request access. We typically respond within one business day.
        </p>
        <div className="pt-1">
          <a
            href="/contact"
            className="inline-block rounded-full bg-secondary px-5 py-2.5 text-xs font-semibold text-slate-950 transition hover:bg-secondary/90"
          >
            Request White Paper
          </a>
        </div>
      </section>
    </div>
  );
}
