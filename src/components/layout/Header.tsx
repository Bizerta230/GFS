import Link from "next/link";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const t = useTranslations();

  const navItems = [
    {
      label: t("nav.technology"),
      href: "/technology/how-it-works",
    },
    {
      label: t("nav.solutions"),
      href: "/solutions/refinery",
    },
    {
      label: t("nav.calculator"),
      href: "/calculator",
    },
    {
      label: t("nav.resources"),
      href: "/resources/articles",
    },
    {
      label: t("nav.about"),
      href: "/about/team",
    },
    {
      label: t("nav.contact"),
      href: "/contact",
    },
  ];

  return (
    <header className="border-b border-white/10 bg-slate-950/80 text-white backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary">
            <span className="text-xs font-semibold tracking-tight">GFS</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">GFS EPM</span>
            <span className="text-[11px] text-slate-300">
              Enhanced Performance Material
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-slate-200 transition hover:text-secondary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <LanguageSwitcher />
          <Link
            href="/pilot"
            className="rounded-full bg-secondary px-4 py-2 text-xs font-semibold text-slate-950 shadow-sm transition hover:bg-secondary/90"
          >
            Request Pilot
          </Link>
        </div>
      </div>
    </header>
  );
}

