import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";

const navItems = [
  {
    label: "Technology",
    href: "/technology/how-it-works",
  },
  {
    label: "Solutions",
    href: "/solutions/refinery",
  },
  {
    label: "Calculator",
    href: "/calculator",
  },
  {
    label: "Resources",
    href: "/resources/articles",
  },
  {
    label: "About",
    href: "/about/team",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export function Header() {
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

