import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gfs-epm.com";

const paths = [
  "",
  "/technology/how-it-works",
  "/technology/comparison",
  "/technology/data",
  "/solutions/refinery",
  "/solutions/marine",
  "/solutions/storage",
  "/solutions/upstream",
  "/calculator",
  "/resources/articles",
  "/resources/faq",
  "/resources/data-sheets",
  "/resources/white-paper",
  "/resources/videos",
  "/resources/press",
  "/about/team",
  "/about/careers",
  "/about/partners",
  "/contact",
  "/demo",
  "/pilot",
  "/investors",
  "/privacy",
  "/terms",
];

const locales = ["en", "ar", "ru", "de", "es", "fr", "zh"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of paths) {
    for (const locale of locales) {
      const localePath = locale === "en" ? path || "/" : `/${locale}${path || ""}`;
      entries.push({
        url: `${siteUrl}${localePath}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1.0 : path.startsWith("/solutions") || path.startsWith("/technology") ? 0.8 : 0.6,
      });
    }
  }

  return entries;
}
