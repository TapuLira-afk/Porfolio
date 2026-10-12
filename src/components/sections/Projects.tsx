import { projects } from "../../data/projects";
import CharacterCard from "../ui/CharacterCard";
import { useLanguage } from "../../i18n/LanguageContext";

export default function Projects() {
  const { t } = useLanguage();
  return (
    <section id="proyectos" className="scene">
      <div className="shell">
        <h2 className="scene-title">{`{ ${t.projects.title} }`}</h2>
        <div className="cards">
          {projects.map((p) => (
            <CharacterCard key={p.name} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
