export default function GlassCard({
  children,

  className = '',

  darkMode = false,

  hover = true,
}) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-[28px]
        border
        transition-all
        duration-300

        ${
          darkMode
            ? `
              bg-[#0f172a]/95
              border-white/5
              text-white
              shadow-[0_10px_40px_rgba(0,0,0,0.35)]
            `
            : `
              bg-white
              border-zinc-100
              text-black
            `
        }

        ${
          hover
            ? `
              hover:-translate-y-1
              hover:shadow-[0_20px_50px_rgba(0,0,0,0.45)]
            `
            : ''
        }

        ${className}
      `}
    >
      {/* PREMIUM DARK GLOW */}

      <div
        className="
          absolute
          inset-0
          opacity-0
          hover:opacity-100
          transition-all
          duration-300
          pointer-events-none
          bg-[radial-gradient(circle_at_top_right,rgba(96,165,250,0.16),transparent_45%)]
        "
      />

      {/* CONTENT */}

      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}