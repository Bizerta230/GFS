export default function PartnersPage() {
  const partnerTypes = [
    {
      title: "Laboratory & Testing Partners",
      desc: "Independent testing facilities conducting baseline and post-treatment analyses for EPM pilot programs. Partners perform sulfur analysis, combustion calorimetry, emission spectrometry, and microbial culture testing.",
      status: "Active — under NDA",
    },
    {
      title: "Pilot Site Partners",
      desc: "Refinery and marine operators participating in structured EPM pilot programs. Pilot partners receive full technical protocol documentation, co-branded reporting, and preferred pricing on commercial deployment.",
      status: "Recruiting",
    },
    {
      title: "Distribution Partners",
      desc: "Regional chemical distributors with established relationships in petroleum processing, marine bunkering, and upstream markets. Distribution partnerships are selective and geographically exclusive.",
      status: "Recruiting",
    },
    {
      title: "Technology Validation",
      desc: "Universities and research institutions providing independent peer review of EPM chemistry and performance claims. Academic validation supports regulatory engagement and commercial credibility.",
      status: "In discussion",
    },
  ];

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">About</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
          Partners &amp; Validation
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-300">
          GFS works with testing labs, pilot site operators, and distribution partners to build
          an independently-verified performance record for EPM. We do not claim partnerships
          we cannot substantiate.
        </p>
      </section>

      <section className="space-y-3">
        {partnerTypes.map((p) => (
          <div key={p.title} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 space-y-2">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-sm font-semibold text-slate-100">{p.title}</h3>
              <span className={`flex-shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-medium whitespace-nowrap
                ${p.status === "Active — under NDA" ? "border-green-700 text-green-400" :
                  p.status === "Recruiting" ? "border-secondary/50 text-secondary" :
                  "border-slate-700 text-slate-500"}`}>
                {p.status}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">{p.desc}</p>
          </div>
        ))}
      </section>

      <section className="rounded-xl border border-secondary/20 bg-secondary/5 p-5 space-y-2">
        <p className="text-sm font-semibold text-slate-100">Become a partner</p>
        <p className="text-xs text-slate-400 leading-relaxed">
          We are actively recruiting pilot site operators and regional distribution partners.
          If your organization processes petroleum, manages marine fuel, or distributes industrial
          chemicals — reach out via the{" "}
          <a href="/contact" className="text-secondary underline underline-offset-2">contact page</a>{" "}
          or{" "}
          <a href="/pilot" className="text-secondary underline underline-offset-2">request a pilot program</a>.
        </p>
      </section>
    </div>
  );
}
