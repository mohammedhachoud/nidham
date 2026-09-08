import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Home,
  Sun,
  Moon,
  Calendar,
  Compass,
  BookOpen,
  BarChart3,
  TrendingUp,
  Inbox,
  Link,
  Settings,
  Leaf,
  X
} from 'lucide-react';
import type { NavigationTab } from '../../types';

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    isMobileMenuOpen,
    setMobileMenuOpen,
    theme,
    toggleTheme
  } = useApp();

  const navItems: { tab: NavigationTab; label: string; icon: React.ReactNode }[] = [
    { tab: 'command-center', label: 'Command Center', icon: <Home size={18} /> },
    { tab: 'today', label: 'Today', icon: <Sun size={18} /> },
    { tab: 'week', label: 'This Week', icon: <Calendar size={18} /> },
    { tab: 'cycle', label: 'Current Cycle', icon: <Compass size={18} /> },
    { tab: 'learning-projects', label: 'Learning + Projects', icon: <BookOpen size={18} /> },
    { tab: 'ielts', label: 'IELTS', icon: <BarChart3 size={18} /> },
    { tab: 'review', label: 'Review + Progress', icon: <TrendingUp size={18} /> }
  ];

  const secondaryNavItems: { tab: NavigationTab; label: string; icon: React.ReactNode }[] = [
    { tab: 'archive', label: 'Archive', icon: <Inbox size={17} /> },
    { tab: 'resources', label: 'Resources', icon: <Link size={17} /> },
    { tab: 'settings', label: 'Settings', icon: <Settings size={17} /> }
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
          <div className="brand-header-group">
            <Leaf className="brand-leaf-icon" />
            <div>
              <div className="brand-name">A Better You</div>
              <div className="brand-motto">Discipline Creates Freedom</div>
            </div>
          </div>
          {isMobileMenuOpen && (
            <button className="btn btn-ghost btn-sm" onClick={() => setMobileMenuOpen(false)}>
              <X size={18} />
            </button>
          )}
        </div>

        <nav className="sidebar-nav">
          {navItems.map(item => (
            <button
              key={item.tab}
              className={`nav-item ${activeTab === item.tab ? 'active' : ''}`}
              onClick={() => handleNavClick(item.tab)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}

          <div className="sidebar-divider" />

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

        {/* Theme Mode Toggle in Sidebar */}
        <div style={{ padding: '0 14px 8px' }}>
          <button
            className="nav-item"
            onClick={toggleTheme}
            style={{
              justifyContent: 'space-between',
              padding: '8px 12px',
              fontSize: '0.82rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {theme === 'dark' ? <Sun size={15} color="var(--accent-sand)" /> : <Moon size={15} color="var(--accent-periwinkle)" />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </div>
            <span
              className="badge badge-neutral"
              style={{ fontSize: '0.68rem', padding: '2px 6px', textTransform: 'capitalize' }}
            >
              {theme}
            </span>
          </button>
        </div>

        {/* Bottom Sidebar Misty Mountain Landscape Artwork */}
        <div className="sidebar-footer-art">
          <img
            src="/images/serene_mountain_lake.jpg"
            alt="Serene mountain lake reflection"
            className="sidebar-landscape-img"
          />
          <div className="sidebar-footer-quote">
            A calmer mind<br />A brighter future
          </div>
          <div style={{ width: '28px', height: '1px', background: 'var(--accent-sage)', opacity: 0.35, marginTop: '6px' }} />
        </div>
      </aside>
    </>
  );
};
