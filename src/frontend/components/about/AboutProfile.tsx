
"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight, GraduationCap } from "lucide-react";

gsap.registerPlugin(useGSAP);

type Props = {
  number: string;
  name: string;
  role: string;
  description: string;
  education: string;
  skills: string[];
  initials: string;
  imageSrc?: string;
  portfolioUrl: string;
  portfolioLabel: string;
};

export default function AboutProfile({
  number,
  name,
  role,
  description,
  education,
  skills,
  initials,
  imageSrc,
  portfolioUrl,
  portfolioLabel,
}: Props) {
  const cardRef = useRef<HTMLElement>(null);
  const isSara = initials === "S";

  const desktopImage =
    imageSrc ??
    (isSara
      ? "/images/about/sara.png"
      : "/images/about/diego.png");

  const mobileImage = isSara
    ? "/images/about/sara-about.png"
    : "/images/about/diego-about.png";

  const accent = isSara ? "#D6B5F2" : "#A9CFFF";

  useGSAP(
    () => {
      const card = cardRef.current;
      if (!card) return;

      const visuals = gsap.utils.toArray<HTMLElement>(
        ".about-image-reveal"
      );

      const scans = gsap.utils.toArray<HTMLElement>(
        ".about-xray-scan"
      );

      const xrayLayers = gsap.utils.toArray<HTMLElement>(
        ".about-xray-layer"
      );

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reducedMotion) return;

      gsap.set(visuals, {
        clipPath: "inset(0 50% 0 50%)",
        scale: 1.035,
      });

      gsap.set(scans, {
        opacity: 0,
        left: "50%",
      });

      gsap.set(xrayLayers, {
        opacity: 0,
      });

      const timeline = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power3.inOut",
        },
      });

      timeline
        .to(visuals, {
          clipPath: "inset(0 0% 0 0%)",
          scale: 1,
          duration: 1.25,
          stagger: 0,
        })
        .fromTo(
          scans,
          {
            left: "50%",
            opacity: 0,
          },
          {
            left: "100%",
            opacity: 0.85,
            duration: 0.75,
            ease: "power2.out",
          },
          0.15
        )
        .to(
          scans,
          {
            opacity: 0,
            duration: 0.25,
          },
          0.7
        )
        .to(
          xrayLayers,
          {
            opacity: 0.45,
            duration: 0.14,
          },
          0.32
        )
        .to(
          xrayLayers,
          {
            opacity: 0,
            duration: 0.45,
          },
          0.48
        );

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            timeline.play();
            observer.disconnect();
          }
        },
        { threshold: 0.25 }
      );

      observer.observe(card);

      return () => {
        observer.disconnect();
        timeline.kill();
      };
    },
    { scope: cardRef }
  );

  return (
    <article ref={cardRef} className="about-profile group relative min-w-0">
      <div className="relative flex h-full flex-col overflow-hidden rounded-[20px] border border-white/[0.12] bg-[#10141D] transition-[border-color,box-shadow] duration-500 hover:border-[#AFC5E8]/40 hover:shadow-[0_0_50px_rgba(120,155,210,0.07)]">
        {/* METADATA */}
        <div className="relative z-20 flex items-center justify-between px-5 pt-5 sm:px-7 sm:pt-6">
          <span className="font-mono text-[10px] tracking-[0.2em] text-[#B7C7DF]">
            {number} / D/S
          </span>

          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A9DCCF]" />
            <span className="font-mono text-[9px] tracking-[0.16em] text-white/45">
              ACTIVE
            </span>
          </div>
        </div>

        {/* IMAGE AREA */}
        <div className="relative mt-2 overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              background: `radial-gradient(ellipse at center, ${accent}, transparent 75%)`,
            }}
          />

          {/* MOBILE / TABLET */}
          <div className="relative h-[310px] w-full sm:h-[380px] lg:hidden">
            <div className="about-image-reveal absolute inset-0">
              <Image
                src={mobileImage}
                alt={`${name} — ${role}`}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-contain object-bottom"
              />
            </div>

            <div className="about-xray-layer pointer-events-none absolute inset-0 opacity-0 mix-blend-screen">
              <Image
                src={mobileImage}
                alt=""
                aria-hidden="true"
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-contain object-bottom brightness-150 contrast-200 saturate-0"
              />
            </div>

            <div
              className="about-xray-scan pointer-events-none absolute inset-y-0 z-10 w-px opacity-0"
              style={{
                backgroundColor: accent,
                boxShadow: `0 0 14px 3px ${accent}`,
              }}
            />
          </div>

          {/* DESKTOP */}
          <div className="relative hidden aspect-video w-full lg:block">
            <div className="about-image-reveal absolute inset-0">
              <Image
                src={desktopImage}
                alt={`${name} — ${role}`}
                fill
                sizes="(min-width: 1440px) 700px, 50vw"
                className="object-contain object-center"
              />
            </div>

            <div className="about-xray-layer pointer-events-none absolute inset-0 opacity-0 mix-blend-screen">
              <Image
                src={desktopImage}
                alt=""
                aria-hidden="true"
                fill
                sizes="(min-width: 1440px) 700px, 50vw"
                className="object-contain object-center brightness-150 contrast-200 saturate-0"
              />
            </div>

            <div
              className="about-xray-scan pointer-events-none absolute inset-y-0 z-10 w-px opacity-0"
              style={{
                backgroundColor: accent,
                boxShadow: `0 0 14px 3px ${accent}`,
              }}
            />
          </div>

          {/* CORNERS */}
          <div
            className="pointer-events-none absolute bottom-4 left-5 h-5 w-5 border-b border-l opacity-50"
            style={{ borderColor: accent }}
          />

          <div
            className="pointer-events-none absolute right-5 top-5 h-5 w-5 border-r border-t opacity-50"
            style={{ borderColor: accent }}
          />

          <div className="pointer-events-none absolute bottom-4 right-5 flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: accent }}
            />
            <span className="font-mono text-[9px] tracking-[0.15em] text-white/50">
              {initials} / PROFILE
            </span>
          </div>
        </div>

        {/* PROFILE CONTENT */}
        <div className="relative z-10 flex flex-1 flex-col border-t border-white/10 px-5 pb-6 pt-5 sm:px-7">
          <h3 className="text-[clamp(1.45rem,2.3vw,2rem)] font-medium tracking-[-0.045em] text-white">
            {name}
          </h3>

          <p
            className="mt-1 text-[10px] uppercase tracking-[0.15em]"
            style={{ color: accent }}
          >
            {role}
          </p>

          <p className="mt-4 text-[13px] leading-[1.8] text-white/65">
            {description}
          </p>

          {/* EDUCATION */}
          <div className="mt-5 flex items-start gap-3 border-t border-white/10 pt-4">
            <GraduationCap
              size={17}
              className="mt-0.5 shrink-0"
              style={{ color: accent }}
            />
            <p className="text-[12px] leading-[1.7] text-white/50">
              {education}
            </p>
          </div>

          {/* SKILLS */}
          <div className="mt-5 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-[9px] uppercase tracking-[0.1em] text-white/65"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* PORTFOLIO */}
          <div className="mt-auto pt-7">
            <a
              href={portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${portfolioLabel} — ${name}`}
              className="group/link flex min-h-12 items-center justify-between gap-4 rounded-full border border-[#AFC5E8]/35 bg-[#AFC5E8]/[0.06] px-5 py-3 text-[11px] font-medium uppercase tracking-[0.14em] text-white transition-all duration-300 hover:border-[#D5E4FA] hover:bg-[#D5E4FA] hover:text-[#080A0F] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D5E4FA]"
            >
              <span>{portfolioLabel}</span>
              <ArrowUpRight
                size={17}
                className="shrink-0 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
