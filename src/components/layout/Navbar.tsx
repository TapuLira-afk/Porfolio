import { skipNextLoader } from "../../hooks/loaderSkip";
import { useEffect, useState } from "react";
import { navItems } from "../../data/nav";
import { profile } from "../../data/profile";
import useActiveSection from "../../hooks/useActiveSection";
import PixelHand from "../ui/PixelHand";
import avatarUrl from "../../assets/github-avatar.jpg";
import { useLanguage } from "../../i18n/LanguageContext";

const ids = navItems.map((n) => n.id);

export default function Navbar() {
  const { t, lang, toggle } = useLanguage();
  const active = useActiveSection(ids);
  const [picked, setPicked] = useState("");

  useEffect(() => {
    setPicked(active);
  }, [active]);

  const marked = picked || active;

  return (
    <header className="topbar">
      <nav className="topbar-inner" aria-label={t.nav.aria}>
        <a className="brand" href="#inicio" onClick={skipNextLoader} aria-label={t.nav.home}>
          lira<span>.</span>
        </a>

        <div className="topbar-links">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={skipNextLoader}
              className={marked === item.id ? "is-active" : ""}
              onMouseEnter={() => setPicked(item.id)}
              onFocus={() => setPicked(item.id)}
            >
              <PixelHand />
              <span>{"{"}</span> {t.navItems[item.id][0]} <span>{"}"}</span>
            </a>
          ))}
        </div>

        <div className="topbar-actions">
          <button type="button" className="lang-btn" onClick={toggle} lang={lang === "es" ? "en" : "es"} title={t.nav.switch}>
            <span className={lang === "es" ? "is-on" : ""}>ES</span>
            <i aria-hidden="true">/</i>
            <span className={lang === "en" ? "is-on" : ""}>EN</span>
            <span className="lb-sr">{`, ${t.nav.switch}`}</span>
          </button>
          <a className="gh-link" href={profile.github} target="_blank" rel="noreferrer" aria-label={t.nav.github}>
            <img src={avatarUrl} alt="" />
          </a>
        </div>
      </nav>

      <div className="mobile-nav">
        {navItems.map((item) => (
          <a key={item.id} href={`#${item.id}`} onClick={skipNextLoader} className={active === item.id ? "is-active" : ""}>
            {"{ "}
            {t.navItems[item.id][1]}
            {" }"}
          </a>
        ))}
      </div>
    </header>
  );
}
