const socialStyles = {
  LinkedIn:
    'bg-[#0A66C2]/15 text-[#70B5F9] border-[#0A66C2]/20',

  GitHub:
    'bg-white/10 text-white border-white/10',

  Facebook:
    'bg-[#1877F2]/15 text-[#6CA8FF] border-[#1877F2]/20',

  Twitter:
    'bg-sky-500/15 text-sky-300 border-sky-500/20',

  Instagram:
    'bg-pink-500/15 text-pink-300 border-pink-500/20',

  Portfolio:
    'bg-violet-500/15 text-violet-300 border-violet-500/20',

  YouTube:
    'bg-red-500/15 text-red-300 border-red-500/20',

  Behance:
    'bg-blue-500/15 text-blue-300 border-blue-500/20',

  Dribbble:
    'bg-pink-500/15 text-pink-300 border-pink-500/20',

  Fiverr:
    'bg-green-500/15 text-green-300 border-green-500/20',

  Upwork:
    'bg-emerald-500/15 text-emerald-300 border-emerald-500/20',
}

const socialIcons = {
  LinkedIn: 'in',

  GitHub: '{}',

  Facebook: 'f',

  Twitter: '𝕏',

  Instagram: '◎',

  Portfolio: '◈',

  YouTube: '▶',

  Behance: 'Be',

  Dribbble: '◉',

  Fiverr: 'fi',

  Upwork: 'Up',
}

export default function SocialSection({
  socials = [],
}) {
  return (
    <section
      className="
        rounded-[28px]

        bg-white/[0.035]

        border
        border-white/5

        p-5
      "
    >
      {/* HEADER */}

      <div className="mb-5">
        <p
          className="
            text-xs
            uppercase
            tracking-[0.18em]

            text-white/40

            mb-2
          "
        >
          Presence
        </p>

        <h2
          className="
            text-xl
            font-bold
            text-white
          "
        >
          Social
        </h2>
      </div>

      {/* LIST */}

      <div className="space-y-3">
        {socials.map(
          (social, index) => {
            const platform =
              social.customPlatform ||
              social.platform

            const style =
              socialStyles[
                platform
              ] ||
              'bg-white/10 text-white border-white/10'

            const generatedIcon =
              platform
                ?.split(' ')
                .map((word) =>
                  word[0]
                )
                .join('')
                .slice(0, 2)
                .toUpperCase()

            const icon =
              socialIcons[
                platform
              ] ||
              generatedIcon

            return (
              <a
                key={index}
                href={`https://${social.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  flex
                  items-center
                  gap-4

                  rounded-2xl

                  border

                  p-4

                  transition-all
                  duration-300

                  hover:scale-[1.02]

                  ${style}
                `}
              >
                {/* ICON */}

                <div
                  className="
                    w-11
                    h-11

                    rounded-xl

                    bg-black/10

                    flex
                    items-center
                    justify-center

                    text-lg
                    font-bold
                  "
                >
                  {icon}
                </div>

                {/* INFO */}

                <div className="min-w-0">
                  <h3
                    className="
                      text-sm
                      font-semibold
                    "
                  >
                    {platform}
                  </h3>

                  <p
                    className="
                      text-xs
                      opacity-70

                      truncate

                      mt-1
                    "
                  >
                    {social.url}
                  </p>
                </div>
              </a>
            )
          }
        )}
      </div>
    </section>
  )
}