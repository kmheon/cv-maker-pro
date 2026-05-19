export default function LanguageCard({
  name,

  level,

  levelLabel,

  darkMode = false,
}) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-3xl
        border
        p-4
        transition-all
        duration-300
        group

        ${
          darkMode
            ? `
              bg-zinc-800
              border-zinc-700
              hover:border-blue-500/40
            `
            : `
              bg-zinc-50
              border-zinc-100
              hover:border-blue-200
            `
        }

        hover:-translate-y-1
        hover:shadow-2xl
      `}
    >
      {/* HOVER GLOW */}

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

      {/* HEADER */}

      <div
        className="
          relative
          z-10
          flex
          justify-between
          items-center
          mb-4
        "
      >
        <h3
          className={`
            text-sm
            font-bold

            ${
              darkMode
                ? 'text-white'
                : 'text-zinc-900'
            }
          `}
        >
          {name}
        </h3>

        {/* LEVEL LABEL */}

        <div
          className={`
            px-3
            py-1
            rounded-full
            text-[10px]
            font-bold
            tracking-wide

            ${
              darkMode
                ? `
                  bg-blue-500/15
                  text-blue-300
                `
                : `
                  bg-blue-50
                  text-blue-700
                `
            }
          `}
        >
          {levelLabel}
        </div>
      </div>

      {/* PROGRESS TRACK */}

      <div
        className={`
          relative
          h-3
          rounded-full
          overflow-hidden

          ${
            darkMode
              ? 'bg-zinc-700'
              : 'bg-zinc-200'
          }
        `}
      >
        {/* GLOW */}

        <div
          className="
            absolute
            inset-0
            opacity-30
            blur-sm
            bg-blue-400
          "
          style={{
            width: `${level}%`,
          }}
        />

        {/* BAR */}

        <div
          className="
            relative
            h-full
            rounded-full
            bg-gradient-to-r
            from-blue-500
            to-blue-400
            transition-all
            duration-700
            group-hover:brightness-110
          "
          style={{
            width: `${level}%`,
          }}
        />
      </div>
    </div>
  )
}