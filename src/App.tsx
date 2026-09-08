import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { MobileNav } from './components/layout/MobileNav';
import { QuickLogModal } from './components/modals/QuickLogModal';
import { CommandCenterView } from './components/command-center/CommandCenterView';
import { TodayView } from './components/today/TodayView';
import { WeekView } from './components/week/WeekView';
import { CycleView } from './components/cycle/CycleView';
import { LearningProjectsView } from './components/learning-projects/LearningProjectsView';
import { IELTSDashboardView } from './components/ielts/IELTSDashboardView';
import { ReviewProgressView } from './components/review/ReviewProgressView';
import { ResourcesView } from './components/resources/ResourcesView';
import { ArchiveView } from './components/archive/ArchiveView';
import { SettingsView } from './components/settings/SettingsView';
import { Plus, Play, Pause } from 'lucide-react';

const formatMiniChrono = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const AppContent: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    isMobileViewMode,
    setQuickLogOpen,
    focusTimer,
    pauseFocusTimer,
    resumeFocusTimer
  } = useApp();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'command-center':
        return <CommandCenterView />;
      case 'today':
        return <TodayView />;
      case 'week':
        return <WeekView />;
      case 'cycle':
        return <CycleView />;
      case 'learning-projects':
        return <LearningProjectsView />;
      case 'ielts':
        return <IELTSDashboardView />;
      case 'review':
        return <ReviewProgressView />;
      case 'resources':
        return <ResourcesView />;
      case 'archive':
        return <ArchiveView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <CommandCenterView />;
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar for Desktop */}
      <Sidebar />

      {/* Main Execution Shell */}
      <main className="app-main">
        <Header />

        {isMobileViewMode ? (
          /* Mobile Simulated Frame Preview */
          <div className="mobile-simulator-wrapper animate-fade-in">
            <div className="mobile-frame">
              <div className="mobile-notch" />
              <div className="mobile-screen-content">
                {renderActiveView()}
              </div>
              <MobileNav />
            </div>
          </div>
        ) : (
          /* Desktop Fluid Full Page */
          <div className="page-container">
            {renderActiveView()}
          </div>
        )}

        {/* Global Floating Focus Chrono Pill */}
        {focusTimer.isActive && (
          <div
            className="floating-chrono-pill animate-fade-in"
            onClick={() => setActiveTab('today')}
            title="Focus Session Active — Click to return to Today"
          >
            <span className="pulse-dot" />
            <span className="floating-chrono-time">{formatMiniChrono(focusTimer.secondsLeft)}</span>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
              {focusTimer.isPaused ? 'Paused' : 'RAG Focus'}
            </span>
            <button
              className="btn btn-icon btn-ghost"
              style={{ width: '22px', height: '22px', padding: 0 }}
              onClick={(e) => {
                e.stopPropagation();
                if (focusTimer.isPaused) resumeFocusTimer();
                else pauseFocusTimer();
              }}
              title={focusTimer.isPaused ? 'Resume Focus' : 'Pause Focus'}
            >
              {focusTimer.isPaused ? <Play size={12} fill="currentColor" /> : <Pause size={12} />}
            </button>
          </div>
        )}

        {/* Global Floating Quick-Log Trigger (Desktop) */}
        {!isMobileViewMode && (
          <button
            className="floating-quick-btn"
            onClick={() => setQuickLogOpen(true)}
            aria-label="Quick Log"
          >
            <Plus size={18} />
            <span>+ Quick Log</span>
          </button>
        )}

        {/* Mobile Real Bottom Navigation (shown automatically on real small screen widths) */}
        <MobileNav />

        {/* Quick Log Modal Overlay */}
        <QuickLogModal />
      </main>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
