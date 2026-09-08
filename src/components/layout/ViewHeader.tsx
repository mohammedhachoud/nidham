import React from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Signal, ChevronDown, Sun, Moon } from 'lucide-react';
import type { CapacityMode } from '../../types';

interface ViewHeaderProps {
  category?: string;
  title: string;
  subtitle: string;
  extraPill?: React.ReactNode;
}

export const ViewHeader: React.FC<ViewHeaderProps> = ({
  category = '90-DAY PERSONAL OPERATING SYSTEM',
  title,
  subtitle,
  extraPill
}) => {
  const { today, updateCapacityMode, theme, toggleTheme } = useApp();
  const [isCapacityOpen, setIsCapacityOpen] = React.useState(false);

  return (
    <div className="view-top-header">
      <div>
        <div className="top-system-tag">{category}</div>
        <h1 className="top-view-title">{title}</h1>
        <div className="top-view-subtitle">{subtitle}</div>
      </div>

      <div className="top-header-right">
        {/* Top Right Handwritten Script Note */}
        <div className="handwritten-banner-note">
          <div className="handwritten-accent-line" />
          <span className="handwritten-text">Progress over perfection</span>
        </div>

        {/* Date Pill */}
        <div className="pill-badge pill-neutral" style={{ marginTop: '18px' }}>
          <Calendar size={13} color="var(--text-muted)" />
          <span>{today.date}</span>
        </div>

        {/* Extra pill or Day pill */}
        {extraPill ? (
          <div style={{ marginTop: '18px' }}>{extraPill}</div>
        ) : (
          <div className="pill-badge pill-sage" style={{ marginTop: '18px' }}>
            Day {today.dayNumber} / 90
          </div>
        )}

        {/* Capacity Selector Dropdown */}
        <div style={{ position: 'relative', marginTop: '18px' }}>
          <button
            className="pill-badge pill-neutral"
            onClick={() => setIsCapacityOpen(!isCapacityOpen)}
            style={{ cursor: 'pointer' }}
          >
            <Signal size={13} color="var(--accent-sage)" />
            <span>{today.capacityMode} Capacity</span>
            <ChevronDown size={12} color="var(--text-muted)" />
          </button>

          {isCapacityOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '6px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-md)',
                padding: '4px',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                zIndex: 50,
                minWidth: '140px'
              }}
            >
              {(['Normal', 'Reduced', 'Recovery'] as CapacityMode[]).map(mode => (
                <button
                  key={mode}
                  className="btn btn-ghost btn-sm"
                  style={{
                    justifyContent: 'flex-start',
                    fontWeight: today.capacityMode === mode ? 600 : 400,
                    color: today.capacityMode === mode ? 'var(--accent-sage)' : 'inherit'
                  }}
                  onClick={() => {
                    updateCapacityMode(mode);
                    setIsCapacityOpen(false);
                  }}
                >
                  {mode} Capacity
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Global Dark / Light Theme Toggle */}
        <button
          className="pill-badge pill-neutral"
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          style={{ cursor: 'pointer', marginTop: '18px', gap: '6px', userSelect: 'none' }}
        >
          {theme === 'dark' ? (
            <>
              <Sun size={13} color="var(--accent-sand)" />
              <span>Light</span>
            </>
          ) : (
            <>
              <Moon size={13} color="var(--accent-periwinkle)" />
              <span>Dark</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
