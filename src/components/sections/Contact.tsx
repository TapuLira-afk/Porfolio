import { profile } from "../../data/profile";
import DialogBox from "../ui/DialogBox";
import PixelIcon, { type PixelIconName } from "../ui/PixelIcon";
import PixelHand from "../ui/PixelHand";
import { useLanguage } from "../../i18n/LanguageContext";

const links: { label: string; href: string; icon: PixelIconName }[] = [
  { label: profile.email, href: `mailto:${profile.email}`, icon: "mail" },
  { label: "GitHub", href: profile.github, icon: "github" },
  { label: "GitLab", href: profile.gitlab, icon: "gitlab" },
];

export default function Contact() {
  const { t } = useLanguage();
  return (
    <section id="contacto" className="scene">
      <div className="shell">
        <h2 className="scene-title">{`{ ${t.contact.title} }`}</h2>
        <DialogBox label={profile.short}>
          <p className="dialog-text">{t.contact.text}</p>
          <ul className="menu-list">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} target={l.href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer">
                  <PixelHand />
                  <PixelIcon name={l.icon} />
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </DialogBox>
      </div>
    </section>
  );
}
