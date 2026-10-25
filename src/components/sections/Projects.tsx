import { useLanguage } from "../../i18n/LanguageContext";
import { useProjects } from "../../hooks/useProjects";
import CharacterCard from "../ui/CharacterCard";

export default function Projects() {
  const { t } = useLanguage();
  const state = useProjects();

  if (state.status === "loading") {
    return (
      <section id="proyectos" className="scene">
        <div className="shell">
          <h2 className="scene-title">{`{ ${t.projects.title} }`}</h2>
          <p>{t.lang === "es" ? "Cargando…" : "Loading…"}</p>
        </div>
      </section>
    );
  }

  if (state.status === "error") {
    return (
      <section id="proyectos" className="scene">
        <div className="shell">
          <h2 className="scene-title">{`{ ${t.projects.title} }`}</h2>
          <p>
            {t.lang === "es"
              ? "No se pudieron cargar los proyectos."
              : "Couldn't load projects."}
          </p>
        </div>
      </section>
    );
  }

  const visible = state.projects.filter((p) => p.name in t.projects.desc);

  return (
    <section id="proyectos" className="scene">
      <div className="shell">
        <h2 className="scene-title">{`{ ${t.projects.title} }`}</h2>
        <div className="cards">
          {visible.map((p) => (
            <CharacterCard key={p.name} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}