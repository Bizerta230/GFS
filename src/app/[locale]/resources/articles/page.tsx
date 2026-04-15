export default function ArticlesPage() {
  const articles = [
    {
      date: "Q1 2025",
      category: "Technology",
      title: "How EPM Achieves 30–40% Sulfur Reduction Without Hydrogen",
      summary:
        "Traditional desulfurization requires hydrogen at high pressure and temperature. EPM's mechanism of action addresses sulfur compounds through a different chemical pathway — reducing HDS load without additional infrastructure.",
      status: "coming-soon",
    },
    {
      date: "Q1 2025",
      category: "Economics",
      title: "The True Cost of Multi-Additive Programs in Refinery Operations",
      summary:
        "Most refineries run 3–5 separate additive programs without accounting for procurement overhead, compatibility testing, and dosing system maintenance. This analysis quantifies the hidden costs.",
      status: "coming-soon",
    },
    {
      date: "Q2 2025",
      category: "Emissions",
      title: "Meeting IMO 2020 and EPA Tier 4 Simultaneously: A Case for Chemistry Over Hardware",
      summary:
        "Scrubbers and selective catalytic reduction (SCR) systems cost millions per installation. EPM's preliminary emissions data shows NOx 284× below Tier III limits — suggesting a chemical path to compliance.",
      status: "coming-soon",
    },
    {
      date: "Q2 2025",
      category: "Marine",
      title: "Microbial Contamination in Bunker Tanks: Root Causes and EPM Prevention Strategy",
      summary:
        "Sulfate-reducing bacteria in fuel tanks cause corrosion, filter clogging, and engine damage. This article covers the microbial lifecycle in marine fuels and how EPM's biocide chemistry interrupts it.",
      status: "coming-soon",
    },
    {
      date: "Q3 2025",
      category: "Upstream",
      title: "Wellhead Emulsion Breaking: Eliminating the Desalter Capital Cost",
      summary:
        "Electrostatic desalters are a $2–5M capital item in most crude processing facilities. EPM's demulsification chemistry offers an alternative path that may eliminate this requirement in certain crude grades.",
      status: "coming-soon",
    },
  ];

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Resources</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
          Articles &amp; Insights
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-300">
          Technical and commercial analysis from the GFS research team. Articles cover EPM
          chemistry, refinery economics, emissions compliance, and real-world performance data.
        </p>
      </section>

      <section className="space-y-4">
        {articles.map((a, i) => (
          <article
            key={i}
            className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 space-y-2"
          >
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-secondary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-secondary">
                {a.category}
              </span>
              <span className="text-xs text-slate-500">{a.date}</span>
              <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[10px] text-slate-500">
                Coming soon
              </span>
            </div>
            <h3 className="text-sm font-semibold text-slate-100 leading-snug">{a.title}</h3>
            <p className="text-xs leading-relaxed text-slate-400">{a.summary}</p>
          </article>
        ))}
      </section>

      <section className="rounded-xl border border-secondary/20 bg-secondary/5 p-5 space-y-2">
        <p className="text-sm font-semibold text-slate-100">Want early access to research?</p>
        <p className="text-xs text-slate-400">
          Pilot program partners receive technical reports before public publication.{" "}
          <a href="/pilot" className="text-secondary underline underline-offset-2">
            Request a pilot
          </a>{" "}
          to join the program.
        </p>
      </section>
    </div>
  );
}
