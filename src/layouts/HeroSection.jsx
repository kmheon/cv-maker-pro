import {
  exportPdf,
} from '../utils/exportPdf'

import Tag from '../shared/Tag'

export default function HeroSection({
  name,

  title,

  summary,

  vendors,

  darkMode,

  setDarkMode,
}) {
  return (
    <section
      className={`
        relative
        overflow-hidden
        rounded-[36px]
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
      {/* BACKGROUND GLOW */}

      <div
        className="
          absolute
          top-0
          right-0
          w-[420px]
          h-[420px]
          rounded-full
          blur-3xl
          opacity-20
          bg-blue-500
          pointer-events-none
        "
      />

      {/* CONTENT */}

      <div className="relative z-10">
        {/* TOP BAR */}

        <div
          className="
            flex
            justify-between
            items-start
            gap-6
            mb-8
          "
        >
          {/* ACTIONS */}

          <div
            className="
              flex
              gap-3
              flex-wrap
            "
          >
            {/* DOWNLOAD */}

            <button
              onClick={() =>
                exportPdf(
                  'cv-preview'
                )
              }
              className="
                group
                relative
                overflow-hidden
                px-6
                py-3
                rounded-2xl
                bg-gradient-to-r
                from-blue-500
                to-blue-400
                text-white
                font-semibold
                shadow-xl
                transition-all
                duration-300

                hover:-translate-y-1
                hover:shadow-blue-400/40
              "
            >
              <span
                className="
                  relative
                  z-10
                "
              >
                Download Resume
              </span>

              {/* BUTTON GLOW */}

              <div
                className="
                  absolute
                  inset-0
                  opacity-0
                  group-hover:opacity-100
                  transition-all
                  duration-300
                  bg-gradient-to-r
                  from-white/10
                  to-transparent
                "
              />
            </button>

            {/* PORTFOLIO */}

            <button
              className={`
                relative
                overflow-hidden
                px-6
                py-3
                rounded-2xl
                border
                font-semibold
                transition-all
                duration-300

                ${
                  darkMode
                    ? `
                      border-zinc-700
                      text-zinc-200
                      hover:bg-zinc-800
                    `
                    : `
                      border-zinc-200
                      text-zinc-700
                      hover:bg-zinc-100
                    `
                }

                hover:-translate-y-1
                hover:shadow-xl
              `}
            >
              Portfolio
            </button>
          </div>

          {/* DARK MODE */}

          <button
            onClick={() =>
              setDarkMode(
                !darkMode
              )
            }
            className="
              w-14
              h-14
              rounded-2xl
              bg-[#111c31]
              text-white
              text-xl
              flex
              items-center
              justify-center
              shadow-xl
              transition-all
              duration-300

              hover:scale-105
              hover:rotate-6
            "
          >
            <span className="text-xl">
  {darkMode ? '☀️' : '🌙'}
</span>
          </button>
        </div>

        {/* HERO */}

        <div
          className="
            flex
            flex-col
            gap-6
          "
        >
          {/* TITLE */}

          <div>
            <div
              className="
                flex
                flex-wrap
                items-center
                gap-4
                mb-4
              "
            >
              <h1
                className={`
                  text-5xl
                  font-black
                  tracking-tight
                  leading-none

                  ${
                    darkMode
                      ? 'text-white'
                      : 'text-zinc-900'
                  }
                `}
              >
                {name}
              </h1>

              {/* AVAILABILITY */}

              <div
                className="
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-2xl
                  bg-emerald-500/15
                  text-emerald-400
                  text-sm
                  font-bold
                "
              >
                {/* PULSE */}

                <div className="relative">
                  <div
                    className="
                      w-3
                      h-3
                      rounded-full
                      bg-emerald-400
                    "
                  />

                  <div
                    className="
                      absolute
                      inset-0
                      rounded-full
                      bg-emerald-400
                      animate-ping
                      opacity-50
                    "
                  />
                </div>

                Available For Work
              </div>
            </div>

            {/* TITLE */}

            <p
              className="
                text-xl
                font-semibold
                text-blue-500
              "
            >
              {title}
            </p>
          </div>

          {/* SUMMARY */}

          <p
            className={`
              leading-8
              max-w-4xl

              ${
                darkMode
                  ? 'text-zinc-300'
                  : 'text-zinc-600'
              }
            `}
          >
            {summary}
          </p>

          {/* VENDORS */}

          <div>
            <div
              className="
                text-xs
                uppercase
                tracking-[0.25em]
                text-blue-400
                font-bold
                mb-4
              "
            >
              Vendor Stack
            </div>

            <div
              className="
                flex
                flex-wrap
                gap-3
              "
            >
              {vendors.map(
                (
                  vendor,
                  index
                ) => (
                  <Tag
                    key={index}
                    darkMode={
                      darkMode
                    }
                  >
                    {vendor}
                  </Tag>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}