import { useState } from "react";
import { techGroups } from "../../data/technologies";
import TechLogo from "../ui/TechLogo";
import PixelHand from "../ui/PixelHand";
import { useLanguage } from "../../i18n/LanguageContext";

export default function Tech() {
  const { t } = useLanguage();
  const [groupId, setGroupId] = useState(techGroups[0].id);
  const [index, setIndex] = useState(0);

  const group = techGroups.find((g) => g.id === groupId) ?? techGroups[0];
  const current = group.items[index] ?? group.items[0];

  const pickGroup = (id: string) => {
    setGroupId(id);
    setIndex(0);
  };

  return (
    <section id="tecnologias" className="scene">
      <div className="shell">
        <h2 className="scene-title">{`{ ${t.tech.title} }`}</h2>

        <div className="pocket">
          <div className="pocket-box pocket-tabs" role="tablist">
            {techGroups.map((g) => (
              <button
                key={g.id}
                role="tab"
                aria-selected={g.id === groupId}
                className={g.id === groupId ? "is-active" : ""}
                onClick={() => pickGroup(g.id)}
              >
                <PixelHand />
                {t.tech.groups[g.id]}
              </button>
            ))}
          </div>

          <div className="pocket-body">
            <div className="pocket-box pocket-desc">
              <h3>
                <TechLogo name={current.name} className="tech-logo-lg" />
                {current.name}
              </h3>
              <span className={`level level-${current.level}`}>{t.tech.levels[current.level]}</span>
              <p>{t.tech.desc[current.name]}</p>
            </div>

            <ul className="pocket-box pocket-list">
              {group.items.map((item, i) => (
                <li key={item.name}>
                  <button
                    className={i === index ? "is-active" : ""}
                    onClick={() => setIndex(i)}
                    onMouseEnter={() => setIndex(i)}
                  >
                    <PixelHand />
                    <TechLogo name={item.name} />
                    <span>{item.name}</span>
                    <span className={`level level-${item.level}`}>{t.tech.levels[item.level]}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
