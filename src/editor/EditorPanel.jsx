import GlassCard from '../shared/GlassCard'
import {
  exportPdf,
} from '../utils/exportPdf'
export default function EditorPanel({
  cvData,
  setCvData,

  selectedTemplate,
  setSelectedTemplate,
}) {
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
>Reset CV Data
</button> 

<div className="grid grid-cols-2 gap-4 mb-8">
  {/* EXPORT JSON */}

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
  >Export JSON
  </button> 
  {/* IMPORT JSON */}

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

            setCvData(
              importedData
            )
          } catch (error) {
            alert(
              'Invalid JSON file'
            )
          }
        }

        reader.readAsText(file)
      }}
    />
  </label>
</div>
{/* TEMPLATE SELECTOR */}

<div className="mb-8">
  <label
    className="
      block
      mb-2
      text-sm
      font-semibold
      text-zinc-700
    "
  >
    Template
  </label>

  <select
    value={selectedTemplate}
    onChange={(e) =>
      setSelectedTemplate(
        e.target.value
      )
    }
    className="
      w-full
      p-4
      rounded-2xl
      border
      border-zinc-200
      bg-white
      text-zinc-900
      outline-none
    "
  >
    <option value="modernGlass">
      Modern Glass
    </option>
  </select>
</div>
        {/* PERSONAL INFO */}

        <div className="space-y-5">
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

      const imageUrl =
        URL.createObjectURL(file)

      setCvData({
        ...cvData,

        personal: {
          ...cvData.personal,

          photo: imageUrl,
        },
      })
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
  Recommended:
  square image,
  centered face,
  high quality portrait.
</p>
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

  <select
    value={
      cvData.personal.photoPositionY
    }
    onChange={(e) => {
      setCvData({
        ...cvData,

        personal: {
          ...cvData.personal,

          photoPositionY:
            e.target.value,
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
    <option value="top">
      Top
    </option>

    <option value="center">
      Center
    </option>

    <option value="bottom">
      Bottom
    </option>
  </select>
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
        </div>

        {/* SKILLS */}

        <div className="pt-10">
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

          <div className="space-y-5">
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

        <div className="pt-10">
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

          <div className="space-y-5">
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

        <div className="pt-10">
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

          <div className="space-y-5">
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

        <div className="pt-10">
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

          <div className="space-y-5">
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

<div className="mb-10">
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
          {/* NAME */}

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

          {/* LEVEL */}

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

          {/* LABEL */}

          <input
            type="text"
            placeholder="Professional"

            value={
              language.levelLabel
            }

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

          {/* REMOVE */}

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
        {/* REFERENCES */}

        <div className="pt-10">
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

          <div className="space-y-5">
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
    </div>
  )
}