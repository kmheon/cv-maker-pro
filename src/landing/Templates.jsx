import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Sparkles, ArrowRight, Layout, ShieldCheck, Eye } from 'lucide-react';
import templates, { templateList } from '../templates/index';
import cvData from '../data/cvData';
import { useTheme } from '../context/ThemeContext';

export default function TemplateShowcase() {
  const { theme } = useTheme();
  
  const templateKeys = Object.keys(templates).length > 0 
    ? Object.keys(templates) 
    : (templateList ? templateList.map(t => t.id) : []);
    
  const initialKey = templateKeys[0] || '';
  const [selectedTemplateId, setSelectedTemplateId] = useState(initialKey);

  const getTemplateData = (id) => {
    if (templates[id]) {
      const target = templates[id];
      const component = (typeof target === 'function' || (target && target.$$typeof)) ? target : target.component;
      return {
        component: component,
        name: target.name || id.charAt(0).toUpperCase() + id.slice(1).replace(/([A-Z])/g, ' $1'),
        description: target.description || 'Engineered typographic hierarchy optimized for rapid ATS processing.'
      };
    }
    
    if (templateList) {
      const found = templateList.find(t => t.id === id);
      if (found) {
        return {
          component: found.component || found,
          name: found.name || id.charAt(0).toUpperCase() + id.slice(1).replace(/([A-Z])/g, ' $1'),
          description: found.description || 'Optimized structural layout.'
        };
      }
    }
    return null;
  };

  const currentTemplateObj = getTemplateData(selectedTemplateId);

  const previewVariants = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.25, ease: 'easeIn' } }
  };

  if (!selectedTemplateId || !currentTemplateObj || !currentTemplateObj.component) {
    return null;
  }

  const TemplateComponent = currentTemplateObj.component;

  // Unpack CV data dynamically to prevent runtime destructuring errors if wrapped or nested
  const sanitizedCvData = cvData?.cvData || cvData?.data || cvData || {};

  return (
    <section className="relative w-full py-24 bg-neutral-950 text-white overflow-hidden selection:bg-orange-500/30 selection:text-orange-400">
      <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] rounded-full bg-orange-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-5 flex flex-col justify-center lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-medium tracking-wide text-orange-400 mb-6 w-fit backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>100% FREE PREMIUM LAYOUTS</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-neutral-50 leading-[1.15] mb-6">
              Engineered for <br />
              <span className="bg-gradient-to-r from-orange-400 via-amber-200 to-blue-400 bg-clip-text text-transparent">
                Maximum Readability.
              </span>
            </h2>

            <p className="text-lg text-neutral-400 leading-relaxed mb-8">
              Switch formats instantly. Your data automatically morphs into perfectly optimized, ATS-friendly typographic hierarchies designed by industry experts.
            </p>

            <div className="flex flex-col gap-3.5 mb-8">
              {templateKeys.map((id) => {
                const isActive = selectedTemplateId === id;
                const templateMeta = getTemplateData(id);
                if (!templateMeta) return null;

                return (
                  <button
                    key={id}
                    onClick={() => setSelectedTemplateId(id)}
                    className={`group relative flex items-start text-left p-4 rounded-2xl transition-all duration-300 border backdrop-blur-sm ${
                      isActive
                        ? 'bg-neutral-900/90 border-orange-500/30 shadow-[0_0_30px_-5px_rgba(249,115,22,0.15)]'
                        : 'bg-neutral-950/40 border-neutral-900 hover:border-neutral-800 hover:bg-neutral-900/40'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeGlow"
                        className="absolute inset-0 rounded-2xl border border-orange-500/50 pointer-events-none"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <div className={`p-2.5 rounded-xl mr-4 transition-colors ${
                      isActive ? 'bg-orange-500/10 text-orange-400' : 'bg-neutral-900 text-neutral-500 group-hover:text-neutral-400'
                    }`}>
                      <Layout className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-semibold text-base transition-colors ${isActive ? 'text-orange-400' : 'text-neutral-200'}`}>
                          {templateMeta.name}
                        </h4>
                        {isActive && <Eye className="w-4 h-4 text-orange-400/80" />}
                      </div>
                      <p className="text-sm text-neutral-400 mt-1 line-clamp-1">
                        {templateMeta.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="space-y-3.5 border-t border-neutral-900 pt-8 mb-8">
              <div className="flex items-center gap-3 text-sm text-neutral-400">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Zero configuration data structural remapping</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-400">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Strictly strict ATS-parsed architectural rendering</span>
              </div>
            </div>

            <button className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 font-semibold text-white hover:from-orange-600 hover:to-amber-700 transition-all duration-300 shadow-[0_4px_20px_rgba(249,115,22,0.3)] active:scale-[0.98] group">
              Use This Template
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="lg:col-span-7 relative w-full h-[760px] lg:h-[840px] bg-neutral-900/40 rounded-[32px] border border-neutral-900 p-4 sm:p-6 shadow-2xl backdrop-blur-md overflow-hidden">
            <div className="absolute top-4 left-6 right-6 h-8 flex items-center justify-between border-b border-neutral-800/60 pb-4 z-20 pointer-events-none">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
              </div>
              <div className="text-xs text-neutral-500 font-mono tracking-widest uppercase">
                Live Interactive Architecture Preview
              </div>
              <div className="w-12" />
            </div>

            <div className="w-full h-full pt-10 pb-2 overflow-y-auto rounded-2xl">
              <div className="origin-top scale-[0.85] sm:scale-[0.9] md:scale-[0.95] transition-transform duration-300">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedTemplateId}
                    variants={previewVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="w-full shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] rounded-xl bg-white text-neutral-900 overflow-hidden"
                  >
                    <TemplateComponent data={sanitizedCvData} theme={theme} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}