
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Locale } from "@/i18n/config";

type NavContent = {
  work: string;
  services: string;
  about: string;
  contact: string;
  portal: string;
};

type Props = {
  locale: Locale;
  content: NavContent;
};

export default function Navbar({ locale, content }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const links = [
    { label: content.work, href: `/${locale}#work` },
    { label: content.services, href: `/${locale}#services` },
    { label: content.about, href: `/${locale}#about` },
    { label: content.contact, href: `/${locale}#contact` },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen
          ? "border-b border-white/10 bg-[#050608]/90 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label={locale === "es" ? "Navegación principal" : "Main navigation"}
        className="mx-auto flex h-20 w-full max-w-[1920px] items-center justify-between px-6 sm:px-10 lg:px-14"
      >
        <Link
          href={`/${locale}`}
          onClick={() => setMenuOpen(false)}
          className="relative z-50 flex shrink-0 items-center gap-5 text-white"
          aria-label="D/S Studio"
        >
          <span className="text-[23px] font-light tracking-[0.25em]">
            D/S
          </span>

          <span className="text-[9px] font-medium tracking-[0.55em] text-white/65">
            STUDIO
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex xl:gap-11">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/75 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}

          <LanguageSwitcher locale={locale} />

          <span
            className="inline-flex items-center gap-2 rounded-full border border-white/55 px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/75"
            aria-label={content.portal}
            title={
              locale === "es"
                ? "Próximamente"
                : "Coming soon"
            }
          >
            {content.portal}
            <ArrowUpRight size={12} />
          </span>
        </div>

        <button
          type="button"
          aria-label={
            menuOpen
              ? locale === "es"
                ? "Cerrar menú"
                : "Close menu"
              : locale === "es"
                ? "Abrir menú"
                : "Open menu"
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((previous) => !previous)}
          className="relative z-50 flex h-11 w-11 items-center justify-center text-white lg:hidden"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <div
        id="mobile-navigation"
        className={`fixed inset-0 top-20 z-40 overflow-y-auto bg-[#050608] px-7 py-10 transition-all duration-300 lg:hidden ${
          menuOpen
            ? "visible h-[calc(100dvh-5rem)] opacity-100"
            : "invisible h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-8">
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between border-b border-white/10 pb-5 text-3xl font-light text-white"
            >
              <span>{link.label}</span>
              <span className="text-xs text-white/35">
                0{index + 1}
              </span>
            </Link>
          ))}

          <div className="mt-4 flex items-center justify-between">
            <LanguageSwitcher
              locale={locale}
              onNavigate={() => setMenuOpen(false)}
            />

            <span className="text-[10px] uppercase tracking-[0.15em] text-white/45">
              {content.portal} — {locale === "es" ? "Próximamente" : "Coming soon"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
