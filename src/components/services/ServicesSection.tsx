
"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Bot,
  Check,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Cloud,
  Code2,
  Film,
  Globe,
  Layers3,
  Palette,
  PenTool,
  Play,
  Smartphone,
  Volume2,
  type LucideIcon,
} from "lucide-react";

import type { Locale } from "@/i18n/config";

type ServiceKey =
  | "websites"
  | "applications"
  | "ai"
  | "cloud"
  | "graphicDesign"
  | "audiovisual"
  | "editing"
  | "storytelling";

type ServiceText = {
  title: string;
  description: string;
};

type ServicesContent = {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  description: string;
  technology: string;
  creative: string;
  selectService: string;
  explore: string;
  services: Record<ServiceKey, ServiceText>;
};

type Props = {
  locale: Locale;
  content: ServicesContent;
};

type Service = ServiceText & {
  id: ServiceKey;
  icon: LucideIcon;
};

type Category = "technology" | "creative";

const INTERVAL = 4000;

const technologyConfig: {
  id: ServiceKey;
  icon: LucideIcon;
}[] = [
  { id: "websites", icon: Globe },
  { id: "applications", icon: Smartphone },
  { id: "ai", icon: Bot },
  { id: "cloud", icon: Cloud },
];

const creativeConfig: {
  id: ServiceKey;
  icon: LucideIcon;
}[] = [
  { id: "graphicDesign", icon: Palette },
  { id: "audiovisual", icon: Clapperboard },
  { id: "editing", icon: Film },
  { id: "storytelling", icon: PenTool },
];

function VisualFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative mx-auto flex h-[190px] w-full max-w-[360px] items-center justify-center sm:h-[225px]">
      <div className="absolute inset-0 rounded-full bg-[#8FADE0]/[0.035] blur-3xl" />
      {children}
    </div>
  );
}

