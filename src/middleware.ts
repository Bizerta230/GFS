import createMiddleware from "next-intl/middleware";
import { defaultLocale, supportedLocales } from "./i18n/config";

export default createMiddleware({
  locales: supportedLocales as unknown as string[],
  defaultLocale,
  localePrefix: "as-needed"
});

export const config = {
  matcher: ["/", "/(en|ar|ru|de|es|fr|zh)/:path*"]
};

