import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <a href="/" className="group flex items-center gap-2.5 transition-transform duration-300 hover:scale-105">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-md shadow-orange-500/20 transition-all group-hover:shadow-lg group-hover:shadow-orange-500/30">
            <span className="text-lg font-bold text-white leading-none">C</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 transition-colors">
            CV Maker <span className="text-orange-500">Pro</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#templates" className="text-sm font-medium text-slate-600 transition-colors duration-200 hover:text-orange-600">
            Templates
          </a>
          <a href="#about" className="text-sm font-medium text-slate-600 transition-colors duration-200 hover:text-orange-600">
            Our Philosophy
          </a>
        </div>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <a
            href="/app"
            className="hidden md:inline-flex group items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md hover:shadow-slate-900/20 active:scale-95"
          >
            Create Your CV
          </a>
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 transition-colors md:hidden"
            aria-label="Toggle Menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileOpen && (
        <div className="absolute left-0 right-0 top-16 border-b border-slate-200/60 bg-white/95 px-6 py-6 shadow-xl backdrop-blur-xl transition-all md:hidden flex flex-col gap-5">
          <a
            href="#templates"
            onClick={() => setIsMobileOpen(false)}
            className="text-base font-semibold text-slate-700 transition-colors hover:text-orange-600"
          >
            Templates
          </a>
          <a
            href="#about"
            onClick={() => setIsMobileOpen(false)}
            className="text-base font-semibold text-slate-700 transition-colors hover:text-orange-600"
          >
            Our Philosophy
          </a>
          <div className="pt-2">
            <a
              href="/app"
              onClick={() => setIsMobileOpen(false)}
              className="flex w-full items-center justify-center rounded-full bg-slate-900 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-slate-800 active:scale-95"
            >
              Create Your CV
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}