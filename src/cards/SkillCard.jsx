export default function SkillCard({
  name,

  level,

  icon,

  description,

  darkMode = false,
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
        p-5
        group

        ${
          darkMode
            ? `
              bg-[#111c31]
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

        hover:-translate-y-1
        hover:shadow-[0_20px_50px_rgba(0,0,0,0.45)]
      `}
    >
      {/* PREMIUM HOVER GLOW */}

      <div
        className="
          absolute
          inset-0
          opacity-0
          group-hover:opacity-100
          transition-all
          duration-300
          pointer-events-none
          bg-[radial-gradient(circle_at_top_right,rgba(96,165,250,0.16),transparent_45%)]
        "
      />

      {/* CONTENT */}

      <div className="relative z-10">
        {/* HEADER */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-4
            mb-4
          "
        >
          {/* LEFT */}

          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            {/* ICON */}

            {icon && (
              <div
                className="
                  text-2xl
                "
              >
                {icon}
              </div>
            )}

            {/* TEXT */}

            <div>
              <h3
                className={`
                  text-lg
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

              {/* DESCRIPTION */}

              {description && (
                <p
                  className={`
                    text-sm
                    mt-1
                    leading-6

                    ${
                      darkMode
                        ? 'text-zinc-300'
                        : 'text-zinc-500'
                    }
                  `}
                >
                  {description}
                </p>
              )}
            </div>
          </div>

          {/* LEVEL */}

          <div
            className={`
              px-3
              py-1
              rounded-full
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
            {level}%
          </div>
        </div>

        {/* PROGRESS BAR */}

        <div
          className={`
            relative
            h-3
            rounded-full
            overflow-hidden

            ${
              darkMode
                ? 'bg-[#0b1220]'
                : 'bg-zinc-200'
            }
          `}
        >
          {/* GLOW */}

          <div
            className="
              absolute
              inset-y-0
              left-0
              opacity-40
              blur-md
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
            "
            style={{
              width: `${level}%`,
            }}
          />
        </div>
      </div>
    </div>
  )
}