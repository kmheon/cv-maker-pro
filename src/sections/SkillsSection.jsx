import SkillCard from '../cards/SkillCard'

import SectionTitle from '../shared/SectionTitle'

export default function SkillsSection({
  skills,
  darkMode = false,
}) {
  return (
    <section className="space-y-5">
      <SectionTitle
        darkMode={darkMode}
      >
        Skills
      </SectionTitle>

      <div className="space-y-4">
        {skills.map(
          (skill, index) => (
            <SkillCard
  key={index}
  name={skill.name}
  level={skill.level}
  description={
    skill.description
  }
  icon={skill.icon}
  color={skill.color}
  darkMode={darkMode}
/>
          )
        )}
      </div>
    </section>
  )
}