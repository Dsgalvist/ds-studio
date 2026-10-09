
import Image from "next/image";

export default function HeroPortraits() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Fotografía original */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[82%]">
        <Image
          src="/images/hero/diego-sara.png"
          alt="Diego Galvis y Sara Acosta"
          fill
          priority
          sizes="(min-width: 1024px) 82vw, 100vw"
          className="object-cover object-[52%_center] lg:object-center"
        />
      </div>

      {/* Oscurecimiento localizado detrás del texto */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, #050608 0%, rgba(5,6,8,0.96) 12%, rgba(5,6,8,0.70) 23%, rgba(5,6,8,0.15) 40%, transparent 58%)",
        }}
      />

      {/* Oscurecimiento inferior */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050608]/45 via-transparent to-transparent" />
    </div>
  );
}
