export default function Sidebar({
  children,
  photo,
  photoPositionX = 50,
  photoPositionY = 50,
  personal,
}) {
  return (
    <aside
      className="
        relative
        h-full
        px-6
        py-8

        bg-[#07152d]

        border-r
        border-white/5
      "
    >
      {/* SIDEBAR BACKGROUND GLOW */}

      <div
        className="
          absolute
          inset-0
          pointer-events-none
          opacity-80

          bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.14),transparent_35%)]
        "
      />

      {/* CONTENT WRAPPER */}

      <div
        className="
          relative
          z-10
          space-y-5
        "
      >
        {/* PROFILE SECTION */}

        <div
          className="
            flex
            flex-col
            items-center
            text-center
          "
        >
          {/* PROFILE IMAGE */}

          <div
            className="
              relative
              w-40
              h-40
              rounded-[32px]
              overflow-hidden

              border
              border-white/10

              bg-white/5

              shadow-[0_10px_40px_rgba(0,0,0,0.22)]
            "
          >
            {photo ? (
              <img
                src={photo}
                alt={
                  personal?.name ||
                  'Profile'
                }
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
                className="
                  w-full
                  h-full

                  flex
                  items-center
                  justify-center

                  text-white/40
                  text-sm
                "
              >
                No Image
              </div>
            )}
          </div>

          {/* NAME */}

          <h1
            className="
              mt-5
              text-2xl
              font-bold
              tracking-tight
              text-white
            "
          >
            {personal?.name}
          </h1>

          {/* TITLE */}

          <p
            className="
              mt-2
              text-sm
              leading-6
              text-blue-200/80
            "
          >
            {personal?.title}
          </p>
        </div>

        {/* CONTACT INFO */}

        <div
          className="
            rounded-[28px]

            bg-white/[0.03]

            border
            border-white/5

            p-5

            space-y-3
          "
        >
          {/* CONTACT HEADER */}

          {/* 
            Uncomment this block if you want
            the Contact title section visible again

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
              Personal
            </p>

            <h2
              className="
                text-xl
                font-bold
                text-white
              "
            >
              Contact
            </h2>
          </div>
          */}

          {/* EMAIL */}

          <div>
            <p
              className="
                text-xs
                uppercase
                tracking-[0.2em]
                text-white/40
                mb-1
              "
            >
              Email
            </p>

            <a
              href={`mailto:${personal?.email}`}
              className="
                text-sm
                text-white/90

                break-all

                hover:text-blue-300

                transition-colors
              "
            >
              {personal?.email ||
                'your@email.com'}
            </a>
          </div>

          {/* PHONE */}

          <div>
            <p
              className="
                text-xs
                uppercase
                tracking-[0.2em]
                text-white/40
                mb-1
              "
            >
              Phone
            </p>

            <a
              href={`tel:${personal?.phone}`}
              className="
                text-sm
                text-white/90

                hover:text-blue-300

                transition-colors
              "
            >
              {personal?.phone ||
                '+1 (000) 000-0000'}
            </a>
          </div>

          {/* ADDRESS */}

          <div>
            <p
              className="
                text-xs
                uppercase
                tracking-[0.2em]
                text-white/40
                mb-1
              "
            >
              Address
            </p>

            <p
              className="
                text-sm
                leading-6
                text-white/90
              "
            >
              {personal?.address ||
                'Your City, Country'}
            </p>
          </div>
        </div>

        {/* 
          OLD LINKEDIN BLOCK

          This was replaced by the new
          scalable SocialSection system.

          If you ever want the old
          single LinkedIn card back,
          paste it here.
        */}

        {/* SIDEBAR CONTENT */}

        <div
          className="
            space-y-4
          "
        >
          {children}
        </div>
      </div>
    </aside>
  )
}