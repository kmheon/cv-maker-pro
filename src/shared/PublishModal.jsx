import { useState } from 'react'
import {
  publishCv,
  updatePublishedCv,
} from '../utils/api'

const PUBLISH_KEY = 'cv-maker-published'

function getPublishedRecord() {
  try {
    const saved = localStorage.getItem(PUBLISH_KEY)
    return saved ? JSON.parse(saved) : null
  } catch {
    return null
  }
}

function savePublishedRecord(record) {
  localStorage.setItem(PUBLISH_KEY, JSON.stringify(record))
}

export default function PublishModal({
  open,
  onClose,
  cvData,
  selectedTemplate,
  darkMode,
}) {
  const [status, setStatus] = useState('idle') // idle | loading | done | error
  const [link, setLink] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [copied, setCopied] = useState(false)

  if (!open) return null

  const existing = getPublishedRecord()

  const handlePublish = async () => {
    setStatus('loading')
    setErrorMsg('')

    try {
      if (existing) {
        await updatePublishedCv(existing.id, existing.editToken, {
          cvData,
          selectedTemplate,
          darkMode,
        })
        setLink(`${window.location.origin}/cv/${existing.id}`)
      } else {
        const { id, editToken } = await publishCv({
          cvData,
          selectedTemplate,
          darkMode,
        })
        savePublishedRecord({ id, editToken })
        setLink(`${window.location.origin}/cv/${id}`)
      }
      setStatus('done')
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong')
      setStatus('error')
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API unavailable — user can still select and copy manually.
    }
  }

  return (
    <div
      onClick={onClose}
      className="
        fixed inset-0 z-[300]
        bg-black/50
        flex items-center justify-center
        p-4
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full max-w-md
          rounded-3xl
          bg-white
          p-7
          shadow-2xl
        "
      >
        <h2 className="text-2xl font-black text-zinc-900 mb-1">
          {existing ? 'Update Published CV' : 'Publish Online'}
        </h2>

        <p className="text-sm text-zinc-500 mb-6">
          {existing
            ? "You've already published a CV — this will update it in place, keeping the same link."
            : 'Get a shareable link to your CV that anyone can view online. No account needed.'}
        </p>

        {status === 'done' ? (
          <>
            <div
              className="
                p-4 rounded-2xl
                bg-emerald-50
                border border-emerald-200
                mb-5
              "
            >
              <p className="text-xs font-bold text-emerald-700 mb-2">
                Your CV is live at:
              </p>
              <div className="flex gap-2">
                <input
                  readOnly
                  value={link}
                  onFocus={(e) => e.target.select()}
                  className="
                    flex-1
                    p-2.5
                    rounded-xl
                    border border-emerald-200
                    bg-white
                    text-sm
                    text-emerald-800
                  "
                />
                <button
                  onClick={handleCopy}
                  className="
                    px-4
                    rounded-xl
                    bg-emerald-600
                    text-white
                    text-sm
                    font-semibold
                    hover:bg-emerald-700
                    transition-all
                  "
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            <button
              onClick={onClose}
              className="
                w-full p-3
                rounded-2xl
                bg-zinc-100
                text-zinc-700
                font-semibold
                hover:bg-zinc-200
                transition-all
              "
            >
              Close
            </button>
          </>
        ) : (
          <>
            {status === 'error' && (
              <div
                className="
                  p-3 mb-4
                  rounded-xl
                  bg-red-50
                  border border-red-200
                  text-sm text-red-700
                "
              >
                {errorMsg}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="
                  flex-1 p-3
                  rounded-2xl
                  bg-zinc-100
                  text-zinc-700
                  font-semibold
                  hover:bg-zinc-200
                  transition-all
                "
              >
                Cancel
              </button>

              <button
                onClick={handlePublish}
                disabled={status === 'loading'}
                className="
                  flex-1 p-3
                  rounded-2xl
                  bg-blue-600
                  text-white
                  font-semibold
                  hover:bg-blue-700
                  transition-all
                  disabled:opacity-60
                "
              >
                {status === 'loading'
                  ? 'Publishing…'
                  : existing
                  ? 'Update'
                  : 'Publish'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
