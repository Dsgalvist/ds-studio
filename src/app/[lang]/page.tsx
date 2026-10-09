
import { Suspense } from "react";
import { notFound } from "next/navigation";

import Navbar from "@/components/navbar/Navbar";
import CinematicHero from "@/components/hero/CinematicHero";

import { getDictionary } from "@/i18n/dictionaries";
import {
  isLocale,
  locales,
  type Locale,
} from "@/i18n/config";

type Props = {
  params: Promise<{ lang: string }>;
};

// Genera las rutas /en y /es
export function generateStaticParams(): { lang: Locale }[] {
  return locales.map((lang) => ({ lang }));
}

// Página principal bilingüe
async function LocalizedHome({ params }: Props) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const dictionary = await getDictionary(lang);

  return (
    <>
      {/* Navbar cinematográfico */}
      <Navbar
        locale={lang}
        content={dictionary.nav}
      />

      <main>
        {/* Hero principal */}
        <CinematicHero
          locale={lang}
          content={dictionary.hero}
        />

        {/* Proyectos */}
        <section
          id="work"
          className="min-h-screen scroll-mt-20 bg-[#050608] px-6 py-24 text-white"
        >
          <div className="mx-auto max-w-[1440px]">
            <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
              {dictionary.sections.work}
            </h2>
          </div>
        </section>

        {/* Servicios */}
        <section
          id="services"
          className="min-h-[60vh] scroll-mt-20 bg-[#080A0E] px-6 py-24 text-white"
        >
          <div className="mx-auto max-w-[1440px]">
            <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
              {dictionary.nav.services}
            </h2>
          </div>
        </section>

        {/* Nosotros */}
        <section
          id="about"
          className="min-h-[60vh] scroll-mt-20 bg-[#050608] px-6 py-24 text-white"
        >
          <div className="mx-auto max-w-[1440px]">
            <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
              {dictionary.nav.about}
            </h2>
          </div>
        </section>

        {/* Contacto */}
        <section
          id="contact"
          className="min-h-[60vh] scroll-mt-20 bg-[#080A0E] px-6 py-24 text-white"
        >
          <div className="mx-auto max-w-[1440px]">
            <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
              {dictionary.sections.contact}
            </h2>
          </div>
        </section>
      </main>
    </>
  );
}

// Suspense para Next.js 16
export default function Home({ params }: Props) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#050608]" />
      }
    >
      <LocalizedHome params={params} />
    </Suspense>
  );
}
