import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import es, { type Dict } from "./es";
import en from "./en";

export type Lang = "es" | "en";
const dicts: Record<Lang, Dict> = { es, en };
const KEY = "lira-lang";

type Ctx = { lang: Lang; t: Dict; toggle: () => void };
const LanguageContext = createContext<Ctx>({ lang: "es", t: es, toggle: () => {} });

function initial(): Lang {
  const saved = localStorage.getItem(KEY);
  if (saved === "es" || saved === "en") return saved;
  return navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initial);

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem(KEY, lang);
  }, [lang]);

  const toggle = () => setLang((l) => (l === "es" ? "en" : "es"));
  return <LanguageContext.Provider value={{ lang, t: dicts[lang], toggle }}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
