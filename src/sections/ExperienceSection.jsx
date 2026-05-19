import SectionTitle from '../shared/SectionTitle'

import Tag from '../shared/Tag'

export default function ExperienceSection({
  experience,

  darkMode = false,
}) {
  return (
    <section
      className={`
        rounded-[32px]
        p-8
        transition-all
        duration-300

        ${
          darkMode
            ? 'bg-zinc-900 text-white'
            : 'bg-white text-black'
        }
      `}
    >
      {/* SECTION TITLE */}

      <SectionTitle
        darkMode={darkMode}
      >
        Experience
      </SectionTitle>

      {/* TIMELINE */}

      <div className="space-y-10">
        {experience.map(
          (item, index) => (
            <div
              key={index}
              className="
                relative
                pl-10
                group
                transition-all
                duration-300
                hover:translate-x-1
              "
            >
              {/* TIMELINE LINE */}

              <div
                className="
                  absolute
                  left-[7px]
                  top-0
                  bottom-0
                  w-[2px]
                  bg-blue-500/20
                "
              />

              {/* ACTIVE LINE GLOW */}

              <div
                className="
                  absolute
                  left-[7px]
                  top-0
                  h-full
                  w-[2px]
                  bg-gradient-to-b
                  from-blue-400
                  to-blue-600
                  scale-y-0
                  origin-top
                  transition-all
                  duration-500
                  group-hover:scale-y-100
                "
              />

              {/* TIMELINE DOT */}

              <div
                className="
                  absolute
                  left-0
                  top-1
                  w-4
                  h-4
                  rounded-full
                  bg-blue-500
                  border-4
                  border-white
                  shadow-lg
                  transition-all
                  duration-300
                  group-hover:scale-125
                  group-hover:shadow-blue-500/50
                "
              />

              {/* CARD */}

              <div
                className={`
                  rounded-3xl
                  border
                  p-6
                  transition-all
                  duration-300

                  ${
                    darkMode
                      ? `
                        bg-zinc-800
                        border-zinc-700
                        hover:border-blue-500/40
                      `
                      : `
                        bg-zinc-50
                        border-zinc-100
                        hover:border-blue-200
                      `
                  }

                  hover:shadow-2xl
                `}
              >
                {/* HEADER */}

                <div
                  className="
                    flex
                    flex-wrap
                    justify-between
                    gap-4
                    mb-4
                  "
                >
                  <div>
                    <h3
                      className={`
                        text-xl
                        font-bold
                        mb-1

                        ${
                          darkMode
                            ? 'text-white'
                            : 'text-zinc-900'
                        }
                      `}
                    >
                      {item.role}
                    </h3>

                    <p
                      className={`
                        text-sm
                        font-semibold

                        ${
                          darkMode
                            ? 'text-blue-400'
                            : 'text-blue-600'
                        }
                      `}
                    >
                      {item.company}
                    </p>
                  </div>

                  {/* DURATION */}

                  <div
                    className={`
                      h-fit
                      px-4
                      py-2
                      rounded-2xl
                      text-xs
                      font-bold
                      whitespace-nowrap

                      ${
                        darkMode
                          ? `
                            bg-zinc-700
                            text-zinc-300
                          `
                          : `
                            bg-white
                            text-zinc-600
                          `
                      }
                    `}
                  >
                    {item.duration}
                  </div>
                </div>

                {/* DESCRIPTION */}

                <p
                  className={`
                    leading-7
                    mb-5

                    ${
                      darkMode
                        ? 'text-zinc-300'
                        : 'text-zinc-600'
                    }
                  `}
                >
                  {item.description}
                </p>

                {/* TAGS */}

                <div
                  className="
                    flex
                    flex-wrap
                    gap-3
                  "
                >
                  {item.tags?.map(
                    (
                      tag,
                      tagIndex
                    ) => (
                      <Tag
                        key={tagIndex}
                        darkMode={
                          darkMode
                        }
                      >
                        {tag}
                      </Tag>
                    )
                  )}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}