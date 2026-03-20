import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { NextIntlClientProvider } from "next-intl";
import getMessages from "@/i18n/getMessages";

export const metadata: Metadata = {
  title: "GFS EPM — Automated Business Platform",
  description:
    "GFS EPM is a full-stack automated business platform for refinery-scale fuel additive optimization.",
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { messages, locale } = await getMessages({ locale: params.locale });

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