
import type { ReactNode } from "react";
import { notFound } from "next/navigation";

type Language = "es" | "en";

type Props = {
  children: ReactNode;
  params: Promise<{
    lang: string;
  }>;
};

export function generateStaticParams() {
  return [
    { lang: "es" },
    { lang: "en" },
  ];
}

export default async function LanguageLayout({
  children,
  params,
}: Props) {
  const { lang } = await params;

  if (lang !== "es" && lang !== "en") {
    notFound();
  }

  return <>{children}</>;
}
