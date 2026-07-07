import SectionTitle from '../../shared/SectionTitle'
import Tag from '../../shared/Tag'
import GlassCard from '../../shared/GlassCard'
import ProgressBar from '../../shared/ProgressBar'
import { exportPdf } from '../../utils/exportPdf'

export default function MinimalClassic({
  cvData,
  darkMode,
  setDarkMode,
}) {
  const {
    personal = {},
    vendors = [],
    skills = [],
    experience = [],
    education = [],
    certifications = [],
    languages = [],
    references = [],
  } = cvData

  const socials = personal.socials || []

  return (
    <div
      className={`
        min-h-screen
        py-10
        px-4
        md:px-8
        transition-all
        duration-300

        ${
          darkMode
            ? 'bg-zinc-950'
            : 'bg-[#eef1f6]'
        }
      `}
    >
      <div
        className={`
          max-w-4xl
          mx-auto
          rounded-[36px]
          overflow-hidden
          shadow-[0_25px_80px_rgba(15,23,42,0.08)]

          ${
            darkMode
              ? 'bg-zinc-900 text-white'
              : 'bg-white text-black'
          }
        `}
      >
        {/* HEADER */}
        <div
          className={`
            relative
            px-8
            md:px-12
            py-12
            text-center

            ${
              darkMode
                ? 'bg-zinc-950'
                : 'bg-[#0f172a]'
            }
          `}
        >
          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className="
              absolute
              top-6
              right-6
              w-12
              h-12
              rounded-2xl
              bg-white/10
              text-white
              flex
              items-center
              justify-center
              hover:scale-105
              transition-all
            "
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          {personal.photo ? (
            <img
              src={personal.photo}
              alt={personal.name}
              className="
                w-28
                h-28
                mx-auto
                rounded-full
                object-cover
                border-4
                border-white/20
                shadow-xl
              "
              style={{
                objectPosition: `${
                  personal.photoPositionX ??
                  50
                }% ${
                  personal.photoPositionY ??
                  50
                }%`,
              }}
            />
          ) : (
            <div
              className="
                w-28
                h-28
                mx-auto
                rounded-full
                bg-white/10
                flex
                items-center
                justify-center
                text-white/40
                text-xs
              "
            >
              No Image
            </div>
          )}

          <h1 className="mt-5 text-4xl font-black text-white tracking-tight">
            {personal.name}
          </h1>

          <p className="mt-2 text-blue-300 font-semibold text-lg">
            {personal.title}
          </p>

          <div
            className="
              mt-5
              flex
              flex-wrap
              justify-center
              gap-4
              text-sm
              text-white/70
            "
          >
            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="hover:text-blue-300 transition-colors"
              >
                {personal.email}
              </a>
            )}

            {personal.phone && (
              <a
                href={`tel:${personal.phone}`}
                className="hover:text-blue-300 transition-colors"
              >
                {personal.phone}
              </a>
            )}

            {personal.address && (
              <span>{personal.address}</span>
            )}
          </div>

          {socials.length > 0 && (
            <div
              className="
                mt-4
                flex
                flex-wrap
                justify-center
                gap-3
              "
            >
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={`https://${s.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    px-3
                    py-1.5
                    rounded-full
                    bg-white/10
                    text-white/80
                    text-xs
                    font-semibold
                    hover:bg-white/20
                    transition-all
                  "
                >
                  {s.customPlatform ||
                    s.platform}
                </a>
              ))}
            </div>
          )}

          <button
            onClick={() =>
              exportPdf('cv-preview')
            }
            className="
              mt-7
              px-6
              py-3
              rounded-2xl
              bg-blue-500
              text-white
              font-semibold
              shadow-xl
              hover:-translate-y-1
              transition-all
            "
          >
            Download Resume
          </button>
        </div>

        {/* BODY */}
        <div className="px-8 md:px-12 py-10 space-y-10">
          {/* SUMMARY */}
          {personal.summary && (
            <section>
              <SectionTitle darkMode={darkMode}>
                Profile
              </SectionTitle>
              <p
                className={`
                  leading-8
                  ${
                    darkMode
                      ? 'text-zinc-300'
                      : 'text-zinc-600'
                  }
                `}
              >
                {personal.summary}
              </p>
            </section>
          )}

          {/* VENDORS */}
          {vendors.length > 0 && (
            <section>
              <SectionTitle darkMode={darkMode}>
                Vendor Stack
              </SectionTitle>
              <div className="flex flex-wrap gap-3">
                {vendors.map((v, i) => (
                  <Tag key={i} darkMode={darkMode}>
                    {v}
                  </Tag>
                ))}
              </div>
            </section>
          )}

          {/* EXPERIENCE */}
          {experience.length > 0 && (
            <section>
              <SectionTitle darkMode={darkMode}>
                Experience
              </SectionTitle>
              <div className="space-y-6">
                {experience.map((job, i) => (
                  <div key={i}>
                    <div className="flex flex-wrap justify-between gap-2">
                      <div>
                        <h3
                          className={`
                            text-lg
                            font-bold

                            ${
                              darkMode
                                ? 'text-white'
                                : 'text-zinc-900'
                            }
                          `}
                        >
                          {job.role}
                        </h3>
                        <p className="text-sm font-semibold text-blue-500">
                          {job.company}
                        </p>
                      </div>
                      <span
                        className={`
                          text-xs
                          font-bold
                          h-fit

                          ${
                            darkMode
                              ? 'text-zinc-400'
                              : 'text-zinc-500'
                          }
                        `}
                      >
                        {job.duration}
                      </span>
                    </div>
                    <p
                      className={`
                        mt-2
                        leading-7

                        ${
                          darkMode
                            ? 'text-zinc-300'
                            : 'text-zinc-600'
                        }
                      `}
                    >
                      {job.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {job.tags?.map((t, ti) => (
                        <Tag key={ti} darkMode={darkMode}>
                          {t}
                        </Tag>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SKILLS */}
          {skills.length > 0 && (
            <section>
              <SectionTitle darkMode={darkMode}>
                Skills
              </SectionTitle>
              <div className="grid md:grid-cols-2 gap-5">
                {skills.map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2 text-sm font-semibold">
                      <span>
                        {skill.icon} {skill.name}
                      </span>
                      <span className="text-blue-500">
                        {skill.level}%
                      </span>
                    </div>
                    <ProgressBar
                      value={skill.level}
                      darkMode={darkMode}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* EDUCATION */}
          {education.length > 0 && (
            <section>
              <SectionTitle darkMode={darkMode}>
                Education
              </SectionTitle>
              <div className="space-y-4">
                {education.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-wrap justify-between gap-2"
                  >
                    <div>
                      <h3
                        className={`
                          font-bold

                          ${
                            darkMode
                              ? 'text-white'
                              : 'text-zinc-900'
                          }
                        `}
                      >
                        {item.degree}
                      </h3>
                      <p
                        className={`
                          text-sm

                          ${
                            darkMode
                              ? 'text-zinc-300'
                              : 'text-zinc-600'
                          }
                        `}
                      >
                        {item.institute} · {item.duration}
                      </p>
                    </div>
                    {item.result && (
                      <span className="text-xs font-bold text-blue-500 h-fit">
                        {item.result}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* CERTIFICATIONS */}
          {certifications.length > 0 && (
            <section>
              <SectionTitle darkMode={darkMode}>
                Certifications
              </SectionTitle>
              <div className="flex flex-wrap gap-3">
                {certifications.map((cert, i) => (
                  <Tag key={i} darkMode={darkMode}>
                    🏆 {cert.title}
                  </Tag>
                ))}
              </div>
            </section>
          )}

          {/* LANGUAGES */}
          {languages.length > 0 && (
            <section>
              <SectionTitle darkMode={darkMode}>
                Languages
              </SectionTitle>
              <div className="grid md:grid-cols-2 gap-5">
                {languages.map((lang, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2 text-sm font-semibold">
                      <span>{lang.name}</span>
                      <span className="text-blue-500">
                        {lang.levelLabel}
                      </span>
                    </div>
                    <ProgressBar
                      value={lang.level}
                      darkMode={darkMode}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* REFERENCES */}
          {references.length > 0 && (
            <section>
              <SectionTitle darkMode={darkMode}>
                References
              </SectionTitle>
              <div className="grid md:grid-cols-2 gap-4">
                {references.map((ref, i) => (
                  <GlassCard
                    key={i}
                    darkMode={darkMode}
                    className="p-5"
                  >
                    <h3
                      className={`
                        font-bold
                        mb-1

                        ${
                          darkMode
                            ? 'text-white'
                            : 'text-zinc-900'
                        }
                      `}
                    >
                      {ref.name}
                    </h3>
                    <p
                      className={`
                        text-sm
                        mb-2

                        ${
                          darkMode
                            ? 'text-zinc-300'
                            : 'text-zinc-600'
                        }
                      `}
                    >
                      {ref.company}
                    </p>
                    {ref.phone && (
                      <p className="text-xs text-blue-500 font-semibold">
                        {ref.phone}
                      </p>
                    )}
                    {ref.email && (
                      <p
                        className={`
                          text-xs

                          ${
                            darkMode
                              ? 'text-zinc-400'
                              : 'text-zinc-500'
                          }
                        `}
                      >
                        {ref.email}
                      </p>
                    )}
                  </GlassCard>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
