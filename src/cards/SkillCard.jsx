import GlassCard from '../shared/GlassCard'

export default function SkillCard({
  name,

  level,

  description,

  icon,

  color = 'blue',

  darkMode = false,
}) {
  /* =========================
     COLOR SYSTEM
  ========================= */

  const colorStyles = {
    blue: {
      icon: `
        bg-gradient-to-br
        from-blue-600
        to-blue-400
      `,

      glow: `
        from-blue-400
        to-blue-600
      `,
    },

    emerald: {
      icon: `
        bg-gradient-to-br
        from-emerald-600
        to-emerald-400
      `,

      glow: `
        from-emerald-400
        to-emerald-600
      `,
    },

    purple: {
      icon: `
        bg-gradient-to-br
        from-purple-600
        to-purple-400
      `,

      glow: `
        from-purple-400
        to-purple-600
      `,
    },

    orange: {
      icon: `
        bg-gradient-to-br
        from-orange-600
        to-orange-400
      `,

      glow: `
        from-orange-400
        to-orange-600
      `,
    },
  }

  const current =
    colorStyles[color] ||
    colorStyles.blue

  return (
    <GlassCard
      darkMode={darkMode}
      className="
        p-4
        relative
        group
      "
    >
      {/* HOVER OVERLAY */}

      <div
        className="
          absolute
          inset-0
          opacity-0
          group-hover:opacity-100
          transition-all
          duration-300
          pointer-events-none
          bg-gradient-to-br
          from-white/5
          to-transparent
        "
      />

      {/* CONTENT */}

      <div
        className="
          relative
          z-10
          flex
          items-center
          gap-4
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
            shadow-xl
            shrink-0

            ${current.icon}
          `}
        >
          {icon}
        </div>

        {/* TEXT */}

        <div className="flex-1">
          <h3
            className={`
              text-sm
              font-bold
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
              text-xs
              leading-5

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
      </div>

      {/* GLOW BAR */}

      <div
        className="
          absolute
          left-0
          bottom-0
          h-1
          rounded-full
          transition-all
          duration-500
        "
        style={{
          width: `${level}%`,
        }}
      >
        <div
          className={`
            h-full
            rounded-full
            bg-gradient-to-r
            shadow-lg

            ${current.glow}
          `}
        />
      </div>
    </GlassCard>
  )
}