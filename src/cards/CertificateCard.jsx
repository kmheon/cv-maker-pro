export default function CertificateCard({
  title,

  darkMode = false,
}) {
  return (
    <div
      className={`
        rounded-2xl
        px-5
        py-4
        border
        text-sm
        font-semibold
        transition-all
        duration-300

        ${
          darkMode
            ? `
              bg-zinc-800
              border-zinc-700
              text-zinc-200
            `
            : `
              bg-zinc-50
              border-zinc-100
              text-zinc-700
            `
        }
      `}
    >
      {title}
    </div>
  )
}