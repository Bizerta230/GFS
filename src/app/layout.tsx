import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gfs-epm.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GFS EPM — Enhanced Performance Material",
    template: "%s | GFS EPM",
  },
  description:
    "One additive. Five functions. Zero compromise. GFS EPM replaces 3–5 fuel additives with a single multifunctional solution — cutting costs, emissions, and operational complexity for refineries, marine operators, and upstream producers.",
  keywords: [
    "fuel additive",
    "EPM",
    "refinery additive",
    "desulfurization",
    "combustion enhancer",
    "emission reduction",
    "IMO 2020",
    "marine fuel",
    "biocide",
    "anti-corrosion",
    "GFS",
  ],
  authors: [{ name: "GFS — Global Fuel Solutions" }],
  openGraph: {
    type: "website",
    siteName: "GFS EPM",
    title: "GFS EPM — One Additive. Five Functions. Zero Compromise.",
    description:
      "EPM replaces 3–5 separate fuel additives: demulsification, 30–40% sulfur reduction, 95–99% combustion efficiency, NOx/SO₂ below IMO limits, biocide & corrosion protection.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "GFS EPM — One Additive. Five Functions. Zero Compromise.",
    description:
      "EPM replaces 3–5 separate fuel additives for refineries, marine, and upstream — at $1.50–3.00/bbl.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
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
