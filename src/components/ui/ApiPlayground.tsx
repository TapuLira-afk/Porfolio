import { useState, type FormEvent } from "react";
import { callLibraryApi, type ApiResult } from "../../data/libraryApi";
import type { Endpoint } from "../../data/projects";
import { useLanguage } from "../../i18n/LanguageContext";
import PixelHand from "./PixelHand";

const paramsOf = (path: string) => [...path.matchAll(/\{(\w+)\}/g)].map((m) => m[1]);

export default function ApiPlayground({ endpoints }: { endpoints: Endpoint[] }) {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({ id: "1" });
  const [bodies, setBodies] = useState<Record<number, string>>(() =>
    Object.fromEntries(endpoints.map((e, i) => [i, e.body ?? ""])),
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<(ApiResult & { url: string; method: string }) | null>(null);

  const ep = endpoints[index];
  const params = paramsOf(ep.path);
  const hasBody = ep.method === "POST" || ep.method === "PUT" ? ep.body !== undefined : false;
  const url = ep.path.replace(/\{(\w+)\}/g, (_, k) => values[k] || `{${k}}`);
  const ready = params.every((k) => /^\d+$/.test(values[k] ?? ""));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!ready || loading) return;
    setLoading(true);
    const res = await callLibraryApi(ep.method, url, hasBody ? bodies[index] : "");
    setResult({ ...res, url, method: ep.method });
    setLoading(false);
  };

  const statusClass = result ? (result.status < 300 ? "ok" : result.status < 500 ? "warn" : "err") : "";

  return (
    <div className="project-tech project-endpoints">
      <h2>{`{ ${t.endpoints.title} }`}</h2>
      <ul>
        {endpoints.map((e, i) => (
          <li key={e.method + e.path}>
            <button type="button" className={i === index ? "is-active" : ""} onClick={() => setIndex(i)}>
              <PixelHand />
              <span className={`method method-${e.method.toLowerCase()}`}>{e.method}</span>
              <code>{e.path}</code>
              <p>{t.endpoints.desc[e.path]}</p>
            </button>
          </li>
        ))}
      </ul>

      <form className="playground" onSubmit={submit}>
        <p className="playground-url">
          <span className={`method method-${ep.method.toLowerCase()}`}>{ep.method}</span>
          <code>{url}</code>
        </p>

        {params.map((k) => (
          <label key={k}>
            <span>{k}</span>
            <input
              inputMode="numeric"
              value={values[k] ?? ""}
              onChange={(e) => setValues({ ...values, [k]: e.target.value })}
              aria-invalid={!/^\d+$/.test(values[k] ?? "")}
            />
          </label>
        ))}

        {hasBody && (
          <label>
            <span>{t.playground.body}</span>
            <textarea
              rows={4}
              spellCheck={false}
              value={bodies[index]}
              onChange={(e) => setBodies({ ...bodies, [index]: e.target.value })}
            />
          </label>
        )}

        <button type="submit" className="playground-send" disabled={!ready || loading}>
          <PixelHand /> {loading ? t.playground.sending : t.playground.send}
        </button>
      </form>

      <div className="playground-out" aria-live="polite">
        <h3>{t.playground.response}</h3>
        {result ? (
          <>
            <p className={`playground-status ${statusClass}`}>
              {t.playground.status}: {result.status} · {result.method} {result.url}
            </p>
            <pre>{result.body === null ? "—" : JSON.stringify(result.body, null, 2)}</pre>
          </>
        ) : (
          <p className="playground-empty">{t.playground.empty}</p>
        )}
        <p className="playground-note">{t.playground.simulated}</p>
      </div>
    </div>
  );
}
