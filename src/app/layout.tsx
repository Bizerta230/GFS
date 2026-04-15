import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GFS EPM — Enhanced Performance Material",
  description:
    "One additive. Five functions. Zero compromise. GFS EPM replaces 3–5 fuel additives with a single multifunctional solution.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
