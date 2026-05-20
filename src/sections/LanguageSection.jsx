export default function LanguageSection({
  languages,
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
      {/* HEADER */}

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
          Communication
        </p>

        <h2
          className="
            text-xl
            font-bold
            text-white
          "
        >
          Languages
        </h2>
      </div>

      {/* LANGUAGE LIST */}

      <div className="space-y-4">
        {languages.map(
          (language, index) => (
            <div
              key={index}
              className="
                rounded-2xl

                bg-white/[0.025]

                border
                border-white/[0.04]

                p-4
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
                {/* NAME */}

                <h3
                  className="
                    text-sm
                    font-semibold
                    text-white
                  "
                >
                  {language.name}
                </h3>

                {/* LEVEL */}

                <div
                  className="
                    text-xs
                    font-bold

                    px-2
                    py-1

                    rounded-full

                    bg-emerald-500/15
                    text-emerald-200

                    border
                    border-emerald-400/10
                  "
                >
                  {language.levelLabel}
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

                    bg-emerald-400/40
                  "
                  style={{
                    width: `${language.progress}%`,
                  }}
                />

                {/* BAR */}

                <div
                  className="
                    relative
                    h-full

                    rounded-full

                    bg-gradient-to-r
                    from-emerald-500
                    to-emerald-300
                  "
                  style={{
                    width: `${language.progress}%`,
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