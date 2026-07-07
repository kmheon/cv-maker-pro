export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="text-xl font-black">
          CV Maker <span className="text-orange-600">Pro</span>
        </div>

        <nav className="hidden gap-8 text-sm font-medium md:flex">
          <a href="#">Home</a>
          <a href="#">Templates</a>
          <a href="#">Features</a>
          <a href="#">About</a>
        </nav>

        <button
          className="
          rounded-xl
          bg-orange-600
          px-5
          py-2.5
          font-semibold
          text-white
          transition
          hover:bg-orange-700
        "
        >
          Start Building
        </button>
      </div>
    </header>
  );
}