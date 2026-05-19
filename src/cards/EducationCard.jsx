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
        rounded-3xl
        border
        p-5
        transition-all
        duration-300

        ${
          darkMode
            ? `
              bg-zinc-800
              border-zinc-700
            `
            : `
              bg-zinc-50
              border-zinc-100
            `
        }
      `}
    >
      <div
        className="
          flex
          justify-between
          gap-4
          mb-3
        "
      >
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
  )
}