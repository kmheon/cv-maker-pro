import MainLayout from '../../layouts/MainLayout'

import Sidebar from '../../layouts/Sidebar'

import HeroSection from '../../layouts/HeroSection'

import SkillsSection from '../../sections/SkillsSection'

import LanguageSection from '../../sections/LanguageSection'

import ExperienceSection from '../../sections/ExperienceSection'

import EducationSection from '../../sections/EducationSection'

import CertificationSection from '../../sections/CertificationSection'

import ReferenceSection from '../../sections/ReferenceSection'

export default function ModernGlass({
  data,

  darkMode,

  setDarkMode,
}) {
  return (
    <MainLayout>
      {/* SIDEBAR */}

      <Sidebar
        photo={data.personal.photo}
        photoPositionX={
          data.personal
            .photoPositionX
        }
        photoPositionY={
          data.personal
            .photoPositionY
        }
        darkMode={darkMode}
        personal={data.personal}
      >
        <SkillsSection
          skills={data.skills}
          darkMode={darkMode}
        />

        <LanguageSection
          languages={
            data.languages
          }
          darkMode={darkMode}
        />
      </Sidebar>

      {/* MAIN CONTENT */}

      <div className="space-y-6">
        <HeroSection
          name={data.personal.name}
          title={data.personal.title}
          summary={data.personal.summary}
          vendors={data.vendors}
          darkMode={darkMode}
          setDarkMode={
            setDarkMode
          }
        />

        <ExperienceSection
          experience={
            data.experience
          }
          darkMode={darkMode}
        />

        <CertificationSection
          certifications={
            data.certifications
          }
          darkMode={darkMode}
        />

        <EducationSection
          education={
            data.education
          }
          darkMode={darkMode}
        />

        <ReferenceSection
          references={
            data.references
          }
          darkMode={darkMode}
        />
      </div>
    </MainLayout>
  )
}