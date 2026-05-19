import ReferenceCard from '../cards/ReferenceCard'

import SectionTitle from '../shared/SectionTitle'

export default function ReferenceSection({
  references,
  darkMode = false,
}) {
  return (
    <section className="space-y-5">
      <SectionTitle
        darkMode={darkMode}
      >
        References
      </SectionTitle>

      <div className="space-y-4">
        {references.map(
          (reference, index) => (
            <ReferenceCard
              key={index}
              name={reference.name}
              company={
                reference.company
              }
              phone={
                reference.phone
              }
              email={
                reference.email
              }
              darkMode={darkMode}
            />
          )
        )}
      </div>
    </section>
  )
}