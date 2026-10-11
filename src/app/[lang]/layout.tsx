
import { Suspense, type ReactNode } from "react";
import { notFound } from "next/navigation";

type Props = {
  children: ReactNode;
  params: Promise<{
    lang: string;
  }>;
};

export function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}

async function LanguageContent({
  children,
  params,
}: Props) {
  const { lang } = await params;

  if (lang !== "es" && lang !== "en") {
    notFound();
  }

  return <>{children}</>;
}

export default function LanguageLayout({
  children,
  params,
}: Props) {
  return (
    <Suspense fallback={null}>
      <LanguageContent params={params}>
        {children}
      </LanguageContent>
    </Suspense>
  );
}
