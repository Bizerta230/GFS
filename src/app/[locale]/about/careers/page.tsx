export default function CareersPage() {
  const values = [
    { title: "Technical depth first", body: "We hire people who understand the chemistry, not just the pitch deck. Every team member can explain what EPM does at the molecular level." },
    { title: "Pilots over promises", body: "We build trust through verified results, not presentations. Everyone on the team is expected to deliver commitments they've personally stress-tested." },
    { title: "Lean by design", body: "We move quickly with a small, high-output team. No process overhead, no org chart politics — you own your area and deliver." },
  ];

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">About</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
          Careers
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-300">
          GFS is building the commercial infrastructure to deploy EPM at refinery scale globally.
          We are a small, technically-focused team at the pre-commercial stage. We hire when we
          find the right person — not to fill headcount.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 text-center space-y-3">
        <p className="text-3xl">🔬</p>
        <p className="text-sm font-medium text-slate-300">No open positions at this time</p>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          As EPM transitions from pilot to commercial deployment, we will publish openings
          in technical sales, chemistry, and operations. Check back as we scale.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-100">What we value</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 space-y-2">
              <h3 className="text-sm font-semibold text-slate-100">{v.title}</h3>
              <p className="text-xs leading-relaxed text-slate-400">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-secondary/20 bg-secondary/5 p-5 space-y-2">
        <p className="text-sm font-semibold text-slate-100">Proactive enquiries</p>
        <p className="text-xs text-slate-400">
          If you have a background in petroleum chemistry, refinery operations, or industrial
          chemical sales and believe you can contribute, send a brief introduction via the{" "}
          <a href="/contact" className="text-secondary underline underline-offset-2">contact page</a>.
        </p>
      </section>
    </div>
  );
}
