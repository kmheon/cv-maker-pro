import SectionTitle from '../../shared/SectionTitle'
import Tag from '../../shared/Tag'
import GlassCard from '../../shared/GlassCard'
import { exportPdf } from '../../utils/exportPdf'

export default function ExecutiveElite({
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

        ${darkMode ? 'bg-black' : 'bg-[#e9eaee]'}
      `}
    >
      <div
        className={`
          max-w-5xl
          mx-auto
          rounded-[32px]
          overflow-hidden
          shadow-[0_25px_80px_rgba(0,0,0,0.25)]
          grid
          md:grid-cols-[300px_1fr]

          ${darkMode ? 'bg-zinc-900' : 'bg-white'}
        `}
      >
        {/* SIDEBAR */}
        <div
          className="
            bg-[#111318]
            text-white
            p-8
            relative
          "
        >
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="
              absolute top-6 right-6
              w-10 h-10
              rounded-xl
              bg-white/10
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
                w-24 h-24
                rounded-2xl
                object-cover
                border-2 border-amber-400/40
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
                w-24 h-24
                rounded-2xl
                bg-white/10
                flex items-center justify-center
                text-white/40
                text-xs
              "
            >
              No Image
            </div>
          )}

          <h1 className="mt-5 text-2xl font-black tracking-tight leading-tight">
            {personal.name}
          </h1>

          <p className="mt-1 text-amber-400 text-sm font-bold uppercase tracking-wide">
            {personal.title}
          </p>

          <div className="mt-6 space-y-2 text-sm text-white/70">
            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="block hover:text-amber-400 transition-colors"
              >
                ✉ {personal.email}
              </a>
            )}
            {personal.phone && (
              <a
                href={`tel:${personal.phone}`}
                className="block hover:text-amber-400 transition-colors"
              >
                ☎ {personal.phone}
              </a>
            )}
            {personal.address && (
              <p>📍 {personal.address}</p>
            )}
          </div>

          {socials.length > 0 && (
            <div className="mt-5 flex flex-col gap-2">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={`https://${s.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    text-xs font-semibold
                    text-white/60
                    hover:text-amber-400
                    transition-colors
                  "
                >
                  {s.customPlatform || s.platform} ↗
                </a>
              ))}
            </div>
          )}

          {skills.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xs font-black uppercase tracking-widest text-white/50 mb-4">
                Core Skills
              </h3>
              <div className="space-y-4">
                {skills.map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs font-semibold mb-1.5">
                      <span>
                        {skill.icon} {skill.name}
                      </span>
                      <span className="text-amber-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xs font-black uppercase tracking-widest text-white/50 mb-4">
                Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang, i) => (
                  <span
                    key={i}
                    className="
                      px-3 py-1.5
                      rounded-lg
                      bg-white/10
                      text-xs font-semibold
                    "
                  >
                    {lang.name} · {lang.levelLabel}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => exportPdf('cv-preview')}
            className="
              mt-9 w-full
              py-3 rounded-xl
              bg-amber-400
              text-black
              font-bold
              hover:bg-amber-300
              transition-all
            "
          >
            Download Resume
          </button>
        </div>

        {/* MAIN */}
        <div
          className={`
            p-8 md:p-10
            space-y-9

            ${darkMode ? 'text-white' : 'text-black'}
          `}
        >
          {personal.summary && (
            <section>
              <SectionTitle darkMode={darkMode}>
                Executive Summary
              </SectionTitle>
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

          {experience.length > 0 && (
            <section>
              <SectionTitle darkMode={darkMode}>
                Experience
              </SectionTitle>
              <div className="space-y-7">
                {experience.map((job, i) => (
                  <div
                    key={i}
                    className={`
                      pl-5
                      border-l-2
                      ${darkMode ? 'border-amber-400/40' : 'border-amber-400'}
                    `}
                  >
                    <div className="flex flex-wrap justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-bold">
                          {job.role}
                        </h3>
                        <p className="text-sm font-semibold text-amber-500">
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
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            {education.length > 0 && (
              <section>
                <SectionTitle darkMode={darkMode}>
                  Education
                </SectionTitle>
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
                        <p className="text-xs font-bold text-amber-500 mt-0.5">
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

          {references.length > 0 && (
            <section>
              <SectionTitle darkMode={darkMode}>
                References
              </SectionTitle>
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
                      <p className="text-xs text-amber-500 font-semibold">
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
