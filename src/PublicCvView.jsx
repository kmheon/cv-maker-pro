import { useEffect, useState } from 'react'
import templates from './templates'
import { fetchPublishedCv } from './utils/api'

export default function PublicCvView({ id }) {
  const [record, setRecord] = useState(null)
  const [darkMode, setDarkMode] = useState(false)
  const [status, setStatus] = useState('loading') // loading | ready | error

  useEffect(() => {
    fetchPublishedCv(id)
      .then((data) => {
        setRecord(data)
        setDarkMode(!!data.darkMode)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [id])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-100 text-zinc-500">
        Loading CV…
      </div>
    )
  }

  if (status === 'error' || !record) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-100 text-center px-6">
        <h1 className="text-2xl font-black text-zinc-900 mb-2">
          CV not found
        </h1>
        <p className="text-zinc-500 max-w-sm">
          This link may be broken, or the CV may have been removed.
        </p>
      </div>
    )
  }

  const ActiveTemplate =
    templates[record.selectedTemplate]?.component ||
    templates.modernGlass.component

  return (
    <div id="cv-preview">
      <ActiveTemplate
        cvData={record.cvData}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    </div>
  )
}
