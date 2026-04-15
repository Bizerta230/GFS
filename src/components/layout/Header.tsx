"use client";
import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const t = useTranslations();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: t("nav.technology"), href: "/technology/how-it-works" },
    { label: t("nav.solutions"),  href: "/solutions/refinery" },
    { label: t("nav.calculator"), href: "/calculator" },
    { label: t("nav.resources"),  href: "/resources/articles" },
    { label: t("nav.about"),      href: "/about/team" },
    { label: t("nav.contact"),    href: "/contact" },
  ];

  return (
    <header className="border-b border-white/10 bg-slate-950/80 text-white backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary">
            <span className="text-xs font-semibold tracking-tight">GFS</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">GFS EPM</span>
            <span className="text-[11px] text-slate-300">Enhanced Performance Material</span>
          </div>
        </Link>

        {/* Desktop nav */}
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

        {/* Desktop actions */}
        <div className="hidden items-center gap-4 md:flex">
          <LanguageSwitcher />
          <Link
            href="/pilot"
            className="rounded-full bg-secondary px-4 py-2 text-xs font-semibold text-slate-950 shadow-sm transition hover:bg-secondary/90"
          >
            Request Pilot
          </Link>
        </div>

        {/* Mobile: hamburger */}
        <button
          className="flex items-center justify-center rounded-md p-2 text-slate-200 transition hover:bg-slate-800 md:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            /* X icon */
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            /* Hamburger icon */
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-slate-950 px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-1 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800 hover:text-secondary"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex items-center gap-3 border-t border-white/10 pt-3">
            <LanguageSwitcher />
            <Link
              href="/pilot"
              className="rounded-full bg-secondary px-4 py-2 text-xs font-semibold text-slate-950 shadow-sm transition hover:bg-secondary/90"
              onClick={() => setMenuOpen(false)}
            >
              Request Pilot
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
