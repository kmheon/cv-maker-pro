import Navbar from "./Navbar";
import Hero from "./Hero";
import Story from "./Story";
import Templates from "./Templates";
import TrustBar from "./TrustBar";
import Features from "./Features";
import Footer from "./Footer";
import { useTheme } from "../context/ThemeContext";

export default function LandingPage() {
  const { darkMode } = useTheme();

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
        <Navbar />
        <main>
          <Hero />
          <TrustBar />
          <div id="templates">
            <Templates />
          </div>
          <div id="about">
            <Story />
          </div>
          <Features />
          <footer id="support">
            <Footer />
          </footer>
        </main>
      </div>
    </div>
  );
}