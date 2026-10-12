import { siGithub, siGitlab, siGmail } from "../../data/techGlyphs";

const make = (path: string) =>
  function BrandIcon() {
    return (
      <svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d={path} />
      </svg>
    );
  };

export const GithubIcon = make(siGithub.path);
export const GitlabIcon = make(siGitlab.path);
export const MailIcon = make(siGmail.path);
