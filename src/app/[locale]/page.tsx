import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function HomePage() {
  const t = await getTranslations();

  const functions = [
    { icon: "💧", nameKey: "home.fn1Name", descKey: "home.fn1Desc" },
    { icon: "⚗️", nameKey: "home.fn2Name", descKey: "home.fn2Desc" },
    { icon: "🔥", nameKey: "home.fn3Name", descKey: "home.fn3Desc" },
    { icon: "🌿", nameKey: "home.fn4Name", descKey: "home.fn4Desc" },
    { icon: "🛡️", nameKey: "home.fn5Name", descKey: "home.fn5Desc" },
  ] as const;

  const stats = [
    { value: "30–40%", labelKey: "home.stat1Label" },
    { value: "95–99%", labelKey: "home.stat2Label" },
    { value: "$1.50–3.00/bbl", labelKey: "home.stat3Label" },
  ] as const;

  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="space-y-6 py-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
          {t("home.tagline")}
        </p>
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
          {t("home.title")}
        </h1>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
          {t("home.description")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/calculator"
            className="rounded-full bg-secondary px-8 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-secondary/90"
          >
            {t("home.primaryCta")}
          </Link>
          <Link
            href="/technology/how-it-works"
            className="rounded-full border border-slate-600 px-8 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-400 hover:text-white"
          >
            {t("home.secondaryCta")}
          </Link>
        </div>
      </section>

      {/* Five functions */}
      <section className="space-y-6">
        <h2 className="text-center text-2xl font-semibold text-slate-50">
          {t("home.functionsTitle")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {functions.map((fn) => (
            <div
              key={fn.nameKey}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3 text-center"
            >
              <span className="text-3xl">{fn.icon}</span>
              <p className="text-sm font-semibold text-slate-100">{t(fn.nameKey)}</p>
              <p className="text-xs leading-relaxed text-slate-400">{t(fn.descKey)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="space-y-4">
        <h2 className="text-center text-lg font-medium text-slate-400">
          {t("home.statsTitle")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.labelKey}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-center space-y-1"
            >
              <p className="text-3xl font-bold text-secondary">{s.value}</p>
              <p className="text-xs text-slate-400">{t(s.labelKey)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-2xl border border-secondary/20 bg-secondary/5 p-8 text-center space-y-4">
        <h2 className="text-2xl font-semibold text-slate-50">{t("home.ctaTitle")}</h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
          {t("home.ctaDesc")}
        </p>
        <Link
          href="/calculator"
          className="inline-block rounded-full bg-secondary px-8 py-3 text-sm font-semibold text-slate-950 transition hover:bg-secondary/90"
        >
          {t("home.ctaBtn")}
        </Link>
      </section>

      {/* Disclaimer */}
      <section className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
        <p className="text-xs text-amber-300/80 text-center">{t("home.disclaimer")}</p>
      </section>
    </div>
  );
}
