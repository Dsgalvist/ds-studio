import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale, type Locale } from "./src/shared/i18n/config";

const COOKIE_NAME = "ds-locale";

function detectLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(COOKIE_NAME)?.value;

  if (saved && isLocale(saved)) {
    return saved;
  }

  const languages = request.headers.get("accept-language") ?? "";

  const preferences = languages
    .split(",")
    .map((entry) => {
      const [language, quality] = entry.trim().split(";q=");

      return {
        language: language.toLowerCase(),
        quality: quality ? Number(quality) : 1,
      };
    })
    .filter(
      ({ quality }) => Number.isFinite(quality) && quality > 0 && quality <= 1,
    )
    .sort((a, b) => b.quality - a.quality);

  for (const preference of preferences) {
    const base = preference.language.split("-")[0];

    if (isLocale(base)) {
      return base;
    }
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  // Las rutas privadas se configurarán por separado.
  if (firstSegment === "portal" || firstSegment === "admin") {
    return NextResponse.next();
  }

  // Una URL con idioma explícito siempre se respeta.
  if (firstSegment && isLocale(firstSegment)) {
    return NextResponse.next();
  }

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();

  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
