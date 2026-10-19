
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  ChevronDown,
  Clapperboard,
  Code2,
  ExternalLink,
  Globe2,
  Layers3,
  Monitor,
  Sparkles,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Locale = "es" | "en";
type Bilingual = { es: string; en: string };

type Project = {
  id: string;
  number: string;
  name: string;
  category: Bilingual;
  image: string;
  url: string | null;
  icon: typeof Globe2;
  accent: string;
  featured?: boolean;
  problem: Bilingual;
  approach: Bilingual;
  solution: Bilingual;
  sara: Bilingual;
  diego: Bilingual;
  technologies: string[];
};

const projects: Project[] = [
  {
    id: "dialac",
    number: "01",
    name: "DIALAC",
    category: {
      es: "Aplicación web / Catálogo digital",
      en: "Web application / Digital catalog",
    },
    image: "/images/projects/dialac.png",
    url: "https://dialac.co",
    icon: Globe2,
    accent: "#A8C9FF",
    featured: true,
    problem: {
      es: "DIALAC necesitaba reunir su catálogo, servicios y solicitudes en una experiencia digital clara, evitando pedidos incompletos y facilitando la comunicación con sus clientes.",
      en: "DIALAC needed to bring its catalog, services, and customer requests together in a clear digital experience, reducing incomplete orders and improving customer communication.",
    },
    approach: {
      es: "Combinamos una presentación visual accesible de sus productos con una experiencia adaptable a celular y computador, organizando el catálogo, los filtros y el recorrido de solicitud.",
      en: "We combined accessible product presentation with a responsive experience, organizing the catalog, filters, and request journey for mobile and desktop.",
    },
    solution: {
      es: "Desarrollamos una aplicación web con catálogo interactivo, filtros, carrito de solicitud, formulario de datos y generación de PDF. También incorporamos accesos de contacto para facilitar la comunicación con DIALAC.",
      en: "We built a web application with an interactive catalog, filters, request cart, customer form, and PDF generation, along with contact options to simplify communication.",
    },
    sara: {
      es: "Dirección y tratamiento visual de imágenes, productos y recursos gráficos para presentar la identidad de DIALAC de manera coherente.",
      en: "Visual direction and image treatment for products and graphic assets, creating a consistent presentation of DIALAC's identity.",
    },
    diego: {
      es: "Desarrollo de la interfaz, navegación, catálogo, filtros, carrito, validación del formulario y servicio de generación de PDF.",
      en: "Development of the interface, navigation, catalog, filters, request cart, form validation, and PDF generation service.",
    },
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "FastAPI",
      "Python",
    ],
  },
  {
    id: "forconcrete",
    number: "02",
    name: "Forconcrete",
    category: {
      es: "Sitio web corporativo",
      en: "Corporate website",
    },
    image: "/images/projects/forconcrete.png",
    url: null,
    icon: Monitor,
    accent: "#B7D7E8",
    problem: {
      es: "Forconcrete necesitaba presentar su negocio en internet con claridad y facilitar que los visitantes encontraran información sobre la empresa.",
      en: "Forconcrete needed a clear online presence that would help visitors find information about the company.",
    },
    approach: {
      es: "Organizamos el contenido y la comunicación visual alrededor de una navegación sencilla, priorizando la lectura, la presentación de la marca y la adaptación a distintos dispositivos.",
      en: "We organized the content and visual communication around simple navigation, prioritizing readability, brand presentation, and responsiveness.",
    },
    solution: {
      es: "Creamos un sitio web corporativo adaptable a celular y computador, con una estructura orientada a presentar la empresa y permitir recorrer su información sin complicaciones.",
      en: "We created a responsive corporate website structured to introduce the company and make its information easy to explore.",
    },
    sara: {
      es: "Trabajo visual enfocado en la presentación de marca, la organización gráfica del contenido y la coherencia de la experiencia.",
      en: "Visual work focused on brand presentation, graphic content organization, and experience consistency.",
    },
    diego: {
      es: "Desarrollo del sitio web, estructura de páginas, navegación y adaptación responsive.",
      en: "Website development, page structure, navigation, and responsive implementation.",
    },
    technologies: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: "tankeco",
    number: "03",
    name: "Tankeco",
    category: {
      es: "Aplicación web",
      en: "Web application",
    },
    image: "/images/projects/tankeco.png",
    url: null,
    icon: Layers3,
    accent: "#D0B2F5",
    problem: {
      es: "El proyecto requería trasladar funcionalidades y procesos a una aplicación web que permitiera interactuar con ellos desde una interfaz digital.",
      en: "The project required bringing features and workflows into an interactive web application.",
    },
    approach: {
      es: "Planteamos una experiencia que conecta la organización visual de la información con el funcionamiento de la aplicación.",
      en: "We approached the experience by connecting the visual organization of information with the application's functionality.",
    },
    solution: {
      es: "Desarrollamos una aplicación web orientada a ofrecer una experiencia interactiva para sus funcionalidades y procesos.",
      en: "We developed a web application designed to provide an interactive experience for its features and workflows.",
    },
    sara: {
      es: "Participación en la presentación visual del proyecto y su comunicación gráfica.",
      en: "Contribution to the project's visual presentation and graphic communication.",
    },
    diego: {
      es: "Desarrollo tecnológico de la aplicación web y su experiencia interactiva.",
      en: "Technical development of the web application and its interactive experience.",
    },
    technologies: [],
  },
];

