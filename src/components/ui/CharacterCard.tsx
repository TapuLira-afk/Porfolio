import type { Project } from "../../types/projects";
import PixelHand from "./PixelHand";
import { useLanguage } from "../../i18n/LanguageContext";

export default function CharacterCard({ project }: { project: Project }) {
  const { t } = useLanguage();

  // Si no hay descripción en GitHub, usamos un texto por defecto
  const description = project.description ?? (t.lang === "es" ? "Sin descripción" : "No description");

  return (
    <a className="char-card" href={`#/proyecto/${project.slug}`}>
      <div className="char-name">{project.prettyName}</div> {/* <-- Nombre automático */}
      <div className="char-lvl">
        <span>LVL. {project.level}</span>
        <span className="char-lvl-bar" />
      </div>
      <p className="char-desc">{description}</p>
      <div className="char-tags">
        {project.lenguajes.map((tag) => (
          <span key={tag}>{`{ ${tag} }`}</span>
        ))}
      </div>
      <div className="char-go">
        <PixelHand /> {t.projects.go}
      </div>
    </a>
  );
}