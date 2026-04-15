import "./globals.css";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { supportedLocales, type SupportedLocale } from "@/i18n/config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gfs-epm.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const localizedPaths: Record<string, string> = {
    en: siteUrl,
    ar: `${siteUrl}/ar`,
    ru: `${siteUrl}/ru`,
    de: `${siteUrl}/de`,
    es: `${siteUrl}/es`,
    fr: `${siteUrl}/fr`,
    zh: `${siteUrl}/zh`,
  };
  return {
    alternates: {
      canonical: localizedPaths[locale] ?? siteUrl,
      languages: localizedPaths as Record<string, string>,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!supportedLocales.includes(locale as SupportedLocale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex min-h-screen flex-col bg-slate-950 text-slate-50">
        <Header />
        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 md:px-6 md:py-10">
          {children}
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </NextIntlClientProvider>
  );
}
