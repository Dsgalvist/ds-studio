
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  ArrowUpRight,
  Menu,
  X,
  UserRound,
} from "lucide-react";

import LanguageSwitcher from "./LanguageSwitcher";
import WhatsAppIcon from "./WhatsAppIcon";

import type { Locale } from "@/shared/i18n/config";

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

const WHATSAPP_NUMBER = "18253437802";

export default function Navbar({
  locale,
  content,
}: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isSpanish = locale === "es";

  const whatsappMessage = isSpanish
    ? "Hola, me gustaría conocer más sobre los servicios de D/S Studio."
    : "Hello, I'd like to learn more about D/S Studio's services.";

  const whatsappHref =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

  const whatsappLabel = isSpanish
    ? "Contactar por WhatsApp"
    : "Contact via WhatsApp";

  const portalTitle = isSpanish
    ? "Portal de clientes — Próximamente"
    : "Client portal — Coming soon";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (menuOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  // Orden del recorrido comercial:
  // Nosotros → Servicios → Proyectos → Contacto
  const links = [
    {
      label: content.about,
      href: `/${locale}#about`,
    },
    {
      label: content.services,
      href: `/${locale}#services`,
    },
    {
      label: content.work,
      href: `/${locale}#work`,
    },
    {
      label: content.contact,
      href: `/${locale}#contact`,
    },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${
        scrolled || menuOpen
          ? "border-b border-white/10 bg-[#050608]/95 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label={
          isSpanish
            ? "Navegación principal"
            : "Main navigation"
        }
        className="mx-auto flex h-[76px] w-full max-w-[1920px] items-center justify-between gap-2 px-3 min-[390px]:px-4 sm:px-8 lg:h-20 lg:px-10 xl:px-14"
      >
        {/* LOGO */}
        <Link
          href={`/${locale}`}
          onClick={() => setMenuOpen(false)}
          className="relative z-50 flex shrink-0 items-center gap-2 text-white sm:gap-4 xl:gap-5"
          aria-label="D/S Studio"
        >
          <span className="text-[19px] font-light tracking-[0.16em] sm:text-[23px] sm:tracking-[0.25em]">
            D/S
          </span>

          <span className="hidden text-[8px] font-medium tracking-[0.35em] text-white/65 min-[360px]:inline sm:text-[9px] sm:tracking-[0.55em]">
            STUDIO
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-4 lg:flex xl:gap-7 2xl:gap-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.15em] text-white/75 transition-colors hover:text-white xl:text-[10px] xl:tracking-[0.2em]"
            >
              {link.label}
            </Link>
          ))}

          {/* WHATSAPP DESKTOP */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={whatsappLabel}
            title={whatsappLabel}
            className="group flex shrink-0 items-center gap-2 text-white/80 transition-colors hover:text-[#25D366]"
          >
            <WhatsAppIcon
              size={20}
              className="transition-transform duration-300 group-hover:scale-110"
            />

            <span className="hidden text-[9px] font-medium uppercase tracking-[0.15em] 2xl:inline">
              WhatsApp
            </span>
          </a>

          {/* LANGUAGE SWITCHER */}
          <LanguageSwitcher locale={locale} />

          {/* CLIENT PORTAL — COMING SOON */}
          <span
            aria-label={portalTitle}
            title={portalTitle}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/50 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.12em] text-white/75 xl:px-5"
          >
            <UserRound size={14} strokeWidth={1.7} />

            {content.portal}

            <ArrowUpRight size={12} />
          </span>
        </div>

        {/* RESPONSIVE ACTIONS */}
        <div className="relative z-50 flex shrink-0 items-center gap-1 min-[390px]:gap-2 sm:gap-3 lg:hidden">
          {/* WHATSAPP */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={whatsappLabel}
            title={whatsappLabel}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-[#25D366] transition-colors hover:border-[#25D366]/60 sm:h-10 sm:w-10"
          >
            <WhatsAppIcon size={20} />
          </a>

          {/* CLIENT PORTAL */}
          <span
            aria-label={portalTitle}
            title={portalTitle}
            className="flex h-9 shrink-0 items-center gap-1 rounded-full border border-white/35 px-2 text-white/85 min-[390px]:px-3 sm:h-10"
          >
            <UserRound
              size={15}
              strokeWidth={1.7}
            />

            <span className="text-[9px] font-semibold uppercase tracking-[0.08em]">
              Portal
            </span>
          </span>

          {/* LANGUAGE SWITCHER */}
          <div className="flex shrink-0 items-center">
            <LanguageSwitcher
              locale={locale}
              onNavigate={() => setMenuOpen(false)}
            />
          </div>

          {/* HAMBURGER */}
          <button
            type="button"
            aria-label={
              menuOpen
                ? isSpanish
                  ? "Cerrar menú"
                  : "Close menu"
                : isSpanish
                  ? "Abrir menú"
                  : "Open menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() =>
              setMenuOpen((previous) => !previous)
            }
            className="flex h-10 w-8 shrink-0 items-center justify-center text-white sm:w-11"
          >
            {menuOpen ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU — ONLY PAGE ROUTES */}
      <div
        id="mobile-navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`fixed inset-x-0 top-[76px] z-40 overflow-y-auto bg-[#050608] px-7 py-10 transition-all duration-300 lg:hidden ${
          menuOpen
            ? "visible h-[calc(100dvh-76px)] opacity-100"
            : "invisible h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-8">
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between border-b border-white/10 pb-5 text-3xl font-light text-white transition-colors hover:text-[#C2CCE0]"
            >
              <span>{link.label}</span>

              <span className="text-xs text-white/35">
                0{index + 1}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
