import type { Dict } from "./es";

const en: Dict = {
  lang: "en",
  nav: { aria: "Main navigation", home: "lira, go to top", github: "Visit GitHub profile", switch: "cambiar idioma a español" },
  navItems: { "sobre-mi": ["about me", "me"], tecnologias: ["technologies", "tech"], proyectos: ["projects", "projects"], contacto: ["contact", "contact"] },
  role: "DAW2 student",
  intro:
    "Hi, I'm Lira Acedo Gijón, a second-year Web Application Development student. Welcome to my little world of code.",
  seeProjects: "See projects",
  about: {
    title: "about me",
    lines: [
      "I'm in DAW2 and I love turning weird ideas into apps that actually work.",
      "I'm looking for an internship and my first real project, to keep learning with a great team.",
    ],
    motivation: "Motivation",
    coffee: "Coffee",
    statAria: (label, v, m) => `${label}: ${v} of ${m}`,
    portrait: "Portrait of Lira",
  },
  tech: {
    title: "technologies",
    groups: { frontend: "Frontend", backend: "Backend", tools: "Tools" },
    levels: { novice: "Novice", advanced: "Advanced", expert: "Expert" },
    desc: {
      HTML: "The skeleton of every page. Semantic and accessible.",
      CSS: "Layouts, animations and lots of box-shadow pixel art.",
      JavaScript: "The browser's logic. My first big spell.",
      TypeScript: "JavaScript with a safety net. Fewer bugs, more calm.",
      React: "Components, state and hooks. What powers this portfolio.",
      Java: "Object orientation and robust applications.",
      PHP: "Servers and the web's classic forms.",
      "SQL / MySQL": "Model data and query it without getting lost.",
      Git: "Time travel with commits. Essential.",
      GitHub: "Where my projects and experiments live.",
      Figma: "To draw the interface before writing code.",
    },
  },
  projects: {
    title: "projects",
    go: "view",
    desc: {
      // TASKQUEST: "Gamified task manager with levels and daily streaks.",
      // "TIENDA PIXEL": "Sticker e-commerce with cart, orders and an admin panel.",
      "EL RELOJ DEL JUICIO FINAL": "Your age in weird numbers, a countdown and the time in other cities, built with Day.js.",
      "Login": "Login logic in JavaScript with validation, accessible errors and show/hide password."
      // "API BIBLIOTECA": "REST API to manage loans for a school library.",
    },
  },
  detail: { back: "back", code: "view code", demo: "live demo", tech: "technologies", image: "Screenshot of", notFound: "Project not found" },
  playground: {
    send: "send",
    sending: "sending...",
    body: "body (JSON)",
    response: "response",
    status: "status",
    empty: "Pick an endpoint, fill in the fields and hit send.",
    simulated: "API simulated in your browser with sample data; there is no real server.",
  },
  endpoints: {
    title: "endpoints",
    desc: {
      "/api/libros": "Lists the book catalogue.",
      "/api/libros/{id}": "Fetches a single book.",
      "/api/prestamos": "Registers a new loan.",
      "/api/prestamos/{id}/devolver": "Marks a loan as returned.",
      "/api/prestamos/{id}": "Cancels a loan.",
    },
  },
  contact: { title: "contact", text: "Want to talk? Choose how you'd like to contact me." },
  footer: "made with pixels",
  bulb: { night: "Night mode on", day: "Day mode on" },
};

export default en;
