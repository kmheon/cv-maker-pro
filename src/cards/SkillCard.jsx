import GlassCard from '../shared/GlassCard'

import ProgressBar from '../shared/ProgressBar'

export default function SkillCard({
  name,

  level,

  description,

  icon,

  color = 'blue',

  darkMode = false,
}) {
  const colorStyles = {
    blue: `
      bg-blue-500/15
      text-blue-400
    `,

    emerald: `
      bg-emerald-500/15
      text-emerald-400
    `,

    purple: `
      bg-purple-500/15
      text-purple-400
    `,

    orange: `
      bg-orange-500/15
      text-orange-400
    `,
  }

  return (
    <GlassCard
      darkMode={darkMode}
      className="
        p-5
      "
    >
      <div
        className="
          flex
          gap-4
          items-start
        "
      >
        {/* ICON */}

        <div
          className={`
            w-14
            h-14
            rounded-2xl
            flex
            items-center
            justify-center
            text-2xl
            shrink-0

            ${colorStyles[color]}
          `}
        >
          {icon}
        </div>

        {/* CONTENT */}

        <div className="flex-1">
          <div
            className="
              flex
              justify-between
              items-start
              gap-3
              mb-3
            "
          >
            <div>
              <h3
                className={`
                  font-bold
                  text-base
                  mb-1

                  ${
                    darkMode
                      ? 'text-white'
                      : 'text-zinc-900'
                  }
                `}
              >
                {name}
              </h3>

              <p
                className={`
                  text-sm
                  leading-6

                  ${
                    darkMode
                      ? 'text-zinc-400'
                      : 'text-zinc-500'
                  }
                `}
              >
                {description}
              </p>
            </div>

            <span
              className={`
                text-sm
                font-semibold

                ${
                  darkMode
                    ? 'text-zinc-400'
                    : 'text-zinc-500'
                }
              `}
            >
              {level}%
            </span>
          </div>

          <ProgressBar
            value={level}
            darkMode={darkMode}
          />
        </div>
      </div>
    </GlassCard>
  )
}