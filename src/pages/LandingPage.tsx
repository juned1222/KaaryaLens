import React from 'react';
import { useApp } from '../context/AppContext';
import { AppIcon } from '../components/brand/BrandComponents';
import { SimpleAnalysisWorkspace } from '../components/analysis/SimpleAnalysisWorkspace';

export const LandingPage: React.FC = () => {
  const { navigate } = useApp();

  const handleScrollToWorkspace = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('analyze');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
      {/* Self-contained styling for high-fidelity animations */}
      <style>{`
        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes gentleIndicator {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(5px);
          }
        }

        .animate-hero-banner {
          animation: slideUpFade 500ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-hero-copy {
          opacity: 0;
          animation: fadeIn 500ms cubic-bezier(0.16, 1, 0.3, 1) 150ms forwards;
        }

        .animate-hero-cta {
          opacity: 0;
          animation: fadeIn 500ms cubic-bezier(0.16, 1, 0.3, 1) 300ms forwards;
        }

        .animate-scroll-indicator {
          animation: gentleIndicator 2.5s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section with 100svh & ambient backdrop glow */}
      <section className="relative min-h-[100svh] flex flex-col justify-between bg-[#FAF8F5] bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.03),transparent_60%)] overflow-hidden">
        {/* Minimal Landing Header inside Hero */}
        <header className="h-20 w-full px-6 sm:px-10 lg:px-12 flex items-center justify-between z-10">
          <div className="flex items-center gap-2 select-none">
            <AppIcon size={32} />
            <span className="font-display font-black text-slate-800 tracking-tight text-sm">KaaryaLens</span>
          </div>

          <button
            onClick={() => navigate('/app')}
            className="text-xs font-semibold text-slate-600 hover:text-[#0F172A] transition-colors cursor-pointer px-3 py-1.5 rounded-lg hover:bg-slate-100/60"
          >
            Open Workspace →
          </button>
        </header>

        {/* Spacious centered content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6 sm:px-10 w-full max-w-5xl mx-auto -mt-10">
          {/* Banner Asset */}
          <div className="w-full flex justify-center mb-6 animate-hero-banner">
            <img
              src="/brand/Banner.png"
              alt="KaaryaLens — See beyond the resume."
              className="w-full h-auto object-contain max-w-[88vw] md:max-w-[75vw] lg:max-w-[740px] select-none"
              loading="eager"
            />
          </div>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-xl mx-auto font-normal leading-relaxed text-balance font-sans mb-8 animate-hero-copy">
            Job readiness intelligence for the role you actually want.
          </p>

          {/* Primary CTA */}
          <div className="animate-hero-cta">
            <button
              onClick={handleScrollToWorkspace}
              className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-[#1E293B] text-white px-8 py-4 rounded-xl font-semibold shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group active:scale-98"
            >
              <span>Analyze My Readiness</span>
              <span className="text-[#F59E0B] group-hover:translate-x-1 transition-transform font-bold font-mono">→</span>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="w-full flex justify-center pb-8 z-10">
          <button
            onClick={handleScrollToWorkspace}
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors text-[11px] font-medium tracking-wide cursor-pointer animate-scroll-indicator"
          >
            <span className="text-sm">↓</span>
            <span>Scroll to analyze</span>
          </button>
        </div>
      </section>

      {/* Transition Section */}
      <div id="analyze" className="scroll-mt-20 border-t border-slate-100 bg-[#FAF8F5]">
        <div className="text-center max-w-xl mx-auto pt-16 pb-8 px-6">
          <h2 className="text-2xl font-extrabold text-[#0F172A] font-display">
            Ready to see where you stand?
          </h2>
          <p className="mt-2 text-sm text-slate-500 font-sans">
            Upload your resume and the role you're targeting.
          </p>
        </div>
      </div>

      {/* IMMEDIATE ANALYSIS WORKSPACE */}
      <section className="max-w-4xl mx-auto px-6 sm:px-10 w-full pb-20">
        <SimpleAnalysisWorkspace />
      </section>

      {/* EDITORIAL REASONING FOOTNOTE */}
      <section className="py-16 bg-white border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-6 sm:px-10">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-display">
              Claim → Evidence → Ability → Readiness → Growth
            </h2>
            <p className="mt-2 text-xs text-slate-500 font-sans leading-relaxed">
              KaaryaLens cross-references claimed skills against verified code implementations, preparing you for high-bar technical interviews.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-xs font-sans">
            <div className="space-y-1.5">
              <span className="font-mono text-xs text-[#F59E0B] font-bold">01. True Requirements</span>
              <p className="text-slate-600 leading-relaxed">
                Separates bloated JD wishlists into Must-Have vs Good-to-Have competencies and low-level concurrency expectations.
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="font-mono text-xs text-[#F59E0B] font-bold">02. Claim vs Evidence</span>
              <p className="text-slate-600 leading-relaxed">
                Audits resume assertions against public code repositories and applied architectures with respectful verification signals.
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="font-mono text-xs text-[#F59E0B] font-bold">03. Focused Simulation</span>
              <p className="text-slate-600 leading-relaxed">
                Generates 5 realistic technical rounds targeting your identified gaps, benchmarking against senior staff answers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
