import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Signal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
  RotateCcw,
  Sun,
  Moon
} from 'lucide-react';
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
  const {
    today,
    updateCapacityMode,
    theme,
    toggleTheme,
    realTodayDayNumber,
    isViewingRealToday,
    returnToRealToday,
    switchToDay
  } = useApp();

  const [isCapacityOpen, setIsCapacityOpen] = React.useState(false);
  const [isDaySelectorOpen, setIsDaySelectorOpen] = React.useState(false);

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

        {/* Return to Today Quick Action if viewing past/different day */}
        {!isViewingRealToday && (
          <button
            className="pill-badge pill-rose"
            onClick={returnToRealToday}
            style={{ cursor: 'pointer', marginTop: '18px', gap: '5px', fontWeight: 700 }}
            title="Jump back to current day"
          >
            <RotateCcw size={12} />
            <span>Return to Today (Day {realTodayDayNumber})</span>
          </button>
        )}

        {/* Date Pill */}
        <div className="pill-badge pill-neutral" style={{ marginTop: '18px' }}>
          <Calendar size={13} color="var(--text-muted)" />
          <span>{today.date}</span>
        </div>

        {/* Interactive Day Navigator & Selector */}
        {extraPill ? (
          <div style={{ marginTop: '18px' }}>{extraPill}</div>
        ) : (
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '2px', marginTop: '18px' }}>
            <button
              className="btn btn-icon btn-ghost"
              disabled={today.dayNumber <= 1}
              onClick={() => switchToDay(today.dayNumber - 1)}
              title="Go to Previous Day"
              style={{ width: '24px', height: '24px', padding: 0, opacity: today.dayNumber <= 1 ? 0.3 : 1 }}
            >
              <ChevronLeft size={13} />
            </button>

            <button
              className={`pill-badge ${isViewingRealToday ? 'pill-sage' : 'pill-rose'}`}
              onClick={() => setIsDaySelectorOpen(!isDaySelectorOpen)}
              style={{ cursor: 'pointer', gap: '4px', padding: '4px 10px' }}
              title="Click to select any day in the program"
            >
              <span>Day {today.dayNumber} / 90</span>
              <ChevronDown size={11} />
            </button>

            <button
              className="btn btn-icon btn-ghost"
              disabled={today.dayNumber >= 90}
              onClick={() => switchToDay(today.dayNumber + 1)}
              title="Go to Next Day"
              style={{ width: '24px', height: '24px', padding: 0, opacity: today.dayNumber >= 90 ? 0.3 : 1 }}
            >
              <ChevronRight size={13} />
            </button>

            {isDaySelectorOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '6px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                padding: '6px',
                display: 'flex',
                flexDirection: 'column',
                gap: '3px',
                zIndex: 60,
                maxHeight: '260px',
                overflowY: 'auto',
                minWidth: '220px'
              }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', padding: '4px 8px' }}>
                  Select Day to Log / View
                </div>
                {Array.from({ length: Math.max(7, realTodayDayNumber + 2) }, (_, i) => i + 1).map(dayNum => {
                  const isReal = dayNum === realTodayDayNumber;
                  const isCurrentView = dayNum === today.dayNumber;
                  const isPast = dayNum < realTodayDayNumber;
                  return (
                    <button
                      key={dayNum}
                      className="btn btn-ghost btn-sm"
                      style={{
                        justifyContent: 'space-between',
                        padding: '5px 8px',
                        fontSize: '0.78rem',
                        fontWeight: isCurrentView ? 700 : 500,
                        background: isCurrentView ? 'var(--accent-sage-bg)' : 'transparent',
                        color: isCurrentView ? 'var(--accent-sage)' : 'var(--text-primary)'
                      }}
                      onClick={() => {
                        switchToDay(dayNum);
                        setIsDaySelectorOpen(false);
                      }}
                    >
                      <span>Day {dayNum} {isReal ? '(Today ⭐)' : isPast ? '(Past)' : ''}</span>
                      {isCurrentView && <Check size={12} color="var(--accent-sage)" />}
                    </button>
                  );
                })}
              </div>
            )}
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
