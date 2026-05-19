export default function Tag({
  children,

  darkMode = false,
}) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        px-4
        py-2
        rounded-2xl
        text-xs
        font-bold
        tracking-wide
        transition-all
        duration-300
        cursor-default
        select-none

        ${
          darkMode
            ? `
              bg-zinc-800
              text-zinc-200
              border
              border-zinc-700
            `
            : `
              bg-zinc-100
              text-zinc-700
              border
              border-zinc-200
            `
        }

        hover:-translate-y-1
        hover:scale-105
        hover:shadow-lg
      `}
    >
      {/* GLOW */}

      <div
        className="
          absolute
          inset-0
          opacity-0
          hover:opacity-100
          transition-all
          duration-300
          bg-gradient-to-r
          from-blue-500/10
          to-purple-500/10
          pointer-events-none
        "
      />

      {/* TEXT */}

      <span className="relative z-10">
        {children}
      </span>
    </div>
  )
}