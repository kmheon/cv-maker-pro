import CertificateCard from '../cards/CertificateCard'

import SectionTitle from '../shared/SectionTitle'

export default function CertificationSection({
  certifications,

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
        Certifications
      </SectionTitle>

      <div
        className="
          grid
          md:grid-cols-2
          gap-4
        "
      >
        {certifications.map(
          (cert, index) => (
            <CertificateCard
              key={index}
              title={cert.title}
              darkMode={darkMode}
            />
          )
        )}
      </div>
    </section>
  )
}