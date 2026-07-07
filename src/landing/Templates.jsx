import { Crown, Sparkles } from "lucide-react";
import templates, { templateList } from "../templates";

export default function Templates() {
  return (
    <section
      id="templates"
      className="bg-white py-28"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
            Templates
          </span>

          <h2 className="mt-6 text-5xl font-black text-slate-900">
            Choose Your Style.
          </h2>

          <p className="mt-8 text-lg leading-8 text-slate-600">
            Professional templates designed for students,
            graduates and experienced professionals.
          </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {templateList.map((template) => (

            <div
              key={template.id}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >

              <div className="aspect-[3/4] overflow-hidden bg-slate-100">

                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

              </div>

              <div className="p-6">

                <div className="flex items-center justify-between">

                  <h3 className="text-xl font-bold text-slate-900">
                    {template.name}
                  </h3>

                  {template.premium ? (
                    <span className="flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
                      <Crown size={14} />
                      Premium
                    </span>
                  ) : (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                      Free
                    </span>
                  )}

                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {template.description}
                </p>

                <div className="mt-6 flex items-center justify-between">

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {template.category}
                  </span>

                  {template.featured && (
                    <span className="flex items-center gap-1 text-orange-600 text-sm font-semibold">
                      <Sparkles size={16} />
                      Featured
                    </span>
                  )}

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}