import Sidebar from '../../layouts/Sidebar'

import HeroSection from '../../layouts/HeroSection'

import SkillsSection from '../../sections/SkillsSection'

import LanguageSection from '../../sections/LanguageSection'

import SocialSection from '../../sections/SocialSection'

import ExperienceSection from '../../sections/ExperienceSection'

import EducationSection from '../../sections/EducationSection'

import CertificationSection from '../../sections/CertificationSection'

import ReferenceSection from '../../sections/ReferenceSection'

export default function ModernGlass({
  cvData,
  darkMode,
  setDarkMode,
}) {
  const {
    personal = {},
    skills = [],
    experience = [],
    education = [],
    certifications = [],
    languages = [],
    references = [],
    vendors = [],
  } = cvData

  return (
    <div
      className="
        min-h-screen
        bg-[#e9edf5]
        py-10
        px-4
        md:px-8
      "
    >
      {/* MAIN RESUME SHELL */}

      <div
        className="
          max-w-7xl
          mx-auto
          rounded-[36px]
          overflow-hidden

          bg-white

          shadow-[0_25px_80px_rgba(15,23,42,0.08)]
        "
      >
        {/* STRUCTURE */}

        <div
          className="
            grid
            lg:grid-cols-[320px_1fr]
          "
        >
          {/* SIDEBAR FOUNDATION */}

          <div
            className="
              bg-[#07152d]
              min-h-full
            "
          >
            <Sidebar
              photo={personal.photo}
              photoPositionX={
                personal.photoPositionX
              }
              photoPositionY={
                personal.photoPositionY
              }
              darkMode={darkMode}
              personal={personal}
            >
              <SkillsSection
                skills={skills}
                darkMode={darkMode}
              />

              <LanguageSection
                languages={languages}
                darkMode={darkMode}
              />
              <SocialSection
                socials={
                  personal.socials ||
                  []
                }
/>
            </Sidebar>
          </div>

          {/* MAIN CONTENT FOUNDATION */}

          <div
            className="
              bg-[#f8fafc]
              px-6
              md:px-10
              py-8
            "
          >
            <div className="space-y-6">
              {/* HERO */}

              <HeroSection
                name={personal.name}
                title={personal.title}
                summary={personal.summary}
                vendors={vendors}
                darkMode={darkMode}
                setDarkMode={
                  setDarkMode
                }
              />

              {/* EXPERIENCE */}

              <ExperienceSection
                experience={experience}
                darkMode={darkMode}
              />

              {/* CERTIFICATIONS */}

              <CertificationSection
                certifications={
                  certifications
                }
                darkMode={darkMode}
              />

              {/* EDUCATION */}

              <EducationSection
                education={education}
                darkMode={darkMode}
              />

              {/* REFERENCES */}

              <ReferenceSection
                references={references}
                darkMode={darkMode}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}