import React from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../brand/BrandComponents';

export const Footer: React.FC = () => {
  const { navigate } = useApp();

  return (
    <footer className="mt-auto border-t border-slate-200/60 bg-[#FAF8F5] py-8 select-none">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-sans">
        <div className="flex items-center gap-3">
          <Logo height={20} />
          <span className="text-slate-300">|</span>
          <span className="text-slate-500">See beyond the resume.</span>
        </div>

        <div className="flex items-center gap-5 text-slate-500 font-medium">
          <button onClick={() => navigate('/app')} className="hover:text-[#0F172A] transition-colors cursor-pointer">
            Overview
          </button>
          <button onClick={() => navigate('/app/analyze')} className="hover:text-[#0F172A] transition-colors cursor-pointer">
            Analyze
          </button>
          <button onClick={() => navigate('/app/evidence')} className="hover:text-[#0F172A] transition-colors cursor-pointer">
            Evidence
          </button>
          <button onClick={() => navigate('/app/career')} className="hover:text-[#0F172A] transition-colors cursor-pointer">
            Career Paths
          </button>
          <button onClick={() => navigate('/settings')} className="hover:text-[#0F172A] transition-colors cursor-pointer">
            Formula
          </button>
        </div>

        <div className="text-[11px] text-slate-400">
          © {new Date().getFullYear()} KaaryaLens
        </div>
      </div>
    </footer>
  );
};
