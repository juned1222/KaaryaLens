import React from 'react';
import { useApp } from '../../context/AppContext';
import { BrandMark } from '../brand/BrandComponents';
import { 
  Compass, 
  FileText, 
  Briefcase, 
  FolderCheck, 
  UserCheck, 
  Sparkles,
  Settings,
  ChevronRight
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPath, navigate, isDemoMode, setIsDemoMode, hasGeminiKey } = useApp();

  const navItems = [
    { label: 'Overview', path: '/app', icon: Briefcase },
    { label: 'Analyze Role', path: '/app/analyze', icon: Sparkles },
    { label: 'Evidence Locker', path: '/app/evidence', icon: FolderCheck },
    { label: 'Career Paths', path: '/app/career', icon: Compass },
    { label: 'Profile', path: '/profile', icon: UserCheck },
  ];

  const isCurrent = (p: string) => {
    if (p === '/app' && currentPath === '/app') return true;
    if (p !== '/app' && currentPath.startsWith(p)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-slate-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 group text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] rounded-lg p-1 -ml-1"
        >
          <BrandMark size="md" showIcon={true} />
        </button>

        {/* Navigation Links - Clean text typography, zero-pill discipline */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const active = isCurrent(item.path);
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  active
                    ? 'text-[#0F172A] bg-white shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-[#0F172A] hover:bg-slate-100/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-[#F59E0B]' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Demo Mode Toggle */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 bg-white rounded-lg border border-slate-200/80 text-xs text-slate-600">
            <span className="text-slate-400">Mode:</span>
            <button
              onClick={() => setIsDemoMode(!isDemoMode)}
              className="font-medium text-[#0F172A] hover:text-[#F59E0B] transition-colors cursor-pointer flex items-center gap-1"
              title="Toggle between Live Gemini AI and Seeded Deterministic Demo Data"
            >
              <span>{isDemoMode ? 'Seeded Sample' : hasGeminiKey ? 'Gemini 3.8' : 'Sample Mode'}</span>
              <span className={`w-2 h-2 rounded-full ${isDemoMode ? 'bg-[#F59E0B]' : 'bg-[#16A34A]'}`} />
            </button>
          </div>

          {/* Settings icon */}
          <button
            onClick={() => navigate('/settings')}
            className="p-2 text-slate-500 hover:text-[#0F172A] hover:bg-slate-100/80 rounded-lg transition-colors cursor-pointer"
            title="Settings & Scoring Formula"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => navigate('/app/analyze')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#0F172A] hover:bg-slate-800 transition-all shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
          >
            <span>Analyze Role</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#F59E0B]" />
          </button>
        </div>
      </div>
    </header>
  );
};
