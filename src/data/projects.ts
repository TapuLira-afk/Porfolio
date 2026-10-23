// Proyectos de ejemplo: sustituir por los reales.
export type Endpoint = { method: "GET" | "POST" | "PUT" | "DELETE"; path: string; body?: string };

export type Project = {
  slug: string;
  image?: string;
  endpoints?: Endpoint[];
  name: string;
  level: number;
  tags: string[];
  url: string;
  demo?: string;
};

export const projects: Project[] = [
  // {
  //   slug: "taskquest",
  //   name: "TASKQUEST",
  //   level: 8,
  //   tags: ["React", "TypeScript"],
  //   url: "https://github.com/",
  // },
  // {
  //   slug: "tienda-pixel",
  //   name: "TIENDA PIXEL",
  //   level: 6,
  //   tags: ["PHP", "MySQL"],
  //   url: "https://github.com/",
  // },
  // {
  //   slug: "api-biblioteca",
  //   name: "API BIBLIOTECA",
  //   level: 7,
  //   tags: ["Java", "SQL"],
  //   endpoints: [
  //     { method: "GET", path: "/api/libros" },
  //     { method: "GET", path: "/api/libros/{id}" },
  //     { method: "POST", path: "/api/prestamos", body: '{\n  "libroId": 1,\n  "usuario": "lira"\n}' },
  //     { method: "PUT", path: "/api/prestamos/{id}/devolver" },
  //     { method: "DELETE", path: "/api/prestamos/{id}" },
  //   ],
  //   url: "https://github.com/",
  // },
  {
    slug: "reloj-juicio-final",
    name: "EL RELOJ DEL JUICIO FINAL",
    level: 1,
    tags: ["HTML", "CSS", "JavaScript"],
    url: "https://github.com/TapuLira-afk/El-Reloj-del-Juicio-Final",
    demo: "https://tapulira-afk.github.io/El-Reloj-del-Juicio-Final/",
  },
  {
    slug: "Login",
    name: "Login",
    level: 1,
    tags: ["HTML", "CSS", "JavaScript"],
    url: "https://github.com/TapuLira-afk/Login",
    demo: "https://tapulira-afk.github.io/Login/",
  },
  {
    slug: "Registro Enunciado",
    name: "Registro Enunciado",
    level: 1,
    tags: ["HTML", "CSS", "JavaScript"],
    url: "https://github.com/TapuLira-afk/Registro_Enunciado",
    demo: "https://tapulira-afk.github.io/Registro_Enunciado/",
  },
  {
    slug: "La Armeria RPG",
    name: "La Armeria RPG",
    level: 1,
    tags: ["HTML", "CSS", "JavaScript"],
    url: "https://github.com/TapuLira-afk/armeria",
    demo: "https://tapulira-afk.github.io/armeria/",
  },
];
