import { profile } from "../../data/profile";
import useTypewriter from "../../hooks/useTypewriter";
import DialogBox from "../ui/DialogBox";
import Portrait from "../ui/Portrait";
import PixelHand from "../ui/PixelHand";
import { useLanguage } from "../../i18n/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  const { shown, done } = useTypewriter(t.intro);

  return (
    <section id="inicio" className="scene hero">
      <div className="hero-inner">
        <p className="hero-kicker">{`{ ${t.role} }`}</p>
        <h1 className="hero-title">{profile.name}</h1>

        <div className="hero-dialog">
          <DialogBox label={profile.short}>
            <p className="dialog-text">
              <span className="lb-sr">{t.intro}</span>
              <span aria-hidden="true">
                {shown}
                {!done && <span className="caret" />}
              </span>
            </p>
            <a className="dialog-next" href="#proyectos" aria-label={t.seeProjects}>
              <PixelHand />
            </a>
          </DialogBox>
          <div className="portrait-box">
            <Portrait />
          </div>
        </div>
      </div>
    </section>
  );
}
