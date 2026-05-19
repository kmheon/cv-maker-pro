import InfoCard from '../shared/InfoCard'

export default function Sidebar({
  children,

  photo,

  photoPositionX = 50,

  photoPositionY = 50,

  darkMode = false,

  personal = {},
}) {
  return (
    <aside
      className="
        rounded-[36px]
        overflow-hidden
        bg-[#07122b]
        text-white
        shadow-[0_10px_40px_rgba(0,0,0,0.25)]
      "
    >
      {/* SIDEBAR CONTENT */}

      <div className="p-6">
        {/* PROFILE */}

        <div
          className="
            flex
            flex-col
            items-center
            text-center
            mb-8
          "
        >
          {/* PHOTO */}

          {photo ? (
            <img
              src={photo}
              alt="Profile"
              style={{
                objectPosition:
                  `${photoPositionX}% ${photoPositionY}%`,
              }}
              className="
                w-32
                h-32
                rounded-3xl
                object-cover
                border-4
                border-white/10
                shadow-xl
                mb-5
              "
            />
          ) : (
            <div
              className="
                w-32
                h-32
                rounded-3xl
                bg-white/10
                flex
                items-center
                justify-center
                text-sm
                text-zinc-400
                mb-5
              "
            >
              No Photo
            </div>
          )}

          {/* NAME */}

          <h2
            className="
              text-3xl
              font-black
              leading-tight
              tracking-tight
            "
          >
            {personal.name}
          </h2>

          {/* TITLE */}

          <p
            className="
              mt-3
              text-sm
              leading-6
              text-zinc-300
              max-w-[220px]
            "
          >
            {personal.title}
          </p>
        </div>

        {/* CONTACT SECTION */}

        <div className="space-y-4 mb-10">
          <div
            className="
              text-xs
              uppercase
              tracking-[0.25em]
              text-blue-400
              font-bold
              mb-2
            "
          >
            Contact
          </div>

          {personal.location && (
            <InfoCard
              label="Location"
              value={
                personal.location
              }
              icon="📍"
            />
          )}

          {personal.phone && (
            <InfoCard
              label="Primary Contact"
              value={
                personal.phone
              }
              icon="📞"
            />
          )}

          {personal.secondaryPhone && (
            <InfoCard
              label="Secondary Contact"
              value={
                personal.secondaryPhone
              }
              icon="☎️"
            />
          )}

          {personal.email && (
            <InfoCard
              label="Email Address"
              value={
                personal.email
              }
              icon="✉️"
              highlight
            />
          )}

          {personal.linkedin && (
            <InfoCard
              label="LinkedIn Profile"
              value={
                personal.linkedin
              }
              icon="in"
            />
          )}
        </div>

        {/* CHILD SECTIONS */}

        <div className="space-y-10">
          {children}
        </div>
      </div>
    </aside>
  )
}