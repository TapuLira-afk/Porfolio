import type { ReactNode } from "react";
import Doodles from "../components/ui/Doodles";
import Navbar from "../components/layout/Navbar";
import Bulb from "../components/sections/Bulb";
import Footer from "../components/layout/Footer";

export default function BaseLayout({ children }: { children: ReactNode }) {
  return (
    <div className="world">
      <div className="night-veil" aria-hidden="true" />
      <Doodles />
      <Bulb />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
