import { useEffect } from "react";
import { projects } from "../data/projects";
import { useLanguage } from "../i18n/LanguageContext";
import PixelHand from "../components/ui/PixelHand";
import ApiPlayground from "../components/ui/ApiPlayground";
import TechLogo from "../components/ui/TechLogo";

export default function ProjectPage({ slug }: { slug: string }) {
  const { t } = useLanguage();
  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

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

  return (
    <section className="scene project-page">
      <div className="shell project-shell">
        <a className="project-back" href="#proyectos">
          <PixelHand /> {t.detail.back}
        </a>

        <h1 className="project-title">{project.name}</h1>
        <p className="project-desc">{t.projects.desc[project.name]}</p>

        {!project.endpoints && (
          <figure className="project-frame">
            <div className="project-screen" role="img" aria-label={`${t.detail.image} ${project.name}`}>
              {project.demo ? (
                <iframe src={project.demo} title={project.name} loading="lazy" />
              ) : project.image ? (
                <img src={project.image} alt="" />
              ) : (
                <span>{project.name}</span>
              )}
            </div>
          </figure>
        )}

        {project.endpoints && <ApiPlayground endpoints={project.endpoints} />}

        <div className="project-tech">
          <h2>{`{ ${t.detail.tech} }`}</h2>
          <ul>
            {project.tags.map((tag) => (
              <li key={tag}>
                <TechLogo name={tag} />
                {tag}
              </li>
            ))}
          </ul>
          {project.demo && (
            <a className="project-code" href={project.demo} target="_blank" rel="noreferrer">
              <PixelHand /> {t.detail.demo}
            </a>
          )}
          <a className="project-code" href={project.url} target="_blank" rel="noreferrer">
            <PixelHand /> {t.detail.code}
          </a>
        </div>
      </div>
    </section>
  );
}
