export default function CertificateCard({
  title,

  darkMode = false,
}) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-3xl
        px-5
        py-5
        border
        text-sm
        font-semibold
        transition-all
        duration-300
        group

        ${
          darkMode
            ? `
              bg-zinc-800
              border-zinc-700
              text-zinc-200
              hover:border-blue-500/40
            `
            : `
              bg-zinc-50
              border-zinc-100
              text-zinc-700
              hover:border-blue-200
            `
        }

        hover:-translate-y-1
        hover:shadow-2xl
      `}
    >
      {/* GLOW */}

      <div
        className="
          absolute
          inset-0
          opacity-0
          group-hover:opacity-100
          transition-all
          duration-300
          bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_45%)]
          pointer-events-none
        "
      />

      {/* ICON */}

      <div
        className="
          absolute
          top-4
          right-4
          text-lg
          opacity-10
          group-hover:opacity-20
          transition-all
          duration-300
        "
      >
        🏆
      </div>

      {/* CONTENT */}

      <div className="relative z-10">
        {title}
      </div>
    </div>
  )
}