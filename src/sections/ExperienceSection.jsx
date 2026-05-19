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
      <SectionTitle
        darkMode={darkMode}
      >
        Experience
      </SectionTitle>

      <div className="space-y-10">
        {experience.map(
          (item, index) => (
            <div
              key={index}
              className="
                relative
                pl-8
              "
            >
              {/* TIMELINE */}

              <div
                className="
                  absolute
                  left-0
                  top-1
                  bottom-0
                  w-px
                  bg-blue-500/30
                "
              />

              <div
                className="
                  absolute
                  left-[-5px]
                  top-1
                  w-3
                  h-3
                  rounded-full
                  bg-blue-500
                "
              />

              {/* HEADER */}

              <div
                className="
                  flex
                  flex-wrap
                  justify-between
                  gap-4
                  mb-3
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

                <div
                  className={`
                    h-fit
                    px-4
                    py-2
                    rounded-2xl
                    text-sm
                    font-semibold

                    ${
                      darkMode
                        ? `
                          bg-zinc-800
                          text-zinc-300
                        `
                        : `
                          bg-zinc-100
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
          )
        )}
      </div>
    </section>
  )
}