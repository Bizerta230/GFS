import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950/95 text-slate-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 text-sm md:flex-row md:items-center md:justify-between md:px-6">
        <div className="space-y-1">
          <p className="font-medium text-slate-100">
            Global Fuel Solutions — EPM Platform
          </p>
          <p className="max-w-md text-xs text-slate-400">
            One additive, five functions, zero compromise. All data is
            preliminary and subject to validation.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <Link
            href="/privacy"
            className="text-slate-400 transition hover:text-secondary"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-slate-400 transition hover:text-secondary"
          >
            Terms of Service
          </Link>
          <span className="text-slate-500">© {year} GFS. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

