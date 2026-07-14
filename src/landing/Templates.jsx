import React, { useState } from "react";
import templates, { templateList } from "../templates";
import cvData from "../data/cvData";

// Strict fallback data structure to guarantee compliance with all template rendering requirements
const safeData = {
  personal: {
    firstName: "Alex",
    lastName: "Carter",
    email: "alex@example.com",
    phone: "+1 234 567 890",
    title: "Professional",
    summary: "Dedicated professional with a proven track record. Highly organized and detail-oriented, with expertise in managing complex workflows and delivering high-quality results under tight deadlines.",
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

export default function Templates() {
  // Ensure we safely map over unique string IDs
  const list = Array.isArray(templateList) 
    ? templateList.map(item => typeof item === 'object' ? item.id : item)
    : Object.keys(templates);
    
  const [selected, setSelected] = useState(list[0] || "");
  const ActiveTemplate = templates[selected]?.component;

  return (
    <section id="templates" className="w-full max-w-7xl mx-auto px-6 py-24 border-t border-slate-200/60 dark:border-slate-800/60 relative transition-colors duration-300">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-gradient-to-tr from-blue-500/5 to-orange-500/5 dark:from-blue-500/10 dark:to-orange-500/10 blur-3xl pointer-events-none transition-colors duration-300" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 relative z-10">
        <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl transition-colors duration-300">
          Engineered to pass the standard screeners
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto transition-colors duration-300">
          Switch styles seamlessly. Your layout modifies instantly to follow executive standards and ATS parsing rules.
        </p>
      </div>

      {/* Template Selection Pills */}
      <div className="flex flex-wrap justify-center gap-2.5 mb-14 max-w-4xl mx-auto relative z-10">
        {list.map((key) => {
          if (!key) return null;
          return (
            <button
              key={key}
              onClick={() => setSelected(key)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 active:scale-95 ${
                selected === key
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md shadow-slate-900/10 dark:shadow-white/10"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-white shadow-sm"
              }`}
            >
              {templates[key]?.name || key}
            </button>
          );
        })}
      </div>

      {/* Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start w-full max-w-7xl mx-auto relative z-10">
        
        {/* Live Preview Pane */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none rounded-[32px] p-3 transition-all duration-300 hover:border-slate-300/80 dark:hover:border-slate-700">
          {/* Fixed-height container with hidden overflow, inner content scrolls and scales */}
          <div className="relative w-full h-[450px] md:h-[600px] rounded-[24px] bg-slate-50 dark:bg-slate-950 overflow-hidden border border-slate-100 dark:border-slate-800/50 shadow-inner group transition-colors duration-300">
            <div className="absolute inset-0 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-200/80 dark:scrollbar-thumb-slate-700 group-hover:scrollbar-thumb-slate-300 dark:group-hover:scrollbar-thumb-slate-600 flex justify-center py-6 md:py-10">
              {/* Scaled fixed-width canvas to ensure CV layout never gets squeezed horizontally */}
              <div className="w-[850px] shrink-0 origin-top transform scale-[0.35] xs:scale-[0.45] sm:scale-[0.6] md:scale-[0.75] lg:scale-[0.85] xl:scale-90 transition-transform duration-300">
                {ActiveTemplate ? (
                  <ActiveTemplate cvData={safeData} />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400 dark:text-slate-500 font-medium">
                    Template engine rendering framework error.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Information Card */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-[32px] p-8 shadow-xl shadow-slate-100/60 dark:shadow-none transition-colors duration-300">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-md">
              {templates[selected]?.category || "Professional"}
            </span>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white pt-2 transition-colors">
              {templates[selected]?.name || "Executive Layout"}
            </h3>
          </div>

          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed transition-colors">
            {templates[selected]?.description || 
              "A pristine typography-driven structure engineered with flawless data visual hierarchy, tailored specifically for strict corporate tracking parsing metrics."}
          </p>

          <hr className="border-slate-200/80 dark:border-slate-800 transition-colors" />

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 transition-colors">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              {templates[selected]?.darkSupported ? "Full Dark Mode Support" : "Light Mode Optimization"}
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 transition-colors">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Fully responsive layout tracking adjustments
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 transition-colors">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              100% compliant with corporate ATS match algorithms
            </div>
          </div>

          <a 
            href="/app" 
            className="block w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-2xl transition-all shadow-lg shadow-orange-600/20 active:scale-95 text-center text-sm tracking-wide mt-4"
          >
            Use This Template
          </a>
        </div>
        
      </div>
    </section>
  );
}