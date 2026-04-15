import createMiddleware from "next-intl/middleware";
import { defaultLocale, supportedLocales } from "./i18n/config";

export default createMiddleware({
  locales: supportedLocales as unknown as string[],
  defaultLocale,
  localePrefix: "as-needed"
});

export const config = {
  // Match all paths except Next.js internals, static files, and API routes
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};

