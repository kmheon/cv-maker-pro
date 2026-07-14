import React from "react";
import { Zap, Clock, ShieldCheck, Palette, FileCode, Users } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built for speed. Generate and download your professional CV in seconds.",
  },
  {
    icon: Clock,
    title: "Save Time",
    description: "Stop formatting. Focus on your career while we handle the design.",
  },
  {
    icon: ShieldCheck,
    title: "ATS Optimized",
    description: "Designed to pass automated screening systems so you get noticed.",
  },
  {
    icon: Palette,
    title: "Modern Design",
    description: "Premium, clean templates that make your experience stand out.",
  },
  {
    icon: FileCode,
    title: "Multiple Formats",
    description: "Download in PDF or keep your data synced for future updates.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Built with feedback from students, graduates, and hiring managers.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            CV Maker Pro provides the essential tools to build a winning resume without the complexity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10 hover:border-orange-200 dark:hover:border-orange-900/50 group"
            >
              <div className="mb-6 inline-flex p-3 rounded-2xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 transition-transform duration-300 group-hover:scale-110">
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}