function CaseStudy({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  const spanish = locale === "es";

  const stages = [
    {
      number: "01",
      label: spanish ? "El problema" : "The challenge",
      text: project.problem[locale],
    },
    {
      number: "02",
      label: spanish ? "Nuestro enfoque" : "Our approach",
      text: project.approach[locale],
    },
    {
      number: "03",
      label: spanish ? "La solución" : "The solution",
      text: project.solution[locale],
    },
  ];

  return (
    <div className="border-t border-white/10 bg-[#0A0F18] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
        {stages.map((stage) => (
          <div key={stage.number} className="relative">
            <div className="mb-4 flex items-center gap-3">
              <span
                className="font-mono text-[11px]"
                style={{ color: project.accent }}
              >
                {stage.number}
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <h4 className="mb-3 text-[17px] font-medium tracking-[-0.03em] text-white">
              {stage.label}
            </h4>

            <p className="text-[12px] leading-[1.9] text-white/60 sm:text-[13px]">
              {stage.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-9 border-t border-white/10 pt-7">
        <div className="mb-5 flex items-center gap-2">
          <Sparkles size={14} className="text-[#B7C9E7]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
            {spanish ? "Detrás del proyecto" : "Behind the project"}
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-10">
          <div className="border-l border-[#D9B4F1]/45 pl-4">
            <div className="mb-3 flex items-center gap-2 text-[#D9B4F1]">
              <Clapperboard size={16} />
              <span className="font-mono text-[10px] uppercase tracking-[0.13em]">
                Sara / Creative
              </span>
            </div>
            <p className="text-[12px] leading-[1.85] text-white/60 sm:text-[13px]">
              {project.sara[locale]}
            </p>
          </div>

          <div className="border-l border-[#9DCBFF]/45 pl-4">
            <div className="mb-3 flex items-center gap-2 text-[#9DCBFF]">
              <Code2 size={16} />
              <span className="font-mono text-[10px] uppercase tracking-[0.13em]">
                Diego / Development
              </span>
            </div>
            <p className="text-[12px] leading-[1.85] text-white/60 sm:text-[13px]">
              {project.diego[locale]}
            </p>
          </div>
        </div>
      </div>

      {project.technologies.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2 border-t border-white/10 pt-6">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-[10px] text-white/55"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectCard({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  const [expanded, setExpanded] = useState(false);
  const spanish = locale === "es";
  const Icon = project.icon;

  return (
    <article className="project-reveal group min-w-0 overflow-hidden rounded-[24px] border border-white/[0.12] bg-[#0D121B] transition-colors duration-500 hover:border-[#B8C9E4]/35">
      {/* VISUAL */}
      <div
        className={`relative overflow-hidden bg-[#101826] ${
          project.featured
            ? "h-[290px] sm:h-[420px] lg:h-[520px]"
            : "h-[250px] sm:h-[340px]"
        }`}
      >
        <Image
          src={project.image}
          alt={`${project.name} project`}
          fill
          sizes={
            project.featured
              ? "(max-width: 1024px) 100vw, 90vw"
              : "(max-width: 768px) 100vw, 45vw"
          }
          className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.035]"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080C13]/70 via-transparent to-[#080C13]/20" />

        <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-[#0B111B]/75 px-4 py-2 font-mono text-[10px] tracking-[0.15em] text-white backdrop-blur-xl sm:left-8 sm:top-8">
          <span className="h-1.5 w-1.5 rounded-full bg-[#B9F6D0]" />
          D/S — {project.number}
        </div>

        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-5 right-5 flex min-h-12 items-center gap-2 rounded-full bg-[#C7FF82] px-5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0B1019] shadow-[0_10px_35px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:bottom-8 sm:right-8"
          >
            {spanish ? "Visitar sitio" : "Visit website"}
            <ArrowUpRight size={16} />
          </a>
        )}
      </div>

      {/* PROJECT INFO */}
      <div className="px-5 pb-6 pt-7 sm:px-8 sm:pb-8 sm:pt-9 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Icon
              size={17}
              strokeWidth={1.5}
              style={{ color: project.accent }}
            />
            <span
              className="font-mono text-[10px] uppercase tracking-[0.16em]"
              style={{ color: project.accent }}
            >
              {project.category[locale]}
            </span>
          </div>

          <span className="font-mono text-[10px] tracking-[0.14em] text-white/35">
            {project.number} / 03
          </span>
        </div>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-5">
          <h3
            className={`font-medium leading-none tracking-[-0.065em] text-white ${
              project.featured
                ? "text-[clamp(3.5rem,8vw,8rem)]"
                : "text-[clamp(2.8rem,5vw,5rem)]"
            }`}
          >
            {project.name}
          </h3>

          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/35">
            Creative × Technology
          </span>
        </div>

        {/* SUMMARY */}
        <p className="mt-5 max-w-3xl text-[13px] leading-[1.85] text-white/60 sm:text-sm">
          {project.solution[locale]}
        </p>

        {/* MINI PROCESS */}
        <div className="mt-8 grid grid-cols-3 gap-3 border-y border-white/10 py-6 sm:gap-6">
          {[
            {
              number: "01",
              title: spanish ? "Problema" : "Challenge",
            },
            {
              number: "02",
              title: spanish ? "Enfoque" : "Approach",
            },
            {
              number: "03",
              title: spanish ? "Solución" : "Solution",
            },
          ].map((item) => (
            <div key={item.number}>
              <span
                className="font-mono text-[10px]"
                style={{ color: project.accent }}
              >
                {item.number}
              </span>
              <p className="mt-2 text-[11px] font-medium text-white/75 sm:text-[13px]">
                {item.title}
              </p>
            </div>
          ))}
        </div>

        {/* BOTTOM ACTIONS */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] text-[#D9B4F1]">
              SARA / CREATIVE
            </span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span className="font-mono text-[10px] text-[#9DCBFF]">
              DIEGO / DEVELOPMENT
            </span>
          </div>

          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            aria-controls={`case-${project.id}`}
            className="group/button flex min-h-12 items-center gap-3 rounded-full border border-white/20 px-5 text-[11px] font-medium uppercase tracking-[0.1em] text-white transition-all duration-300 hover:border-white/60 hover:bg-white/[0.06] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B8D7FF]"
          >
            {expanded
              ? spanish
                ? "Cerrar detalles"
                : "Close details"
              : spanish
                ? "Explorar proyecto"
                : "Explore project"}

            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {!project.url && (
          <div className="mt-5 flex items-center gap-2 font-mono text-[10px] text-white/35">
            <ExternalLink size={13} />
            {spanish
              ? "Enlace público pendiente"
              : "Public link pending"}
          </div>
        )}
      </div>

      {/* EXPANDABLE CASE STUDY */}
      <div
        id={`case-${project.id}`}
        className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <CaseStudy project={project} locale={locale} />
        </div>
      </div>
    </article>
  );
}

export default function ProjectsSection({
  locale,
}: {
  locale: Locale;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      gsap.fromTo(
        ".projects-heading",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-heading",
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.utils
        .toArray<HTMLElement>(".project-reveal")
        .forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 55 },
            {
              opacity: 1,
              y: 0,
              duration: 0.95,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                once: true,
              },
            }
          );
        });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative isolate scroll-mt-20 overflow-hidden bg-[#080B11] px-5 py-20 text-white sm:px-8 lg:px-16 lg:py-28"
    >
      <div className="pointer-events-none absolute left-[-15%] top-[25%] h-[500px] w-[500px] rounded-full bg-[#375A8A]/[0.06] blur-[140px]" />

      <div className="relative mx-auto max-w-[1440px]">
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#AFC5E8]">
            04 / {locale === "es" ? "Proyectos" : "Selected Work"}
          </span>

          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/35">
            D/S STUDIO
          </span>
        </div>

        <div className="projects-heading mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-12">
          <h2 className="max-w-4xl text-[clamp(2.5rem,5vw,5.5rem)] font-medium leading-[1.05] tracking-[-0.06em]">
            {locale === "es"
              ? "Ideas que se convierten en"
              : "Ideas transformed into"}{" "}
            <span className="font-serif italic text-[#B8C9E4]">
              {locale === "es"
                ? "experiencias reales."
                : "real experiences."}
            </span>
          </h2>

          <p className="max-w-md text-sm leading-[1.9] text-white/60 lg:justify-self-end">
            {locale === "es"
              ? "Tres proyectos donde el diseño visual, el desarrollo y la tecnología trabajan juntos para resolver necesidades reales."
              : "Three projects where visual design, development, and technology come together to address real needs."}
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:mt-16 lg:gap-8">
          <ProjectCard project={projects[0]} locale={locale} />

          <div className="grid gap-6 xl:grid-cols-2 lg:gap-8">
            <ProjectCard project={projects[1]} locale={locale} />
            <ProjectCard project={projects[2]} locale={locale} />
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/35">
            03 PROJECTS / D/S STUDIO
          </span>

          <span className="font-mono text-[10px] text-white/35">
            © 2026
          </span>
        </div>
      </div>
    </section>
  );
}
