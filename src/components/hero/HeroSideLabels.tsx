
import type { Locale } from "@/i18n/config";

type Props = {
  locale: Locale;
};

export default function HeroSideLabels({ locale }: Props) {
  const isSpanish = locale === "es";

  const creativeDisciplines = isSpanish
    ? ["DISEÑO", "DESARROLLO", "FOTOGRAFÍA", "VIDEO"]
    : ["DESIGN", "DEVELOPMENT", "PHOTO", "VIDEO"];

  return (
    <>
      {/* Etiquetas superiores del lado derecho */}
      <div className="pointer-events-none absolute right-[5%] top-[23%] z-20 hidden flex-col items-end gap-6 text-right xl:flex">
        <div className="space-y-2">
          <p className="text-[9px] font-medium uppercase tracking-[0.35em] text-white/75">
            {isSpanish ? "DESARROLLO" : "DEVELOPMENT"}
          </p>
          <p className="text-[9px] font-medium uppercase tracking-[0.35em] text-white/75">
            {isSpanish ? "TECNOLOGÍA" : "TECHNOLOGY"}
          </p>
        </div>

        <div className="h-px w-16 bg-white/60" />

        <span className="text-xl font-light text-white/80">+</span>

        <div className="space-y-2">
          <p className="text-[9px] font-medium uppercase tracking-[0.35em] text-white/75">
            {isSpanish ? "VISUAL" : "VISUAL"}
          </p>
          <p className="text-[9px] font-medium uppercase tracking-[0.35em] text-white/75">
            {isSpanish ? "CREATIVIDAD" : "CREATIVE"}
          </p>
        </div>

        <div className="h-px w-16 bg-white/60" />
      </div>

      {/* Disciplinas inferiores a la izquierda */}
      <div className="pointer-events-none absolute bottom-[7%] left-[4%] z-20 hidden flex-col gap-3 xl:flex">
        <div className="space-y-2">
          {creativeDisciplines.map((discipline) => (
            <p
              key={discipline}
              className="text-[9px] font-medium uppercase tracking-[0.32em] text-white/75"
            >
              {discipline}
            </p>
          ))}
        </div>

        <div className="mt-2 h-px w-16 bg-white/60" />
      </div>
    </>
  );
}
