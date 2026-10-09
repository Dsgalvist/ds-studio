import type en from "./en";

const es = {
  nav: {
    work: "Proyectos",
    services: "Servicios",
    about: "Nosotros",
    contact: "Contacto",
    portal: "Portal de clientes",
  },
  hero: {
    eyebrow: "Estudio independiente de creatividad y tecnología",
    titleFirst: "Dos mentes.",
    titleSecond: "Una experiencia.",
    descriptionFirst: "Diseñamos lo que las personas ven.",
    descriptionSecond: "Desarrollamos lo que hace que funcione.",
    explore: "Explorar proyectos",
    start: "Iniciar un proyecto",
    scroll: "Desliza",
    imageAlt: "Diego Galvis y Sara Acosta",
  },
  sections: {
    work: "Proyectos destacados",
    contact: "Inicia un proyecto",
  },
} satisfies {
  [K in keyof typeof en]: {
    [P in keyof (typeof en)[K]]: string;
  };
};

export default es;
