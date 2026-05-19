import EducationCard from '../cards/EducationCard'

import SectionTitle from '../shared/SectionTitle'

export default function EducationSection({
  education,

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
        Education
      </SectionTitle>

      <div className="space-y-4">
        {education.map(
          (item, index) => (
            <EducationCard
              key={index}
              degree={item.degree}
              institute={
                item.institute
              }
              duration={
                item.duration
              }
              result={item.result}
              darkMode={darkMode}
            />
          )
        )}
      </div>
    </section>
  )
}