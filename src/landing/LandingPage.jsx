import React, { useState } from "react";
import templates, { templateList } from "../templates";
import cvData from "../data/cvData";
import TemplateShowcase from "./TemplateShowcase";

// Complete structural safety data framework matching layout requirements
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

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-900 font-sans antialiased selection:bg-orange-500/20 selection:text-orange-600">
      {/* Background Glows for Premium Aesthetic */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-orange-500/5 to-transparent blur-3xl pointer-events-none" />
      
      <Navbar />
      
      <main>
        <Hero />
        <TemplateShowcase />
        <StorySection />
        <Features />
        <Support />
      </main>

      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#faf9f6]/80 border-b border-slate-200/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center shadow-md shadow-orange-500/20">
            <span className="text-white font-bold text-lg leading-none">C</span>
          </div>
          <span className="font-semibold text-lg tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            CV Maker <span className="text-orange-500">Pro</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#templates" className="hover:text-orange-500 transition-colors">Templates</a>
          <a href="#story" className="hover:text-orange-500 transition-colors">Our Philosophy</a>
          <a href="#features" className="hover:text-orange-500 transition-colors">Features</a>
        </div>

        <div>
          <button className="px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-full transition-all active:scale-98 shadow-sm">
            Create Your CV
          </button>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-16 md:pt-32 md:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-7 flex flex-col justify-center space-y-6 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 text-xs font-semibold tracking-wide w-fit">
          ✨ 100% Free Forever
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
          The professional CV builder that <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">never paywalls</span> your download.
        </h1>
        <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl">
          No hidden credit card checks. No locked features. Build, customize, and export a world-class resume completely free.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-2xl transition-all shadow-lg shadow-orange-500/20 active:scale-98 text-center">
            Build My Resume Free
          </button>
          <a href="#templates" className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-2xl transition-all border border-slate-200 shadow-sm text-center">
            View Templates
          </a>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-200/60 max-w-lg">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span className="text-orange-500 font-bold">✓</span> No Account Required
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span className="text-orange-500 font-bold">✓</span> ATS-Optimized Formats
          </div>
        </div>
      </div>
      
      <div className="lg:col-span-5 relative w-full aspect-[4/5] bg-white rounded-[32px] border border-slate-200/80 shadow-2xl shadow-slate-200/50 p-2 overflow-hidden group">
        <div className="w-full h-full rounded-[24px] bg-slate-50 border border-slate-100 overflow-y-auto p-6 scrollbar-none">
          {templateList && templateList.length > 0 && templates[templateList[0]] ? (
            (() => {
              const PreviewComp = templates[templateList[0]].component;
              return <PreviewComp cvData={normalizedCvData} />;
            })()
          ) : (
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-slate-200 rounded w-1/3"></div>
              <div className="h-3 bg-slate-200 rounded w-full"></div>
              <div className="h-3 bg-slate-200 rounded w-5/6"></div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section id="story" className="bg-slate-900 text-white py-24 rounded-[40px] mx-6 max-w-7xl lg:mx-auto px-8 md:px-16 my-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.08),transparent_50%)]" />
      <div className="max-w-3xl relative z-10 space-y-6">
        <div className="text-orange-500 font-semibold tracking-wider text-xs uppercase">Why We Built This</div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
          We got tired of structural "free resume" paywalls. So we built the antidote.
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          Every platform states "Free Resume Builder" on search indexes, only to prompt you for an hidden, mandatory billing subscription or high processing fee right when you try to export your ready file.
        </p>
        <p className="text-slate-400 text-lg leading-relaxed">
          CV Maker Pro guarantees complete transparency. Creating is free. Downloading is completely unthrottled and free. We sustain operations directly via completely transparent optional channels.
        </p>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { title: "No Data Harvesting", desc: "Your career info stays on your local runtime device storage framework unless explicitly uploaded by choice." },
    { title: "Complete Formatting Control", desc: "Instantly tune sizing parameters, padding parameters, and line-height values inside optimized modular presets." },
    { title: "Raw PDF Architecture", desc: "Utilizes advanced local canvas rendering schemas keeping layout alignments down to clean vectorized points." }
  ];
  return (
    <section id="features" className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
      {items.map((item, i) => (
        <div key={i} className="bg-white border border-slate-200/80 p-8 rounded-[24px] shadow-sm hover:shadow-md transition-all space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 font-semibold text-lg">0{i+1}</div>
          <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
          <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </section>
  );
}

function Support() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-16 text-center space-y-6">
      <h3 className="text-2xl font-bold text-slate-900">Support Free Open-Access Ecosystems</h3>
      <p className="text-slate-600 text-sm max-w-lg mx-auto">
        If you managed to successfully land your dream workplace alignment using our tooling ecosystem, consider opting to back our ongoing engineering roadmaps voluntarily.
      </p>
      <div className="flex justify-center gap-4">
        <button className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-800 transition-all shadow-sm">
          Donate or Support Project
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200/60 max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
      <div>© 2026 CV Maker Pro. Open-source philosophy. Completely absolute paywall-free downloads.</div>
      <div className="flex gap-6">
        <a href="#templates" className="hover:underline">Templates</a>
        <a href="#story" className="hover:underline">Philosophy</a>
      </div>
    </footer>
  );
}