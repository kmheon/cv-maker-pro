import { Github, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Features", href: "#features" },
    { label: "Templates", href: "#templates" },
    { label: "About", href: "#about" },
    { label: "GitHub", href: "https://github.com/kmheon/cv-maker-pro", external: true },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <a
          href="/"
          className="flex items-center gap-3 transition hover:opacity-90"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-600 text-lg font-black text-white shadow-lg shadow-orange-500/25">
            CV
          </div>

          <div className="leading-none">
            <div className="text-lg font-black tracking-tight text-slate-900">
              CV Maker
            </div>

            <div className="inline-flex rounded-full bg-orange-100 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-orange-700">
              PRO
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              className="font-medium text-slate-600 transition hover:text-orange-600"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Side */}

        <div className="flex items-center gap-3">

          <a
            href="https://github.com/kmheon/cv-maker-pro"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-xl border border-slate-200 p-3 transition hover:border-orange-500 hover:text-orange-600 lg:flex"
          >
            <Github size={18} />
          </a>

          <a
            href="/app"
            className="hidden rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/30 transition duration-200 hover:-translate-y-0.5 hover:bg-orange-700 lg:inline-flex"
          >
            Start Building →
          </a>

          {/* Mobile Menu */}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-xl border border-slate-200 p-3 lg:hidden"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="flex flex-col p-6">

            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                className="rounded-xl px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
              >
                {item.label}
              </a>
            ))}

            <a
              href="/app"
              className="mt-4 rounded-xl bg-orange-600 py-3 text-center font-semibold text-white"
            >
              Start Building →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}