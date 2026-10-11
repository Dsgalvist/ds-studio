
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import AboutProfile from "./AboutProfile";

import type { Locale } from "@/i18n/config";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type AboutText = {
  eyebrow: string;
  titleFirst: string;
  titleSecond: string;
  description: string;
  saraRole: string;
  saraDescription: string;
  saraEducation: string;
  diegoRole: string;
  diegoDescription: string;
  diegoEducation: string;
  portfolioLabel: string;
  closing: string;
  cta: string;
};

type Props = {
  locale: Locale;
  content: AboutText;
};

export default function AboutSection({
  locale,
  content,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const spanish = locale === "es";

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reducedMotion) return;

      gsap.from(".about-intro", {
        y: 35,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-intro",
          start: "top 88%",
          once: true,
        },
      });

      gsap.from(".about-profile", {
        y: 55,
        opacity: 0,
        stagger: 0.13,
        duration: 0.95,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-grid",
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(".about-connector", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-connector",
          start: "top 95%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative isolate scroll-mt-20 overflow-hidden bg-[#07090D] px-5 py-20 text-white sm:px-8 lg:px-16 lg:py-24"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-15%] top-[10%] h-[420px] w-[420px] rounded-full bg-[#2B4168]/10 blur-[130px]" />

        <div className="absolute bottom-[-20%] right-[-10%] h-[420px] w-[420px] rounded-full bg-[#654078]/10 blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.3) 1px,transparent 1px)",
            backgroundSize: "90px 90px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1440px]">
        {/* SECTION LABEL */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#AFC5E8]">
            02 / {content.eyebrow}
          </span>

          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A9DCCF]" />

            <span className="hidden font-mono text-[9px] uppercase tracking-[0.17em] text-white/45 sm:block">
              Creative × Technology
            </span>
          </div>
        </div>

        {/* INTRODUCTION */}
        <div className="about-intro mt-12 grid gap-5 lg:mt-14 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-12">
          <div>
            <h2 className="max-w-[680px] text-[clamp(2.3rem,4.5vw,4.8rem)] font-medium leading-[1.05] tracking-[-0.06em] text-white">
              {spanish ? "Detrás de " : "Behind "}
              <span className="font-serif italic text-[#B8C9E4]">
                D/S Studio.
              </span>
            </h2>
          </div>

          <p className="max-w-[450px] text-[13px] leading-[1.9] text-white/60 sm:text-sm lg:justify-self-end">
            {content.description}
          </p>
        </div>

        {/* FOUNDERS */}
        <div className="about-grid mt-12 grid gap-5 md:grid-cols-2 lg:mt-14 lg:gap-7">
          <AboutProfile
            number="01"
            name="Sara Acosta"
            role={content.saraRole}
            description={content.saraDescription}
            education={content.saraEducation}
            skills={[
              "Graphic Design",
              "Audiovisual",
              "Motion",
              "Storytelling",
              "Sound",
            ]}
            initials="S"
            imageSrc="/images/about/sara.png"
            portfolioUrl="https://saraacosta.vercel.app/"
            portfolioLabel={content.portfolioLabel}
          />

          <AboutProfile
            number="02"
            name="Diego Galvis"
            role={content.diegoRole}
            description={content.diegoDescription}
            education={content.diegoEducation}
            skills={[
              "Web & Mobile",
              "Software",
              "AI Agents",
              "Cloud",
            ]}
            initials="D"
            imageSrc="/images/about/diego.png"
            portfolioUrl="https://diegogalvis.vercel.app/"
            portfolioLabel={content.portfolioLabel}
          />
        </div>

        {/* CONNECTION */}
        <div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">
            <span>Creative</span>
            <span className="text-[#B8C9E4]">+</span>
            <span>Technology</span>
            <span className="text-[#B8C9E4]">=</span>
            <span className="font-semibold text-white">
              D/S Studio
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="about-connector h-px w-14 bg-[#AFC5E8]/60" />

            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/35">
              {spanish
                ? "Diseño y desarrollo"
                : "Design and development"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