function ServiceVisual({
  id,
}: {
  id: ServiceKey;
}) {
  switch (id) {
    case "websites":
      return (
        <VisualFrame>
          <div className="w-[82%] -rotate-3 overflow-hidden rounded-xl border border-[#AFC9EF]/30 bg-[#0B1422] shadow-[0_25px_70px_rgba(0,0,0,0.4)]">
            <div className="flex h-7 items-center gap-1.5 border-b border-white/10 bg-[#172235] px-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#EFA9A9]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#EFD6A9]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#A9DFCC]" />
              <span className="ml-auto font-mono text-[8px] text-white/40">
                yourbrand.com
              </span>
            </div>

            <div className="grid grid-cols-[1.2fr_1fr] gap-3 p-4">
              <div className="space-y-2">
                <div className="h-2 w-12 rounded bg-[#B7D4F8]/70" />
                <div className="h-4 w-full rounded bg-white/65" />
                <div className="h-2 w-[80%] rounded bg-white/20" />
                <div className="h-2 w-[65%] rounded bg-white/15" />
                <div className="mt-3 h-5 w-20 rounded bg-[#9FBFEA]" />
              </div>
              <div className="flex items-center justify-center rounded-lg bg-gradient-to-br from-[#365F8E] to-[#16243B]">
                <Globe size={38} strokeWidth={1} className="text-[#C6E1FF]" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-1 right-1 rounded-lg border border-[#AFC9EF]/25 bg-[#17273C] px-3 py-2 font-mono text-[9px] text-[#C7DDF9] shadow-xl">
            RESPONSIVE ✓
          </div>
        </VisualFrame>
      );

    case "applications":
      return (
        <VisualFrame>
          <div className="relative h-[175px] w-[100px] rotate-[-10deg] rounded-[20px] border-[4px] border-[#647B9A] bg-[#101B2D] p-2 shadow-2xl sm:h-[205px] sm:w-[115px]">
            <div className="mx-auto mb-4 h-1 w-8 rounded-full bg-white/30" />
            <div className="mb-3 h-6 rounded-md bg-[#88ACDF]/65" />
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: 4 }, (_, i) => (
                <div
                  key={i}
                  className="h-10 rounded-md border border-white/10 bg-[#263C58]"
                />
              ))}
            </div>
            <div className="mt-3 h-2 w-14 rounded bg-white/20" />
          </div>
          <div className="absolute left-[52%] top-[22%] w-[110px] rotate-[8deg] rounded-lg border border-[#B1C9ED]/30 bg-[#1A2A40] p-3 shadow-xl sm:w-[135px]">
            <div className="mb-3 flex gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#9DC4F3]" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            </div>
            <div className="h-3 w-16 rounded bg-white/55" />
            <div className="mt-3 h-8 rounded bg-[#6E9FD9]/30" />
            <div className="mt-2 h-2 w-12 rounded bg-white/20" />
          </div>
        </VisualFrame>
      );

    case "ai":
      return (
        <VisualFrame>
          <div className="absolute h-[165px] w-[165px] animate-[spin_35s_linear_infinite] rounded-full border border-dashed border-[#9DC4F3]/30 motion-reduce:animate-none" />
          <div className="absolute h-[125px] w-[125px] rounded-full border border-[#9DC4F3]/20" />
          <div className="relative flex h-[85px] w-[85px] items-center justify-center rounded-3xl border border-[#9DC4F3]/40 bg-[#182B44] shadow-[0_0_45px_rgba(130,180,250,0.18)]">
            <Bot size={40} strokeWidth={1.2} className="text-[#B8D8FF]" />
          </div>
          <div className="absolute left-[8%] top-[20%] rounded-lg border border-white/15 bg-[#162338] px-3 py-2 font-mono text-[9px] text-[#B8D8FF]">
            INPUT
          </div>
          <div className="absolute bottom-[17%] right-[5%] rounded-lg border border-white/15 bg-[#162338] px-3 py-2 font-mono text-[9px] text-[#B8D8FF]">
            AUTOMATED ✓
          </div>
          <div className="absolute left-[18%] bottom-[23%] h-2 w-2 rounded-full bg-[#9DC4F3] shadow-[0_0_15px_#9DC4F3]" />
          <div className="absolute right-[18%] top-[22%] h-2 w-2 rounded-full bg-[#9DC4F3] shadow-[0_0_15px_#9DC4F3]" />
        </VisualFrame>
      );

    case "cloud":
      return (
        <VisualFrame>
          <div className="relative flex h-[95px] w-[115px] items-center justify-center rounded-2xl border border-[#9DC4F3]/35 bg-[#1B304A] shadow-[0_0_55px_rgba(130,180,250,0.15)]">
            <Cloud size={55} strokeWidth={1.1} className="text-[#B8D8FF]" />
          </div>
          {[
            { x: "left-[5%] top-[15%]", label: "API" },
            { x: "right-[5%] top-[15%]", label: "DATA" },
            { x: "left-[5%] bottom-[15%]", label: "APP" },
            { x: "right-[5%] bottom-[15%]", label: "SYNC" },
          ].map((node) => (
            <div
              key={node.label}
              className={`absolute ${node.x} rounded-lg border border-[#9DC4F3]/25 bg-[#152337] px-3 py-2 font-mono text-[9px] text-[#C2D9F8]`}
            >
              {node.label}
            </div>
          ))}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 360 225"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <g stroke="#9DC4F3" strokeWidth="1" strokeDasharray="4 6" opacity=".4" fill="none">
              <path d="M180 112 L65 48" />
              <path d="M180 112 L295 48" />
              <path d="M180 112 L65 180" />
              <path d="M180 112 L295 180" />
            </g>
          </svg>
        </VisualFrame>
      );

    case "graphicDesign":
      return (
        <VisualFrame>
          <div className="absolute left-[15%] top-[18%] h-[125px] w-[105px] -rotate-12 rounded-xl bg-[#C69BDD] shadow-xl" />
          <div className="absolute right-[15%] top-[20%] h-[125px] w-[105px] rotate-12 rounded-xl bg-[#F1B9A5] shadow-xl" />
          <div className="relative flex h-[145px] w-[115px] items-center justify-center rounded-xl border border-white/30 bg-[#34223F] shadow-2xl">
            <div className="absolute left-3 top-3 font-mono text-[8px] text-white/60">
              DESIGN / 01
            </div>
            <Palette size={53} strokeWidth={1.1} className="text-[#E8CBF7]" />
            <div className="absolute bottom-3 flex gap-1.5">
              {["#D2A5E7", "#F1B9A5", "#A7C5E9"].map((color) => (
                <span
                  key={color}
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </VisualFrame>
      );

    case "audiovisual":
      return (
        <VisualFrame>
          <div className="relative w-[82%] overflow-hidden rounded-xl border border-[#E4BCEB]/30 bg-[#241B30] shadow-2xl">
            <div className="relative flex h-[125px] items-center justify-center bg-[radial-gradient(circle_at_50%_50%,#6B4A7B,#1C1626_75%)] sm:h-[150px]">
              <Clapperboard size={58} strokeWidth={1.1} className="text-[#EBD3F4]" />
              <div className="absolute left-3 top-3 flex items-center gap-1.5 font-mono text-[9px] text-[#F5D5E8]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400 motion-reduce:animate-none" />
                REC
              </div>
              <div className="absolute bottom-3 right-3 font-mono text-[9px] text-white/60">
                00:01:24
              </div>
            </div>
            <div className="flex items-center gap-3 p-3">
              <Play size={13} className="text-[#EBD3F4]" />
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/15">
                <div className="h-full w-[58%] rounded-full bg-[#D7AFE8]" />
              </div>
              <Volume2 size={13} className="text-white/50" />
            </div>
          </div>
        </VisualFrame>
      );

    case "editing":
      return (
        <VisualFrame>
          <div className="w-[90%] rounded-xl border border-[#E4BCEB]/25 bg-[#211A2C] p-3 shadow-2xl">
            <div className="mb-3 flex h-20 items-center justify-center rounded-md bg-gradient-to-br from-[#80598E] to-[#30223D]">
              <Film size={35} strokeWidth={1.1} className="text-[#EBD3F4]" />
            </div>
            <div className="space-y-2">
              <div className="flex gap-1">
                {["#A779BC", "#D6A6CF", "#8567AB", "#C28DBA"].map(
                  (color, i) => (
                    <div
                      key={i}
                      className="h-5 flex-1 rounded-sm"
                      style={{ backgroundColor: color }}
                    />
                  )
                )}
              </div>
              <div className="flex h-5 items-center gap-0.5 rounded-sm bg-[#332640] px-1">
                {Array.from({ length: 24 }, (_, i) => (
                  <div
                    key={i}
                    className="w-1 flex-1 rounded-full bg-[#DDB6EE]"
                    style={{
                      height: `${4 + ((i * 7) % 12)}px`,
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between font-mono text-[8px] text-white/40">
              <span>VIDEO 01</span>
              <span>AUDIO 02</span>
            </div>
          </div>
        </VisualFrame>
      );

    case "storytelling":
      return (
        <VisualFrame>
          <div className="grid w-[82%] grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="relative h-[105px] rotate-[-3deg] rounded-lg border border-[#DDB6EE]/25 bg-[#2A2035] p-2 shadow-xl even:rotate-[4deg]"
              >
                <div className="mb-2 font-mono text-[8px] text-[#DDB6EE]">
                  0{i + 1}
                </div>
                <div className="flex h-12 items-center justify-center rounded bg-[#795A8C]/40">
                  {i === 0 ? (
                    <PenTool size={21} className="text-[#EBD3F4]" />
                  ) : i === 1 ? (
                    <Layers3 size={21} className="text-[#EBD3F4]" />
                  ) : (
                    <Clapperboard size={21} className="text-[#EBD3F4]" />
                  )}
                </div>
                <div className="mt-2 h-1 w-full rounded bg-white/20" />
                <div className="mt-1 h-1 w-2/3 rounded bg-white/10" />
              </div>
            ))}
          </div>
        </VisualFrame>
      );
  }
}

function ServiceCard({
  category,
  owner,
  categoryLabel,
  services,
  isVisible,
  portfolioUrl,
  portfolioLabel,
  contactLabel,
  locale,
}: {
  category: Category;
  owner: string;
  categoryLabel: string;
  services: Service[];
  isVisible: boolean;
  portfolioUrl: string;
  portfolioLabel: string;
  contactLabel: string;
  locale: Locale;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);

  const creative = category === "creative";
  const active = services[activeIndex];
  const Icon = active.icon;

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const update = () => setReducedMotion(media.matches);
    update();

    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const update = () => {
      setDocumentVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", update);

    return () => {
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  useEffect(() => {
    if (
      !isVisible ||
      paused ||
      reducedMotion ||
      !documentVisible
    ) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % services.length);
    }, INTERVAL);

    return () => window.clearInterval(interval);
  }, [
    isVisible,
    paused,
    reducedMotion,
    documentVisible,
    services.length,
  ]);

  const selectService = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <article
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (
          !event.currentTarget.contains(
            event.relatedTarget as Node | null
          )
        ) {
          setPaused(false);
        }
      }}
      className={`group relative flex min-w-0 flex-col overflow-hidden rounded-[22px] border transition-colors duration-500 ${
        creative
          ? "border-[#755784]/35 bg-[#130F1B] hover:border-[#C49EDB]/45"
          : "border-[#56769E]/35 bg-[#0E1520] hover:border-[#AFC9EF]/45"
      }`}
    >
      {/* AMBIENT */}
      <div
        className={`pointer-events-none absolute left-1/2 top-[15%] h-[260px] w-[260px] -translate-x-1/2 rounded-full blur-[100px] ${
          creative
            ? "bg-[#B684CE]/10"
            : "bg-[#83AEE7]/10"
        }`}
      />

      {/* HEADER */}
      <div className="relative z-10 flex items-start justify-between gap-4 border-b border-white/10 px-5 py-5 sm:px-7">
        <div>
          <p
            className={`font-mono text-[10px] uppercase tracking-[0.18em] ${
              creative
                ? "text-[#D7B5E9]"
                : "text-[#B7D2F5]"
            }`}
          >
            {owner}
          </p>

          <h3 className="mt-2 text-[13px] font-medium text-white/70 sm:text-sm">
            {categoryLabel}
          </h3>
        </div>

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
            creative
              ? "border-[#C49EDB]/25 bg-[#C49EDB]/10 text-[#E1C4F0]"
              : "border-[#AFC9EF]/25 bg-[#AFC9EF]/10 text-[#C4DDFB]"
          }`}
        >
          {creative ? (
            <Palette size={20} strokeWidth={1.5} />
          ) : (
            <Code2 size={20} strokeWidth={1.5} />
          )}
        </div>
      </div>

      {/* VISUAL */}
      <div className="relative overflow-hidden px-4 pt-5 sm:px-7">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.09]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.18) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.18) 1px,transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage:
              "radial-gradient(ellipse at center,black,transparent 80%)",
          }}
        />

        <div className="relative flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/35">
            D/S — SERVICE 0{activeIndex + 1}
          </span>

          <span className="flex items-center gap-2 font-mono text-[9px] text-white/40">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A8DDCC]" />
            LIVE PREVIEW
          </span>
        </div>

        <div
          key={active.id}
          className="animate-[dsServiceEnter_450ms_ease-out_both] motion-reduce:animate-none"
        >
          <ServiceVisual id={active.id} />
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-1 flex-col px-5 pb-6 sm:px-7 sm:pb-7">
        <div className="mb-3 flex items-center gap-2">
          <Icon
            size={17}
            strokeWidth={1.5}
            className={
              creative
                ? "text-[#D7B5E9]"
                : "text-[#B7D2F5]"
            }
          />

          <span className="font-mono text-[10px] tracking-[0.14em] text-white/40">
            0{activeIndex + 1} / 04
          </span>
        </div>

        <div
          key={`text-${active.id}`}
          aria-live="off"
          className="min-h-[150px] animate-[dsServiceEnter_450ms_ease-out_both] motion-reduce:animate-none sm:min-h-[135px]"
        >
          <h4 className="text-[clamp(1.3rem,2vw,1.8rem)] font-medium leading-tight tracking-[-0.035em] text-white">
            {active.title}
          </h4>

          <p className="mt-3 max-w-lg text-[13px] leading-[1.85] text-white/60">
            {active.description}
          </p>
        </div>

        {/* PROGRESS / MANUAL NAVIGATION */}
        <div className="mt-auto grid grid-cols-4 gap-2 pt-5">
          {services.map((service, index) => (
            <button
              key={service.id}
              type="button"
              onClick={() => selectService(index)}
              aria-label={`${service.title} (${index + 1}/4)`}
              aria-pressed={activeIndex === index}
              className="group/step relative flex h-7 items-center"
            >
              <span className="absolute inset-x-0 h-[3px] overflow-hidden rounded-full bg-white/15">
                {index < activeIndex && (
                  <span
                    className={`block h-full w-full ${
                      creative
                        ? "bg-[#D7B5E9]"
                        : "bg-[#B7D2F5]"
                    }`}
                  />
                )}

                {index === activeIndex && (
                  <span
                    key={`${service.id}-${isVisible}-${paused}`}
                    className={`block h-full origin-left ${
                      creative
                        ? "bg-[#D7B5E9]"
                        : "bg-[#B7D2F5]"
                    } ${
                      isVisible &&
                      !paused &&
                      !reducedMotion &&
                      documentVisible
                        ? "animate-[dsServiceProgress_4s_linear_forwards]"
                        : "w-full"
                    }`}
                  />
                )}
              </span>
            </button>
          ))}
        </div>

        {/* CONTROLS */}
        <div className="mt-3 flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.13em] text-white/35">
            {activeIndex + 1} / {services.length}
          </span>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() =>
                selectService(
                  (activeIndex - 1 + services.length) %
                    services.length
                )
              }
              aria-label={
                locale === "es"
                  ? "Servicio anterior"
                  : "Previous service"
              }
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/65 transition-colors hover:border-white/40 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              type="button"
              onClick={() =>
                selectService(
                  (activeIndex + 1) % services.length
                )
              }
              aria-label={
                locale === "es"
                  ? "Siguiente servicio"
                  : "Next service"
              }
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/65 transition-colors hover:border-white/40 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ServicesSection({
  locale,
  content,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "-20% 0px -20% 0px",
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const technology: Service[] = technologyConfig.map(
    ({ id, icon }) => ({
      id,
      icon,
      ...content.services[id],
    })
  );

  const creative: Service[] = creativeConfig.map(
    ({ id, icon }) => ({
      id,
      icon,
      ...content.services[id],
    })
  );

  const portfolioLabel =
    locale === "es" ? "Ver portafolio" : "View portfolio";

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative isolate scroll-mt-20 overflow-hidden bg-[#080B11] px-5 py-20 text-white sm:px-8 lg:px-16 lg:py-28"
    >
      <style>{`
        @keyframes dsServiceEnter {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes dsServiceProgress {
          from { width: 0%; }
          to { width: 100%; }
        }

        @media (prefers-reduced-motion: reduce) {
          [class*="dsServiceEnter"],
          [class*="dsServiceProgress"] {
            animation: none !important;
          }
        }
      `}</style>

      {/* AMBIENT BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-15%] top-[15%] h-[450px] w-[450px] rounded-full bg-[#304C77]/10 blur-[130px]" />
        <div className="absolute bottom-[-15%] right-[-10%] h-[450px] w-[450px] rounded-full bg-[#675181]/10 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-[1440px]">
        {/* SECTION LABEL */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#AFC5E8]">
            03 / {content.eyebrow}
          </span>

          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/35">
            D/S STUDIO
          </span>
        </div>

        {/* HEADING */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-12">
          <h2 className="max-w-3xl text-[clamp(2.5rem,5vw,5.5rem)] font-medium leading-[1.05] tracking-[-0.06em]">
            {content.heading}{" "}
            <span className="font-serif italic text-[#B8C9E4]">
              {content.headingAccent}
            </span>
          </h2>

          <p className="max-w-md text-sm leading-[1.9] text-white/60 lg:justify-self-end">
            {content.description}
          </p>
        </div>

        {/* TWO INDEPENDENT CARDS */}
        <div className="mt-12 grid items-stretch gap-5 md:grid-cols-2 lg:mt-16 lg:gap-7">
          <ServiceCard
            category="technology"
            owner="DIEGO GALVIS / 01"
            categoryLabel={content.technology}
            services={technology}
            isVisible={isVisible}
            portfolioUrl="https://diegogalvis.vercel.app/"
            portfolioLabel={portfolioLabel}
            contactLabel={content.explore}
            locale={locale}
          />

          <ServiceCard
            category="creative"
            owner="SARA ACOSTA / 02"
            categoryLabel={content.creative}
            services={creative}
            isVisible={isVisible}
            portfolioUrl="https://saraacosta.vercel.app/"
            portfolioLabel={portfolioLabel}
            contactLabel={content.explore}
            locale={locale}
          />
        </div>

        {/* FOOTER */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.13em] text-white/45">
            <span>Creative</span>
            <span className="text-[#C4B4E4]">+</span>
            <span>Technology</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.15em] text-white/35">
            <Check size={13} className="text-[#A8DDCC]" />
            D/S STUDIO
          </div>
        </div>
      </div>
    </section>
  );
}
