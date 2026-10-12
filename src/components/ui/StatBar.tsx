import PixelIcon from "./PixelIcon";
import { useLanguage } from "../../i18n/LanguageContext";

type Props = {
  kind: "hp" | "juice";
  value: number;
  max: number;
  label: string;
};

export default function StatBar({ kind, value, max, label }: Props) {
  const { t } = useLanguage();
  return (
    <div className="stat" aria-label={t.about.statAria(label, value, max)}>
      <span className={`stat-icon stat-icon-${kind}`} aria-hidden="true">
        <PixelIcon name={kind === "hp" ? "heart" : "coffee"} />
      </span>
      <span className="stat-track">
        <span className={`stat-fill stat-fill-${kind}`} style={{ width: `${(value / max) * 100}%` }} />
        <span className="stat-text">
          {value}/{max}
        </span>
      </span>
    </div>
  );
}
