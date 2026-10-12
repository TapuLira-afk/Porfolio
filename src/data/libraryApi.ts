// API simulada en memoria para la demo de API BIBLIOTECA (no hay servidor real).
type Book = { id: number; titulo: string; autor: string; disponible: boolean };
type Loan = { id: number; libroId: number; usuario: string; devuelto: boolean };
export type ApiResult = { status: number; body: unknown };

const books: Book[] = [
  { id: 1, titulo: "El Hobbit", autor: "J. R. R. Tolkien", disponible: true },
  { id: 2, titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", disponible: true },
  { id: 3, titulo: "Clean Code", autor: "Robert C. Martin", disponible: false },
  { id: 4, titulo: "Rayuela", autor: "Julio Cortázar", disponible: true },
  { id: 5, titulo: "Dune", autor: "Frank Herbert", disponible: true },
];

const loans: Loan[] = [{ id: 1, libroId: 3, usuario: "marta", devuelto: false }];
let nextLoan = 2;

const handle = (method: string, path: string, rawBody: string): ApiResult => {
  if (method === "GET" && path === "/api/libros") return { status: 200, body: books };

  let m = path.match(/^\/api\/libros\/(\d+)$/);
  if (method === "GET" && m) {
    const book = books.find((b) => b.id === Number(m![1]));
    return book ? { status: 200, body: book } : { status: 404, body: { error: "NOT_FOUND" } };
  }

  if (method === "POST" && path === "/api/prestamos") {
    let data: { libroId?: unknown; usuario?: unknown };
    try {
      data = JSON.parse(rawBody);
    } catch {
      return { status: 400, body: { error: "INVALID_JSON" } };
    }
    const book = books.find((b) => b.id === Number(data.libroId));
    if (!book || typeof data.usuario !== "string" || !data.usuario.trim()) {
      return { status: book ? 400 : 404, body: { error: book ? "MISSING_FIELDS" : "NOT_FOUND" } };
    }
    if (!book.disponible) return { status: 409, body: { error: "ALREADY_LOANED" } };
    book.disponible = false;
    const loan: Loan = { id: nextLoan++, libroId: book.id, usuario: data.usuario.trim(), devuelto: false };
    loans.push(loan);
    return { status: 201, body: loan };
  }

  m = path.match(/^\/api\/prestamos\/(\d+)\/devolver$/);
  if (method === "PUT" && m) {
    const loan = loans.find((l) => l.id === Number(m![1]));
    if (!loan) return { status: 404, body: { error: "NOT_FOUND" } };
    loan.devuelto = true;
    const book = books.find((b) => b.id === loan.libroId);
    if (book) book.disponible = true;
    return { status: 200, body: loan };
  }

  m = path.match(/^\/api\/prestamos\/(\d+)$/);
  if (method === "DELETE" && m) {
    const i = loans.findIndex((l) => l.id === Number(m![1]));
    if (i < 0) return { status: 404, body: { error: "NOT_FOUND" } };
    const [loan] = loans.splice(i, 1);
    const book = books.find((b) => b.id === loan.libroId);
    if (book && !loan.devuelto) book.disponible = true;
    return { status: 204, body: null };
  }

  return { status: 404, body: { error: "NOT_FOUND" } };
};

export function callLibraryApi(method: string, path: string, body: string): Promise<ApiResult> {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(handle(method, path, body)), 250 + Math.random() * 300);
  });
}
