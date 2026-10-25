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

  if (state.status === "loading") {
    return (
      <section className="scene project-page">
        <div className="shell project-shell">
          <a className="project-back" href="#proyectos">
            <PixelHand /> {t.detail.back}
          </a>
          <p>{t.lang === "es" ? "Cargando…" : "Loading…"}</p>
        </div>
      </section>
    );
  }

  const project =
    state.status === "success"
      ? state.projects.find((p) => p.slug === slug)
      : undefined;

  if (!project) {
    return (
      <section className="scene project-page">
        <div className="shell project-shell">
          <a className="project-back" href="#proyectos">
            <PixelHand /> {t.detail.back}
          </a>
          <h1 className="project-title">{t.detail.notFound}</h1>
        </div>
      </section>
    );
  }

  const description =
    t.projects.desc[project.name] ?? project.description ?? "";

  return (
    <section className="scene project-page">
      <div className="shell project-shell">
        <a className="project-back" href="#proyectos">
          <PixelHand /> {t.detail.back}
        </a>

        <h1 className="project-title">{project.name}</h1>
        <p className="project-desc">{description}</p>

        <figure className="project-frame">
          <div
            className="project-screen"
            role="img"
            aria-label={`${t.detail.image} ${project.name}`}
          >
            {project.imagen ? (
              <img src={project.imagen} alt={project.name} loading="lazy" />
            ) : (
              <span>{project.name}</span>
            )}
          </div>
        </figure>

        <div className="project-tech">
          <h2>{`{ ${t.detail.tech} }`}</h2>
          <ul>
            {project.lenguajes.map((tag) => (
              <li key={tag}>
                <TechLogo name={tag} />
                {tag}
              </li>
            ))}
          </ul>
          {project.enlacePage && (
            <a
              className="project-code"
              href={project.enlacePage}
              target="_blank"
              rel="noreferrer"
            >
              <PixelHand /> {t.detail.demo}
            </a>
          )}
          <a
            className="project-code"
            href={project.enlaceDemo}
            target="_blank"
            rel="noreferrer"
          >
            <PixelHand /> {t.detail.code}
          </a>
        </div>
      </div>
    </section>
  );
}