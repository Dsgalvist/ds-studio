
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

export default function HeroContent({ locale, content }: Props) {
  return (
    <div className="relative z-10 flex min-h-[100svh] items-center px-6 pb-28 pt-28 sm:px-10 lg:px-14 xl:pb-20">
      <div className="w-full max-w-[520px] xl:max-w-[570px]">
        <p className="mb-7 text-[10px] font-medium uppercase tracking-[0.3em] text-white/65 sm:text-xs">
          {content.eyebrow}
        </p>

        <h1 className="text-[clamp(2.8rem,4.5vw,5.2rem)] leading-[1.02] tracking-[-0.055em] text-white">
          <span className="block font-semibold">
            {content.titleFirst}
          </span>

          <span className="block font-serif font-normal italic text-[#C2CCE0]">
            {content.titleSecond}
          </span>
        </h1>

        <p className="mt-8 text-base leading-relaxed text-white/75 sm:text-lg">
          {content.descriptionFirst}
          <br />
          {content.descriptionSecond}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-7">
          <a
            href={`/${locale}#work`}
            className="group flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/45 transition-colors duration-300 group-hover:bg-white group-hover:text-black">
              <ArrowUpRight size={17} />
            </span>
            {content.explore}
          </a>

          <a
            href={`/${locale}#contact`}
            className="border-b border-white/45 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white hover:border-white"
          >
            {content.start}
          </a>
        </div>
      </div>
    </div>
  );
}
