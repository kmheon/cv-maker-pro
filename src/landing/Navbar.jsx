import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const GithubIcon = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { darkMode, setDarkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const sections = ['hero', 'templates', 'about', 'support'];
      const current = [...sections].reverse().find(id => {
        const el = document.getElementById(id);
        if (el) return window.scrollY >= el.offsetTop - 150;
        if (id === 'support' && window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) return true;
        return false;
      }) || 'hero';
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsMobileOpen(false);

    if (targetId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(targetId);
    
    if (!element && targetId === "support") {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
      });
      return;
    }

    if (!element) return;

    const navbarHeight = 80;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  const navigation = [
    { id: "templates", label: "Templates" },
    { id: "about", label: "Our Story" },
    { id: "support", label: "Support" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm border-b border-slate-200/50 dark:border-slate-800/50"
          : "bg-transparent border-b border-slate-900/10 dark:border-slate-800/20"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <a 
          href="#hero" 
          onClick={(e) => handleNavClick(e, "hero")} 
          className={`flex items-center gap-2 font-black text-lg transition-all duration-300 ${
            !isScrolled ? "text-slate-900 dark:text-slate drop-shadow-sm" : "text-slate-900 dark:text-slate-100"
          }`}
        >
          <div className="bg-orange-600 p-2 rounded-xl text-white">C</div>
          CV Maker Pro
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navigation.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleNavClick(e, id)}
              className={`relative py-2 text-sm font-semibold transition-all duration-300 ${
                activeSection === id 
                  ? "text-orange-600 dark:text-orange-500" 
                  : !isScrolled
                    ? "text-slate-900 dark:text-slate hover:text-orange-600 drop-shadow-sm"
                    : "text-slate-900 dark:text-slate-200 hover:text-orange-600"
              }`}
            >
              {label}
              <span className={`absolute bottom-0 left-0 h-0.5 bg-orange-600 transition-all duration-300 ${activeSection === id ? "w-full" : "w-0 hover:w-full"}`} />
            </a>
          ))}
          <a 
            href="https://github.com/kmheon/cv-maker-pro" 
            className={`transition-all duration-300 hover:text-orange-600 ${
              !isScrolled ? "text-slate-900 dark:text-slate-100 drop-shadow-sm" : "text-slate-900 dark:text-slate-200"
            }`}
          >
            <GithubIcon size={20} />
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className={`p-2 transition-all duration-300 hover:text-orange-600 ${
              !isScrolled ? "text-slate-900 dark:text-slate-100 drop-shadow-sm" : "text-slate-900 dark:text-slate-200"
            }`} 
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <a 
            href="/app" 
            className="rounded-full bg-slate-900 dark:bg-white px-6 py-2.5 text-sm font-bold text-white dark:text-slate-900 hover:opacity-90 transition-opacity shadow-sm"
          >
            Create Your CV
          </a>
          <button 
            onClick={() => setIsMobileOpen(!isMobileOpen)} 
            className={`md:hidden transition-all duration-300 ${
              !isScrolled ? "text-slate-900 dark:text-slate-100 drop-shadow-sm" : "text-slate-900 dark:text-white"
            }`} 
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isMobileOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 px-6 py-6 space-y-4">
          {navigation.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleNavClick(e, id)}
              className="block text-base font-semibold text-slate-900 dark:text-white hover:text-orange-600 transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}