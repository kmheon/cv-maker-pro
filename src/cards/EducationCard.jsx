export default function EducationCard({
  degree,

  institute,

  duration,

  result,

  darkMode = false,
}) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-3xl
        border
        p-6
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
      {/* LEFT ACCENT */}

      <div
        className="
          absolute
          left-0
          top-0
          bottom-0
          w-1
          rounded-full
          bg-gradient-to-b
          from-blue-400
          to-blue-600
        "
      />

      {/* HOVER GLOW */}

      <div
        className="
          absolute
          inset-0
          opacity-0
          group-hover:opacity-100
          transition-all
          duration-300
          bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_40%)]
          pointer-events-none
        "
      />

      {/* DECORATION */}

      <div
        className="
          absolute
          top-5
          right-5
          text-xl
          opacity-10
          group-hover:opacity-20
          transition-all
          duration-300
        "
      >
        🎓
      </div>

      {/* CONTENT */}

      <div className="relative z-10">
        <div
          className="
            flex
            justify-between
            gap-4
            mb-4
          "
        >
          {/* TEXT */}

          <div>
            <h3
              className={`
                text-lg
                font-bold
                mb-1

                ${
                  darkMode
                    ? 'text-white'
                    : 'text-zinc-900'
                }
              `}
            >
              {degree}
            </h3>

            <p
              className={`
                text-sm

                ${
                  darkMode
                    ? 'text-zinc-300'
                    : 'text-zinc-600'
                }
              `}
            >
              {institute}
            </p>
          </div>

          {/* RESULT */}

          {result && (
            <div
              className={`
                h-fit
                px-4
                py-2
                rounded-2xl
                text-xs
                font-bold
                whitespace-nowrap

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
              {result}
            </div>
          )}
        </div>

        {/* DURATION */}

        <p
          className={`
            text-xs
            font-medium

            ${
              darkMode
                ? 'text-zinc-500'
                : 'text-zinc-500'
            }
          `}
        >
          {duration}
        </p>
      </div>
    </div>
  )
}