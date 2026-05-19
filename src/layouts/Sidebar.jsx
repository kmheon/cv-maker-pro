import GlassCard from '../shared/GlassCard'

export default function Sidebar({
  photo,

  photoPositionX = 50,

  photoPositionY = 50,

  personal,

  darkMode = false,

  children,
}) {
  return (
    <div className="space-y-6">
      {/* PROFILE */}

      <GlassCard
        darkMode={darkMode}
        className="
          p-6
          sticky
          top-6
        "
      >
        {/* IMAGE */}

        <div
          className="
            relative
            mb-6
          "
        >
          {/* GLOW */}

          <div
            className="
              absolute
              inset-0
              rounded-[32px]
              bg-blue-500/20
              blur-2xl
              scale-95
            "
          />

          {/* FRAME */}

          <div
            className="
              relative
              rounded-[32px]
              overflow-hidden
              border
              border-white/10
              aspect-[4/5]
              shadow-2xl
            "
          >
            {photo ? (
              <img
                src={photo}
                alt={personal.name}
                className="
                  w-full
                  h-full
                  object-cover
                "
                style={{
                  objectPosition: `${photoPositionX}% ${photoPositionY}%`,
                }}
              />
            ) : (
              <div
                className={`
                  w-full
                  h-full
                  flex
                  items-center
                  justify-center
                  text-sm
                  text-center
                  p-6

                  ${
                    darkMode
                      ? 'bg-[#111c31] text-zinc-500'
                      : 'bg-zinc-100 text-zinc-500'
                  }
                `}
              >
                Upload a professional
                portrait image
                <br />
                <br />
                Recommended:
                <br />
                1000x1200+
              </div>
            )}
          </div>
        </div>

        {/* CONTACT */}

        <div className="space-y-4">
          {/* PHONE */}

          {personal.phone && (
            <div
              className={`
                rounded-2xl
                px-4
                py-3
                border
                transition-all
                duration-300

                ${
                  darkMode
                    ? `
                      bg-[#111c31]
                      border-white/5
                    `
                    : `
                      bg-zinc-50
                      border-zinc-100
                    `
                }

                hover:-translate-y-1
                hover:shadow-xl
              `}
            >
              <div
                className="
                  text-xs
                  uppercase
                  tracking-wider
                  text-blue-400
                  font-bold
                  mb-1
                "
              >
                Phone
              </div>

              <div
                className={`
                  text-sm
                  font-semibold

                  ${
                    darkMode
                      ? 'text-white'
                      : 'text-zinc-800'
                  }
                `}
              >
                {personal.phone}
              </div>
            </div>
          )}

          {/* EMAIL */}

          {personal.email && (
            <div
              className={`
                rounded-2xl
                px-4
                py-3
                border
                transition-all
                duration-300

                ${
                  darkMode
                    ? `
                      bg-[#111c31]
                      border-white/5
                    `
                    : `
                      bg-zinc-50
                      border-zinc-100
                    `
                }

                hover:-translate-y-1
                hover:shadow-xl
              `}
            >
              <div
                className="
                  text-xs
                  uppercase
                  tracking-wider
                  text-blue-400
                  font-bold
                  mb-1
                "
              >
                Email
              </div>

              <div
                className={`
                  text-sm
                  font-semibold
                  break-all

                  ${
                    darkMode
                      ? 'text-white'
                      : 'text-zinc-800'
                  }
                `}
              >
                {personal.email}
              </div>
            </div>
          )}

          {/* LOCATION */}

          {personal.location && (
            <div
              className={`
                rounded-2xl
                px-4
                py-3
                border
                transition-all
                duration-300

                ${
                  darkMode
                    ? `
                      bg-[#111c31]
                      border-white/5
                    `
                    : `
                      bg-zinc-50
                      border-zinc-100
                    `
                }

                hover:-translate-y-1
                hover:shadow-xl
              `}
            >
              <div
                className="
                  text-xs
                  uppercase
                  tracking-wider
                  text-blue-400
                  font-bold
                  mb-1
                "
              >
                Location
              </div>

              <div
                className={`
                  text-sm
                  font-semibold

                  ${
                    darkMode
                      ? 'text-white'
                      : 'text-zinc-800'
                  }
                `}
              >
                {personal.location}
              </div>
            </div>
          )}
        </div>
      </GlassCard>

      {/* EXTRA CONTENT */}

      <div className="space-y-6">
        {children}
      </div>
    </div>
  )
}