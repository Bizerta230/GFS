import Link from "next/link";

export default function NotFound() {
  return (
    <html suppressHydrationWarning>
      <body className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-md">
          <p className="text-6xl font-bold text-secondary">404</p>
          <h1 className="text-2xl font-semibold text-slate-100">Page not found</h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <Link
              href="/"
              className="rounded-full bg-secondary px-6 py-2.5 text-sm font-semibold text-slate-950 hover:bg-secondary/90 transition"
            >
              Go home
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-slate-700 px-6 py-2.5 text-sm font-medium text-slate-300 hover:border-slate-500 transition"
            >
              Contact us
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
