import { Heart, ShieldCheck, Users } from "lucide-react";

const cards = [
  {
    icon: ShieldCheck,
    title: "Truly Free",
    text: "Create and download your CV without hidden paywalls or surprise charges.",
  },
  {
    icon: Heart,
    title: "Supported Differently",
    text: "Optional rewarded ads and future donations help keep the project free for everyone.",
  },
  {
    icon: Users,
    title: "Built For Everyone",
    text: "Whether you're a student, graduate, or experienced professional, CV Maker Pro is for you.",
  },
];

export default function Story() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#faf9f6] py-32"
    >
      {/* Background Lighting Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.06),transparent_70%)] pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        
        {/* Header Section */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center justify-center rounded-full bg-orange-500/10 border border-orange-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-600 shadow-sm">
            Why CV Maker Pro Exists
          </span>

          <h2 className="mt-8 text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.15]">
            Finally.
            <br />
            A CV Builder That Means "Free".
          </h2>

          <p className="mt-8 text-lg md:text-xl leading-relaxed text-slate-600 max-w-2xl mx-auto">
            CV Maker Pro was created after spending hours on websites that
            claimed to be free, only to ask for payment when it was finally
            time to download the resume.
          </p>

          <p className="mt-6 text-lg md:text-xl leading-relaxed text-slate-600 max-w-2xl mx-auto">
            Instead of putting downloads behind a paywall, this project is
            designed to stay free through optional rewarded ads, future
            donations, and community support.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-24 grid gap-8 md:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="group relative rounded-[32px] border border-slate-200/70 bg-white/70 backdrop-blur-xl p-8 md:p-10 shadow-lg shadow-slate-200/40 transition-all duration-500 hover:-translate-y-2 hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-200/60"
              >
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 text-orange-600 shadow-inner border border-orange-200/50 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <Icon size={30} strokeWidth={2.2} />
                </div>

                <h3 className="text-xl font-bold tracking-tight text-slate-900">
                  {card.title}
                </h3>

                <p className="mt-4 leading-relaxed text-slate-600 text-sm md:text-base">
                  {card.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quote Section */}
        <div className="mx-auto mt-32 max-w-5xl relative overflow-hidden rounded-[40px] bg-slate-900 px-8 py-20 md:py-24 text-center shadow-2xl shadow-slate-900/20 border border-slate-800">
          {/* Subtle Inner Glows */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.15),transparent_50%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.1),transparent_50%)] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight md:leading-tight lg:leading-[1.15] tracking-tight text-white">
              “Your next job shouldn't begin with a payment screen.”
            </p>

            <p className="mt-8 text-slate-400 font-medium tracking-wide uppercase text-sm">
              — CV Maker Pro
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}