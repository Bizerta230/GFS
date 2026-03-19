import { getRequestConfig } from "next-intl/server";
import { defaultLocale, supportedLocales, type SupportedLocale } from "./config";

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = supportedLocales.includes(locale as SupportedLocale)
    ? locale
    : defaultLocale;

  return {
    locale: resolvedLocale,
    messages: (await import(`./messages/${resolvedLocale}.json`)).default,
  };
});