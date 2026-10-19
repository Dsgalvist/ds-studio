
import { Suspense, type ReactNode } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { locales, type Locale } from "@/shared/i18n/config";

function detectLocale(acceptLanguage: string): Locale {
  const preferredLanguages = acceptLanguage
    .split(",")
    .map((entry) => {
      const [language, quality] = entry.trim().split(";q=");

      return {
        language: language.toLowerCase(),
        quality: quality ? Number(quality) : 1,
      };
    })
    .filter(
      (entry) =>
        entry.language &&
        Number.isFinite(entry.quality) &&
        entry.quality > 0
    )
    .sort((a, b) => b.quality - a.quality);

  for (const preference of preferredLanguages) {
    const language = preference.language.split("-")[0];

    if (locales.includes(language as Locale)) {
      return language as Locale;
    }
  }

  return "en";
}

async function BrowserLanguageRedirect(): Promise<ReactNode> {
  const requestHeaders = await headers();

  const acceptLanguage =
    requestHeaders.get("accept-language") ?? "";

  const locale = detectLocale(acceptLanguage);

  redirect(`/${locale}`);
}

export default function RootPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#050608]" />
      }
    >
      <BrowserLanguageRedirect />
    </Suspense>
  );
}
