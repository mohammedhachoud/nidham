import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Menu,
  Sun,
  Moon,
  Plus,
  Smartphone,
  Monitor,
  Flame,
  BatteryMedium,
  HeartPulse
} from 'lucide-react';
import type { CapacityMode } from '../../types';

export const Header: React.FC = () => {
  const {
    activeTab,
    theme,
    toggleTheme,
    isMobileViewMode,
    toggleMobileViewMode,
    setMobileMenuOpen,
    setQuickLogOpen,
    today,
    updateCapacityMode,
    computedStats
  } = useApp();

  const getBreadcrumbLabel = () => {
    switch (activeTab) {
      case 'command-center': return 'Command Center';
      case 'today': return 'Today (Execution)';
      case 'week': return `This Week (Week ${today.weekNumber})`;
      case 'cycle': return `Current Cycle (Cycle ${today.cycleNumber})`;
      case 'learning-projects': return 'Learning + Projects';
      case 'ielts': return 'IELTS Progression';
      case 'review': return 'Review + Progress';
      case 'resources': return 'Resources';
      case 'archive': return 'Archive';
      case 'settings': return 'Settings & Data';
      default: return 'Dashboard';
    }
  };

  const capacityIcons: Record<CapacityMode, React.ReactNode> = {
    Normal: <Flame size={13} style={{ color: 'var(--status-success)' }} />,
    Reduced: <BatteryMedium size={13} style={{ color: 'var(--status-warning)' }} />,
    Recovery: <HeartPulse size={13} style={{ color: 'var(--status-purple)' }} />
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <button
          className="mobile-header-toggle"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open Navigation"
        >
          <Menu size={18} />
        </button>

        <div className="header-breadcrumbs">
          <span style={{ color: 'var(--text-muted)' }}>90-Day OS</span>
          <span style={{ color: 'var(--border-light)' }}>/</span>
          <span className="breadcrumb-active">{getBreadcrumbLabel()}</span>
        </div>
      </div>

      <div className="header-right">
        {/* Capacity Selector */}
        <div className="capacity-selector" title="Adjust daily capacity mode based on energy & recovery">
          {(['Normal', 'Reduced', 'Recovery'] as CapacityMode[]).map(mode => (
            <button
              key={mode}
              className={`capacity-btn ${today.capacityMode === mode ? 'active' : ''}`}
              onClick={() => updateCapacityMode(mode)}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                {capacityIcons[mode]}
                {mode}
              </span>
            </button>
          ))}
        </div>

        {/* Global Quick Log Action */}
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setQuickLogOpen(true)}
          title="Quick Log any session, output, or reflection (Cmd/Ctrl+K)"
        >
          <Plus size={15} />
          <span>Quick Log</span>
        </button>

        {/* Toggle Mobile Phone Simulator View */}
        <button
          className="btn btn-secondary btn-icon"
          onClick={toggleMobileViewMode}
          title={isMobileViewMode ? 'Switch to Desktop Layout' : 'Simulate Mobile Device View'}
        >
          {isMobileViewMode ? <Monitor size={16} /> : <Smartphone size={16} />}
        </button>

        {/* Dark / Light Mode Switcher */}
        <button
          className="btn btn-secondary btn-icon"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} theme`}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Day Badge */}
        <div
          className="badge badge-blue font-mono"
          style={{ padding: '6px 12px', fontSize: '0.82rem' }}
        >
          Day {computedStats.daysCompleted} / 90
        </div>
      </div>
    </header>
  );
};
