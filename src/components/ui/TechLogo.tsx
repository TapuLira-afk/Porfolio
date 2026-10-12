import { siCss, siFigma, siGit, siGithub, siHtml5, siJavascript, siMysql, siPhp, siReact, siTypescript } from "../../data/techGlyphs";
import type { Glyph } from "../../data/techGlyphs";

const JAVA: Glyph = {
  hex: "F89820",
  path: "M4 10h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-5Zm13 1.5h1.5a2.5 2.5 0 0 1 0 5H17v-2h1.5a.5.5 0 0 0 0-1H17v-2ZM8 2c2 1.6 2 2.6 1 4 1.8-.8 2.4-2.2 1.2-4H8Zm4 .5c1.6 1.4 1.5 2.4.5 3.8 1.6-.7 2.1-2.1 1-3.8H12ZM3 21h15v2H3v-2Z",
};

const LOGOS: Record<string, Glyph> = {
  HTML: siHtml5,
  CSS: siCss,
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  React: siReact,
  Java: JAVA,
  PHP: siPhp,
  "SQL / MySQL": siMysql,
  MySQL: siMysql,
  SQL: siMysql,
  Git: siGit,
  GitHub: siGithub,
  Figma: siFigma,
};

const lightness = (hex: string) => {
  const n = parseInt(hex, 16);
  return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
};

export default function TechLogo({ name, className = "" }: { name: string; className?: string }) {
  const g = LOGOS[name];
  if (!g) return null;
  const color =
    lightness(g.hex) < 0.3 ? "#ffffff" : lightness(g.hex) < 0.55 ? `color-mix(in srgb, #${g.hex} 55%, #fff)` : `#${g.hex}`;
  return (
    <svg className={`tech-logo ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      <path d={g.path} fill={color} />
    </svg>
  );
}
