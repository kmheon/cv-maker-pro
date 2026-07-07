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
      className="bg-slate-100 py-28"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
            Why CV Maker Pro Exists
          </span>

          <h2 className="mt-6 text-5xl font-black text-slate-900">
            Finally.
            <br />
            A CV Builder That Means "Free".
          </h2>

          <p className="mt-8 text-lg leading-8 text-slate-600">
            CV Maker Pro was created after spending hours on websites that
            claimed to be free, only to ask for payment when it was finally
            time to download the resume.
          </p>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Instead of putting downloads behind a paywall, this project is
            designed to stay free through optional rewarded ads, future
            donations, and community support.
          </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">

          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="rounded-3xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                  <Icon size={28} />
                </div>

                <h3 className="text-2xl font-bold text-slate-900">
                  {card.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {card.text}
                </p>
              </div>
            );
          })}

        </div>

        <div className="mx-auto mt-20 max-w-4xl rounded-3xl bg-slate-900 px-10 py-14 text-center text-white">

          <p className="text-3xl font-bold leading-relaxed">
            “Your next job shouldn't begin with a payment screen.”
          </p>

          <p className="mt-6 text-slate-300">
            — CV Maker Pro
          </p>

        </div>

      </div>
    </section>
  );
}