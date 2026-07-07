import { useEffect, useState } from 'react'

import EditorPanel from './editor/EditorPanel'

import templates from './templates'

import cvDataFile from './data/cvData'

import { useTheme } from './context/ThemeContext'

import WhatsNewModal, {
  useWhatsNew,
} from './shared/WhatsNewModal'


export default function App() {
  /* =========================
     CV DATA
  ========================= */

  const [cvData, setCvData] =
    useState(() => {
      const saved =
        localStorage.getItem(
          'cv-data'
        )

      if (!saved) return cvDataFile

      try {
        return JSON.parse(saved)
      } catch {
        return cvDataFile
      }
    })

  /* =========================
     DARK MODE
  ========================= */

  const { darkMode, setDarkMode } =
    useTheme()

  /* =========================
     WHAT'S NEW
  ========================= */

  const {
    open: whatsNewOpen,
    close: closeWhatsNew,
    openManually: showWhatsNew,
  } = useWhatsNew()

  /* =========================
     TEMPLATE
  ========================= */

  const [
  selectedTemplate,
  setSelectedTemplate,
] = useState(
  'modernGlass'
)

  /* =========================
     EDITOR
  ========================= */

  const [
    editorOpen,

    setEditorOpen,
  ] = useState(false)

  /* =========================
     SAVE TO LOCAL STORAGE
  ========================= */

  useEffect(() => {
    localStorage.setItem(
      'cv-data',

      JSON.stringify(cvData)
    )
  }, [cvData])

  /* =========================
     ACTIVE TEMPLATE
  ========================= */

  const ActiveTemplate =
  templates[
    selectedTemplate
  ]?.component ||
  templates.modernGlass
    .component

  /* =========================
     RENDER
  ========================= */

  return (
    <div
      className={`
  min-h-screen
  transition-all
  duration-300
  relative
  overflow-hidden

  ${
    darkMode
      ? `
        bg-[#020617]
        text-white
      `
      : `
        bg-[#dbe4f0]
        text-black
      `
  }
`}

    >
      {/* BACKGROUND LIGHTING */}

      {darkMode && (
        <>
          <div
            className="
              fixed
              top-[-200px]
              right-[-200px]
              w-[600px]
              h-[600px]
              rounded-full
              bg-blue-500/10
              blur-3xl
              pointer-events-none
            "
          />

          <div
            className="
              fixed
              bottom-[-200px]
              left-[-200px]
              w-[500px]
              h-[500px]
              rounded-full
              bg-purple-500/10
              blur-3xl
              pointer-events-none
            "
          />
        </>
      )}
      {/* =========================
          EDIT BUTTON
      ========================= */}

      <button
        onClick={() =>
          setEditorOpen(
            !editorOpen
          )
        }
        className="
          fixed
          top-6
          left-6
          z-[100]
          px-5
          py-3
          rounded-2xl
          bg-blue-600
          text-white
          font-semibold
          shadow-2xl
          hover:scale-105
          transition-all
        "
      >
        {editorOpen
          ? 'Close Editor'
          : 'Edit Resume'}
      </button>

      {/* =========================
          WHAT'S NEW BUTTON
      ========================= */}

      <button
        onClick={showWhatsNew}
        title="What's New"
        className="
          fixed
          top-6
          left-[172px]
          z-[100]
          w-12
          h-12
          rounded-2xl
          bg-white
          text-xl
          shadow-2xl
          hover:scale-105
          transition-all
        "
      >
        🔔
      </button>

      <WhatsNewModal
        open={whatsNewOpen}
        onClose={closeWhatsNew}
      />

      {/* =========================
          OVERLAY
      ========================= */}

      {editorOpen && (
        <div
          onClick={() =>
            setEditorOpen(false)
          }
          className="
  fixed
  inset-0
  bg-black/20
  z-40
"
        />
      )}

      {/* =========================
          EDITOR PANEL
      ========================= */}

      <div
        className={`
          fixed
          top-0
          left-0
          h-screen
          w-[420px]
          bg-white
          z-50
          overflow-y-auto
          shadow-2xl
          transition-all
          duration-300

          ${
            editorOpen
              ? 'translate-x-0'
              : '-translate-x-full'
          }
        `}
      >
        <div className="p-6">
          <EditorPanel
            cvData={cvData}
            setCvData={setCvData}
            darkMode={darkMode}

            selectedTemplate={
              selectedTemplate
            }

            setSelectedTemplate={
              setSelectedTemplate
            }
          />
        </div>
      </div>

      {/* =========================
          RESUME PREVIEW
      ========================= */}

      <div
        className={`
          transition-all
          duration-300
          px-6
          py-24

          ${
            editorOpen
              ? 'lg:ml-[420px]'
              : ''
          }
        `}
      >
        <div
          id="cv-preview"
          className="
            max-w-[1180px]
            mx-auto
          "
        >
          <div
  key={selectedTemplate}
  className="
    animate-[fadeIn_.45s_ease]
  "
>
  {ActiveTemplate && (
    <ActiveTemplate
      cvData={cvData}
      darkMode={darkMode}
      setDarkMode={
        setDarkMode
      }
    />
  )}
</div>
        </div>
      </div>
    </div>
  )
}