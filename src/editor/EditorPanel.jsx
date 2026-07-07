import GlassCard from '../shared/GlassCard'
import {
  exportPdf,
} from '../utils/exportPdf'

import {
  templateList,
} from '../templates'

import cvDataFile from '../data/cvData'
import { usePremiumUnlock } from '../context/usePremiumUnlock'
import AdUnlockModal from '../shared/AdUnlockModal'
import PublishModal from '../shared/PublishModal'
import { parseResumeFile } from '../utils/api'
import { useRef, useState } from 'react'

export default function EditorPanel({
  cvData,
  setCvData,
  darkMode,
  selectedTemplate,
  setSelectedTemplate,
}) {
  const { isUnlocked, unlock } = usePremiumUnlock()
  const [adModalTemplate, setAdModalTemplate] = useState(null)
  const [publishOpen, setPublishOpen] = useState(false)
  const [importing, setImporting] = useState(false)
  const resumeFileInputRef = useRef(null)

  const handleTemplateClick = (template) => {
    if (template.premium && !isUnlocked(template.id)) {
      setAdModalTemplate(template)
    } else {
      setSelectedTemplate(template.id)
    }
  }

  const handleResumeFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setImporting(true)

    try {
      const { parsedData } = await parseResumeFile(file)

      setCvData({
        ...cvData,
        ...parsedData,
        personal: {
          ...cvData.personal,
          ...(parsedData.personal || {}),
        },
      })

      alert(
        "We've auto-filled what we could find in your file. Please review every section — automatic detection isn't perfect."
      )
    } catch (err) {
      alert(
        err.message ||
          'Could not import that file. Please try a different PDF or DOCX.'
      )
    } finally {
      setImporting(false)
      e.target.value = ''
    }
  }

  const updatePersonal =
    (field, value) => {
      setCvData({
        ...cvData,
        personal: {
          ...cvData.personal,
          [field]: value,
        },
      })
    }

  return (
    <div
      className="
        p-6
        xl:h-screen
        xl:sticky
        xl:top-0
        overflow-y-auto
      "
    >
      {/* CONTAINER */}

      {/* CARD */}
      <GlassCard
        className="
          p-6
          bg-white
        "
        hover={false}
      >
        {/* HEADER */}
        <div className="mb-8">
          <h2
            className="
              text-3xl
              font-bold
              text-zinc-900
              mb-2
            "
          >
            CV Editor
          </h2>

          <p
            className="
              text-zinc-500
            "
          >
            Live editing system
          </p>
        </div>

        {/* RESET */}
        <div className="mb-6">
          <button
            onClick={() => {
              localStorage.removeItem(
                'cv-data'
              )
              window.location.reload()
            }}
            className="
              w-full
              px-4
              py-3
              rounded-2xl
              bg-red-500
              text-white
              font-semibold
              transition-all
              duration-300
              hover:bg-red-600
              hover:-translate-y-1
              hover:shadow-xl
            "
          >
            Reset CV Data
          </button>
        </div>

        {/* ACTIONS */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {/* DOWNLOAD PDF */}
          <button
            onClick={() =>
              exportPdf('cv-preview')
            }
            className="
              p-3
              rounded-2xl
              bg-emerald-600
              text-white
              text-sm
              font-semibold
              hover:bg-emerald-700
              transition-all
            "
          >
            Export PDF
          </button>

          {/* PUBLISH ONLINE */}
          <button
            onClick={() => setPublishOpen(true)}
            className="
              p-3
              rounded-2xl
              bg-indigo-600
              text-white
              text-sm
              font-semibold
              hover:bg-indigo-700
              transition-all
            "
          >
            🌐 Publish Online
          </button>

          {/* IMPORT RESUME (PDF/DOCX) */}
          <label
            className={`
              p-3
              rounded-2xl
              text-sm
              font-semibold
              text-center
              cursor-pointer
              transition-all
              col-span-2

              ${
                importing
                  ? 'bg-zinc-300 text-zinc-500 cursor-wait'
                  : 'bg-amber-500 text-white hover:bg-amber-600'
              }
            `}
          >
            {importing
              ? 'Reading your file…'
              : '📄 Import Old CV (PDF / DOCX)'}

            <input
              ref={resumeFileInputRef}
              type="file"
              accept=".pdf,.docx"
              hidden
              disabled={importing}
              onChange={handleResumeFileChange}
            />
          </label>

          {/* EXPORT */}
          <button
            onClick={() => {
              const dataStr =
                JSON.stringify(
                  cvData,
                  null,
                  2
                )

              const blob =
                new Blob([dataStr], {
                  type: 'application/json',
                })

              const url =
                URL.createObjectURL(blob)

              const link =
                document.createElement('a')

              link.href = url

              link.download =
                'cv-data.json'

              link.click()

              URL.revokeObjectURL(url)
            }}
            className="
              p-3
              rounded-2xl
              bg-blue-600
              text-white
              font-semibold
              hover:bg-blue-700
              transition-all
            "
          >
            Export JSON
          </button>

          {/* IMPORT */}
          <label
            className="
              p-3
              rounded-2xl
              bg-zinc-900
              text-white
              font-semibold
              text-center
              cursor-pointer
              hover:bg-black
              transition-all
            "
          >
            Import JSON

            <input
              type="file"
              accept=".json"
              hidden
              onChange={(e) => {
                const file =
                  e.target.files[0]

                if (!file) return

                const reader =
                  new FileReader()

                reader.onload = (
                  event
                ) => {
                  try {
                    const importedData =
                      JSON.parse(
                        event.target.result
                      )

                    setCvData({
                      ...cvDataFile,
                      ...importedData,
                      personal: {
                        ...cvDataFile.personal,
                        ...(importedData.personal ||
                          {}),
                      },
                    })
                  } catch {
                    alert(
                      'Incorrect JSON format'
                    )
                  }
                }

                reader.readAsText(file)
              }}
            />
          </label>
        </div>

        {/* =========================
        TEMPLATE SELECTOR
========================= */}

<div className="mb-10">
  {/* TITLE */}

  <div className="mb-4">
    <h3
      className="
        text-xl
        font-bold
        text-zinc-900
        mb-1
      "
    >
      Templates
    </h3>

    <p
      className="
        text-sm
        text-zinc-500
      "
    >
      Choose your resume style
    </p>
  </div>

  {/* TEMPLATE GRID */}

  <div
  className="
    grid
    gap-4
    md:grid-cols-2
  "
>
    {templateList.map(
      (template) => {
        const isActive =
          selectedTemplate ===
          template.id

        return (
          <button
            key={template.id}
            onClick={() =>
              handleTemplateClick(
                template
              )
            }
            className={`
              relative
              overflow-hidden
              rounded-3xl
              border
              p-5
              text-left
              transition-all
              duration-500
              ease-out
              transform-gpu

              ${
                isActive
                  ? `
                    border-blue-500
                    bg-blue-50
                    shadow-[0_20px_50px_rgba(59,130,246,0.18)]
                    scale-[1.02]
                  `
                  : `
                    border-zinc-200
                    bg-white
                    hover:border-blue-300
                    hover:-translate-y-1
                  `
              }
            `}
          >
            {/* ACTIVE GLOW */}

            {isActive && (
              <div
                className="
                  absolute
                  inset-0
                  bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_45%)]
                  pointer-events-none
                "
              />
            )}
            {/* TEMPLATE THUMBNAIL */}

<div
  className="
    relative
    mb-4
    overflow-hidden
    rounded-2xl
    border
    border-zinc-200
    bg-zinc-100
  "
>
  <img
    src={template.thumbnail}
    alt={template.name}
    className={`
      w-full
      h-40
      object-cover
      transition-all
      duration-500

      group-hover:scale-105

      ${
        template.premium &&
        !isUnlocked(template.id)
          ? 'blur-[2px] brightness-75'
          : ''
      }
    `}
  />

  {template.premium &&
    !isUnlocked(template.id) && (
      <div
        className="
          absolute
          inset-0
          flex
          flex-col
          items-center
          justify-center
          gap-1
          bg-black/25
          text-white
        "
      >
        <span className="text-2xl">🔒</span>
        <span className="text-xs font-bold">
          Watch ad to unlock
        </span>
      </div>
    )}
</div>
            {/* CONTENT */}

            <div className="relative z-10">
              {/* TOP */}

              <div
                className="
                  flex
                  items-start
                  justify-between
                  gap-4
                  mb-3
                "
              >
                {/* INFO */}

                <div>
                  <h4
                    className="
                      text-lg
                      font-bold
                      text-zinc-900
                    "
                  >
                    {template.name}
                  </h4>

                  <p
                    className="
                      text-sm
                      text-zinc-500
                      mt-1
                    "
                  >
                    {
                      template.description
                    }
                  </p>
                </div>

                {/* CATEGORY */}

                <div
                  className="
                    px-3
                    py-1
                    rounded-full
                    bg-blue-100
                    text-blue-700
                    text-xs
                    font-bold
                  "
                >
                  {
                    template.category
                  }
                </div>
              </div>

              {/* TEMPLATE TAGS */}

<div
  className="
    flex
    flex-wrap
    gap-2
    mt-4
  "
>
  {/* CATEGORY */}

  <div
    className="
      px-2
      py-1
      rounded-lg
      bg-blue-100
      text-blue-700
      text-xs
      font-semibold
    "
  >
    {template.category}
  </div>

  {/* DARK MODE */}

  {template.darkSupported && (
    <div
      className="
        px-2
        py-1
        rounded-lg
        bg-zinc-100
        text-zinc-700
        text-xs
        font-semibold
      "
    >
      Dark Mode
    </div>
  )}

  {/* FEATURED */}

  {template.featured && (
    <div
      className="
        px-2
        py-1
        rounded-lg
        bg-amber-100
        text-amber-700
        text-xs
        font-semibold
      "
    >
      Featured
    </div>
  )}

  {/* PREMIUM */}

  {template.premium && (
    <div
      className={`
        px-2
        py-1
        rounded-lg
        text-xs
        font-semibold

        ${
          isUnlocked(template.id)
            ? 'bg-emerald-100 text-emerald-700'
            : 'bg-purple-100 text-purple-700'
        }
      `}
    >
      {isUnlocked(template.id)
        ? '✓ Unlocked'
        : '🔒 Watch ad to unlock'}
    </div>
  )}
</div>
            </div>
          </button>
        )
      }
    )}
  </div>
