import React, { useState } from "react";
import templates, { templateList } from "../templates";
import cvData from "../data/cvData";

export default function TemplateShowcase() {
  // Ensure we safely map over unique string IDs, fallback to Object.keys if list isn't array of strings
  const list = Array.isArray(templateList) 
    ? templateList.map(item => typeof item === 'object' ? item.id : item)
    : Object.keys(templates);
    
  const [selected, setSelected] = useState(list[0] || "");
  const ActiveTemplate = templates[selected]?.component;

  // Comprehensive fail-safe data architecture matching standard template expectations
  const normalizedCvData = {
    personal: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      title: "",
      summary: "",
      location: "",
      website: "",
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

  return (
    <section id="templates" className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-200/60 relative">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-gradient-to-tr from-blue-500/5 to-orange-500/5 blur-3xl pointer-events-none" />

      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 relative z-10">
        <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Engineered to pass the standard screeners
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Switch styles seamlessly. Your layout modifies instantly to follow executive standards and ATS parsing rules.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2.5 mb-12 max-w-4xl mx-auto relative z-10">
        {list.map((key) => {
          const stringKey = typeof key === 'string' ? key : key?.id;
          if (!stringKey) return null;
          
          return (
            <button
              key={stringKey}
              onClick={() => setSelected(stringKey)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 active:scale-95 ${
                selected === stringKey
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900 shadow-sm"
              }`}
            >
              {templates[stringKey]?.name || stringKey}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto relative z-10">
        <div className="lg:col-span-8 bg-white border border-slate-200 shadow-2xl shadow-slate-100 rounded-[32px] p-3 aspect-[1/1.414] overflow-hidden group transition-all duration-300 hover:border-slate-300/80">
          <div className="w-full h-full rounded-[20px] bg-white overflow-y-auto p-10 border border-slate-100 scrollbar-thin scrollbar-thumb-slate-200">
            {ActiveTemplate ? (
              <ActiveTemplate cvData={normalizedCvData} />
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400 font-medium">
                Template engine rendering framework error.
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 bg-[#faf9f6]/60 backdrop-blur-md border border-slate-200/80 rounded-[28px] p-8 shadow-xl shadow-slate-100/50">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 bg-orange-500/10 px-2.5 py-1 rounded-md">
              {templates[selected]?.category || "Professional"}
            </span>
            <h3 className="text-2xl font-bold text-slate-900 pt-2">
              {templates[selected]?.name || "Executive Layout"}
            </h3>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed">
            {templates[selected]?.description || 
              "A pristine typography-driven structure engineered with flawless data visual hierarchy, tailored specifically for strict corporate tracking parsing metrics."}
          </p>

          <hr className="border-slate-200" />

          <div className="space-y-3.5">
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              {templates[selected]?.darkSupported ? "Full Dark Mode Support" : "Light Mode Optimization"}
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Fully responsive layout tracking adjustments
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              100% compliant with corporate ATS match algorithms
            </div>
          </div>

          <button className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-2xl transition-all shadow-lg shadow-orange-500/20 active:scale-98 text-center text-sm tracking-wide mt-2">
            Use This Template
          </button>
        </div>
      </div>
    </section>
  );
}