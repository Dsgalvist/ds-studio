import Image from "next/image";

export default function HeroPortraits() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* DESKTOP */}
      <div className="absolute inset-y-0 right-0 hidden w-[82%] lg:block">
        <Image
          src="/images/hero/diego-sara.png"
          alt="Diego Galvis y Sara Acosta"
          fill
          priority
          sizes="82vw"
          className="object-cover object-center"
        />
      </div>

      {/* MOBILE */}
      <div className="absolute inset-0 lg:hidden">
        <Image
          src="/images/hero/diego-sara-mobile.png"
          alt="Diego Galvis y Sara Acosta"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Contraste superior para el contenido */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050608]/90 via-[#050608]/35 to-transparent" />
      </div>

      {/* DEGRADADO DESKTOP */}
      <div
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, #050608 0%, rgba(5,6,8,0.96) 12%, rgba(5,6,8,0.70) 23%, rgba(5,6,8,0.15) 40%, transparent 58%)",
        }}
      />

      <div className="absolute inset-0 hidden bg-gradient-to-t from-[#050608]/45 via-transparent to-transparent lg:block" />
    </div>
  );
}