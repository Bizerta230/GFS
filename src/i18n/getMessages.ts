import { getRequestConfig } from "next-intl/server";
import { defaultLocale, supportedLocales, type SupportedLocale } from "./config";

type GetMessagesParams = {
  locale: string;
};

export default getRequestConfig(async ({ locale }: GetMessagesParams) => {
  const normalizedLocale: SupportedLocale = supportedLocales.includes(
    locale as SupportedLocale,
  )
    ? (locale as SupportedLocale)
    : defaultLocale;

  const messages = (await import(`./messages/${normalizedLocale}.json`)).default;

  return {
    locale: normalizedLocale,
    messages,
  };
});

