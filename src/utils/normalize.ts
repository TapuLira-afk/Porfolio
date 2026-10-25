// src/utils/normalize.ts
export function normalizeText(text: string): string {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Quita acentos
        .replace(/[^a-z0-9]/g, "");      // Quita guiones, espacios y símbolos
}