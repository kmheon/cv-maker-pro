import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100">

      {/* Background Glow */}

      <div className="absolute -top-40 -left-32 h-[420px] w-[420px] rounded-full bg-orange-500/10 blur-3xl" />

      <div className="absolute right-0 top-40 h-[350px] w-[350px] rounded-full bg-sky-500/10 blur-3xl" />

      <div className="mx-auto flex min-h-[82vh] max-w-[1500px] flex-col items-center gap-16 px-8 py-20 lg:flex-row">

        {/* LEFT */}

        <div className="flex-1">

          <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
            100% Free CV Builder
          </span>

          <h1 className="mt-8 text-5xl font-black leading-tight text-slate-900 lg:text-7xl">
            Build a Professional CV.
            <br />
            Download it
            <span className="text-orange-600"> Free.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-9 text-slate-600">
            Stop wasting hours on websites that ask for payment
            just before downloading.

            CV Maker Pro lets you create and download beautiful,
            recruiter-ready resumes without hidden paywalls.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <a
              href="/app"
              className="inline-flex items-center gap-3 rounded-2xl bg-orange-600 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-orange-500/30 transition-all hover:-translate-y-1 hover:bg-orange-700"
            >
              Start Building Free

              <ArrowRight size={20} />
            </a>

            <button
              className="rounded-2xl border border-slate-300 bg-white px-8 py-4 font-semibold transition hover:border-orange-500 hover:text-orange-600"
            >
              Browse Templates
            </button>

          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">

            {[
              "Always Free PDF Download",
              "No Hidden Paywalls",
              "Unlimited Editing",
              "ATS Friendly Templates",
            ].map((item) => (

              <div
                key={item}
                className="flex items-center gap-3 text-slate-700"
              >
                <CheckCircle2
                  size={20}
                  className="text-green-500"
                />

                <span className="font-medium">
                  {item}
                </span>
              </div>

            ))}

          </div>

        </div>

        {/* RIGHT */}

        <div className="flex flex-1 justify-center">

          <div
            className="
            relative
            w-full
            max-w-[500px]
            rounded-[32px]
            border
            border-slate-200
            bg-white
            p-6
            shadow-2xl
            transition-all
            duration-500
            hover:-translate-y-2
          "
          >

            <div className="mb-5 flex items-center justify-between">

              <div>

                <h3 className="font-bold text-slate-900">
                  Modern Glass
                </h3>

                <p className="text-sm text-slate-500">
                  Featured Template
                </p>

              </div>

              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                FREE
              </span>

            </div>

            <div className="aspect-[210/297] overflow-hidden rounded-2xl border bg-slate-100">

              <div className="flex h-full items-center justify-center text-center text-slate-400">

                <div>

                  <div className="text-6xl">
                    📄
                  </div>

                  <p className="mt-4 font-semibold">
                    Live Resume Preview
                  </p>

                  <p className="text-sm">
                    (Real template coming next)
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}