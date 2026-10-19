
"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowUp,
  Mail,
  MessageCircle,
  Phone,
  Radio,
  ScanLine,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Locale = "es" | "en";

type Person = {
  name: string;
  role: Record<Locale, string>;
  email: string;
  phone: string;
  phoneDigits: string;
  accent: string;
  rgb: string;
};

const people: Person[] = [
  {
    name: "Diego Galvis",
    role: {
      es: "Desarrollo y tecnología",
      en: "Development & technology",
    },
    email: "diegogalvis682@gmail.com",
    phone: "+1 (825) 343-7802",
    phoneDigits: "18253437802",
    accent: "#A9CFFF",
    rgb: "169,207,255",
  },
  {
    name: "Sara Acosta",
    role: {
      es: "Diseño y producción audiovisual",
      en: "Design & audiovisual production",
    },
    email: "Saragutierez0823@gmail.com",
    phone: "+1 (825) 488-5363",
    phoneDigits: "18254885363",
    accent: "#D6B5F2",
    rgb: "214,181,242",
  },
];

const translations = {
  es: {
    eyebrow: "Contacto",
    status: "CANAL ABIERTO",
    overline: "TU PRÓXIMO PROYECTO COMIENZA AQUÍ",
    heading: "Hagamos que",
    accent: "las ideas sucedan.",
    description:
      "Toda gran experiencia comienza con una conversación. Cuéntanos qué tienes en mente y exploremos juntos cómo convertirlo en algo extraordinario.",
    choose: "CONECTA CON NUESTRO EQUIPO",
    whatsapp: "WhatsApp",
    whatsappDetail: "Cuéntanos tu idea por mensaje",
    email: "Correo",
    call: "Llamada",
    callDetail: "Hablemos directamente",
    backToTop: "Volver arriba",
    footer: "CREATIVIDAD × TECNOLOGÍA",
    message:
      "Hola, me gustaría hablar sobre un proyecto con D/S Studio.",
    subject: "Nuevo proyecto — D/S Studio",
  },
  en: {
    eyebrow: "Contact",
    status: "CHANNEL OPEN",
    overline: "YOUR NEXT PROJECT STARTS HERE",
    heading: "Let's make",
    accent: "ideas happen.",
    description:
      "Every great experience starts with a conversation. Tell us what you have in mind and let's explore how to turn it into something remarkable.",
    choose: "CONNECT WITH OUR TEAM",
    whatsapp: "WhatsApp",
    whatsappDetail: "Tell us about your idea",
    email: "Email",
    call: "Call",
    callDetail: "Let's talk directly",
    backToTop: "Back to top",
    footer: "CREATIVITY × TECHNOLOGY",
    message:
      "Hello, I'd like to discuss a project with D/S Studio.",
    subject: "New project — D/S Studio",
  },
} as const;

type ContactMethod = {
  number: string;
  title: string;
  detail: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
};

function ContactLink({
  method,
  accent,
  rgb,
}: {
  method: ContactMethod;
  accent: string;
  rgb: string;
}) {
  const Icon = method.icon;

  return (
    <a
      href={method.href}
      target={method.external ? "_blank" : undefined}
      rel={method.external ? "noopener noreferrer" : undefined}
      className="contact-link group relative grid min-w-0 grid-cols-[24px_minmax(0,1fr)_40px] items-center gap-x-3 gap-y-1 border-b border-white/[0.09] px-2 py-5 transition-colors duration-300 hover:bg-white/[0.025] sm:grid-cols-[28px_minmax(0,1fr)_40px] sm:px-4 sm:py-6"
      style={
        {
          "--contact-accent": accent,
          "--contact-rgb": rgb,
        } as React.CSSProperties
      }
    >
      <span className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-[var(--contact-accent)] transition-all duration-500 group-hover:w-full" />

      <span className="row-span-2 self-center font-mono text-[10px] text-[var(--contact-accent)]/70">
        {method.number}
      </span>

      <div className="flex min-w-0 items-center gap-3">
        <Icon
          size={17}
          strokeWidth={1.4}
          className="hidden shrink-0 text-white/35 transition-colors group-hover:text-[var(--contact-accent)] sm:block"
        />

        <span className="text-[clamp(1.3rem,2vw,2rem)] font-medium tracking-[-0.045em] text-white transition-transform duration-300 group-hover:translate-x-1">
          {method.title}
        </span>
      </div>

      <span className="col-start-2 min-w-0 break-words text-[11px] leading-relaxed text-white/45 sm:text-xs">
        {method.detail}
      </span>

      <span className="col-start-3 row-span-2 row-start-1 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/55 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-[var(--contact-accent)] group-hover:bg-[var(--contact-accent)] group-hover:text-[#090D14]">
        <ArrowUpRight size={18} strokeWidth={1.5} />
      </span>
    </a>
  );
}

