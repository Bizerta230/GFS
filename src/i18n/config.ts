export const supportedLocales = [
  "en",
  "ar",
  "ru",
  "de",
  "es",
  "fr",
  "zh",
] as const;

export type SupportedLocale = (typeof supportedLocales)[number];

export const defaultLocale: SupportedLocale = "en";

