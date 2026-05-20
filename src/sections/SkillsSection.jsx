export default function SkillsSection({
  skills,
  darkMode,
}) {
  return (
    <section
      className="
        rounded-[28px]

        bg-white/[0.035]

        border
        border-white/5

        p-5
      "
    >
      {/* SECTION HEADER */}

      <div className="mb-5">
        <p
          className="
            text-xs
            uppercase
            tracking-[0.18em]

            text-white/40

            mb-2
          "
        >
          Expertise
        </p>

        <h2
          className="
            text-xl
            font-bold
            text-white
          "
        >
          Skills
        </h2>
      </div>

      {/* SKILLS LIST */}

      <div className="space-y-4">
        {skills.map(
          (skill, index) => (
            <div
              key={index}
              className="
                rounded-2xl

                bg-white/[0.025]

                border
                border-white/[0.04]

                p-4

                transition-all
                duration-300
              "
            >
              {/* TOP */}

              <div
                className="
                  flex
                  items-center
                  justify-between

                  mb-3
                "
              >
                {/* LEFT */}

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >
                  {/* ICON */}

                  {skill.icon && (
                    <div
                      className="
                        text-xl
                      "
                    >
                      {skill.icon}
                    </div>
                  )}

                  {/* NAME */}

                  <div>
                    <h3
                      className="
                        text-sm
                        font-semibold
                        text-white
                      "
                    >
                      {skill.name}
                    </h3>

                    {skill.description && (
                      <p
                        className="
                          text-xs
                          text-white/45
                          mt-1
                        "
                      >
                        {
                          skill.description
                        }
                      </p>
                    )}
                  </div>
                </div>

                {/* LEVEL */}

                <div
                  className="
                    text-xs
                    font-bold

                    px-2
                    py-1

                    rounded-full

                    bg-blue-500/15
                    text-blue-200
                  "
                >
                  {skill.level}%
                </div>
              </div>

              {/* PROGRESS TRACK */}

              <div
                className="
                  relative

                  h-2.5

                  overflow-hidden

                  rounded-full

                  bg-white/5
                "
              >
                {/* GLOW */}

                <div
                  className="
                    absolute
                    inset-y-0
                    left-0

                    blur-md

                    bg-blue-400/50
                  "
                  style={{
                    width: `${skill.level}%`,
                  }}
                />

                {/* BAR */}

                <div
                  className="
                    relative
                    h-full

                    rounded-full

                    bg-gradient-to-r
                    from-blue-500
                    to-blue-300
                  "
                  style={{
                    width: `${skill.level}%`,
                  }}
                />
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}