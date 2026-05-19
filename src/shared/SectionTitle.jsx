export default function SectionTitle({
  children,

  darkMode = false,
}) {
  return (
    <div className="mb-6">
      <h2
        className={`
          text-2xl
          font-black
          tracking-tight

          ${
            darkMode
              ? 'text-white'
              : 'text-zinc-900'
          }
        `}
      >
        {children}
      </h2>

      {/* ACCENT */}

      <div
        className="
          mt-3
          w-16
          h-1
          rounded-full
          bg-gradient-to-r
          from-blue-500
          to-blue-400
        "
      />
    </div>
  )
}