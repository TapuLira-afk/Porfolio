import { useEffect, useState } from "react";
import type { Project, ProjectJson } from "../types/projects";

type State =
    | { status: "loading" }
    | { status: "error"; error: Error }
    | { status: "success"; projects: Project[] };

function slugify(s: string): string {
    return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// Convierte "El-Reloj-del-Juicio-Final" a "El Reloj Del Juicio Final"
function formatName(name: string): string {
    return name
        .replace(/[-_]/g, " ") // Cambia guiones y guiones bajos por espacios
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitaliza
}

function deriveLevel(lenguajes: string[]): number {
    return Math.min(1 + lenguajes.length, 10);
}

export function useProjects(): State {
    const [state, setState] = useState<State>({ status: "loading" });

    useEffect(() => {
        let cancelled = false;

        // 👇 AQUÍ ESTÁ EL CAMBIO 👇
        // Usamos BASE_URL para que funcione en GitHub Pages y en local
        const jsonUrl = `${import.meta.env.BASE_URL}data/projects.json`.replace(/\/\//g, "/");

        fetch(jsonUrl)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json() as Promise<ProjectJson[]>;
            })
            .then((raw) => {
                if (cancelled) return;
                const projects: Project[] = raw
                    .map((p) => ({
                        ...p,
                        slug: slugify(p.name),
                        level: deriveLevel(p.lenguajes),
                        prettyName: formatName(p.name),
                    }))
                    .sort((a, b) => b.level - a.level);

                setState({ status: "success", projects });
            })
            .catch((error: Error) => {
                if (!cancelled) setState({ status: "error", error });
            });

        return () => { cancelled = true; };
    }, []);

    return state;
}