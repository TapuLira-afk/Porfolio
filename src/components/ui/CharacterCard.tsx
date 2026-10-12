import type { Project } from "../../data/projects";
import PixelHand from "./PixelHand";
import { useLanguage } from "../../i18n/LanguageContext";

export default function CharacterCard({ project }: { project: Project }) {
  const { t } = useLanguage();
  return (
    <a className="char-card" href={`#/proyecto/${project.slug}`}>
      <div className="char-name">{project.name}</div>
      <div className="char-lvl">
        <span>LVL. {project.level}</span>
        <span className="char-lvl-bar" />
      </div>
      <p className="char-desc">{t.projects.desc[project.name]}</p>
      <div className="char-tags">
        {project.tags.map((tag) => (
          <span key={tag}>{`{ ${tag} }`}</span>
        ))}
      </div>
      <div className="char-go">
        <PixelHand /> {t.projects.go}
      </div>
    </a>
  );
}