</div>

        {/* PERSONAL */}
        <div className="space-y-4">

          {/* PHOTO */}
          <div>
            <label
              className="
                block
                mb-2
                text-sm
                font-semibold
                text-zinc-700
              "
            >
              Profile Photo
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file =
                  e.target.files[0]

                if (!file) return

                const reader =
                  new FileReader()

                reader.onload = (
                  event
                ) => {
                  setCvData({
                    ...cvData,
                    personal: {
                      ...cvData.personal,
                      photo:
                        event.target
                          .result,
                    },
                  })
                }

                reader.readAsDataURL(
                  file
                )
              }}
              className="
                w-full
                p-3
                rounded-xl
                border
                border-zinc-200
                bg-white
              "
            />
            <p
              className="
                mt-2
                text-xs
                text-zinc-500
                leading-6
              "
            >
              Recommended: square image, centered face, high quality portrait.
            </p>
          </div>

          {/* ALIGNMENT-X */}
          <div>
            <label
              className="
                block
                mb-2
                text-sm
                font-semibold
                text-zinc-700
              "
            >
              Photo Horizontal Position
            </label>

            <input
              type="range"
              min="0"
              max="100"
              value={
                cvData.personal.photoPositionX
              }
              onChange={(e) => {
                setCvData({
                  ...cvData,
                  personal: {
                    ...cvData.personal,
                    photoPositionX:
                      Number(e.target.value),
                  },
                })
              }}
              className="w-full"
            />
          </div>

          {/* ALIGNMENT-Y */}
          <div>
            <label
              className="
                block
                mb-2
                text-sm
                font-semibold
                text-zinc-700
              "
            >
              Photo Vertical Position
            </label>

            <input
              type="range"
              min="0"
              max="100"
              value={
                cvData.personal.photoPositionY
              }
              onChange={(e) => {
                setCvData({
                  ...cvData,
                  personal: {
                    ...cvData.personal,
                    photoPositionY:
                      Number(e.target.value),
                  },
                })
              }}
              className="w-full"
            />
          </div>

          {/* CENTER-BUTTON */}
          <button
            onClick={() => {
              setCvData({
                ...cvData,
                personal: {
                  ...cvData.personal,
                  photoPositionX: 50,
                  photoPositionY: 50,
                },
              })
            }}
            className="
              w-full
              mt-4
              p-3
              rounded-2xl
              bg-zinc-900
              text-white
              font-semibold
              hover:bg-black
              transition-all
            "
          >
            Center Image
          </button>

          {cvData.personal.photo && (
            <button
              onClick={() => {
                setCvData({
                  ...cvData,
                  personal: {
                    ...cvData.personal,
                    photo: '',
                  },
                })
              }}
              className="
                w-full
                mt-2
                p-3
                rounded-2xl
                bg-red-500
                text-white
                font-semibold
                hover:bg-red-600
                transition-all
              "
            >
              Remove Photo
            </button>
          )}

          {/* NAME */}
          <div>
            <label
              className="
                block
                mb-2
                text-sm
                font-semibold
                text-zinc-700
              "
            >
              Full Name
            </label>

            <input
              type="text"
              value={cvData.personal.name}
              onChange={(e) =>
                updatePersonal(
                  'name',
                  e.target.value
                )
              }
              className="
                w-full
                p-4
                rounded-2xl
                border
                border-zinc-200
              "
            />
          </div>

          {/* TITLE */}
          <div>
            <label
              className="
                block
                mb-2
                text-sm
                font-semibold
                text-zinc-700
              "
            >
              Job Title
            </label>

            <input
              type="text"
              value={cvData.personal.title}
              onChange={(e) =>
                updatePersonal(
                  'title',
                  e.target.value
                )
              }
              className="
                w-full
                p-4
                rounded-2xl
                border
                border-zinc-200
              "
            />
          </div>

          {/* SUMMARY */}
          <div>
            <label
              className="
                block
                mb-2
                text-sm
                font-semibold
                text-zinc-700
              "
            >
              Summary
            </label>

            <textarea
              rows="6"
              value={cvData.personal.summary}
              onChange={(e) =>
                updatePersonal(
                  'summary',
                  e.target.value
                )
              }
              className="
                w-full
                p-4
                rounded-2xl
                border
                border-zinc-200
              "
            />
          </div>

          {/* VENDOR STACK */}
          <div>
            <div
              className="
                flex
                items-center
                justify-between
                mb-2
              "
            >
              <label
                className="
                  text-sm
                  font-semibold
                  text-zinc-700
                "
              >
                Vendor Stack
              </label>

              <button
                onClick={() => {
                  setCvData({
                    ...cvData,
                    vendors: [
                      ...(cvData.vendors ||
                        []),
                      'New Vendor',
                    ],
                  })
                }}
                className="
                  px-3
                  py-1.5
                  rounded-xl
                  bg-blue-600
                  text-white
                  text-xs
                  font-semibold
                "
              >
                Add Vendor
              </button>
            </div>

            <div className="space-y-2">
              {(cvData.vendors || []).map(
                (vendor, index) => (
                  <div
                    key={index}
                    className="
                      flex
                      gap-2
                    "
                  >
                    <input
                      type="text"
                      value={vendor}
                      onChange={(e) => {
                        const updated = [
                          ...cvData.vendors,
                        ]

                        updated[index] =
                          e.target.value

                        setCvData({
                          ...cvData,
                          vendors: updated,
                        })
                      }}
                      className="
                        flex-1
                        p-3
                        rounded-xl
                        border
                        border-zinc-200
                      "
                    />

                    <button
                      onClick={() => {
                        const updated =
                          cvData.vendors.filter(
                            (_, i) =>
                              i !== index
                          )

                        setCvData({
                          ...cvData,
                          vendors: updated,
                        })
                      }}
                      className="
                        px-4
                        rounded-xl
                        bg-red-500
                        text-white
                        text-sm
                        font-semibold
                      "
                    >
                      ✕
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
         {/* EMAIL */}

<div>
  <label
    className="
      block
      text-sm
      font-medium
      mb-2
    "
  >
    Email
  </label>

  <input
    type="email"
    value={
      cvData.personal.email
    }
    onChange={(e) =>
      setCvData({
        ...cvData,

        personal: {
          ...cvData.personal,

          email:
            e.target.value,
        },
      })
    }
    className="
      w-full
      p-3
      rounded-xl
      border
      border-zinc-200
    "
  />
</div>

{/* PHONE */}

<div>
  <label
    className="
      block
      text-sm
      font-medium
      mb-2
    "
  >
    Phone
  </label>

  <input
    type="text"
    value={
      cvData.personal.phone
    }
    onChange={(e) =>
      setCvData({
        ...cvData,

        personal: {
          ...cvData.personal,

          phone:
            e.target.value,
        },
      })
    }
    className="
      w-full
      p-3
      rounded-xl
      border
      border-zinc-200
    "
  />
</div>

{/* ADDRESS */}

<div>
  <label
    className="
      block
      text-sm
      font-medium
      mb-2
    "
  >
    Address
  </label>

  <input
    type="text"
    value={
      cvData.personal.address
    }
    onChange={(e) =>
      setCvData({
        ...cvData,

        personal: {
          ...cvData.personal,

          address:
            e.target.value,
        },
      })
    }
    className="
      w-full
      p-3
      rounded-xl
      border
      border-zinc-200
    "
  />
</div>       
        {/* SKILLS */}
        <div className="pt-8">
          <div
            className="
              flex
              items-center
              justify-between
              mb-5
            "
          >
            <h3
              className="
                text-xl
                font-bold
                text-zinc-900
              "
            >
              Skills
            </h3>

            <button
              onClick={() => {
                setCvData({
                  ...cvData,
                  skills: [
                    ...cvData.skills,
                    {
                      name:
                        'New Skill',
                      level: 80,
                      icon: '⚡',
                      description:
                        'Skill description',
                    },
                  ],
                })
              }}
              className="
                px-4
                py-2
                rounded-xl
                bg-blue-600
                text-white
                text-sm
                font-semibold
              "
            >
              Add Skill
            </button>
          </div>

          <div className="space-y-4">
            {cvData.skills.map(
              (skill, index) => (
                <div
                  key={index}
                  className="
                    border
                    border-zinc-200
                    rounded-2xl
                    p-5
                    space-y-4
                  "
                >
                  <div>
                    <label
                      className="
                        block
                        mb-2
                        text-sm
                        font-semibold
                        text-zinc-700
                      "
                    >
                      Skill Name
                    </label>

                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => {
                        const updated =
                          [...cvData.skills]

                        updated[index].name =
                          e.target.value

                        setCvData({
                          ...cvData,
                          skills:
                            updated,
                        })
                      }}
                      className="
                        w-full
                        p-3
                        rounded-xl
                        border
                        border-zinc-200
                      "
                    />
                  </div>

                  <div>
                    <label
                      className="
                        block
                        mb-2
                        text-sm
                        font-semibold
                        text-zinc-700
                      "
                    >
                      Skill Percentage
                    </label>

                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={skill.level}
                      onChange={(e) => {
                        const updated =
                          [...cvData.skills]

                        updated[index].level =
                          Number(e.target.value)

                        setCvData({
                          ...cvData,
                          skills:
                            updated,
                        })
                      }}
                      className="
                        w-full
                        p-3
                        rounded-xl
                        border
                        border-zinc-200
                      "
                    />
                  </div>

                  <button
                    onClick={() => {
                      const updated =
                        cvData.skills.filter(
                          (_, i) =>
                            i !== index
                        )

                      setCvData({
                        ...cvData,
                        skills:
                          updated,
                      })
                    }}
                    className="
                      px-4
                      py-2
                      rounded-xl
                      bg-red-500
                      text-white
                      text-sm
                      font-semibold
                    "
                  >
                    Remove Skill
                  </button>
                </div>
              )
            )}
          </div>
        </div>

        {/* EXPERIENCE */}
        <div className="pt-8">
          <div
            className="
              flex
              items-center
              justify-between
              mb-5
            "
          >
            <h3
              className="
                text-xl
                font-bold
                text-zinc-900
              "
            >
              Experience
            </h3>

            <button
              onClick={() => {
                setCvData({
                  ...cvData,
                  experience: [
                    ...cvData.experience,
                    {
                      role:
                        'New Role',
                      company:
                        'Company Name',
                      duration:
                        '2024 – Present',
                      description:
                        '',
                      tags: [
                        'Skill',
                      ],
                    },
                  ],
                })
              }}
              className="
                px-4
                py-2
                rounded-xl
                bg-blue-600
                text-white
                text-sm
                font-semibold
              "
            >
              Add Experience
            </button>
          </div>

          <div className="space-y-4">
            {cvData.experience.map(
              (job, index) => (
                <div
                  key={index}
                  className="
                    border
                    border-zinc-200
                    rounded-2xl
                    p-5
                    space-y-4
                  "
                >
                  <input
                    type="text"
                    value={job.role}
                    onChange={(e) => {
                      const updated =
                        [...cvData.experience]

                      updated[index].role =
                        e.target.value

                      setCvData({
                        ...cvData,
                        experience:
                          updated,
                      })
                    }}
                    placeholder="Role"
                    className="
                      w-full
                      p-3
                      rounded-xl
                      border
                      border-zinc-200
                    "
                  />

                  <input
                    type="text"
                    value={job.company}
                    onChange={(e) => {
                      const updated =
                        [...cvData.experience]

                      updated[index].company =
                        e.target.value

                      setCvData({
                        ...cvData,
                        experience:
                          updated,
                      })
                    }}
                    placeholder="Company"
                    className="
                      w-full
                      p-3
                      rounded-xl
                      border
                      border-zinc-200
                    "
                  />

                  <input
                    type="text"
                    value={job.duration}
                    onChange={(e) => {
                      const updated =
                        [...cvData.experience]

                      updated[index].duration =
                        e.target.value

                      setCvData({
                        ...cvData,
                        experience:
                          updated,
                      })
                    }}
                    placeholder="Duration"
                    className="
                      w-full
                      p-3
                      rounded-xl
                      border
                      border-zinc-200
                    "
                  />

                  <textarea
                    rows="4"
                    value={job.description}
                    onChange={(e) => {
                      const updated =
                        [...cvData.experience]

                      updated[index].description =
                        e.target.value

                      setCvData({
                        ...cvData,
                        experience:
                          updated,
                      })
                    }}
                    placeholder="Description"
                    className="
                      w-full
                      p-3
                      rounded-xl
                      border
                      border-zinc-200
                    "
                  />

                  <input
                    type="text"
                    value={job.tags.join(
                      ', '
                    )}
                    onChange={(e) => {
                      const updated =
                        [...cvData.experience]

                      updated[index].tags =
                        e.target.value
                          .split(',')
                          .map((tag) =>
                            tag.trim()
                          )

                      setCvData({
                        ...cvData,
                        experience:
                          updated,
                      })
                    }}
                    placeholder="Networking, Cloud, Security"
                    className="
                      w-full
                      p-3
                      rounded-xl
                      border
                      border-zinc-200
                    "
                  />

                  <button
                    onClick={() => {
                      const updated =
                        cvData.experience.filter(
                          (_, i) =>
                            i !== index
                        )

                      setCvData({
                        ...cvData,
                        experience:
                          updated,
                      })
                    }}
                    className="
                      px-4
                      py-2
                      rounded-xl
                      bg-red-500
                      text-white
                      text-sm
                      font-semibold
                    "
                  >
                    Remove Experience
                  </button>
                </div>
              )
            )}
          </div>
        </div>

        {/* EDUCATION */}
        <div className="pt-8">
          <div
            className="
              flex
              items-center
              justify-between
              mb-5
            "
          >
            <h3
              className="
                text-xl
                font-bold
                text-zinc-900
              "
            >
              Education
            </h3>

            <button
              onClick={() => {
                setCvData({
                  ...cvData,
                  education: [
                    ...cvData.education,
                    {
                      degree:
                        'New Degree',
                      institute:
                        'Institute Name',
                      duration:
                        '2020 – 2024',
                      result:
                        '3.8 GPA',
                    },
                  ],
                })
              }}
              className="
                px-4
                py-2
                rounded-xl
                bg-blue-600
                text-white
                text-sm
                font-semibold
              "
            >
              Add Education
            </button>
          </div>

          <div className="space-y-4">
            {cvData.education.map(
              (item, index) => (
                <div
                  key={index}
                  className="
                    border
                    border-zinc-200
                    rounded-2xl
                    p-5
                    space-y-4
                  "
                >
                  <input
                    type="text"
                    value={item.degree}
                    onChange={(e) => {
                      const updated =
                        [...cvData.education]

                      updated[index].degree =
                        e.target.value

                      setCvData({
                        ...cvData,
                        education:
                          updated,
                      })
                    }}
                    placeholder="Degree"
                    className="
                      w-full
                      p-3
                      rounded-xl
                      border
                      border-zinc-200
                    "
                  />

                  <input
                    type="text"
                    value={item.institute}
                    onChange={(e) => {
                      const updated =
                        [...cvData.education]

                      updated[index].institute =
                        e.target.value

                      setCvData({
                        ...cvData,
                        education:
                          updated,
                      })
                    }}
                    placeholder="Institute"
                    className="
                      w-full
                      p-3
                      rounded-xl
                      border
                      border-zinc-200
                    "
                  />

                  <input
                    type="text"
                    value={item.duration}
                    onChange={(e) => {
                      const updated =
                        [...cvData.education]

                      updated[index].duration =
                        e.target.value

                      setCvData({
                        ...cvData,
                        education:
                          updated,
                      })
                    }}
                    placeholder="Duration"
                    className="
                      w-full
                      p-3
                      rounded-xl
                      border
                      border-zinc-200
                    "
                  />

                  <input
                    type="text"
                    value={
                      item.result || ''
                    }
                    onChange={(e) => {
                      const updated =
                        [...cvData.education]

                      updated[index].result =
                        e.target.value

                      setCvData({
                        ...cvData,
                        education:
                          updated,
                      })
                    }}
                    placeholder="3.8 GPA / First Class"
                    className="
                      w-full
                      p-3
                      rounded-xl
                      border
                      border-zinc-200
                    "
                  />

                  <button
                    onClick={() => {
                      const updated =
                        cvData.education.filter(
                          (_, i) =>
                            i !== index
                        )

                      setCvData({
                        ...cvData,
                        education:
                          updated,
                      })
                    }}
                    className="
                      px-4
                      py-2
                      rounded-xl
                      bg-red-500
                      text-white
                      text-sm
                      font-semibold
                    "
                  >
                    Remove Education
                  </button>
                </div>
              )
            )}
          </div>
        </div>

        {/* CERTIFICATIONS */}
        <div className="pt-8">
          <div
            className="
              flex
              items-center
              justify-between
              mb-5
            "
          >
            <h3
              className="
                text-xl
                font-bold
                text-zinc-900
              "
            >
              Certifications
            </h3>

            <button
              onClick={() => {
                setCvData({
                  ...cvData,
                  certifications: [
                    ...cvData.certifications,
                    {
                      title:
                        'New Certification',
                    },
                  ],
                })
              }}
              className="
                px-4
                py-2
                rounded-xl
                bg-blue-600
                text-white
                text-sm
                font-semibold
              "
            >
              Add Certification
            </button>
          </div>

          <div className="space-y-4">
            {cvData.certifications.map(
              (cert, index) => (
                <div
                  key={index}
                  className="
                    border
                    border-zinc-200
                    rounded-2xl
                    p-5
                    space-y-4
                  "
                >
                  <input
                    type="text"
                    value={cert.title}
                    onChange={(e) => {
                      const updated =
                        [
                          ...cvData.certifications,
                        ]

                      updated[index].title =
                        e.target.value

                      setCvData({
                        ...cvData,
                        certifications:
                          updated,
                      })
                    }}
                    placeholder="Certification Title"
                    className="
                      w-full
                      p-3
                      rounded-xl
                      border
                      border-zinc-200
                    "
                  />

                  <button
                    onClick={() => {
                      const updated =
                        cvData.certifications.filter(
                          (_, i) =>
                            i !== index
                        )

                      setCvData({
                        ...cvData,
                        certifications:
                          updated,
                      })
                    }}
                    className="
                      px-4
                      py-2
                      rounded-xl
                      bg-red-500
                      text-white
                      text-sm
                      font-semibold
                    "
                  >
                    Remove Certification
                  </button>
                </div>
              )
            )}
          </div>
        </div>

        {/* LANGUAGES */}
        <div className="mb-10 pt-8">
          <div
            className="
              flex
              justify-between
              items-center
              mb-4
            "
          >
            <h2
              className="
                text-lg
                font-bold
              "
            >
              Languages
            </h2>

            <button
              onClick={() => {
                setCvData({
                  ...cvData,
                  languages: [
                    ...cvData.languages,
                    {
                      name: '',
                      level: 80,
                      levelLabel:
                        'Professional',
                    },
                  ],
                })
              }}
              className="
                px-4
                py-2
                rounded-xl
                bg-blue-600
                text-white
                text-sm
                font-semibold
              "
            >
              Add Language
            </button>
          </div>

          <div className="space-y-4">
            {cvData.languages.map(
              (language, index) => (
                <div
                  key={index}
                  className="
                    border
                    border-zinc-200
                    rounded-2xl
                    p-4
                    space-y-3
                  "
                >
                  <input
                    type="text"
                    placeholder="Language"
                    value={
                      language.name
                    }
                    onChange={(e) => {
                      const updated =
                        [
                          ...cvData.languages,
                        ]

                      updated[
                        index
                      ].name =
                        e.target.value

                      setCvData({
                        ...cvData,
                        languages:
                          updated,
                      })
                    }}
                    className="
                      w-full
                      p-3
                      rounded-xl
                      border
                      border-zinc-200
                    "
                  />

                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={
                      language.level
                    }
                    onChange={(e) => {
                      const updated =
                        [
                          ...cvData.languages,
                        ]

                      updated[
                        index
                      ].level =
                        Number(
                          e.target.value
                        )

                      setCvData({
                        ...cvData,
                        languages:
                          updated,
                      })
                    }}
                    className="
                      w-full
                      p-3
                      rounded-xl
                      border
                      border-zinc-200
                    "
                  />

                  <input
                    type="text"
                    placeholder="Professional"
                    value={language.levelLabel}
                    onChange={(e) => {
                      const updated =
                        [
                          ...cvData.languages,
                        ]

                      updated[
                        index
                      ].levelLabel =
                        e.target.value

                      setCvData({
                        ...cvData,
                        languages:
                          updated,
                      })
                    }}
                    className="
                      w-full
                      p-3
                      rounded-xl
                      border
                      border-zinc-200
                    "
                  />

                  <button
                    onClick={() => {
                      const updated =
                        cvData.languages.filter(
                          (
                            _,
                            i
                          ) =>
                            i !== index
                        )

                      setCvData({
                        ...cvData,
                        languages:
                          updated,
                      })
                    }}
                    className="
                      px-4
                      py-2
                      rounded-xl
                      bg-red-500
                      text-white
                      text-sm
                      font-semibold
                    "
                  >
                    Remove
                  </button>
                </div>
              )
            )}
          </div>
        </div>
          {/* =========================
    SOCIAL LINKS
========================= */}

<div className="space-y-4">
  {/* HEADER */}

  <div
    className="
      flex
      items-center
      justify-between
    "
  >
    <h3
      className="
        text-lg
        font-bold
      "
    >
      Social Links
    </h3>

    <button
      onClick={() => {
        setCvData({
          ...cvData,

          personal: {
            ...cvData.personal,

            socials: [
              ...(cvData.personal
                .socials || []),

              {
                platform:
                  'LinkedIn',

                url:
                  'linkedin.com/in/yourname',
              },
            ],
          },
        })
      }}
      className="
        px-4
        py-2

        rounded-xl

        bg-blue-500
        text-white

        text-sm
        font-medium
      "
    >
      Add Social
    </button>
  </div>

  {/* SOCIAL LIST */}

  {(cvData.personal.socials ||
    []).map(
    (social, index) => (
      <div
        key={index}
        className="
          p-4

          rounded-2xl

          border
          border-zinc-200

          space-y-3
        "
      >
        {/* PLATFORM */}

<select
  value={social.platform}

  onChange={(e) => {
    const updated = [
      ...cvData.personal
        .socials,
    ]

    updated[index].platform =
      e.target.value

    setCvData({
      ...cvData,

      personal: {
        ...cvData.personal,

        socials: updated,
      },
    })
  }}

  className="
    w-full
    p-3

    rounded-xl

    border
    border-zinc-200
  "
>
  <option value="LinkedIn">
    LinkedIn
  </option>

  <option value="GitHub">
    GitHub
  </option>

  <option value="Facebook">
    Facebook
  </option>

  <option value="Instagram">
    Instagram
  </option>

  <option value="Twitter">
    Twitter / X
  </option>

  <option value="Portfolio">
    Portfolio
  </option>

  <option value="YouTube">
    YouTube
  </option>

  <option value="Behance">
    Behance
  </option>

  <option value="Dribbble">
    Dribbble
  </option>

  <option value="Fiverr">
    Fiverr
  </option>

  <option value="Upwork">
    Upwork
  </option>

  <option value="Custom">
    Custom Platform
  </option>
</select>

{/* CUSTOM PLATFORM */}

{social.platform ===
  'Custom' && (
  <input
    type="text"

    placeholder="Custom Platform Name"

    value={
      social.customPlatform ||
      ''
    }

    onChange={(e) => {
      const updated = [
        ...cvData.personal
          .socials,
      ]

      updated[
        index
      ].customPlatform =
        e.target.value

      setCvData({
        ...cvData,

        personal: {
          ...cvData.personal,

          socials:
            updated,
        },
      })
    }}

    className="
      w-full
      p-3

      rounded-xl

      border
      border-zinc-200
    "
  />
)}

        <input
          type="text"
          placeholder="Profile URL"

          value={social.url}

          onChange={(e) => {
            const updated = [
              ...cvData.personal
                .socials,
            ]

            updated[
              index
            ].url =
              e.target.value

            setCvData({
              ...cvData,

              personal: {
                ...cvData.personal,

                socials:
                  updated,
              },
            })
          }}

          className="
            w-full
            p-3

            rounded-xl

            border
            border-zinc-200
          "
        />

        {/* REMOVE */}

        <button
          onClick={() => {
            const updated =
              cvData.personal.socials.filter(
                (_, i) =>
                  i !== index
              )

            setCvData({
              ...cvData,

              personal: {
                ...cvData.personal,

                socials:
                  updated,
              },
            })
          }}

          className="
            w-full

            py-2

            rounded-xl

            bg-red-500
            text-white

            text-sm
            font-medium
          "
        >
          Remove Social
        </button>
      </div>
    )
  )}
</div>
        {/* REFERENCES */}
        <div className="pt-8">
          <div
            className="
              flex
              items-center
              justify-between
              mb-5
            "
          >
            <h3
              className="
                text-xl
                font-bold
                text-zinc-900
              "
            >
              References
            </h3>

            <button
              onClick={() => {
                setCvData({
                  ...cvData,
                  references: [
                    ...cvData.references,
                    {
                      name:
                        'Reference Name',
                      company:
                        'Company Name',
                      phone:
                        '',
                      email:
                        '',
                    },
                  ],
                })
              }}
              className="
                px-4
                py-2
                rounded-xl
                bg-blue-600
                text-white
                text-sm
                font-semibold
              "
            >
              Add Reference
            </button>
          </div>

          <div className="space-y-4">
            {cvData.references.map(
              (reference, index) => (
                <div
                  key={index}
                  className="
                    border
                    border-zinc-200
                    rounded-2xl
                    p-5
                    space-y-4
                  "
                >
                  <input
                    type="text"
                    value={reference.name}
                    onChange={(e) => {
                      const updated =
                        [...cvData.references]

                      updated[index].name =
                        e.target.value

                      setCvData({
                        ...cvData,
                        references:
                          updated,
                      })
                    }}
                    placeholder="Reference Name"
                    className="
                      w-full
                      p-3
                      rounded-xl
                      border
                      border-zinc-200
                    "
                  />

                  <input
                    type="text"
                    value={reference.company}
                    onChange={(e) => {
                      const updated =
                        [...cvData.references]

                      updated[index].company =
                        e.target.value

                      setCvData({
                        ...cvData,
                        references:
                          updated,
                      })
                    }}
                    placeholder="Company"
                    className="
                      w-full
                      p-3
                      rounded-xl
                      border
                      border-zinc-200
                    "
                  />

                  <input
                    type="text"
                    value={
                      reference.phone || ''
                    }
                    onChange={(e) => {
                      const updated =
                        [...cvData.references]

                      updated[index].phone =
                        e.target.value

                      setCvData({
                        ...cvData,
                        references:
                          updated,
                      })
                    }}
                    placeholder="Phone"
                    className="
                      w-full
                      p-3
                      rounded-xl
                      border
                      border-zinc-200
                    "
                  />

                  <input
                    type="text"
                    value={
                      reference.email || ''
                    }
                    onChange={(e) => {
                      const updated =
                        [...cvData.references]

                      updated[index].email =
                        e.target.value

                      setCvData({
                        ...cvData,
                        references:
                          updated,
                      })
                    }}
                    placeholder="Email"
                    className="
                      w-full
                      p-3
                      rounded-xl
                      border
                      border-zinc-200
                    "
                  />

                  <button
                    onClick={() => {
                      const updated =
                        cvData.references.filter(
                          (_, i) =>
                            i !== index
                        )

                      setCvData({
                        ...cvData,
                        references:
                          updated,
                      })
                    }}
                    className="
                      px-4
                      py-2
                      rounded-xl
                      bg-red-500
                      text-white
                      text-sm
                      font-semibold
                    "
                  >
                    Remove Reference
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      </GlassCard>

      <AdUnlockModal
        open={!!adModalTemplate}
        templateName={adModalTemplate?.name}
        onClose={() => setAdModalTemplate(null)}
        onComplete={() => {
          unlock(adModalTemplate.id)
          setSelectedTemplate(adModalTemplate.id)
        }}
      />

      <PublishModal
        open={publishOpen}
        onClose={() => setPublishOpen(false)}
        cvData={cvData}
        selectedTemplate={selectedTemplate}
        darkMode={darkMode}
      />
    </div>
  )
}