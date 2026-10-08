import React from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../brand/BrandComponents';
import { 
  LayoutDashboard, 
  Briefcase, 
  ShieldCheck, 
  Compass, 
  TrendingUp, 
  User, 
  Settings,
  Sparkles,
  Layers
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { currentPath, navigate, activeAnalysis, activeInterview } = useApp();

  const navItems = [
    { label: 'Overview', path: '/app', icon: LayoutDashboard },
    { 
      label: 'My Roles', 
      path: activeAnalysis ? `/app/role/${activeAnalysis.id}` : '/app/analyze', 
      activeMatch: '/app/role',
      icon: Briefcase 
    },
    { label: 'Evidence', path: '/app/evidence', icon: ShieldCheck },
    { 
      label: 'Interview', 
      path: activeInterview ? `/app/interview/${activeInterview.id}` : '/app/interview/session-swiggy-01', 
      activeMatch: '/app/interview',
      icon: Sparkles 
    },
    { label: 'Career Paths', path: '/app/career', icon: Compass },
    { 
      label: 'Market Lens', 
      path: activeAnalysis ? `/app/role/${activeAnalysis.id}#market-lens` : '/app', 
      activeMatch: '#market-lens',
      icon: TrendingUp 
    },
  ];

  const bottomItems = [
    { label: 'Profile', path: '/profile', icon: User },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  const isItemActive = (item: typeof navItems[0]) => {
    if (item.activeMatch) {
      return currentPath.includes(item.activeMatch);
    }
    return currentPath === item.path;
  };

  return (
    <aside className="w-60 shrink-0 bg-white border-r border-slate-200/80 min-h-screen flex flex-col justify-between select-none">
      <div>
        {/* Logo area */}
        <div className="h-16 px-5 flex items-center border-b border-slate-100">
          <button 
            onClick={() => navigate('/')}
            className="cursor-pointer hover:opacity-95 transition-opacity focus:outline-none"
          >
            <Logo height={28} />
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const active = isItemActive(item);
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-[10px] text-sm font-medium transition-colors cursor-pointer text-left ${
                  active
                    ? 'text-[#0F172A] bg-[#FAF8F5] font-semibold border-l-2 border-[#F59E0B]'
                    : 'text-slate-600 hover:text-[#0F172A] hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-[#F59E0B]' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & Settings */}
      <div className="p-3 border-t border-slate-100 space-y-1">
        {bottomItems.map((item) => {
          const active = currentPath === item.path;
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-[10px] text-sm font-medium transition-colors cursor-pointer text-left ${
                active
                  ? 'text-[#0F172A] bg-[#FAF8F5] font-semibold border-l-2 border-[#F59E0B]'
                  : 'text-slate-600 hover:text-[#0F172A] hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-[#F59E0B]' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
