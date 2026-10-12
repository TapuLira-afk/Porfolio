import { profile } from "../../data/profile";
import DialogBox from "../ui/DialogBox";
import StatBar from "../ui/StatBar";
import PixelIcon from "../ui/PixelIcon";
import Portrait from "../ui/Portrait";
import { useLanguage } from "../../i18n/LanguageContext";

export default function About() {
  const { t } = useLanguage();
  return (
    <section id="sobre-mi" className="scene">
      <div className="shell">
        <h2 className="scene-title">{`{ ${t.about.title} }`}</h2>

        <div className="room">
          <div className="room-wall" aria-hidden="true" />
          <div className="room-floor">
            <div className="about-grid">
              <DialogBox label={profile.short}>
                {t.about.lines.map((line) => (
                  <p className="dialog-text" key={line}>
                    {line}
                  </p>
                ))}
              </DialogBox>

              <div className="party-card">
                <div className="party-portrait">
                  <Portrait label={t.about.portrait} />
                </div>
                <div className="party-name">LIRA</div>
                <div className="char-lvl">
                  <span>LVL. DAW2</span>
                  <span className="char-lvl-bar" />
                </div>
                <StatBar kind="hp" value={99} max={99} label={t.about.motivation} />
                <StatBar kind="juice" value={37} max={50} label={t.about.coffee} />
                <p className="party-legend">
                  <span className="legend-item legend-hp">
                    <PixelIcon name="heart" />
                    {t.about.motivation}
                  </span>
                  <span className="legend-item legend-juice">
                    <PixelIcon name="coffee" />
                    {t.about.coffee}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
