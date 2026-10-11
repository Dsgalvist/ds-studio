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

  about: {
    eyebrow: "Sobre el estudio",
    titleFirst: "Mentes diferentes.",
    titleSecond: "Una visión compartida.",
    description:
      "Somos un estudio que combina creatividad audiovisual y desarrollo de software para ayudar a las marcas a comunicar sus ideas y construir experiencias digitales.",

    saraRole: "Creatividad Audiovisual y Multimedia",
    saraDescription:
      "Transformo ideas en piezas visuales con intención. Mi trabajo combina diseño gráfico, producción audiovisual, edición de video, narrativa, movimiento y sonido para comunicar de forma creativa y conectar con las personas.",
    saraEducation:
      "Formación en Lenguaje Audiovisual y Multimedia en la Universidad de La Sabana, con experiencia académica en diseño, storyboards, producción audiovisual y proyectos de sonido.",

    diegoRole: "Desarrollo de Software y Tecnología",
    diegoDescription:
      "Trabajo de la mano con cada cliente para entender las necesidades de su empresa y convertir sus ideas en experiencias digitales claras, intuitivas y orientadas a sus objetivos. Desarrollo sitios web, aplicaciones web y móviles, agentes de IA y soluciones cloud.",
    diegoEducation:
      "Formación en Programación y Diseño Digital en el Colegio Lausana y en Desarrollo de Software en Southern Alberta Institute of Technology (SAIT), Calgary, Canadá.",

    portfolioLabel: "Ver portafolio",

    closing: "Un estudio. De la idea al lanzamiento.",
    cta: "Iniciar un proyecto",
  },

  services: {
    eyebrow: "Servicios",
    heading: "Lo que podemos crear",
    headingAccent: "para tu marca.",
    description:
      "Combinamos desarrollo tecnológico y creatividad audiovisual para convertir ideas en experiencias que conectan con las personas.",

    technology: "Desarrollo y tecnología",
    creative: "Diseño y producción audiovisual",
    selectService: "Seleccionar servicio",
    explore: "Hablemos de tu proyecto",

    services: {
      websites: {
        title: "Sitios web y catálogos",
        description:
          "Haz que las personas conozcan tu negocio, encuentren lo que ofreces y sepan cómo contactarte.",
      },

      applications: {
        title: "Aplicaciones web y móviles",
        description:
          "Convierte tus procesos e ideas en herramientas digitales que faciliten el trabajo de tu equipo y la experiencia de tus clientes.",
      },

      ai: {
        title: "Agentes de IA y automatización",
        description:
          "Automatiza tareas repetitivas, agiliza la atención y crea asistentes inteligentes que apoyen las operaciones de tu negocio.",
      },

      cloud: {
        title: "Cloud e integraciones",
        description:
          "Conecta tus plataformas, servicios y datos para que tus herramientas digitales funcionen juntas de forma eficiente.",
      },

      graphicDesign: {
        title: "Diseño gráfico y comunicación visual",
        description:
          "Dale a tu marca una presencia visual clara y coherente mediante piezas gráficas para medios digitales, campañas y comunicación.",
      },

      audiovisual: {
        title: "Producción audiovisual",
        description:
          "Cuenta la historia de tu marca mediante contenido audiovisual pensado para presentar productos, servicios e ideas.",
      },

      editing: {
        title: "Edición de video y motion graphics",
        description:
          "Transforma material audiovisual en contenido dinámico con edición, animación, ritmo y sonido.",
      },

      storytelling: {
        title: "Narrativa y contenido creativo",
        description:
          "Desarrolla conceptos, guiones visuales y storyboards que ayuden a comunicar mensajes con intención.",
      },
    },
  },

  sections: {
    work: "Proyectos destacados",
    contact: "Inicia un proyecto",
  },
} satisfies DeepTranslationShape<typeof en>;

type DeepTranslationShape<T> = {
  [K in keyof T]: T[K] extends string
    ? string
    : T[K] extends object
      ? DeepTranslationShape<T[K]>
      : T[K];
};

export default es;
