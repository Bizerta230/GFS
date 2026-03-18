import { usePathname, useRouter } from "next/navigation";
import { defaultLocale, supportedLocales, type SupportedLocale } from "@/i18n/config";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  function changeLocale(locale: SupportedLocale) {
    if (!pathname) return;

    const segments = pathname.split("/").filter(Boolean);
    const first = segments[0] as SupportedLocale | undefined;
    const currentLocale: SupportedLocale | null = first && supportedLocales.includes(first)
      ? first
      : null;

    const rest = currentLocale ? segments.slice(1) : segments;
    const base =
      locale === defaultLocale ? "" : `/${locale}`;
    const newPath = `${base}/${rest.join("/")}`.replace(/\/+/g, "/") || "/";

    router.push(newPath);
  }

  return (
    <select
      className="rounded-full border border-slate-600 bg-transparent px-2 py-1 text-xs font-medium text-slate-200 hover:border-secondary"
      onChange={(e) => changeLocale(e.target.value)}
      defaultValue={defaultLocale}
    >
      <option value="en">EN</option>
      <option value="ar">العربية</option>
      <option value="ru">Русский</option>
    </select>
  );
}


