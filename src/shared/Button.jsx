export default function Button({
  children,

  onClick,

  variant = 'primary',

  darkMode = false,

  className = '',
}) {
  const variants = {
    primary: darkMode
      ? `
        bg-blue-600
        hover:bg-blue-700
        text-white
      `
      : `
        bg-zinc-900
        hover:bg-black
        text-white
      `,

    secondary: darkMode
      ? `
        bg-zinc-800
        hover:bg-zinc-700
        text-zinc-100
        border
        border-zinc-700
      `
      : `
        bg-white
        hover:bg-zinc-100
        text-zinc-700
        border
        border-zinc-200
      `,

    danger: `
      bg-red-500
      hover:bg-red-600
      text-white
    `,
  }

  return (
    <button
      onClick={onClick}
      className={`
        px-5
        py-3
        rounded-2xl
        font-semibold
        transition-all
        duration-300

        ${variants[variant]}

        ${className}
      `}
    >
      {children}
    </button>
  )
}