import GlassCard from '../shared/GlassCard'

export default function ReferenceCard({
  name,
  company,
  phone,
  email,
  darkMode = false,
}) {
  return (
    <GlassCard
      darkMode={darkMode}
      className="
        p-6
      "
    >
      <h3
        className={`
          text-lg
          font-bold
          mb-2

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
          mb-4

          ${
            darkMode
              ? 'text-zinc-300'
              : 'text-zinc-600'
          }
        `}
      >
        {company}
      </p>

      <div className="space-y-2">
        {phone && (
          <p
            className="
              text-sm
              text-blue-500
              font-semibold
            "
          >
            {phone}
          </p>
        )}

        {email && (
          <p
            className={`
              text-sm

              ${
                darkMode
                  ? 'text-zinc-400'
                  : 'text-zinc-500'
              }
            `}
          >
            {email}
          </p>
        )}
      </div>
    </GlassCard>
  )
}