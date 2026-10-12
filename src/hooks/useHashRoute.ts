import { useEffect, useState } from "react";

const read = () => window.location.hash;

export default function useHashRoute() {
  const [hash, setHash] = useState(read);

  useEffect(() => {
    const onChange = () => setHash(read());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  const match = hash.match(/^#\/proyecto\/([\w-]+)$/);
  return { hash, projectSlug: match ? match[1] : null };
}
