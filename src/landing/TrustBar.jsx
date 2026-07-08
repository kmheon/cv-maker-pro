import React from "react";

export default function TrustBar() {
  const items = [
    "Free PDF Downloads",
    "No Watermarks",
    "Unlimited Editing",
    "No Hidden Paywalls",
  ];

  return (
    <section className="relative overflow-hidden border-y border-slate-200/60 bg-white py-12">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.03),transparent_80%)] pointer-events-none" />
      
      <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-6 px-6 md:gap-x-20">
        {items.map((item) => (
          <div
            key={item}
            className="group flex items-center gap-3.5 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-50 border border-orange-100/50 text-orange-500 shadow-sm transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-md group-hover:shadow-orange-500/25 group-hover:border-orange-500">
              <svg 
                className="h-4 w-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm md:text-base font-semibold tracking-wide text-slate-600 transition-colors duration-300 group-hover:text-slate-900">
              {item}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}