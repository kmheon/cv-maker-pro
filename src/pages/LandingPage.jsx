export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <p className="text-orange-600 font-semibold uppercase tracking-widest">
          CV Maker Pro
        </p>

        <h1 className="mt-6 text-5xl font-extrabold leading-tight">
          Professional CVs.
          <br />
          No Hidden Download Paywalls.
        </h1>

        <p className="mt-8 text-xl text-slate-600 max-w-3xl mx-auto">
          Create a beautiful, recruiter-ready CV in minutes.
          Download it for free.
          No subscriptions. No surprises.
        </p>

        <div className="mt-12 flex justify-center gap-4">
          <a
            href="/app"
            className="rounded-xl bg-orange-600 px-8 py-4 text-white font-semibold hover:bg-orange-700 transition"
          >
            Start Building
          </a>

          <button className="rounded-xl border px-8 py-4 font-semibold hover:bg-slate-100 transition">
            View Templates
          </button>
        </div>
      </section>
    </div>
  )
}