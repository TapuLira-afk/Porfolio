import { profile } from "../../data/profile";
import { useLanguage } from "../../i18n/LanguageContext";
import { GithubIcon, GitlabIcon, MailIcon } from "../ui/Icons";

const socials = [
  { label: "Email", href: `mailto:${profile.email}`, Icon: MailIcon },
  { label: "GitHub", href: profile.github, Icon: GithubIcon },
  { label: "GitLab", href: profile.gitlab, Icon: GitlabIcon },
];

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="footer">
      <div className="footer-box">
        <ul className="footer-links">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                aria-label={s.label}
                title={s.label}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
              >
                <s.Icon />
              </a>
            </li>
          ))}
        </ul>
        <p>
          © {new Date().getFullYear()} {profile.name} · {t.footer}
        </p>
      </div>
    </footer>
  );
}
