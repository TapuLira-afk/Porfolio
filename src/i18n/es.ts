const es = {
  lang: "es",
  nav: { aria: "Navegación principal", home: "lira, ir al inicio", github: "Visitar perfil de GitHub", switch: "cambiar idioma a inglés" },
  navItems: { "sobre-mi": ["sobre mí", "mí"], tecnologias: ["tecnologías", "tecnologías"], proyectos: ["proyectos", "proyectos"], contacto: ["contacto", "contacto"] } as Record<string, [string, string]>,
  role: "Estudiante de DAW2",
  intro:
    "Hola, soy Lira Acedo Gijón, estudiante de segundo de Desarrollo de Aplicaciones Web. Bienvenida a mi pequeño mundo de código.",
  seeProjects: "Ver proyectos",
  about: {
    title: "sobre mí",
    lines: [
      "Estoy en DAW2 y me encanta convertir ideas raras en aplicaciones que funcionan.",
      "Busco prácticas y mi primer proyecto real donde seguir aprendiendo con un buen equipo.",
      // "Fuera del código: videojuegos, pixel art y demasiado café.",
    ],
    motivation: "Motivación",
    coffee: "Café",
    statAria: (label: string, v: number, m: number) => `${label}: ${v} de ${m}`,
    portrait: "Retrato de Lira",
  },
  tech: {
    title: "tecnologías",
    groups: { frontend: "Frontend", backend: "Backend", tools: "Herramientas" } as Record<string, string>,
    levels: { novice: "Novato", advanced: "Avanzado", expert: "Experto" } as Record<string, string>,
    desc: {
      HTML: "El esqueleto de toda página. Semántico y accesible.",
      CSS: "Layouts, animaciones y mucho pixel-art con box-shadow.",
      JavaScript: "La lógica del navegador. Mi primer gran hechizo.",
      TypeScript: "JavaScript con red de seguridad. Menos bugs, más calma.",
      React: "Componentes, estado y hooks. Lo que mueve este portfolio.",
      Java: "Orientación a objetos y aplicaciones robustas.",
      PHP: "Servidores y formularios clásicos de la web.",
      "SQL / MySQL": "Modelar datos y consultarlos sin perderse.",
      Git: "Viajar en el tiempo con commits. Imprescindible.",
      GitHub: "Donde viven mis proyectos y mis experimentos.",
      Figma: "Para dibujar la interfaz antes de picar código.",
    } as Record<string, string>,
  },
  projects: {
    title: "proyectos",
    go: "ver",
    desc: {
      // TASKQUEST: "Gestor de tareas gamificado con niveles y rachas diarias.",
      // "TIENDA PIXEL": "E-commerce de stickers con carrito, pedidos y panel de administración.",
      // "API BIBLIOTECA": "API REST para gestionar préstamos de una biblioteca escolar.",
      "EL RELOJ DEL JUICIO FINAL": "Tu edad en cifras raras, una cuenta atrás y la hora en otras ciudades, hecho con Day.js.",
    } as Record<string, string>,
  },
  detail: { back: "volver", code: "ver código", demo: "ver demo", tech: "tecnologías", image: "Captura de", notFound: "Proyecto no encontrado" },
  playground: {
    send: "enviar",
    sending: "enviando...",
    body: "cuerpo (JSON)",
    response: "respuesta",
    status: "estado",
    empty: "Elige un endpoint, rellena los campos y pulsa enviar.",
    simulated: "API simulada en tu navegador con datos de ejemplo; no hay servidor real.",
  },
  endpoints: {
    title: "endpoints",
    desc: {
      "/api/libros": "Lista el catálogo de libros.",
      "/api/libros/{id}": "Consulta un libro concreto.",
      "/api/prestamos": "Registra un nuevo préstamo.",
      "/api/prestamos/{id}/devolver": "Marca un préstamo como devuelto.",
      "/api/prestamos/{id}": "Cancela un préstamo.",
    } as Record<string, string>,
  },
  contact: { title: "contacto", text: "¿Hablamos? Elige como contactarme." },
  footer: "Desarrolladora Full Stack",
  bulb: { night: "Modo noche activado", day: "Modo día activado" },
};

export type Dict = typeof es;
export default es;
