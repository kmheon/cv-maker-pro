export default function Tag({
  children,

  darkMode = false,

  className = '',
}) {
  return (
    <span
      className={`
        inline-flex
        items-center
        px-4
        py-2
        rounded-2xl
        text-sm
        font-semibold
        transition-all
        duration-300

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

        ${className}
      `}
    >
      {children}
    </span>
  )
}