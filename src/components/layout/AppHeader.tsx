import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Menu } from 'lucide-react';

interface AppHeaderProps {
  onToggleMobileMenu?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onToggleMobileMenu }) => {
  const { navigate, activeAnalysis, currentPath } = useApp();

  // Determine breadcrumb context
  let contextLabel = 'Overview';
  if (currentPath.startsWith('/app/role/')) {
    contextLabel = `${activeAnalysis?.employer || 'Role'} · ${activeAnalysis?.roleTitle || 'Job Readiness'}`;
  } else if (currentPath.startsWith('/app/interview/')) {
    contextLabel = `Interview Simulation · ${activeAnalysis?.employer || 'Active Role'}`;
  } else if (currentPath === '/app/career') {
    contextLabel = 'Career Pathways (PS3)';
  } else if (currentPath === '/app/evidence') {
    contextLabel = 'Evidence & GitHub Proof Locker';
  } else if (currentPath === '/app/analyze') {
    contextLabel = 'Analyze New Role Fit';
  } else if (currentPath === '/profile') {
    contextLabel = 'Candidate Profile';
  } else if (currentPath === '/settings') {
    contextLabel = 'Settings & Scoring Formula';
  }

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between select-none">
      <div className="flex items-center gap-3">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            aria-label="Toggle navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div className="text-xs text-slate-500 font-sans truncate max-w-xs sm:max-w-md">
          {contextLabel}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Candidate-friendly Primary CTA */}
        {currentPath !== '/app/analyze' && (
          <button
            onClick={() => navigate('/app/analyze')}
            className="px-4 py-2 rounded-[10px] bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>Analyze My Job Fit</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F59E0B]" />
          </button>
        )}
      </div>
    </header>
  );
};
