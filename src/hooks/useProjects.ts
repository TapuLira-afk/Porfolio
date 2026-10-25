import { useEffect, useState } from "react";
import type { Project, ProjectJson } from "../types/projects";

type State =
    | { status: "loading" }
    | { status: "error"; error: Error }
    | { status: "success"; projects: Project[] };

function slugify(s: string): string {
    return s
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

/**
 * Nivel "RPG" derivado del número de lenguajes del repo.
 * 1 lenguaje → LVL 2, 2 lenguajes → LVL 3, 3 lenguajes → LVL 4...
 * Cap a 10 para que no se dispare en repos con muchos lenguajes.
 */
function deriveLevel(lenguajes: string[]): number {
    return Math.min(1 + lenguajes.length, 10);
}

export function useProjects(): State {
    const [state, setState] = useState<State>({ status: "loading" });

    useEffect(() => {
        let cancelled = false;

        fetch("/data/projects.json")
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
                    }))
                    // Los de mayor nivel primero. Si quieres orden alfabético:
                    // .sort((a, b) => a.name.localeCompare(b.name))
                    .sort((a, b) => b.level - a.level);

                setState({ status: "success", projects });
            })
            .catch((error: Error) => {
                if (!cancelled) setState({ status: "error", error });
            });

        return () => {
            cancelled = true;
        };
    }, []);

    return state;
}