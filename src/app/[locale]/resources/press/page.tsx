export default function PressPage() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Resources</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
          Press &amp; Announcements
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-300">
          Official announcements, pilot program milestones, and media coverage related to
          GFS and EPM. Press releases are issued at key commercial milestones.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 text-center space-y-3">
        <p className="text-3xl">📰</p>
        <p className="text-sm font-medium text-slate-300">No press releases yet</p>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          GFS is currently in the pilot program phase. Press announcements will be issued
          upon completion of first verified commercial deployments.
        </p>
      </section>

      <section className="rounded-xl border border-secondary/20 bg-secondary/5 p-5 space-y-3">
        <h2 className="text-sm font-semibold text-slate-100">Media inquiries</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          For press inquiries, interview requests, or partnership announcements, contact us via
          the{" "}
          <a href="/contact" className="text-secondary underline underline-offset-2">contact page</a>.
          We respond to media inquiries within one business day.
        </p>
        <div className="space-y-1 text-xs text-slate-500">
          <p><span className="text-slate-400 font-medium">Company:</span> GFS — Global Fuel Solutions</p>
          <p><span className="text-slate-400 font-medium">Product:</span> EPM — Enhanced Performance Material</p>
          <p><span className="text-slate-400 font-medium">Stage:</span> Pilot program / pre-commercial</p>
        </div>
      </section>
    </div>
  );
}
