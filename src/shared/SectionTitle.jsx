export default function SectionTitle({
  children,
  darkMode = false,
}) {
  return (
    <h2
      className={`
        text-2xl
        font-bold
        mb-6
        tracking-tight
        transition-all
        duration-300

        ${
          darkMode
            ? 'text-white'
            : 'text-zinc-900'
        }
      `}
    >
      {children}
    </h2>
  )
}