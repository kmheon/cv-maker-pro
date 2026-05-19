import GlassCard from '../shared/GlassCard'
import ProgressBar from '../shared/ProgressBar'

export default function LanguageCard({
  name,
  label,
  level,
}) {
  return (
    <GlassCard
      className="p-4"
    >
      <div
        className="
          flex
          justify-between
          items-center
          mb-3
        "
      >
        <h3
          className="
            text-white
            font-semibold
            text-sm
          "
        >
          {name}
        </h3>

        <span
          className="
            text-xs
            px-2
            py-1
            rounded-full
            bg-blue-500/20
            text-blue-300
            font-bold
          "
        >
          {label}
        </span>
      </div>

      <ProgressBar
        value={level}
      />
    </GlassCard>
  )
}