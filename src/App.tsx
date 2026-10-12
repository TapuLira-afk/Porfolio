import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { LanguageProvider } from "./i18n/LanguageContext";
import ProjectPage from "./pages/ProjectPage";
import useHashRoute from "./hooks/useHashRoute";
import { consumeLoaderSkip } from "./hooks/loaderSkip";
import Loader from "./components/ui/Loader";
import BaseLayout from "./layouts/BaseLayout";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Tech from "./components/sections/Tech";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";

function Router() {
  const { hash, projectSlug } = useHashRoute();

  useEffect(() => {
    if (projectSlug || hash.length < 2) return;
    document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [projectSlug]);

  return (
    <BaseLayout>
      {projectSlug ? (
        <ProjectPage slug={projectSlug} />
      ) : (
        <>
          <Hero />
          <About />
          <Tech />
          <Projects />
          <Contact />
        </>
      )}
    </BaseLayout>
  );
}

export default function App() {
  const { projectSlug } = useHashRoute();
  const pageKey = projectSlug ?? "home";
  const [shownFor, setShownFor] = useState<string | null>(null);
  const first = shownFor === null;
  useLayoutEffect(() => {
    if (consumeLoaderSkip()) setShownFor(pageKey);
  }, [pageKey]);
  const done = useCallback(() => setShownFor(pageKey), [pageKey]);
  return (
    <LanguageProvider>
      <Router />
      {shownFor !== pageKey && <Loader key={pageKey} minMs={first ? 900 : 600} onDone={done} />}
    </LanguageProvider>
  );
}
