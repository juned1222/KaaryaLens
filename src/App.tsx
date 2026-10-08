import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { AppHeader } from './components/layout/AppHeader';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import { DashboardOverview } from './pages/DashboardOverview';
import { AnalyzeRolePage } from './pages/AnalyzeRolePage';
import { RoleDashboardPage } from './pages/RoleDashboardPage';
import { InterviewWorkspacePage } from './pages/InterviewWorkspacePage';
import { CareerPathsPage } from './pages/CareerPathsPage';
import { EvidenceLockerPage } from './pages/EvidenceLockerPage';
import { CandidateProfilePage } from './pages/CandidateProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { X } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentPath } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLanding = currentPath === '/';

  const renderCurrentPage = () => {
    if (isLanding) return <LandingPage />;
    if (currentPath === '/app') return <DashboardOverview />;
    if (currentPath === '/app/analyze') return <AnalyzeRolePage />;
    if (currentPath.startsWith('/app/role/')) return <RoleDashboardPage />;
    if (currentPath.startsWith('/app/interview/')) return <InterviewWorkspacePage />;
    if (currentPath === '/app/career') return <CareerPathsPage />;
    if (currentPath === '/app/evidence') return <EvidenceLockerPage />;
    if (currentPath === '/profile') return <CandidateProfilePage />;
    if (currentPath === '/settings') return <SettingsPage />;
    return <DashboardOverview />;
  };

  if (isLanding) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#0F172A] font-sans">
        <main className="flex-1">
          {renderCurrentPage()}
        </main>
        <Footer />
      </div>
    );
  }

  // Workspace layout with LEFT SIDEBAR (Section 5)
  return (
    <div className="min-h-screen flex bg-[#FAF8F5] text-[#0F172A] font-sans antialiased">
      {/* Desktop Left Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div 
            className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)} 
          />
          <div className="relative z-10 bg-white w-64 max-w-[80%] h-full flex flex-col">
            <div className="p-4 flex items-center justify-between border-b border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase">Navigation</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <Sidebar />
            </div>
          </div>
        </div>
      )}

      {/* Main Workspace Column */}
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader onToggleMobileMenu={() => setMobileMenuOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          {renderCurrentPage()}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
