import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  CalendarCheck,
  CalendarRange,
  Layers,
  GraduationCap,
  Languages,
  TrendingUp,
  Bookmark,
  Archive,
  Settings,
  Sparkles,
  X
} from 'lucide-react';
import type { NavigationTab } from '../../types';

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    isMobileMenuOpen,
    setMobileMenuOpen,
    today,
    currentCycle,
    computedStats
  } = useApp();

  const navItems: { tab: NavigationTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { tab: 'command-center', label: 'Command Center', icon: <LayoutDashboard size={18} /> },
    { tab: 'today', label: 'Today', icon: <CalendarCheck size={18} />, badge: `D${today.dayNumber}` },
    { tab: 'week', label: 'This Week', icon: <CalendarRange size={18} />, badge: `W${today.weekNumber}` },
    { tab: 'cycle', label: 'Current Cycle', icon: <Layers size={18} />, badge: `C${currentCycle.number}` },
    { tab: 'learning-projects', label: 'Learning + Projects', icon: <GraduationCap size={18} /> },
    { tab: 'ielts', label: 'IELTS', icon: <Languages size={18} />, badge: `${computedStats.weeklyIeltsCount}/7` },
    { tab: 'review', label: 'Review + Progress', icon: <TrendingUp size={18} /> }
  ];

  const secondaryNavItems: { tab: NavigationTab; label: string; icon: React.ReactNode }[] = [
    { tab: 'resources', label: 'Resources', icon: <Bookmark size={16} /> },
    { tab: 'archive', label: 'Archive', icon: <Archive size={16} /> },
    { tab: 'settings', label: 'Settings', icon: <Settings size={16} /> }
  ];

  const handleNavClick = (tab: NavigationTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)} />
      )}
      <aside className={`app-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-title">
            <div className="card-title-icon" style={{ background: 'var(--accent-primary)', color: '#FFFFFF' }}>
              <Sparkles size={16} />
            </div>
            <span>Nidham</span>
            <span className="brand-badge">90-Day OS</span>
          </div>
          {isMobileMenuOpen && (
            <button className="btn btn-ghost btn-sm" onClick={() => setMobileMenuOpen(false)}>
              <X size={18} />
            </button>
          )}
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-title">Core Operating Views</div>
          {navItems.map(item => (
            <button
              key={item.tab}
              className={`nav-item ${activeTab === item.tab ? 'active' : ''}`}
              onClick={() => handleNavClick(item.tab)}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.badge && <span className="nav-item-badge">{item.badge}</span>}
            </button>
          ))}

          <div className="nav-section-title" style={{ marginTop: '12px' }}>System Archives</div>
          {secondaryNavItems.map(item => (
            <button
              key={item.tab}
              className={`nav-item ${activeTab === item.tab ? 'active' : ''}`}
              onClick={() => handleNavClick(item.tab)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div style={{ padding: '8px 10px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
              <span>Cycle {currentCycle.number} Progress</span>
              <span className="font-mono">{computedStats.cycleDaysCompleted}/{computedStats.cycleTotalDays}d</span>
            </div>
            <div className="progress-bar-container" style={{ height: '5px' }}>
              <div
                className="progress-bar-fill fill-blue"
                style={{ width: `${Math.round((computedStats.cycleDaysCompleted / computedStats.cycleTotalDays) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
