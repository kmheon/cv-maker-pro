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
          <button
            onClick={() =>
              exportPdf(
                'cv-preview'
              )
            }
            className="
              px-5
              py-3
              rounded-2xl
              bg-blue-600
              text-white
              font-semibold
              hover:bg-blue-700
              transition-all
            "
          >
            Download Resume
          </button>

          <button
            className={`
              px-5
              py-3
              rounded-2xl
              border
              font-semibold
              transition-all

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
            bg-zinc-950
            text-white
            text-xl
            flex
            items-center
            justify-center
            hover:scale-105
            transition-all
          "
        >
          🌙
        </button>
      </div>

      {/* MAIN HERO */}

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
                px-4
                py-2
                rounded-2xl
                bg-emerald-500/15
                text-emerald-400
                text-sm
                font-bold
              "
            >
              Available For Work
            </div>
          </div>

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

        {/* VENDOR STACK */}

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
    </section>
  )
}