import { useLanguage } from "../../i18n/LanguageContext";
import { useProjects } from "../../hooks/useProjects";
import CharacterCard from "../ui/CharacterCard";

export default function Projects() {
  const { t } = useLanguage();
  const state = useProjects();

  if (state.status === "loading") return <section id="proyectos" className="scene"><div className="shell"><p>Cargando…</p></div></section>;
  if (state.status === "error") return <section id="proyectos" className="scene"><div className="shell"><p>Error al cargar.</p></div></section>;

  // Mostramos TODOS los proyectos que devuelve la API
  return (
    <section id="proyectos" className="scene">
      <div className="shell">
        <h2 className="scene-title">{`{ ${t.projects.title} }`}</h2>
        <div className="cards">
          {state.projects.map((p) => (
            <CharacterCard key={p.name} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}