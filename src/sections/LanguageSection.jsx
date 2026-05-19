import GlassCard from '../shared/GlassCard'

import ProgressBar from '../shared/ProgressBar'

import SectionTitle from '../shared/SectionTitle'

export default function LanguageSection({
  languages,

  darkMode = false,
}) {
  return (
    <section className="space-y-5">
      <SectionTitle
        darkMode={darkMode}
      >
        Languages
      </SectionTitle>

      <div className="space-y-4">
        {languages.map(
          (
            language,
            index
          ) => (
            <GlassCard
              key={index}
              darkMode={darkMode}
              className="p-4"
            >
              {/* TOP */}

              <div
                className="
                  flex
                  justify-between
                  items-center
                  mb-3
                "
              >
                <h3
                  className={`
                    font-semibold
                    text-sm

                    ${
                      darkMode
                        ? 'text-white'
                        : 'text-zinc-900'
                    }
                  `}
                >
                  {language.name}
                </h3>

                <span
                  className="
                    text-xs
                    px-2
                    py-1
                    rounded-full
                    bg-blue-500/20
                    text-blue-500
                    font-bold
                  "
                >
                  {language.levelLabel}
                </span>
              </div>

              {/* BAR */}

              <ProgressBar
                value={language.level}
                darkMode={darkMode}
              />
            </GlassCard>
          )
        )}
      </div>
    </section>
  )
}