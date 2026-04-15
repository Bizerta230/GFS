import { getRequestConfig } from "next-intl/server";
import { defaultLocale, supportedLocales, type SupportedLocale } from "./config";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  const normalizedLocale: SupportedLocale =
    locale && supportedLocales.includes(locale as SupportedLocale)
      ? (locale as SupportedLocale)
      : defaultLocale;

  const messages = (await import(`./messages/${normalizedLocale}.json`)).default;

  return {
    locale: normalizedLocale,
    messages,
  };
});

