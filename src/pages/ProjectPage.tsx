import { useEffect } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { useProjects } from "../hooks/useProjects";
import PixelHand from "../components/ui/PixelHand";
import TechLogo from "../components/ui/TechLogo";

export default function ProjectPage({ slug }: { slug: string }) {
  const { t } = useLanguage();
  const state = useProjects();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (state.status === "loading") return <p>Cargando…</p>;

  const project = state.status === "success" ? state.projects.find((p) => p.slug === slug) : undefined;

  if (!project) {
    return (
      <section className="scene project-page">
        <div className="shell project-shell">
          <a className="project-back" href="#proyectos"><PixelHand /> {t.detail.back}</a>
          <h1 className="project-title">{t.detail.notFound}</h1>
        </div>
      </section>
    );
  }

  const description = project.description ?? (t.lang === "es" ? "Sin descripción" : "No description");

  return (
    <section className="scene project-page">
      <div className="shell project-shell">
        <a className="project-back" href="#proyectos"><PixelHand /> {t.detail.back}</a>

        <h1 className="project-title">{project.prettyName}</h1>
        <p className="project-desc">{description}</p>

        <figure className="project-frame">
          {/* Cambiamos el role a "region" porque es un iframe, no una imagen */}
          <div className="project-screen" role="region" aria-label={`Demo de ${project.prettyName}`}>

            {/* 👇 AQUÍ ESTÁ EL IFRAME INTEGRADO 👇 */}
            {project.enlacePage ? (
              <iframe
                src={project.enlacePage}
                title={project.prettyName}
                loading="lazy"
                style={{ width: '100%', height: '100%', border: 'none' }}
              />
            ) : (
              <span>Demo no disponible</span>
            )}

          </div>
        </figure>

        <div className="project-tech">
          <h2>{`{ ${t.detail.tech} }`}</h2>
          <ul>
            {project.lenguajes.map((tag) => (
              <li key={tag}><TechLogo name={tag} />{tag}</li>
            ))}
          </ul>
          {project.enlacePage && (
            <a className="project-code" href={project.enlacePage} target="_blank" rel="noreferrer">
              <PixelHand /> {t.detail.demo}
            </a>
          )}
          <a className="project-code" href={project.enlaceDemo} target="_blank" rel="noreferrer">
            <PixelHand /> {t.detail.code}
          </a>
        </div>
      </div>
    </section>
  );
}