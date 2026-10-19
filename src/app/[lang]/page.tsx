
import { Suspense } from "react";
import { notFound } from "next/navigation";
import ContactSection from "@/frontend/components/contact/ContactSection";
import Navbar from "@/frontend/components/navbar/Navbar";
import CinematicHero from "@/frontend/components/hero/CinematicHero";
import AboutSection from "@/frontend/components/about/AboutSection";
import ServicesSection from "@/frontend/components/services/ServicesSection";
import ProjectsSection from "@/frontend/components/projects/ProjectsSection";
import { getDictionary } from "@/shared/i18n/dictionaries";
import {
  isLocale,
  locales,
  type Locale,
} from "@/shared/i18n/config";
import ScrollToTop from "@/frontend/components/ui/ScrollToTop";
import StudioAssistant from "@/frontend/components/ui/StudioAssistant";

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
      {/* NAVBAR */}
      <Navbar
        locale={lang}
        content={dictionary.nav}
      />

      <main>
        {/* 01 — HERO */}
        <CinematicHero
          locale={lang}
          content={dictionary.hero}
        />

        {/* 02 — ABOUT */}
        <AboutSection
          locale={lang}
          content={dictionary.about}
        />

        {/* 03 — SERVICES */}
        <ServicesSection
          locale={lang}
          content={dictionary.services}
        />

        {/* 04 — PROJECTS */}
        <ProjectsSection locale={lang} />

        {/* 05 — CONTACT */}
        <ContactSection locale={lang} />

        <ScrollToTop />

        <StudioAssistant locale={lang} />
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
