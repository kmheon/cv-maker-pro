export default function ProgressBar({
  value = 0,

  darkMode = false,
}) {
  return (
    <div
      className={`
        w-full
        h-3
        rounded-full
        overflow-hidden
        transition-all
        duration-300

        ${
          darkMode
            ? 'bg-zinc-800'
            : 'bg-zinc-200'
        }
      `}
    >
      <div
        className="
          h-full
          rounded-full
          bg-blue-600
          transition-all
          duration-500
        "
        style={{
          width: `${value}%`,
        }}
      />
    </div>
  )
}