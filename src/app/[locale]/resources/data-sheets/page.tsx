export default function DataSheetsPage() {
  const sheets = [
    {
      title: "EPM Technical Data Sheet",
      desc: "Physical and chemical properties, typical dose rates, compatibility matrix, and storage handling requirements.",
      status: "Available on request",
    },
    {
      title: "EPM Safety Data Sheet (SDS / MSDS)",
      desc: "GHS-compliant safety data sheet covering hazard identification, first aid, handling and storage, disposal, and transport classification.",
      status: "Available on request",
    },
    {
      title: "EPM Performance Summary Sheet",
      desc: "Single-page summary of the five performance functions with key metrics: sulfur reduction, combustion efficiency, emission deltas, and biocide efficacy.",
      status: "Available on request",
    },
    {
      title: "Pilot Program Technical Protocol",
      desc: "Methodology document describing baseline measurement, dosing procedure, KPI tracking, and reporting structure for pilot engagements.",
      status: "Pilot partners only",
    },
  ];

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Resources</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
          Product Data Sheets
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-300">
          Technical documentation for EPM — physical properties, safety data, performance
          summaries, and pilot protocol. All documents are available to qualified prospects
          and pilot program participants.
        </p>
      </section>

      <section className="space-y-3">
        {sheets.map((s) => (
          <div
            key={s.title}
            className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 flex items-start justify-between gap-4"
          >
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-100">{s.title}</p>
              <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
            <span className="flex-shrink-0 rounded-full border border-slate-700 px-3 py-1 text-[10px] font-medium text-slate-400 whitespace-nowrap">
              {s.status}
            </span>
          </div>
        ))}
      </section>

      <section className="rounded-xl border border-secondary/20 bg-secondary/5 p-5 space-y-2">
        <p className="text-sm font-semibold text-slate-100">Request documentation</p>
        <p className="text-xs text-slate-400">
          Send a request through the{" "}
          <a href="/contact" className="text-secondary underline underline-offset-2">contact form</a>{" "}
          or via the chat assistant. Technical data sheets are provided within 24 hours to
          qualified prospects.
        </p>
      </section>
    </div>
  );
}
