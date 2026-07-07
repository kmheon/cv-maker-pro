import { useState } from 'react'
import { APP_VERSION, CHANGELOG } from '../version'

const SEEN_KEY = 'cv-maker-last-seen-version'

export function useWhatsNew() {
  const [open, setOpen] = useState(() => {
    const lastSeen = localStorage.getItem(SEEN_KEY)
    return lastSeen !== APP_VERSION
  })

  const close = () => {
    localStorage.setItem(SEEN_KEY, APP_VERSION)
    setOpen(false)
  }

  const openManually = () => setOpen(true)

  return { open, close, openManually }
}

export default function WhatsNewModal({ open, onClose }) {
  if (!open) return null

  return (
    <div
      onClick={onClose}
      className="
        fixed inset-0 z-[200]
        bg-black/50
        flex items-center justify-center
        p-4
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full max-w-md
          max-h-[80vh]
          overflow-y-auto
          rounded-3xl
          bg-white
          p-7
          shadow-2xl
        "
      >
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-2xl font-black text-zinc-900">
            What's New
          </h2>

          <span
            className="
              px-3 py-1
              rounded-full
              bg-blue-100
              text-blue-700
              text-xs
              font-bold
            "
          >
            v{APP_VERSION}
          </span>
        </div>

        <p className="text-sm text-zinc-500 mb-6">
          Here's what's changed recently.
        </p>

        <div className="space-y-6">
          {CHANGELOG.map((entry) => (
            <div key={entry.version}>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-zinc-900">
                  v{entry.version}
                </span>
                <span className="text-xs text-zinc-400">
                  {entry.date}
                </span>
              </div>

              <ul className="space-y-1.5">
                {entry.highlights.map((item, i) => (
                  <li
                    key={i}
                    className="text-sm text-zinc-600 leading-6 flex gap-2"
                  >
                    <span className="text-blue-500">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="
            w-full mt-7 p-3
            rounded-2xl
            bg-blue-600
            text-white
            font-semibold
            hover:bg-blue-700
            transition-all
          "
        >
          Got it
        </button>
      </div>
    </div>
  )
}
