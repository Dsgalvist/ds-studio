import "server-only";

import type { Locale } from "./config";

export async function getDictionary(locale: Locale) {
  if (locale === "es") {
    return (await import("./es")).default;
  }

  return (await import("./en")).default;
}
