import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Target,
  CheckCircle2,
  Play,
  Pause,
  RotateCcw,
  Plus,
  BookOpen,
  Shield,
  Send,
  Sparkles,
  Code2,
  Languages,
  Clock,
  FileCheck
} from 'lucide-react';

export const TodayView: React.FC = () => {
  const {
    today,
    toggleMainObjective,
    toggleEssentialCommitment,
    togglePrayer,
    toggleFajr,
    toggleTraining,
    toggleScreenTime,
    updateQuickNotes,
    completeDailyClose,
    setQuickLogOpen
  } = useApp();

  // Focus Timer state for Main Objective
  const [timerSeconds, setTimerSeconds] = useState(90 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  React.useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => s - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Daily Close form state
  const [closeCompleted, setCloseCompleted] = useState(today.dailyClose?.completedMeaningful || '');
  const [closeInterfered, setCloseInterfered] = useState(today.dailyClose?.interfered || '');
  const [closeTomorrow, setCloseTomorrow] = useState(today.dailyClose?.tomorrowPriority || '');
  const [closeEvidence, setCloseEvidence] = useState(today.dailyClose?.evidenceProduced || '');
  const [isCloseSaved, setIsCloseSaved] = useState(!!today.dailyClose);

  const handleDailyCloseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    completeDailyClose({
      completedMeaningful: closeCompleted,
      interfered: closeInterfered,
      tomorrowPriority: closeTomorrow,
      evidenceProduced: closeEvidence
    });
    setIsCloseSaved(true);
  };

  const prayerNames = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

  return (
    <div className="layout-column animate-fade-in">
      {/* View Header */}
      <div className="view-header">
        <div className="view-header-main">
          <h1>Today</h1>
          <p>Execute with focus. Small deliberate steps create big transformations.</p>
        </div>
        <div className="view-header-aside">
          <span className="badge badge-neutral font-mono">{today.date}</span>
          <span className="badge badge-blue">Day {today.dayNumber} / 90</span>
          <span className="badge badge-purple">Week {today.weekNumber}</span>
        </div>
      </div>

      {/* Section 1: Main Dominant Objective */}
      <div
        className="card"
        style={{
          border: '1.5px solid var(--accent-primary)',
          background: 'linear-gradient(135deg, rgba(23, 33, 51, 0.95) 0%, rgba(19, 27, 42, 0.9) 100%)',
          boxShadow: 'var(--shadow-md), 0 0 20px var(--accent-primary-glow)'
        }}
      >
        <div className="card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="card-title-icon" style={{ background: 'var(--accent-primary)', color: '#FFFFFF' }}>
              <Target size={16} />
            </div>
            <div>
              <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-primary)', fontWeight: 700 }}>
                Dominant Daily Objective (One Outcome)
              </span>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                {today.mainObjective.title}
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Timer Widget */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-md)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                border: '1px solid var(--border-light)'
              }}
            >
              <Clock size={14} color="var(--accent-primary)" />
              <span>{formatTimer(timerSeconds)}</span>
              <button
                className="btn btn-ghost btn-icon"
                style={{ width: '24px', height: '24px' }}
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                title={isTimerRunning ? 'Pause' : 'Start Focus Timer'}
              >
                {isTimerRunning ? <Pause size={12} /> : <Play size={12} />}
              </button>
              <button
                className="btn btn-ghost btn-icon"
                style={{ width: '24px', height: '24px' }}
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimerSeconds(90 * 60);
                }}
                title="Reset Timer"
              >
                <RotateCcw size={12} />
              </button>
            </div>

            {/* Completion Button */}
            <button
              className={`btn ${today.mainObjective.completed ? 'btn-success' : 'btn-primary'}`}
              onClick={toggleMainObjective}
            >
              {today.mainObjective.completed ? (
                <>
                  <CheckCircle2 size={16} />
                  <span>Completed</span>
                </>
              ) : (
                <>
                  <Play size={16} />
                  <span>Mark Complete</span>
                </>
              )}
            </button>
          </div>
        </div>

        <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          {today.mainObjective.description}
        </p>
      </div>

      {/* Main Grid: Essential Commitments vs Today's Technical Context */}
      <div className="grid-2col-split">
        {/* Left Column: Essential Commitments */}
        <div className="card">
          <div className="card-header">
            <div>
              <span className="card-title">
                <CheckCircle2 size={18} style={{ color: 'var(--status-success)' }} />
                Essential Commitments
              </span>
              <span className="card-subtitle">
                Keep it small and non-negotiable. Only the few things that genuinely matter.
              </span>
            </div>
            <span className="badge badge-green font-mono">
              {today.essentialCommitments.filter(c => c.completed).length} / {today.essentialCommitments.length}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {today.essentialCommitments.map(item => (
              <div
                key={item.id}
                className="item-row"
                onClick={() => toggleEssentialCommitment(item.id)}
                style={{ cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className={`custom-checkbox ${item.completed ? 'checked' : ''}`}>
                    <div className="checkbox-box">
                      {item.completed && <CheckCircle2 size={14} />}
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className={`badge ${
                        item.area === 'Faith' ? 'badge-blue' :
                        item.area === 'Technical' ? 'badge-purple' :
                        item.area === 'IELTS' ? 'badge-green' : 'badge-amber'
                      }`} style={{ fontSize: '0.68rem', padding: '2px 6px' }}>
                        {item.area}
                      </span>
                      <span style={{
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        textDecoration: item.completed ? 'line-through' : 'none',
                        color: item.completed ? 'var(--text-muted)' : 'var(--text-primary)'
                      }}>
                        {item.title}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Target: {item.target}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span className="badge badge-neutral" style={{ fontSize: '0.72rem' }}>
                    {item.completed ? '✓ Completed' : 'Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Today's Context Card */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">
              <Code2 size={18} style={{ color: 'var(--accent-primary)' }} />
              Today's Technical & IELTS Track
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.84rem' }}>
            <div style={{ padding: '10px 12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--accent-primary)', fontWeight: 700, textTransform: 'uppercase' }}>
                Stable Track
              </div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                {today.technicalFocus.stableTrack}
              </div>
            </div>

            <div style={{ padding: '10px 12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--status-purple)', fontWeight: 700, textTransform: 'uppercase' }}>
                Secondary Rotation
              </div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                {today.technicalFocus.currentFocus}
              </div>
            </div>

            <div>
              <span style={{ color: 'var(--text-muted)' }}>Specific Outcome Expected: </span>
              <p style={{ color: 'var(--text-primary)', marginTop: '2px' }}>
                {today.technicalFocus.outcome}
              </p>
            </div>

            <div>
              <span style={{ color: 'var(--text-muted)' }}>Evidence Expected: </span>
              <div className="badge badge-blue" style={{ marginTop: '4px' }}>
                <FileCheck size={12} />
                {today.technicalFocus.expectedEvidence}
              </div>
            </div>

            <button
              className="btn btn-outline btn-sm"
              onClick={() => setQuickLogOpen(true, 'output')}
              style={{ marginTop: '6px' }}
            >
              <Plus size={14} />
              <span>+ Add Concrete Output / Evidence</span>
            </button>
          </div>
        </div>
      </div>

      {/* IELTS Daily Focus Card & Personal Anchors Grid */}
      <div className="grid-2col">
        {/* IELTS Session Card */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">
              <Languages size={18} style={{ color: 'var(--status-success)' }} />
              IELTS Session (45 Minutes)
            </span>
            <span className="badge badge-green">Daily Continuous Track</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Today's Skill:</span>
              <strong style={{ color: 'var(--text-primary)' }}>{today.ieltsSession.skill}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Specific Focus:</span>
              <span style={{ color: 'var(--text-secondary)' }}>{today.ieltsSession.focus}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Target Duration:</span>
              <span className="font-mono">45 minutes</span>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setQuickLogOpen(true, 'ielts-practice')}
              >
                <Play size={13} />
                <span>Log 45m Practice</span>
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setQuickLogOpen(true, 'ielts-error')}
              >
                <Plus size={13} />
                <span>Record Error</span>
              </button>
            </div>
          </div>
        </div>

        {/* Personal Anchors (Faith, Health, Discipline) */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">
              <Shield size={18} style={{ color: 'var(--status-warning)' }} />
              Personal Anchors (Monitoring, Not Tasks)
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Faith Prayers */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Daily Prayers & Fajr Anchor</span>
                <button
                  className="btn btn-ghost btn-sm"
                  style={{ padding: '0 4px', fontSize: '0.7rem' }}
                  onClick={toggleFajr}
                >
                  Fajr: {today.personalAnchors.faith.fajrOnTime ? '✓ On Time' : 'Pending'}
                </button>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                {prayerNames.map((name, idx) => (
                  <button
                    key={name}
                    className={`btn btn-sm ${today.personalAnchors.faith.prayers[idx] ? 'btn-success' : 'btn-secondary'}`}
                    style={{ flex: 1, padding: '4px 0', fontSize: '0.72rem' }}
                    onClick={() => togglePrayer(idx)}
                  >
                    {today.personalAnchors.faith.prayers[idx] ? '✓ ' : ''}{name}
                  </button>
                ))}
              </div>
            </div>

            {/* Health & Training */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid var(--border-subtle)' }}>
              <div>
                <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>Physical Training: </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  {today.personalAnchors.health.trainingType || 'Evening Upper Body'}
                </span>
              </div>
              <button
                className={`btn btn-sm ${today.personalAnchors.health.trainingCompleted ? 'btn-success' : 'btn-outline'}`}
                onClick={toggleTraining}
              >
                {today.personalAnchors.health.trainingCompleted ? '✓ Completed' : 'Mark Done'}
              </button>
            </div>

            {/* Discipline Boundary */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid var(--border-subtle)' }}>
              <div>
                <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>Recreational Screen Boundary: </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>No aimless browsing</span>
              </div>
              <button
                className={`btn btn-sm ${today.personalAnchors.discipline.screenTimeBoundaryKept ? 'btn-success' : 'btn-secondary'}`}
                onClick={toggleScreenTime}
              >
                {today.personalAnchors.discipline.screenTimeBoundaryKept ? '✓ Respected' : 'Violated'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 6: Quick Scratchpad */}
      <div className="card">
        <div className="card-header">
          <span className="card-title" style={{ fontSize: '0.92rem' }}>
            <BookOpen size={16} style={{ color: 'var(--accent-primary)' }} />
            Quick Notes & Insight Scratchpad
          </span>
        </div>
        <textarea
          rows={2}
          value={today.quickNotes}
          onChange={e => updateQuickNotes(e.target.value)}
          placeholder="Capture fleeting insights, standup takeaways, or immediate blockers..."
          style={{ width: '100%', resize: 'vertical' }}
        />
      </div>

      {/* Section 7: Daily Close (2–3 Minutes) */}
      <div
        className="card"
        style={{
          border: '1px solid var(--border-light)',
          background: 'linear-gradient(180deg, var(--bg-card) 0%, var(--bg-secondary) 100%)'
        }}
      >
        <div className="card-header">
          <div>
            <span className="card-title" style={{ color: 'var(--accent-primary)' }}>
              <Sparkles size={18} />
              Daily Close (2–3 Minutes)
            </span>
            <span className="card-subtitle">
              Close the learning loop each evening. Reflect, diagnose blockers, and orient tomorrow.
            </span>
          </div>
          {isCloseSaved && (
            <span className="badge badge-green">✓ Closed for Today</span>
          )}
        </div>

        <form onSubmit={handleDailyCloseSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="grid-3col">
            <div className="form-group">
              <label className="form-label">1. What meaningful thing did I complete?</label>
              <input
                type="text"
                value={closeCompleted}
                onChange={e => setCloseCompleted(e.target.value)}
                placeholder="Concrete outcome completed today"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">2. What interfered with execution?</label>
              <input
                type="text"
                value={closeInterfered}
                onChange={e => setCloseInterfered(e.target.value)}
                placeholder="Distraction, fatigue, scope too big, etc."
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">3. What should tomorrow prioritize?</label>
              <input
                type="text"
                value={closeTomorrow}
                onChange={e => setCloseTomorrow(e.target.value)}
                placeholder="Single dominant objective for tomorrow"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Evidence / Output Produced Today (Optional, adds to Vault)</label>
            <input
              type="text"
              value={closeEvidence}
              onChange={e => setCloseEvidence(e.target.value)}
              placeholder="e.g. Documented RAG error taxonomy v1 in team docs"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
            <button type="submit" className="btn btn-primary">
              <Send size={15} />
              <span>{isCloseSaved ? 'Update Daily Close' : 'Complete Daily Close'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
