import { useEffect, useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import PixelHand from "./PixelHand";

export default function Loader({ onDone, minMs = 900 }: { onDone: () => void; minMs?: number }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const { lang } = useLanguage();
  const es = lang === "es";

  useEffect(() => {
    const start = performance.now();
    let ready = false;
    let raf = 0;

    const loaded = new Promise<void>((res) => {
      if (document.readyState === "complete") res();
      else window.addEventListener("load", () => res(), { once: true });
    });
    Promise.all([loaded, document.fonts.ready]).then(() => {
      const imgs = Array.from(document.images).map((i) => i.decode().catch(() => undefined));
      return Promise.all(imgs);
    }).then(() => {
      ready = true;
    });

    const tick = (now: number) => {
      const elapsed = Math.min((now - start) / minMs, 1);
      const target = ready ? 1 : 0.9;
      setProgress((p) => Math.max(p, Math.min(elapsed, target)));
      if (ready && elapsed >= 1) {
        setLeaving(true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!leaving) return;
    const id = setTimeout(onDone, 400);
    return () => clearTimeout(id);
  }, [leaving, onDone]);

  const pct = Math.round(progress * 100);

  return (
    <div className={`loader ${leaving ? "is-leaving" : ""}`} role="status" aria-live="polite">
      <div className="loader-box dialog">
        <p className="loader-text">
          {es ? "cargando" : "loading"}
          <span className="loader-dots" aria-hidden="true" />
        </p>
        <div
          className="loader-bar"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
        >
          <div className="loader-fill" style={{ width: `${Math.round(pct / 5) * 5}%` }} />
        </div>
        <div className="loader-foot">
          <PixelHand className="loader-hand" />
          <span>{pct}%</span>
        </div>
      </div>
    </div>
  );
}
