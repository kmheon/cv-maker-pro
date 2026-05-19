export default function InfoCard({
  label,

  value,

  icon = '•',

  highlight = false,
}) {
  return (
    <div
      className={`
        rounded-2xl
        px-4
        py-3
        transition-all
        duration-300

        ${
          highlight
            ? `
              bg-blue-600
              text-white
            `
            : `
              bg-white/5
              text-white
            `
        }
      `}
    >
      {/* LABEL */}

      <div
        className="
          flex
          items-center
          gap-2
          mb-2
        "
      >
        <span
          className="
            text-xs
            opacity-80
          "
        >
          {icon}
        </span>

        <p
          className="
            text-[11px]
            uppercase
            tracking-wider
            font-semibold
            opacity-80
          "
        >
          {label}
        </p>
      </div>

      {/* VALUE */}

      <p
        className="
          text-sm
          font-semibold
          leading-6
        "
      >
        {value}
      </p>
    </div>
  )
}