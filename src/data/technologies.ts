export type Level = "novice" | "advanced" | "expert";
export type Tech = { name: string; level: Level };
export type TechGroup = { id: string; items: Tech[] };

export const techGroups: TechGroup[] = [
  {
    id: "frontend",
    items: [
      { name: "HTML", level: "novice" },
      { name: "CSS", level: "novice" },
      { name: "JavaScript", level: "novice" },
      { name: "TypeScript", level: "novice" },
    ],
  },
  {
    id: "backend",
    items: [
      { name: "Java", level: "novice" },
      { name: "SQL / MySQL", level: "novice" },
    ],
  },
  {
    id: "tools",
    items: [
      { name: "Git", level: "novice" },
      { name: "GitHub", level: "novice" },
      { name: "Figma", level: "novice" },
    ],
  },
];
