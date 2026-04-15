export default function VideosPage() {
  const planned = [
    {
      title: "EPM in 3 Minutes — Product Overview",
      desc: "A concise overview of EPM's five functions, target market, and value proposition for a refinery or marine operator.",
      duration: "~3 min",
    },
    {
      title: "How EPM Works — Mechanism of Action",
      desc: "Animated technical explainer covering the chemistry: how EPM interacts with sulfur compounds, water emulsions, combustion, and microbial activity.",
      duration: "~8 min",
    },
    {
      title: "Pilot Program Walkthrough",
      desc: "Step-by-step overview of what a GFS pilot engagement looks like: baseline measurement, dosing procedure, KPI tracking, and reporting.",
      duration: "~5 min",
    },
    {
      title: "ROI Calculator Walkthrough",
      desc: "Demonstration of the EPM ROI Calculator — how to input your operation parameters and interpret the savings estimate.",
      duration: "~4 min",
    },
  ];

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Resources</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
          Video Library
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-300">
          Technical and commercial explainer videos about EPM, pilot program structure, and
          the ROI calculator. Videos are produced alongside pilot program milestones.
        </p>
      </section>

      <section className="space-y-3">
        {planned.map((v) => (
          <div
            key={v.title}
            className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 flex items-start gap-4"
          >
            <div className="flex-shrink-0 flex h-12 w-16 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-slate-100">{v.title}</p>
                <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[10px] text-slate-500">
                  Coming soon
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{v.desc}</p>
              <p className="text-xs text-slate-600">{v.duration}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-xl border border-secondary/20 bg-secondary/5 p-5 space-y-2">
        <p className="text-sm font-semibold text-slate-100">Stay informed</p>
        <p className="text-xs text-slate-400">
          Videos are released alongside pilot program reports.{" "}
          <a href="/contact" className="text-secondary underline underline-offset-2">Contact us</a>{" "}
          to be notified when new content is published.
        </p>
      </section>
    </div>
  );
}
