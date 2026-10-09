import HeroCursor from "./HeroCursor";
import HeroPortraits from "./HeroPortraits";
import HeroContent from "./HeroContent";
import HeroSideLabels from "./HeroSideLabels";
import HeroLiquid from "./HeroLiquid";

import type { Locale } from "@/i18n/config";
import type en from "@/i18n/en";

type HeroText = {
  [K in keyof (typeof en)["hero"]]: string;
};

type Props = {
  locale: Locale;
  content: HeroText;
};

export default function CinematicHero({
  locale,
  content,
}: Props) {
  return (
    <section
      id="home"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#050608]"
    >
      {/* Fotografía original */}
      <HeroPortraits />

      {/* Efectos cromados */}
      <HeroLiquid />

      <HeroCursor />
      
      {/* Contenido principal */}
      <HeroContent locale={locale} content={content} />

      {/* Etiquetas editoriales */}
      <HeroSideLabels locale={locale} />

      {/* Indicador de scroll */}
      <div className="pointer-events-none absolute bottom-[7%] right-[5%] z-20 hidden flex-col items-center gap-5 xl:flex">
        <span className="text-[9px] font-medium uppercase tracking-[0.35em] text-white/70">
          {content.scroll}
        </span>

        <div className="h-10 w-px bg-gradient-to-b from-white/70 to-transparent" />
      </div>
    </section>
  );
}
