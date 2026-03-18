export default function ContactPage() {
  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
        Contact GFS
      </h1>
      <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
        Share a few details about your refinery or operation and the GFS team
        will follow up with preliminary analysis and next steps.
      </p>
      <form className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-200">
            Full name
          </label>
          <input
            className="w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-secondary/40 placeholder:text-slate-500 focus:border-secondary focus:ring-2"
            placeholder="Your name"
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-200">
            Company
          </label>
          <input
            className="w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-secondary/40 placeholder:text-slate-500 focus:border-secondary focus:ring-2"
            placeholder="Company name"
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-200">
            Email
          </label>
          <input
            type="email"
            className="w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-secondary/40 placeholder:text-slate-500 focus:border-secondary focus:ring-2"
            placeholder="you@example.com"
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-200">
            Message
          </label>
          <textarea
            rows={4}
            className="w-full resize-none rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-secondary/40 placeholder:text-slate-500 focus:border-secondary focus:ring-2"
            placeholder="Share context about your refinery, capacity, and current additive approach."
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-secondary px-6 py-2 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-secondary/90"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

