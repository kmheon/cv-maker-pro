import { ArrowRight, CheckCircle2, Sparkles, ShieldCheck, FileDown } from "lucide-react";
import templates from "../templates";
import cvData from "../data/cvData";

// Strict fallback data structure to guarantee compliance with all template rendering requirements
const safeData = {
  personal: {
    firstName: "Alex",
    lastName: "Carter",
    email: "alex@example.com",
    phone: "+1 234 567 890",
    title: "Professional",
    summary: "Dedicated professional with a proven track record.",
    location: "New York, NY",
    website: "alexcarter.design",
    ...cvData?.personal
  },
  experience: cvData?.experience || [],
  education: cvData?.education || [],
  skills: cvData?.skills || [],
  languages: cvData?.languages || [],
  projects: cvData?.projects || [],
  certifications: cvData?.certifications || [],
  ...cvData
};

export default function Hero() {
  const PreviewTemplate = templates.modernGlass.component;

  const trustPoints = [
    "Always Free PDF Download",
    "No Hidden Paywalls",
    "Unlimited Editing",
    "ATS Friendly Templates",
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-32 -top-40 h-[520px] w-[520px] rounded-full bg-orange-500/15 blur-[140px]" />
        <div className="absolute right-[-120px] top-20 h-[420px] w-[420px] rounded-full bg-sky-500/15 blur-[130px]" />
        <div className="absolute bottom-[-180px] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-orange-300/10 blur-[160px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),transparent_55%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[88vh] max-w-[1500px] flex-col items-center justify-center gap-16 px-6 py-20 lg:flex-row lg:px-10 xl:px-16">
        {/* LEFT */}
        <div className="w-full flex-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700 shadow-sm">
            <Sparkles size={16} />
            Free Forever
          </div>

          <h1 className="mt-8 max-w-3xl text-5xl font-black leading-tight tracking-tight text-slate-900 md:text-6xl xl:text-7xl">
            Build a Professional CV.
            <br />
            Download it
            <span className="text-orange-600"> Free.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
            Stop wasting time on "free" resume builders that ask you to pay at the last step. Build, customize, and download your CV for free.
            <br />
            <br />
            CV Maker Pro gives you premium, recruiter-ready CVs with unlimited
            editing, modern templates, and completely free PDF downloads.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/app"
              className="group inline-flex items-center gap-3 rounded-2xl bg-orange-600 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-orange-500/30 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-700 hover:shadow-orange-500/40"
            >
              Start Building Free

              <ArrowRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>

            <button className="rounded-2xl border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-500 hover:text-orange-600 hover:shadow-lg">
              Browse Templates
            </button>
          </div>

          {/* Trust Cards */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {trustPoints.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 p-4 backdrop-blur-md shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"
              >
                <CheckCircle2
                  size={20}
                  className="flex-shrink-0 text-green-500"
                />

                <span className="font-medium text-slate-700">{item}</span>
              </div>
            ))}
          </div>

          {/* Extra Stats */}
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-green-500" />
              Secure & Private
            </div>

            <div className="flex items-center gap-2">
              <FileDown size={18} className="text-orange-500" />
              Instant PDF Export
            </div>

            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-sky-500" />
              Premium Templates
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative flex w-full flex-1 justify-center">
          {/* Glow */}
          <div className="absolute h-[520px] w-[520px] rounded-full bg-orange-400/20 blur-[130px]" />
          <div className="absolute right-0 top-10 h-[320px] w-[320px] rounded-full bg-sky-400/20 blur-[110px]" />

          {/* Floating Card */}
          <div
            className="
              relative
              w-full
              max-w-[540px]
              animate-[float_6s_ease-in-out_infinite]
              rounded-[34px]
              border
              border-white/60
              bg-white/70
              p-6
              backdrop-blur-2xl
              shadow-[0_40px_90px_rgba(15,23,42,0.18)]
              transition-all
              duration-500
              hover:-translate-y-3
              hover:rotate-[1deg]
            "
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Modern Glass
                </h3>

                <p className="text-sm text-slate-500">
                  Live Template Preview
                </p>
              </div>

              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                FREE
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-inner">
              <div className="aspect-[210/297] overflow-hidden bg-slate-100 flex justify-center">
                <div className="relative h-full w-full">
                  <div
                    className="
                      absolute
                      left-1/2
                      top-0
                      origin-top
                      -translate-x-1/2
                      w-[850px]
                      scale-[0.32]
                      sm:scale-[0.40]
                      md:scale-[0.45]
                      lg:scale-[0.48]
                      xl:scale-[0.52]
                      pointer-events-none
                      select-none
                    "
                  >
                    <PreviewTemplate
                      cvData={safeData}
                      darkMode={false}
                      setDarkMode={() => {}}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Info */}
            <div className="mt-5 flex items-center justify-between rounded-2xl bg-slate-50 p-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  ATS Score Optimized
                </p>

                <p className="text-xs text-slate-500">
                  Designed for modern recruiters.
                </p>
              </div>

              <div className="rounded-xl bg-orange-100 px-4 py-2 text-sm font-bold text-orange-700">
                Ready to Export
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Animation */}
      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-14px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </section>
  );
}