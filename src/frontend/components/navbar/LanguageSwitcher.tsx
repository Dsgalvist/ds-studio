
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/shared/i18n/config";

type Props = {
  locale: Locale;
  onNavigate?: () => void;
};

export default function LanguageSwitcher({
  locale,
  onNavigate,
}: Props) {
  const pathname = usePathname();

  function getLocalizedPath(nextLocale: Locale) {
    const segments = pathname.split("/");

    if (segments[1] === "en" || segments[1] === "es") {
      segments[1] = nextLocale;
    } else {
      segments.splice(1, 0, nextLocale);
    }

    return segments.join("/") || `/${nextLocale}`;
  }

  function selectLanguage(nextLocale: Locale) {
    document.cookie =
      `ds-locale=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;

    onNavigate?.();
  }

  return (
    <div
      className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em]"
      aria-label="Language / Idioma"
    >
      <Link
        href={getLocalizedPath("en")}
        hrefLang="en"
        aria-current={locale === "en" ? "page" : undefined}
        onClick={() => selectLanguage("en")}
        className={`transition-colors ${
          locale === "en"
            ? "text-white"
            : "text-white/45 hover:text-white"
        }`}
      >
        EN
      </Link>

      <span className="text-white/30">/</span>

      <Link
        href={getLocalizedPath("es")}
        hrefLang="es"
        aria-current={locale === "es" ? "page" : undefined}
        onClick={() => selectLanguage("es")}
        className={`transition-colors ${
          locale === "es"
            ? "text-white"
            : "text-white/45 hover:text-white"
        }`}
      >
        ES
      </Link>
    </div>
  );
}
