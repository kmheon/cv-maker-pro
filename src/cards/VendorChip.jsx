export default function VendorChip({
  children,
}) {
  return (
    <div
      className="
        px-4
        py-2
        rounded-2xl
        text-xs
        font-bold
        tracking-wide
        uppercase
        transition-all
        duration-300
        hover:-translate-y-1
        hover:scale-105
      "
      style={{
        background:
          'rgba(59,130,246,0.12)',

        border:
          '1px solid rgba(96,165,250,0.18)',

        color: '#93c5fd',
      }}
    >
      {children}
    </div>
  )
}