import SectionTitle from '../../shared/SectionTitle'
import Tag from '../../shared/Tag'
import GlassCard from '../../shared/GlassCard'
import { exportPdf } from '../../utils/exportPdf'

export default function CreativeGradient({
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

        ${darkMode ? 'bg-zinc-950' : 'bg-[#f2f0ff]'}
      `}
    >
      <div
        className={`
          max-w-4xl
          mx-auto
          rounded-[36px]
          overflow-hidden
          shadow-[0_25px_80px_rgba(124,58,237,0.15)]

          ${darkMode ? 'bg-zinc-900 text-white' : 'bg-white text-black'}
        `}
      >
        {/* HEADER */}
        <div
          className="
            relative
            px-8 md:px-12 py-14
            text-center
            bg-gradient-to-br
            from-fuchsia-500
            via-purple-500
            to-indigo-500
          "
        >
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="
              absolute top-6 right-6
              w-12 h-12
              rounded-2xl
              bg-white/15
              text-white
              flex items-center justify-center
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
                w-28 h-28
                mx-auto
                rounded-full
                object-cover
                border-4 border-white/50
                shadow-xl
              "
              style={{
                objectPosition: `${personal.photoPositionX ?? 50}% ${
                  personal.photoPositionY ?? 50
                }%`,
              }}
            />
          ) : (
            <div
              className="
                w-28 h-28
                mx-auto
                rounded-full
                bg-white/20
                flex items-center justify-center
                text-white/70
                text-xs
              "
            >
              No Image
            </div>
          )}

          <h1 className="mt-5 text-4xl font-black text-white tracking-tight">
            {personal.name}
          </h1>

          <p className="mt-2 text-white/90 font-bold text-lg">
            {personal.title}
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-3 text-sm">
            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="
                  px-3 py-1.5 rounded-full
                  bg-white/15 text-white
                  hover:bg-white/25 transition-all
                "
              >
                {personal.email}
              </a>
            )}
            {personal.phone && (
              <a
                href={`tel:${personal.phone}`}
                className="
                  px-3 py-1.5 rounded-full
                  bg-white/15 text-white
                  hover:bg-white/25 transition-all
                "
              >
                {personal.phone}
              </a>
            )}
            {personal.address && (
              <span className="px-3 py-1.5 rounded-full bg-white/15 text-white">
                {personal.address}
              </span>
            )}
          </div>

          {socials.length > 0 && (
            <div className="mt-3 flex flex-wrap justify-center gap-3">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={`https://${s.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-white/80 hover:text-white transition-colors"
                >
                  {s.customPlatform || s.platform} ↗
                </a>
              ))}
            </div>
          )}

          <button
            onClick={() => exportPdf('cv-preview')}
            className="
              mt-8 px-7 py-3
              rounded-full
              bg-white
              text-purple-600
              font-bold
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
          {personal.summary && (
            <section>
              <SectionTitle darkMode={darkMode}>About Me</SectionTitle>
              <p
                className={`leading-8 ${
                  darkMode ? 'text-zinc-300' : 'text-zinc-600'
                }`}
              >
                {personal.summary}
              </p>
            </section>
          )}

          {vendors.length > 0 && (
            <section>
              <SectionTitle darkMode={darkMode}>Toolbox</SectionTitle>
              <div className="flex flex-wrap gap-3">
                {vendors.map((v, i) => (
                  <span
                    key={i}
                    className="
                      px-4 py-2 rounded-full
                      text-xs font-bold
                      bg-gradient-to-r from-fuchsia-500/10 to-indigo-500/10
                      text-purple-600
                      border border-purple-200
                    "
                  >
                    {v}
                  </span>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <SectionTitle darkMode={darkMode}>Skills</SectionTitle>
              <div className="grid sm:grid-cols-2 gap-4">
                {skills.map((skill, i) => (
                  <GlassCard
                    key={i}
                    darkMode={darkMode}
                    className="p-4 flex items-center justify-between"
                  >
                    <span className="font-semibold">
                      {skill.icon} {skill.name}
                    </span>
                    <span
                      className="
                        text-xs font-black
                        px-2.5 py-1 rounded-full
                        bg-gradient-to-r from-fuchsia-500 to-indigo-500
                        text-white
                      "
                    >
                      {skill.level}%
                    </span>
                  </GlassCard>
                ))}
              </div>
            </section>
          )}

          {experience.length > 0 && (
            <section>
              <SectionTitle darkMode={darkMode}>Experience</SectionTitle>
              <div className="space-y-6">
                {experience.map((job, i) => (
                  <GlassCard key={i} darkMode={darkMode} className="p-6">
                    <div className="flex flex-wrap justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-bold">{job.role}</h3>
                        <p className="text-sm font-semibold text-purple-500">
                          {job.company}
                        </p>
                      </div>
                      <span
                        className={`text-xs font-bold h-fit ${
                          darkMode ? 'text-zinc-400' : 'text-zinc-500'
                        }`}
                      >
                        {job.duration}
                      </span>
                    </div>
                    <p
                      className={`mt-2 leading-7 ${
                        darkMode ? 'text-zinc-300' : 'text-zinc-600'
                      }`}
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
                  </GlassCard>
                ))}
              </div>
            </section>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            {education.length > 0 && (
              <section>
                <SectionTitle darkMode={darkMode}>Education</SectionTitle>
                <div className="space-y-4">
                  {education.map((item, i) => (
                    <div key={i}>
                      <h3 className="font-bold">{item.degree}</h3>
                      <p
                        className={`text-sm ${
                          darkMode ? 'text-zinc-300' : 'text-zinc-600'
                        }`}
                      >
                        {item.institute} · {item.duration}
                      </p>
                      {item.result && (
                        <p className="text-xs font-bold text-purple-500 mt-0.5">
                          {item.result}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

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
          </div>

          {languages.length > 0 && (
            <section>
              <SectionTitle darkMode={darkMode}>Languages</SectionTitle>
              <div className="flex flex-wrap gap-3">
                {languages.map((lang, i) => (
                  <span
                    key={i}
                    className="
                      px-4 py-2 rounded-full
                      text-xs font-bold
                      bg-gradient-to-r from-fuchsia-500/10 to-indigo-500/10
                      text-purple-600
                      border border-purple-200
                    "
                  >
                    {lang.name} · {lang.levelLabel}
                  </span>
                ))}
              </div>
            </section>
          )}

          {references.length > 0 && (
            <section>
              <SectionTitle darkMode={darkMode}>References</SectionTitle>
              <div className="grid md:grid-cols-2 gap-4">
                {references.map((ref, i) => (
                  <GlassCard key={i} darkMode={darkMode} className="p-5">
                    <h3 className="font-bold mb-1">{ref.name}</h3>
                    <p
                      className={`text-sm mb-2 ${
                        darkMode ? 'text-zinc-300' : 'text-zinc-600'
                      }`}
                    >
                      {ref.company}
                    </p>
                    {ref.phone && (
                      <p className="text-xs text-purple-500 font-semibold">
                        {ref.phone}
                      </p>
                    )}
                    {ref.email && (
                      <p
                        className={`text-xs ${
                          darkMode ? 'text-zinc-400' : 'text-zinc-500'
                        }`}
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