function PersonContact({
  person,
  index,
  locale,
}: {
  person: Person;
  index: number;
  locale: Locale;
}) {
  const t = translations[locale];

  const methods: ContactMethod[] = [
    {
      number: "01",
      title: t.whatsapp,
      detail: t.whatsappDetail,
      href: `https://wa.me/${person.phoneDigits}?text=${encodeURIComponent(t.message)}`,
      icon: MessageCircle,
      external: true,
    },
    {
      number: "02",
      title: t.email,
      detail: person.email,
      href: `mailto:${person.email}?subject=${encodeURIComponent(t.subject)}`,
      icon: Mail,
    },
    {
      number: "03",
      title: t.call,
      detail: person.phone,
      href: `tel:+${person.phoneDigits}`,
      icon: Phone,
    },
  ];

  return (
    <div
      className="contact-reveal contact-person relative min-w-0 overflow-hidden rounded-[22px] border border-white/[0.10] bg-[#0C121D]/85 p-4 backdrop-blur-xl transition-colors duration-500 hover:border-white/20 sm:p-6 lg:p-7"
      style={
        {
          "--person-accent": person.accent,
          "--person-rgb": person.rgb,
        } as React.CSSProperties
      }
    >
      {/* TOP LIGHT */}
      <div className="pointer-events-none absolute inset-x-[12%] top-0 h-px bg-gradient-to-r from-transparent via-[var(--person-accent)]/60 to-transparent" />

      {/* AMBIENT GLOW */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-20 blur-[85px]"
        style={{ backgroundColor: person.accent }}
      />

      {/* CORNER MARKS */}
      <div className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-[var(--person-accent)]/35" />
      <div className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r border-t border-[var(--person-accent)]/35" />

      <div className="relative">
        <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-7">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] tracking-[0.16em] text-[var(--person-accent)]">
                NODE 0{index + 1}
              </span>

              <span className="h-px w-8 bg-[var(--person-accent)]/40" />

              <span className="font-mono text-[9px] tracking-[0.1em] text-white/30">
                D/S
              </span>
            </div>

            <h3 className="mt-5 text-[clamp(1.9rem,3vw,3rem)] font-medium leading-none tracking-[-0.055em] text-white">
              {person.name}
            </h3>

            <p className="mt-3 text-xs text-white/50">
              {person.role[locale]}
            </p>
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--person-accent)]/20 bg-[var(--person-accent)]/[0.07] text-[var(--person-accent)]">
            {index === 0 ? (
              <ScanLine size={19} strokeWidth={1.4} />
            ) : (
              <Sparkles size={19} strokeWidth={1.4} />
            )}
          </div>
        </div>

        <div>
          {methods.map((method) => (
            <ContactLink
              key={method.number}
              method={method}
              accent={person.accent}
              rgb={person.rgb}
            />
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.14em] text-white/30">
          <span>DS / CONNECTION</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#A8DDCC] motion-reduce:animate-none" />
            ONLINE
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ContactSection({
  locale,
}: {
  locale: Locale;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const t = translations[locale];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (
        window.matchMedia("(prefers-reduced-motion: reduce)")
          .matches
      ) {
        return;
      }

      gsap.fromTo(
        ".contact-reveal",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handlePointerMove = (
    event: React.PointerEvent<HTMLElement>
  ) => {
    if (!spotlightRef.current || !sectionRef.current) return;
    if (event.pointerType === "touch") return;

    const rect = sectionRef.current.getBoundingClientRect();

    spotlightRef.current.style.transform = `translate3d(${
      event.clientX - rect.left - 230
    }px, ${event.clientY - rect.top - 230}px, 0)`;
  };

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovering(true)}
      onPointerLeave={() => setIsHovering(false)}
      className="relative isolate scroll-mt-20 overflow-hidden bg-[#080B11] px-5 pb-8 pt-20 text-white sm:px-8 lg:px-16 lg:pt-28"
    >
      {/* FUTURISTIC BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(174,204,245,.25) 1px,transparent 1px),linear-gradient(90deg,rgba(174,204,245,.25) 1px,transparent 1px)",
            backgroundSize: "68px 68px",
            maskImage:
              "linear-gradient(to bottom,transparent,black 25%,black 85%,transparent)",
          }}
        />

        <div className="absolute -left-48 top-0 h-[600px] w-[600px] rounded-full bg-[#315B90]/[0.10] blur-[140px]" />
        <div className="absolute -right-48 bottom-0 h-[600px] w-[600px] rounded-full bg-[#8155A2]/[0.10] blur-[140px]" />

        <div
          ref={spotlightRef}
          className={`absolute left-0 top-0 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(151,190,255,0.11),transparent_70%)] blur-2xl transition-opacity duration-500 ${
            isHovering ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div className="relative mx-auto max-w-[1440px]">
        {/* SECTION LABEL */}
        <div className="contact-reveal flex items-center justify-between gap-4 border-b border-white/10 pb-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.23em] text-[#AFC5E8]">
            05 / {t.eyebrow}
          </span>

          <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-white/45">
            <Radio size={13} className="text-[#A8DDCC]" />
            {t.status}
          </span>
        </div>

        {/* HERO HEADING */}
        <div className="contact-reveal mt-14 grid gap-8 lg:mt-20 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-16">
          <div>
            <p className="mb-7 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.19em] text-[#B8C9E4]">
              <span className="h-px w-7 bg-[#B8C9E4]/60" />
              {t.overline}
            </p>

            <h2 className="text-[clamp(3rem,6.8vw,7.2rem)] font-medium leading-[0.98] tracking-[-0.065em] text-white">
              {t.heading}
              <br />
              <span className="bg-gradient-to-r from-[#B9D8FF] via-[#D0C0F3] to-[#E4B7E8] bg-clip-text font-serif italic text-transparent">
                {t.accent}
              </span>
            </h2>
          </div>

          <div className="lg:pb-3">
            <p className="max-w-[420px] text-sm leading-[1.95] text-white/55">
              {t.description}
            </p>

            <div className="mt-7 flex items-center gap-3 font-mono text-[9px] tracking-[0.14em] text-white/35">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A8DDCC]" />
              D/S STUDIO
              <span className="h-px w-12 bg-white/15" />
              2026
            </div>
          </div>
        </div>

        {/* TEAM CONTACT */}
        <div className="mt-20 lg:mt-24">
          <div className="contact-reveal mb-7 flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.17em] text-white/45">
              {t.choose}
            </span>

            <span className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
          </div>

          <div className="grid items-stretch gap-5 lg:grid-cols-2 lg:gap-7">
            {people.map((person, index) => (
              <PersonContact
                key={person.name}
                person={person}
                index={index}
                locale={locale}
              />
            ))}
          </div>
        </div>

        {/* COMPACT FOOTER — NO GIANT D/S */}
        <footer className="contact-reveal mt-20 border-t border-white/10 pt-6 lg:mt-24">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl font-semibold tracking-[-0.08em] text-white">
                D/S
              </span>
              <span className="h-5 w-px bg-white/20" />
              <span className="font-mono text-[10px] tracking-[0.18em] text-white/45">
                STUDIO
              </span>
            </div>

            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/40">
              {t.footer}
            </span>

            <div className="flex items-center justify-between gap-5">
              <span className="font-mono text-[10px] text-white/40">
                © {new Date().getFullYear()}
              </span>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
