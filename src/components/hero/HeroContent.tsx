
import { ArrowUpRight } from "lucide-react";

import type { Locale } from "@/i18n/config";
import type en from "@/i18n/en";

type HeroText = {
  [K in keyof (typeof en)["hero"]]: string;
};

type Props = {
  locale: Locale;
  content: HeroText;
};

export default function HeroContent({
  locale,
  content,
}: Props) {
  return (
    <div className="relative z-10 flex min-h-[100svh] flex-col justify-start px-6 pb-8 pt-[140px] sm:px-10 lg:justify-center lg:px-14 lg:pb-20 lg:pt-28">
      <div className="w-full max-w-[520px] xl:max-w-[570px]">
        {/* INTRO */}
        <p
          className="
            mb-5 max-w-[330px]
            text-[9px] font-medium uppercase
            leading-[1.7] tracking-[0.22em]
            text-white/75
            sm:mb-7 sm:max-w-none
            sm:text-xs sm:tracking-[0.3em]
          "
        >
          {content.eyebrow}
        </p>

        {/* HEADLINE */}
        <h1
          className="
            text-[clamp(2.2rem,9vw,3.6rem)]
            leading-[1.02] tracking-[-0.055em]
            text-white
            sm:text-[clamp(3rem,6vw,4.5rem)]
            lg:text-[clamp(2.8rem,4.5vw,5.2rem)]
          "
        >
          <span className="block font-semibold">
            {content.titleFirst}
          </span>

          <span className="block font-serif font-normal italic text-[#C2CCE0]">
            {content.titleSecond}
          </span>
        </h1>

        {/* DESCRIPTION */}
        <p
          className="
            mt-6 max-w-[340px]
            text-[13px] leading-[1.7]
            text-white/85
            sm:mt-8 sm:max-w-none sm:text-base
            lg:text-lg lg:text-white/75
          "
        >
          {content.descriptionFirst}
          <br />
          {content.descriptionSecond}
        </p>

        {/* ACTIONS */}
        <div
          className="
            mt-7 flex flex-wrap
            items-center gap-x-5 gap-y-4
            sm:mt-10 sm:gap-7
          "
        >
          <a
            href={`/${locale}#work`}
            className="
              group flex items-center gap-3
              text-[9px] font-semibold uppercase
              tracking-[0.1em] text-white
              sm:text-[10px] sm:tracking-[0.16em]
            "
          >
            <span
              className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-full border border-white/45
                transition-colors duration-300
                group-hover:bg-white
                group-hover:text-black
                sm:h-11 sm:w-11
              "
            >
              <ArrowUpRight size={17} />
            </span>

            {content.explore}
          </a>

          <a
            href={`/${locale}#contact`}
            className="
              border-b border-white/45 pb-2
              text-[9px] font-semibold uppercase
              tracking-[0.1em] text-white
              transition-colors hover:border-white
              sm:text-[10px] sm:tracking-[0.16em]
            "
          >
            {content.start}
          </a>
        </div>
      </div>
    </div>
  );
}
