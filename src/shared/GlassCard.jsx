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
              bg-zinc-900/90
              border-zinc-800
              text-white
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
              hover:shadow-2xl
            `
            : ''
        }

        ${className}
      `}
    >
      {/* GLOW OVERLAY */}

      <div
        className="
          absolute
          inset-0
          opacity-0
          hover:opacity-100
          transition-all
          duration-300
          pointer-events-none
          bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.10),transparent_45%)]
        "
      />

      {/* CONTENT */}

      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}