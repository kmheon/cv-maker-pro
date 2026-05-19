export default function MainLayout({
  children,
}) {
  return (
    <div
      className="
        grid
        grid-cols-[320px_1fr]
        gap-8
        items-start
      "
    >
      {children}
    </div>
  )
}